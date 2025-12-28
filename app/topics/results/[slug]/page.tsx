import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import { SubpageHeader } from "@/components/SubpageHeader";
import Link from "next/link";
import ResultArticleContent from "./ResultArticleContent";

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
        // リザルトカテゴリの記事のみを含める
        data.articles
            .filter((article) => article.category === "リザルト")
            .forEach((article) => {
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

export default async function ResultArticlePage({
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
                            { label: "Results", href: "/topics/results" },
                        ]}
                    />
                    <section className="section-padding">
                        <div className="container-custom text-center">
                            <p className="text-[var(--gray-600)] mb-8">
                                お探しの記事は存在しないか、削除された可能性があります。
                            </p>
                            <Link
                                href="/topics/results"
                                className="inline-block px-6 py-3 bg-[var(--blue)] text-white font-bold text-sm uppercase tracking-widest hover:bg-[var(--blue-light)] transition-all"
                            >
                                リザルト一覧に戻る
                            </Link>
                        </div>
                    </section>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main>
                <SubpageHeader
                    title="Results"
                    subtitle={article.title}
                    breadcrumbs={[
                        { label: "Topics", href: "/topics" },
                        { label: "Results", href: "/topics/results" },
                    ]}
                />

                <section className="section-padding relative">
                    <div className="container-custom">
                        <ResultArticleContent
                            slug={article.slug}
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
