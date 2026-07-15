'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const CATEGORIES = ['Frontend', 'Backend', 'DevOps', 'WordPress Ecosystem', 'Tools', 'Other'];

export default function NewSkillPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: '',
        level: 80,
        category: 'Frontend',
        order: 0,
    });

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        const res = await fetch('/api/skills', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });

        if (res.ok) {
            router.push('/admin/skills');
            router.refresh();
        } else {
            alert('Failed to create skill');
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-[#0c0c0f] p-8">
            <div className="max-w-md mx-auto">
                <div className="mb-8">
                    <Link
                        href="/admin/skills"
                        className="text-gray-500 text-sm hover:text-gray-300"
                    >
                        ← Skills
                    </Link>
                    <h1 className="text-2xl font-semibold text-white mt-1">New Skill</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Name *</label>
                        <input
                            type="text"
                            required
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full px-4 py-3 bg-[#111116] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                            placeholder="React"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Category *</label>
                        <select
                            value={form.category}
                            onChange={(e) => setForm({ ...form, category: e.target.value })}
                            className="w-full px-4 py-3 bg-[#111116] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                        >
                            {CATEGORIES.map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-1">
                            Level: <span className="text-white">{form.level}%</span>
                        </label>
                        <input
                            type="range"
                            min={0}
                            max={100}
                            value={form.level}
                            onChange={(e) => setForm({ ...form, level: Number(e.target.value) })}
                            className="w-full accent-blue-500"
                        />
                        <div className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-blue-500 rounded-full transition-all"
                                style={{ width: `${form.level}%` }}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Sort Order</label>
                        <input
                            type="number"
                            value={form.order}
                            onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                            className="w-full px-4 py-3 bg-[#111116] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors"
                        >
                            {loading ? 'Saving...' : 'Create Skill'}
                        </button>
                        <Link
                            href="/admin/skills"
                            className="px-6 py-3 border border-white/10 text-gray-400 text-sm rounded-lg hover:bg-white/5 transition-colors inline-flex items-center"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
