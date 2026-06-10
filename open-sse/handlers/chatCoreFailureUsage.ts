/**
 * Persist failure usage to the usage history.
 *
 * This is called when a request fails (e.g., translation error, upstream error)
 * to record the failure in the usage history for monitoring and analytics.
 */

import { saveRequestUsage } from "@/lib/usage/usageHistory";

type PersistFailureUsageInput = {
  provider: string | null;
  model: string | null;
  startTime: number;
  connectionId: string | null;
  apiKeyInfo: { id?: string; name?: string } | null | undefined;
  effectiveServiceTier: string;
  isCombo: boolean;
  comboStrategy: string | undefined;
};

export async function persistFailureUsage(
  input: PersistFailureUsageInput,
  statusCode: number,
  errorCode?: string | null
): Promise<void> {
  try {
    await saveRequestUsage({
      provider: input.provider || "unknown",
      model: input.model || "unknown",
      tokens: { input: 0, output: 0, cacheRead: 0, cacheCreation: 0, reasoning: 0 },
      status: String(statusCode),
      success: false,
      latencyMs: Date.now() - input.startTime,
      timeToFirstTokenMs: 0,
      errorCode: errorCode || String(statusCode),
      timestamp: new Date().toISOString(),
      connectionId: input.connectionId || undefined,
      apiKeyId: input.apiKeyInfo?.id || undefined,
      apiKeyName: input.apiKeyInfo?.name || undefined,
      serviceTier: input.effectiveServiceTier,
      comboStrategy: input.isCombo ? input.comboStrategy || undefined : undefined,
    });
  } catch {
    // Best-effort — never throw to caller
  }
}
