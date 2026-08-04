/**
 * Multi-row conversation transcript builder.
 *
 * The single-request `normalizeConversation()` (conversationNormalizer.ts)
 * builds a transcript from ONE request+response pair — fine for the
 * traffic-inspector's per-request view, but a multi-turn agentic
 * conversation is actually N separate call_logs rows (one per HTTP request),
 * each carrying its own real timestamp. This module reconstructs a single,
 * chronological turn list across all of them, tagging every turn with the
 * call_logs row (id + timestamp) that actually produced it — needed for
 * per-turn timestamps and click-to-navigate-to-that-turn's-log.
 *
 * Relies on the invariant enforced by
 * open-sse/services/conversationTracker.ts::resolveConversationId: rows
 * sharing a conversation id have STRICTLY increasing request-turn counts
 * (a real continuation always appends at least the assistant's reply + a new
 * turn). The delta between consecutive rows' turn counts is therefore always
 * >= 0 by construction; the `Math.max(0, ...)` clamp below is a defensive
 * backstop, not load-bearing for well-formed data.
 */

import { buildRequestTurns, buildResponseTurns } from "./conversationNormalizer.ts";
import type { InterceptedRequest, NormalizedTurn } from "./types.ts";

export interface ConversationTurn extends NormalizedTurn {
  sourceCallLogId: string;
  timestamp: string;
}

export interface LoadedCallLogRow {
  id: string;
  timestamp: string;
  requestBody: unknown;
  responseBody: unknown;
}

/**
 * open-sse/handlers/chatCore/logTruncation.ts::truncateForLog() replaces a
 * request body over ~8KB with a bare summary — {_truncated, _originalBytes,
 * messageCount, ...} — dropping `messages`/`input` entirely to bound
 * in-memory logging cost. Any real conversation with substantial history
 * hits this on nearly every row, so buildRequestTurns() legitimately returns
 * zero turns for it: there is nothing left to parse. Without this check the
 * transcript would silently render only the response for that row (looking
 * exactly like "just the last line" of a long chain), and — worse — every
 * SUBSEQUENT row's delta slicing would be computed against the wrong
 * previousTotal (0 instead of the row's real turn count), corrupting the
 * rest of the reconstruction too.
 */
function truncatedMessageCount(body: unknown): number | null {
  if (!body || typeof body !== "object" || Array.isArray(body)) return null;
  const record = body as Record<string, unknown>;
  if (record._truncated !== true) return null;
  return typeof record.messageCount === "number" ? record.messageCount : 0;
}

function rowAsInterceptedRequest(row: LoadedCallLogRow): InterceptedRequest {
  return {
    id: row.id,
    source: "custom-host",
    timestamp: row.timestamp,
    method: "POST",
    host: "",
    path: "",
    requestHeaders: {},
    requestBody: row.requestBody != null ? JSON.stringify(row.requestBody) : null,
    requestSize: 0,
    responseHeaders: {},
    responseBody: row.responseBody != null ? JSON.stringify(row.responseBody) : null,
    responseSize: 0,
    status: 0,
    detectedKind: "llm",
  };
}

/**
 * Build the full chronological turn list across every call_logs row of one
 * conversation. `rows` must already be sorted ascending by timestamp.
 */
export function buildMultiRowConversation(rows: LoadedCallLogRow[]): ConversationTurn[] {
  let previousTotal = 0;
  const turns: ConversationTurn[] = [];

  for (const row of rows) {
    const truncatedCount = truncatedMessageCount(row.requestBody);
    const reqTurns = truncatedCount === null ? (buildRequestTurns(row.requestBody) ?? []) : [];
    const effectiveReqTurnCount = truncatedCount ?? reqTurns.length;
    const sliceStart = Math.max(0, Math.min(previousTotal, effectiveReqTurnCount));
    const respTurns = buildResponseTurns(rowAsInterceptedRequest(row));

    if (truncatedCount !== null) {
      const newCount = Math.max(0, effectiveReqTurnCount - sliceStart);
      if (newCount > 0) {
        turns.push({
          role: "system",
          blocks: [
            {
              type: "text",
              text: `${newCount} message${newCount === 1 ? "" : "s"} not shown — the request body was too large to log.`,
            },
          ],
          sourceCallLogId: row.id,
          timestamp: row.timestamp,
        });
      }
    } else {
      const newRequestTurns = reqTurns.slice(sliceStart);
      for (const turn of newRequestTurns) {
        turns.push({ ...turn, sourceCallLogId: row.id, timestamp: row.timestamp });
      }
    }

    for (const turn of respTurns) {
      turns.push({ ...turn, sourceCallLogId: row.id, timestamp: row.timestamp });
    }

    previousTotal = effectiveReqTurnCount + respTurns.length;
  }

  return turns;
}
