/**
 * Polyglot tier-selection policy (ADR-032 § "Decision Rule").
 *
 * The per-edge default tier lives in the registry (set at `registerEdge`
 * time). At call time, the resolver applies a layered policy:
 *
 *   1. Force-tier override (from `forceTier` option — A/B tests).
 *   2. Env override (`OMNIROUTE_EDGE_TIER_<NAME>=T2|T3`) — per-edge.
 *   3. Kill-switch degradation (`OMNIROUTE_KILL_SWITCH_T_TO=1` — global).
 *   4. Resource-pressure degradation (CPU/mem thresholds).
 *   5. Tier capability check (degrade if the requested tier's contract
 *      is missing: e.g. no FFI crate on disk).
 *
 * Every tier choice is auditable via the `polyglot_tier_decisions` log
 * lines. The resolver is the single seam where runtime tier decisions
 * are made — the registry + transports don't make policy decisions.
 */

import os from "node:os";
import { getEdgeTier, getEdge, setEdgeTier, listEdges, type EdgeTier } from "./polyglotEdges.ts";

// Re-export type aliases consumed by polyglotHotPath.ts and other edges.
export type { EdgeTier } from "./polyglotEdges.ts";
export type Tier = "T1" | "T2" | "T3";
export type EdgeId = string;

export interface ResolvedTier {
  tier: Tier;
  defaultTier: Tier;
  reason: string;
}

export interface ResolverSignals {
  /** Current 0..1 CPU pressure (load-avg-normalized). */
  cpuPressure?: number;
  /** Current 0..1 memory pressure. */
  memPressure?: number;
  /** True when Bifrost kill-switch is active (`open-sse/services/bifrostKillSwitch.ts`). */
  killSwitchActive?: boolean;
}

const HIGH_CPU_THRESHOLD = 0.85;
let forcedTToT1 = false;
let lastSample = 0;
const SAMPLE_INTERVAL_MS = 1000;
let lastCpu = 0;

function sampleSystem(): ResolverSignals {
  const now = Date.now();
  if (now - lastSample < SAMPLE_INTERVAL_MS) {
    return { cpuPressure: lastCpu };
  }
  lastSample = now;
  // `os.loadavg` is POSIX-only; on Windows it returns [0, 0, 0]. We treat
  // both cases as "no signal" by mapping to a fallback derived from cpus().
  let la = 0;
  try {
    if (os.platform() !== "win32") {
      const result = os.loadavg();
      if (Array.isArray(result) && result.length > 0) {
        la = result[0] ?? 0;
      }
    }
  } catch {
    la = 0;
  }
  const cores = os.cpus().length || 1;
  lastCpu = Math.max(0, Math.min(1, la / cores));
  return { cpuPressure: lastCpu };
}

export function resolveTier(
  edgeName: string,
  forceTier?: EdgeTier,
  signalsOverride?: ResolverSignals
): ResolvedTier {
  const edge = getEdge(edgeName);
  if (!edge) {
    return { tier: "T1", defaultTier: "T1", reason: "edge not registered; defaulting to T1" };
  }

  if (forceTier) {
    return {
      tier: forceTier as Tier,
      defaultTier: edge.defaultTier as Tier,
      reason: `caller forced tier=${forceTier}`,
    };
  }

  const envTier = (getEdgeTier(edgeName) ?? edge.defaultTier) as Tier;
  const signals = signalsOverride ?? sampleSystem();

  if (forcedTToT1 || signals.killSwitchActive) {
    return {
      tier: "T1",
      defaultTier: envTier,
      reason: "kill-switch degradation active; T1 fallback",
    };
  }

  if (envTier === "T3" && signals.cpuPressure !== undefined && signals.cpuPressure > HIGH_CPU_THRESHOLD) {
    return {
      tier: "T2",
      defaultTier: envTier,
      reason: `cpu pressure=${signals.cpuPressure.toFixed(2)} > ${HIGH_CPU_THRESHOLD}; T3->T2 downgrade`,
    };
  }

  return {
    tier: envTier,
    defaultTier: envTier,
    reason: `default tier (env/env override = ${envTier})`,
  };
}

/**
 * Periodic catch-up: re-resolve every registered edge's tier against
 * the latest signal. Cheaper than resolving per-call because we only
 * settle on a tier change (and only emit a `setEdgeTier` call when
 * the prior tier didn't match).
 *
 * Intended to be called from a 1-second interval timer by
 * `src/server-init.ts`. Test-only entry point is exported via
 * `__runOnceForTests`.
 */
export function reconcileAllEdges(signals: ResolverSignals = sampleSystem()): number {
  // Apply the kill-switch signal BEFORE the resolution loop so the per-edge
  // resolveTier() call inside the loop sees the up-to-date flag.
  if (signals.killSwitchActive) forcedTToT1 = true;
  let changes = 0;
  for (const edge of globalPolyglotEdges()) {
    const { tier } = resolveTier(edge.name, undefined, signals);
    const current = getEdgeTier(edge.name);
    if (current !== tier) {
      setEdgeTier(edge.name, tier, "config");
      changes++;
    }
  }
  return changes;
}

let globalPolyglotEdgesCache: Array<{ name: string }> | null = null;

/**
 * Lazy accessor for the edge list. We avoid calling `listEdges` at module
 * load so that `polyglotEdges.ts` -> transport imports don't cycle back
 * into this file during cold start in tests.
 */
function globalPolyglotEdges(): Array<{ name: string }> {
  if (globalPolyglotEdgesCache) return globalPolyglotEdgesCache;
  try {
    globalPolyglotEdgesCache = listEdges();
  } catch {
    globalPolyglotEdgesCache = [];
  }
  return globalPolyglotEdgesCache;
}

export function __runOnceForTests(signals?: ResolverSignals): number {
  return reconcileAllEdges(signals);
}

/**
 * Test-only: clear the cached edge list so the next reconcileAllEdges
 * call sees the current registry state. Required when tests call
 * `__resetEdgeRegistryForTests` between cases.
 */
export function __resetEdgeCacheForTests(): void {
  globalPolyglotEdgesCache = null;
}

/**
 * Public cascade API: flip the global kill-switch degradation flag and
 * immediately re-resolve all edges so every registered edge's `tier`
 * falls back to `T1` regardless of its `defaultTier` / env override.
 *
 * Called by `killSwitchBridge.ts` after a Bifrost provider trip and
 * before any subsequent edges can dispatch into the now-degraded tier.
 */
export function activateKillSwitchDegradation(): void {
  forcedTToT1 = true;
  // Best-effort: refresh the cached edge list and reconcile so any
  // pre-existing T2/T3 edges immediately flip back to T1 the moment
  // a kill-switch is engaged. Recursive imports between this file and
  // `reconciler.ts` are guarded by the lazy `globalPolyglotEdges()`.
  try {
    globalPolyglotEdgesCache = null;
    reconcileAllEdges({
      cpuPressure: 0,
      memPressure: 0,
      killSwitchActive: true,
    });
  } catch {
    // reconcile is best-effort — the per-call fallback in `resolveTier`
    // still observes `forcedTToT1` even if reconcile throws.
  }
}

/**
 * Public cascade API: clear the kill-switch degradation flag and let
 * every edge fall back to its configured default tier on the next call.
 *
 * Called by `killSwitchBridge.ts` after a Bifrost provider recovery
 * (kill-switch reset). Note: reconciler boot path also calls this on
 * warm-start to ensure no stale state from a prior run.
 */
export function deactivateKillSwitchDegradation(): void {
  forcedTToT1 = false;
  try {
    globalPolyglotEdgesCache = null;
    reconcileAllEdges({ cpuPressure: 0, memPressure: 0 });
  } catch {
    // best-effort; per-call resolveTier will observe the cleared flag.
  }
}

/** Test-only: kill-switch simulation flag. */
export function __setKillSwitchActiveForTests(active: boolean): void {
  forcedTToT1 = active;
}

/**
 * Public read-only accessor for the global kill-switch degradation flag.
 * Returns true while a Bifrost provider is in the tripped state and every
 * edge must degrade to T1 (HTTP fallback).
 */
export function isKillSwitchDegradationActive(): boolean {
  return forcedTToT1;
}
