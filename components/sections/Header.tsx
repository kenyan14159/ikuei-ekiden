"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

interface SubMenuItem {
  label: string;
  href: string;
}

interface MenuItem {
  href: string;
  label: string;
  labelJp: string;
  subItems?: SubMenuItem[];
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const submenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const menuItems: MenuItem[] = [
    { href: "/members", label: "Members", labelJp: "メンバー紹介" },
    {
      href: "/topics/news",
      label: "Topics",
      labelJp: "トピックス",
      subItems: [
        { label: "スケジュール", href: "/topics/schedule" },
        { label: "ニュース", href: "/topics/news" },
        { label: "リザルト", href: "/topics/results" },
      ],
    },
    {
      href: "/team/supporters",
      label: "Team",
      labelJp: "チーム情報",
      subItems: [
        { label: "サポーターの皆様", href: "/team/supporters" },
        { label: "応援してくださる皆様へ", href: "/team/thanks" },
        { label: "ホームページについて", href: "/team/about-site" },
        { label: "お問い合わせ", href: "/contact" },
      ],
    },
    { href: "/limited-content", label: "Limited", labelJp: "限定コンテンツ" },
  ];

  const handleMouseEnter = (label: string) => {
    if (submenuTimeoutRef.current) {
      clearTimeout(submenuTimeoutRef.current);
    }
    setOpenSubmenu(label);
  };

  const handleMouseLeave = () => {
    submenuTimeoutRef.current = setTimeout(() => {
      setOpenSubmenu(null);
    }, 150);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "glass" : "bg-transparent"
          }`}
      >
        <div className="container-custom">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-4 group">
              <div className="w-10 h-10 border border-[var(--border)] group-hover:border-[var(--blue)] transition-colors duration-300 flex items-center justify-center">
                <span className="text-[var(--blue)] text-lg font-bold">育</span>
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-white text-sm font-medium tracking-wide">
                  仙台育英
                </span>
                <span className="text-[var(--muted-foreground)] text-xs tracking-wider">
                  TRACK & FIELD
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  className="relative"
                  onMouseEnter={() => item.subItems && handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link href={item.href} className="menu-item flex items-center gap-1">
                    {item.label}
                    {item.subItems && (
                      <svg className="w-3 h-3 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </Link>

                  {/* Desktop Submenu */}
                  <AnimatePresence>
                    {item.subItems && openSubmenu === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 py-2 min-w-[200px] glass rounded-sm"
                        onMouseEnter={() => handleMouseEnter(item.label)}
                        onMouseLeave={handleMouseLeave}
                      >
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className="block px-4 py-2 text-sm text-[var(--muted-foreground)] hover:text-white hover:bg-[var(--dark-300)] transition-colors"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </nav>

            {/* Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="relative w-10 h-10 flex items-center justify-center group"
              aria-label="メニューを開く"
            >
              <div className="flex flex-col gap-1.5">
                <motion.span
                  animate={{
                    rotate: mobileMenuOpen ? 45 : 0,
                    y: mobileMenuOpen ? 6 : 0,
                  }}
                  className="block w-6 h-px bg-white group-hover:bg-[var(--blue)] transition-colors origin-center"
                />
                <motion.span
                  animate={{ opacity: mobileMenuOpen ? 0 : 1 }}
                  className="block w-6 h-px bg-white group-hover:bg-[var(--blue)] transition-colors"
                />
                <motion.span
                  animate={{
                    rotate: mobileMenuOpen ? -45 : 0,
                    y: mobileMenuOpen ? -6 : 0,
                  }}
                  className="block w-6 h-px bg-white group-hover:bg-[var(--blue)] transition-colors origin-center"
                />
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Fullscreen Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-40 bg-[var(--dark-100)] overflow-y-auto"
          >
            <div className="absolute inset-0 noise-overlay" />

            <div className="relative min-h-full flex items-center justify-center py-24">
              <nav className="text-center w-full px-4">
                {menuItems.map((item, index) => (
                  <div key={item.href} className="overflow-hidden mb-4">
                    <motion.div
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "100%" }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.05,
                        ease: [0.76, 0, 0.24, 1],
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => !item.subItems && setMobileMenuOpen(false)}
                        className="block py-2 group"
                      >
                        <span className="text-3xl md:text-5xl lg:text-6xl font-bold text-white group-hover:text-[var(--blue)] transition-colors duration-300">
                          {item.label}
                        </span>
                        <span className="block text-sm text-[var(--muted-foreground)] mt-1 tracking-wider">
                          {item.labelJp}
                        </span>
                      </Link>

                      {/* Mobile Submenu */}
                      {item.subItems && (
                        <div className="mt-2 space-y-1">
                          {item.subItems.map((subItem) => (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="block py-1 text-[var(--muted-foreground)] hover:text-[var(--blue)] transition-colors text-sm"
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  </div>
                ))}
              </nav>
            </div>

            {/* Menu Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute bottom-8 left-0 right-0 text-center"
            >
              <p className="text-[var(--muted-foreground)] text-xs tracking-widest">
                © 2025 Sendai Ikuei Gakuen
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
