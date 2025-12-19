"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const galleryItems = [
  {
    title: "朝練習",
    description: "毎朝6時からのトラック練習",
    date: "2024.10.15",
    category: "練習",
    size: "large",
  },
  {
    title: "インターバルトレーニング",
    description: "400m×10本のスピード練習",
    date: "2024.10.10",
    category: "練習",
    size: "small",
  },
  {
    title: "山形合宿",
    description: "夏季強化合宿での高地トレーニング",
    date: "2024.08.20",
    category: "合宿",
    size: "small",
  },
  {
    title: "ロング走",
    description: "週末の30km走トレーニング",
    date: "2024.10.05",
    category: "練習",
    size: "medium",
  },
  {
    title: "筋力トレーニング",
    description: "ウエイトトレーニングと体幹強化",
    date: "2024.09.28",
    category: "練習",
    size: "medium",
  },
  {
    title: "チームミーティング",
    description: "月次の目標設定と反省会",
    date: "2024.10.01",
    category: "活動",
    size: "large",
  },
];

export default function Gallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="gallery" className="section-padding bg-[var(--dark-200)] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 noise-overlay" />

      <div className="container-custom relative" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-20"
        >
          <span className="label-premium mb-6 block w-fit">Gallery</span>
          <h2 className="section-title text-white mb-4">
            練習風景
          </h2>
          <p className="text-[var(--muted-foreground)] text-lg max-w-xl">
            日々のトレーニングと活動の様子
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`relative group cursor-pointer overflow-hidden ${item.size === "large" ? "md:col-span-2 md:row-span-2" :
                  item.size === "medium" ? "md:row-span-2" : ""
                }`}
            >
              {/* Image Placeholder */}
              <div className={`bg-[var(--dark-300)] w-full ${item.size === "large" ? "h-80 md:h-[500px]" :
                  item.size === "medium" ? "h-60 md:h-[400px]" :
                    "h-60 md:h-64"
                }`}>
                <motion.div
                  className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[var(--dark-300)] to-[var(--dark-400)]"
                  animate={{
                    scale: hoveredIndex === index ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                >
                  <svg
                    className="w-16 h-16 text-[var(--muted-foreground)] opacity-30"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </motion.div>

                {/* Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-[var(--dark-100)] via-transparent to-transparent"
                  initial={{ opacity: 0.6 }}
                  animate={{ opacity: hoveredIndex === index ? 0.9 : 0.6 }}
                />

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="label-premium text-xs">
                    {item.category}
                  </span>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <motion.div
                    initial={{ y: 20 }}
                    animate={{ y: hoveredIndex === index ? 0 : 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-[var(--muted-foreground)] text-xs tracking-wider block mb-2">
                      {item.date}
                    </span>
                    <h3 className="text-white text-xl md:text-2xl font-bold mb-2">
                      {item.title}
                    </h3>
                    <motion.p
                      className="text-[var(--muted-foreground)] text-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {item.description}
                    </motion.p>
                  </motion.div>
                </div>

                {/* Hover Border */}
                <motion.div
                  className="absolute inset-0 border border-[var(--blue)] pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 md:mt-20"
        >
          <div className="card-premium flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-white text-xl md:text-2xl font-bold mb-2">
                練習見学をご希望の方へ
              </h3>
              <p className="text-[var(--muted-foreground)]">
                実際の練習風景をご覧いただけます。お気軽にお問い合わせください。
              </p>
            </div>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-premium whitespace-nowrap"
            >
              <span>見学を申し込む</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
