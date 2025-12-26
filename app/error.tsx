"use client";

import { useEffect } from "react";
import Link from "next/link";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // エラートラッキングサービスに送信（本番環境）
    // 開発環境ではloggerを使用
    if (process.env.NODE_ENV === "production") {
      // TODO: Sentry等のエラートラッキングサービスに送信
      // Sentry.captureException(error);
    }
    // 開発環境では既にloggerで処理されるため、ここでは何もしない
  }, [error]);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="flex items-center justify-center py-32">
        <div className="container-custom text-center">
          <div className="max-w-md mx-auto">
            <div className="mb-8">
              <svg
                className="w-24 h-24 mx-auto text-[var(--gray-400)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-[var(--black)] mb-4">
              エラーが発生しました
            </h1>
            <p className="text-[var(--gray-600)] mb-8 leading-relaxed">
              申し訳ございません。予期しないエラーが発生しました。
              <br />
              しばらく時間をおいてから再度お試しください。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={reset}
                className="px-6 py-3 bg-[var(--blue)] text-white font-bold text-sm uppercase tracking-wider hover:bg-[var(--blue-light)] transition-all"
              >
                再試行
              </button>
              <Link
                href="/"
                className="px-6 py-3 border-2 border-[var(--gray-300)] text-[var(--black)] font-bold text-sm uppercase tracking-wider hover:border-[var(--blue)] hover:text-[var(--blue)] transition-all"
              >
                ホームに戻る
              </Link>
            </div>
            {process.env.NODE_ENV === "development" && error.message && (
              <div className="mt-8 p-4 bg-[var(--gray-100)] border border-[var(--gray-300)] text-left">
                <p className="text-xs text-[var(--gray-600)] font-mono">
                  {error.message}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

