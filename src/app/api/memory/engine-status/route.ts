import { NextResponse } from "next/server";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { engineStatus } from "@/lib/memory/retrieval";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";

export async function GET(request: Request) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const status = await engineStatus();
    return NextResponse.json(status);
  } catch (err: unknown) {
    const message = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    return NextResponse.json({ error: { message } }, { status: 500 });
  }
}
