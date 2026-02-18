/**
 * Role Normalizer — Converts message roles for provider compatibility.
 *
 * Fixes Issues:
 * 1. GLM/ZhipuAI rejects `system` role → merged into first `user` message
 * 2. OpenAI `developer` role not understood by non-OpenAI providers → normalized to `system`
 * 3. Some providers don't support `system` role at all → prepended to user message
 *
 * Provider capability matrix is defined here rather than in the registry to
 * avoid breaking changes to the existing RegistryEntry interface.
 */

// ── Provider capabilities ──────────────────────────────────────────────────

/**
 * Providers that do NOT support the `system` role in messages.
 * For these, system messages are merged into the first user message.
 *
 * Note: This applies only to OpenAI-format passthrough providers.
 * Claude and Gemini have their own system message handling in dedicated translators.
 */
const PROVIDERS_WITHOUT_SYSTEM_ROLE = new Set([
  // Known to reject system role (from troubleshooting report)
  // GLM uses Claude format, so this is handled through claude translator
  // But if accessed through OpenAI-format providers like nvidia, it needs this:
]);

/**
 * Models that are known to reject the `system` role regardless of provider.
 * Uses prefix matching (e.g., "glm-" matches "glm-4.7", "glm-4.5", etc.)
 */
const MODELS_WITHOUT_SYSTEM_ROLE = [
  "glm-", // ZhipuAI GLM models
  "ernie-", // Baidu ERNIE models
];

/**
 * Check if a provider+model combo supports the system role.
 */
function supportsSystemRole(provider: string, model: string): boolean {
  if (PROVIDERS_WITHOUT_SYSTEM_ROLE.has(provider)) return false;

  const modelLower = (model || "").toLowerCase();
  for (const prefix of MODELS_WITHOUT_SYSTEM_ROLE) {
    if (modelLower.startsWith(prefix)) return false;
  }

  return true;
}

/**
 * Normalize the `developer` role to `system` for non-OpenAI providers.
 * OpenAI introduced `developer` as a replacement for `system` in newer models,
 * but most other providers still expect `system`.
 *
 * @param messages - Array of messages
 * @param targetFormat - The target format (e.g., "openai", "claude", "gemini")
 * @returns Modified messages array
 */
export function normalizeDeveloperRole(messages: any[], targetFormat: string): any[] {
  if (!Array.isArray(messages)) return messages;

  // For OpenAI format, keep developer role as-is (it's valid)
  // For all other formats, convert developer → system
  if (targetFormat === "openai") return messages;

  return messages.map((msg) => {
    if (msg.role === "developer") {
      return { ...msg, role: "system" };
    }
    return msg;
  });
}

/**
 * Convert `system` messages to user messages for providers that don't support
 * the system role. The system content is prepended to the first user message
 * with a clear delimiter.
 *
 * @param messages - Array of messages
 * @param provider - Provider name
 * @param model - Model name
 * @returns Modified messages array
 */
export function normalizeSystemRole(messages: any[], provider: string, model: string): any[] {
  if (!Array.isArray(messages) || messages.length === 0) return messages;
  if (supportsSystemRole(provider, model)) return messages;

  // Extract system messages
  const systemMessages = messages.filter((m) => m.role === "system" || m.role === "developer");
  if (systemMessages.length === 0) return messages;

  // Build system content string
  const systemContent = systemMessages
    .map((m) => {
      if (typeof m.content === "string") return m.content;
      if (Array.isArray(m.content)) {
        return m.content
          .filter((c: any) => c.type === "text")
          .map((c: any) => c.text)
          .join("\n");
      }
      return "";
    })
    .filter(Boolean)
    .join("\n\n");

  if (!systemContent) {
    return messages.filter((m) => m.role !== "system" && m.role !== "developer");
  }

  // Remove system messages and merge into first user message
  const nonSystemMessages = messages.filter((m) => m.role !== "system" && m.role !== "developer");

  // Find first user message and prepend system content
  const firstUserIdx = nonSystemMessages.findIndex((m) => m.role === "user");
  if (firstUserIdx >= 0) {
    const userMsg = nonSystemMessages[firstUserIdx];
    const userContent =
      typeof userMsg.content === "string"
        ? userMsg.content
        : Array.isArray(userMsg.content)
          ? userMsg.content
              .filter((c: any) => c.type === "text")
              .map((c: any) => c.text)
              .join("\n")
          : "";

    nonSystemMessages[firstUserIdx] = {
      ...userMsg,
      content: `[System Instructions]\n${systemContent}\n\n[User Message]\n${userContent}`,
    };
  } else {
    // No user message found — insert as a user message at the beginning
    nonSystemMessages.unshift({
      role: "user",
      content: `[System Instructions]\n${systemContent}`,
    });
  }

  return nonSystemMessages;
}

/**
 * Full role normalization pipeline.
 * Call this before sending the request to the provider.
 *
 * @param messages - Array of messages
 * @param provider - Provider name/id
 * @param model - Model name
 * @param targetFormat - Target API format
 * @returns Normalized messages array
 */
export function normalizeRoles(
  messages: any[],
  provider: string,
  model: string,
  targetFormat: string
): any[] {
  if (!Array.isArray(messages)) return messages;

  // Step 1: Normalize developer → system (for non-OpenAI formats)
  let result = normalizeDeveloperRole(messages, targetFormat);

  // Step 2: Normalize system → user (for providers that don't support system role)
  result = normalizeSystemRole(result, provider, model);

  return result;
}
