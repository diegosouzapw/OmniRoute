import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { checkQdrantHealth } from "@/lib/memory/qdrant";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";

export async function GET(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await checkQdrantHealth();
    return NextResponse.json(result);
  } catch (err: unknown) {
    const message = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    return NextResponse.json({ error: { message } }, { status: 500 });
  }
}
