/**
 * WebExecutorWrapper — Wraps any web executor with session pool support
 *
 * This is the integration bridge between the session pool and OmniRoute's
 * executor system. It intercepts the fetch() call to add session-pool
 * headers (fingerprint-based User-Agent, Sec-CH-UA, etc.) and handles
 * 429/5xx responses with pool-level cooldown management.
 *
 * Future: For cookie-based providers (ChatGPT Web, DeepSeek Web, etc.)
 * the wrapper will also inject cookies from the Playwright-authenticated
 * session.
 */

import { Session } from "./session.ts";
import { SessionPool } from "./sessionPool.ts";

export interface WebExecutorRequest {
  url: string;
  method?: string;
  headers?: Record<string, string>;
  body?: string;
  signal?: AbortSignal;
  [key: string]: unknown;
}

export interface WebExecutorResponse {
  status: number;
  statusText?: string;
  headers?: Record<string, string>;
  body: string;
  ok: boolean;
  [key: string]: unknown;
}

export interface WebExecutorFn {
  (req: WebExecutorRequest): Promise<WebExecutorResponse>;
}

/**
 * Decorate a web executor function with session pool support.
 *
 * Before the underlying executor fires:
 *   1. Acquires a session from the pool (reusable, fingerprint-isolated)
 *   2. Merges session headers (UA + Sec-CH-UA) into the request
 *   3. Handles 429 → pool cooldown, 5xx → session death
 *
 * For zero-auth providers like Pollinations, Puter, etc. this is all
 * that's needed for "truly unlimited" — the fingerprint rotation alone
 * defeats burst-based rate limiting.
 */
export function withSessionPool(
  executor: WebExecutorFn,
  pool: SessionPool,
  options?: {
    /** When true, wraps the response body for error handling */
    wrapResponse?: boolean;
  },
): WebExecutorFn {
  const wrapResponse = options?.wrapResponse ?? true;

  return async (req: WebExecutorRequest): Promise<WebExecutorResponse> => {
    // Acquire session from pool (blocking with backoff)
    let session: Session | null = null;
    try {
      session = await pool.acquireBlocking();
    } catch (err) {
      return {
        status: 503,
        statusText: "Service Unavailable",
        body: JSON.stringify({
          error: "session_pool_exhausted",
          message: `[SessionPool:${pool.provider}] ${(err as Error).message}`,
        }),
        ok: false,
        headers: {},
      };
    }

    try {
      // Build request with session fingerprint headers
      const sessionHeaders = session.buildHeaders(req.headers);
      const poolReq: WebExecutorRequest = {
        ...req,
        headers: sessionHeaders,
      };

      // Execute the underlying web request
      const res = await executor(poolReq);

      // Handle response status
      if (res.status === 429) {
        pool.reportCooldown(session);

        if (wrapResponse) {
          return {
            ...res,
            body: JSON.stringify({
              error: "pool_rate_limited",
              message: `[SessionPool:${pool.provider}] Rate limited, session ${session.id} in cooldown`,
            }),
          };
        }
        return res;
      }

      if (res.status >= 500) {
        pool.reportDead(session);
        return res;
      }

      // Success
      pool.reportSuccess(session);
      pool.totalRequests++;
      return res;
    } catch (err) {
      // Network error — cooldown, not dead (may be transient)
      pool.reportCooldown(session);
      return {
        status: 502,
        statusText: "Bad Gateway",
        body: JSON.stringify({
          error: "pool_network_error",
          message: (err as Error).message,
        }),
        ok: false,
        headers: {},
      };
    } finally {
      session.release();
    }
  };
}
