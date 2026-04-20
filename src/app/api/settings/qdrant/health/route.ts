import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { checkQdrantHealth } from "@/lib/memory/qdrant";

export async function GET(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await checkQdrantHealth();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ ok: false, latencyMs: 0, error: String(error) }, { status: 500 });
  }
}
