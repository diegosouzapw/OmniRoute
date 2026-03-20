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

interface MessageContentPart {
  type?: string;
  text?: string;
  [key: string]: unknown;
}

interface NormalizedMessage {
  role?: string;
  content?: unknown;
  [key: string]: unknown;
}

function extractTextFromContent(content: unknown): string {
  if (typeof content === "string") return content;
  if (!Array.isArray(content)) return "";
  return content
    .filter(
      (part): part is MessageContentPart =>
        !!part &&
        typeof part === "object" &&
        "type" in part &&
        (part as MessageContentPart).type === "text"
    )
    .map((part) => (typeof part.text === "string" ? part.text : ""))
    .join("\n");
}

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
 * Normalize the `developer` role to `system` when the upstream does not support it.
 * OpenAI Responses API sends `developer`; MiniMax and most OpenAI-compatible gateways
 * only accept system/user/assistant/tool and return "role param error" otherwise.
 *
 * @param messages - Array of messages
 * @param targetFormat - The target format (e.g., "openai", "claude", "gemini")
 * @param preserveDeveloperRole - For targetFormat openai: undefined/true = keep developer (legacy default); false = map to system (MiniMax etc.)
 */
export function normalizeDeveloperRole(
  messages: NormalizedMessage[] | unknown,
  targetFormat: string,
  preserveDeveloperRole?: boolean
): NormalizedMessage[] | unknown {
  if (!Array.isArray(messages)) return messages;

  if (targetFormat === "openai" && preserveDeveloperRole !== false) return messages;

  return messages.map((msg: NormalizedMessage) => {
    if (!msg || typeof msg !== "object") return msg;
    const role = typeof msg.role === "string" ? msg.role : "";
    if (role.toLowerCase() === "developer") {
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
export function normalizeSystemRole(
  messages: NormalizedMessage[] | unknown,
  provider: string,
  model: string
): NormalizedMessage[] | unknown {
  if (!Array.isArray(messages) || messages.length === 0) return messages;
  if (supportsSystemRole(provider, model)) return messages;

  // Extract system messages
  const systemMessages = messages.filter(
    (message: NormalizedMessage) => message.role === "system" || message.role === "developer"
  );
  if (systemMessages.length === 0) return messages;

  // Build system content string
  const systemContent = systemMessages
    .map((message: NormalizedMessage) => extractTextFromContent(message.content))
    .filter(Boolean)
    .join("\n\n");

  if (!systemContent) {
    return messages.filter(
      (message: NormalizedMessage) => message.role !== "system" && message.role !== "developer"
    );
  }

  // Remove system messages and merge into first user message
  const nonSystemMessages = messages.filter(
    (message: NormalizedMessage) => message.role !== "system" && message.role !== "developer"
  );

  // Find first user message and prepend system content
  const firstUserIdx = nonSystemMessages.findIndex(
    (message: NormalizedMessage) => message.role === "user"
  );
  if (firstUserIdx >= 0) {
    const userMsg = nonSystemMessages[firstUserIdx];
    const userContent = extractTextFromContent(userMsg.content);

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
 * @param preserveDeveloperRole - See {@link normalizeDeveloperRole}
 */
export function normalizeRoles(
  messages: NormalizedMessage[] | unknown,
  provider: string,
  model: string,
  targetFormat: string,
  preserveDeveloperRole?: boolean
): NormalizedMessage[] | unknown {
  if (!Array.isArray(messages)) return messages;

  let result = normalizeDeveloperRole(messages, targetFormat, preserveDeveloperRole);
  result = normalizeSystemRole(result, provider, model);

  return result;
}
