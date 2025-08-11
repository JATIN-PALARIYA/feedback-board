'use client';

import React from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import FeedbackList from './FeedbackList';
import AuthManager from './AuthManager';

export default function FeedbackListContainer({
    feedbackList = [],
    loadingList,
    error,
    selectedFeedback,
    handleFeedbackSelect,
    onUpVote,
    handleCreateFeedback,
}) {
    return (
        <div className="w-[25%] min-w-[280px] border-r border-border flex flex-col">
            <div className="p-4 border-b border-border flex items-center justify-between">
                <h2 className="text-foreground text-lg font-bold">
                    Feedbacks ({feedbackList.length})
                </h2>

                <div className="flex items-center gap-3">
                    <AuthManager />
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
    );
}
