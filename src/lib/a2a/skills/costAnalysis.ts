/**
 * Cost Analysis A2A Skill
 *
 * Estimates the cost of a single request (or a conversation) given the
 * pricing catalog in `src/shared/constants/pricing.ts`, and compares the
 * estimate against an optional budget cap carried in `task.metadata`.
 *
 * The skill is read-only: it does not enqueue or forward any LLM call.
 * Use it as a guard before committing to an expensive routing decision
 * (e.g. "would forwarding to Claude Opus 4 exceed my $0.10 cap?").
 *
 * Inputs (via task.metadata):
 *   - provider          (required, string) e.g. "anthropic", "openai"
 *   - model             (required, string) e.g. "claude-opus-4"
 *   - tokens            (optional, TokenUsage) — see pricing.ts for shape;
 *                       if omitted, skill estimates from message length.
 *   - budget_usd        (optional, number) — soft cap; recommendation flips
 *                       to "switch model" when projected cost > budget.
 *   - fallback_models   (optional, string[]) — ordered list of cheaper
 *                       alternatives to recommend if over budget.
 *
 * Output (A2ASkillResult.artifacts[0].content is JSON):
 *   {
 *     provider, model,
 *     pricing:   { input, output, cached, reasoning } | null,
 *     tokens:    { input, output, cached, reasoning },
 *     cost_usd:  number,
 *     budget_usd: number | null,
 *     over_budget: boolean,
 *     recommendation:
 *       | "proceed"
 *       | { action: "switch_model", suggested: string, reason: string }
 *       | { action: "estimate_only", reason: string },
 *     warnings: string[]
 *   }
 */

import { A2ATask } from "../taskManager";
import { A2ASkillResult } from "../taskExecution";
import {
  getPricingForModel,
  calculateCostFromTokens,
} from "@/shared/constants/pricing";

interface TokenUsageLite {
  input_tokens?: number;
  output_tokens?: number;
  cached_tokens?: number;
  reasoning_tokens?: number;
  prompt_tokens?: number;
  completion_tokens?: number;
  cache_read_input_tokens?: number;
  cache_creation_input_tokens?: number;
}

interface CostAnalysisInput {
  provider: string;
  model: string;
  tokens?: TokenUsageLite;
  budget_usd?: number;
  fallback_models?: string[];
}

interface CostAnalysisOutput {
  provider: string;
  model: string;
  pricing: { input: number; output: number; cached: number; reasoning: number } | null;
  tokens: { input: number; output: number; cached: number; reasoning: number };
  cost_usd: number;
  budget_usd: number | null;
  over_budget: boolean;
  recommendation:
    | "proceed"
    | { action: "switch_model"; suggested: string; reason: string }
    | { action: "estimate_only"; reason: string };
  warnings: string[];
}

/**
 * Coerce a TokenUsageLite into the canonical TokenUsage shape that
 * calculateCostFromTokens expects. Falls back to legacy field names.
 */
function normalizeTokens(raw: TokenUsageLite | undefined) {
  const inputTokens = raw?.prompt_tokens ?? raw?.input_tokens ?? 0;
  const cachedTokens =
    raw?.cached_tokens ?? raw?.cache_read_input_tokens ?? 0;
  const outputTokens = raw?.completion_tokens ?? raw?.output_tokens ?? 0;
  const reasoningTokens = raw?.reasoning_tokens ?? 0;
  const cacheCreationTokens = raw?.cache_creation_input_tokens ?? 0;
  return {
    inputTokens,
    cachedTokens,
    outputTokens,
    reasoningTokens,
    cacheCreationTokens,
  };
}

/**
 * Best-effort token estimate when caller did not supply `tokens`.
 * Uses a 4-chars-per-token heuristic — accurate enough for a guard, not
 * for billing. The caller should pass real token counts when available.
 */
function estimateTokensFromMessages(
  messages: Array<{ role: string; content: string }>,
): { inputTokens: number; outputTokens: number } {
  const CHARS_PER_TOKEN = 4;
  const inputChars = messages
    .filter((m) => m.role === "user" || m.role === "system")
    .reduce((acc, m) => acc + (m.content?.length ?? 0), 0);
  // For a one-shot estimate we assume output ~= input/2 (typical Q/A ratio).
  return {
    inputTokens: Math.ceil(inputChars / CHARS_PER_TOKEN),
    outputTokens: Math.ceil(inputChars / CHARS_PER_TOKEN / 2),
  };
}

function extractInput(metadata: Record<string, unknown> | undefined): CostAnalysisInput | null {
  if (!metadata) return null;
  const provider = typeof metadata.provider === "string" ? metadata.provider : null;
  const model = typeof metadata.model === "string" ? metadata.model : null;
  if (!provider || !model) return null;
  return {
    provider,
    model,
    tokens:
      metadata.tokens && typeof metadata.tokens === "object"
        ? (metadata.tokens as TokenUsageLite)
        : undefined,
    budget_usd:
      typeof metadata.budget_usd === "number" && Number.isFinite(metadata.budget_usd)
        ? metadata.budget_usd
        : undefined,
    fallback_models: Array.isArray(metadata.fallback_models)
      ? (metadata.fallback_models as unknown[]).filter(
          (m): m is string => typeof m === "string",
        )
      : undefined,
  };
}

function shapePricing(
  raw: Record<string, unknown> | null,
): CostAnalysisOutput["pricing"] {
  if (!raw) return null;
  return {
    input: typeof raw.input === "number" ? raw.input : 0,
    output: typeof raw.output === "number" ? raw.output : 0,
    cached: typeof raw.cached === "number" ? raw.cached : 0,
    reasoning: typeof raw.reasoning === "number" ? raw.reasoning : 0,
  };
}

export async function executeCostAnalysis(task: A2ATask): Promise<A2ASkillResult> {
  const input = extractInput(task.metadata);
  const warnings: string[] = [];

  if (!input) {
    return {
      artifacts: [
        {
          type: "text",
          content: JSON.stringify({
            error: "missing_metadata",
            message:
              "cost-analysis requires task.metadata.provider and task.metadata.model",
          }),
        },
      ],
    };
  }

  const pricingRaw = getPricingForModel(input.provider, input.model);
  if (!pricingRaw) {
    warnings.push(
      `No pricing entry for ${input.provider}/${input.model}; cost estimate is 0.`,
    );
  }

  const tokens = input.tokens
    ? normalizeTokens(input.tokens)
    : (() => {
        const est = estimateTokensFromMessages(task.messages ?? []);
        warnings.push(
          "Token counts not supplied; estimated from message length using 4 chars/token heuristic.",
        );
        return {
          inputTokens: est.inputTokens,
          outputTokens: est.outputTokens,
          cachedTokens: 0,
          reasoningTokens: 0,
          cacheCreationTokens: 0,
        };
      })();

  // calculateCostFromTokens accepts the pricing row and the canonical
  // TokenUsage shape; we pass through only the fields it reads.
  const cost = calculateCostFromTokens(
    {
      prompt_tokens: tokens.inputTokens,
      completion_tokens: tokens.outputTokens,
      cached_tokens: tokens.cachedTokens,
      reasoning_tokens: tokens.reasoningTokens,
      cache_creation_input_tokens: tokens.cacheCreationTokens,
    },
    (pricingRaw as Parameters<typeof calculateCostFromTokens>[1]) ?? null,
  );

  const budget = input.budget_usd ?? null;
  const overBudget = budget !== null && cost > budget;

  let recommendation: CostAnalysisOutput["recommendation"] = "proceed";
  if (overBudget && input.fallback_models && input.fallback_models.length > 0) {
    recommendation = {
      action: "switch_model",
      suggested: input.fallback_models[0],
      reason: `Projected $${cost.toFixed(6)} exceeds budget $${budget.toFixed(6)}; cheapest fallback is ${input.fallback_models[0]}.`,
    };
  } else if (overBudget) {
    recommendation = {
      action: "estimate_only",
      reason: `Projected $${cost.toFixed(6)} exceeds budget $${budget.toFixed(6)}; no fallbacks supplied — caller must decide.`,
    };
  }

  const output: CostAnalysisOutput = {
    provider: input.provider,
    model: input.model,
    pricing: shapePricing(pricingRaw),
    tokens: {
      input: tokens.inputTokens,
      output: tokens.outputTokens,
      cached: tokens.cachedTokens,
      reasoning: tokens.reasoningTokens,
    },
    cost_usd: cost,
    budget_usd: budget,
    over_budget: overBudget,
    recommendation,
    warnings,
  };

  return {
    artifacts: [
      {
        type: "text",
        content: JSON.stringify(output),
      },
    ],
    metadata: {
      cost_usd: cost,
      over_budget: overBudget,
    },
  };
}