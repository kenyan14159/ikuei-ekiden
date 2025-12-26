"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import NextImage from "next/image";

// 画像パスを配列で管理（Next.js Imageで最適化）
const heroImages = Array.from({ length: 15 }, (_, i) => ({
  src: `/images/ikuei-ekiden-img/ikuei-img${i + 1}.JPG`,
  alt: `仙台育英陸上競技部 練習風景 ${i + 1}`,
}));

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  // ランダムな画像表示のためのステート
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [preloadedImages, setPreloadedImages] = useState<Set<number>>(new Set([0]));

  useEffect(() => {
    // 最初の画像をランダムに選択（ただし0から始めることで確実に読み込む）
    const initialIndex = 0;
    setCurrentImageIndex(initialIndex);

    // 最初の画像を優先読み込み（ブラウザのネイティブImageコンストラクタを使用）
    const firstImage = new window.Image();
    firstImage.src = heroImages[initialIndex].src;
    firstImage.onload = () => {
      setPreloadedImages(prev => new Set([...prev, initialIndex]));
    };

    // 次の2-3枚をバックグラウンドでプリロード（パフォーマンスを考慮して3枚まで）
    const preloadCount = Math.min(3, heroImages.length - 1);
    const preloadIndices = Array.from({ length: preloadCount }, (_, i) => i + 1);
    
    preloadIndices.forEach((index) => {
      const img = new window.Image();
      img.src = heroImages[index].src;
      img.onload = () => {
        setPreloadedImages(prev => new Set([...prev, index]));
      };
    });
  }, []);

  useEffect(() => {
    // 8秒ごとに画像を切り替え（リソース消費を削減）
    // プリロード済みの画像から選択
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => {
        if (preloadedImages.size === 0) return prev;
        
        const available = Array.from(preloadedImages);
        // 現在の画像以外から選択
        const filtered = available.filter(idx => idx !== prev);
        const next = filtered.length > 0 
          ? filtered[Math.floor(Math.random() * filtered.length)]
          : available[Math.floor(Math.random() * available.length)];
        
        return next;
      });
    }, 8000); // 5秒から8秒に延長

    return () => clearInterval(interval);
  }, [preloadedImages]);

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
        ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Background Image Slideshow */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            <NextImage
              src={heroImages[currentImageIndex].src}
              alt={heroImages[currentImageIndex].alt}
              fill
              className="object-cover"
              priority={currentImageIndex === 0}
              loading={currentImageIndex === 0 ? "eager" : "lazy"}
              quality={85}
              sizes="100vw"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//Z"
            />
          </motion.div>
        </AnimatePresence>
        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.1]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)', backgroundSize: '50px 50px' }}
        />
      </div>

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
          <span className="inline-block px-4 py-2 text-xs font-bold tracking-[0.2em] uppercase text-white border border-white/30 bg-white/10 backdrop-blur-sm">
            仙台育英学園高等学校 陸上競技部 長距離ブロック
          </span>
        </motion.div>

        {/* Main Heading with Stagger Animation */}
        <div className="flex flex-col items-center justify-center mb-12">
          <motion.h1
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-white leading-tight flex flex-col items-center drop-shadow-2xl"
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
                  style={{ textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}
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
                  className="inline-block text-6xl md:text-8xl lg:text-9xl font-black italic tracking-tighter text-blue-200"
                  style={{ textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}
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
            className="text-white/90 text-sm md:text-base lg:text-lg leading-relaxed tracking-widest text-balance drop-shadow-md font-medium"
          >
            陸上競技部は「至誠力走」「捲土重来」をテーマに、自らの人間性の向上や学業にも励みながら、個人個人が高い意識をもって日々努力しています。全国高校駅伝に向けて、これからも頑張ります。
          </motion.p>
        </div>


      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-4"
        >
          <span className="text-white/70 text-xs tracking-[0.3em] uppercase drop-shadow">
            Scroll
          </span>
          <div className="w-px h-16 bg-gradient-to-b from-white to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
