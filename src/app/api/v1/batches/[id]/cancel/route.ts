import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";
import { getBatch, updateBatch } from "@/lib/localDb";
import { NextResponse } from "next/server";
import { getApiKeyRequestScope } from "@/app/api/v1/_helpers/apiKeyScope";
import { formatBatchResponse } from "../../formatBatchResponse";

export async function OPTIONS() {
  return handleCorsOptions();
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
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
