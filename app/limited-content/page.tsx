"use client";

import { useState, useEffect } from "react";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import { SubpageHeader } from "@/components/SubpageHeader";
import { motion, AnimatePresence } from "framer-motion";

type AuthStatus = "checking" | "locked" | "unlocked" | "error";

export default function LimitedContentPage() {
    const [password, setPassword] = useState("");
    const [authStatus, setAuthStatus] = useState<AuthStatus>("checking");
    const [error, setError] = useState("");

    // ページ読み込み時に認証状態を確認
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch("/api/auth/exclusive");
                const data = await response.json();
                setAuthStatus(data.authenticated ? "unlocked" : "locked");
            } catch {
                setAuthStatus("locked");
            }
        };
        checkAuth();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch("/api/auth/exclusive", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ password }),
            });

            const data = await response.json();

            if (data.success) {
                setAuthStatus("unlocked");
                setPassword("");
            } else {
                setError(data.error || "認証に失敗しました");
                setPassword("");
            }
        } catch {
            setError("認証中にエラーが発生しました");
        }
    };

    // 認証状態確認中
    if (authStatus === "checking") {
        return (
            <div className="min-h-screen bg-white">
                <Header />
                <main className="flex items-center justify-center py-32">
                    <div className="text-[var(--gray-500)]">認証状態を確認中...</div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main>
                <SubpageHeader
                    title="Exclusive"
                    subtitle="関係者限定コンテンツ"
                    breadcrumbs={[]}
                />

                <section className="section-padding relative">
                    <div className="container-custom">
                        <div className="max-w-2xl mx-auto">
                            <AnimatePresence mode="wait">
                                {authStatus === "locked" ? (
                                    // パスワード入力画面
                                    <motion.div
                                        key="locked"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="text-center"
                                    >
                                        <div className="bg-[var(--gray-50)] p-12 md:p-16 border border-[var(--gray-200)]">
                                            <div className="w-20 h-20 bg-[var(--blue)]/10 rounded-full flex items-center justify-center mx-auto mb-8">
                                                <svg className="w-10 h-10 text-[var(--blue)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                </svg>
                                            </div>
                                            <h2 className="text-2xl font-bold mb-6 text-[var(--black)]">パスワードを入力してください</h2>
                                            <p className="text-[var(--gray-600)] leading-loose mb-8">
                                                このページは関係者限定です。
                                            </p>

                                            <form onSubmit={handleSubmit} className="max-w-sm mx-auto space-y-4">
                                                <div className="relative">
                                                    <input
                                                        type="password"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        className={`w-full bg-white border ${error ? "border-red-500" : "border-[var(--gray-300)]"} p-4 text-[var(--black)] text-center tracking-widest focus:border-[var(--blue)] outline-none transition-colors`}
                                                        placeholder="パスワード"
                                                    />
                                                </div>
                                                {error && (
                                                    <p className="text-red-500 text-sm">{error}</p>
                                                )}
                                                <button type="submit" className="w-full py-4 bg-[var(--blue)] text-white font-bold text-sm uppercase tracking-wider hover:bg-[var(--blue-light)] transition-all">
                                                    認証
                                                </button>
                                            </form>
                                        </div>
                                    </motion.div>
                                ) : (
                                    // アンロック後のコンテンツ
                                    <motion.div
                                        key="unlocked"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        {/* 成功メッセージ */}
                                        <div className="bg-green-50 border border-green-200 p-4 mb-8 text-center">
                                            <div className="flex items-center justify-center gap-2 text-green-600">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span className="font-bold text-sm">認証成功</span>
                                            </div>
                                        </div>

                                        {/* OB/OG情報 */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.1 }}
                                            className="bg-[var(--gray-50)] border border-[var(--gray-200)] p-8"
                                        >
                                            <div className="flex items-center gap-4 mb-6">
                                                <div className="w-12 h-12 bg-[var(--blue)]/10 flex items-center justify-center">
                                                    <svg className="w-6 h-6 text-[var(--blue)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h3 className="text-[var(--black)] font-bold text-xl">OB/OG情報</h3>
                                                    <p className="text-[var(--gray-500)] text-sm">卒業生の進路や活躍情報</p>
                                                </div>
                                            </div>

                                            <div className="border-t border-[var(--gray-200)] pt-6">
                                                <p className="text-[var(--gray-600)] text-sm leading-relaxed mb-6">
                                                    卒業生の進路情報や、大学・実業団での活躍情報をまとめています。
                                                </p>

                                                {/* サンプルコンテンツ */}
                                                <div className="space-y-4">
                                                    <div className="p-4 bg-white border border-[var(--gray-200)]">
                                                        <p className="text-[var(--gray-400)] text-sm text-center">
                                                            コンテンツ準備中
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
