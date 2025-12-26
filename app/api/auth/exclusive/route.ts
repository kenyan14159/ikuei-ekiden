import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/logger";
import { createAuthToken, verifyAuthToken } from "@/lib/auth";

// Cloudflare Workers/PagesのEdge Runtimeを使用
export const runtime = "edge";

// 環境変数から取得（デフォルト値なしで必須にする）
const CORRECT_PASSWORD = process.env.EXCLUSIVE_PASSWORD;

if (!CORRECT_PASSWORD && process.env.NODE_ENV === "production") {
  throw new Error("EXCLUSIVE_PASSWORD environment variable is required in production");
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { password } = body;

        if (!password) {
            return NextResponse.json(
                { success: false, error: "パスワードが入力されていません" },
                { status: 400 }
            );
        }

        // パスワードが設定されていない場合は開発環境でのみデフォルト値を使用
        const validPassword = CORRECT_PASSWORD || (process.env.NODE_ENV === "development" ? "1010" : null);
        
        if (!validPassword) {
            logger.error("EXCLUSIVE_PASSWORD is not configured", undefined, {});
            return NextResponse.json(
                { success: false, error: "認証システムが正しく設定されていません" },
                { status: 500 }
            );
        }

        if (password === validPassword) {
            // 認証成功 - JWTトークンを生成
            const token = await createAuthToken();

            const response = NextResponse.json(
                { success: true, message: "認証成功" },
                { status: 200 }
            );

            // セッションCookieを設定（24時間有効）
            response.cookies.set("exclusive_auth", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 60 * 60 * 24, // 24時間
                path: "/",
            });

            return response;
        } else {
            return NextResponse.json(
                { success: false, error: "パスワードが正しくありません" },
                { status: 401 }
            );
        }
    } catch (error) {
        logger.error("Auth error", error);
        return NextResponse.json(
            { success: false, error: "認証中にエラーが発生しました" },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    // 認証状態を確認
    const token = request.cookies.get("exclusive_auth")?.value;

    if (token) {
        const isValid = await verifyAuthToken(token);
        if (isValid) {
            return NextResponse.json({ authenticated: true });
        }
    }

    return NextResponse.json({ authenticated: false });
}
