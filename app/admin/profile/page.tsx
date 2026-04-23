'use client';

import { useEffect, useState } from 'react';

export default function AdminProfilePage() {
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [saved, setSaved] = useState(false);
    const [form, setForm] = useState({
        name: '',
        title: '',
        bio: '',
        email: '',
        location: '',
        githubUrl: '',
        linkedinUrl: '',
        telegramUrl: '',
        cvUrl: '',
    });

    useEffect(() => {
        async function fetchProfile() {
            const res = await fetch('/api/profile');
            if (res.ok) {
                const data = await res.json();
                if (data) setForm(data);
            }
            setFetching(false);
        }
        fetchProfile();
    }, []);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setSaved(false);

        const res = await fetch('/api/profile', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });

        if (res.ok) {
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } else {
            alert('Failed to save profile');
        }
        setLoading(false);
    }

    if (fetching) {
        return <div className="text-gray-500 text-sm">Loading...</div>;
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-8">
                <a href="/admin" className="text-gray-500 text-sm hover:text-gray-300">
                    ← Dashboard
                </a>
                <h1 className="text-2xl font-semibold text-white mt-1">Profile</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Full Name *</label>
                        <input
                            type="text"
                            required
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full px-4 py-3 bg-[#111116] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                            placeholder="Serhii Demidov"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Title *</label>
                        <input
                            type="text"
                            required
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            className="w-full px-4 py-3 bg-[#111116] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                            placeholder="Full-Stack Developer"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm text-gray-400 mb-1">Bio *</label>
                    <textarea
                        rows={4}
                        required
                        value={form.bio}
                        onChange={(e) => setForm({ ...form, bio: e.target.value })}
                        className="w-full px-4 py-3 bg-[#111116] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 resize-none"
                        placeholder="Tell the world about yourself..."
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Email *</label>
                        <input
                            type="email"
                            required
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="w-full px-4 py-3 bg-[#111116] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                            placeholder="serhii@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Location</label>
                        <input
                            type="text"
                            value={form.location}
                            onChange={(e) => setForm({ ...form, location: e.target.value })}
                            className="w-full px-4 py-3 bg-[#111116] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                            placeholder="Ukraine"
                        />
                    </div>
                </div>

                <div className="pt-2 border-t border-white/5">
                    <p className="text-xs text-gray-600 uppercase tracking-widest mb-4">
                        Social Links
                    </p>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">GitHub</label>
                            <input
                                type="url"
                                value={form.githubUrl}
                                onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
                                className="w-full px-4 py-3 bg-[#111116] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                                placeholder="https://github.com/..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">LinkedIn</label>
                            <input
                                type="url"
                                value={form.linkedinUrl}
                                onChange={(e) => setForm({ ...form, linkedinUrl: e.target.value })}
                                className="w-full px-4 py-3 bg-[#111116] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                                placeholder="https://linkedin.com/in/..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Telegram</label>
                            <input
                                type="url"
                                value={form.telegramUrl}
                                onChange={(e) => setForm({ ...form, telegramUrl: e.target.value })}
                                className="w-full px-4 py-3 bg-[#111116] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                                placeholder="https://t.me/..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">
                                CV / Resume URL
                            </label>
                            <input
                                type="url"
                                value={form.cvUrl}
                                onChange={(e) => setForm({ ...form, cvUrl: e.target.value })}
                                className="w-full px-4 py-3 bg-[#111116] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                                placeholder="https://..."
                            />
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4 pt-2">
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors"
                    >
                        {loading ? 'Saving...' : 'Save Profile'}
                    </button>
                    {saved && (
                        <span className="text-green-400 text-sm">✓ Profile saved successfully</span>
                    )}
                </div>
            </form>
        </div>
    );
}
