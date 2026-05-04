/**
 * Shared formatting utilities — DRY extraction from duplicated functions
 * across RequestLoggerV2.js, UsageAnalytics.js, ProxyLogger.js
 *
 * Prevents copy-paste duplication and provides a single source of truth.
 */

/**
 * Format an ISO date string to a localized time string (HH:MM:SS).
 * @param {string} isoString - ISO 8601 date string
 * @returns {string}
 */
export function formatTime(isoString: string | null | undefined) {
  try {
    if (!isoString) return "-";
    const d = new Date(isoString);
    return d.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  } catch {
    return "-";
  }
}

/**
 * Format a duration in milliseconds to a human-readable string.
 * @param {number} ms - Duration in milliseconds
 * @returns {string} e.g., "42ms", "1.2s", "-"
 */
export function formatDuration(ms: number | null | undefined) {
  if (!ms) return "-";
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(1)}s`;
}

/**
 * Format an ISO date to a full date+time string (pt-BR locale).
 * @param {string} iso - ISO 8601 date string
 * @returns {string}
 */
export function formatDateTime(iso: string | null | undefined) {
  try {
    if (!iso) return "-";
    const d = new Date(iso);
    return d.toLocaleDateString("pt-BR") + ", " + d.toLocaleTimeString("en-US", { hour12: false });
  } catch {
    return iso;
  }
}

/**
 * Mask a string by showing only start and end characters.
 * @param {string} value - Value to mask
 * @param {number} start - Number of characters to show at start (default: 2)
 * @param {number} end - Number of characters to show at end (default: 2)
 * @returns {string}
 */
export function maskSegment(value: string | null | undefined, start = 2, end = 2) {
  if (!value) return "";
  if (value.length <= start + end) return `${value.slice(0, 1)}***`;
  return `${value.slice(0, start)}***${value.slice(-end)}`;
}

/**
 * Mask an email or account string for display.
 * @param {string} account - Account identifier (email or username)
 * @param {boolean} emailsVisible - Whether to show full email (true) or mask it (false)
 * @returns {string}
 */
export function maskAccount(account: string | null | undefined, emailsVisible: boolean) {
  if (!account || account === "-") return "-";
  const atIdx = account.indexOf("@");
  if (atIdx > 3) {
    if (emailsVisible) return account;
    return account.slice(0, 3) + "***" + account.slice(atIdx);
  }
  if (account.length > 8) {
    return account.slice(0, 5) + "***";
  }
  return account;
}

/**
 * Format an API key label, showing full name but masking the ID.
 * @param {string} apiKeyName - Human-readable name of the key
 * @param {string} apiKeyId - Unique ID of the key
 * @returns {string}
 */
export function formatApiKeyLabel(
  apiKeyName: string | null | undefined,
  apiKeyId: string | null | undefined
) {
  if (!apiKeyName && !apiKeyId) return "—";
  const displayName = apiKeyName || "key";
  if (!apiKeyId) return displayName;
  return `${displayName} (${maskSegment(apiKeyId, 4, 4)})`;
}

/**
 * Mask a sensitive key for log output.
 * @param {string} key - API key or token to mask
 * @returns {string}
 */
export function maskKey(key: string | null | undefined) {
  if (!key || key.length < 8) return "***";
  return `${key.slice(0, 4)}...${key.slice(-4)}`;
}

/**
 * Format large numbers with K/M/B suffixes.
 * @param {number} n - Number to format
 * @returns {string}
 */
export function fmtCompact(n: number | null | undefined) {
  if (n && n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
  if (n && n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n && n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return new Intl.NumberFormat().format(n || 0);
}

/**
 * Format a number with full locale formatting.
 * @param {number} n - Number to format
 * @returns {string}
 */
export function fmtFull(n: number | null | undefined) {
  return new Intl.NumberFormat().format(n || 0);
}

/**
 * Format a USD cost for display.
 * Sub-cent values show additional precision.
 * @param {number} usd - Cost in USD
 * @returns {string}
 */
export function formatCost(usd: number | null | undefined): string {
  const value = Number(usd || 0);
  if (!Number.isFinite(value) || value === 0) return "$0.00";
  if (value < 0.01) return `$${value.toFixed(6)}`;
  if (value < 1) return `$${value.toFixed(4)}`;
  return `$${value.toFixed(2)}`;
}

export const fmtCost = formatCost;

/**
 * Format a USD cost for display using abbreviated K/M/B/T suffixes.
 * Sub-cent values show additional precision.
 *   - Values >= 1T are shown as $X.XT
 *   - Values >= 1B are shown as $X.XB
 *   - Values >= 1M are shown as $X.XM
 *   - Values >= 1K are shown as $X.XK
 *   - Otherwise shown as $X.XX
 * @param {number} usd - Cost in USD
 * @returns {string}
 */
export function formatCostAbbreviated(usd: number | null | undefined): string {
  const value = Number(usd || 0);
  if (!Number.isFinite(value) || value === 0) return "$0";
  const abs = Math.abs(value);
  if (abs < 0.01) {
    if (value < 0) {
      return `-$${Math.abs(value).toFixed(6)}`;
    }
    return `$${value.toFixed(6)}`;
  }
  let divisor: number, suffix: string;
  if (abs >= 1_000_000_000_000) {
    divisor = 1_000_000_000_000;
    suffix = "T";
  } else if (abs >= 1_000_000_000) {
    divisor = 1_000_000_000;
    suffix = "B";
  } else if (abs >= 1_000_000) {
    divisor = 1_000_000;
    suffix = "M";
  } else if (abs >= 1_000) {
    divisor = 1_000;
    suffix = "K";
  } else {
    if (value < 0) {
      return `-$${Math.abs(value).toFixed(2)}`;
    }
    return `$${value.toFixed(2)}`;
  }
  const abbreviated = abs / divisor;
  let formatted = abbreviated.toFixed(1);
  if (formatted.includes(".")) {
    formatted = formatted.replace(/\.?0+$/, "");
  }
  const sign = value < 0 ? "-" : "";
  return `${sign}$${formatted}${suffix}`;
}

/**
 * Truncate a URL for compact display.
 * @param {string} url - Full URL
 * @param {number} max - Maximum characters (default: 50)
 * @returns {string}
 */
export function truncateUrl(url: string | null | undefined, max = 50) {
  if (!url) return "-";
  try {
    const parsed = new URL(url);
    const display = parsed.hostname + parsed.pathname;
    return display.length > max ? display.slice(0, max) + "…" : display;
  } catch {
    return url.length > max ? url.slice(0, max) + "…" : url;
  }
}

/**
 * Safely extract a finite number, returning undefined for invalid values.
 * Used by quota normalization in both backend (quotaCache) and frontend (ProviderLimits).
 */
export function safePercentage(value: unknown): number | undefined {
  return typeof value === "number" && isFinite(value) ? value : undefined;
}
