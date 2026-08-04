import {
  getMaxEffortWhenThinkingDisabled,
  isAdaptiveThinkingOnly,
} from "@/shared/constants/modelSpecs.ts";

type JsonRecord = Record<string, unknown>;
const DIRECT_ANTHROPIC_API_PROVIDERS = new Set(["anthropic", "claude"]);

function asRecord(value: unknown): JsonRecord | null {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : null;
}

/**
 * Collapse manual extended thinking to adaptive for Claude models that no longer accept it.
 *
 * Claude Opus 4.7 and later (Opus 4.7/4.8/5, Fable 5) removed manual extended thinking: the
 * Messages API returns HTTP 400 for `thinking.type:"enabled"` and for ANY
 * `thinking.budget_tokens`. Reasoning is steered exclusively by `output_config.effort`
 * (Anthropic's current model migration guidance). OmniRoute can still produce a manual
 * thinking block on these models from several paths — a Claude-native passthrough client
 * sending the legacy shape, the OpenAI→Claude translator's reasoning_effort buckets, or a
 * per-model thinking default — so this is the final, provider-agnostic guard keyed on the
 * target model.
 *
 * Returns a NEW object only when it changes the body:
 *   - `thinking.type:"enabled"` → `"adaptive"` (the only supported enabled mode);
 *   - `thinking.budget_tokens` / `thinking.max_tokens` → dropped (rejected extras).
 * `thinking.type:"adaptive"` is left as-is (just stripped of any stray budget), and
 * `thinking.type:"disabled"` is left untouched — that's handled separately by
 * `normalizeThinkingForModel` for models that reject `disabled` (#3554), and by
 * `normalizeClaudeDisabledThinkingEffort` for direct Anthropic API constraints.
 *
 * No-op (returns the same reference) when the model is not adaptive-only, when there is no
 * thinking object, or when the thinking object already carries no manual-budget signal —
 * so adaptive defaults and effort hints reach the model unchanged.
 */
export function normalizeClaudeAdaptiveThinking<T extends Record<string, unknown>>(
  body: T,
  model: string | null | undefined
): T {
  if (!isAdaptiveThinkingOnly(model)) return body;
  const record = asRecord(body);
  if (!record) return body;

  const thinking = asRecord(record.thinking);
  if (!thinking) return body;

  const isManualType = thinking.type === "enabled";
  const hasBudget = thinking.budget_tokens !== undefined || thinking.max_tokens !== undefined;
  if (!isManualType && !hasBudget) return body;

  const nextThinking: JsonRecord = { ...thinking };
  if (nextThinking.type === "enabled") nextThinking.type = "adaptive";
  delete nextThinking.budget_tokens;
  delete nextThinking.max_tokens;

  return { ...record, thinking: nextThinking } as T;
}

/**
 * Enforce the direct Anthropic Messages API restriction for disabled thinking.
 *
 * Claude Opus 5 accepts `thinking.type:"disabled"` only through `high` effort.
 * This contract is verified for OmniRoute's two direct Anthropic API providers:
 * `anthropic` (API key) and `claude` (OAuth). GitHub Copilot and Claude Web use
 * separate upstream contracts and must not inherit this normalization.
 */
export function normalizeClaudeDisabledThinkingEffort<T extends Record<string, unknown>>(
  body: T,
  model: string | null | undefined,
  provider: string | null | undefined
): T {
  if (!provider || !DIRECT_ANTHROPIC_API_PROVIDERS.has(provider)) return body;

  const disabledEffortCap = getMaxEffortWhenThinkingDisabled(model);
  if (disabledEffortCap !== "high") return body;

  const record = asRecord(body);
  const thinking = asRecord(record?.thinking);
  const outputConfig = asRecord(record?.output_config);
  const effort = typeof outputConfig?.effort === "string" ? outputConfig.effort.toLowerCase() : "";
  if (thinking?.type !== "disabled" || !outputConfig || (effort !== "xhigh" && effort !== "max")) {
    return body;
  }

  return {
    ...record,
    output_config: { ...outputConfig, effort: disabledEffortCap },
  } as T;
}
