import { NextResponse } from "next/server";
import { listFiles } from "@/lib/db/files";
import { getApiKeyRequestScope, resolveListScope } from "@/app/api/v1/_helpers/apiKeyScope";

export async function GET(request: Request) {
  const scope = await getApiKeyRequestScope(request);
  if (scope.rejection) return scope.rejection;

  // Key → own files only; dashboard session without a key → instance-wide;
  // anonymous / unresolvable bearer → 401. Mirrors /api/v1/files (GHSA-2jm2-
  // mpx8-6523 / GHSA-m3hp-hq9g-fpmv) so this management sibling cannot leak
  // every tenant's files to an unauthenticated caller (#13882).
  const listScope = resolveListScope(scope);
  if (listScope.mode === "rejected") return listScope.response;

  try {
    const url = new URL(request.url);
    const limit = Number.parseInt(url.searchParams.get("limit") || "100", 10);
    const files =
      listScope.mode === "api_key"
        ? listFiles({ limit, apiKeyId: listScope.apiKeyId })
        : listFiles({ limit });
    return NextResponse.json({ files });
  } catch (error) {
    console.log("Error fetching files:", error);
    return NextResponse.json({ error: "Failed to fetch files" }, { status: 500 });
  }
}
