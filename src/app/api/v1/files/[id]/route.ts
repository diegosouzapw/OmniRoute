import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";
import { getFile, deleteFile, formatFileResponse } from "@/lib/db/files";
import { NextResponse } from "next/server";
import {
  getApiKeyRequestScope,
  canAccessOwnedRecord,
  resolveEffectiveApiKeyId,
} from "@/app/api/v1/_helpers/apiKeyScope";
import { enforceApiKeyPolicy } from "@/shared/utils/apiKeyPolicy";
import { buildErrorBody } from "@omniroute/open-sse/utils/error";

export async function OPTIONS() {
  return handleCorsOptions();
}

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const scope = await getApiKeyRequestScope(request);
  if (scope.rejection) return scope.rejection;

  // Fail closed on an unresolvable OR invalid credential — the same 401 fold
  // `getApiKeyRequestScope` already applies (`apiKeyId: null` for a
  // revoked/expired/banned/deactivated/unresolvable key, #13881) — so the
  // per-key policy check below never has to special-case that status itself.
  if (scope.apiKey && !scope.apiKeyId) {
    return NextResponse.json(buildErrorBody(401, "Invalid API key"), {
      status: 401,
      headers: CORS_HEADERS,
    });
  }

  // per-key operator policy (endpoint allowlist, schedule, usage cap, rate
  // limit) — LEDGER-2 of the omni-code-sec 2026-09-21 run / #14481. Called
  // UNCONDITIONALLY, exactly like batches/delete-completed/route.ts: a bare
  // `x-api-key`/`x-goog-api-key` credential (no anthropic-version, non-Claude
  // UA) is accepted by the CLIENT_API auth layer but ignored by
  // getApiKeyRequestScope's extractApiKey() (scope.apiKeyId stays null for
  // it) — enforceApiKeyPolicy resolves it independently via
  // extractUngatedClientApiKey() (GHSA-2phc-xp22-9f56), so gating this call
  // on scope.apiKeyId let that transport skip the endpoint allowlist,
  // schedule, usage cap, rate limit and key quota entirely (round-2 PoC
  // against e543b64). A keyless caller (session/anonymous) is a no-op here.
  const policy = await enforceApiKeyPolicy(request, null);
  if (policy.rejection) return policy.rejection;

  const { id } = await params;
  const file = getFile(id);

  // A key resolved only via the ungated x-api-key/x-goog-api-key transport
  // never sets scope.apiKeyId — fall back to the id enforceApiKeyPolicy()
  // independently resolved, so that key can still reach its own rows
  // (LEDGER-27, omni-code-sec round 3).
  const effectiveApiKeyId = resolveEffectiveApiKeyId(scope, policy.apiKeyInfo);

  // Session = operator, key = own rows only, null owner = denied
  // (GHSA-2jm2-mpx8-6523). A foreign or anonymous caller gets the same 404 as
  // a missing id so the id space cannot be probed.
  if (!file || !canAccessOwnedRecord({ ...scope, apiKeyId: effectiveApiKeyId }, file.apiKeyId)) {
    return NextResponse.json(
      { error: { message: "File not found", type: "invalid_request_error" } },
      { status: 404, headers: CORS_HEADERS }
    );
  }

  return NextResponse.json(formatFileResponse(file), { headers: CORS_HEADERS });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const scope = await getApiKeyRequestScope(request);
  if (scope.rejection) return scope.rejection;

  // Fail closed on an unresolvable OR invalid credential — the same 401 fold
  // `getApiKeyRequestScope` already applies (`apiKeyId: null` for a
  // revoked/expired/banned/deactivated/unresolvable key, #13881) — so the
  // per-key policy check below never has to special-case that status itself.
  if (scope.apiKey && !scope.apiKeyId) {
    return NextResponse.json(buildErrorBody(401, "Invalid API key"), {
      status: 401,
      headers: CORS_HEADERS,
    });
  }

  // per-key operator policy (endpoint allowlist, schedule, usage cap, rate
  // limit) — LEDGER-2 of the omni-code-sec 2026-09-21 run / #14481. Called
  // UNCONDITIONALLY, exactly like batches/delete-completed/route.ts: a bare
  // `x-api-key`/`x-goog-api-key` credential (no anthropic-version, non-Claude
  // UA) is accepted by the CLIENT_API auth layer but ignored by
  // getApiKeyRequestScope's extractApiKey() (scope.apiKeyId stays null for
  // it) — enforceApiKeyPolicy resolves it independently via
  // extractUngatedClientApiKey() (GHSA-2phc-xp22-9f56), so gating this call
  // on scope.apiKeyId let that transport skip the endpoint allowlist,
  // schedule, usage cap, rate limit and key quota entirely (round-2 PoC
  // against e543b64). A keyless caller (session/anonymous) is a no-op here.
  const policy = await enforceApiKeyPolicy(request, null);
  if (policy.rejection) return policy.rejection;

  const { id } = await params;
  const file = getFile(id);

  // A key resolved only via the ungated x-api-key/x-goog-api-key transport
  // never sets scope.apiKeyId — fall back to the id enforceApiKeyPolicy()
  // independently resolved, so that key can still delete its own rows
  // (LEDGER-27, omni-code-sec round 3).
  const effectiveApiKeyId = resolveEffectiveApiKeyId(scope, policy.apiKeyInfo);

  if (!file || !canAccessOwnedRecord({ ...scope, apiKeyId: effectiveApiKeyId }, file.apiKeyId)) {
    return NextResponse.json(
      { error: { message: "File not found", type: "invalid_request_error" } },
      { status: 404, headers: CORS_HEADERS }
    );
  }

  deleteFile(id);

  return NextResponse.json(
    {
      id,
      object: "file",
      deleted: true,
    },
    { headers: CORS_HEADERS }
  );
}
