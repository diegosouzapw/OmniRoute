/**
 * chatCore non-SSE JSON → SSE conversion (Quality Gate v2 / Fase 9 — chatCore god-file
 * decomposition, #3501).
 *
 * Extracted from handleChatCore's streaming entry (#3089): some "reasoning" openai-compatible
 * upstreams ignore `stream:true` and return a complete application/json chat-completion body
 * instead of an SSE stream. The readiness check only recognizes SSE `data:` frames, so that body
 * produced a spurious STREAM_EARLY_EOF / HTTP 502. Detect a JSON (non-SSE) upstream body and
 * synthesize an equivalent OpenAI SSE stream so the streaming pipeline gets a valid stream.
 *
 * Returns the (possibly rebuilt) provider response — unchanged when the body is not a non-SSE JSON
 * body, an SSE stream when convertible, or a rebuilt-with-consumed-body response otherwise (so the
 * existing readiness/error path still runs unchanged). Behaviour is byte-identical to the previous
 * inline block.
 */
import { withBodyTimeout as defaultWithBodyTimeout } from "../../utils/stream.ts";
import { synthesizeOpenAiSseFromJson as defaultSynthesize } from "../../utils/jsonToSse.ts";

type LoggerLike = { debug?: (...args: unknown[]) => void } | null | undefined;

export interface JsonBodyToSseDeps {
  withBodyTimeout: typeof defaultWithBodyTimeout;
  synthesizeOpenAiSseFromJson: typeof defaultSynthesize;
}

const DEFAULT_DEPS: JsonBodyToSseDeps = {
  withBodyTimeout: defaultWithBodyTimeout,
  synthesizeOpenAiSseFromJson: defaultSynthesize,
};

function prependBufferedChunks(
  chunks: Uint8Array[],
  reader: ReadableStreamDefaultReader<Uint8Array>
): ReadableStream<Uint8Array> {
  let index = 0;
  return new ReadableStream<Uint8Array>({
    async pull(controller) {
      if (index < chunks.length) {
        controller.enqueue(chunks[index++]);
        return;
      }
      try {
        const { done, value } = await reader.read();
        if (done) {
          controller.close();
        } else {
          controller.enqueue(value);
        }
      } catch (error) {
        controller.error(error);
      }
    },
    async cancel(reason) {
      try {
        await reader.cancel(reason);
      } catch {}
    },
  });
}

function classifyBodyPrefix(text: string): "sse" | "non-sse" | "unknown" {
  const trimmed = text.replace(/^\uFEFF/, "").trimStart();
  if (!trimmed) return "unknown";
  if (trimmed.startsWith(":")) return "sse";
  if (/^(?:data|event|id|retry)\s*:/i.test(trimmed)) return "sse";

  const lower = trimmed.toLowerCase();
  for (const field of ["data", "event", "id", "retry"]) {
    if (field.startsWith(lower)) return "unknown";
    if (lower.startsWith(field)) {
      const rest = lower.slice(field.length);
      if (/^\s*$/.test(rest)) return "unknown";
      if (/^\s*:/.test(rest)) return "sse";
    }
  }

  return "non-sse";
}

async function sniffJsonBodyForSse(
  providerResponse: Response,
  ctx: { log?: LoggerLike; provider: string | null | undefined; model: string | null | undefined },
  deps: JsonBodyToSseDeps
): Promise<{ sseResponse?: Response; jsonBody: Response }> {
  const reader = providerResponse.body!.getReader();
  const bufferedChunks: Uint8Array[] = [];
  const decoder = new TextDecoder();
  let sniffed = "";
  let sniffedBytes = 0;
  const maxSniffBytes = 4096;
  while (sniffedBytes < maxSniffBytes) {
    const chunk = await deps.withBodyTimeout<ReadableStreamReadResult<Uint8Array>>(reader.read());
    if (chunk.done || !chunk.value) break;
    bufferedChunks.push(chunk.value);
    sniffedBytes += chunk.value.byteLength;
    sniffed += decoder.decode(chunk.value, { stream: true });

    if (classifyBodyPrefix(sniffed) === "sse") {
      const rebuiltHeaders = new Headers(providerResponse.headers);
      rebuiltHeaders.delete("content-length");
      rebuiltHeaders.set("content-type", "text/event-stream");
      ctx.log?.debug?.(
        "STREAM",
        `Upstream returned SSE bytes with application/json content-type — preserving streaming body (${ctx.provider}/${ctx.model})`
      );
      return {
        sseResponse: new Response(prependBufferedChunks(bufferedChunks, reader), {
          status: providerResponse.status,
          statusText: providerResponse.statusText,
          headers: rebuiltHeaders,
        }),
        jsonBody: new Response(null),
      };
    }
  }

  return { jsonBody: new Response(prependBufferedChunks(bufferedChunks, reader)) };
}

export async function maybeConvertJsonBodyToSse(
  providerResponse: Response,
  ctx: { log?: LoggerLike; provider: string | null | undefined; model: string | null | undefined },
  deps: JsonBodyToSseDeps = DEFAULT_DEPS
): Promise<Response> {
  const upstreamContentType = (providerResponse.headers.get("content-type") || "").toLowerCase();
  const isNonSseJsonBody =
    !!providerResponse.body &&
    upstreamContentType.includes("application/json") &&
    !upstreamContentType.includes("text/event-stream") &&
    !upstreamContentType.includes("application/x-ndjson");
  if (!isNonSseJsonBody) {
    return providerResponse;
  }

  const { sseResponse, jsonBody } = await sniffJsonBodyForSse(providerResponse, ctx, deps);
  if (sseResponse) return sseResponse;

  const jsonText = await deps.withBodyTimeout<string>(jsonBody.text());
  const synthesizedSse = deps.synthesizeOpenAiSseFromJson(jsonText);
  const rebuiltHeaders = new Headers(providerResponse.headers);
  rebuiltHeaders.delete("content-length");
  if (synthesizedSse) {
    ctx.log?.debug?.(
      "STREAM",
      `Upstream returned application/json on a streaming request — converting to SSE (${ctx.provider}/${ctx.model})`
    );
    rebuiltHeaders.set("content-type", "text/event-stream");
    return new Response(synthesizedSse, {
      status: providerResponse.status,
      statusText: providerResponse.statusText,
      headers: rebuiltHeaders,
    });
  }
  // Not a convertible chat-completion JSON — rebuild the consumed body so the existing
  // readiness/error path still runs unchanged.
  return new Response(jsonText, {
    status: providerResponse.status,
    statusText: providerResponse.statusText,
    headers: rebuiltHeaders,
  });
}
