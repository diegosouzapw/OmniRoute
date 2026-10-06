/**
 * #10967: format an `exhaustedConnections` key stored by targetExhaustion.ts
 * (`markAuthLevelExhaustion` / `markAgentrouterConnectionQuotaExhaustion` /
 * `markConnectionLevelExhaustion`, all keyed as `` `${provider}:${connectionId}` ``)
 * into a diagnostics `excluded` entry.
 *
 * Before this fix, `buildComboDiag` (combo.ts) hardcoded `provider: "unknown"` and
 * `slice(0, 8)`'d the WHOLE key — for a typical `jina-ai:<uuid>` key that produced
 * `exhausted_connection:jina-ai:` (the 7-char provider id + colon consumed the
 * entire 8-char budget, the UUID silently dropped, and the real provider id
 * discarded in favor of the literal string "unknown").
 *
 * Splitting on the FIRST `:` recovers the real provider id and truncates only the
 * connection-id half (never the full UUID, matching the public combo projection's
 * connection-id redaction policy — #2300).
 */
export function formatExhaustedConnectionKey(key: string): {
  provider: string;
  reason: string;
} {
  const raw = String(key);
  const sepIdx = raw.indexOf(":");
  const provider = sepIdx >= 0 ? raw.slice(0, sepIdx) : "";
  const connId = sepIdx >= 0 ? raw.slice(sepIdx + 1) : raw;
  return {
    provider: provider || "unknown",
    reason: `exhausted_connection:${connId.slice(0, 8)}`,
  };
}
