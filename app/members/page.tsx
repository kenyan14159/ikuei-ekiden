"use client";

import { useEffect, useState } from "react";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import { SubpageHeader } from "@/components/SubpageHeader";
import { motion, AnimatePresence } from "framer-motion";

interface Member {
    name: string;
    nameRubyParts: { kanji: string; ruby: string }[];
    imageUrl: string;
    description: string;
}

interface Staff {
    name: string;
    nameReading?: string;
    role: string;
    imageUrl: string;
}

interface GradeData {
    grade: number;
    label: string;
    male: Member[];
    female: Member[];
}

interface MembersData {
    staff: Staff[];
    grades: GradeData[];
}

type TabType = "staff" | "grade3" | "grade2" | "grade1";

const tabs: { id: TabType; label: string }[] = [
    { id: "grade3", label: "3年生" },
    { id: "grade2", label: "2年生" },
    { id: "grade1", label: "1年生" },
    { id: "staff", label: "スタッフ" },
];

export default function MembersPage() {
    const [data, setData] = useState<MembersData | null>(null);
    const [activeTab, setActiveTab] = useState<TabType>("grade3");

    useEffect(() => {
        const loadData = async () => {
            try {
                const [staffRes, grade3Res, grade2Res, grade1Res] = await Promise.all([
                    fetch("/data/members/staff.json"),
                    fetch("/data/members/grade3.json"),
                    fetch("/data/members/grade2.json"),
                    fetch("/data/members/grade1.json"),
                ]);

                const staffData = await staffRes.json();
                const grade3Data = await grade3Res.json();
                const grade2Data = await grade2Res.json();
                const grade1Data = await grade1Res.json();

                setData({
                    staff: staffData.staff,
                    grades: [grade3Data, grade2Data, grade1Data],
                });
            } catch (err) {
                console.error("Failed to load members:", err);
            }
        };

        loadData();
    }, []);

    if (!data) return null;

    const renderMemberCard = (m: Member, i: number) => (
        <motion.div
            key={`${m.name}-${i}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="group"
        >
            <div className="aspect-[3/4] bg-[var(--gray-200)] mb-4 overflow-hidden relative flex items-center justify-center">
                {/* No Image Placeholder */}
                <div className="text-[var(--gray-400)] text-center">
                    <svg className="w-16 h-16 mx-auto mb-2 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="text-xs opacity-50">No Image</span>
                </div>
            </div>
            <h3 className="text-[var(--black)] font-bold text-lg md:text-xl">
                {m.nameRubyParts.map((p, pi) => (
                    <ruby key={pi} className="mr-0.5">
                        {p.kanji}{p.ruby && <rt className="text-[10px] text-[var(--gray-500)]">{p.ruby}</rt>}
                    </ruby>
                ))}
            </h3>
        </motion.div>
    );

    const getGradeData = (tabId: TabType): GradeData | null => {
        if (tabId === "staff") return null;
        const gradeNum = parseInt(tabId.replace("grade", ""));
        return data.grades.find(g => g.grade === gradeNum) || null;
    };

    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main>
                <SubpageHeader
                    title="Members"
                    subtitle="部員紹介"
                    breadcrumbs={[{ label: "Team", href: "/team" }]}
                />

                {/* Tab Navigation */}
                <section className="py-8 bg-[var(--gray-50)]">
                    <div className="container-custom">
                        <div className="flex flex-wrap justify-center gap-3">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-8 py-3 font-bold text-sm tracking-wider transition-all rounded-none border-2 ${activeTab === tab.id
                                        ? "bg-[var(--blue)] text-white border-[var(--blue)]"
                                        : "bg-white text-[var(--black)] border-[var(--gray-300)] hover:border-[var(--blue)] hover:text-[var(--blue)]"
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Content */}
                <section className="section-padding relative">
                    <div className="container-custom">
                        <AnimatePresence mode="wait">
                            {/* Staff Tab */}
                            {activeTab === "staff" && (
                                <motion.div
                                    key="staff"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <h2 className="section-title text-[var(--black)] mb-12">スタッフ</h2>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                                        {data.staff.map((s, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.1 }}
                                            >
                                                <div className="aspect-[3/4] bg-[var(--gray-200)] mb-4 overflow-hidden flex items-center justify-center relative">
                                                    {s.imageUrl && !s.imageUrl.includes("placeholder") ? (
                                                        <img
                                                            src={s.imageUrl}
                                                            alt={s.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="text-[var(--gray-400)] text-center">
                                                            <svg className="w-16 h-16 mx-auto mb-2 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                            </svg>
                                                            <span className="text-xs opacity-50">No Image</span>
                                                        </div>
                                                    )}
                                                </div>
                                                <h3 className="text-[var(--black)] font-bold text-lg">
                                                    {s.nameReading ? (
                                                        <ruby>
                                                            {s.name}<rt className="text-[10px] text-[var(--gray-500)]">{s.nameReading}</rt>
                                                        </ruby>
                                                    ) : s.name}
                                                </h3>
                                                <p className="text-[var(--blue)] text-sm">{s.role}</p>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* Grade Tabs */}
                            {activeTab !== "staff" && (
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {(() => {
                                        const gradeData = getGradeData(activeTab);
                                        if (!gradeData) return null;

                                        return (
                                            <>
                                                <h2 className="section-title text-[var(--black)] mb-12">{gradeData.label}</h2>

                                                {/* 男子 */}
                                                {gradeData.male && gradeData.male.length > 0 && (
                                                    <div className="mb-12">
                                                        <h3 className="text-[var(--blue)] text-lg font-bold mb-6 flex items-center gap-2">
                                                            <span className="w-8 h-[2px] bg-[var(--blue)]"></span>
                                                            男子（{gradeData.male.length}名）
                                                        </h3>
                                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                                                            {gradeData.male.map((m, i) => renderMemberCard(m, i))}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* 女子 */}
                                                {gradeData.female && gradeData.female.length > 0 && (
                                                    <div>
                                                        <h3 className="text-[var(--red)] text-lg font-bold mb-6 flex items-center gap-2">
                                                            <span className="w-8 h-[2px] bg-[var(--red)]"></span>
                                                            女子（{gradeData.female.length}名）
                                                        </h3>
                                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                                                            {gradeData.female.map((m, i) => renderMemberCard(m, i))}
                                                        </div>
                                                    </div>
                                                )}
                                            </>
                                        );
                                    })()}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
