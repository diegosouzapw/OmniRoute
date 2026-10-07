/**
 * Adobe Firefly — credits balance and model discovery.
 *
 * Split out of adobeFireflyClient.ts.
 */

import { sanitizeErrorMessage } from "../utils/error.ts";
import {
  type AdobeFireflyDiscoveredModel,
  parseAdobeModelsDiscovery as parseAdobeModelsDiscoveryContract,
} from "./adobeFireflyModels.ts";
import {
  ADOBE_FIREFLY_CREDITS_BALANCE_URL,
  ADOBE_FIREFLY_MODELS_DISCOVERY_URL,
} from "./adobeFireflyCatalog.ts";
import { AdobeFireflyError } from "./adobeFireflyCredentials.ts";
import { buildAdobeBalanceHeaders, buildAdobeDiscoveryHeaders } from "./adobeFireflyResponses.ts";

export interface AdobeFireflyCreditsBalance {
  total: number;
  used: number;
  remaining: number;
  availableUntil: string | null;
  freeTotal: number;
  freeUsed: number;
  freeRemaining: number;
  planTotal: number;
  planUsed: number;
  planRemaining: number;
  raw?: unknown;
}

function readQuotaBlock(block: unknown): {
  total: number;
  used: number;
  available: number;
} {
  if (!block || typeof block !== "object") return { total: 0, used: 0, available: 0 };
  const q =
    (block as Record<string, unknown>).quota &&
    typeof (block as Record<string, unknown>).quota === "object"
      ? ((block as Record<string, unknown>).quota as Record<string, unknown>)
      : (block as Record<string, unknown>);
  const total = Number(q.total ?? 0);
  const used = Number(q.used ?? 0);
  const available = Number(q.available ?? Math.max(0, total - used));
  return {
    total: Number.isFinite(total) ? total : 0,
    used: Number.isFinite(used) ? used : 0,
    available: Number.isFinite(available) ? available : 0,
  };
}

/**
 * Parse GET /v1/credits/balance JSON (adobe/balance.txt Response).
 * total.quota = aggregate; credits.firefly_* = free + plan buckets.
 */
export function parseAdobeCreditsBalance(body: unknown): AdobeFireflyCreditsBalance {
  const root = body && typeof body === "object" ? (body as Record<string, unknown>) : {};
  const totalBlock = readQuotaBlock(root.total);
  const credits =
    root.credits && typeof root.credits === "object"
      ? (root.credits as Record<string, unknown>)
      : {};
  const free = readQuotaBlock(credits.firefly_free_credit);
  const plan = readQuotaBlock(credits.firefly_plan_credit);

  // Prefer top-level total; fall back to free+plan sum when total missing.
  let total = totalBlock.total;
  let used = totalBlock.used;
  let remaining = totalBlock.available;
  if (total <= 0 && (free.total > 0 || plan.total > 0)) {
    total = free.total + plan.total;
    used = free.used + plan.used;
    remaining = free.available + plan.available;
  }
  if (remaining <= 0 && total > 0) remaining = Math.max(0, total - used);

  const availableUntil =
    root.total &&
    typeof root.total === "object" &&
    typeof (root.total as Record<string, unknown>).availableUntil === "string"
      ? String((root.total as Record<string, unknown>).availableUntil)
      : null;

  return {
    total,
    used,
    remaining,
    availableUntil,
    freeTotal: free.total,
    freeUsed: free.used,
    freeRemaining: free.available,
    planTotal: plan.total,
    planUsed: plan.used,
    planRemaining: plan.available,
    raw: body,
  };
}

export async function fetchAdobeCreditsBalance(
  accessToken: string,
  fetchImpl: typeof fetch = fetch
): Promise<AdobeFireflyCreditsBalance> {
  const resp = await fetchImpl(ADOBE_FIREFLY_CREDITS_BALANCE_URL, {
    method: "GET",
    headers: buildAdobeBalanceHeaders(accessToken),
  });
  if (resp.status === 401 || resp.status === 403) {
    throw new AdobeFireflyError("Adobe Firefly balance: token invalid or expired", 401, "auth");
  }
  if (!resp.ok) {
    const text = await resp.text().catch(() => "");
    throw new AdobeFireflyError(
      `Adobe Firefly balance failed (${resp.status}): ${sanitizeErrorMessage(text.slice(0, 200))}`,
      502
    );
  }
  const data = await resp.json().catch(() => ({}));
  return parseAdobeCreditsBalance(data);
}

// ── Models discovery ────────────────────────────────────────────────────────

/**
 * Parse POST /v2/models/discovery response into flat model/version rows.
 */
export function parseAdobeModelsDiscovery(body: unknown): AdobeFireflyDiscoveredModel[] {
  return parseAdobeModelsDiscoveryContract(body);
}

export async function discoverAdobeFireflyModels(
  accessToken: string,
  fetchImpl: typeof fetch = fetch
): Promise<AdobeFireflyDiscoveredModel[]> {
  const resp = await fetchImpl(ADOBE_FIREFLY_MODELS_DISCOVERY_URL, {
    method: "POST",
    headers: buildAdobeDiscoveryHeaders(accessToken),
    body: JSON.stringify({ filters: { resolveSchema: true } }),
  });
  if (resp.status === 401 || resp.status === 403) {
    throw new AdobeFireflyError(
      "Adobe Firefly model discovery: token invalid or expired",
      401,
      "auth"
    );
  }
  if (!resp.ok) {
    const text = await resp.text().catch(() => "");
    throw new AdobeFireflyError(
      `Adobe Firefly model discovery failed (${resp.status}): ${sanitizeErrorMessage(text.slice(0, 200))}`,
      502
    );
  }
  const data = await resp.json().catch(() => ({}));
  return parseAdobeModelsDiscovery(data);
}
