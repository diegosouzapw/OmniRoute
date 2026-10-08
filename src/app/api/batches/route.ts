import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import { listBatches } from "@/lib/db/batches";
import { getApiKeyRequestScope, resolveListScope } from "@/app/api/v1/_helpers/apiKeyScope";

export async function GET(request: Request) {
  const scope = await getApiKeyRequestScope(request);
  if (scope.rejection) return scope.rejection;

  // Key → own batches only; dashboard session without a key → instance-wide;
  // anonymous / unresolvable bearer → 401. Mirrors /api/v1/batches (GHSA-2jm2-
  // mpx8-6523 / GHSA-m3hp-hq9g-fpmv) so this management sibling cannot leak
  // every tenant's batches to an unauthenticated caller (#13882).
  const listScope = resolveListScope(scope);
  if (listScope.mode === "rejected") return listScope.response;

  try {
    const url = new URL(request.url);
    const limit = Number.parseInt(url.searchParams.get("limit") || "100", 10);
    const ownerFilter = listScope.mode === "api_key" ? listScope.apiKeyId : undefined;
    const batches = listBatches(ownerFilter, limit);
    return NextResponse.json({ batches });
  } catch (error) {
    console.log("Error fetching batches:", error);
    return NextResponse.json({ error: "Failed to fetch batches" }, { status: 500 });
  }
}
