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

- **画像の遅延読み込み** - 将来的に実装可能
- **WebP形式の画像使用** - 推奨
- **CDN活用** - 本番環境での推奨
- **コード分割** - Next.jsのApp Routerにより自動対応

## ライセンス

© 2024 仙台育英学園高等学校 陸上競技部 長距離ブロック. All rights reserved.
