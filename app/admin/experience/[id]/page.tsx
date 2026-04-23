'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import DatePicker from '@/components/ui/DatePicker';

export default function EditExperiencePage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [form, setForm] = useState({
        company: '',
        role: '',
        description: '',
        startDate: '',
        endDate: '',
        current: false,
        order: 0,
    });

    useEffect(() => {
        async function fetchExperience() {
            const res = await fetch(`/api/experience/${id}`);
            if (res.ok) {
                const data = await res.json();
                setForm({
                    company: data.company,
                    role: data.role,
                    description: data.description,
                    startDate: data.startDate
                        ? new Date(data.startDate).toISOString().slice(0, 7)
                        : '',
                    endDate: data.endDate ? new Date(data.endDate).toISOString().slice(0, 7) : '',
                    current: data.current,
                    order: data.order,
                });
            }
            setFetching(false);
        }
        fetchExperience();
    }, [id]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        const res = await fetch(`/api/experience/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...form,
                startDate: new Date(form.startDate).toISOString(),
                endDate:
                    form.current || !form.endDate ? null : new Date(form.endDate).toISOString(),
            }),
        });

        if (res.ok) {
            router.push('/admin/experience');
            router.refresh();
        } else {
            alert('Failed to update experience');
            setLoading(false);
        }
    }

    async function handleDelete() {
        if (!confirm('Delete this experience?')) return;
        const res = await fetch(`/api/experience/${id}`, { method: 'DELETE' });
        if (res.ok) {
            router.push('/admin/experience');
            router.refresh();
        }
    }

    if (fetching) {
        return (
            <div className="min-h-screen bg-[#0c0c0f] flex items-center justify-center">
                <div className="text-gray-500 text-sm">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0c0c0f] p-8">
            <div className="max-w-2xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <Link
                            href="/admin/experience"
                            className="text-gray-500 text-sm hover:text-gray-300"
                        >
                            ← Experience
                        </Link>
                        <h1 className="text-2xl font-semibold text-white mt-1">Edit Experience</h1>
                    </div>
                    <button
                        onClick={handleDelete}
                        className="px-4 py-2 text-red-400 border border-red-400/20 rounded-lg text-sm hover:bg-red-400/10 transition-colors"
                    >
                        Delete
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Company *</label>
                        <input
                            type="text"
                            required
                            value={form.company}
                            onChange={(e) => setForm({ ...form, company: e.target.value })}
                            className="w-full px-4 py-3 bg-[#111116] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Role *</label>
                        <input
                            type="text"
                            required
                            value={form.role}
                            onChange={(e) => setForm({ ...form, role: e.target.value })}
                            className="w-full px-4 py-3 bg-[#111116] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Description *</label>
                        <textarea
                            rows={4}
                            required
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            className="w-full px-4 py-3 bg-[#111116] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 resize-none"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Start Date *</label>
                            <DatePicker
                                value={form.startDate}
                                onChange={(val: string) => setForm({ ...form, startDate: val })}
                                placeholder="Select start date"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">End Date</label>
                            <DatePicker
                                value={form.endDate}
                                onChange={(val: string) => setForm({ ...form, endDate: val })}
                                placeholder="Select end date"
                                disabled={form.current}
                            />
                        </div>
                    </div>

                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={form.current}
                            onChange={(e) =>
                                setForm({ ...form, current: e.target.checked, endDate: '' })
                            }
                            className="w-4 h-4 accent-blue-500"
                        />
                        <span className="text-sm text-gray-400">I currently work here</span>
                    </label>

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
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                        <Link
                            href="/admin/experience"
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
