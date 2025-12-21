"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface Props {
    title: string;
    subtitle?: string;
    breadcrumbs: { label: string; href: string }[];
}

export function SubpageHeader({ title, subtitle, breadcrumbs }: Props) {
    return (
        <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-100">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--blue)] to-transparent opacity-50" />
            <div className="absolute top-[-20%] right-[-10%] w-[400px] h-[400px] bg-[var(--blue)]/5 rounded-full blur-[80px]" />

            <div className="container-custom relative z-10">
                {/* Breadcrumbs */}
                <motion.nav
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex items-center gap-2 mb-8"
                >
                    <Link href="/" className="text-[var(--gray-500)] hover:text-[var(--blue)] transition-colors text-xs uppercase tracking-widest">
                        Home
                    </Link>
                    {breadcrumbs.map((crumb, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <span className="text-[var(--gray-400)] text-[10px]">/</span>
                            <Link href={crumb.href} className="text-[var(--gray-500)] hover:text-[var(--blue)] transition-colors text-xs uppercase tracking-widest">
                                {crumb.label}
                            </Link>
                        </div>
                    ))}
                    <span className="text-[var(--gray-400)] text-[10px]">/</span>
                    <span className="text-[var(--black)] text-xs uppercase tracking-widest font-bold">
                        {title}
                    </span>
                </motion.nav>

                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <h1 className="text-[var(--black)] italic font-black text-5xl md:text-7xl lg:text-8xl mb-6 tracking-tighter" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                        {title}
                    </h1>
                    {subtitle && (
                        <p className="text-[var(--gray-600)] text-lg md:text-xl max-w-2xl tracking-widest">
                            {subtitle}
                        </p>
                    )}
                </motion.div>
            </div>

            {/* Decorative Large Text */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.03 }}
                transition={{ duration: 1.5 }}
                className="absolute -bottom-[5%] -right-[5%] pointer-events-none select-none"
            >
                <span className="text-[var(--gray-400)] text-[15vw] font-black tracking-tighter uppercase">
                    {title}
                </span>
            </motion.div>
        </section>
    );
}
