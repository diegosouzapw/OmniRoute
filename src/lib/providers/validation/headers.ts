// Request-header builders + custom-UA handling + a direct (proxy-bypassing) HTTPS helper, extracted
// from validation.ts (god-file decomposition). Pure header construction except directHttpsRequest,
// which delegates to safeOutboundFetch with bypassProxyPatch. Behavior is byte-identical.
import { safeOutboundFetch } from "@/shared/network/safeOutboundFetch";

// Standardized desktop Chrome UA for web-cookie/no-auth session probes (minimizes anti-bot detection).
export const STANDARD_USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36";

export function getCustomUserAgent(providerSpecificData: any = {}) {
  if (typeof providerSpecificData?.customUserAgent !== "string") return null;
  const customUserAgent = providerSpecificData.customUserAgent.trim();
  return customUserAgent || null;
}

export function applyCustomUserAgent(
  headers: Record<string, string>,
  providerSpecificData: any = {}
) {
  const customUserAgent = getCustomUserAgent(providerSpecificData);
  if (!customUserAgent) return headers;
  headers["User-Agent"] = customUserAgent;
  if ("user-agent" in headers) {
    headers["user-agent"] = customUserAgent;
  }
  return headers;
}

export function withCustomUserAgent(init: RequestInit, providerSpecificData: any = {}) {
  return {
    ...init,
    headers: applyCustomUserAgent(
      { ...((init.headers as Record<string, string> | undefined) || {}) },
      providerSpecificData
    ),
  };
}

/**
 * Direct HTTPS request utility that bypasses the global patched fetch.
 * Used for provider validation where the patched fetch has compatibility issues.
 * Uses safeOutboundFetch with bypassProxyPatch to use native Node.js fetch directly.
 */
export function directHttpsRequest(
  url: string,
  options: { method?: string; headers?: Record<string, string>; body?: string },
  timeoutMs: number
): Promise<{ status: number; ok: boolean; text: () => Promise<string> }> {
  return safeOutboundFetch(url, {
    method: options.method || "GET",
    headers: (options.headers || {}) as Record<string, string>,
    body: options.body,
    timeoutMs,
    bypassProxyPatch: true,
    allowRedirect: true,
    guard: "none",
    retry: false,
  }).then(async (response) => ({
    status: response.status,
    ok: response.ok,
    text: async () => await response.text(),
  }));
}

export function buildBearerHeaders(apiKey: string, providerSpecificData: any = {}) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (apiKey) {
    headers.Authorization = `Bearer ${apiKey}`;
  }
  return applyCustomUserAgent(headers, providerSpecificData);
}

export function buildRekaHeaders(apiKey: string, providerSpecificData: any = {}) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (apiKey) {
    headers.Authorization = `Bearer ${apiKey}`;
    headers["X-Api-Key"] = apiKey;
  }

  return applyCustomUserAgent(headers, providerSpecificData);
}

export function buildClarifaiHeaders(apiKey: string, providerSpecificData: any = {}) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (apiKey) {
    headers.Authorization = `Key ${apiKey}`;
  }

  return applyCustomUserAgent(headers, providerSpecificData);
}

export function buildKeyHeaders(apiKey: string, providerSpecificData: any = {}) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (apiKey) {
    headers.Authorization = `Key ${apiKey}`;
  }

  return applyCustomUserAgent(headers, providerSpecificData);
}

export function buildTokenHeaders(apiKey: string, providerSpecificData: any = {}) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (apiKey) {
    headers.Authorization = `Token ${apiKey}`;
  }

  return applyCustomUserAgent(headers, providerSpecificData);
}
