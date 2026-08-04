/**
 * PromptQL executor — thread session cache (multi-turn OpenAI → one PromptQL thread).
 *
 * BUG (pre-fix): cache key = sha256(projectId + first user message only).
 * Agent clients (SkillsManager, UREW pins, shared greetings) often share the
 * same first user turn across independent chats → follow-ups land on a random
 * older PromptQL thread.
 *
 * FIX (Perplexity/Notion style):
 *  1. Prefer explicit client thread id (body.promptql_thread_id / headers)
 *  2. Else lookup by fingerprint of FULL history prefix (all non-system turns
 *     BEFORE the last user message). Requires prior assistant content.
 *  3. First turn / no assistant history → always start_thread (never sticky)
 *  4. After each successful reply, store under fingerprint(full history + asst)
 *     so the next request's prefix matches exactly one conversation.
 */
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { extractMessageTextFromMessage, isUserLikeRole, type ChatMessage } from "./messageText.ts";

export interface PromptQlRequestBody {
  messages?: ChatMessage[];
  model?: string;
  promptql_thread_id?: string;
  thread_id?: string;
}

function readStr(v: unknown): string {
  if (typeof v !== "string") return "";
  const t = v.trim();
  return t.length ? t : "";
}

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
  if (!r || r === "system" || r === "developer") return false;
  // tool/function ARE fingerprint roles when they carry prior-turn results, but we
  // normalize them to "user" below so client tool-role vs user-role does not diverge.
  return true;
}

/**
 * Normalize user/assistant text for fingerprints so proxy rewrites (UREW pins,
 * agent_mention wrappers, soft PromptQL preambles, tool-result wrappers) don't
 * break multi-turn thread sticky. Live SPA always reuses threadId; OpenAI multi-turn must too.
 */
export function normalizeForFingerprint(text: string): string {
  let t = (text || "").replace(/\r\n/g, "\n");
  t = t.replace(/<agent_mention\s*\/>/gi, "");
  t = t.replace(/<\/?agent_mention>/gi, "");
  // Client @mentions prefix (e.g. "@test Here is data returned…")
  t = t.replace(/^@\S+\s+/gm, "");
  // Soft / hard user-pin wrappers — keep only the real task when present
  t = t.replace(/^[\s\S]*?\bUser request:\s*/i, "");
  t = t.replace(/^[\s\S]*?\bHere is my request:\s*/i, "");
  t = t.replace(/^[\s\S]*?\bCurrent request:\s*/i, "");
  t = t.replace(/^[\s\S]*?\bMy current task:\s*/i, "");
  // Tool-result follow-up wrappers (WinUI soft PromptQL / generic agentic)
  t = t.replace(
    /^Here is data returned by my desktop application[\s\S]*?(?:\n\n|$)/i,
    ""
  );
  t = t.replace(
    /^Here is the output from my local tool[\s\S]*?(?:\n\n|$)/i,
    ""
  );
  t = t.replace(
    /\n\nBased on this result[\s\S]*$/i,
    ""
  );
  t = t.replace(
    /\n\n(?:Please |If a structured)[\s\S]*$/i,
    ""
  );
  // Soft PromptQL first-turn preamble (strip when whole message is pin+request)
  if (/interoperability layer between PromptQL/i.test(t)) {
    const m = t.match(/\bCurrent request:\s*([\s\S]+)$/i);
    if (m) t = m[1]!;
  }
  // Collapse whitespace for stable hashes across minor reformats
  t = t.replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n");
  return t.trim().slice(0, 2000);
}

/**
 * Tool-name signature from assistant text / tool_calls — survives JSON reformatting
 * of args while still distinguishing different tools.
 */
export function extractToolNameSignature(text: string): string {
  if (!text) return "";
  const names = new Set<string>();
  for (const m of text.matchAll(/"tool"\s*:\s*"([^"]+)"/g)) names.add(m[1]!.toLowerCase());
  for (const m of text.matchAll(/tool_call:([A-Za-z0-9_.-]+):/g)) names.add(m[1]!.toLowerCase());
  for (const m of text.matchAll(/function_call:([A-Za-z0-9_.-]+):/g)) names.add(m[1]!.toLowerCase());
  for (const m of text.matchAll(/\[tool result for\s+([^\]]+)\]/gi)) {
    names.add(m[1]!.trim().toLowerCase());
  }
  return [...names].sort().join(",");
}

/**
 * Stable fingerprint of an ordered conversation slice.
 * Excludes system/developer. Tool roles are mapped to user for stability.
 */
export function conversationFingerprint(projectId: string, messages: ChatMessage[]): string {
  const parts: string[] = [`project:${projectId}`];
  for (const m of messages) {
    const roleRaw = (m?.role || "").toLowerCase();
    if (!isFingerprintRole(roleRaw)) continue;
    const role =
      roleRaw === "tool" || roleRaw === "function" || roleRaw === "human" ? "user" : roleRaw;
    // Skip pure-user tool-result wrappers? No — include normalized body.
    const text = normalizeForFingerprint(extractMessageTextFromMessage(m));
    if (!text) continue;
    parts.push(`${role}:${text}`);
  }
  const h = createHash("sha256").update(parts.join("\n")).digest("hex").slice(0, 32);
  return `pql:${projectId}:${h}`;
}

/** All sticky keys derived from the last assistant message (full text + tool names). */
export function lastAssistantStickyKeys(projectId: string, messages: ChatMessage[]): string[] {
  const keys: string[] = [];
  const seen = new Set<string>();
  const push = (k: string | null | undefined) => {
    if (!k || seen.has(k)) return;
    seen.add(k);
    keys.push(k);
  };
  for (let i = messages.length - 1; i >= 0; i--) {
    const role = (messages[i]?.role || "").toLowerCase();
    if (role !== "assistant" && role !== "ai" && role !== "model") continue;
    const raw = extractMessageTextFromMessage(messages[i]);
    const text = normalizeForFingerprint(raw);
    if (text) {
      const h = createHash("sha256").update(text).digest("hex").slice(0, 24);
      push(`pql:${projectId}:asst:${h}`);
    }
    const tools = extractToolNameSignature(raw);
    if (tools) {
      const h = createHash("sha256").update(tools).digest("hex").slice(0, 16);
      push(`pql:${projectId}:tools:${h}`);
    }
    break;
  }
  return keys;
}

/** Rolling sticky key: last assistant reply alone (survives last-user rewrites). */
export function lastAssistantFingerprint(projectId: string, messages: ChatMessage[]): string | null {
  return lastAssistantStickyKeys(projectId, messages)[0] ?? null;
}

/** Messages before the last user/tool turn (OpenAI multi-turn prefix). */
export function historyPrefixBeforeLastUser(messages: ChatMessage[]): ChatMessage[] {
  let lastUser = -1;
  for (let i = messages.length - 1; i >= 0; i--) {
    if (isUserLikeRole(messages[i]?.role || "")) {
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
    if (r === "assistant" || r === "ai" || r === "model") return true;
    return false;
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
 *
 * Lookup order (mirrors live SPA send1=start_thread / send2=send_thread_message):
 *  1. Explicit client thread id
 *  2. Full history-prefix fingerprint (user+assistant before last user/tool)
 *  3. Last-assistant sticky keys (full text + tool-name signature)
 *     — survives UREW/soft-pin rewrites AND OpenAI tool_calls-only assistant rows
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
  }

  // Fallback: last assistant sticky keys (text + tool names). Prefer scanning the
  // prefix; if empty (e.g. tool-only last turn), scan full history.
  if (hasAssistantMessage(messages)) {
    const scope = prefix.length ? prefix : messages;
    for (const asstKey of lastAssistantStickyKeys(projectId, scope)) {
      const cached = getThreadBinding(asstKey);
      if (cached?.threadId && cached.projectId === projectId) {
        return { threadId: cached.threadId, isFollowUp: true, prefixKey: asstKey };
      }
    }
    // Also try full messages (assistant may only appear after a tool-only prefix miss)
    if (scope !== messages) {
      for (const asstKey of lastAssistantStickyKeys(projectId, messages)) {
        const cached = getThreadBinding(asstKey);
        if (cached?.threadId && cached.projectId === projectId) {
          return { threadId: cached.threadId, isFollowUp: true, prefixKey: asstKey };
        }
      }
    }
  }

  // First turn or no sticky match: mint a new PromptQL thread.
  return { threadId: "", isFollowUp: false, prefixKey: null };
}

/**
 * Persist sticky keys so the NEXT request's history prefix resolves to this thread.
 * Stores under fingerprint(messages + assistant) which equals the next turn's prefix,
 * plus last-assistant text/tool-name keys that survive last-user rewrites and tool_calls reshape.
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
  // Only store if there is at least one user-like + assistant pair.
  if (
    !hasAssistantMessage(full) ||
    !messages.some((m) => isUserLikeRole(m.role || ""))
  ) {
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
  // Rolling last-assistant keys (full text + tool-name signature)
  for (const asstKey of lastAssistantStickyKeys(projectId, full)) {
    setThreadBinding(asstKey, binding);
  }
  // If the assistant reply embeds tool names, also bind tool-signature alone from raw text
  // (lastAssistantStickyKeys already does this; kept for clarity).
  return key;
}
