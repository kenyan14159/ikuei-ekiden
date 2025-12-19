/**
 * 構造化データ（JSON-LD）生成ユーティリティ
 * Schema.org準拠のJSON-LDを生成
 */

const SITE_NAME = "仙台育英学園高等学校 陸上競技部 長距離ブロック";
const SITE_URL = "https://sendai-ikuei-track.jp";

/**
 * SportsTeam スキーマを生成
 */
export function generateSportsTeamSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "SportsTeam",
        name: SITE_NAME,
        sport: "陸上競技",
        url: SITE_URL,
        memberOf: {
            "@type": "EducationalOrganization",
            name: "仙台育英学園高等学校",
        },
        location: {
            "@type": "Place",
            name: "宮城県",
            address: {
                "@type": "PostalAddress",
                addressRegion: "宮城県",
                addressCountry: "JP",
            },
        },
    };
}

/**
 * BreadcrumbList スキーマを生成
 */
export function generateBreadcrumbSchema(
    items: { name: string; url: string }[]
) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };
}

/**
 * NewsArticle スキーマを生成
 */
export function generateArticleSchema(params: {
    headline: string;
    description: string;
    datePublished: string;
    dateModified?: string;
    image?: string;
    url: string;
}) {
    return {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        headline: params.headline,
        description: params.description,
        datePublished: params.datePublished,
        dateModified: params.dateModified || params.datePublished,
        image: params.image ? `${SITE_URL}${params.image}` : undefined,
        url: params.url,
        publisher: {
            "@type": "Organization",
            name: SITE_NAME,
            url: SITE_URL,
        },
    };
}

/**
 * Person（選手）スキーマを生成
 */
export function generatePersonSchema(params: {
    name: string;
    middleSchool?: string;
    image?: string;
}) {
    return {
        "@context": "https://schema.org",
        "@type": "Person",
        name: params.name,
        affiliation: {
            "@type": "SportsTeam",
            name: SITE_NAME,
        },
        alumniOf: params.middleSchool
            ? {
                "@type": "EducationalOrganization",
                name: params.middleSchool,
            }
            : undefined,
        image: params.image ? `${SITE_URL}${params.image}` : undefined,
    };
}

/**
 * SportsEvent スキーマを生成
 */
export function generateSportsEventSchema(params: {
    name: string;
    startDate: string;
    endDate?: string;
    location: string;
}) {
    return {
        "@context": "https://schema.org",
        "@type": "SportsEvent",
        name: params.name,
        startDate: params.startDate,
        endDate: params.endDate || params.startDate,
        location: {
            "@type": "Place",
            name: params.location,
        },
        organizer: {
            "@type": "SportsTeam",
            name: SITE_NAME,
        },
    };
}

/**
 * WebSite スキーマを生成
 */
export function generateWebSiteSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: SITE_NAME,
        url: SITE_URL,
        potentialAction: {
            "@type": "SearchAction",
            target: `${SITE_URL}/search?q={search_term_string}`,
            "query-input": "required name=search_term_string",
        },
    };
}
