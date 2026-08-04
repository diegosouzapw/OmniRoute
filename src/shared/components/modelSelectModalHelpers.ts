// Pure helpers extracted from ModelSelectModal so the grouping logic is
// unit-testable (the component itself lives inside a useMemo and is not
// directly exercisable by node:test). Keep these free of React imports.

export type PassthroughAliasModel = {
  id: string;
  name: string;
  value: string;
  source: "alias";
};

/**
 * Build the alias-derived model rows for a passthrough provider.
 *
 * `modelAliases` maps an alias name → the fully-qualified model string, which
 * is prefixed by the provider's *canonical id* (e.g. `github/gpt-4`), NOT by
 * its public alias (e.g. `gh`). Filtering/stripping must therefore use the
 * `providerId`, mirroring the sibling custom-provider branch. Using the alias
 * here meant aliases registered under a providerId whose alias differs (the
 * common case) never resolved.
 *
 * Inspired by upstream PR decolua/9router#485 (Anurag Saxena).
 */
export function buildPassthroughAliasModels(
  modelAliases: Record<string, string>,
  providerId: string
): PassthroughAliasModel[] {
  const prefix = `${providerId}/`;
  return Object.entries(modelAliases || {})
    .filter(([, fullModel]) => typeof fullModel === "string" && fullModel.startsWith(prefix))
    .map(([aliasName, fullModel]) => ({
      id: fullModel.replace(prefix, ""),
      name: aliasName,
      value: fullModel,
      source: "alias" as const,
    }));
}

export type NodeAliasModel = {
  id: string;
  name: string;
  value: string;
  source: "alias";
};

/**
 * Build the alias-derived model rows for a custom-provider ("node") entry.
 *
 * Mirrors `buildPassthroughAliasModels` above but rewrites `value` using the
 * node's display `nodePrefix` instead of the raw `providerId` (custom
 * providers are keyed by their canonical id/UUID in `modelAliases`, but
 * displayed/selected using a node-specific prefix).
 *
 * `modelAliases` values can be `null`/`undefined` for stale or partial
 * entries persisted to settings, so this guards with `typeof fullModel ===
 * "string"` before calling `.startsWith` — without it, opening Create Combo
 * for a custom provider node throws a TypeError.
 *
 * Inspired by upstream PR decolua/9router#2247 (wahyuzero).
 */
export function buildNodeAliasModels(
  modelAliases: Record<string, string>,
  providerId: string,
  nodePrefix: string
): NodeAliasModel[] {
  const prefix = `${providerId}/`;
  return Object.entries(modelAliases || {})
    .filter(([, fullModel]) => typeof fullModel === "string" && fullModel.startsWith(prefix))
    .map(([aliasName, fullModel]) => ({
      id: fullModel.replace(prefix, ""),
      name: aliasName,
      value: `${nodePrefix}/${fullModel.replace(prefix, "")}`,
      source: "alias" as const,
    }));
}

/**
 * "Select all" adds every currently-visible model to the combo in one click,
 * with no cap — turning off "Show configured only" (or just having a large
 * provider catalog) can put hundreds of candidates behind a single click.
 * Above this threshold the caller must confirm before batch-adding (#8526).
 *
 * A native `confirm()` — not a bespoke modal — matches the existing bulk /
 * destructive-action pattern already used in this codebase (e.g.
 * `ReasoningRoutingRules.tsx::deleteConfirm`, `combos/page.tsx::deleteConfirm`),
 * so no new UI primitive is needed for this one interaction.
 */
export const SELECT_ALL_CONFIRM_THRESHOLD = 20;

export function shouldConfirmSelectAll(
  candidateCount: number,
  threshold: number = SELECT_ALL_CONFIRM_THRESHOLD
): boolean {
  return Number.isFinite(candidateCount) && candidateCount > threshold;
}
