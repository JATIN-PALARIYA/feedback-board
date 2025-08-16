'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';

export default function Profile({ isOpen, onClose }) {
    const { user, logout, loading } = useAuth();

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg max-w-md w-full p-6 relative mx-4">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none rounded"
                >
                    ✕
                </button>

                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1 text-center">
                    {user?.isGuest ? 'Hello Guest' : 'My Profile'}
                </h2>

                {loading ? (
                    <p className="text-center text-gray-500 mt-6">Loading...</p>
                ) : !user ? (
                    <p className="text-center text-gray-500 mt-6">
                        You need to log in to view your profile.
                    </p>
                ) : (
                    <>
                        <div className="bg-gray-100 dark:bg-gray-800 rounded p-4 mb-4">
                            <p><strong>Username:</strong> {user.isGuest ? 'Guest' : user.username}</p>
                            {!user.isGuest && user.email && <p><strong>Email:</strong> {user.email}</p>}
                            <p><strong>Account Type:</strong> {user.isGuest ? 'Guest (Limited Access)' : 'Registered'}</p>
                        </div>

                        <div className="bg-gray-100 dark:bg-gray-800 rounded p-4 mb-4">
                            <h3 className="font-semibold mb-2">My Feedback</h3>
                            {user.isGuest ? (
                                <p className="text-gray-500 text-sm">
                                    Guests cannot submit feedback. Please register to unlock this feature.
                                </p>
                            ) : (
                                <p className="text-gray-500 text-sm">
                                    Your submitted feedback will appear here (coming soon).
                                </p>
                            )}
                        </div>

                        <button
                            onClick={logout}
                            className="w-full flex items-center justify-center gap-2 text-sm h-9 px-3 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition"
                        >
                            Logout
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
