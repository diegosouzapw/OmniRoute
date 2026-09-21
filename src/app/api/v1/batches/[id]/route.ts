import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";
import { getBatch, deleteBatch } from "@/lib/db/batches";
import { NextResponse } from "next/server";
import { getApiKeyRequestScope, canAccessOwnedRecord } from "@/app/api/v1/_helpers/apiKeyScope";
import { formatBatchResponse } from "../formatBatchResponse";

export async function OPTIONS() {
  return handleCorsOptions();
}

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const scope = await getApiKeyRequestScope(request);
  if (scope.rejection) return scope.rejection;

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
