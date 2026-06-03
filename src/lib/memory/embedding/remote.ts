import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";
import { createEmbeddingResponse } from "@/lib/embeddings/service";
import type { EmbeddingResult, EmbeddingError } from "./types";

export async function embedRemote(
  text: string,
  model: string
): Promise<EmbeddingResult | EmbeddingError> {
  const t0 = Date.now();

  let resp: Response;
  try {
    resp = await createEmbeddingResponse({ model, input: text });
  } catch (err: unknown) {
    // Network-level errors (ECONNREFUSED, AbortError, etc.)
    const isTimeout =
      err instanceof Error &&
      (err.name === "AbortError" || err.message.toLowerCase().includes("timeout"));
    return {
      source: "remote",
      model,
      reason: isTimeout ? "timeout" : "request_failed",
      message: sanitizeErrorMessage(err instanceof Error ? err.message : String(err)),
    };
  }

  if (!resp.ok) {
    const status = resp.status;
    if (status === 401 || status === 403) {
      return {
        source: "remote",
        model,
        reason: "no_key",
        message: sanitizeErrorMessage(`Embedding provider returned ${status}`),
      };
    }
    if (status === 429) {
      return {
        source: "remote",
        model,
        reason: "rate_limited",
        message: sanitizeErrorMessage(`Embedding provider returned 429 (rate limited)`),
      };
    }
    return {
      source: "remote",
      model,
      reason: "request_failed",
      message: sanitizeErrorMessage(`Embedding provider returned HTTP ${status}`),
    };
  }

  let json: unknown;
  try {
    json = await resp.json();
  } catch (err: unknown) {
    return {
      source: "remote",
      model,
      reason: "request_failed",
      message: sanitizeErrorMessage(
        err instanceof Error ? err.message : "Failed to parse embedding response"
      ),
    };
  }

  try {
    const data = (json as { data?: Array<{ embedding: number[] }> }).data;
    if (!Array.isArray(data) || data.length === 0 || !Array.isArray(data[0].embedding)) {
      return {
        source: "remote",
        model,
        reason: "request_failed",
        message: sanitizeErrorMessage("Unexpected embedding response shape: missing data[0].embedding"),
      };
    }
    const rawVec = data[0].embedding as number[];
    const vector = new Float32Array(rawVec);
    return {
      vector,
      source: "remote",
      model,
      dimensions: vector.length,
      latencyMs: Date.now() - t0,
      cached: false,
    };
  } catch (err: unknown) {
    return {
      source: "remote",
      model,
      reason: "request_failed",
      message: sanitizeErrorMessage(err instanceof Error ? err.message : "Embedding parse error"),
    };
  }
}
