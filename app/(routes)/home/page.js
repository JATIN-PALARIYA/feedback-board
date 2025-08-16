'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import FeedbackListContainer from '@/components/feedback/FeedbackListContainer';
import FeedbackDetailsContainer from '@/components/feedback/FeedbackDetailsContainer';
import Footer from '@/components/layout/Footer';
import useFeedback from '@/hooks/useFeedback';
import ProtectedRoute from '@/components/ui/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';

export default function Home() {
  const { user } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [currentView, setCurrentView] = useState('inbox');
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  const {
    list: feedbackList,
    setList: setFeedbackList,
    loading: loadingList,
    error,
  } = useFeedback({ searchQuery, selectedTags, view: currentView });

  const allTags = [
    'Bug', 'Feature Request', 'Improvement', 'UI', 'UX', 'Performance', 'Accessibility',
    'Dark Mode', 'Notifications', 'Dashboard', 'Comments', 'Search',
    'Authentication', 'Onboarding', 'Settings', 'Navigation', 'Forms', 'API',
  ];

  const handleFeedbackSelect = (feedback) => setSelectedFeedback(feedback);

  async function handleUpVote(_id) {
    if (!user) {
      alert('Please log in to upvote.');
      return;
    }
    if (user.isGuest) {
      alert('Guests cannot upvote.');
      return;
    }

    try {
      const res = await fetch(`/api/feedback/${_id}/upvote`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ authorId: user.id, isGuest: user.isGuest }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Upvote failed');

      setFeedbackList(prev =>
        prev.map(item =>
          item._id === _id
            ? {
              ...item,
              upvotes: json.data.upvotes,
              hasUpvoted: json.alreadyUpvoted
            }
            : item
        )
      );

      if (selectedFeedback?._id === _id) {
        setSelectedFeedback(prev => ({
          ...prev,
          upvotes: json.data.upvotes,
          hasUpvoted: json.alreadyUpvoted
        }));
      }

      return json.data;
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }


  function handleNewReply(newReplyObj, newRepliesCount) {
    if (!selectedFeedback?._id) return;

    setFeedbackList(prev =>
      prev.map(fb =>
        fb._id === selectedFeedback._id
          ? { ...fb, comments: newRepliesCount }
          : fb
      )
    );

    setSelectedFeedback(prev => ({
      ...prev,
      comments: newRepliesCount,
      replies: [...(prev?.replies || []), newReplyObj],
    }));
  }

  function handleCreateFeedback() {
    console.log('Create feedback clicked');
  }

  return (
    <ProtectedRoute>
      <div className="flex flex-col h-screen">
        <div className="flex flex-1 overflow-hidden">
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

          <FeedbackListContainer
            feedbackList={feedbackList}
            loadingList={loadingList}
            error={error}
            selectedFeedback={selectedFeedback}
            handleFeedbackSelect={handleFeedbackSelect}
            onUpVote={handleUpVote}
            handleCreateFeedback={handleCreateFeedback}
          />

          <div className="flex-1 overflow-auto">
            <FeedbackDetailsContainer
              feedbackId={selectedFeedback?._id}
              onNewReply={handleNewReply}
              onUpVote={handleUpVote}
            />
          </div>
        </div>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}
