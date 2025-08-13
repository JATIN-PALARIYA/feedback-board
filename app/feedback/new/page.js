'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const initialTags = [
    'Bug', 'Feature Request', 'Improvement', 'UI', 'UX', 'Performance',
    'Accessibility', 'Dark Mode', 'Notifications', 'Dashboard', 'Comments',
    'Search', 'Authentication', 'Onboarding', 'Settings', 'Navigation',
    'Forms', 'API'
];

export default function NewFeedbackForm() {
    const router = useRouter()
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('Planned');
    const [allTags, setAllTags] = useState(initialTags);
    const [selectedTags, setSelectedTags] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [showAddTagInput, setShowAddTagInput] = useState(false);
    const [newTagInput, setNewTagInput] = useState('');

    function toggleTag(tag) {
        setSelectedTags(prev =>
            prev.includes(tag)
                ? prev.filter(t => t !== tag)
                : [...prev, tag]
        );
    }

    function handleAddTag() {
        const trimmedTag = newTagInput.trim();
        if (!trimmedTag) return;

        if (!allTags.includes(trimmedTag)) {
            setAllTags(prev => [...prev, trimmedTag]);
        }
        if (!selectedTags.includes(trimmedTag)) {
            setSelectedTags(prev => [...prev, trimmedTag]);
        }

        setNewTagInput('');
        setShowAddTagInput(false);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);

        if (!title.trim() || !description.trim()) {
            setError("Title and Description are required");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch('/api/feedback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title,
                    description,
                    status,
                    tags: selectedTags,
                    author: "Guest User"
                }),
            });

            const json = await res.json();
            if (res.ok && json.success) {
                alert('Feedback created successfully!');
                // Reset form or redirect as needed
                setTitle('');
                setDescription('');
                setStatus('');
                setSelectedTags([]);
                router.push('/home');
            } else {
                setError(json.error || 'Failed to create feedback');
            }
        } catch (err) {
            setError('Unexpected error occurred');
        }
        setLoading(false);
    }

    return (
        <div className="max-w-xl mx-auto p-6 bg-background rounded-md shadow-md">
            <h1 className="text-2xl font-semibold mb-6">Create New Feedback</h1>

            {error && <p className="mb-4 text-red-600">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-foreground mb-1">
                        Title <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        className="w-full border border-border rounded px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Enter feedback title"
                    />
                </div>

                {/* Description */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-foreground mb-1">
                        Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        id="description"
                        rows={4}
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        className="w-full border border-border rounded px-3 py-2 text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Describe your feedback in detail"
                    />
                </div>

                {/* Status */}
                <div>
                    <label htmlFor="status" className="block text-sm font-medium text-foreground mb-1">
                        Status
                    </label>
                    <select
                        id="status"
                        value={status}
                        onChange={e => setStatus(e.target.value)}
                        className="w-full border border-border rounded px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        <option value="Planned">Planned</option>
                        <option value="In Progress">In Progress</option>
                    </select>
                </div>

                {/* Tags */}
                <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                        Select Tags
                    </label>
                    <div className="flex flex-wrap gap-2 items-center">
                        {allTags.map(tag => {
                            const selected = selectedTags.includes(tag);
                            return (
                                <button
                                    key={tag}
                                    type="button"
                                    onClick={() => toggleTag(tag)}
                                    className={`cursor-pointer px-3 py-1 rounded-full border text-sm font-semibold
                    ${selected
                                            ? 'bg-primary text-white border-primary'
                                            : 'border-border text-muted-foreground hover:bg-muted hover:text-foreground'}
                  `}
                                >
                                    {tag}
                                </button>
                            );
                        })}

                        {/* Add Tag Button and Input */}
                        {showAddTagInput ? (
                            <div className="flex items-center space-x-2">
                                <input
                                    type="text"
                                    value={newTagInput}
                                    onChange={e => setNewTagInput(e.target.value)}
                                    onKeyDown={e => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            handleAddTag();
                                        } else if (e.key === 'Escape') {
                                            setShowAddTagInput(false);
                                            setNewTagInput('');
                                        }
                                    }}
                                    placeholder="Add new tag"
                                    className="border border-border rounded-full px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                    autoFocus
                                />
                                <button
                                    type="button"
                                    onClick={handleAddTag}
                                    className="bg-primary text-white px-3 py-1 rounded-full hover:opacity-90 transition text-sm"
                                >
                                    Add
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowAddTagInput(false);
                                        setNewTagInput('');
                                    }}
                                    className="text-muted-foreground hover:text-foreground text-sm"
                                    title="Cancel"
                                >
                                    ✕
                                </button>
                            </div>
                        ) : (
                            <button
                                type="button"
                                onClick={() => setShowAddTagInput(true)}
                                className="cursor-pointer px-3 py-1 rounded-full border border-dashed border-border text-sm font-semibold text-muted-foreground hover:bg-muted hover:text-foreground"
                            >
                                + Add Tag
                            </button>
                        )}
                    </div>
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-primary text-white font-semibold px-5 py-2 rounded-md hover:opacity-90 transition disabled:opacity-50"
                    >
                        {loading ? 'Submitting...' : 'Submit Feedback'}
                    </button>
                </div>
            </form>
        </div>
    );
}
