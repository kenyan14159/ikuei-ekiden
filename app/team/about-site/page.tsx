"use client";

import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import { SubpageHeader } from "@/components/SubpageHeader";


export default function AboutSitePage() {
    return (
        <div className="min-h-screen bg-[var(--dark-100)]">
            <Header />
            <main>
                <SubpageHeader
                    title="About Site"
                    subtitle="本サイトの運営方針と、推奨環境、著作権などの情報です。"
                    breadcrumbs={[{ label: "Team", href: "#" }]}
                />

                <section className="section-padding relative">
                    <div className="container-custom">
                        <div className="max-w-4xl mx-auto space-y-20">
                            <section>
                                <h2 className="text-2xl font-bold text-white mb-8 border-l-4 border-[var(--blue)] pl-4">運営方針</h2>
                                <p className="text-[var(--muted-foreground)] leading-loose">
                                    本ウェブサイトは、仙台育英学園高等学校 陸上競技部（長距離ブロック）の活動、試合、選手の情報を広くお伝えすることを目的として運営されています。
                                    公式な情報の正確性を期しながら、選手の素顔や日々の努力の過程など、より深くチームを知っていただけるコンテンツ提供に努めてまいります。
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-white mb-8 border-l-4 border-[var(--blue)] pl-4">著作権について</h2>
                                <p className="text-[var(--muted-foreground)] leading-loose">
                                    本サイトに掲載されているすべての文章、画像、動画、デザインなどのコンテンツの著作権は、仙台育英学園高等学校またはそれぞれの著作権者に帰属します。
                                    無断での転載、複製、配布、公衆送信、改変などの行為は、法律により禁じられています。
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-white mb-8 border-l-4 border-[var(--blue)] pl-4">推奨環境</h2>
                                <div className="grid md:grid-cols-2 gap-8 text-sm">
                                    <div className="card-premium p-6">
                                        <h3 className="text-[var(--blue)] font-bold mb-4 uppercase tracking-widest">OS / Browser</h3>
                                        <ul className="text-[var(--muted-foreground)] space-y-2">
                                            <li>iOS / Android 最新版</li>
                                            <li>Safari 最新版</li>
                                            <li>Google Chrome 最新版</li>
                                        </ul>
                                    </div>
                                    <div className="card-premium p-6">
                                        <h3 className="text-[var(--blue)] font-bold mb-4 uppercase tracking-widest">JavaScript</h3>
                                        <p className="text-[var(--muted-foreground)]">
                                            本サイトではJavaScriptおよびCSSカスタムプロパティを使用しています。ブラウザの設定でこれらを有効にしてご覧ください。
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section className="pt-10 border-t border-[var(--border)] text-center">
                                <p className="text-[var(--muted-foreground)] text-xs">
                                    制定：2025年 12月 19日
                                </p>
                            </section>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
