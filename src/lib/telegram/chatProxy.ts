/**
 * Telegram → OmniRoute chat proxy.
 *
 * Turns a plain Telegram message into a chat.completions call through the
 * existing handleChat pipeline and returns the assistant text. Non-streaming
 * for Phase 1 (Telegram has no native SSE); streaming is emulated later via
 * progressive editMessageText.
 *
 * Auth model: each Telegram user is mapped to a generated OmniRoute API key
 * (createApiKey) so the existing policy/rate-limit/model-allowlist machinery
 * applies unchanged. The key is cached in-memory per user id.
 */
import { handleChat } from "@/sse/handlers/chat";
import { createApiKey, getApiKeys } from "@/lib/db/apiKeys";
import { getConsistentMachineId } from "@/shared/utils/machineId";
import { randomUUID } from "node:crypto";

const DEFAULT_MODEL = process.env.TELEGRAM_DEFAULT_MODEL || "auto/chat";

/**
 * Resolve (and lazily mint) an OmniRoute API key for a Telegram user.
 * Returns the plaintext key value, cached per user id.
 */
const keyCache = new Map<number, string>();

export async function resolveUserApiKey(telegramUserId: number): Promise<string> {
  const cached = keyCache.get(telegramUserId);
  if (cached) return cached;

  const machineId = (await getConsistentMachineId().catch(() => null)) || "0000000000000000";

  // Reuse an existing key whose name matches, else mint one.
  const existing = await getApiKeys();
  const match = existing?.find(
    (k) =>
      (k as { name?: string }).name === `telegram:${telegramUserId}` &&
      typeof (k as { key?: string }).key === "string" &&
      ((k as { key?: string }).key?.length ?? 0) > 0
  );
  const matchKey = (match as { key?: string } | undefined)?.key;
  if (typeof matchKey === "string" && matchKey.length > 0) {
    keyCache.set(telegramUserId, matchKey);
    return matchKey;
  }

  const created = await createApiKey(`telegram:${telegramUserId}`, machineId);
  keyCache.set(telegramUserId, created.key);
  return created.key;
}

function buildChatRequest(apiKey: string, prompt: string, model: string): Request {
  const body = JSON.stringify({
    model,
    messages: [{ role: "user", content: prompt }],
    stream: false,
  });
  const headers = new Headers({
    "content-type": "application/json",
    authorization: `Bearer ${apiKey}`,
  });
  return new Request("http://127.0.0.1/v1/chat/completions", {
    method: "POST",
    headers,
    body,
  });
}

/** Extract plain assistant text from a handleChat Response (stream or not). */
async function extractResponseText(response: Response): Promise<string> {
  if (!response) return "";
  if (response.body) {
    // Non-streaming JSON: {"choices":[{"message":{"content": "..."}}]}
    try {
      const text = await response.text();
      const json = JSON.parse(text) as {
        choices?: Array<{ message?: { content?: string }; text?: string }>;
        error?: { message?: string };
      };
      if (json.error?.message) return `⚠️ ${json.error.message}`;
      const choice = json.choices?.[0];
      return choice?.message?.content ?? choice?.text ?? "";
    } catch {
      return "";
    }
  }
  return "";
}

/**
 * Proxy one user prompt through the OmniRoute chat pipeline.
 * @returns assistant text (may be empty on failure)
 */
export async function proxyChat(
  telegramUserId: number,
  prompt: string,
  model = DEFAULT_MODEL
): Promise<string> {
  if (!prompt?.trim()) return "";
  const apiKey = await resolveUserApiKey(telegramUserId);
  const request = buildChatRequest(apiKey, prompt.trim(), model);
  const response = await handleChat(request, null, null);
  return extractResponseText(response);
}

export { DEFAULT_MODEL };
export { randomUUID };
