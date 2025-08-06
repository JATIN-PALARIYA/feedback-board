'use client';

import React from 'react';
import { MessageCircle, ArrowUp } from 'lucide-react';

export default function FeedbackList({ feedback, selectedFeedback, onFeedbackSelect }) {
    const getStatusColor = (status) => {
        if (!status) return 'text-muted-foreground border-muted';
        switch (status.toLowerCase()) {

            case 'high priority':
            case 'critical':
                return 'text-destructive border-destructive';
            case 'in progress':
                return 'text-primary border-primary';
            case 'planned':
                return 'text-secondary border-secondary';
            case 'under review':
                return 'text-muted-foreground border-muted';
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
                            className={`mb-3 p-4 rounded-xl cursor-pointer min-h-[140px] flex flex-col justify-between transition-all border 
                ${isSelected ? 'bg-muted border-primary text-primary' : 'hover:bg-muted text-foreground border-border'}`}
                        >
                            <div className="flex justify-between items-start">
                                {/* Title, Description, Meta */}
                                <div className="flex-1">
                                    <h3 className="font-semibold text-base leading-snug">{item.title}</h3>
                                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
                                    <p className="text-xs text-muted-foreground mt-2">
                                        by {item.author} • {new Date(item.date).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                        })}
                                    </p>
                                </div>

                                {/* Status as colored text */}
                                <span
                                    className={`text-xs font-semibold px-2 py-1 border rounded-full ${getStatusColor(
                                        item.status
                                    )}`}
                                >
                                    {item.status}
                                </span>
                            </div>

                            {/* Tags */}
                            <div className="mt-3 flex flex-wrap gap-1">
                                {item.tags.slice(0, 2).map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-[11px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full"
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

                            {/* Footer: Votes and Comments */}
                            <div className="mt-4 flex justify-end gap-4 text-xs text-muted-foreground">
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
                    );
                })
            )}
        </div>
    );
}
