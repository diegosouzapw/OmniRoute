/**
 * API-key identities that exist at runtime without a row in `api_keys`.
 *
 * The deployment-time environment key (`OMNIROUTE_API_KEY` / `ROUTER_API_KEY`)
 * is authenticated without ever being persisted: `getApiKeyMetadata()`
 * synthesizes its metadata and tags it with {@link SYNTHETIC_ENV_API_KEY_ID},
 * so downstream emitters (audit log, budgets, cost history, usage history)
 * can attribute its traffic to a stable id.
 *
 * Anything that decides whether an `api_key_id` is still owned MUST consult
 * this module rather than assume `api_keys` holds every owner. A row owned by
 * a synthetic identity is live state, not a broken reference — see
 * `repairOrphanDomainRows` in `@/lib/db/healthCheck`.
 *
 * @module shared/constants/apiKeyIdentities
 */

/** Id stamped on requests authenticated by the deployment-time env key. */
export const SYNTHETIC_ENV_API_KEY_ID = "env-key";

const SYNTHETIC_API_KEY_IDS: readonly string[] = Object.freeze([SYNTHETIC_ENV_API_KEY_ID]);

const SYNTHETIC_API_KEY_ID_SET: ReadonlySet<string> = new Set(SYNTHETIC_API_KEY_IDS);

/** Whether `apiKeyId` names a runtime identity that legitimately has no `api_keys` row. */
export function isSyntheticApiKeyId(apiKeyId: string | null | undefined): boolean {
  if (typeof apiKeyId !== "string") return false;
  return SYNTHETIC_API_KEY_ID_SET.has(apiKeyId.trim());
}

/** Every synthetic identity, for callers that must build a SQL exclusion list. */
export function getSyntheticApiKeyIds(): readonly string[] {
  return SYNTHETIC_API_KEY_IDS;
}
