/**
 * MCP Tool Cardinality Reduction — TV5 / F4.3
 *
 * Pure, stateless utility for reducing a tool manifest to the subset
 * permitted by a caller profile. Announcing fewer tools in the MCP
 * manifest saves tokens in the model's context window ("layer 5"
 * compression).
 *
 * ACTIVATION NOTE: The live MCP server registration loop in server.ts is
 * UNCHANGED by this file. This is a pure utility; wiring it into the server
 * startup path is a separate follow-up task. The default server behaviour
 * remains identical to before.
 *
 * Key rules for reduceToolManifest:
 *  1. A tool is kept if any of its scopes intersects `allowScopes` (when set).
 *  2. A tool listed in `allowTools` is always kept (regardless of scopes).
 *  3. A tool listed in `denyTools` is always removed (takes priority over
 *     both allowScopes and allowTools).
 *  4. When neither `allowScopes` nor `allowTools` is present the profile
 *     allows everything — the full manifest is returned unchanged.
 *  5. If `maxTools` is set the result is capped: allowTools-listed entries
 *     come first, then the remaining entries sorted by name. Deterministic.
 *  6. Input is never mutated.
 *  7. Return type mirrors the input type: array → array, object → object.
 */

import { estimateCompressionTokens } from "../services/compression/stats.ts";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/**
 * Minimal shape of an MCP tool manifest entry.
 * Structurally compatible with McpToolDefinition from schemas/tools.ts —
 * captures the fields needed for filtering; additional properties pass through.
 */
export interface ToolManifestEntry {
  /** MCP tool identifier */
  name: string;
  /** Human-readable description (used for token estimation) */
  description?: string;
  /** Required scopes for this tool. May be absent for tools that need no scope. */
  scopes?: readonly string[] | string[];
  /** Allow additional fields to pass through unchanged */
  [key: string]: unknown;
}

/**
 * A named profile that controls which tools are announced to a model.
 *
 * Filtering semantics:
 * - If neither `allowScopes` nor `allowTools` is set → keep everything.
 * - A tool is kept when:
 *     scope_intersection(tool.scopes, allowScopes) is non-empty
 *     OR tool.name is in allowTools
 * - Then denyTools removes named tools (deny beats allow).
 * - Finally, maxTools caps the count (allowTools entries are prioritised).
 */
export interface ToolProfile {
  /** Arbitrary label for logging/debugging */
  name: string;
  /**
   * Whitelist of scopes. A tool qualifies when any of its scopes appears here.
   * Supports wildcard suffix matching: "read:*" matches "read:x", "read:y", etc.
   */
  allowScopes?: readonly string[] | string[];
  /**
   * Explicit tool names that are always kept (regardless of scope).
   * Evaluated before denyTools.
   */
  allowTools?: readonly string[] | string[];
  /**
   * Tool names that are always removed. Takes priority over allowScopes and
   * allowTools.
   */
  denyTools?: readonly string[] | string[];
  /**
   * Maximum number of tools in the output. When set and the filtered set
   * exceeds this limit:
   *   1. allowTools-listed entries fill the cap first (in name order).
   *   2. Remaining slots are filled from the rest, sorted by name.
   * Deterministic: same input → same output.
   */
  maxTools?: number;
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Returns true when `grantedScope` covers `requiredScope`.
 * Mirrors the matching logic in scopeEnforcement.ts.
 */
function scopeMatches(grantedScope: string, requiredScope: string): boolean {
  if (grantedScope === "*" || grantedScope === requiredScope) {
    return true;
  }
  if (grantedScope.endsWith("*")) {
    const prefix = grantedScope.slice(0, -1);
    return requiredScope.startsWith(prefix);
  }
  return false;
}

/**
 * Returns true if any scope in `toolScopes` is covered by any scope in
 * `allowScopes`.
 */
function scopeIntersects(toolScopes: readonly string[], allowScopes: readonly string[]): boolean {
  for (const ts of toolScopes) {
    for (const as of allowScopes) {
      if (scopeMatches(as, ts)) {
        return true;
      }
    }
  }
  return false;
}

/**
 * Applies profile filtering to a flat array of entries.
 * Returns a new array (does not mutate input).
 */
function filterEntries(entries: ToolManifestEntry[], profile: ToolProfile): ToolManifestEntry[] {
  const allowScopes = profile.allowScopes ?? [];
  const allowTools = profile.allowTools ?? [];
  const denyTools = profile.denyTools ?? [];

  const denySet = new Set<string>(denyTools as string[]);
  const allowToolSet = new Set<string>(allowTools as string[]);

  // No filtering rules → return all entries unchanged.
  const hasFilter = allowScopes.length > 0 || allowTools.length > 0;

  // Step 1: filter by scope / explicit allow, then apply deny.
  const filtered = entries.filter((entry) => {
    // Deny always wins.
    if (denySet.has(entry.name)) return false;

    // No filter → keep everything.
    if (!hasFilter) return true;

    // Explicit allow-list overrides scope checks.
    if (allowToolSet.has(entry.name)) return true;

    // Scope intersection.
    if (allowScopes.length > 0 && (entry.scopes?.length ?? 0) > 0) {
      return scopeIntersects(entry.scopes as readonly string[], allowScopes as readonly string[]);
    }

    return false;
  });

  // Step 2: cap by maxTools. A negative max would silently drop tail entries via
  // slice(0, -n) — treat max < 0 as "no cap" (invalid-state guard).
  const max = profile.maxTools;
  if (max === undefined || max < 0 || filtered.length <= max) {
    return filtered;
  }

  // Priority ordering: allowTools-listed entries first (by name asc),
  // then the rest by name asc. Both groups are sorted for determinism.
  const prioritised = filtered
    .filter((e) => allowToolSet.has(e.name))
    .sort((a, b) => a.name.localeCompare(b.name));

  const rest = filtered
    .filter((e) => !allowToolSet.has(e.name))
    .sort((a, b) => a.name.localeCompare(b.name));

  return [...prioritised, ...rest].slice(0, max);
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Reduce a tool manifest according to the given profile.
 *
 * Overloads preserve the return shape: array → array, Record → Record.
 */
export function reduceToolManifest(
  manifest: ToolManifestEntry[],
  profile: ToolProfile
): ToolManifestEntry[];
export function reduceToolManifest(
  manifest: Record<string, ToolManifestEntry>,
  profile: ToolProfile
): Record<string, ToolManifestEntry>;
export function reduceToolManifest(
  manifest: ToolManifestEntry[] | Record<string, ToolManifestEntry>,
  profile: ToolProfile
): ToolManifestEntry[] | Record<string, ToolManifestEntry> {
  if (Array.isArray(manifest)) {
    return filterEntries(manifest, profile);
  }

  // Object/Record variant: convert → filter → convert back.
  const entries = Object.values(manifest);
  const filtered = filterEntries(entries, profile);
  return Object.fromEntries(filtered.map((e) => [e.name, e]));
}

/**
 * Rough token estimate for a tool manifest.
 *
 * Delegates to `estimateCompressionTokens` from the existing compression
 * stats module (chars / 4 ceiling). Accepts both array and Record forms.
 */
export function estimateManifestTokens(
  manifest: ToolManifestEntry[] | Record<string, ToolManifestEntry>
): number {
  const entries = Array.isArray(manifest) ? manifest : Object.values(manifest);
  if (entries.length === 0) return 0;

  return entries.reduce((sum, entry) => {
    const nameTokens = estimateCompressionTokens(entry.name);
    const descTokens = estimateCompressionTokens(entry.description ?? "");
    return sum + nameTokens + descTokens;
  }, 0);
}
