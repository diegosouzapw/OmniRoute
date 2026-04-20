import { supportsReasoning } from "./modelCapabilities.ts";

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function stripGeminiThinkingConfig(value: unknown): unknown {
  if (!isRecord(value)) return value;
  if (!("thinkingConfig" in value) && !("thinking_config" in value)) return value;

  const next = { ...value };
  delete next.thinkingConfig;
  delete next.thinking_config;
  return next;
}

/**
 * @deprecated This function will be removed in v4.0, reasoning configuration processing has migrated to translateRequest
 */
export function shouldStripCloudCodeThinking(provider: string, model: string): boolean {
  if (!provider || !model) return false;
  return !supportsReasoning(`${provider}/${model}`);
}

/**
 * @deprecated This function will be removed in v4.0, reasoning configuration processing has migrated to translateRequest
 */
export function stripCloudCodeThinkingConfig(
  body: Record<string, unknown>
): Record<string, unknown> {
  const next = { ...body };

  delete next.reasoning_effort;
  delete next.reasoning;
  delete next.thinking;

  if ("generationConfig" in next) {
    next.generationConfig = stripGeminiThinkingConfig(next.generationConfig);
  }

  if (isRecord(next.request)) {
    const request = { ...next.request };
    if ("generationConfig" in request) {
      request.generationConfig = stripGeminiThinkingConfig(request.generationConfig);
    }
    next.request = request;
  }

  return next;
}
