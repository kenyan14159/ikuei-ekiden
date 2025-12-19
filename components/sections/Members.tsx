"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const members = [
  {
    name: "佐藤 太郎",
    nameEn: "Taro Sato",
    grade: "3年",
    position: "主将",
    specialty: "5000m",
    record: "14:05.32",
    achievement: "インターハイ出場",
  },
  {
    name: "鈴木 次郎",
    nameEn: "Jiro Suzuki",
    grade: "3年",
    position: "副主将",
    specialty: "1500m",
    record: "3:52.18",
    achievement: "東北大会優勝",
  },
  {
    name: "高橋 花子",
    nameEn: "Hanako Takahashi",
    grade: "2年",
    position: "女子キャプテン",
    specialty: "3000m",
    record: "9:28.45",
    achievement: "全国高校駅伝出場",
  },
  {
    name: "田中 健",
    nameEn: "Ken Tanaka",
    grade: "2年",
    position: "部員",
    specialty: "10000m",
    record: "30:12.67",
    achievement: "県大会3位",
  },
  {
    name: "伊藤 美咲",
    nameEn: "Misaki Ito",
    grade: "1年",
    position: "部員",
    specialty: "800m",
    record: "2:15.89",
    achievement: "新人戦優勝",
  },
  {
    name: "渡辺 大輝",
    nameEn: "Daiki Watanabe",
    grade: "1年",
    position: "部員",
    specialty: "1500m",
    record: "4:02.34",
    achievement: "県新人戦2位",
  },
];

export default function Members() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="members" className="section-padding bg-[var(--dark-100)] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 noise-overlay" />

      <div className="container-custom relative" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-20"
        >
          <span className="label-premium mb-6 block w-fit">Athletes</span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h2 className="section-title text-white mb-4">
                メンバー紹介
              </h2>
              <p className="text-[var(--muted-foreground)] text-lg max-w-xl">
                チームを支える選手たち
              </p>
            </div>
            <motion.a
              href="#recruit"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
              className="text-[var(--blue)] text-sm tracking-wider link-underline w-fit"
            >
              入部案内を見る →
            </motion.a>
          </div>
        </motion.div>

        {/* Members Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {members.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative"
            >
              <div className="card-premium h-full">
                {/* Number Badge */}
                <div className="absolute -top-3 -right-3 w-12 h-12 bg-[var(--blue)] flex items-center justify-center">
                  <span className="text-[var(--dark-100)] text-sm font-bold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Avatar Placeholder */}
                <div className="w-20 h-20 mb-6 bg-[var(--dark-300)] flex items-center justify-center overflow-hidden">
                  <motion.div
                    animate={{
                      scale: hoveredIndex === index ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg
                      className="w-12 h-12 text-[var(--muted-foreground)]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </motion.div>
                </div>

                {/* Info */}
                <div className="space-y-4">
                  <div>
                    <span className="text-[var(--blue)] text-xs tracking-wider">
                      {member.grade} / {member.position}
                    </span>
                    <h3 className="text-white text-xl font-bold mt-1">
                      {member.name}
                    </h3>
                    <span className="text-[var(--muted-foreground)] text-xs tracking-wider">
                      {member.nameEn}
                    </span>
                  </div>

                  <div className="pt-4 border-t border-[var(--border)]">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-[var(--muted-foreground)] text-xs block mb-1">
                          専門種目
                        </span>
                        <span className="text-white text-sm font-medium">
                          {member.specialty}
                        </span>
                      </div>
                      <div>
                        <span className="text-[var(--muted-foreground)] text-xs block mb-1">
                          自己ベスト
                        </span>
                        <span className="text-[var(--blue)] text-sm font-bold">
                          {member.record}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-[var(--muted-foreground)] text-sm">
                    <span className="inline-block px-2 py-1 bg-[var(--dark-300)] text-xs">
                      {member.achievement}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-[var(--muted-foreground)] text-sm">
            ※ 記録は2024年シーズンのものです（サンプルデータ）
          </p>
        </motion.div>
      </div>
    </section>
  );
}
