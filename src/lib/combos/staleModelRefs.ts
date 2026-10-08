/**
 * Stale combo model refs (#13505).
 *
 * After a successful model sync, find combo steps that pin an explicit model
 * of the synced provider which the request-time check would now reject as
 * "not available in the active live catalog". Detection only: combos are
 * never modified here, so a temporary outage or a brand-new model can't
 * delete a step. Wildcard steps (`provider/*`) resolve live and combo refs
 * are checked on their own, so both are skipped.
 */

import { getCombos } from "@/lib/db/combos";
import { getActiveSyncedCatalog } from "@/lib/db/models/activeSyncedCatalog";
import { getModelInfo, parseModel } from "@/sse/services/model";
import { getComboModelProvider, getComboModelString } from "./steps";

export type StaleComboModelRef = {
  comboId: string;
  comboName: string;
  stepId: string | null;
  model: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isExplicitModelStep(step: unknown): boolean {
  if (typeof step === "string") return true;
  if (!isRecord(step)) return false;
  return step.kind === undefined || step.kind === "model";
}

/**
 * Return combo steps pinned to a `providerId` model that is missing from the
 * provider's authoritative synced catalog. Fails open: no authoritative
 * catalog (never synced, stale, or not authoritative) means nothing is flagged.
 */
export async function findStaleComboModelRefs(providerId: string): Promise<StaleComboModelRef[]> {
  if (!providerId) return [];
  const catalog = await getActiveSyncedCatalog(providerId);
  if (!catalog.authoritative) return [];

  const stale: StaleComboModelRef[] = [];
  for (const combo of await getCombos()) {
    if (!Array.isArray(combo.models) || typeof combo.id !== "string") continue;
    for (const step of combo.models as unknown[]) {
      if (!isExplicitModelStep(step)) continue;
      const model = getComboModelString(step);
      if (!model) continue;
      const stepProvider = getComboModelProvider(step);
      if (stepProvider !== providerId && parseModel(model).provider !== providerId) continue;

      try {
        const info = (await getModelInfo(model)) as { errorType?: string } | null;
        if (info?.errorType !== "model_not_found") continue;
      } catch {
        // Retired or malformed ids are reported by their own guards, not here.
        continue;
      }
      stale.push({
        comboId: combo.id,
        comboName: typeof combo.name === "string" ? combo.name : combo.id,
        stepId: isRecord(step) && typeof step.id === "string" ? step.id : null,
        model,
      });
    }
  }
  return stale;
}

/** Provider an explicit combo step pins, or null for any other step kind. */
function explicitStepProvider(step: unknown): string | null {
  if (!isExplicitModelStep(step)) return null;
  const model = getComboModelString(step);
  if (!model) return null;
  return getComboModelProvider(step) || parseModel(model).provider || null;
}

async function collectExplicitStepProviders(): Promise<Set<string>> {
  const providers = new Set<string>();
  for (const combo of await getCombos()) {
    const steps = Array.isArray(combo.models) ? (combo.models as unknown[]) : [];
    for (const step of steps) {
      const provider = explicitStepProvider(step);
      if (provider) providers.add(provider);
    }
  }
  return providers;
}

/**
 * Stale refs across every provider an explicit combo step pins, for the combo
 * editor badge. Each provider keeps the same fail-open rule as above.
 */
export async function findAllStaleComboModelRefs(): Promise<StaleComboModelRef[]> {
  // A step can match two provider ids (alias vs canonical), so dedupe by key.
  const byKey = new Map<string, StaleComboModelRef>();
  for (const providerId of await collectExplicitStepProviders()) {
    for (const ref of await findStaleComboModelRefs(providerId)) {
      const key = JSON.stringify([ref.comboId, ref.stepId, ref.model]);
      if (!byKey.has(key)) byKey.set(key, ref);
    }
  }
  return [...byKey.values()];
}
