"use client";

import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import { SubpageHeader } from "@/components/SubpageHeader";
import { motion } from "framer-motion";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-[var(--dark-100)]">
            <Header />
            <main>
                <SubpageHeader
                    title="Contact"
                    subtitle="入部のご案内、取材依頼、ご支援に関するお問い合わせはこちらから。"
                    breadcrumbs={[]}
                />

                <section className="section-padding relative">
                    <div className="container-custom">
                        <div className="max-w-4xl mx-auto">
                            <div className="grid md:grid-cols-2 gap-12 mb-20">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                >
                                    <h2 className="text-2xl font-bold text-white mb-6">入部を希望される方へ</h2>
                                    <p className="text-[var(--muted-foreground)] text-sm leading-loose mb-8">
                                        仙台育英陸上競技部では、伝統あるオレンジの襷を共に繋ぎ、全国の頂点を目指す仲間を募集しています。
                                        練習体験や寮の見学など、お気軽にお問い合わせください。
                                    </p>
                                    <a href="mailto:info@sendaiikuei-track.jp" className="text-[var(--blue)] font-bold flex items-center gap-2 group">
                                        info@sendaiikuei-track.jp
                                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </a>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                >
                                    <h2 className="text-2xl font-bold text-white mb-6">学校・寮の所在地</h2>
                                    <address className="not-italic space-y-6">
                                        <div>
                                            <h3 className="text-[var(--blue)] text-[10px] uppercase tracking-widest font-black mb-1">Sendai Ikuei Gakuen</h3>
                                            <p className="text-white text-sm">宮城県多賀城市高崎2丁目1-1</p>
                                        </div>
                                        <div>
                                            <h3 className="text-[var(--blue)] text-[10px] uppercase tracking-widest font-black mb-1">Dormitory</h3>
                                            <p className="text-white text-sm">宮城県多賀城市（栄光寮）</p>
                                        </div>
                                    </address>
                                </motion.div>
                            </div>

                            {/* Form Placeholder */}
                            <div className="card-premium p-8 md:p-12">
                                <form className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[var(--muted-foreground)] text-xs font-bold uppercase tracking-widest">お名前</label>
                                            <input type="text" className="w-full bg-[var(--dark-100)] border border-[var(--border)] p-4 text-white focus:border-[var(--blue)] outline-none transition-colors" placeholder="山田 太郎" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[var(--muted-foreground)] text-xs font-bold uppercase tracking-widest">メールアドレス</label>
                                            <input type="email" className="w-full bg-[var(--dark-100)] border border-[var(--border)] p-4 text-white focus:border-[var(--blue)] outline-none transition-colors" placeholder="mail@example.com" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[var(--muted-foreground)] text-xs font-bold uppercase tracking-widest">項目</label>
                                        <select className="w-full bg-[var(--dark-100)] border border-[var(--border)] p-4 text-white focus:border-[var(--blue)] outline-none transition-colors">
                                            <option>入部について</option>
                                            <option>応援・ご支援について</option>
                                            <option>プレス・取材について</option>
                                            <option>その他</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[var(--muted-foreground)] text-xs font-bold uppercase tracking-widest">内容</label>
                                        <textarea className="w-full bg-[var(--dark-100)] border border-[var(--border)] p-4 text-white h-40 focus:border-[var(--blue)] outline-none transition-colors" placeholder="お問い合わせ内容をご記入ください"></textarea>
                                    </div>
                                    <button className="btn-outline w-full py-4 text-xs font-black uppercase tracking-[0.3em]">
                                        Submit Message
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
