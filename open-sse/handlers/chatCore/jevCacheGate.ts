import { isJevFeatureEnabled } from "../../services/jev/config.ts";
import { decideCacheRead } from "../../services/jev/decisions.ts";
import { normalizeConversationForEmbedding } from "../../services/cache/embeddingClient.ts";

export async function maybeAllowJevCacheRead(input: {
  body: Record<string, unknown>;
  model: string;
  log?: { debug?: (...args: unknown[]) => void } | null;
}): Promise<boolean> {
  // Guard against null/non-object body
  if (input.body === null || typeof input.body !== "object") {
    return false;
  }

  // Return false immediately unless Jev cache feature is enabled
  if (!isJevFeatureEnabled("cache")) {
    return false;
  }

  // Build conversation text
  const messages = input.body.messages ?? input.body.input;
  if (!messages) {
    return false;
  }
  const conversationText = normalizeConversationForEmbedding(messages, { historyDepth: 4 });
  if (!conversationText) {
    return false;
  }

  // Extract temperature if present and is a number
  const temperature = typeof input.body.temperature === "number" ? input.body.temperature : null;

  try {
    const { cacheSafe } = await decideCacheRead({
      conversationText,
      temperature,
      model: input.model,
    });
    // Allow only when cacheSafe >= 0.8
    return cacheSafe >= 0.8;
  } catch (error) {
    // Fail-open: keep today's skip (return false) on any error
    input.log?.debug?.("Jev cache read gate error:", error);
    return false;
  }
}
