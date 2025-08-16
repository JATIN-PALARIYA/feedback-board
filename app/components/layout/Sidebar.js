'use client';

import React from 'react';
import Link from 'next/link';
import { Search, Inbox, Archive, MessageSquare, Plus, X } from 'lucide-react';

export default function Sidebar({
  searchQuery,
  onSearchChange,
  allTags,
  selectedTags,
  onTagsChange,
  currentView,
  onViewChange,
  onCreateFeedback
}) {
  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter((t) => t !== tag));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  const menuItems = [
    { id: 'inbox', label: 'Inbox', icon: Inbox },
    { id: 'my-feedbacks', label: 'My Feedbacks', icon: MessageSquare },
    { id: 'following', label: 'Following', icon: Archive } 
  ];


  return (
    <div className="h-screen w-[15%] min-w-[200px] flex flex-col bg-sidebar border-r border-sidebar-border">
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare className="h-5 w-5 text-sidebar-primary" />
          <h1 className="font-medium text-sidebar-foreground">FeedbackHub</h1>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-8 -translate-y-1/2 size-4 text-muted-foreground cursor-pointer" />
          <input
            type="text"
            placeholder="Search feedback..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 w-full py-2 mt-3 text-sm rounded-md bg-input-background border border-input text-foreground"
          />
          {searchQuery && (
            <X
              className="absolute right-3 bottom-2 size-5 text-muted-foreground cursor-pointer"
              onClick={() => onSearchChange('')}
            />
          )}
        </div>

      </div>

      {/* Create Feedback Button */}
      <div className="p-4 border-b border-sidebar-border">
        <Link
          onClick={onCreateFeedback}
          href="/feedback/new"
          className="w-full flex items-center gap-2 text-sm h-9 px-3 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition"
        >
          <Plus className="h-4 w-4" />
          New Feedback
        </Link>
      </div>

      {/* Navigation */}
      <div className="p-4 border-b border-sidebar-border space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center text-primary font-semibold gap-2 text-sm h-9 px-3 py-2 rounded-md transition ${isActive
                ? 'bg-secondary text-secondary-foreground'
                : 'hover:bg-muted text-muted-foreground'
                }`}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Tags */}
      <div className="flex-1 p-4 overflow-y-auto">
        <h3 className="text-sm font-medium text-sidebar-foreground mb-3">Filter by Tags</h3>
        <div className="flex flex-row gap-y-3 gap-x-2 flex-wrap mt-5">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`text-xs px-2 py-1 text-primary font-semibold w-fit rounded-md transition ${selectedTags.includes(tag)
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-sidebar-accent'
                }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {selectedTags.length > 0 && (
          <button
            onClick={() => onTagsChange([])}
            className="mt-4 text-xs text-muted-foreground hover:text-sidebar-foreground"
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}
