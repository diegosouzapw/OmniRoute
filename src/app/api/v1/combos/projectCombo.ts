/**
 * Public projection helpers for GET /v1/combos (issue #2300).
 *
 * Strip internal routing details (connectionId, weights, labels, etc.) before
 * returning combo metadata to API-key callers. Kept in a separate module so
 * the projection can be unit-tested without spinning up the Next.js route.
 */
export interface PublicComboStep {
  kind: "model" | "combo-ref";
  model?: string;
  comboName?: string;
  providerId?: string;
}

export interface PublicCombo {
  name: string;
  strategy: string;
  description?: string;
  models: PublicComboStep[];
}

export function projectComboStep(step: Record<string, unknown>): PublicComboStep | null {
  const kind = step.kind;
  if (kind === "combo-ref" && typeof step.comboName === "string") {
    return { kind: "combo-ref", comboName: step.comboName };
  }
  if (kind === "model" && typeof step.model === "string") {
    const out: PublicComboStep = { kind: "model", model: step.model };
    if (typeof step.providerId === "string" && step.providerId.length > 0) {
      out.providerId = step.providerId;
    }
    return out;
  }
  return null;
}

export function projectCombo(combo: Record<string, unknown>): PublicCombo | null {
  const name = typeof combo.name === "string" ? combo.name.trim() : "";
  if (!name) return null;

  const strategy = typeof combo.strategy === "string" ? combo.strategy : "priority";

  const out: PublicCombo = { name, strategy, models: [] };
  if (typeof combo.description === "string" && combo.description.length > 0) {
    out.description = combo.description;
  }

  const rawModels = Array.isArray(combo.models) ? combo.models : [];
  for (const m of rawModels) {
    if (m && typeof m === "object") {
      const step = projectComboStep(m as Record<string, unknown>);
      if (step) out.models.push(step);
    }
  }
  return out;
}
