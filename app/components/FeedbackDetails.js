'use client';

import React, {useState, useEffect} from 'react';
import { ArrowUp, MessageCircle, User, Archive, Clock } from 'lucide-react';
import { getStatusColor } from '../api/feedback/utils/statusColors';

export default function FeedbackDetails({ selectedFeedback }) {
    const [replies, setReplies] = useState(selectedFeedback?.replies || []);
    const [newReply, setNewReply] = useState('')

    useEffect(() => {
        setReplies(selectedFeedback?.replies || []);
    }, [selectedFeedback]);      

    async function handleSubmitReply() {
        if (!newReply.trim()) return;

        try {
            const res = await fetch(`/api/feedback/${selectedFeedback._id}/reply`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: newReply }),
            });

            const json = await res.json();

            if (res.ok && json.success) {
                setReplies(prev => [...prev, json.data]);

                setNewReply('');
            }
            else {
                alert(json.error)
            }
        } catch (error) {
            alert(json.error)
        }
    }


    if (!selectedFeedback) {
        return (
            <div className="h-full flex items-center justify-center text-muted-foreground">
                Please select a feedback from the list
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col">
            {/* Top Header Section */}
            <div className="p-6 border-b border-border space-y-4">
                {/* Title and Status */}
                <div className="flex justify-between items-start">
                    <h1 className="text-2xl font-medium text-foreground">
                        {selectedFeedback.title}
                    </h1>
                    <div className="flex items-center gap-3">
                        {selectedFeedback.status && (
                            <span
                                className={`text-xs px-2 py-1 border rounded-md text-primary font-semibold ${getStatusColor(
                                    selectedFeedback.status
                                )}`}
                            >
                                {selectedFeedback.status}
                            </span>
                        )}
                        <button className="text-sm px-3 py-1 border rounded hover:bg-muted transition text-primary font-semibold">
                            <Archive className="w-4 h-4 inline mr-1" />
                            Archive
                        </button>
                    </div>
                </div>

                {/* Author and Date */}
                <div className="flex items-center gap-4 text-base text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{selectedFeedback.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span className='text-sm'>
                            {new Date(selectedFeedback.createdAt).toLocaleDateString('en-US',
                                {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                }
                            )}
                        </span>
                    </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                    {selectedFeedback.tags?.map((tag, index) => (
                        <span
                            key={`${selectedFeedback._id}-tag-${index}`}
                            className="text-xs border border-border text-primary font-semibold px-2 py-0.5 rounded-md"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Upvote and Comments */}
                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1 px-3 py-1 rounded-md border text-sm font-semibold text-primary hover:bg-muted">
                        <ArrowUp className="w-4 h-4" />
                        {selectedFeedback.upvotes ?? 0}
                    </button>
                    <div className="flex items-center gap-1 text-sm text-primary">
                        <MessageCircle className="w-4 h-4" />
                        {replies.length ?? 0} Replies
                    </div>
                </div>
            </div>

            {/* Description and Replies */}
            <div className="flex-1 overflow-auto p-6 space-y-10">
                {/* Description */}
                <div>
                    <h2 className="text-xl font-medium mb-2">Description</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        {selectedFeedback.description}
                    </p>
                </div>

                {/* Discussion Section */}
                <div className="space-y-6">
                    <h2 className="text-lg font-medium">
                        Discussion ({replies.length ?? 0})
                    </h2>

                    {/* Dynamic Replies */}
                    {replies.map((reply, index) => (
                        <div
                            key={reply._id || `${selectedFeedback._id}-reply-${index}`}
                            className="border p-4 rounded-lg space-y-2"
                        >
                            <div className="flex items-start gap-3">
                                <User className="w-8 h-8 p-2 text-primary bg-muted rounded-full" />
                                <div className="leading-[1.1]">
                                    <span className="block font-semibold text-primary">
                                        {reply.author}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                        {new Date(reply.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                            <p className="text-sm text-foreground">{reply.message}</p>
                        </div>
                    ))}
                </div>

                {/* Reply Box */}
                <div className="space-y-3 border border-border px-5 py-3 rounded-md">
                    <label className="text-sm font-medium">Add a Reply</label>
                    <div>
                        <textarea
                            className="w-full h-20 p-2 mt-1 border bg-muted rounded-md resize-none text-sm text-foreground"
                            placeholder="Type your reply here..."
                            value={newReply}
                            onChange={(e) => setNewReply(e.target.value)}
                        ></textarea>
                        <div className="flex justify-end">
                            <button
                                onClick={handleSubmitReply}
                                className="bg-primary mt-1 text-white px-4 py-1.5 rounded-md text-sm hover:opacity-90 transition">
                                Post Reply
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
