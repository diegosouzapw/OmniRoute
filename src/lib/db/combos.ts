/**
 * Compatibility facade for combo persistence.
 *
 * Application code keeps the existing function-level API while persistence is
 * delegated through the domain repository contract. Cross-cutting write effects
 * remain here instead of becoming part of the portable repository surface.
 */

import type { ComboRecord } from "@/domain/persistence/comboRepositories";
import { backupDbFile } from "./backup";
import { clearSessionModelHistoryForCombo } from "./contextHandoffs";
import { getDbInstance } from "./core";
import { invalidateDbCache } from "./readCache";
import { invalidateReasoningRoutingRuleCache } from "./reasoningRoutingRules";
import { routingConfigRepositories } from "./repositories/routingConfigRepositories";

const repository = routingConfigRepositories.combos;

export function getCombos(limit?: number, offset?: number): Promise<ComboRecord[]> {
  return repository.list(limit, offset);
}

/** Keep the existing synchronous facade contract while repository APIs become async. */
export function getCombosCount(): number {
  return routingConfigRepositories.legacySync.getCombosCount();
}

export function getComboById(id: string): Promise<ComboRecord | null> {
  return repository.findById(id);
}

export function getComboByName(name: string): Promise<ComboRecord | null> {
  return repository.findByName(name);
}

export function getComboByNameInsensitive(name: string): Promise<ComboRecord | null> {
  return repository.findByNameInsensitive(name);
}

export async function createCombo(data: ComboRecord): Promise<ComboRecord> {
  const combo = await repository.create(data);
  invalidateDbCache("combos");
  backupDbFile("pre-write");
  return combo;
}

export async function updateCombo(id: string, data: ComboRecord): Promise<ComboRecord | null> {
  const result = await repository.update(id, data);
  if (!result) return null;

  if (result.modelsFieldProvided) {
    const cleared = clearSessionModelHistoryForCombo(result.previousName);
    if (cleared > 0 && result.currentName !== result.previousName) {
      clearSessionModelHistoryForCombo(result.currentName);
    }
  }

  invalidateDbCache("combos");
  backupDbFile("pre-write");
  return result.combo;
}

export async function reorderCombos(comboIds: string[]): Promise<ComboRecord[]> {
  const result = await repository.reorder(comboIds);
  if (result.rowsReordered > 0) {
    invalidateDbCache("combos");
    backupDbFile("pre-write");
  }
  return result.combos;
}

export async function deleteCombo(id: string): Promise<boolean> {
  const deleted = await repository.deleteById(id);
  if (!deleted) return false;

  invalidateDbCache("combos");
  invalidateReasoningRoutingRuleCache();
  backupDbFile("pre-write");
  return true;
}

export async function deleteComboByName(name: string): Promise<boolean> {
  const combo = await repository.findByName(name);
  if (!combo || typeof combo.id !== "string") return false;
  return deleteCombo(combo.id);
}

export function setActiveCombo(name: string, db = getDbInstance()): void {
  db.prepare(
    "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('settings', 'activeCombo', ?)"
  ).run(JSON.stringify(name));
}

/**
 * Null out any combo model step whose connectionId matches a deleted connection.
 * Called after a provider connection is removed so combo routes don't carry
 * stale references.
 */
export async function cleanupComboConnectionRefs(connectionId: string) {
  const combos = await getCombos();
  let touched = 0;
  for (const combo of combos) {
    if (!Array.isArray(combo.models)) continue;
    let changed = false;
    const models = (combo.models as unknown as Record<string, unknown>[]).map((step) => {
      let out = step;
      if (out.connectionId === connectionId) {
        const { connectionId: _, ...rest } = out;
        out = rest;
        changed = true;
      }
      if (Array.isArray(out.allowedConnectionIds)) {
        const filtered = out.allowedConnectionIds.filter(
          (id: string) => id !== connectionId
        );
        if (filtered.length !== out.allowedConnectionIds.length) {
          out = { ...out, allowedConnectionIds: filtered };
          changed = true;
        }
      }
      return out;
    });
    if (changed && typeof combo.id === "string") {
      try {
        const { id, ...rest } = combo;
        await updateCombo(combo.id, { ...rest, models });
        touched++;
      } catch {
        // One combo failing should not block cleanup of the rest.
      }
    }
  }
  return touched;
}
