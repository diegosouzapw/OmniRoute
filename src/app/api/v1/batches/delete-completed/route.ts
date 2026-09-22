import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";
import { deleteCompletedBatches, type DeleteCompletedBatchesScope } from "@/lib/db/batches";
import { NextResponse } from "next/server";
import { getApiKeyRequestScope } from "@/app/api/v1/_helpers/apiKeyScope";
import { enforceApiKeyPolicy } from "@/shared/utils/apiKeyPolicy";
import { buildErrorBody } from "@omniroute/open-sse/utils/error";
import * as log from "@/sse/utils/logger";

const LOG_ROUTE = "batches/delete-completed";

export async function OPTIONS() {
  return handleCorsOptions();
}

export async function DELETE(request: Request) {
  const scope = await getApiKeyRequestScope(request);
  if (scope.rejection) return scope.rejection;

  // Fail closed on an unresolvable OR invalid credential. `getApiKeyRequestScope`
  // is the single lifecycle gate: it runs `validateApiKey` (is_active,
  // revoked_at, is_banned, expires_at — CWE-613) itself and folds a key that
  // fails it into `apiKeyId: null`, so a presented key with no id is either
  // unknown (`keyState: "unresolved"`) or revoked/deactivated/banned/expired
  // (`keyState: "invalid"`). Nothing is re-validated here — `apiKeyId !== null`
  // already means the key passed that gate (#13881) — and neither case may fall
  // through to the session branch and widen the sweep to the whole instance.
  if (scope.apiKey && !scope.apiKeyId) {
    // `info`, not `warn`: any caller can reach this branch by presenting any
    // string as a key, so a warn-level line per attempt is a log-flooding lever
    // (omni-code-sec 2026-09-14 proof run, LEDGER-12). The 401 itself is the
    // audit signal; the real sweeps below keep their warn-level audit lines.
    log.info("BATCHES", "delete-completed: presented API key rejected", {
      route: LOG_ROUTE,
      reason: scope.keyState,
      apiKeyId: scope.apiKeyId,
      isSessionAuth: scope.isSessionAuth,
    });
    return NextResponse.json(buildErrorBody(401, "Invalid API key"), {
      status: 401,
      headers: CORS_HEADERS,
    });
  }

  // The per-key operator policy every other `/v1` route applies (endpoint
  // allowlist, access schedule, usage cap, rate limit — omni-code-sec
  // 2026-09-14 proof run, LEDGER-9/13/16). Runs after the lifecycle gate above
  // (the enforcer's own status check does not look at `revoked_at`) and before
  // the sweep scope is chosen, so a restricted key is refused with the
  // enforcer's own rejection and nothing is swept. A session-only caller
  // carries no key and passes through untouched.
  const policy = await enforceApiKeyPolicy(request, null);
  if (policy.rejection) return policy.rejection;

  // A presented API key always scopes the sweep to that key — even when the
  // request also carries a dashboard session cookie — the same rule the list
  // siblings apply through `resolveListScope()`, so a leaked or over-shared
  // key can never widen a destructive sweep. Only a dashboard session WITHOUT a
  // key sweeps the whole instance; otherwise an ordinary key would delete every
  // tenant's completed batches and null out their file contents
  // (GHSA-wvxc-jp3v-5mg5). A caller that is neither gets 401; there is no
  // fallback that silently widens the sweep.
  let sweepScope: DeleteCompletedBatchesScope;
  let mode: "instance" | "api_key";
  if (scope.apiKeyId) {
    sweepScope = { apiKeyId: scope.apiKeyId };
    mode = "api_key";
  } else if (scope.isSessionAuth) {
    sweepScope = { allTenants: true };
    mode = "instance";
  } else {
    return NextResponse.json(buildErrorBody(401, "Authentication required"), {
      status: 401,
      headers: CORS_HEADERS,
    });
  }

  let result: ReturnType<typeof deleteCompletedBatches>;
  try {
    result = deleteCompletedBatches(sweepScope);
  } catch (err) {
    log.error("BATCHES", "delete-completed sweep failed", {
      route: LOG_ROUTE,
      mode,
      apiKeyId: scope.apiKeyId,
      error: err instanceof Error ? { message: err.message, stack: err.stack } : String(err),
    });
    return NextResponse.json(buildErrorBody(500, "Failed to delete completed batches"), {
      status: 500,
      headers: CORS_HEADERS,
    });
  }

  const audit = {
    route: LOG_ROUTE,
    mode,
    apiKeyId: scope.apiKeyId,
    deletedBatches: result.deletedBatches,
    deletedFiles: result.deletedFiles,
    hasMore: result.hasMore,
  };
  // A bulk delete is an audit event, not routine chatter: an instance-wide sweep
  // and any key-scoped sweep that actually removed rows log at warn so the trail
  // survives APP_LOG_LEVEL=warn; a no-op key-scoped sweep stays at info so a
  // caller looping on the endpoint cannot flood the warn log.
  if (mode === "instance") {
    log.warn("BATCHES", "instance-wide completed-batch sweep", audit);
  } else if (result.deletedBatches > 0) {
    log.warn("BATCHES", "completed-batch sweep", audit);
  } else {
    log.info("BATCHES", "completed-batch sweep (no-op)", audit);
  }

  return NextResponse.json(
    {
      deleted: true,
      deletedBatches: result.deletedBatches,
      deletedFiles: result.deletedFiles,
      hasMore: result.hasMore,
    },
    { headers: CORS_HEADERS }
  );
}
