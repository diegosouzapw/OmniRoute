import { formatQuotaLabel } from "./utils";

/**
 * Per-provider column schema for the grouped Provider Quota layout.
 *
 * Each entry lists the canonical quota keys we want to surface as
 * fixed-width table columns. Matching is done both exact (by `quota.name`)
 * and via the normalized label (so MiniMax's `"session (5h)"` still lands in
 * the `"session"` column).
 *
 * Providers not listed here fall back to a dynamic schema: take the first
 * `MAX_DYNAMIC_COLUMNS` quotas in the order returned by `parseQuotaData()`
 * and surface them as columns; everything else becomes "+N more".
 */
const PROVIDER_COLUMNS: Record<string, string[]> = {
  codex: ["session", "weekly"],
  claude: ["session", "weekly"],
  glm: ["session", "weekly", "mcp_monthly"],
  "glm-cn": ["session", "weekly", "mcp_monthly"],
  glmt: ["session", "weekly", "mcp_monthly"],
  zai: ["session", "weekly", "mcp_monthly"],
  github: ["chat", "completions", "premium_interactions"],
  minimax: ["session"],
  "minimax-cn": ["session"],
  "kimi-coding": ["session", "weekly"],
};

/** Hard cap for the dynamic schema (Antigravity and fallback providers). */
export const MAX_DYNAMIC_COLUMNS = 3;

export interface ResolvedColumn {
  /** Stable column key — used for React keys and column-picker state. */
  key: string;
  /** Human-readable header label. */
  label: string;
  /** The matching quota for this account, or `null` if the account
   *  doesn't expose that window. Rendered as an em-dash cell in the UI. */
  quota: any | null;
}

export interface ResolvedSchema {
  columns: ResolvedColumn[];
  /** Quotas present on the account but not surfaced as columns.
   *  Rendered as "+N more" in the row's trailing cell. */
  overflowCount: number;
}

function matchQuotaByKey(quotas: any[], key: string): any | null {
  // Exact match on quota.name first
  const exact = quotas.find(
    (q) => q && typeof q.name === "string" && q.name.toLowerCase() === key.toLowerCase()
  );
  if (exact) return exact;
  // Then exact match on modelKey (for antigravity etc.)
  const byModel = quotas.find(
    (q) => q && typeof q.modelKey === "string" && q.modelKey.toLowerCase() === key.toLowerCase()
  );
  if (byModel) return byModel;
  // Finally, normalized label match — handles "session (5h)" → "session"
  const normalized = formatQuotaLabel(key).toLowerCase();
  return (
    quotas.find(
      (q) =>
        q && typeof q.name === "string" && formatQuotaLabel(q.name).toLowerCase() === normalized
    ) || null
  );
}

/**
 * Resolve which columns to render for a given (provider, quotas) pair.
 *
 * - Named providers: use the static schema; missing windows render as `null`.
 * - Unknown providers: take the first N non-credit quotas in array order.
 * - Credits (`isCredits === true`) are never used as columns — they render
 *   in the overflow tooltip / expanded panel as a balance, not as a %.
 */
export function getProviderColumns(provider: string, quotas: any[] = []): ResolvedSchema {
  const safe = Array.isArray(quotas) ? quotas : [];
  const nonCredits = safe.filter((q) => q && !q.isCredits);
  const credits = safe.filter((q) => q && q.isCredits);
  const named = PROVIDER_COLUMNS[String(provider || "").toLowerCase()];

  if (named && named.length > 0) {
    const columns: ResolvedColumn[] = named.map((key) => ({
      key,
      label: formatQuotaLabel(key),
      quota: matchQuotaByKey(nonCredits, key),
    }));
    const matchedQuotas = new Set(columns.map((c) => c.quota).filter(Boolean));
    const overflowCount = nonCredits.filter((q) => !matchedQuotas.has(q)).length + credits.length;
    return { columns, overflowCount };
  }

  // Dynamic schema — take the first N non-credit quotas in array order
  const visible = nonCredits.slice(0, MAX_DYNAMIC_COLUMNS);
  const columns: ResolvedColumn[] = visible.map((q) => ({
    key: q.modelKey || q.name,
    label: q.displayName || formatQuotaLabel(q.name),
    quota: q,
  }));
  const overflowCount = Math.max(0, nonCredits.length - visible.length) + credits.length;
  return { columns, overflowCount };
}

/**
 * Group a flat list of connection objects by their `provider` key.
 * Preserves the input order (the upstream sort by status + soonest reset is
 * meaningful inside each group; the provider order itself is controlled by
 * the caller via `PROVIDER_ORDER` in index.tsx).
 */
export function groupConnectionsByProvider<T extends { provider: string }>(
  connections: T[]
): Map<string, T[]> {
  const groups = new Map<string, T[]>();
  for (const conn of connections) {
    const key = conn.provider || "unknown";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(conn);
  }
  return groups;
}
