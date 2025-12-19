"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  // 文字ごとのスタッガーアニメーション用
  const titleLine1 = "至誠力走";
  const titleLine2 = "捲土重来";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.5,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 100, rotateX: -90 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number], // easeOutQuart
      },
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[var(--dark-100)]"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 noise-overlay" />

      {/* Blob Animations - Premium Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[var(--blue)]/20 rounded-full blur-[120px] animate-blob" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[var(--blue-light)]/10 rounded-full blur-[120px] animate-blob animation-delay-2000" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)', backgroundSize: '50px 50px' }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--dark-100)]" />

      {/* Main Content */}
      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 container-custom text-center"
      >
        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <span className="label-premium">
            仙台育英学園高等学校 陸上競技部
          </span>
        </motion.div>

        {/* Main Heading with Stagger Animation */}
        <div className="flex flex-col items-center justify-center mb-12">
          <motion.h1
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-white leading-tight flex flex-col items-center"
            style={{
              fontFamily: "'Noto Serif JP', serif",
              perspective: "1000px"
            }}
          >
            {/* Line 1: 至誠力走 */}
            <div className="flex gap-4 md:gap-8 mb-4">
              {titleLine1.split("").map((char, index) => (
                <motion.span
                  key={`l1-${index}`}
                  variants={letterVariants}
                  className="inline-block text-6xl md:text-8xl lg:text-9xl font-black italic tracking-tighter"
                  style={{ textShadow: "0 0 30px rgba(30, 92, 179, 0.5)" }}
                >
                  {char}
                </motion.span>
              ))}
            </div>

            {/* Line 2: 捲土重来 */}
            <div className="flex gap-4 md:gap-8">
              {titleLine2.split("").map((char, index) => (
                <motion.span
                  key={`l2-${index}`}
                  variants={letterVariants}
                  className="inline-block text-6xl md:text-8xl lg:text-9xl font-black italic tracking-tighter text-gradient"
                  style={{ filter: "drop-shadow(0 0 20px rgba(30, 92, 179, 0.3))" }}
                >
                  {char}
                </motion.span>
              ))}
            </div>
          </motion.h1>
        </div>

        {/* Description Text */}
        <div className="max-w-3xl mx-auto mb-12 overflow-hidden px-4">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="text-[var(--muted-foreground)] text-sm md:text-base lg:text-lg leading-relaxed tracking-widest text-balance"
          >
            陸上競技部は「至誠力走」「捲土重来」をテーマに、自らの人間性の向上や学業にも励みながら、個人個人が高い意識をもって日々努力しています。全国高校駅伝に向けて、これからも頑張ります。
          </motion.p>
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.a
            href="#members"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-premium"
          >
            <span>メンバー紹介</span>
          </motion.a>
          <motion.a
            href="#team-nav"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-outline"
          >
            <span>チーム情報</span>
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-4"
        >
          <span className="text-[var(--muted-foreground)] text-xs tracking-[0.3em] uppercase">
            Scroll
          </span>
          <div className="w-px h-16 bg-gradient-to-b from-[var(--blue)] to-transparent" />
        </motion.div>
      </motion.div>

      {/* Side Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="hidden lg:block absolute left-8 top-1/2 -translate-y-1/2 -rotate-90 origin-left"
      >
        <span className="text-[var(--muted-foreground)] text-xs tracking-[0.3em] uppercase">
          Since 1975
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 rotate-90 origin-right"
      >
        <span className="text-[var(--muted-foreground)] text-xs tracking-[0.3em] uppercase">
          Track & Field
        </span>
      </motion.div>
    </section>
  );
}

