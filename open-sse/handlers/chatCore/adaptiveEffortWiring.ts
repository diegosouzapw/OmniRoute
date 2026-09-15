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

export interface AdaptiveEffortContext {
  /** Raw (pre-translation) request body, for turn-scoped request-shape signals. */
  rawBody: { messages?: ChatMessageLike[] | undefined } | undefined;
  /** Value of the x-omniroute-effort request header, if present. */
  headerEffort: string | null | undefined;
}

/**
 * Resolve "auto" reasoning effort to a concrete level when the request opted in
 * (header or ModelSpec.defaultReasoningEffort === "auto") and carries no explicit
 * reasoning field. Returns `body` unchanged (same reference) otherwise.
 */
export function wireAdaptiveEffort<T extends Record<string, unknown>>(
  body: T,
  ctx: AdaptiveEffortContext
): T {
  // Lever: applyDefaultReasoningEffort may have just injected the literal
  // "auto" from ModelSpec.defaultReasoningEffort — that is an opt-in marker,
  // not a wire value, so it must NOT count as an explicit client field (it
  // would otherwise short-circuit the guard below and ship "auto" upstream).
  const modelDefaultAuto = isAdaptiveEffort(body.reasoning_effort);
  if (!modelDefaultAuto && hasExplicitReasoningField(body)) return body;
  if (!modelDefaultAuto && !isAdaptiveEffort(ctx.headerEffort)) return body;
  const stripped = modelDefaultAuto ? { ...body } : body;
  if (modelDefaultAuto) delete (stripped as Record<string, unknown>).reasoning_effort;
  return applyAdaptiveEffort(stripped, {
    messages: ctx.rawBody?.messages,
    headerEffort: ctx.headerEffort ?? null,
    modelDefaultEffort: modelDefaultAuto ? "auto" : null,
  }) as T;
}
