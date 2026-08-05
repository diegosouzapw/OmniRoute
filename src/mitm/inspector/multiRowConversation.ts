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
 *
 * `knownCount` is null when the summary carries no count at all — either
 * older data logged before truncateForLog() learned to count Responses API
 * `input[]` bodies, or some other body shape it doesn't recognize. In that
 * case we can't safely diff against previousTotal, so the caller falls back
 * to a single generic placeholder instead of a specific "N messages" one.
 */
function getTruncationInfo(body: unknown): { knownCount: number | null } | null {
  if (!body || typeof body !== "object" || Array.isArray(body)) return null;
  const record = body as Record<string, unknown>;
  if (record._truncated !== true) return null;
  return { knownCount: typeof record.messageCount === "number" ? record.messageCount : null };
}

function placeholderTurn(text: string, row: LoadedCallLogRow): ConversationTurn {
  return {
    role: "system",
    blocks: [{ type: "text", text }],
    sourceCallLogId: row.id,
    timestamp: row.timestamp,
  };
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
    const truncation = getTruncationInfo(row.requestBody);
    const respTurns = buildResponseTurns(rowAsInterceptedRequest(row));

    if (truncation === null) {
      const reqTurns = buildRequestTurns(row.requestBody) ?? [];
      const sliceStart = Math.max(0, Math.min(previousTotal, reqTurns.length));
      for (const turn of reqTurns.slice(sliceStart)) {
        turns.push({ ...turn, sourceCallLogId: row.id, timestamp: row.timestamp });
      }
      previousTotal = reqTurns.length + respTurns.length;
    } else if (truncation.knownCount !== null) {
      const effectiveReqTurnCount = truncation.knownCount;
      const sliceStart = Math.max(0, Math.min(previousTotal, effectiveReqTurnCount));
      const newCount = Math.max(0, effectiveReqTurnCount - sliceStart);
      if (newCount > 0) {
        turns.push(
          placeholderTurn(
            `${newCount} message${newCount === 1 ? "" : "s"} not shown — the request body was too large to log.`,
            row
          )
        );
      }
      previousTotal = effectiveReqTurnCount + respTurns.length;
    } else {
      // Count unknown (older data, or a body shape truncateForLog() doesn't
      // recognize) — can't tell how many of this row's turns are genuinely
      // new, so surface one generic placeholder rather than silently
      // showing nothing. previousTotal is left as-is: we have no reliable
      // new figure to add to it, and understating a later row's "new" count
      // is a safer failure mode here than overstating it.
      turns.push(
        placeholderTurn("Earlier messages not shown — the request body was too large to log.", row)
      );
      previousTotal = previousTotal + respTurns.length;
    }

    for (const turn of respTurns) {
      turns.push({ ...turn, sourceCallLogId: row.id, timestamp: row.timestamp });
    }
  }

  return turns;
}
