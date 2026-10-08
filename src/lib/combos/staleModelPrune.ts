/**
 * Opt-in auto-prune for stale combo model refs (#13505 follow-up).
 *
 * Default OFF: a sync only flags stale steps. When the flag is on, the sync
 * route removes the steps `findStaleComboModelRefs` flagged, and only after a
 * successful sync against an authoritative catalog.
 */

import { getComboById, updateCombo } from "@/lib/db/combos";
import { isFeatureFlagEnabled } from "@/shared/utils/featureFlags";
import { getComboModelString } from "./steps";
import { isExplicitModelStep, type StaleComboModelRef } from "./staleModelRefs";

export const COMBO_AUTO_PRUNE_FLAG = "COMBO_AUTO_PRUNE_STALE_STEPS";

export function isStaleComboAutoPruneEnabled(): boolean {
  return isFeatureFlagEnabled(COMBO_AUTO_PRUNE_FLAG);
}

/**
 * Remove the explicit model steps behind `refs`. A combo whose every step is
 * stale is left alone so pruning never empties it; its refs stay flagged.
 * Returns the refs whose steps were removed.
 */
export async function pruneStaleComboModelRefs(
  refs: StaleComboModelRef[]
): Promise<StaleComboModelRef[]> {
  const byCombo = new Map<string, StaleComboModelRef[]>();
  for (const ref of refs) byCombo.set(ref.comboId, [...(byCombo.get(ref.comboId) || []), ref]);

  const pruned: StaleComboModelRef[] = [];
  for (const [comboId, comboRefs] of byCombo) {
    const combo = await getComboById(comboId);
    if (!combo || !Array.isArray(combo.models)) continue;
    const staleModels = new Set(comboRefs.map((ref) => ref.model));
    const kept = (combo.models as unknown[]).filter(
      (step) => !(isExplicitModelStep(step) && staleModels.has(getComboModelString(step) || ""))
    );
    if (kept.length === 0 || kept.length === combo.models.length) continue;
    try {
      const { id: _id, ...rest } = combo;
      await updateCombo(comboId, { ...rest, models: kept });
      pruned.push(...comboRefs);
    } catch {
      // One combo failing must not block the rest; its refs stay flagged.
    }
  }
  return pruned;
}
