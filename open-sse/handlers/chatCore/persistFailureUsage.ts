import { saveRequestUsage } from "@/lib/usageDb";
import { buildFailureUsageRecord, type FailureUsageAggregate } from "./failureUsage.ts";
import { readCpaAuthIndex } from "./cpaTraceAuthIndex.ts";

export interface PersistFailureUsageInput {
  provider: string;
  model: string;
  getCurrentConnectionId: () => string | null | undefined;
  apiKeyInfo?: { id?: string } | null;
  effectiveServiceTier: string;
  isCombo: boolean;
  comboStrategy?: string | null;
  endpointPath?: string | null;
  startTime: number;
  getProviderResponse: () => { headers?: Headers } | null | undefined;
}

export function createPersistFailureUsage(input: PersistFailureUsageInput) {
  return (
    statusCode: number,
    errorCode?: string | null,
    aggregate?: FailureUsageAggregate | null
  ) => {
    const providerResponse = input.getProviderResponse();
    saveRequestUsage(
      buildFailureUsageRecord({
        provider: input.provider,
        model: input.model,
        connectionId: input.getCurrentConnectionId(),
        apiKeyInfo: input.apiKeyInfo,
        effectiveServiceTier: input.effectiveServiceTier,
        isCombo: input.isCombo,
        comboStrategy: input.comboStrategy,
        statusCode,
        errorCode,
        latencyMs: Date.now() - input.startTime,
        endpoint: input.endpointPath,
        cpaAuthIndex: readCpaAuthIndex(providerResponse),
        aggregate: aggregate ?? undefined,
      })
    ).catch(() => {});
  };
}
