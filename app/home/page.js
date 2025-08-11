'use client';

import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import FeedbackListContainer from '../components/FeedbackListContainer';
import FeedbackDetailsContainer from '../components/FeedbackDetailsContainer';
import Footer from '../components/Footer';
import { AuthProvider } from '../context/AuthContext';
import useFeedback from '../hooks/useFeedback';

export default function Home() {
  // Filters and selected feedback state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [currentView, setCurrentView] = useState('inbox');
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  // Use custom hook for feedback list fetching & state
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

  // Select feedback for details view
  const handleFeedbackSelect = (feedback) => setSelectedFeedback(feedback);

  // Handle upvote: update feedback list and selected feedback
  async function handleUpVote(id) {
    try {
      const res = await fetch(`/api/feedback/${id}/upvote`, { method: 'PATCH' });
      const json = await res.json();

      if (!res.ok) throw new Error(json.error || 'Upvote failed');

      // Update list locally
      setFeedbackList(prev =>
        prev.map(item => (item._id === id ? { ...item, upvotes: json.data.upvotes } : item))
      );

      // Update selected feedback if it's the one upvoted
      if (selectedFeedback?._id === id) {
        setSelectedFeedback(prev => ({ ...prev, upvotes: json.data.upvotes }));
      }

      return json.data;
    } catch (err) {
      console.error(err);
    }
  }

  // Handle new reply: update comments count and replies in selected feedback & list
  function handleNewReply(newReplyObj, newRepliesCount) {
    if (!selectedFeedback?._id) return;

    // Update comments count in feedback list
    setFeedbackList(prev =>
      prev.map(fb => (fb._id === selectedFeedback._id ? { ...fb, comments: newRepliesCount } : fb))
    );

    // Update selected feedback replies and comments count
    setSelectedFeedback(prev => ({
      ...prev,
      comments: newRepliesCount,
      replies: [...(prev?.replies || []), newReplyObj],
    }));
  }

  // Placeholder for new feedback creation (e.g. navigation)
  function handleCreateFeedback() {
    console.log('Create feedback clicked');
  }

  return (
    <AuthProvider>
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
            onCreateFeedback={handleCreateFeedback}
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
    </AuthProvider>
  );
}
