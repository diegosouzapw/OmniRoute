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
