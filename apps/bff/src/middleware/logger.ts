import type { Context, MiddlewareHandler, Next } from 'hono';
import { env } from '../env';
import { getRequestId } from './requestId';

const LEVELS = { debug: 10, info: 20, warn: 30, error: 40 } as const;
const minLevel = LEVELS[env.BFF_LOG_LEVEL];

type Log = (level: keyof typeof LEVELS, msg: string, extra?: Record<string, unknown>) => void;

export const logger: Log = (level, msg, extra = {}) => {
  if (LEVELS[level] < minLevel) return;
  const line = JSON.stringify({
    ts: new Date().toISOString(),
    level,
    msg,
    ...extra,
  });
  (level === 'error' ? console.error : console.log)(line);
};

export const requestLogger = (): MiddlewareHandler => async (c: Context, next: Next) => {
  const start = performance.now();
  const requestId = getRequestId(c);
  await next();
  const duration = Math.round(performance.now() - start);
  logger('info', 'http', {
    requestId,
    method: c.req.method,
    path: c.req.path,
    status: c.res.status,
    durationMs: duration,
  });
};
