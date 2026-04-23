'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import ImageUpload from '@/components/ui/ImageUpload';

export default function EditProjectPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [tagsInput, setTagsInput] = useState('');
    const [form, setForm] = useState({
        title: '',
        description: '',
        longDesc: '',
        imageUrl: '',
        liveUrl: '',
        githubUrl: '',
        featured: false,
        published: false,
        order: 0,
    });

    useEffect(() => {
        async function fetchProject() {
            const res = await fetch(`/api/projects/${id}`);
            if (res.ok) {
                const data = await res.json();
                setForm({
                    title: data.title,
                    description: data.description,
                    longDesc: data.longDesc ?? '',
                    imageUrl: data.imageUrl ?? '',
                    liveUrl: data.liveUrl ?? '',
                    githubUrl: data.githubUrl ?? '',
                    featured: data.featured,
                    published: data.published,
                    order: data.order,
                });
                setTagsInput(data.tags.join(', '));
            }
            setFetching(false);
        }
        fetchProject();
    }, [id]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        const tags = tagsInput
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean);

        const res = await fetch(`/api/projects/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...form, tags }),
        });

        if (res.ok) {
            router.push('/admin/projects');
            router.refresh();
        } else {
            alert('Failed to update project');
            setLoading(false);
        }
    }

    async function handleDelete() {
        if (!confirm('Delete this project? This cannot be undone.')) return;

        const res = await fetch(`/api/projects/${id}`, {
            method: 'DELETE',
        });

        if (res.ok) {
            router.push('/admin/projects');
            router.refresh();
        } else {
            alert('Failed to delete project');
        }
    }

    if (fetching) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="text-gray-500 text-sm">Loading...</div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-semibold text-white">Edit Project</h1>
                    <p className="text-gray-500 text-sm mt-1">{form.title}</p>
                </div>
                <button
                    onClick={handleDelete}
                    className="px-4 py-2 text-red-400 border border-red-400/20 rounded-lg text-sm hover:bg-red-400/10 transition-colors"
                >
                    Delete
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Image upload */}
                <div>
                    <label className="block text-sm text-gray-400 mb-1">Project Image</label>
                    <ImageUpload
                        value={form.imageUrl}
                        onChange={(url: string) => setForm({ ...form, imageUrl: url })}
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
                    />
                </div>

                <div>
                    <label className="block text-sm text-gray-400 mb-1">Short Description *</label>
                    <input
                        type="text"
                        required
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        className="w-full px-4 py-3 bg-[#111116] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm text-gray-400 mb-1">Full Description</label>
                    <textarea
                        rows={4}
                        value={form.longDesc}
                        onChange={(e) => setForm({ ...form, longDesc: e.target.value })}
                        className="w-full px-4 py-3 bg-[#111116] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 resize-none"
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
                        Tags <span className="text-gray-600">(comma separated)</span>
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
                    <label className="block text-sm text-gray-400 mb-1">Sort Order</label>
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
                        {loading ? 'Saving...' : 'Save Changes'}
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
    );
}
