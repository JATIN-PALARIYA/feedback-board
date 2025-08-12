// app/components/AuthManager.js
'use client';

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User } from 'lucide-react';
import AuthForm from './AuthForm';
import AuthModal from './AuthModal';

export default function AuthManager({ mode = 'modal' }) {
    // mode: 'modal' (default) or 'page'

    const [open, setOpen] = useState(false);
    const { user, login } = useAuth();

    // If mode is page, just render AuthForm full page
    if (mode === 'page') {
        return <AuthForm onAuthSuccess={login} />;
    }

    // Otherwise modal mode (in-app)
    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="flex items-center gap-1 px-2 py-2 text-xs text-primary font-semibold hover:text-foreground transition"
            >
                <User className="h-4 w-4" />
                {user ? `Welcome, ${user.name}` : 'Sign In'}
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
