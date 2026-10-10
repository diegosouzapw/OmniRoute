import { adaptBodyForCompression } from "../../services/compression/bodyAdapter.ts";
import { estimateTokens } from "../../services/contextManager.ts";
import {
  applyEstimatorCalibration,
  recordEstimatorCalibrationFromUsage,
} from "../../services/estimatorCalibration.ts";

type JsonRecord = Record<string, unknown>;

function asJsonRecord(value: unknown): JsonRecord | null {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : null;
}

export type FinalInputTokenBreakdown = {
  messages: number;
  tools: number;
  system: number;
  instructions: number;
  total: number;
};

export function estimateFinalInputTokenBreakdown(
  requestBody: JsonRecord | null | undefined
): FinalInputTokenBreakdown {
  const adapted = requestBody ? adaptBodyForCompression(requestBody).body : null;
  const nestedRequest = asJsonRecord(requestBody?.request);
  const messages =
    adapted?.messages ||
    requestBody?.contents ||
    nestedRequest?.contents ||
    (Array.isArray(requestBody?.input)
      ? requestBody.input
      : requestBody?.input && typeof requestBody.input === "object"
        ? requestBody.input
        : []);
  const breakdown = {
    messages: estimateTokens(messages),
    tools: Array.isArray(requestBody?.tools) ? estimateTokens(requestBody.tools) : 0,
    system: estimateTokens(requestBody?.system),
    instructions: estimateTokens(requestBody?.instructions),
  };
  return { ...breakdown, total: Object.values(breakdown).reduce((sum, value) => sum + value, 0) };
}

export function estimateFinalInputTokens(requestBody: JsonRecord | null | undefined): number {
  return estimateFinalInputTokenBreakdown(requestBody).total;
}

function toolsPresentIn(requestBody: JsonRecord | null | undefined): boolean {
  const tools = requestBody?.tools;
  return Array.isArray(tools) && tools.length > 0;
}

/**
 * #14931: the raw chars/4 estimate scaled by the learned actual/estimated
 * ratio for this provider/model × tools shape (services/estimatorCalibration).
 * The factor is 1.0 on cold start, so callers see the raw estimate until
 * trusted observations exist. Sits next to estimateFinalInputTokens so the
 * calibrated and raw numbers share one code path (same breakdown, same basis).
 */
export function estimateCalibratedFinalInputTokens(
  requestBody: unknown,
  provider: string | null | undefined,
  model: string | null | undefined
): number {
  const record = asJsonRecord(requestBody);
  const estimated = estimateFinalInputTokens(record);
  if (estimated <= 0) return estimated;
  return applyEstimatorCalibration(provider, model, estimated, toolsPresentIn(record));
}

/**
 * #14931: pair a guard-acted estimate with the provider's own prompt_tokens so
 * the calibration keeps learning. Thin adapter so the streaming and
 * non-streaming completion paths share one call shape; a no-op when the usage
 * carries no token count or the observation is rejected by the service.
 */
export function recordFinalInputCalibration(
  requestBody: unknown,
  provider: string | null | undefined,
  model: string | null | undefined,
  estimatedTokens: number,
  usage: unknown,
  aggregatedUsage = false
): void {
  recordEstimatorCalibrationFromUsage({
    provider,
    model,
    estimatedTokens,
    usage,
    toolsPresent: toolsPresentIn(asJsonRecord(requestBody)),
    aggregatedUsage,
  });
}
