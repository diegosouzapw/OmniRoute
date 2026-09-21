/**
 * Shared duration-aware quota window labels for AUTH preflight and /api/usage.
 * Routing keys (`session`, `weekly`) stay position-based; only the display
 * string follows the real window length so a 30-day primary window is not
 * reported as "session (5h)".
 */

const SESSION_MAX_SECONDS = 6 * 3600;
const WEEKLY_MAX_SECONDS = 8 * 24 * 3600;
const MONTHLY_MAX_SECONDS = 40 * 24 * 3600;
const GENERIC_FAMILY = new Set(["session", "weekly", "monthly"]);

export type QuotaWindowLabelInput = {
  key: string;
  displayName?: string | null;
  windowSeconds?: number | null;
};

function toPositiveSeconds(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value) && value > 0) return value;
  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number(value);
    if (Number.isFinite(parsed) && parsed > 0) return parsed;
  }
  return null;
}

export function formatWindowDuration(windowSeconds: number): string {
  if (windowSeconds % 86400 === 0) return `${windowSeconds / 86400}d`;
  if (windowSeconds % 3600 === 0) return `${windowSeconds / 3600}h`;
  return `${Math.round(windowSeconds)}s`;
}

export function inferWindowFamilyLabel(windowSeconds: number): string | undefined {
  if (windowSeconds <= SESSION_MAX_SECONDS) return "Session";
  if (windowSeconds <= WEEKLY_MAX_SECONDS) return "Weekly";
  if (windowSeconds <= MONTHLY_MAX_SECONDS) return "Monthly";
  return undefined;
}

function normalizeFamily(value: string): string {
  return value.trim().toLowerCase();
}

/**
 * Prefer a duration-aware label. When usage already stamped a generic family
 * (`Weekly`) on a 30-day window, replace it with Monthly so AUTH and the
 * usage API agree on the reset window.
 */
export function formatQuotaWindowLabel(input: QuotaWindowLabelInput): string {
  const seconds = toPositiveSeconds(input.windowSeconds);
  const duration = seconds != null ? formatWindowDuration(seconds) : null;
  const inferred = seconds != null ? inferWindowFamilyLabel(seconds) : undefined;
  const named = typeof input.displayName === "string" ? input.displayName.trim() : "";
  const key = typeof input.key === "string" && input.key.trim() ? input.key.trim() : "quota";

  let base = named || inferred || key;
  if (inferred && named && GENERIC_FAMILY.has(normalizeFamily(named)) && inferred !== named) {
    base = inferred;
  }

  if (duration && !base.toLowerCase().includes(duration.toLowerCase())) {
    return `${base} (${duration})`;
  }
  return base;
}

export function formatQuotaUsageReason(
  input: QuotaWindowLabelInput,
  usedPercentage: number
): string {
  return `${formatQuotaWindowLabel(input)} usage ${Math.round(usedPercentage)}%`;
}
