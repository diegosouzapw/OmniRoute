/**
 * HIGH_LEVEL_ACTIONS — allowlist of audit events that appear in the Activity feed.
 *
 * IMPORTANT: This list is intentionally aligned with the REAL action strings emitted
 * by `logAuditEvent()` calls throughout the repository. Do NOT use "clean" or invented
 * names — always grep for `logAuditEvent` in the codebase before adding or renaming
 * an entry here. If the upstream emitter name changes, update both the emitter and
 * this list atomically.
 *
 * Last synced: 2026-05 (B/G3 gap-closure). Source of truth: grep logAuditEvent repo.
 */
export const HIGH_LEVEL_ACTIONS = [
  // providers / connections — ALINHADO COM `logAuditEvent` real
  "provider.credentials.created",
  "provider.credentials.applied",
  "provider.credentials.updated",
  "provider.credentials.revoked",
  "provider.credentials.batch_revoked",
  "provider.credentials.bulk_created",
  "provider.credentials.bulk_imported",
  "provider.credentials.imported",
  "provider.validation.ssrf_blocked",

  // auth
  "auth.login.success",
  "auth.login.error",
  "auth.login.failed",
  "auth.login.locked",
  "auth.login.misconfigured",
  "auth.login.setup_required",
  "auth.logout.success",

  // sync tokens
  "sync.token.created",
  "sync.token.revoked",

  // settings — alinhado (plural)
  "settings.update",
  "settings.update_failed",

  // service operations
  "service.reveal_api_key",

  // quota sharing (B26 — adicionados por F8)
  "quota.pool.created",
  "quota.pool.updated",
  "quota.pool.deleted",
  "quota.plan.updated",
  "quota.store.driver_changed",
] as const;

export type HighLevelAction = (typeof HIGH_LEVEL_ACTIONS)[number];

const SET: ReadonlySet<string> = new Set<string>(HIGH_LEVEL_ACTIONS);

export function isHighLevelAction(action: string): boolean {
  return SET.has(action);
}
