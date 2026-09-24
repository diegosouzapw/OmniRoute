/**
 * Semantic Cache Embedding Client
 *
 * Normalizes conversation history into embeddable text representation and
 * orchestrates embedding vector generation with timeout and fail-open resilience.
 *
 * @module services/cache/embeddingClient
 */

export interface EmbeddingResult {
  embedding: number[];
  inputTokens: number;
}

export type EmbeddingGenerator = (
  text: string,
  options?: {
    model?: string;
    provider?: string;
    signal?: AbortSignal;
  }
) => Promise<EmbeddingResult | null>;

function extractTextFromContent(content: unknown): string {
  if (typeof content === "string") return content.trim();
  if (Array.isArray(content)) {
    const parts: string[] = [];
    for (const part of content) {
      if (typeof part === "string") {
        parts.push(part);
      } else if (part && typeof part === "object") {
        const item = part as Record<string, unknown>;
        if (typeof item.text === "string") {
          parts.push(item.text);
        } else if (item.type === "text" && typeof item.content === "string") {
          parts.push(item.content);
        }
      }
    }
    return parts.join(" ").trim();
  }
  if (content && typeof content === "object") {
    const record = content as Record<string, unknown>;
    if (typeof record.text === "string") return record.text.trim();
  }
  return "";
}

/**
 * Normalizes conversation history into a single clean text string for embedding.
 *
 * @param conversation - messages[] or input[] from chat completion or responses API
 * @param options - depth and system prompt filtering
 */
export function normalizeConversationForEmbedding(
  conversation: unknown,
  options?: {
    excludeSystemPrompt?: boolean;
    historyDepth?: number;
  }
): string {
  if (typeof conversation === "string") {
    return conversation.trim();
  }
  if (!Array.isArray(conversation) || conversation.length === 0) {
    return "";
  }

  const excludeSystem = options?.excludeSystemPrompt ?? false;
  const depth = options?.historyDepth ?? 3;

  // Filter messages
  const filtered = conversation.filter((item) => {
    if (!item || typeof item !== "object") return false;
    const role = (item as Record<string, unknown>).role;
    if (excludeSystem && (role === "system" || role === "developer")) {
      return false;
    }
    return true;
  });

  // Take the tail of conversation up to historyDepth
  const tail = depth > 0 ? filtered.slice(-depth) : filtered;

  const lines: string[] = [];
  for (const item of tail) {
    const record = item as Record<string, unknown>;
    const role = typeof record.role === "string" ? record.role : "user";
    const text = extractTextFromContent(record.content);
    if (text) {
      lines.push(`${role}: ${text}`);
    }
  }

  return lines.join("\n").trim();
}

/**
 * Executes embedding generation with fail-open timeout guard.
 */
export async function generateEmbeddingWithTimeout(
  text: string,
  generator: EmbeddingGenerator,
  options?: {
    model?: string;
    provider?: string;
    timeoutMs?: number;
  }
): Promise<EmbeddingResult | null> {
  if (!text || text.length === 0) return null;

  const timeoutMs = options?.timeoutMs ?? 3000;
  const controller = new AbortController();
  let timer: NodeJS.Timeout | undefined;

  const timeoutPromise = new Promise<null>((resolve) => {
    timer = setTimeout(() => {
      controller.abort();
      console.warn(`[CACHE] Embedding generation timed out after ${timeoutMs}ms`);
      resolve(null);
    }, timeoutMs);
  });

  try {
    const generatorPromise = generator(text, {
      model: options?.model,
      provider: options?.provider,
      signal: controller.signal,
    });

    const res = await Promise.race([generatorPromise, timeoutPromise]);
    return res;
  } catch (err) {
    const isTimeout = controller.signal.aborted;
    console.warn(
      `[CACHE] Embedding generation ${isTimeout ? "timed out" : "failed"}:`,
      (err as Error).message
    );
    return null;
  } finally {
    if (timer) clearTimeout(timer);
  }
}

/**
 * Creates a standard HTTP embedding generator against any OpenAI-compatible
 * embeddings endpoint (e.g. Lemonade server, OpenAI, Ollama).
 */
export function createDefaultEmbeddingGenerator(config: {
  embeddingProvider?: string;
  embeddingModel?: string;
  embeddingBaseUrl?: string;
  embeddingApiKey?: string;
}): EmbeddingGenerator {
  return async (
    text: string,
    options?: { model?: string; provider?: string; signal?: AbortSignal }
  ) => {
    const model = options?.model || config.embeddingModel || "text-embedding-3-small";
    const provider = options?.provider || config.embeddingProvider || "openai";

    let targetUrl = config.embeddingBaseUrl;
    if (targetUrl) {
      targetUrl = targetUrl.trim();
      if (!targetUrl.endsWith("/embeddings")) {
        if (!targetUrl.endsWith("/v1")) {
          targetUrl = `${targetUrl.replace(/\/+$/, "")}/v1/embeddings`;
        } else {
          targetUrl = `${targetUrl.replace(/\/+$/, "")}/embeddings`;
        }
      }
    }
    const apiKey = config.embeddingApiKey;

    if (!targetUrl) {
      if (provider === "lemonade") {
        targetUrl = "http://localhost:13305/v1/embeddings";
      } else if (provider === "ollama-local") {
        targetUrl = "http://localhost:11434/v1/embeddings";
      }
    }

    if (!targetUrl) {
      return null;
    }

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (apiKey) {
      headers["Authorization"] = `Bearer ${apiKey}`;
    }

    try {
      const res = await fetch(targetUrl, {
        method: "POST",
        headers,
        body: JSON.stringify({
          model,
          input: text,
        }),
        signal: options?.signal,
      });

      if (!res.ok) {
        const errText = await res.text().catch(() => "");
        console.warn(`[CACHE] Default embedding request failed HTTP ${res.status}: ${errText}`);
        return null;
      }

      const json = (await res.json()) as {
        data?: Array<{ embedding?: number[] }>;
        usage?: { prompt_tokens?: number; total_tokens?: number };
      };

      const vec = json?.data?.[0]?.embedding;
      if (Array.isArray(vec) && vec.length > 0) {
        return {
          embedding: vec,
          inputTokens: json?.usage?.prompt_tokens ?? 0,
        };
      }
      return null;
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        console.warn("[CACHE] Default embedding fetch error:", (err as Error).message);
      }
      return null;
    }
  };
}
