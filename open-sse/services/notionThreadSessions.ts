/**
 * Notion AI Web — thread session continuity (OpenAI multi-turn → one Notion chat).
 *
 * Extracted from `executors/notion-web.ts` (file-size gate) — everything needed to
 * bind an OpenAI-style multi-turn conversation to a single Notion `threadId`
 * instead of minting a fresh Notion chat on every request. See
 * `executors/notion-web.ts` for the upstream transcript/response translation
 * that consumes this module.
 *
 * - History-keyed in-memory session cache (spaceId + conversation prefix hash),
 *   backed by an on-disk snapshot under DATA_DIR so continuity survives restarts.
 * - Sticky root binding written *before* the upstream call so error retries never
 *   mint a second Notion chat for the same conversation.
 * - Optional client-supplied continuity via body (`notion_thread_id`/`thread_id`)
 *   or the `X-Notion-Thread-Id` header (via `ExecuteInput.clientHeaders`).
 */
import { randomUUID, createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

export interface NotionMessage {
  role: string;
  /** OpenAI string content OR content-parts array — normalized by extractNotionMessageText. */
  content: unknown;
}

/** Minimal shape readClientThreadId needs from the OpenAI-style request body. */
export interface NotionThreadRequestBody {
  notion_thread_id?: string;
  thread_id?: string;
}

/**
 * Normalize OpenAI-style message content to a plain string.
 * Accepts a string or content-parts array (`{ type:"text", text }` / `{ text }`).
 * Previously only string content was accepted — array-shaped system/user messages
 * (common from agent clients) were silently dropped, so system/jailbreak/agentic
 * injects never reached Notion when any message used parts.
 */
export function extractNotionMessageText(content: unknown): string {
  if (typeof content === "string") return content;
  if (!Array.isArray(content)) return "";
  const parts: string[] = [];
  for (const p of content) {
    if (typeof p === "string") {
      if (p) parts.push(p);
      continue;
    }
    if (!p || typeof p !== "object") continue;
    const o = p as Record<string, unknown>;
    if (typeof o.text === "string" && o.text) parts.push(o.text);
    else if (typeof o.content === "string" && o.content) parts.push(o.content);
  }
  return parts.join("\n");
}

const THREAD_SESSION_MAX_AGE_MS = 6 * 3600_000; // 6h — agent tool loops can be long
const THREAD_SESSION_MAX_ENTRIES = 500;

interface ThreadSessionEntry {
  threadId: string;
  ts: number;
  /** True once we successfully completed at least one turn on this thread. */
  confirmed?: boolean;
  /** True once we issued createThread:true for this threadId (even if the reply failed). */
  createAttempted?: boolean;
}

/** In-memory map: conversation key → Notion threadId. Backed by DATA_DIR when available. */
const threadSessionCache = new Map<string, ThreadSessionEntry>();
let threadStoreLoaded = false;
let threadStoreDirty = false;
let threadStoreTimer: ReturnType<typeof setTimeout> | null = null;

function getThreadStorePath(): string | null {
  try {
    const dataDir =
      process.env.DATA_DIR ||
      process.env.OMNIROUTE_DATA_DIR ||
      process.env.VIBEPROXY_DATA_DIR ||
      "";
    if (!dataDir) return null;
    return join(dataDir, "notion-web-thread-sessions.json");
  } catch {
    return null;
  }
}

function loadThreadStoreFromDisk(): void {
  if (threadStoreLoaded) return;
  threadStoreLoaded = true;
  const path = getThreadStorePath();
  if (!path || !existsSync(path)) return;
  try {
    const raw = readFileSync(path, "utf8");
    const parsed = JSON.parse(raw) as Record<string, ThreadSessionEntry>;
    const now = Date.now();
    for (const [k, v] of Object.entries(parsed || {})) {
      if (!v?.threadId || typeof v.ts !== "number") continue;
      if (now - v.ts > THREAD_SESSION_MAX_AGE_MS) continue;
      threadSessionCache.set(k, v);
    }
  } catch {
    // corrupt store — start fresh
  }
}

function scheduleThreadStoreFlush(): void {
  threadStoreDirty = true;
  if (threadStoreTimer) return;
  threadStoreTimer = setTimeout(() => {
    threadStoreTimer = null;
    flushThreadStoreToDisk();
  }, 250);
  // Don't keep the process alive solely for the flush.
  if (typeof threadStoreTimer === "object" && threadStoreTimer && "unref" in threadStoreTimer) {
    try {
      (threadStoreTimer as NodeJS.Timeout).unref();
    } catch {
      /* ignore */
    }
  }
}

function flushThreadStoreToDisk(): void {
  if (!threadStoreDirty) return;
  const path = getThreadStorePath();
  if (!path) return;
  try {
    const dir = dirname(path);
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    const obj: Record<string, ThreadSessionEntry> = {};
    for (const [k, v] of threadSessionCache) obj[k] = v;
    writeFileSync(path, JSON.stringify(obj), "utf8");
    threadStoreDirty = false;
  } catch {
    // best-effort persistence
  }
}

/** Exported for unit tests. */
export function __resetNotionThreadSessionsForTests(): void {
  threadSessionCache.clear();
  threadStoreLoaded = true; // skip disk reload in tests
  threadStoreDirty = false;
  if (threadStoreTimer) {
    clearTimeout(threadStoreTimer);
    threadStoreTimer = null;
  }
}

/**
 * Normalize user/assistant text for thread-cache hashing.
 *
 * SkillsManager / OpenAI clients keep the *original* user text in history, while
 * VibeProxy agentic conversion may rewrite the last user turn (UREW pin with
 * "My current task: …"). Without normalization, turn-2 lookup never matches
 * turn-1 store → createThread:true every request (new Notion chat each time).
 */
export function normalizeNotionContentForHash(content: unknown): string {
  let text = extractNotionMessageText(content).replace(/\r\n/g, "\n").trim();
  if (!text) return "";

  // Agentic / UREW pin: keep only the stable task suffix when present.
  const taskMarkers = ["My current task:", "my current task:"];
  for (const marker of taskMarkers) {
    const idx = text.lastIndexOf(marker);
    if (idx >= 0) {
      text = text.slice(idx + marker.length).trim();
      break;
    }
  }

  // Drop other common agentic preamble fingerprints if the whole pin leaked in.
  if (text.includes("local workflow automation tool") || text.includes("clipboard parser")) {
    const intentIdx = text.lastIndexOf("Intent:");
    // Prefer last non-empty line after stripping long preambles
    const lines = text
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);
    if (lines.length > 0) text = lines[lines.length - 1]!;
    void intentIdx;
  }

  return text.replace(/\s+/g, " ").trim();
}

/** FNV-1a style hash of spaceId + normalized message list (conversation prefix). */
export function hashNotionConversation(spaceId: string, msgs: NotionMessage[]): string {
  const parts = [
    `space:${spaceId}`,
    ...msgs.map((h) => `${(h.role || "").toLowerCase()}:${normalizeNotionContentForHash(h.content)}`),
  ];
  const raw = parts.join("\n");
  let hash = 0x811c9dc5;
  for (let i = 0; i < raw.length; i++) {
    hash ^= raw.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return hash.toString(16).padStart(8, "0");
}

/** Everything before the last user message (empty ⇒ first user turn / new thread). */
export function conversationPrefixBeforeLastUser(messages: NotionMessage[]): NotionMessage[] {
  if (!messages.length) return [];
  let lastUser = -1;
  for (let i = messages.length - 1; i >= 0; i--) {
    const role = (messages[i]?.role || "").toLowerCase();
    if (role === "user" || role === "human") {
      lastUser = i;
      break;
    }
  }
  if (lastUser <= 0) return [];
  return messages.slice(0, lastUser);
}

function readThreadSessionEntry(key: string): ThreadSessionEntry | null {
  loadThreadStoreFromDisk();
  const entry = threadSessionCache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.ts > THREAD_SESSION_MAX_AGE_MS) {
    threadSessionCache.delete(key);
    scheduleThreadStoreFlush();
    return null;
  }
  return entry;
}

function readThreadSession(key: string): string | null {
  return readThreadSessionEntry(key)?.threadId ?? null;
}

function putThreadSession(
  key: string,
  threadId: string,
  flags: { confirmed?: boolean; createAttempted?: boolean } = {}
): void {
  loadThreadStoreFromDisk();
  const prev = threadSessionCache.get(key);
  threadSessionCache.set(key, {
    threadId,
    ts: Date.now(),
    confirmed: flags.confirmed ?? prev?.confirmed ?? false,
    createAttempted: flags.createAttempted ?? prev?.createAttempted ?? false,
  });
  // Evict oldest if over cap
  if (threadSessionCache.size > THREAD_SESSION_MAX_ENTRIES) {
    let oldestKey: string | null = null;
    let oldestTs = Infinity;
    for (const [k, v] of threadSessionCache) {
      if (v.ts < oldestTs) {
        oldestTs = v.ts;
        oldestKey = k;
      }
    }
    if (oldestKey) threadSessionCache.delete(oldestKey);
  }
  scheduleThreadStoreFlush();
}

/** Root sticky key for a conversation (space/agent + first user turn). */
export function notionThreadRootKey(spaceKey: string, messages: NotionMessage[]): string | null {
  const first = firstUserMessage(messages);
  if (!first) return null;
  return `root:${hashNotionConversation(spaceKey, [first])}`;
}

/**
 * Resolve which Notion thread to use and whether to mint a new one.
 * - Sticky root binding is written *before* the upstream call so errors/retries
 *   never open a second Notion chat for the same conversation.
 * - Any prior assistant history forces createThread:false when a sticky id exists.
 */
export function resolveNotionThreadBinding(
  spaceKey: string,
  messages: NotionMessage[],
  clientThreadId?: string
): { threadId: string; createThread: boolean; rootKey: string | null } {
  loadThreadStoreFromDisk();
  const rootKey = notionThreadRootKey(spaceKey, messages);
  const hasHistory = conversationHasAssistant(messages);

  if (clientThreadId && clientThreadId.trim()) {
    const id = clientThreadId.trim();
    if (rootKey) putThreadSession(rootKey, id, { createAttempted: true });
    return { threadId: id, createThread: false, rootKey };
  }

  // Prefer sticky root (survives UREW rewrites + error retries)
  if (rootKey) {
    const sticky = readThreadSessionEntry(rootKey);
    if (sticky?.threadId) {
      // Touch TTL
      putThreadSession(rootKey, sticky.threadId, {
        confirmed: sticky.confirmed,
        createAttempted: sticky.createAttempted,
      });
      // If we already attempted create for this root, never create again
      // (even when the first reply failed — Notion may already have the thread).
      const createThread = !sticky.createAttempted && !sticky.confirmed && !hasHistory;
      return {
        threadId: sticky.threadId,
        createThread,
        rootKey,
      };
    }
  }

  // Exact prefix match (full history before last user)
  const prefix = conversationPrefixBeforeLastUser(messages);
  if (prefix.length > 0) {
    const exactId = readThreadSession(hashNotionConversation(spaceKey, prefix));
    if (exactId) {
      if (rootKey) putThreadSession(rootKey, exactId, { createAttempted: true, confirmed: true });
      return { threadId: exactId, createThread: false, rootKey };
    }
  }

  // Mint a new thread id and bind it immediately (optimistic) so concurrent /
  // failed retries reuse the same id instead of spam-creating Notion chats.
  const threadId = randomUUID();
  if (rootKey) {
    putThreadSession(rootKey, threadId, {
      createAttempted: false,
      confirmed: false,
    });
  }
  // Multi-turn history without sticky (e.g. process restart): still create once
  // with the full transcript so the agent can continue in a fresh Notion chat.
  return { threadId, createThread: true, rootKey };
}

/** Mark that we sent createThread:true for this root (even if the body errored). */
export function notionThreadMarkCreateAttempted(rootKey: string | null, threadId: string): void {
  if (!rootKey || !threadId) return;
  putThreadSession(rootKey, threadId, { createAttempted: true });
}

/** Mark successful inference on this thread. */
export function notionThreadMarkConfirmed(rootKey: string | null, threadId: string): void {
  if (!rootKey || !threadId) return;
  putThreadSession(rootKey, threadId, { createAttempted: true, confirmed: true });
}

function firstUserMessage(messages: NotionMessage[]): NotionMessage | null {
  for (const m of messages) {
    const role = (m?.role || "").toLowerCase();
    if (role === "user" || role === "human") return m;
  }
  return null;
}

function conversationHasAssistant(messages: NotionMessage[]): boolean {
  return messages.some((m) => {
    const role = (m?.role || "").toLowerCase();
    return role === "assistant" || role === "ai" || role === "model";
  });
}

/** Lookup-only (does not mint). Used by tests and diagnostics. */
export function notionThreadSessionLookup(spaceId: string, messages: NotionMessage[]): string | null {
  loadThreadStoreFromDisk();
  const rootKey = notionThreadRootKey(spaceId, messages);
  if (rootKey) {
    const sticky = readThreadSession(rootKey);
    if (sticky) return sticky;
  }
  const prefix = conversationPrefixBeforeLastUser(messages);
  if (prefix.length === 0) return null;
  return readThreadSession(hashNotionConversation(spaceId, prefix));
}

/**
 * After a successful turn, remember threadId under the completed conversation
 * (request messages + this assistant reply) so the next OpenAI multi-turn request
 * whose prefix matches that history reuses the same Notion chat.
 */
export function notionThreadSessionStore(
  spaceId: string,
  messages: NotionMessage[],
  assistantText: string,
  threadId: string
): void {
  if (!threadId || !spaceId) return;
  const full: NotionMessage[] = [...messages, { role: "assistant", content: assistantText }];
  putThreadSession(hashNotionConversation(spaceId, full), threadId, {
    confirmed: true,
    createAttempted: true,
  });

  // Root key for agent multi-turn clients that keep original user wording.
  const rootKey = notionThreadRootKey(spaceId, messages);
  if (rootKey) {
    putThreadSession(rootKey, threadId, { confirmed: true, createAttempted: true });
  }
  void assistantText;
}

/** Client-supplied thread continuity pin: body (`notion_thread_id`/`thread_id`) or
 * the `X-Notion-Thread-Id` header (case-insensitive). */
/**
 * A Notion page/thread id is a UUID (32 hex chars, dashed or undashed). Reject
 * anything else so a client cannot pin/poison the session cache with an arbitrary
 * string (defense against cross-tenant thread-id injection — see #7900 review).
 */
export function isValidNotionThreadId(id: string): boolean {
  const t = id.trim().replace(/-/g, "");
  return /^[0-9a-f]{32}$/i.test(t);
}

export function readClientThreadId(
  body: NotionThreadRequestBody,
  headers?: Record<string, string>
): string {
  const fromBody =
    (typeof body.notion_thread_id === "string" && body.notion_thread_id.trim()) ||
    (typeof body.thread_id === "string" && body.thread_id.trim()) ||
    "";
  if (fromBody) return isValidNotionThreadId(fromBody) ? fromBody : "";
  if (!headers) return "";
  for (const [k, v] of Object.entries(headers)) {
    if (k.toLowerCase() === "x-notion-thread-id" && typeof v === "string" && v.trim()) {
      const h = v.trim();
      return isValidNotionThreadId(h) ? h : "";
    }
  }
  return "";
}

/**
 * Short FNV-1a hash of a caller's Notion cookie, used to namespace the thread-session
 * cache PER CALLER. Without this, two users of the SAME Notion space share one cache
 * key (spaceId is space-, not user-scoped), so one user's thread could be served to
 * another (cross-tenant IDOR, #7900 review). The raw cookie is never stored — only this
 * non-reversible digest.
 */
export function hashNotionCallerCookie(cookie: string): string {
  const raw = (cookie || "").trim();
  if (!raw) return "anon";
  // SHA-256 (128-bit prefix) rather than a 32-bit FNV digest: this hash is a
  // SECURITY boundary (per-caller cache isolation), so it must be collision-
  // resistant — a 32-bit space is birthday-crackable, letting an attacker craft
  // a cookie that lands in a victim's namespace. crypto SHA-256 makes both
  // accidental and crafted collisions infeasible; the raw cookie is never stored.
  return createHash("sha256").update(raw).digest("hex").slice(0, 32);
}
