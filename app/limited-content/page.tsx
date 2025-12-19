"use client";

import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import { SubpageHeader } from "@/components/SubpageHeader";
import { motion } from "framer-motion";

export default function LimitedContentPage() {
    return (
        <div className="min-h-screen bg-[var(--dark-100)]">
            <Header />
            <main>
                <SubpageHeader
                    title="Exclusive"
                    subtitle="保護者・OB・関係者限定の特別コンテンツ。チームの日常や未公開映像をお届けします。"
                    breadcrumbs={[]}
                />

                <section className="section-padding relative">
                    <div className="container-custom">
                        <div className="max-w-4xl mx-auto text-center">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="card-premium p-12 md:p-20"
                            >
                                <div className="w-20 h-20 bg-[var(--blue)]/10 rounded-full flex items-center justify-center mx-auto mb-8">
                                    <svg className="w-10 h-10 text-[var(--blue)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <h2 className="text-3xl font-black italic mb-6 text-white tracking-tight">Protected Content</h2>
                                <p className="text-[var(--muted-foreground)] leading-loose mb-12 max-w-xl mx-auto">
                                    このページは、仙台育英陸上競技部を支えてくださる関係者の皆様（保護者、OB会、後援会）のみ閲覧可能です。閲覧にはパスワードが必要です。
                                </p>

                                <form className="max-w-md mx-auto space-y-4">
                                    <div className="relative">
                                        <input
                                            type="password"
                                            className="w-full bg-[var(--dark-100)] border border-[var(--border)] p-4 text-white text-center tracking-widest focus:border-[var(--blue)] outline-none transition-colors"
                                            placeholder="ENTER PASSWORD"
                                        />
                                    </div>
                                    <button className="btn-outline w-full py-4 text-xs font-black uppercase tracking-[0.3em]">
                                        Unlock Content
                                    </button>
                                </form>

                                <p className="mt-12 text-[var(--muted-foreground)] text-xs">
                                    パスワードをお忘れの方は、事務局までお問い合わせください。
                                </p>
                            </motion.div>

                            <div className="mt-20 grid md:grid-cols-3 gap-8 opacity-30 grayscale pointer-events-none">
                                <div className="card-premium aspect-square flex items-center justify-center text-xs uppercase tracking-widest font-bold">Training Video</div>
                                <div className="card-premium aspect-square flex items-center justify-center text-xs uppercase tracking-widest font-bold">Member Blog</div>
                                <div className="card-premium aspect-square flex items-center justify-center text-xs uppercase tracking-widest font-bold">Photo Gallery</div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
