import type { ModelPricingRegistry } from "./modelPricingRegistry.ts";

export type UsageStatus = "success" | "failed" | "rate_limited" | "timeout" | "cancelled";

export interface UsageRecord {
  id: string;
  providerId: string;
  connectionId?: string;
  modelId: string;
  poolId?: string;
  allocation?: number;
  inputTokens?: number;
  outputTokens?: number;
  totalTokens?: number;
  estimatedCostUsd?: number;
  latencyMs: number;
  status: UsageStatus;
  createdAt: string;
}

export interface UsageRecordInput extends Omit<UsageRecord, "totalTokens" | "estimatedCostUsd"> {
  totalTokens?: number;
  estimatedCostUsd?: number;
}

export function createUsageRecord(
  input: UsageRecordInput,
  pricing?: ModelPricingRegistry
): UsageRecord {
  const inputTokens = Number.isFinite(input.inputTokens) ? input.inputTokens : undefined;
  const outputTokens = Number.isFinite(input.outputTokens) ? input.outputTokens : undefined;
  const totalTokens =
    input.totalTokens ??
    (inputTokens !== undefined || outputTokens !== undefined
      ? (inputTokens ?? 0) + (outputTokens ?? 0)
      : undefined);
  const estimatedCostUsd =
    input.estimatedCostUsd ??
    (pricing && inputTokens !== undefined && outputTokens !== undefined
      ? pricing.estimate(input.providerId, input.modelId, inputTokens, outputTokens)
      : undefined);
  return {
    ...input,
    ...(inputTokens !== undefined ? { inputTokens } : {}),
    ...(outputTokens !== undefined ? { outputTokens } : {}),
    ...(totalTokens !== undefined ? { totalTokens } : {}),
    ...(estimatedCostUsd !== undefined ? { estimatedCostUsd } : {}),
  };
}

export function summarizeUsage(records: UsageRecord[]) {
  return records.reduce(
    (summary, record) => {
      summary.requests += 1;
      summary.successes += record.status === "success" ? 1 : 0;
      summary.failures += record.status === "success" ? 0 : 1;
      summary.inputTokens += record.inputTokens ?? 0;
      summary.outputTokens += record.outputTokens ?? 0;
      summary.totalTokens += record.totalTokens ?? 0;
      summary.estimatedCostUsd =
        summary.estimatedCostUsd === undefined || record.estimatedCostUsd === undefined
          ? undefined
          : summary.estimatedCostUsd + record.estimatedCostUsd;
      summary.latencyMs += record.latencyMs;
      return summary;
    },
    {
      requests: 0,
      successes: 0,
      failures: 0,
      inputTokens: 0,
      outputTokens: 0,
      totalTokens: 0,
      estimatedCostUsd: 0 as number | undefined,
      latencyMs: 0,
    }
  );
}
