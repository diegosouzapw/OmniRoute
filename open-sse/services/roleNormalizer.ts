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
 * Providers known to natively accept the OpenAI `developer` role.
 * Issue #2281: When the upstream provider is OpenAI-compatible but NOT in
 * this allowlist (DeepSeek, MiniMax, Mimo, GLM, etc.), the default behavior
 * maps `developer` → `system`. Without this, requests from Codex/Responses
 * API clients fail with "unknown variant `developer`" 400 errors.
 *
 * Operators can still force preservation per-model via the dashboard
 * "Compatibility → preserveOpenAIDeveloperRole = true" toggle.
 */
const PROVIDERS_PRESERVING_DEVELOPER_ROLE = new Set(["openai", "azure-openai", "azure", "github"]);

function defaultPreserveDeveloperForProvider(provider: string): boolean {
  const id = provider.trim().toLowerCase();
  if (!id) return false;
  if (PROVIDERS_PRESERVING_DEVELOPER_ROLE.has(id)) return true;
  // Treat any provider id containing "openai" as OpenAI-compatible enough
  // to preserve developer role by default (e.g. "azure-openai-gov").
  if (id.includes("openai")) return true;
  return false;
}

/**
 * Models that are known to reject the `system` role regardless of provider.
 * Uses prefix matching (e.g., "ernie-" matches "ernie-4.0").
 */
const MODELS_WITHOUT_SYSTEM_ROLE = [
  "ernie-", // Baidu ERNIE models
];

/**
 * ZhipuAI GLM rejects the `system` role EXCEPT generation > 5.0: per z.ai docs,
 * GLM 5.1 / 5.2 (and newer) accept it, so their system prompt must NOT be folded
 * into the first user turn (#5610). Everything else GLM — bare "glm" (Pollinations),
 * the 4.x family, and the 5.0 generation — still needs the fold. The version is read
 * from "glm-<major>.<minor>" or the Fireworks "glm-5p1" point alias.
 */
function isGlmWithoutSystemRole(modelLower: string): boolean {
  if (!modelLower.startsWith("glm")) return false;
  const match = modelLower.match(/glm-?(\d+)(?:[.p](\d+))?/);
  if (match) {
    const major = Number(match[1]);
    const minor = match[2] ? Number(match[2]) : 0;
    if (major > 5 || (major === 5 && minor >= 1)) return false;
  }
  return true;
}

const PROVIDER_SCOPED_MODELS_WITHOUT_SYSTEM_ROLE: Record<string, RegExp[]> = {
  // ZenMux exposes Z.AI GLM through OpenAI-compatible model ids such as
  // "z-ai/glm-5.2". Z.AI rejects compressed histories that start with a
  // system summary followed by an assistant/tool bundle, while OpenRouter
  // tolerates the same shape. Treat these vendor-prefixed GLM ids like native
  // GLM so normalizeSystemRole moves system/developer content into a user turn.
  zenmux: [/(?:^|\/)glm(?:-|$)/i],
};

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
  const providerLower = (provider || "").trim().toLowerCase();
  if (PROVIDERS_WITHOUT_SYSTEM_ROLE.has(providerLower)) return false;

  const modelLower = (model || "").toLowerCase();

  for (const pattern of PROVIDER_SCOPED_MODELS_WITHOUT_SYSTEM_ROLE[providerLower] ?? []) {
    if (pattern.test(modelLower)) return false;
  }

  if (isGlmWithoutSystemRole(modelLower)) return false;

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
 * Logic:
 * - When targetFormat !== "openai": always convert developer → system (Claude, Gemini, etc.).
 * - When targetFormat === "openai" && preserveDeveloperRole === false: map to system.
 * - When targetFormat === "openai" && preserveDeveloperRole === true: keep developer.
 * - When targetFormat === "openai" && preserveDeveloperRole === undefined (default):
 *   resolve from {@link defaultPreserveDeveloperForProvider} — preserve only for
 *   the OpenAI-compatible allowlist; map to system for everyone else (#2281).
 *
 * @param messages - Array of messages
 * @param targetFormat - The target format (e.g., "openai", "claude", "gemini")
 * @param preserveDeveloperRole - undefined = provider-driven default; true = always keep; false = always map to system
 * @param provider - Provider id (used when preserveDeveloperRole is undefined)
 */
export function normalizeDeveloperRole(
  messages: NormalizedMessage[] | unknown,
  targetFormat: string,
  preserveDeveloperRole?: boolean,
  provider?: string
): NormalizedMessage[] | unknown {
  if (!Array.isArray(messages)) return messages;

  if (targetFormat === "openai") {
    const effectivePreserve =
      preserveDeveloperRole !== undefined
        ? preserveDeveloperRole
        : defaultPreserveDeveloperForProvider(provider ?? "");
    if (effectivePreserve) return messages;
  }

  return messages.map((msg: NormalizedMessage) => {
    if (!msg || typeof msg !== "object") return msg;
    const role = typeof msg.role === "string" ? msg.role : "";
    if (role.toLowerCase() === "developer") {
      return { ...msg, role: "system" };
    }
    return msg;
  });
}

export function normalizeModelRole(
  messages: NormalizedMessage[] | unknown
): NormalizedMessage[] | unknown {
  if (!Array.isArray(messages)) return messages;

  return messages.map((msg: NormalizedMessage) => {
    if (!msg || typeof msg !== "object") return msg;
    const role = typeof msg.role === "string" ? msg.role : "";
    if (role.toLowerCase() === "model") {
      return { ...msg, role: "assistant" };
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
 * Applies developer→system (when needed) then system→user for providers/models that do not support system role.
 *
 * @param messages - Array of messages to normalize (or non-array, returned as-is)
 * @param provider - Provider id for capability lookup (e.g. system role support)
 * @param model - Model id for capability lookup
 * @param targetFormat - Target request format (e.g. "openai", "claude", "gemini"); see {@link normalizeDeveloperRole}
 * @param preserveDeveloperRole - Optional; see {@link normalizeDeveloperRole}. When false, developer role is mapped to system.
 * @returns Normalized messages array, or the original value if messages is not an array
 */
export function normalizeRoles(
  messages: NormalizedMessage[] | unknown,
  provider: string,
  model: string,
  targetFormat: string,
  preserveDeveloperRole?: boolean
): NormalizedMessage[] | unknown {
  if (!Array.isArray(messages)) return messages;

  let result = normalizeModelRole(messages);
  result = normalizeDeveloperRole(result, targetFormat, preserveDeveloperRole, provider);
  result = normalizeSystemRole(result, provider, model);

  return result;
}
