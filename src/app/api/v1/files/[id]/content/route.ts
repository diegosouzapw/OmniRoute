import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";
import { getFile, getFileContent } from "@/lib/db/files";
import { NextResponse } from "next/server";
import { getApiKeyRequestScope, canAccessOwnedRecord } from "@/app/api/v1/_helpers/apiKeyScope";

export async function OPTIONS() {
  return handleCorsOptions();
}

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const scope = await getApiKeyRequestScope(request);
  if (scope.rejection) return scope.rejection;

  const { id } = await params;
  const file = getFile(id);

  // `getFileContent` has no ownership check of its own — this guard is the only
  // thing between a caller and the raw bytes (GHSA-2jm2-mpx8-6523).
  if (!file || !canAccessOwnedRecord(scope, file.apiKeyId)) {
    return NextResponse.json(
      { error: { message: "File not found", type: "invalid_request_error" } },
      { status: 404, headers: CORS_HEADERS }
    );
  }

  const content = getFileContent(id);
  if (!content) {
    return NextResponse.json(
      { error: { message: "File content not found", type: "invalid_request_error" } },
      { status: 404, headers: CORS_HEADERS }
    );
  }

  const sanitizedFilename = file.filename.replace(/[^\w.\-()\[\] ]/g, "_").slice(0, 255);
  const encodedFilename = encodeURIComponent(file.filename);

  return new Response(content, {
    headers: {
      ...CORS_HEADERS,
      "Content-Type": file.mimeType || "application/octet-stream",
      "Content-Disposition": `attachment; filename="${sanitizedFilename}"; filename*=UTF-8''${encodedFilename}`,
    },
  });
}
