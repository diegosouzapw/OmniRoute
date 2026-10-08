// ─── Header Parsing ──────────────────────────────────────────────────────────

/**
 * Standard headers used by most providers (OpenAI, Fireworks, etc.)
 */
export const STANDARD_HEADERS = {
  limit: "x-ratelimit-limit-requests",
  remaining: "x-ratelimit-remaining-requests",
  reset: "x-ratelimit-reset-requests",
  limitTokens: "x-ratelimit-limit-tokens",
  remainingTokens: "x-ratelimit-remaining-tokens",
  resetTokens: "x-ratelimit-reset-tokens",
  retryAfter: "retry-after",
  overLimit: "x-ratelimit-over-limit",
};

/**
 * Anthropic uses custom headers
 */
export const ANTHROPIC_HEADERS = {
  limit: "anthropic-ratelimit-requests-limit",
  remaining: "anthropic-ratelimit-requests-remaining",
  reset: "anthropic-ratelimit-requests-reset",
  limitTokens: "anthropic-ratelimit-input-tokens-limit",
  remainingTokens: "anthropic-ratelimit-input-tokens-remaining",
  resetTokens: "anthropic-ratelimit-input-tokens-reset",
  retryAfter: "retry-after",
};

/**
 * Parse a reset time string into milliseconds.
 * Formats: "1s", "1m", "1h", "1ms", "2m59.56s", "60", ISO date, Unix timestamp
 */
export function parseResetTime(value) {
  const text = value?.trim();
  if (!text) return null;

  // Duration strings: "1s", "500ms", "1m30s", "2m59.56s"
  const durationMatch = text.match(
    /^(?:(\d+)h)?(?:(\d+)m(?!s))?(?:(\d+(?:\.\d+)?)s)?(?:(\d+(?:\.\d+)?)ms)?$/
  );
  if (durationMatch) {
    const [, h, m, s, ms] = durationMatch;
    return Math.round(
      (parseInt(h || 0) * 3600 + parseInt(m || 0) * 60 + parseFloat(s || 0)) * 1000 +
        parseFloat(ms || 0)
    );
  }

  // Pure number: assume seconds. Test the whole string — parseFloat alone also reads
  // the leading year of an ISO date ("2026-09-11T06:27:29Z" → 2026).
  if (/^\d+(?:\.\d+)?$/.test(text)) {
    const num = parseFloat(text);
    if (num > 0) {
      // If it looks like a Unix timestamp (> year 2025)
      if (num > 1700000000) {
        return Math.max(0, num * 1000 - Date.now());
      }
      return num * 1000;
    }
  }

  // ISO date string (Anthropic's anthropic-ratelimit-*-reset headers are RFC 3339)
  try {
    const date = new Date(text);
    if (!isNaN(date.getTime())) {
      return Math.max(0, date.getTime() - Date.now());
    }
  } catch {}

  return null;
}

export function toPlainHeaders(headers: unknown): Record<string, string> {
  if (!headers) return {};
  const plain: Record<string, string> = {};
  const obj = headers as Record<string, unknown>;
  if (typeof obj.forEach === "function") {
    try {
      (obj.forEach as (cb: (v: string, k: string) => void) => void)((v: string, k: string) => {
        plain[k.toLowerCase()] = v;
      });
      return plain;
    } catch {}
  }
  if (typeof obj.entries === "function") {
    try {
      for (const [k, v] of (obj.entries as () => Iterable<[string, string]>)()) {
        plain[k.toLowerCase()] = v;
      }
      return plain;
    } catch {}
  }
  try {
    for (const [k, v] of Object.entries(obj)) {
      plain[k.toLowerCase()] = v == null ? "" : String(v);
    }
  } catch {}
  return plain;
}
