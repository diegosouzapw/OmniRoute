/**
 * Secret masking utilities for MITM traffic inspection.
 * Applied to all headers/bodies before any log or broadcast.
 * Regex patterns are pre-compiled (order matters: BEARER first).
 *
 * Pattern sources: plano 11 §4.8 (origin: llm-interceptor proxy.py:310)
 */

// Pre-compiled regex patterns — ORDER IS SIGNIFICANT (BEARER must run first).
// BEARER matches the token after a standalone "Bearer " — NOT only after a
// literal "authorization:" prefix. sanitizeHeaders() masks header *values*
// ("Bearer <token>") with the key already stripped, so a prefix-anchored regex
// never fired there and short/opaque-but-<40 tokens leaked into the inspector
// (found by the AgentBridge live capture). The char class is bounded + linear
// (no nested quantifiers) to stay ReDoS-safe.
const BEARER = /(\bBearer\s+)[A-Za-z0-9._~+/-]+=*/gi;
const SK_KEY = /\b(sk|ak|pk)-[A-Za-z0-9_-]{16,}\b/g;
const LONG_TOKEN = /\b[A-Za-z0-9_-]{40,}\b/g;

/**
 * Mask secrets in a string value.
 * - Bearer tokens: replaces the token after any "Bearer " with "***"
 * - sk-/ak-/pk- keys: keeps first 6 chars + last 2 chars
 * - Long opaque tokens (≥40 chars): keeps first 4 chars + last 2 chars
 */
export function maskSecret(value: string): string {
  return value
    .replace(BEARER, "$1***")
    .replace(SK_KEY, (m) => `${m.slice(0, 6)}…${m.slice(-2)}`)
    .replace(LONG_TOKEN, (m) => `${m.slice(0, 4)}…${m.slice(-2)}`);
}
