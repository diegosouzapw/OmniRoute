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
export function injectMemory(
  request: ChatRequest,
  memories: Memory[],
  provider: string | null | undefined
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

  if (providerSupportsSystemMessage(provider)) {
    // Strategy 1: inject as a leading system message.
    // Prepending before any existing system messages keeps memory context
    // accessible without overriding the caller's own system instructions.
    const memorySystemMessage: ChatMessage = { role: "system", content: memoryText };
    log.info("memory.injection.injected", {
      count: memories.length,
      strategy: "system",
      model: request.model,
    });
    return { ...request, messages: [memorySystemMessage, ...messages] };
  } else {
    // Strategy 2 (fallback): inject as the first user message.
    // Used for providers like o1-mini that reject the system role.
    const memoryUserMessage: ChatMessage = { role: "user", content: memoryText };
    log.info("memory.injection.injected", {
      count: memories.length,
      strategy: "user",
      model: request.model,
    });
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
