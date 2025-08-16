'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Plus, User } from 'lucide-react';
import FeedbackList from './FeedbackList';
import AuthManager from '@/components/auth/AuthManager';
import { useAuth } from '@/context/AuthContext';
import Profile from '@/components/profile/Profile.js';

export default function FeedbackListContainer({
    feedbackList = [],
    loadingList,
    error,
    selectedFeedback,
    handleFeedbackSelect,
    onUpVote,
    handleCreateFeedback,
}) {
    const { user } = useAuth();
    const [isProfileOpen, setProfileOpen] = useState(false);

    return (
        <div className="w-[25%] min-w-[280px] border-r border-border flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-border flex items-center justify-between">
                <h2 className="text-foreground text-lg font-bold">
                    Feedbacks ({feedbackList.length})
                </h2>

                <div className="flex items-center gap-3">
                    {user ? (
                        <>
                            <button
                                onClick={() => setProfileOpen(true)}
                                className="flex items-center gap-1 bg-white text-primary font-semibold px-3 py-2 rounded-md text-xs hover:opacity-90 transition border border-white hover:border-primary"
                            >
                                <User className="h-4 w-4" />
                                {user.isGuest ? 'Hello, Guest' : 'My Profile'}
                            </button>

                            <Profile
                                isOpen={isProfileOpen}
                                onClose={() => setProfileOpen(false)}
                            />
                        </>
                    ) : (
                        <AuthManager />
                    )}

                    {/* New Feedback Button */}
                    <Link
                        href="/feedback/new"
                        onClick={handleCreateFeedback}
                        className="flex items-center gap-1 bg-primary text-white font-semibold px-3 py-2 rounded-md text-xs hover:opacity-90 transition"
                    >
                        <Plus className="h-4 w-4" />
                        New
                    </Link>
                </div>
            </div>

            {/* Feedback List */}
            <div className="flex-1 overflow-auto">
                {loadingList && (
                    <div className="flex items-center justify-center h-full p-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent"></div>
                    </div>
                )}
                {error && <p className="p-4 text-red-500">{error}</p>}
                {!loadingList && !error && (
                    <FeedbackList
                        feedback={feedbackList}
                        selectedFeedback={selectedFeedback}
                        onFeedbackSelect={handleFeedbackSelect}
                        onUpVote={onUpVote}
                        user={user}
                    />
                )}
            </div>
        </div>
    );
}
