import Link from "next/link";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Header />
            <main className="flex-grow flex items-center justify-center">
                <section className="relative py-32 overflow-hidden">
                    {/* Background Decor */}
                    <div className="absolute top-[-20%] right-[-10%] w-[400px] h-[400px] bg-[var(--blue)]/5 rounded-full blur-[80px]" />
                    <div className="absolute bottom-[-20%] left-[-10%] w-[300px] h-[300px] bg-[var(--yellow)]/10 rounded-full blur-[80px]" />

                    <div className="container-custom relative z-10 text-center">
                        {/* 404 Number */}
                        <div className="mb-8">
                            <span className="text-[12rem] md:text-[16rem] font-black leading-none text-[var(--gray-200)] select-none">
                                404
                            </span>
                        </div>

                        {/* Message */}
                        <h1 className="text-3xl md:text-4xl font-bold text-[var(--black)] mb-4">
                            ページが見つかりません
                        </h1>
                        <p className="text-[var(--gray-600)] mb-8 max-w-md mx-auto leading-relaxed">
                            お探しのページは存在しないか、移動または削除された可能性があります。
                        </p>

                        {/* Navigation */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/"
                                className="inline-block px-8 py-4 bg-[var(--blue)] text-white font-bold text-sm uppercase tracking-widest hover:bg-[var(--blue-light)] transition-all"
                            >
                                トップページへ
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-block px-8 py-4 border-2 border-[var(--gray-300)] text-[var(--black)] font-bold text-sm uppercase tracking-widest hover:border-[var(--blue)] hover:text-[var(--blue)] transition-all"
                            >
                                お問い合わせ
                            </Link>
                        </div>

                        {/* Quick Links */}
                        <div className="mt-16 pt-8 border-t border-[var(--gray-200)]">
                            <p className="text-[var(--gray-500)] text-sm mb-4">よくアクセスされるページ</p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Link href="/members" className="text-[var(--blue)] text-sm hover:underline">
                                    メンバー紹介
                                </Link>
                                <span className="text-[var(--gray-300)]">|</span>
                                <Link href="/topics/news" className="text-[var(--blue)] text-sm hover:underline">
                                    ニュース
                                </Link>
                                <span className="text-[var(--gray-300)]">|</span>
                                <Link href="/topics/schedule" className="text-[var(--blue)] text-sm hover:underline">
                                    スケジュール
                                </Link>
                                <span className="text-[var(--gray-300)]">|</span>
                                <Link href="/topics/results" className="text-[var(--blue)] text-sm hover:underline">
                                    リザルト
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
