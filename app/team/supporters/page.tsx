"use client";

import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import { SubpageHeader } from "@/components/SubpageHeader";
import { motion } from "framer-motion";

const supporters = [
    {
        name: "CHRIO（クリオ）",
        type: "企業",
        url: "https://chrio.jp/player/%E4%BB%99%E5%8F%B0%E8%82%B2%E8%8B%B1%E5%AD%A6%E5%9C%92%E9%99%B8%E4%B8%8A%E9%83%A8/",
        description: "スポーツネックレス・ブレスレット",
    },
];

export default function SupportersPage() {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main>
                <SubpageHeader
                    title="Supporters"
                    subtitle="ご支援・サポーター"
                    breadcrumbs={[{ label: "Team", href: "/team" }]}
                />

                <section className="section-padding relative bg-[var(--gray-100)]">
                    <div className="container-custom">
                        <div className="max-w-4xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-white p-12 mb-12 border border-[var(--gray-200)] shadow-sm"
                            >
                                <h2 className="text-3xl font-black italic mb-8 border-b border-[var(--blue)] pb-4 text-[var(--black)]">ご支援感謝申し上げます</h2>
                                <p className="text-[var(--gray-600)] leading-loose mb-8">
                                    日頃より、本校陸上競技部の活動に対し多大なるご理解とご協力をいただき、誠にありがとうございます。皆様からの温かいご声援とご支援が、選手たちの走る力となっております。
                                </p>
                            </motion.div>

                            {/* サポーター一覧 */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="bg-white p-8 border border-[var(--gray-200)] mb-12"
                            >
                                <h3 className="text-[var(--blue)] font-bold text-sm tracking-widest uppercase mb-6">企業・団体の皆様</h3>
                                <div className="space-y-4">
                                    {supporters.map((s, i) => (
                                        <div key={i} className="flex items-center gap-4 p-4 bg-[var(--gray-50)] border border-[var(--gray-200)]">
                                            <span className="w-2 h-2 bg-[var(--blue)] rounded-full flex-shrink-0" />
                                            <div className="flex-grow">
                                                {s.url ? (
                                                    <a
                                                        href={s.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-[var(--black)] font-bold hover:text-[var(--blue)] transition-colors inline-flex items-center gap-2"
                                                    >
                                                        {s.name}
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                        </svg>
                                                    </a>
                                                ) : (
                                                    <span className="text-[var(--black)] font-bold">{s.name}</span>
                                                )}
                                                {s.description && (
                                                    <span className="text-[var(--gray-500)] text-sm ml-2">- {s.description}</span>
                                                )}
                                            </div>
                                            <span className="text-[var(--gray-400)] text-xs">{s.type}</span>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-[var(--gray-500)] text-sm italic mt-6">
                                    他、多くの卒業生・保護者の皆様より、温かなご支援を頂いております。
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="bg-white p-6 border border-[var(--gray-200)] max-w-md mx-auto"
                            >
                                <h3 className="text-[var(--black)] font-bold mb-4">ご寄付について</h3>
                                <p className="text-[var(--gray-600)] text-sm mb-6 leading-relaxed">
                                    仙台育英学園へのご寄付を受け付けております。詳細は学園公式サイトをご覧ください。
                                </p>
                                <a
                                    href="https://www.sendaiikuei.ed.jp/corp/donation/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full block text-center py-3 bg-[var(--blue)] text-white font-bold text-xs uppercase tracking-wider hover:bg-[var(--blue-light)] transition-all"
                                >
                                    寄付のご案内
                                </a>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
