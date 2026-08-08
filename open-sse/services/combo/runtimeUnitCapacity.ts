/**
 * @file runtimeUnitCapacity.ts
 * @description Concurrency-capacity checks for nested combo execute-mode units so
 *   ordered strategies overflow to the next slot instead of queueing on a full connection.
 *
 * @changes
 * - [2026-07-24] [Composer] - Initial capacity pre-check for execute-mode runtime units
 */
import { isAccountSemaphoreFull } from "../accountSemaphore.ts";
import { resolveComboTargets } from "./comboStructure.ts";
import { lookupPositiveCap } from "./concurrencyCaps.ts";
import type {
  ComboCollectionLike,
  ComboLike,
  HiddenModelsByProvider,
  ResolvedComboUnit,
} from "./types.ts";

type CapLookup = (connectionId: string) => Promise<number | null>;

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function getCombosList(allCombos: ComboCollectionLike): ComboLike[] {
  const combos = Array.isArray(allCombos) ? allCombos : allCombos?.combos || [];
  return combos.filter(
    (combo): combo is ComboLike => isRecord(combo) && typeof combo.name === "string"
  );
}

function findComboByName(allCombos: ComboCollectionLike, name: string): ComboLike | null {
  return getCombosList(allCombos).find((combo) => combo.name === name) || null;
}

async function isConnectionAtConcurrencyCap(
  provider: string,
  connectionId: string,
  lookupCap: CapLookup
): Promise<boolean> {
  const cap = await lookupCap(connectionId);
  if (!cap) return false;
  return isAccountSemaphoreFull(provider, connectionId, cap);
}

/**
 * Returns true when the runtime unit should be skipped because every limited
 * connection it would use is already at max_concurrent.
 */
export async function isRuntimeUnitAtConcurrencyCap(
  unit: ResolvedComboUnit,
  allCombos: ComboCollectionLike,
  lookupCap: CapLookup = lookupPositiveCap,
  // Threaded from the caller so the hidden-model snapshot resolved once per
  // request is reused. Without it resolveComboTargets falls back to its default
  // getHiddenModelsByProvider(), i.e. a fresh full key_value read per nested
  // combo-ref unit on EVERY request (#8878 threaded the other call sites).
  hiddenModelsByProvider?: HiddenModelsByProvider
): Promise<boolean> {
  if (unit.kind === "model") {
    if (!unit.connectionId || !unit.provider) return false;
    return isConnectionAtConcurrencyCap(unit.provider, unit.connectionId, lookupCap);
  }

  const childCombo = findComboByName(allCombos, unit.comboName);
  if (!childCombo) return false;

  const targets = resolveComboTargets(childCombo, allCombos, 1, hiddenModelsByProvider);
  const byConnection = new Map<string, { provider: string; connectionId: string }>();
  for (const target of targets) {
    if (!target.connectionId || !target.provider) continue;
    byConnection.set(target.connectionId, {
      provider: target.provider,
      connectionId: target.connectionId,
    });
  }
  if (byConnection.size === 0) return false;

  let sawLimitedConnection = false;
  for (const { provider, connectionId } of byConnection.values()) {
    const cap = await lookupCap(connectionId);
    if (!cap) continue;
    sawLimitedConnection = true;
    if (!isAccountSemaphoreFull(provider, connectionId, cap)) {
      return false;
    }
  }

  return sawLimitedConnection;
}
