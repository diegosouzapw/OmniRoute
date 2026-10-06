import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { getComboTrace } from "@omniroute/open-sse/services/combo/decisionTrace.ts";

/**
 * #10681: read the ordered per-target decision trace for one combo invocation.
 * Safe by construction: the trace holds routing metadata only (provider/model,
 * decision, allowlisted skip reason, terminal status) — never prompts, request
 * or response bodies, headers, credentials, account ids, or raw upstream
 * errors. Retention is bounded in-memory (30min TTL, 2000 invocations).
 */
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const { id } = await params;
  if (!id || !id.startsWith("combo-")) {
    return NextResponse.json({ error: "Invalid invocation id" }, { status: 400 });
  }
  const trace = getComboTrace(id);
  if (!trace) {
    return NextResponse.json({ error: "Combo trace not found or expired" }, { status: 404 });
  }
  return NextResponse.json(trace);
}
