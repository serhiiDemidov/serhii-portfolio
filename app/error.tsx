'use client';

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
    return (
        <div className="bg-[#0c0c0f] min-h-screen flex flex-col items-center justify-center px-6 text-center">
            <p className="font-mono text-sm text-red-400 mb-3">Error</p>
            <h1 className="text-3xl font-semibold text-white tracking-tight mb-3">
                Something went wrong
            </h1>
            <p className="text-gray-500 text-sm mb-8">
                An unexpected error occurred. Try again in a moment.
            </p>
            <button
                type="button"
                onClick={reset}
                className="text-sm px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors font-mono"
            >
                Try again
            </button>
        </div>
    );
}
