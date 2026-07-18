/**
 * MITM alias-mapping normalization — Antigravity model + reasoning-effort overrides.
 *
 * Ported from upstream decolua/9router#2584 ("add Antigravity reasoning effort
 * overrides"), adapted to OmniRoute's alias storage shape (`src/lib/db/models/mitmAlias.ts`,
 * `Record<alias, string | MitmAliasEntry>`) and its existing canonical reasoning-effort
 * vocabulary (`@/shared/reasoning/effortStandardization.ts`) instead of inventing a new one.
 *
 * A saved alias entry is either:
 *   - a legacy plain string  — `"provider/model-id"` (model mapping only, no reasoning
 *     override; this is the shape every existing install already has on disk), or
 *   - a structured object    — `{ model?: string, reasoningEffort?: CanonicalEffort }`,
 *     allowing a reasoning-effort override to be configured independently of (or without)
 *     a model remap.
 *
 * `normalizeAliasMappings` upgrades legacy strings to the structured shape on read, so no
 * DB migration is required (mirrors upstream's stated backward-compatibility contract).
 */
import { normalizeEffort, type CanonicalEffort } from "@/shared/reasoning/effortStandardization";

export interface MitmAliasEntry {
  model?: string;
  reasoningEffort?: CanonicalEffort;
}

export type MitmAliasMappings = Record<string, MitmAliasEntry>;

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Normalize a single stored alias value (legacy string or structured entry) into the
 * canonical `MitmAliasEntry` shape. Returns `null` when the value carries neither a model
 * nor a valid reasoning-effort override (i.e. it should be dropped from the mapping).
 */
export function normalizeAliasEntry(value: unknown): MitmAliasEntry | null {
  if (typeof value === "string") {
    const model = value.trim();
    return model ? { model } : null;
  }
  if (!isPlainObject(value)) return null;

  const model = typeof value.model === "string" ? value.model.trim() : "";
  const reasoningEffort = normalizeEffort(value.reasoningEffort);
  if (!model && !reasoningEffort) return null;

  return {
    ...(model ? { model } : {}),
    ...(reasoningEffort ? { reasoningEffort } : {}),
  };
}

/**
 * Normalize a whole alias→mapping record (as stored under `mitmAlias.antigravity` /
 * returned by `getMitmAlias()`), upgrading legacy string mappings and dropping empty
 * entries. Always returns a well-formed object, even for malformed input.
 */
export function normalizeAliasMappings(mappings: unknown): MitmAliasMappings {
  if (!isPlainObject(mappings)) return {};
  const normalized: MitmAliasMappings = {};
  for (const [alias, value] of Object.entries(mappings)) {
    if (!alias) continue;
    const entry = normalizeAliasEntry(value);
    if (entry) normalized[alias] = entry;
  }
  return normalized;
}

/**
 * True when any entry in the (not-yet-normalized) request payload carries a
 * `reasoningEffort` value that fails to normalize onto the canonical vocabulary — used to
 * reject the PUT at the API boundary with a 400 instead of silently dropping the override.
 */
export function hasInvalidReasoningEffort(mappings: unknown): boolean {
  if (!isPlainObject(mappings)) return false;
  return Object.values(mappings).some((value) => {
    if (!isPlainObject(value)) return false;
    const raw = value.reasoningEffort;
    if (raw == null || raw === "") return false;
    return normalizeEffort(raw) === undefined;
  });
}
