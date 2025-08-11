'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import AuthForm from './components/AuthForm';

export default function SignupPage() {
    const router = useRouter();
    const [form, setForm] = useState({ name: '', email: '', password: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Here you'd call your /api/signup endpoint
        localStorage.setItem('user', JSON.stringify(form));
        router.push('/home'); // After signup go home
    };

    return (
        <div>
            <AuthForm />
        </div>
    );
}
