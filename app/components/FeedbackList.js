'use client';

import React from 'react';
import { MessageCircle, ArrowUp } from 'lucide-react';

export default function FeedbackList({ feedback, selectedFeedback, onFeedbackSelect }) {
    const getStatusColor = (status) => {
        if (!status) return 'text-muted-foreground border-muted';
        switch (status.toLowerCase()) {
            case 'high priority':
            // return 'text'
            case 'critical':
                return 'text-white bg-destructive border-destructive';
            case 'in progress':
                return 'text-white bg-primary';
            case 'planned':
                return 'text-primary bg-secondary border-secondary';
            case 'under review':
                return 'text-primary border-secondary';
            default:
                return 'text-secondary border-border';
        }
    };

    return (
        <div className="h-full flex flex-col border-r border-border min-w-[25%] overflow-auto p-2">
            {feedback.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">
                    No feedback found matching your criteria.
                </div>
            ) : (
                feedback.map((item) => {
                    const isSelected = selectedFeedback?.id === item.id;
                    return (
                        <div
                            key={item.id}
                            onClick={() => onFeedbackSelect(item)}
                            className={`mb-3 p-4 rounded-xl cursor-pointer min-h-[140px] flex flex-col justify-around transition-all border
                ${isSelected ? 'border-primary text-primary' : 'hover:bg-muted text-foreground border-border'}`}
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
                                {item.tags.slice(0, 2).map((tag) => (
                                    <span
                                        key={tag}
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

                            {/* Footer: Author & Date (left), Vote & Comment (right) */}
                            <div className="mt-4 flex justify-between items-center text-xs text-muted-foreground">
                                <div>
                                    by {item.author} •{' '}
                                    {new Date(item.date).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric'
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
