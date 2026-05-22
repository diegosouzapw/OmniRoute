/**
 * Pipeline Router — Smart Auto-Pipeline Orchestrator
 *
 * Bridges combo routing with the multi-stage pipeline engine.
 * Classifies prompt intent, selects pipeline template, executes stages
 * through a stageExecutor that wraps handleChatCore.
 *
 * @module services/autoCombo/pipelineRouter
 */

import { classifyPromptIntent, type IntentType } from "../intentClassifier.ts";
import {
  executePipeline,
  buildPipelineConfig,
  type TaskType,
  type PipelineResult,
  type FitnessTier,
} from "../../../src/domain/pipeline.ts";
import { renderPrompt } from "../../../src/domain/prompts.ts";
import { getTaskFitness } from "./taskFitness.ts";

// ---------------------------------------------------------------------------
// Fitness tiers — map pipeline behavior to model fitness thresholds
// ---------------------------------------------------------------------------

export interface FitnessTierConfig {
  minFitness?: number;
  maxFitness?: number;
}

export const FITNESS_TIERS: Record<string, FitnessTierConfig> = {
  "best-reasoning": { minFitness: 0.85 },
  cheapest: { maxFitness: 0.75 },
  moderate: { minFitness: 0.6, maxFitness: 0.9 },
};

// ---------------------------------------------------------------------------
// Intent → TaskType mapping
// ---------------------------------------------------------------------------

const INTENT_TO_TASK: Record<IntentType, TaskType> = {
  code: "code",
  math: "math",
  reasoning: "reasoning",
  creative: "creative",
  medium: "medium",
  simple: "simple",
};

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface PipelineComboParams {
  body: Record<string, unknown>;
  combo: Record<string, unknown>;
  handleChatCore: (body: Record<string, unknown>, modelStr?: string) => Promise<Response>;
  log: {
    info: (...args: unknown[]) => void;
    warn: (...args: unknown[]) => void;
    error: (...args: unknown[]) => void;
  };
  settings: Record<string, unknown>;
  signal?: AbortSignal;
}

export interface StageExecutorArgs {
  messages: Array<{ role: string; content: string }>;
  stream: boolean;
  fitnessTier?: string;
}

export interface StageExecutorResult {
  text: string;
  response?: Response;
}

// ---------------------------------------------------------------------------
// Model resolver — maps fitness tiers to actual model strings
// ---------------------------------------------------------------------------

/**
 * Resolve a fitness tier to a concrete model string using the available models
 * from the combo's candidate pool. Falls back to sensible defaults.
 */
function resolveModelForTier(
  tier: FitnessTier,
  availableModels: string[],
  taskType: string
): string {
  // Score each available model for this task type and tier
  const scored = availableModels
    .map((model) => ({
      model,
      fitness: getTaskFitness(model, taskType),
    }))
    .sort((a, b) => b.fitness - a.fitness);

  const tierConfig = FITNESS_TIERS[tier] as FitnessTierConfig | undefined;
  if (!tierConfig) return scored[0]?.model ?? "deepseek-chat";

  // Filter by fitness threshold
  const filtered = scored.filter(({ fitness }) => {
    if (tierConfig.minFitness !== undefined && fitness < tierConfig.minFitness) return false;
    if (tierConfig.maxFitness !== undefined && fitness > tierConfig.maxFitness) return false;
    return true;
  });

  // Return best match in tier, or fall back to best available
  return filtered[0]?.model ?? scored[0]?.model ?? "deepseek-chat";
}

// ---------------------------------------------------------------------------
// Stage executor factory
// ---------------------------------------------------------------------------

/**
 * Create a stageExecutor that wraps handleChatCore for pipeline stage execution.
 *
 * - Intermediate stages (stream:false): buffer the response, extract text
 * - Final stage (stream:true): return raw Response for SSE streaming
 * - Each stage gets a model override based on its fitness tier
 */
function createStageExecutor(
  body: Record<string, unknown>,
  handleChatCore: (body: Record<string, unknown>, modelStr?: string) => Promise<Response>,
  log: { info: (...args: unknown[]) => void; warn: (...args: unknown[]) => void },
  availableModels: string[],
  taskType: string
): (args: StageExecutorArgs & { fitnessTier?: FitnessTier }) => Promise<StageExecutorResult> {
  return async ({
    messages,
    stream,
    fitnessTier,
  }: StageExecutorArgs & { fitnessTier?: FitnessTier }): Promise<StageExecutorResult> => {
    // Resolve model for this stage's fitness tier
    const model = fitnessTier
      ? resolveModelForTier(fitnessTier, availableModels, taskType)
      : undefined;

    // Build a modified request body with pipeline stage messages
    const stageBody: Record<string, unknown> = {
      ...body,
      messages,
      stream,
    };

    log.info("PIPELINE", `Stage: tier=${fitnessTier}, model=${model}, stream=${stream}`);
    const response = await handleChatCore(stageBody, model);

    // Final stage: return raw Response for streaming
    if (stream) {
      return { text: "", response };
    }

    // Intermediate stage: buffer and extract text
    if (!response.ok) {
      const errorText = await response.text().catch(() => "unknown error");
      log.warn("PIPELINE", `Stage returned ${response.status}: ${errorText.slice(0, 200)}`);
      return { text: "" };
    }

    try {
      const json = await response.json();
      // OpenAI chat completions format: choices[0].message.content
      const content = json?.choices?.[0]?.message?.content;
      if (typeof content === "string") {
        return { text: content };
      }
      // Fallback: try to extract any text field
      return { text: JSON.stringify(json) };
    } catch {
      log.warn("PIPELINE", "Failed to parse stage response as JSON");
      return { text: "" };
    }
  };
}

// ---------------------------------------------------------------------------
// Token estimation
// ---------------------------------------------------------------------------

/**
 * Rough token estimate from message content (4 chars ≈ 1 token).
 */
function estimateTokens(messages: Array<{ role: string; content: unknown }>): number {
  let total = 0;
  for (const msg of messages) {
    if (typeof msg.content === "string") {
      total += Math.ceil(msg.content.length / 4);
    } else if (Array.isArray(msg.content)) {
      for (const part of msg.content) {
        if (
          typeof part === "object" &&
          part !== null &&
          typeof (part as Record<string, unknown>).text === "string"
        ) {
          total += Math.ceil(((part as Record<string, unknown>).text as string).length / 4);
        }
      }
    }
  }
  return total;
}

// ---------------------------------------------------------------------------
// Main pipeline handler
// ---------------------------------------------------------------------------

/**
 * Handle a combo request through the multi-stage pipeline.
 *
 * Flow:
 * 1. Classify prompt intent → task type
 * 2. Build pipeline config from task type
 * 3. Execute pipeline with stageExecutor wrapping handleChatCore
 * 4. Return PipelineResult (intermediate) or streaming Response (final)
 *
 * @returns PipelineResult for diagnostic purposes, or a streaming Response
 *   when the final stage streams.
 */
export async function handlePipelineCombo({
  body,
  combo,
  handleChatCore,
  log,
  settings,
  signal,
}: PipelineComboParams): Promise<PipelineResult | Response> {
  const config = (combo as Record<string, unknown>).config as Record<string, unknown> | undefined;
  const pipelineEnabled =
    config?.pipeline_enabled ?? (settings as Record<string, unknown>).pipeline_enabled ?? false;

  if (!pipelineEnabled) {
    log.info("PIPELINE", "Pipeline disabled for this combo");
    // Fall through — caller should handle with standard combo logic
    throw new Error("PIPELINE_DISABLED");
  }

  // ── Token threshold check ────────────────────────────────────────────────
  const messages = (body.messages as Array<{ role: string; content: unknown }>) || [];
  const tokenEstimate = estimateTokens(messages);
  const skipThreshold =
    (config?.skip_pipeline_for_tokens_under as number) ??
    ((settings as Record<string, unknown>).skip_pipeline_for_tokens_under as number) ??
    50;

  if (tokenEstimate < skipThreshold) {
    log.info(
      "PIPELINE",
      `Token estimate ${tokenEstimate} < threshold ${skipThreshold}, skipping pipeline`
    );
    throw new Error("PIPELINE_TOKEN_THRESHOLD");
  }

  // ── Intent classification ─────────────────────────────────────────────────
  const lastUserMsg = [...messages].reverse().find((m) => m.role === "user");
  const promptText =
    typeof lastUserMsg?.content === "string"
      ? lastUserMsg.content
      : Array.isArray(lastUserMsg?.content)
        ? (lastUserMsg.content as Array<{ type: string; text?: string }>)
            .filter((b) => b.type === "text")
            .map((b) => b.text || "")
            .join(" ")
        : "";

  const systemMsg = messages.find((m) => m.role === "system");
  const systemText = typeof systemMsg?.content === "string" ? systemMsg.content : undefined;

  const intent = classifyPromptIntent(promptText, systemText);
  const taskType = INTENT_TO_TASK[intent] ?? "simple";

  log.info("PIPELINE", `Intent: ${intent} → task: ${taskType}`);

  // ── Build pipeline config ─────────────────────────────────────────────────
  const pipelineConfig = buildPipelineConfig(promptText, taskType);

  // ── Extract available models from combo ────────────────────────────────────
  const comboModels = (combo as Record<string, unknown>).models as string[] | undefined;
  const availableModels = comboModels?.length ? comboModels : ["deepseek-chat"];

  // ── Create stage executor ─────────────────────────────────────────────────
  const stageExecutor = createStageExecutor(body, handleChatCore, log, availableModels, taskType);

  // ── Execute pipeline ──────────────────────────────────────────────────────
  const maxReflectionLoops =
    (config?.max_reflection_loops as number) ??
    ((settings as Record<string, unknown>).max_reflection_loops as number) ??
    1;

  // Track reflection loops
  let reflectionCount = 0;
  const wrappedExecutor = async (args: StageExecutorArgs) => {
    // fitnessTier is now passed by the pipeline engine via StageExecutorArgs
    return stageExecutor({ ...args, fitnessTier: args.fitnessTier as FitnessTier | undefined });
  };

  const result = await executePipeline(pipelineConfig, wrappedExecutor);

  // ── Handle reflection loops ───────────────────────────────────────────────
  // If reflect failed and we haven't exceeded max loops, re-run execute+reflect
  if (result.reflectVerdict === "fail" && reflectionCount < maxReflectionLoops) {
    reflectionCount++;
    log.info(
      "PIPELINE",
      `Reflection failed, re-running (loop ${reflectionCount}/${maxReflectionLoops})`
    );

    // Re-execute with corrected context from reflection
    const retryConfig = buildPipelineConfig(promptText, taskType);
    const retryResult = await executePipeline(retryConfig, wrappedExecutor);

    // Use retry result if it passed, otherwise keep original
    if (retryResult.reflectVerdict === "pass") {
      return retryResult;
    }
  }

  // ── Return result ─────────────────────────────────────────────────────────
  // Check if the last stage has a streaming Response
  const lastStage = result.stages[result.stages.length - 1];

  // If result contains a Response (from streaming final stage), return it directly
  // This happens when the pipeline decides to stream the final output
  if (lastStage?.text === "" && result.text) {
    // Non-streaming result — return as PipelineResult
    return result;
  }

  log.info(
    "PIPELINE",
    `Complete: ${result.stages.length} stages, fallback=${result.fallback}, verdict=${result.reflectVerdict}`
  );
  return result;
}
