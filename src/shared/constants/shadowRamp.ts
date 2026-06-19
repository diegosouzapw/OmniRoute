/**
 * Shadow Ramp — 5-phase traffic-shadow schedule for the Bifrost Tier-1 router.
 *
 * B6 of the v8.1 Bifrost track (ADR-031). Each phase has a fixed Bifrost
 * serve percentage and a fixed duration. The phases are evaluated by
 * `getActiveShadowPhase()` against the `ramp_started_at` column in the
 * `traffic_shadow_config` table (see migration 105).
 *
 * The 14-day schedule is hard-coded here (the source of truth for the
 * 30-day decision review per ADR-031 § Decision Review). Operators can
 * pause or override per-deploy via the DB row (paused=1 or
 * bifrost_serve_pct_override).
 *
 * Phase windows (cumulative days from ramp_started_at):
 *   1. observe-only  :  0..<7  days → 0% Bifrost (parallel log only)
 *   2. canary-5pct   :  7..<9  days → 5% Bifrost
 *   3. canary-25pct  :  9..<11 days → 25% Bifrost
 *   4. canary-50pct  : 11..<13 days → 50% Bifrost
 *   5. canary-100pct : 13..14  days → 100% Bifrost
 *
 * Beyond 14 days, the ramp is "complete"; subsequent ramps require a fresh
 * `ramp_started_at` write via resetShadowRamp().
 */

export type ShadowRampPhaseName =
  | "observe-only"
  | "canary-5pct"
  | "canary-25pct"
  | "canary-50pct"
  | "canary-100pct";

export interface ShadowRampPhase {
  name: ShadowRampPhaseName;
  /** Bifrost serve percentage for this phase (0-100). */
  bifrostServePct: number;
  /** Duration of this phase in days. */
  durationDays: number;
}

export const SHADOW_RAMP_PHASES: readonly ShadowRampPhase[] = [
  { name: "observe-only", bifrostServePct: 0, durationDays: 7 },
  { name: "canary-5pct", bifrostServePct: 5, durationDays: 2 },
  { name: "canary-25pct", bifrostServePct: 25, durationDays: 2 },
  { name: "canary-50pct", bifrostServePct: 50, durationDays: 2 },
  { name: "canary-100pct", bifrostServePct: 100, durationDays: 1 },
] as const;

const MS_PER_DAY = 24 * 60 * 60 * 1000;

/**
 * Compute the active shadow phase for a given `rampStartedAt` ISO string and
 * the current time. Pure function — no DB read. Returns the highest-pct phase
 * whose date window contains the current time relative to `rampStartedAt`.
 *
 * If `rampStartedAt` is invalid or in the future, returns the first phase
 * (observe-only, 0%) — safer than serving Bifrost before ramp start.
 *
 * If `now` is past the end of the last phase, returns the last phase
 * (canary-100pct) — i.e. once you've reached 100% you stay there until
 * the operator resets via resetShadowRamp().
 */
export function resolveActiveShadowPhase(
  rampStartedAtIso: string,
  now: Date = new Date()
): ShadowRampPhase {
  const startedAt = new Date(rampStartedAtIso).getTime();
  if (!Number.isFinite(startedAt)) {
    return SHADOW_RAMP_PHASES[0];
  }
  const elapsedDays = (now.getTime() - startedAt) / MS_PER_DAY;
  if (elapsedDays < 0) {
    return SHADOW_RAMP_PHASES[0];
  }
  let active: ShadowRampPhase = SHADOW_RAMP_PHASES[0];
  let cumulative = 0;
  for (const phase of SHADOW_RAMP_PHASES) {
    cumulative += phase.durationDays;
    if (elapsedDays < cumulative) {
      active = phase;
      break;
    }
    active = phase;
  }
  return active;
}

/**
 * Deterministic 0..99 hash bucket for a request identity. The dispatcher
 * uses this to decide which requests go to Bifrost in a given phase, so
 * the same `(provider, model, virtualKeyId, hourBucket)` always lands on
 * the same path within the same hour. This keeps the divergence
 * comparison stable — a request whose Bifrost response is logged at
 * canary-5pct is the SAME request that gets served Bifrost on the next
 * call to the same hash slot.
 *
 * `hourBucket` is a UTC hour epoch (Math.floor(Date.now() / 3_600_000))
 * — this resets every hour, which is intentional: the determinism only
 * needs to hold within an hour so the system self-balances.
 */
export function shadowServeBucket(input: {
  provider: string;
  model: string;
  virtualKeyId: string | null;
  hourBucket: number;
}): number {
  const key = `${input.provider}|${input.model}|${input.virtualKeyId ?? ""}|${input.hourBucket}`;
  // FNV-1a 32-bit hash, simple and stable across runtimes.
  let hash = 0x811c9dc5;
  for (let i = 0; i < key.length; i++) {
    hash ^= key.charCodeAt(i);
    hash = (hash * 0x01000193) >>> 0;
  }
  return hash % 100;
}

/**
 * Decide whether a given request (keyed by `bucket` 0..99) should be served
 * by Bifrost in the current phase. Returns true for the highest-`bucket`
 * requests so a 5% phase routes the top 5% of bucket values, 25% the top
 * quarter, and so on.
 */
export function shouldServeBifrost(phase: ShadowRampPhase, bucket: number): boolean {
  if (phase.bifrostServePct <= 0) return false;
  if (phase.bifrostServePct >= 100) return true;
  // bucket is 0..99. Top N% means bucket >= (100 - N).
  return bucket >= 100 - phase.bifrostServePct;
}

/**
 * Total ramp duration in days. Used by tests and the operator doc to
 * assert that the 5 phases sum to the planned 14 days.
 */
export const SHADOW_RAMP_TOTAL_DAYS = SHADOW_RAMP_PHASES.reduce(
  (sum, phase) => sum + phase.durationDays,
  0
);
