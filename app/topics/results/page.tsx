"use client";

import { useEffect, useState } from "react";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import { SubpageHeader } from "@/components/SubpageHeader";
import { motion } from "framer-motion";
import Link from "next/link";

interface NewsArticle {
    id: number;
    slug: string;
    title: string;
    date: string;
    category: string;
    description: string;
    featured: boolean;
    imageKey: string | null;
}

export default function ResultsPage() {
    const [articles, setArticles] = useState<NewsArticle[]>([]);

    useEffect(() => {
        fetch("/data/news.json")
            .then((res) => res.json())
            .then((json) => setArticles(json.articles.filter((a: NewsArticle) => a.category === "リザルト" || a.category === "大会結果")))
            .catch((err) => console.error("Failed to load results:", err));
    }, []);

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("ja-JP", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <div className="min-h-screen bg-[var(--dark-100)]">
            <Header />
            <main>
                <SubpageHeader
                    title="Results"
                    subtitle="各大会での熱戦の記録。選手たちの努力の結晶をご紹介します。"
                    breadcrumbs={[{ label: "Topics", href: "#" }]}
                />

                <section className="section-padding relative">
                    <div className="container-custom">
                        <div className="grid gap-6">
                            {articles.map((article, i) => (
                                <motion.div
                                    key={article.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <Link
                                        href={`#result-${article.slug}`}
                                        className="flex flex-col md:flex-row items-center gap-8 p-8 bg-[var(--dark-300)] border border-[var(--border)] hover:border-[var(--blue)] transition-all duration-300 group"
                                    >
                                        <div className="flex-shrink-0">
                                            <span className="text-[var(--blue)] font-bold text-xl font-mono">{formatDate(article.date)}</span>
                                        </div>
                                        <div className="flex-grow">
                                            <span className="bg-[var(--yellow)] text-dark text-[10px] uppercase tracking-widest px-3 py-1 font-bold mb-4 inline-block">
                                                {article.category}
                                            </span>
                                            <h2 className="text-white text-2xl md:text-3xl font-black italic tracking-tight group-hover:text-[var(--blue)] transition-colors">
                                                {article.title}
                                            </h2>
                                        </div>
                                        <div className="flex-shrink-0">
                                            <div className="w-12 h-12 border border-[var(--border)] flex items-center justify-center group-hover:bg-[var(--blue)] group-hover:border-[var(--blue)] transition-all duration-300">
                                                <svg className="w-5 h-5 text-white group-hover:text-dark transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
