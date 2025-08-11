import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';

export default function AuthForm({ onAuthSuccess, onGuestLogin }) {
    const [isSignUp, setIsSignUp] = useState(true);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: ''
    });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Simulate async login/signup process
            await new Promise(resolve => setTimeout(resolve, 1000));
            alert(isSignUp ? 'Account created! Please login.' : 'Logged in successfully!');

            if (isSignUp) {
                setIsSignUp(false);
                setFormData({ email: '', password: '', name: '' });
            } else {
                // On real login success, call onAuthSuccess to notify parent
                if (typeof onAuthSuccess === 'function') {
                    onAuthSuccess({
                        id: 'realuser', // replace with actual user ID from backend
                        name: formData.name || formData.email.split('@')[0],
                        email: formData.email
                    });
                }
            }
        } catch (err) {
            setError(err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleGuestLogin = () => {
        if (typeof onGuestLogin === 'function') {
            onGuestLogin({
                id: 'guest',
                name: 'Guest User',
                email: 'guest@example.com'
            });
        } else {
            alert('Logged in as Guest');
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#121212] p-6">
            <div className="w-lg bg-[#1E1E1E] rounded-lg p-8 shadow-lg border border-gray-700">
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <MessageSquare className="h-10 w-10 text-gray-400" />
                        <h1 className="text-3xl font-bold text-gray-200">FeedbackHub</h1>
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-100">
                        {isSignUp ? 'Create Account' : 'Welcome Back'}
                    </h2>
                    <p className="text-gray-400 mt-2 text-lg">
                        {isSignUp ? 'Sign up to start sharing feedback' : 'Sign in to your account'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto">
                    {isSignUp && (
                        <div>
                            <label
                                htmlFor="name"
                                className="block mb-2 font-medium text-gray-300"
                            >
                                Full Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={handleInputChange}
                                required={isSignUp}
                                placeholder="Enter your full name"
                                className="w-full rounded-md border border-gray-600 bg-[#2A2A2A] px-4 py-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
                            />
                        </div>
                    )}

                    <div>
                        <label
                            htmlFor="email"
                            className="block mb-2 font-medium text-gray-300"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter your email"
                            className="w-full rounded-md border border-gray-600 bg-[#2A2A2A] px-4 py-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block mb-2 font-medium text-gray-300"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter your password"
                            minLength={6}
                            className="w-full rounded-md border border-gray-600 bg-[#2A2A2A] px-4 py-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />
                    </div>

                    {error && (
                        <div className="text-sm text-red-600 bg-red-900 bg-opacity-30 p-3 rounded-md">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gray-800 text-gray-300 py-3 rounded hover:bg-gray-700 disabled:opacity-50 transition"
                    >
                        {loading ? 'Loading...' : isSignUp ? 'Create Account' : 'Sign In'}
                    </button>
                </form>

                <button
                    onClick={handleGuestLogin}
                    className="mt-6 w-full max-w-lg mx-auto bg-gray-700 text-gray-300 py-3 rounded hover:bg-gray-600 transition"
                >
                    Continue as Guest
                </button>

                <div className="mt-8 text-center text-sm text-gray-400 max-w-lg mx-auto">
                    {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
                    <button
                        onClick={() => {
                            setIsSignUp(!isSignUp);
                            setError('');
                            setFormData({ email: '', password: '', name: '' });
                        }}
                        className="text-gray-300 underline hover:text-gray-100"
                    >
                        {isSignUp ? 'Sign in' : 'Sign up'}
                    </button>
                </div>
            </div>
        </div>
    );
}
