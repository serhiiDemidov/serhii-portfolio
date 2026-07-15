'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface ProjectGalleryProps {
    images: string[];
    title: string;
}

const LIGHTBOX_TRANSITION_MS = 200;

export default function ProjectGallery({ images, title }: ProjectGalleryProps) {
    const [active, setActive] = useState(0);
    const [open, setOpen] = useState(false);
    const [entered, setEntered] = useState(false);
    const trackRef = useRef<HTMLDivElement>(null);

    function scrollToIndex(index: number) {
        const track = trackRef.current;
        if (!track) return;
        const clamped = Math.max(0, Math.min(index, images.length - 1));
        (track.children[clamped] as HTMLElement | undefined)?.scrollIntoView({
            behavior: 'smooth',
            inline: 'start',
        });
    }

    function handleScroll() {
        const track = trackRef.current;
        if (!track) return;
        setActive(Math.round(track.scrollLeft / track.clientWidth));
    }

    function go(delta: number) {
        const next = Math.max(0, Math.min(active + delta, images.length - 1));
        setActive(next);
        if (!open) scrollToIndex(next);
    }

    function openLightbox() {
        setOpen(true);
    }

    function closeLightbox() {
        setEntered(false);
        window.setTimeout(() => setOpen(false), LIGHTBOX_TRANSITION_MS);
    }

    // Mount closed, then flip to the "entered" state on the next frame so
    // the browser has something to transition from instead of snapping.
    useEffect(() => {
        if (!open) return;
        const id = requestAnimationFrame(() => setEntered(true));
        return () => cancelAnimationFrame(id);
    }, [open]);

    useEffect(() => {
        if (!open) return;
        function handleKey(e: KeyboardEvent) {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') go(1);
            if (e.key === 'ArrowLeft') go(-1);
        }
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, active]);

    if (images.length === 0) return null;

    return (
        <div className="mb-10">
            <div className="relative">
                <div
                    ref={trackRef}
                    onScroll={handleScroll}
                    className="flex overflow-x-auto snap-x snap-mandatory rounded-xl border border-white/5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                >
                    {images.map((url, index) => (
                        <button
                            key={url}
                            type="button"
                            onClick={openLightbox}
                            className="relative w-full shrink-0 snap-start aspect-video cursor-zoom-in"
                            aria-label={`View image ${index + 1} of ${images.length} fullscreen`}
                        >
                            <Image
                                src={url}
                                alt={`${title} screenshot ${index + 1}`}
                                fill
                                priority={index === active}
                                className="object-cover"
                            />
                        </button>
                    ))}
                </div>

                {images.length > 1 && (
                    <>
                        <button
                            type="button"
                            onClick={() => go(-1)}
                            disabled={active === 0}
                            aria-label="Previous image"
                            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 disabled:opacity-0 cursor-pointer disabled:cursor-default text-white flex items-center justify-center transition-opacity"
                        >
                            ‹
                        </button>
                        <button
                            type="button"
                            onClick={() => go(1)}
                            disabled={active === images.length - 1}
                            aria-label="Next image"
                            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 disabled:opacity-0 cursor-pointer disabled:cursor-default text-white flex items-center justify-center transition-opacity"
                        >
                            ›
                        </button>
                    </>
                )}
            </div>

            {images.length > 1 && (
                <div className="flex items-center justify-center gap-2 mt-3">
                    {images.map((url, index) => (
                        <button
                            key={url}
                            type="button"
                            onClick={() => {
                                setActive(index);
                                scrollToIndex(index);
                            }}
                            aria-label={`Go to image ${index + 1}`}
                            className={`w-1.5 h-1.5 rounded-full transition-colors cursor-pointer ${
                                index === active ? 'bg-blue-500' : 'bg-white/15'
                            }`}
                        />
                    ))}
                </div>
            )}

            {open && (
                <div
                    className={`fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 transition-opacity ease-out ${
                        entered ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{ transitionDuration: `${LIGHTBOX_TRANSITION_MS}ms` }}
                    onClick={closeLightbox}
                >
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            closeLightbox();
                        }}
                        aria-label="Close"
                        className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 cursor-pointer text-white flex items-center justify-center transition-colors"
                    >
                        ✕
                    </button>

                    {images.length > 1 && (
                        <>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    go(-1);
                                }}
                                disabled={active === 0}
                                aria-label="Previous image"
                                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-0 cursor-pointer disabled:cursor-default text-white flex items-center justify-center transition-colors"
                            >
                                ‹
                            </button>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    go(1);
                                }}
                                disabled={active === images.length - 1}
                                aria-label="Next image"
                                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-0 cursor-pointer disabled:cursor-default text-white flex items-center justify-center transition-colors"
                            >
                                ›
                            </button>
                        </>
                    )}

                    <div
                        className={`relative w-full h-full max-w-6xl transition-transform ease-out ${
                            entered ? 'scale-100' : 'scale-90'
                        }`}
                        style={{ transitionDuration: `${LIGHTBOX_TRANSITION_MS}ms` }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            key={active}
                            src={images[active]}
                            alt={`${title} screenshot ${active + 1}`}
                            fill
                            priority
                            className="object-contain animate-gallery-fade-in"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
