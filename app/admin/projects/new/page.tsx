'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewProjectPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [tagsInput, setTagsInput] = useState('');
    const [form, setForm] = useState({
        title: '',
        description: '',
        longDesc: '',
        liveUrl: '',
        githubUrl: '',
        featured: false,
        published: false,
        order: 0,
    });

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        const tags = tagsInput
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean);

        const res = await fetch('/api/projects', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...form, tags }),
        });

        if (res.ok) {
            router.push('/admin/projects');
            router.refresh();
        } else {
            alert('Ошибка при создании проекта');
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-[#0c0c0f] p-8">
            <div className="max-w-2xl mx-auto">
                <div className="mb-8">
                    <Link
                        href="/admin/projects"
                        className="text-gray-500 text-sm hover:text-gray-300"
                    >
                        ← Projects
                    </Link>
                    <h1 className="text-2xl font-semibold text-white mt-1">New project</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Name *</label>
                        <input
                            type="text"
                            required
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            className="w-full px-4 py-3 bg-[#111116] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                            placeholder="DevFlow — CI/CD Platform"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-1">
                            Short description *
                        </label>
                        <input
                            type="text"
                            required
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            className="w-full px-4 py-3 bg-[#111116] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                            placeholder="Short description for card"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-1">
                            Подробное описание
                        </label>
                        <textarea
                            rows={4}
                            value={form.longDesc}
                            onChange={(e) => setForm({ ...form, longDesc: e.target.value })}
                            className="w-full px-4 py-3 bg-[#111116] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 resize-none"
                            placeholder="Detailed description about project..."
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Live URL</label>
                            <input
                                type="url"
                                value={form.liveUrl}
                                onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
                                className="w-full px-4 py-3 bg-[#111116] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                                placeholder="https://..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">GitHub URL</label>
                            <input
                                type="url"
                                value={form.githubUrl}
                                onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
                                className="w-full px-4 py-3 bg-[#111116] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                                placeholder="https://github.com/..."
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-1">
                            Tags <span className="text-gray-600">(через запятую)</span>
                        </label>
                        <input
                            type="text"
                            value={tagsInput}
                            onChange={(e) => setTagsInput(e.target.value)}
                            className="w-full px-4 py-3 bg-[#111116] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                            placeholder="React, Next.js, TypeScript"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Sorting order</label>
                        <input
                            type="number"
                            value={form.order}
                            onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                            className="w-full px-4 py-3 bg-[#111116] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    <div className="flex gap-6">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={form.featured}
                                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                                className="w-4 h-4 accent-blue-500"
                            />
                            <span className="text-sm text-gray-400">Featured</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={form.published}
                                onChange={(e) => setForm({ ...form, published: e.target.checked })}
                                className="w-4 h-4 accent-blue-500"
                            />
                            <span className="text-sm text-gray-400">Published</span>
                        </label>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors"
                        >
                            {loading ? 'Save...' : 'Create project'}
                        </button>
                        <Link
                            href="/admin/projects"
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
