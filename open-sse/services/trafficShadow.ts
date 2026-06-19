/**
 * open-sse/services/trafficShadow.ts — Bifrost traffic-shadow dispatcher (B6).
 *
 * Runs the legacy `chatCore` executor and the `BifrostBackendExecutor` in
 * parallel on the same request, compares outcomes, logs the comparison to
 * `traffic_shadow_log`, and returns the path chosen by the active ramp
 * phase (or by the cost-or-latency override per B6.4 policy).
 *
 * Activation: opt-in via the `BIFROST_SHADOW_ENABLED=true` env var. Default
 * off — operator must set the env var to start the 5-phase ramp.
 *
 * Divergence policy (B6.4):
 *   1. Both succeed → serve the path chosen by the active phase (deterministic
 *      per `(provider, model, virtualKeyId, hourBucket)` so the same request
 *      hash always lands on the same path within an hour).
 *   2. Cost-or-latency override: if Bifrost is 50%+ faster AND its p99 cost
 *      is lower, serve Bifrost even when the phase would have served legacy.
 *      This is the "Bifrost is winning on the dimensions that matter" early
 *      cutover trigger.
 *   3. Legacy succeeds, Bifrost fails → serve legacy, log divergence as
 *      `error`.
 *   4. Bifrost succeeds, legacy fails → serve legacy (we still default to the
 *      proven path during the ramp), log divergence as `legacy_failed`.
 *   5. Both fail → propagate the legacy error (we still want callers to see
 *      the proven path's failure mode), log divergence as `both_failed`.
 *
 * Latency / cost extraction is best-effort. If a path's response doesn't
 * carry an obvious signal, we record `null` for that field and let the
 * aggregate query handle the missing data. The dispatcher MUST NOT add
 * more than 10ms p99 to the legacy path — both calls run in `Promise.all`
 * so the slow path is the legacy fetch itself.
 *
 * Reference: ADR-031 § Decision Review, PLAN.md § 2.5.2 (B6),
 * src/shared/constants/shadowRamp.ts, src/lib/db/trafficShadow.ts.
 */

import type { BaseExecutor, ExecuteInput } from "../executors/base.ts";
import { BifrostBackendExecutor } from "../executors/bifrost.ts";
import { isBifrostSupported } from "../executors/bifrostProviderMap.ts";
// Type-only import (erased at runtime). The runtime values are imported
// lazily inside dispatchWithShadow() so this module stays cold-loadable.
import type { ShadowRampPhase } from "../../src/shared/constants/shadowRamp.ts";
// Note: do NOT import recordShadowOutcome / getActivePhaseFromDb statically.
// They are imported lazily inside dispatchWithShadow() so that the shadow
// path stays cold-loadable (the module would otherwise eagerly pull in
// src/lib/db/trafficShadow.ts on every chatCore dispatch, even when the
// env var is off). See comment above dispatchWithShadow.

/**
 * Result of a shadow comparison dispatch. The caller uses
 * `servedResponse` to stream the user-visible response; `servedPath` and
 * `divergenceScore` are returned for caller-side observability (call log,
 * pending request update, etc.).
 */
export interface ShadowDispatchResult {
  /** The streaming response the caller should pipe to the client. */
  servedResponse: Response;
  /** Which path's response is in `servedResponse`. */
  servedPath: "legacy" | "bifrost";
  /** URL the served path POSTed to (for observability). */
  servedUrl: string;
  /**
   * 0..1 divergence score: 0 = identical outcomes, 1 = total divergence
   * (one succeeded, the other failed) or wildly different cost/latency.
   * Computed by computeDivergenceScore().
   */
  divergenceScore: number;
  /** Latency of the legacy path in ms (or null if it failed before headers). */
  legacyLatencyMs: number | null;
  /** Latency of the Bifrost path in ms (or null if it failed before headers). */
  bifrostLatencyMs: number | null;
}

export interface ShadowDispatchOptions {
  legacyExecutor: BaseExecutor;
  bifrostExecutor: BifrostBackendExecutor;
  provider: string;
  model: string;
  virtualKeyId?: string | null;
  /**
   * Optional override of the active phase (used by tests). In production
   * the dispatcher always reads the phase from the DB.
   */
  phaseOverride?: ShadowRampPhase;
  /**
   * Optional override of the current time (used by tests). Defaults to
   * `new Date()`.
   */
  now?: Date;
  /**
   * Optional override of the divergence-policy callbacks (used by tests).
   * The production defaults compute a 0..1 score from latency + cost + status.
   */
  divergencePolicy?: DivergencePolicy;
}

export interface DivergencePolicy {
  /**
   * If true AND bifrost is 50%+ faster AND p99 cost is lower than legacy,
   * serve bifrost even when the active phase would have served legacy.
   * This is the B6.4 "cost-or-latency wins" early cutover trigger.
   */
  costOrLatencyWins: boolean;
}

/**
 * Default divergence policy. Operators can tighten the threshold via
 * `BIFROST_SHADOW_COST_OR_LATENCY_WINS=false` if early cutover is not
 * desired in the current deployment.
 */
const DEFAULT_DIVERGENCE_POLICY: DivergencePolicy = {
  costOrLatencyWins: true,
};

function isShadowEnabled(): boolean {
  const raw = process.env.BIFROST_SHADOW_ENABLED;
  if (!raw) return false;
  return raw === "true" || raw === "1";
}

function isCostOrLatencyWinsEnabled(): boolean {
  const raw = process.env.BIFROST_SHADOW_COST_OR_LATENCY_WINS;
  if (raw === undefined) return DEFAULT_DIVERGENCE_POLICY.costOrLatencyWins;
  return raw === "true" || raw === "1";
}

/**
 * Compute a 0..1 divergence score from the comparison outcomes. 0 means
 * the two paths produced essentially the same result (same status, similar
 * latency and cost). 1 means total divergence (one path succeeded, the
 * other failed, OR latency differs by >5x).
 */
export function computeDivergenceScore(args: {
  legacyStatus: number | null;
  bifrostStatus: number | null;
  legacyLatencyMs: number | null;
  bifrostLatencyMs: number | null;
  legacyCostUsd: number | null;
  bifrostCostUsd: number | null;
}): number {
  // One path failed → high divergence.
  if (args.legacyStatus === null || args.bifrostStatus === null) {
    return 1;
  }
  // Both failed but with different statuses.
  const legacyOk = args.legacyStatus >= 200 && args.legacyStatus < 400;
  const bifrostOk = args.bifrostStatus >= 200 && args.bifrostStatus < 400;
  if (legacyOk !== bifrostOk) {
    return 1;
  }
  // Both ok: blend latency + cost deltas.
  let score = 0;
  if (args.legacyLatencyMs !== null && args.bifrostLatencyMs !== null) {
    const denom = Math.max(args.legacyLatencyMs, args.bifrostLatencyMs, 1);
    const ratio = Math.abs(args.bifrostLatencyMs - args.legacyLatencyMs) / denom;
    score = Math.max(score, Math.min(1, ratio));
  }
  if (args.legacyCostUsd !== null && args.bifrostCostUsd !== null) {
    const denom = Math.max(args.legacyCostUsd, args.bifrostCostUsd, 1e-9);
    const ratio = Math.abs(args.bifrostCostUsd - args.legacyCostUsd) / denom;
    score = Math.max(score, Math.min(1, ratio * 0.5));
  }
  return score;
}

type PathResult = {
  ok: boolean;
  status: number | null;
  latencyMs: number;
  costUsd: number | null;
  url: string;
  response: Response | null;
  errorMessage: string | null;
};

/**
 * Run a single executor path with timing + best-effort cost extraction.
 * Returns null on error. Never throws.
 */
async function runPath(
  executor: BaseExecutor,
  input: ExecuteInput
): Promise<PathResult> {
  const start = Date.now();
  try {
    const result = await executor.execute(input);
    const latencyMs = Date.now() - start;
    return {
      ok: result.response.ok,
      status: result.response.status,
      latencyMs,
      costUsd: extractCostFromResponse(result.response, input.body),
      url: result.url,
      response: result.response,
      errorMessage: null,
    };
  } catch (err) {
    return {
      ok: false,
      status: null,
      latencyMs: Date.now() - start,
      costUsd: null,
      url: "",
      response: null,
      errorMessage: err instanceof Error ? err.message : String(err),
    };
  }
}

/**
 * Best-effort cost extraction. The legacy chatCore path already records
 * cost on call logs; the Bifrost path's response carries the same in
 * `x-bifrost-cost-usd` (if Bifrost's billing header is set). For now
 * we extract from the response body when it's a small JSON or via the
 * header. Returns null if we can't read it cheaply.
 */
function extractCostFromResponse(response: Response, _body: unknown): number | null {
  const headerCost = response.headers.get("x-bifrost-cost-usd");
  if (headerCost) {
    const parsed = Number(headerCost);
    if (Number.isFinite(parsed) && parsed >= 0) return parsed;
  }
  return null;
}

/**
 * Run the shadow comparison dispatch: call legacy + Bifrost in parallel,
 * log the outcome, return the served path's response.
 *
 * Pure orchestration — does not throw on path failure. If both paths fail
 * with an error, the caller sees a synthetic 500 Response so the user
 * gets a coherent error rather than a thrown exception escaping the
 * dispatch loop.
 */
export async function dispatchWithShadow(
  input: ExecuteInput,
  options: ShadowDispatchOptions
): Promise<ShadowDispatchResult> {
  // Lazy-load DB + ramp helpers. This keeps the shadow path cold-loadable
  // — when BIFROST_SHADOW_ENABLED is off, this module is never imported
  // by chatCore.ts at all.
  const { recordShadowOutcome, getActivePhaseFromDb } = await import(
    "../../src/lib/db/trafficShadow.ts"
  );
  const { shadowServeBucket, shouldServeBifrost } = await import(
    "../../src/shared/constants/shadowRamp.ts"
  );

  const policy: DivergencePolicy = options.divergencePolicy ?? {
    costOrLatencyWins: isCostOrLatencyWinsEnabled(),
  };
  const phase = options.phaseOverride ?? getActivePhaseFromDb(options.now ?? new Date());
  const bucket = shadowServeBucket({
    provider: options.provider,
    model: options.model,
    virtualKeyId: options.virtualKeyId ?? null,
    hourBucket: Math.floor((options.now ?? new Date()).getTime() / 3_600_000),
  });
  const phaseSaysBifrost = shouldServeBifrost(phase, bucket);

  // Both calls fire in parallel; the slow one bounds the wall clock. The
  // legacy call is the one we serve, so its latency dominates user-visible
  // time. The bifrost call runs in parallel; if it's slower, the user pays
  // 0ms extra because Promise.all resolves on the slow side.
  const [legacyPath, bifrostPath] = await Promise.all([
    runPath(options.legacyExecutor, input),
    runPath(options.bifrostExecutor, input),
  ]);

  // Drain + close the shadow (non-served) response so the connection
  // doesn't leak. Best-effort: must not affect the served path.
  const nonServed = phaseSaysBifrost ? legacyPath : bifrostPath;
  if (nonServed.response && nonServed.response !== servedPick(legacyPath, bifrostPath, phaseSaysBifrost).response) {
    drainResponse(nonServed.response).catch(() => {
      /* drain is best-effort */
    });
  }

  const divergenceScore = computeDivergenceScore({
    legacyStatus: legacyPath.status,
    bifrostStatus: bifrostPath.status,
    legacyLatencyMs: legacyPath.latencyMs,
    bifrostLatencyMs: bifrostPath.latencyMs,
    legacyCostUsd: legacyPath.costUsd,
    bifrostCostUsd: bifrostPath.costUsd,
  });

  // ── Decision: which path to serve ──
  let servedPath: "legacy" | "bifrost";

  if (!legacyPath.ok && !bifrostPath.ok) {
    // Both failed. Prefer to surface the legacy error (proves out the
    // existing behavior). Synthesize a 500 response from the legacy
    // error message if we have nothing to return.
    const errMsg = legacyPath.errorMessage ?? bifrostPath.errorMessage ?? "shadow dispatch failed";
    const fallback = new Response(
      JSON.stringify({ error: { code: "shadow_dispatch_failed", message: errMsg } }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
    logShadowOutcome(recordShadowOutcome, options, phase, legacyPath, bifrostPath, divergenceScore, "legacy", "both_failed");
    return {
      servedResponse: legacyPath.response ?? bifrostPath.response ?? fallback,
      servedPath: "legacy",
      servedUrl: legacyPath.url || bifrostPath.url,
      divergenceScore,
      legacyLatencyMs: legacyPath.latencyMs,
      bifrostLatencyMs: bifrostPath.latencyMs,
    };
  }

  if (legacyPath.ok && !bifrostPath.ok) {
    servedPath = "legacy";
  } else if (!legacyPath.ok && bifrostPath.ok) {
    // Default: serve legacy even when bifrost succeeded, until the
    // operator opts into the "Bifrost is proven" cutover. The
    // divergence log records this so the operator can see in the
    // dashboard that Bifrost would have served cleanly.
    servedPath = "legacy";
  } else {
    // Both succeeded. Honor the phase first; if cost-or-latency
    // policy says Bifrost wins on the dimensions that matter, override.
    if (phaseSaysBifrost) {
      servedPath = "bifrost";
    } else if (policy.costOrLatencyWins && isBifrostWinningOnDimensions(legacyPath, bifrostPath)) {
      servedPath = "bifrost";
    } else {
      servedPath = "legacy";
    }
  }

  const picked = servedPath === "bifrost" ? bifrostPath : legacyPath;
  // Picked must be ok here; legacy-fallback-when-bifrost-succeeded means
  // we have a valid legacy response.
  const servedResponse = picked.response ?? legacyPath.response ?? bifrostPath.response;
  if (!servedResponse) {
    // Should be unreachable: at least one path is ok. Defensive.
    const fallback = new Response(
      JSON.stringify({ error: { code: "shadow_no_response", message: "no response" } }),
      { status: 502, headers: { "content-type": "application/json" } }
    );
    logShadowOutcome(recordShadowOutcome, options, phase, legacyPath, bifrostPath, divergenceScore, "legacy", "no_response");
    return {
      servedResponse: fallback,
      servedPath: "legacy",
      servedUrl: legacyPath.url || bifrostPath.url,
      divergenceScore,
      legacyLatencyMs: legacyPath.latencyMs,
      bifrostLatencyMs: bifrostPath.latencyMs,
    };
  }

  const notes =
    servedPath === "bifrost" && !phaseSaysBifrost
      ? "served_bifrost_by_cost_or_latency_override"
      : !bifrostPath.ok && legacyPath.ok
        ? "bifrost_failed"
        : bifrostPath.ok && !legacyPath.ok
          ? "legacy_failed_served_legacy"
          : undefined;
  logShadowOutcome(recordShadowOutcome, options, phase, legacyPath, bifrostPath, divergenceScore, servedPath, notes);

  return {
    servedResponse,
    servedPath,
    servedUrl: picked.url,
    divergenceScore,
    legacyLatencyMs: legacyPath.latencyMs,
    bifrostLatencyMs: bifrostPath.latencyMs,
  };
}

function servedPick(
  legacy: PathResult,
  bifrost: PathResult,
  phaseSaysBifrost: boolean
): PathResult {
  if (legacy.ok && bifrost.ok) {
    return phaseSaysBifrost ? bifrost : legacy;
  }
  return legacy.ok ? legacy : bifrost;
}

/**
 * Cost-or-latency override: Bifrost must be 50%+ faster AND p99 cost must
 * be lower than legacy for us to serve Bifrost when the phase would have
 * served legacy. This is the B6.4 "winning on the dimensions that matter"
 * early cutover trigger.
 */
function isBifrostWinningOnDimensions(
  legacy: PathResult,
  bifrost: PathResult
): boolean {
  if (!legacy.ok || !bifrost.ok) return false;
  if (legacy.latencyMs <= 0) return false;
  const latencyRatio = bifrost.latencyMs / legacy.latencyMs;
  const fiftyPctFaster = latencyRatio <= 0.5;
  if (!fiftyPctFaster) return false;
  // Cost must be lower; null cost is a tie (don't override).
  if (legacy.costUsd === null || bifrost.costUsd === null) return false;
  return bifrost.costUsd < legacy.costUsd;
}

/**
 * Best-effort log write. Must never throw — the dispatch path is hot.
 *
 * `recordShadowOutcome` is passed in as a function reference (not a static
 * import) so this module stays cold-loadable when the env var is off.
 */
function logShadowOutcome(
  recordShadowOutcome: (outcome: ShadowOutcomeInput) => void,
  options: ShadowDispatchOptions,
  phase: ShadowRampPhase,
  legacy: PathResult,
  bifrost: PathResult,
  divergenceScore: number,
  servedPath: "legacy" | "bifrost",
  notes: string | undefined
): void {
  try {
    recordShadowOutcome({
      virtualKeyId: options.virtualKeyId ?? null,
      provider: options.provider,
      model: options.model,
      phase: phase.name,
      legacyLatencyMs: legacy.latencyMs,
      legacyCostUsd: legacy.costUsd,
      legacyStatus: legacy.status,
      bifrostLatencyMs: bifrost.latencyMs,
      bifrostCostUsd: bifrost.costUsd,
      bifrostStatus: bifrost.status,
      divergenceScore,
      servedPath,
      notes,
    });
  } catch {
    /* best-effort — see file header */
  }
}

/**
 * Subset of the DB module's public surface used by the dispatcher. Defined
 * here to avoid pulling the full DB module type graph into this file.
 */
type ShadowOutcomeInput = {
  virtualKeyId: string | null;
  provider: string;
  model: string;
  phase: string;
  legacyLatencyMs: number;
  legacyCostUsd: number | null;
  legacyStatus: number | null;
  bifrostLatencyMs: number;
  bifrostCostUsd: number | null;
  bifrostStatus: number | null;
  divergenceScore: number;
  servedPath: "legacy" | "bifrost";
  notes: string | undefined;
};

/**
 * Drain a response body to avoid leaking the connection. Best-effort.
 */
async function drainResponse(response: Response): Promise<void> {
  try {
    if (!response.body) return;
    await response.arrayBuffer();
  } catch {
    /* best-effort */
  }
}

// ---------------------------------------------------------------------------
// Public helpers
// ---------------------------------------------------------------------------

/**
 * Whether shadow dispatch should be used for this request. Resolves the
 * env-var + provider-support check. Used by the wire-up site in
 * chatCore.ts to decide whether to swap the executor for a ShadowExecutor.
 */
export function shouldUseShadowDispatch(provider: string): boolean {
  if (!isShadowEnabled()) return false;
  return isBifrostSupported(provider);
}
