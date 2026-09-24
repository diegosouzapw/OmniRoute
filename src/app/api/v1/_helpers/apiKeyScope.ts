import { NextResponse } from "next/server";
import { getApiKeyMetadata, validateApiKey } from "@/lib/db/apiKeys";
import { extractApiKey } from "@/sse/services/auth";
import { isDashboardSessionAuthenticated } from "@/shared/utils/apiAuth";
import { CORS_HEADERS } from "@/shared/utils/cors";
import { buildErrorBody } from "@omniroute/open-sse/utils/error";

/**
 * Why `apiKeyId` is null — the lifecycle outcome `getApiKeyRequestScope` already
 * computed, surfaced so a route can name it in an audit line WITHOUT re-running
 * the gate (omni-code-review LEDGER-3/9):
 *
 *   - `none`       — no key presented (anonymous or session-only caller);
 *   - `unresolved` — a key was presented but no row matches (deleted, rotated, mistyped);
 *   - `invalid`    — the row exists but failed `validateApiKey`
 *                    (is_active / revoked_at / is_banned / expires_at);
 *   - `valid`      — passed the gate; `apiKeyId` and `apiKeyMetadata` are set.
 *
 * `apiKeyId !== null` ⟺ `keyState === "valid"`. Additive field: every consumer
 * that only reads `apiKeyId` keeps working unchanged.
 */
export type ApiKeyState = "none" | "unresolved" | "invalid" | "valid";

export interface ApiKeyRequestScope {
  apiKey: string | null;
  apiKeyId: string | null;
  apiKeyMetadata: Awaited<ReturnType<typeof getApiKeyMetadata>>;
  keyState: ApiKeyState;
  rejection: Response | null;
  isSessionAuth: boolean;
}

export async function getApiKeyRequestScope(request: Request): Promise<ApiKeyRequestScope> {
  const isSessionAuth = await isDashboardSessionAuthenticated(request);
  const apiKey = extractApiKey(request);
  if (!apiKey) {
    return {
      apiKey: null,
      apiKeyId: null,
      apiKeyMetadata: null,
      keyState: "none",
      rejection: null,
      isSessionAuth,
    };
  }

  const apiKeyMetadata = await getApiKeyMetadata(apiKey);

  // Fail closed: `getApiKeyMetadata` resolves the key by row EXISTENCE only —
  // it applies no lifecycle filter. `validateApiKey` is the one gate that
  // checks is_active/revoked_at/is_banned/expires_at (CWE-613). A key that
  // fails that gate is folded into the same `{ apiKeyId: null }` shape as an
  // unresolved/anonymous caller, so every consumer of this scope (list reads,
  // per-record ownership checks, the delete-completed sweep) treats a
  // revoked/expired/banned key as invalid without each route re-implementing
  // the check — this is the single lifecycle gate; routes must not re-run it.
  let keyState: ApiKeyState = "unresolved";
  if (apiKeyMetadata) keyState = (await validateApiKey(apiKey)) ? "valid" : "invalid";
  if (keyState !== "valid") {
    return {
      apiKey,
      apiKeyId: null,
      apiKeyMetadata: null,
      keyState,
      rejection: null,
      isSessionAuth,
    };
  }
  return {
    apiKey,
    apiKeyId: apiKeyMetadata.id,
    apiKeyMetadata,
    keyState,
    rejection: null,
    isSessionAuth,
  };
}

/**
 * Canonical per-record ownership check for API-key-scoped resources (files,
 * batches, …). Three callers, three answers — the same model as the sweep
 * scoping in `deleteCompletedBatches()` (GHSA-wvxc-jp3v-5mg5):
 *
 *   - the operator's own dashboard (session auth) may act on ANY record;
 *   - an API key may act on its OWN records only;
 *   - a record with no owner (null/undefined `api_key_id`) is unattributable
 *     and is denied to every non-session caller — an anonymous request and a
 *     foreign key alike. "No owner" is NOT "no restriction": every file/batch
 *     row has carried `api_key_id` since the table was created, so a null
 *     owner is an anonymous or dashboard-session write (or a batch artifact
 *     inheriting one), and letting any principal read, download or delete it
 *     was GHSA-2jm2-mpx8-6523.
 *
 * `getApiKeyRequestScope` never sets `rejection` — with `REQUIRE_API_KEY=false`
 * the central policy admits both a missing and an invalid bearer as anonymous —
 * so `{ apiKeyId: null, isSessionAuth: false }` is exactly the anonymous shape
 * and must never match a record. A revoked, expired or banned key (fails
 * `validateApiKey`) is folded into that same shape by `getApiKeyRequestScope`
 * itself (#13881) — do not reintroduce a path that trusts `apiKeyId` without
 * that lifecycle gate.
 */
export function canAccessOwnedRecord(
  scope: Pick<ApiKeyRequestScope, "isSessionAuth" | "apiKeyId">,
  recordApiKeyId: string | null | undefined
): boolean {
  if (scope.isSessionAuth) return true;
  if (recordApiKeyId === null || recordApiKeyId === undefined) return false;
  return recordApiKeyId === scope.apiKeyId;
}

/**
 * The id of the key that should own a record created (or looked up) in this
 * request — LEDGER-27, omni-code-sec round 3. A valid key resolved ONLY via
 * the ungated `x-api-key`/`x-goog-api-key` transport (no anthropic-version,
 * non-Claude UA) is invisible to `extractApiKey()`/`getApiKeyRequestScope()`
 * (`scope.apiKeyId` stays null for it, #13881/round-2), but
 * `enforceApiKeyPolicy()` resolves and validates that same key independently
 * via `extractUngatedClientApiKey()` and hands back a non-null `apiKeyInfo`
 * once the key clears every lifecycle/policy gate (`policy.rejection ===
 * null`). Without this fallback, a write handler persisted `apiKeyId: null`
 * for that transport — an unreadable, undeletable, unaccounted-for row — and
 * an ownership check on that same transport denied the key its own record.
 * `scope.apiKeyId` always wins when set (the ordinary Authorization/anthropic
 * transports already resolved it); a session-only caller (no key at all)
 * passes through unchanged, since `policyApiKeyInfo` is null in that case too.
 */
export function resolveEffectiveApiKeyId(
  scope: Pick<ApiKeyRequestScope, "apiKeyId">,
  policyApiKeyInfo: { id: string } | null
): string | null {
  return scope.apiKeyId ?? policyApiKeyInfo?.id ?? null;
}

/**
 * Owner scope of a CLIENT_API list/count read (`GET /v1/files`, `GET /v1/batches`).
 * The intent is explicit on purpose, exactly like the `delete-completed` sweep:
 * a caller is either scoped to the API key it presented, or it is the operator's
 * dashboard session reading the whole instance, or it is rejected — there is no
 * default that widens a read to every tenant (GHSA-m3hp-hq9g-fpmv).
 */
export type OwnedListScope =
  | { mode: "api_key"; apiKeyId: string }
  | { mode: "instance" }
  | { mode: "rejected"; response: Response };

function unauthorized(message: string): Response {
  return NextResponse.json(buildErrorBody(401, message), { status: 401, headers: CORS_HEADERS });
}

/**
 * Resolve the {@link OwnedListScope} of a list/count request, failing closed:
 *
 *   - a presented bearer that does not resolve to a key row (deleted, rotated,
 *     mistyped) → 401 "Invalid API key" — even when a session cookie is also
 *     present, so an unresolvable key never falls through to the session branch;
 *   - a resolved key → scoped to that key, even alongside a session cookie (the
 *     key wins, so a leaked or over-shared key can never widen a read);
 *   - a dashboard session WITHOUT a key → instance-wide (the operator's own
 *     dashboard is the one legitimate instance-wide reader);
 *   - anything else (anonymous under `REQUIRE_API_KEY=false`) → 401
 *     "Authentication required".
 *
 * The list handlers used to coerce `apiKeyId || undefined`, and the DB layer
 * reads `undefined` as "no owner filter" — so the anonymous caller landed in the
 * same unfiltered bucket as the operator.
 */
export function resolveListScope(scope: ApiKeyRequestScope): OwnedListScope {
  if (scope.apiKey && !scope.apiKeyId) {
    return { mode: "rejected", response: unauthorized("Invalid API key") };
  }
  if (scope.apiKeyId) {
    return { mode: "api_key", apiKeyId: scope.apiKeyId };
  }
  if (scope.isSessionAuth) {
    return { mode: "instance" };
  }
  return { mode: "rejected", response: unauthorized("Authentication required") };
}
