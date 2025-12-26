# 仙台育英学園 陸上競技部 長距離ブロック ウェブサイト設計書

> **このドキュメントについて**  
> 本ファイルは、同様のチーム紹介・スポーツ系サイトを作成する際のリファレンスとして、デザインシステム、構造、コンポーネント設計をまとめたものです。

---

## 1. 技術スタック

| カテゴリ | 技術 |
|---------|------|
| フレームワーク | Next.js 15 (App Router) |
| 言語 | TypeScript |
| スタイリング | Tailwind CSS v4 + CSS Variables |
| アニメーション | Framer Motion v12 |
| スムーズスクロール | Lenis |
| アイコン | Lucide React + インラインSVG |
| デプロイ | Cloudflare Pages |

```json
// 主要な依存関係
{
  "next": "^15.1.0",
  "react": "19.2.3",
  "framer-motion": "^12.23.24",
  "lenis": "^1.3.16",
  "tailwindcss": "^4"
}
```

---

## 2. カラーパレット

### プライマリカラー

| 名前 | 変数名 | カラーコード | 用途 |
|------|--------|--------------|------|
| ブルー（メイン） | `--blue` | `#1E5CB3` | リンク、ボタン、アクセント |
| ブルー（ライト） | `--blue-light` | `#3B82F6` | ホバー状態 |
| ブルー（ダーク） | `--blue-dark` | `#1E3A5F` | 強調テキスト |
| イエロー | `--yellow` | `#F4C430` | 優勝ハイライト |
| レッド | `--red` | `#DC2626` | 女子カテゴリ表示 |
| ブラック | `--black` | `#1A1A1A` | 本文テキスト |

### グレースケール

```css
--gray-100: #F8FAFC;  /* 最も明るい背景 */
--gray-200: #E2E8F0;  /* ボーダー、区切り線 */
--gray-300: #CBD5E1;  /* 非アクティブ要素 */
--gray-400: #94A3B8;  /* プレースホルダー */
--gray-500: #64748B;  /* サブテキスト */
--gray-600: #475569;  /* 本文テキスト */
--gray-700: #374151;
--gray-800: #1F2937;
--gray-900: #111827;
```

### サーフェス（表面）

```css
--background: #FFFFFF;     /* ページ背景 */
--card: #F5F5F5;           /* カード背景 */
--card-hover: #EBEBEB;     /* カードホバー */
--muted: #F0F0F0;          /* ミュートされた背景 */
```

---

## 3. タイポグラフィ

### フォントファミリー

```typescript
// layout.tsx での設定
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
```

| フォント | 用途 |
|----------|------|
| Noto Sans JP | 本文、UI要素、ナビゲーション |
| Noto Serif JP | 見出し、ヒーローテキスト、装飾的テキスト |

### 見出しスタイル

```css
h1 {
  font-size: clamp(3rem, 8vw, 8rem);
  font-weight: 900;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

h2 {
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 800;
}

h3 {
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  font-weight: 700;
}
```

---

## 4. ディレクトリ構造

```
sendai-ikuei/
├── app/                          # Next.js App Router
│   ├── globals.css               # グローバルCSS（782行）
│   ├── layout.tsx                # ルートレイアウト
│   ├── page.tsx                  # トップページ
│   ├── not-found.tsx             # 404ページ
│   ├── sitemap.ts                # サイトマップ生成
│   ├── contact/                  # お問い合わせ
│   ├── members/                  # メンバー紹介
│   ├── limited-content/          # 限定コンテンツ（パスワード保護）
│   ├── topics/                   # トピックス
│   │   ├── news/                 # ニュース一覧・詳細
│   │   ├── results/              # リザルト一覧・詳細
│   │   └── schedule/             # スケジュール
│   └── team/                     # チーム情報
│       ├── supporters/           # サポーター
│       ├── thanks/               # 感謝ページ
│       └── about-site/           # サイトについて
├── components/
│   ├── CustomCursor.tsx          # カスタムカーソル
│   ├── Providers.tsx             # Lenisプロバイダー
│   ├── SubpageHeader.tsx         # サブページ用ヘッダー
│   ├── sections/                 # セクションコンポーネント
│   │   ├── Header.tsx            # ヘッダー（296行）
│   │   ├── Hero.tsx              # ヒーローセクション（197行）
│   │   ├── Topics.tsx            # トピックスセクション
│   │   ├── TeamInfo.tsx          # チーム概要
│   │   ├── TeamNavigation.tsx    # コンテンツナビ
│   │   ├── Schedule.tsx          # スケジュールプレビュー
│   │   └── Footer.tsx            # フッター
│   └── ui/                       # 汎用UIコンポーネント
│       ├── badge.tsx
│       ├── button.tsx
│       └── card.tsx
├── lib/
│   └── utils.ts                  # ユーティリティ関数
└── public/
    ├── data/                     # JSONデータ
    │   ├── members/              # メンバーデータ
    │   ├── news/                 # ニュースデータ（年度別）
    │   └── schedule.json         # スケジュールデータ
    └── images/                   # 画像アセット
```

---

## 5. コンポーネント設計

### 5.1 Header（ヘッダー）

**特徴:**
- 固定ヘッダー（`fixed top-0`）
- 白背景 + バックドロップブラー
- ドロップダウンサブメニュー（ホバーで展開）
- モバイル：フルスクリーンメニュー（アニメーション付き）
- SNSリンク設置

```typescript
interface MenuItem {
  href: string;
  label: string;      // 英語ラベル
  labelJp: string;    // 日本語ラベル
  subItems?: SubMenuItem[];
}
```

**アニメーション:**
```typescript
// 初期アニメーション
initial={{ y: -100 }}
animate={{ y: 0 }}
transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
```

### 5.2 Hero（ヒーローセクション）

**特徴:**
- フルスクリーン表示
- 画像スライドショー（5秒ごとにランダム切り替え）
- パララックス効果（スクロール連動）
- 文字ごとのスタッガーアニメーション
- ダークオーバーレイ + グリッドパターン

**メインビジュアルテキスト:**
```typescript
const titleLine1 = "至誠力走";
const titleLine2 = "捲土重来";
```

**アニメーション設定:**
```typescript
const letterVariants = {
  hidden: { opacity: 0, y: 100, rotateX: -90 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.8,
      ease: [0.215, 0.61, 0.355, 1],
    },
  },
};
```

### 5.3 Topics（トピックスセクション）

**特徴:**
- JSONからニュースデータを取得
- 3カラムグリッド表示
- カテゴリに応じたリンク先分岐（ニュース/リザルト）
- フェードイン + スタッガーアニメーション

**データ取得パターン:**
```typescript
const availableYears = [2025, 2024];
Promise.all(
  availableYears.map(year =>
    fetch(`/data/news/${year}.json`)
      .then(res => res.json())
      .then(data => data.articles || [])
      .catch(() => [])
  )
)
```

### 5.4 TeamInfo（チーム概要）

**特徴:**
- 部員数・監督情報のコンパクト表示
- 入部案内・寄付リンク
- 全国高校駅伝入賞実績（男女別）
- 「もっと見る」展開機能

### 5.5 TeamNavigation（コンテンツナビ）

**特徴:**
- 2x4グリッドレイアウト
- アイコン + タイトル + 説明
- ホバー時に背景色変化（白→青）
- テキストも白に変化

### 5.6 Schedule（スケジュールプレビュー）

**特徴:**
- 最新5件を表示
- 日付フォーマット: `MM.DD`
- スライドインアニメーション

### 5.7 Footer（フッター）

**特徴:**
- 5カラムグリッド（ブランド2カラム + リンク3カラム）
- SNSリンク（Instagram, Facebook）
- 学校公式サイトへのリンク
- コピーライト

### 5.8 SubpageHeader（サブページヘッダー）

**用途:** トップページ以外の全ページで使用

**特徴:**
- グラデーション背景
- パンくずリスト
- 大きな装飾テキスト（右下に透かし表示）

```typescript
interface Props {
  title: string;
  subtitle?: string;
  breadcrumbs: { label: string; href: string }[];
}
```

### 5.9 CustomCursor（カスタムカーソル）

**特徴:**
- タッチデバイスでは非表示
- メインドット + アウターリング
- ホバー時にリング拡大
- `mix-blend-difference`で背景と調和

---

## 6. CSSユーティリティクラス

### グラスエフェクト

```css
.glass {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(0, 0, 0, 0.1);
}
```

### プレミアムボタン

```css
.btn-premium {
  position: relative;
  padding: 1rem 2.5rem;
  font-weight: 600;
  font-size: 0.875rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  background: var(--blue);
  overflow: hidden;
}

.btn-premium::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--blue-light);
  transform: translateX(-100%);
  transition: transform 0.3s;
}

.btn-premium:hover::before {
  transform: translateX(0);
}
```

### セクションタイトル

```css
.section-title {
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.1;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -0.5rem;
  left: 0;
  width: 60px;
  height: 3px;
  background: var(--blue);
}
```

### アニメーション

```css
/* フロートアニメーション */
.float {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

/* シマーエフェクト */
.shimmer {
  background: linear-gradient(90deg,
    transparent 0%,
    rgba(30, 92, 179, 0.1) 50%,
    transparent 100%);
  background-size: 200% 100%;
  animation: shimmer 2s infinite;
}

/* Blobアニメーション（背景装飾） */
.animate-blob {
  animation: blob 7s infinite;
}
```

---

## 7. データ構造

### 7.1 ニュース記事 (`/data/news/{year}.json`)

```typescript
interface NewsArticle {
  id: number;
  slug: string;           // URLスラッグ
  title: string;
  date: string;           // "YYYY-MM-DD"
  category: string;       // "ニュース" | "リザルト" | "大会結果"
  description: string;
  featured: boolean;      // 注目記事フラグ
  imageKey: string | null;
}
```

### 7.2 スケジュール (`/data/schedule.json`)

```typescript
interface ScheduleEvent {
  id: number;
  date: string;           // "YYYY-MM-DD"
  title: string;
  category: string;       // "春" | "夏" | "秋" | "冬"
  month: number;
}
```

### 7.3 メンバー (`/data/members/`)

メンバーデータは年度・カテゴリ別に管理。

---

## 8. アニメーションパターン

### 8.1 フェードイン + スライドアップ

```typescript
// 基本パターン
initial={{ opacity: 0, y: 30 }}
animate={isInView ? { opacity: 1, y: 0 } : {}}
transition={{ duration: 0.6 }}

// スタッガー（遅延）付き
transition={{ duration: 0.5, delay: index * 0.1 }}
```

### 8.2 スクロール連動パララックス

```typescript
const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ["start start", "end start"],
});

const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
```

### 8.3 ビューポート検出

```typescript
const ref = useRef(null);
const isInView = useInView(ref, { once: true, margin: "-100px" });
```

### 8.4 イージング関数

```css
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
--ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
--ease-in-out-quart: cubic-bezier(0.76, 0, 0.24, 1);
```

---

## 9. レスポンシブ対応

### ブレークポイント

| ブレークポイント | 用途 |
|------------------|------|
| `sm` (640px) | スマートフォン横向き |
| `md` (768px) | タブレット |
| `lg` (1024px) | デスクトップ |

### モバイル対応パターン

```css
/* グリッドカラム */
grid-cols-2 md:grid-cols-4

/* テキストサイズ */
text-3xl md:text-5xl lg:text-6xl

/* パディング */
py-10 md:py-12
```

---

## 10. アクセシビリティ

```css
/* フォーカス表示強化 */
*:focus-visible {
  outline: 2px solid var(--blue);
  outline-offset: 2px;
}

/* モーション軽減設定対応 */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 11. SEO設定

### メタデータ設定

```typescript
export const metadata: Metadata = {
  metadataBase: new URL("https://sendai-ikuei-track.jp"),
  title: "仙台育英学園高等学校 陸上競技部 長距離ブロック | 公式サイト",
  description: "...",
  keywords: ["仙台育英", "陸上競技部", "長距離", "駅伝", ...],
  openGraph: {
    title: "...",
    description: "...",
    images: [{ url: "/images/ikuei-ekiden.png", ... }],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    ...
  },
};
```

---

## 12. 新規サイト作成時のチェックリスト

- [ ] カラーパレットを組織のブランドに合わせて変更
- [ ] フォントを適切なものに変更（必要に応じて）
- [ ] ロゴ・画像アセットを差し替え
- [ ] `layout.tsx`のメタデータを更新
- [ ] データ構造（JSON）をコンテンツに合わせて作成
- [ ] サイトマップ生成設定を確認
- [ ] OGP画像を作成
- [ ] SNSリンクを更新
- [ ] 404ページをカスタマイズ
- [ ] Cloudflare Pages / Vercel へのデプロイ設定

---

## 付録: 重要なCSS変数一覧

```css
:root {
  /* Colors */
  --blue: #1E5CB3;
  --blue-light: #3B82F6;
  --yellow: #F4C430;
  --red: #DC2626;
  --black: #1A1A1A;
  
  /* Surfaces */
  --background: #FFFFFF;
  --card: #F5F5F5;
  --muted: #F0F0F0;
  --border: rgba(0, 0, 0, 0.1);
  
  /* Animation */
  --duration-fast: 150ms;
  --duration-normal: 300ms;
  --duration-slow: 500ms;
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  
  /* Layout */
  --radius: 0.5rem;
}
```
