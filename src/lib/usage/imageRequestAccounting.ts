/**
 * Per-attempt accounting for the image routes (/v1/images/generations and
 * /v1/images/edits, direct and combo paths).
 *
 * Chat requests reach `usage_history` through chatCore; the image routes never
 * did, so per-key USD limits (`apiKeyUsageLimits`, which re-price
 * `usage_history`) and per-key usage reports ignored image calls, and the combo
 * and edit paths also wrote `call_logs` rows without the API key or the
 * selected connection.
 *
 * `runImageRequestWithAccounting` wraps ONE provider attempt:
 *  - binds the API key and the attempt's connection to every call log the
 *    provider handler writes (request-scoped, see callLogApiKeyContext);
 *  - on success, when the handler result carries the upstream `usage` object
 *    (OpenAI-compatible image APIs return one), writes one `usage_history` row
 *    attributed to the same key and connection, so the existing token
 *    extractors, pricing and per-key USD limits apply unchanged.
 *
 * Successful calls whose upstream reports no usage are deliberately NOT
 * written: a zero-token row for a model without a pricing row would trip the
 * fail-closed budget guard (#12341) and lock a usage-limited key for the whole
 * window, and most image models ship without a token price. How to charge
 * those calls (per-image price, a cost column, or zero-cost rows) is left to a
 * follow-up decision.
 */

import { runWithCallLogApiKeyContext } from "./callLogApiKeyContext";
import { saveRequestUsage } from "./usageHistory";

export interface ImageRequestAccounting {
  /** Public route the client called, stored in `usage_history.endpoint`. */
  endpoint: string;
  provider: string;
  /** Model id; a leading `provider/` is stripped so it matches the pricing key. */
  model: string | null | undefined;
  apiKeyInfo?: { id?: string | null; name?: string | null } | null;
  /** Credentials selected for this attempt; only `connectionId` is read. */
  credentials?: unknown;
  startTime: number;
  comboStrategy?: string | null;
}

function connectionIdOf(credentials: unknown): string | null {
  if (!credentials || typeof credentials !== "object") return null;
  const connectionId = (credentials as { connectionId?: unknown }).connectionId;
  return typeof connectionId === "string" && connectionId.trim() ? connectionId.trim() : null;
}

function upstreamUsageOf(result: unknown): Record<string, unknown> | null {
  const usage = (result as { usage?: unknown } | null)?.usage;
  return usage && typeof usage === "object" && !Array.isArray(usage)
    ? (usage as Record<string, unknown>)
    : null;
}

function toProviderLocalModel(provider: string, model: string | null | undefined): string {
  const value = typeof model === "string" ? model : "";
  return value.startsWith(`${provider}/`) ? value.slice(provider.length + 1) : value;
}

export async function runImageRequestWithAccounting<T>(
  accounting: ImageRequestAccounting,
  attempt: () => Promise<T>
): Promise<T> {
  const connectionId = connectionIdOf(accounting.credentials);
  const apiKeyId = accounting.apiKeyInfo?.id || null;
  const apiKeyName = accounting.apiKeyInfo?.name || null;

  const result = await runWithCallLogApiKeyContext({ apiKeyId, apiKeyName, connectionId }, attempt);

  const usage = upstreamUsageOf(result);
  if ((result as { success?: unknown } | null)?.success === true && usage) {
    const latencyMs = Date.now() - accounting.startTime;
    // saveRequestUsage never throws (it logs and swallows DB errors).
    await saveRequestUsage({
      provider: accounting.provider,
      model: toProviderLocalModel(accounting.provider, accounting.model),
      tokens: usage,
      status: "200",
      success: true,
      latencyMs,
      timeToFirstTokenMs: latencyMs,
      connectionId,
      apiKeyId,
      apiKeyName,
      comboStrategy: accounting.comboStrategy || null,
      endpoint: accounting.endpoint,
    });
  }

  return result;
}
