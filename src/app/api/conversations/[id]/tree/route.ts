import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { getConversationTurnPage } from "@/lib/db/agenticConversations";

export const dynamic = "force-dynamic";

// Number(null) is 0, not NaN — so naively doing Number(searchParams.get(x))
// turns an ABSENT query param into a real 0 instead of "not provided",
// which made beforeSeq/afterSeq always look present (0 != null) and forced
// the query into the afterSeq branch (uncapped, all rows) on every request,
// even ones with no beforeSeq/afterSeq at all.
export function parseSeqParam(raw: string | null): number | undefined {
  if (raw === null || raw === "") return undefined;
  const n = Number(raw);
  return Number.isFinite(n) ? n : undefined;
}

// Every OmniRoute conversation is a single straight line (see
// conversationTracker.ts's 2026-08-06 redesign — an edited/duplicated turn
// mints its own independent conversation instead of forking this one), so
// this always returns a flat, chronological page — never a tree — capped
// at `limit` (default 20) since a real OpenClaw conversation can run to
// hundreds of turns. `beforeSeq`/`afterSeq` page backward/forward from a
// previously-returned node's `seq`.
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  const authError = await requireManagementAuth(req);
  if (authError) return authError;

  try {
    const { id } = await params;
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    const { searchParams } = new URL(req.url);
    const limitParam = parseSeqParam(searchParams.get("limit"));

    const { nodes, hasMore } = getConversationTurnPage(id, {
      limit: limitParam != null && limitParam > 0 ? limitParam : undefined,
      beforeSeq: parseSeqParam(searchParams.get("beforeSeq")),
      afterSeq: parseSeqParam(searchParams.get("afterSeq")),
    });

    return NextResponse.json({
      nodes: nodes.map((n) => ({
        seq: n.seq,
        id: n.id,
        parentId: n.parentId,
        role: n.role,
        textPreview: n.textPreview,
        blockKind: n.blockKind,
        toolName: n.toolName,
        firstSeenAt: n.firstSeenAt,
      })),
      hasMore,
    });
  } catch (err) {
    console.error("[API ERROR] /api/conversations/[id]/tree failed:", err);
    return NextResponse.json({ error: "Failed to fetch conversation" }, { status: 500 });
  }
}
