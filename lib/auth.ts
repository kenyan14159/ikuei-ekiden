/**
 * 認証トークンの生成と検証
 * JWT（JSON Web Token）を使用した安全な認証
 */

import { SignJWT, jwtVerify } from 'jose';

// 環境変数は関数内で参照する（Edge Runtimeでの初期化クラッシュ防止）
function getJwtSecret(): string {
  return process.env.JWT_SECRET || 'change-this-secret-key-in-production';
}


/**
 * 認証トークンを生成
 * @returns JWTトークン文字列
 */
export async function createAuthToken(): Promise<string> {
  const secret = new TextEncoder().encode(getJwtSecret());

  const token = await new SignJWT({ authenticated: true })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secret);

  return token;
}

/**
 * 認証トークンを検証
 * @param token 検証するJWTトークン
 * @returns 検証結果（true: 有効、false: 無効）
 */
export async function verifyAuthToken(token: string): Promise<boolean> {
  try {
    const secret = new TextEncoder().encode(getJwtSecret());
    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}

/**
 * トークンからペイロードを取得（検証済みの場合のみ）
 * @param token JWTトークン
 * @returns ペイロードオブジェクトまたはnull
 */
export async function getTokenPayload(token: string): Promise<{ authenticated: boolean; iat?: number; exp?: number } | null> {
  try {
    const secret = new TextEncoder().encode(getJwtSecret());
    const { payload } = await jwtVerify(token, secret);

    return {
      authenticated: payload.authenticated === true,
      iat: payload.iat ? Number(payload.iat) : undefined,
      exp: payload.exp ? Number(payload.exp) : undefined,
    };
  } catch {
    return null;
  }
}

