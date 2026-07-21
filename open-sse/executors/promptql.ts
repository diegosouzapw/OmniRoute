/**
 * PromptQLExecutor — prompt.ql.app playground agent (Unofficial/Experimental)
 *
 * Reverse-engineered from the SPA (2026-07-20):
 *   - Mutations start_thread / send_thread_message only return UserMessage
 *   - AI output is AgentMessage rows on thread_events (Hasura stream or poll)
 *   - Auth: Bearer JWT (Hasura enrich-token) + projectId claim
 *   - Models: FetchLlmConfigs; optional llmConfigId on start_thread (String!)
 *   - Credits: promptql_project_credit_summary on data.pro.ql.app (usage leaf)
 *
 * OpenAI multi-turn is preserved via sticky PromptQL thread_id:
 *   - Prefer body.promptql_thread_id / X-PromptQL-Thread-Id from the client
 *   - Else history-prefix fingerprint (full user+assistant before last user)
 *   - First turn always start_thread (never first-user-only sticky — that
 *     collided across SkillsManager/agent sessions and routed follow-ups to
 *     older chats)
 * Response always echoes X-PromptQL-Thread-Id + promptql_thread_id.
 *
 * Token refresh (POST auth.pro.ql.app/ddn/project/token with session cookies)
 * is implemented best-effort and still needs production verification.
 */
import { createHash, randomUUID } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { BaseExecutor, type ExecuteInput } from "./base.ts";
import { makeExecutorErrorResult as makeErrorResult } from "../utils/error.ts";
import {
  PROMPTQL_FALLBACK_MODELS,
  clientFacingPromptQlModelId,
  resolvePromptQlModel,
  type PromptQlModel,
} from "../services/promptqlModels.ts";

// ─── Constants ──────────────────────────────────────────────────────────────

const PLAYGROUND_GQL =
  process.env.PROMPTQL_GRAPHQL_ENDPOINT ||
  "https://data.prompt.ql.app/promptql/playground-v2-hge/v1/graphql";
const CREDITS_GQL =
  process.env.PROMPTQL_CREDITS_ENDPOINT || "https://data.pro.ql.app/v1/graphql";
const TOKEN_REFRESH_URL =
  process.env.PROMPTQL_TOKEN_REFRESH_URL || "https://auth.pro.ql.app/ddn/project/token";
const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36";
const DEFAULT_TZ = "UTC";
const POLL_INTERVAL_MS = 1200;
const POLL_TIMEOUT_MS = Number(process.env.PROMPTQL_POLL_TIMEOUT_MS || 180_000);

// ─── GraphQL documents ──────────────────────────────────────────────────────

const START_THREAD_WITH_MODEL = `
mutation StartThreadWithModel(
  $message: String!
  $projectId: String!
  $timezone: String!
  $llmConfigId: String!
  $uploads: [UserUploadInput!]
  $agentResponseConfig: String
) {
  start_thread(
    message: $message
    projectId: $projectId
    timezone: $timezone
    llmConfigId: $llmConfigId
    roomless: true
    uploads: $uploads
    agentResponseConfig: $agentResponseConfig
  ) {
    thread_id
    title
    created_at
    thread_events { thread_event_id created_at event_data }
  }
}`;

const START_THREAD_ROOMLESS = `
mutation StartThreadRoomless(
  $message: String!
  $projectId: String!
  $timezone: String!
  $uploads: [UserUploadInput!]
  $agentResponseConfig: String
) {
  start_thread(
    message: $message
    projectId: $projectId
    timezone: $timezone
    roomless: true
    uploads: $uploads
    agentResponseConfig: $agentResponseConfig
  ) {
    thread_id
    title
    created_at
    thread_events { thread_event_id created_at event_data }
  }
}`;

const SEND_THREAD_MESSAGE = `
mutation SendThreadMessage(
  $message: String!
  $timezone: String!
  $threadId: String!
  $uploads: [UserUploadInput!]
  $agentResponseConfig: String
) {
  send_thread_message(
    threadId: $threadId
    timezone: $timezone
    message: $message
    uploads: $uploads
    agentResponseConfig: $agentResponseConfig
  ) {
    thread_event_id
    event_data
    created_at
  }
}`;

const QUERY_THREAD_EVENTS = `
query QueryThreadEvents($thread_id: uuid!, $after_event_id: bigint!) {
  thread_events(
    where: {
      thread_id: {_eq: $thread_id}
      thread_event_id: {_gt: $after_event_id}
    }
    order_by: {thread_event_id: asc}
  ) {
    thread_event_id
    thread_id
    event_data
    created_at
    user_id
  }
}`;

// ─── Types ──────────────────────────────────────────────────────────────────

interface ChatMessage {
  role: string;
  content: unknown;
}

interface PromptQlRequestBody {
  messages?: ChatMessage[];
  model?: string;
  promptql_thread_id?: string;
  thread_id?: string;
}

interface ThreadEvent {
  thread_event_id: string | number;
  event_data?: unknown;
  created_at?: string;
}

// ─── Credential helpers ─────────────────────────────────────────────────────

function readStr(v: unknown): string {
  if (typeof v !== "string") return "";
  const t = v.trim();
  return t.length ? t : "";
}

function readPs(data: unknown, keys: readonly string[]): string {
  if (!data || typeof data !== "object" || Array.isArray(data)) return "";
  const rec = data as Record<string, unknown>;
  for (const k of keys) {
    const v = readStr(rec[k]);
    if (v) return v;
  }
  return "";
}

/** Accept bare JWT or `Bearer …`. */
export function normalizePromptQlToken(raw: string): string {
  const t = raw.trim().replace(/^Bearer\s+/i, "").trim();
  return t;
}

export function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const part = token.split(".")[1];
    if (!part) return null;
    const json = Buffer.from(part.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString(
      "utf8"
    );
    return JSON.parse(json) as Record<string, unknown>;
  } catch {
    return null;
  }
}

export function extractProjectIdFromToken(token: string): string {
  const payload = decodeJwtPayload(token);
  if (!payload) return "";
  const hasura = payload["https://promptql.hasura.io"];
  if (hasura && typeof hasura === "object" && !Array.isArray(hasura)) {
    const id = readStr((hasura as Record<string, unknown>)["x-hasura-project-id"]);
    if (id) return id;
  }
  return readStr(payload.project_id) || readStr(payload.projectId);
}

export function isJwtExpired(token: string, skewSec = 30): boolean {
  const payload = decodeJwtPayload(token);
  const exp = payload && typeof payload.exp === "number" ? payload.exp : 0;
  if (!exp) return false;
  return Math.floor(Date.now() / 1000) >= exp - skewSec;
}

export function resolvePromptQlCredentials(credentials: ExecuteInput["credentials"]): {
  token: string;
  projectId: string;
  cookie: string;
  timezone: string;
} {
  const direct =
    readStr(credentials?.apiKey) ||
    readStr((credentials as Record<string, unknown> | undefined)?.accessToken) ||
    readStr((credentials as Record<string, unknown> | undefined)?.token);
  const ps = credentials?.providerSpecificData;
  const token = normalizePromptQlToken(
    direct || readPs(ps, ["token", "jwt", "accessToken", "bearer", "apiKey"])
  );
  const projectId =
    readPs(ps, ["projectId", "project_id", "x-hasura-project-id"]) ||
    extractProjectIdFromToken(token);
  const cookie = readPs(ps, ["cookie", "sessionCookie", "authCookie"]);
  const timezone = readPs(ps, ["timezone", "tz"]) || DEFAULT_TZ;
  return { token, projectId, cookie, timezone };
}

// ─── Message / content helpers ──────────────────────────────────────────────

export function extractMessageText(content: unknown): string {
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content
      .map((part) => {
        if (typeof part === "string") return part;
        if (part && typeof part === "object") {
          const p = part as Record<string, unknown>;
          if (typeof p.text === "string") return p.text;
          if (typeof p.content === "string") return p.content;
        }
        return "";
      })
      .filter(Boolean)
      .join("\n");
  }
  if (content && typeof content === "object" && typeof (content as { text?: string }).text === "string") {
    return (content as { text: string }).text;
  }
  return "";
}

function lastUserText(messages: ChatMessage[]): string {
  for (let i = messages.length - 1; i >= 0; i--) {
    if (messages[i]?.role === "user") {
      return extractMessageText(messages[i]!.content).trim();
    }
  }
  return "";
}

function withAgentMention(text: string): string {
  if (!text) return "<agent_mention /> ";
  if (text.includes("<agent_mention")) return text;
  return `<agent_mention /> ${text}`;
}

// ─── AgentMessage text extraction ───────────────────────────────────────────

export function walkStrings(
  node: unknown,
  out: Array<{ path: string; text: string }> = [],
  path = ""
): Array<{ path: string; text: string }> {
  if (node == null) return out;
  if (typeof node === "string") {
    if (
      node.length >= 1 &&
      !/^[0-9a-f-]{36}$/i.test(node) &&
      !/^\d{4}-\d{2}-\d{2}T/.test(node)
    ) {
      out.push({ path, text: node });
    }
    return out;
  }
  if (Array.isArray(node)) {
    node.forEach((v, i) => walkStrings(v, out, `${path}[${i}]`));
    return out;
  }
  if (typeof node === "object") {
    for (const [k, v] of Object.entries(node as Record<string, unknown>)) {
      walkStrings(v, out, path ? `${path}.${k}` : k);
    }
  }
  return out;
}

export function extractFinalResponseMessage(eventData: unknown): string | null {
  const hits = walkStrings(eventData).filter((t) => /final_response\.message$/i.test(t.path));
  if (hits.length) return hits[hits.length - 1]!.text;
  // response_text XML fallback
  const raw = walkStrings(eventData).find((t) => /response_text$/i.test(t.path));
  if (raw) {
    const m = raw.text.match(/<final_response>\s*([\s\S]*?)\s*<\/final_response>/i);
    if (m) return m[1]!.trim();
  }
  return null;
}

export function isFinalAgentEvent(eventData: unknown): boolean {
  const s = JSON.stringify(eventData || {});
  if (s.includes("final_response_sent")) return true;
  return Boolean(extractFinalResponseMessage(eventData));
}

export function eventKind(eventData: unknown): string {
  if (!eventData || typeof eventData !== "object") return "unknown";
  return Object.keys(eventData as object)[0] || "unknown";
}

// ─── Thread session cache (multi-turn OpenAI → one PromptQL thread) ─────────
//
// BUG (pre-fix): cache key = sha256(projectId + first user message only).
// Agent clients (SkillsManager, UREW pins, shared greetings) often share the
// same first user turn across independent chats → follow-ups land on a random
// older PromptQL thread.
//
// FIX (Perplexity/Notion style):
//  1. Prefer explicit client thread id (body.promptql_thread_id / headers)
//  2. Else lookup by fingerprint of FULL history prefix (all non-system turns
//     BEFORE the last user message). Requires prior assistant content.
//  3. First turn / no assistant history → always start_thread (never sticky)
//  4. After each successful reply, store under fingerprint(full history + asst)
//     so the next request's prefix matches exactly one conversation.

type ThreadBinding = { threadId: string; projectId: string; updatedAt: number };

const memoryThreads = new Map<string, ThreadBinding>();
const THREAD_CACHE_MAX = 200;

function threadCachePath(): string | null {
  const dataDir = process.env.DATA_DIR || process.env.OMNIROUTE_DATA_DIR;
  if (!dataDir) return null;
  return join(dataDir, "promptql-thread-sessions.json");
}

function loadThreadDisk(): Record<string, ThreadBinding> {
  const p = threadCachePath();
  if (!p || !existsSync(p)) return {};
  try {
    return JSON.parse(readFileSync(p, "utf8")) as Record<string, ThreadBinding>;
  } catch {
    return {};
  }
}

function saveThreadDisk(map: Record<string, ThreadBinding>) {
  const p = threadCachePath();
  if (!p) return;
  try {
    mkdirSync(dirname(p), { recursive: true });
    writeFileSync(p, JSON.stringify(map), "utf8");
  } catch {
    /* best-effort */
  }
}

/** Roles that must not participate in conversation fingerprints. */
function isFingerprintRole(role: string): boolean {
  const r = (role || "").toLowerCase();
  // system/developer often carry jailbreak/agentic pins that are shared across chats
  if (!r || r === "system" || r === "developer" || r === "tool") return false;
  return true;
}

/**
 * Stable fingerprint of an ordered conversation slice.
 * Excludes system/developer/tool so shared injects cannot collapse distinct chats.
 */
export function conversationFingerprint(projectId: string, messages: ChatMessage[]): string {
  const parts: string[] = [`project:${projectId}`];
  for (const m of messages) {
    const role = (m?.role || "").toLowerCase();
    if (!isFingerprintRole(role)) continue;
    const text = extractMessageText(m?.content).trim().slice(0, 2000);
    if (!text) continue;
    parts.push(`${role}:${text}`);
  }
  const h = createHash("sha256").update(parts.join("\n")).digest("hex").slice(0, 32);
  return `pql:${projectId}:${h}`;
}

/** Messages before the last user turn (OpenAI multi-turn prefix). */
export function historyPrefixBeforeLastUser(messages: ChatMessage[]): ChatMessage[] {
  let lastUser = -1;
  for (let i = messages.length - 1; i >= 0; i--) {
    if ((messages[i]?.role || "").toLowerCase() === "user") {
      lastUser = i;
      break;
    }
  }
  if (lastUser <= 0) return [];
  return messages.slice(0, lastUser);
}

export function hasAssistantMessage(messages: ChatMessage[]): boolean {
  return messages.some((m) => {
    const r = (m?.role || "").toLowerCase();
    return r === "assistant" || r === "ai" || r === "model";
  });
}

function getThreadBinding(key: string): ThreadBinding | null {
  if (!key) return null;
  const mem = memoryThreads.get(key);
  if (mem) return mem;
  const disk = loadThreadDisk()[key];
  if (disk) {
    memoryThreads.set(key, disk);
    return disk;
  }
  return null;
}

function setThreadBinding(key: string, binding: ThreadBinding) {
  if (!key) return;
  memoryThreads.set(key, binding);
  const disk = loadThreadDisk();
  disk[key] = binding;
  const keys = Object.keys(disk);
  if (keys.length > THREAD_CACHE_MAX) {
    keys
      .sort((a, b) => (disk[a]!.updatedAt || 0) - (disk[b]!.updatedAt || 0))
      .slice(0, keys.length - THREAD_CACHE_MAX)
      .forEach((k) => {
        delete disk[k];
        memoryThreads.delete(k);
      });
  }
  saveThreadDisk(disk);
}

/** Test helper — clear in-memory + optional disk cache. */
export function clearPromptQlThreadBindingsForTests(opts?: { disk?: boolean }): void {
  memoryThreads.clear();
  if (opts?.disk) {
    const p = threadCachePath();
    if (p && existsSync(p)) {
      try {
        writeFileSync(p, "{}", "utf8");
      } catch {
        /* ignore */
      }
    }
  }
}

export function readClientThreadId(
  body: PromptQlRequestBody,
  headers?: Record<string, string>
): string {
  const fromBody = readStr(body.promptql_thread_id) || readStr(body.thread_id);
  if (fromBody) return fromBody;
  if (!headers) return "";
  const lower: Record<string, string> = {};
  for (const [k, v] of Object.entries(headers)) lower[k.toLowerCase()] = String(v ?? "");
  return (
    readStr(lower["x-promptql-thread-id"]) ||
    readStr(lower["x-thread-id"]) ||
    readStr(lower["x-conversation-id"]) ||
    ""
  );
}

export type PromptQlThreadResolve = {
  threadId: string;
  isFollowUp: boolean;
  /** Key used for sticky store after this turn (prefix key at resolve time). */
  prefixKey: string | null;
};

/**
 * Resolve PromptQL thread for this OpenAI request.
 * Never reuses a first-user-only sticky mapping across unrelated chats.
 */
export function resolvePromptQlThreadBinding(
  projectId: string,
  messages: ChatMessage[],
  clientThreadId?: string
): PromptQlThreadResolve {
  const clientId = (clientThreadId || "").trim();
  const prefix = historyPrefixBeforeLastUser(messages);
  const prefixKey =
    prefix.length > 0 && hasAssistantMessage(prefix)
      ? conversationFingerprint(projectId, prefix)
      : null;

  if (clientId) {
    return { threadId: clientId, isFollowUp: true, prefixKey };
  }

  if (prefixKey) {
    const cached = getThreadBinding(prefixKey);
    if (cached?.threadId && cached.projectId === projectId) {
      return { threadId: cached.threadId, isFollowUp: true, prefixKey };
    }
    // Multi-turn history without a matching sticky entry (restart / new chat
    // that only looks similar on the first user turn): start a NEW thread.
    // PromptQL cannot rehydrate OpenAI history into an old thread id safely.
    return { threadId: "", isFollowUp: false, prefixKey: null };
  }

  // First turn (or user-only history without assistant): always mint new.
  return { threadId: "", isFollowUp: false, prefixKey: null };
}

/**
 * Persist sticky keys so the NEXT request's history prefix resolves to this thread.
 * Stores under fingerprint(messages + assistant) which equals the next turn's prefix.
 */
export function storePromptQlThreadAfterTurn(
  projectId: string,
  messages: ChatMessage[],
  assistantText: string,
  threadId: string
): string | null {
  if (!projectId || !threadId) return null;
  const full: ChatMessage[] = [
    ...messages,
    { role: "assistant", content: assistantText || "" },
  ];
  // Only store if there is at least one user + assistant pair.
  if (!hasAssistantMessage(full) || !messages.some((m) => (m.role || "").toLowerCase() === "user")) {
    return null;
  }
  const key = conversationFingerprint(projectId, full);
  const binding: ThreadBinding = { threadId, projectId, updatedAt: Date.now() };
  setThreadBinding(key, binding);
  // Also bind the current prefix key when present (idempotent re-touch).
  const prefix = historyPrefixBeforeLastUser(messages);
  if (prefix.length > 0 && hasAssistantMessage(prefix)) {
    setThreadBinding(conversationFingerprint(projectId, prefix), binding);
  }
  return key;
}

// ─── GraphQL client ─────────────────────────────────────────────────────────

async function gql<T = unknown>(
  endpoint: string,
  token: string,
  query: string,
  variables: Record<string, unknown>,
  operationName: string,
  signal?: AbortSignal | null
): Promise<T> {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
      origin: "https://prompt.ql.app",
      referer: "https://prompt.ql.app/",
      "user-agent": USER_AGENT,
    },
    body: JSON.stringify({ query, variables, operationName }),
    signal: signal ?? undefined,
  });
  const text = await res.text();
  let json: { data?: T; errors?: Array<{ message?: string }> };
  try {
    json = JSON.parse(text) as typeof json;
  } catch {
    throw new Error(`Non-JSON GraphQL HTTP ${res.status}: ${text.slice(0, 300)}`);
  }
  if (!res.ok) {
    throw new Error(`GraphQL HTTP ${res.status}: ${text.slice(0, 400)}`);
  }
  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message || "error").join("; "));
  }
  return json.data as T;
}

/**
 * Best-effort JWT refresh. Requires browser session cookies (credentials: include
 * in the SPA). Headless callers must store those cookies in providerSpecificData.cookie.
 * **Not fully verified in production** — see PR notes.
 */
export async function tryRefreshPromptQlToken(opts: {
  projectId: string;
  cookie?: string;
  signal?: AbortSignal | null;
}): Promise<string | null> {
  if (!opts.cookie || !opts.projectId) return null;
  try {
    const res = await fetch(TOKEN_REFRESH_URL, {
      method: "POST",
      headers: {
        accept: "*/*",
        "x-hasura-project-id": opts.projectId,
        origin: "https://prompt.ql.app",
        referer: "https://prompt.ql.app/",
        cookie: opts.cookie,
        "user-agent": USER_AGENT,
      },
      signal: opts.signal ?? undefined,
    });
    if (!res.ok) return null;
    const text = await res.text();
    // Response may be raw JWT or JSON { token / accessToken / ... }
    const trimmed = text.trim();
    if (trimmed.startsWith("eyJ")) return normalizePromptQlToken(trimmed.replace(/^"|"$/g, ""));
    try {
      const j = JSON.parse(trimmed) as Record<string, unknown>;
      const t =
        readStr(j.token) ||
        readStr(j.accessToken) ||
        readStr(j.access_token) ||
        readStr(j.jwt);
      return t ? normalizePromptQlToken(t) : null;
    } catch {
      return null;
    }
  } catch {
    return null;
  }
}

// ─── OpenAI response helpers ────────────────────────────────────────────────

function estimateUsage(messages: ChatMessage[] | undefined, content: string) {
  const prompt = (messages || [])
    .map((m) => extractMessageText(m.content))
    .join("\n");
  const prompt_tokens = Math.max(1, Math.ceil(prompt.length / 4));
  const completion_tokens = Math.max(1, Math.ceil(content.length / 4));
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
  messages: ChatMessage[] | undefined,
  threadId?: string
) {
  const id = threadId ? `chatcmpl-pql-${threadId}` : `chatcmpl-pql-${Date.now()}`;
  return new Response(
    JSON.stringify({
      id,
      object: "chat.completion",
      created: Math.floor(Date.now() / 1000),
      model,
      choices: [{ index: 0, message: { role: "assistant", content }, finish_reason: "stop" }],
      usage: estimateUsage(messages, content),
      promptql_thread_id: threadId || undefined,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...(threadId ? { "X-PromptQL-Thread-Id": threadId } : {}),
      },
    }
  );
}

function pseudoStreamResponse(content: string, model: string, threadId?: string) {
  const encoder = new TextEncoder();
  const id = threadId ? `chatcmpl-pql-${threadId}` : `chatcmpl-pql-${Date.now()}`;
  const chunk = (delta: string, finishReason: string | null) => ({
    id,
    object: "chat.completion.chunk",
    created: Math.floor(Date.now() / 1000),
    model,
    choices: [{ index: 0, delta: delta ? { content: delta } : {}, finish_reason: finishReason }],
  });
  const readable = new ReadableStream({
    start(controller) {
      // Emit in ~word-ish slices for slightly better TTFT UX without true token stream
      const parts = content.match(/\S+\s*/g) || [content];
      let buf = "";
      for (const p of parts) {
        buf += p;
        if (buf.length >= 40) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(chunk(buf, null))}\n\n`));
          buf = "";
        }
      }
      if (buf) controller.enqueue(encoder.encode(`data: ${JSON.stringify(chunk(buf, null))}\n\n`));
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
      ...(threadId ? { "X-PromptQL-Thread-Id": threadId } : {}),
    },
  });
}

// ─── Poll assistant ─────────────────────────────────────────────────────────

export async function pollAssistantText(opts: {
  token: string;
  threadId: string;
  afterEventId: string;
  signal?: AbortSignal | null;
  timeoutMs?: number;
  intervalMs?: number;
}): Promise<{ text: string; lastEventId: string; events: ThreadEvent[] }> {
  const timeoutMs = opts.timeoutMs ?? POLL_TIMEOUT_MS;
  const intervalMs = opts.intervalMs ?? POLL_INTERVAL_MS;
  const start = Date.now();
  let cursor = String(opts.afterEventId || "0");
  let best = "";
  let sawFinal = false;
  const collected: ThreadEvent[] = [];

  while (Date.now() - start < timeoutMs) {
    if (opts.signal?.aborted) throw new Error("aborted");
    const data = await gql<{ thread_events: ThreadEvent[] }>(
      PLAYGROUND_GQL,
      opts.token,
      QUERY_THREAD_EVENTS,
      { thread_id: opts.threadId, after_event_id: cursor },
      "QueryThreadEvents",
      opts.signal
    );
    const batch = data.thread_events || [];
    for (const ev of batch) {
      collected.push(ev);
      cursor = String(ev.thread_event_id);
      if (eventKind(ev.event_data) !== "AgentMessage") continue;
      const msg = extractFinalResponseMessage(ev.event_data);
      if (msg) best = msg;
      if (isFinalAgentEvent(ev.event_data) && msg) {
        sawFinal = true;
      }
      // Strict stop: final_response_sent
      if (JSON.stringify(ev.event_data || {}).includes("final_response_sent") && best) {
        return { text: best, lastEventId: cursor, events: collected };
      }
    }
    if (sawFinal && best) {
      // one extra idle poll to catch trailing metadata
      await new Promise((r) => setTimeout(r, intervalMs));
      return { text: best, lastEventId: cursor, events: collected };
    }
    await new Promise((r) => setTimeout(r, intervalMs));
  }

  if (best) return { text: best, lastEventId: cursor, events: collected };
  throw new Error(
    `PromptQL stream timeout after ${timeoutMs}ms (thread ${opts.threadId}, events=${collected.length})`
  );
}

// ─── Executor ───────────────────────────────────────────────────────────────

export class PromptQlExecutor extends BaseExecutor {
  constructor() {
    super("promptql", {
      id: "promptql",
      baseUrl: PLAYGROUND_GQL,
    });
  }

  async execute(input: ExecuteInput) {
    const { model, body, stream: wantStream, credentials, signal } = input;
    const requestBody = (body || {}) as PromptQlRequestBody;
    let { token, projectId, cookie, timezone } = resolvePromptQlCredentials(credentials);

    if (!token) {
      return makeErrorResult(
        401,
        "Missing PromptQL Bearer JWT — paste the Authorization token from prompt.ql.app DevTools (Network → graphql → Authorization: Bearer …)",
        body,
        PLAYGROUND_GQL
      );
    }

    // Best-effort refresh when JWT is near expiry and session cookie is present.
    if (isJwtExpired(token) && cookie && projectId) {
      const refreshed = await tryRefreshPromptQlToken({ projectId, cookie, signal });
      if (refreshed) token = refreshed;
    }

    if (!projectId) {
      projectId = extractProjectIdFromToken(token);
    }
    if (!projectId) {
      return makeErrorResult(
        400,
        "Missing projectId — set providerSpecificData.projectId or use a JWT that embeds x-hasura-project-id",
        body,
        PLAYGROUND_GQL
      );
    }

    const messages = requestBody.messages || [];
    const userText = lastUserText(messages);
    if (!userText) {
      return makeErrorResult(400, "No user message found", body, PLAYGROUND_GQL);
    }

    const clientFacing = clientFacingPromptQlModelId(model || requestBody.model);
    const resolved: PromptQlModel | null = resolvePromptQlModel(model || requestBody.model);
    // Prefer live configId from fallback catalog; discovery map can be extended later
    const llmConfigId =
      resolved?.configId && !resolved.configId.startsWith("placeholder-")
        ? resolved.configId
        : undefined;

    const inboundHeaders =
      (input.clientHeaders as Record<string, string> | null | undefined) ??
      ((input as { headers?: Record<string, string> }).headers as
        | Record<string, string>
        | undefined);
    const clientThreadId = readClientThreadId(requestBody, inboundHeaders ?? undefined);
    const binding = resolvePromptQlThreadBinding(projectId, messages, clientThreadId);

    let threadId = binding.threadId;
    let afterEventId = "0";
    const agentMessage = withAgentMention(userText);

    try {
      if (!binding.isFollowUp || !threadId) {
        // New PromptQL thread — never reuse first-user-only sticky from another chat
        type StartData = {
          start_thread: {
            thread_id: string;
            thread_events?: ThreadEvent[];
          };
        };
        let start: StartData["start_thread"];
        if (llmConfigId) {
          try {
            const data = await gql<StartData>(
              PLAYGROUND_GQL,
              token,
              START_THREAD_WITH_MODEL,
              {
                message: agentMessage,
                projectId,
                timezone,
                llmConfigId,
                uploads: [],
                agentResponseConfig: "force_respond",
              },
              "StartThreadWithModel",
              signal
            );
            start = data.start_thread;
          } catch {
            const data = await gql<StartData>(
              PLAYGROUND_GQL,
              token,
              START_THREAD_ROOMLESS,
              {
                message: agentMessage,
                projectId,
                timezone,
                uploads: [],
                agentResponseConfig: "force_respond",
              },
              "StartThreadRoomless",
              signal
            );
            start = data.start_thread;
          }
        } else {
          const data = await gql<StartData>(
            PLAYGROUND_GQL,
            token,
            START_THREAD_ROOMLESS,
            {
              message: agentMessage,
              projectId,
              timezone,
              uploads: [],
              agentResponseConfig: "force_respond",
            },
            "StartThreadRoomless",
            signal
          );
          start = data.start_thread;
        }
        threadId = start.thread_id;
        const seed = start.thread_events || [];
        if (seed.length) {
          afterEventId = String(seed[seed.length - 1]!.thread_event_id);
        }
      } else {
        // Follow-up on existing thread — only the latest user turn
        try {
          const data = await gql<{
            send_thread_message: { thread_event_id: string | number };
          }>(
            PLAYGROUND_GQL,
            token,
            SEND_THREAD_MESSAGE,
            {
              message: agentMessage,
              timezone,
              threadId,
              uploads: [],
              agentResponseConfig: "force_respond",
            },
            "SendThreadMessage",
            signal
          );
          afterEventId = String(data.send_thread_message.thread_event_id);
        } catch (sendErr) {
          // Stale client thread id / deleted thread → fall back to a fresh start
          // instead of failing the whole turn or (worse) guessing another cache hit.
          const sendMsg = sendErr instanceof Error ? sendErr.message : String(sendErr);
          if (!/not found|invalid|thread|404|400|permission/i.test(sendMsg)) {
            throw sendErr;
          }
          const data = await gql<{
            start_thread: {
              thread_id: string;
              thread_events?: ThreadEvent[];
            };
          }>(
            PLAYGROUND_GQL,
            token,
            START_THREAD_ROOMLESS,
            {
              message: agentMessage,
              projectId,
              timezone,
              uploads: [],
              agentResponseConfig: "force_respond",
            },
            "StartThreadRoomless",
            signal
          );
          threadId = data.start_thread.thread_id;
          const seed = data.start_thread.thread_events || [];
          afterEventId = seed.length
            ? String(seed[seed.length - 1]!.thread_event_id)
            : "0";
        }
      }

      const { text } = await pollAssistantText({
        token,
        threadId,
        afterEventId,
        signal,
      });

      if (!text) {
        return makeErrorResult(
          502,
          "PromptQL returned empty content",
          body,
          PLAYGROUND_GQL
        );
      }

      // Sticky for next OpenAI multi-turn request (prefix = this full history)
      storePromptQlThreadAfterTurn(projectId, messages, text, threadId);

      const response = wantStream
        ? pseudoStreamResponse(text, clientFacing, threadId)
        : chatCompletionResponse(text, clientFacing, messages, threadId);

      return {
        response,
        url: PLAYGROUND_GQL,
        headers: { Authorization: "Bearer ***" },
        transformedBody: {
          threadId,
          projectId,
          model: clientFacing,
          llmConfigId: llmConfigId || null,
        },
      };
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      const status =
        /JWT|expired|unauthorized|401/i.test(msg) ? 401 : /timeout/i.test(msg) ? 504 : 502;
      return makeErrorResult(status, `PromptQL: ${msg}`, body, PLAYGROUND_GQL);
    }
  }
}

// Re-export catalog for tests / registry
export { PROMPTQL_FALLBACK_MODELS, PLAYGROUND_GQL, CREDITS_GQL, TOKEN_REFRESH_URL };
