import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";
import { createBatch, getFile, listBatches, countBatches } from "@/lib/localDb";
import { v1BatchCreateSchema } from "@/shared/validation/schemas";
import { NextResponse } from "next/server";
import { getApiKeyRequestScope } from "@/app/api/v1/_helpers/apiKeyScope";
import { formatBatchResponse } from "./formatBatchResponse";

export async function OPTIONS() {
  return handleCorsOptions();
}

export async function POST(request: Request) {
  const scope = await getApiKeyRequestScope(request);
  if (scope.rejection) return scope.rejection;
  const apiKeyId = scope.apiKeyId;

  try {
    const body = await request.json();
    const validation = v1BatchCreateSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: {
            message: validation.error.message,
            type: "invalid_request_error",
          },
        },
        { status: 400, headers: CORS_HEADERS }
      );
    }
    const validated = validation.data;

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

  const totalCount = countBatches(apiKeyId || undefined);

  return NextResponse.json(
    {
      object: "list",
      data: formattedData,
      first_id: formattedData.length > 0 ? formattedData[0].id : null,
      last_id: formattedData.length > 0 ? formattedData.at(-1).id : null,
      has_more: hasMore,
      total_count: totalCount,
    },
    { headers: CORS_HEADERS }
  );
}
