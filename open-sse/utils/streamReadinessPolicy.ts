import { jsonLength } from "./jsonSize.ts";
import { getRegistryEntry } from "../config/providerRegistry.ts";

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
  maxTimeoutMs: number;
  reasons: string[];
};

const DEFAULT_MAX_TIMEOUT_MS = 180_000;
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
    // #7847: count the serialized length without building the string — this runs on every
    // streaming request, and only `.length` was ever used. jsonLength is exact (property-tested
    // against JSON.stringify), so the readiness thresholds are unchanged.
    return jsonLength(body);
  } catch {
    return 0;
  }
}
// Official Anthropic endpoints — they have stable/quick cold starts, so no
// extra readiness bump is needed.
const OFFICIAL_CLAUDE_FORMAT_PROVIDERS = new Set(["claude", "anthropic"]);

/**
 * Third-party Claude-format providers (replicas like Minimax, ZAI,
 * bailian-coding-plan, agentrouter, wafer) inherit Anthropic's stream shape
 * but their reasoning warm-ups run significantly longer than first-party
 * claude/anthropic — enough that a default 80s readiness window 504s before
 * the upstream emits its first non-ping event. The `format: "claude"` entry
 * in the registry is the single source of truth for "this provider routes
 * through the Claude translator", so use it to bump the budget instead of
 * hand-curating an allowlist that drifts every time a new replica registers.
 */
function isSyntxProvider(provider?: string | null): boolean {
  const id = String(provider || "")
    .trim()
    .toLowerCase();
  return id === "syntx" || id === "stx";
}

function isClaudeFormatReasoningProvider(provider?: string | null): boolean {
  if (!provider) return false;
  const normalized = provider.toLowerCase();
  if (OFFICIAL_CLAUDE_FORMAT_PROVIDERS.has(normalized)) return false;
  const entry = getRegistryEntry(normalized);
  return entry?.format === "claude";
}

function isCodexGpt5x(provider?: string | null, model?: string | null): boolean {
  const normalizedProvider = (provider || "").toLowerCase();
  const normalizedModel = (model || "").toLowerCase();
  // Match the gpt-5.x family (gpt-5, gpt-5.1, gpt-5.5, ...) on the codex provider.
  return normalizedProvider === "codex" && /gpt-5(\.\d+)?/.test(normalizedModel);
}

/**
 * High-reasoning Codex GPT-5.x targets do a cold, expensive reasoning warm-up
 * (~78s TTFB) even for small prompts. Detect "high" reasoning effort either from
 * the model alias suffix (`...-high`) or from the request body's reasoning effort
 * field (OpenAI `reasoning_effort` or Responses API `reasoning.effort`).
 */
function isHighReasoningEffort(
  model: string | null | undefined,
  body: StreamReadinessBody
): boolean {
  const normalizedModel = (model || "").toLowerCase();
  if (/-high\b/.test(normalizedModel) || normalizedModel.endsWith("-high")) return true;

  const effort = (() => {
    const direct = body?.["reasoning_effort"];
    if (typeof direct === "string") return direct;
    const reasoning = body?.["reasoning"];
    if (reasoning && typeof reasoning === "object") {
      const nested = (reasoning as Record<string, unknown>)["effort"];
      if (typeof nested === "string") return nested;
    }
    return "";
  })();
  return effort.toLowerCase() === "high";
}

/**
 * Extended-thinking aliases (`claude-sonnet-5-thinking`, `claude-opus-4-6-thinking-1m`,
 * `gpt-5.6-luna-free-thinking`, ...) run the same cold reasoning warm-up that earns
 * codex high-effort targets their unconditional bump — the client asked for extended
 * thinking, so the first non-ping event is gated behind it regardless of prompt size.
 *
 * This is keyed on the model alias rather than the provider's registry `format`
 * because the providers that serve these models translate them themselves:
 * kiro (`format: "kiro"`, Anthropic models over CodeWhisperer), devin, antigravity
 * and chatgpt-web all publish `-thinking` ids while sitting outside the
 * claude-format bump. #11922 was exactly that gap — `kiro/claude-sonnet-5-thinking`
 * 504'd at the 125s readiness window (80s base + 45s large-history) because nothing
 * in this policy recognised the request as a reasoning target.
 */
function isExtendedThinkingModel(model?: string | null): boolean {
  if (!model) return false;
  // Matches `-thinking` at the end and before a further qualifier (`-thinking-1m`),
  // without matching unrelated ids that merely contain the word.
  return /-thinking(?:-|$)/.test(model.toLowerCase());
}

export function resolveStreamReadinessTimeout(
  input: StreamReadinessPolicyInput
): StreamReadinessPolicyResult {
  const baseTimeoutMs = Math.max(0, Math.floor(input.baseTimeoutMs || 0));
  if (baseTimeoutMs <= 0) {
    return { timeoutMs: baseTimeoutMs, baseTimeoutMs, maxTimeoutMs: baseTimeoutMs, reasons: ["disabled"] };
  }

  let maxTimeoutMs = Math.max(baseTimeoutMs, input.maxTimeoutMs ?? DEFAULT_MAX_TIMEOUT_MS);
  const reasons: string[] = [];
  let timeoutMs = baseTimeoutMs;

  const inputCount = countArrayField(input.body, "input");
  const messageCount = countArrayField(input.body, "messages");
  const itemCount = Math.max(inputCount, messageCount);
  const toolCount = countArrayField(input.body, "tools");
  const estimatedChars = estimateBodyChars(input.body);
  const codexGpt5x = isCodexGpt5x(input.provider, input.model);
  const codexHighReasoning = codexGpt5x && isHighReasoningEffort(input.model, input.body);
  const extendedThinking = isExtendedThinkingModel(input.model);

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

  // #3825: high-reasoning Codex GPT-5.x cold-starts at ~78s TTFB even for tiny
  // prompts, so the +30s readiness budget must fire UNCONDITIONALLY for the
  // high-effort case — the 80s base alone produced intermittent 504s at the
  // readiness window. The legacy large-request bump still applies to non-high
  // codex GPT-5.x requests (large history / tool-heavy).
  if (codexHighReasoning) {
    timeoutMs += 30_000;
    reasons.push("codex_gpt_5_5_high_reasoning");
  } else if (
    codexGpt5x &&
    (itemCount > LARGE_ITEM_THRESHOLD || toolCount >= TOOL_HEAVY_THRESHOLD)
  ) {
    timeoutMs += 30_000;
    reasons.push("codex_gpt_5_5_large_responses");
  }

  // Third-party Claude-format replicas (Minimax M2.7/M3, ZAI, bailian,
  // agentrouter, wafer, …) run long reasoning warm-ups before emitting the
  // first SSE event — enough that the default 80s readiness window 504s before
  // the upstream speaks. Mirror the codex_gpt_5_5_high_reasoning bump so this
  // class of provider cannot be misidentified as a stalled connection.
  // #11922: an explicitly-requested extended-thinking target warms up before it
  // emits anything, on whichever provider serves it. Mirror the codex high-effort
  // bump so the readiness watchdog cannot mistake that warm-up for a stalled
  // stream. Kept exclusive with the other reasoning bumps below — these all model
  // the same one-off warm-up, so they must not stack into a multi-minute window.
  if (extendedThinking && !codexHighReasoning) {
    timeoutMs += 30_000;
    reasons.push("extended_thinking");
  }

  if (isClaudeFormatReasoningProvider(input.provider) && !codexHighReasoning && !extendedThinking) {
    timeoutMs += 30_000;
    reasons.push("claude_format_heavy_reasoning");
  }

  // SYNTX generate+SSE can sit quiet for minutes (native search/code/shell,
  // long thinking). Raise both the budget and the clamp so Math.min cannot
  // pull a 10-minute window back down to the 180s default max.
  if (isSyntxProvider(input.provider)) {
    const syntxTimeoutMs = 600_000;
    timeoutMs = Math.max(timeoutMs, syntxTimeoutMs);
    maxTimeoutMs = Math.max(maxTimeoutMs, syntxTimeoutMs);
    reasons.push("syntx_long_generate");
  }

  timeoutMs = Math.min(timeoutMs, maxTimeoutMs);
  if (timeoutMs === baseTimeoutMs) reasons.push("base");

  return { timeoutMs, baseTimeoutMs, maxTimeoutMs, reasons };
}
