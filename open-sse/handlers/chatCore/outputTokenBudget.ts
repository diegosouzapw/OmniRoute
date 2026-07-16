export const OUTPUT_TOKEN_FIELDS = ["max_tokens", "max_completion_tokens"] as const;

export type OutputTokenBudgetResult =
  | {
      ok: true;
      body: Record<string, unknown>;
      availableOutputTokens: number;
      adjustedFields: string[];
    }
  | {
      ok: false;
      estimatedInputTokens: number;
      contextLimit: number;
    };

/**
 * Enforce the target model's context budget immediately before translation.
 *
 * Compression and combo selection are best-effort: a request may still be too
 * large for a concrete target, and some OpenAI-compatible gateways derive an
 * internal max_tokens value by subtracting the prompt from the context window.
 * Reject that target locally instead of allowing the derived value to become
 * negative upstream. Positive client limits are capped to the remaining room;
 * invalid numeric limits are removed.
 */
export function enforceOutputTokenBudget(
  body: Record<string, unknown>,
  estimatedInputTokens: number,
  contextLimit: number
): OutputTokenBudgetResult {
  const normalizedInputTokens = Math.max(0, Math.ceil(estimatedInputTokens));
  const normalizedContextLimit = Math.max(1, Math.floor(contextLimit));
  const availableOutputTokens = normalizedContextLimit - normalizedInputTokens;

  if (availableOutputTokens < 1) {
    return {
      ok: false,
      estimatedInputTokens: normalizedInputTokens,
      contextLimit: normalizedContextLimit,
    };
  }

  let nextBody = body;
  const adjustedFields: string[] = [];
  for (const field of OUTPUT_TOKEN_FIELDS) {
    const value = nextBody[field];
    if (typeof value !== "number") continue;

    const normalized = Number.isFinite(value) && value > 0 ? Math.floor(value) : null;
    if (normalized === null) {
      if (nextBody === body) nextBody = { ...body };
      delete nextBody[field];
      adjustedFields.push(field);
      continue;
    }

    const capped = Math.min(normalized, availableOutputTokens);
    if (capped !== value) {
      if (nextBody === body) nextBody = { ...body };
      nextBody[field] = capped;
      adjustedFields.push(field);
    }
  }

  return { ok: true, body: nextBody, availableOutputTokens, adjustedFields };
}
