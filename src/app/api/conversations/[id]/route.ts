import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { getMultiTurnConversationById } from "@/lib/db/agenticConversations";
import { annotateConversationRow, buildActiveCallLogIdByConversation } from "../route";

export const dynamic = "force-dynamic";

/**
 * Single-conversation summary — used by the dashboard's conversation modal
 * to keep lastModel/lastStatus/isActive/activeCallLogId fresh on the auto-
 * refresh interval while it's open, instead of the list route re-fetching
 * and re-annotating up to 200 rows just to pluck one back out. The turns
 * themselves live-update through the separate .../tree poll; this only
 * covers the summary fields the modal header and "Goto latest request"
 * read off the row.
 */
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireManagementAuth(req);
  if (authError) return authError;

  try {
    const { id } = await params;
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    const row = getMultiTurnConversationById(id);
    if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const activeCallLogIdByConversation = buildActiveCallLogIdByConversation();
    const conversation = annotateConversationRow(row, activeCallLogIdByConversation);

    return NextResponse.json({ conversation });
  } catch (err) {
    console.error("[API ERROR] /api/conversations/[id] failed:", err);
    return NextResponse.json({ error: "Failed to fetch conversation" }, { status: 500 });
  }
}
