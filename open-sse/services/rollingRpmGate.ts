import {
  SlidingWindowLimiter,
  type RateLimitScope,
  type RateLimitWindow,
  type SlidingWindowLease,
} from "./slidingWindowLimiter.ts";

type GetLimiterKey = (provider: string, connectionId: string, model?: string | null) => string;
type QueueTimeoutReason = "local-queue" | "upstream-cooldown";
type QueueTimeoutErrorFactory = (
  provider: string,
  model: string | null,
  maxWaitMs: number,
  reason?: QueueTimeoutReason
) => Error;

export interface RollingRpmGateOptions {
  getGlobalRpm: () => number | null | undefined;
  getProviderWindow: (provider: string) => RateLimitWindow | undefined;
  getConnectionRpm: (connectionId: string) => number | null | undefined;
  getLimiterKey: GetLimiterKey;
  createQueueTimeoutError: QueueTimeoutErrorFactory;
}

interface LearnedHeaderWindow {
  window: RateLimitWindow;
  expiresAt: number;
}

function createAbortError(signal: AbortSignal): Error {
  const reason = signal.reason;
  if (reason instanceof Error) return reason;
  const error = new Error(typeof reason === "string" ? reason : "The operation was aborted");
  error.name = "AbortError";
  if (reason !== undefined) (error as Error & { cause?: unknown }).cause = reason;
  return error;
}

function sleepOrAbort(ms: number, signal: AbortSignal | null): Promise<void> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      signal?.removeEventListener("abort", onAbort);
      resolve();
    }, ms);
    const onAbort = () => {
      clearTimeout(timer);
      signal?.removeEventListener("abort", onAbort);
      reject(createAbortError(signal as AbortSignal));
    };
    if (signal) {
      if (signal.aborted) onAbort();
      else signal.addEventListener("abort", onAbort, { once: true });
    }
  });
}

/**
 * Process-local trailing-window RPM admission. Distributed deployments need a
 * shared coordination store before this scope can be treated as cluster-wide.
 */
export function keyContainsConnection(key: string, connectionId: string): boolean {
  const marker = `:${connectionId}`;
  return key.endsWith(marker) || key.includes(`${marker}:`);
}

export class RollingRpmGate {
  private readonly limiter = new SlidingWindowLimiter();
  private readonly blockedUntil = new Map<string, number>();
  private readonly learnedHeaderWindows = new Map<string, LearnedHeaderWindow>();
  private readonly windowMs = 60_000;

  constructor(private readonly options: RollingRpmGateOptions) {}

  async acquire(
    provider: string,
    connectionId: string,
    model: string | null,
    signal: AbortSignal | null,
    maxWaitMs: number,
    startedAt: number
  ): Promise<SlidingWindowLease | null> {
    const blockKey = this.options.getLimiterKey(provider, connectionId, model);
    let scopes = this.getScopes(provider, connectionId, model);
    if (scopes.length === 0 && (this.blockedUntil.get(blockKey) ?? 0) <= Date.now()) {
      return null;
    }
    for (;;) {
      if (signal?.aborted) throw createAbortError(signal);

      scopes = this.getScopes(provider, connectionId, model);
      if (scopes.length === 0 && (this.blockedUntil.get(blockKey) ?? 0) <= Date.now()) {
        return null;
      }

      const now = Date.now();
      const blockedUntil = this.blockedUntil.get(blockKey) ?? 0;
      if (blockedUntil <= now) this.blockedUntil.delete(blockKey);
      let scopeBlockedUntil = 0;
      for (const scope of scopes) {
        const scopeBlocked = this.blockedUntil.get(scope.key) ?? 0;
        if (scopeBlocked > now) scopeBlockedUntil = Math.max(scopeBlockedUntil, scopeBlocked);
        else if (scopeBlocked > 0) this.blockedUntil.delete(scope.key);
      }
      const forcedWaitMs = Math.max(0, blockedUntil - now, scopeBlockedUntil - now);

      if (forcedWaitMs === 0) {
        const result = this.limiter.tryAcquireMany(scopes);
        if (result.allowed) return result.lease ?? null;
        const retryAfterMs = Math.max(1, result.retryAfterMs);
        const remainingMs = maxWaitMs > 0 ? maxWaitMs - (now - startedAt) : retryAfterMs;
        if (maxWaitMs > 0 && remainingMs <= 0) {
          throw this.options.createQueueTimeoutError(provider, model, maxWaitMs);
        }
        await sleepOrAbort(
          Math.min(retryAfterMs, maxWaitMs > 0 ? remainingMs : retryAfterMs),
          signal
        );
        continue;
      }

      const remainingMs = maxWaitMs > 0 ? maxWaitMs - (now - startedAt) : forcedWaitMs;
      if (maxWaitMs > 0 && remainingMs <= 0) {
        throw this.options.createQueueTimeoutError(provider, model, maxWaitMs, "upstream-cooldown");
      }
      await sleepOrAbort(
        Math.min(forcedWaitMs, maxWaitMs > 0 ? remainingMs : forcedWaitMs),
        signal
      );
    }
  }

  block(provider: string, connectionId: string, model: string | null, retryAfterMs: number): void {
    if (retryAfterMs > 0) {
      const key = this.options.getLimiterKey(provider, connectionId, model);
      this.blockedUntil.set(key, Date.now() + retryAfterMs);
    }
  }

  learnHeaderWindow(
    provider: string,
    connectionId: string,
    model: string | null,
    requests: number,
    windowMs: number,
    expiresAt: number
  ): void {
    const key = `header:${this.options.getLimiterKey(provider, connectionId, model)}`;
    if (requests <= 0) {
      this.learnedHeaderWindows.delete(key);
      this.blockedUntil.set(key, expiresAt);
      return;
    }
    this.blockedUntil.delete(key);
    this.learnedHeaderWindows.set(key, {
      window: { requests, windowMs },
      expiresAt,
    });
  }

  clearLearnedHeaderWindow(provider: string, connectionId: string, model: string | null): void {
    const key = `header:${this.options.getLimiterKey(provider, connectionId, model)}`;
    this.learnedHeaderWindows.delete(key);
    this.blockedUntil.delete(key);
  }

  clearConnection(connectionId: string): void {
    for (const key of this.blockedUntil.keys()) {
      if (keyContainsConnection(key, connectionId)) this.blockedUntil.delete(key);
    }
    for (const key of this.learnedHeaderWindows.keys()) {
      if (keyContainsConnection(key, connectionId)) this.learnedHeaderWindows.delete(key);
    }
  }

  reset(): void {
    this.limiter.reset();
    this.blockedUntil.clear();
    this.learnedHeaderWindows.clear();
  }

  cleanupExpired(now = Date.now()): void {
    for (const [key, expiresAt] of this.blockedUntil) {
      if (expiresAt <= now) this.blockedUntil.delete(key);
    }
    for (const [key, window] of this.learnedHeaderWindows) {
      if (window.expiresAt <= now) this.learnedHeaderWindows.delete(key);
    }
  }

  private getScopes(
    provider: string,
    connectionId: string,
    model: string | null
  ): RateLimitScope[] {
    const scopes: RateLimitScope[] = [];
    const globalRpm = this.options.getGlobalRpm();
    if (typeof globalRpm === "number" && globalRpm > 0) {
      scopes.push({
        key: "global",
        window: { requests: globalRpm, windowMs: this.windowMs },
      });
    }

    const providerWindow = this.options.getProviderWindow(provider);
    if (providerWindow) scopes.push({ key: `provider:${provider}`, window: providerWindow });

    const connectionRpm = this.options.getConnectionRpm(connectionId);
    if (typeof connectionRpm === "number" && connectionRpm > 0) {
      scopes.push({
        key: `provider-account:${provider}:${connectionId}`,
        window: { requests: connectionRpm, windowMs: this.windowMs },
      });
    }

    const headerKey = `header:${this.options.getLimiterKey(provider, connectionId, model)}`;
    const headerBlockedUntil = this.blockedUntil.get(headerKey) ?? 0;
    const headerRemainingMs = headerBlockedUntil - Date.now();
    if (headerRemainingMs > 0) {
      scopes.push({
        key: headerKey,
        window: { requests: 1, windowMs: headerRemainingMs },
      });
      return scopes;
    }
    if (headerBlockedUntil > 0) this.blockedUntil.delete(headerKey);
    const headerWindow = this.learnedHeaderWindows.get(headerKey);
    if (headerWindow) {
      if (headerWindow.expiresAt > Date.now()) {
        scopes.push({ key: headerKey, window: headerWindow.window });
      } else {
        this.learnedHeaderWindows.delete(headerKey);
      }
    }
    return scopes;
  }
}
