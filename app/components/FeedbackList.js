'use client';

import React from 'react';
import { MessageCircle, ArrowUp } from 'lucide-react';
import { getStatusColor } from '../api/feedback/utils/statusColors';

export default function FeedbackList({ feedback, selectedFeedback, onFeedbackSelect, loading }) {
    return (
        <div className="h-full flex flex-col border-r border-border min-w-[25%] overflow-auto p-2">
            {loading ? (
                <div className="flex justify-center items-center h-full">
                    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
            ) : feedback.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">
                    No feedback found matching your criteria.
                </div>
            ) : (
                feedback.map((item) => {
                    const isSelected = selectedFeedback?._id === item._id;

                    return (
                        <div
                            key={item._id}
                            onClick={() => onFeedbackSelect(item)}
                            className={`mb-3 p-4 rounded-xl cursor-pointer min-h-[140px] flex flex-col justify-around transition-all border
                ${isSelected ? 'border-primary text-primary hover:bg-background' : 'text-foreground border-border hover:bg-muted'}`}
                        >
                            {/* Title + Status */}
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-semibold text-base leading-snug">{item.title}</h3>
                                {item.status && (
                                    <span
                                        className={`text-xs font-semibold px-2 py-1 border rounded-md whitespace-nowrap ${getStatusColor(
                                            item.status
                                        )}`}
                                    >
                                        {item.status}
                                    </span>
                                )}
                            </div>

                            {/* Description */}
                            <p className="text-sm text-muted-foreground line-clamp-2">
                                {item.description}
                            </p>

                            {/* Tags */}
                            <div className="mt-3 flex flex-wrap gap-2">
                                {item.tags.slice(0, 2).map((tag, index) => (
                                    <span
                                        key={`${item._id}-${tag}-${index}`}
                                        className="text-[11px] text-primary font-semibold px-2 py-0.5 rounded-md border border-accent-foreground"
                                    >
                                        {tag}
                                    </span>
                                ))}

                                {item.tags.length > 2 && (
                                    <span className="text-[11px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                                        +{item.tags.length - 2}
                                    </span>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="mt-4 flex justify-between items-center text-xs text-muted-foreground">
                                <div>
                                    {item.author} •{' '}
                                    {new Date(item.createdAt).toLocaleDateString('en-US', {
                                        day: 'numeric',
                                        month: 'short'
                                    })}
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-1">
                                        <ArrowUp className="h-3 w-3" />
                                        <span>{item.upvotes}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MessageCircle className="h-3 w-3" />
                                        <span>{item.comments}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
}
