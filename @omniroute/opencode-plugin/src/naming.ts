/**
 * Universal model naming template for the OmniRoute plugin.
 *
 * Naming pipeline:
 *   [tag] <provider-label><separator><display-name><suffix>
 *
 *   [Free] <provider> - <name> · <budget>     ← free model
 *   Auto: <variant> (<N>p)                     ← auto combo
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

// ── Auto Combo Types ─────────────────────────────────────────────────────

export type AutoVariant =
  | "coding"
  | "fast"
  | "cheap"
  | "offline"
  | "smart"
  | "lkgp";

export const AUTO_VARIANTS: AutoVariant[] = [
  "coding",
  "fast",
  "cheap",
  "offline",
  "smart",
  "lkgp",
];

export const AUTO_VARIANT_DESCRIPTIONS: Record<
  AutoVariant | "default",
  string
> = {
  default: "Best provider via scoring",
  coding: "Quality-first for code tasks",
  fast: "Latency-optimized routing",
  cheap: "Cost-optimized routing",
  offline: "Offline-friendly providers",
  smart: "Quality-first with exploration",
  lkgp: "Last-Known-Good-Provider routing",
};

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
  enrichment:
    | { providerDisplayName?: string; providerAlias?: string }
    | undefined,
): string | undefined {
  if (!enrichment) return undefined;
  const raw =
    typeof enrichment.providerDisplayName === "string"
      ? enrichment.providerDisplayName.trim()
      : "";
  if (raw.length > 0 && raw.length <= PROVIDER_LABEL_MAX_CHARS) return raw;
  const alias =
    typeof enrichment.providerAlias === "string"
      ? enrichment.providerAlias.trim()
      : "";
  if (alias.length > 0) {
    return alias.length <= ALIAS_UPPER_MAX_CHARS
      ? alias.toUpperCase()
      : titleCaseAlias(alias);
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

function fmtTokens(n: number): string {
  if (n >= 1e9) return (n / 1e9).toFixed(1).replace(/\.0$/, "") + "B";
  if (n >= 1e6) return (n / 1e6).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1e3) return (n / 1e3).toFixed(1).replace(/\.0$/, "") + "K";
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

// ── Auto Combo Naming ─────────────────────────────────────────────────────

/**
 * Format auto combo display name.
 *
 * "Auto: Coding (4p)"
 * "Auto: Default (6p)"
 * "Auto" (no candidate count when unknown)
 */
export function formatAutoComboName(
  variant: AutoVariant | undefined,
  candidateCount?: number,
): string {
  const label = variant
    ? variant.charAt(0).toUpperCase() + variant.slice(1)
    : "Default";
  const count =
    typeof candidateCount === "number" && candidateCount > 0
      ? ` (${candidateCount}p)`
      : "";
  return `Auto: ${label}${count}`;
}

/**
 * Build the model ID for an auto combo entry.
 * "auto/coding", "auto/fast", "auto" (default).
 */
export function autoComboModelId(variant: AutoVariant | undefined): string {
  return variant ? `auto/${variant}` : "auto";
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
  /** Whether this is an auto combo entry. */
  isAutoCombo?: boolean;
  /** Auto combo variant. */
  autoVariant?: AutoVariant;
  /** Auto combo candidate count. */
  autoCandidateCount?: number;
}

/**
 * Build the final display name following the universal template.
 *
 * Priority:
 *   1. Auto combo → "Auto: <variant> (<N>p)"
 *   2. DB combo → "Combo: <name>"
 *   3. Free + enrichment + provider tag → "[Free] <label> - <name> · <budget>"
 *   4. Free + enrichment → "[Free] <name> · <budget>"
 *   5. Free + raw → "[Free] <rawId> · <budget>"
 *   6. Enrichment + provider tag → "<label> - <name>"
 *   7. Enrichment only → "<name>"
 *   8. Raw fallback → normaliseFreeLabel(rawId)
 */
export function buildModelDisplayName(params: ModelDisplayNameParams): string {
  // Auto combos
  if (params.isAutoCombo) {
    return formatAutoComboName(params.autoVariant, params.autoCandidateCount);
  }

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
