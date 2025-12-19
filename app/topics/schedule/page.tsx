"use client";

import { useEffect, useState } from "react";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import { SubpageHeader } from "@/components/SubpageHeader";
import { motion } from "framer-motion";

interface ScheduleEvent {
    date: string;
    title: string;
    location: string;
    category: string;
}

export default function SchedulePage() {
    const [events, setEvents] = useState<ScheduleEvent[]>([]);

    useEffect(() => {
        fetch("/data/schedule.json")
            .then((res) => res.json())
            .then((json) => setEvents(json.events))
            .catch((err) => console.error("Failed to load schedule:", err));
    }, []);

    const formatDate = (dateStr: string) => {
        return dateStr.replace(/-/g, ".");
    };

    return (
        <div className="min-h-screen bg-[var(--dark-100)]">
            <Header />
            <main>
                <SubpageHeader
                    title="Schedule"
                    subtitle="年間を通じた大会・記録会の予定です。応援よろしくお願いいたします。"
                    breadcrumbs={[{ label: "Topics", href: "#" }]}
                />

                <section className="section-padding relative">
                    <div className="container-custom">
                        <div className="max-w-4xl mx-auto space-y-8">
                            {events.map((event, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                    viewport={{ once: true }}
                                    className="relative p-8 bg-[var(--dark-300)] border-l-4 border-[var(--blue)] group hover:bg-[var(--dark-400)] transition-all duration-300"
                                >
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                        <div>
                                            <div className="flex items-center gap-4 mb-4">
                                                <span className="text-[var(--blue)] font-black text-2xl font-mono tracking-tighter">
                                                    {formatDate(event.date)}
                                                </span>
                                                <span className="text-[10px] uppercase tracking-[0.2em] px-3 py-1 bg-[var(--blue)]/10 text-[var(--blue)] border border-[var(--blue)]/20 font-bold">
                                                    {event.category}
                                                </span>
                                            </div>
                                            <h2 className="text-white text-2xl md:text-3xl font-bold mb-4">
                                                {event.title}
                                            </h2>
                                            <div className="flex items-center gap-2 text-[var(--muted-foreground)] text-sm">
                                                <svg className="w-5 h-5 text-[var(--blue)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                {event.location}
                                            </div>
                                        </div>

                                        <button className="flex-shrink-0 px-8 py-3 bg-transparent border border-[var(--blue)] text-[var(--blue)] text-[10px] uppercase tracking-widest font-bold hover:bg-[var(--blue)] hover:text-dark transition-all duration-300">
                                            Details
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
