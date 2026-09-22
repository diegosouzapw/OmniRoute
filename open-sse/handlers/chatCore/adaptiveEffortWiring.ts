// Adaptive reasoning-effort wiring (#13448), extracted from chatCore.ts so the
// frozen main file does not grow (file-size gate: chatCore.ts cannot grow).
// Semantics live in open-sse/services/adaptiveEffort.ts; this module only
// adapts the chatCore call-site context (headers, raw body, translated body).
//
// Runs AFTER applyDefaultReasoningEffort so its explicit-value precedence and
// alias-suffix priority are preserved; operates on the pre-translation body so
// source-format differences are handled by the existing translators.
import {
  applyAdaptiveEffort,
  hasExplicitReasoningField,
  isAdaptiveEffort,
  type ChatMessageLike,
} from "../../services/adaptiveEffort.ts";
import { FORMATS } from "../../translator/formats.ts";
import { getHeaderValueCaseInsensitive } from "./headers.ts";

export interface AdaptiveEffortContext {
  /** Raw (pre-translation) request body, for turn-scoped request-shape signals. */
  rawBody: { messages?: ChatMessageLike[] | undefined } | undefined;
  /** Incoming client request, used to read the x-omniroute-effort header. */
  clientRawRequest?: { headers?: unknown } | undefined;
  /** Explicit header value, if already extracted by the caller. */
  headerEffort?: string | null | undefined;
  /**
   * Resolved upstream dispatch format (chatCore.ts's `targetFormat`). `reasoning_effort`
   * is an OpenAI Chat-Completions-shaped field: on any other target it either does
   * nothing (Claude/Gemini executors read `thinking`/`reasoning.effort` instead and
   * never look at it) or, worse, reaches an upstream that rejects unrecognized
   * top-level parameters (e.g. Anthropic's Messages API 400s on one). Every other
   * reasoning-shape normalization in chatCore.ts (applyDefaultReasoningEffort,
   * promoteStrayReasoningEffort for the Responses same-format lane) is scoped the
   * same way — wiring must match, or an operator's `X-OmniRoute-Effort: auto` header
   * on a Claude/Gemini-targeted request would silently no-op or break the request.
   */
  targetFormat: string | undefined;
}

/**
 * Resolve "auto" reasoning effort to a concrete level when the request opted in
 * (header or ModelSpec.defaultReasoningEffort === "auto") and carries no explicit
 * reasoning field. Returns `body` unchanged (same reference) otherwise.
 *
 * Scoped to `FORMATS.OPENAI` dispatch — see {@link AdaptiveEffortContext.targetFormat}.
 */
export function wireAdaptiveEffort<T extends Record<string, unknown>>(
  body: T,
  ctx: AdaptiveEffortContext
): T {
  if (ctx.targetFormat !== FORMATS.OPENAI) return body;
  // Lever: applyDefaultReasoningEffort may have just injected the literal
  // "auto" from ModelSpec.defaultReasoningEffort — that is an opt-in marker,
  // not a wire value, so it must NOT count as an explicit client field (it
  // would otherwise short-circuit the guard below and ship "auto" upstream).
  const modelDefaultAuto = isAdaptiveEffort(body.reasoning_effort);
  if (!modelDefaultAuto && hasExplicitReasoningField(body)) return body;
  const headerEffort =
    ctx.headerEffort !== undefined
      ? ctx.headerEffort
      : getHeaderValueCaseInsensitive(
          ctx.clientRawRequest?.headers as Record<string, unknown> | Headers | null | undefined,
          "x-omniroute-effort"
        );
  if (!modelDefaultAuto && !isAdaptiveEffort(headerEffort)) return body;
  const stripped = modelDefaultAuto ? { ...body } : body;
  if (modelDefaultAuto) delete (stripped as Record<string, unknown>).reasoning_effort;
  return applyAdaptiveEffort(stripped, {
    messages: ctx.rawBody?.messages,
    headerEffort: headerEffort ?? null,
    modelDefaultEffort: modelDefaultAuto ? "auto" : null,
  }) as T;
}
