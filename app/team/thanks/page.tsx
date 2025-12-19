"use client";

import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import { SubpageHeader } from "@/components/SubpageHeader";
import { motion } from "framer-motion";

export default function ThanksPage() {
    return (
        <div className="min-h-screen bg-[var(--dark-100)]">
            <Header />
            <main>
                <SubpageHeader
                    title="Gratitude"
                    subtitle="「応援してくださる皆様へ」感謝のメッセージ。皆様の声が私たちの力です。"
                    breadcrumbs={[{ label: "Team", href: "#" }]}
                />

                <section className="section-padding relative">
                    <div className="container-custom">
                        <div className="max-w-4xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                className="relative p-12 md:p-20 border border-[var(--border)] overflow-hidden"
                            >
                                {/* Background Decor */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--blue)]/5 blur-[100px] pointer-events-none" />

                                <div className="relative z-10">
                                    <span className="text-[var(--blue)] text-xs font-bold tracking-[0.5em] uppercase mb-12 block text-center">Message of Thanks</span>
                                    <div className="space-y-12">
                                        <div className="text-center">
                                            <h2 className="text-white text-3xl md:text-5xl font-black italic italic mb-8 tracking-tighter" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                                                皆様の声が、<br />
                                                次の一歩を支えます。
                                            </h2>
                                        </div>

                                        <div className="prose-custom text-[var(--muted-foreground)] leading-[2.2] tracking-widest text-lg md:text-xl text-center md:text-left">
                                            <p className="mb-8">
                                                日頃より多大なるご声援をいただき、厚く御礼申し上げます。
                                                沿道で振ってくださる旗、掲示板への書き込み、そして日々いただく温かいお言葉の数々は、私たち選手、スタッフにとって何物にも代えがたい「力」となっています。
                                            </p>
                                            <p className="mb-8">
                                                苦しい練習の最中、あるいはレースの瀬戸際で、最後に踏ん張れるのは皆様が期待してくださっているという確信があるからです。
                                            </p>
                                            <p>
                                                私たちは「至誠力走」の精神を胸に、これからも皆様に感動を届けられるよう、一本一本の走りに魂を込めてまいります。今後とも、仙台育英陸上競技部への応援を何卒よろしくお願い申し上げます。
                                            </p>
                                        </div>

                                        <div className="mt-20 pt-12 border-t border-[var(--border)] text-center md:text-right">
                                            <p className="text-[var(--muted-foreground)] text-sm mb-2 italic">2025年 12月吉日</p>
                                            <p className="text-white font-bold text-xl tracking-tighter">仙台育英学園高等学校 陸上競技部 一同</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
