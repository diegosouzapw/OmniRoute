/**
 * Antigravity (`antigravity` / `ag` / `agy`) serves Claude 5.x the way it serves
 * Gemini 3.8 Flash: every reasoning tier is its OWN upstream model id. The live
 * `:fetchAvailableModels` roster lists `claude-opus-5-5-low`, `claude-opus-5-5-medium`,
 * `claude-opus-5-5-high` (same for Sonnet 5.5) and no bare `claude-opus-5-5`.
 *
 * For these ids a trailing `-{low,medium,high}` is NOT a client-side effort variant:
 * `applyClaudeEffortVariant` stripping it dispatches the bare base id, which the
 * Cloud Code backend rejects (observed as `429 Resource has been exhausted` on every
 * account, even ones that never used Claude). Keep them literal.
 *
 * Claude 4.x Antigravity ids (`claude-opus-4-6-thinking`, `claude-sonnet-4-6`) carry
 * no tier suffix and are unaffected.
 */

const ANTIGRAVITY_PROVIDER_TOKENS = new Set(["antigravity", "ag", "agy"]);

// claude-<family>-<major>-<minor>-<tier>, major >= 5 (the generation that moved to
// per-tier upstream ids on Antigravity).
const ANTIGRAVITY_TIERED_CLAUDE_RE =
  /^claude-(?:opus|sonnet|haiku)-(?:[5-9]|\d{2,})-\d+-(?:low|medium|high)$/i;
// Same generation without a tier suffix (a hypothetical future bare id).
const ANTIGRAVITY_CLAUDE_5_BASE_RE = /^claude-(?:opus|sonnet|haiku)-(?:[5-9]|\d{2,})-\d+$/i;

function bareProviderToken(value: string): string {
  const slash = value.indexOf("/");
  return slash >= 0 ? value.slice(0, slash) : value;
}

function bareModelId(value: string): string {
  const slash = value.lastIndexOf("/");
  return slash >= 0 ? value.slice(slash + 1) : value;
}

/** True when `provider` (id, alias, or `provider/model`) is an Antigravity surface. */
export function isAntigravityProvider(provider: string | null | undefined): boolean {
  if (typeof provider !== "string" || provider.length === 0) return false;
  return ANTIGRAVITY_PROVIDER_TOKENS.has(bareProviderToken(provider).toLowerCase());
}

/**
 * True when `model` on `provider` is an Antigravity Claude id whose tier suffix is part
 * of the upstream model id and must be dispatched verbatim.
 */
export function isAntigravityLiteralTierModelId(
  provider: string | null | undefined,
  model: string | null | undefined
): boolean {
  if (!isAntigravityProvider(provider)) return false;
  if (typeof model !== "string" || model.length === 0) return false;
  return ANTIGRAVITY_TIERED_CLAUDE_RE.test(bareModelId(model));
}

/**
 * True when a catalog entry `<antigravity|ag|agy>/claude-<family>-<5+>-<minor>` must not
 * get synthesized `-<level>` effort variants. Antigravity publishes its tiers as real
 * catalog ids; synthesized ones would be dispatched verbatim (see above) and could name
 * ids that do not exist upstream (e.g. `-xhigh`).
 */
export function isAntigravityClaudeTierFamilyBase(qualifiedId: string): boolean {
  const slash = qualifiedId.indexOf("/");
  if (slash <= 0 || !isAntigravityProvider(qualifiedId.slice(0, slash))) return false;
  return ANTIGRAVITY_CLAUDE_5_BASE_RE.test(bareModelId(qualifiedId));
}
