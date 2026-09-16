/**
 * Final request sanitation against the resolved upstream target.
 *
 * Clients legitimately send controls for the model they selected. Routing rules,
 * combos and fallbacks may replace that model with a different family after the
 * request has already been parsed and translated. This boundary removes controls
 * that belong to the source model but are invalid for the actual target.
 */

import { stripUnsupportedParams } from "../translator/paramSupport.ts";
import { sanitizeReasoningEffortForProvider } from "../executors/base/reasoningEffort.ts";

type JsonRecord = Record<string, unknown>;
type LoggerLike =
  | {
      debug?: (tag: string, message: string) => void;
      info?: (tag: string, message: string) => void;
    }
  | null
  | undefined;

function isRecord(value: unknown): value is JsonRecord {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

/** GPT-5 Chat/Responses models are the only family that owns `verbosity`. */
export function targetSupportsVerbosity(model: string | null | undefined): boolean {
  return typeof model === "string" && /(?:^|\/)gpt-5(?:[._-]|$)/i.test(model.trim());
}

function stripVerbosityForTarget(body: JsonRecord, model: string): string[] {
  if (targetSupportsVerbosity(model)) return [];

  const stripped: string[] = [];
  if (Object.hasOwn(body, "verbosity")) {
    delete body.verbosity;
    stripped.push("verbosity");
  }

  if (isRecord(body.text) && Object.hasOwn(body.text, "verbosity")) {
    const text = { ...body.text };
    delete text.verbosity;
    if (Object.keys(text).length === 0) delete body.text;
    else body.text = text;
    stripped.push("text.verbosity");
  }

  return stripped;
}

/**
 * Strip a `tool_choice` control that lacks a usable `tools` array.
 *
 * Some upstreams (vLLM self-hosted) reject the combination "tool_choice set
 * without tools" with a schema 400 — "When using tool_choice, tools must be
 * set." Auxiliary/internal calls (e.g. WebSearch) legitimately send
 * `tool_choice:"auto"` with no tools array, and routing/fallback may have
 * dropped the tools array after the client sent it. This guard removes the
 * dangling `tool_choice` so the request stays schema-valid for any upstream
 * that enforces the OpenAI spec. It is OpenAI-spec compliance, not
 * provider-specific, so it fires regardless of provider.
 */
function stripToolChoiceWithoutTools(body: JsonRecord): boolean {
  if (!Object.hasOwn(body, "tool_choice")) return false;
  const tc = body.tool_choice;
  // A falsy/null tool_choice carries no "use tools" intent — leave as-is.
  if (!tc) return false;
  const tools = body.tools;
  const hasUsableTools = Array.isArray(tools) && tools.length > 0;
  if (hasUsableTools) return false;
  delete body.tool_choice;
  return true;
}

/**
 * Sanitize a translated request using the concrete provider/model selected by
 * routing. Returns a fresh top-level object and never mutates the caller body.
 */
export function sanitizeRequestForResolvedTarget<T extends JsonRecord>(
  body: T,
  options: {
    provider: string | null | undefined;
    model: string;
    log?: LoggerLike;
  }
): T {
  let next = { ...body } as T;
  const stripped = stripVerbosityForTarget(next, options.model);

  // Keep reasoning intent, but normalize its effort vocabulary for the
  // concrete provider/model selected by routing (for example xhigh → high on
  // explicit opt-outs, or xhigh → max for native DeepSeek). The request-format
  // translators have already mapped the shape itself: Responses
  // reasoning.effort → Chat reasoning_effort, or → Claude thinking.
  next = sanitizeReasoningEffortForProvider(
    next,
    options.provider || "",
    options.model,
    options.log
  ) as T;

  // Apply operator-configured provider/model filters at the common dispatch
  // boundary so custom executors cannot accidentally bypass them.
  stripUnsupportedParams(options.provider, options.model, next);

  // Strip a dangling tool_choice that lacks a usable tools array — upstreams
  // that enforce the OpenAI spec (vLLM) reject "tool_choice without tools"
  // with a schema 400.
  const strippedToolChoice = stripToolChoiceWithoutTools(next);

  if (stripped.length > 0 || strippedToolChoice) {
    const parts = [...stripped];
    if (strippedToolChoice) parts.push("tool_choice (no tools)");
    options.log?.debug?.(
      "TARGET_PARAMS",
      `Stripped ${parts.join(", ")} for resolved target ${options.provider || "unknown"}/${options.model}`
    );
  }

  return next;
}
