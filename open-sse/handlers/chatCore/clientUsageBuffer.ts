/**
 * chatCore client usage buffer/estimate (Quality Gate v2 / Fase 9 — chatCore god-file
 * decomposition, #3501).
 *
 * Extracted from handleChatCore's non-streaming success path: add a buffer to the response usage
 * and filter it for the client format (to prevent CLI context errors); if the provider returned no
 * usage block, fall back to estimating from the serialized content length. Mutates
 * `translatedResponse.usage` in place — byte-identical to the previous inline block, including the
 * `?.usage` guard, the `JSON.stringify(... || "")` content-length, and the `> 0` estimate gate.
 */
import {
  addBufferToUsage as defaultAddBuffer,
  filterUsageForFormat as defaultFilterUsage,
  estimateUsage as defaultEstimateUsage,
} from "../../utils/usageTracking.ts";

type ResponseLike = {
  usage?: unknown;
  choices?: Array<{ message?: { content?: unknown } }>;
} | null | undefined;

export interface ClientUsageBufferDeps {
  addBufferToUsage: typeof defaultAddBuffer;
  filterUsageForFormat: typeof defaultFilterUsage;
  estimateUsage: typeof defaultEstimateUsage;
}

const DEFAULT_DEPS: ClientUsageBufferDeps = {
  addBufferToUsage: defaultAddBuffer,
  filterUsageForFormat: defaultFilterUsage,
  estimateUsage: defaultEstimateUsage,
};

/** True when a usage object is present but every token field is zero/absent.
 * Web/unofficial providers often emit `{prompt_tokens:0,completion_tokens:0,total_tokens:0}`
 * because the upstream has no metering. Treating that as "has usage" makes
 * `addBufferToUsage` turn zeros into a constant `USAGE_TOKEN_BUFFER` (default 2000),
 * so every request shows exactly 2000 tokens. Prefer estimating instead. */
function isEmptyUsage(usage: unknown): boolean {
  if (!usage || typeof usage !== "object" || Array.isArray(usage)) return true;
  const u = usage as Record<string, unknown>;
  const fields = [
    "prompt_tokens",
    "completion_tokens",
    "total_tokens",
    "input_tokens",
    "output_tokens",
    "promptTokenCount",
    "candidatesTokenCount",
    "totalTokenCount",
  ];
  let sawNumber = false;
  for (const key of fields) {
    const v = u[key];
    if (typeof v !== "number" || !Number.isFinite(v)) continue;
    sawNumber = true;
    if (v > 0) return false;
  }
  // No positive counts (or no numeric fields at all) → treat as empty.
  return true;
}

export function applyClientUsageBuffer(
  translatedResponse: ResponseLike,
  body: unknown,
  clientResponseFormat: unknown,
  deps: ClientUsageBufferDeps = DEFAULT_DEPS
): void {
  // Add buffer and filter usage for client (to prevent CLI context errors)
  if (translatedResponse?.usage && !isEmptyUsage(translatedResponse.usage)) {
    const buffered = deps.addBufferToUsage(translatedResponse.usage);
    translatedResponse.usage = deps.filterUsageForFormat(buffered, clientResponseFormat);
  } else {
    // Fallback: estimate usage when provider returned no usage block
    // (or an all-zero stub — common for cookie/web reverse-engineered providers).
    const contentLength = JSON.stringify(
      translatedResponse?.choices?.[0]?.message?.content || ""
    ).length;
    if (contentLength > 0) {
      const estimated = deps.estimateUsage(body, contentLength, clientResponseFormat);
      translatedResponse.usage = deps.filterUsageForFormat(estimated, clientResponseFormat);
    }
  }
}
