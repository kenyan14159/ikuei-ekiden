import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

const notoSerifJP = Noto_Serif_JP({
  variable: "--font-noto-serif-jp",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "仙台育英学園高等学校 陸上競技部 長距離ブロック | 公式サイト",
  description: "仙台育英学園高等学校陸上競技部長距離ブロックの公式ホームページ。チーム情報、メンバー紹介、試合スケジュール、練習風景、入部案内など最新情報を掲載。全国大会を目指す仲間を募集中。",
  keywords: ["仙台育英", "陸上競技部", "長距離", "駅伝", "トラック競技", "宮城県", "高校陸上", "部員募集"],
  authors: [{ name: "仙台育英学園高等学校 陸上競技部" }],
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "仙台育英学園高等学校 陸上競技部 長距離ブロック",
    description: "限界を超えろ、走り続ける情熱。全国を目指す陸上競技部の公式サイト。",
    url: "https://sendai-ikuei-track.jp",
    siteName: "仙台育英学園高等学校 陸上競技部 長距離ブロック",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "仙台育英学園高等学校 陸上競技部 長距離ブロック",
    description: "限界を超えろ、走り続ける情熱。全国を目指す陸上競技部の公式サイト。",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${notoSansJP.variable} ${notoSerifJP.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
