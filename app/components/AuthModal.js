import React, { useState, useEffect, useRef } from 'react';

export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
    const [isLoading, setIsLoading] = useState(false);

    // Sign in form state
    const [signInEmail, setSignInEmail] = useState('');
    const [signInPassword, setSignInPassword] = useState('');

    // Sign up form state
    const [signUpEmail, setSignUpEmail] = useState('');
    const [signUpPassword, setSignUpPassword] = useState('');
    const [signUpName, setSignUpName] = useState('');

    const [activeTab, setActiveTab] = useState('signin');

    useEffect(() => {
        function onKeyDown(e) {
            if (e.key === 'Escape') {
                onClose();
            }
        }
        if (isOpen) {
            document.addEventListener('keydown', onKeyDown);
        }
        return () => document.removeEventListener('keydown', onKeyDown);
    }, [isOpen, onClose]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [isOpen]);

    const handleSignIn = e => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            onAuthSuccess({
                id: `demo_${Date.now()}`,
                name: 'Demo User',
                email: signInEmail || 'demo@example.com',
            });
            setIsLoading(false);
        }, 1000);
    };

    const handleSignUp = e => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            onAuthSuccess({
                id: `demo_${Date.now()}`,
                name: signUpName || 'Demo User',
                email: signUpEmail || 'demo@example.com',
            });
            setIsLoading(false);
        }, 1000);
    };

    const handleQuickDemo = () => {
        onAuthSuccess({
            id: 'demo_guest',
            name: 'Guest User',
            email: 'guest@example.com',
        });
    };

    const overlayRef = useRef(null);
    const onOverlayClick = e => {
        if (e.target === overlayRef.current) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Overlay */}
            <div
                ref={overlayRef}
                onClick={onOverlayClick}
                className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
                aria-modal="true"
                role="dialog"
                aria-labelledby="auth-modal-title"
                aria-describedby="auth-modal-description"
            >
                {/* Modal content */}
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

                    {/* Header */}
                    <h2
                        id="auth-modal-title"
                        className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1 text-center"
                    >
                        Welcome to FeedbackHub
                    </h2>
                    <p
                        id="auth-modal-description"
                        className="text-sm text-gray-600 dark:text-gray-400 mb-6 text-center"
                    >
                        Sign in to your account or continue as a guest to access the feedback management system.
                    </p>

                    {/* Continue as guest button */}
                    <div className="mb-6 text-center">
                        <button
                            onClick={handleQuickDemo}
                            className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 transition"
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
                                className={`flex-1 py-2 rounded-md font-semibold text-sm focus:outline-none transition
                  ${activeTab === 'signin'
                                        ? 'bg-white dark:bg-gray-900 shadow text-gray-900 dark:text-gray-100'
                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                                    }
                `}
                                role="tab"
                                aria-selected={activeTab === 'signin'}
                                tabIndex={activeTab === 'signin' ? 0 : -1}
                                id="tab-signin"
                                aria-controls="tabpanel-signin"
                            >
                                Sign In
                            </button>
                            <button
                                onClick={() => setActiveTab('signup')}
                                className={`flex-1 py-2 rounded-md font-semibold text-sm focus:outline-none transition
                  ${activeTab === 'signup'
                                        ? 'bg-white dark:bg-gray-900 shadow text-gray-900 dark:text-gray-100'
                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                                    }
                `}
                                role="tab"
                                aria-selected={activeTab === 'signup'}
                                tabIndex={activeTab === 'signup' ? 0 : -1}
                                id="tab-signup"
                                aria-controls="tabpanel-signup"
                            >
                                Sign Up
                            </button>
                        </div>

                        {/* Tab panels */}
                        <div>
                            {activeTab === 'signup' && (
                                <form
                                    onSubmit={handleSignUp}
                                    role="tabpanel"
                                    aria-labelledby="tab-signup"
                                    id="tabpanel-signup"
                                    className="space-y-4"
                                >
                                    <div>
                                        <label
                                            htmlFor="signup-name"
                                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                                        >
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            id="signup-name"
                                            value={signUpName}
                                            onChange={e => setSignUpName(e.target.value)}
                                            placeholder="Enter your full name"
                                            required
                                            className="block w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600 dark:bg-gray-800 dark:text-gray-100"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="signup-email"
                                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                                        >
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="signup-email"
                                            value={signUpEmail}
                                            onChange={e => setSignUpEmail(e.target.value)}
                                            placeholder="Enter your email"
                                            required
                                            className="block w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600 dark:bg-gray-800 dark:text-gray-100"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="signup-password"
                                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                                        >
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            id="signup-password"
                                            value={signUpPassword}
                                            onChange={e => setSignUpPassword(e.target.value)}
                                            placeholder="Create a password"
                                            required
                                            className="block w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600 dark:bg-gray-800 dark:text-gray-100"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className={`w-full py-2 rounded-md font-semibold text-white transition focus:outline-none focus:ring-2 focus:ring-gray-600
                    ${isLoading
                                                ? 'bg-gray-400 cursor-not-allowed'
                                                : 'bg-gray-800 hover:bg-gray-900'
                                            }
                    `}
                                    >
                                        {isLoading ? 'Creating Account...' : 'Create Account'}
                                    </button>
                                </form>
                            )}

                            {activeTab === 'signin' && (
                                <form
                                    onSubmit={handleSignIn}
                                    role="tabpanel"
                                    aria-labelledby="tab-signin"
                                    id="tabpanel-signin"
                                    className="space-y-4"
                                >
                                    <div>
                                        <label
                                            htmlFor="signin-email"
                                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                                        >
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="signin-email"
                                            value={signInEmail}
                                            onChange={e => setSignInEmail(e.target.value)}
                                            placeholder="Enter your email"
                                            required
                                            className="block w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600 dark:bg-gray-800 dark:text-gray-100"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="signin-password"
                                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                                        >
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            id="signin-password"
                                            value={signInPassword}
                                            onChange={e => setSignInPassword(e.target.value)}
                                            placeholder="Enter your password"
                                            required
                                            className="block w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600 dark:bg-gray-800 dark:text-gray-100"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className={`w-full py-2 rounded-md font-semibold text-white transition focus:outline-none focus:ring-2 focus:ring-gray-600
                    ${isLoading
                                                ? 'bg-gray-400 cursor-not-allowed'
                                                : 'bg-gray-800 hover:bg-gray-900'
                                            }
                    `}
                                    >
                                        {isLoading ? 'Signing In...' : 'Sign In'}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>

                    <p className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
                        Note: This is a demo application. All authentication is simulated for demonstration purposes.
                    </p>
                </div>
            </div>
        </>
    );
}
