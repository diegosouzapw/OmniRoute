import { isAdaptiveThinkingOnly } from "@/shared/constants/modelSpecs.ts";

type JsonRecord = Record<string, unknown>;

function asRecord(value: unknown): JsonRecord | null {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : null;
}

/**
 * Collapse manual extended thinking to adaptive for Claude models that no longer accept it.
 *
 * Claude Opus 4.7 and later (Opus 4.7/4.8, Fable 5) removed manual extended thinking: the
 * Messages API returns HTTP 400 for `thinking.type:"enabled"` and for ANY
 * `thinking.budget_tokens`. Reasoning is steered exclusively by `output_config.effort`
 * (Anthropic migration guide, 2026-05-19). OmniRoute can still produce a manual thinking
 * block on these models from several paths — a Claude-native passthrough client sending the
 * legacy shape, the OpenAI→Claude translator's reasoning_effort buckets, or a per-model
 * thinking default — so this is the final, provider-agnostic guard keyed on the target model.
 *
 * Returns a NEW object only when it changes the body:
 *   - `thinking.type:"enabled"` → `"adaptive"` (the only supported mode);
 *   - `thinking.budget_tokens` / `thinking.max_tokens` → dropped (rejected extras).
 * `thinking.type:"adaptive"` is left as-is (just stripped of any stray budget), and
 * `thinking.type:"disabled"` is left untouched — that's handled separately by
 * `normalizeThinkingForModel` for the models that reject `disabled` (#3554).
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
