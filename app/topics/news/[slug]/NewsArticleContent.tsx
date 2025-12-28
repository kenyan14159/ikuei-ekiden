"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import EkidenResultContent from "@/components/articles/EkidenResultContent";

interface NewsArticleContentProps {
    slug: string;
    category: string;
    formattedDate: string;
    title: string;
    content?: string;
    description: string;
}

export default function NewsArticleContent({
    slug,
    category,
    formattedDate,
    title,
    content,
    description,
}: NewsArticleContentProps) {
    return (
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
                        {category}
                    </span>
                    <span className="text-[var(--gray-500)] text-sm font-mono">
                        {formattedDate}
                    </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-black text-[var(--black)] leading-tight">
                    {title}
                </h1>
            </div>

            <div className="prose prose-lg max-w-none">
                {slug === "76th-national-ekiden-news" ? (
                    <EkidenResultContent />
                ) : (
                    <div className="bg-[var(--gray-50)] p-8 border border-[var(--gray-200)]">
                        <div className="text-[var(--gray-700)] text-base leading-loose whitespace-pre-line">
                            {content || description}
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
    );
}
