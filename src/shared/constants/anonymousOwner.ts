/**
 * Synthetic owner id for a genuinely anonymous CLIENT_API caller (no
 * credential presented at all) writing to `/v1/files` or `/v1/batches`
 * under `REQUIRE_API_KEY=false` — #14332 option (b).
 *
 * Before this fix, an anonymous write persisted `api_key_id = NULL`, and
 * `canAccessOwnedRecord()` denies a null-owner record to every non-session
 * caller (GHSA-2jm2-mpx8-6523), so the very caller that created the row
 * could never read, download, delete it, or use it as a batch input file.
 * Stamping anonymous writes with this stable sentinel instead of `NULL`
 * lets `canAccessOwnedRecord()`'s existing `recordApiKeyId === scope.apiKeyId`
 * comparison succeed for that same caller on a later request, without
 * weakening the null-owner deny-by-default rule for any OTHER shape of
 * unowned row.
 *
 * ⚠️ This is NOT per-caller isolation. Every anonymous request to this
 * instance resolves to the SAME sentinel — that is the threat model of
 * `REQUIRE_API_KEY=false` itself: an anonymous caller carries no identity,
 * so there is nothing to isolate different anonymous callers from each
 * other. Any anonymous caller can read/delete any OTHER anonymous caller's
 * file/batch. It only guarantees the two directions that matter for
 * tenant isolation: an anonymous caller can never read an authenticated
 * tenant's (or the dashboard session's) objects, and an authenticated
 * tenant's key can never read an anonymous object, because this sentinel
 * never equals a real `api_keys.id` (plain `uuidv4()`) or the deployment
 * env key's synthesized id (`"env-key"`).
 *
 * Deliberately NOT a valid UUID and NOT `"env-key"`, so it can never
 * collide with a real `api_keys.id` value.
 */
export const ANONYMOUS_OWNER_ID = "__anonymous_owner__";
