import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import { getBatch } from "@/lib/db/batches";
import { getApiKeyRequestScope, canAccessOwnedRecord } from "@/app/api/v1/_helpers/apiKeyScope";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const scope = await getApiKeyRequestScope(request);
  if (scope.rejection) return scope.rejection;

  try {
    const batch = getBatch(params.id);
    // Session = operator, key = own rows only, null owner = denied. Mirrors
    // /api/v1/batches/[id] (GHSA-2jm2-mpx8-6523) so this management sibling
    // cannot leak a foreign tenant's batch metadata to an unauthenticated
    // caller (#13882).
    if (!batch || !canAccessOwnedRecord(scope, batch.apiKeyId)) {
      return NextResponse.json({ error: "Batch not found" }, { status: 404 });
    }
    return NextResponse.json({ batch });
  } catch (error) {
    console.log("Error fetching batch:", error);
    return NextResponse.json({ error: "Failed to fetch batch" }, { status: 500 });
  }
}
