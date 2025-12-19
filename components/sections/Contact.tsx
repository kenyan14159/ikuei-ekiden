"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const contactMethods = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    label: "電話",
    value: "022-XXX-XXXX",
    description: "平日 9:00-17:00",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: "メール",
    value: "track@sendai-ikuei.ed.jp",
    description: "24時間受付",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: "所在地",
    value: "宮城県仙台市宮城野区",
    description: "仙台育英学園高等学校",
  },
];

const faqItems = [
  {
    question: "入部に必要な条件はありますか？",
    answer: "特別な条件はありません。長距離走に興味があり、目標に向かって努力できる方であれば歓迎します。",
  },
  {
    question: "練習見学は可能ですか？",
    answer: "はい、事前にご連絡いただければ練習見学が可能です。実際の練習風景を見ていただけます。",
  },
  {
    question: "寮はありますか？",
    answer: "はい、遠方の方のために学生寮を完備しています。寮生活についてはお問い合わせください。",
  },
  {
    question: "部活動と勉強の両立はできますか？",
    answer: "はい、多くの部員が学業と部活動を両立しています。学習サポート体制も整えています。",
  },
];

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section id="contact" className="section-padding bg-[var(--dark-200)] relative overflow-hidden">
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
          <span className="label-premium mb-6 block w-fit">Contact</span>
          <h2 className="section-title text-white mb-4">
            お問い合わせ
          </h2>
          <p className="text-[var(--muted-foreground)] text-lg max-w-xl">
            ご質問・お問い合わせはお気軽にどうぞ
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column - Contact Methods */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-white text-xl font-bold mb-8 flex items-center gap-4">
              <span className="w-12 h-px bg-[var(--blue)]" />
              連絡先
            </h3>

            <div className="space-y-6">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={method.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-4 p-6 bg-[var(--dark-300)] hover:bg-[var(--dark-400)] transition-colors group"
                >
                  <div className="text-[var(--blue)] group-hover:scale-110 transition-transform">
                    {method.icon}
                  </div>
                  <div>
                    <span className="text-[var(--muted-foreground)] text-xs tracking-wider block mb-1">
                      {method.label}
                    </span>
                    <span className="text-white font-medium block mb-1">
                      {method.value}
                    </span>
                    <span className="text-[var(--muted-foreground)] text-sm">
                      {method.description}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - FAQ */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-white text-xl font-bold mb-8 flex items-center gap-4">
              <span className="w-12 h-px bg-[var(--blue)]" />
              よくある質問
            </h3>

            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <motion.div
                  key={item.question}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="border border-[var(--border)]"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-[var(--dark-300)] transition-colors"
                  >
                    <span className="text-white font-medium pr-4">{item.question}</span>
                    <motion.span
                      animate={{ rotate: openFaq === index ? 45 : 0 }}
                      className="text-[var(--blue)] text-2xl flex-shrink-0"
                    >
                      +
                    </motion.span>
                  </button>

                  <motion.div
                    initial={false}
                    animate={{
                      height: openFaq === index ? "auto" : 0,
                      opacity: openFaq === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-[var(--muted-foreground)] leading-relaxed">
                      {item.answer}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
