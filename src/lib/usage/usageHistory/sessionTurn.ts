/**
 * Agent-session turn transcripts attached to usage rows (split out of usageHistory.ts).
 */
import { isSyntheticApiKeyId } from "@/shared/constants/apiKeyIdentities";
import { resolveProviderId } from "@/shared/constants/providers";
import type { AgentSessionTurn } from "@omniroute/open-sse/handlers/chatCore/agentSessionTurn.ts";
import { isNoLog } from "../../compliance/noLog";
import { saveAgentSessionMessage } from "../../db/agentSessionMessages";
import { redactSessionTurn } from "../agentSessionTurnRedaction";

/** The usage-row fields a turn transcript needs. */
export interface SessionTurnUsage {
  apiKeyId?: string | null;
  provider?: string | null;
  model?: string | null;
  success?: boolean;
  sessionTurn?: AgentSessionTurn | null;
}

/** The request's turn transcript when its key may be logged, with secrets redacted. */
export async function loggableSessionTurn(entry: SessionTurnUsage) {
  const loggable =
    entry.apiKeyId && !isSyntheticApiKeyId(entry.apiKeyId) && !isNoLog(entry.apiKeyId);
  return loggable ? await redactSessionTurn(entry.sessionTurn) : null;
}

/** Store the turn on its agent session; a failure never blocks the usage row. */
export function saveSessionTurn(
  db: Parameters<typeof saveAgentSessionMessage>[0],
  sessionId: string | null,
  turn: Awaited<ReturnType<typeof loggableSessionTurn>>,
  entry: SessionTurnUsage,
  timestamp: string
): void {
  if (!sessionId || !turn) return;
  try {
    saveAgentSessionMessage(db, {
      sessionId,
      apiKeyId: entry.apiKeyId,
      timestamp,
      provider: entry.provider ? resolveProviderId(entry.provider) : null,
      model: entry.model || null,
      success: entry.success !== false,
      userText: turn.userText,
      assistantText: turn.assistantText,
      toolNames: turn.toolNames,
      truncated: turn.truncated,
      requestKey: turn.requestKey,
      attemptSeq: turn.attemptSeq,
    });
  } catch (turnErr) {
    console.error("Failed to save agent session message:", turnErr);
  }
}
