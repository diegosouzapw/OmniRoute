/**
 * Records a request that was rejected BEFORE reaching handleChatCore — i.e. a
 * pipeline-gate rejection (provider circuit breaker OPEN / model cooldown) or a
 * combo whose targets were all exhausted. These paths short-circuit in
 * `chat.ts` and used to write only a `call_logs` row via `saveCallLog`, which
 * kept them visible in /dashboard/logs but left them absent from `usage_history`
 * — the table `getApiKeyUsageRows` reads. The effect was an API key whose
 * traffic was entirely gate-rejected showing "zero requests" despite real
 * usage (support-mesh escalation, 2026-07-08).
 *
 * This helper writes BOTH:
 *   1. the `call_logs` row (unchanged dashboard/logs visibility), and
 *   2. a `usage_history` row attributed to the api key with `success: false`,
 *      mirroring `persistFailureUsage` in the post-executor failure path,
 * so rejected traffic is counted per key just like executor-level failures.
 *
 * Best-effort: both writes swallow their own errors — logging a rejection must
 * never turn into a second failure on the response path.
 */
import { saveCallLog, saveRequestUsage } from "@/lib/usageDb";

export interface RejectedRequestUsageInput {
  status: number;
  model: string;
  requestedModel?: string;
  provider: string;
  endpoint?: string | null;
  error?: string | null;
  comboName?: string | null;
  comboStepId?: string | null;
  comboExecutionKey?: string | null;
  correlationId?: string | null;
  apiKeyId?: string | null;
  apiKeyName?: string | null;
  connectionId?: string | null;
  /** When the request started, for the duration/latency columns. */
  startTime?: number;
}

export async function recordRejectedRequestUsage(input: RejectedRequestUsageInput): Promise<void> {
  const {
    status,
    model,
    requestedModel,
    provider,
    endpoint,
    error,
    comboName = null,
    comboStepId = null,
    comboExecutionKey = null,
    correlationId = null,
    apiKeyId = null,
    apiKeyName = null,
    connectionId = undefined,
    startTime,
  } = input;

  const now = Date.now();
  const duration = typeof startTime === "number" ? now - startTime : 0;

  // 1. call_logs — preserves /dashboard/logs visibility (unchanged behavior).
  saveCallLog({
    id: undefined,
    method: "POST",
    path: endpoint || "/v1/chat/completions",
    status,
    model,
    requestedModel: requestedModel || model,
    provider,
    connectionId,
    duration,
    tokens: {},
    error: error || null,
    comboName,
    comboStepId,
    comboExecutionKey,
    apiKeyId,
    apiKeyName,
    correlationId,
  }).catch(() => {});

  // 2. usage_history — so the per-api-key usage counter reflects rejected
  //    traffic (success:false), matching persistFailureUsage semantics.
  await saveRequestUsage({
    provider,
    model,
    connectionId: connectionId ?? null,
    apiKeyId,
    apiKeyName,
    tokens: {},
    serviceTier: "standard",
    status: String(status),
    success: false,
    latencyMs: duration,
    comboStrategy: comboName || null,
    endpoint: endpoint || "/v1/chat/completions",
  }).catch(() => {});
}
