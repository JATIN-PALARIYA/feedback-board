// app/components/AuthManager.js
'use client';

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User } from 'lucide-react';
import AuthModal from './AuthModal'; // your existing modal (adjust path if needed)

export default function AuthManager() {
    const [open, setOpen] = useState(false);
    const { user, login, logout } = useAuth();

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="flex items-center gap-1 px-2 py-2 text-xs text-primary font-semibold hover:text-foreground transition"
            >
                <User className="h-4 w-4" />
                {user ? `Welcome, ${user.name}` : 'Sign In'}
            </button>

            <AuthModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onAuthSuccess={(u) => { login(u); setOpen(false); }}
            />
        </>
    );
}
