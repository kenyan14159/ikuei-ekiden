import { NextRequest, NextResponse } from "next/server";

interface ContactFormData {
    name: string;
    email: string;
    category: string;
    message: string;
}

export async function POST(request: NextRequest) {
    try {
        const body: ContactFormData = await request.json();

        // バリデーション
        if (!body.name || !body.email || !body.category || !body.message) {
            return NextResponse.json(
                { error: "必須項目が入力されていません" },
                { status: 400 }
            );
        }

        // メールアドレスの簡易バリデーション
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(body.email)) {
            return NextResponse.json(
                { error: "メールアドレスの形式が正しくありません" },
                { status: 400 }
            );
        }

        // ここで実際のメール送信処理を行う
        // 例: Resend, SendGrid, Nodemailer などを使用
        // 
        // 以下はログ出力のみのサンプル実装
        console.log("=== お問い合わせを受信 ===");
        console.log(`お名前: ${body.name}`);
        console.log(`メール: ${body.email}`);
        console.log(`項目: ${body.category}`);
        console.log(`内容: ${body.message}`);
        console.log("========================");

        // TODO: 実際のメール送信処理を実装
        // 例: Resendを使用する場合
        // 
        // import { Resend } from "resend";
        // const resend = new Resend(process.env.RESEND_API_KEY);
        // await resend.emails.send({
        //     from: "noreply@sendai-ikuei-track.jp",
        //     to: "admin@sendai-ikuei-track.jp",
        //     subject: `[お問い合わせ] ${body.category}`,
        //     html: `
        //         <h2>お問い合わせがありました</h2>
        //         <p><strong>お名前:</strong> ${body.name}</p>
        //         <p><strong>メールアドレス:</strong> ${body.email}</p>
        //         <p><strong>項目:</strong> ${body.category}</p>
        //         <p><strong>内容:</strong></p>
        //         <p>${body.message.replace(/\n/g, "<br>")}</p>
        //     `,
        // });

        return NextResponse.json(
            { message: "お問い合わせを受け付けました" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Contact form error:", error);
        return NextResponse.json(
            { error: "送信中にエラーが発生しました" },
            { status: 500 }
        );
    }
}
