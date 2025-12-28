import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import { SubpageHeader } from "@/components/SubpageHeader";
import Link from "next/link";
import ResultArticleContent from "./ResultArticleContent";
import fs from "fs";
import path from "path";

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

// ビルド時にすべてのスラッグを取得
export async function generateStaticParams() {
    const allSlugs: { slug: string }[] = [];

    for (const year of availableYears) {
        try {
            const filePath = path.join(process.cwd(), "public", "data", "news", `${year}.json`);
            const fileContents = fs.readFileSync(filePath, "utf8");
            const data: YearData = JSON.parse(fileContents);
            // リザルトカテゴリの記事のみを含める
            data.articles
                .filter((article) => article.category === "リザルト")
                .forEach((article) => {
                    allSlugs.push({ slug: article.slug });
                });
        } catch {
            // ファイルが見つからない場合はスキップ
        }
    }

    return allSlugs;
}

// 記事データを取得
async function getArticle(slug: string): Promise<NewsArticle | null> {
    for (const year of availableYears) {
        try {
            const filePath = path.join(process.cwd(), "public", "data", "news", `${year}.json`);
            const fileContents = fs.readFileSync(filePath, "utf8");
            const data: YearData = JSON.parse(fileContents);
            const found = data.articles.find((a) => a.slug === slug);
            if (found) return found;
        } catch {
            // ファイルが見つからない場合はスキップ
        }
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
