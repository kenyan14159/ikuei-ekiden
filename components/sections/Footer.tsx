"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const footerLinks = [
  {
    title: "トピックス",
    links: [
      { label: "スケジュール", href: "/topics/schedule" },
      { label: "ニュース", href: "/topics/news" },
      { label: "リザルト", href: "/topics/results" },
    ],
  },
  {
    title: "チーム情報",
    links: [
      { label: "サポーター", href: "/team/supporters" },
      { label: "感謝", href: "/team/thanks" },
      { label: "サイトについて", href: "/team/about-site" },
    ],
  },
  {
    title: "その他",
    links: [
      { label: "メンバー", href: "/members" },
      { label: "お問い合わせ", href: "/contact" },
      { label: "限定", href: "/limited-content" },
    ],
  },
];

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/sendaiikuei/",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/Sendaiikuei/?locale=ja_JP",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
      </svg>
    ),
  },
];

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <footer className="bg-[var(--gray-100)] relative overflow-hidden" ref={ref}>
      {/* Top Border */}
      <div className="h-px bg-gradient-to-r from-transparent via-[var(--blue)] to-transparent" />

      <div className="container-custom py-10 md:py-12">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image
                src="/images/ikuei-ekiden.png"
                alt="仙台育英 駅伝"
                width={166}
                height={50}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-[var(--gray-500)] text-xs leading-relaxed mb-4 max-w-xs">
              至誠力走の精神で、日本一を目指して走り続ける。
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-[var(--gray-200)] flex items-center justify-center text-[var(--gray-600)] hover:bg-[var(--blue)] hover:text-white transition-all"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Links */}
          {footerLinks.map((group, i) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * (i + 1) }}
            >
              <h3 className="text-[var(--black)] font-bold text-xs uppercase tracking-widest mb-3">
                {group.title}
              </h3>
              <ul className="space-y-1.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[var(--gray-500)] text-sm hover:text-[var(--blue)] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col md:flex-row justify-between items-center gap-3 pt-6 border-t border-[var(--gray-200)]"
        >
          <p className="text-[var(--gray-500)] text-xs tracking-wider">
            © {new Date().getFullYear()} 仙台育英学園高等学校 陸上競技部 長距離ブロック
          </p>
          <a
            href="https://www.sendaiikuei.ed.jp/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--gray-500)] text-xs hover:text-[var(--blue)] transition-colors"
          >
            学校公式サイト →
          </a>
        </motion.div>
      </div>
    </footer>
  );
}
