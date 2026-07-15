"use strict";

// =========================================================================
// CJS mirror of `src/mitm/aliasConfig.ts` for the standalone proxy process
// (server.cjs, spawned by manager.ts — runs as plain CommonJS, cannot import
// the ESM/TS source tree). Keep the two in sync when the alias-entry shape
// or the reasoning-effort vocabulary changes.
//
// The canonical effort vocabulary mirrors `@/shared/reasoning/effortStandardization.ts`
// (`CANONICAL_EFFORT_VALUES` + the `extra`/`max` → `xhigh` alias). Ported from upstream
// decolua/9router#2584 ("add Antigravity reasoning effort overrides").
// =========================================================================

const CANONICAL_EFFORT_VALUES = ["none", "low", "medium", "high", "xhigh"];
const EFFORT_TIER_ALIASES = { extra: "xhigh", max: "xhigh" };

function normalizeReasoningEffort(value) {
  if (typeof value !== "string") return undefined;
  const lowered = value.trim().toLowerCase();
  if (!lowered) return undefined;
  if (Object.prototype.hasOwnProperty.call(EFFORT_TIER_ALIASES, lowered)) {
    return EFFORT_TIER_ALIASES[lowered];
  }
  return CANONICAL_EFFORT_VALUES.includes(lowered) ? lowered : undefined;
}

function isPlainObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normalizeAliasEntry(value) {
  if (typeof value === "string") {
    const model = value.trim();
    return model ? { model } : null;
  }
  if (!isPlainObject(value)) return null;

  const model = typeof value.model === "string" ? value.model.trim() : "";
  const reasoningEffort = normalizeReasoningEffort(value.reasoningEffort);
  if (!model && !reasoningEffort) return null;

  return {
    ...(model ? { model } : {}),
    ...(reasoningEffort ? { reasoningEffort } : {}),
  };
}

function normalizeAliasMappings(mappings) {
  if (!isPlainObject(mappings)) return {};
  const normalized = {};
  for (const [alias, value] of Object.entries(mappings)) {
    if (!alias) continue;
    const entry = normalizeAliasEntry(value);
    if (entry) normalized[alias] = entry;
  }
  return normalized;
}

/**
 * Apply a normalized alias entry onto the raw (still Gemini/cloudcode-shaped) request body
 * the standalone proxy forwards. Mutates nothing on the input — returns a shallow-cloned
 * body with `model` swapped (when the override carries one) and `reasoningEffortOverride`
 * set at the SAME envelope level as `model` (top-level; the antigravity→openai translator
 * reads it there — see `open-sse/translator/request/antigravity-to-openai.ts`).
 */
function applyAntigravityOverride(body, override) {
  const result = { ...body };
  if (override && override.model) result.model = override.model;
  if (override && override.reasoningEffort) {
    result.reasoningEffortOverride = override.reasoningEffort;
  }
  return result;
}

module.exports = {
  CANONICAL_EFFORT_VALUES,
  normalizeReasoningEffort,
  normalizeAliasEntry,
  normalizeAliasMappings,
  applyAntigravityOverride,
};
