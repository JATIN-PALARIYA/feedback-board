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

    // Call your backend register API
    const registerUser = async ({ email, password, name }) => {
        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, name }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Registration failed');
        return data;
    };

    // Call your backend login API
    const loginUser = async ({ email, password }) => {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Login failed');
        return data;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (isSignUp) {
                await registerUser(formData);
                console.log(formData)
                alert('Account created! Please login.');
                setIsSignUp(false);
                setFormData({ email: '', password: '', name: '' });
            } else {
                const { user } = await loginUser(formData);
                onAuthSuccess?.(user);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
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
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
            <div className="w-lg bg-white rounded-lg p-8 shadow-lg border border-gray-200">
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <MessageSquare className="h-10 w-10 text-gray-800" />
                        <h1 className="text-3xl font-bold text-gray-800">FeedbackHub</h1>
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-800">
                        {isSignUp ? 'Create Account' : 'Welcome Back'}
                    </h2>
                    <p className="text-gray-600 mt-2 text-lg">
                        {isSignUp ? 'Sign up to start sharing feedback' : 'Log in to your account'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto">
                    {isSignUp && (
                        <div>
                            <label htmlFor="name" className="block mb-2 font-medium text-gray-800">
                                Full Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Enter your full name"
                                className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                            />
                        </div>
                    )}

                    <div>
                        <label htmlFor="email" className="block mb-2 font-medium text-gray-800">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                     
                            placeholder="Enter your email"
                            className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block mb-2 font-medium text-gray-800">
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
                            className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />
                    </div>

                    {error && (
                        <div className="text-sm text-red-700 bg-red-100 p-3 rounded-md">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gray-200 text-gray-800 py-3 rounded hover:bg-gray-400 disabled:opacity-50 transition"
                    >
                        {loading ? 'Loading...' : isSignUp ? 'Create Account' : 'Log In'}
                    </button>
                </form>

                {isSignUp && (
                    <button
                        onClick={handleGuestLogin}
                        className="mt-6 w-full max-w-lg mx-auto bg-gray-200 text-gray-800 py-3 rounded hover:bg-gray-400 transition"
                    >
                        Continue as Guest
                    </button>
                )}

                <div className="mt-8 text-center text-sm text-gray-600 max-w-lg mx-auto">
                    {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
                    <button
                        onClick={() => {
                            setIsSignUp(!isSignUp);
                            setError('');
                            setFormData({ email: '', password: '', name: '' });
                        }}
                        className="text-gray-600 hover:text-gray-800"
                    >
                        {isSignUp ? 'Log in' : 'Sign up'}
                    </button>
                </div>
            </div>
        </div>
    );
}
