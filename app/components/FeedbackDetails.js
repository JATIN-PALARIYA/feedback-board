'use client';

import React from 'react';
import { ArrowUp, MessageCircle, User, Archive, Clock } from 'lucide-react';

export default function FeedbackDetails() {
    return (
        <div className="h-full flex flex-col">
            {/* Top Header Section */}
            <div className="p-6 border-b border-border space-y-4">
                {/* Title and Status */}
                <div className="flex justify-between items-start">
                    <h1 className="text-xl font-medium text-foreground">
                        Feedback Title Goes Here
                    </h1>
                    <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-1 border rounded-full text-secondary border-secondary">
                            Status
                        </span>
                        <button className="text-xs px-3 py-1 border rounded hover:bg-muted transition text-muted-foreground">
                            <Archive className="w-4 h-4 inline mr-1" />
                            Archive
                        </button>
                    </div>
                </div>

                {/* Author and Date */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>Author Name</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>Aug 7, 2025</span>
                    </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">UI</span>
                    <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">Bug</span>
                </div>

                {/* Upvote and Comments */}
                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1 px-3 py-1 rounded border text-sm text-muted-foreground hover:bg-muted">
                        <ArrowUp className="w-4 h-4" />
                        12
                    </button>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MessageCircle className="w-4 h-4" />
                        4 Replies
                    </div>
                </div>
            </div>

            {/* Description and Replies */}
            <div className="flex-1 overflow-auto p-6 space-y-10">
                {/* Description */}
                <div>
                    <h2 className="text-base font-medium mb-2">Description</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        This is a sample description for the selected feedback item.
                    </p>
                </div>

                {/* Discussion Section */}
                <div className="space-y-6">
                    <h2 className="text-base font-medium">Discussion (2)</h2>

                    {/* Individual Reply (repeat this block) */}
                    <div className="border p-4 rounded-lg space-y-2">
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <User className="w-4 h-4" />
                            <span className="font-medium text-foreground">Commenter Name</span>
                            <span>•</span>
                            <span>Aug 7</span>
                        </div>
                        <p className="text-sm text-foreground">
                            This is a reply comment about the feedback...
                        </p>
                    </div>

                    {/* Another reply */}
                    <div className="border p-4 rounded-lg space-y-2">
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <User className="w-4 h-4" />
                            <span className="font-medium text-foreground">Another User</span>
                            <span>•</span>
                            <span>Aug 6</span>
                        </div>
                        <p className="text-sm text-foreground">
                            Another opinion or follow-up reply from a different person.
                        </p>
                    </div>
                </div>

                {/* Reply Box */}
                <div className="space-y-3">
                    <label className="text-sm font-medium">Add a Reply</label>
                    <textarea
                        className="w-full h-24 p-2 border rounded resize-none text-sm text-foreground"
                        placeholder="Type your reply here..."
                    ></textarea>
                    <div className="flex justify-end">
                        <button className="bg-primary text-white px-4 py-1.5 rounded text-sm hover:opacity-90 transition">
                            Post Reply
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
