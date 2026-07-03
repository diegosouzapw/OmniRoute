// Pure upstream header helpers (User-Agent, extra headers, OpenAI-compat stripping).
// Extracted verbatim from base.ts. Module-private JsonRecord kept local to avoid a cycle.

type JsonRecord = Record<string, unknown>;

/** Apply model-level extra upstream headers (e.g. Authentication, X-Custom-Auth). */
export function mergeUpstreamExtraHeaders(
  headers: Record<string, string>,
  extra?: Record<string, string> | null
): void {
  if (!extra) return;
  for (const [k, v] of Object.entries(extra)) {
    if (typeof k === "string" && k.length > 0 && typeof v === "string") {
      if (k.toLowerCase() === "user-agent") {
        setUserAgentHeader(headers, v);
        continue;
      }
      headers[k] = v;
    }
  }
}

export function getCustomUserAgent(providerSpecificData?: JsonRecord | null): string | null {
  const customUserAgent =
    typeof providerSpecificData?.customUserAgent === "string"
      ? providerSpecificData.customUserAgent.trim()
      : "";
  return customUserAgent || null;
}

export function setUserAgentHeader(headers: Record<string, string>, userAgent: string): void {
  headers["User-Agent"] = userAgent;
  if ("user-agent" in headers) {
    headers["user-agent"] = userAgent;
  }
}

export function applyConfiguredUserAgent(
  headers: Record<string, string>,
  providerSpecificData?: JsonRecord | null
): void {
  const customUserAgent = getCustomUserAgent(providerSpecificData);
  if (customUserAgent) {
    setUserAgentHeader(headers, customUserAgent);
  }
}

/**
 * Returns true when the outbound request targets an OpenAI-compatible endpoint
 * (a `openai-compatible-*` provider, or a Chat Completions / Responses URL).
 * Used to scope the X-Stainless strip narrowly so genuine SDK-spoofing paths
 * (e.g. Claude Code compat, which legitimately ADDS X-Stainless-*) are untouched.
 */
export function isOpenAICompatibleEndpoint(provider: string, url: string): boolean {
  if (provider?.startsWith?.("openai-compatible-")) return true;
  return url.includes("/v1/chat/completions") || url.includes("/v1/responses");
}

/**
 * Strip OpenAI SDK (`X-Stainless-*`) metadata headers and normalize an SDK-derived
 * User-Agent for OpenAI-compatible passthrough requests. Some upstream gateways
 * 403 on these SDK-identifying headers. Only applied to OpenAI-compatible endpoints —
 * other providers (Claude/Claude Code compat) may legitimately send X-Stainless-*.
 *
 * Mutates `headers` in place and returns the list of stripped header keys (for logging).
 */
export function stripStainlessHeadersForOpenAICompat(
  headers: Record<string, string>,
  provider: string,
  url: string
): string[] {
  if (!isOpenAICompatibleEndpoint(provider, url)) return [];

  const strippedKeys: string[] = [];
  for (const key of Object.keys(headers)) {
    if (key.toLowerCase().startsWith("x-stainless-")) {
      delete headers[key];
      strippedKeys.push(key);
    }
  }

  // Normalize User-Agent: SDK-based clients send verbose product strings that some
  // upstreams block. Replace with a clean browser-like UA only when it looks SDK-derived.
  const ua = (headers["User-Agent"] || headers["user-agent"] || "").toLowerCase();
  if (
    ua.includes("openai") &&
    (ua.includes("node") || ua.includes("axios") || ua.includes("undici"))
  ) {
    setUserAgentHeader(headers, "Mozilla/5.0 (compatible; OpenAI Compatible)");
  }

  return strippedKeys;
}
