/**
 * T02 — pipeline engine circuit-breaker (gaps v3.8.42; opt-in, default OFF).
 *
 * A lightweight, in-memory, per-engine breaker for the stacked compression pipeline. When an
 * engine throws repeatedly ACROSS requests, the breaker opens for that engine id and the
 * stacked loops skip it (keeping the body verbatim for that step — fail-open) until a cooldown
 * elapses, then probe once (lazy half-open). Success closes it; a failed probe re-opens it.
 *
 * This is deliberately NOT the provider breaker (`src/shared/utils/circuitBreaker.ts`), which
 * is provider-scoped and DB-persisted. This one is engine-scoped, process-local, and adds zero
 * DB/IO on the hot path. It composes with — but is independent of — the TV1 per-request bail-out
 * (which skips within a single request); the breaker adds cross-request memory.
 *
 * Default OFF: with `enabled:false` the stacked loops never consult or mutate this state, so
 * behavior is byte-identical to the pre-breaker pipeline (a throwing engine still propagates
 * unless TV1 bail-out is separately enabled).
 */

export interface PipelineCircuitBreakerConfig {
  /** Master switch. Default false — the pipeline never consults the breaker when off. */
  enabled: boolean;
  /** Consecutive cross-request failures before an engine's breaker opens. Default 3. */
  failureThreshold: number;
  /** How long the breaker stays open before a half-open probe (ms). Default 30_000. */
  cooldownMs: number;
}

export const DEFAULT_PIPELINE_BREAKER: PipelineCircuitBreakerConfig = {
  enabled: false,
  failureThreshold: 3,
  cooldownMs: 30_000,
};

interface EngineBreakerState {
  failures: number;
  /** Epoch ms until which the engine is OPEN; null = CLOSED. */
  openedUntil: number | null;
}

const _state = new Map<string, EngineBreakerState>();

function get(engine: string): EngineBreakerState {
  let s = _state.get(engine);
  if (!s) {
    s = { failures: 0, openedUntil: null };
    _state.set(engine, s);
  }
  return s;
}

function toNonNegativeInt(raw: string | undefined, fallback: number): number {
  if (raw === undefined) return fallback;
  const n = Number(raw);
  return Number.isFinite(n) && n >= 0 ? Math.floor(n) : fallback;
}

/**
 * Resolve the breaker config from a partial (per-combo config) with env fallback. Env keys:
 * `COMPRESSION_PIPELINE_BREAKER_ENABLED|_THRESHOLD|_COOLDOWN_MS`. The partial wins over env.
 */
export function resolvePipelineBreakerConfig(
  partial?: Partial<PipelineCircuitBreakerConfig>,
  env: NodeJS.ProcessEnv = process.env
): PipelineCircuitBreakerConfig {
  const enabled =
    partial?.enabled ?? env.COMPRESSION_PIPELINE_BREAKER_ENABLED === "true";
  const failureThreshold =
    partial?.failureThreshold ??
    toNonNegativeInt(env.COMPRESSION_PIPELINE_BREAKER_THRESHOLD, DEFAULT_PIPELINE_BREAKER.failureThreshold);
  const cooldownMs =
    partial?.cooldownMs ??
    toNonNegativeInt(env.COMPRESSION_PIPELINE_BREAKER_COOLDOWN_MS, DEFAULT_PIPELINE_BREAKER.cooldownMs);
  return {
    enabled: enabled === true,
    failureThreshold: Math.max(1, failureThreshold),
    cooldownMs: Math.max(0, cooldownMs),
  };
}

/**
 * Whether an engine may run now. CLOSED → true. OPEN within cooldown → false. OPEN past the
 * cooldown → lazily transitions to half-open (one probe allowed; a probe failure re-opens it
 * immediately because failures is left one short of the threshold). `now` is injectable for tests.
 */
export function canRunEngine(
  engine: string,
  config: PipelineCircuitBreakerConfig,
  now: number = Date.now()
): boolean {
  if (!config.enabled) return true;
  const s = get(engine);
  if (s.openedUntil == null) return true; // CLOSED (or already half-open)
  if (now >= s.openedUntil) {
    // Cooldown elapsed → half-open: allow a single probe, but keep failures one below the
    // threshold so the very next failure re-opens the breaker without N more round-trips.
    s.openedUntil = null;
    s.failures = Math.max(0, config.failureThreshold - 1);
    return true;
  }
  return false; // OPEN
}

/** Record a failed engine run; opens the breaker once consecutive failures hit the threshold. */
export function recordEngineFailure(
  engine: string,
  config: PipelineCircuitBreakerConfig,
  now: number = Date.now()
): void {
  if (!config.enabled) return;
  const s = get(engine);
  s.failures += 1;
  if (s.failures >= config.failureThreshold) {
    s.openedUntil = now + config.cooldownMs;
  }
}

/** Record a successful engine run; fully closes the breaker. */
export function recordEngineSuccess(engine: string, config: PipelineCircuitBreakerConfig): void {
  if (!config.enabled) return;
  const s = get(engine);
  s.failures = 0;
  s.openedUntil = null;
}

/** Inspect breaker state for telemetry/tests. */
export function getEngineBreakerState(engine: string): { failures: number; open: boolean } {
  const s = _state.get(engine);
  return { failures: s?.failures ?? 0, open: s?.openedUntil != null };
}

/** Clear all breaker state (tests + operator reset). */
export function resetPipelineEngineBreakers(): void {
  _state.clear();
}
