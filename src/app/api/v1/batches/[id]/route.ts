import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";
import { getBatch, deleteBatch } from "@/lib/db/batches";
import { NextResponse } from "next/server";
import { getApiKeyRequestScope, canAccessOwnedRecord } from "@/app/api/v1/_helpers/apiKeyScope";
import { enforceApiKeyPolicy } from "@/shared/utils/apiKeyPolicy";
import { formatBatchResponse } from "../formatBatchResponse";

export async function OPTIONS() {
  return handleCorsOptions();
}

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const scope = await getApiKeyRequestScope(request);
  if (scope.rejection) return scope.rejection;

  // per-key operator policy (endpoint allowlist, schedule, usage cap, rate
  // limit) — LEDGER-2 of the omni-code-sec 2026-09-21 run / #14481. Gated on
  // an already-resolved key: `enforceApiKeyPolicy` re-resolves the key on its
  // own and its lifecycle check returns 403 for a revoked/expired/banned/
  // deactivated key — not the 401/404 the ownership checks below already
  // produce for that case via getApiKeyRequestScope's validateApiKey fold
  // (#13881). A session-only or anonymous caller has no key to police either way.
  if (scope.apiKeyId) {
    const policy = await enforceApiKeyPolicy(request, null);
    if (policy.rejection) return policy.rejection;
  }

  const { id } = await params;
  const batch = getBatch(id);

  // Session = operator, key = own rows only, null owner = denied
  // (GHSA-2jm2-mpx8-6523): the previous local check let ANY caller read or
  // delete an unowned batch by id.
  if (!batch || !canAccessOwnedRecord(scope, batch.apiKeyId)) {
    return NextResponse.json(
      { error: { message: "Batch not found", type: "invalid_request_error" } },
      { status: 404, headers: CORS_HEADERS }
    );
  }

  return NextResponse.json(formatBatchResponse(batch), { headers: CORS_HEADERS });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const scope = await getApiKeyRequestScope(request);
  if (scope.rejection) return scope.rejection;

  // per-key operator policy (endpoint allowlist, schedule, usage cap, rate
  // limit) — LEDGER-2 of the omni-code-sec 2026-09-21 run / #14481. Gated on
  // an already-resolved key: `enforceApiKeyPolicy` re-resolves the key on its
  // own and its lifecycle check returns 403 for a revoked/expired/banned/
  // deactivated key — not the 401/404 the ownership checks below already
  // produce for that case via getApiKeyRequestScope's validateApiKey fold
  // (#13881). A session-only or anonymous caller has no key to police either way.
  if (scope.apiKeyId) {
    const policy = await enforceApiKeyPolicy(request, null);
    if (policy.rejection) return policy.rejection;
  }

  const { id } = await params;
  const batch = getBatch(id);

  if (!batch || !canAccessOwnedRecord(scope, batch.apiKeyId)) {
    return NextResponse.json(
      { error: { message: "Batch not found", type: "invalid_request_error" } },
      { status: 404, headers: CORS_HEADERS }
    );
  }

  // Only allow deleting terminal batches (completed, failed, cancelled, expired)
  const terminal = ["completed", "failed", "cancelled", "expired"];
  if (!terminal.includes(batch.status)) {
    return NextResponse.json(
      { error: { message: "Only terminal batches can be deleted", type: "invalid_request_error" } },
      { status: 409, headers: CORS_HEADERS }
    );
  }

  deleteBatch(id);

  return NextResponse.json({ id, object: "batch", deleted: true }, { headers: CORS_HEADERS });
}
