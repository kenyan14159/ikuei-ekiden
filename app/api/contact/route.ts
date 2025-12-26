import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/logger";
import { sanitizeInput, sanitizeHTML } from "@/lib/sanitize";

export const runtime = "edge";

interface ContactFormData {
    name: string;
    email: string;
    category: string;
    message: string;
}

/**
 * メールアドレスのバリデーション
 */
function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 254;
}

/**
 * Edge Runtime対応のレート制限（Upstash Redis使用）
 * 環境変数が設定されていない場合は、簡易的なレート制限を使用
 */
async function checkRateLimit(ip: string): Promise<{ success: boolean; reset?: number }> {
    // Upstash Redisが設定されている場合
    const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
    const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;
    
    if (upstashUrl && upstashToken) {
        try {
            const { Ratelimit } = await import("@upstash/ratelimit");
            const { Redis } = await import("@upstash/redis");
            
            const ratelimit = new Ratelimit({
                redis: Redis.fromEnv(),
                limiter: Ratelimit.slidingWindow(5, "1 h"),
                analytics: true,
            });
            
            const { success, reset } = await ratelimit.limit(`contact:${ip}`);
            return { success, reset };
        } catch (error) {
            logger.error("Rate limit error (Upstash):", error);
            // フォールバック: レート制限をスキップ（ログに記録）
            return { success: true };
        }
    }
    
    // Upstashが設定されていない場合の簡易レート制限
    // 注意: Edge Runtimeではメモリが共有されないため、完全には機能しない
    // 本番環境では必ずUpstash Redisを設定すること
    logger.warn("Upstash Redis not configured. Rate limiting may not work correctly in Edge Runtime.");
    return { success: true };
}

/**
 * IPアドレスを取得
 */
function getClientIP(request: NextRequest): string {
    const forwarded = request.headers.get("x-forwarded-for");
    const realIP = request.headers.get("x-real-ip");
    return forwarded?.split(",")[0] || realIP || "unknown";
}

export async function POST(request: NextRequest) {
    try {
        // レート制限チェック
        const clientIP = getClientIP(request);
        const rateLimitResult = await checkRateLimit(clientIP);
        
        if (!rateLimitResult.success) {
            const headers: HeadersInit = {};
            if (rateLimitResult.reset) {
                headers["X-RateLimit-Reset"] = new Date(rateLimitResult.reset).toISOString();
            }
            
            return NextResponse.json(
                { 
                    error: "送信回数が上限に達しました。しばらくしてから再度お試しください。",
                    reset: rateLimitResult.reset ? new Date(rateLimitResult.reset).toISOString() : undefined
                },
                { status: 429, headers }
            );
        }

        const body: unknown = await request.json();

        // 型チェック
        if (!body || typeof body !== 'object') {
            return NextResponse.json(
                { error: "無効なリクエストです" },
                { status: 400 }
            );
        }

        const formData = body as Record<string, unknown>;

        // バリデーション
        if (!formData.name || !formData.email || !formData.category || !formData.message) {
            return NextResponse.json(
                { error: "必須項目が入力されていません" },
                { status: 400 }
            );
        }

        // 型チェックとサニタイゼーション
        const sanitizedData: ContactFormData = {
            name: sanitizeInput(String(formData.name)),
            email: String(formData.email).trim().toLowerCase(),
            category: sanitizeInput(String(formData.category)),
            message: sanitizeInput(String(formData.message)),
        };

        // メールアドレスのバリデーション
        if (!validateEmail(sanitizedData.email)) {
            return NextResponse.json(
                { error: "メールアドレスの形式が正しくありません" },
                { status: 400 }
            );
        }

        // メール送信処理
        // Resendを使用する場合の実装例
        const resendApiKey = process.env.RESEND_API_KEY;
        const contactEmail = process.env.CONTACT_EMAIL || "admin@sendai-ikuei-track.jp";

        if (resendApiKey) {
            try {
                // 動的インポート（Edge Runtime対応）
                const { Resend } = await import("resend");
                const resend = new Resend(resendApiKey);

                await resend.emails.send({
                    from: "noreply@sendai-ikuei-track.jp",
                    to: contactEmail,
                    subject: `[お問い合わせ] ${sanitizedData.category}`,
                    html: `
                        <h2>お問い合わせがありました</h2>
                        <p><strong>お名前:</strong> ${sanitizeHTML(sanitizedData.name)}</p>
                        <p><strong>メールアドレス:</strong> ${sanitizeHTML(sanitizedData.email)}</p>
                        <p><strong>項目:</strong> ${sanitizeHTML(sanitizedData.category)}</p>
                        <p><strong>内容:</strong></p>
                        <p>${sanitizeHTML(sanitizedData.message.replace(/\n/g, "<br>"))}</p>
                        <hr>
                        <p style="color: #666; font-size: 12px;">送信日時: ${new Date().toLocaleString("ja-JP")}</p>
                    `,
                });

                logger.info("Contact form submitted successfully", { 
                    email: sanitizedData.email.substring(0, 50), // 機密情報保護のため短縮
                    category: sanitizedData.category 
                });
            } catch (emailError) {
                logger.error("Failed to send email", emailError);
                // メール送信に失敗しても、ユーザーには成功を返す（ログに記録）
            }
        } else {
            // 開発環境でのログ出力
            logger.log("=== お問い合わせを受信 ===");
            logger.log(`お名前: ${sanitizedData.name}`);
            logger.log(`メール: ${sanitizedData.email}`);
            logger.log(`項目: ${sanitizedData.category}`);
            logger.log(`内容: ${sanitizedData.message}`);
            logger.log("========================");
            logger.warn("RESEND_API_KEY is not set. Email sending is disabled.", {});
        }

        return NextResponse.json(
            { message: "お問い合わせを受け付けました" },
            { status: 200 }
        );
    } catch (error) {
        logger.error("Contact form error", error);
        return NextResponse.json(
            { error: "送信中にエラーが発生しました" },
            { status: 500 }
        );
    }
}
