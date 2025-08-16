'use client';

import { useRouter } from 'next/navigation';
import AuthForm from '@/components/auth/AuthForm';
import { useAuth } from '@/context/AuthContext';

export default function AuthPage() {
    const router = useRouter();
    const { login } = useAuth();

    return (
        <div>
            <AuthForm
                onAuthSuccess={(user) => {
                    localStorage.setItem('user', JSON.stringify(user));
                    login(user);
                    router.push('/home');
                }}
                onGuestLogin={(guest) => {
                    localStorage.setItem('user', JSON.stringify(guest));
                    login(guest);
                    router.push('/home');
                }}
            />
        </div>
    );
}
