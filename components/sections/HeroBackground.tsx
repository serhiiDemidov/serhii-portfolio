'use client';

import { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    opacity: number;
    opacityDelta: number;
}

const CONNECTION_DISTANCE = 120;
const PARTICLE_COUNT = 40;
const TARGET_FPS = 30;
const FRAME_INTERVAL = 1000 / TARGET_FPS;

function createParticle(w: number, h: number): Particle {
    const angle = Math.random() * Math.PI * 2;
    const speed = 0.15 + Math.random() * 0.2;
    return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: 1 + Math.random() * 1.2,
        opacity: 0.2 + Math.random() * 0.4,
        opacityDelta: (Math.random() - 0.5) * 0.003,
    };
}

export default function HeroBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animId: number;
        let lastTime = 0;
        let particles: Particle[] = [];

        function resize() {
            if (!canvas) return;
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        }

        function init() {
            if (!canvas) return;
            resize();
            particles = Array.from({ length: PARTICLE_COUNT }, () =>
                createParticle(canvas!.width, canvas!.height),
            );
        }

        function draw(timestamp: number) {
            animId = requestAnimationFrame(draw);

            if (document.hidden) return;

            const elapsed = timestamp - lastTime;
            if (elapsed < FRAME_INTERVAL) return;
            lastTime = timestamp - (elapsed % FRAME_INTERVAL);

            if (!canvas || !ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (const p of particles) {
                p.opacity += p.opacityDelta;
                if (p.opacity > 0.6 || p.opacity < 0.1) p.opacityDelta *= -1;

                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(96,165,250,${p.opacity})`;
                ctx.fill();
            }

            const distSq = CONNECTION_DISTANCE * CONNECTION_DISTANCE;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const a = particles[i];
                    const b = particles[j];
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    if (dx * dx + dy * dy < distSq) {
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        const alpha = (1 - dist / CONNECTION_DISTANCE) * 0.1;
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.strokeStyle = `rgba(96,165,250,${alpha})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
        }

        const ro = new ResizeObserver(resize);
        ro.observe(canvas);

        init();
        animId = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(animId);
            ro.disconnect();
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            aria-hidden
        />
    );
}
