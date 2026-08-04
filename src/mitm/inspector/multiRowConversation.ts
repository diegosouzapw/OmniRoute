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
    const reqTurns = buildRequestTurns(row.requestBody) ?? [];
    const sliceStart = Math.max(0, Math.min(previousTotal, reqTurns.length));
    const newRequestTurns = reqTurns.slice(sliceStart);
    const respTurns = buildResponseTurns(rowAsInterceptedRequest(row));

    for (const turn of [...newRequestTurns, ...respTurns]) {
      turns.push({ ...turn, sourceCallLogId: row.id, timestamp: row.timestamp });
    }

    previousTotal = reqTurns.length + respTurns.length;
  }

  return turns;
}
