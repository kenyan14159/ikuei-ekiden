"use client";

import { useState } from "react";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import { SubpageHeader } from "@/components/SubpageHeader";
import { motion } from "framer-motion";

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        category: "",
        message: "",
    });
    const [status, setStatus] = useState<FormStatus>("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");
        setErrorMessage("");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "送信に失敗しました");
            }

            setStatus("success");
            setFormData({ name: "", email: "", category: "", message: "" });
        } catch (error) {
            setStatus("error");
            setErrorMessage(error instanceof Error ? error.message : "送信中にエラーが発生しました");
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main>
                <SubpageHeader
                    title="Contact"
                    subtitle="お問い合わせはこちらから"
                    breadcrumbs={[]}
                />

                <section className="section-padding relative">
                    <div className="container-custom">
                        <div className="max-w-2xl mx-auto">
                            {/* Success Message */}
                            {status === "success" && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-green-50 border border-green-200 p-6 mb-8 text-center"
                                >
                                    <div className="flex items-center justify-center gap-2 text-green-600 mb-2">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="font-bold">送信完了</span>
                                    </div>
                                    <p className="text-green-600 text-sm">
                                        お問い合わせを受け付けました。内容を確認次第、ご連絡いたします。
                                    </p>
                                </motion.div>
                            )}

                            {/* Form */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-[var(--gray-50)] p-8 md:p-12 border border-[var(--gray-200)]"
                            >
                                <h2 className="text-[var(--black)] text-2xl font-bold mb-8 text-center">お問い合わせフォーム</h2>

                                {/* Error Message */}
                                {status === "error" && (
                                    <div className="bg-red-50 border border-red-200 p-4 mb-6 text-center">
                                        <p className="text-red-600 text-sm">{errorMessage}</p>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label htmlFor="name" className="text-[var(--gray-600)] text-xs font-bold uppercase tracking-widest">お名前 <span className="text-red-500">*</span></label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full bg-white border border-[var(--gray-300)] p-4 text-[var(--black)] focus:border-[var(--blue)] outline-none transition-colors"
                                                placeholder="山田 太郎"
                                                required
                                                disabled={status === "submitting"}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="email" className="text-[var(--gray-600)] text-xs font-bold uppercase tracking-widest">メールアドレス <span className="text-red-500">*</span></label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full bg-white border border-[var(--gray-300)] p-4 text-[var(--black)] focus:border-[var(--blue)] outline-none transition-colors"
                                                placeholder="mail@example.com"
                                                required
                                                disabled={status === "submitting"}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="category" className="text-[var(--gray-600)] text-xs font-bold uppercase tracking-widest">項目 <span className="text-red-500">*</span></label>
                                        <select
                                            id="category"
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            className="w-full bg-white border border-[var(--gray-300)] p-4 text-[var(--black)] focus:border-[var(--blue)] outline-none transition-colors"
                                            required
                                            disabled={status === "submitting"}
                                        >
                                            <option value="">選択してください</option>
                                            <option value="応援・ご支援について">応援・ご支援について</option>
                                            <option value="プレス・取材について">プレス・取材について</option>
                                            <option value="ホームページについて">ホームページについて</option>
                                            <option value="その他">その他</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="message" className="text-[var(--gray-600)] text-xs font-bold uppercase tracking-widest">内容 <span className="text-red-500">*</span></label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            className="w-full bg-white border border-[var(--gray-300)] p-4 text-[var(--black)] h-40 focus:border-[var(--blue)] outline-none transition-colors"
                                            placeholder="お問い合わせ内容をご記入ください"
                                            required
                                            disabled={status === "submitting"}
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={status === "submitting"}
                                        className="w-full py-4 bg-[var(--blue)] text-white font-bold text-sm uppercase tracking-[0.3em] hover:bg-[var(--blue-light)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {status === "submitting" ? "送信中..." : "送信する"}
                                    </button>
                                </form>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
