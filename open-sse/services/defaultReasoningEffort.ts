// Per-model default reasoning effort (#6879, "Ask 1"). Many models think by
// default with no client-visible way to turn it off (measured:
// gemini-flash-lite-latest burns ~277 reasoning tokens on a plain request with
// no reasoning params). ModelSpec.defaultReasoningEffort lets an operator
// configure a strip-by-default (or steer-by-default) value fleet-wide without
// patching every client.
//
// Semantics: applied ONLY when the request carries no reasoning field of any
// shape (`reasoning_effort`, `reasoning`, `thinking`) — an explicit client
// value, including one forwarded verbatim through a combo leg, always wins
// and this is a no-op. Models without a configured default are untouched
// (regression-safe). Wired at the OpenAI-format dispatch chokepoint in
// chatCore.ts, after model resolution, so the *upstream* model's default is
// used even when a combo/route substituted it.
import { getModelSpec } from "@/shared/constants/modelSpecs.ts";

/** True when `body` already expresses a reasoning-effort choice, in any known shape. */
function hasExplicitReasoningField(body: Record<string, unknown>): boolean {
  return (
    body.reasoning_effort !== undefined ||
    body.reasoning !== undefined ||
    body.thinking !== undefined
  );
}

/**
 * Inject a resolved reasoning effort as `reasoning_effort` when the request has no
 * reasoning field. Returns `body` unchanged (same reference) when there is nothing to
 * inject, so callers can chain it without extra guards.
 *
 * `suffixEffort` (#7694) is the tier a `<prefix>/<model>-{effort}` synced-model alias
 * resolved to (`src/sse/services/model.ts`'s `resolveSyncedModelIdAndEffort`) — an
 * explicit, request-time model selection, so it takes priority over the static
 * `ModelSpec.defaultReasoningEffort` fleet-wide default (#6879) when both are present.
 */
export function applyDefaultReasoningEffort<T extends Record<string, unknown>>(
  body: T,
  modelId: string,
  suffixEffort?: string | null
): T {
  if (!body || typeof body !== "object") return body;
  if (hasExplicitReasoningField(body)) return body;

  const defaultEffort = suffixEffort || getModelSpec(modelId)?.defaultReasoningEffort;
  if (!defaultEffort) return body;

  return { ...body, reasoning_effort: defaultEffort };
}
