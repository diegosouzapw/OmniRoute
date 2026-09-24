import { adaptBodyForCompression } from "../../services/compression/bodyAdapter.ts";
import { estimateTokens } from "../../services/contextManager.ts";

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
