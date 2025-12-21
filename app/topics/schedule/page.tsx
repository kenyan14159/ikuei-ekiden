"use client";

import { useEffect, useState } from "react";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import { SubpageHeader } from "@/components/SubpageHeader";
import { motion } from "framer-motion";

interface ScheduleEvent {
    id: number;
    title: string;
    date: string;
    endDate?: string;
    category: string;
    description?: string;
    isCancelled?: boolean;
    month: number;
}

interface ScheduleData {
    year: number;
    events: ScheduleEvent[];
}

const monthNames = ["", "1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];

// 季節カテゴリ
const seasonColors: { [key: string]: { bg: string; text: string; border: string } } = {
    "春": { bg: "bg-pink-100", text: "text-pink-700", border: "border-pink-500" },
    "夏": { bg: "bg-orange-100", text: "text-orange-700", border: "border-orange-500" },
    "秋": { bg: "bg-amber-100", text: "text-amber-700", border: "border-amber-500" },
    "冬": { bg: "bg-blue-100", text: "text-blue-700", border: "border-blue-500" },
};

// 月から季節を判定
const getSeason = (month: number): string => {
    if (month >= 3 && month <= 5) return "春";
    if (month >= 6 && month <= 8) return "夏";
    if (month >= 9 && month <= 11) return "秋";
    return "冬";
};

export default function SchedulePage() {
    const [data, setData] = useState<ScheduleData | null>(null);
    const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

    useEffect(() => {
        fetch("/data/schedule.json")
            .then((res) => res.json())
            .then((json) => setData(json))
            .catch((err) => console.error("Failed to load schedule:", err));
    }, []);

    if (!data) return null;

    const formatDate = (dateStr: string, endDateStr?: string) => {
        const date = new Date(dateStr);
        const month = date.getMonth() + 1;
        const day = date.getDate();

        if (endDateStr) {
            const endDate = new Date(endDateStr);
            const endMonth = endDate.getMonth() + 1;
            const endDay = endDate.getDate();

            if (month === endMonth) {
                return `${month}/${day}〜${endDay}`;
            } else {
                return `${month}/${day}〜${endMonth}/${endDay}`;
            }
        }

        return `${month}/${day}`;
    };

    // 月ごとにイベントをグループ化
    const eventsByMonth: { [key: number]: ScheduleEvent[] } = {};
    data.events.forEach((event) => {
        if (!eventsByMonth[event.month]) {
            eventsByMonth[event.month] = [];
        }
        eventsByMonth[event.month].push(event);
    });

    const months = Object.keys(eventsByMonth).map(Number).sort((a, b) => a - b);
    const filteredMonths = selectedMonth ? [selectedMonth] : months;

    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main>
                <SubpageHeader
                    title="Schedule"
                    subtitle={`${data.year}年度の主要大会スケジュール`}
                    breadcrumbs={[{ label: "Topics", href: "/topics" }]}
                />

                <section className="section-padding relative">
                    <div className="container-custom">
                        {/* 月フィルター */}
                        <div className="mb-12 overflow-x-auto">
                            <div className="flex gap-2 min-w-max pb-2">
                                <button
                                    onClick={() => setSelectedMonth(null)}
                                    className={`px-4 py-2 text-sm font-bold transition-all ${selectedMonth === null
                                        ? "bg-[var(--blue)] text-white"
                                        : "bg-[var(--gray-100)] text-[var(--black)] hover:bg-[var(--gray-200)]"
                                        }`}
                                >
                                    すべて
                                </button>
                                {months.map((month) => (
                                    <button
                                        key={month}
                                        onClick={() => setSelectedMonth(month)}
                                        className={`px-4 py-2 text-sm font-bold transition-all ${selectedMonth === month
                                            ? "bg-[var(--blue)] text-white"
                                            : "bg-[var(--gray-100)] text-[var(--black)] hover:bg-[var(--gray-200)]"
                                            }`}
                                    >
                                        {monthNames[month]}
                                        <span className="ml-1 text-xs opacity-60">
                                            ({eventsByMonth[month].length})
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* カテゴリ凡例（季節） */}
                        <div className="mb-8 flex flex-wrap gap-4">
                            {Object.entries(seasonColors).map(([season, colors]) => (
                                <div key={season} className="flex items-center gap-2">
                                    <span className={`w-3 h-3 ${colors.border.replace('border-', 'bg-')}`}></span>
                                    <span className="text-[var(--gray-600)] text-sm">{season}</span>
                                </div>
                            ))}
                        </div>

                        {/* スケジュール一覧 */}
                        <div className="space-y-12">
                            {filteredMonths.map((month) => {
                                const season = getSeason(month);
                                const colors = seasonColors[season];

                                return (
                                    <div key={month}>
                                        <h2 className="text-[var(--black)] text-2xl font-bold mb-6 flex items-center gap-3">
                                            <span className={`w-12 h-12 ${colors.border.replace('border-', 'bg-')} flex items-center justify-center text-white font-black`}>
                                                {month}
                                            </span>
                                            <span>{monthNames[month]}</span>
                                            <span className="text-sm font-normal text-[var(--gray-500)]">
                                                {eventsByMonth[month].length}件
                                            </span>
                                        </h2>

                                        <div className="space-y-3">
                                            {eventsByMonth[month].map((event, i) => {
                                                const eventSeason = getSeason(event.month);
                                                const eventColors = seasonColors[eventSeason];

                                                return (
                                                    <motion.div
                                                        key={event.id}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        whileInView={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: i * 0.05 }}
                                                        viewport={{ once: true }}
                                                        className={`relative p-5 bg-[var(--gray-50)] border-l-4 ${eventColors.border} ${event.isCancelled ? "opacity-50" : ""
                                                            } hover:bg-[var(--gray-100)] transition-all duration-300`}
                                                    >
                                                        <div className="flex flex-col md:flex-row md:items-start gap-4">
                                                            {/* 日付 */}
                                                            <div className="flex-shrink-0 w-24">
                                                                <span className={`${eventColors.text} font-bold text-lg font-mono`}>
                                                                    {formatDate(event.date, event.endDate)}
                                                                </span>
                                                            </div>

                                                            {/* タイトル・詳細 */}
                                                            <div className="flex-1">
                                                                <div className="flex flex-wrap items-center gap-2 mb-1">
                                                                    <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 ${eventColors.bg} ${eventColors.text} font-bold`}>
                                                                        {eventSeason}
                                                                    </span>
                                                                    {event.isCancelled && (
                                                                        <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 bg-red-100 text-red-700 font-bold">
                                                                            中止
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <h3 className={`text-[var(--black)] font-bold ${event.isCancelled ? "line-through" : ""}`}>
                                                                    {event.title}
                                                                </h3>
                                                                {event.description && (
                                                                    <p className="text-[var(--gray-600)] text-sm mt-1">
                                                                        {event.description}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
