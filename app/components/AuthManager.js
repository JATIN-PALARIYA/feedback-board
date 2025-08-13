'use client';

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User } from 'lucide-react';
import AuthForm from './AuthForm';
import AuthModal from './AuthModal';

export default function AuthManager({ mode = 'modal' }) {
    const [open, setOpen] = useState(false);
    const { user, login, loading } = useAuth();

    if (mode === 'page') {
        return <AuthForm onAuthSuccess={login} />;
    }

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="flex items-center gap-1 px-2 py-2 text-xs text-primary font-semibold hover:text-foreground transition"
                disabled={loading}
            >
                {loading ? (
                    <div className="h-4 w-4 border-2 border-gray-300 border-t-primary rounded-full animate-spin"></div>
                ) : (
                    <>
                        <User className="h-4 w-4" />
                        {user ? `Welcome, ${user.username || 'User'}` : 'Sign In'}
                    </>
                )}
            </button>

            {open && (
                <AuthModal
                    isOpen={open}
                    onClose={() => setOpen(false)}
                    onAuthSuccess={(u) => {
                        login(u);
                        setOpen(false);
                    }}
                />
            )}
        </>
    );
}
