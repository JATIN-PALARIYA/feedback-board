'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/auth');  // Redirect if not logged in
        }
    }, [user, router]);

    // Optionally, show nothing or a loading state while checking user
    if (!user) {
        return null; // or <div>Loading...</div>
    }

    // User is logged in, render protected content
    return <>{children}</>;
}
