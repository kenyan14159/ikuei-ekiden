"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
  { label: "部員数", value: 42, suffix: "名" },
  { label: "全国大会出場", value: 15, suffix: "回" },
  { label: "創部", value: 1975, suffix: "年" },
  { label: "練習日数/年", value: 365, suffix: "日" },
];

const values = [
  {
    number: "01",
    title: "チーム理念",
    description: "一人一人の成長を大切にし、チーム全体で高め合う環境を作ります。",
  },
  {
    number: "02",
    title: "練習方針",
    description: "科学的トレーニングと伝統的な練習法を融合させた独自のメソッドを実践しています。",
  },
  {
    number: "03",
    title: "目標",
    description: "全国大会での上位入賞を目指し、日々限界に挑戦しています。",
  },
];

// Counter animation hook
function useCounter(end: number, duration: number = 2, inView: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

      // Easing function
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, inView]);

  return count;
}

function StatCard({ stat, index, inView }: { stat: typeof stats[0]; index: number; inView: boolean }) {
  const count = useCounter(stat.value, 2, inView);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="text-center"
    >
      <div className="stat-number">
        {count}
        <span className="text-2xl md:text-3xl">{stat.suffix}</span>
      </div>
      <div className="text-[var(--muted-foreground)] text-sm tracking-wider mt-2">
        {stat.label}
      </div>
    </motion.div>
  );
}

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding bg-[var(--dark-200)] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 noise-overlay" />
      <div className="absolute top-0 left-0 w-1/2 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />

      <div className="container-custom relative" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <span className="label-premium mb-6 block w-fit">About Us</span>
          <h2 className="section-title text-white mb-6">
            チーム情報
          </h2>
          <p className="text-[var(--muted-foreground)] text-lg max-w-2xl">
            伝統と革新が融合する、仙台育英陸上競技部長距離ブロック
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-24">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} inView={isInView} />
          ))}
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12 mb-24">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 + 0.4 }}
              className="card-premium group"
            >
              <span className="text-[var(--blue)] text-5xl font-bold opacity-30 group-hover:opacity-100 transition-opacity">
                {value.number}
              </span>
              <h3 className="text-white text-xl font-bold mt-4 mb-4">
                {value.title}
              </h3>
              <p className="text-[var(--muted-foreground)] leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Description Block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="relative"
        >
          <div className="absolute -left-4 top-0 bottom-0 w-1 bg-[var(--blue)]" />
          <div className="pl-8 md:pl-12 max-w-4xl">
            <h3 className="text-white text-2xl md:text-3xl font-bold mb-6">
              私たちについて
            </h3>
            <div className="space-y-4 text-[var(--muted-foreground)] text-lg leading-relaxed">
              <p>
                仙台育英学園高等学校陸上競技部長距離ブロックは、1975年の創部以来、数多くの優秀な選手を輩出してきました。
              </p>
              <p>
                私たちは、個々の能力を最大限に引き出すため、最新のスポーツ科学に基づいたトレーニングプログラムを実施しています。
                また、先輩から後輩へと受け継がれる伝統と精神を大切にし、チーム一丸となって目標に向かって走り続けています。
              </p>
              <p>
                全国大会での活躍を目指すとともに、人間として成長できる環境づくりにも力を入れています。
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
    </section>
  );
}
