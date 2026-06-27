/**
 * xAI Reasoning / Thinking Patcher
 *
 * Source of truth: router-for-me/CLIProxyAPI internal/thinking/provider/xai/apply.go
 *
 * Maps the various inbound reasoning/thinking spec shapes (OpenAI Chat,
 * OpenAI Responses, Anthropic Messages, Gemini) onto the xAI Responses
 * `reasoning` field. Single source of truth for budget mapping.
 *
 * Defaults policy mirrors CLIProxyAPI:
 *   - never proactively enable reasoning when the caller omits it
 *   - honor explicit caller intent verbatim
 */

const VALID_EFFORTS = new Set(["minimal", "low", "medium", "high"]);

export type ReasoningEffort = "minimal" | "low" | "medium" | "high";

/**
 * Map a numeric token budget to a discrete effort tier.
 *   <=0       → undefined (disabled)
 *   1..3999   → "low"
 *   4000..15999 → "medium"
 *   >=16000   → "high"
 */
export function budgetToEffort(budget: number): ReasoningEffort | undefined {
  if (typeof budget !== "number" || !Number.isFinite(budget) || budget <= 0) return undefined;
  if (budget >= 16000) return "high";
  if (budget >= 4000) return "medium";
  return "low";
}

interface AnthropicThinking {
  type?: string;
  budget_tokens?: number;
}

interface GeminiThinkingConfig {
  thinkingBudget?: number;
  includeThoughts?: boolean;
}

interface XaiReasoning {
  effort: ReasoningEffort;
}

interface ThinkingRequest {
  reasoning?: XaiReasoning | Record<string, unknown>;
  reasoning_effort?: string;
  thinking?: AnthropicThinking;
  thinkingConfig?: GeminiThinkingConfig;
  [key: string]: unknown;
}

interface ApplyThinkingOptions {
  defaultEffort?: ReasoningEffort;
}

/**
 * Apply reasoning/thinking patch to an xAI request body.
 *
 * Returns a new object — caller's request is not mutated.
 *
 * Recognized inbound shapes:
 *   - request.reasoning_effort: "minimal"|"low"|"medium"|"high"  (OpenAI Chat)
 *   - request.reasoning: { effort: ... }                          (OpenAI Responses)
 *   - request.thinking: { type: "enabled", budget_tokens: N }     (Anthropic)
 *   - request.thinkingConfig: { thinkingBudget: N, includeThoughts } (Gemini)
 */
export function applyThinking(
  request: ThinkingRequest,
  options: ApplyThinkingOptions = {},
): ThinkingRequest {
  if (!request || typeof request !== "object") return request;
  const out: ThinkingRequest = { ...request };

  // 1) Already xAI-native? Honor and stop.
  if (out.reasoning && typeof out.reasoning === "object") {
    const reasoning = out.reasoning as Record<string, unknown>;
    if (typeof reasoning.effort === "string" && VALID_EFFORTS.has(reasoning.effort)) {
      return out;
    }
  }

  // 2) OpenAI Chat reasoning_effort
  if (typeof out.reasoning_effort === "string" && VALID_EFFORTS.has(out.reasoning_effort)) {
    out.reasoning = { effort: out.reasoning_effort as ReasoningEffort };
    delete out.reasoning_effort;
    return out;
  }

  // 3) Anthropic-style thinking
  if (out.thinking && typeof out.thinking === "object") {
    if (out.thinking.type === "enabled") {
      const eff = budgetToEffort(out.thinking.budget_tokens ?? 0) ?? "medium";
      out.reasoning = { effort: eff };
    }
    delete out.thinking;
    return out;
  }

  // 4) Gemini-style thinkingConfig
  if (out.thinkingConfig && typeof out.thinkingConfig === "object") {
    const eff = budgetToEffort(out.thinkingConfig.thinkingBudget ?? 0);
    if (eff) out.reasoning = { effort: eff };
    delete out.thinkingConfig;
    return out;
  }

  // 5) Default — leave untouched, optionally apply defaultEffort
  if (options.defaultEffort && VALID_EFFORTS.has(options.defaultEffort)) {
    out.reasoning = { effort: options.defaultEffort };
  }
  return out;
}
