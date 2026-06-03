/**
 * Pipeline Engine — Smart Auto-Pipeline
 *
 * Pure pipeline engine that orchestrates multi-stage LLM execution.
 * No side effects — delegates execution to a caller-provided StageExecutor.
 *
 * @module domain/pipeline
 */

import { type StageName, renderPrompt } from "./prompts";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type TaskType = "code" | "math" | "reasoning" | "creative" | "medium" | "simple";

export type FitnessTier = "best-reasoning" | "cheapest" | "moderate";

export interface PipelineStage {
  name: StageName;
  /** Fitness tier for provider selection. */
  fitnessTier: FitnessTier;
  /** Override system prompt for this stage (optional). */
  systemOverride?: string;
}

export interface PipelineConfig {
  /** Pipeline stages to execute in order. */
  stages: PipelineStage[];
  /** Original user request. */
  request: string;
  /** Optional task type hint. */
  taskType?: TaskType;
}

export interface StageResult {
  stage: StageName;
  text: string;
  provider?: string;
  latencyMs: number;
  inputTokens?: number;
  outputTokens?: number;
  skipped?: boolean;
  error?: string;
}

export interface PipelineResult {
  /** Final output text (best available). */
  text: string;
  /** Per-stage results in execution order. */
  stages: StageResult[];
  /** Whether fallback was triggered (any stage failed). */
  fallback: boolean;
  /** Reflect verdict: "pass" | "fail" | null (not applicable or parse failure). */
  reflectVerdict: "pass" | "fail" | null;
}

export interface StageExecutorArgs {
  messages: Array<{ role: string; content: string }>;
  stream: boolean;
  /** Fitness tier hint for this stage — caller uses for provider selection. */
  fitnessTier?: FitnessTier;
}

export interface StageExecutorResult {
  text: string;
  response?: Response;
  provider?: string;
  inputTokens?: number;
  outputTokens?: number;
}

/**
 * Caller-provided function that executes a single LLM call.
 * The pipeline engine never makes network calls directly.
 */
export type StageExecutor = (args: StageExecutorArgs) => Promise<StageExecutorResult>;

// ---------------------------------------------------------------------------
// Pipeline templates per task type
// ---------------------------------------------------------------------------

const TASK_STAGES: Record<TaskType, Array<{ name: StageName; fitnessTier: FitnessTier }>> = {
  code: [
    { name: "plan", fitnessTier: "best-reasoning" },
    { name: "execute", fitnessTier: "cheapest" },
    { name: "reflect", fitnessTier: "moderate" },
    { name: "fix", fitnessTier: "cheapest" },
  ],
  math: [
    { name: "execute", fitnessTier: "best-reasoning" },
    { name: "reflect", fitnessTier: "moderate" },
  ],
  reasoning: [
    { name: "execute", fitnessTier: "best-reasoning" },
    { name: "reflect", fitnessTier: "moderate" },
  ],
  creative: [
    { name: "execute", fitnessTier: "moderate" },
    { name: "reflect", fitnessTier: "best-reasoning" },
  ],
  medium: [{ name: "execute", fitnessTier: "moderate" }],
  simple: [{ name: "execute", fitnessTier: "cheapest" }],
};

/**
 * Build a PipelineConfig for a given task type and request.
 */
export function buildPipelineConfig(request: string, taskType: TaskType): PipelineConfig {
  const stageNames = TASK_STAGES[taskType] ?? TASK_STAGES.simple;
  return {
    request,
    taskType,
    stages: stageNames,
  };
}

// ---------------------------------------------------------------------------
// Reflect JSON parsing
// ---------------------------------------------------------------------------

export interface ReflectPass {
  status: "pass";
  confirmation: string;
}

export interface ReflectFail {
  status: "fail";
  issues: string[];
  corrected: string;
}

export type ReflectResult = ReflectPass | ReflectFail;

const JSON_BLOCK_RE = /```(?:json)?\s*([\s\S]*?)```/;
const JSON_OBJECT_RE = /\{[\s\S]*\}/;

/**
 * Parse the reflect stage output as structured JSON.
 * Returns null if the output cannot be parsed (conservative: treated as fail).
 */
export function parseReflectJson(text: string): ReflectResult | null {
  if (!text || typeof text !== "string") return null;

  let jsonStr = text.trim();

  // Try extracting from markdown code block first
  const blockMatch = jsonStr.match(JSON_BLOCK_RE);
  if (blockMatch) {
    jsonStr = blockMatch[1].trim();
  } else {
    // Try extracting raw JSON object
    const objectMatch = jsonStr.match(JSON_OBJECT_RE);
    if (objectMatch) {
      jsonStr = objectMatch[0];
    }
  }

  try {
    const parsed = JSON.parse(jsonStr) as Record<string, unknown>;
    if (typeof parsed !== "object" || parsed === null) return null;

    if (parsed.status === "pass" && typeof parsed.confirmation === "string") {
      return { status: "pass", confirmation: parsed.confirmation };
    }

    if (parsed.status === "fail") {
      const issues = Array.isArray(parsed.issues)
        ? parsed.issues.filter((i): i is string => typeof i === "string")
        : [];
      const corrected = typeof parsed.corrected === "string" ? parsed.corrected : "";
      return { status: "fail", issues, corrected };
    }

    return null;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Pipeline execution
// ---------------------------------------------------------------------------

async function executeStage(
  stage: PipelineStage,
  request: string,
  context: Record<string, string>,
  executor: StageExecutor
): Promise<StageResult> {
  const rendered = renderPrompt(stage.name, {
    original_request: request,
    ...context,
  });

  const system = stage.systemOverride ?? rendered.system;
  const messages = [
    { role: "system", content: system },
    { role: "user", content: rendered.user },
  ];

  const start = Date.now();
  try {
    const result = await executor({ messages, stream: false, fitnessTier: stage.fitnessTier });
    return {
      stage: stage.name,
      text: result.text,
      provider: result.provider,
      latencyMs: Date.now() - start,
      inputTokens: result.inputTokens,
      outputTokens: result.outputTokens,
    };
  } catch (err) {
    return {
      stage: stage.name,
      text: "",
      latencyMs: Date.now() - start,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

/**
 * Execute a multi-stage pipeline.
 *
 * After the reflect stage, parses structured JSON:
 *  - pass → skip fix stage
 *  - fail → run fix stage with corrected output
 *  - parse failure → treated as fail (conservative)
 *
 * Any stage failure triggers fallback:true and returns best available output.
 */
export async function executePipeline(
  config: PipelineConfig,
  executor: StageExecutor
): Promise<PipelineResult> {
  const { stages, request } = config;
  const results: StageResult[] = [];
  let fallback = false;
  let reflectVerdict: "pass" | "fail" | null = null;
  let context: Record<string, string> = {};

  for (let i = 0; i < stages.length; i++) {
    const stage = stages[i];

    // Skip fix if reflect passed
    if (stage.name === "fix" && reflectVerdict === "pass") {
      results.push({
        stage: "fix",
        text: "",
        latencyMs: 0,
        skipped: true,
      });
      continue;
    }

    const result = await executeStage(stage, request, context, executor);
    results.push(result);

    // If a stage errored, mark fallback and break
    if (result.error) {
      fallback = true;
      break;
    }

    // Thread context forward
    if (stage.name === "plan") {
      context.plan_context = result.text;
    } else if (stage.name === "execute") {
      context.execution_response = result.text;
    } else if (stage.name === "reflect") {
      context.reflection_response = result.text;
      const parsed = parseReflectJson(result.text);
      if (parsed === null) {
        // Parse failure → conservative fail
        reflectVerdict = "fail";
      } else {
        reflectVerdict = parsed.status;
        if (parsed.status === "fail" && parsed.corrected) {
          context.execution_response = parsed.corrected;
        }
      }
    } else if (stage.name === "fix") {
      context.execution_response = result.text;
    }
  }

  // Pick best available output: fix > reflect-corrected > execute > last successful
  const fixResult = results.find((r) => r.stage === "fix" && !r.skipped && !r.error);
  const executeResult = results.find((r) => r.stage === "execute" && !r.error);
  const lastSuccessful = [...results].reverse().find((r) => !r.error && !r.skipped);

  const bestText =
    fixResult?.text ||
    (reflectVerdict === "fail" && context.execution_response) ||
    executeResult?.text ||
    lastSuccessful?.text ||
    "";

  return {
    text: bestText,
    stages: results,
    fallback,
    reflectVerdict,
  };
}
