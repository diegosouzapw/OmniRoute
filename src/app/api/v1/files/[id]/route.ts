import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";
import { getFile, deleteFile, formatFileResponse } from "@/lib/db/files";
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

  // Session = operator, key = own rows only, null owner = denied
  // (GHSA-2jm2-mpx8-6523). A foreign or anonymous caller gets the same 404 as
  // a missing id so the id space cannot be probed.
  if (!file || !canAccessOwnedRecord(scope, file.apiKeyId)) {
    return NextResponse.json(
      { error: { message: "File not found", type: "invalid_request_error" } },
      { status: 404, headers: CORS_HEADERS }
    );
  }

  return NextResponse.json(formatFileResponse(file), { headers: CORS_HEADERS });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const scope = await getApiKeyRequestScope(request);
  if (scope.rejection) return scope.rejection;

  const { id } = await params;
  const file = getFile(id);

  if (!file || !canAccessOwnedRecord(scope, file.apiKeyId)) {
    return NextResponse.json(
      { error: { message: "File not found", type: "invalid_request_error" } },
      { status: 404, headers: CORS_HEADERS }
    );
  }

  deleteFile(id);

  return NextResponse.json(
    {
      id,
      object: "file",
      deleted: true,
    },
    { headers: CORS_HEADERS }
  );
}
