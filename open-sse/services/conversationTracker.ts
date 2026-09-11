/**
 * Conversation Tracker — assigns a stable conversation id across separate
 * HTTP requests that are turns of the same multi-turn agentic conversation.
 *
 * Clients resend the full growing message/input history on every turn (no
 * server-side state dependency). Continuation is detected with a per-turn
 * hash chain (each turn's id = sha256(parentId, role, sha256(text)), the
 * same idea as a git commit graph): a new request's turns are walked from
 * the start against the candidate conversation's existing chain, matching as
 * far as they agree. Real agentic-CLI traffic (OpenClaw and similar) often
 * edits or duplicates a turn mid-history to keep provider-side prompt caches
 * warm — e.g. request 1 has turns `a b c … h i`, request 2 has
 * `a b c′ … h i′ i j k`. A whole-history hash (the original approach) breaks
 * on any such edit and never reconnects.
 *
 * Every OmniRoute conversation is a single straight line — it never forks.
 * When a turn diverges from what's already on file (`c` became `c'`), that
 * diverging history becomes its OWN independent conversation, with its own
 * id, built fresh from this request's full turn list — not a branch grafted
 * onto the old chain (2026-08-06 redesign; the branching model's real
 * traffic accumulated dozens of edits per session, and indenting one more
 * tree level per edit eventually left no room to show content at all).
 * `a b c d` and `a b c' d'` end up as two distinct conversations, sharing no
 * further storage after the point they diverge — simpler to store, query,
 * and render than a tree, and it matches how the data is actually used: a
 * "conversation" here is one continuous transcript, not a version-control
 * graph. This is a new, persisted mechanism — separate from
 * `sessionManager.ts`'s `generateSessionId()` (in-memory, routing/latency
 * only) even though it uses the same sha256-fingerprint style.
 *
 * @see Issue: X-ConversationId / agentic conversation tracking
 */

import { createHmac, randomUUID } from "node:crypto";
import {
  createAgenticConversation,
  findAgenticConversationsByFingerprint,
  getConversationTurnIndex,
  insertConversationTurnNodes,
  touchOrCreateExternalConversation,
  updateAgenticConversation,
  type ConversationTurnIndex,
} from "../../src/lib/db/agenticConversations.ts";

type JsonRecord = Record<string, unknown>;

interface CanonicalTurn {
  role: "system" | "user" | "assistant" | "tool";
  text: string;
  /** 'text' | 'tool_use' | 'tool_result' — carried through to
   * conversation_turn_nodes so the tree view (and any other consumer) can
   * build the exact NormalizedBlock (src/mitm/inspector/types.ts) the
   * request-detail panel already builds from buildRequestTurns/
   * buildResponseTurns, rendering tool calls/results through the same
   * ChatBubble/MessageContent/ToolCallBlock/ToolResultBlock components
   * everywhere instead of a parallel tree-only implementation. */
  blockKind: "text" | "tool_use" | "tool_result";
  /** Set only when blockKind === "tool_use". */
  toolName: string | null;
}

export interface ResolveConversationIdInput {
  body: JsonRecord | null | undefined;
  model: string | null;
  apiKeyId: string | null;
  /** Raw `x-omniroute-session-id` header value, if the client supplied one. */
  clientSessionIdHeader: string | null;
  /**
   * call_logs.correlation_id for this request (109_call_logs_correlation_id)
   * — generated earlier in the request lifecycle, well before this request's
   * own call_logs row/id exists, so it's the only stable identifier
   * available here to tag new turn nodes with. The tree API route
   * (src/app/api/conversations/[id]/tree/route.ts) joins through it to
   * resolve a navigable call_logs.id.
   */
  correlationId: string | null;
}

export interface ResolveConversationIdResult {
  conversationId: string;
  isNewConversation: boolean;
}

// ── Canonicalization ─────────────────────────────────────────────────────

function normalizeRole(raw: unknown): CanonicalTurn["role"] {
  if (raw === "system" || raw === "user" || raw === "assistant" || raw === "tool") return raw;
  if (raw === "developer") return "system";
  if (raw === "model") return "assistant";
  if (raw === "function") return "tool";
  return "user";
}

/**
 * Extract human-readable text from an OpenAI/Anthropic/Responses-API
 * `content` value. Chat Completions sends a plain string; Responses API and
 * Anthropic send an array of typed blocks (`{type:"text"|"input_text"|
 * "output_text", text}`, `tool_use`, `tool_result`, ...) — collapsing that
 * array to its text (rather than `JSON.stringify`-ing the whole thing) is
 * what feeds both the turn-hash-chain (so the same underlying text chains
 * identically regardless of which block-array shape a client used to send
 * it) and `text_preview`, which the /dashboard/conversations tree view
 * renders directly as markdown — a raw JSON blob there was a real bug, not a
 * cosmetic one.
 */
function stringifyContent(content: unknown): string {
  if (typeof content === "string") return content;
  if (content == null) return "";
  if (Array.isArray(content)) {
    const parts: string[] = [];
    for (const item of content) {
      if (typeof item === "string") {
        parts.push(item);
        continue;
      }
      const block = item && typeof item === "object" ? (item as JsonRecord) : null;
      if (!block) continue;
      const type = block.type;
      if (
        (type === "text" || type === "input_text" || type === "output_text") &&
        typeof block.text === "string"
      ) {
        parts.push(block.text);
      } else if (type === "tool_use" || type === "function_call") {
        const name = typeof block.name === "string" ? block.name : "";
        parts.push(`[tool_use ${name}]`);
      } else if (type === "tool_result" || type === "function_call_output") {
        parts.push(stringifyContent(block.content ?? block.output ?? ""));
      } else if (typeof block.text === "string") {
        parts.push(block.text);
      }
    }
    return parts.join("\n");
  }
  try {
    return JSON.stringify(content);
  } catch {
    return "";
  }
}

/**
 * Flatten a Chat Completions `messages[]` array or a Responses API `input`
 * (array, bare string, or single message-shaped object) into a stable,
 * format-agnostic turn list. Ignores ids/tool_call_ids/metadata entirely —
 * only role + a string projection of content survive, since those are the
 * only fields that stay stable across a client's own re-encoding of history.
 */
export function extractCanonicalTurns(body: JsonRecord | null | undefined): CanonicalTurn[] {
  if (!body || typeof body !== "object") return [];

  let raw: unknown[];
  if (Array.isArray(body.messages)) {
    raw = body.messages;
  } else if (Array.isArray(body.input)) {
    raw = body.input;
  } else if (Array.isArray(body.choices)) {
    raw = body.choices.map((c) => {
      const choiceRec = c && typeof c === "object" ? (c as JsonRecord) : null;
      if (!choiceRec) return {};
      const msg =
        choiceRec.message && typeof choiceRec.message === "object"
          ? (choiceRec.message as JsonRecord)
          : null;
      const delta =
        choiceRec.delta && typeof choiceRec.delta === "object"
          ? (choiceRec.delta as JsonRecord)
          : null;
      const target = msg ?? delta ?? choiceRec;
      if (!target.role) {
        return { role: "assistant", ...target };
      }
      return target;
    });
  } else if (typeof body.input === "string") {
    raw = [{ role: "user", content: body.input }];
  } else if (body.input && typeof body.input === "object") {
    raw = [body.input];
  } else {
    raw = [];
  }

  const turns: CanonicalTurn[] = [];
  for (const item of raw) {
    const rec = item && typeof item === "object" ? (item as JsonRecord) : {};
    // Responses API function_call/function_call_output items have no `role`
    // but do carry stable identifying text — fold them in as "tool" turns so
    // tool round-trips still contribute to the continuation signal.
    const role = rec.role
      ? normalizeRole(rec.role)
      : rec.type === "function_call" || rec.type === "function_call_output"
        ? "tool"
        : null;
    if (!role) continue;

    // Handle ChatCompletions assistant tool_calls (which often have content: null or "")
    if (role === "assistant" && Array.isArray(rec.tool_calls) && rec.tool_calls.length > 0) {
      for (const tc of rec.tool_calls as JsonRecord[]) {
        const fn =
          tc?.function && typeof tc.function === "object" ? (tc.function as JsonRecord) : {};
        const toolName =
          typeof fn.name === "string" ? fn.name : typeof tc?.name === "string" ? tc.name : null;
        const argsStr =
          typeof fn.arguments === "string"
            ? fn.arguments
            : typeof tc?.arguments === "string"
              ? tc.arguments
              : "";
        turns.push({
          role: "assistant",
          text: argsStr,
          blockKind: "tool_use",
          toolName,
        });
      }
      // If there is also text content in the assistant message, include it as a text turn as well
      const contentText = stringifyContent(rec.content ?? rec.text);
      if (contentText) {
        turns.push({ role: "assistant", text: contentText, blockKind: "text", toolName: null });
      }
      continue;
    }

    const text = stringifyContent(rec.content ?? rec.text ?? rec.arguments ?? rec.output);
    if (!text) continue;

    // Chat Completions tool-result messages (role: "tool"/"function") and
    // Responses API function_call/function_call_output items are the only
    // two shapes this canonicalizer sees for tool activity — everything
    // else (including plain assistant/user/system text) is "text".
    let blockKind: CanonicalTurn["blockKind"] = "text";
    let toolName: string | null = null;
    if (rec.type === "function_call") {
      blockKind = "tool_use";
      toolName = typeof rec.name === "string" ? rec.name : null;
    } else if (rec.type === "function_call_output") {
      blockKind = "tool_result";
    } else if (rec.role === "tool" || rec.role === "function") {
      blockKind = "tool_result";
      toolName = typeof rec.name === "string" ? rec.name : null;
    }

    turns.push({ role, text, blockKind, toolName });
  }
  return turns;
}

// ── Fingerprint (identity, O(1) regardless of history size) ─────────────

// Content fingerprint for conversation identity, not a password/credential hash — keyed with a
// fixed context label so it reads as a domain-separated digest rather than a bare password hash.
function hashHex(text: string): string {
  return createHmac("sha256", "omniroute-conversation-fingerprint-v1").update(text).digest("hex");
}

function extractToolNames(body: JsonRecord | null | undefined): string[] {
  if (!body || !Array.isArray(body.tools)) return [];
  const names: string[] = [];
  for (const tool of body.tools as unknown[]) {
    const rec = tool && typeof tool === "object" ? (tool as JsonRecord) : {};
    const fn = rec.function && typeof rec.function === "object" ? (rec.function as JsonRecord) : {};
    const name =
      typeof rec.name === "string" ? rec.name : typeof fn.name === "string" ? fn.name : "";
    if (name) names.push(name);
  }
  return names.sort();
}

// Deliberately excludes any message text — both the system prompt (real
// coding-agent CLIs like Claude Code/opencode regenerate it every request
// with live context: timestamp, cwd, git status...) AND, discovered live on
// a real OmniRoute deployment running OpenClaw, the first non-system turn
// too: OpenClaw's sliding context window drops/summarizes the EARLIEST
// turns as a session grows, so `firstNonSystemText` never stays stable
// across requests either — anchoring identity to either one mints a brand
// new conversation (or, worse, finds zero fingerprint candidates at all, so
// the turn-chain match in resolveConversationId never even runs) on every
// single turn for exactly this kind of real traffic, even though the actual
// history is a genuine, unbroken continuation. The bucket only needs to be
// small enough to bound candidate lookup — apiKeyId + model + toolNames is
// stable across a whole session and still narrow in practice; actual
// identity is decided by the turn-chain walk (real content overlap), not by
// this bucket, so widening it here cannot cause a false merge on its own.
export function computeFingerprintHash(input: {
  apiKeyId: string | null;
  model: string | null;
  toolNames: string[];
}): string {
  const parts = [input.apiKeyId ?? "", input.model ?? "", input.toolNames.join(",")];
  // NOTE: no connectionId — conversation identity must not depend on which
  // upstream connection this particular turn happened to be routed to.
  return hashHex(parts.join("|"));
}

// ── Turn hash chain (continuation + branch detection) ────────────────────
//
// Each turn gets a stable id chained to its predecessor, the same idea as a
// git commit graph: id = sha256(parentId, role, sha256(text)). A brand-new
// tree's first turn chains off the conversation root id itself (not off
// `null`) so two different, unrelated conversation trees whose first turn
// happens to be byte-identical (e.g. two sessions that both open with "hi")
// never compute the same node id — `conversation_turn_nodes.id` is a global
// primary key, not scoped per conversation_id.
//
// Nodes store identity only (id/parent/content_hash), never the turn's
// actual text/tool-call shape — the dashboard resolves that on demand from
// the call-log pipeline artifact each node's correlation id points at (see
// conversationTurnContent.ts), re-running extractCanonicalTurns over that
// artifact's full, untruncated request body and matching by contentHash.
// Exported so that resolver can compute the same hash for a lookup key.
export function hashTurnContent(turn: CanonicalTurn): string {
  return hashHex(`${turn.role} ${turn.text}`);
}

/**
 * Upper bound on chain-node id computations a single resolveConversationId
 * call may spend across ALL fingerprint candidates, start turns and duplicate
 * anchors (#7847-class stall). Real coding-agent histories combine 1000+
 * turns with heavily duplicated tool outputs, so the (start × anchor × walk)
 * product is unbounded without a cap: measured on production traffic the
 * walk blocked the request path for 10-130 s before this bound existed.
 * Exhausting the budget degrades exactly like a no-match — the request mints
 * a new conversation — never a wrong attachment.
 */
export const DEFAULT_RECONNECT_MAX_STEPS = 150_000;

function chainNodeIdFromHash(parentId: string, turnHash: string): string {
  return hashHex(`${parentId} ${turnHash}`);
}

function chainNodeId(parentId: string, turn: CanonicalTurn): string {
  return chainNodeIdFromHash(parentId, hashTurnContent(turn));
}

interface NewTurnNode {
  id: string;
  parentId: string | null;
  role: string;
  contentHash: string;
}

/** Build the new-node run for turns[fromIndex:], chained off `chainAnchor`. */
function buildNewNodes(
  turns: CanonicalTurn[],
  fromIndex: number,
  chainAnchor: string,
  rootId: string,
  turnHashes?: string[]
): NewTurnNode[] {
  const nodes: NewTurnNode[] = [];
  let parent = chainAnchor;
  for (let i = fromIndex; i < turns.length; i++) {
    const turnHash = turnHashes ? turnHashes[i] : hashTurnContent(turns[i]);
    const nodeId = chainNodeIdFromHash(parent, turnHash);
    nodes.push({
      id: nodeId,
      // The root anchor is a hashing seed, not a real node — the first turn
      // of a tree has no parent turn.
      parentId: parent === rootId ? null : parent,
      role: turns[i].role,
      contentHash: turnHash,
    });
    parent = nodeId;
  }
  return nodes;
}

export interface ReconnectMatch {
  /** Index into `chainTurns` where the reconnection was found (turns before
   * this index were dropped from the chain's view — a compacted summary the
   * client sent instead of resending them verbatim — and are not inserted
   * as nodes). */
  startIndex: number;
  /** How far the match extends past startIndex (>= startIndex + 1). */
  matchEndIndex: number;
  /** Node id to chain new nodes off (the last matched node). */
  anchorNodeId: string;
  /** True when `anchorNodeId` already has a recorded child in this chain —
   * i.e. turns[matchEndIndex] (if any) would collide with an existing,
   * DIFFERENT turn rather than simply being new. See resolveConversationId's
   * doc comment for what this distinction now controls. */
  anchorHasChild: boolean;
}

/**
 * Mutable work budget shared across a single resolveConversationId call's
 * candidate walks. `stepsLeft` counts DOWN one chain-node id computation per
 * step; `stepsUsed` reports total spend for observability/tests.
 */
export interface ReconnectWalkBudget {
  stepsLeft: number;
  stepsUsed: number;
}

export interface FindReconnectMatchOptions {
  /** Memoized `hashTurnContent` per chain turn, computed once per request. */
  turnHashes?: string[];
  /** Per-call cap; omit to use a fresh DEFAULT_RECONNECT_MAX_STEPS budget. */
  maxSteps?: number;
  /** Shared budget across several calls (resolveConversationId's candidate loop). */
  budget?: ReconnectWalkBudget;
}

export interface FindReconnectMatchResult {
  match: ReconnectMatch | null;
  stepsUsed: number;
}

/**
 * Find where `chainTurns` reconnects to an existing chain, trying the
 * leftmost turn first (so a still-fully-present prefix — the common case —
 * matches immediately at the start) and falling back to later turns only
 * when earlier ones aren't found anywhere in the chain. This is what makes
 * continuation detection survive OpenClaw's sliding context window: once
 * the earliest turns are compacted away, turn 0 of a new request is some
 * turn from the MIDDLE of the existing chain, not its start — a start-only
 * walk (checking only whether turn 0 is the chain's own first turn) would
 * find nothing.
 *
 * Real agentic traffic is full of byte-identical repeated turns — a tool
 * polling loop's "Process still running." output, a heartbeat ack, a
 * one-word "ok" — so `byContentHash.get(...)` routinely returns MANY
 * candidate anchors for the same turn (one real conversation observed 28
 * duplicates of a single OpenClaw runtime-context turn). Evaluating only the
 * first candidate (as this used to do) meant returning whichever occurrence
 * SQLite happened to list first — in practice the OLDEST, most stale one —
 * whose recorded next-turn almost never matches the current request, so the
 * walk stalled a few turns in and (worse) that stale anchor already has a
 * DIFFERENT recorded child, tripping `anchorHasChild` and making
 * resolveConversationId treat a genuine continuation as a divergence. Live
 * result: a real conversation minted a brand-new copy of its ENTIRE history
 * on every single request instead of ever reconnecting (2026-08-06). Every
 * candidate anchor for every prefix start is now tried, and the one that
 * verifiably extends furthest into the actual request wins — the only
 * reliable signal of genuine continuation when content repeats.
 *
 * #7847-class stall fix: the (start × anchor × walk) product over a long
 * duplicate-heavy history is bounded by a step budget (`maxSteps` /
 * `DEFAULT_RECONNECT_MAX_STEPS`), and turn content hashes are memoized via
 * `turnHashes` so each step hashes ~130 fixed-size bytes instead of re-hashing
 * the turn's full text. Budget exhaustion returns the best match verified so
 * far (possibly none) — degrading to "new conversation" downstream, never an
 * unverified attachment.
 */
export function findReconnectMatch(
  chainTurns: CanonicalTurn[],
  index: ConversationTurnIndex,
  options: FindReconnectMatchOptions = {}
): FindReconnectMatchResult {
  const turnHashes = options.turnHashes ?? chainTurns.map(hashTurnContent);
  const budget: ReconnectWalkBudget = options.budget ?? {
    stepsLeft: options.maxSteps ?? DEFAULT_RECONNECT_MAX_STEPS,
    stepsUsed: 0,
  };
  let best: ReconnectMatch | null = null;

  for (let s = 0; s < chainTurns.length; s++) {
    if (budget.stepsLeft <= 0) break;
    const anchors = index.byContentHash.get(turnHashes[s]);
    if (!anchors) continue;
    for (const anchorNodeId of anchors) {
      if (budget.stepsLeft <= 0) break;
      // The anchor claim itself costs one step: with no budget left to claim
      // even the hash-bucket anchor, the walker must report no match rather
      // than an unverified one.
      budget.stepsLeft -= 1;
      budget.stepsUsed += 1;
      let parent = anchorNodeId;
      let matchEndIndex = s + 1;
      while (matchEndIndex < chainTurns.length && budget.stepsLeft > 0) {
        budget.stepsLeft -= 1;
        budget.stepsUsed += 1;
        const nodeId = chainNodeIdFromHash(parent, turnHashes[matchEndIndex]);
        if (!index.nodeIds.has(nodeId)) break;
        parent = nodeId;
        matchEndIndex++;
      }
      const anchorHasChild = index.parentsWithChildren.has(parent);
      // Longest verified run wins outright. An equal-length run breaks
      // toward anchorHasChild===false: a tie means both candidate anchors'
      // recorded next-turn already differs from what's being requested (the
      // walk stopped for the same reason on both), so the anchor with NO
      // established child is the safe, unambiguous "just append here" — the
      // other, having a different recorded child already, would incorrectly
      // read as a divergence purely because it happened to be tried first.
      const isBetter =
        !best ||
        matchEndIndex > best.matchEndIndex ||
        (matchEndIndex === best.matchEndIndex && !anchorHasChild && best.anchorHasChild);
      if (isBetter) {
        best = { startIndex: s, matchEndIndex, anchorNodeId: parent, anchorHasChild };
      }
      // Can't do better than matching every turn through to the end.
      if (best && best.matchEndIndex === chainTurns.length) {
        return { match: best, stepsUsed: budget.stepsUsed };
      }
    }
  }
  return { match: best, stepsUsed: budget.stepsUsed };
}

// ── Orchestration ─────────────────────────────────────────────────────────

const MAX_STORED_ID_LENGTH = 128;

export async function resolveConversationId(
  input: ResolveConversationIdInput
): Promise<ResolveConversationIdResult> {
  // Client override wins outright — deterministic, zero heuristic risk.
  // Same header feature #8249 already reads (chatCore.ts); we don't invent a
  // new prefix so the existing header's contract/format stays unchanged.
  if (input.clientSessionIdHeader && input.clientSessionIdHeader.trim()) {
    const id = input.clientSessionIdHeader.trim().slice(0, MAX_STORED_ID_LENGTH);
    touchOrCreateExternalConversation(id, { apiKeyId: input.apiKeyId });
    return { conversationId: id, isNewConversation: false };
  }

  const turns = extractCanonicalTurns(input.body);
  const toolNames = extractToolNames(input.body);
  const fingerprintHash = computeFingerprintHash({
    apiKeyId: input.apiKeyId,
    model: input.model,
    toolNames,
  });

  // The turn CHAIN excludes the system message entirely, same reasoning as
  // extractFirstNonSystemText above: real coding-agent CLIs regenerate the
  // system prompt (timestamp/cwd/git status...) on every single request, so
  // treating it as an ordinary chained turn would make turn-0 (or wherever
  // it sits) fail to match on every request — reintroducing the exact
  // always-new-conversation bug this chain design exists to fix.
  const chainTurns = turns.filter((t) => t.role !== "system");
  // #7847-class stall fix: hash each turn's content exactly once per request
  // and bound the reconnect walk across ALL candidates with one shared budget
  // — previously every (start × anchor × walk-step) re-hashed the turn's full
  // text twice, which on long duplicate-heavy coding-agent histories blocked
  // the pre-routing request path for 10-130 s.
  const turnHashes = chainTurns.map(hashTurnContent);
  const walkBudget: ReconnectWalkBudget = { stepsLeft: DEFAULT_RECONNECT_MAX_STEPS, stepsUsed: 0 };

  const candidates = findAgenticConversationsByFingerprint(fingerprintHash);
  for (const candidate of candidates) {
    const index = getConversationTurnIndex(candidate.id);
    if (index.nodeIds.size === 0) continue;

    const { match } = findReconnectMatch(chainTurns, index, {
      turnHashes,
      budget: walkBudget,
    });
    // No match anywhere in the chain means this candidate isn't actually
    // this conversation's lineage — it only shares the coarse fingerprint
    // bucket (apiKeyId/model/toolNames), which real traffic proves is not
    // enough to assume overlap on its own (see computeFingerprintHash's doc
    // comment) — try the next candidate rather than attaching a completely
    // unrelated turn.
    if (!match) continue;

    if (match.matchEndIndex === chainTurns.length) {
      // Every turn from the reconnect point onward already exists on this
      // chain (e.g. an exact retry, or the whole request is already fully
      // recorded) — a real continuation, nothing new to insert.
      updateAgenticConversation(candidate.id, { turnCount: candidate.turnCount + 1 });
      return { conversationId: candidate.id, isNewConversation: false };
    }

    if (!match.anchorHasChild) {
      // Genuine tail growth: the reconnect point has no recorded child yet,
      // so turns[matchEndIndex:] are simply turns this conversation hasn't
      // seen before — append them to this SAME chain. Turns before
      // startIndex (a compacted-away prefix, if any) are never inserted —
      // they don't represent new content, just the client's own context
      // management.
      const newNodes = buildNewNodes(
        chainTurns,
        match.matchEndIndex,
        match.anchorNodeId,
        candidate.id,
        turnHashes
      );
      insertConversationTurnNodes(candidate.id, input.correlationId, newNodes);
      updateAgenticConversation(candidate.id, { turnCount: candidate.turnCount + 1 });
      return { conversationId: candidate.id, isNewConversation: false };
    }

    // The reconnect point already has a DIFFERENT recorded child — this
    // request's turn at that position diverges from what's on file (a real
    // OpenClaw cache-aware-context edit: turn `c` became `c'`). As of the
    // 2026-08-06 redesign, an edited/duplicated turn no longer forks a
    // branch inside this conversation's own chain — every OmniRoute
    // conversation is now a single straight line, never a tree. The
    // diverging history becomes its own independent conversation instead
    // (built fresh below, from this request's full turn list) — distinct
    // conversation ids for `a b c d` and `a b c' d'`, not one tree with two
    // branches. This is both simpler to store/query and fixes a real UX
    // problem the branching model had: real OpenClaw traffic accumulates
    // dozens of edits per session, and indenting one more level per fork
    // eventually left no horizontal space for content at all. Keep checking
    // remaining candidates first, though — a later candidate may already BE
    // that independent conversation from a previous edit at this same spot
    // (e.g. a repeated retry of the edited turn), which should continue
    // that one rather than minting yet another new id for it.
  }

  const id = `conv_${randomUUID()}`;
  createAgenticConversation({ id, apiKeyId: input.apiKeyId, fingerprintHash });
  insertConversationTurnNodes(
    id,
    input.correlationId,
    buildNewNodes(chainTurns, 0, id, id, turnHashes)
  );
  return { conversationId: id, isNewConversation: true };
}
