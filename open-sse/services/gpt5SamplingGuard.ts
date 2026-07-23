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

import { FORMATS } from "../translator/formats.ts";

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

const REASONING_FIELDS = ["reasoning_effort", "reasoning"] as const;

/**
 * True when the request carries a non-empty `tools` array holding at least one
 * function-shaped tool entry (`{type:"function", ...}` or a bare `{name, ...}`
 * without a `type`, the OpenAI Chat Completions convention).
 */
function hasFunctionTools(record: JsonRecord): boolean {
  if (!Array.isArray(record.tools) || record.tools.length === 0) return false;
  return record.tools.some((toolValue) => {
    const tool = asRecord(toolValue);
    if (!tool) return false;
    const toolType = typeof tool.type === "string" ? tool.type : "";
    return toolType === "" || toolType === "function";
  });
}

/**
 * Raw api.openai.com Chat Completions rejects GPT-5.x reasoning models that
 * carry BOTH function `tools` and an active `reasoning_effort` with HTTP 400:
 * "Function tools with reasoning_effort are not supported for <model> in
 * /v1/chat/completions. Please use /v1/responses instead." Historically the
 * plain `openai` provider always stayed on `/chat/completions` for every
 * GPT-5.x model, so this combination reached the upstream 400 with no way to
 * recover other than dropping the reasoning fields.
 *
 * That is no longer true for every GPT-5.x model: the public GPT-5.6 family
 * is tagged with `targetFormat: "openai-responses"` (see
 * `GPT_5_6_API_CAPABILITIES` in `config/providers/shared.ts`, closes #2540 /
 * 9router#2547) and is routed to `/v1/responses` instead, which natively
 * accepts tools + reasoning together — /v1/responses is literally the
 * endpoint the 400 message tells callers to use. Gate on the resolved
 * `targetFormat` (the fact chatCore already computed for this request)
 * rather than a model-name list: only strip when the request is actually
 * going out over `/chat/completions`. If a future GPT-5.x family also moves
 * to `/responses`, this guard keeps working with no change needed here.
 * Port of 9router#2540.
 */
export function stripGpt5ReasoningWhenTools<T extends Record<string, unknown>>(
  body: T,
  provider: string | null | undefined,
  model: string | null | undefined,
  targetFormat: string | null | undefined,
  log?: { warn?: (tag: string, message: string) => void } | null
): T {
  if (provider !== "openai") return body;
  if (typeof model !== "string" || !/^gpt-5/i.test(model)) return body;
  // Already routed to /v1/responses (e.g. GPT-5.6, #7242) — that endpoint
  // supports tools + reasoning natively, nothing to strip.
  if (targetFormat === FORMATS.OPENAI_RESPONSES) return body;

  const record = asRecord(body);
  if (!record) return body;
  if (!hasFunctionTools(record)) return body;
  if (!hasActiveReasoning(record, model)) return body;

  const stripped: string[] = [];
  for (const field of REASONING_FIELDS) {
    if (Object.hasOwn(record, field)) stripped.push(field);
  }
  if (stripped.length === 0) return body;

  const next: JsonRecord = { ...record };
  for (const field of stripped) delete next[field];

  log?.warn?.(
    "PARAMS",
    `Stripped ${stripped.join(", ")} for ${model} (function tools + reasoning_effort ` +
      `are rejected on /v1/chat/completions; use /v1/responses instead)`
  );
  return next as T;
}
