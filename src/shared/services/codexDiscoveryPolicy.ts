/** Exact Codex model ids retired after discovery merge. */
export const CODEX_DISCOVERY_EXCLUDED_IDS: ReadonlySet<string> = new Set([
  // Reserved for one-off retired ids that do not share a clean prefix family.
]);

/**
 * Codex model-id families retired after discovery merge. Delimiter-aware
 * matching prevents prefixes such as `gpt-5.40` from being removed.
 */
export const CODEX_DISCOVERY_EXCLUDED_ID_PREFIXES: readonly string[] = ["gpt-5.4"];

export type CodexDiscoveryModelIdentity = {
  id?: unknown;
};

export function isCodexDiscoveryModelExcluded(model: CodexDiscoveryModelIdentity): boolean {
  const id = typeof model?.id === "string" ? model.id.trim().toLowerCase() : "";
  if (!id) return true;
  if (CODEX_DISCOVERY_EXCLUDED_IDS.has(id)) return true;

  return CODEX_DISCOVERY_EXCLUDED_ID_PREFIXES.some((prefix) => {
    const normalizedPrefix = prefix.toLowerCase();
    return (
      id === normalizedPrefix ||
      id.startsWith(`${normalizedPrefix}-`) ||
      id.startsWith(`${normalizedPrefix}_`) ||
      id.startsWith(`${normalizedPrefix}.`)
    );
  });
}
