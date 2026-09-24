/**
 * SYNTX.ai chat_uuid continuity — OpenAI multi-turn history maps onto one
 * SYNTX chat. Cache miss creates a new chat; follow-ups reuse the uuid and
 * send only the last user turn (SYNTX already holds prior turns).
 */
import { createHash } from "node:crypto";

const SESSION_MAX_AGE_MS = 6 * 3600_000;
/** First-turn OpenCode/AI-SDK retries land within seconds; do not pin /new forever. */
const SESSION_PENDING_MAX_AGE_MS = 3 * 60_000;
const SESSION_MAX_ENTRIES = 300;

/** SYNTX chats cap at ~800 messages; roll to a new uuid before that. */
export const SYNTX_CHAT_MESSAGE_LIMIT = 800;
/** Force a new chat after this many successful generates on the same uuid. */
export const SYNTX_CHAT_ROLLOVER_TURNS = 700;

export type SyntxChatMessage = {
  role: string;
  content: unknown;
};

type SessionEntry = { chatUuid: string; ts: number; pending?: boolean };
type ChatToolsEntry = { fingerprint: string; ts: number };

const sessions = new Map<string, SessionEntry>();
const chatTools = new Map<string, ChatToolsEntry>();
const chatGenerateCounts = new Map<string, { count: number; ts: number }>();
const postedGenerates = new Map<string, { ts: number }>();
const createLocks = new Map<string, Promise<string>>();

const PINNED_TASK_MARKERS = ["My current task: ", "Current request: "] as const;

/**
 * Some OpenAI clients pin catalog/instructions onto the last user turn. Claude
 * Code keeps the *original* user text in history, so hashing the pinned blob
 * makes the next (tool-result) request miss the chat_uuid cache and SYNTX
 * opens a new chat whose first message is the tool dump.
 */
export function canonicalizeSyntxUserText(text: string): string {
  let t = (text || "").trim();
  if (!t) return "";
  for (const marker of PINNED_TASK_MARKERS) {
    const idx = t.lastIndexOf(marker);
    if (idx >= 0) {
      t = t.slice(idx + marker.length).trim();
      break;
    }
  }
  return t.replace(/\s+/g, " ").trim();
}

export function extractSyntxMessageText(content: unknown): string {
  if (typeof content === "string") return content;
  if (content && typeof content === "object" && !Array.isArray(content)) {
    const rec = content as Record<string, unknown>;
    if (typeof rec.text === "string" && rec.text) return rec.text;
    if (typeof rec.content === "string" && rec.content) return rec.content;
    if (Array.isArray(rec.content)) return extractSyntxMessageText(rec.content);
    if (Array.isArray(rec.parts)) return extractSyntxMessageText(rec.parts);
  }
  if (!Array.isArray(content)) return "";
  const parts: string[] = [];
  for (const part of content) {
    if (typeof part === "string") {
      if (part) parts.push(part);
      continue;
    }
    if (!part || typeof part !== "object") continue;
    const rec = part as Record<string, unknown>;
    const type = typeof rec.type === "string" ? rec.type.toLowerCase() : "";
    if (type === "tool_result" || type === "function_result") {
      const inner =
        extractSyntxMessageText(rec.content) ||
        extractSyntxMessageText(rec.output) ||
        (typeof rec.content === "string" ? rec.content : "");
      if (inner) parts.push(inner);
      continue;
    }
    if (typeof rec.text === "string" && rec.text) parts.push(rec.text);
    else if (typeof rec.content === "string" && rec.content) parts.push(rec.content);
  }
  return parts.join("\n");
}

export function conversationPrefixBeforeLastUser(messages: SyntxChatMessage[]): SyntxChatMessage[] {
  if (!messages.length) return [];
  let lastUser = -1;
  for (let i = messages.length - 1; i >= 0; i--) {
    const role = (messages[i]?.role || "").toLowerCase();
    if (role === "user") {
      lastUser = i;
      break;
    }
  }
  if (lastUser <= 0) return [];
  return messages.slice(0, lastUser);
}

export function lastUserMessage(messages: SyntxChatMessage[]): SyntxChatMessage | null {
  for (let i = messages.length - 1; i >= 0; i--) {
    if ((messages[i]?.role || "").toLowerCase() === "user") return messages[i];
  }
  return null;
}

export function hashSyntxConversation(fingerprint: string, model: string, messages: SyntxChatMessage[]): string {
  const payload = messages
    .map((message) => {
      const role = (message.role || "").toLowerCase();
      let text = extractSyntxMessageText(message.content);
      if (role === "user" || role === "human") text = canonicalizeSyntxUserText(text);
      return `${role}:${text}`;
    })
    .join("\n");
  return createHash("sha256").update(`${fingerprint}|${model}|${payload}`).digest("hex");
}

function readSession(key: string): string | null {
  const entry = sessions.get(key);
  if (!entry) return null;
  const maxAge = entry.pending ? SESSION_PENDING_MAX_AGE_MS : SESSION_MAX_AGE_MS;
  if (Date.now() - entry.ts > maxAge) {
    sessions.delete(key);
    return null;
  }
  return entry.chatUuid;
}

export function lookupSyntxChatUuid(key: string): string | null {
  return readSession(key);
}

export function syntxUserSpine(messages: SyntxChatMessage[]): SyntxChatMessage[] {
  const spine: SyntxChatMessage[] = [];
  for (const message of messages) {
    const role = (message?.role || "").toLowerCase();
    if (role !== "user" && role !== "human") continue;
    spine.push({
      role: "user",
      content: canonicalizeSyntxUserText(extractSyntxMessageText(message.content)),
    });
  }
  return spine;
}

export function firstCanonicalSyntxUserText(messages: SyntxChatMessage[]): string {
  const spine = syntxUserSpine(messages);
  return typeof spine[0]?.content === "string" ? spine[0].content : "";
}

export function lastUserTextForReset(messages: SyntxChatMessage[]): string {
  const last = lastUserMessage(messages);
  return last ? extractSyntxMessageText(last.content) : "";
}

/**
 * Claude Code types /new or /clear and injects a local-command XML envelope as
 * the user turn (sometimes still with prior messages attached). That must open
 * a new SYNTX chat — never a follow-up on the previous uuid.
 */
export function looksLikeClaudeCodeSessionReset(text: string): boolean {
  const t = (text || "").trim();
  if (!t) return false;
  if (/<command-name>\s*\/(?:new|clear)\s*<\/command-name>/i.test(t)) return true;
  if (/<command-message>\s*(?:new|clear)\s*<\/command-message>/i.test(t)) return true;
  if (t.includes("<local-command-caveat>") && /<\/command-name>/i.test(t) && /\/(?:new|clear)/i.test(t)) {
    return true;
  }
  return false;
}

/** Drop the local-command XML so the new SYNTX chat starts with the real user text. */
export function stripClaudeCodeLocalCommandEnvelope(text: string): string {
  let t = text || "";
  t = t.replace(/<local-command-caveat>[\s\S]*?<\/local-command-caveat>/gi, "");
  t = t.replace(/<command-name>[\s\S]*?<\/command-name>/gi, "");
  t = t.replace(/<command-message>[\s\S]*?<\/command-message>/gi, "");
  t = t.replace(/<command-args>[\s\S]*?<\/command-args>/gi, "");
  t = t.replace(/<local-command-stdout>[\s\S]*?<\/local-command-stdout>/gi, "");
  t = t.replace(/<local-command-stderr>[\s\S]*?<\/local-command-stderr>/gi, "");
  return t.replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
}

export function isSyntxFollowUpHistory(messages: SyntxChatMessage[]): boolean {
  for (const message of messages || []) {
    const role = (message?.role || "").toLowerCase();
    if (role === "assistant" || role === "model" || role === "tool" || role === "function") return true;
    if (role === "user" || role === "human") {
      const content = message.content;
      if (Array.isArray(content)) {
        for (const part of content) {
          if (!part || typeof part !== "object") continue;
          const type = String((part as Record<string, unknown>).type || "").toLowerCase();
          if (type === "tool_result" || type === "function_result") return true;
        }
      }
    }
  }
  return false;
}

/** After /new|/clear, session memory must only see the new first user turn. */
export function syntxMessagesForNewSession(messages: SyntxChatMessage[]): SyntxChatMessage[] {
  const raw = lastUserTextForReset(messages);
  const stripped = stripClaudeCodeLocalCommandEnvelope(raw) || canonicalizeSyntxUserText(raw) || raw.trim();
  return [{ role: "user", content: stripped || "hi" }];
}

export function lookupSyntxChatUuidForMessages(
  fingerprint: string,
  model: string,
  messages: SyntxChatMessage[]
): string | null {
  // Claude Code /new and /clear arrive as a user turn with a local-command envelope.
  // Never glue that onto the previous SYNTX chat_uuid.
  if (looksLikeClaudeCodeSessionReset(lastUserTextForReset(messages))) return null;

  // OpenCode / AI SDK abort+retry resends the identical first-turn body (or the
  // same body plus an empty assistant chunk) every few seconds. Exact-hash hits
  // the pending uuid from createChat so we do not spawn a new SYNTX thread.
  const exact = lookupSyntxChatUuid(hashSyntxConversation(fingerprint, model, messages));
  if (exact) return exact;

  // No assistant/tool history = a brand-new client session (including /new with
  // the same first words as last time, e.g. "hi"). System prompts match across
  // sessions, so prefix-hash must not reuse here.
  if (!isSyntxFollowUpHistory(messages)) return null;

  const prefix = conversationPrefixBeforeLastUser(messages);
  if (prefix.length > 0) {
    const hit = lookupSyntxChatUuid(hashSyntxConversation(fingerprint, model, prefix));
    if (hit) return hit;
  }
  const spine = syntxUserSpine(messages);
  if (spine.length > 0) {
    const hit = lookupSyntxChatUuid(hashSyntxConversation(fingerprint, model, spine));
    if (hit) return hit;
  }
  if (spine.length > 1) {
    const hit = lookupSyntxChatUuid(hashSyntxConversation(fingerprint, model, spine.slice(0, -1)));
    if (hit) return hit;
  }
  // First-user identity survives a catalog pin vs client-original, and tool-result
  // turns that add a trailing user/tool message the first request never had.
  const firstUser = firstCanonicalSyntxUserText(messages);
  if (firstUser) {
    const hit = lookupSyntxChatUuid(
      hashSyntxConversation(fingerprint, model, [{ role: "user", content: firstUser }])
    );
    if (hit) return hit;
  }
  return null;
}

/** Compact / handoff retry: reuse the original uuid by first-user identity, even without follow-up history. */
export function lookupSyntxContinueChatUuid(
  fingerprint: string,
  model: string,
  firstUserText: string
): string | null {
  const first = canonicalizeSyntxUserText(firstUserText);
  if (!first) return null;
  return lookupSyntxChatUuid(hashSyntxConversation(fingerprint, model, [{ role: "user", content: first }]));
}

export function rememberSyntxChatUuid(key: string, chatUuid: string, pending = false): void {
  if (!key || !chatUuid) return;
  sessions.set(key, { chatUuid, ts: Date.now(), pending: pending || undefined });
  if (sessions.size <= SESSION_MAX_ENTRIES) return;
  let oldestKey: string | null = null;
  let oldestTs = Infinity;
  for (const [k, v] of sessions) {
    if (v.ts < oldestTs) {
      oldestTs = v.ts;
      oldestKey = k;
    }
  }
  if (oldestKey) sessions.delete(oldestKey);
}

/** Remember the exact first-turn hash at createChat so OpenCode retries reuse the uuid. */
export function rememberSyntxPendingRequest(
  fingerprint: string,
  model: string,
  messages: SyntxChatMessage[],
  chatUuid: string
): void {
  if (!chatUuid || !messages?.length) return;
  rememberSyntxChatUuid(hashSyntxConversation(fingerprint, model, messages), chatUuid, true);
  // OpenCode abort retries often append an empty assistant chunk, so prefix-before-last-user
  // is only the system prompt. First-user identity (pending TTL) still joins those retries.
  const first = firstCanonicalSyntxUserText(messages);
  if (first) {
    rememberSyntxChatUuid(
      hashSyntxConversation(fingerprint, model, [{ role: "user", content: first }]),
      chatUuid,
      true
    );
  }
}

export function forgetSyntxPendingExact(
  fingerprint: string,
  model: string,
  messages: SyntxChatMessage[]
): void {
  const keys = [hashSyntxConversation(fingerprint, model, messages)];
  const first = firstCanonicalSyntxUserText(messages);
  if (first) {
    keys.push(hashSyntxConversation(fingerprint, model, [{ role: "user", content: first }]));
  }
  for (const key of keys) {
    const entry = sessions.get(key);
    if (entry?.pending) sessions.delete(key);
  }
}

export function markSyntxGeneratePosted(chatUuid: string): void {
  if (!chatUuid) return;
  postedGenerates.set(chatUuid, { ts: Date.now() });
  if (postedGenerates.size <= SESSION_MAX_ENTRIES) return;
  let oldestKey: string | null = null;
  let oldestTs = Infinity;
  for (const [k, v] of postedGenerates) {
    if (v.ts < oldestTs) {
      oldestTs = v.ts;
      oldestKey = k;
    }
  }
  if (oldestKey) postedGenerates.delete(oldestKey);
}

export function hasSyntxGeneratePosted(chatUuid: string | null | undefined): boolean {
  if (!chatUuid) return false;
  const entry = postedGenerates.get(chatUuid);
  if (!entry) return false;
  if (Date.now() - entry.ts > SESSION_MAX_AGE_MS) {
    postedGenerates.delete(chatUuid);
    return false;
  }
  return true;
}

/**
 * Two OpenCode retries can race createChat before either remembers a uuid.
 * Coalesce on the exact conversation hash so they share one SYNTX thread.
 */
export async function coalesceSyntxChatCreate(
  key: string,
  factory: () => Promise<string>
): Promise<string> {
  if (!key) return factory();
  const existing = lookupSyntxChatUuid(key);
  if (existing) return existing;
  const inflight = createLocks.get(key);
  if (inflight) return inflight;
  const pending = (async () => {
    try {
      const again = lookupSyntxChatUuid(key);
      if (again) return again;
      const uuid = await factory();
      if (uuid) rememberSyntxChatUuid(key, uuid, true);
      return uuid;
    } finally {
      createLocks.delete(key);
    }
  })();
  createLocks.set(key, pending);
  return pending;
}

export function rememberSyntxFollowUp(
  fingerprint: string,
  model: string,
  messages: SyntxChatMessage[],
  assistantText: string,
  chatUuid: string
): void {
  const prefix = conversationPrefixBeforeLastUser(messages);
  if (prefix.length > 0) {
    rememberSyntxChatUuid(hashSyntxConversation(fingerprint, model, prefix), chatUuid);
  }
  const next = [
    ...messages.map((message) => ({ role: message.role, content: extractSyntxMessageText(message.content) })),
    { role: "assistant", content: assistantText },
  ];
  rememberSyntxChatUuid(hashSyntxConversation(fingerprint, model, next), chatUuid);
  const spine = syntxUserSpine(messages);
  if (spine.length > 0) {
    rememberSyntxChatUuid(hashSyntxConversation(fingerprint, model, spine), chatUuid);
    rememberSyntxChatUuid(hashSyntxConversation(fingerprint, model, [spine[0]]), chatUuid);
  }
}

export function getSyntxInjectedToolsFingerprint(chatUuid: string): string | null {
  if (!chatUuid) return null;
  const entry = chatTools.get(chatUuid);
  if (!entry) return null;
  if (Date.now() - entry.ts > SESSION_MAX_AGE_MS) {
    chatTools.delete(chatUuid);
    return null;
  }
  return entry.fingerprint;
}

function pruneGenerateCounts(): void {
  if (chatGenerateCounts.size <= SESSION_MAX_ENTRIES) return;
  let oldestKey: string | null = null;
  let oldestTs = Infinity;
  for (const [k, v] of chatGenerateCounts) {
    if (v.ts < oldestTs) {
      oldestTs = v.ts;
      oldestKey = k;
    }
  }
  if (oldestKey) chatGenerateCounts.delete(oldestKey);
}

/** Count a successful generate against a live SYNTX chat_uuid (not isolated compact). */
export function noteSyntxGenerate(chatUuid: string): number {
  if (!chatUuid) return 0;
  const prev = chatGenerateCounts.get(chatUuid);
  const next = { count: (prev?.count ?? 0) + 1, ts: Date.now() };
  chatGenerateCounts.set(chatUuid, next);
  pruneGenerateCounts();
  return next.count;
}

export function getSyntxChatGenerateCount(chatUuid: string | null | undefined): number {
  if (!chatUuid) return 0;
  return chatGenerateCounts.get(chatUuid)?.count ?? 0;
}

export function shouldRolloverSyntxChat(chatUuid: string | null | undefined): boolean {
  return getSyntxChatGenerateCount(chatUuid) >= SYNTX_CHAT_ROLLOVER_TURNS;
}

export function __setSyntxChatGenerateCountForTests(chatUuid: string, count: number): void {
  if (!chatUuid) return;
  chatGenerateCounts.set(chatUuid, { count: Math.max(0, count), ts: Date.now() });
}

export function rememberSyntxInjectedTools(chatUuid: string, fingerprint: string): void {
  if (!chatUuid || !fingerprint) return;
  chatTools.set(chatUuid, { fingerprint, ts: Date.now() });
  if (chatTools.size <= SESSION_MAX_ENTRIES) return;
  let oldestKey: string | null = null;
  let oldestTs = Infinity;
  for (const [k, v] of chatTools) {
    if (v.ts < oldestTs) {
      oldestTs = v.ts;
      oldestKey = k;
    }
  }
  if (oldestKey) chatTools.delete(oldestKey);
}

export function __resetSyntxSessionsForTests(): void {
  sessions.clear();
  chatTools.clear();
  chatGenerateCounts.clear();
  postedGenerates.clear();
  createLocks.clear();
}
