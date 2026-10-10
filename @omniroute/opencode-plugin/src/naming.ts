/**
 * Universal model naming template for the OmniRoute plugin.
 *
 * Naming pipeline:
 *   [tag] <provider-label><separator><display-name><suffix>
 *
 *   [Free] <provider> - <name> · <budget>     ← free model
 *   Combo: <name>                              ← DB combo
 *   <provider> - <name>                        ← regular model
 */

// ── Constants ────────────────────────────────────────────────────────────

/** Separator between provider label and model display name. */
export const PROVIDER_TAG_SEPARATOR = " - ";

/** Threshold beyond which providerDisplayName is abbreviated. */
const PROVIDER_LABEL_MAX_CHARS = 12;

/** Aliases longer than this get title-case instead of UPPER. */
const ALIAS_UPPER_MAX_CHARS = 5;

// ── Free Model Types ─────────────────────────────────────────────────────

export type FreeModelFreeType =
  | "recurring-daily"
  | "recurring-monthly"
  | "recurring-credit"
  | "one-time-initial"
  | "keyless"
  | "discontinued";

// ── Provider Label ────────────────────────────────────────────────────────

/**
 * Title-case a long, lowercase-looking alias.
 * `antigravity` → `Antigravity`
 */
function titleCaseAlias(alias: string): string {
  if (alias.length === 0) return alias;
  return alias.charAt(0).toUpperCase() + alias.slice(1).toLowerCase();
}

/**
 * Pick the short label for an upstream provider.
 *
 * Rules:
 *   1. Trim `providerDisplayName`. If ≤12 chars → use verbatim.
 *   2. Alias ≤5 chars → UPPER(alias). Alias >5 → titleCase.
 *   3. Neither → undefined.
 */
export function shortProviderLabel(
  enrichment: { providerDisplayName?: string; providerAlias?: string } | undefined
): string | undefined {
  if (!enrichment) return undefined;
  const raw =
    typeof enrichment.providerDisplayName === "string" ? enrichment.providerDisplayName.trim() : "";
  if (raw.length > 0 && raw.length <= PROVIDER_LABEL_MAX_CHARS) return raw;
  const alias = typeof enrichment.providerAlias === "string" ? enrichment.providerAlias.trim() : "";
  if (alias.length > 0) {
    return alias.length <= ALIAS_UPPER_MAX_CHARS ? alias.toUpperCase() : titleCaseAlias(alias);
  }
  // Long displayName with no alias to fall back on: keep the long label
  // rather than dropping the provider prefix entirely.
  return raw.length > 0 ? raw : undefined;
}

// ── Free Label ────────────────────────────────────────────────────────────

/**
 * Normalise display name so free-tier models get a consistent `[Free] ` prefix.
 *
 * "GPT-4.1 (Free)"          → "[Free] GPT-4.1"
 * "DeepSeek V4 Flash Free"  → "[Free] DeepSeek V4 Flash"
 * "Claude Opus 4.7"         → "Claude Opus 4.7"  (unchanged)
 */
export function normaliseFreeLabel(name: string): string {
  // Bounded whitespace quantifiers ({0,8}/{1,8}) avoid the polynomial-ReDoS
  // backtracking that unbounded \s* before an anchored \s*$ would allow on
  // attacker-influenced display names. 8 covers any realistic label spacing.
  const cleaned = name
    .replace(/\s{0,8}\(free\)\s{0,8}$/i, "")
    .replace(/[\s-]{1,8}free\s{0,8}$/i, "")
    .trim();
  const wasFree = cleaned.length < name.trim().length;
  if (!wasFree) return name;
  return `[Free] ${cleaned}`;
}

// ── Free Budget Formatting ────────────────────────────────────────────────

/** Scales, largest first, so the unit is chosen by descending magnitude. */
const TOKEN_UNITS = [
  [1e9, "B"],
  [1e6, "M"],
  [1e3, "K"],
] as const;

/**
 * Format a token count as a short magnitude string: `25M`, `1.5K`, `999`.
 *
 * The unit has to be picked from the value that will actually be *printed*,
 * not from the raw input. `toFixed(1)` rounds to the nearest tenth, so at the
 * K scale 999_950 and above render as `1000.0` — and by then the M branch has
 * already been skipped, producing `1000K` for a number that is `1M`. The same
 * carry turns just under a billion into `1000M`. When the rounded value reaches
 * the next scale, re-render at that scale instead.
 */
function fmtTokens(n: number): string {
  for (let i = 0; i < TOKEN_UNITS.length; i++) {
    const [scale, suffix] = TOKEN_UNITS[i]!;
    if (n < scale) continue;
    const value = Number((n / scale).toFixed(1));
    // `Number()` also drops a trailing `.0`, which the previous regex did.
    if (value < 1000 || i === 0) return `${value}${suffix}`;
    const [nextScale, nextSuffix] = TOKEN_UNITS[i - 1]!;
    return `${Number((n / nextScale).toFixed(1))}${nextSuffix}`;
  }
  return String(n);
}

/**
 * Format a free model budget into a short human-readable suffix.
 *
 * recurring-daily   → "25M tokens/day"
 * recurring-monthly → "25M tokens/month"
 * recurring-credit  → "10M credits"
 * one-time-initial  → "1M credits (one-time)"
 * keyless           → "(keyless)"
 * discontinued      → "(discontinued)"
 */
export function formatFreeBudget(params: {
  freeType: FreeModelFreeType;
  monthlyTokens?: number;
  creditTokens?: number;
}): string {
  const { freeType, monthlyTokens = 0, creditTokens = 0 } = params;

  switch (freeType) {
    case "recurring-daily":
      return `${fmtTokens(monthlyTokens)} tokens/day`;
    case "recurring-monthly":
      return `${fmtTokens(monthlyTokens)} tokens/month`;
    case "recurring-credit":
      return `${fmtTokens(creditTokens)} credits`;
    case "one-time-initial":
      return `${fmtTokens(creditTokens)} credits (one-time)`;
    case "keyless":
      return "(keyless)";
    case "discontinued":
      return "(discontinued)";
    default:
      return "";
  }
}

// ── Universal Display Name Builder ────────────────────────────────────────

export interface ModelDisplayNameParams {
  /** Raw model ID (e.g. "cc/claude-sonnet-4-6"). */
  rawId: string;
  /** Enrichment display name (e.g. "Claude Sonnet 4.6"). */
  enrichmentName?: string;
  /** Provider tag enrichment. */
  providerAlias?: string;
  /** Human-readable upstream provider label. */
  providerDisplayName?: string;
  /** Whether model is free tier. */
  isFree?: boolean;
  /** Free model budget info. */
  freeType?: FreeModelFreeType;
  /** Monthly token budget (for recurring free models). */
  monthlyTokens?: number;
  /** Credit token budget (for credit-based free models). */
  creditTokens?: number;
  /** Whether this is a combo entry (skip provider tag). */
  isCombo?: boolean;
}

/**
 * Build the final display name following the universal template.
 *
 * Priority:
 *   1. DB combo → "Combo: <name>"
 *   2. Free + enrichment + provider tag → "[Free] <label> - <name> · <budget>"
 *   3. Free + enrichment → "[Free] <name> · <budget>"
 *   4. Free + raw → "[Free] <rawId> · <budget>"
 *   5. Enrichment + provider tag → "<label> - <name>"
 *   6. Enrichment only → "<name>"
 *   7. Raw fallback → normaliseFreeLabel(rawId)
 */
export function buildModelDisplayName(params: ModelDisplayNameParams): string {
  // Determine base name — strip any existing free suffix first
  const rawBase =
    params.enrichmentName && params.enrichmentName.trim().length > 0
      ? params.enrichmentName
      : params.rawId;
  const cleanedBase = rawBase
    .replace(/\s*\(free\)\s*$/i, "")
    .replace(/[\s-]+free\s*$/i, "")
    .trim();
  const wasFree = cleanedBase.length < rawBase.trim().length;
  const isFree = !!params.isFree || wasFree;

  let baseName = cleanedBase;

  // Provider tag (skip for combos)
  if (!params.isCombo) {
    const label = shortProviderLabel({
      providerDisplayName: params.providerDisplayName,
      providerAlias: params.providerAlias,
    });
    if (label) {
      const prefix = `${label}${PROVIDER_TAG_SEPARATOR}`;
      if (!baseName.startsWith(prefix)) {
        baseName = `${prefix}${baseName}`;
      }
    }
  }

  // Prepend [Free] if applicable (AFTER provider tag for correct ordering)
  if (isFree) {
    baseName = `[Free] ${baseName}`;
  }

  // Free budget suffix
  if (isFree && params.freeType) {
    const budget = formatFreeBudget({
      freeType: params.freeType,
      monthlyTokens: params.monthlyTokens,
      creditTokens: params.creditTokens,
    });
    if (budget) {
      baseName = `${baseName} · ${budget}`;
    }
  }

  return baseName;
}
