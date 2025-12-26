# 仙台育英学園高等学校 陸上競技部 長距離ブロック 公式ホームページ

仙台育英学園高等学校陸上競技部長距離ブロックの公式ホームページです。

## 技術スタック

- **Next.js 15** (App Router)
- **TypeScript**
- **TailwindCSS v4**
- **shadcn/ui**
- **framer-motion**

## 主な機能

### 実装済みのセクション

1. **ヘッダー** - スクロールに応じて変化する固定ヘッダー＋モバイルメニュー
2. **ヒーローセクション** - ランニングシルエット付きアニメーションメインビジュアル
3. **チーム情報** - 部の理念、練習方針、目標、統計情報
4. **試合スケジュール** - 大会情報と試合結果の一覧表示
5. **メンバー紹介** - 選手の詳細情報とプロフィール（SVGアイコン使用）
6. **練習風景ギャラリー** - 日々のトレーニングと活動の様子
7. **トピックス** - 最新ニュースと活動報告
8. **入部案内** - 求める部員像、練習スケジュール、入部までの流れ
9. **お問い合わせ** - 連絡先情報とよくある質問
10. **フッター** - リンク、SNS、お問い合わせ情報

### デザイン特徴

- **レスポンシブデザイン** - モバイル、タブレット、デスクトップに完全対応
- **モバイルファースト** - スマートフォンでの閲覧を最優先に設計
- **アニメーション** - framer-motionによるスムーズなアニメーション効果
- **躍動感のある表現** - ランニングシルエットやダイナミックな配色
- **モダンUI** - グラデーション、カード、バッジなどの現代的なUI要素
- **SVGアイコン** - 絵文字を使用せず、SVGで統一されたデザイン
- **日本語フォント** - Noto Sans JPによる美しい日本語表示
- **アクセシビリティ** - aria-label、適切なコントラスト比など対応
- **SEO最適化** - 構造化データ、メタタグの最適化済み

## セットアップ

### 必要な環境

- Node.js 18.17以上
- npm または yarn

### インストール

依存パッケージは既にインストール済みです：

```bash
npm install
```

### 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

### ビルド

```bash
npm run build
```

### 本番サーバーの起動

```bash
npm start
```

## プロジェクト構造

```
sendai-ikuei/
├── app/
│   ├── layout.tsx          # ルートレイアウト
│   ├── page.tsx            # メインページ
│   └── globals.css         # グローバルスタイル
├── components/
│   ├── ui/                 # shadcn/uiコンポーネント
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── badge.tsx
│   └── sections/           # ページセクションコンポーネント
│       ├── Header.tsx      # ヘッダー（モバイルメニュー付き）
│       ├── Hero.tsx        # ヒーローセクション
│       ├── About.tsx       # チーム情報
│       ├── Schedule.tsx    # 試合スケジュール
│       ├── Members.tsx     # メンバー紹介
│       ├── Gallery.tsx     # 練習風景ギャラリー
│       ├── Topics.tsx      # トピックス
│       ├── Recruit.tsx     # 入部案内
│       ├── Contact.tsx     # お問い合わせ
│       └── Footer.tsx      # フッター
└── lib/
    └── utils.ts            # ユーティリティ関数
```

## カスタマイズ

### メンバー情報の更新

`components/sections/Members.tsx` の `members` 配列を編集してください。

### 試合スケジュールの更新

`components/sections/Schedule.tsx` の `schedules` 配列を編集してください。

### 練習風景の更新

`components/sections/Gallery.tsx` の `galleryItems` 配列を編集してください。

### トピックスの更新

`components/sections/Topics.tsx` の `topics` 配列を編集してください。

### 入部案内の更新

`components/sections/Recruit.tsx` の `requirements`、`trainingSchedule`、`steps` 配列を編集してください。

### お問い合わせ情報の更新

`components/sections/Contact.tsx` の `contactMethods` と `faqItems` 配列を編集してください。

### チーム情報の更新

`components/sections/About.tsx` の `stats` と `values` 配列を編集してください。

### カラースキームの変更

`app/globals.css` のCSS変数を編集することで、サイト全体のカラースキームを変更できます。

## パフォーマンス最適化

- **画像の遅延読み込み** - Next.js Imageコンポーネントで実装済み
- **WebP/AVIF形式の自動変換** - Next.js Imageで自動対応
- **画像の最適化** - 自動リサイズと最適なフォーマット選択
- **コード分割** - Next.jsのApp Routerにより自動対応
- **パッケージ最適化** - framer-motion、lucide-reactの自動最適化

## セキュリティ機能

### 実装済みのセキュリティ対策

1. **XSS対策**
   - 包括的な入力値サニタイゼーション（`lib/sanitize.ts`）
   - HTMLメール送信時のサニタイゼーション

2. **認証システム**
   - JWT（JSON Web Token）による安全な認証（`lib/auth.ts`）
   - セッションCookieの適切な設定

3. **レート制限**
   - Upstash Redisを使用したEdge Runtime対応のレート制限
   - IPベースのリクエスト制限

4. **セキュリティヘッダー**
   - X-Content-Type-Options、X-Frame-Options等の設定（`middleware.ts`）
   - CSP（Content Security Policy）の準備

5. **エラートラッキング**
   - 構造化されたエラーログ（`lib/logger.ts`）
   - Sentry統合の準備（オプション）

## 環境変数の設定

プロジェクトルートに `.env.local` ファイルを作成し、以下の環境変数を設定してください：

```bash
# JWT認証用のシークレットキー（必ず変更してください）
JWT_SECRET=your-super-secret-jwt-key-change-in-production-min-32-chars

# 限定コンテンツ用のパスワード
EXCLUSIVE_PASSWORD=your-exclusive-password

# メール送信（Resend）
RESEND_API_KEY=re_xxxxxxxxxxxxx
CONTACT_EMAIL=admin@sendai-ikuei-track.jp

# Upstash Redis（レート制限用 - 本番環境では必須）
UPSTASH_REDIS_REST_URL=https://your-redis-instance.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-redis-token
```

詳細は `.env.example` を参照してください。

## 本番環境へのデプロイ

### Cloudflare Pages（推奨）

```bash
# ビルド
npm run build
npm run pages:build

# Cloudflare Pagesにデプロイ
# wrangler.toml の設定を確認してください
```

### 必要な環境変数

本番環境では、以下の環境変数を必ず設定してください：

- `JWT_SECRET` - 32文字以上のランダムな文字列
- `EXCLUSIVE_PASSWORD` - 限定コンテンツ用のパスワード
- `UPSTASH_REDIS_REST_URL` - Upstash RedisのURL
- `UPSTASH_REDIS_REST_TOKEN` - Upstash Redisのトークン

### パフォーマンス監視

本番環境では、以下の監視ツールの導入を推奨します：

- **Vercel Analytics** - Core Web Vitalsの監視
- **Sentry** - エラートラッキング（オプション）
- **Google Analytics 4** - ユーザー行動分析

## ライセンス

© 2024 仙台育英学園高等学校 陸上競技部 長距離ブロック. All rights reserved.
