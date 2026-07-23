/**
 * CLI access-token scopes — the 3-level hierarchy used by remote mode.
 *
 * These tokens authorize the `omniroute` CLI (and dashboard) to run *management*
 * commands against a (possibly remote) OmniRoute server. They are distinct from
 * inference API keys (`api_keys`), which authorize `/v1/chat/completions` traffic.
 *
 * Hierarchy (admin ⊃ write ⊃ read):
 *   - read  : list/inspect only (models list, providers status, logs, usage, cost)
 *   - write : read + configure/apply (setup-codex, keys add, config set, combo edit)
 *   - admin : write + sensitive management (tokens create/revoke, providers add,
 *             services install/start, policy, oauth)
 *
 * Loopback-only routes that spawn processes (`isLocalOnlyPath`) are NEVER reachable
 * by a remote token regardless of scope — that enforcement happens before auth.
 */

export const ACCESS_SCOPES = ["read", "write", "admin"] as const;

export type AccessScope = (typeof ACCESS_SCOPES)[number];

/** Numeric rank for hierarchy comparisons. Higher = more privileged. */
const SCOPE_RANK: Record<AccessScope, number> = {
  read: 1,
  write: 2,
  admin: 3,
};

/** Type guard: is `value` one of the three valid scopes? */
export function isAccessScope(value: unknown): value is AccessScope {
  return typeof value === "string" && (ACCESS_SCOPES as readonly string[]).includes(value);
}

/**
 * True when a token holding `have` is allowed to perform an action that requires
 * `need`. Hierarchy is inclusive: an `admin` token satisfies `write` and `read`;
 * a `write` token satisfies `read`. Unknown scopes never satisfy anything.
 */
export function scopeSatisfies(have: unknown, need: AccessScope): boolean {
  if (!isAccessScope(have)) return false;
  return SCOPE_RANK[have] >= SCOPE_RANK[need];
}

/**
 * Normalize an arbitrary input into a valid scope, falling back to the safest
 * default (`read`) when the value is missing or invalid. Used when reading a
 * stored/declared scope that must never silently widen privileges.
 */
export function normalizeScope(value: unknown, fallback: AccessScope = "read"): AccessScope {
  return isAccessScope(value) ? value : fallback;
}
