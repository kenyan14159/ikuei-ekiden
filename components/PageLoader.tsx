"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface PageLoaderProps {
    onComplete?: () => void;
}

export default function PageLoader({ onComplete }: PageLoaderProps) {
    const [progress, setProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Simulate loading progress
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                // Accelerate progress as it gets closer to 100
                const increment = prev < 80 ? Math.random() * 15 + 5 : Math.random() * 5 + 2;
                return Math.min(prev + increment, 100);
            });
        }, 100);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (progress >= 100) {
            const timer = setTimeout(() => {
                setIsVisible(false);
                onComplete?.();
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [progress, onComplete]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                    className="page-loader"
                >
                    {/* Noise Overlay */}
                    <div className="absolute inset-0 noise-overlay" />

                    {/* Center Content */}
                    <div className="relative z-10 flex flex-col items-center">
                        {/* Logo/School Name */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="mb-8"
                        >
                            <div className="text-center">
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.6 }}
                                    className="w-16 h-16 mx-auto mb-6 border border-[var(--blue)] flex items-center justify-center"
                                >
                                    <span className="text-[var(--blue)] text-2xl font-bold">育</span>
                                </motion.div>
                                <h1 className="text-white text-sm tracking-[0.3em] uppercase font-medium mb-2">
                                    Sendai Ikuei
                                </h1>
                                <p className="text-[var(--muted-foreground)] text-xs tracking-[0.2em]">
                                    Long Distance Track & Field
                                </p>
                            </div>
                        </motion.div>

                        {/* Progress Number */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="text-center"
                        >
                            <span className="stat-number text-4xl">
                                {Math.round(progress)}
                            </span>
                            <span className="text-[var(--blue)] text-lg ml-1">%</span>
                        </motion.div>
                    </div>

                    {/* Progress Bar */}
                    <div
                        className="loader-progress"
                        style={{ width: `${progress}%` }}
                    />

                    {/* Corner Decorations */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="absolute top-8 left-8 w-8 h-8 border-l border-t border-[var(--border)]"
                    />
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="absolute top-8 right-8 w-8 h-8 border-r border-t border-[var(--border)]"
                    />
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="absolute bottom-8 left-8 w-8 h-8 border-l border-b border-[var(--border)]"
                    />
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="absolute bottom-8 right-8 w-8 h-8 border-r border-b border-[var(--border)]"
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
