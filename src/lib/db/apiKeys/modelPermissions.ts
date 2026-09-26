import { modelPatternMatches } from "@/shared/utils/modelPermissionPatterns";
export {
  modelPatternMatches,
  matchesWildcardPattern,
  segmentMatchesWildcard,
} from "@/shared/utils/modelPermissionPatterns";

// API-key model-permission matching: Claude-Code alias/prefix resolution + wildcard/glob pattern
// matching used to decide whether a model is permitted for a key. Pure logic (no DB) extracted from
// db/apiKeys.ts (god-file decomposition); behavior is byte-identical to the original inline defs.

export const CLAUDE_CODE_PROVIDER_PREFIXES = new Set(["cc", "claude"]);

export const CLAUDE_CODE_SHORT_ALIASES = new Set(["sonnet", "opus", "haiku", "fable"]);

export function isTruthyEnvFlag(value: string | undefined): boolean {
  return typeof value === "string" && /^(1|true|yes|on)$/i.test(value.trim());
}

export async function preferClaudeCodeForUnprefixedClaudeModels(): Promise<boolean> {
  try {
    const { getCachedSettings } = await import("../readCache");
    const settings = await getCachedSettings();
    if (typeof settings.preferClaudeCodeForUnprefixedClaudeModels === "boolean") {
      return settings.preferClaudeCodeForUnprefixedClaudeModels;
    }
  } catch {
    // Standalone DB usage may not have the settings cache ready.
  }
  return isTruthyEnvFlag(process.env.OMNIROUTE_PREFER_CLAUDE_CODE_FOR_UNPREFIXED_CLAUDE_MODELS);
}

export function stripExtendedContextSuffix(modelId: string): string {
  return modelId.endsWith("[1m]") ? modelId.slice(0, -4) : modelId;
}

export function isPotentialUnprefixedClaudeCodeModel(modelId: string): boolean {
  const clean = stripExtendedContextSuffix(modelId.trim());
  return /^claude-/i.test(clean) || CLAUDE_CODE_SHORT_ALIASES.has(clean.toLowerCase());
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

export function hasClaudeCodeWildcardPermission(
  allowedModels: string[] | undefined,
  candidates: string[]
): boolean {
  if (!allowedModels || allowedModels.length === 0) return false;
  return allowedModels.some(
    (pattern) =>
      (pattern === "cc/*" || pattern === "claude/*") &&
      candidates.some((candidate) => modelPatternMatches(pattern, [candidate]))
  );
}
