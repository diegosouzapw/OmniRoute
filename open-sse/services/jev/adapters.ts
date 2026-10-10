/**
 * Decision-model wire adapters.
 *
 * The decision layer is not tied to TypeSafe: any classifier endpoint that can
 * return the typed answers (`noul` / `choice` / `score`) can drive the same
 * routing, compression, MCP, cache, keepalive and tool-loop lanes. Two wires
 * ship in-tree:
 *
 *   - `typesafe` — the native System One contract: POST `{base}/v1/systemone`
 *     with `{ state, model, questions }` → `{ model, answers, usage }`.
 *   - `openai`   — any OpenAI-compatible chat-completions endpoint (a local
 *     classifier, another vendor's decision model, or even OmniRoute's own
 *     gateway): the adapter serializes the atomic questions into a strict JSON
 *     prompt, parses `choices[0].message.content` back into answers, and drops
 *     malformed ones.
 *
 * Response envelopes are parsed with zod at this boundary. Answer values stay
 * raw (`unknown`) here because per-question normalization needs the question
 * shapes, which live with the caller — `alignAnswersToQuestions` does that on
 * the client side, and the decision builders fail open on anything unusable.
 *
 * Adding another wire later = one more entry in `DECISION_ADAPTERS`; every lane
 * consumes the same `JevAnswer` shapes regardless of the underlying model.
 */
import { z } from "zod";
import { DECISION_MODEL_REQUEST_HEADER } from "./types.ts";
import type { JevAnswer, JevQuestion, JevUsage } from "./types.ts";

export type DecisionWire = "typesafe" | "openai";

export interface DecisionWireRuntime {
  /** API root, no trailing slash. */
  baseUrl: string;
  apiKey: string;
  model: string;
  wire: DecisionWire;
}

export interface DecisionAdapterRequest {
  url: string;
  headers: Record<string, string>;
  body: string;
}

export interface ParsedDecisionResponse {
  model: string;
  /** Raw per-question answers; normalized by `alignAnswersToQuestions`. */
  rawAnswers: Record<string, unknown>;
  usage?: JevUsage;
}

export interface DecisionAdapter {
  id: DecisionWire;
  buildRequest(
    runtime: DecisionWireRuntime,
    state: string,
    questions: Record<string, JevQuestion>
  ): DecisionAdapterRequest;
  parseResponse(body: unknown, fallbackModel: string): ParsedDecisionResponse;
}

const numberMapSchema = z.record(z.string(), z.number());
const stringMapSchema = z.record(z.string(), z.string());

/** Clamp to [0, 1]; non-finite input yields null. */
function clampUnit(value: unknown): number | null {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return null;
  return Math.min(1, Math.max(0, parsed));
}

function readNumberMap(value: unknown): Record<string, number> {
  const parsed = numberMapSchema.safeParse(value);
  return parsed.success ? parsed.data : {};
}

/**
 * Normalize one raw answer against its question type. A missing `confidence`
 * becomes 0, not 1: an adapter that cannot report confidence must never satisfy
 * a confidence-gated decision (fail-safe, not fail-permissive).
 */
function normalizeAnswer(raw: unknown, question: JevQuestion): JevAnswer | null {
  if (typeof raw !== "object" || raw === null || Array.isArray(raw)) return null;
  if (question.type === "noul") {
    const probability = clampUnit("noul" in raw ? raw.noul : undefined);
    if (probability === null) return null;
    return { type: "noul", noul: probability };
  }
  if (question.type === "choice") {
    const choice = "choice" in raw ? raw.choice : undefined;
    if (typeof choice !== "string" || choice.length === 0) return null;
    return {
      type: "choice",
      choice,
      confidence: clampUnit("confidence" in raw ? raw.confidence : undefined) ?? 0,
      probabilities: readNumberMap("probabilities" in raw ? raw.probabilities : undefined),
    };
  }
  const score = "score" in raw ? Number(raw.score) : Number.NaN;
  if (!Number.isFinite(score)) return null;
  const legend = stringMapSchema.safeParse("legend" in raw ? raw.legend : undefined);
  return {
    type: "score",
    score,
    confidence: clampUnit("confidence" in raw ? raw.confidence : undefined) ?? 0,
    legend: legend.success ? legend.data : {},
    probabilities: readNumberMap("probabilities" in raw ? raw.probabilities : undefined),
  };
}

/**
 * Align raw answers against the actual question set: both adapters parse only
 * the envelope, so ids and per-question types are validated here. Unknown ids
 * are dropped; missing answers stay missing.
 */
export function alignAnswersToQuestions(
  rawAnswers: Record<string, unknown>,
  questions: Record<string, JevQuestion>
): Record<string, JevAnswer> {
  const answers: Record<string, JevAnswer> = {};
  for (const [id, question] of Object.entries(questions)) {
    const answer = normalizeAnswer(rawAnswers[id], question);
    if (answer) answers[id] = answer;
  }
  return answers;
}

// ---------------------------------------------------------------------------
// typesafe — native System One wire
// ---------------------------------------------------------------------------

const TypesafeResponseSchema = z.object({
  model: z.string().optional(),
  answers: z.record(z.string(), z.unknown()).optional(),
  usage: z.record(z.string(), z.unknown()).optional(),
});

const typesafeAdapter: DecisionAdapter = {
  id: "typesafe",
  buildRequest(runtime, state, questions) {
    return {
      url: `${runtime.baseUrl}/v1/systemone`,
      headers: {
        Authorization: `Bearer ${runtime.apiKey}`,
        "Content-Type": "application/json",
        [DECISION_MODEL_REQUEST_HEADER]: "1",
      },
      body: JSON.stringify({ state, model: runtime.model, questions }),
    };
  },
  parseResponse(body, fallbackModel) {
    const parsed = TypesafeResponseSchema.safeParse(body);
    if (!parsed.success) return { model: fallbackModel, rawAnswers: {} };
    return {
      model: parsed.data.model ?? fallbackModel,
      rawAnswers: parsed.data.answers ?? {},
      usage: parsed.data.usage,
    };
  },
};

// ---------------------------------------------------------------------------
// openai — OpenAI-compatible chat completions
// ---------------------------------------------------------------------------

export const OPENAI_DECISION_SYSTEM_PROMPT =
  "You are a decision oracle. Answer each atomic question about the provided state. " +
  "Respond with ONLY one JSON object of the form " +
  '{"answers":{"<question id>": <answer>}}. For a question of type "noul" the answer is ' +
  '{"noul": <probability between 0 and 1>}. For "choice" it is ' +
  '{"choice": "<one of the provided criteria keys>", "confidence": <0..1>}. For "score" it is ' +
  '{"score": <number>}. Include every question id. Never add prose, markdown fences, or extra keys.';

/** Chat-completions URL from an API root; tolerates a root that already ends in /v1 or the full path. */
export function resolveChatCompletionsUrl(baseUrl: string): string {
  if (baseUrl.endsWith("/chat/completions")) return baseUrl;
  if (baseUrl.endsWith("/v1")) return `${baseUrl}/chat/completions`;
  return `${baseUrl}/v1/chat/completions`;
}

/** Extract a JSON object from model text that may carry fences or surrounding prose. */
export function extractJsonObject(text: string): unknown {
  const trimmed = text.trim();
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/);
  const candidate = fenced ? fenced[1].trim() : trimmed;
  try {
    return JSON.parse(candidate);
  } catch {
    const start = candidate.indexOf("{");
    const end = candidate.lastIndexOf("}");
    if (start === -1 || end <= start) return null;
    try {
      return JSON.parse(candidate.slice(start, end + 1));
    } catch {
      return null;
    }
  }
}

const ContentPartSchema = z.union([z.string(), z.object({ text: z.string() })]);
const OpenAiResponseSchema = z.object({
  model: z.string().optional(),
  choices: z
    .array(
      z.object({
        message: z
          .object({ content: z.union([z.string(), z.array(ContentPartSchema)]).optional() })
          .optional(),
      })
    )
    .optional(),
  usage: z.record(z.string(), z.unknown()).optional(),
});
const OpenAiContentSchema = z.object({ answers: z.record(z.string(), z.unknown()).optional() });

function readMessageText(body: z.infer<typeof OpenAiResponseSchema>): string | null {
  const message = body.choices?.[0]?.message;
  if (!message) return null;
  const content = message.content;
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    const parts = content
      .map((part) => (typeof part === "string" ? part : part.text))
      .filter((part) => part.length > 0);
    return parts.length > 0 ? parts.join("\n") : null;
  }
  return null;
}

const openaiAdapter: DecisionAdapter = {
  id: "openai",
  buildRequest(runtime, state, questions) {
    const user = `STATE:\n${state}\n\nQUESTIONS:\n${JSON.stringify(questions, null, 2)}`;
    return {
      url: resolveChatCompletionsUrl(runtime.baseUrl),
      headers: {
        Authorization: `Bearer ${runtime.apiKey}`,
        "Content-Type": "application/json",
        [DECISION_MODEL_REQUEST_HEADER]: "1",
      },
      body: JSON.stringify({
        model: runtime.model,
        temperature: 0,
        messages: [
          { role: "system", content: OPENAI_DECISION_SYSTEM_PROMPT },
          { role: "user", content: user },
        ],
      }),
    };
  },
  parseResponse(body, fallbackModel) {
    const parsedEnvelope = OpenAiResponseSchema.safeParse(body);
    if (!parsedEnvelope.success) return { model: fallbackModel, rawAnswers: {} };
    const text = readMessageText(parsedEnvelope.data);
    const parsedContent = text ? extractJsonObject(text) : null;
    const content = OpenAiContentSchema.safeParse(parsedContent);
    const usageRaw = parsedEnvelope.data.usage;
    const usage: JevUsage | undefined = usageRaw
      ? {
          ...usageRaw,
          inputTokens:
            typeof usageRaw.prompt_tokens === "number" ? usageRaw.prompt_tokens : undefined,
          outputTokens:
            typeof usageRaw.completion_tokens === "number" ? usageRaw.completion_tokens : undefined,
        }
      : undefined;
    return {
      model: parsedEnvelope.data.model ?? fallbackModel,
      rawAnswers: content.success ? (content.data.answers ?? {}) : {},
      usage,
    };
  },
};

export const DECISION_ADAPTERS: Record<DecisionWire, DecisionAdapter> = {
  typesafe: typesafeAdapter,
  openai: openaiAdapter,
};

/** Normalize a wire token from env/config; invalid values fall back to `fallback`. */
export function resolveDecisionWire(
  raw: string | undefined,
  fallback: DecisionWire = "typesafe"
): DecisionWire {
  const value = raw?.trim().toLowerCase();
  return value === "typesafe" || value === "openai" ? value : fallback;
}
