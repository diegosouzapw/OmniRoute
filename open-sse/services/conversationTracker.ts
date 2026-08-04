/**
 * Conversation Tracker — assigns a stable conversation id across separate
 * HTTP requests that are turns of the same multi-turn agentic conversation.
 *
 * Clients resend the full growing message/input history on every turn (no
 * server-side state dependency), so continuation is detected by checking
 * whether an earlier request's history is a strict prefix of the current
 * request's history. This is a new, persisted mechanism — separate from
 * `sessionManager.ts`'s `generateSessionId()` (in-memory, routing/latency
 * only) even though it uses the same sha256-fingerprint style.
 *
 * @see Issue: X-ConversationId / agentic conversation tracking
 */

import { createHash, randomUUID } from "node:crypto";
import {
  createAgenticConversation,
  findAgenticConversationsByFingerprint,
  touchOrCreateExternalConversation,
  updateAgenticConversation,
} from "../../src/lib/db/agenticConversations.ts";

type JsonRecord = Record<string, unknown>;

interface CanonicalTurn {
  role: "system" | "user" | "assistant" | "tool";
  text: string;
}

export interface ResolveConversationIdInput {
  body: JsonRecord | null | undefined;
  model: string | null;
  apiKeyId: string | null;
  /** Raw `x-omniroute-session-id` header value, if the client supplied one. */
  clientSessionIdHeader: string | null;
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

function stringifyContent(content: unknown): string {
  if (typeof content === "string") return content;
  if (content == null) return "";
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
    const text = stringifyContent(rec.content ?? rec.text ?? rec.arguments ?? rec.output);
    if (text) turns.push({ role, text });
  }
  return turns;
}

// ── Fingerprint (identity, O(1) regardless of history size) ─────────────

function hashHex(text: string): string {
  return createHash("sha256").update(text).digest("hex");
}

function hashShort(text: string): string {
  return hashHex(text).slice(0, 16);
}

function extractSystemOrFirstUserText(turns: CanonicalTurn[]): string | null {
  const system = turns.find((t) => t.role === "system");
  if (system) return system.text;
  const firstUser = turns.find((t) => t.role === "user");
  return firstUser ? firstUser.text : null;
}

function extractToolNames(body: JsonRecord | null | undefined): string[] {
  if (!body || !Array.isArray(body.tools)) return [];
  const names: string[] = [];
  for (const tool of body.tools as unknown[]) {
    const rec = tool && typeof tool === "object" ? (tool as JsonRecord) : {};
    const fn = rec.function && typeof rec.function === "object" ? (rec.function as JsonRecord) : {};
    const name = typeof rec.name === "string" ? rec.name : typeof fn.name === "string" ? fn.name : "";
    if (name) names.push(name);
  }
  return names.sort();
}

export function computeFingerprintHash(input: {
  apiKeyId: string | null;
  model: string | null;
  turns: CanonicalTurn[];
  toolNames: string[];
}): string {
  const firstText = extractSystemOrFirstUserText(input.turns);
  const parts = [
    input.apiKeyId ?? "",
    input.model ?? "",
    firstText ? hashShort(firstText) : "",
    input.toolNames.join(","),
  ];
  // NOTE: no connectionId — conversation identity must not depend on which
  // upstream connection this particular turn happened to be routed to.
  return hashHex(parts.join("|"));
}

// ── Bounded turn hash (continuation check, O(1) on very long histories) ──
//
// A history of 100k+ tokens (observed in real traffic) makes hashing the
// FULL turn array on every request expensive. Instead hash a bounded
// projection: total turn count, the role sequence (cheap - one char per
// turn), and the text of the first 2 and last 3 turns. This is a documented
// heuristic trade-off: two histories differing ONLY in an untouched middle
// section, with the same length, would collide. Accepted for the O(1) cost
// bound; see conversationTracker.test.ts for the explicit test pinning this
// known limitation.
const HEAD_TURNS = 2;
const TAIL_TURNS = 3;

export function hashTurnsBounded(turns: CanonicalTurn[]): string {
  const head = turns.slice(0, HEAD_TURNS);
  const tail = turns.length > HEAD_TURNS ? turns.slice(-TAIL_TURNS) : [];
  const roleSequence = turns.map((t) => t.role[0]).join("");
  const parts = [
    String(turns.length),
    roleSequence,
    ...head.map((t) => t.text),
    ...tail.map((t) => t.text),
  ];
  return hashHex(parts.join(""));
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
    turns,
    toolNames,
  });

  const candidates = findAgenticConversationsByFingerprint(fingerprintHash);
  for (const candidate of candidates) {
    // A genuine continuation always strictly grows the history (the client
    // appends at least the assistant's reply plus a new turn) — same-length
    // must never match, or two independent single-shot requests with
    // byte-identical content (a client retry, or two unrelated conversations
    // that both just say "hi") would merge into one conversation.
    if (turns.length <= candidate.lastMessageCount) continue;
    const truncated = turns.slice(0, candidate.lastMessageCount);
    if (hashTurnsBounded(truncated) === candidate.lastMessagesHash) {
      updateAgenticConversation(candidate.id, {
        lastMessageCount: turns.length,
        lastMessagesHash: hashTurnsBounded(turns),
        turnCount: candidate.turnCount + 1,
      });
      return { conversationId: candidate.id, isNewConversation: false };
    }
  }

  const id = `conv_${randomUUID()}`;
  createAgenticConversation({
    id,
    apiKeyId: input.apiKeyId,
    fingerprintHash,
    lastMessageCount: turns.length,
    lastMessagesHash: hashTurnsBounded(turns),
  });
  return { conversationId: id, isNewConversation: true };
}
