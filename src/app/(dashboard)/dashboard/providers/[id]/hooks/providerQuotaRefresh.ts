import type { ProviderQuotaCacheEntry } from "./useProviderQuota";

export interface QuotaRefreshState {
  status: "loading" | "fresh" | "partial" | "stale" | "error";
  missingWindows?: Array<"session" | "weekly">;
  connectionsRefreshFailed?: boolean;
}

interface QuotaObservation {
  state: QuotaRefreshState;
  entry?: ProviderQuotaCacheEntry;
}

function record(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function validWindow(value: unknown): boolean {
  const window = record(value);
  return (
    !!window &&
    typeof window.used === "number" &&
    Number.isFinite(window.used) &&
    window.used >= 0 &&
    typeof window.total === "number" &&
    Number.isFinite(window.total) &&
    window.total > 0
  );
}

function timestamp(value: unknown): string | undefined {
  return typeof value === "string" && Number.isFinite(Date.parse(value)) ? value : undefined;
}

/** Classifies an observation, never a decision to release a backend cooldown. */
export function classifyQuotaObservation(value: unknown, providerId?: string): QuotaObservation {
  const usage = record(value);
  if (!usage) return { state: { status: "error" } };
  if (providerId !== "codex") {
    return {
      state: { status: "fresh" },
      entry: { ...usage, fetchedAt: timestamp(usage.fetchedAt) ?? new Date().toISOString() },
    };
  }
  const quotas = record(usage.quotas) ?? {};
  const validQuotas = Object.fromEntries(
    Object.entries(quotas).filter(([, window]) => validWindow(window))
  );
  // Only presentation data crosses the boundary: upstream errors stay out of the UI.
  const entry: ProviderQuotaCacheEntry = { quotas: validQuotas, plan: usage.plan };
  if (usage._stale === true) {
    entry.fetchedAt = timestamp(usage._staleSince);
    return { state: { status: "stale" }, entry };
  }
  if (usage.error || usage.message) return { state: { status: "error" } };
  const missingWindows = (["session", "weekly"] as const).filter(
    (name) => !validWindow(quotas[name])
  );
  if (missingWindows.length === 2) return { state: { status: "error" } };
  entry.fetchedAt = timestamp(usage.fetchedAt) ?? new Date().toISOString();
  return {
    state: missingWindows.length ? { status: "partial", missingWindows } : { status: "fresh" },
    entry,
  };
}
