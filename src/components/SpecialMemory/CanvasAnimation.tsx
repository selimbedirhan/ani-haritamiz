import { useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

interface CanvasAnimationProps {
    onClose: () => void;
}

interface Particle {
    x: number;
    y: number;
    originX: number;
    originY: number;
    color: string;
    size: number;
    vx: number;
    vy: number;
}

export function CanvasAnimation({ onClose }: CanvasAnimationProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const mouseRef = useRef({ x: 0, y: 0 });
    const animationRef = useRef<number>();

    const initParticles = useCallback((canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
        const text = '❤️ Seni Seviyorum ❤️';
        const fontSize = Math.min(canvas.width / 10, 80);

        ctx.font = `bold ${fontSize}px Arial`;
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Draw text to get pixel data
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillText(text, canvas.width / 2, canvas.height / 2);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;

        const particles: Particle[] = [];
        const gap = 4; // Spacing between particles

        for (let y = 0; y < canvas.height; y += gap) {
            for (let x = 0; x < canvas.width; x += gap) {
                const index = (y * canvas.width + x) * 4;
                const alpha = pixels[index + 3];

                if (alpha > 128) {
                    particles.push({
                        x: Math.random() * canvas.width,
                        y: Math.random() * canvas.height,
                        originX: x,
                        originY: y,
                        color: `hsl(${Math.random() * 60 + 320}, 80%, 60%)`, // Pink-purple hues
                        size: Math.random() * 2 + 1,
                        vx: 0,
                        vy: 0,
                    });
                }
            }
        }

        particlesRef.current = particles;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, []);

    const animate = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const mouse = mouseRef.current;
        const mouseRadius = 100;

        particlesRef.current.forEach(particle => {
            // Mouse repulsion
            const dx = mouse.x - particle.x;
            const dy = mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < mouseRadius) {
                const force = (mouseRadius - distance) / mouseRadius;
                particle.vx -= (dx / distance) * force * 3;
                particle.vy -= (dy / distance) * force * 3;
            }

            // Return to origin with spring physics
            const originDx = particle.originX - particle.x;
            const originDy = particle.originY - particle.y;

            particle.vx += originDx * 0.03;
            particle.vy += originDy * 0.03;

            // Apply friction
            particle.vx *= 0.92;
            particle.vy *= 0.92;

            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Draw particle
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
        });

        animationRef.current = requestAnimationFrame(animate);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles(canvas, ctx);
        };

        resize();
        window.addEventListener('resize', resize);

        // Mouse tracking
        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches.length > 0) {
                mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', handleTouchMove);

        // Start animation
        animationRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [initParticles, animate]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-gradient-to-br from-purple-900/95 via-pink-900/95 to-red-900/95"
        >
            <canvas
                ref={canvasRef}
                className="absolute inset-0"
            />

            {/* Close button */}
            <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                onClick={onClose}
                className="absolute top-6 right-6 w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-white/20 transition-colors z-50"
            >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </motion.button>

            {/* Hint text */}
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 text-sm"
            >
                Fareyi hareket ettir...
            </motion.p>
        </motion.div>
    );
}
