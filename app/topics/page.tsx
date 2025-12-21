"use client";

import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import { SubpageHeader } from "@/components/SubpageHeader";
import { motion } from "framer-motion";
import Link from "next/link";

const topicsLinks = [
    {
        title: "News",
        description: "お知らせ・ニュース",
        href: "/topics/news",
    },
    {
        title: "Results",
        description: "大会結果",
        href: "/topics/results",
    },
    {
        title: "Schedule",
        description: "年間スケジュール",
        href: "/topics/schedule",
    },
];

export default function TopicsPage() {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main>
                <SubpageHeader
                    title="Topics"
                    subtitle="お知らせ・大会結果"
                    breadcrumbs={[]}
                />

                <section className="section-padding relative">
                    <div className="container-custom">
                        <div className="max-w-3xl mx-auto">
                            <div className="grid gap-4">
                                {topicsLinks.map((link, i) => (
                                    <motion.div
                                        key={link.href}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        viewport={{ once: true }}
                                    >
                                        <Link
                                            href={link.href}
                                            className="block p-6 bg-[var(--gray-50)] border border-[var(--gray-200)] hover:border-[var(--blue)] transition-colors group"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h2 className="text-xl font-bold text-[var(--black)] group-hover:text-[var(--blue)] transition-colors">
                                                        {link.title}
                                                    </h2>
                                                    <p className="text-[var(--gray-500)] text-sm mt-1">
                                                        {link.description}
                                                    </p>
                                                </div>
                                                <span className="text-[var(--gray-400)] group-hover:text-[var(--blue)] transition-colors">
                                                    →
                                                </span>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
