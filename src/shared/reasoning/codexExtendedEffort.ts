import {
  CODEX_MAX_ALIAS_MODELS,
  CODEX_ULTRA_ALIAS_MODELS,
} from "@omniroute/open-sse/executors/codex/reasoningSuffix.ts";

// Which Codex models accept the `max` / `ultra` reasoning tiers, read from the
// alias sets the Codex executor uses so routing rules and the rules editor
// cannot drift from what the executor serves.

export type CodexExtendedEffort = "max" | "ultra";

function modelsFor(effort: CodexExtendedEffort): ReadonlySet<string> {
  return effort === "ultra" ? CODEX_ULTRA_ALIAS_MODELS : CODEX_MAX_ALIAS_MODELS;
}

function normalizeCodexModelId(model: string): string {
  return model
    .trim()
    .toLowerCase()
    .replace(/^(?:codex|cx)\//, "");
}

/** True when `model` (optionally `codex/` or `cx/` prefixed) is exactly a base model that accepts `effort`. */
export function isCodexExtendedEffortBaseModel(
  model: string,
  effort: CodexExtendedEffort
): boolean {
  return modelsFor(effort).has(normalizeCodexModelId(model));
}

/**
 * Like {@link isCodexExtendedEffortBaseModel}, but also accepts the base
 * model's variants (`<base>-<suffix>`, e.g. `cx/gpt-6-astra-high`).
 */
export function codexModelFamilySupportsExtendedEffort(
  model: string,
  effort: CodexExtendedEffort
): boolean {
  const normalized = normalizeCodexModelId(model);
  for (const base of modelsFor(effort)) {
    if (normalized === base || normalized.startsWith(`${base}-`)) return true;
  }
  return false;
}
