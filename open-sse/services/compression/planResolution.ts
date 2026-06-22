import type { CompressionConfig, CompressionPipelineStep } from "./types.ts";
import { resolveCompressionPlan } from "./resolveCompressionPlan.ts";
import { deriveDefaultPlan, type DerivedPlan, type CompressionSource } from "./deriveDefaultPlan.ts";

/** Named-combo map: combo id → its stacked pipeline (operator-defined profiles). */
type NamedCombos = Record<string, CompressionPipelineStep[]>;

/** Tags a plan with the precedence layer that produced it (Phase 3 observability). */
export function withSource(plan: DerivedPlan, source: CompressionSource): DerivedPlan {
  return { ...plan, source };
}

/**
 * Interprets the `x-omniroute-compression` request header into a plan, or null when the
 * value is unrecognized (caller falls through to normal resolution). Pure.
 *   off            -> no compression
 *   default        -> the panel-derived Default (ignores active profile / routing / auto-trigger)
 *   engine:<id>    -> that single engine, when enabled in config.engines
 *   <combo>        -> a named combo, matched name-first (lowercased) then exact id (Decision A)
 */
export function planFromHeader(
  config: CompressionConfig,
  header: string,
  combos: NamedCombos
): DerivedPlan | null {
  const h = header.trim();
  if (!h) return null;
  const lower = h.toLowerCase();

  if (lower === "off") return withSource({ mode: "off", stackedPipeline: [] }, "request-header");

  if (lower === "default") {
    // Empty combos + null comboId yields the pure panel default (no active-combo leak).
    return withSource(deriveDefaultPlanFromConfig(config, null, {}), "request-header");
  }

  if (lower.startsWith("engine:")) {
    const id = lower.slice("engine:".length);
    const engine = config.engines?.[id];
    return engine?.enabled
      ? withSource(deriveDefaultPlan({ [id]: engine }, true), "request-header")
      : null;
  }

  const combo = combos[lower] ?? combos[h];
  return combo ? withSource({ mode: "stacked", stackedPipeline: combo }, "request-header") : null;
}

/** Renders the X-OmniRoute-Compression response header value. */
export function formatCompressionMeta(plan: DerivedPlan): string {
  return `${plan.mode}; source=${plan.source ?? "off"}`;
}

/**
 * Derived-default step. The per-engine toggle map drives the default ONLY when it was
 * EXPLICITLY configured via the panel (a stored `engines` row — `config.enginesExplicit`).
 * For legacy installs the map is backfilled for DISPLAY only (so the panel shows current
 * state); dispatch falls back to the historical `config.defaultMode` so behaviour is
 * byte-for-byte preserved until the operator opts into the panel by saving. This avoids a
 * silent behaviour change for installs whose backfilled engine flags don't exactly match
 * their old defaultMode.
 */
export function deriveDefaultPlanFromConfig(
  config: CompressionConfig,
  comboId: string | null,
  combos: NamedCombos = {}
): DerivedPlan {
  if (config.enginesExplicit) {
    // Panel-configured: the engines map (via the resolver, which stays header/active-combo
    // aware for Phases 2-3) is authoritative — including an explicit "everything off".
    return resolveCompressionPlan(config, { comboId, combos });
  }

  // Legacy path: defaultMode carries the effective mode (the engines map is display-only here).
  const legacyMode = config.defaultMode;
  if (legacyMode && legacyMode !== "off") {
    return legacyMode === "stacked"
      ? { mode: legacyMode, stackedPipeline: config.stackedPipeline ?? [] }
      : { mode: legacyMode, stackedPipeline: [] };
  }

  return { mode: "off", stackedPipeline: [] };
}
