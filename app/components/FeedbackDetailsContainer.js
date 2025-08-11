import React, { useEffect, useState, useRef } from 'react';
import FeedbackDetails from './FeedbackDetails';

export default function FeedbackDetailsContainer({ feedbackId, onNewReply, onUpVote }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const mounted = useRef(false);

    useEffect(() => {
        mounted.current = true;

        if (!feedbackId) {
            setData(null);
            return;
        }

        (async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(`/api/feedback/${feedbackId}`);
                const json = await res.json();
                if (!res.ok) throw new Error(json.error || 'Failed to fetch details');
                if (mounted.current) setData({ ...json.data.feedback, replies: json.data.replies });
            } catch (err) {
                if (mounted.current) setError(err.message);
            } finally {
                if (mounted.current) setLoading(false);
            }
        })();

        return () => {
            mounted.current = false;
        };
    }, [feedbackId]);

    // handleUpVote now checks mounted.current instead of mounted
    const handleUpVote = async () => {
        if (!onUpVote) return;

        const updated = await onUpVote(feedbackId);
        if (updated && mounted.current) {
            setData(prev => prev ? { ...prev, upvotes: updated.upvotes } : prev);
        }
    };

    const handleNewReply = (newReplyObj, updatedRepliesCount) => {
        setData(prev => {
            if (!prev) return prev;
            return {
                ...prev,
                replies: [...prev.replies, newReplyObj],
                comments: updatedRepliesCount,
            };
        });

        if (onNewReply) {
            onNewReply(newReplyObj, updatedRepliesCount);
        }
    };

    if (loading) return <p className="p-4">Loading feedback details...</p>;
    if (error) return <p className="p-4 text-red-500">{error}</p>;

    return (
        <FeedbackDetails
            selectedFeedback={data}
            upvotes={data?.upvotes}
            onUpVote={handleUpVote}
            onNewReply={handleNewReply}
        />

    );
}
