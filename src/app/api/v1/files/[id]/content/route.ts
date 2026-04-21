import { CORS_HEADERS } from "@/shared/utils/cors";
import { extractApiKey } from "@/sse/services/auth";
import { getFile, getFileContent, getApiKeyMetadata } from "@/lib/localDb";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const apiKey = extractApiKey(request);
  const apiKeyMetadata = await getApiKeyMetadata(apiKey);
  const apiKeyId = apiKeyMetadata?.id || null;

  const { id } = await params;
  const file = getFile(id);

  if (!file || (file.apiKeyId !== null && file.apiKeyId !== apiKeyId)) {
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

  return new Response(content, {
    headers: {
      ...CORS_HEADERS,
      "Content-Type": file.mimeType || "application/octet-stream",
    },
  });
}
