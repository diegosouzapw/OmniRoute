import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import type { MultiTurnConversationRow } from "@/lib/db/agenticConversations";
import { listMultiTurnConversations } from "@/lib/db/agenticConversations";
import { getPendingById } from "@/lib/usage/usageHistory";
import { isGenuineContinuationTurn } from "@/lib/db/responsesContinuationStore";

export const dynamic = "force-dynamic";

/**
 * Shared row -> API-shape annotation for both the list route and the
 * single-conversation route below: isActive/activeCallLogId (pending-request
 * cross reference) and isGenuineContinuation (artifact-backed, cached — see
 * isGenuineContinuationTurn) need the exact same computation regardless of
 * whether the caller asked for one row or many. Strips the internal-only
 * lastArtifactRelPath/lastApiKeyId fields before they reach the client.
 */
export function annotateConversationRow(
  row: MultiTurnConversationRow,
  activeCallLogIdByConversation: ReadonlyMap<string, string>
) {
  const { lastArtifactRelPath, lastApiKeyId, ...rest } = row;
  return {
    ...rest,
    isActive: activeCallLogIdByConversation.has(row.id),
    activeCallLogId: activeCallLogIdByConversation.get(row.id) ?? null,
    isGenuineContinuation: isGenuineContinuationTurn(lastArtifactRelPath, lastApiKeyId),
  };
}

/**
 * A pending (still-streaming) request's sessionTag is the conversation's own
 * id (agentic_conversations.id === call_logs.session_tag) — cross reference
 * so a conversation row can show "in progress" without a separate poll.
 * `call_logs` only gets its row on completion (src/lib/usage/callLogs.ts's
 * INSERT needs duration/status/tokens, none of which exist yet), so
 * lastCallLogId always lags one request behind while a reply is still
 * streaming — it can't be used to fetch the in-flight response. Surfacing
 * the pending request's own id separately lets the conversation panel poll
 * /api/logs/[id] for it directly (same live-partial-text path
 * RequestLoggerDetail already uses).
 */
export function buildActiveCallLogIdByConversation(): Map<string, string> {
  const map = new Map<string, string>();
  for (const pending of getPendingById().values()) {
    if (pending.sessionTag) map.set(pending.sessionTag, pending.id);
  }
  return map;
}

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

    const activeCallLogIdByConversation = buildActiveCallLogIdByConversation();
    const conversations = rows.map((row) =>
      annotateConversationRow(row, activeCallLogIdByConversation)
    );

    return NextResponse.json({ conversations, total });
  } catch (err) {
    console.error("[API ERROR] /api/conversations failed:", err);
    return NextResponse.json({ error: "Failed to fetch conversations" }, { status: 500 });
  }
}
