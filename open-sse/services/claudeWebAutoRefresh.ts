/**
 * Claude Web Auto-Refresh Service
 *
 * Provides automatic cf_clearance token management:
 * - Caches tokens for 55 minutes (typical Cloudflare expiry is 1 hour)
 * - Auto-solves Turnstile challenges using Playwright
 * - Injects fresh tokens into existing session cookies
 * - Handles retry logic for failed requests
 */

import { getCfClearanceToken, getCacheStatus } from "./claudeTurnstileSolver.ts";

export interface CookieRefreshOptions {
  force?: boolean;
  maxRetries?: number;
  timeout?: number;
  log?: any;
}

export interface CookieRefreshResult {
  cookie: string;
  cfClearanceInjected: boolean;
  attempt: number;
}

/**
 * Inject cf_clearance into cookie string
 */
export function injectCfClearance(existingCookie: string, cfClearanceToken: string): string {
  if (!existingCookie || !existingCookie.trim()) {
    return `cf_clearance=${cfClearanceToken}`;
  }

  // Check if cf_clearance already exists
  if (existingCookie.includes("cf_clearance=")) {
    // Replace existing token
    return existingCookie.replace(/cf_clearance=[^;]+/, `cf_clearance=${cfClearanceToken}`);
  }

  // Append new token
  return `${existingCookie.trim()}; cf_clearance=${cfClearanceToken}`;
}

/**
 * Refresh cf_clearance token in cookie
 */
export async function refreshCookie(
  existingCookie: string,
  options?: CookieRefreshOptions
): Promise<CookieRefreshResult> {
  const { force = false, log } = options || {};

  try {
    log?.info?.("CLAUDE-WEB-AUTO-REFRESH", "Fetching fresh cf_clearance...");

    const cfClearanceToken = await getCfClearanceToken({ force });
    const newCookie = injectCfClearance(existingCookie, cfClearanceToken);

    log?.info?.("CLAUDE-WEB-AUTO-REFRESH", "cf_clearance token injected successfully");

    return {
      cookie: newCookie,
      cfClearanceInjected: true,
      attempt: 1,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    log?.error?.("CLAUDE-WEB-AUTO-REFRESH", `Failed to refresh cf_clearance: ${message}`);

    throw error;
  }
}

/**
 * Get current cache status for diagnostics
 */
export function getCacheInfo(): {
  hasCached: boolean;
  expiresIn?: number;
  message: string;
} {
  const status = getCacheStatus();

  if (!status.hasCached) {
    return {
      hasCached: false,
      message: "No cached cf_clearance",
    };
  }

  const minutes = Math.floor((status.expiresIn || 0) / 60000);
  const seconds = Math.floor(((status.expiresIn || 0) % 60000) / 1000);

  return {
    hasCached: true,
    expiresIn: status.expiresIn,
    message: `cf_clearance cached: expires in ${minutes}m${seconds}s`,
  };
}

/**
 * Middleware for fetch interceptor
 * Usage: Wrap fetch calls to auto-refresh on 403/401
 */
export async function fetchWithAutoRefresh<T>(
  fetchFn: (cookie: string) => Promise<T>,
  initialCookie: string,
  options?: CookieRefreshOptions
): Promise<{ result: T; cookie: string; refreshed: boolean }> {
  const maxRetries = options?.maxRetries ?? 2;
  let attempt = 0;
  let currentCookie = initialCookie;
  let lastError: Error | null = null;

  while (attempt < maxRetries) {
    attempt++;

    try {
      const result = await fetchFn(currentCookie);
      return {
        result,
        cookie: currentCookie,
        refreshed: attempt > 1,
      };
    } catch (error) {
      lastError = error as Error;

      // Check if error is 403/401
      const isAuthError = lastError.message?.includes("403") || lastError.message?.includes("401");

      if (!isAuthError || attempt >= maxRetries) {
        throw lastError;
      }

      options?.log?.warn?.(
        "CLAUDE-WEB-AUTO-REFRESH",
        `Auth error detected (attempt ${attempt}/${maxRetries}), refreshing cf_clearance...`
      );

      try {
        const refresh = await refreshCookie(currentCookie, {
          ...options,
          force: attempt > 1,
        });
        currentCookie = refresh.cookie;
      } catch (refreshError) {
        options?.log?.error?.("CLAUDE-WEB-AUTO-REFRESH", "Refresh failed");
        throw refreshError;
      }
    }
  }

  throw lastError || new Error("Max retries exceeded");
}

/**
 * Create a middleware function for fetch wrappers
 */
export function createAutoRefreshMiddleware(options?: CookieRefreshOptions) {
  return async (
    fetch: (url: string, init?: any) => Promise<Response>,
    url: string,
    init?: any
  ): Promise<Response> => {
    const { log = options?.log } = options || {};
    const originalCookie = init?.headers?.Cookie || "";
    let currentCookie = originalCookie;
    let attempt = 0;
    const maxRetries = options?.maxRetries ?? 2;

    while (attempt < maxRetries) {
      attempt++;

      try {
        const response = await fetch(url, {
          ...init,
          headers: {
            ...init?.headers,
            Cookie: currentCookie,
          },
        });

        if (response.status === 200) {
          return response;
        }

        // 403 or 401 - try refresh
        if ((response.status === 403 || response.status === 401) && attempt < maxRetries) {
          log?.warn?.(
            "CLAUDE-WEB-AUTO-REFRESH",
            `HTTP ${response.status} - refreshing cf_clearance (attempt ${attempt}/${maxRetries})`
          );

          try {
            const refresh = await refreshCookie(currentCookie, {
              ...options,
              force: attempt > 1,
              log,
            });
            currentCookie = refresh.cookie;
            continue; // Retry with new cookie
          } catch (error) {
            log?.error?.("CLAUDE-WEB-AUTO-REFRESH", "Refresh failed, returning error response");
            return response; // Return original error
          }
        }

        return response; // Return response (could be error)
      } catch (error) {
        if (attempt >= maxRetries) {
          throw error;
        }

        log?.error?.(
          "CLAUDE-WEB-AUTO-REFRESH",
          `Fetch failed: ${error instanceof Error ? error.message : String(error)}`
        );
        throw error;
      }
    }

    throw new Error("Max retries exceeded");
  };
}
