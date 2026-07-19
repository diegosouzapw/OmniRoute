/**
 * Claude reasoning-effort catalog variants.
 *
 * Effort-capable Claude models steer their reasoning via `reasoning_effort`
 * (translated to Claude `output_config.effort` / thinking config downstream).
 * Rich clients such as VS Code render this as a `reasoningEffort` *config schema*
 * slider (see `src/lib/vscode/reasoningMetadata.ts`), but catalog-only clients —
 * OpenCode, plain OpenAI-SDK model pickers — can only choose a model by its `id`.
 * For those clients an effort level is unreachable unless it is advertised as a
 * standalone model id:
 *
 *     <provider>/<model>-<level>     e.g. claude/claude-fable-5-high
 *
 * The gateway already ACCEPTS these ids: `applyClaudeEffortVariant()` strips the
 * `-<level>` suffix back to the real base model and surfaces the level as
 * `reasoning_effort` before dispatch (see
 * `open-sse/handlers/chatCore/claudeEffortVariant.ts` and `splitClaudeEffortSuffix`
 * in `open-sse/config/providerModels.ts`). Until now nothing ENUMERATED them, so a
 * catalog-only client saw the base model (e.g. `claude/claude-fable-5`) but never
 * its effort levels. This module closes that gap the same way `noThinkingAlias.ts`
 * exposes `no-think/…` variants: it synthesizes the effort ids from the
 * already-key-filtered catalog list, so a variant only appears when its real model
 * is permitted.
 *
 * Levels come from the single source of truth (`supportsXHighEffort`): every
 * effort-capable Claude model advertises Low/Medium/High, and xHigh is added only
 * for models that support it (e.g. Fable 5, Opus 4.8, Sonnet 5 — not Opus 4.6/4.5
 * or Haiku). "none" is intentionally omitted: it is the base model id, already in
 * the catalog. Max/ultra are codex-only presets and are not synthesized here.
 */
import { getModelSpec } from "@/shared/constants/modelSpecs";
import { supportsXHighEffort } from "../config/providerModels.ts";

/** Base reasoning-effort levels advertised for every effort-capable Claude model. */
export const CLAUDE_EFFORT_VARIANT_LEVELS = ["low", "medium", "high"] as const;
/** Extra level advertised only for models that support extra-high effort. */
export const CLAUDE_XHIGH_EFFORT_LEVEL = "xhigh";

export type ClaudeEffortVariantLevel =
  (typeof CLAUDE_EFFORT_VARIANT_LEVELS)[number] | typeof CLAUDE_XHIGH_EFFORT_LEVEL;

// Ids that already carry a reasoning-effort suffix — never double-suffix them.
const CLAUDE_EFFORT_SUFFIX_RE = /-(?:xhigh|high|medium|low)$/i;
const CLAUDE_NAME_RE = /claude/i;
const NO_THINKING_PREFIX = "no-think/";

interface CatalogModelEntry {
  id?: unknown;
  owned_by?: unknown;
  name?: unknown;
  root?: unknown;
  [key: string]: unknown;
}

/** Strip a `<provider>/` prefix to get the bare model name for spec lookup. */
function bareModelName(id: string): string {
  const slash = id.lastIndexOf("/");
  return slash >= 0 ? id.slice(slash + 1) : id;
}

/** Human label for an effort level, matching the VS Code catalog casing. */
export function formatClaudeEffortLabel(level: string): string {
  if (level === CLAUDE_XHIGH_EFFORT_LEVEL) return "XHigh";
  return level.charAt(0).toUpperCase() + level.slice(1);
}

/**
 * Whether the catalog should advertise reasoning-effort variants for this entry.
 *
 * Rule: a thinking-capable Claude-family base model. Combos are virtual, and ids
 * that are already an effort variant or a no-think alias are skipped so we never
 * double-synthesize. Unlike the no-think gate this deliberately does NOT exclude
 * `rejectsThinkingDisabled` models — Fable 5 / Sonnet 5 are adaptive-only (they
 * reject `thinking:{type:"disabled"}`) yet still take a reasoning effort.
 */
export function shouldExposeClaudeEffortVariants(
  model: CatalogModelEntry
): model is CatalogModelEntry & { id: string } {
  if (!model || typeof model !== "object") return false;
  const id = model.id;
  if (typeof id !== "string" || id.length === 0) return false;
  if (model.owned_by === "combo") return false;
  if (id.startsWith(NO_THINKING_PREFIX)) return false;
  if (CLAUDE_EFFORT_SUFFIX_RE.test(id)) return false;

  const name = bareModelName(id);
  const spec = getModelSpec(name);
  if (!spec) return false;

  return spec.supportsThinking === true && CLAUDE_NAME_RE.test(name);
}

/**
 * Normalize the provider prefix inside a qualified model id using an alias→canonical
 * map, e.g. "cc/claude-fable-5" → "claude/claude-fable-5". Ids without a "/" or whose
 * prefix is not in the map are returned unchanged. Mirrors `noThinkingAlias.ts`.
 */
function normalizeProviderPrefix(
  qualifiedId: string,
  aliasToCanonical: Record<string, string>
): string {
  const slash = qualifiedId.indexOf("/");
  if (slash < 0) return qualifiedId;
  const prefix = qualifiedId.slice(0, slash);
  const canonical = aliasToCanonical[prefix];
  return canonical && canonical !== prefix
    ? `${canonical}${qualifiedId.slice(slash)}`
    : qualifiedId;
}

/**
 * Effort levels to advertise for `<providerId>/<modelId>`. Low/Medium/High always;
 * xHigh only when the model supports it (single source of truth `supportsXHighEffort`).
 */
export function claudeEffortLevelsFor(providerId: string, modelId: string): string[] {
  const levels: string[] = [...CLAUDE_EFFORT_VARIANT_LEVELS];
  if (supportsXHighEffort(providerId, modelId)) {
    levels.push(CLAUDE_XHIGH_EFFORT_LEVEL);
  }
  return levels;
}

/**
 * Append reasoning-effort variants for every eligible Claude model. Returns the
 * original array reference unchanged when nothing is eligible (no allocation in the
 * common case).
 *
 * @param aliasToCanonical - When provided, the provider prefix of each variant id is
 *   normalized to its canonical form (e.g. "cc" → "claude"), matching the catalog's
 *   canonical prefix mode. Pass the same map used for `appendNoThinkingVariants`.
 */
export function appendClaudeEffortVariants<T extends CatalogModelEntry>(
  models: T[],
  aliasToCanonical?: Record<string, string>
): T[] {
  if (!Array.isArray(models)) return models;
  const variants: T[] = [];
  for (const model of models) {
    if (!shouldExposeClaudeEffortVariants(model)) continue;
    const rawId = model.id;
    const qualifiedId = aliasToCanonical ? normalizeProviderPrefix(rawId, aliasToCanonical) : rawId;
    const slash = qualifiedId.indexOf("/");
    const providerId = slash >= 0 ? qualifiedId.slice(0, slash) : "";
    const bareName = bareModelName(qualifiedId);
    for (const level of claudeEffortLevelsFor(providerId, bareName)) {
      const variantId = `${qualifiedId}-${level}`;
      // root stays UNPREFIXED (base root, or the bare model name, plus the suffix):
      // the provider-scoped models route uses `root` verbatim as the unprefixed id.
      const baseRoot = typeof model.root === "string" && model.root ? model.root : bareName;
      const variant: T = { ...model, id: variantId, root: `${baseRoot}-${level}` };
      if (typeof model.name === "string" && model.name) {
        variant.name = `${model.name} (${formatClaudeEffortLabel(level)})`;
      }
      variants.push(variant);
    }
  }
  return variants.length > 0 ? [...models, ...variants] : models;
}
