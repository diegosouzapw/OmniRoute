import { NextResponse } from "next/server";
import { getFile, getFileContent } from "@/lib/db/files";
import { getApiKeyRequestScope, canAccessOwnedRecord } from "@/app/api/v1/_helpers/apiKeyScope";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const scope = await getApiKeyRequestScope(request);
  if (scope.rejection) return scope.rejection;

  const { id } = await params;
  const file = getFile(id);

  // `getFileContent` has no ownership check of its own — this guard is the only
  // thing between a caller and the raw bytes. Mirrors /api/v1/files/[id]/content
  // (GHSA-2jm2-mpx8-6523) so this management sibling cannot leak a foreign
  // tenant's file content to an unauthenticated caller (#13882).
  if (!file || !canAccessOwnedRecord(scope, file.apiKeyId)) {
    return NextResponse.json(
      { error: { message: "File not found", type: "invalid_request_error" } },
      { status: 404 }
    );
  }

  const content = getFileContent(id);
  if (!content) {
    return NextResponse.json(
      { error: { message: "File content not found", type: "invalid_request_error" } },
      { status: 404 }
    );
  }

  const filename = file.filename || id;
  return new Response(content as unknown as BodyInit, {
    headers: {
      "Content-Type": file.mimeType || "application/octet-stream",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
