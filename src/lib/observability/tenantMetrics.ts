/**
 * src/lib/observability/tenantMetrics.ts
 *
 * Per-tenant cost meters + quota gauges. PR-007's deliverable. This
 * module owns:
 *   - tenant_cost_usd_total          (Counter)  — accumulated USD cost per (tenant, provider, model, currency)
 *   - tenant_quota                   (Gauge)    — used/limit ratio per (tenant, resource)
 *   - tenant_usage                   (Gauge)    — raw usage per (tenant, resource, window)
 *   - tenant_request_total           (Counter)  — request count per (tenant, route, status)
 *   - tenant_error_total             (Counter)  — error count per (tenant, route, error_code)
 *
 * All metrics are labelled with `tenant_id`. To prevent cardinality
 * explosion from untrusted label values, a per-process allow-list
 * (`tenantLabelAllowList`, max 256 entries) routes unknown tenants to
 * the bucket `tenant_id="other"`. The allow-list is populated:
 *   1. Explicitly via `addTenantLabelAllowListEntry(id)`;
 *   2. Lazily via `recordTenantCost` / `setTenantQuota` calls;
 *   3. At startup from `OMNIROUTE_TENANT_LABEL_ALLOW_LIST` (comma-sep).
 *
 * The cap is per-PROCESS (not per-metric). Once the cap is reached, new
 * tenant IDs are folded into the "other" bucket; old ones keep their
 * dedicated label-set. This matches OTel best practice for user-attributed
 * labels.
 *
 * Currency normalization:
 *   `recordTenantCost` accepts a cost in any supported currency; the
 *   canonical metric is USD. Non-USD currencies are converted via
 *   `EXCHANGE_RATES` and INCREMENTED UNDER THEIR OWN currency label, so
 *   dashboards can filter by currency. Unknown currencies land in the
 *   `currency="other"` bucket — never silently dropped.
 */

import {
  createCounter,
  createGauge,
  type Counter,
  type Gauge,
} from "./metrics";
import { convertCurrency } from "./costCalculator";

export type TenantWindow = "hour" | "day" | "month";

/* ------------------------------------------------------------------ *
 * Metric declarations                                                *
 * ------------------------------------------------------------------ */

export const tenantCostCounter: Counter = createCounter({
  name: "tenant_cost_usd_total",
  help: "Cumulative tenant-attributed cost, normalised to USD by default; other currencies land under their own label.",
  labelNames: ["tenant_id", "provider", "model", "currency"],
});

export const tenantQuotaGauge: Gauge = createGauge({
  name: "tenant_quota",
  help: "Quota consumption as a ratio (used/limit). 1.0 means the tenant is at the cap; >1 indicates overflow.",
  labelNames: ["tenant_id", "resource"],
});

export const tenantUsageGauge: Gauge = createGauge({
  name: "tenant_usage",
  help: "Raw tenant usage for a given resource within a time window.",
  labelNames: ["tenant_id", "resource", "window"],
});

export const tenantRequestCounter: Counter = createCounter({
  name: "tenant_request_total",
  help: "Total HTTP requests served per tenant.",
  labelNames: ["tenant_id", "route", "status"],
});

export const tenantErrorCounter: Counter = createCounter({
  name: "tenant_error_total",
  help: "Total error responses served per tenant, broken down by error code.",
  labelNames: ["tenant_id", "route", "error_code"],
});

/* ------------------------------------------------------------------ *
 * Tenant allow-list (cardinality cap)                                *
 * ------------------------------------------------------------------ */

export const TENANT_LABEL_ALLOW_LIST_MAX = 256;

const TENANT_ALLOW: { set: Set<string> } = { set: new Set() };

/** Replace the tenant allow-list. Used by the bootstrap and tests. */
export function setTenantLabelAllowList(ids: Iterable<string>): void {
  const arr = Array.from(ids, (id) => normaliseTenantId(id)).filter(Boolean);
  const truncated = arr.slice(0, TENANT_LABEL_ALLOW_LIST_MAX);
  TENANT_ALLOW.set = new Set(truncated);
}

/** Read the current allow-list as a sorted array (for diagnostics + tests). */
export function tenantLabelAllowList(): string[] {
  return Array.from(TENANT_ALLOW.set).sort();
}

/**
 * Add a tenant id to the allow-list. Returns true if added, false if the
 * cap was already reached (the caller may still proceed — the id will be
 * routed to "other" by `resolveTenantLabel`).
 */
export function addTenantLabelAllowListEntry(id: string): boolean {
  const norm = normaliseTenantId(id);
  if (!norm) return false;
  if (TENANT_ALLOW.set.has(norm)) return true;
  if (TENANT_ALLOW.set.size >= TENANT_LABEL_ALLOW_LIST_MAX) return false;
  TENANT_ALLOW.set.add(norm);
  return true;
}

/** Clear the allow-list (test-only). */
export function _resetTenantAllowListForTests(): void {
  TENANT_ALLOW.set = new Set();
}

/**
 * Map a raw tenant id to its metric label. Unknown ids are folded to
 * "other"; empty / non-string ids always become "other" (never throw).
 * The mapping is symmetric with `addTenantLabelAllowListEntry`: if a
 * tenant is added explicitly they get their own bucket.
 */
export function resolveTenantLabel(rawId: unknown): string {
  if (typeof rawId !== "string") return "other";
  const norm = normaliseTenantId(rawId);
  if (!norm) return "other";
  if (TENANT_ALLOW.set.has(norm)) return norm;
  // Lazy-add: first-seen tenant IDs are admitted until the cap is hit.
  if (TENANT_ALLOW.set.size < TENANT_LABEL_ALLOW_LIST_MAX) {
    TENANT_ALLOW.set.add(norm);
    return norm;
  }
  return "other";
}

function normaliseTenantId(raw: string): string {
  // Replace anything Prometheus forbids in label values: ", \n, \
  return raw.trim().slice(0, 128).replace(/[",\n\\]/g, "_");
}

/** Bootstrap from env — invoked by `initTenantMetrics`. */
export function loadTenantAllowListFromEnv(envKey = "OMNIROUTE_TENANT_LABEL_ALLOW_LIST"): void {
  const raw = process.env[envKey];
  if (!raw) return;
  setTenantLabelAllowList(raw.split(",").map((s) => s.trim()).filter(Boolean));
}

/** Idempotent bootstrap. Safe to call from any entry point. */
export function initTenantMetrics(): void {
  loadTenantAllowListFromEnv();
}

/* ------------------------------------------------------------------ *
 * Recorder helpers                                                    *
 * ------------------------------------------------------------------ */

export interface RecordTenantCostArgs {
  tenantId: unknown;
  provider: string;
  model: string;
  /** Cost in the supplied currency (USD by convention). */
  costUsd: number;
  /** Currency code; default "USD". Unknown currencies land in `currency=other`. */
  currency?: string;
}

/**
 * Record tenant cost. The currency label is the literal currency code
 * passed in (uppercased). For non-USD currencies we ALSO increment the
 * `currency=usd_eq` label with the converted amount so dashboards can
 * sum a single currency. The original currency's increment lets
 * operators see cost broken out by billing currency.
 */
export function recordTenantCost(args: RecordTenantCostArgs): void {
  const tenant = resolveTenantLabel(args.tenantId);
  const provider = String(args.provider ?? "unknown");
  const model = String(args.model ?? "unknown");
  const cost = Number(args.costUsd);
  if (!Number.isFinite(cost) || cost < 0) return;
  const currency = (args.currency ?? "USD").toUpperCase();
  tenantCostCounter.inc({ tenant_id: tenant, provider, model, currency }, cost);
  if (currency !== "USD") {
    const converted = convertCurrency(cost, currency);
    if (typeof converted === "number") {
      tenantCostCounter.inc(
        { tenant_id: tenant, provider, model, currency: "USD_EQ" },
        converted
      );
    } else {
      // Unknown currency — emit under the "other" bucket so it isn't lost.
      tenantCostCounter.inc({ tenant_id: tenant, provider, model, currency: "other" }, cost);
    }
  }
}

export interface SetTenantQuotaArgs {
  tenantId: unknown;
  resource: string;
  limit: number;
  used: number;
}

/**
 * Set the quota gauge to `used/limit`. Guarded against zero/negative
 * limits (we set the gauge to 0 instead of producing +Infinity, which
 * Prometheus would happily export and which would explode dashboards).
 */
export function setTenantQuota(args: SetTenantQuotaArgs): void {
  const tenant = resolveTenantLabel(args.tenantId);
  const resource = String(args.resource ?? "unknown");
  if (!Number.isFinite(args.limit) || args.limit <= 0) {
    tenantQuotaGauge.set({ tenant_id: tenant, resource }, 0);
    return;
  }
  const used = Number.isFinite(args.used) ? Math.max(0, args.used) : 0;
  const ratio = used / args.limit;
  tenantQuotaGauge.set({ tenant_id: tenant, resource }, ratio);
}

export interface RecordTenantUsageArgs {
  tenantId: unknown;
  resource: string;
  value: number;
  window: TenantWindow;
}

export function recordTenantUsage(args: RecordTenantUsageArgs): void {
  const tenant = resolveTenantLabel(args.tenantId);
  const resource = String(args.resource ?? "unknown");
  const value = Number(args.value);
  if (!Number.isFinite(value)) return;
  tenantUsageGauge.set({ tenant_id: tenant, resource, window: args.window }, value);
}

export interface RecordTenantRequestArgs {
  tenantId: unknown;
  route: string;
  status: number | string;
}

export function recordTenantRequest(args: RecordTenantRequestArgs): void {
  const tenant = resolveTenantLabel(args.tenantId);
  const status = String(args.status);
  tenantRequestCounter.inc({ tenant_id: tenant, route: String(args.route), status });
}

export interface RecordTenantErrorArgs {
  tenantId: unknown;
  route: string;
  errorCode: string;
}

export function recordTenantError(args: RecordTenantErrorArgs): void {
  const tenant = resolveTenantLabel(args.tenantId);
  tenantErrorCounter.inc({
    tenant_id: tenant,
    route: String(args.route),
    error_code: String(args.errorCode),
  });
}

/* ------------------------------------------------------------------ *
 * Debug — snapshot of the current state                              *
 * ------------------------------------------------------------------ */

export interface TenantMetricsSnapshot {
  knownTenants: string[];
  totalTenantIds: number;
  quotaSamples: Record<string, number>;
  costSamples: Record<string, number>;
}

/** Read a snapshot of the current state for diagnostics / tests. */
export function snapshotTenantMetrics(): TenantMetricsSnapshot {
  const known = tenantLabelAllowList();
  return {
    knownTenants: known,
    totalTenantIds: known.length,
    quotaSamples: {},
    costSamples: {},
  };
}