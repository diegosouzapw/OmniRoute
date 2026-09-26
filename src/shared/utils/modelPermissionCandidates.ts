// Pure candidate-building helpers for API-key model permissions. They carry no DB or server
// dependency, so the dashboard can build the same candidate ids the server checks.
// src/lib/db/apiKeys/modelPermissions.ts re-exports them for the server-side callers.

export const CLAUDE_CODE_PROVIDER_PREFIXES = new Set(["cc", "claude"]);

export function stripExtendedContextSuffix(modelId: string): string {
  return modelId.endsWith("[1m]") ? modelId.slice(0, -4) : modelId;
}

export function addModelCandidate(candidates: Set<string>, modelId: string): void {
  const clean = modelId.trim();
  if (!clean) return;
  candidates.add(clean);
  candidates.add(stripExtendedContextSuffix(clean));
}

/**
 * Expand provider-scoped model ids with canonical provider id + public alias forms
 * (e.g. codex/gpt-5.6-terra ↔ cx/gpt-5.6-terra) so API-key allow/block patterns match
 * dashboard restrictions regardless of which prefix the client sends.
 */
export function addProviderAliasScopedCandidates(
  candidates: Set<string>,
  providerOrAlias: string,
  providerScopedModel: string,
  resolveProviderId: (aliasOrId: string) => string,
  getProviderAlias: (providerId: string) => string
): void {
  if (!providerScopedModel) return;
  const canonicalId = resolveProviderId(providerOrAlias);
  const alias = getProviderAlias(canonicalId);
  if (canonicalId !== providerOrAlias) {
    addModelCandidate(candidates, `${canonicalId}/${providerScopedModel}`);
  }
  if (alias !== providerOrAlias && alias !== canonicalId) {
    addModelCandidate(candidates, `${alias}/${providerScopedModel}`);
  }
}
