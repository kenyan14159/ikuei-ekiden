import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import { SubpageHeader } from "@/components/SubpageHeader";
import Link from "next/link";
import { generateArticleSchema } from "@/lib/structured-data";
import NewsArticleContent from "./NewsArticleContent";

// JSONファイルを直接インポート（ビルド時に解決される）
import newsData2025 from "../../../../public/data/news/2025.json";
import newsData2024 from "../../../../public/data/news/2024.json";

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

// すべての年度データを配列にまとめる
const allYearData: YearData[] = [newsData2025 as YearData, newsData2024 as YearData];

// ビルド時にすべてのスラッグを取得
export async function generateStaticParams() {
    const allSlugs: { slug: string }[] = [];

    for (const data of allYearData) {
        data.articles.forEach((article) => {
            allSlugs.push({ slug: article.slug });
        });
    }

    return allSlugs;
}

// 記事データを取得
async function getArticle(slug: string): Promise<NewsArticle | null> {
    for (const data of allYearData) {
        const found = data.articles.find((a) => a.slug === slug);
        if (found) return found;
    }
    return null;
}

export default async function NewsArticlePage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const article = await getArticle(slug);

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("ja-JP", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

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
                        <NewsArticleContent
                            slug={article.slug}
                            category={article.category}
                            formattedDate={formatDate(article.date)}
                            title={article.title}
                            content={article.content}
                            description={article.description}
                        />
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
