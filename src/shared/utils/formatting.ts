/**
 * Shared formatting utilities — DRY extraction from duplicated functions
 * across RequestLoggerV2.js, UsageAnalytics.js, ProxyLogger.js
 *
 * Prevents copy-paste duplication and provides a single source of truth.
 */

import { maskEmail } from "./maskEmail";

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
  if (emailsVisible) return account;
  const atIdx = account.indexOf("@");
  if (atIdx > 3) {
    return maskEmail(account);
  }
  if (account.length > 8) {
    return account.slice(0, 5) + "***";
  }
  return account;
}

export function stableAccountSuffix(account: string | null | undefined): string {
  if (!account || account === "-") return "0000";
  let hash = 0x811c9dc5;
  for (let i = 0; i < account.length; i++) {
    hash ^= account.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return hash.toString(16).padStart(8, "0").slice(0, 4);
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

/**
 * Format a reset countdown as a human-readable string: "2h 35m" or "4m 30s".
 * Returns null if resetAt is in the past or not set.
 *
 * Lives here (client-safe utils) — not in db/providers/rateLimit — so client
 * components can render a cooldown countdown without dragging the server-only
 * DB barrel (better-sqlite3/ioredis → node:net) into the browser bundle.
 * `rateLimit.ts` re-exports this for its server callers.
 */
export function formatResetCountdown(resetAt: string | number | null | undefined): string | null {
  if (!resetAt) return null;
  const resetTime = typeof resetAt === "number" ? resetAt : new Date(resetAt).getTime();
  if (isNaN(resetTime)) return null;
  const diffMs = resetTime - Date.now();
  if (diffMs <= 0) return null;
  const totalSeconds = Math.floor(diffMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  if (hours > 0) return `${hours}h ${minutes}m`;
  if (minutes > 0) return `${minutes}m ${seconds}s`;
  return `${seconds}s`;
}

/**
 * Coerces a persisted log `error` field into safe display text. It is
 * legitimate for this field to be a structured object (e.g. `{ code,
 * message }`) — only the RENDER needs to be a string, never the persisted
 * artifact itself. Used by RequestLoggerDetail to avoid React error #31
 * ("Objects are not valid as a React child") when rendering it. See #7845.
 */
export function formatErrorForDisplay(err: unknown): string | null {
  if (err == null) return null;
  if (typeof err === "string") return err;
  try {
    return JSON.stringify(err, null, 2);
  } catch {
    return String(err);
  }
}
