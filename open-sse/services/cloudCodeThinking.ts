import { getModelSpec } from "../../src/shared/constants/modelSpecs.ts";

const CLOUD_CODE_REASONING_UNSUPPORTED_PATTERNS = [/^claude-/i, /^gpt-oss-/i, /^tab_/i];

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function normalizeCloudCodeModel(model: string): string {
  return String(model || "")
    .trim()
    .replace(/^models\//i, "")
    .replace(/^(?:antigravity|gemini-cli)\//i, "");
}

function stripGeminiThinkingConfig(value: unknown): unknown {
  if (!isRecord(value)) return value;
  if (!("thinkingConfig" in value) && !("thinking_config" in value)) return value;

  const next = { ...value };
  delete next.thinkingConfig;
  delete next.thinking_config;
  return next;
}

export function shouldStripCloudCodeThinking(provider: string, model: string): boolean {
  if (!provider || !model) return false;
  const normalizedModel = normalizeCloudCodeModel(model);
  const spec = getModelSpec(normalizedModel);
  if (typeof spec?.supportsThinking === "boolean") {
    return !spec.supportsThinking;
  }
  return CLOUD_CODE_REASONING_UNSUPPORTED_PATTERNS.some((pattern) => pattern.test(normalizedModel));
}

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
