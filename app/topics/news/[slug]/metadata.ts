import type { Metadata } from "next";
import { generateArticleSchema } from "@/lib/structured-data";

const SITE_URL = "https://sendai-ikuei-track.jp";

interface NewsArticle {
    id: number;
    slug: string;
    title: string;
    date: string;
    category: string;
    description: string;
    content?: string;
    featured: boolean;
    imageKey?: string;
}

interface YearData {
    year: number;
    articles: NewsArticle[];
}

const availableYears = [2025, 2024];

async function getArticle(slug: string): Promise<NewsArticle | null> {
    try {
        const results = await Promise.all(
            availableYears.map(async (year) => {
                try {
                    const response = await fetch(`${SITE_URL}/data/news/${year}.json`, {
                        next: { revalidate: 3600 }, // 1時間キャッシュ
                    });
                    if (!response.ok) return { articles: [] };
                    const data: YearData = await response.json();
                    return data;
                } catch {
                    return { articles: [] };
                }
            })
        );

        const allArticles = results.flatMap((data) => data.articles);
        return allArticles.find((a) => a.slug === slug) || null;
    } catch {
        return null;
    }
}

export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Promise<Metadata> {
    const article = await getArticle(params.slug);

    if (!article) {
        return {
            title: "記事が見つかりません | 仙台育英陸上競技部",
            description: "お探しの記事は存在しないか、削除された可能性があります。",
        };
    }

    const imageUrl = article.imageKey
        ? `${SITE_URL}/images/news/${article.imageKey}`
        : `${SITE_URL}/images/ikuei-ekiden.png`;

    return {
        title: `${article.title} | 仙台育英陸上競技部`,
        description: article.description || article.content?.substring(0, 160) || "",
        keywords: ["仙台育英", "陸上競技部", article.category, "高校陸上"],
        openGraph: {
            title: article.title,
            description: article.description || article.content?.substring(0, 160) || "",
            type: "article",
            publishedTime: article.date,
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: article.title,
                },
            ],
            siteName: "仙台育英学園高等学校 陸上競技部 長距離ブロック",
        },
        twitter: {
            card: "summary_large_image",
            title: article.title,
            description: article.description || article.content?.substring(0, 160) || "",
            images: [imageUrl],
        },
    };
}

export async function generateStructuredData(slug: string) {
    const article = await getArticle(slug);
    if (!article) return null;

    return generateArticleSchema({
        headline: article.title,
        description: article.description || article.content?.substring(0, 200) || "",
        datePublished: article.date,
        dateModified: article.date,
        image: article.imageKey ? `/images/news/${article.imageKey}` : "/images/ikuei-ekiden.png",
        url: `${SITE_URL}/topics/news/${article.slug}`,
    });
}

