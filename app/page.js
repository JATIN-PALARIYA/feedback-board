'use client';

import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import FeedbackList from './components/FeedbackList';
import FeedbackDetails from './components/FeedbackDetails';
import { User, Plus } from 'lucide-react';

export default function Page() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [currentView, setCurrentView] = useState('inbox');
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [feedbackList, setFeedbackList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const allTags = [
    'Bug', 'Feature Request', 'Improvement', 'UI', 'UX', 'Performance', 'Accessibility',
    'Dark Mode', 'Notifications', 'Dashboard', 'Comments', 'Search',
    'Authentication', 'Onboarding', 'Settings', 'Navigation', 'Forms', 'API'
  ];

  const handleCreateFeedback = () => {
    console.log('Open create feedback modal');
  };

  useEffect(() => {
    async function fetchFeedbacks() {
      setLoading(true);
      try {
        const res = await fetch('/api/feedback');
        const data = await res.json();
        if (res.ok) {
          setFeedbackList(data.data || []);
        } else {
          setError(data.error || 'Failed to fetch feedback');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchFeedbacks();
  }, []);

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

            <button
              onClick={handleCreateFeedback}
              className="flex items-center gap-1 bg-primary text-white font-semibold px-3 py-2 rounded-md text-xs hover:opacity-90 transition"
            >
              <Plus className="h-4 w-4" />
              New
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          {loading && <p className="p-4">Loading...</p>}
          {error && <p className="p-4 text-red-500">{error}</p>}
          {!loading && !error && (
            <FeedbackList
              feedback={feedbackList}
              selectedFeedback={selectedFeedback}
              onFeedbackSelect={setSelectedFeedback}
            />
          )}
        </div>
      </div>

      {/* Feedback Details Column */}
      <div className="flex-1">
        <FeedbackDetails selectedFeedback={selectedFeedback} />
      </div>
    </div>
  );
}
