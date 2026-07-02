import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";
import { getBatch, deleteBatch } from "@/lib/localDb";
import { NextResponse } from "next/server";
import { getApiKeyRequestScope } from "@/app/api/v1/_helpers/apiKeyScope";
import { formatBatchResponse } from "../formatBatchResponse";

export async function OPTIONS() {
  return handleCorsOptions();
}

function scopeCheck(
  scope: { isSessionAuth: boolean; apiKeyId: string | null },
  recordApiKeyId: string | null | undefined
): boolean {
  if (scope.isSessionAuth) return true;
  if (recordApiKeyId === null || recordApiKeyId === undefined) return true;
  return recordApiKeyId === scope.apiKeyId;
}

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const scope = await getApiKeyRequestScope(request);
  if (scope.rejection) return scope.rejection;

  const { id } = await params;
  const batch = getBatch(id);

  if (!batch || !scopeCheck(scope, batch.apiKeyId)) {
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

  if (!batch || !scopeCheck(scope, batch.apiKeyId)) {
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
