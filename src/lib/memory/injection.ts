/**
 * Memory Injection — prepend retrieved memories into the request message list.
 *
 * Injection strategy:
 *   1. If the provider supports system messages (most providers), inject as a
 *      leading system message so it takes effect without disrupting user turns.
 *   2. Otherwise (fallback for providers that reject system role), inject as the
 *      first user message prefixed with the memory context label.
 *
 * Format: "Memory context: <content>"
 */

import { Memory } from "./types";
import { logger } from "../../../open-sse/utils/logger.ts";

const log = logger("MEMORY_INJECTION");

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
  name?: string;
}

export interface ChatRequest {
  model: string;
  messages: ChatMessage[];
  system?: string;
  temperature?: number;
  max_tokens?: number;
  stream?: boolean;
  [key: string]: unknown;
}

/**
 * Providers known NOT to support a top-level system-role message.
 * These receive memories injected as the first user message instead.
 */
const PROVIDERS_WITHOUT_SYSTEM_MESSAGE = new Set([
  "o1",
  "o1-mini",
  "o1-preview",
  "glm", // GLM/ZhipuAI rejects system role (#1701)
  "glmt", // GLM Thinking variant
  "glm-cn", // GLM China variant
  "zai", // Z.AI uses same GLM backend
  "qianfan", // Baidu ERNIE rejects system role
]);

/**
 * Returns true when the given provider accepts a system-role message.
 * Falls back to true for unknown/null providers (safe default).
 */
export function providerSupportsSystemMessage(provider: string | null | undefined): boolean {
  if (!provider) return true;
  const normalized = provider.toLowerCase().trim();
  return !PROVIDERS_WITHOUT_SYSTEM_MESSAGE.has(normalized);
}

/**
 * Providers that accept a system-role message ONLY at index 0 (a `system`
 * message at any later position is rejected with HTTP 400). For these, the
 * cache-safe mid-array splice (which inserts memory just before the last user
 * turn) is unsafe in multi-turn conversations, so memory must be merged into /
 * prepended as the leading system message instead. See #6135.
 *
 * Populated with the Xiaomi MiMo endpoint (provider id `xiaomi-mimo`, registry
 * alias `mimo`, serving mimo-v2.5) confirmed live to 400 on a non-first system
 * message. Add other providers here only when they are documented as strict.
 */
const PROVIDERS_SYSTEM_MUST_BE_FIRST = new Set(["xiaomi-mimo", "mimo"]);

/**
 * Returns true when the given provider requires the system message to be first.
 * Falls back to false for unknown/null providers (preserves current behavior).
 */
export function systemMessageMustBeFirst(provider: string | null | undefined): boolean {
  if (!provider) return false;
  const normalized = provider.toLowerCase().trim();
  return PROVIDERS_SYSTEM_MUST_BE_FIRST.has(normalized);
}

/**
 * Format memories into a single labeled context string.
 * Format: "Memory context: <content1>\n<content2>..."
 */
export function formatMemoryContext(memories: Memory[]): string {
  if (!memories || memories.length === 0) return "";

  const content = memories
    .map((m) => m.content.trim())
    .filter(Boolean)
    .join("\n");

  return content ? `Memory context: ${content}` : "";
}

/**
 * Inject retrieved memories into the request message array.
 *
 * @param request  - The chat completion request body
 * @param memories - Memories retrieved for the current API key / session
 * @param provider - Provider identifier used to choose injection strategy
 * @returns A new request body with memories prepended to messages
 */
export interface InjectMemoryOptions {
  /**
   * #3890: when the request uses prompt caching (cache_control breakpoints), prepending
   * the memory message at index 0 shifts the entire cacheable prefix — and since the
   * retrieved memories vary per user query, every cache breakpoint then misses on each
   * turn (observed as a sustained cache-miss / cost spike). When `cacheSafe` is set, the
   * memory message is inserted immediately before the LAST user message instead, so the
   * cacheable prefix (system prompt + prior turns) stays byte-stable while memory still
   * contextualizes the current turn.
   */
  cacheSafe?: boolean;
}

/**
 * #6135: place the memory as a leading system message for providers that reject
 * a non-first system role — merging into an existing index-0 system message when
 * present, else prepending. Split out of injectMemory to keep it flat.
 */
function injectSystemFirst(
  request: ChatRequest,
  messages: ChatMessage[],
  memoryText: string,
  count: number
): ChatRequest {
  log.info("memory.injection.injected", { count, strategy: "system-first", model: request.model });
  const first = messages[0];
  if (first && first.role === "system") {
    const merged: ChatMessage = { ...first, content: `${memoryText}\n${first.content}` };
    return { ...request, messages: [merged, ...messages.slice(1)] };
  }
  const memorySystemMessage: ChatMessage = { role: "system", content: memoryText };
  return { ...request, messages: [memorySystemMessage, ...messages] };
}

/**
 * Place a memory message at the #3890 cache-safe anchor (just before the last
 * user turn) when one exists, else prepend it. Shared by the system and user
 * injection strategies to keep injectMemory flat.
 */
function placeMessage(
  request: ChatRequest,
  messages: ChatMessage[],
  msg: ChatMessage,
  cacheSafeIndex: number
): ChatRequest {
  if (cacheSafeIndex >= 0) {
    const next = [...messages];
    next.splice(cacheSafeIndex, 0, msg);
    return { ...request, messages: next };
  }
  return { ...request, messages: [msg, ...messages] };
}

export function injectMemory(
  request: ChatRequest,
  memories: Memory[],
  provider: string | null | undefined,
  options: InjectMemoryOptions = {}
): ChatRequest {
  if (!memories || memories.length === 0) {
    log.info("memory.injection.skipped", { reason: "no_memories", model: request.model });
    return request;
  }

  const memoryText = formatMemoryContext(memories);
  if (!memoryText) {
    log.info("memory.injection.skipped", { reason: "empty_context", model: request.model });
    return request;
  }

  const messages: ChatMessage[] = Array.isArray(request.messages) ? [...request.messages] : [];

  // #3890: in a caching context, anchor the injection just before the LAST user message so
  // the cacheable prefix (system prompt + prior turns) is preserved byte-for-byte. Falls
  // back to a leading message when caching is off or there is no user turn to anchor on.
  const cacheSafeIndex = options.cacheSafe ? messages.findLastIndex((m) => m.role === "user") : -1;

  const supportsSystem = providerSupportsSystemMessage(provider);

  // #6135: strict providers reject a system message at a non-zero index. Never
  // apply the cache-safe mid-array splice for these — keep the system message
  // first (extracted to injectSystemFirst to keep this function flat).
  if (supportsSystem && systemMessageMustBeFirst(provider)) {
    return injectSystemFirst(request, messages, memoryText, memories.length);
  }

  // Strategy 1 (system): prepend before existing system messages, preserving the
  // caller's own instructions. Strategy 2 (user, e.g. o1-mini): inject as a user
  // message. Both honor the #3890 cache-safe anchor via placeMessage.
  const role: ChatMessage["role"] = supportsSystem ? "system" : "user";
  const memoryMessage: ChatMessage = { role, content: memoryText };
  const base = supportsSystem ? "system" : "user";
  log.info("memory.injection.injected", {
    count: memories.length,
    strategy: cacheSafeIndex >= 0 ? `${base}-cache-safe` : base,
    model: request.model,
  });
  return placeMessage(request, messages, memoryMessage, cacheSafeIndex);
}

/**
 * Returns true when memory injection should be attempted for this request.
 */
export function shouldInjectMemory(request: ChatRequest, config?: { enabled?: boolean }): boolean {
  if (config?.enabled === false) return false;
  return Array.isArray(request.messages) && request.messages.length > 0;
}
