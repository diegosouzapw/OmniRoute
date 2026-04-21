import { CORS_HEADERS } from "@/shared/utils/cors";
import { extractApiKey } from "@/sse/services/auth";
import { getFile, deleteFile, getApiKeyMetadata, formatFileResponse } from "@/lib/localDb";
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
  
  return NextResponse.json(formatFileResponse(file), { headers: CORS_HEADERS });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
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

  deleteFile(id);

  return NextResponse.json({
    id,
    object: "file",
    deleted: true
  }, { headers: CORS_HEADERS });
}
