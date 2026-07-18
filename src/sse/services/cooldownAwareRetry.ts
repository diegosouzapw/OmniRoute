import { formatRetryAfter } from "@omniroute/open-sse/services/accountFallback.ts";
import { resolveResilienceSettings } from "@/lib/resilience/settings";

const MAX_REQUEST_RETRY = 10;
const MAX_RETRY_INTERVAL_SEC = 300;
const MAX_BUDGET_MS = 5 * 60 * 1000;

export interface CooldownAwareRetrySettings {
  enabled: boolean;
  maxRetries: number;
  maxRetryWaitSec: number;
  maxRetryWaitMs: number;
  /** Cumulative cap (ms) across all retry waits for one request — see settings/types.ts. */
  budgetMs: number;
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
  const waitForCooldown = resolveResilienceSettings(settings).waitForCooldown;
  const maxRetries = normalizeInteger(waitForCooldown.maxRetries, waitForCooldown.maxRetries, {
    min: 0,
    max: MAX_REQUEST_RETRY,
  });
  const maxRetryWaitSec = normalizeInteger(
    waitForCooldown.maxRetryWaitSec,
    waitForCooldown.maxRetryWaitSec,
    {
      min: 0,
      max: MAX_RETRY_INTERVAL_SEC,
    }
  );
  const maxRetryWaitMs = maxRetryWaitSec * 1000;
  const budgetMs = normalizeInteger(waitForCooldown.budgetMs, waitForCooldown.budgetMs, {
    min: maxRetryWaitMs,
    max: MAX_BUDGET_MS,
  });
  const enabled = Boolean(waitForCooldown.enabled) && maxRetries > 0 && maxRetryWaitSec > 0;

  return {
    enabled,
    maxRetries,
    maxRetryWaitSec,
    maxRetryWaitMs,
    budgetMs,
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
  budgetLeftMs,
}: {
  retryAfter: unknown;
  settings: CooldownAwareRetrySettings;
  attempt: number;
  /**
   * Remaining cumulative wait budget (ms) for this request. Defaults to
   * settings.budgetMs when omitted (single-call-site backward compat) —
   * pass the caller's tracked remainder once it starts decrementing it
   * across attempts (#7360 follow-up).
   */
  budgetLeftMs?: number;
}): {
  shouldRetry: boolean;
  retryAfter: string | null;
  retryAfterHuman: string;
  waitMs: number;
} {
  const closest = computeClosestRetryAfter(retryAfter);
  const effectiveBudgetLeftMs = budgetLeftMs ?? settings.budgetMs;
  if (
    !settings.enabled ||
    settings.maxRetries <= 0 ||
    settings.maxRetryWaitMs <= 0 ||
    attempt >= settings.maxRetries ||
    closest.waitMs === null
  ) {
    return {
      shouldRetry: false,
      retryAfter: closest.retryAfter,
      retryAfterHuman: closest.retryAfterHuman,
      waitMs: 0,
    };
  }

  if (closest.waitMs > settings.maxRetryWaitMs || closest.waitMs > effectiveBudgetLeftMs) {
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
