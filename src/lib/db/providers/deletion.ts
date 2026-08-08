/**
 * db/providers/deletion.ts — Provider connection deletion & reordering.
 *
 * Extracted from db/providers.ts (god-file shrink): the three provider
 * connection delete paths plus the connection reorder helper they share.
 * Each delete path also purges the connection's account-scoped
 * proxy_assignments (#9232) so orphans never keep routing to removed
 * connections.
 */

import { getDbInstance } from "../core";
import { backupDbFile } from "../backup";
import { cleanupComboConnectionRefs } from "../combos";
import {
  removeConnectionHealth,
  removeConnectionIndex,
} from "@omniroute/open-sse/services/apiKeyRotator.ts";
import { invalidateDbCache } from "../readCache";
import { invalidateReasoningRoutingRuleCache } from "../reasoningRoutingRules";
import { bumpProxyConfigGeneration } from "../settings";
import { toRecord } from "./columns";

interface StatementLike<TRow = unknown> {
  all: (...params: unknown[]) => TRow[];
  get: (...params: unknown[]) => TRow | undefined;
  run: (...params: unknown[]) => { changes?: number };
}

interface DbLike {
  prepare: <TRow = unknown>(sql: string) => StatementLike<TRow>;
  transaction: <T>(fn: () => T) => () => T;
}

// Purge account-scoped proxy_assignments for the deleted connections (#9232):
// orphan assignments otherwise keep routing to provider_connections that no
// longer exist. scope='account' lives in exactly this one place.
function _deleteAccountProxyAssignments(db: DbLike, ids: string[]) {
  if (ids.length === 0) return;
  const placeholders = ids.map(() => "?").join(",");
  db.prepare(
    `DELETE FROM proxy_assignments WHERE scope = 'account' AND scope_id IN (${placeholders})`
  ).run(...ids);
}

function _selectExistingConnectionIds(db: DbLike, ids: string[]): string[] {
  if (ids.length === 0) return [];

  const placeholders = ids.map(() => "?").join(",");

  return db
    .prepare(`SELECT id FROM provider_connections WHERE id IN (${placeholders})`)
    .all(...ids)
    .map((row) => {
      const record = toRecord(row);
      return typeof record.id === "string" ? record.id : null;
    })
    .filter((id): id is string => id !== null);
}

async function _cleanupDeletedComboConnectionRefs(connectionIds: string | string[]): Promise<void> {
  try {
    await cleanupComboConnectionRefs(connectionIds);
  } catch (error) {
    console.error("Failed to clean up combo route refs for deleted connections:", error);
  }
}

export async function deleteProviderConnection(id: string) {
  const db = getDbInstance() as unknown as DbLike;
  const existing = db.prepare("SELECT provider FROM provider_connections WHERE id = ?").get(id);
  if (!existing) return false;

  db.transaction(() => {
    _deleteAccountProxyAssignments(db, [id]);
    db.prepare("DELETE FROM quota_snapshots WHERE connection_id = ?").run(id);
    db.prepare("DELETE FROM provider_connections WHERE id = ?").run(id);
  })();

  await _cleanupDeletedComboConnectionRefs(id);

  removeConnectionHealth(id);
  removeConnectionIndex(id);
  bumpProxyConfigGeneration();
  const existingRecord = toRecord(existing);
  const providerId =
    typeof existingRecord.provider === "string"
      ? existingRecord.provider
      : String(existingRecord.provider || "");
  reorderConnections(db, providerId);
  backupDbFile("pre-write");
  invalidateDbCache("connections"); // Bust connections read cache
  invalidateReasoningRoutingRuleCache();
  return true;
}

export async function deleteProviderConnections(ids: string[]): Promise<number> {
  if (ids.length === 0) return 0;

  const db = getDbInstance() as unknown as DbLike;
  const existingIds = _selectExistingConnectionIds(db, ids);

  const deletedCount = db.transaction(() => {
    const placeholders = ids.map(() => "?").join(",");

    db.prepare(`DELETE FROM quota_snapshots WHERE connection_id IN (${placeholders})`).run(...ids);

    _deleteAccountProxyAssignments(db, ids);

    const result = db
      .prepare(`DELETE FROM provider_connections WHERE id IN (${placeholders})`)
      .run(...ids);

    return result.changes ?? 0;
  })();

  await _cleanupDeletedComboConnectionRefs(existingIds);

  for (const id of ids) {
    removeConnectionHealth(id);
    removeConnectionIndex(id);
  }

  backupDbFile("pre-write");
  invalidateDbCache("connections");
  invalidateReasoningRoutingRuleCache();

  return deletedCount;
}

export async function deleteProviderConnectionsByProvider(providerId: string) {
  const db = getDbInstance() as unknown as DbLike;
  const connectionIds = db
    .prepare("SELECT id FROM provider_connections WHERE provider = ?")
    .all(providerId)
    .map((row) => {
      const record = toRecord(row);
      return typeof record.id === "string" ? record.id : null;
    })
    .filter((id): id is string => id !== null);

  const result = db.transaction(() => {
    if (connectionIds.length > 0) {
      const deleteSnapshots = db.prepare("DELETE FROM quota_snapshots WHERE connection_id = ?");
      for (const connectionId of connectionIds) {
        deleteSnapshots.run(connectionId);
      }
      _deleteAccountProxyAssignments(db, connectionIds);
    }
    return db.prepare("DELETE FROM provider_connections WHERE provider = ?").run(providerId);
  })();

  await _cleanupDeletedComboConnectionRefs(connectionIds);

  for (const connectionId of connectionIds) {
    removeConnectionHealth(connectionId);
    removeConnectionIndex(connectionId);
  }
  backupDbFile("pre-write");
  invalidateDbCache("connections");
  invalidateReasoningRoutingRuleCache();
  return result.changes;
}

export async function reorderProviderConnections(providerId: string) {
  const db = getDbInstance() as unknown as DbLike;
  reorderConnections(db, providerId);
}

export function reorderConnections(db: DbLike, providerId: string) {
  const rows = db
    .prepare(
      "SELECT id, priority, updated_at FROM provider_connections WHERE provider = ? ORDER BY priority ASC, updated_at DESC"
    )
    .all(providerId);

  const update = db.prepare("UPDATE provider_connections SET priority = ? WHERE id = ?");
  rows.forEach((row, index) => {
    const current = toRecord(row);
    update.run(index + 1, current.id);
  });
}
