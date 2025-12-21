"use client";

import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import { SubpageHeader } from "@/components/SubpageHeader";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutSitePage() {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main>
                <SubpageHeader
                    title="About Site"
                    subtitle="本サイトについて"
                    breadcrumbs={[{ label: "Team", href: "/team" }]}
                />

                <section className="section-padding relative">
                    <div className="container-custom">
                        <div className="max-w-3xl mx-auto space-y-12">
                            {/* はじめに */}
                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="text-2xl font-bold text-[var(--black)] mb-6 border-l-4 border-[var(--blue)] pl-4">はじめに</h2>
                                <div className="bg-[var(--gray-50)] p-8 border border-[var(--gray-200)]">
                                    <p className="text-[var(--gray-600)] leading-loose mb-4">
                                        このホームページは、仙台育英学園高等学校 陸上競技部 長距離ブロックを応援する皆様との繋がりを広げるため、また、より多くの方々からのご支援をいただけるよう願いを込めて、公式サイトの一つとして運営しております。
                                    </p>
                                    <div className="mt-6 p-4 bg-white border border-[var(--gray-200)]">
                                        <p className="text-[var(--gray-600)] text-sm">
                                            <span className="font-bold text-[var(--black)]">管理：</span>趣味で制作する現役駅伝部学生
                                        </p>
                                        <a href="https://shotaro.dev/" target="_blank" rel="noopener noreferrer" className="text-[var(--blue)] text-sm hover:underline inline-flex items-center gap-1 mt-2">
                                            shotaro.dev
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </a>
                                    </div>
                                    <p className="text-[var(--gray-500)] text-sm mt-6 leading-relaxed">
                                        活動状況により更新が不定期になる点、また、一人で運営しているため記録に誤り等が含まれる可能性がある点をご了承ください。誤りを発見された際や、コンテンツのご要望等ございましたら、お気軽にご連絡いただけますと幸いです。
                                    </p>
                                </div>
                            </motion.section>

                            {/* 写真提供 */}
                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="text-2xl font-bold text-[var(--black)] mb-6 border-l-4 border-[var(--blue)] pl-4">写真提供</h2>
                                <div className="bg-[var(--gray-50)] p-6 border border-[var(--gray-200)]">
                                    <p className="text-[var(--gray-600)] text-sm">
                                        saya 様
                                    </p>
                                    <a href="https://www.instagram.com/saya_sports_films/" target="_blank" rel="noopener noreferrer" className="text-[var(--blue)] text-sm hover:underline inline-flex items-center gap-1 mt-2">
                                        @saya_sports_films
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </a>
                                    <p className="text-[var(--gray-500)] text-xs mt-4">
                                        皆様の応援が励みになりますので、ぜひSNSのフォローもよろしくお願いいたします。
                                    </p>
                                </div>
                            </motion.section>

                            {/* プライバシーポリシー */}
                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="text-2xl font-bold text-[var(--black)] mb-6 border-l-4 border-[var(--blue)] pl-4">プライバシーポリシー</h2>
                                <div className="bg-[var(--gray-50)] p-8 border border-[var(--gray-200)]">
                                    <p className="text-[var(--gray-600)] text-sm leading-loose mb-6">
                                        当サイトでは、お客様の個人情報を適切に取り扱うことをお約束します。
                                    </p>
                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="text-[var(--black)] font-bold text-sm mb-2">1. 個人情報の収集と利用について</h3>
                                            <p className="text-[var(--gray-600)] text-sm leading-relaxed">
                                                当サイトでは、お問い合わせフォーム送信時にお客様の個人情報を収集し、サービス提供およびサポート、お問い合わせへの対応を目的として利用します。
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="text-[var(--black)] font-bold text-sm mb-2">2. 個人情報の保護について</h3>
                                            <p className="text-[var(--gray-600)] text-sm leading-relaxed">
                                                お客様の個人情報保護のため、漏洩や不正アクセス防止に適切なセキュリティ対策を講じます。
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.section>

                            {/* 利用規約 */}
                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="text-2xl font-bold text-[var(--black)] mb-6 border-l-4 border-[var(--blue)] pl-4">利用規約</h2>
                                <div className="bg-[var(--gray-50)] p-8 border border-[var(--gray-200)]">
                                    <p className="text-[var(--gray-600)] text-sm leading-loose mb-6">
                                        この利用規約は、当サイトの利用条件を定めるものです。当サイトを利用することで、本規約に同意したものとみなされます。
                                    </p>
                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="text-[var(--black)] font-bold text-sm mb-2">1. 禁止事項</h3>
                                            <ul className="text-[var(--gray-600)] text-sm space-y-1 ml-4">
                                                <li>・法令または公序良俗に違反する行為</li>
                                                <li>・当サイトの運営を妨害する行為</li>
                                                <li>・他の利用者の個人情報を収集する行為</li>
                                                <li>・不正アクセスを試みる行為</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 className="text-[var(--black)] font-bold text-sm mb-2">2. 免責事項</h3>
                                            <p className="text-[var(--gray-600)] text-sm leading-relaxed">
                                                当サイトは、提供する情報の正確性・完全性について保証しません。当サイトの利用により損害が生じた場合でも、一切責任を負いかねます。
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="text-[var(--black)] font-bold text-sm mb-2">3. 著作権について</h3>
                                            <p className="text-[var(--gray-600)] text-sm leading-relaxed">
                                                当サイトに掲載されているコンテンツ（テキスト、画像等）の無断使用はご遠慮ください。
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.section>

                            {/* ご理解とご協力のお願い */}
                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="text-2xl font-bold text-[var(--black)] mb-6 border-l-4 border-[var(--blue)] pl-4">ご理解とご協力のお願い</h2>
                                <div className="bg-yellow-50 border border-yellow-200 p-6">
                                    <ul className="text-[var(--gray-600)] text-sm space-y-3">
                                        <li className="flex items-start gap-2">
                                            <svg className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                            </svg>
                                            ホームページの更新が遅れる場合があります
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <svg className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                            </svg>
                                            画像の無断使用は固くお断りいたします
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <svg className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                            </svg>
                                            お問い合わせ先への迷惑行為はご遠慮ください
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <svg className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                            </svg>
                                            パスワード保護されたコンテンツは、パスワードをお持ちの方のみ閲覧可能です
                                        </li>
                                    </ul>
                                </div>
                            </motion.section>

                            {/* お問い合わせ */}
                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="text-2xl font-bold text-[var(--black)] mb-6 border-l-4 border-[var(--blue)] pl-4">お問い合わせ</h2>
                                <div className="bg-[var(--gray-50)] p-8 border border-[var(--gray-200)] text-center">
                                    <p className="text-[var(--gray-600)] leading-loose mb-6">
                                        ご意見・ご要望、プライバシーポリシーや利用規約に関するお問い合わせなど、<br className="hidden md:block" />
                                        当サイトに関するご連絡は下記までお願いいたします。
                                    </p>
                                    <Link href="/contact" className="inline-block px-8 py-3 bg-[var(--blue)] text-white font-bold text-sm uppercase tracking-wider hover:bg-[var(--blue-light)] transition-all">
                                        お問い合わせはこちら
                                    </Link>
                                </div>
                            </motion.section>

                            {/* メッセージ */}
                            <motion.section
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                className="pt-10 border-t border-[var(--gray-200)] text-center"
                            >
                                <p className="text-[var(--gray-600)] leading-loose mb-6">
                                    今後とも変わらぬご支援、ご声援をよろしくお願い申し上げます。<br />
                                    都大路を一緒に駆け抜ける日を、部員一同心待ちにしております。
                                </p>
                                <p className="text-[var(--black)] font-bold">
                                    仙台育英学園高等学校 陸上競技部 長距離ブロック 一同
                                </p>
                            </motion.section>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
