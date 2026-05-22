'use client';

import { useEffect, useRef } from 'react';

interface AnimateInProps {
    children: React.ReactNode;
    delay?: number;
}

export default function AnimateIn({ children, delay = 0 }: AnimateInProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;
                const timer = setTimeout(() => {
                    el.dataset.visible = '';
                }, delay);
                observer.unobserve(el);
                return () => clearTimeout(timer);
            },
            { threshold: 0.1 },
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [delay]);

    return (
        <div ref={ref} data-animate>
            {children}
        </div>
    );
}
