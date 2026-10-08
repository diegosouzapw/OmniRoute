/**
 * usage/openaiCompatible.ts — a provider-agnostic quota fetcher for
 * `openai-compatible-*` connections (#13616).
 *
 * Every other fetcher in this directory hard-codes one upstream's URL, auth and
 * response shape. That works because those providers are known. An
 * openai-compatible connection can point at anything, so the shape has to come
 * from the connection rather than from us: the operator describes where the
 * quota lives and how to read it, and this maps the answer onto `UsageQuota`.
 *
 * Declared per connection in `providerSpecificData.quotaEndpoint`:
 *
 *   {
 *     "url": "https://api.example.com/v1/credits",
 *     "method": "GET",                       // optional, default GET
 *     "auth": "bearer",                      // bearer | x-api-key | none
 *     "headers": { "X-Org": "acme" },        // optional, merged last
 *     "plan": "$.data.plan_name",            // optional label
 *     "quotas": {
 *       "credits": {
 *         "used":    "$.data.used_usd",
 *         "total":   "$.data.limit_usd",
 *         "resetAt": "$.data.renews_at",     // optional
 *         "currency": "USD"                  // optional; marks a money quota
 *       }
 *     }
 *   }
 *
 * Paths are dot/bracket paths rather than full JSONPath — `$.a.b[0].c` — so the
 * mapping stays dependency-free and readable in a config field. Anything the
 * path cannot resolve is treated as absent, never as zero: a quota that silently
 * reads 0/0 looks exhausted, and an operator would reasonably act on that.
 */

import { type UsageQuota, createQuotaFromUsage } from "./quota.ts";

/**
 * Operator-configured endpoints can point at anything, including a host that
 * never responds. Same bound as `open-sse/services/grokResetCredits.ts`'s
 * `FETCH_TIMEOUT_MS`, so one unreachable connection can never hang the whole
 * Provider Limits sync.
 */
const QUOTA_ENDPOINT_TIMEOUT_MS = 15_000;

export interface OpenAiCompatibleQuotaMapping {
  used?: string;
  total?: string;
  remaining?: string;
  resetAt?: string;
  currency?: string;
  displayName?: string;
}

export interface OpenAiCompatibleQuotaEndpoint {
  url: string;
  method?: string;
  auth?: "bearer" | "x-api-key" | "none";
  headers?: Record<string, string>;
  plan?: string;
  quotas?: Record<string, OpenAiCompatibleQuotaMapping>;
}

/** `$.a.b[0].c` / `a.b.0.c` → the value, or undefined if any hop is missing. */
export function resolvePath(root: unknown, path: string): unknown {
  if (typeof path !== "string" || path.length === 0) return undefined;
  const cleaned = path.startsWith("$.")
    ? path.slice(2)
    : path.startsWith("$")
      ? path.slice(1)
      : path;
  const parts = cleaned
    .replace(/\[(\d+)\]/g, ".$1")
    .split(".")
    .filter((segment) => segment.length > 0);

  let cursor: unknown = root;
  for (const segment of parts) {
    if (cursor === null || cursor === undefined) return undefined;
    if (Array.isArray(cursor)) {
      const index = Number(segment);
      if (!Number.isInteger(index)) return undefined;
      cursor = cursor[index];
      continue;
    }
    if (typeof cursor !== "object") return undefined;
    cursor = (cursor as Record<string, unknown>)[segment];
  }
  return cursor;
}

/** A mapping is usable only if it can produce a total or a remaining. */
function buildMappedQuota(body: unknown, mapping: OpenAiCompatibleQuotaMapping): UsageQuota | null {
  const total = mapping.total === undefined ? undefined : resolvePath(body, mapping.total);
  const used = mapping.used === undefined ? undefined : resolvePath(body, mapping.used);
  const remaining =
    mapping.remaining === undefined ? undefined : resolvePath(body, mapping.remaining);
  const resetAt = mapping.resetAt === undefined ? undefined : resolvePath(body, mapping.resetAt);

  // Neither axis resolved: the path is wrong or the field is absent. Reporting
  // 0/0 here would render as a fully-exhausted quota, so report nothing.
  if (total === undefined && remaining === undefined) return null;

  // total absent but remaining present: derive the total so the bar has a scale.
  const effectiveTotal =
    total !== undefined ? total : Number(remaining ?? 0) + Number(used !== undefined ? used : 0);

  const quota = createQuotaFromUsage(
    used !== undefined ? used : Number(effectiveTotal ?? 0) - Number(remaining ?? 0),
    effectiveTotal,
    resetAt
  );

  if (mapping.currency) quota.currency = mapping.currency;
  if (mapping.displayName) quota.displayName = mapping.displayName;
  return quota;
}

export function buildAuthHeaders(
  endpoint: OpenAiCompatibleQuotaEndpoint,
  secret: string | undefined
): Record<string, string> {
  const headers: Record<string, string> = { accept: "application/json" };
  const mode = endpoint.auth ?? "bearer";
  if (secret && mode === "bearer") headers.authorization = `Bearer ${secret}`;
  if (secret && mode === "x-api-key") headers["x-api-key"] = secret;
  return { ...headers, ...(endpoint.headers ?? {}) };
}

/**
 * Read the connection's declared quota endpoint and map it onto `UsageQuota`.
 *
 * Returns a `message` rather than throwing on every failure path: an
 * unreachable or misconfigured endpoint on one connection must not fail the
 * whole Provider Limits sync, which walks every connection in turn.
 */
export async function getOpenAiCompatibleUsage(
  apiKey: string | undefined,
  providerSpecificData: Record<string, unknown> | null | undefined
) {
  const endpoint = (providerSpecificData?.quotaEndpoint ??
    null) as OpenAiCompatibleQuotaEndpoint | null;

  if (!endpoint || typeof endpoint.url !== "string" || endpoint.url.length === 0) {
    return { message: "No quota endpoint configured for this connection." };
  }
  const mappings = endpoint.quotas ?? {};
  if (Object.keys(mappings).length === 0) {
    return { message: "Quota endpoint configured without a `quotas` mapping." };
  }

  let body: unknown;
  try {
    const response = await fetch(endpoint.url, {
      method: endpoint.method ?? "GET",
      headers: buildAuthHeaders(endpoint, apiKey),
      signal: AbortSignal.timeout(QUOTA_ENDPOINT_TIMEOUT_MS),
    });
    if (!response.ok) {
      return { message: `Quota endpoint returned HTTP ${response.status}.` };
    }
    body = await response.json();
  } catch {
    // Deliberately not echoing the error: the URL is operator-supplied and the
    // message can carry it (and any query string) into the dashboard.
    return { message: "Quota endpoint unreachable." };
  }

  const quotas: Record<string, UsageQuota> = {};
  for (const [name, mapping] of Object.entries(mappings)) {
    const quota = buildMappedQuota(body, mapping);
    if (quota) quotas[name] = quota;
  }

  if (Object.keys(quotas).length === 0) {
    return { message: "Quota endpoint responded, but no mapping resolved a value." };
  }

  const plan = endpoint.plan ? resolvePath(body, endpoint.plan) : undefined;
  return {
    ...(typeof plan === "string" && plan ? { plan } : {}),
    quotas,
  };
}
