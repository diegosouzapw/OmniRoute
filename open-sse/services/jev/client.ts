/**
 * TypeSafe System One (Jev) HTTP client.
 *
 * One call = one `state` plus one or more atomic questions; the response maps
 * question id → typed answer. The client is deliberately fail-open: every
 * failure (no credential, timeout, 429/5xx after retries, malformed body)
 * resolves to `null` so a decision surface never breaks the request path.
 *
 * Protections, mirroring the reference implementation used by the omp agent:
 *   - bounded retries with backoff on transient failures (network, 429, 5xx)
 *   - in-process answer cache keyed by (model, state, questions) — identical
 *     judgments across a routing pass are free
 *   - a consecutive-failure circuit breaker so a dead upstream does not add
 *     latency to every request
 */
import { createHash } from "node:crypto";
import { logger } from "../../utils/logger.ts";
import { resolveJevRuntime } from "./config.ts";
import { DECISION_ADAPTERS, alignAnswersToQuestions, type DecisionWire } from "./adapters.ts";
import type { JevAnswer, JevQuestion, JevResult, JevUsage } from "./types.ts";

const log = logger("JEV");

const CACHE_TTL_MS = 300_000;
const CACHE_MAX_ENTRIES = 256;
const MAX_ATTEMPTS = 3;
const RETRY_BACKOFF_MS = [250, 700];
const BREAKER_FAILURE_THRESHOLD = 5;
const BREAKER_COOLDOWN_MS = 60_000;
const MAX_STATE_CHARS = 24_000;

interface CacheEntry {
  at: number;
  value: JevResult;
}

const answerCache = new Map<string, CacheEntry>();

interface JevClientStats {
  calls: number;
  served: number;
  cachedHits: number;
  skippedNoCredential: number;
  failures: number;
  retries: number;
  breakerRejections: number;
  totalLatencyMs: number;
  lastLatencyMs: number | null;
  lastFailureAt: number | null;
  breakerOpenUntil: number | null;
}

const stats: JevClientStats = {
  calls: 0,
  served: 0,
  cachedHits: 0,
  skippedNoCredential: 0,
  failures: 0,
  retries: 0,
  breakerRejections: 0,
  totalLatencyMs: 0,
  lastLatencyMs: null,
  lastFailureAt: null,
  breakerOpenUntil: null,
};

let consecutiveFailures = 0;

/** Deterministic JSON: object keys sorted recursively, so equal inputs hash equally. */
function stableStringify(value: unknown): string {
  if (value === null || typeof value !== "object") return JSON.stringify(value) ?? "null";
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(",")}]`;
  const entries = Object.entries(value as Record<string, unknown>)
    .filter(([, v]) => v !== undefined)
    .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
    .map(([k, v]) => `${JSON.stringify(k)}:${stableStringify(v)}`);
  return `{${entries.join(",")}}`;
}

function cacheGet(key: string): JevResult | undefined {
  const hit = answerCache.get(key);
  if (!hit) return undefined;
  if (Date.now() - hit.at >= CACHE_TTL_MS) {
    answerCache.delete(key);
    return undefined;
  }
  return hit.value;
}

function cacheSet(key: string, value: JevResult): void {
  answerCache.set(key, { at: Date.now(), value });
  if (answerCache.size <= CACHE_MAX_ENTRIES) return;
  const ordered = [...answerCache.entries()].sort((a, b) => a[1].at - b[1].at);
  for (const [k] of ordered.slice(0, answerCache.size - CACHE_MAX_ENTRIES)) answerCache.delete(k);
}

function breakerIsOpen(now: number): boolean {
  if (consecutiveFailures < BREAKER_FAILURE_THRESHOLD) return false;
  const until = stats.breakerOpenUntil ?? 0;
  return now < until;
}

function recordSuccess(latencyMs: number): void {
  consecutiveFailures = 0;
  stats.breakerOpenUntil = null;
  stats.served += 1;
  stats.totalLatencyMs += latencyMs;
  stats.lastLatencyMs = latencyMs;
}

function recordFailure(): void {
  consecutiveFailures += 1;
  stats.failures += 1;
  stats.lastFailureAt = Date.now();
  if (consecutiveFailures >= BREAKER_FAILURE_THRESHOLD) {
    stats.breakerOpenUntil = Date.now() + BREAKER_COOLDOWN_MS;
    log.warn("Jev circuit breaker opened after consecutive failures", {
      consecutiveFailures,
      cooldownMs: BREAKER_COOLDOWN_MS,
    });
  }
}

function sleep(ms: number): Promise<void> {
  const { promise, resolve } = Promise.withResolvers<void>();
  setTimeout(resolve, ms);
  return promise;
}

class RetryableFailure extends Error {}

/** One network attempt. Throws `RetryableFailure` for transient failures. */
async function attemptDecide(
  runtime: { apiKey: string; baseUrl: string; model: string; wire: DecisionWire },
  state: string,
  questions: Record<string, JevQuestion>,
  timeoutMs: number,
  callerSignal: AbortSignal | undefined
): Promise<{ model: string; answers: Record<string, JevAnswer>; usage?: JevUsage }> {
  const timeoutSignal = AbortSignal.timeout(timeoutMs);
  const signal =
    callerSignal && typeof AbortSignal.any === "function"
      ? AbortSignal.any([timeoutSignal, callerSignal])
      : timeoutSignal;

  const adapter = DECISION_ADAPTERS[runtime.wire];
  const request = adapter.buildRequest(
    { baseUrl: runtime.baseUrl, apiKey: runtime.apiKey, model: runtime.model, wire: runtime.wire },
    state,
    questions
  );

  let response: Response;
  try {
    response = await fetch(request.url, {
      method: "POST",
      headers: request.headers,
      body: request.body,
      signal,
    });
  } catch (error) {
    if (callerSignal?.aborted) throw new Error("Jev request aborted by caller");
    const detail = error instanceof Error ? error.message : String(error);
    throw new RetryableFailure(`request failed: ${detail}`);
  }

  if (response.status === 429 || response.status >= 500) {
    const body = await response.text().catch(() => "");
    throw new RetryableFailure(`upstream ${response.status}: ${body.slice(0, 200)}`);
  }
  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`upstream ${response.status}: ${body.slice(0, 200)}`);
  }

  let body: unknown;
  try {
    body = await response.json();
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    throw new RetryableFailure(`unparseable JSON: ${detail}`);
  }

  const parsed = adapter.parseResponse(body, runtime.model);
  return {
    model: parsed.model,
    answers: alignAnswersToQuestions(parsed.rawAnswers, questions),
    usage: parsed.usage,
  };
}

export interface AskJevOptions {
  /** Per-call model override (defaults to the resolved runtime model). */
  model?: string;
  timeoutMs?: number;
  signal?: AbortSignal;
  /** Bypass the in-process answer cache (rarely needed). */
  noCache?: boolean;
}

/**
 * Ask Jev one or more atomic questions about `state`.
 *
 * Returns `null` — never throws — when no credential resolves, the circuit
 * breaker is open, the caller aborts, or every attempt fails.
 */
export async function askJev(
  state: string,
  questions: Record<string, JevQuestion>,
  options: AskJevOptions = {}
): Promise<JevResult | null> {
  const questionIds = Object.keys(questions);
  if (questionIds.length === 0 || !state.trim()) return null;

  stats.calls += 1;
  const now = Date.now();
  if (breakerIsOpen(now)) {
    stats.breakerRejections += 1;
    return null;
  }

  const runtime = await resolveJevRuntime();
  if (!runtime) {
    stats.skippedNoCredential += 1;
    return null;
  }

  const model = options.model ?? runtime.model;
  const boundedState = state.length > MAX_STATE_CHARS ? state.slice(0, MAX_STATE_CHARS) : state;
  const cacheKey = createHash("sha256")
    .update(stableStringify({ model, state: boundedState, questions }))
    .digest("hex");

  if (!options.noCache) {
    const hit = cacheGet(cacheKey);
    if (hit) {
      stats.cachedHits += 1;
      return { ...hit, cached: true };
    }
  }

  const timeoutMs = options.timeoutMs ?? runtime.timeoutMs;
  const startedAt = Date.now();
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt += 1) {
    if (attempt > 0) {
      stats.retries += 1;
      await sleep(RETRY_BACKOFF_MS[attempt - 1] ?? RETRY_BACKOFF_MS[RETRY_BACKOFF_MS.length - 1]);
    }
    try {
      const decided = await attemptDecide(
        {
          apiKey: runtime.apiKey,
          baseUrl: runtime.baseUrl,
          model,
          wire: runtime.wire,
        },
        boundedState,
        questions,
        timeoutMs,
        options.signal
      );
      const latencyMs = Date.now() - startedAt;
      recordSuccess(latencyMs);
      const result: JevResult = {
        model: decided.model,
        answers: decided.answers,
        usage: decided.usage,
        cached: false,
        latencyMs,
      };
      cacheSet(cacheKey, result);
      log.debug("Jev answered", {
        model: result.model,
        questionIds,
        latencyMs,
      });
      return result;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      const retryable = error instanceof RetryableFailure;
      if (!retryable) break;
    }
  }

  recordFailure();
  log.warn("Jev decision unavailable (fail-open)", {
    questionIds,
    error: lastError?.message ?? "unknown",
  });
  return null;
}

export function getJevClientStats(): Readonly<JevClientStats> {
  return stats;
}

export function __resetJevClientForTests(): void {
  answerCache.clear();
  consecutiveFailures = 0;
  stats.calls = 0;
  stats.served = 0;
  stats.cachedHits = 0;
  stats.skippedNoCredential = 0;
  stats.failures = 0;
  stats.retries = 0;
  stats.breakerRejections = 0;
  stats.totalLatencyMs = 0;
  stats.lastLatencyMs = null;
  stats.lastFailureAt = null;
  stats.breakerOpenUntil = null;
}
