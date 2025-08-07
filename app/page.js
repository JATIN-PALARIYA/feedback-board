'use client';

import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import FeedbackList from './components/FeedbackList';
import FeedbackDetails from './components/FeedbackDetails';
import { User, Plus } from 'lucide-react';

export default function Page() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [currentView, setCurrentView] = useState('inbox');
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  const allTags = [
    // Core Tags
    'Bug',
    'Feature Request',
    'Improvement',
    'UI',
    'UX',
    'Performance',
    'Accessibility',

    // Other Useful Tags
    'Dark Mode',
    'Notifications',
    'Dashboard',
    'Comments',
    'Search',
    'Authentication',
    'Onboarding',
    'Settings',
    'Navigation',
    'Forms',
    'API'];

  const dummyFeedback = [
    {
      id: 1,
      title: 'Fix button alignment',
      description: 'It would be great to have a dark theme option for better usability in low-light environments. This would help reduce eye strain during extended usage sessions and provide a more modern interface experience.',
      author: 'Jatin',
      date: 'Aug 6, 2025',
      tags: ['Bug'],
      upvotes: 10,
      comments: 3,
      status: 'Planned'
    },
    {
      id: 2,
      title: 'Fix button alignment',
      description:
        'It would be great to have a dark theme option for better usability in low-light environments. This would help reduce eye strain during extended usage sessions and provide a more modern interface experience.',
      author: 'Jatin H',
      date: 'Aug 6, 2025',
      tags: ['Bug', 'UI'],
      upvotes: 10,
      comments: 3,
      status: 'Planned',
    },
    {
      id: 3,
      title: 'Add dark mode support',
      description:
        'Dark mode would be a nice feature to help users with sensitivity to bright light. It should be toggleable from settings.',
      author: 'Aryan S',
      date: 'Aug 5, 2025',
      tags: ['Feature Request', 'UI'],
      upvotes: 25,
      comments: 7,
      status: 'In Progress',
    },
    {
      id: 4,
      title: 'Improve mobile responsiveness',
      description:
        'The app layout breaks on smaller screens. Cards overflow and buttons are too close together. Needs media queries.',
      author: 'Meera K',
      date: 'Aug 5, 2025',
      tags: ['Bug'],
      upvotes: 15,
      comments: 4,
      status: 'High Priority',
    },
    {
      id: 5,
      title: 'Search bar optimization',
      description:
        'The current search feature is slow and sometimes unresponsive. Debounce input and improve the filtering algorithm.',
      author: 'Ravi G',
      date: 'Aug 4, 2025',
      tags: ['Feature Request'],
      upvotes: 18,
      comments: 2,
      status: 'Under Review',
    },
    {
      id: 6,
      title: 'Add comment edit option',
      description:
        'It would be helpful to allow users to edit their comments for typo fixes or clarifications without deleting them.',
      author: 'Tanya P',
      date: 'Aug 4, 2025',
      tags: ['Feature Request', 'UX'],
      upvotes: 21,
      comments: 6,
      status: 'Planned',
    },
    {
      id: 7,
      title: 'Fix tag filtering bug',
      description:
        'When multiple tags are selected, the filtering doesn’t show the correct results. Possibly a logic issue in AND vs OR filtering.',
      author: 'Manish V',
      date: 'Aug 3, 2025',
      tags: ['Bug'],
      upvotes: 9,
      comments: 1,
      status: 'Critical',
    },
    {
      id: 8,
      title: 'Add keyboard accessibility',
      description:
        'Some interactive components are not accessible via keyboard. Ensure buttons and inputs follow accessibility standards.',
      author: 'Divya R',
      date: 'Aug 3, 2025',
      tags: ['Feature Request', 'Accessibility'],
      upvotes: 14,
      comments: 5,
      status: 'In Progress',
    },
    {
      id: 9,
      title: 'Notification preferences',
      description:
        'Users should be able to choose which types of notifications they receive, such as mentions or replies.',
      author: 'Rahul N',
      date: 'Aug 2, 2025',
      tags: ['Feature Request'],
      upvotes: 19,
      comments: 3,
      status: 'Planned',
    },
    {
      id: 10,
      title: 'Fix layout issue on Safari',
      description:
        'UI components appear misaligned on Safari browser due to flexbox inconsistencies. Needs browser-specific handling.',
      author: 'Anjali T',
      date: 'Aug 2, 2025',
      tags: ['Bug', 'UI'],
      upvotes: 8,
      comments: 2,
      status: 'Under Review',
    },
    {
      id: 11,
      title: 'Add voting cooldown',
      description:
        'To prevent spamming, users should only be able to vote once every few seconds. This needs rate limiting.',
      author: 'Sahil P',
      date: 'Aug 1, 2025',
      tags: ['Feature Request'],
      upvotes: 17,
      comments: 4,
      status: 'Planned',
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
