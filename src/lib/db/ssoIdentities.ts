/**
 * SSO identity ↔ shadow API key binding.
 *
 * An Entra user authenticating to /v1/* is backed by a "shadow" api_keys row.
 * That indirection is the design: key_group_members has a FOREIGN KEY to
 * api_keys(id), so binding SSO users to a real key row means the existing
 * policy engine (rate limits, model allowlists, budgets, combos) and call-log
 * attribution apply unchanged, instead of every one of those paths needing an
 * SSO branch.
 *
 * The shadow key's secret is never issued to anyone — it exists to satisfy the
 * NOT NULL UNIQUE `key` column and the hash lookup in getApiKeyMetadata. The
 * user's actual credential is their Entra token.
 */

import { getDbInstance } from "./core";
import { createApiKey, deleteApiKey } from "./apiKeys";
import { addKeyToGroup, removeKeyFromGroup } from "./apiKeyGroups";
import { getConsistentMachineId } from "@/shared/utils/machineId";
import * as log from "@/sse/utils/logger";

export interface SsoIdentityRecord {
  oid: string;
  tenantId: string;
  upn: string;
  displayName: string;
  apiKeyId: string;
  lastGroups: string[];
  lastSeenAt: string | null;
  createdAt: string;
}

interface SsoIdentityRow {
  oid?: unknown;
  tenant_id?: unknown;
  upn?: unknown;
  display_name?: unknown;
  api_key_id?: unknown;
  last_groups?: unknown;
  last_seen_at?: unknown;
  created_at?: unknown;
}

function str(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function parseGroups(value: unknown): string[] {
  if (typeof value !== "string" || value.length === 0) return [];
  try {
    const parsed: unknown = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((entry): entry is string => typeof entry === "string");
  } catch {
    return [];
  }
}

function rowToRecord(row: SsoIdentityRow): SsoIdentityRecord {
  return {
    oid: str(row.oid),
    tenantId: str(row.tenant_id),
    upn: str(row.upn),
    displayName: str(row.display_name),
    apiKeyId: str(row.api_key_id),
    lastGroups: parseGroups(row.last_groups),
    lastSeenAt: typeof row.last_seen_at === "string" ? row.last_seen_at : null,
    createdAt: str(row.created_at),
  };
}

export function getSsoIdentity(oid: string): SsoIdentityRecord | null {
  if (!oid) return null;
  const db = getDbInstance();
  const row = db.prepare("SELECT * FROM sso_identities WHERE oid = ?").get(oid) as
    SsoIdentityRow | undefined;
  return row ? rowToRecord(row) : null;
}

/**
 * Returns null once the shadow key is deactivated, which is the instant
 * kill-switch for an SSO user: revoking them in Entra only stops new tokens,
 * while an already-issued one stays valid until it expires.
 */
export function getSsoShadowSecret(oid: string): string | null {
  if (!oid) return null;
  const db = getDbInstance();
  const row = db
    .prepare(
      `SELECT k.key AS key FROM sso_identities s
       INNER JOIN api_keys k ON k.id = s.api_key_id
       WHERE s.oid = ? AND k.is_active != 0 AND k.is_banned != 1 AND k.revoked_at IS NULL`
    )
    .get(oid) as { key?: unknown } | undefined;
  const secret = str(row?.key);
  return secret.length > 0 ? secret : null;
}

function touchLastSeen(oid: string, keyGroupIds: string[]): void {
  const db = getDbInstance();
  db.prepare("UPDATE sso_identities SET last_seen_at = ?, last_groups = ? WHERE oid = ?").run(
    new Date().toISOString(),
    JSON.stringify(keyGroupIds),
    oid
  );
}

function markKeyAsSso(apiKeyId: string): void {
  const db = getDbInstance();
  db.prepare("UPDATE api_keys SET source = 'sso' WHERE id = ?").run(apiKeyId);
}

export function setSsoKeyActive(apiKeyId: string, active: boolean): boolean {
  const db = getDbInstance();
  const result = db
    .prepare("UPDATE api_keys SET is_active = ? WHERE id = ?")
    .run(active ? 1 : 0, apiKeyId);
  return (result.changes ?? 0) > 0;
}

/** Skips all writes when the resolved set matches `previous`, the common case. */
export function reconcileKeyGroups(
  apiKeyId: string,
  desired: string[],
  previous: string[]
): boolean {
  const desiredSet = new Set(desired);
  const previousSet = new Set(previous);

  const sameSize = desiredSet.size === previousSet.size;
  if (sameSize && [...desiredSet].every((id) => previousSet.has(id))) return false;

  for (const groupId of desiredSet) {
    if (!previousSet.has(groupId)) addKeyToGroup(apiKeyId, groupId);
  }
  for (const groupId of previousSet) {
    if (!desiredSet.has(groupId)) removeKeyFromGroup(apiKeyId, groupId);
  }
  return true;
}

export interface ProvisionInput {
  oid: string;
  tenantId: string;
  upn: string;
  displayName: string;
  keyGroupIds: string[];
}

/**
 * Idempotent under concurrency: two simultaneous first requests both mint a key
 * row, then race on `INSERT OR IGNORE` — one wins and the loser deletes the key
 * it just created rather than leaving an orphan behind.
 */
export async function provisionSsoIdentity(input: ProvisionInput): Promise<string | null> {
  const existing = getSsoIdentity(input.oid);
  if (existing) {
    reconcileKeyGroups(existing.apiKeyId, input.keyGroupIds, existing.lastGroups);
    touchLastSeen(input.oid, input.keyGroupIds);
    return getSsoShadowSecret(input.oid);
  }

  const machineId = (await getConsistentMachineId().catch(() => null)) || "0000000000000000";
  const label = input.upn || input.oid;
  const created = await createApiKey(`sso:${label}`, machineId, []);

  const db = getDbInstance();
  const inserted = db
    .prepare(
      `INSERT OR IGNORE INTO sso_identities
         (oid, tenant_id, upn, display_name, api_key_id, last_groups, last_seen_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    )
    .run(
      input.oid,
      input.tenantId,
      input.upn,
      input.displayName,
      created.id,
      JSON.stringify([]),
      new Date().toISOString()
    );

  if ((inserted.changes ?? 0) === 0) {
    await deleteApiKey(created.id).catch((error: unknown) => {
      log.error("ENTRA_SSO", "Failed to clean up orphaned shadow key after provisioning race", {
        error,
      });
    });
    const winner = getSsoIdentity(input.oid);
    if (!winner) return null;
    reconcileKeyGroups(winner.apiKeyId, input.keyGroupIds, winner.lastGroups);
    touchLastSeen(input.oid, input.keyGroupIds);
    return getSsoShadowSecret(input.oid);
  }

  markKeyAsSso(created.id);
  reconcileKeyGroups(created.id, input.keyGroupIds, []);
  touchLastSeen(input.oid, input.keyGroupIds);

  log.info("ENTRA_SSO", "Provisioned shadow API key for SSO user", {
    oid: input.oid,
    apiKeyId: created.id,
    keyGroups: input.keyGroupIds.length,
  });

  return getSsoShadowSecret(input.oid);
}
