import type { getDbInstance } from "../db/core";
import { deleteProxyById, updateProxy } from "../db/proxies";

type DbHandle = ReturnType<typeof getDbInstance>;

export async function detachOrDeleteSubscriptionRow(row: {
  id: string;
  source: string;
}): Promise<void> {
  if (row.source === "subscription") {
    await deleteProxyById(row.id, { force: true });
  } else {
    await updateProxy(row.id, { subscriptionId: null });
  }
}

/**
 * Delete registry rows of a subscription that are missing from the fetched
 * set. A caller that syncs a disabled subscription skips this step: the
 * refresh still upserts the fetched nodes as a preview, but attached rows the
 * feed omits stay in place until the subscription is enabled again.
 */
export async function removeStaleSubscriptionNodes(
  db: DbHandle,
  id: string,
  keptIds: string[]
): Promise<void> {
  if (keptIds.length > 0) {
    const placeholders = keptIds.map(() => "?").join(",");
    const stale = db
      .prepare(
        `SELECT id, source FROM proxy_registry WHERE subscription_id = ? AND id NOT IN (${placeholders})`
      )
      .all(id, ...keptIds) as Array<{ id: string; source: string }>;
    for (const r of stale) {
      try {
        await detachOrDeleteSubscriptionRow(r);
      } catch {
        // ignore
      }
    }
  } else {
    const stale = db
      .prepare("SELECT id, source FROM proxy_registry WHERE subscription_id = ?")
      .all(id) as Array<{ id: string; source: string }>;
    for (const r of stale) {
      try {
        await detachOrDeleteSubscriptionRow(r);
      } catch {
        // ignore
      }
    }
  }
}
