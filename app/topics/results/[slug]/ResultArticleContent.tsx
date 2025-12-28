"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import EkidenResultContent from "@/components/articles/EkidenResultContent";

interface ResultArticleContentProps {
    slug: string;
    formattedDate: string;
    title: string;
    content?: string;
    description: string;
}

export default function ResultArticleContent({
    slug,
    formattedDate,
    title,
    content,
    description,
}: ResultArticleContentProps) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
        >
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                    <span className="bg-yellow-500 text-white text-[10px] uppercase tracking-widest px-3 py-1 font-bold">
                        リザルト
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
                {slug === "76th-national-ekiden-result" ? (
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
                    href="/topics/results"
                    className="inline-flex items-center gap-2 text-[var(--blue)] font-bold text-sm hover:gap-3 transition-all"
                >
                    <span>←</span>
                    リザルト一覧に戻る
                </Link>
            </div>
        </motion.article>
    );
}
