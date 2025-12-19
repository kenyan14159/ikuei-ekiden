"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const requirements = [
  { title: "情熱を持つこと", description: "走ることへの強い情熱と向上心を持っていること" },
  { title: "チームワーク", description: "仲間と協力し、チームの一員として活動できること" },
  { title: "努力を惜しまない", description: "目標達成のために日々努力を続けられること" },
];

const trainingSchedule = [
  { day: "月曜日", content: "基礎走力トレーニング" },
  { day: "火曜日", content: "インターバル走" },
  { day: "水曜日", content: "ペース走・距離走" },
  { day: "木曜日", content: "スピード練習" },
  { day: "金曜日", content: "ロング走" },
  { day: "土曜日", content: "ポイント練習" },
  { day: "日曜日", content: "休養・自主練習" },
];

const steps = [
  { number: "01", title: "お問い合わせ", description: "まずは電話またはメールでお問い合わせください。" },
  { number: "02", title: "練習見学", description: "実際の練習風景を見学していただけます。" },
  { number: "03", title: "体験入部", description: "1週間程度の体験入部が可能です。" },
  { number: "04", title: "正式入部", description: "本人・保護者の意思確認後、正式入部となります。" },
];

export default function Recruit() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="recruit" className="section-padding bg-[var(--dark-100)] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 noise-overlay" />

      <div className="container-custom relative" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-20 text-center"
        >
          <span className="label-premium mb-6 block mx-auto w-fit">Join Us</span>
          <h2 className="section-title text-white mb-4 mx-auto w-fit">
            入部案内
          </h2>
          <p className="text-[var(--muted-foreground)] text-lg max-w-2xl mx-auto">
            一緒に全国の頂点を目指しませんか？
          </p>
        </motion.div>

        {/* Requirements */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <h3 className="text-white text-xl font-bold mb-8 flex items-center gap-4">
            <span className="w-12 h-px bg-[var(--blue)]" />
            求める部員像
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {requirements.map((req, index) => (
              <div key={req.title} className="card-premium">
                <span className="text-[var(--blue)] text-4xl font-bold opacity-30">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h4 className="text-white text-lg font-bold mt-4 mb-2">{req.title}</h4>
                <p className="text-[var(--muted-foreground)] text-sm">{req.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Training Schedule */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-20"
        >
          <h3 className="text-white text-xl font-bold mb-8 flex items-center gap-4">
            <span className="w-12 h-px bg-[var(--blue)]" />
            練習スケジュール
          </h3>
          <div className="card-premium">
            <div className="grid grid-cols-2 md:grid-cols-7 gap-4">
              {trainingSchedule.map((schedule) => (
                <div
                  key={schedule.day}
                  className={`text-center p-4 ${schedule.day === "日曜日" ? "bg-[var(--dark-300)]" : ""
                    }`}
                >
                  <span className="text-[var(--blue)] text-xs tracking-wider block mb-2">
                    {schedule.day}
                  </span>
                  <span className="text-white text-sm">{schedule.content}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Entry Steps */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-20"
        >
          <h3 className="text-white text-xl font-bold mb-8 flex items-center gap-4">
            <span className="w-12 h-px bg-[var(--blue)]" />
            入部までの流れ
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                className="relative"
              >
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-px bg-[var(--border)] z-0" />
                )}

                <div className="relative z-10">
                  <div className="w-16 h-16 bg-[var(--blue)] flex items-center justify-center mb-4">
                    <span className="text-[var(--dark-100)] text-xl font-bold">{step.number}</span>
                  </div>
                  <h4 className="text-white font-bold mb-2">{step.title}</h4>
                  <p className="text-[var(--muted-foreground)] text-sm">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <div className="card-premium inline-block">
            <p className="text-[var(--muted-foreground)] mb-6">
              入部に関するご質問やお問い合わせはお気軽にどうぞ
            </p>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-premium"
            >
              <span>お問い合わせ</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
