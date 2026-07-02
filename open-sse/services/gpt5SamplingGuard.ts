/**
 * GPT-5 sampling guard for the OpenAI Chat Completions surface.
 *
 * The GPT-5 reasoning family rejects non-default sampling params with HTTP 400
 * ("Unsupported value: temperature/top_p") WHENEVER a reasoning effort is active —
 * but, unlike the o-series, GPT-5.1+ also exposes a non-reasoning mode
 * (`reasoning_effort:"none"`, which is the GPT-5.1+ default) under which sampling
 * is accepted again. So a static `unsupportedParams` strip (the o3 approach) would
 * over-strip the legitimate `effort=none` case, while passing everything through
 * leaves `temperature`/`top_p` + active effort exposed to a 400.
 *
 * This guard removes `temperature`/`top_p` only when the resolved effort is active
 * (anything other than `none`). It is scoped to the `openai` provider (raw
 * api.openai.com Chat Completions): the `codex` provider's Responses requests are
 * already covered by the CodexExecutor allowlist (which drops both params), and
 * other providers manage their own sampling rules.
 *
 * Refs: litellm#27351 (GPT-5.1 accepts temperature only when effort=none),
 * Azure Foundry reasoning matrix, openai-python#2072.
 */

type JsonRecord = Record<string, unknown>;

const SAMPLING_PARAMS = ["temperature", "top_p"] as const;
// Suffix that encodes an active (non-none) reasoning effort, e.g. `gpt-5.4-high`.
const ACTIVE_EFFORT_SUFFIX = /-(low|medium|high|xhigh|minimal)$/i;
// Suffix that encodes the explicit non-reasoning mode, e.g. `gpt-5.4-none`.
const NONE_EFFORT_SUFFIX = /-none$/i;

function asRecord(value: unknown): JsonRecord | null {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : null;
}

/**
 * True when the request carries an active reasoning effort (any level other than
 * `none`). When there is no signal at all we return false: GPT-5.1+ defaults to
 * `none`, so the safe assumption is "reasoning off → sampling allowed".
 */
function hasActiveReasoning(record: JsonRecord, model: string): boolean {
  const effort = record.reasoning_effort;
  if (typeof effort === "string") return effort.toLowerCase() !== "none";

  const reasoning = asRecord(record.reasoning);
  if (reasoning && typeof reasoning.effort === "string") {
    return reasoning.effort.toLowerCase() !== "none";
  }

  if (NONE_EFFORT_SUFFIX.test(model)) return false;
  if (ACTIVE_EFFORT_SUFFIX.test(model)) return true;
  return false;
}

export function stripGpt5SamplingWhenReasoning<T extends Record<string, unknown>>(
  body: T,
  provider: string | null | undefined,
  model: string | null | undefined,
  log?: { warn?: (tag: string, message: string) => void } | null
): T {
  if (provider !== "openai") return body;
  if (typeof model !== "string" || !/^gpt-5/i.test(model)) return body;

  const record = asRecord(body);
  if (!record) return body;
  if (!hasActiveReasoning(record, model)) return body;

  const stripped: string[] = [];
  for (const param of SAMPLING_PARAMS) {
    if (Object.hasOwn(record, param)) stripped.push(param);
  }
  if (stripped.length === 0) return body;

  const next: JsonRecord = { ...record };
  for (const param of stripped) delete next[param];

  log?.warn?.(
    "PARAMS",
    `Stripped ${stripped.join(", ")} for reasoning-active ${model} ` +
      `(GPT-5 rejects sampling params unless reasoning_effort=none)`
  );
  return next as T;
}
