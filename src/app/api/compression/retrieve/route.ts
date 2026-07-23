import { NextResponse } from "next/server";
import { z } from "zod";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { retrieveBlock } from "@omniroute/open-sse/services/compression/engines/ccr/index";
import { queryBlock } from "@omniroute/open-sse/services/compression/engines/ccr/ccrQuery";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

export const dynamic = "force-dynamic";

const RetrieveRequestSchema = z.object({
  hash: z.string().min(6).max(64),
  mode: z.enum(["full", "head", "tail", "lines", "grep", "stats"]).optional(),
  n: z.number().int().positive().max(10000).optional(),
  start: z.number().int().positive().optional(),
  end: z.number().int().positive().optional(),
  pattern: z.string().max(512).optional(),
  unique: z.boolean().optional(),
});

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
    return NextResponse.json(
      { error: "Invalid request", details: parsed.error.issues },
      { status: 400 }
    );
  }
  try {
    const block = retrieveBlock(parsed.data.hash); // string | null; no principalId → management scope
    if (block == null) return NextResponse.json({ found: false });
    if (!parsed.data.mode || parsed.data.mode === "full") {
      return NextResponse.json({ found: true, block });
    }
    const result = queryBlock(block, parsed.data);
    return NextResponse.json(
      "content" in result
        ? { found: true, block: result.content }
        : { found: true, error: result.error }
    );
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[/api/compression/retrieve]", msg);
    return NextResponse.json(
      { error: "Retrieve failed", details: sanitizeErrorMessage(msg) },
      { status: 500 }
    );
  }
}
