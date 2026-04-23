import { auth, signOut } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function AdminPage() {
    const session = await auth();

    if (!session) redirect('/admin/login');

    return (
        <div className="min-h-screen bg-[#0c0c0f] p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
                        <p className="text-gray-500 text-sm mt-1">Привет, {session.user?.name}</p>
                    </div>
                    <form
                        action={async () => {
                            'use server';
                            await signOut({ redirectTo: '/admin/login' });
                        }}
                    >
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm text-gray-400 border border-white/10 rounded-lg hover:bg-white/5"
                        >
                            Выйти
                        </button>
                    </form>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <a
                        href="/admin/projects"
                        className="p-6 bg-[#111116] border border-white/10 rounded-xl hover:border-white/20 transition-colors"
                    >
                        <div className="text-2xl mb-2">🚀</div>
                        <div className="text-white font-medium">Проекты</div>
                        <div className="text-gray-500 text-sm mt-1">Добавить и редактировать</div>
                    </a>
                    <a
                        href="/admin/skills"
                        className="p-6 bg-[#111116] border border-white/10 rounded-xl hover:border-white/20 transition-colors"
                    >
                        <div className="text-2xl mb-2">⚡</div>
                        <div className="text-white font-medium">Навыки</div>
                        <div className="text-gray-500 text-sm mt-1">Управление стеком</div>
                    </a>
                    <a
                        href="/admin/experience"
                        className="p-6 bg-[#111116] border border-white/10 rounded-xl hover:border-white/20 transition-colors"
                    >
                        <div className="text-2xl mb-2">💼</div>
                        <div className="text-white font-medium">Опыт работы</div>
                        <div className="text-gray-500 text-sm mt-1">История карьеры</div>
                    </a>
                    <a
                        href="/admin/profile"
                        className="p-6 bg-[#111116] border border-white/10 rounded-xl hover:border-white/20 transition-colors"
                    >
                        <div className="text-2xl mb-2">👤</div>
                        <div className="text-white font-medium">Профиль</div>
                        <div className="text-gray-500 text-sm mt-1">Личная информация</div>
                    </a>
                </div>
            </div>
        </div>
    );
}
