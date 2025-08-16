'use client';

import React, { useEffect } from 'react';
import AuthForm from '@/components/auth/AuthForm';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();

    useEffect(() => {
        // Always clear user so login page shows on every reload
        localStorage.removeItem('user');
    }, []);

    const handleAuthSuccess = (user) => {
        // Save user temporarily
        localStorage.setItem('user', JSON.stringify(user));
        router.push('/home');
    };

    const handleGuestLogin = (guestUser) => {
        // Don’t store in localStorage if you want it to always ask again
        router.push('/home');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <AuthForm
                onAuthSuccess={handleAuthSuccess}
                onGuestLogin={handleGuestLogin}
            />
        </div>
    );
}
