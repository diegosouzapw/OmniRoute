import { NextResponse } from "next/server";
import { z } from "zod";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { retrieveBlock } from "@omniroute/open-sse/services/compression/engines/ccr/index";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

export const dynamic = "force-dynamic";

const RetrieveRequestSchema = z.object({ hash: z.string().min(6).max(64) });

export async function POST(req: Request) {
  const authError = await requireManagementAuth(req);
  if (authError) return authError;
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  const parsed = RetrieveRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request", details: parsed.error.issues }, { status: 400 });
  }
  try {
    const block = retrieveBlock(parsed.data.hash); // string | null; no principalId → management scope
    return NextResponse.json(block != null ? { found: true, block } : { found: false });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[/api/compression/retrieve]", msg);
    return NextResponse.json({ error: "Retrieve failed", details: sanitizeErrorMessage(msg) }, { status: 500 });
  }
}
