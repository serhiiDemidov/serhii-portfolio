'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { usePathname } from 'next/navigation';

const INTERACTIVE_SELECTOR = 'a, button, [role="button"], input, textarea, select, summary';

function subscribe() {
    return () => {};
}

function getPointerFineSnapshot() {
    return window.matchMedia('(pointer: fine)').matches;
}

function getServerSnapshot() {
    return false;
}

export default function CustomCursor() {
    const enabled = useSyncExternalStore(subscribe, getPointerFineSnapshot, getServerSnapshot);
    const [visible, setVisible] = useState(false);
    const [hovering, setHovering] = useState(false);
    const boxRef = useRef<HTMLDivElement>(null);
    const lineXRef = useRef<HTMLDivElement>(null);
    const lineYRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const [prevPathname, setPrevPathname] = useState(pathname);

    // Client-side navigation doesn't remount this layout-level component, so
    // the cursor stays frozen at its pre-navigation position until the mouse
    // actually moves. Hide it on route change so it doesn't sit somewhere
    // stale over the new page's layout.
    if (pathname !== prevPathname) {
        setPrevPathname(pathname);
        setVisible(false);
    }

    useEffect(() => {
        if (!enabled) return;
        document.body.classList.add('custom-cursor-active');

        function handleMove(e: MouseEvent) {
            setVisible(true);
            const { clientX: x, clientY: y } = e;
            if (boxRef.current) {
                boxRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
            }
            if (lineXRef.current) {
                lineXRef.current.style.transform = `translate3d(0, ${y}px, 0)`;
            }
            if (lineYRef.current) {
                lineYRef.current.style.transform = `translate3d(${x}px, 0, 0)`;
            }
        }

        function handleOver(e: MouseEvent) {
            const target = e.target as HTMLElement;
            setHovering(!!target.closest(INTERACTIVE_SELECTOR));
        }

        function handleLeave() {
            setVisible(false);
        }

        window.addEventListener('mousemove', handleMove);
        window.addEventListener('mouseover', handleOver);
        document.documentElement.addEventListener('mouseleave', handleLeave);

        return () => {
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('mouseover', handleOver);
            document.documentElement.removeEventListener('mouseleave', handleLeave);
            document.body.classList.remove('custom-cursor-active');
        };
    }, [enabled]);

    if (!enabled) return null;

    return (
        <div
            className={`pointer-events-none fixed inset-0 z-100 transition-opacity duration-150 ${
                visible ? 'opacity-100' : 'opacity-0'
            }`}
        >
            <div ref={lineYRef} className="absolute top-0 left-0 h-full w-px bg-white/15" />
            <div ref={lineXRef} className="absolute top-0 left-0 w-full h-px bg-white/15" />
            <div ref={boxRef} className="absolute top-0 left-0 w-7 h-7">
                <div
                    className={`w-full h-full transition-transform duration-150 ${
                        hovering ? 'scale-150' : 'scale-100'
                    }`}
                >
                    <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-blue-400" />
                    <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-blue-400" />
                    <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-blue-400" />
                    <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-blue-400" />
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-0.5 bg-blue-400 rounded-full" />
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0.5 h-2.5 bg-blue-400 rounded-full" />
                </div>
            </div>
        </div>
    );
}
