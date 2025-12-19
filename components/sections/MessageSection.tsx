"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

const sampleMessages = [
    {
        id: 1,
        content: "県大会での活躍を見ました！全国大会でも頑張ってください！応援しています！",
        author: "ファン",
        date: "2025.12.18 21:37"
    },
    {
        id: 2,
        content: "練習を信じて、自分を信じて、仲間を信じて、頑張ってください。「練習は裏切りません」応援しています！",
        author: "卒業生",
        date: "2025.12.18 21:31"
    },
    {
        id: 3,
        content: "皆さんの走りを見て勇気をもらっています。体調に気をつけて、しっかり調整してくださいね。",
        author: "卒業生",
        date: "2025.12.18 18:07"
    },
    {
        id: 4,
        content: "全国制覇を目指して頑張れ！応援しています！",
        author: "ファン",
        date: "2025.12.14 16:59"
    },
];

export default function MessageSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="message" className="section-padding relative overflow-hidden" ref={ref}>
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--dark-100)] via-[var(--dark-200)] to-[var(--dark-100)]" />
            <div className="absolute inset-0 noise-overlay" />

            <div className="container-custom relative z-10">
                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-white text-2xl md:text-3xl font-bold mb-4">
                        選手たちに、応援メッセージを送ろう!
                    </h2>
                    <p className="text-[var(--muted-foreground)] mb-8">
                        あなたの声援を、選手たちに届けよう!
                    </p>
                    <Link href="#send-message" className="btn-premium">
                        <span>応援メッセージを送る</span>
                    </Link>
                </motion.div>

                {/* Messages Display */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className="flex items-center justify-center gap-4 mb-8">
                        <h3 className="text-white text-lg font-bold">
                            選手たちに届いたみんなのメッセージ
                        </h3>
                        <div className="flex items-center gap-2 bg-[var(--blue)] px-4 py-2 rounded-full">
                            <span className="text-white font-bold text-xl">26</span>
                            <span className="text-white/80 text-sm">+</span>
                        </div>
                    </div>

                    {/* Message Cards */}
                    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {sampleMessages.map((message, index) => (
                            <motion.div
                                key={message.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                                className="card-premium p-6"
                            >
                                <p className="text-white text-sm leading-relaxed mb-4 line-clamp-3">
                                    {message.content}
                                </p>
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-[var(--blue)] font-medium">
                                        {message.author}
                                    </span>
                                    <span className="text-[var(--muted-foreground)]">
                                        {message.date}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* View All Link */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="text-center mt-8"
                    >
                        <Link
                            href="#all-messages"
                            className="text-[var(--muted-foreground)] hover:text-[var(--blue)] transition-colors text-sm inline-flex items-center gap-2"
                        >
                            全て見る (残り22件)
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
