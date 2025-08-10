'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Sidebar from './components/Sidebar';
import FeedbackList from './components/FeedbackList';
import FeedbackDetails from './components/FeedbackDetails';
import { User, Plus } from 'lucide-react';

export default function Page() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [currentView, setCurrentView] = useState('inbox');
  const [feedbackList, setFeedbackList] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [loadingList, setLoadingList] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [error, setError] = useState(null);

  const allTags = [
    'Bug', 'Feature Request', 'Improvement', 'UI', 'UX', 'Performance', 'Accessibility',
    'Dark Mode', 'Notifications', 'Dashboard', 'Comments', 'Search',
    'Authentication', 'Onboarding', 'Settings', 'Navigation', 'Forms', 'API'
  ];

  // Load feedback list summaries on mount
  useEffect(() => {
    async function fetchFeedbacks() {
      setLoadingList(true);
      setError(null);
      try {
        const res = await fetch('/api/feedback');
        const data = await res.json();
        if (res.ok && data.success) {
          setFeedbackList(data.data || []);
        } else {
          setError(data.error || 'Failed to fetch feedback list');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingList(false);
      }
    }
    fetchFeedbacks();
  }, []);

  // Fetch full feedback + replies when selectedFeedback changes
  useEffect(() => {
    async function fetchFeedbackDetails() {
      if (!selectedFeedback?._id) return;
      setLoadingDetails(true);
      setError(null);

      try {
        const res = await fetch(`/api/feedback/${selectedFeedback._id}`);
        const json = await res.json();
        if (res.ok && json.success) {
          setSelectedFeedback({
            ...json.data.feedback,
            replies: json.data.replies
          });
        } else {
          setError(json.error || "Failed to fetch feedback details");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingDetails(false);
      }
    }
    fetchFeedbackDetails();
  }, [selectedFeedback?._id]);

  // Refetch list on filters change
  useEffect(() => {
    async function fetchFilteredFeedbacks() {
      setLoadingList(true);
      setError(null)

      try {
        const params = new URLSearchParams();
        if (searchQuery) params.append('search', searchQuery);
        if (selectedTags.length > 0) params.append('tags', selectedTags.join(','));
        if (currentView) params.append('view', currentView);

        const res = await fetch(`/api/feedback?${params.toString()}`);
        const json = await res.json();

        if (res.ok && json.success) {
          setFeedbackList(json.data || []);
        }
        else {
          setError(json.error || 'Failed to fetch feedback');
        }
      }
      catch (err) {
        setError(err.message || 'Unexpected error');
      }
      finally {
        setLoadingList(false);
      }
    }

    fetchFilteredFeedbacks()
  }, [searchQuery, selectedTags, currentView])

  async function onUpVote(feedbackId) {
    try {
      const res = await fetch(`/api/feedback/${feedbackId}/upvote`, {
        method: 'PATCH',
      });

      const json = await res.json();

      if (res.ok && json.success) {
        const updatedFeedback = json.data;

        setFeedbackList(prevList =>
          prevList.map(feedback =>
            feedback._id === updatedFeedback._id
              ? { ...feedback, upvotes: updatedFeedback.upvotes }
              : feedback
          )
        );

        if (selectedFeedback?._id === updatedFeedback._id) {
          setSelectedFeedback(prev => ({
            ...prev,
            upvotes: updatedFeedback.upvotes,
            replies: prev.replies || [],
            comments: prev.comments ?? 0
          }));
        }
      } else {
        alert(json.error);
      }
    } catch (error) {
      alert('Something went wrong');
    }
  }

  function handleNewReply(newReply) {
    setSelectedFeedback(prev => ({
      ...prev,
      replies: [...(prev.replies || []), newReply]
    }));

    setFeedbackList(prevList =>
      prevList.map(item =>
        item._id === selectedFeedback._id
          ? { ...item, comments: (item.comments || 0) + 1 }
          : item
      )
    );
  }


  const handleFeedbackSelect = (feedback) => {
    setSelectedFeedback(feedback);
  };

  const handleCreateFeedback = () => {
    console.log('Open create feedback modal');
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        allTags={allTags}
        selectedTags={selectedTags}
        onTagsChange={setSelectedTags}
        currentView={currentView}
        onViewChange={setCurrentView}
        onCreateFeedback={handleCreateFeedback}
      />

      {/* Feedback List Column */}
      <div className="w-[25%] min-w-[280px] border-r border-border flex flex-col">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h2 className="text-foreground text-lg font-bold">
            Feedbacks ({feedbackList.length})
          </h2>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1 px-2 py-2 text-xs text-primary font-semibold hover:text-foreground transition">
              <User className="h-4 w-4" />
              Sign In
            </button>

            <Link
              onClick={handleCreateFeedback}
              href="/feedback/new"
              className="flex items-center gap-1 bg-primary text-white font-semibold px-3 py-2 rounded-md text-xs hover:opacity-90 transition"
            >
              <Plus className="h-4 w-4" />
              New
            </Link>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          {loadingList && <p className="p-4">Loading feedbacks...</p>}
          {error && <p className="p-4 text-red-500">{error}</p>}
          {!loadingList && !error && (
            <FeedbackList
              feedback={feedbackList}
              selectedFeedback={selectedFeedback}
              onFeedbackSelect={handleFeedbackSelect}
              onUpVote={onUpVote}
            />
          )}
        </div>
      </div>

      {/* Feedback Details Column */}
      <div className="flex-1">
        {loadingDetails && <p className="p-4">Loading feedback details...</p>}
        {!loadingDetails && (
          <FeedbackDetails
            selectedFeedback={selectedFeedback}
            upvotes={selectedFeedback?.upvotes}
            onUpVote={() => onUpVote(selectedFeedback._id)}
            onNewReply={handleNewReply}
          />
        )}
      </div>
    </div>
  );
}
