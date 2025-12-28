"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import { SubpageHeader } from "@/components/SubpageHeader";
import { motion } from "framer-motion";
import Link from "next/link";
import { generateArticleSchema } from "@/lib/structured-data";
import EkidenResultContent from "@/components/articles/EkidenResultContent";

interface NewsArticle {
    id: number;
    slug: string;
    title: string;
    date: string;
    category: string;
    description: string;
    content?: string;
    images?: string[];
    featured: boolean;
}

interface YearData {
    year: number;
    articles: NewsArticle[];
}

const availableYears = [2025, 2024];

export default function NewsArticlePage() {
    const params = useParams();
    const slug = params.slug as string;
    const [article, setArticle] = useState<NewsArticle | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 全年度のデータから記事を探す
        Promise.all(
            availableYears.map(year =>
                fetch(`/data/news/${year}.json`)
                    .then(res => res.json())
                    .then((data: YearData) => data.articles)
                    .catch(() => [])
            )
        ).then(results => {
            const allData = results.flat();
            const found = allData.find(a => a.slug === slug);
            setArticle(found || null);
            setLoading(false);
        });
    }, [slug]);

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("ja-JP", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white">
                <Header />
                <main className="flex items-center justify-center py-32">
                    <div className="text-[var(--gray-500)]">読み込み中...</div>
                </main>
                <Footer />
            </div>
        );
    }

    if (!article) {
        return (
            <div className="min-h-screen bg-white">
                <Header />
                <main>
                    <SubpageHeader
                        title="Not Found"
                        subtitle="記事が見つかりませんでした"
                        breadcrumbs={[
                            { label: "Topics", href: "/topics" },
                            { label: "News", href: "/topics/news" },
                        ]}
                    />
                    <section className="section-padding">
                        <div className="container-custom text-center">
                            <p className="text-[var(--gray-600)] mb-8">
                                お探しの記事は存在しないか、削除された可能性があります。
                            </p>
                            <Link
                                href="/topics/news"
                                className="inline-block px-6 py-3 bg-[var(--blue)] text-white font-bold text-sm uppercase tracking-widest hover:bg-[var(--blue-light)] transition-all"
                            >
                                ニュース一覧に戻る
                            </Link>
                        </div>
                    </section>
                </main>
                <Footer />
            </div>
        );
    }

    // 構造化データを生成
    const articleSchema = generateArticleSchema({
        headline: article.title,
        description: article.description || article.content?.substring(0, 200) || "",
        datePublished: article.date,
        dateModified: article.date,
        url: `https://sendai-ikuei-track.jp/topics/news/${article.slug}`,
    });

    return (
        <div className="min-h-screen bg-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />
            <Header />
            <main>
                <SubpageHeader
                    title="News"
                    subtitle={article.title}
                    breadcrumbs={[
                        { label: "Topics", href: "/topics" },
                        { label: "News", href: "/topics/news" },
                    ]}
                />

                <section className="section-padding relative">
                    <div className="container-custom">
                        <motion.article
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="max-w-3xl mx-auto"
                            itemScope
                            itemType="https://schema.org/NewsArticle"
                        >
                            <div className="mb-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="bg-[var(--blue)] text-white text-[10px] uppercase tracking-widest px-3 py-1 font-bold">
                                        {article.category}
                                    </span>
                                    <span className="text-[var(--gray-500)] text-sm font-mono">
                                        {formatDate(article.date)}
                                    </span>
                                </div>
                                <h1 className="text-3xl md:text-4xl font-black text-[var(--black)] leading-tight">
                                    {article.title}
                                </h1>
                            </div>

                            <div className="prose prose-lg max-w-none">
                                {article.slug === "76th-national-ekiden-news" ? (
                                    <EkidenResultContent />
                                ) : (
                                    <div className="bg-[var(--gray-50)] p-8 border border-[var(--gray-200)]">
                                        <div className="text-[var(--gray-700)] text-base leading-loose whitespace-pre-line">
                                            {article.content || article.description}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="mt-12 pt-8 border-t border-[var(--gray-200)]">
                                <Link
                                    href="/topics/news"
                                    className="inline-flex items-center gap-2 text-[var(--blue)] font-bold text-sm hover:gap-3 transition-all"
                                >
                                    <span>←</span>
                                    ニュース一覧に戻る
                                </Link>
                            </div>
                        </motion.article>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
