import type { MetadataRoute } from "next";

const SITE_URL = "https://sendai-ikuei-track.jp";

export default function sitemap(): MetadataRoute.Sitemap {
    const currentDate = new Date().toISOString();

    return [
        {
            url: SITE_URL,
            lastModified: currentDate,
            changeFrequency: "daily",
            priority: 1.0,
        },
        {
            url: `${SITE_URL}/members`,
            lastModified: currentDate,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${SITE_URL}/schedule`,
            lastModified: currentDate,
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${SITE_URL}/news`,
            lastModified: currentDate,
            changeFrequency: "daily",
            priority: 0.9,
        },
        {
            url: `${SITE_URL}/results`,
            lastModified: currentDate,
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${SITE_URL}/recruit`,
            lastModified: currentDate,
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${SITE_URL}/contact`,
            lastModified: currentDate,
            changeFrequency: "yearly",
            priority: 0.5,
        },
    ];
}
