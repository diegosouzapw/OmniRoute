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
    // `call_logs` only gets its row on completion (src/lib/usage/callLogs.ts's
    // INSERT needs duration/status/tokens, none of which exist yet), so
    // `lastCallLogId` from listMultiTurnConversations always lags one request
    // behind while a reply is still streaming — it can't be used to fetch the
    // in-flight response. Surface the pending request's own id separately so
    // the conversation panel can poll /api/logs/[id] for it directly (same
    // live-partial-text path RequestLoggerDetail already uses).
    const activeCallLogIdByConversation = new Map<string, string>();
    for (const pending of getPendingById().values()) {
      if (pending.sessionTag) activeCallLogIdByConversation.set(pending.sessionTag, pending.id);
    }
    const conversations = rows.map((row) => ({
      ...row,
      isActive: activeCallLogIdByConversation.has(row.id),
      activeCallLogId: activeCallLogIdByConversation.get(row.id) ?? null,
    }));

    return NextResponse.json({ conversations, total });
  } catch (err) {
    console.error("[API ERROR] /api/conversations failed:", err);
    return NextResponse.json({ error: "Failed to fetch conversations" }, { status: 500 });
  }
}
