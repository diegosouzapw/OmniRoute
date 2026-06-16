import { BaseExecutor, type ExecuteInput, type ProviderCredentials } from "../base.ts";
import { OMNIROUTE_VERSION } from "@/shared/constants/version.ts";
import { getProxyForAccount } from "../../utils/proxyFallback.ts";
import { HttpsProxyAgent } from "https-proxy-agent";
import crypto from "node:crypto";
import { createHash } from "node:crypto";
import { saveCallLog } from "@/lib/usage/callLogArtifacts.ts";
import { streamWithTimeout } from "../../utils/stream.ts";
import { ANTIGRAVITY_CONFIG } from "../../config/errorConfig.ts";
import {
  storeChatGptImage,
  getChatGptImageConversationContext,
  __resetChatGptImageCacheForTesting,
  type ChatGptImageConversationContext,
} from "../../services/chatgptImageCache.ts";

import { ImagePointerRef } from "./images.ts";

// ─── ChatGPT SSE parsing ────────────────────────────────────────────────────

export interface ChatGptStreamEvent {
  message?: {
    id?: string;
    author?: { role?: string };
    content?: { content_type?: string; parts?: unknown[] };
    status?: string;
    metadata?: Record<string, unknown>;
  };
  conversation_id?: string;
  error?: string | { message?: string; code?: string };
  type?: string;
  v?: unknown;
}

/**
 * A part inside `content.parts` for a `multimodal_text` content_type.
 * ChatGPT puts image references in a part with content_export type "image_asset_pointer"
 * and an asset_pointer like "file-service://file-XXXX" (final) or
 * "sediment://..." (in-progress preview).
 */
interface ImageAssetPart {
  content_type?: string;
  asset_pointer?: string;
  width?: number;
  height?: number;
  metadata?: Record<string, unknown>;
}

async function* readChatGptSseEvents(
  body: ReadableStream<Uint8Array>,
  signal?: AbortSignal | null
): AsyncGenerator<ChatGptStreamEvent> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let dataLines: string[] = [];

  function flush(): ChatGptStreamEvent | null | "done" {
    if (dataLines.length === 0) return null;
    const payload = dataLines.join("\n");
    dataLines = [];
    const trimmed = payload.trim();
    if (!trimmed || trimmed === "[DONE]") return "done";
    try {
      return JSON.parse(trimmed) as ChatGptStreamEvent;
    } catch {
      console.warn("[chatgpt-web] stream event JSON parse failed");
      return null;
    }
  }

  try {
    while (true) {
      if (signal?.aborted) return;
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      while (true) {
        const idx = buffer.indexOf("\n");
        if (idx < 0) break;
        const rawLine = buffer.slice(0, idx);
        buffer = buffer.slice(idx + 1);
        const line = rawLine.endsWith("\r") ? rawLine.slice(0, -1) : rawLine;

        if (line === "") {
          const parsed = flush();
          if (parsed === "done") return;
          if (parsed) yield parsed;
          continue;
        }
        if (line.startsWith("data:")) {
          dataLines.push(line.slice(5).trimStart());
        }
      }
    }

    buffer += decoder.decode();
    if (buffer.trim().startsWith("data:")) {
      dataLines.push(buffer.trim().slice(5).trimStart());
    }
    const tail = flush();
    if (tail && tail !== "done") yield tail;
  } finally {
    reader.releaseLock();
  }
}

// ─── Content extraction ─────────────────────────────────────────────────────
// ChatGPT SSE chunks contain CUMULATIVE content (full text so far in `parts[0]`),
// not deltas. Diff against the emitted length to produce incremental tokens —
// same pattern perplexity-web.ts uses for markdown blocks (lines 386-397).

export interface ContentChunk {
  delta?: string;
  answer?: string;
  conversationId?: string;
  messageId?: string;
  error?: string;
  done?: boolean;
  /** Image asset pointers seen on the current message (e.g. file-service://file-abc). */
  imagePointers?: ImagePointerRef[];
  /**
   * True if the assistant invoked the async image_gen tool (we saw a task id
   * in metadata or `turn_use_case: "image gen"` in server_ste_metadata).
   * Set on the final `done: true` chunk so the caller can decide to poll the
   * conversation endpoint for the actual image.
   */
  imageGenAsync?: boolean;
}

/**
 * Pull image asset pointers out of a multimodal_text parts array.
 *
 * For text-only messages parts is `["text..."]` and this returns `[]`. For
 * `image_gen` tool output, parts looks like:
 *   [
 *     { content_type: "image_asset_pointer",
 *       asset_pointer: "file-service://file-abc..." or "sediment://..." }
 *   ]
 * We collect every asset_pointer seen so the caller can resolve them once
 * the stream terminates.
 */
export function extractImagePointers(parts: unknown[]): string[] {
  const out: string[] = [];
  for (const p of parts) {
    if (!p || typeof p !== "object") continue;
    const obj = p as ImageAssetPart;
    if (obj.content_type === "image_asset_pointer" && typeof obj.asset_pointer === "string") {
      out.push(obj.asset_pointer);
    }
  }
  return out;
}

async function* extractContent(
  eventStream: ReadableStream<Uint8Array>,
  signal?: AbortSignal | null
): AsyncGenerator<ContentChunk> {
  // ChatGPT may echo prior assistant turns at the start of the stream with
  // status: "finished_successfully" and full content, before sending the new
  // generation. If we emit those bytes downstream, streaming consumers see
  // the previous answer prepended to the new one (visible in Open WebUI as
  // run-on output across turns). Strategy: only emit deltas after we've seen
  // status === "in_progress" for the current message id (i.e., it's being
  // generated live in this stream). Echoes always arrive already finished
  // and never transition through in_progress, so they get suppressed. An
  // end-of-stream fallback handles the rare case where a real turn arrives
  // as a single already-finished event (instant/cached responses).
  let conversationId: string | null = null;
  let currentId: string | null = null;
  let currentParts = "";
  let emittedLen = 0;
  let isLive = false;
  // Dedupe pointers across echoes / repeated events. Order-preserving Set.
  const imagePointers = new Map<string, ImagePointerRef>();
  // True if we observed signals the assistant kicked off the async image_gen
  // tool (see ContentChunk.imageGenAsync). The actual image arrives later via
  // WebSocket / polling — caller handles that.
  let imageGenAsync = false;

  for await (const event of readChatGptSseEvents(eventStream, signal)) {
    if (event.error) {
      const msg =
        typeof event.error === "string"
          ? event.error
          : event.error.message || "ChatGPT stream error";
      yield { error: msg, done: true };
      return;
    }

    if (event.conversation_id) conversationId = event.conversation_id;

    // Detect image_gen on top-level "server_ste_metadata" events. These don't
    // have a `message` field so the post-message guard would skip them, but
    // they're the most reliable signal — `turn_use_case: "image gen"`.
    //
    // Originally we also accepted `meta.tool_invoked === true`, but ChatGPT
    // sets that flag for ANY internal tool the assistant uses (reasoning
    // chains, web search, calc, file_search, etc.). That made plain text
    // turns spuriously emit the "Generating image…" placeholder + 30s
    // WebSocket wait. Image gen has a more specific signal we can rely on:
    // either `turn_use_case === "image gen"` here, or an `image_gen_task_id`
    // on a tool-role message (handled below).
    if (event.type === "server_ste_metadata") {
      const meta = (event as Record<string, unknown>).metadata as
        | Record<string, unknown>
        | undefined;
      if (meta && meta.turn_use_case === "image gen") {
        imageGenAsync = true;
      }
    }

    const m = event.message;
    if (!m) continue;

    // Tool messages with `image_gen_task_id` in metadata (the "Processing
    // image..." card) confirm the async image_gen flow. We don't surface the
    // tool message itself as text — it's just a placeholder — but we mark
    // imageGenAsync so the executor knows to poll for the final image.
    if (m.metadata && typeof m.metadata.image_gen_task_id === "string") {
      imageGenAsync = true;
    }

    if (m.author?.role !== "assistant") continue;

    const id = m.id ?? null;
    const status = m.status ?? "";

    if (id && id !== currentId) {
      currentId = id;
      currentParts = "";
      emittedLen = 0;
      isLive = false;
    }

    if (status === "in_progress") {
      isLive = true;
    }

    const parts = m.content?.parts ?? [];
    if (parts.length === 0) continue;

    // Image asset pointers: only collect once the message is finalized
    // (status === "finished_successfully"). The same pointer may also appear
    // on echoed prior turns at the head of the stream; that's fine — the Set
    // dedupes, and the resolver in the executor produces the same URL either
    // way. We could restrict to isLive-only to avoid resolving echoes, but
    // that makes single-event instant responses (no in_progress phase) lose
    // their image. Letting echoes through is harmless for correctness; the
    // executor resolves each unique pointer at most once.
    if (status === "finished_successfully" || status === "" || isLive) {
      for (const ptr of extractImagePointers(parts)) {
        const existing = imagePointers.get(ptr);
        imagePointers.set(
          ptr,
          existing?.messageId ? existing : { pointer: ptr, ...(id ? { messageId: id } : {}) }
        );
      }
    }

    const cumulative = parts.map((p) => (typeof p === "string" ? p : "")).join("");
    if (cumulative.length > currentParts.length) {
      currentParts = cumulative;
    }

    if (isLive && currentParts.length > emittedLen) {
      const delta = currentParts.slice(emittedLen);
      emittedLen = currentParts.length;
      yield {
        delta,
        answer: currentParts,
        conversationId: conversationId ?? undefined,
        messageId: currentId ?? undefined,
      };
    }
  }

  // End-of-stream fallback: if we never observed status === "in_progress"
  // for the current id (single-event reply, cached/instant response), emit
  // the accumulated content now so the consumer doesn't get an empty stream.
  if (!isLive && currentParts.length > emittedLen) {
    yield {
      delta: currentParts.slice(emittedLen),
      answer: currentParts,
      conversationId: conversationId ?? undefined,
      messageId: currentId ?? undefined,
    };
  }

  yield {
    delta: "",
    answer: currentParts,
    conversationId: conversationId ?? undefined,
    messageId: currentId ?? undefined,
    imagePointers: imagePointers.size > 0 ? Array.from(imagePointers.values()) : undefined,
    imageGenAsync,
    done: true,
  };
}

// ─── OpenAI SSE format ──────────────────────────────────────────────────────

export function sseChunk(data: unknown): string {
  return `data: ${JSON.stringify(data)}\n\n`;
}
