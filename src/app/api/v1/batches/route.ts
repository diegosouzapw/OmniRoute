import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";
import { createBatch, getFile, listBatches } from "@/lib/localDb";
import { v1BatchCreateSchema } from "@/shared/validation/schemas";
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

export async function POST(request: Request) {
  const scope = await getApiKeyRequestScope(request);
  if (scope.rejection) return scope.rejection;
  const apiKeyId = scope.apiKeyId;

  try {
    const body = await request.json();
    const validated = v1BatchCreateSchema.parse(body);

    const inputFile = getFile(validated.input_file_id);
    if (!inputFile || (inputFile.apiKeyId !== null && inputFile.apiKeyId !== apiKeyId)) {
      return NextResponse.json(
        { error: { message: "Input file not found", type: "invalid_request_error" } },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    const batch = createBatch({
      endpoint: validated.endpoint as any,
      completionWindow: validated.completion_window,
      inputFileId: validated.input_file_id,
      metadata: validated.metadata,
      apiKeyId,
      outputExpiresAfterSeconds: validated.output_expires_after?.seconds || null,
      outputExpiresAfterAnchor: validated.output_expires_after?.anchor || null,
    });

    return NextResponse.json(formatBatchResponse(batch), { headers: CORS_HEADERS });
  } catch (error) {
    console.error("[BATCHES] Create failed:", error);
    return NextResponse.json(
      {
        error: {
          message: error instanceof Error ? error.message : "Create failed",
          type: "invalid_request_error",
        },
      },
      { status: 400, headers: CORS_HEADERS }
    );
  }
}

export async function GET(request: Request) {
  const scope = await getApiKeyRequestScope(request);
  if (scope.rejection) return scope.rejection;
  const apiKeyId = scope.apiKeyId;

  const url = new URL(request.url);
  const limit = Number.parseInt(url.searchParams.get("limit") || "20");
  const after = url.searchParams.get("after") || undefined;

  const batches = listBatches(apiKeyId || undefined, limit + 1, after);
  const hasMore = batches.length > limit;
  const data = hasMore ? batches.slice(0, limit) : batches;

  const formattedData = data.map((b) => formatBatchResponse(b));

  return NextResponse.json(
    {
      object: "list",
      data: formattedData,
      first_id: formattedData.length > 0 ? formattedData[0].id : null,
      last_id: formattedData.length > 0 ? formattedData.at(-1).id : null,
      has_more: hasMore,
    },
    { headers: CORS_HEADERS }
  );
}
