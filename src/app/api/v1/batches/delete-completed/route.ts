import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";
import { deleteCompletedBatches } from "@/lib/db/batches";
import { NextResponse } from "next/server";
import { getApiKeyRequestScope } from "@/app/api/v1/_helpers/apiKeyScope";

export async function OPTIONS() {
  return handleCorsOptions();
}

export async function DELETE(request: Request) {
  const scope = await getApiKeyRequestScope(request);
  if (scope.rejection) return scope.rejection;

  // Allow session-authenticated (dashboard) requests; for API-key requests, require a key
  if (!scope.isSessionAuth && !scope.apiKeyId) {
    return NextResponse.json(
      { error: { message: "Authentication required", type: "invalid_request_error" } },
      { status: 401, headers: CORS_HEADERS }
    );
  }

  // Scope the sweep to the caller. Only the operator's own dashboard (session
  // auth) may clear the whole instance; an API key clears only its own
  // completed batches (GHSA-wvxc-jp3v-5mg5).
  const result = deleteCompletedBatches(scope.isSessionAuth ? undefined : scope.apiKeyId);

  return NextResponse.json(
    { deleted: true, deletedBatches: result.deletedBatches, deletedFiles: result.deletedFiles },
    { headers: CORS_HEADERS }
  );
}
