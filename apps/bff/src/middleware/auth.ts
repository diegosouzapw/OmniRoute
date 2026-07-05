import { createHmac, timingSafeEqual } from 'node:crypto';
import type { Context, MiddlewareHandler, Next } from 'hono';
import { env } from '../env';

const BEARER = /^Bearer\s+([A-Za-z0-9._-]{16,256})$/i;
const APIKEY = /^([A-Za-z0-9]{16,128})$/;

function verifyHmac(key: string): boolean {
  const expected = env.BFF_API_KEY;
  const a = Buffer.from(key);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export interface AuthContext {
  keyPrefix: string;
  raw: string;
}

export const requireAuth = (): MiddlewareHandler => async (c: Context, next: Next) => {
  const h = c.req.header('authorization') ?? '';
  const m = h.match(BEARER);
  const raw = m ? m[1] : c.req.header('x-api-key') ?? '';
  if (!raw || !APIKEY.test(raw) || !verifyHmac(raw)) {
    return c.json(
      { ok: false, error: { code: 'UNAUTHORIZED', message: 'invalid or missing api key' } },
      401,
    );
  }
  c.set('auth', { keyPrefix: raw.slice(0, 8), raw } satisfies AuthContext);
  await next();
};

export function getAuth(c: Context): AuthContext | undefined {
  return c.get('auth') as AuthContext | undefined;
}

/** HMAC-SHA256 helper for upstream signing. */
export function signPayload(secret: string, payload: string): string {
  return createHmac('sha256', secret).update(payload).digest('hex');
}
