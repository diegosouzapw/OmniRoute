/**
 * db/agenticConversations.ts — CRUD for the agentic conversation-tracking
 * tables: `agentic_conversations` (one row per conversation tree root) and
 * `conversation_turn_nodes` (one row per distinct turn instance, chained to
 * its predecessor — see open-sse/services/conversationTracker.ts for how the
 * chain hash is computed and walked to detect continuations/forks).
 *
 * `last_message_count`/`last_messages_hash` on `agentic_conversations` are
 * dead columns kept only for backward on-disk compatibility (superseded by
 * `conversation_turn_nodes`, migration 136) — never read, written as
 * placeholders.
 */

import { v4 as uuidv4 } from "uuid";
import { getDbInstance } from "./core";

export interface AgenticConversationRow {
  id: string;
  apiKeyId: string | null;
  fingerprintHash: string;
  turnCount: number;
  firstSeenAt: string;
  lastSeenAt: string;
}

type JsonRecord = Record<string, unknown>;

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" ? (value as JsonRecord) : {};
}

function toRow(value: unknown): AgenticConversationRow {
  const r = asRecord(value);
  return {
    id: String(r.id ?? ""),
    apiKeyId: typeof r.api_key_id === "string" ? r.api_key_id : null,
    fingerprintHash: String(r.fingerprint_hash ?? ""),
    turnCount: Number(r.turn_count ?? 1),
    firstSeenAt: String(r.first_seen_at ?? ""),
    lastSeenAt: String(r.last_seen_at ?? ""),
  };
}

export function createAgenticConversation(input: {
  id?: string;
  apiKeyId: string | null;
  fingerprintHash: string;
}): AgenticConversationRow {
  const db = getDbInstance();
  const now = new Date().toISOString();
  const id = input.id || `conv_${uuidv4()}`;

  // last_message_count/last_messages_hash are dead columns (superseded by
  // conversation_turn_nodes, migration 136) — 0/'' placeholders only.
  db.prepare(
    `INSERT INTO agentic_conversations
       (id, api_key_id, fingerprint_hash, last_message_count, last_messages_hash, turn_count, first_seen_at, last_seen_at)
     VALUES (?, ?, ?, 0, '', 1, ?, ?)`
  ).run(id, input.apiKeyId, input.fingerprintHash, now, now);

  return {
    id,
    apiKeyId: input.apiKeyId,
    fingerprintHash: input.fingerprintHash,
    turnCount: 1,
    firstSeenAt: now,
    lastSeenAt: now,
  };
}

export function findAgenticConversationsByFingerprint(
  fingerprintHash: string
): AgenticConversationRow[] {
  const db = getDbInstance();
  const rows = db
    .prepare(
      `SELECT * FROM agentic_conversations WHERE fingerprint_hash = ? ORDER BY last_seen_at DESC LIMIT 20`
    )
    .all(fingerprintHash);
  return rows.map(toRow);
}

export function updateAgenticConversation(id: string, patch: { turnCount: number }): void {
  const db = getDbInstance();
  db.prepare(`UPDATE agentic_conversations SET turn_count = ?, last_seen_at = ? WHERE id = ?`).run(
    patch.turnCount,
    new Date().toISOString(),
    id
  );
}

// ── Turn-node tree (migration 136) ───────────────────────────────────────

export interface ConversationTurnNode {
  id: string;
  conversationId: string;
  parentId: string | null;
  role: string;
  textPreview: string;
  /** 'text' | 'tool_use' | 'tool_result' — lets a consumer build the exact
   * NormalizedBlock (src/mitm/inspector/types.ts) the request-detail panel
   * already builds, so tool calls/results render through the same
   * ChatBubble/MessageContent/ToolCallBlock/ToolResultBlock components
   * everywhere instead of a parallel implementation. */
  blockKind: string;
  /** Set only when blockKind === 'tool_use'. */
  toolName: string | null;
  lastCorrelationId: string | null;
  firstSeenAt: string;
  lastSeenAt: string;
}

function toTurnNode(value: unknown): ConversationTurnNode {
  const r = asRecord(value);
  return {
    id: String(r.id ?? ""),
    conversationId: String(r.conversation_id ?? ""),
    parentId: typeof r.parent_id === "string" ? r.parent_id : null,
    role: String(r.role ?? ""),
    textPreview: String(r.text_preview ?? ""),
    blockKind: String(r.block_kind ?? "text"),
    toolName: typeof r.tool_name === "string" ? r.tool_name : null,
    lastCorrelationId: typeof r.last_correlation_id === "string" ? r.last_correlation_id : null,
    firstSeenAt: String(r.first_seen_at ?? ""),
    lastSeenAt: String(r.last_seen_at ?? ""),
  };
}

export interface ConversationTurnIndex {
  /** Every existing node id for the chain — O(1) forward-walk membership checks. */
  nodeIds: Set<string>;
  /**
   * contentHash (sha256 of just a turn's own role+text, independent of
   * parent) -> node ids sharing that content. Lets resolveConversationId
   * find a reconnection point ANYWHERE in the chain, not only at its start —
   * real OpenClaw traffic drops/summarizes the earliest turns as a session
   * grows, so a new request's turn 0 is often not the chain's own first turn.
   */
  byContentHash: Map<string, string[]>;
  /**
   * Node ids that already have at least one recorded child. Lets
   * resolveConversationId distinguish "this turn is genuinely new" (the
   * reconnect anchor has no child yet — safe to extend this SAME
   * conversation) from "a turn already exists at this position and this
   * request's turn differs from it" (an edit — becomes its own independent
   * conversation as of the 2026-08-06 redesign; see resolveConversationId's
   * doc comment for why conversations no longer fork in place).
   */
  parentsWithChildren: Set<string>;
}

/**
 * Bulk-load a conversation chain's node ids and content-hash index in one
 * query, for the reconnect-anchor search in resolveConversationId
 * (conversationTracker.ts). Chains are small in practice (tens to low
 * hundreds of turns), so one bulk load per candidate is cheap.
 */
export function getConversationTurnIndex(conversationId: string): ConversationTurnIndex {
  const db = getDbInstance();
  const rows = db
    .prepare(
      `SELECT id, parent_id, content_hash FROM conversation_turn_nodes WHERE conversation_id = ?`
    )
    .all(conversationId);
  const nodeIds = new Set<string>();
  const byContentHash = new Map<string, string[]>();
  const parentsWithChildren = new Set<string>();
  for (const r of rows) {
    const rec = asRecord(r);
    const id = String(rec.id ?? "");
    const parentId = typeof rec.parent_id === "string" ? rec.parent_id : null;
    const contentHash = String(rec.content_hash ?? "");
    nodeIds.add(id);
    if (parentId) parentsWithChildren.add(parentId);
    if (!contentHash) continue;
    const bucket = byContentHash.get(contentHash);
    if (bucket) bucket.push(id);
    else byContentHash.set(contentHash, [id]);
  }
  return { nodeIds, byContentHash, parentsWithChildren };
}

/**
 * Insert a run of new turn nodes (a fresh branch, or the whole chain for a
 * brand-new conversation). Nodes already existing on this chain are never
 * re-inserted or touched here — only the newly-diverging tail from the
 * fork/reconnect point onward reaches this function (see conversationTracker.ts).
 */
export function insertConversationTurnNodes(
  conversationId: string,
  correlationId: string | null,
  nodes: Array<{
    id: string;
    parentId: string | null;
    role: string;
    contentHash: string;
    textPreview: string;
    blockKind: string;
    toolName: string | null;
  }>
): void {
  if (nodes.length === 0) return;
  const db = getDbInstance();
  const now = new Date().toISOString();
  const insert = db.prepare(
    `INSERT OR IGNORE INTO conversation_turn_nodes
       (id, conversation_id, parent_id, role, content_hash, text_preview, block_kind, tool_name, last_correlation_id, first_seen_at, last_seen_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  );
  const insertMany = db.transaction((rows: typeof nodes) => {
    for (const node of rows) {
      insert.run(
        node.id,
        conversationId,
        node.parentId,
        node.role,
        node.contentHash,
        node.textPreview,
        node.blockKind,
        node.toolName,
        correlationId,
        now,
        now
      );
    }
  });
  insertMany(nodes);
}

/** All turn nodes for a conversation, in order — for tests and any caller
 * that genuinely needs the whole chain in one shot. The dashboard itself
 * uses the paginated getConversationTurnPage below instead, since a long
 * real OpenClaw conversation can run to hundreds of turns. */
export function getConversationTurnTree(conversationId: string): ConversationTurnNode[] {
  const db = getDbInstance();
  const rows = db
    .prepare(
      `SELECT * FROM conversation_turn_nodes WHERE conversation_id = ? ORDER BY first_seen_at ASC`
    )
    .all(conversationId);
  return rows.map(toTurnNode);
}

export interface ConversationTurnNodeWithSeq extends ConversationTurnNode {
  /** SQLite rowid — a stable, monotonically-increasing insertion-order
   * cursor for pagination (first_seen_at can tie within the same request's
   * batch insert; rowid never does). */
  seq: number;
}

export interface ConversationTurnPage {
  /** Ascending order (oldest first) within the page. */
  nodes: ConversationTurnNodeWithSeq[];
  /** True when older turns exist beyond this page (only meaningful for the
   * initial load / beforeSeq cases — always false for afterSeq/poll). */
  hasMore: boolean;
}

/**
 * Paginated turn fetch for the /dashboard/conversations view: a real
 * OpenClaw conversation can run to hundreds of turns, so the page always
 * loads the most recent `limit` (default 20) rather than everything.
 * - No cursor: initial load — the LAST `limit` turns.
 * - `beforeSeq`: "load more" (older) — the `limit` turns immediately before it.
 * - `afterSeq`: poll for new turns since the last load — everything newer,
 *   uncapped (a handful of turns in practice).
 * Only one of beforeSeq/afterSeq is meaningful per call; afterSeq wins if
 * both are somehow given.
 */
export function getConversationTurnPage(
  conversationId: string,
  opts: { limit?: number; beforeSeq?: number; afterSeq?: number } = {}
): ConversationTurnPage {
  const db = getDbInstance();
  const limit = Math.max(1, Math.min(opts.limit ?? 20, 500));

  if (opts.afterSeq != null) {
    const rows = db
      .prepare(
        `SELECT rowid as seq, * FROM conversation_turn_nodes
         WHERE conversation_id = ? AND rowid > ? ORDER BY rowid ASC`
      )
      .all(conversationId, opts.afterSeq);
    return { nodes: rows.map(toTurnNodeWithSeq), hasMore: false };
  }

  const rows =
    opts.beforeSeq != null
      ? db
          .prepare(
            `SELECT rowid as seq, * FROM conversation_turn_nodes
             WHERE conversation_id = ? AND rowid < ? ORDER BY rowid DESC LIMIT ?`
          )
          .all(conversationId, opts.beforeSeq, limit + 1)
      : db
          .prepare(
            `SELECT rowid as seq, * FROM conversation_turn_nodes
             WHERE conversation_id = ? ORDER BY rowid DESC LIMIT ?`
          )
          .all(conversationId, limit + 1);

  const hasMore = rows.length > limit;
  const page = (hasMore ? rows.slice(0, limit) : rows).reverse();
  return { nodes: page.map(toTurnNodeWithSeq), hasMore };
}

function toTurnNodeWithSeq(value: unknown): ConversationTurnNodeWithSeq {
  const rec = asRecord(value);
  return { ...toTurnNode(value), seq: Number(rec.seq ?? 0) };
}

/**
 * Turn nodes are tagged with `last_correlation_id` (see
 * conversationTracker.ts's doc comment for why — the request's own
 * call_logs.id doesn't exist yet when a node is created), not a call_logs.id
 * directly. Resolves the set in one bulk query (not one lookup per node) to
 * a `correlation_id -> call_logs.id` map so the tree view can link each node
 * to a navigable request.
 */
export function resolveCallLogIdsByCorrelationIds(correlationIds: string[]): Map<string, string> {
  const unique = [...new Set(correlationIds.filter(Boolean))];
  const result = new Map<string, string>();
  if (unique.length === 0) return result;

  const db = getDbInstance();
  const placeholders = unique.map(() => "?").join(",");
  const rows = db
    .prepare(`SELECT id, correlation_id FROM call_logs WHERE correlation_id IN (${placeholders})`)
    .all(...unique);
  for (const r of rows) {
    const rec = asRecord(r);
    const correlationId = typeof rec.correlation_id === "string" ? rec.correlation_id : null;
    const callLogId = typeof rec.id === "string" ? rec.id : null;
    // Keep the first match per correlation_id — a retry/combo-fallback can
    // theoretically share one correlation_id across a couple of call_logs
    // rows; any of them is a valid navigation target.
    if (correlationId && callLogId && !result.has(correlationId)) {
      result.set(correlationId, callLogId);
    }
  }
  return result;
}

/**
 * Upsert for the client-supplied `x-omniroute-session-id` path: the header
 * value is used directly as the conversation id, so this only needs to keep
 * `turn_count`/`last_seen_at` moving — the fingerprint/prefix-hash fields are
 * unused for header-pinned conversations (continuation is guaranteed by the
 * client, not detected heuristically).
 */
export function touchOrCreateExternalConversation(
  id: string,
  ctx: { apiKeyId: string | null }
): void {
  const db = getDbInstance();
  const now = new Date().toISOString();
  const existing = db.prepare(`SELECT id FROM agentic_conversations WHERE id = ?`).get(id);

  if (existing) {
    db.prepare(
      `UPDATE agentic_conversations SET turn_count = turn_count + 1, last_seen_at = ? WHERE id = ?`
    ).run(now, id);
    return;
  }

  db.prepare(
    `INSERT INTO agentic_conversations
       (id, api_key_id, fingerprint_hash, last_message_count, last_messages_hash, turn_count, first_seen_at, last_seen_at)
     VALUES (?, ?, '', 0, '', 1, ?, ?)`
  ).run(id, ctx.apiKeyId, now, now);
}

export interface MultiTurnConversationRow extends AgenticConversationRow {
  lastCallLogId: string | null;
  lastModel: string | null;
  lastProvider: string | null;
  lastStatus: number | null;
}

/**
 * Conversations with >= 2 actual turn nodes — filters out one-shot,
 * non-agentic traffic for the /dashboard/conversations list page.
 *
 * Deliberately filters on conversation_turn_nodes COUNT, not `turn_count`:
 * `turn_count` tracks how many separate REQUESTS have touched this
 * conversation (see createAgenticConversation/updateAgenticConversation),
 * not how many turns it contains. A brand-new conversation minted by
 * resolveConversationId's divergence path (see conversationTracker.ts)
 * starts at turn_count=1 even though its first insert can carry the
 * conversation's entire prior history (hundreds of nodes) — real OpenClaw
 * traffic diverges/edits turns often enough that most conversations never
 * accumulate a second touching request, so a turn_count-based filter left
 * them permanently invisible despite having a rich multi-turn transcript
 * (2026-08-06, request 1785975096139-6627d2 / conv_36fff6fa...: turn_count=1,
 * 398 real conversation_turn_nodes rows). Joined to each
 * conversation's most recent call_logs row (by MAX(timestamp) per
 * session_tag) in a single query rather than one lookup per row, since this
 * is a list view that can have many conversations.
 */
export function listMultiTurnConversations(
  filter: {
    limit?: number;
    offset?: number;
  } = {}
): { rows: MultiTurnConversationRow[]; total: number } {
  const db = getDbInstance();
  const limit = Math.max(1, Math.min(filter.limit ?? 50, 200));
  const offset = Math.max(0, filter.offset ?? 0);

  const total = asRecord(
    db
      .prepare(
        `SELECT COUNT(*) as c FROM agentic_conversations ac
         WHERE (SELECT COUNT(*) FROM conversation_turn_nodes n WHERE n.conversation_id = ac.id) >= 2`
      )
      .get()
  ).c as number;

  const rows = db
    .prepare(
      `SELECT ac.*, latest.id as last_call_log_id, latest.model as last_model,
              latest.provider as last_provider, latest.status as last_status
       FROM agentic_conversations ac
       LEFT JOIN (
         SELECT cl1.id, cl1.session_tag, cl1.model, cl1.provider, cl1.status
         FROM call_logs cl1
         WHERE cl1.timestamp = (
           SELECT MAX(cl2.timestamp) FROM call_logs cl2 WHERE cl2.session_tag = cl1.session_tag
         )
       ) latest ON latest.session_tag = ac.id
       WHERE (SELECT COUNT(*) FROM conversation_turn_nodes n WHERE n.conversation_id = ac.id) >= 2
       ORDER BY ac.last_seen_at DESC
       LIMIT ? OFFSET ?`
    )
    .all(limit, offset);

  return {
    total: Number(total ?? 0),
    rows: rows.map((r) => {
      const rec = asRecord(r);
      return {
        ...toRow(rec),
        lastCallLogId: typeof rec.last_call_log_id === "string" ? rec.last_call_log_id : null,
        lastModel: typeof rec.last_model === "string" ? rec.last_model : null,
        lastProvider: typeof rec.last_provider === "string" ? rec.last_provider : null,
        lastStatus: typeof rec.last_status === "number" ? rec.last_status : null,
      };
    }),
  };
}
