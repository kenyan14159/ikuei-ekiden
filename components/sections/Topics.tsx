"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
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

export default function Topics() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/news.json")
      .then((res) => res.json())
      .then((data) => {
        setArticles(data.articles);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load news:", err);
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

  const featuredArticles = articles.filter((a) => a.featured);
  const additionalArticles = articles.filter((a) => !a.featured);

  return (
    <section id="topics" className="section-padding relative" ref={ref}>
      <div className="absolute inset-0 bg-[var(--dark-100)]" />
      <div className="absolute inset-0 noise-overlay" />

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
            <h2 className="section-title text-white">
              最新トピックス
            </h2>
            <p className="text-[var(--muted-foreground)] mt-6 max-w-xl">
              最新ニュースとリザルト情報をお届けします
            </p>
          </div>
        </motion.div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center text-[var(--muted-foreground)] py-12">
            読み込み中...
          </div>
        ) : (
          <>
            {/* Featured Topics */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {featuredArticles.map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <Link href={`#topic-${article.id}`} className="block">
                    {/* Image Placeholder */}
                    <div className="aspect-video bg-[var(--dark-300)] mb-4 overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--dark-100)] to-transparent opacity-60" />
                      <div className="absolute top-4 left-4">
                        <span className="bg-[var(--blue)] text-white text-xs px-3 py-1">
                          {article.category}
                        </span>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="text-[var(--muted-foreground)] text-xs block mb-2">
                          {formatDate(article.date)}
                        </span>
                        <h3 className="text-white text-lg md:text-xl font-bold group-hover:text-[var(--blue)] transition-colors">
                          {article.title}
                        </h3>
                      </div>
                    </div>
                    <span className="text-[var(--blue)] text-sm inline-flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      記事を読む
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </Link>
                </motion.article>
              ))}

              {/* Result Card for non-featured */}
              {articles.filter((a) => !a.featured && a.category === "リザルト").slice(0, 1).map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="group"
                >
                  <Link href={`#topic-${article.id}`} className="block">
                    <div className="aspect-video bg-[var(--dark-300)] mb-4 overflow-hidden relative flex items-center justify-center">
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--dark-100)] to-transparent opacity-60" />
                      <div className="absolute top-4 left-4">
                        <span className="bg-[var(--yellow)] text-[var(--dark-100)] text-xs px-3 py-1">
                          {article.category}
                        </span>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="text-[var(--muted-foreground)] text-xs block mb-2">
                          {formatDate(article.date)}
                        </span>
                        <h3 className="text-white text-lg md:text-xl font-bold group-hover:text-[var(--blue)] transition-colors">
                          {article.title}
                        </h3>
                      </div>
                    </div>
                    <span className="text-[var(--blue)] text-sm inline-flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      記事を読む
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </Link>
                </motion.article>
              ))}
            </div>

            {/* Additional News List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="border-t border-[var(--border)] pt-8"
            >
              {additionalArticles.slice(0, 3).map((article, index) => (
                <Link
                  key={index}
                  href="#"
                  className="group flex flex-col md:flex-row md:items-center gap-2 md:gap-4 py-4 border-b border-[var(--border)] hover:border-[var(--blue)] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[var(--muted-foreground)] text-xs">{formatDate(article.date)}</span>
                    <span className="text-[var(--blue)] text-xs px-2 py-1 border border-[var(--blue)] opacity-60">
                      {article.category}
                    </span>
                  </div>
                  <h3 className="text-white font-medium group-hover:text-[var(--blue)] transition-colors flex-grow">
                    {article.title}
                  </h3>
                  <svg className="w-5 h-5 text-[var(--muted-foreground)] group-hover:text-[var(--blue)] transition-colors hidden md:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              ))}
            </motion.div>
          </>
        )}

        {/* Navigation Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-wrap gap-4 justify-center mt-12"
        >
          <Link href="#news" className="btn-outline">
            <span>ニュースへ</span>
          </Link>
          <Link href="#results" className="btn-outline">
            <span>リザルトへ</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
