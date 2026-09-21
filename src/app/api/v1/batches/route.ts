import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";
import { createBatch, listBatches, countBatches } from "@/lib/db/batches";
import { getFile } from "@/lib/db/files";
import { v1BatchCreateSchema } from "@/shared/validation/schemas";
import { NextResponse } from "next/server";
import {
  getApiKeyRequestScope,
  canAccessOwnedRecord,
  resolveListScope,
} from "@/app/api/v1/_helpers/apiKeyScope";
import { formatBatchResponse } from "./formatBatchResponse";
import { parseBatchListLimit } from "./parseListLimit";

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

    // The batch runs LLM requests over the input file's content, so the caller
    // must be allowed to READ that file: own key, or the operator's session. A
    // null-owner input file is denied to a foreign key and to an anonymous
    // caller alike (GHSA-2jm2-mpx8-6523).
    const inputFile = getFile(validated.input_file_id);
    if (!inputFile || !canAccessOwnedRecord(scope, inputFile.apiKeyId)) {
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

  // Key → own batches only; dashboard session without a key → instance-wide;
  // anonymous / unresolvable bearer → 401. `listBatches`/`countBatches` read an
  // absent owner as "every tenant", so the widening must be an explicit
  // decision here, never a fallback (GHSA-m3hp-hq9g-fpmv).
  const listScope = resolveListScope(scope);
  if (listScope.mode === "rejected") return listScope.response;
  const ownerFilter = listScope.mode === "api_key" ? listScope.apiKeyId : undefined;

  const url = new URL(request.url);
  const parsedLimit = parseBatchListLimit(url.searchParams.get("limit"));
  if (!parsedLimit.ok) {
    return NextResponse.json(
      { error: { message: parsedLimit.message, type: "invalid_request_error" } },
      { status: 400, headers: CORS_HEADERS }
    );
  }
  const limit = parsedLimit.limit;
  const after = url.searchParams.get("after") || undefined;

  const batches = listBatches(ownerFilter, limit + 1, after);
  const hasMore = batches.length > limit;
  const data = hasMore ? batches.slice(0, limit) : batches;

  const formattedData = data.map((b) => formatBatchResponse(b));

  const totalCount = countBatches(ownerFilter);

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
