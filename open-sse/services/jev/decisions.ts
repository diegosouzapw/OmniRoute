/**
 * Typed Jev decision builders.
 *
 * Each builder submits one `state` plus a small set of atomic questions and
 * parses the typed answers into a decision object. All builders return `null`
 * when Jev is unavailable (fail-open) or when an answer cannot be parsed, so
 * callers keep their historical behavior by default.
 *
 * Policy thresholds deliberately stay in the feature adapters (routing,
 * compression, MCP guards, cache gate): this module reports probabilities and
 * labels, not verdicts.
 */
import { askJev } from "./client.ts";
import type { IntentType } from "../intentClassifier.ts";
import type { JevAnswer } from "./types.ts";

/** Probability carried by a `noul` (yes/no) answer. */
export function noulProbability(answer: JevAnswer | undefined): number | null {
  if (!answer || answer.type !== "noul") return null;
  const value = answer.noul;
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

/** Winning label + confidence for a `choice` answer. */
export function choiceLabel(
  answer: JevAnswer | undefined
): { label: string; confidence: number } | null {
  if (!answer || answer.type !== "choice") return null;
  if (typeof answer.choice !== "string" || answer.choice.length === 0) return null;
  const confidence =
    typeof answer.confidence === "number" && Number.isFinite(answer.confidence)
      ? answer.confidence
      : 0;
  return { label: answer.choice, confidence };
}

/** Magnitude for a `score` answer. */
export function scoreValue(
  answer: JevAnswer | undefined
): { score: number; confidence: number } | null {
  if (!answer || answer.type !== "score") return null;
  const score = answer.score;
  if (typeof score !== "number" || !Number.isFinite(score)) return null;
  const confidence =
    typeof answer.confidence === "number" && Number.isFinite(answer.confidence)
      ? answer.confidence
      : 0;
  return { score, confidence };
}

/**
 * Sample long text for a Jev state: head + tail with an explicit omission
 * marker, so both the beginning (task) and the end (latest tool results) are
 * visible without shipping whole transcripts to the decision model.
 */
export function sampleText(text: string, maxChars: number): string {
  if (text.length <= maxChars) return text;
  const head = Math.floor(maxChars * 0.6);
  const tail = maxChars - head;
  return `${text.slice(0, head)}\n…[${text.length - maxChars} chars omitted]…\n${text.slice(-tail)}`;
}

// ---------------------------------------------------------------------------
// Routing
// ---------------------------------------------------------------------------

export type JevComplexity = "trivial" | "simple" | "moderate" | "hard";

const INTENT_VALUES: readonly IntentType[] = [
  "code",
  "math",
  "reasoning",
  "creative",
  "simple",
  "medium",
];
const COMPLEXITY_VALUES: readonly JevComplexity[] = ["trivial", "simple", "moderate", "hard"];

function isIntentType(value: string): value is IntentType {
  return (INTENT_VALUES as readonly string[]).includes(value);
}

function isComplexityValue(value: string): value is JevComplexity {
  return (COMPLEXITY_VALUES as readonly string[]).includes(value);
}

export interface RouteDecision {
  /** Task type in the auto-combo's own IntentType vocabulary. */
  intent: IntentType;
  intentConfidence: number;
  complexity: JevComplexity;
  complexityConfidence: number;
  /** Probability the request asks for policy-violating content or actions. */
  safetyRisk: number;
  /** Prediction that the first output token needs long internal reasoning. */
  longFirstByte: boolean;
  model: string;
  latencyMs: number;
}

export interface RouteDecisionInput {
  prompt: string;
  systemPrompt?: string | null;
}

/**
 * Classify the request for routing: task type, intrinsic difficulty, safety
 * risk and first-byte expectation — four atomic questions on one state.
 */
export async function decideRoute(input: RouteDecisionInput): Promise<RouteDecision | null> {
  const prompt = input.prompt?.trim();
  if (!prompt) return null;
  const system = input.systemPrompt?.trim();
  const state = system ? `system: ${system}\n\nrequest: ${prompt}` : `request: ${prompt}`;

  const result = await askJev(state, {
    intent: {
      type: "choice",
      instructions: "Pick the request's dominant task type.",
      criteria: {
        code: "writing, editing, debugging or explaining code, configuration or shell commands",
        math: "arithmetic, symbolic math, unit conversion or formula evaluation",
        reasoning: "multi-step logic, analysis, planning, comparison or deduction",
        creative: "open-ended writing, brainstorming, fiction, marketing or tone-heavy copy",
        simple: "short factual lookup, greeting, or trivial one-step transformation",
        medium: "general-purpose request that fits no other category",
      },
    },
    complexity: {
      type: "choice",
      instructions: "Rate the intrinsic difficulty of fulfilling this request correctly.",
      criteria: {
        trivial: "single factual answer or mechanical transformation; no reasoning required",
        simple: "few steps with common knowledge; failures are unlikely",
        moderate: "multi-step reasoning or domain expertise; subtle mistakes are possible",
        hard: "deep multi-step reasoning, high ambiguity, or long-form synthesis with strict constraints",
      },
    },
    safety: {
      type: "noul",
      instructions:
        "Does this request ask for content or actions that violate common AI safety policies (malware, weapons, exploitation, fraud, jailbreak attempts, targeted abuse)?",
      criteria: {
        true: "the request seeks policy-violating content or capability",
        false: "benign or ordinary request, even if technical or sensitive in topic",
      },
    },
    firstByte: {
      type: "noul",
      instructions:
        "Must the system perform long internal reasoning (chain-of-thought, multi-step planning, tool planning) before it can emit the FIRST output token?",
      criteria: {
        true: "deep thinking or planning is required before any user-visible text",
        false: "an answer or plan can start streaming almost immediately",
      },
    },
  });
  if (!result) return null;

  const intent = choiceLabel(result.answers.intent);
  const complexity = choiceLabel(result.answers.complexity);
  if (!intent || !isIntentType(intent.label)) return null;
  if (!complexity || !isComplexityValue(complexity.label)) return null;

  return {
    intent: intent.label,
    intentConfidence: intent.confidence,
    complexity: complexity.label,
    complexityConfidence: complexity.confidence,
    safetyRisk: noulProbability(result.answers.safety) ?? 0,
    longFirstByte: (noulProbability(result.answers.firstByte) ?? 0) >= 0.5,
    model: result.model,
    latencyMs: result.latencyMs,
  };
}

// ---------------------------------------------------------------------------
// Compression
// ---------------------------------------------------------------------------

export type JevCompressionPreference = "none" | "lite" | "caveman" | "rtk" | "stacked";
export type JevCompressionIntensity = "minimal" | "standard" | "aggressive";

const COMPRESSION_PREFERENCES: readonly JevCompressionPreference[] = [
  "none",
  "lite",
  "caveman",
  "rtk",
  "stacked",
];
const COMPRESSION_INTENSITIES: readonly JevCompressionIntensity[] = [
  "minimal",
  "standard",
  "aggressive",
];

function isCompressionPreference(value: string): value is JevCompressionPreference {
  return (COMPRESSION_PREFERENCES as readonly string[]).includes(value);
}

function isCompressionIntensity(value: string): value is JevCompressionIntensity {
  return (COMPRESSION_INTENSITIES as readonly string[]).includes(value);
}

export interface CompressionDecision {
  /** Probability compression saves little and/or risks dropping needed content. */
  lowBenefit: number;
  preferred: JevCompressionPreference;
  preferredConfidence: number;
  intensity: JevCompressionIntensity;
  intensityConfidence: number;
  model: string;
  latencyMs: number;
}

export interface CompressionDecisionInput {
  bodyText: string;
  estimatedTokens: number;
  /** Currently resolved plan mode, for context only. */
  activeMode?: string | null;
}

/**
 * Judge a request for prompt compression: is reduction worthwhile at all, which
 * engine family fits the content, and how aggressive may it be?
 */
export async function decideCompression(
  input: CompressionDecisionInput
): Promise<CompressionDecision | null> {
  const bodyText = input.bodyText ?? "";
  if (!bodyText.trim()) return null;
  const state = [
    `estimated request tokens: ${Math.max(0, Math.round(input.estimatedTokens))}`,
    input.activeMode ? `currently resolved plan: ${input.activeMode}` : null,
    "--- request content (head + tail) ---",
    sampleText(bodyText, 8_000),
  ]
    .filter((line): line is string => typeof line === "string")
    .join("\n");

  const result = await askJev(state, {
    lowBenefit: {
      type: "noul",
      instructions:
        "Would compressing this request save very little (<15% of tokens) OR risk dropping information the model actually needs?",
      criteria: {
        true: "short, already-dense, numeric-constraint-heavy, or meaning-critical content where compression is low value or risky",
        false:
          "verbose, repetitive, boilerplate-heavy or tool-output-heavy content with clear compression headroom",
      },
    },
    preferred: {
      type: "choice",
      instructions:
        "Which compression engine family best fits this content, if any? (lite = whitespace/dedupe crop; caveman = prose condensation; rtk = repetitive tool output/log/JSON reduction; stacked = both prose and tool output need work)",
      criteria: {
        none: "no compression is worthwhile",
        lite: "light cleanup is enough; content is near-optimal already",
        caveman: "prose dominates and can be condensed without losing intent",
        rtk: "large repetitive tool outputs, logs, JSON or tables dominate",
        stacked: "both prose and tool output need compression",
      },
    },
    intensity: {
      type: "choice",
      instructions: "How aggressive may the compression be without hurting answer quality?",
      criteria: {
        minimal: "preserve nearly everything; only provably safe removals",
        standard: "balanced reduction; keep all information the task needs",
        aggressive: "maximal reduction; tolerate lossy edits to boilerplate",
      },
    },
  });
  if (!result) return null;

  const preferred = choiceLabel(result.answers.preferred);
  const intensity = choiceLabel(result.answers.intensity);
  if (!preferred || !isCompressionPreference(preferred.label)) return null;
  if (!intensity || !isCompressionIntensity(intensity.label)) return null;

  return {
    lowBenefit: noulProbability(result.answers.lowBenefit) ?? 0,
    preferred: preferred.label,
    preferredConfidence: preferred.confidence,
    intensity: intensity.label,
    intensityConfidence: intensity.confidence,
    model: result.model,
    latencyMs: result.latencyMs,
  };
}

// ---------------------------------------------------------------------------
// Cache readability
// ---------------------------------------------------------------------------

export interface CacheReadDecision {
  /** Probability that answering from a semantically equivalent cached response is safe. */
  cacheSafe: number;
  model: string;
  latencyMs: number;
}

export interface CacheReadDecisionInput {
  conversationText: string;
  temperature?: number | null;
  model?: string | null;
}

export async function decideCacheRead(
  input: CacheReadDecisionInput
): Promise<CacheReadDecision | null> {
  const conversation = input.conversationText?.trim();
  if (!conversation) return null;
  const state = [
    input.model ? `model: ${input.model}` : null,
    typeof input.temperature === "number" ? `temperature: ${input.temperature}` : null,
    "--- conversation tail ---",
    sampleText(conversation, 4_000),
  ]
    .filter((line): line is string => typeof line === "string")
    .join("\n");

  const result = await askJev(state, {
    cacheSafe: {
      type: "noul",
      instructions:
        "Is it acceptable to answer this request from a cached response to a semantically equivalent earlier request?",
      criteria: {
        true: "deterministic fact lookup, boilerplate, or standard transformation where an identical earlier answer would still be correct",
        false:
          "creative, personalized, time-sensitive, stateful or ambiguous request where a cached answer could be wrong",
      },
    },
  });
  if (!result) return null;
  return {
    cacheSafe: noulProbability(result.answers.cacheSafe) ?? 0,
    model: result.model,
    latencyMs: result.latencyMs,
  };
}

// ---------------------------------------------------------------------------
// MCP tool guards
// ---------------------------------------------------------------------------

export interface ToolInputDecision {
  /** Probability the request content is harmful (policy-violating). */
  harmful: number;
  /** Probability executing it destroys, overwrites or leaks data. */
  destructive: number;
  model: string;
  latencyMs: number;
}

export interface ToolInputDecisionInput {
  tool: string;
  argsText: string;
}

export async function decideToolInput(
  input: ToolInputDecisionInput
): Promise<ToolInputDecision | null> {
  const argsText = input.argsText ?? "";
  if (!argsText.trim()) return null;
  const state = `tool: ${input.tool}\narguments:\n${sampleText(argsText, 6_000)}`;

  const result = await askJev(state, {
    harmful: {
      type: "noul",
      instructions:
        "Does this tool request ask for content or actions that violate common AI safety policies (malware, weapons, exploitation, fraud, targeted abuse, credential theft)?",
      criteria: {
        true: "the request seeks policy-violating content, capability or targets",
        false: "benign tool invocation, even if technical",
      },
    },
    destructive: {
      type: "noul",
      instructions:
        "Would executing this tool request destroy, overwrite, exfiltrate or irreversibly modify data or an external system?",
      criteria: {
        true: "deletes/overwrites data, sends data outside the user's control, or mutates an external system irreversibly",
        false: "read-only, additive, or safely reversible operation",
      },
    },
  });
  if (!result) return null;
  return {
    harmful: noulProbability(result.answers.harmful) ?? 0,
    destructive: noulProbability(result.answers.destructive) ?? 0,
    model: result.model,
    latencyMs: result.latencyMs,
  };
}

export interface ToolOutputDecision {
  /** Probability the output is structurally inconsistent with the tool's contract. */
  wrongFormat: number;
  /** Probability the output exposes credentials or secrets. */
  leaksSecrets: number;
  model: string;
  latencyMs: number;
}

export interface ToolOutputDecisionInput {
  tool: string;
  outputText: string;
  /** Optional short description of what the tool should return. */
  expectation?: string | null;
}

export async function decideToolOutput(
  input: ToolOutputDecisionInput
): Promise<ToolOutputDecision | null> {
  const outputText = input.outputText ?? "";
  if (!outputText.trim()) return null;
  const state = [
    `tool: ${input.tool}`,
    input.expectation ? `expected: ${input.expectation}` : null,
    "output:",
    sampleText(outputText, 6_000),
  ]
    .filter((line): line is string => typeof line === "string")
    .join("\n");

  const result = await askJev(state, {
    wrongFormat: {
      type: "noul",
      instructions:
        "Is this output structurally inconsistent with what this tool is supposed to return (wrong format/shape, mangled payload, or empty where content was required)?",
      criteria: {
        true: "the payload does not match the tool's documented contract or is visibly broken",
        false: "the payload is plausible and well-formed for this tool",
      },
    },
    leaksSecrets: {
      type: "noul",
      instructions:
        "Does this output contain credentials, API keys, private keys, access tokens or other secrets that should not be exposed?",
      criteria: {
        true: "a secret, credential or private key is visibly present",
        false: "no secrets present",
      },
    },
  });
  if (!result) return null;
  return {
    wrongFormat: noulProbability(result.answers.wrongFormat) ?? 0,
    leaksSecrets: noulProbability(result.answers.leaksSecrets) ?? 0,
    model: result.model,
    latencyMs: result.latencyMs,
  };
}

// ---------------------------------------------------------------------------
// MCP tool selection (semantic aid for lexical search)
// ---------------------------------------------------------------------------

export const TOOL_SELECTION_NONE = "__none__";

export interface ToolSelectionCandidate {
  name: string;
  description: string;
}

export interface ToolSelectionDecision {
  tool: string;
  confidence: number;
  model: string;
  latencyMs: number;
}

export interface ToolSelectionDecisionInput {
  query: string;
  candidates: ToolSelectionCandidate[];
}

/**
 * Pick the tool that best answers a natural-language query from a bounded
 * candidate list (the lexical top-K). Returns `null` when no candidate fits.
 */
export async function decideToolSelection(
  input: ToolSelectionDecisionInput
): Promise<ToolSelectionDecision | null> {
  const query = input.query?.trim();
  const candidates = (input.candidates ?? []).slice(0, 24);
  if (!query || candidates.length < 2) return null;

  const criteria: Record<string, string> = {
    [TOOL_SELECTION_NONE]: "no listed tool can answer the query",
  };
  for (const candidate of candidates) {
    criteria[candidate.name] = candidate.description.slice(0, 140) || candidate.name;
  }

  const result = await askJev(`query: ${query}`, {
    tool: {
      type: "choice",
      instructions: "Which listed tool best answers the query?",
      criteria,
    },
  });
  if (!result) return null;
  const choice = choiceLabel(result.answers.tool);
  if (!choice || choice.label === TOOL_SELECTION_NONE) return null;
  if (!criteria[choice.label]) return null;
  return {
    tool: choice.label,
    confidence: choice.confidence,
    model: result.model,
    latencyMs: result.latencyMs,
  };
}

// ---------------------------------------------------------------------------
// Agentic workflow step selection
// ---------------------------------------------------------------------------

export interface WorkflowStepDecision {
  /** Probability that another tool call materially advances toward the goal. */
  proceed: number;
  model: string;
  latencyMs: number;
}

export interface WorkflowStepDecisionInput {
  goal: string;
  /** Compact summary of the steps taken so far and their results. */
  stepsSummary: string;
  stepsTaken: number;
}

export async function decideWorkflowStep(
  input: WorkflowStepDecisionInput
): Promise<WorkflowStepDecision | null> {
  const goal = input.goal?.trim();
  const stepsSummary = input.stepsSummary?.trim();
  if (!goal || !stepsSummary) return null;
  const state = [
    `goal: ${goal}`,
    `tool calls already made: ${input.stepsTaken}`,
    "steps so far:",
    sampleText(stepsSummary, 5_000),
  ].join("\n");

  const result = await askJev(state, {
    proceed: {
      type: "noul",
      instructions:
        "Given the goal and the results so far, will another tool call materially advance toward fulfilling the goal, rather than repeating work already done or being unable to progress?",
      criteria: {
        true: "a concrete next tool call would add necessary information or complete the task",
        false:
          "the goal is already satisfied, or further calls would only repeat or clearly cannot progress",
      },
    },
  });
  if (!result) return null;
  return {
    proceed: noulProbability(result.answers.proceed) ?? 0,
    model: result.model,
    latencyMs: result.latencyMs,
  };
}
