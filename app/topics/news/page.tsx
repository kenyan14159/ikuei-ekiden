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
    content?: string;
    featured: boolean;
}

interface YearData {
    year: number;
    articles: NewsArticle[];
}

const availableYears = [2025, 2024];

export default function NewsPage() {
    const [allArticles, setAllArticles] = useState<NewsArticle[]>([]);
    const [selectedYear, setSelectedYear] = useState<number | null>(null);

    useEffect(() => {
        // 全年度のデータを読み込む
        Promise.all(
            availableYears.map(year =>
                fetch(`/data/news/${year}.json`)
                    .then(res => res.json())
                    .then((data: YearData) => data.articles)
                    .catch(() => [])
            )
        ).then(results => {
            const allData = results.flat();
            // ニュース・お知らせのみフィルタ
            const newsOnly = allData.filter(a =>
                a.category === "ニュース" || a.category === "お知らせ"
            );
            setAllArticles(newsOnly);
        });
    }, []);

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    const getYear = (dateStr: string) => new Date(dateStr).getFullYear();

    const filteredArticles = selectedYear
        ? allArticles.filter(a => getYear(a.date) === selectedYear)
        : allArticles;

    const years = [...new Set(allArticles.map(a => getYear(a.date)))].sort((a, b) => b - a);

    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main>
                <SubpageHeader
                    title="News"
                    subtitle="お知らせ"
                    breadcrumbs={[{ label: "Topics", href: "/topics" }]}
                />

                <section className="section-padding relative">
                    <div className="container-custom">
                        {/* 年度フィルタ */}
                        <div className="mb-8 flex flex-wrap gap-2">
                            <button
                                onClick={() => setSelectedYear(null)}
                                className={`px-4 py-2 text-sm font-bold transition-all ${selectedYear === null
                                    ? "bg-[var(--blue)] text-white"
                                    : "bg-[var(--gray-100)] text-[var(--black)] hover:bg-[var(--gray-200)]"
                                    }`}
                            >
                                すべて
                            </button>
                            {years.map(year => (
                                <button
                                    key={year}
                                    onClick={() => setSelectedYear(year)}
                                    className={`px-4 py-2 text-sm font-bold transition-all ${selectedYear === year
                                        ? "bg-[var(--blue)] text-white"
                                        : "bg-[var(--gray-100)] text-[var(--black)] hover:bg-[var(--gray-200)]"
                                        }`}
                                >
                                    {year}年
                                </button>
                            ))}
                        </div>

                        {filteredArticles.length === 0 ? (
                            <div className="text-center text-[var(--gray-500)] py-12">
                                ニュースはまだありません。
                            </div>
                        ) : (
                            <div className="border-t border-[var(--gray-200)]">
                                {filteredArticles.map((article, i) => (
                                    <motion.article
                                        key={article.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.03 }}
                                        viewport={{ once: true }}
                                        className="border-b border-[var(--gray-200)] py-6"
                                    >
                                        <Link
                                            href={`/topics/news/${article.slug}`}
                                            className="block group"
                                        >
                                            <h2 className="text-[var(--black)] text-lg font-bold mb-2 group-hover:text-[var(--blue)] transition-colors">
                                                {article.title}
                                            </h2>
                                            <p className="text-[var(--gray-500)] text-sm font-mono mb-3">
                                                {formatDate(article.date)}
                                            </p>
                                            <span className="text-[var(--blue)] text-sm font-bold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                                                続きを読む
                                                <span>→</span>
                                            </span>
                                        </Link>
                                    </motion.article>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
