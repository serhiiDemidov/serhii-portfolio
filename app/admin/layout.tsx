import SidebarNav from '@/components/admin/SidebarNav';
import { auth, signOut } from '@/lib/auth';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const session = await auth();

    // Login page — no sidebar
    if (!session) {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-[#0c0c0f] flex">
            <aside className="w-56 flex-shrink-0 border-r border-white/5 flex flex-col">
                <div className="px-5 py-4 border-b border-white/5">
                    <span className="text-white font-medium text-sm">serhii.dev</span>
                    <span className="ml-2 text-xs text-gray-600">admin</span>
                </div>

                <SidebarNav />

                <div className="px-3 py-3 border-t border-white/5">
                    <div className="flex items-center gap-2.5 px-2 py-1.5">
                        <div className="w-7 h-7 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400 text-xs font-medium flex-shrink-0">
                            SD
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-xs font-medium text-white truncate">
                                {session.user?.name}
                            </div>
                            <div className="text-xs text-gray-600 truncate">Admin</div>
                        </div>
                        <form
                            action={async () => {
                                'use server';
                                await signOut({ redirectTo: '/admin/login' });
                            }}
                        >
                            <button
                                type="submit"
                                className="text-gray-600 hover:text-gray-400 transition-colors text-xs"
                                title="Sign out"
                            >
                                ✕
                            </button>
                        </form>
                    </div>
                </div>
            </aside>

            <main className="flex-1 overflow-auto p-8">{children}</main>
        </div>
    );
}
