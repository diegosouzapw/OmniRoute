/**
 * quotaAdapters.ts — Provider-specific quota header adapters.
 *
 * Extracts and normalizes rate limit & token budget headers from provider HTTP responses
 * (OpenAI, Anthropic, Gemini, OpenRouter, ModelScope, Generic) into standardized
 * provider quota states.
 *
 * Part of: Quota-aware provider scheduling (Phase 2).
 */

import { recordProviderQuotaUsage, getProviderQuota } from "./providerQuotaState";

export interface ParsedQuotaHeaderResult {
  tokensUsed?: number;
  tokenLimit?: number;
  tokensRemaining?: number;
  windowResetMs?: number;
}

/**
 * Parse rate-limit headers from an HTTP Response or Headers object into a normalized quota result.
 */
export function parseProviderQuotaHeaders(
  headers: Headers | Record<string, string | string[] | undefined>,
  provider?: string
): ParsedQuotaHeaderResult | null {
  if (!headers) return null;

  const getHeader = (name: string): string | null => {
    if (typeof (headers as Headers).get === "function") {
      return (headers as Headers).get(name);
    }
    const record = headers as Record<string, string | string[] | undefined>;
    const val = record[name] ?? record[name.toLowerCase()] ?? record[name.toUpperCase()];
    if (Array.isArray(val)) return val[0] ?? null;
    return val ?? null;
  };

  const parseNum = (val: string | null): number | undefined => {
    if (!val) return undefined;
    const cleaned = val.replace(/[^0-9.]/g, "");
    const num = parseFloat(cleaned);
    return isNaN(num) ? undefined : num;
  };

  const parseResetMs = (val: string | null): number | undefined => {
    if (!val) return undefined;
    const now = Date.now();
    // Check if ISO date string
    if (val.includes("T") || val.includes("Z")) {
      const parsed = Date.parse(val);
      if (!isNaN(parsed)) return Math.max(0, parsed - now);
    }
    // Check if seconds / ms string (e.g. "60s", "100ms", "0.5s", or raw number)
    if (val.endsWith("ms")) return parseNum(val);
    if (val.endsWith("s")) return (parseNum(val) ?? 0) * 1000;
    if (val.endsWith("m")) return (parseNum(val) ?? 0) * 60 * 1000;
    if (val.endsWith("h")) return (parseNum(val) ?? 0) * 3600 * 1000;

    const rawNum = parseNum(val);
    if (rawNum !== undefined) {
      // If epoch timestamp (> 1e9), convert to remaining ms
      if (rawNum > 1_000_000_000) {
        return Math.max(0, rawNum * 1000 - now);
      }
      return rawNum * 1000; // assume relative seconds
    }
    return undefined;
  };

  const prov = (provider || "").toLowerCase();

  // 1. Anthropic Headers
  if (prov === "anthropic" || getHeader("anthropic-ratelimit-input-tokens-limit")) {
    const limit = parseNum(getHeader("anthropic-ratelimit-input-tokens-limit"));
    const remaining = parseNum(getHeader("anthropic-ratelimit-input-tokens-remaining"));
    const resetStr = getHeader("anthropic-ratelimit-input-tokens-reset");
    const windowResetMs = parseResetMs(resetStr);

    if (limit !== undefined || remaining !== undefined) {
      const tokensUsed = limit !== undefined && remaining !== undefined ? Math.max(0, limit - remaining) : undefined;
      return { tokenLimit: limit, tokensRemaining: remaining, tokensUsed, windowResetMs };
    }
  }

  // 2. OpenAI / Standard x-ratelimit-*
  const limitTokens = parseNum(getHeader("x-ratelimit-limit-tokens"));
  const remainingTokens = parseNum(getHeader("x-ratelimit-remaining-tokens"));
  const resetTokens = getHeader("x-ratelimit-reset-tokens");
  if (limitTokens !== undefined || remainingTokens !== undefined) {
    const tokensUsed = limitTokens !== undefined && remainingTokens !== undefined ? Math.max(0, limitTokens - remainingTokens) : undefined;
    return { tokenLimit: limitTokens, tokensRemaining: remainingTokens, tokensUsed, windowResetMs: parseResetMs(resetTokens) };
  }

  // 3. OpenRouter / Generic Request level headers
  const genericLimit = parseNum(getHeader("x-ratelimit-limit"));
  const genericRemaining = parseNum(getHeader("x-ratelimit-remaining"));
  const genericReset = getHeader("x-ratelimit-reset");
  if (genericLimit !== undefined || genericRemaining !== undefined) {
    const tokensUsed = genericLimit !== undefined && genericRemaining !== undefined ? Math.max(0, genericLimit - genericRemaining) : undefined;
    return { tokenLimit: genericLimit, tokensRemaining: genericRemaining, tokensUsed, windowResetMs: parseResetMs(genericReset) };
  }

  return null;
}

/**
 * Apply parsed quota headers directly to the provider quota state ledger.
 */
export function applyQuotaHeadersToState(
  connectionId: string,
  model: string,
  headers: Headers | Record<string, string | string[] | undefined>,
  provider?: string
): void {
  const parsed = parseProviderQuotaHeaders(headers, provider);
  if (!parsed || (!parsed.tokensUsed && !parsed.tokenLimit)) return;

  const now = Date.now();
  const windowReset = parsed.windowResetMs ? now + parsed.windowResetMs : now + 60_000;
  const tokenLimit = parsed.tokenLimit ?? 0;
  const tokensUsed = parsed.tokensUsed ?? (parsed.tokenLimit && parsed.tokensRemaining ? parsed.tokenLimit - parsed.tokensRemaining : 0);

  recordProviderQuotaUsage(connectionId, model, tokensUsed, {
    tokenLimit,
    windowMs: Math.max(0, windowReset - now),
  });
}
