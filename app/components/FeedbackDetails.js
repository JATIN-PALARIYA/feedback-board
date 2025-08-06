'use client';
import React from 'react';

export default function FeedbackDetails({ selectedFeedback }) {
    if (!selectedFeedback) {
        return (
            <div className="p-4 text-muted-foreground">
                <p>Select a feedback item to view details.</p>
            </div>
        );
    }

    return (
        <div className="p-6 flex flex-col gap-4 h-screen overflow-auto">
            <div>
                <h2 className="text-xl font-semibold">{selectedFeedback.title}</h2>
                <p className="text-sm text-muted-foreground mt-2">{selectedFeedback.description}</p>
                <p className="text-xs text-muted-foreground mt-2">
                    by {selectedFeedback.author} • {selectedFeedback.date}
                </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
                {selectedFeedback.tags.map((tag) => (
                    <span
                        key={tag}
                        className="text-[11px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full"
                    >
                        {tag}
                    </span>
                ))}
            </div>

            {/* Votes */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>👍 {selectedFeedback.upvotes}</span>
                <span>💬 {selectedFeedback.comments}</span>
            </div>

            {/* Placeholder for replies */}
            <div className="mt-6">
                <h3 className="text-sm font-semibold mb-2">Comments</h3>
                <p className="text-muted-foreground text-sm">Coming soon...</p>
            </div>
        </div>
    );
}
