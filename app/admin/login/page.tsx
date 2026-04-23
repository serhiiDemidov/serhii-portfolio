'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError('');

        const result = await signIn('credentials', {
            email,
            password,
            redirect: false,
        });

        if (result?.error) {
            setError('Incorrect email or password');
            setLoading(false);
        } else {
            router.push('/admin');
        }
    }

    return (
        <div className="min-h-screen bg-[#0c0c0f] flex items-center justify-center">
            <div className="w-full max-w-md p-8 bg-[#111116] border border-white/10 rounded-xl">
                <h1 className="text-2xl font-semibold text-white mb-2">Вход в админку</h1>
                <p className="text-sm text-gray-500 mb-8">Только для Serhii Demidov</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 bg-[#0c0c0f] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                            placeholder="serhii@example.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Пароль</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 bg-[#0c0c0f] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    {error && <p className="text-red-400 text-sm">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors"
                    >
                        {loading ? 'Входим...' : 'Войти'}
                    </button>
                </form>
            </div>
        </div>
    );
}
