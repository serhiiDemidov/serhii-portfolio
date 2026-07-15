import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="bg-[#0c0c0f] min-h-screen flex flex-col items-center justify-center px-6 text-center">
            <p className="font-mono text-sm text-blue-400 mb-3">404</p>
            <h1 className="text-3xl font-semibold text-white tracking-tight mb-3">
                Page not found
            </h1>
            <p className="text-gray-500 text-sm mb-8">
                The page you&apos;re looking for doesn&apos;t exist or was moved.
            </p>
            <Link
                href="/"
                className="text-sm px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors font-mono"
            >
                ← back home
            </Link>
        </div>
    );
}
