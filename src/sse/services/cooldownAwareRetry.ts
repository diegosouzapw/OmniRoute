import { formatRetryAfter } from "@omniroute/open-sse/services/accountFallback.ts";

const DEFAULT_REQUEST_RETRY = 3;
const DEFAULT_MAX_RETRY_INTERVAL_SEC = 30;
const MAX_REQUEST_RETRY = 10;
const MAX_RETRY_INTERVAL_SEC = 300;

export interface CooldownAwareRetrySettings {
  requestRetry: number;
  maxRetryIntervalSec: number;
  maxRetryIntervalMs: number;
}

function normalizeInteger(
  value: unknown,
  fallback: number,
  options: { min?: number; max: number }
): number {
  const min = options.min ?? 0;

  if (typeof value === "number" && Number.isFinite(value)) {
    return Math.min(options.max, Math.max(min, Math.trunc(value)));
  }

  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) {
      return Math.min(options.max, Math.max(min, Math.trunc(parsed)));
    }
  }

  return fallback;
}

export function resolveCooldownAwareRetrySettings(
  settings: Record<string, unknown> | null | undefined
): CooldownAwareRetrySettings {
  const requestRetry = normalizeInteger(settings?.requestRetry, DEFAULT_REQUEST_RETRY, {
    min: 0,
    max: MAX_REQUEST_RETRY,
  });
  const maxRetryIntervalSec = normalizeInteger(
    settings?.maxRetryIntervalSec,
    DEFAULT_MAX_RETRY_INTERVAL_SEC,
    { min: 0, max: MAX_RETRY_INTERVAL_SEC }
  );

  return {
    requestRetry,
    maxRetryIntervalSec,
    maxRetryIntervalMs: maxRetryIntervalSec * 1000,
  };
}

export function computeClosestRetryAfter(retryAfter: unknown): {
  retryAfter: string | null;
  retryAfterHuman: string;
  waitMs: number | null;
} {
  if (!retryAfter) {
    return { retryAfter: null, retryAfterHuman: "", waitMs: null };
  }

  const retryTimeMs = new Date(retryAfter as string | number | Date).getTime();
  if (!Number.isFinite(retryTimeMs)) {
    return { retryAfter: null, retryAfterHuman: "", waitMs: null };
  }

  const normalizedRetryAfter = new Date(retryTimeMs).toISOString();
  return {
    retryAfter: normalizedRetryAfter,
    retryAfterHuman: formatRetryAfter(normalizedRetryAfter),
    waitMs: Math.max(retryTimeMs - Date.now(), 0),
  };
}

export function getCooldownAwareRetryDecision({
  retryAfter,
  settings,
  attempt,
}: {
  retryAfter: unknown;
  settings: CooldownAwareRetrySettings;
  attempt: number;
}): {
  shouldRetry: boolean;
  retryAfter: string | null;
  retryAfterHuman: string;
  waitMs: number;
} {
  const closest = computeClosestRetryAfter(retryAfter);
  if (
    settings.requestRetry <= 0 ||
    settings.maxRetryIntervalMs <= 0 ||
    attempt >= settings.requestRetry ||
    closest.waitMs === null
  ) {
    return {
      shouldRetry: false,
      retryAfter: closest.retryAfter,
      retryAfterHuman: closest.retryAfterHuman,
      waitMs: 0,
    };
  }

  if (closest.waitMs > settings.maxRetryIntervalMs) {
    return {
      shouldRetry: false,
      retryAfter: closest.retryAfter,
      retryAfterHuman: closest.retryAfterHuman,
      waitMs: closest.waitMs,
    };
  }

  return {
    shouldRetry: true,
    retryAfter: closest.retryAfter,
    retryAfterHuman: closest.retryAfterHuman,
    waitMs: closest.waitMs,
  };
}

export async function waitForCooldownAwareRetry(
  waitMs: number,
  signal?: AbortSignal | null
): Promise<boolean> {
  if (signal?.aborted) return false;
  if (!Number.isFinite(waitMs) || waitMs <= 0) return signal?.aborted !== true;

  return await new Promise((resolve) => {
    let settled = false;
    let timeoutId: ReturnType<typeof setTimeout> | null = setTimeout(() => {
      if (settled) return;
      settled = true;
      if (signal) {
        signal.removeEventListener("abort", onAbort);
      }
      timeoutId = null;
      resolve(true);
    }, waitMs);

    const onAbort = () => {
      if (settled) return;
      settled = true;
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      signal?.removeEventListener("abort", onAbort);
      resolve(false);
    };

    signal?.addEventListener("abort", onAbort, { once: true });
  });
}
