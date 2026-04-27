import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";
import { createFile, listFiles, formatFileResponse } from "@/lib/localDb";
import { NextResponse } from "next/server";
import { getApiKeyRequestScope } from "@/app/api/v1/_helpers/apiKeyScope";

export async function OPTIONS() {
  return handleCorsOptions();
}

export async function POST(request: Request) {
  const scope = await getApiKeyRequestScope(request);
  if (scope.rejection) return scope.rejection;
  const apiKeyId = scope.apiKeyId;

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const purpose = formData.get("purpose") as string;
    const expiresAfterAnchor = formData.get("expires_after[anchor]") as string;
    const expiresAfterSeconds = formData.get("expires_after[seconds]") as string;

    if (!file || !purpose) {
      return NextResponse.json(
        { error: { message: "Missing file or purpose", type: "invalid_request_error" } },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    const MAX_FILE_BYTES = 512 * 1024 * 1024; // 512 MB
    if (file.size > MAX_FILE_BYTES) {
      return NextResponse.json(
        {
          error: {
            message: "File exceeds maximum allowed size of 512 MB",
            type: "invalid_request_error",
          },
        },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    const bytes = file.size;
    const filename = file.name;
    const mimeType = file.type;
    const content = Buffer.from(await file.arrayBuffer());

    let expiresAt: number | undefined;
    if (expiresAfterAnchor === "created_at" && expiresAfterSeconds) {
      const seconds = Number.parseInt(expiresAfterSeconds);
      if (!Number.isNaN(seconds)) {
        expiresAt = Math.floor(Date.now() / 1000) + seconds;
      }
    }

    const record = createFile({
      bytes,
      filename,
      purpose,
      content,
      mimeType,
      apiKeyId,
      expiresAt,
    });

    return NextResponse.json(formatFileResponse(record), { headers: CORS_HEADERS });
  } catch (error) {
    console.error("[FILES] Upload failed:", error);
    return NextResponse.json(
      { error: { message: "Upload failed", type: "server_error" } },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}

export async function GET(request: Request) {
  const scope = await getApiKeyRequestScope(request);
  if (scope.rejection) return scope.rejection;
  const apiKeyId = scope.apiKeyId;

  const { searchParams } = new URL(request.url);
  const limit = Math.min(Number.parseInt(searchParams.get("limit") || "20") || 20, 10000);
  const after = searchParams.get("after") || undefined;
  const order = (searchParams.get("order") as "asc" | "desc") || "desc";
  const purpose = searchParams.get("purpose") || undefined;

  // We fetch limit + 1 to check if there are more items
  const files = listFiles({
    apiKeyId: apiKeyId || undefined,
    purpose,
    limit: limit + 1,
    after,
    order,
  });

  const hasMore = files.length > limit;
  const data = files.slice(0, limit);

  return NextResponse.json(
    {
      object: "list",
      data: data.map((f) => formatFileResponse(f)),
      first_id: data.length > 0 ? data[0].id : null,
      last_id: data.length > 0 ? data.at(-1).id : null,
      has_more: hasMore,
    },
    { headers: CORS_HEADERS }
  );
}
