import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";
import { getBatch, updateBatch } from "@/lib/db/batches";
import { NextResponse } from "next/server";
import { getApiKeyRequestScope, canAccessOwnedRecord } from "@/app/api/v1/_helpers/apiKeyScope";
import { formatBatchResponse } from "../../formatBatchResponse";

export async function OPTIONS() {
  return handleCorsOptions();
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const scope = await getApiKeyRequestScope(request);
  if (scope.rejection) return scope.rejection;

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
