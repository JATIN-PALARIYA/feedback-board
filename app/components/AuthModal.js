'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';

export default function AuthModal({ isOpen, onClose }) {
    const { login } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    // Sign in form state
    const [signInEmail, setSignInEmail] = useState('');
    const [signInPassword, setSignInPassword] = useState('');

    // Sign up form state
    const [signUpName, setSignUpName] = useState('');
    const [signUpEmail, setSignUpEmail] = useState('');
    const [signUpPassword, setSignUpPassword] = useState('');

    const [activeTab, setActiveTab] = useState('signin');
    const [error, setError] = useState('');

    const overlayRef = useRef(null);

    // Close modal on Escape
    useEffect(() => {
        function onKeyDown(e) {
            if (e.key === 'Escape') onClose();
        }
        if (isOpen) document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, [isOpen, onClose]);

    // Prevent background scroll
    useEffect(() => {
        if (isOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = '';
    }, [isOpen]);

    const onOverlayClick = (e) => {
        if (e.target === overlayRef.current) onClose();
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: signInEmail, password: signInPassword }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Login failed');
            login(data.user);
            onClose();
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: signUpName,
                    email: signUpEmail,
                    password: signUpPassword,
                }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Registration failed');
            login(data.user);
            onClose();
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGuestLogin = () => {
        login({ id: 'guest', name: 'Guest User', email: 'guest@example.com' });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div
            ref={overlayRef}
            onClick={onOverlayClick}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
            aria-modal="true"
            role="dialog"
        >
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg max-w-md w-full p-6 relative mx-4">
                {/* Close button */}
                <button
                    onClick={onClose}
                    aria-label="Close"
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 rounded"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1 text-center">
                    Welcome to FeedbackHub
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 text-center">
                    Sign in to your account or continue as a guest.
                </p>

                {/* Guest button */}
                <div className="mb-6 text-center">
                    <button
                        onClick={handleGuestLogin}
                        className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-900 transition"
                    >
                        Continue as Guest
                    </button>
                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">Quick access for demo purposes</p>
                </div>

                {/* Divider */}
                <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t border-gray-300 dark:border-gray-700" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white dark:bg-gray-900 px-2 text-gray-500 dark:text-gray-400">
                            Or continue with
                        </span>
                    </div>
                </div>

                {/* Tabs */}
                <div>
                    <div className="flex justify-center mb-4 space-x-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                        <button
                            onClick={() => setActiveTab('signin')}
                            className={`flex-1 py-2 rounded-md font-semibold text-sm focus:outline-none transition ${activeTab === 'signin'
                                ? 'bg-white dark:bg-gray-900 shadow text-gray-900 dark:text-gray-100'
                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                                }`}
                        >
                            Sign In
                        </button>
                        <button
                            onClick={() => setActiveTab('signup')}
                            className={`flex-1 py-2 rounded-md font-semibold text-sm focus:outline-none transition ${activeTab === 'signup'
                                ? 'bg-white dark:bg-gray-900 shadow text-gray-900 dark:text-gray-100'
                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                                }`}
                        >
                            Sign Up
                        </button>
                    </div>

                    {/* Error message */}
                    {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

                    {/* Tab panels */}
                    {activeTab === 'signin' && (
                        <form onSubmit={handleSignIn} className="space-y-4">
                            <input
                                type="email"
                                placeholder="Email"
                                value={signInEmail}
                                onChange={(e) => setSignInEmail(e.target.value)}
                                required
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={signInPassword}
                                onChange={(e) => setSignInPassword(e.target.value)}
                                required
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
                            />
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full py-2 rounded-md text-white font-semibold transition ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-800 hover:bg-gray-900'
                                    }`}
                            >
                                {isLoading ? 'Signing In...' : 'Sign In'}
                            </button>
                        </form>
                    )}

                    {activeTab === 'signup' && (
                        <form onSubmit={handleSignUp} className="space-y-4">
                            <input
                                type="text"
                                placeholder="Full Name"
                                value={signUpName}
                                onChange={(e) => setSignUpName(e.target.value)}
                                required
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={signUpEmail}
                                onChange={(e) => setSignUpEmail(e.target.value)}
                                required
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={signUpPassword}
                                onChange={(e) => setSignUpPassword(e.target.value)}
                                required
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
                            />
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full py-2 rounded-md text-white font-semibold transition ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-800 hover:bg-gray-900'
                                    }`}
                            >
                                {isLoading ? 'Creating Account...' : 'Create Account'}
                            </button>
                        </form>
                    )}
                </div>

                <p className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
                    Note: Authentication connects to backend and updates the global AuthContext.
                </p>
            </div>
        </div>
    );
}
