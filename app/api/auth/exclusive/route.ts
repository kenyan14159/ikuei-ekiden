import { NextRequest, NextResponse } from "next/server";

// 本番環境では環境変数から取得することを推奨
const CORRECT_PASSWORD = process.env.EXCLUSIVE_PASSWORD || "1010";

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

        if (password === CORRECT_PASSWORD) {
            // 認証成功 - トークンを生成
            const token = Buffer.from(`authenticated:${Date.now()}`).toString("base64");

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
        console.error("Auth error:", error);
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
        try {
            const decoded = Buffer.from(token, "base64").toString();
            if (decoded.startsWith("authenticated:")) {
                return NextResponse.json({ authenticated: true });
            }
        } catch {
            // トークンが無効
        }
    }

    return NextResponse.json({ authenticated: false });
}
