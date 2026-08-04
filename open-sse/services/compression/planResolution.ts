import type { CompressionConfig, CompressionPipelineStep, CompressionStats } from "./types.ts";
import { resolveCompressionPlan } from "./resolveCompressionPlan.ts";
import {
  deriveDefaultPlan,
  type DerivedPlan,
  type CompressionSource,
} from "./deriveDefaultPlan.ts";

/** Named-combo map: combo id → its stacked pipeline (operator-defined profiles). */
type NamedCombos = Record<string, CompressionPipelineStep[]>;

const MAX_COMPRESSION_ANNOTATION_BYTES = 768;
const NON_ASCII_HEADER_VALUE_CHARS = /[^\x20-\x7e]/g;

function utf8ByteLength(value: string): number {
  return new TextEncoder().encode(value).byteLength;
}

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
    const id = lower.slice("engine:".length).trim();
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
 * Builds the annotation suffix for X-OmniRoute-Compression from compression stats.
 * Returns "" when there are no rules to aggregate (caller skips the append).
 * Format: `tokens=<orig>-><comp>; rules: <name>x<count>, ...` sorted by count desc.
 * ASCII-only: this string is appended to the X-OmniRoute-Compression HTTP header,
 * whose value is a latin-1 ByteString — a non-ASCII char (e.g. U+2192 →) throws at
 * Response/Headers construction (500). Keep the UI badge's arrow in the JSX, not here.
 */
export function formatCompressionAnnotation(stats: CompressionStats): string {
  const rules = stats.rulesApplied;
  if (!rules || rules.length === 0) return "";

  const counts = new Map<string, number>();
  for (const rule of rules) {
    const safeRule = rule.replace(NON_ASCII_HEADER_VALUE_CHARS, "?");
    counts.set(safeRule, (counts.get(safeRule) ?? 0) + 1);
  }

  const sorted = [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  const prefix = `tokens=${stats.originalTokens}->${stats.compressedTokens}; rules: `;
  const suffix = ", ...";
  const parts: string[] = [];
  let bytes = utf8ByteLength(prefix);
  for (const [name, n] of sorted) {
    const part = `${name}x${n}`;
    const separator = parts.length > 0 ? ", " : "";
    const partBytes = utf8ByteLength(separator + part);
    if (bytes + partBytes > MAX_COMPRESSION_ANNOTATION_BYTES - utf8ByteLength(suffix)) {
      if (parts.length === 0) return "";
      return `${prefix}${parts.join(", ")}${suffix}`;
    }
    parts.push(part);
    bytes += partBytes;
  }
  const agg = parts.join(", ");
  return `${prefix}${agg}`;
}

/**
 * Builds the named-combo lookup keyed by BOTH combo id and lowercased (trimmed) name, so the
 * `<combo>` header form can match by either. A combo with a blank/whitespace/missing name
 * contributes only its id key — a blank name would otherwise register a useless "" key, and a
 * single malformed row must not throw and disable the whole map (`name` is NOT NULL in the DB
 * but may be an empty string). Pure.
 */
export function buildNamedComboLookup(
  combos: Array<{ id: string; name?: string | null; pipeline: CompressionPipelineStep[] }>
): NamedCombos {
  const map: NamedCombos = {};
  for (const c of combos) {
    map[c.id] = c.pipeline;
    const name = c.name?.trim();
    if (name) map[name.toLowerCase()] = c.pipeline;
  }
  return map;
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
