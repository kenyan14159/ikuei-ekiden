/**
 * SEO最適化された画像alt属性を生成するユーティリティ
 */

const TEAM_NAME = "仙台育英陸上部長距離";

/**
 * 選手画像のalt属性を生成
 */
export function generatePlayerAlt(
    name: string,
    grade?: string,
    middleSchool?: string
): string {
    const parts = [name];
    if (grade) parts.push(`（${grade}`);
    if (middleSchool) parts.push(`・${middleSchool}出身）`);
    else if (grade) parts.push("）");
    parts.push(` - ${TEAM_NAME}`);
    return parts.join("");
}

/**
 * 大会画像のalt属性を生成
 */
export function generateEventAlt(
    eventName: string,
    year?: string,
    detail?: string
): string {
    const parts = [];
    if (year) parts.push(`${year}年`);
    parts.push(eventName);
    if (detail) parts.push(` ${detail}`);
    parts.push(` - ${TEAM_NAME}`);
    return parts.join("");
}

/**
 * 練習画像のalt属性を生成
 */
export function generateTrainingAlt(
    trainingType: string,
    location?: string,
    year?: string
): string {
    const parts = [];
    if (year) parts.push(`${year}年`);
    parts.push(trainingType);
    if (location) parts.push(`（${location}）`);
    parts.push(` - ${TEAM_NAME}の練習風景`);
    return parts.join("");
}

/**
 * ニュース画像のalt属性を生成
 */
export function generateNewsAlt(title: string, date?: string): string {
    const parts = [title];
    if (date) parts.push(`（${date}）`);
    parts.push(` - ${TEAM_NAME}ニュース`);
    return parts.join("");
}

/**
 * 汎用alt属性を生成
 */
export function generateGenericAlt(description: string): string {
    return `${description} - ${TEAM_NAME}`;
}

/**
 * alt属性のバリデーション
 */
export function validateAlt(alt: string): {
    isValid: boolean;
    warnings: string[];
} {
    const warnings: string[] = [];

    if (alt.length < 10) {
        warnings.push("alt属性が短すぎます（より詳細な説明を推奨）");
    }

    if (alt.length > 125) {
        warnings.push("alt属性が長すぎます（125文字以下を推奨）");
    }

    if (/^image|photo|picture/i.test(alt)) {
        warnings.push("「image」「photo」などの接頭辞は不要です");
    }

    return {
        isValid: warnings.length === 0,
        warnings,
    };
}
