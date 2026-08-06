import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { listMultiTurnConversations } from "@/lib/db/agenticConversations";
import { getPendingById } from "@/lib/usage/usageHistory";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const authError = await requireManagementAuth(req);
  if (authError) return authError;

  try {
    const { searchParams } = new URL(req.url);
    const limit = Number(searchParams.get("limit") ?? "50");
    const offset = Number(searchParams.get("offset") ?? "0");

    const { rows, total } = listMultiTurnConversations({
      limit: Number.isFinite(limit) ? limit : undefined,
      offset: Number.isFinite(offset) ? offset : undefined,
    });

    // A pending (still-streaming) request's sessionTag is the conversation's
    // own id (agentic_conversations.id === call_logs.session_tag) — cross
    // reference so the list can show "in progress" without a separate poll.
    const activeConversationIds = new Set<string>();
    for (const pending of getPendingById().values()) {
      if (pending.sessionTag) activeConversationIds.add(pending.sessionTag);
    }
    const conversations = rows.map((row) => ({
      ...row,
      isActive: activeConversationIds.has(row.id),
    }));

    return NextResponse.json({ conversations, total });
  } catch (err) {
    console.error("[API ERROR] /api/conversations failed:", err);
    return NextResponse.json({ error: "Failed to fetch conversations" }, { status: 500 });
  }
}
