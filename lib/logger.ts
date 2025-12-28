/**
 * ログ出力ユーティリティ
 * 本番環境では機密情報を保護し、開発環境でのみ詳細ログを出力
 * エラートラッキングサービス（Sentry等）への統合準備済み
 */

// Edge Runtime対応: 環境変数は関数内で評価する（ビルド時ではなくリクエスト時に評価）
function isDevelopment(): boolean {
  try {
    return typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'development';
  } catch {
    return false;
  }
}

interface LogContext {
  [key: string]: unknown;
}

export const logger = {
  log: (...args: unknown[]) => {
    if (isDevelopment()) {
      console.log(...args);
    }
  },

  error: (message: string, error?: Error | unknown, context?: LogContext) => {
    if (isDevelopment()) {
      console.error(message, error, context);
    } else {
      // 本番環境でのエラーログ（機密情報を含まない形式）
      const errorMessage = error instanceof Error
        ? error.message
        : typeof error === 'string'
          ? error
          : JSON.stringify(error);

      const sanitizedContext = context ?
        Object.fromEntries(
          Object.entries(context).map(([key, value]) => [
            key,
            typeof value === 'string' ? value.substring(0, 100) : value
          ])
        ) : undefined;

      // Sentry統合（環境変数が設定されている場合）
      // インストール: npm install @sentry/nextjs
      // 設定後、以下のコメントを解除
      // if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
      //   const Sentry = await import('@sentry/nextjs');
      //   Sentry.captureException(error instanceof Error ? error : new Error(message), {
      //     level: 'error',
      //     tags: sanitizedContext,
      //     extra: { message, context: sanitizedContext },
      //   });
      // }

      // コンソールに出力（本番環境でもエラーは記録）
      console.error('[ERROR]', message, errorMessage, sanitizedContext);
    }
  },

  warn: (message: string, context?: LogContext) => {
    if (isDevelopment()) {
      console.warn(message, context);
    } else {
      // 本番環境でも警告は記録
      console.warn('[WARN]', message, context);

      // Sentry統合（オプション）
      // if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
      //   const Sentry = await import('@sentry/nextjs');
      //   Sentry.captureMessage(message, {
      //     level: 'warning',
      //     extra: context,
      //   });
      // }
    }
  },

  info: (message: string, context?: LogContext) => {
    if (isDevelopment()) {
      console.info(message, context);
    }
    // 本番環境ではinfoログは出力しない（必要に応じて変更）
  },
};

