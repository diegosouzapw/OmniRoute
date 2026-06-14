/**
 * Deterministic naming helpers for quota virtual models (Phase B3).
 *
 * FORMAT: `qtSd/<groupSlug>/<provider>/<model>`
 *
 * The groupSlug is pure alphanumeric (no "-", no "/"), and the segments are
 * separated by "/" which makes parsing unambiguous: split on "/", take the
 * first 3 segments (prefix literal "qtSd", groupSlug, provider) and join the
 * remainder as the model id (model ids may contain "/" for namespaced models).
 */

export const QUOTA_MODEL_PREFIX = "qtSd/";

/**
 * Convert an arbitrary group name into a safe, alphanumeric slug.
 * Lowercases the name then strips every character that is not [a-z0-9].
 * Falls back to "pool" when the result would be empty.
 */
export function quotaGroupSlug(name: string): string {
  const slug = name.toLowerCase().replace(/[^a-z0-9]/g, "");
  return slug.length > 0 ? slug : "pool";
}

/**
 * Backward-compat alias: quotaPoolSlug delegates to quotaGroupSlug.
 * Callers in quotaKey.ts and quotaCombos.ts that import quotaPoolSlug
 * continue to work without changes until B4 updates them.
 */
export function quotaPoolSlug(poolName: string): string {
  return quotaGroupSlug(poolName);
}

/**
 * Build the canonical virtual model name for a quota-shared target.
 * The first argument is the GROUP name (phase B3+). Provider and model
 * are kept verbatim (not slugged).
 *
 * Example: quotaModelName("Pool Principal", "codex", "gpt-5.5")
 *          → "qtSd/poolprincipal/codex/gpt-5.5"
 */
export function quotaModelName(groupName: string, provider: string, model: string): string {
  return `${QUOTA_MODEL_PREFIX}${quotaGroupSlug(groupName)}/${provider}/${model}`;
}

/**
 * Parse a quota virtual model name back into its components.
 * Returns null when the name is not a valid quota model name.
 *
 * Segments: ["qtSd", groupSlug, provider, ...modelParts]
 * Requires at least 4 segments. Model is the remainder joined by "/".
 */
export function parseQuotaModelName(
  name: string,
): { groupSlug: string; provider: string; model: string } | null {
  if (!name.startsWith(QUOTA_MODEL_PREFIX)) {
    return null;
  }

  // rest = "<groupSlug>/<provider>/<model>" (after "qtSd/")
  const rest = name.slice(QUOTA_MODEL_PREFIX.length);
  const parts = rest.split("/");

  // Need at least: groupSlug, provider, model  → 3 parts in rest
  if (parts.length < 3) {
    return null;
  }

  const groupSlug = parts[0];
  const provider = parts[1];
  const model = parts.slice(2).join("/");

  if (groupSlug.length === 0 || provider.length === 0 || model.length === 0) {
    return null;
  }

  return { groupSlug, provider, model };
}

/**
 * Fast prefix check — does not validate the full structure.
 */
export function isQuotaModelName(name: string): boolean {
  return name.startsWith(QUOTA_MODEL_PREFIX);
}
