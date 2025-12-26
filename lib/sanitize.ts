/**
 * 入力値のサニタイゼーション（XSS対策）
 * Edge Runtime対応の包括的なサニタイゼーション
 */

/**
 * テキスト入力のサニタイゼーション（HTMLタグを完全に除去）
 * @param input サニタイズする入力文字列
 * @returns サニタイズされた文字列
 */
export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') {
    return '';
  }

  return input
    // HTMLタグの除去（より包括的）
    .replace(/<[^>]*>/g, '')
    // HTMLエンティティのデコード後に再エンコード
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, '/')
    // JavaScriptプロトコルの除去
    .replace(/javascript:/gi, '')
    .replace(/data:text\/html/gi, '')
    // イベントハンドラーの除去
    .replace(/on\w+\s*=/gi, '')
    // 危険な文字の除去
    .replace(/[<>]/g, '')
    .trim()
    .substring(0, 1000); // 長さ制限
}

/**
 * HTMLメール用のサニタイゼーション（限定的なタグのみ許可）
 * @param input サニタイズするHTML文字列
 * @returns サニタイズされたHTML文字列
 */
export function sanitizeHTML(input: string): string {
  if (typeof input !== 'string') {
    return '';
  }

  // 限定的なタグのみ許可: p, br, strong, em, ul, ol, li
  const allowedTags = ['p', 'br', 'strong', 'em', 'ul', 'ol', 'li'];
  
  let sanitized = input
    // 危険なタグの除去
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
    .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '')
    .replace(/<link\b[^>]*>/gi, '')
    .replace(/<meta\b[^>]*>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    // イベントハンドラーの除去
    .replace(/on\w+\s*=/gi, '')
    // JavaScriptプロトコルの除去
    .replace(/javascript:/gi, '')
    .replace(/data:text\/html/gi, '')
    // すべての属性を除去（タグ名のみ許可）
    .replace(/<([a-z][a-z0-9]*)\b[^>]*>/gi, '<$1>');

  // 許可されたタグ以外を除去
  const tagRegex = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
  sanitized = sanitized.replace(tagRegex, (match, tagName) => {
    const lowerTagName = tagName.toLowerCase();
    if (allowedTags.includes(lowerTagName)) {
      // 開始タグのみ属性を除去
      if (match.startsWith('</')) {
        return `</${lowerTagName}>`;
      }
      return `<${lowerTagName}>`;
    }
    return '';
  });

  return sanitized;
}

/**
 * URLのサニタイゼーション
 * @param url サニタイズするURL文字列
 * @returns サニタイズされたURL文字列
 */
export function sanitizeURL(url: string): string {
  try {
    const parsed = new URL(url);
    // 許可されたプロトコルのみ
    const allowedProtocols = ['http:', 'https:', 'mailto:'];
    if (!allowedProtocols.includes(parsed.protocol)) {
      return '#';
    }
    return parsed.toString();
  } catch {
    return '#';
  }
}

