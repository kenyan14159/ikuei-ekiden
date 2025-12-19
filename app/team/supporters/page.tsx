"use client";

import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import { SubpageHeader } from "@/components/SubpageHeader";
import { motion } from "framer-motion";

export default function SupportersPage() {
    return (
        <div className="min-h-screen bg-[var(--dark-100)]">
            <Header />
            <main>
                <SubpageHeader
                    title="Supporters"
                    subtitle="仙台育英学園高等学校 陸上競技部を支えてくださる皆様をご紹介します。"
                    breadcrumbs={[{ label: "Team", href: "#" }]}
                />

                <section className="section-padding relative">
                    <div className="container-custom">
                        <div className="max-w-4xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="card-premium p-12 mb-20"
                            >
                                <h2 className="text-3xl font-black italic mb-8 border-b border-[var(--blue)] pb-4 text-white">ご支援感謝申し上げます</h2>
                                <p className="text-[var(--muted-foreground)] leading-loose mb-12">
                                    日頃より、本校陸上競技部の活動に対し多大なるご理解とご協力をいただき、誠にありがとうございます。皆様からの温かいご声援とご支援が、選手たちの走る力となっております。
                                </p>
                                <div className="grid md:grid-cols-2 gap-12">
                                    <div>
                                        <h3 className="text-[var(--blue)] font-bold text-sm tracking-widest uppercase mb-4">企業・団体の皆様</h3>
                                        <ul className="space-y-4 text-white font-bold">
                                            <li className="flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 bg-[var(--blue)] rounded-full" />
                                                仙台育英学園後援会 様
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 bg-[var(--blue)] rounded-full" />
                                                株式会社 ◯◯◯ 様
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 bg-[var(--blue)] rounded-full" />
                                                地域協議会 様
                                            </li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="text-[var(--blue)] font-bold text-sm tracking-widest uppercase mb-4">個人の皆様</h3>
                                        <p className="text-[var(--muted-foreground)] text-sm italic">
                                            他、多くの卒業生・保護者の皆様より、温かなご支援を頂いております。
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="card-premium">
                                    <h3 className="text-white font-bold mb-4">サポーター募集</h3>
                                    <p className="text-[var(--muted-foreground)] text-sm mb-6 leading-relaxed">
                                        本部では、選手たちの環境整備をより一層充実させるため、活動をサポートしていただける企業・団体の皆様を募集しております。
                                    </p>
                                    <button className="btn-outline w-full text-[10px]">詳細を見る</button>
                                </div>
                                <div className="card-premium">
                                    <h3 className="text-white font-bold mb-4">寄付・差し入れについて</h3>
                                    <p className="text-[var(--muted-foreground)] text-sm mb-6 leading-relaxed">
                                        合宿や大会遠征等へのご厚志、差し入れにつきましても、随時受け付けております。まずはお問い合わせください。
                                    </p>
                                    <button className="btn-outline w-full text-[10px]">お問い合わせ</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
