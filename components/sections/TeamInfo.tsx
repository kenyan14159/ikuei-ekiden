"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const achievements = {
    male: [
        { event: "第68回", result: "3位" },
        { event: "第70回", result: "優勝", highlight: true },
        { event: "第71回", result: "準優勝" },
        { event: "第72回", result: "3位" },
        { event: "第73回", result: "5位" },
        { event: "第74回", result: "8位" },
        { event: "第75回", result: "3位" },
    ],
    female: [
        { event: "第29回", result: "優勝", highlight: true },
        { event: "第30回", result: "3位" },
        { event: "第31回", result: "優勝", highlight: true },
        { event: "第32回", result: "3位" },
        { event: "第33回", result: "優勝", highlight: true },
        { event: "第34回", result: "2位" },
        { event: "第35回", result: "2位" },
        { event: "第36回", result: "2位" },
    ],
};

// トロフィーアイコン
const TrophyIcon = () => (
    <svg className="w-4 h-4 text-yellow-500 inline mr-1" fill="currentColor" viewBox="0 0 24 24">
        <path d="M5 3h14a1 1 0 011 1v3a5 5 0 01-3.535 4.779 4.999 4.999 0 01-3.465 3.185V17h2a1 1 0 011 1v2H8v-2a1 1 0 011-1h2v-2.036a4.999 4.999 0 01-3.465-3.185A5 5 0 014 7V4a1 1 0 011-1zm0 2v2a3 3 0 002.236 2.9A7.072 7.072 0 017 9V5H5zm14 0h-2v4c0 .22-.012.436-.036.648A3 3 0 0019 7V5zM9 5v4a3 3 0 106 0V5H9z" />
    </svg>
);

export default function TeamInfo() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [showAllMale, setShowAllMale] = useState(false);
    const [showAllFemale, setShowAllFemale] = useState(false);

    return (
        <section id="team-info" className="section-padding bg-white relative" ref={ref}>
            <div className="container-custom relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <span className="text-[var(--blue)] text-sm tracking-widest uppercase mb-4 block">
                        Team Info
                    </span>
                    <h2 className="text-[var(--black)] text-2xl md:text-3xl font-bold">
                        チーム概要
                    </h2>
                </motion.div>

                {/* Compact Team Data */}
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
                    >
                        {/* 部員数 */}
                        <div className="p-4 bg-[var(--gray-50)] border border-[var(--gray-200)] text-center">
                            <span className="text-[var(--blue)] text-xs font-bold uppercase block mb-2">男子</span>
                            <span className="text-2xl font-black text-[var(--black)]">25</span>
                            <span className="text-[var(--gray-500)] text-sm">名</span>
                        </div>
                        <div className="p-4 bg-[var(--gray-50)] border border-[var(--gray-200)] text-center">
                            <span className="text-[var(--red)] text-xs font-bold uppercase block mb-2">女子</span>
                            <span className="text-2xl font-black text-[var(--black)]">19</span>
                            <span className="text-[var(--gray-500)] text-sm">名</span>
                        </div>
                        {/* 指導者 */}
                        <div className="p-4 bg-[var(--gray-50)] border border-[var(--gray-200)] text-center col-span-2">
                            <span className="text-[var(--gray-500)] text-xs font-bold uppercase block mb-2">監督</span>
                            <div className="flex justify-center gap-4">
                                <span className="text-[var(--black)] font-bold text-sm">千葉 裕司<span className="text-[var(--blue)] text-xs ml-1">(男)</span></span>
                                <span className="text-[var(--black)] font-bold text-sm">釜石 慶太<span className="text-[var(--red)] text-xs ml-1">(女)</span></span>
                            </div>
                        </div>
                    </motion.div>

                    {/* 入部・寄付 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className="grid md:grid-cols-2 gap-4 mb-8"
                    >
                        <div className="p-4 bg-[var(--gray-50)] border border-[var(--gray-200)]">
                            <h3 className="text-[var(--black)] font-bold text-sm mb-2">入部について</h3>
                            <p className="text-[var(--gray-600)] text-xs leading-relaxed">
                                入部人数を制限しております。推薦制のみ。
                            </p>
                        </div>
                        <div className="p-4 bg-[var(--gray-50)] border border-[var(--gray-200)] flex items-center justify-between">
                            <div>
                                <h3 className="text-[var(--black)] font-bold text-sm mb-1">ご寄付のお願い</h3>
                                <p className="text-[var(--gray-600)] text-xs">仙台育英学園へのご寄付</p>
                            </div>
                            <a
                                href="https://www.sendaiikuei.ed.jp/corp/donation/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-[var(--blue)] font-bold text-xs hover:underline"
                            >
                                詳細
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>
                        </div>
                    </motion.div>

                    {/* 表彰・受賞歴 - コンパクト版 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h3 className="text-[var(--black)] text-lg font-bold text-center mb-4">
                            全国高校駅伝 入賞実績
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            {/* 男子 */}
                            <div className="p-4 bg-[var(--gray-50)] border border-[var(--gray-200)]">
                                <h4 className="text-[var(--blue)] font-bold text-sm mb-3 flex items-center gap-2">
                                    <span className="w-4 h-[2px] bg-[var(--blue)]"></span>
                                    男子
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {(showAllMale ? achievements.male : achievements.male.slice(0, 4)).map((a, i) => (
                                        <span key={i} className={`text-xs px-2 py-1 ${a.highlight ? 'bg-yellow-100 text-yellow-700' : 'bg-white text-[var(--gray-600)]'} border border-[var(--gray-200)]`}>
                                            {a.highlight && <TrophyIcon />}
                                            {a.event} {a.result}
                                        </span>
                                    ))}
                                    {!showAllMale && achievements.male.length > 4 && (
                                        <button onClick={() => setShowAllMale(true)} className="text-xs text-[var(--blue)] hover:underline">
                                            +{achievements.male.length - 4}件
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* 女子 */}
                            <div className="p-4 bg-[var(--gray-50)] border border-[var(--gray-200)]">
                                <h4 className="text-[var(--red)] font-bold text-sm mb-3 flex items-center gap-2">
                                    <span className="w-4 h-[2px] bg-[var(--red)]"></span>
                                    女子
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {(showAllFemale ? achievements.female : achievements.female.slice(0, 4)).map((a, i) => (
                                        <span key={i} className={`text-xs px-2 py-1 ${a.highlight ? 'bg-yellow-100 text-yellow-700' : 'bg-white text-[var(--gray-600)]'} border border-[var(--gray-200)]`}>
                                            {a.highlight && <TrophyIcon />}
                                            {a.event} {a.result}
                                        </span>
                                    ))}
                                    {!showAllFemale && achievements.female.length > 4 && (
                                        <button onClick={() => setShowAllFemale(true)} className="text-xs text-[var(--blue)] hover:underline">
                                            +{achievements.female.length - 4}件
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
