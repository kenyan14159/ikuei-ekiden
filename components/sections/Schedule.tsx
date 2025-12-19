"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface ScheduleEvent {
  date: string;
  title: string;
  location: string;
  category: string;
}

export default function Schedule() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [events, setEvents] = useState<ScheduleEvent[]>([]);

  useEffect(() => {
    fetch("/data/schedule.json")
      .then((res) => res.json())
      .then((data) => setEvents(data.events.slice(0, 3))) // 最初の3件を表示
      .catch((err) => console.error("Failed to load schedule:", err));
  }, []);

  // 日付をフォーマット (2025-12-20 -> 2025.12.20)
  const formatDate = (dateStr: string) => {
    return dateStr.replace(/-/g, ".");
  };

  return (
    <section id="schedule" className="section-padding bg-[var(--dark-100)] relative" ref={ref}>
      <div className="absolute inset-0 noise-overlay" />

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
          <h2 className="text-white text-2xl md:text-3xl font-bold">
            今後の試合予定
          </h2>
        </motion.div>

        {/* Events List */}
        <div className="max-w-3xl mx-auto">
          {events.length === 0 ? (
            <div className="text-center text-[var(--muted-foreground)]">
              読み込み中...
            </div>
          ) : (
            events.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-6 py-6 border-b border-[var(--border)] last:border-b-0 group hover:border-[var(--blue)] transition-colors"
              >
                {/* Date */}
                <div className="flex-shrink-0 w-28">
                  <span className="text-[var(--blue)] text-lg font-bold">
                    {formatDate(event.date)}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs px-2 py-1 bg-[var(--blue)]/10 text-[var(--blue)] border border-[var(--blue)]/30">
                      {event.category}
                    </span>
                  </div>
                  <h3 className="text-white font-bold text-lg md:text-xl mb-2 group-hover:text-[var(--blue)] transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-[var(--muted-foreground)] text-sm flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {event.location}
                  </p>
                </div>

                {/* Arrow */}
                <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-6 h-6 text-[var(--blue)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
