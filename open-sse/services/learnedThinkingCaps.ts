/**
 * Learned Thinking-Budget Caps — reactive cap memory for Gemini-family models.
 *
 * Proactive clamping (`capThinkingBudget` in src/lib/modelCapabilities.ts) only
 * knows caps for models registered in MODEL_SPECS. Any Gemini model outside the
 * registry (e.g. gemini-2.5-pro, or a Gemini id served through another provider)
 * initially gets no cap, so a high client budget (xhigh = 131072) goes straight
 * to the upstream and can bounce with:
 *
 *   400 GenerateContentRequest.generation_config.thinking_config.thinking_budget:
 *   thinking_budget must be in the range [-1, 65535]
 *
 * When base.ts's executor sees that 400 it calls `recordLearnedThinkingCap`,
 * which walks the failed budget down a step ladder and stores the surviving cap
 * in a module-level Map keyed "provider:model" (lowercased). Subsequent requests
 * for the same provider+model read the cap via `getLearnedThinkingCap` (consulted
 * by `capThinkingBudget`) so the 400→retry round-trip is paid at most once per
 * process per provider+model — not once per chat session.
 *
 * In-memory only (per operator decision): restart resets, the first request after
 * a restart may re-learn at the cost of one upstream 400.
 */

// Known Gemini thinking-budget ceilings, highest first. 32768 is the pro-tier
// cap; 24576 is the flash-tier cap (gemini-2.5-flash in MODEL_SPECS); 8192 is a
// conservative floor that every thinking-capable Gemini accepts. A failed budget
// walks to the first step strictly below it.
const GEMINI_STEPDOWN: readonly number[] = [32768, 24576, 8192];

/**
 * Proactive cap applied by `capThinkingBudget` (src/lib/modelCapabilities.ts)
 * when a model id contains "gemini" but has no registry entry and no learned cap.
 * Set to the highest rung of the step ladder so unregistered Gemini models get
 * the maximum reasoning the family is known to accept, rather than letting an
 * xhigh budget (131072) through to a 400.
 */
export const GEMINI_FALLBACK_THINKING_CAP: number = GEMINI_STEPDOWN[0];

// key: `${provider}:${model}` lowercased → highest budget known to be accepted.
const learnedCaps = new Map<string, number>();

function buildKey(provider: string | null | undefined, model: string | null | undefined): string {
  const p = typeof provider === "string" ? provider.trim().toLowerCase() : "";
  const m = typeof model === "string" ? model.trim().toLowerCase() : "";
  if (!p || !m) return "";
  return `${p}:${m}`;
}

/**
 * Return the learned cap for provider+model, or null when nothing has been
 * learned yet (no upstream 400 recorded). Keyed case-insensitively.
 */
export function getLearnedThinkingCap(
  provider: string | null | undefined,
  model: string | null | undefined
): number | null {
  const key = buildKey(provider, model);
  if (!key) return null;
  return learnedCaps.get(key) ?? null;
}

/**
 * Record that `failedBudget` was rejected by the upstream for provider+model and
 * store the next step down as the learned cap. Returns the new cap, or null when
 * the step ladder is exhausted (even 8192 failed) or the key is unusable — the
 * caller should then give up clamping and surface the upstream error.
 *
 * Always monotonically decreases: if a cap already stored is lower than the step
 * we'd compute, the stored (lower) value wins and is returned unchanged. This
 * keeps concurrent failures on the same provider+model from ratcheting the cap
 * back up.
 */
export function recordLearnedThinkingCap(
  provider: string | null | undefined,
  model: string | null | undefined,
  failedBudget: number
): number | null {
  const key = buildKey(provider, model);
  if (!key) return null;
  if (!Number.isFinite(failedBudget)) return null;

  const nextStep = GEMINI_STEPDOWN.find((step) => step < failedBudget);
  if (nextStep === undefined) return null; // ladder exhausted

  const existing = learnedCaps.get(key);
  if (existing !== undefined && existing <= nextStep) {
    return existing; // already learned an equal-or-lower cap; keep it
  }
  learnedCaps.set(key, nextStep);
  return nextStep;
}

/**
 * Extract the upstream-advertised maximum from a thinking_budget range error.
 * Matches both snake_case and camelCase field namings:
 *   "thinking_budget must be in the range [-1, 65535]"   → 65535
 *   "thinkingBudget must be in the range [-1, 24576]"    → 24576
 * Returns null when the text is not a thinking-budget range error.
 */
export function parseThinkingBudgetMax(errText: unknown): number | null {
  if (typeof errText !== "string" || !errText) return null;
  const match = /thinking_?budget[^\d-]*(?:must be in the range|range)[^\d-]*\[\s*-?\d+\s*,\s*(\d+)\s*\]/i.exec(
    errText
  );
  if (!match) return null;
  const max = Number(match[1]);
  return Number.isFinite(max) ? max : null;
}

/** Test-only: clear the learned-cap Map between tests. */
export function __test_resetLearnedThinkingCaps(): void {
  learnedCaps.clear();
}
