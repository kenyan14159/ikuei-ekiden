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

export default function NewsPage() {
    const [articles, setArticles] = useState<NewsArticle[]>([]);

    useEffect(() => {
        fetch("/data/news.json")
            .then((res) => res.json())
            .then((json) => setArticles(json.articles))
            .catch((err) => console.error("Failed to load news:", err));
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
                    title="News"
                    subtitle="最新のチーム活動や合宿の様子、重要なお知らせをお伝えします。"
                    breadcrumbs={[{ label: "Topics", href: "#" }]}
                />

                <section className="section-padding relative">
                    <div className="container-custom">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                            {articles.map((article, i) => (
                                <motion.article
                                    key={article.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    viewport={{ once: true }}
                                    className="group"
                                >
                                    <Link href={`#news-${article.slug}`} className="block">
                                        <div className="aspect-video bg-[var(--dark-300)] mb-6 overflow-hidden relative">
                                            <div className="absolute inset-0 bg-gradient-to-t from-[var(--dark-100)] via-transparent to-transparent opacity-60" />
                                            <div className="absolute top-4 left-4">
                                                <span className="bg-[var(--blue)] text-white text-[10px] uppercase tracking-widest px-3 py-1 font-bold">
                                                    {article.category}
                                                </span>
                                            </div>
                                        </div>
                                        <span className="text-[var(--muted-foreground)] text-xs block mb-3 font-mono">
                                            {formatDate(article.date)}
                                        </span>
                                        <h2 className="text-white text-xl md:text-2xl font-bold mb-4 group-hover:text-[var(--blue)] transition-colors line-clamp-2">
                                            {article.title}
                                        </h2>
                                        <p className="text-[var(--muted-foreground)] text-sm mb-6 line-clamp-3 leading-relaxed">
                                            {article.description}
                                        </p>
                                        <div className="flex items-center gap-2 text-[var(--blue)] text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                                            Read More
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </div>
                                    </Link>
                                </motion.article>
                            ))}
                        </div>

                        {/* Pagination Placeholder */}
                        <div className="mt-20 pt-10 border-t border-[var(--border)] flex justify-center">
                            <div className="flex gap-4">
                                <span className="w-10 h-10 flex items-center justify-center bg-[var(--blue)] text-dark font-bold">1</span>
                                <span className="w-10 h-10 flex items-center justify-center border border-[var(--border)] text-[var(--muted-foreground)] hover:border-[var(--blue)] hover:text-white transition-colors cursor-pointer">2</span>
                                <span className="w-10 h-10 flex items-center justify-center border border-[var(--border)] text-[var(--muted-foreground)] hover:border-[var(--blue)] hover:text-white transition-colors cursor-pointer">3</span>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
