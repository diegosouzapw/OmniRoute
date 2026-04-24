import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";
import { getBatch } from "@/lib/localDb";
import { NextResponse } from "next/server";
import { getApiKeyRequestScope } from "@/app/api/v1/_helpers/apiKeyScope";

function formatBatchResponse(batch: any) {
  return {
    id: batch.id,
    object: "batch",
    endpoint: batch.endpoint,
    errors: batch.errors || null,
    input_file_id: batch.inputFileId,
    completion_window: batch.completionWindow,
    status: batch.status,
    output_file_id: batch.outputFileId || null,
    error_file_id: batch.errorFileId || null,
    created_at: batch.createdAt,
    in_progress_at: batch.inProgressAt || null,
    expires_at: batch.expiresAt || null,
    finalizing_at: batch.finalizingAt || null,
    completed_at: batch.completedAt || null,
    failed_at: batch.failedAt || null,
    expired_at: batch.expiredAt || null,
    cancelling_at: batch.cancellingAt || null,
    cancelled_at: batch.cancelledAt || null,
    request_counts: {
      total: batch.requestCountsTotal || 0,
      completed: batch.requestCountsCompleted || 0,
      failed: batch.requestCountsFailed || 0,
    },
    metadata: batch.metadata || null,
    model: batch.model || null,
    usage: batch.usage || null,
  };
}

export async function OPTIONS() {
  return handleCorsOptions();
}

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const scope = await getApiKeyRequestScope(request);
  if (scope.rejection) return scope.rejection;
  const apiKeyId = scope.apiKeyId;

  const { id } = await params;
  const batch = getBatch(id);

  if (!batch || (batch.apiKeyId !== null && batch.apiKeyId !== apiKeyId)) {
    return NextResponse.json(
      { error: { message: "Batch not found", type: "invalid_request_error" } },
      { status: 404, headers: CORS_HEADERS }
    );
  }

  return NextResponse.json(formatBatchResponse(batch), { headers: CORS_HEADERS });
}
