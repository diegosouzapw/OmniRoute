/**
 * Provider-reported search cost — opt-in, operator-trusted endpoints only.
 *
 * Search backends whose real cost varies per call (an LLM-backed adapter, a
 * metering proxy) can report what a call actually cost instead of the static
 * `costPerQuery` from the registry.
 *
 * Contract: a top-level `usage` object in the provider's JSON body, on a
 * success OR an error status (a failed call may still have cost money):
 *
 *   { "results": [...],
 *     "usage": { "search_cost_usd": 0.0132, "request_id": "abc-123", "queries_used": 2 } }
 *
 *   - `search_cost_usd` (required): finite USD amount, 0 <= x <= 100.
 *   - `request_id` (optional): provider request id; a cost is recorded at most
 *     once per (provider, request_id) in this process.
 *   - `queries_used` (optional): integer 0..1000, defaults to 1.
 *
 * Trust: the report is honored only when the stored provider connection sets
 * `providerSpecificData.trustReportedCost === true` (operator config) AND the
 * request URL is under the operator-configured base (`providerSpecificData.baseUrl`
 * or the registry `baseUrl`). A caller-supplied `provider_options.baseUrl`
 * (GHSA-3f8g-pfh9-j687) never matches, so a caller can't set its own price.
 * Without the opt-in nothing here runs and billing stays `costPerQuery`.
 *
 * A malformed report is ignored with a warning and the call falls back to
 * `costPerQuery`; it never silently zeroes the cost.
 */

import { z } from "zod";
import { recordCost } from "@/domain/costRules";
import type { SearchProviderConfig } from "../../config/searchRegistry.ts";

export const MAX_REPORTED_SEARCH_COST_USD = 100;
const MAX_REMEMBERED_REQUEST_IDS = 10_000;

const reportedUsageSchema = z.object({
  search_cost_usd: z.number().min(0).max(MAX_REPORTED_SEARCH_COST_USD),
  request_id: z.string().trim().min(1).max(200).optional(),
  queries_used: z.number().int().min(0).max(1000).optional(),
});

/** `usage` block of a search response. */
export interface SearchUsage {
  queries_used: number;
  search_cost_usd: number;
  llm_tokens?: number;
  /** Provider request id, present only on a provider-reported cost. */
  request_id?: string;
  /** Set when `search_cost_usd` came from the provider rather than `costPerQuery`. */
  cost_source?: "provider_reported";
}

interface WarnLog {
  warn?: (tag: string, message: string) => void;
}

/**
 * True when the connection opted in and `url` is under the operator-configured
 * base URL (same origin, base path prefix). Never throws.
 */
export function isReportedCostTrusted(
  config: SearchProviderConfig,
  providerSpecificData: Record<string, unknown> | undefined,
  url: string
): boolean {
  if (providerSpecificData?.trustReportedCost !== true) return false;
  const stored = providerSpecificData.baseUrl;
  const operatorBase =
    typeof stored === "string" && stored.trim().length > 0 ? stored.trim() : config.baseUrl;
  try {
    const target = new URL(url);
    const base = new URL(operatorBase);
    if (target.origin !== base.origin) return false;
    const basePath = base.pathname.replace(/\/+$/, "");
    return target.pathname === basePath || target.pathname.startsWith(`${basePath}/`);
  } catch {
    return false;
  }
}

/** Parse a reported `usage` block; null when absent or invalid (invalid is logged). */
export function readReportedUsage(
  body: unknown,
  providerId: string,
  log?: WarnLog | null
): SearchUsage | null {
  if (!body || typeof body !== "object" || !("usage" in body)) return null;
  const parsed = reportedUsageSchema.safeParse(body.usage);
  if (!parsed.success) {
    log?.warn?.("SEARCH", `${providerId} reported an invalid usage block; using costPerQuery`);
    return null;
  }
  const { search_cost_usd, request_id, queries_used } = parsed.data;
  return {
    queries_used: queries_used ?? 1,
    search_cost_usd,
    ...(request_id ? { request_id } : {}),
    cost_source: "provider_reported",
  };
}

/** Usage for a successful call: the trusted report when valid, else `costPerQuery`. */
export function resolveSearchUsage(
  config: SearchProviderConfig,
  body: unknown,
  trusted: boolean,
  log?: WarnLog | null
): SearchUsage {
  const reported = trusted ? readReportedUsage(body, config.id, log) : null;
  return reported ?? { queries_used: 1, search_cost_usd: config.costPerQuery };
}

const recordedRequestIds = new Set<string>();

/** Returns false when this (provider, request id) was already recorded. */
function claimRequestId(providerId: string, requestId: string): boolean {
  const key = `${providerId}\u0000${requestId}`;
  if (recordedRequestIds.has(key)) return false;
  recordedRequestIds.add(key);
  if (recordedRequestIds.size > MAX_REMEMBERED_REQUEST_IDS) {
    const oldest = recordedRequestIds.values().next().value;
    if (oldest !== undefined) recordedRequestIds.delete(oldest);
  }
  return true;
}

/**
 * Record a search call's cost against an API key. A static cost is recorded
 * exactly as before (`recordCost(id, cost)`); a provider-reported cost also
 * lands in `request_cost_ledger` with provider/model/request id, at most once
 * per request id.
 */
export function recordSearchUsageCost(
  apiKeyId: string | null | undefined,
  providerId: string,
  usage: SearchUsage | null | undefined,
  success = true
): void {
  if (!apiKeyId || !usage || !(usage.search_cost_usd > 0)) return;
  if (usage.cost_source !== "provider_reported") {
    recordCost(apiKeyId, usage.search_cost_usd);
    return;
  }
  if (usage.request_id && !claimRequestId(providerId, usage.request_id)) return;
  recordCost(apiKeyId, usage.search_cost_usd, {
    provider: providerId,
    model: `${providerId}/search`,
    requestId: usage.request_id ?? null,
    success,
  });
}

/**
 * An error response from a trusted endpoint may still carry a cost (the
 * backend spent money before failing). Record it; the caller never sees the
 * response data, so this is the only place it can be charged.
 */
export function recordReportedErrorCost(
  apiKeyId: string | undefined,
  providerId: string,
  errorText: string,
  log?: WarnLog | null
): void {
  let body: unknown = null;
  try {
    body = JSON.parse(errorText);
  } catch {
    return;
  }
  recordSearchUsageCost(apiKeyId, providerId, readReportedUsage(body, providerId, log), false);
}
