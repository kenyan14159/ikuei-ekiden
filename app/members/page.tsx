"use client";

import { useEffect, useState } from "react";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import { SubpageHeader } from "@/components/SubpageHeader";
import { motion } from "framer-motion";

interface Member {
    name: string;
    nameRubyParts: { kanji: string; ruby: string }[];
    imageUrl: string;
    middleSchool: string;
    personalBests: { event: string; time: string }[];
    grade: number;
}

interface MembersData {
    staff: { name: string; role: string; imageUrl: string }[];
    members: {
        [key: string]: Member[];
    };
}

export default function MembersPage() {
    const [data, setData] = useState<MembersData | null>(null);

    useEffect(() => {
        fetch("/data/members.json")
            .then((res) => res.json())
            .then((json) => setData(json))
            .catch((err) => console.error("Failed to load members:", err));
    }, []);

    if (!data) return null;

    return (
        <div className="min-h-screen bg-[var(--dark-100)]">
            <Header />
            <main>
                <SubpageHeader
                    title="Members"
                    subtitle="共に高みを目指す、仙台育英陸上競技部長距離ブロックの精鋭たちを紹介します。"
                    breadcrumbs={[{ label: "Team", href: "#" }]}
                />

                {/* Staff Section */}
                <section className="section-padding relative">
                    <div className="container-custom">
                        <h2 className="section-title text-white mb-12">Staff</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {data.staff.map((s, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <div className="aspect-[3/4] bg-[var(--dark-300)] mb-4 overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={s.imageUrl} alt={s.name} className="w-full h-full object-cover" />
                                    </div>
                                    <h3 className="text-white font-bold text-lg">{s.name}</h3>
                                    <p className="text-[var(--blue)] text-sm">{s.role}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Students Section */}
                {Object.entries(data.members).map(([grade, members]) => (
                    <section key={grade} className="section-padding border-t border-[var(--border)]">
                        <div className="container-custom">
                            <h2 className="section-title text-white mb-12">{grade}</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                                {members.map((m, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        viewport={{ once: true }}
                                        className="group"
                                    >
                                        <div className="aspect-[3/4] bg-[var(--dark-300)] mb-4 overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-500">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={m.imageUrl} alt={m.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[var(--dark-100)] via-transparent to-transparent opacity-60" />
                                        </div>
                                        <div className="mb-2">
                                            <div className="flex gap-1 mb-1">
                                                {m.nameRubyParts.map((p, pi) => (
                                                    <ruby key={pi} className="text-[10px] text-[var(--muted-foreground)] mr-1">
                                                        {p.kanji}<rt>{p.ruby}</rt>
                                                    </ruby>
                                                ))}
                                            </div>
                                            <h3 className="text-white font-bold text-xl">{m.name}</h3>
                                        </div>
                                        <p className="text-[var(--muted-foreground)] text-xs mb-3">{m.middleSchool}出身</p>
                                        <div className="space-y-1">
                                            {m.personalBests.map((pb, pbi) => (
                                                <div key={pbi} className="flex justify-between text-[10px] text-[var(--muted-foreground)] border-b border-[var(--border)] pb-1">
                                                    <span>{pb.event}</span>
                                                    <span className="text-white font-mono">{pb.time}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>
                ))}
            </main>
            <Footer />
        </div>
    );
}
