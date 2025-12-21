"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";

interface ScheduleEvent {
  id: number;
  date: string;
  title: string;
  category: string;
  month: number;
}

export default function Schedule() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [events, setEvents] = useState<ScheduleEvent[]>([]);

  useEffect(() => {
    fetch("/data/schedule.json")
      .then((res) => res.json())
      .then((data) => setEvents(data.events.slice(0, 5))) // 最初の5件を表示
      .catch((err) => console.error("Failed to load schedule:", err));
  }, []);

  // 日付をフォーマット (2025-12-20 -> 12.20)
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${month}.${day}`;
  };

  return (
    <section id="schedule" className="section-padding bg-[var(--gray-100)] relative" ref={ref}>
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-[var(--blue)] text-sm tracking-widest uppercase mb-4 block">
            Schedule
          </span>
          <h2 className="text-[var(--black)] text-2xl md:text-3xl font-bold">
            今後の試合予定
          </h2>
        </motion.div>

        {/* Events List */}
        <div className="max-w-3xl mx-auto">
          {events.length === 0 ? (
            <div className="text-center text-[var(--gray-500)]">
              読み込み中...
            </div>
          ) : (
            events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center gap-6 py-5 border-b border-[var(--gray-300)] last:border-b-0 group hover:bg-white transition-colors px-4 -mx-4"
              >
                {/* Date */}
                <div className="flex-shrink-0 w-16">
                  <span className="text-[var(--blue)] text-lg font-bold font-mono">
                    {formatDate(event.date)}
                  </span>
                </div>

                {/* Title */}
                <div className="flex-grow">
                  <h3 className="text-[var(--black)] font-bold text-base md:text-lg group-hover:text-[var(--blue)] transition-colors">
                    {event.title}
                  </h3>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-8"
        >
          <Link
            href="/topics/schedule"
            className="inline-flex items-center gap-2 text-[var(--blue)] font-bold text-sm hover:gap-3 transition-all"
          >
            すべてのスケジュールを見る
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
