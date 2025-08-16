'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp, MessageCircle, User, Archive, Clock } from 'lucide-react';
import { getStatusColor } from '@/api/feedback/utils/statusColors';
import Loader from '@/components/ui/Loader';
import { useAuth } from '@/context/AuthContext';

export default function FeedbackDetails({ selectedFeedback, onUpVote, onNewReply }) {
    const { user } = useAuth();

    const [replies, setReplies] = useState([]);
    const [newReply, setNewReply] = useState('');
    const [loadingReply, setLoadingReply] = useState(false);
    const [loadingReplies, setLoadingReplies] = useState(false);

    // Map replies whenever selectedFeedback changes
    useEffect(() => {
        if (!selectedFeedback) return;
        setLoadingReplies(true);

        const mappedReplies = (selectedFeedback.replies || []).map(reply => ({
            ...reply,
            authorName: reply.authorName || reply.authorId?.username || 'Anonymous'
        }));

        setReplies(mappedReplies);
        setLoadingReplies(false);
    }, [selectedFeedback]);

    if (!selectedFeedback) {
        return (
            <div className="h-full flex items-center justify-center text-muted-foreground">
                Please select a feedback to view details
            </div>
        );
    }

    const hasUpvoted = !!(user && selectedFeedback?.upvotedBy?.includes(user.id));

    // Handle posting a new reply
    async function handleSubmitReply() {
        if (!newReply.trim()) return;
        setLoadingReply(true);

        try {
            const res = await fetch(`/api/feedback/${selectedFeedback._id}/reply`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: newReply,
                    parentReplyId: null,
                    authorId: user?.id,
                }),
            });

            const json = await res.json();
            if (res.ok && json.success) {
                const newReplyObj = {
                    ...json.data.reply,
                    authorName: user.username || 'Anonymous' // immediate display
                };
                setReplies(prev => [...prev, newReplyObj]);
                setNewReply('');
                onNewReply?.(newReplyObj, json.data.repliesCount);
            } else {
                alert(json.error || 'Failed to post reply');
            }
        } catch (error) {
            console.error(error);
            alert('Something went wrong while posting the reply.');
        } finally {
            setLoadingReply(false);
        }
    }

    return (
        <div className="h-full flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-border space-y-4">
                <div className="flex justify-between items-start">
                    <h1 className="text-2xl font-medium text-foreground">{selectedFeedback.title}</h1>
                    <div className="flex items-center gap-3">
                        {selectedFeedback.status && (
                            <span
                                className={`text-xs px-2 py-1 border rounded-md text-primary font-semibold ${getStatusColor(selectedFeedback.status)}`}
                            >
                                {selectedFeedback.status}
                            </span>
                        )}
                        <button className="text-sm px-3 py-1 rounded-md hover:bg-muted border border-primary transition text-primary font-semibold">
                            <Archive className="w-4 h-4 inline mr-1" /> Following
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-4 text-base text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{selectedFeedback.author?.username || 'Anonymous'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">
                            {new Date(selectedFeedback.createdAt).toLocaleDateString('en-US', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                            })}
                        </span>
                    </div>
                </div>

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

                <div className="flex items-center gap-4">
                    <button
                        className={`flex items-center gap-1 px-3 py-1 rounded-md text-sm font-semibold transition
                        ${hasUpvoted ? 'bg-primary text-white' : 'text-primary hover:bg-muted'}`}
                        onClick={onUpVote}
                        disabled={!user || user.isGuest}
                        title={!user ? 'Log in to upvote' : user.isGuest ? 'Guests cannot upvote' : ''}
                    >
                        <ArrowUp className="w-4 h-4" /> {selectedFeedback.upvotes ?? 0}
                    </button>

                    <div className="flex items-center gap-1 text-sm text-primary">
                        <MessageCircle className="w-4 h-4" /> {replies.length} Replies
                    </div>
                </div>
            </div>

            {/* Description & Replies */}
            <div className="flex-1 overflow-auto p-6 space-y-10">
                <div>
                    <h2 className="text-xl font-medium mb-2">Description</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        {selectedFeedback.description}
                    </p>
                </div>

                <div className="space-y-6">
                    <h2 className="text-lg font-medium">Discussion ({replies.length})</h2>
                    {loadingReplies ? (
                        <div className="flex justify-center py-6">
                            <Loader type="spinner" />
                        </div>
                    ) : replies.length === 0 ? (
                        <p className="text-sm text-muted-foreground">No replies yet.</p>
                    ) : (
                        replies.map((reply, index) => (
                            <div
                                key={reply._id || `${selectedFeedback._id}-reply-${index}`}
                                className="border p-4 rounded-lg space-y-2"
                            >
                                <div className="flex items-start gap-3">
                                    <User className="w-8 h-8 p-2 text-primary bg-muted rounded-full" />
                                    <div className="leading-[1.1]">
                                        <span className="block font-semibold text-primary">
                                            {reply.authorName || 'Anonymous'}
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                            {new Date(reply.createdAt || Date.now()).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                                <p className="text-sm text-foreground">{reply.message}</p>
                            </div>
                        ))
                    )}
                </div>

                {/* Reply box */}
                {user && !user.isGuest ? (
                    <div className="space-y-2 border border-border px-5 py-2 rounded-md">
                        <label className="text-sm font-medium">Add a Reply</label>
                        <textarea
                            className="w-full h-20 p-2 mt-1 border bg-muted rounded-md resize-none text-sm text-foreground"
                            placeholder="Type your reply here..."
                            value={newReply}
                            onChange={(e) => setNewReply(e.target.value)}
                        />
                        <div className="flex justify-end">
                            <button
                                onClick={handleSubmitReply}
                                disabled={loadingReply}
                                className="bg-primary mt-1 text-white px-4 py-1.5 rounded-md text-sm hover:opacity-90 transition flex items-center gap-2"
                            >
                                {loadingReply && <Loader size={16} type="spinner" />}
                                {loadingReply ? 'Posting...' : 'Post Reply'}
                            </button>
                        </div>
                    </div>
                ) : (
                    <p className="space-y-2 text-center border border-border px-5 py-3 rounded-md">
                        Please log in to upvote or reply.
                    </p>
                )}
            </div>
        </div>
    );
}
