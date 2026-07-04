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
 * Providers that enforce system messages only at index 0 (strict).
 * When memory injection uses cache-safe mode, these providers cannot accept a
 * system message mid-array — it must be merged into or placed at index 0.
 * (#6135)
 */
const PROVIDERS_SYSTEM_MUST_BE_FIRST = new Set([
  "xiaomi-mimo", // Xiaomi MiMo throws 400 if system message is not at index 0
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
 * Returns true when the given provider requires system messages only at index 0.
 * Falls back to false for unknown/null providers (lenient default).
 */
export function providerSystemMustBeFirst(provider: string | null | undefined): boolean {
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
  /**
   * When true, system messages MUST appear at index 0 in the messages array.
   * If `cacheSafe` is also true, the memory system message is merged into the
   * existing index-0 system message (or unshifted to index 0) instead of being
   * spliced mid-array. This prevents 400 errors from strict providers like
   * Xiaomi MiMo. (#6135)
   */
  systemMessageMustBeFirst?: boolean;
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

  // #6135: some strict providers (e.g. Xiaomi MiMo) require system messages ONLY at index 0.
  // Auto-detected from PROVIDERS_SYSTEM_MUST_BE_FIRST, or overridden via options.
  // When strict, we cannot splice a system message mid-array — instead we merge into the
  // existing system[0] or unshift to front.
  const isStrictSystem = !!options.systemMessageMustBeFirst || providerSystemMustBeFirst(provider);

  if (providerSupportsSystemMessage(provider)) {
    const memorySystemMessage: ChatMessage = { role: "system", content: memoryText };

    if (isStrictSystem) {
      // Strict provider: system message must be at index 0.
      // If an existing system message exists at index 0, merge memory into it.
      // Otherwise, unshift the memory system message to index 0.
      const firstSystemIdx = messages.findIndex((m) => m.role === "system");
      if (firstSystemIdx === 0) {
        // Merge memory context into the existing system message at index 0.
        const merged = [
          { ...messages[0], content: `${memoryText}\n\n${messages[0].content}` },
          ...messages.slice(1),
        ];
        log.info("memory.injection.injected", {
          count: memories.length,
          strategy: "system-strict-merge",
          model: request.model,
        });
        return { ...request, messages: merged };
      }
      // No system message at index 0 — unshift memory to front.
      log.info("memory.injection.injected", {
        count: memories.length,
        strategy: "system-strict-unshift",
        model: request.model,
      });
      return { ...request, messages: [memorySystemMessage, ...messages] };
    }

    // Lenient path: cache-safe splices before last user, otherwise unshifts to front.
    log.info("memory.injection.injected", {
      count: memories.length,
      strategy: cacheSafeIndex >= 0 ? "system-cache-safe" : "system",
      model: request.model,
    });
    if (cacheSafeIndex >= 0) {
      const next = [...messages];
      next.splice(cacheSafeIndex, 0, memorySystemMessage);
      return { ...request, messages: next };
    }
    return { ...request, messages: [memorySystemMessage, ...messages] };
  } else {
    // Strategy 2 (fallback): inject as a user message.
    // Used for providers like o1-mini that reject the system role.
    const memoryUserMessage: ChatMessage = { role: "user", content: memoryText };
    log.info("memory.injection.injected", {
      count: memories.length,
      strategy: cacheSafeIndex >= 0 ? "user-cache-safe" : "user",
      model: request.model,
    });
    if (cacheSafeIndex >= 0) {
      const next = [...messages];
      next.splice(cacheSafeIndex, 0, memoryUserMessage);
      return { ...request, messages: next };
    }
    return { ...request, messages: [memoryUserMessage, ...messages] };
  }
}

/**
 * Returns true when memory injection should be attempted for this request.
 */
export function shouldInjectMemory(request: ChatRequest, config?: { enabled?: boolean }): boolean {
  if (config?.enabled === false) return false;
  return Array.isArray(request.messages) && request.messages.length > 0;
}
