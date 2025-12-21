import type { MetadataRoute } from "next";

const SITE_URL = "https://sendai-ikuei-track.jp";

export default function sitemap(): MetadataRoute.Sitemap {
    const currentDate = new Date().toISOString();

    return [
        // トップページ
        {
            url: SITE_URL,
            lastModified: currentDate,
            changeFrequency: "daily",
            priority: 1.0,
        },
        // メンバー
        {
            url: `${SITE_URL}/members`,
            lastModified: currentDate,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        // Topics
        {
            url: `${SITE_URL}/topics`,
            lastModified: currentDate,
            changeFrequency: "weekly",
            priority: 0.7,
        },
        {
            url: `${SITE_URL}/topics/schedule`,
            lastModified: currentDate,
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${SITE_URL}/topics/news`,
            lastModified: currentDate,
            changeFrequency: "daily",
            priority: 0.9,
        },
        {
            url: `${SITE_URL}/topics/results`,
            lastModified: currentDate,
            changeFrequency: "weekly",
            priority: 0.8,
        },
        // Team
        {
            url: `${SITE_URL}/team`,
            lastModified: currentDate,
            changeFrequency: "monthly",
            priority: 0.6,
        },
        {
            url: `${SITE_URL}/team/supporters`,
            lastModified: currentDate,
            changeFrequency: "monthly",
            priority: 0.6,
        },
        {
            url: `${SITE_URL}/team/thanks`,
            lastModified: currentDate,
            changeFrequency: "yearly",
            priority: 0.5,
        },
        {
            url: `${SITE_URL}/team/about-site`,
            lastModified: currentDate,
            changeFrequency: "yearly",
            priority: 0.4,
        },
        // お問い合わせ
        {
            url: `${SITE_URL}/contact`,
            lastModified: currentDate,
            changeFrequency: "yearly",
            priority: 0.5,
        },
    ];
}

