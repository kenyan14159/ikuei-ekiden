"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { logger } from "@/lib/logger";

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

export default function Topics() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 年度別JSONファイルから記事を取得
    const availableYears = [2025, 2024];
    Promise.all(
      availableYears.map(year =>
        fetch(`/data/news/${year}.json`)
          .then(res => res.json())
          .then(data => data.articles || [])
          .catch(() => [])
      )
    ).then(results => {
      const allArticles = results.flat().sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      setArticles(allArticles);
      setLoading(false);
    }).catch(err => {
      logger.error("Failed to load news:", err);
      setLoading(false);
    });
  }, []);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // フィーチャー記事、またはカテゴリがニュース・リザルトの最新3件を表示
  const displayArticles = articles.slice(0, 3);

  // カテゴリに応じたリンク先を取得
  const getArticleLink = (article: NewsArticle) => {
    if (article.category === "リザルト" || article.category === "大会結果") {
      return `/topics/results/${article.slug}`;
    }
    return `/topics/news/${article.slug}`;
  };

  return (
    <section id="topics" className="section-padding relative bg-white" ref={ref}>
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12"
        >
          <div>
            <span className="text-[var(--blue)] text-sm tracking-widest uppercase mb-4 block">
              Topics
            </span>
            <h2 className="section-title text-[var(--black)]">
              最新トピックス
            </h2>
            <p className="text-[var(--gray-600)] mt-6 max-w-xl">
              最新ニュースとリザルト情報をお届けします
            </p>
          </div>
        </motion.div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center text-[var(--gray-500)] py-12">
            読み込み中...
          </div>
        ) : (
          <>
            {/* Featured Topics - 統一サイズカード */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {displayArticles.map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group h-full"
                >
                  <Link href={getArticleLink(article)} className="flex flex-col h-full p-6 bg-[var(--gray-50)] border border-[var(--gray-200)] hover:border-[var(--blue)] hover:shadow-lg transition-all duration-300">
                    {/* Category & Date */}
                    <div className="flex items-center gap-3 mb-3">
                      <span className="bg-[var(--blue)] text-white text-[10px] uppercase tracking-widest px-3 py-1 font-bold">
                        {article.category}
                      </span>
                    </div>

                    <span className="text-[var(--gray-500)] text-xs mb-2">
                      {formatDate(article.date)}
                    </span>

                    {/* Title */}
                    <h3 className="text-[var(--black)] text-lg font-bold mb-3 group-hover:text-[var(--blue)] transition-colors line-clamp-2 flex-grow">
                      {article.title}
                    </h3>

                    {/* Read More */}
                    <span className="text-[var(--blue)] text-sm font-bold inline-flex items-center gap-2 group-hover:gap-3 transition-all mt-auto">
                      記事を読む
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </Link>
                </motion.article>
              ))}
            </div>
          </>
        )}

        {/* Navigation Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <Link href="/topics/news" className="px-6 py-3 border-2 border-[var(--black)] text-[var(--black)] font-bold text-sm tracking-wider uppercase hover:bg-[var(--black)] hover:text-white transition-all">
            ニュースへ
          </Link>
          <Link href="/topics/results" className="px-6 py-3 border-2 border-[var(--black)] text-[var(--black)] font-bold text-sm tracking-wider uppercase hover:bg-[var(--black)] hover:text-white transition-all">
            リザルトへ
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
