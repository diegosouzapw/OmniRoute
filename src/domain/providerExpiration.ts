/**
 * Provider Expiration Tracking
 *
 * Tracks OAuth token, subscription, and API credit expiration dates
 * per provider connection. Provides proactive alerts before expiration
 * so operators can re-authenticate or renew before failures occur.
 *
 * Prevents the common failure mode where an OAuth token or subscription
 * expires silently and requests start failing with 401/402 errors.
 */

/** Types of expiration events */
export type ExpiryType = "oauth_token" | "subscription" | "api_credits" | "free_tier_reset";

/** Status derived from expiration date */
export type ExpiryStatus = "active" | "expiring_soon" | "expired" | "unknown";

/** Tracked expiration for a provider connection */
export interface ProviderExpiration {
  /** Connection ID (matches ProviderConnection.id) */
  connectionId: string;
  /** Provider name (e.g., "claude", "codex", "gemini-cli") */
  provider: string;
  /** Human-readable connection name */
  connectionName: string;
  /** ISO date when the credential expires (null = unknown) */
  expiresAt: string | null;
  /** Type of expiration */
  expiryType: ExpiryType;
  /** Days before expiry to trigger alert (default: 7) */
  alertDays: number;
  /** ISO date of last verification */
  lastChecked: string;
  /** Current status */
  status: ExpiryStatus;
  /** Optional note (e.g., "Membership expired, needs re-auth on dashboard") */
  note: string | null;
}

/** Summary of provider expiration health */
export interface ExpirationSummary {
  total: number;
  active: number;
  expiringSoon: number;
  expired: number;
  unknown: number;
  nextExpiration: ProviderExpiration | null;
}

// ── In-memory store ──────────────────────────────────────────────────────────
// In production, this would be persisted to SQLite alongside other domain state.
// Using in-memory Map for the initial implementation.

const expirations = new Map<string, ProviderExpiration>();

/**
 * Calculate expiry status from an expiration date.
 */
function calculateStatus(expiresAt: string | null, alertDays: number): ExpiryStatus {
  if (!expiresAt) return "unknown";

  const now = new Date();
  const expiry = new Date(expiresAt);

  if (isNaN(expiry.getTime())) return "unknown";
  if (expiry <= now) return "expired";

  const daysUntilExpiry = (expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
  if (daysUntilExpiry <= alertDays) return "expiring_soon";

  return "active";
}

/**
 * Register or update an expiration tracking entry.
 */
export function setExpiration(
  connectionId: string,
  provider: string,
  connectionName: string,
  expiresAt: string | null,
  expiryType: ExpiryType,
  options?: { alertDays?: number; note?: string | null }
): ProviderExpiration {
  const alertDays = options?.alertDays ?? 7;
  const status = calculateStatus(expiresAt, alertDays);

  const entry: ProviderExpiration = {
    connectionId,
    provider,
    connectionName,
    expiresAt,
    expiryType,
    alertDays,
    lastChecked: new Date().toISOString(),
    status,
    note: options?.note ?? null,
  };

  expirations.set(connectionId, entry);
  return entry;
}

/**
 * Get expiration info for a specific connection.
 */
export function getExpiration(connectionId: string): ProviderExpiration | null {
  const entry = expirations.get(connectionId);
  if (!entry) return null;

  // Recalculate status (may have changed since last check)
  entry.status = calculateStatus(entry.expiresAt, entry.alertDays);
  return entry;
}

/**
 * Get all tracked expirations, with status recalculated.
 */
export function getAllExpirations(): ProviderExpiration[] {
  const result: ProviderExpiration[] = [];
  for (const entry of expirations.values()) {
    entry.status = calculateStatus(entry.expiresAt, entry.alertDays);
    result.push(entry);
  }
  return result.sort((a, b) => {
    // Sort: expired first, then expiring_soon, then active, then unknown
    const order: Record<ExpiryStatus, number> = {
      expired: 0,
      expiring_soon: 1,
      active: 2,
      unknown: 3,
    };
    return (order[a.status] ?? 4) - (order[b.status] ?? 4);
  });
}

/**
 * Get connections that are expired or expiring soon.
 */
export function getExpiringSoon(): ProviderExpiration[] {
  return getAllExpirations().filter((e) => e.status === "expired" || e.status === "expiring_soon");
}

/**
 * Get a summary of expiration health across all tracked connections.
 */
export function getExpirationSummary(): ExpirationSummary {
  const all = getAllExpirations();

  const summary: ExpirationSummary = {
    total: all.length,
    active: 0,
    expiringSoon: 0,
    expired: 0,
    unknown: 0,
    nextExpiration: null,
  };

  let nearestMs = Infinity;

  for (const entry of all) {
    switch (entry.status) {
      case "active":
        summary.active++;
        break;
      case "expiring_soon":
        summary.expiringSoon++;
        break;
      case "expired":
        summary.expired++;
        break;
      case "unknown":
        summary.unknown++;
        break;
    }

    // Track nearest expiration
    if (entry.expiresAt) {
      const ms = new Date(entry.expiresAt).getTime() - Date.now();
      if (ms > 0 && ms < nearestMs) {
        nearestMs = ms;
        summary.nextExpiration = entry;
      }
    }
  }

  return summary;
}

/**
 * Remove expiration tracking for a connection.
 */
export function removeExpiration(connectionId: string): boolean {
  return expirations.delete(connectionId);
}

/**
 * Try to detect expiration hints from HTTP response headers.
 * Many providers include rate limit reset times that can indicate
 * quota or token expiration.
 *
 * @param provider - Provider ID
 * @param status - HTTP status code
 * @param headers - Response headers (as plain object)
 * @returns Detected expiration date or null
 */
export function detectExpirationFromResponse(
  provider: string,
  status: number,
  headers: Record<string, string>
): { expiresAt: string; expiryType: ExpiryType } | null {
  // 401 with specific patterns → token expired
  if (status === 401) {
    return {
      expiresAt: new Date().toISOString(), // Already expired
      expiryType: "oauth_token",
    };
  }

  // 402 → payment/subscription expired
  if (status === 402) {
    return {
      expiresAt: new Date().toISOString(),
      expiryType: "subscription",
    };
  }

  // Rate limit headers may indicate reset times
  const resetHeader =
    headers["x-ratelimit-reset"] || headers["x-ratelimit-reset-tokens"] || headers["retry-after"];

  if (resetHeader && status === 429) {
    const resetTime = parseInt(resetHeader, 10);
    if (!isNaN(resetTime)) {
      // Could be epoch seconds or seconds-from-now
      const date =
        resetTime > 1_000_000_000
          ? new Date(resetTime * 1000)
          : new Date(Date.now() + resetTime * 1000);
      return {
        expiresAt: date.toISOString(),
        expiryType: "free_tier_reset",
      };
    }
  }

  return null;
}

/**
 * Reset all tracked expirations. Useful for testing.
 */
export function resetExpirations(): void {
  expirations.clear();
}
