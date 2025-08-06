'use client';

import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import FeedbackList from './components/FeedbackList';
import FeedbackDetails from './components/FeedbackDetails';
import { User, Plus, MessageSquare, ArrowUp } from 'lucide-react';

export default function Page() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [currentView, setCurrentView] = useState('inbox');
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  const allTags = ['UI', 'Bug', 'Feature Request'];

  const dummyFeedback = [
    {
      id: 1,
      title: 'Fix button alignment',
      description: 'It would be great to have a dark theme option for better usability in low-light environments. This would help reduce eye strain during extended usage sessions and provide a more modern interface experience.',
      author: 'Jatin',
      date: 'Aug 6, 2025',
      tags: ['Bug'],
      upvotes: 10,
      comments: 3
    },
    {
      id: 2,
      title: 'Fix button alignment',
      description: 'It would be great to have a dark theme option for better usability in low-light environments. This would help reduce eye strain during extended usage sessions and provide a more modern interface experience.',
      author: 'Jatin H',
      date: 'Aug 6, 2025',
      tags: ['Bug', 'UI'],
      upvotes: 10,
      comments: 3
    }
  ];

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
        {/* Header above the feedback list */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h2 className="text-foreground text-lg font-bold">
            Feedbacks ({dummyFeedback.length})
          </h2>

          <div className="flex items-center gap-3">
            {/* Sign In */}
            <button className="flex items-center gap-1 px-2 py-2 text-xs text-primary font-semibold hover:text-foreground transition">
              <User className="h-4 w-4" />
              Sign In
            </button>

            {/* New Feedback */}
            <button
              onClick={handleCreateFeedback}
              className="flex items-center gap-1 bg-primary text-white font-semibold px-3 py-2 rounded-md text-xs hover:opacity-90 transition"
            >
              <Plus className="h-4 w-4" />
              New
            </button>
          </div>
        </div>

        {/* Feedback List below the header */}
        <div className="flex-1 overflow-auto">
          <FeedbackList
            feedback={dummyFeedback}
            selectedFeedback={selectedFeedback}
            onFeedbackSelect={setSelectedFeedback}
          />
        </div>
      </div>

      {/* Feedback Details Column */}
      <div className="flex-1">
        <FeedbackDetails selectedFeedback={selectedFeedback} />
      </div>
    </div>
  );
}
