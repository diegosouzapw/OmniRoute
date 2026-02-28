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
export function formatTime(isoString) {
  try {
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
export function formatDuration(ms) {
  if (!ms) return "-";
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(1)}s`;
}

/**
 * Format an ISO date to a full date+time string (pt-BR locale).
 * @param {string} iso - ISO 8601 date string
 * @returns {string}
 */
export function formatDateTime(iso) {
  try {
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
export function maskSegment(value, start = 2, end = 2) {
  if (!value) return "";
  if (value.length <= start + end) return `${value.slice(0, 1)}***`;
  return `${value.slice(0, start)}***${value.slice(-end)}`;
}

/**
 * Mask an email or account string for display.
 * @param {string} account - Account identifier (email or username)
 * @returns {string}
 */
export function maskAccount(account) {
  if (!account || account === "-") return "-";
  const atIdx = account.indexOf("@");
  if (atIdx > 3) {
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
export function formatApiKeyLabel(apiKeyName, apiKeyId) {
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
export function maskKey(key) {
  if (!key || key.length < 8) return "***";
  return `${key.slice(0, 4)}...${key.slice(-4)}`;
}

/**
 * Format large numbers with K/M/B suffixes.
 * @param {number} n - Number to format
 * @returns {string}
 */
export function fmtCompact(n) {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return new Intl.NumberFormat().format(n || 0);
}

/**
 * Format a number with full locale formatting.
 * @param {number} n - Number to format
 * @returns {string}
 */
export function fmtFull(n) {
  return new Intl.NumberFormat().format(n || 0);
}

/**
 * Format a cost value with dollar sign.
 * @param {number} n - Cost value
 * @returns {string}
 */
export function fmtCost(n) {
  return `$${(n || 0).toFixed(2)}`;
}

/**
 * Truncate a URL for compact display.
 * @param {string} url - Full URL
 * @param {number} max - Maximum characters (default: 50)
 * @returns {string}
 */
export function truncateUrl(url, max = 50) {
  if (!url) return "-";
  try {
    const parsed = new URL(url);
    const display = parsed.hostname + parsed.pathname;
    return display.length > max ? display.slice(0, max) + "…" : display;
  } catch {
    return url.length > max ? url.slice(0, max) + "…" : url;
  }
}
