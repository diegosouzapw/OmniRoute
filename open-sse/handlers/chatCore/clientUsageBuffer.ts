/**
 * chatCore client usage buffer/estimate (Quality Gate v2 / Fase 9 — chatCore god-file
 * decomposition, #3501).
 *
 * Extracted from handleChatCore's non-streaming success path: add a buffer to the response usage
 * and filter it for the client format (to prevent CLI context errors); if the provider returned no
 * usage block, fall back to estimating from the serialized content length. Mutates
 * `translatedResponse.usage` in place. Invalid response values are ignored; valid response objects
 * retain the previous `JSON.stringify(... || "")` content-length and `> 0` estimate behavior.
 */
import {
  addBufferToUsage as defaultAddBuffer,
  filterUsageForFormat as defaultFilterUsage,
  estimateUsage as defaultEstimateUsage,
} from "../../utils/usageTracking.ts";

type ResponseLike = {
  usage?: unknown;
  choices?: Array<{ message?: { content?: unknown } }>;
};

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

export function applyClientUsageBuffer(
  translatedResponse: unknown,
  body: unknown,
  clientResponseFormat: string,
  deps: ClientUsageBufferDeps = DEFAULT_DEPS
): void {
  const response =
    translatedResponse &&
    typeof translatedResponse === "object" &&
    !Array.isArray(translatedResponse)
      ? (translatedResponse as ResponseLike)
      : null;
  if (!response) return;

  // Add buffer and filter usage for client (to prevent CLI context errors)
  if (response.usage) {
    const buffered = deps.addBufferToUsage(response.usage);
    response.usage = deps.filterUsageForFormat(buffered, clientResponseFormat);
  } else {
    // Fallback: estimate usage when provider returned no usage block
    const contentLength = JSON.stringify(response.choices?.[0]?.message?.content || "").length;
    if (contentLength > 0) {
      const estimated = deps.estimateUsage(body, contentLength, clientResponseFormat);
      response.usage = deps.filterUsageForFormat(estimated, clientResponseFormat);
    }
  }
}
