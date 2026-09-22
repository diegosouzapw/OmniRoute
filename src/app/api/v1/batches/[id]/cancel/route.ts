import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";
import { getBatch, updateBatch } from "@/lib/db/batches";
import { NextResponse } from "next/server";
import { getApiKeyRequestScope, canAccessOwnedRecord } from "@/app/api/v1/_helpers/apiKeyScope";
import { enforceApiKeyPolicy } from "@/shared/utils/apiKeyPolicy";
import { formatBatchResponse } from "../../formatBatchResponse";

export async function OPTIONS() {
  return handleCorsOptions();
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
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

  // The shared 3-way rule: the operator's dashboard (session auth) may cancel
  // ANY batch — the old inline check 404'd every dashboard cancel of a
  // key-owned batch (#13683) — a key cancels its own, and a null-owner batch
  // is denied to a foreign key and to an anonymous caller (GHSA-2jm2-mpx8-6523).
  if (!batch || !canAccessOwnedRecord(scope, batch.apiKeyId)) {
    return NextResponse.json(
      { error: { message: "Batch not found", type: "invalid_request_error" } },
      { status: 404, headers: CORS_HEADERS }
    );
  }

  if (["completed", "failed", "cancelled", "expired"].includes(batch.status)) {
    return NextResponse.json(
      {
        error: { message: `Batch ${id} is already ${batch.status}`, type: "invalid_request_error" },
      },
      { status: 400, headers: CORS_HEADERS }
    );
  }

  if (batch.status === "cancelling") {
    return NextResponse.json(formatBatchResponse(batch), { headers: CORS_HEADERS });
  }

  updateBatch(id, {
    status: "cancelling",
    cancellingAt: Math.floor(Date.now() / 1000),
  });

  const updatedBatch = getBatch(id);

  return NextResponse.json(formatBatchResponse(updatedBatch), { headers: CORS_HEADERS });
}
