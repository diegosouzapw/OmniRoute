/**
 * Jev decision builtin skill.
 *
 * Exposes `jev_decide` to non-streaming clients: the model asks the configured
 * decision/support model one atomic question about a state and receives a typed
 * answer (probability / label + confidence / magnitude) instead of prose. This
 * is the in-band counterpart of the gateway's own decision lanes — the model
 * can gate, classify and rank with calibrated numbers.
 *
 * Only injected and executed while the `tool_loop` feature lane is enabled; the
 * handler fails loudly when the lane is off or the decision model is
 * unreachable so the model can fall back to plain reasoning.
 */
import { z } from "zod";
import { askJev } from "../../../open-sse/services/jev/client.ts";
import { isJevFeatureEnabled } from "../../../open-sse/services/jev/config.ts";
import type { JevQuestion } from "../../../open-sse/services/jev/types.ts";

export const JEV_DECIDE_TOOL_NAME = "jev_decide";
export const JEV_BUILTIN_TOOL_NAMES = [JEV_DECIDE_TOOL_NAME] as const;

const JEV_DECIDE_TIMEOUT_MS = 8_000;

const JEV_DECIDE_DESCRIPTION = [
  "Ask the configured decision model (System One / your custom classifier) ONE atomic question",
  "about a state and receive a calibrated typed answer.",
  'type "noul" returns a yes/no probability, "choice" returns the best label with a confidence,',
  '"score" returns an ordered magnitude. Use this for classification, gating, ranking and',
  "yes/no judgments where a prose answer would be unreliable. Send only the relevant excerpt as",
  "state, not the whole conversation.",
].join(" ");

const jevDecideParameters = {
  type: "object",
  additionalProperties: false,
  properties: {
    state: {
      type: "string",
      description:
        "The evidence to judge — the relevant excerpt or facts, not the whole conversation.",
    },
    question: {
      type: "string",
      description: "One atomic question about the state (avoid compound questions).",
    },
    type: {
      type: "string",
      enum: ["noul", "choice", "score"],
      description:
        "noul = yes/no probability; choice = pick one of the criteria labels; score = ordered magnitude.",
    },
    criteria: {
      description:
        "choice: object mapping each allowed label to its meaning (at least two). score: ordered array of category labels (at least two). noul: optional {true, false} descriptions.",
    },
  },
  required: ["state", "question", "type"],
};

const JevDecideInputSchema = z.object({
  state: z.string().min(1),
  question: z.string().min(1),
  type: z.enum(["noul", "choice", "score"]),
  criteria: z.unknown().optional(),
});

const ChoiceCriteriaSchema = z.record(z.string(), z.string());
const ScoreCriteriaSchema = z.array(z.string()).min(2);
const NoulCriteriaSchema = z.object({
  true: z.string().optional(),
  false: z.string().optional(),
});

/** Validate model-supplied input and convert it into one wire question. */
function toJevQuestion(input: z.infer<typeof JevDecideInputSchema>): JevQuestion {
  if (input.type === "noul") {
    const criteria = NoulCriteriaSchema.safeParse(input.criteria ?? {});
    return {
      type: "noul",
      instructions: input.question,
      ...(criteria.success ? { criteria: criteria.data } : {}),
    };
  }
  if (input.type === "choice") {
    const criteria = ChoiceCriteriaSchema.safeParse(input.criteria);
    if (!criteria.success || Object.keys(criteria.data).length < 2) {
      throw new Error(
        'jev_decide: "choice" requires criteria as an object with at least two labels'
      );
    }
    return { type: "choice", instructions: input.question, criteria: criteria.data };
  }
  const criteria = ScoreCriteriaSchema.safeParse(input.criteria);
  if (!criteria.success) {
    throw new Error(
      'jev_decide: "score" requires criteria as an ordered array of at least two labels'
    );
  }
  return { type: "score", instructions: input.question, criteria: criteria.data };
}

export async function handleJevDecide(args: Record<string, unknown>): Promise<unknown> {
  if (!isJevFeatureEnabled("tool_loop")) {
    throw new Error("jev_decide is disabled (tool_loop lane off — see OMNIROUTE_JEV_FEATURES)");
  }
  const parsed = JevDecideInputSchema.safeParse(args);
  if (!parsed.success) {
    throw new Error("jev_decide requires string fields 'state' and 'question' plus a valid 'type'");
  }
  const question = toJevQuestion(parsed.data);
  const result = await askJev(
    parsed.data.state,
    { answer: question },
    {
      timeoutMs: JEV_DECIDE_TIMEOUT_MS,
    }
  );
  if (!result) {
    throw new Error("Decision model unavailable (no credential, timeout, or upstream failure)");
  }
  return {
    success: true,
    answer: result.answers.answer ?? null,
    model: result.model,
    latencyMs: result.latencyMs,
  };
}

export const jevBuiltinHandlers = {
  [JEV_DECIDE_TOOL_NAME]: handleJevDecide,
} as const;

export function buildJevOpenAITools(): unknown[] {
  return [
    {
      type: "function",
      function: {
        name: JEV_DECIDE_TOOL_NAME,
        description: JEV_DECIDE_DESCRIPTION,
        parameters: jevDecideParameters,
      },
    },
  ];
}

export function buildJevClaudeTools(): unknown[] {
  return [
    {
      name: JEV_DECIDE_TOOL_NAME,
      description: JEV_DECIDE_DESCRIPTION,
      input_schema: jevDecideParameters,
    },
  ];
}

export function buildJevGeminiTools(): unknown[] {
  return [
    {
      name: JEV_DECIDE_TOOL_NAME,
      description: JEV_DECIDE_DESCRIPTION,
      parameters: jevDecideParameters,
    },
  ];
}

export function buildJevToolsForProvider(
  provider: "openai" | "anthropic" | "google" | "other"
): unknown[] {
  switch (provider) {
    case "anthropic":
      return buildJevClaudeTools();
    case "google":
      return buildJevGeminiTools();
    default:
      return buildJevOpenAITools();
  }
}
