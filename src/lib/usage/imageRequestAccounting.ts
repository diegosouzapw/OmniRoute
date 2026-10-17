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
 *    for this physical attempt, attributed to the same key and connection, so
 *    the existing token extractors, pricing and per-key USD limits apply unchanged.
 *
 * Successful calls whose upstream reports no usage are deliberately NOT
 * written. Calls that report usage but have no pricing row are also skipped: a
 * zero-token row or a token row for an unpriced model would trip the fail-closed
 * budget guard (#12341) and lock a usage-limited key for the whole window, and
 * most image models ship without a token price. How to charge those calls
 * (per-image price, a cost column, or zero-cost rows) is left to a follow-up
 * decision.
 */

import { runWithCallLogApiKeyContext } from "./callLogApiKeyContext";
import { calculateCostDetailed } from "./costCalculator";
import { saveRequestUsage } from "./usageHistory";
import { saveCallLog } from "./callLogs";

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
  /** State-free native transports do not write their own call log. */
  recordCallLog?: boolean;
}

function connectionIdOf(credentials: unknown): string | null {
  if (!credentials || typeof credentials !== "object") return null;
  const connectionId = (credentials as { connectionId?: unknown }).connectionId;
  return typeof connectionId === "string" && connectionId.trim() ? connectionId.trim() : null;
}

function upstreamUsageOf(result: unknown): Record<string, unknown> | null {
  // Codex dedicated Images keeps usage in the existing public data envelope.
  // Read it without mutating that envelope or exposing internal handler fields.
  const imageResult = result as { usage?: unknown; data?: { usage?: unknown } } | null;
  const usage = imageResult?.usage ?? imageResult?.data?.usage;
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

  if (accounting.recordCallLog) {
    const outcome = result as { success?: boolean; status?: number } | null;
    await saveCallLog({
      method: "POST",
      path: accounting.endpoint,
      provider: accounting.provider,
      model: `${accounting.provider}/${toProviderLocalModel(accounting.provider, accounting.model)}`,
      status: outcome?.success === true ? 200 : outcome?.status || 502,
      duration: Date.now() - accounting.startTime,
      apiKeyId,
      apiKeyName,
      connectionId,
      requestBody: null,
      responseBody: null,
      ...(outcome?.success === true
        ? {}
        : { error: "Native image request failed; details withheld" }),
    });
  }

  const usage = upstreamUsageOf(result);
  if ((result as { success?: unknown } | null)?.success === true && usage) {
    const latencyMs = Date.now() - accounting.startTime;
    const localModel = toProviderLocalModel(accounting.provider, accounting.model);
    // Check pricing before writing the row. `apiKeyUsageLimits` deliberately fails
    // closed on any unpriced usage; writing a token row for a default image model
    // with no pricing entry would therefore lock the key after one successful image.
    // Keep the raw provider usage here so exact provider-reported costs (for example
    // xAI's cost_in_usd_ticks) remain visible to the calculator.
    const { priced, failed } = await calculateCostDetailed(
      accounting.provider,
      localModel,
      usage as Record<string, number | undefined>,
      { provider: accounting.provider, model: localModel }
    );
    // Skip only a genuinely missing price. A store failure must retain the
    // upstream token evidence for the existing fail-closed budget policy.
    if (!priced && !failed) return result;

    // saveRequestUsage never throws (it logs and swallows DB errors).
    await saveRequestUsage(
      {
        provider: accounting.provider,
        model: localModel,
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
      },
      { deduplicate: false }
    );
  }

  return result;
}
