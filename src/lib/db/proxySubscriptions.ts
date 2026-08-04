// Proxy-subscription-specific pool operations, split out of `proxies.ts` to keep
// that module under its frozen size cap. Re-exported from `proxies.ts` so callers
// (subscriptionService.ts et al.) can keep importing from the original module.
import { getDbInstance } from "./core";
import { backupDbFile } from "./backup";
import { normalizeScope, normalizeAssignmentScopeId } from "./proxies/mappers";
import { bumpProxyRegistryGeneration } from "./proxies/registryGeneration";

/**
 * Add MULTIPLE proxies to a scope's rotation POOL in a single batched write
 * (#6365). Idempotent per (scope, scope_id, proxy_id): existing members are
 * skipped. New members are appended after the current highest `position` so
 * round-robin order is stable. Returns the number of proxies actually added.
 * Prefer this over N calls to `addProxyToScopePool` when binding a whole pool
 * (e.g. a synced subscription's node list).
 */
export async function addProxiesToScopePool(
  scope: string,
  scopeId: string | null,
  proxyIds: string[]
): Promise<number> {
  const normalizedScope = normalizeScope(scope);
  const normalizedScopeId = normalizeAssignmentScopeId(normalizedScope, scopeId);
  if (normalizedScope !== "global" && !normalizedScopeId) {
    throw new Error("scopeId is required for non-global proxy assignments");
  }
  const unique = [...new Set((proxyIds || []).filter(Boolean))];
  if (unique.length === 0) return 0;

  const db = getDbInstance();
  const maxRow = db
    .prepare("SELECT MAX(position) AS maxPos FROM proxy_assignments WHERE scope = ? AND scope_id IS ?")
    .get(normalizedScope, normalizedScopeId) as { maxPos?: number | null } | undefined;
  const base = maxRow && typeof maxRow.maxPos === "number" ? maxRow.maxPos + 1 : 0;
  const now = new Date().toISOString();

  const exists = db.prepare(
    "SELECT 1 FROM proxy_assignments WHERE scope = ? AND scope_id IS ? AND proxy_id = ? LIMIT 1"
  );
  const insert = db.prepare(
    `INSERT INTO proxy_assignments (proxy_id, scope, scope_id, position, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?)`
  );

  let added = 0;
  unique.forEach((pid, i) => {
    if (!exists.get(normalizedScope, normalizedScopeId, pid)) {
      insert.run(pid, normalizedScope, normalizedScopeId, base + i, now, now);
      added++;
    }
  });

  if (added > 0) {
    backupDbFile("pre-write");
    bumpProxyRegistryGeneration();
  }
  return added;
}
