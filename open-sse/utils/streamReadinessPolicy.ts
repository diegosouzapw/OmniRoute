type StreamReadinessBody = Record<string, unknown> | null | undefined;

export type StreamReadinessPolicyInput = {
  baseTimeoutMs: number;
  provider?: string | null;
  model?: string | null;
  body?: StreamReadinessBody;
  maxTimeoutMs?: number;
};

export type StreamReadinessPolicyResult = {
  timeoutMs: number;
  baseTimeoutMs: number;
  reasons: string[];
};

const DEFAULT_MAX_TIMEOUT_MS = 120_000;
const LARGE_ITEM_THRESHOLD = 150;
const VERY_LARGE_ITEM_THRESHOLD = 400;
const TOOL_HEAVY_THRESHOLD = 15;
const LARGE_CHAR_THRESHOLD = 250_000;
const VERY_LARGE_CHAR_THRESHOLD = 750_000;

function countArrayField(body: StreamReadinessBody, field: "input" | "messages" | "tools"): number {
  const value = body?.[field];
  return Array.isArray(value) ? value.length : 0;
}

function estimateBodyChars(body: StreamReadinessBody): number {
  if (!body) return 0;
  try {
    return JSON.stringify(body).length;
  } catch {
    return 0;
  }
}

function isCodexGpt55(provider?: string | null, model?: string | null): boolean {
  const normalizedProvider = (provider || "").toLowerCase();
  const normalizedModel = (model || "").toLowerCase();
  return normalizedProvider === "codex" && normalizedModel.includes("gpt-5.5");
}

export function resolveStreamReadinessTimeout(
  input: StreamReadinessPolicyInput
): StreamReadinessPolicyResult {
  const baseTimeoutMs = Math.max(0, Math.floor(input.baseTimeoutMs || 0));
  if (baseTimeoutMs <= 0) {
    return { timeoutMs: baseTimeoutMs, baseTimeoutMs, reasons: ["disabled"] };
  }

  const maxTimeoutMs = Math.max(baseTimeoutMs, input.maxTimeoutMs ?? DEFAULT_MAX_TIMEOUT_MS);
  const reasons: string[] = [];
  let timeoutMs = baseTimeoutMs;

  const inputCount = countArrayField(input.body, "input");
  const messageCount = countArrayField(input.body, "messages");
  const itemCount = Math.max(inputCount, messageCount);
  const toolCount = countArrayField(input.body, "tools");
  const estimatedChars = estimateBodyChars(input.body);
  const codexGpt55 = isCodexGpt55(input.provider, input.model);

  if (itemCount > VERY_LARGE_ITEM_THRESHOLD) {
    timeoutMs += 45_000;
    reasons.push("very_large_history");
  } else if (itemCount > LARGE_ITEM_THRESHOLD) {
    timeoutMs += 20_000;
    reasons.push("large_history");
  }

  if (toolCount >= TOOL_HEAVY_THRESHOLD) {
    timeoutMs += 15_000;
    reasons.push("tool_heavy");
  }

  if (estimatedChars > VERY_LARGE_CHAR_THRESHOLD) {
    timeoutMs += 45_000;
    reasons.push("very_large_payload");
  } else if (estimatedChars > LARGE_CHAR_THRESHOLD) {
    timeoutMs += 20_000;
    reasons.push("large_payload");
  }

  if (codexGpt55 && (itemCount > LARGE_ITEM_THRESHOLD || toolCount >= TOOL_HEAVY_THRESHOLD)) {
    timeoutMs += 30_000;
    reasons.push("codex_gpt_5_5_large_responses");
  }

  timeoutMs = Math.min(timeoutMs, maxTimeoutMs);
  if (timeoutMs === baseTimeoutMs) reasons.push("base");

  return { timeoutMs, baseTimeoutMs, reasons };
}
