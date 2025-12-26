# 🔍 仙台育英学園高等学校 陸上競技部 長距離ブロック 公式サイト
## 包括的コードレビューレポート

---

## 🔍 総合評価スコア
**72 / 100** - モダンな技術スタックと良い設計基盤を持つが、パフォーマンス最適化とセキュリティ強化が急務。本番環境に向けた実装の完成度を高める必要がある。

---

## 🛠️ 重点修正項目 (High Priority)

### 1. **画像最適化が無効化されている**
- **問題点**: `next.config.ts`で`images: { unoptimized: true }`が設定されており、Next.jsの画像最適化機能が完全に無効化されている。Heroセクションで15枚のJPG画像を読み込んでおり、LCP（Largest Contentful Paint）が大幅に悪化する可能性が高い。
- **理由**: 
  - Core Web VitalsのLCPスコアが低下し、SEO順位に直接影響
  - モバイルユーザーの離脱率が上昇（3秒ルール）
  - データ使用量の増加によるユーザー体験の悪化
- **改善案**:
```typescript
// next.config.ts
const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};
```

```tsx
// components/sections/Hero.tsx の改善例
<Image
  src={heroImages[currentImageIndex]}
  alt="仙台育英陸上競技部 練習風景"
  fill
  className="object-cover"
  priority={currentImageIndex === 0} // 最初の画像のみ優先読み込み
  loading={currentImageIndex === 0 ? "eager" : "lazy"}
  quality={85}
  sizes="100vw"
/>
```

### 2. **セキュリティ脆弱性：認証パスワードのハードコード**
- **問題点**: `app/api/auth/exclusive/route.ts`でデフォルトパスワード`"1010"`がハードコードされており、GitHubにコミットされる可能性がある。
- **理由**: 
  - ソースコードからパスワードが漏洩するリスク
  - 本番環境と開発環境で同じパスワードを使用する危険性
  - セキュリティ監査で指摘される重大な脆弱性
- **改善案**:
```typescript
// app/api/auth/exclusive/route.ts
const CORRECT_PASSWORD = process.env.EXCLUSIVE_PASSWORD;
if (!CORRECT_PASSWORD) {
  throw new Error("EXCLUSIVE_PASSWORD environment variable is not set");
}

// パスワードハッシュ化の実装（推奨）
import crypto from 'crypto';

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password + process.env.PASSWORD_SALT).digest('hex');
}

// 認証時にハッシュ化されたパスワードと比較
const hashedInput = hashPassword(password);
if (hashedInput === CORRECT_PASSWORD_HASH) {
  // 認証成功
}
```

### 3. **お問い合わせフォームのセキュリティ対策不足**
- **問題点**: CSRF保護、レート制限、入力サニタイゼーションが実装されていない。また、メール送信機能が未実装のため、実際には送信されていない。
- **理由**: 
  - スパム攻撃やDoS攻撃のリスク
  - XSS（Cross-Site Scripting）攻撃の可能性
  - ユーザーからの問い合わせが失われる
- **改善案**:
```typescript
// app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "1 h"),
});

export async function POST(request: NextRequest) {
  // IPアドレスベースのレート制限
  const ip = request.ip ?? request.headers.get("x-forwarded-for") ?? "unknown";
  const { success } = await ratelimit.limit(ip);
  
  if (!success) {
    return NextResponse.json(
      { error: "送信回数が上限に達しました。しばらくしてから再度お試しください。" },
      { status: 429 }
    );
  }

  const body = await request.json();
  
  // 入力サニタイゼーション
  const sanitizedBody = {
    name: sanitizeInput(body.name),
    email: validateEmail(body.email),
    category: sanitizeInput(body.category),
    message: sanitizeInput(body.message),
  };

  // メール送信実装（Resend使用例）
  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: "noreply@sendai-ikuei-track.jp",
    to: process.env.CONTACT_EMAIL,
    subject: `[お問い合わせ] ${sanitizedBody.category}`,
    html: generateEmailTemplate(sanitizedBody),
  });

  return NextResponse.json({ message: "お問い合わせを受け付けました" });
}

function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, "")
    .trim()
    .substring(0, 1000);
}
```

### 4. **本番環境へのconsole.logの残存**
- **問題点**: 複数のファイルで`console.log`や`console.error`が使用されており、本番環境でパフォーマンスに影響を与える可能性がある。
- **理由**: 
  - 本番環境での不要なログ出力によるパフォーマンス低下
  - 機密情報の漏洩リスク（お問い合わせ内容など）
  - プロフェッショナルなコード品質の観点から不適切
- **改善案**:
```typescript
// lib/logger.ts を作成
const isDevelopment = process.env.NODE_ENV === 'development';

export const logger = {
  log: (...args: unknown[]) => {
    if (isDevelopment) console.log(...args);
  },
  error: (...args: unknown[]) => {
    // 本番環境ではエラートラッキングサービス（Sentry等）に送信
    if (isDevelopment) {
      console.error(...args);
    } else {
      // Sentry.captureException(new Error(args.join(' ')));
    }
  },
};

// 使用例
import { logger } from '@/lib/logger';
logger.log("お問い合わせを受信");
```

### 5. **Heroセクションのパフォーマンス問題**
- **問題点**: 15枚の画像をすべて読み込む可能性があり、初期読み込みが重い。5秒ごとの画像切り替えで不要なリソース消費が発生。
- **理由**: 
  - 初回読み込み時間の増加
  - モバイルデータ使用量の増加
  - バッテリー消費の増加
- **改善案**:
```tsx
// components/sections/Hero.tsx
// 画像のプリロード戦略を改善
const [preloadedImages, setPreloadedImages] = useState<Set<number>>(new Set([0]));

useEffect(() => {
  // 最初の画像のみ優先読み込み
  const firstImage = new Image();
  firstImage.src = heroImages[0];
  
  // 次の2-3枚をバックグラウンドでプリロード
  const preloadNext = [1, 2, 3].slice(0, heroImages.length - 1);
  preloadNext.forEach(index => {
    const img = new Image();
    img.src = heroImages[index];
    setPreloadedImages(prev => new Set([...prev, index]));
  });
}, []);

// 画像切り替えの最適化
useEffect(() => {
  const interval = setInterval(() => {
    setCurrentImageIndex((prev) => {
      // プリロード済みの画像から選択
      const available = Array.from(preloadedImages);
      const next = available[Math.floor(Math.random() * available.length)];
      return next !== prev ? next : (next + 1) % heroImages.length;
    });
  }, 8000); // 8秒に延長してリソース消費を削減

  return () => clearInterval(interval);
}, [preloadedImages]);
```

---

## 📈 中長期的な改善提案 (Medium/Low Priority)

### Medium Priority

#### 6. **型安全性の向上**
- **問題点**: `any`型の使用や、型アサーションが不十分な箇所がある
- **改善案**: 厳密な型定義と`unknown`型の活用
```typescript
// 例: app/api/contact/route.ts
interface ContactFormData {
  name: string;
  email: string;
  category: string;
  message: string;
}

// バリデーション関数の追加
function validateContactForm(body: unknown): ContactFormData {
  if (!body || typeof body !== 'object') {
    throw new Error('Invalid request body');
  }
  const data = body as Record<string, unknown>;
  // 各フィールドの型チェック
  // ...
}
```

#### 7. **エラーハンドリングの統一**
- **問題点**: エラーハンドリングが各コンポーネントでバラバラ
- **改善案**: エラーバウンダリとエラーハンドリングユーティリティの実装
```tsx
// app/error.tsx
'use client';
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">エラーが発生しました</h2>
        <button onClick={reset} className="btn-premium">
          再試行
        </button>
      </div>
    </div>
  );
}
```

#### 8. **アクセシビリティの強化**
- **問題点**: 
  - フォーカス管理が不十分（モーダルメニューなど）
  - キーボードナビゲーションの改善余地
  - ARIAラベルの不足
- **改善案**:
```tsx
// components/sections/Header.tsx
// モバイルメニューが開いている時のフォーカストラップ
useEffect(() => {
  if (mobileMenuOpen) {
    const firstFocusable = menuRef.current?.querySelector('a, button');
    firstFocusable?.focus();
    
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        // フォーカストラップの実装
      }
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleTabKey);
    return () => document.removeEventListener('keydown', handleTabKey);
  }
}, [mobileMenuOpen]);
```

#### 9. **SEO最適化の強化**
- **問題点**: 
  - 動的ページでメタデータが不足している可能性
  - 構造化データが一部のページで未実装
- **改善案**:
```tsx
// app/topics/news/[slug]/page.tsx
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = await getArticle(params.slug);
  
  if (!article) {
    return {
      title: '記事が見つかりません',
    };
  }
  
  return {
    title: `${article.title} | 仙台育英陸上競技部`,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      images: article.imageKey ? [`/images/news/${article.imageKey}`] : [],
    },
  };
}

// 構造化データの追加
export default function NewsArticlePage() {
  // ...
  const articleSchema = generateArticleSchema({
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    url: `https://sendai-ikuei-track.jp/topics/news/${article.slug}`,
  });
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {/* ... */}
    </>
  );
}
```

#### 10. **パフォーマンス監視の実装**
- **問題点**: Core Web Vitalsやパフォーマンスメトリクスの監視がない
- **改善案**:
```tsx
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

### Low Priority

#### 11. **カスタムカーソルのパフォーマンス最適化**
- **問題点**: `CustomCursor.tsx`で毎フレームのアニメーションが発生し、パフォーマンスに影響する可能性
- **改善案**: `requestAnimationFrame`の最適化と、低スペックデバイスでの無効化
```tsx
// components/CustomCursor.tsx
const [shouldRender, setShouldRender] = useState(false);

useEffect(() => {
  // パフォーマンスが低いデバイスでは無効化
  const isLowEndDevice = navigator.hardwareConcurrency <= 2;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (isLowEndDevice || prefersReducedMotion) {
    return;
  }
  
  setShouldRender(true);
}, []);
```

#### 12. **データフェッチングの最適化**
- **問題点**: クライアントサイドでのデータフェッチが多く、SSR/SSGの活用が不十分
- **改善案**: Next.jsのServer Componentsを活用
```tsx
// app/topics/news/page.tsx (Server Component)
import { readFile } from 'fs/promises';

async function getNewsArticles() {
  const files = ['2025.json', '2024.json'];
  const articles = await Promise.all(
    files.map(async (file) => {
      const data = await readFile(`public/data/news/${file}`, 'utf-8');
      return JSON.parse(data).articles;
    })
  );
  return articles.flat().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export default async function NewsPage() {
  const articles = await getNewsArticles();
  // クライアントコンポーネントに渡す
  return <NewsList articles={articles} />;
}
```

#### 13. **画像のalt属性の統一**
- **問題点**: 一部の画像でalt属性が不十分または未設定
- **改善案**: `lib/seo-image-alt.ts`の活用を徹底
```tsx
// components/sections/Members.tsx
import { generatePlayerAlt } from '@/lib/seo-image-alt';

<img
  src={s.imageUrl}
  alt={generatePlayerAlt(s.name, undefined, s.middleSchool)}
  className="w-full h-full object-cover"
/>
```

#### 14. **PWA対応**
- **問題点**: プログレッシブウェブアプリとしての機能がない
- **改善案**: Service Workerとマニフェストファイルの追加
```json
// public/manifest.json
{
  "name": "仙台育英陸上競技部",
  "short_name": "育英陸上",
  "description": "仙台育英学園高等学校 陸上競技部 長距離ブロック公式サイト",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#FFFFFF",
  "theme_color": "#1E5CB3",
  "icons": [
    {
      "src": "/images/ikuei-ekiden.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
```

---

## 💡 プロのエンジニアとしてのプラスアルファ

### 1. **画像CDNの導入**
- **提案**: Cloudflare ImagesやVercel Image Optimizationの活用
- **効果**: 
  - 自動的なWebP/AVIF変換
  - グローバルCDN配信による読み込み速度向上
  - 帯域幅コストの削減

### 2. **コンテンツ管理システム（CMS）の統合**
- **提案**: ContentfulやStrapiなどのヘッドレスCMSを導入
- **効果**: 
  - 非エンジニアでもコンテンツ更新が可能
  - バージョン管理と公開フローの確立
  - 構造化データの自動生成

### 3. **A/Bテスト機能の実装**
- **提案**: Vercel Edge ConfigやOptimizeを使用したA/Bテスト
- **効果**: 
  - CTAボタンの効果測定
  - ヒーローセクションの最適化
  - データドリブンな改善

### 4. **多言語対応（i18n）の準備**
- **提案**: next-intlやnext-i18nextの導入検討
- **効果**: 
  - 将来的な英語版サイトへの展開
  - 国際大会でのブランディング強化

### 5. **リアルタイム更新機能**
- **提案**: WebSocketまたはServer-Sent Eventsによるリアルタイム更新
- **効果**: 
  - 試合結果のリアルタイム表示
  - ライブスコアの配信
  - エンゲージメントの向上

### 6. **パフォーマンスバジェットの設定**
- **提案**: Lighthouse CIとパフォーマンスバジェットの設定
- **効果**: 
  - パフォーマンス回帰の自動検出
  - CI/CDパイプラインでの品質保証

### 7. **アクセシビリティ監査の自動化**
- **提案**: Pa11yやaxe-coreのCI統合
- **効果**: 
  - WCAG準拠の継続的な確認
  - アクセシビリティの自動テスト

### 8. **アナリティクスの高度化**
- **提案**: Google Analytics 4 + カスタムイベント追跡
- **効果**: 
  - ユーザージャーニーの可視化
  - コンバージョン最適化
  - コンテンツ戦略のデータドリブン化

---

## 📊 優先度別アクションプラン

### 即座に対応（1週間以内）
1. ✅ 画像最適化の有効化（`next.config.ts`の修正）
2. ✅ 認証パスワードの環境変数化
3. ✅ お問い合わせフォームのメール送信実装
4. ✅ `console.log`の削除/置き換え

### 短期対応（1ヶ月以内）
5. ✅ CSRF保護とレート制限の実装
6. ✅ エラーハンドリングの統一
7. ✅ SEOメタデータの強化
8. ✅ アクセシビリティの改善

### 中期対応（3ヶ月以内）
9. ✅ パフォーマンス監視の導入
10. ✅ データフェッチングの最適化（SSR/SSG）
11. ✅ PWA対応
12. ✅ 画像CDNの検討

### 長期対応（6ヶ月以降）
13. ✅ CMS統合の検討
14. ✅ A/Bテスト機能の実装
15. ✅ 多言語対応の準備

---

## 🎯 まとめ

このプロジェクトは、モダンな技術スタック（Next.js 15、TypeScript、Tailwind CSS）を使用しており、基本的な設計は良好です。しかし、**パフォーマンス最適化**と**セキュリティ強化**が最優先課題です。

特に、画像最適化の無効化は、SEOとユーザー体験に直接的な悪影響を与えるため、**即座に対応すべき**です。また、セキュリティ面での脆弱性（ハードコードされたパスワード、CSRF保護の欠如）は、本番環境へのデプロイ前に必ず修正が必要です。

これらの改善を実施することで、**総合評価スコアを85-90点まで向上**させることが可能です。

---

**レビュー実施日**: 2025年1月
**レビュアー**: シニア・リードエンジニア

