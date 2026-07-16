export const OUTPUT_TOKEN_FIELDS = [
  "max_tokens",
  "max_completion_tokens",
  "max_output_tokens",
] as const;

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

type OutputTokenAdjustment = { field: string; value?: number; remove?: boolean };

function getOutputTokenAdjustment(
  field: string,
  value: unknown,
  availableOutputTokens: number
): OutputTokenAdjustment | null {
  if (typeof value !== "number") return null;
  if (!Number.isFinite(value) || value <= 0) return { field, remove: true };

  const capped = Math.min(Math.floor(value), availableOutputTokens);
  return capped === value ? null : { field, value: capped };
}

function hasTranslatorOutputTokenLimit(body: Record<string, unknown>): boolean {
  return ["max_tokens", "max_completion_tokens"].some((field) => {
    const value = body[field];
    return typeof value === "number" && Number.isFinite(value) && value > 0;
  });
}

function adjustOutputTokenFields(
  body: Record<string, unknown>,
  availableOutputTokens: number
): Pick<Extract<OutputTokenBudgetResult, { ok: true }>, "body" | "adjustedFields"> {
  const adjustments = OUTPUT_TOKEN_FIELDS.map((field) =>
    getOutputTokenAdjustment(field, body[field], availableOutputTokens)
  ).filter((adjustment): adjustment is OutputTokenAdjustment => adjustment !== null);
  if (adjustments.length === 0) return { body, adjustedFields: [] };

  const nextBody = { ...body };
  for (const adjustment of adjustments) {
    if (adjustment.remove) delete nextBody[adjustment.field];
    else nextBody[adjustment.field] = adjustment.value;
  }

  return { body: nextBody, adjustedFields: adjustments.map(({ field }) => field) };
}

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
  body: Record<string, unknown> | null | undefined,
  estimatedInputTokens: number,
  contextLimit: number,
  defaultOutputTokens = 0
): OutputTokenBudgetResult {
  const normalizedInputTokens = Math.max(0, Math.ceil(estimatedInputTokens));
  const normalizedContextLimit = Math.max(1, Math.floor(contextLimit));
  const normalizedDefaultOutputTokens = Math.max(0, Math.floor(defaultOutputTokens));
  const availableOutputTokens = normalizedContextLimit - normalizedInputTokens;

  if (availableOutputTokens < 1) {
    return {
      ok: false,
      estimatedInputTokens: normalizedInputTokens,
      contextLimit: normalizedContextLimit,
    };
  }

  if (!body) {
    if (normalizedDefaultOutputTokens > availableOutputTokens) {
      return {
        ok: false,
        estimatedInputTokens: normalizedInputTokens,
        contextLimit: normalizedContextLimit,
      };
    }
    return {
      ok: true,
      body: {},
      availableOutputTokens,
      adjustedFields: [],
    };
  }

  if (
    normalizedDefaultOutputTokens > availableOutputTokens &&
    !hasTranslatorOutputTokenLimit(body)
  ) {
    return {
      ok: false,
      estimatedInputTokens: normalizedInputTokens,
      contextLimit: normalizedContextLimit,
    };
  }

  const adjusted = adjustOutputTokenFields(body, availableOutputTokens);
  return { ok: true, ...adjusted, availableOutputTokens };
}
