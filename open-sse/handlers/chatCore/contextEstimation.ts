import { adaptBodyForCompression } from "../../services/compression/bodyAdapter.ts";
import { estimateTokens } from "../../services/contextManager.ts";

type JsonRecord = Record<string, unknown>;

function asJsonRecord(value: unknown): JsonRecord | null {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : null;
}

export function estimateFinalInputTokens(requestBody: JsonRecord | null | undefined): number {
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

  return (
    estimateTokens(messages) +
    (Array.isArray(requestBody?.tools) ? estimateTokens(requestBody.tools) : 0) +
    estimateTokens(requestBody?.system) +
    estimateTokens(requestBody?.instructions)
  );
}
