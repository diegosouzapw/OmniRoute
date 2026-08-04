/**
 * Context-fit evaluation for combo routing's compatibility filter, extracted
 * from comboStructure.ts to keep that file under the file-size cap (PR
 * #7933's model_context_override fix pushed it over).
 *
 * evaluateContextLimit() is the single chokepoint both compatibility-check
 * call sites in comboStructure.ts (hasKnownCompatibleContextLimit,
 * getTargetCompatibilityFailures) go through. It first consults a persisted
 * per-model context override, then falls back to the catalog's
 * maxInputTokens/contextWindow limits.
 *
 * Override rationale (Feature 5004): the catalog's `maxInputTokens` can be a
 * deliberately smaller *client-facing* hint (e.g. set below the true window so
 * coding agents auto-compact — #6191); using it to filter fallback targets
 * wrongly drops otherwise-capable providers for large prompts, collapsing the
 * pool to one provider and producing a hard 503 with no fallback once that
 * provider's quota is exhausted. An operator-set or auto-discovered override
 * reflects the real capacity, so it supersedes both catalog limits. Uses the
 * raw override (`getModelContextOverride` returns `null` when none is set) —
 * NOT `getModelContextLimitForModelString`, which falls back to
 * `contextWindow` and would therefore bypass the `maxInputTokens` cap for
 * every model, not just overridden ones.
 */

import { getModelContextOverride } from "../../../src/lib/db/modelContextOverrides";
import { parseModel } from "../model.ts";

/**
 * Resolve the context-fit verdict from a persisted per-model override, if one
 * is set. Returns `undefined` when there is no `modelStr` or no override
 * exists, so the caller falls through to the catalog-based check; otherwise
 * returns the fit verdict for the override itself.
 */
function resolveContextOverrideVerdict(
  modelStr: string | undefined,
  requiredContextTokens: number
): boolean | undefined {
  if (!modelStr) return undefined;
  const parsed = parseModel(modelStr);
  const override = getModelContextOverride(parsed.provider, parsed.model);
  if (override == null) return undefined;
  return override >= requiredContextTokens;
}

/**
 * Decide whether a target's known context limit accommodates the request.
 *
 * `maxInputTokens` is an **input-only** cap — the requested output reserve is
 * already enforced separately against `maxOutputTokens` (see
 * `exceedsKnownOutputLimit` in comboStructure.ts), so it must NOT be
 * re-counted here. Comparing `maxInputTokens` against `estimatedInputTokens +
 * requestedOutputTokens` double-counted the output reserve and shrank the
 * effective input allowance (#7039).
 *
 * `contextWindow` is the total window, so input + output must both fit.
 *
 * Returns `true` when the known limit accommodates the request, `false` when
 * it is known to be too small, and `null` when no limit metadata is known.
 */
export function evaluateContextLimit(
  capabilities: { maxInputTokens?: number | null; contextWindow?: number | null },
  requirements: { estimatedInputTokens: number; requiredContextTokens: number },
  modelStr?: string
): boolean | null {
  const overrideVerdict = resolveContextOverrideVerdict(
    modelStr,
    requirements.requiredContextTokens
  );
  if (overrideVerdict !== undefined) return overrideVerdict;

  const hasMaxInput = capabilities.maxInputTokens != null;
  const hasContextWindow = capabilities.contextWindow != null;

  // Neither limit is known — cannot judge.
  if (!hasMaxInput && !hasContextWindow) return null;

  // The input-only cap must accommodate the estimated input.
  const inputFits = hasMaxInput
    ? capabilities.maxInputTokens! >= requirements.estimatedInputTokens
    : true;

  // The total window must accommodate input + requested output. The output
  // reserve is enforced separately via `maxOutputTokens`, but when a model
  // exposes both `maxInputTokens` and `contextWindow` the two must not be
  // checked in isolation: a request whose input fits `maxInputTokens` but whose
  // input + output exceeds `contextWindow` must still be rejected (#7039
  // follow-up — shared-window models where `maxInputTokens` defaults to the
  // total window size).
  const totalFits = hasContextWindow
    ? capabilities.contextWindow! >= requirements.requiredContextTokens
    : true;

  return inputFits && totalFits;
}
