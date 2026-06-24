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

export function modelPatternMatches(pattern: string, candidates: string[]): boolean {
  for (const candidate of candidates) {
    if (pattern === candidate) return true;
    if (pattern.endsWith("/*")) {
      const prefix = pattern.slice(0, -2);
      if (candidate.startsWith(prefix + "/") || candidate.startsWith(prefix)) {
        return true;
      }
    }
    if (pattern.includes("*") && matchesWildcardPattern(pattern, candidate)) {
      return true;
    }
  }
  return false;
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

/**
 * Match an API-key wildcard scope pattern against a model id without
 * compiling a RegExp from string concatenation (avoid ReDoS exposure on
 * operator-supplied patterns and silence the Semgrep `js/regex-injection`
 * advisory for `new RegExp(<dynamic>)`).
 *
 * Supported pattern syntax (only what real scopes use):
 *   - literal segments
 *   - `*` matches any run of characters, but does NOT cross `/`
 *
 * Walks the pattern token-by-token: each `*` consumes the longest possible
 * run within the current path segment, then the next literal anchor must
 * appear before the segment boundary. Worst-case complexity is O(n*m)
 * where n = pattern length, m = candidate length — there is no nested
 * backtracking that could explode adversarially.
 */
export function matchesWildcardPattern(pattern: string, candidate: string): boolean {
  const pSegs = pattern.split("/");
  const cSegs = candidate.split("/");
  if (pSegs.length !== cSegs.length) return false;
  for (let i = 0; i < pSegs.length; i++) {
    if (!segmentMatchesWildcard(pSegs[i], cSegs[i])) return false;
  }
  return true;
}

export function segmentMatchesWildcard(pattern: string, segment: string): boolean {
  if (pattern === segment) return true;
  if (!pattern.includes("*")) return false;
  const parts = pattern.split("*");
  // Anchor first literal to the start.
  let cursor = 0;
  const first = parts[0];
  if (first) {
    if (!segment.startsWith(first)) return false;
    cursor = first.length;
  }
  // Anchor last literal to the end.
  const last = parts[parts.length - 1];
  const endLimit = segment.length - last.length;
  if (last) {
    if (!segment.endsWith(last)) return false;
  }
  // Each middle literal must appear in order between cursor and endLimit.
  for (let i = 1; i < parts.length - 1; i++) {
    const piece = parts[i];
    if (!piece) continue;
    const idx = segment.indexOf(piece, cursor);
    if (idx === -1 || idx + piece.length > endLimit) return false;
    cursor = idx + piece.length;
  }
  return cursor <= endLimit;
}
