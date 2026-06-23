/**
 * combos/autoPromote.ts — pure reorder helper for the "auto-promote successful
 * combo model" feature.
 *
 * When the `comboAutoPromoteEnabled` setting is on and a combo model responds
 * successfully, the winning model is moved to position #1 of the persisted
 * combo so future requests try it first.
 *
 * OmniRoute stores `combo.models` as an array of `ComboStep` objects
 * (`{ kind: "model", model, ... }`), unlike the upstream project which stores
 * plain model strings. This helper accepts both shapes and reorders in place
 * without mutating the input, returning `null` when no change is required
 * (winner already first, winner absent, or empty list).
 */

type StepLike = { kind?: unknown; model?: unknown } | string;

/** Extract the model id from a step entry (object or bare string). */
export function comboStepModelId(step: unknown): string | null {
  if (typeof step === "string") return step.trim().length > 0 ? step : null;
  if (step && typeof step === "object") {
    const model = (step as { model?: unknown }).model;
    if (typeof model === "string" && model.trim().length > 0) return model;
  }
  return null;
}

/**
 * Return a reordered copy of `models` with the entry matching `winningModel`
 * moved to the front, or `null` if no reordering is needed/possible.
 *
 * Pure: never mutates the input array or its entries.
 */
export function promoteModelToFront<T extends StepLike>(
  models: readonly T[] | null | undefined,
  winningModel: string | null | undefined
): T[] | null {
  if (!Array.isArray(models) || models.length === 0) return null;
  if (typeof winningModel !== "string" || winningModel.length === 0) return null;

  const matchIndex = models.findIndex((step) => comboStepModelId(step) === winningModel);
  // Winner not in the combo (e.g. global fallback) or already first → no-op.
  if (matchIndex <= 0) return null;

  const winner = models[matchIndex];
  const rest = models.filter((_, index) => index !== matchIndex);
  return [winner, ...rest];
}

interface PromoteComboDeps {
  updateCombo: (id: string, data: { models: unknown[] }) => Promise<unknown>;
  info?: (tag: string, msg: string) => void;
  warn?: (tag: string, msg: string) => void;
}

/**
 * Persist the auto-promotion of a successful combo model to position #1.
 *
 * Opt-in via the `comboAutoPromoteEnabled` setting. Best-effort: a DB failure is
 * logged and swallowed so it never affects the already-successful response.
 * No-op when the flag is off, the combo has no id, or the model is already first
 * / absent. `updateCombo` is injected so this stays unit-testable without a DB.
 */
export async function promoteSuccessfulComboModel(
  combo: { id?: unknown; name?: unknown; models?: unknown } | null | undefined,
  winningModel: string | null | undefined,
  settings: Record<string, unknown> | null | undefined,
  deps: PromoteComboDeps
): Promise<boolean> {
  if (!combo || !settings || !settings.comboAutoPromoteEnabled) return false;
  const comboId = typeof combo.id === "string" ? combo.id : null;
  if (!comboId) return false;
  const reordered = promoteModelToFront(
    Array.isArray(combo.models) ? (combo.models as unknown[]) : null,
    winningModel
  );
  if (!reordered) return false;
  const label = typeof combo.name === "string" ? combo.name : comboId;
  try {
    await deps.updateCombo(comboId, { models: reordered });
    deps.info?.("COMBO", `Model "${winningModel}" succeeded — promoted to #1 in combo "${label}"`);
    return true;
  } catch (dbErr: any) {
    deps.warn?.(
      "COMBO",
      `Failed to promote model "${winningModel}" in combo "${label}": ${
        dbErr?.message || "unknown error"
      }`
    );
    return false;
  }
}
