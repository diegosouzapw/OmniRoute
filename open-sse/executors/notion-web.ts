/**
 * NotionWebExecutor — Notion AI Web Session Provider (Unofficial/Experimental)
 *
 * Notion AI has no public, documented inference API (see issue #3272, closed
 * by the owner for that reason). This executor reverse-engineers the same
 * cookie-authenticated internal endpoint used by open-source bridges
 * (notion2api / Notion2API-go, cited in issue #6758): a `token_v2` session
 * cookie posted to `POST /api/v3/runInferenceTranscript`.
 *
 * Live capture (2026-07-19 / 2026-07-20) against a Business workspace confirmed:
 *   - First turn: createThread: true + a fresh threadId
 *     (createThread:false without a known threadId → ValidationError 400)
 *   - Follow-ups: createThread: false + the SAME threadId + full transcript
 *     (OpenAI multi-turn messages[] maps to one Notion AI chat; a new UUID
 *     every request forces a new chat and breaks agent/tool continuity)
 *   - transcript starts with config + context, then user/assistant steps
 *   - x-notion-space-id + x-notion-active-user-header required
 *   - response is NDJSON patch-start / patch / record-map (not legacy rich-text
 *     tuples alone). Text is extracted from agent-inference / markdown-chat.
 *
 * Streaming is still pseudo-streaming: read full body, parse, emit one SSE
 * chunk — safer than assuming unverified incremental-delta semantics.
 *
 * Auth: Cookie-based (token_v2 [+ optional space_id, notion_browser_id, user_id])
 * Method: Direct fetch — no browser automation required.
 */
import { randomUUID } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { BaseExecutor, type ExecuteInput } from "./base.ts";
import { makeExecutorErrorResult as makeErrorResult } from "../utils/error.ts";
import {
  BROWSER_HEADERS,
  extractNotionUserIdFromCookie,
  resolveNotionCodename,
  resolveNotionRuntimeWorkspace,
} from "../services/notionWebModels.ts";

// ─── Constants ──────────────────────────────────────────────────────────────

// Both app.notion.com and www.notion.so work; prefer the AI surface host.
const BASE_URL = "https://app.notion.com";
const NOTION_URL = `${BASE_URL}/api/v3/runInferenceTranscript`;
const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36";
const NOTION_CLIENT_VERSION = "23.13.20260719.1125";

// ─── Types ──────────────────────────────────────────────────────────────────

interface NotionMessage {
  role: string;
  /** OpenAI string content OR content-parts array — normalized by extractNotionMessageText. */
  content: unknown;
}

interface NotionRequestBody {
  messages?: NotionMessage[];
  model?: string;
  /** Optional client-supplied Notion thread continuity (also via X-Notion-Thread-Id). */
  notion_thread_id?: string;
  thread_id?: string;
}

// ─── Thread session continuity (OpenAI multi-turn → one Notion chat) ────────
// Declared early; helpers that need extractNotionMessageText live near it below.

// ─── Helpers — credential resolution ───────────────────────────────────────

function readCredentialString(value: unknown): string {
  if (typeof value !== "string") return "";
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : "";
}

function readProviderSpecificString(
  providerSpecificData: unknown,
  keys: readonly string[]
): string {
  if (
    !providerSpecificData ||
    typeof providerSpecificData !== "object" ||
    Array.isArray(providerSpecificData)
  ) {
    return "";
  }
  const data = providerSpecificData as Record<string, unknown>;
  for (const key of keys) {
    const value = readCredentialString(data[key]);
    if (value) return value;
  }
  return "";
}

/** Normalize a pasted credential to a `name=value` cookie pair. Accepts a bare
 * token or an already-prefixed `token_v2=...` value. */
export function normalizeNotionCookieInput(raw: string, cookieName = "token_v2"): string {
  const trimmed = raw.trim();
  if (!trimmed) return "";
  return trimmed.includes("=") ? trimmed : `${cookieName}=${trimmed}`;
}

/**
 * Resolve the Cookie header to send upstream. Accepts, in priority order:
 * 1. A full cookie header pasted as `apiKey` or `credentials.cookie`.
 * 2. `providerSpecificData.cookie` (full header).
 * 3. Structured `providerSpecificData.token_v2` (+ optional `space_id`,
 *    `notion_browser_id`), assembled into a cookie header.
 */
export function resolveNotionWebCookie(credentials: ExecuteInput["credentials"]): string {
  const directCookie =
    readCredentialString(credentials?.apiKey) ||
    readCredentialString((credentials as Record<string, unknown> | undefined)?.cookie);
  if (directCookie) return normalizeNotionCookieInput(directCookie);

  const providerSpecificData = credentials?.providerSpecificData;
  const cookie = readProviderSpecificString(providerSpecificData, ["cookie"]);
  if (cookie) return normalizeNotionCookieInput(cookie);

  const tokenV2 = readProviderSpecificString(providerSpecificData, ["token_v2", "tokenV2"]);
  const spaceId = readProviderSpecificString(providerSpecificData, ["space_id", "spaceId"]);
  const userId = readProviderSpecificString(providerSpecificData, [
    "notion_user_id",
    "notionUserId",
    "user_id",
    "userId",
  ]);
  const browserId = readProviderSpecificString(providerSpecificData, [
    "notion_browser_id",
    "notionBrowserId",
  ]);
  return [
    tokenV2 ? normalizeNotionCookieInput(tokenV2) : "",
    spaceId ? `space_id=${spaceId}` : "",
    userId ? `notion_user_id=${userId}` : "",
    browserId ? `notion_browser_id=${browserId}` : "",
  ]
    .filter(Boolean)
    .join("; ");
}

/** Pull `space_id` out of an assembled cookie header, if present. */
export function extractSpaceIdFromCookie(cookie: string): string {
  const match = cookie.match(/(?:^|;\s*)space_id=([^;]+)/i);
  if (match) return match[1].trim();
  const camel = cookie.match(/(?:^|;\s*)spaceId=([^;]+)/);
  return camel ? camel[1].trim() : "";
}

function extractUserIdFromCookie(cookie: string): string {
  return extractNotionUserIdFromCookie(cookie);
}

function isoNow(): string {
  // Millisecond precision matches the browser client.
  return new Date().toISOString().replace(/\.\d{3}Z$/, (m) => m); // keep ms + Z
}

// ─── Helpers — request/response translation ────────────────────────────────

/**
 * Build a Notion `runInferenceTranscript` transcript array from OpenAI-style
 * chat messages.
 *
 * Live contract (verified 2026-07-19):
 * - Leading `config` (workflow + optional model food-codename)
 * - Leading `context` (spaceId / userId / surface / timezone)
 * - User turns as `type: "user"` (legacy `human` also works with createThread,
 *   but `user` matches the current web client)
 * - Assistant turns as `agent-inference` text parts
 */
/** Custom Notion AI agent (workflow) options from account credential / providerSpecificData. */
export interface NotionAgentOptions {
  /** UUID of a custom agent workflow. Empty = default Notion AI (ai_module). */
  workflowId?: string;
  /** Optional context page id for custom agents. */
  contextPageId?: string;
}

function buildNotionConfigStep(model: string, agent?: NotionAgentOptions): Record<string, unknown> {
  const isCustom = Boolean(agent?.workflowId);
  const configValue: Record<string, unknown> = {
    type: "workflow",
    // Match live browser defaults (2026-07-20 capture) for fewer plan/feature mismatches.
    enableAgentAutomations: true,
    enableAgentIntegrations: true,
    enableCustomAgents: true,
    enableScriptAgent: true,
    enableAgentDiffs: true,
    enableCsvAttachmentSupport: true,
    enableComputer: true,
    enableCreateAndRunThread: true,
    enableAgentGenerateImage: !isCustom,
    useWebSearch: true,
    searchScopes: [{ type: "everything" }],
    availableConnectors: [],
    enableUserSessionContext: false,
    isCustomAgent: isCustom,
    isCustomAgentBuilder: false,
    isCustomAgentCreate: false,
    isAgentResearchRequest: false,
    useCustomAgentDraft: isCustom,
    modelFromUser: !isCustom && Boolean(model),
    databaseAgentConfigMode: false,
    isOnboardingAgent: false,
    isMobile: false,
  };
  if (isCustom && agent?.workflowId) {
    configValue.workflowId = agent.workflowId;
  }
  // Default Notion AI: pin the food codename when the client selected a model.
  // Custom agents usually use the agent-configured model (modelFromUser:false).
  if (!isCustom && model) configValue.model = model;
  return { id: randomUUID(), type: "config", value: configValue };
}

function buildNotionContextValue(opts: {
  spaceId?: string;
  userId?: string;
  now: string;
  agent?: NotionAgentOptions;
}): Record<string, unknown> {
  const isCustom = Boolean(opts.agent?.workflowId);
  const contextValue: Record<string, unknown> = {
    timezone: "UTC",
    surface: isCustom ? "custom_agent" : "ai_module",
    currentDatetime: opts.now,
  };
  if (opts.spaceId) contextValue.spaceId = opts.spaceId;
  if (opts.userId) contextValue.userId = opts.userId;
  if (isCustom && opts.agent?.workflowId) {
    contextValue.workflowId = opts.agent.workflowId;
    if (opts.agent.contextPageId) {
      contextValue.context_page_id = opts.agent.contextPageId;
    }
  }
  return contextValue;
}

/**
 * Normalize OpenAI-style message content to a plain string.
 * Accepts a string or content-parts array (`{ type:"text", text }` / `{ text }`).
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
/** How long after a createThread attempt we treat the threadId as "already minted". */
const THREAD_CREATE_GRACE_MS = 30 * 60_000;

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

function readClientThreadId(
  body: NotionRequestBody,
  headers?: Record<string, string>
): string {
  const fromBody =
    (typeof body.notion_thread_id === "string" && body.notion_thread_id.trim()) ||
    (typeof body.thread_id === "string" && body.thread_id.trim()) ||
    "";
  if (fromBody) return fromBody;
  if (!headers) return "";
  for (const [k, v] of Object.entries(headers)) {
    if (k.toLowerCase() === "x-notion-thread-id" && typeof v === "string" && v.trim()) {
      return v.trim();
    }
  }
  return "";
}

/** Converts one OpenAI-style message into a transcript step, or `null` when it
 * was folded into the context (system prompts). */
function buildNotionMessageStep(
  m: NotionMessage,
  contextValue: Record<string, unknown>,
  opts: { userId?: string; now: string }
): Record<string, unknown> | null {
  const text = extractNotionMessageText(m?.content);
  if (!text || text.length === 0) return null;
  const role = (m.role || "").toLowerCase();

  if (role === "system") {
    // Fold system prompts into context instructions rather than a separate step.
    const existing = typeof contextValue.instructions === "string" ? contextValue.instructions : "";
    contextValue.instructions = existing ? `${existing}\n${text}` : text;
    return null;
  }

  if (role === "assistant") {
    return {
      id: randomUUID(),
      type: "agent-inference",
      value: [{ type: "text", content: text }],
    };
  }

  // user (and anything else treated as user)
  const userStep: Record<string, unknown> = {
    id: randomUUID(),
    type: "user",
    value: [[text]],
    createdAt: opts.now,
  };
  if (opts.userId) userStep.userId = opts.userId;
  return userStep;
}

/**
 * For follow-ups, only send steps after the last assistant turn (partial transcript).
 * Notion already has prior steps when createThread:false + sticky threadId.
 * Re-sending the entire agent tool loop every turn triggers temporarily-unavailable.
 */
export function messagesForNotionTranscript(
  messages: NotionMessage[],
  isFollowUp: boolean
): NotionMessage[] {
  if (!isFollowUp || !messages.length) return messages;
  let lastAsst = -1;
  for (let i = messages.length - 1; i >= 0; i--) {
    const role = (messages[i]?.role || "").toLowerCase();
    if (role === "assistant" || role === "ai" || role === "model") {
      lastAsst = i;
      break;
    }
  }
  if (lastAsst < 0) return messages;
  const slice = messages.slice(lastAsst + 1);
  // Always include at least the last user message
  if (slice.length === 0) {
    const lastUser = [...messages].reverse().find((m) => {
      const r = (m.role || "").toLowerCase();
      return r === "user" || r === "human";
    });
    return lastUser ? [lastUser] : messages;
  }
  return slice;
}

export function buildNotionTranscript(
  messages: NotionMessage[],
  opts: {
    notionModel?: string;
    spaceId?: string;
    userId?: string;
    agent?: NotionAgentOptions;
    /** When true, only append steps after the last assistant (partial follow-up). */
    isFollowUp?: boolean;
  } = {}
): Array<Record<string, unknown>> {
  const trimmedModel = typeof opts.notionModel === "string" ? opts.notionModel.trim() : "";
  const model = trimmedModel && trimmedModel !== "notion-ai" ? trimmedModel : "";
  const now = isoNow();
  const agent = opts.agent?.workflowId ? opts.agent : undefined;
  const isFollowUp = Boolean(opts.isFollowUp);

  const contextValue = buildNotionContextValue({
    spaceId: opts.spaceId,
    userId: opts.userId,
    now,
    agent,
  });
  const entries: Array<Record<string, unknown>> = [
    buildNotionConfigStep(model, agent),
    { id: randomUUID(), type: "context", value: contextValue },
  ];

  const msgs = messagesForNotionTranscript(messages, isFollowUp);
  for (const m of msgs) {
    const step = buildNotionMessageStep(m, contextValue, { userId: opts.userId, now });
    if (step) entries.push(step);
  }
  return entries;
}

/** Strip Notion's `<lang primary="…"/>` prefix and similar noise from answers. */
export function sanitizeNotionAssistantText(text: string): string {
  if (!text) return "";
  let clean = text.replace(/^\uFEFF/, "").trim();
  // Self-closing or paired lang tags at the start (and anywhere).
  clean = clean.replace(/<\/?lang\b[^>]*\/?>/gi, "");
  clean = clean.replace(/<\/lang>/gi, "");
  // Incomplete leading <lang… without close
  if (/^<lang\b/i.test(clean) && !clean.includes(">")) return "";
  return clean.trim();
}

/** Extract plain text from Notion's rich-text tuple value: `[[text, marks?]]`. */
function extractRichText(value: unknown): string {
  if (!Array.isArray(value)) return "";
  return value
    .map((segment) => (Array.isArray(segment) && typeof segment[0] === "string" ? segment[0] : ""))
    .join("");
}

function extractAgentInferenceText(value: unknown): string {
  if (!Array.isArray(value)) return "";
  const parts: string[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object" || Array.isArray(item)) continue;
    const part = item as Record<string, unknown>;
    const t = typeof part.type === "string" ? part.type.toLowerCase() : "";
    if (t === "text" && typeof part.content === "string" && part.content) {
      parts.push(part.content);
    }
  }
  return parts.join("");
}

/** Unwraps `thread_message[key].value.value.step` from a Notion record-map entry. */
function extractThreadMessageStep(msg: unknown): Record<string, unknown> | null {
  if (!msg || typeof msg !== "object") return null;
  const valueWrapper = (msg as Record<string, unknown>).value;
  if (!valueWrapper || typeof valueWrapper !== "object") return null;
  const inner = (valueWrapper as Record<string, unknown>).value;
  if (!inner || typeof inner !== "object") return null;
  const step = (inner as Record<string, unknown>).step;
  if (!step || typeof step !== "object") return null;
  return step as Record<string, unknown>;
}

/** Extracts the text carried by a single thread-message step, or "" if none. */
function extractStepText(stepObj: Record<string, unknown>): string {
  const stepType = typeof stepObj.type === "string" ? stepObj.type : "";
  if (stepType === "agent-inference") {
    return extractAgentInferenceText(stepObj.value);
  }
  if (stepType === "markdown-chat" && typeof stepObj.value === "string") {
    return stepObj.value;
  }
  return "";
}

function extractFromRecordMap(recordMap: unknown): string {
  if (!recordMap || typeof recordMap !== "object" || Array.isArray(recordMap)) return "";
  const tm = (recordMap as Record<string, unknown>).thread_message;
  if (!tm || typeof tm !== "object" || Array.isArray(tm)) return "";
  let best = "";
  for (const msg of Object.values(tm as Record<string, unknown>)) {
    const stepObj = extractThreadMessageStep(msg);
    if (!stepObj) continue;
    const text = extractStepText(stepObj);
    if (text && text.length >= best.length) best = text;
  }
  return best;
}

/**
 * Parse Notion's NDJSON `runInferenceTranscript` response body.
 * Supports:
 * 1. Legacy rich-text tuples on `value` (cumulative snapshots)
 * 2. Modern patch-start / patch streams (text / markdown-chat ops)
 * 3. Terminal record-map with agent-inference steps (authoritative final)
 */
/** Accumulator threaded through {@link parseNotionInferenceStream}'s line parsing. */
type NotionStreamState = {
  lastLegacy: string;
  lastPatchFinal: string;
  lastIncremental: string;
  lastRecordMap: string;
};

/** Applies one `patch` op (full text-part append / step append / incremental string) to state. */
/** Full agent-inference text-part append: `o:"a", p:".../value/-"`. */
function applyNotionValuePartAppend(v: unknown, state: NotionStreamState): void {
  if (!v || typeof v !== "object" || Array.isArray(v)) return;
  const part = v as Record<string, unknown>;
  if (part.type === "text" && typeof part.content === "string" && part.content) {
    state.lastPatchFinal = part.content;
  }
  if (part.type === "markdown-chat" && typeof part.value === "string" && part.value) {
    state.lastPatchFinal = part.value;
  }
}

/** Step append with markdown-chat / agent-inference: `o:"a", p:".../s/-"`. */
function applyNotionStepAppend(v: unknown, state: NotionStreamState): void {
  if (!v || typeof v !== "object" || Array.isArray(v)) return;
  const step = v as Record<string, unknown>;
  if (step.type === "markdown-chat" && typeof step.value === "string" && step.value) {
    state.lastPatchFinal = step.value;
  }
  if (step.type === "agent-inference") {
    const text = extractAgentInferenceText(step.value);
    if (text) state.lastPatchFinal = text;
  }
}

function applyNotionPatchOp(rawOp: unknown, state: NotionStreamState): void {
  if (!rawOp || typeof rawOp !== "object") return;
  const op = rawOp as Record<string, unknown>;
  const o = typeof op.o === "string" ? op.o : "";
  const p = typeof op.p === "string" ? op.p : "";
  const v = op.v;

  if (o === "a" && p.endsWith("/value/-")) {
    applyNotionValuePartAppend(v, state);
  } else if (o === "a" && p.endsWith("/s/-")) {
    applyNotionStepAppend(v, state);
  } else if ((o === "x" || o === "p") && p.includes("/value") && typeof v === "string" && v) {
    // Incremental string patches
    state.lastIncremental += v;
  }
}

/** Applies one parsed NDJSON record (markdown-chat / agent-inference / patch / record-map / legacy). */
function applyNotionStreamRecord(rec: Record<string, unknown>, state: NotionStreamState): void {
  const type = typeof rec.type === "string" ? rec.type : "";

  // 1) Direct markdown-chat event
  if (type === "markdown-chat" && typeof rec.value === "string" && rec.value) {
    state.lastPatchFinal = rec.value;
    return;
  }

  // 2) Direct agent-inference event
  if (type === "agent-inference") {
    const text = extractAgentInferenceText(rec.value);
    if (text) state.lastPatchFinal = text;
    return;
  }

  // 3) Patch stream
  if (type === "patch" && Array.isArray(rec.v)) {
    for (const rawOp of rec.v) applyNotionPatchOp(rawOp, state);
    return;
  }

  // 4) record-map terminal
  if (type === "record-map" || rec.recordMap) {
    const text = extractFromRecordMap(rec.recordMap || rec);
    if (text) state.lastRecordMap = text;
    return;
  }

  // 5) Legacy rich-text value (cumulative)
  const rich = extractRichText(rec.value);
  if (rich) state.lastLegacy = rich;
}

/** Parses one raw NDJSON line (trims / strips SSE `data:` prefix / JSON-parses) into state. */
function applyNotionStreamLine(rawLine: string, state: NotionStreamState): void {
  const line = rawLine.trim();
  if (!line || line === "[DONE]") return;
  // Strip optional SSE "data:" prefix if a proxy rewrote it.
  const payloadLine = line.startsWith("data:") ? line.slice(5).trim() : line;
  if (!payloadLine) return;

  let record: unknown;
  try {
    record = JSON.parse(payloadLine);
  } catch {
    return;
  }
  if (!record || typeof record !== "object" || Array.isArray(record)) return;
  applyNotionStreamRecord(record as Record<string, unknown>, state);
}

/**
 * Parse Notion's NDJSON `runInferenceTranscript` response body.
 * Supports:
 * 1. Legacy rich-text tuples on `value` (cumulative snapshots)
 * 2. Modern patch-start / patch streams (text / markdown-chat ops)
 * 3. Terminal record-map with agent-inference steps (authoritative final)
 */
export function parseNotionInferenceStream(raw: string): string {
  if (!raw) return "";
  const state: NotionStreamState = {
    lastLegacy: "",
    lastPatchFinal: "",
    lastIncremental: "",
    lastRecordMap: "",
  };

  for (const rawLine of raw.split("\n")) {
    applyNotionStreamLine(rawLine, state);
  }

  const candidates = [
    state.lastRecordMap,
    state.lastPatchFinal,
    state.lastIncremental,
    state.lastLegacy,
  ]
    .map(sanitizeNotionAssistantText)
    .filter(Boolean);
  // Prefer the longest non-empty candidate; record-map usually wins.
  return candidates.sort((a, b) => b.length - a.length)[0] || "";
}

/**
 * Detect Notion in-band errors (often HTTP 200 with NDJSON/JSON error objects),
 * e.g. `{ type:"error", subType:"temporarily-unavailable", message:"…" }`.
 */
export function extractNotionUpstreamError(raw: string): {
  message: string;
  subType?: string;
  isRetryable: boolean;
} | null {
  if (!raw || !raw.trim()) return null;
  const tryParse = (s: string): Record<string, unknown> | null => {
    try {
      const o = JSON.parse(s) as Record<string, unknown>;
      return o && typeof o === "object" ? o : null;
    } catch {
      return null;
    }
  };

  const candidates: Record<string, unknown>[] = [];
  const whole = tryParse(raw.trim());
  if (whole) candidates.push(whole);
  for (const line of raw.split("\n")) {
    const t = line.trim();
    if (!t) continue;
    const o = tryParse(t);
    if (o) candidates.push(o);
  }

  for (const o of candidates) {
    const type = typeof o.type === "string" ? o.type.toLowerCase() : "";
    const subType = typeof o.subType === "string" ? o.subType : undefined;
    const message =
      (typeof o.message === "string" && o.message) ||
      (typeof o.error === "string" && o.error) ||
      "";
    const isError =
      type === "error" ||
      Boolean(subType) ||
      (typeof o.isRetryable === "boolean" && message.toLowerCase().includes("went wrong"));
    if (!isError && !subType) continue;

    const sub = (subType || "").toLowerCase();
    const retryable =
      o.isRetryable === true ||
      sub.includes("temporarily") ||
      sub.includes("unavailable") ||
      sub.includes("rate") ||
      sub.includes("timeout") ||
      sub.includes("overloaded");

    return {
      message: message || subType || "Notion upstream error",
      subType,
      isRetryable: retryable,
    };
  }
  return null;
}

/**
 * Notion's undocumented inference API does not return token usage.
 * Emit a cheap char-based estimate so clients don't see a constant
 * `USAGE_TOKEN_BUFFER` (default 2000) from buffering an all-zero stub.
 * chatCore may still add the safety buffer on top of real estimates.
 */
export function estimateNotionUsage(
  messages: NotionMessage[] | undefined,
  content: string
): { prompt_tokens: number; completion_tokens: number; total_tokens: number; estimated: true } {
  const promptText = (messages || [])
    .map((m) => extractNotionMessageText(m?.content))
    .join("\n");
  // ~4 chars/token (English-ish); at least 1 when there is any text.
  const prompt_tokens = promptText ? Math.max(1, Math.ceil(promptText.length / 4)) : 0;
  const completion_tokens = content ? Math.max(1, Math.ceil(content.length / 4)) : 0;
  return {
    prompt_tokens,
    completion_tokens,
    total_tokens: prompt_tokens + completion_tokens,
    estimated: true,
  };
}

function chatCompletionResponse(
  content: string,
  model: string,
  messages?: NotionMessage[],
  threadId?: string
) {
  const id = threadId ? `chatcmpl-notion-${threadId}` : `chatcmpl-notion-${Date.now()}`;
  return new Response(
    JSON.stringify({
      id,
      object: "chat.completion",
      created: Math.floor(Date.now() / 1000),
      model,
      choices: [{ index: 0, message: { role: "assistant", content }, finish_reason: "stop" }],
      usage: estimateNotionUsage(messages, content),
      // Non-standard but useful for clients that want to pin continuity explicitly
      notion_thread_id: threadId || undefined,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...(threadId ? { "X-Notion-Thread-Id": threadId } : {}),
      },
    }
  );
}

function pseudoStreamResponse(content: string, model: string, threadId?: string) {
  const encoder = new TextEncoder();
  const id = threadId ? `chatcmpl-notion-${threadId}` : `chatcmpl-notion-${Date.now()}`;
  const chunk = (delta: string, finishReason: string | null) => ({
    id,
    object: "chat.completion.chunk",
    created: Math.floor(Date.now() / 1000),
    model,
    choices: [{ index: 0, delta: delta ? { content: delta } : {}, finish_reason: finishReason }],
  });
  const readable = new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(`data: ${JSON.stringify(chunk(content, null))}\n\n`));
      controller.enqueue(encoder.encode(`data: ${JSON.stringify(chunk("", "stop"))}\n\n`));
      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      controller.close();
    },
  });
  return new Response(readable, {
    status: 200,
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      ...(threadId ? { "X-Notion-Thread-Id": threadId } : {}),
    },
  });
}

function clientFacingModelId(model: unknown): string {
  let clientFacingModel = typeof model === "string" ? model.trim() : "";
  if (clientFacingModel.startsWith("notion-web/")) {
    clientFacingModel = clientFacingModel.slice("notion-web/".length);
  } else if (clientFacingModel.startsWith("nw/")) {
    clientFacingModel = clientFacingModel.slice(3);
  }
  return clientFacingModel;
}

/** Resolves workspace + user (cached). Required for createThread payloads. */
async function resolveExecuteWorkspace(
  cookie: string,
  signal: ExecuteInput["signal"]
): Promise<{ spaceId: string; userId: string }> {
  let spaceId = extractSpaceIdFromCookie(cookie);
  let userId = extractUserIdFromCookie(cookie);
  try {
    const resolved = await resolveNotionRuntimeWorkspace({ cookie, signal });
    if (!spaceId) spaceId = resolved.spaceId;
    if (!userId) userId = resolved.userId;
  } catch {
    // keep cookie-derived values
  }
  return { spaceId, userId };
}

/**
 * Live-verified shape:
 * - First turn: createThread true + new threadId
 * - Follow-up: createThread false + same threadId (false without threadId → 400)
 */
function buildNotionInferenceRequestBody(opts: {
  spaceId: string;
  userId: string;
  threadId: string;
  transcript: unknown;
  createThread: boolean;
  agent?: NotionAgentOptions;
}): Record<string, unknown> {
  const { spaceId, threadId, transcript, createThread, agent } = opts;
  const isCustom = Boolean(agent?.workflowId);
  const workflowId = agent?.workflowId || "";
  // Follow-ups: isPartialTranscript true matches open-source Notion bridges and
  // avoids re-validating the entire prior transcript (a source of transient errors).
  const isFollowUp = !createThread;
  return {
    traceId: randomUUID(),
    spaceId,
    threadId,
    createThread,
    // Only generate a title when starting a new Notion AI chat
    generateTitle: createThread,
    asPatchResponse: true,
    patchResponseVersion: 2,
    isPartialTranscript: isFollowUp,
    saveAllThreadOperations: true,
    setUnreadState: createThread,
    createdSource: isCustom ? "custom_agent" : "ai_module",
    threadType: "workflow",
    supportsCustomAgentNudgeTranscriptStep: true,
    isUserInAnySalesAssistedSpace: false,
    isSpaceSalesAssisted: false,
    transcript,
    // Default AI is parented by the workspace; custom agents by the workflow id.
    threadParentPointer: isCustom
      ? { table: "workflow", id: workflowId, spaceId }
      : { table: "space", id: spaceId, spaceId },
    debugOverrides: {
      annotationInferences: {},
      cachedInferences: {},
      emitAgentSearchExtractedResults: true,
      emitInferences: false,
    },
  };
}

/** @deprecated alias — prefer buildNotionInferenceRequestBody */
function buildNotionCreateThreadRequestBody(opts: {
  spaceId: string;
  userId: string;
  threadId: string;
  transcript: unknown;
}): Record<string, unknown> {
  return buildNotionInferenceRequestBody({ ...opts, createThread: true });
}

function buildNotionExecuteHeaders(opts: {
  cookie: string;
  spaceId: string;
  userId: string;
  agent?: NotionAgentOptions;
}): Record<string, string> {
  const isCustom = Boolean(opts.agent?.workflowId);
  // Browser uses /agent/<workflowId without dashes>?wfv=chat for custom agents.
  const agentPathId = (opts.agent?.workflowId || "").replace(/-/g, "");
  const referer = isCustom && agentPathId
    ? `${BASE_URL}/agent/${agentPathId}?wfv=chat`
    : `${BASE_URL}/ai`;
  const reqHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    "User-Agent": USER_AGENT,
    Accept: "application/x-ndjson",
    Cookie: opts.cookie,
    Origin: BASE_URL,
    Referer: referer,
    "notion-client-version": NOTION_CLIENT_VERSION,
    "notion-audit-log-platform": "web",
    "x-notion-space-id": opts.spaceId,
    "Accept-Language": "en-US,en;q=0.9",
    ...BROWSER_HEADERS,
  };
  if (opts.userId) reqHeaders["x-notion-active-user-header"] = opts.userId;
  return reqHeaders;
}

/** Normalize a pasted workflow/agent id (with or without dashes). */
export function normalizeNotionWorkflowId(raw: string | undefined | null): string {
  const s = String(raw || "").trim();
  if (!s) return "";
  // URL path segment …/agent/<id>?… or bare hex
  const fromUrl = s.match(/\/agent\/([a-f0-9-]{20,})/i);
  let id = fromUrl ? fromUrl[1]! : s;
  id = id.replace(/[^a-f0-9-]/gi, "");
  // Insert dashes if 32 hex chars (no dashes)
  const hex = id.replace(/-/g, "");
  if (/^[a-f0-9]{32}$/i.test(hex)) {
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`.toLowerCase();
  }
  // Already UUID-like
  if (/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(id)) {
    return id.toLowerCase();
  }
  return id;
}

/**
 * Read custom-agent workflow id + optional context page from credentials.
 * Sources (priority): providerSpecificData → cookie pairs on apiKey
 * (`workflow_id=…`, `notion_workflow_id=…`, `context_page_id=…`).
 */
export function resolveNotionAgentOptions(
  credentials: ExecuteInput["credentials"],
  cookie: string
): NotionAgentOptions {
  const ps = credentials?.providerSpecificData;
  const workflowFromPs =
    readProviderSpecificString(ps, [
      "workflowId",
      "workflow_id",
      "notionWorkflowId",
      "notion_workflow_id",
      "agentId",
      "agent_id",
    ]) || "";
  const pageFromPs =
    readProviderSpecificString(ps, [
      "contextPageId",
      "context_page_id",
      "notionContextPageId",
    ]) || "";

  const readCookie = (name: string): string => {
    const m = cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`, "i"));
    if (!m) return "";
    const raw = m[1]!.trim();
    try {
      return decodeURIComponent(raw);
    } catch {
      return raw;
    }
  };

  const workflowId = normalizeNotionWorkflowId(
    workflowFromPs ||
      readCookie("workflow_id") ||
      readCookie("notion_workflow_id") ||
      readCookie("agent_id")
  );
  const contextPageId =
    pageFromPs ||
    readCookie("context_page_id") ||
    readCookie("notion_context_page_id") ||
    "";

  return {
    workflowId: workflowId || undefined,
    contextPageId: contextPageId ? contextPageId.trim() : undefined,
  };
}

/**
 * Sends the createThread request to Notion and returns either the raw
 * inference text or an error result — callers just check `.errorResult`.
 */
async function sendNotionInferenceRequest(opts: {
  reqBody: Record<string, unknown>;
  reqHeaders: Record<string, string>;
  signal: ExecuteInput["signal"];
}): Promise<{ rawText?: string; errorResult?: ReturnType<typeof makeErrorResult> }> {
  const { reqBody, reqHeaders, signal } = opts;
  let upstream: Response;
  try {
    upstream = await fetch(NOTION_URL, {
      method: "POST",
      headers: reqHeaders,
      body: JSON.stringify(reqBody),
      signal: signal ?? undefined,
    });
  } catch (err) {
    return {
      errorResult: makeErrorResult(
        502,
        `Notion fetch failed: ${err instanceof Error ? err.message : "unknown error"}`,
        reqBody,
        NOTION_URL
      ),
    };
  }

  if (upstream.status === 401 || upstream.status === 403) {
    return {
      errorResult: makeErrorResult(
        upstream.status,
        "Notion session expired or invalid — re-paste token_v2 from notion.so",
        reqBody,
        NOTION_URL
      ),
    };
  }

  if (!upstream.ok) {
    const errText = await upstream.text().catch(() => "");
    return {
      errorResult: makeErrorResult(
        upstream.status,
        `Notion error: ${errText}`,
        reqBody,
        NOTION_URL
      ),
    };
  }

  return { rawText: await upstream.text() };
}

// ─── Executor ───────────────────────────────────────────────────────────────

export class NotionWebExecutor extends BaseExecutor {
  constructor() {
    super("notion-web", { id: "notion-web", baseUrl: NOTION_URL });
  }

  async execute(input: ExecuteInput) {
    const { model, body, stream: wantStream, credentials, signal } = input;
    const requestBody = (body || {}) as NotionRequestBody;

    const cookie = resolveNotionWebCookie(credentials);
    if (!cookie) {
      return makeErrorResult(
        401,
        "Missing Notion token_v2 cookie — paste it from notion.so DevTools → Application → Cookies",
        body,
        NOTION_URL
      );
    }

    // Optional custom agent (workflowId). Empty → default Notion AI (not agentic-specific).
    const agent = resolveNotionAgentOptions(credentials, cookie);

    const messages = requestBody.messages || [];
    if (!messages.some((m) => m.role === "user")) {
      return makeErrorResult(400, "No user message found", body, NOTION_URL);
    }

    const { spaceId, userId } = await resolveExecuteWorkspace(cookie, signal);

    if (!spaceId) {
      return makeErrorResult(
        400,
        "Could not resolve Notion spaceId — paste space_id from cookies or ensure token_v2 can call getSpaces",
        body,
        NOTION_URL
      );
    }

    // Client may send notion-web/fable-5, nw/fable-5, fable-5, "Fable 5", or the
    // legacy food codename (acai-budino-high). Notion only accepts the food codename
    // on the wire; we echo the client-facing id in the OpenAI response.
    const notionCodename = resolveNotionCodename(model);
    const clientFacing = clientFacingModelId(model);
    const modelId = clientFacing || notionCodename || "notion-ai";

    // Thread continuity (sticky):
    // - Prefer X-Notion-Thread-Id / body pin from the client
    // - Else sticky root key from first user message (UREW-normalized, durable on disk)
    // - Bind threadId *before* the upstream call so error retries never mint a new chat
    // - createThread:true only for brand-new roots; never again for that root
    const inboundHeaders =
      (input.clientHeaders as Record<string, string> | null | undefined) ??
      ((input as { headers?: Record<string, string> }).headers as
        | Record<string, string>
        | undefined);
    const clientThreadId = readClientThreadId(requestBody, inboundHeaders ?? undefined);
    // Namespace thread cache by custom agent so default AI and agents never share threads.
    const threadSpaceKey = agent.workflowId ? `${spaceId}|wf:${agent.workflowId}` : spaceId;
    const binding = resolveNotionThreadBinding(threadSpaceKey, messages, clientThreadId);
    let { threadId, createThread, rootKey } = binding;

    const reqHeaders = buildNotionExecuteHeaders({ cookie, spaceId, userId, agent });

    const runOnce = async (opts: {
      createThread: boolean;
      threadId: string;
    }): Promise<
      | { ok: true; finalText: string; reqBody: Record<string, unknown> }
      | { ok: false; errorResult: ReturnType<typeof makeErrorResult>; retryable: boolean; reqBody: Record<string, unknown> }
    > => {
      const transcript = buildNotionTranscript(messages, {
        notionModel: notionCodename || undefined,
        spaceId,
        userId: userId || undefined,
        agent,
        isFollowUp: !opts.createThread,
      });
      const reqBody = buildNotionInferenceRequestBody({
        spaceId,
        userId,
        threadId: opts.threadId,
        transcript,
        createThread: opts.createThread,
        agent,
      });

      if (opts.createThread) {
        notionThreadMarkCreateAttempted(rootKey, opts.threadId);
      }

      const { rawText, errorResult } = await sendNotionInferenceRequest({
        reqBody,
        reqHeaders,
        signal,
      });

      if (errorResult) {
        // HTTP-level failure — keep sticky binding so the next turn reuses threadId
        const status = errorResult.response?.status ?? 502;
        const retryable = status === 429 || status === 503 || status >= 500;
        return { ok: false, errorResult, retryable, reqBody };
      }

      const raw = rawText || "";
      const upstreamErr = extractNotionUpstreamError(raw);
      if (upstreamErr) {
        // In-band Notion error (often HTTP 200 NDJSON). Sticky thread stays bound.
        const status = upstreamErr.isRetryable ? 503 : 502;
        return {
          ok: false,
          retryable: upstreamErr.isRetryable,
          reqBody,
          errorResult: makeErrorResult(
            status,
            `Notion ${upstreamErr.subType || "error"}: ${upstreamErr.message}`,
            reqBody,
            NOTION_URL
          ),
        };
      }

      const finalText = parseNotionInferenceStream(raw);
      if (!finalText) {
        return {
          ok: false,
          retryable: true,
          reqBody,
          errorResult: makeErrorResult(502, "No response from Notion AI", reqBody, NOTION_URL),
        };
      }

      return { ok: true, finalText, reqBody };
    };

    // First attempt
    let attempt = await runOnce({ createThread, threadId });

    // One automatic retry for transient Notion faults — same threadId, never create again
    if (!attempt.ok && attempt.retryable) {
      const delayMs = process.env.NODE_ENV === "test" || process.env.VITEST ? 20 : 700 + Math.floor(Math.random() * 400);
      await new Promise((r) => setTimeout(r, delayMs));
      attempt = await runOnce({ createThread: false, threadId });
    }

    if (!attempt.ok) {
      return attempt.errorResult;
    }

    // Confirm sticky binding + prefix keys for multi-turn continuity
    notionThreadMarkConfirmed(rootKey, threadId);
    notionThreadSessionStore(threadSpaceKey, messages, attempt.finalText, threadId);

    const response = wantStream
      ? pseudoStreamResponse(attempt.finalText, modelId, threadId)
      : chatCompletionResponse(attempt.finalText, modelId, messages, threadId);

    return {
      response,
      url: NOTION_URL,
      headers: reqHeaders,
      transformedBody: attempt.reqBody,
    };
  }
}
