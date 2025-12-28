import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Edge Middleware
 * セキュリティヘッダーの設定とA/Bテスト基盤
 */
export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // セキュリティヘッダーの設定
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  // Content Security Policy（必要に応じて調整）
  // response.headers.set(
  //   'Content-Security-Policy',
  //   "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;"
  // );

  // A/Bテスト用のクッキー設定（オプション）
  // const variant = request.cookies.get('ab-variant')?.value || 
  //   (Math.random() > 0.5 ? 'a' : 'b');
  // response.cookies.set('ab-variant', variant, {
  //   maxAge: 60 * 60 * 24 * 30, // 30日間
  //   sameSite: 'lax',
  // });

  return response;
}

export const config = {
  matcher: [
    /*
     * 以下のパスを除外:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - _next/data (page prefetch data - Cloudflare Pages対応で必須)
     * - favicon.ico (favicon file)
     * - その他の静的ファイル
     */
    '/((?!api|_next/static|_next/image|_next/data|favicon.ico|images|robots.txt|sitemap.xml).*)',
  ],
};

