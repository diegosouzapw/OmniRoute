/**
 * Chat log + memory text extraction helpers.
 *
 * Extracted from open-sse/handlers/chatCore.ts (PR-5 of the perf workstream).
 * These are pure functions: no closure dependency on `handleChatCore`'s state,
 * no shared mutable state, just signature-stable helpers.
 *
 * Module is loaded lazily by the `handleChatCore` entrypoint — bundlers
 * (esbuild/rollup) keep this in its own chunk so a /v1/responses request
 * doesn't pay for chat log code it never touches.
 *
 * @see open-sse/handlers/chatCore.ts (the monolithic entrypoint being refactored)
 */

import { estimateSizeFast } from "../../utils/estimateSize.ts";
import {
  getChatLogTextLimit,
  getChatLogArrayTailItems,
  getChatLogMaxDepth,
  getChatLogMaxObjectKeys,
} from "../../../lib/logEnv";

/** Maximum characters of memory text we'll extract from a request/response. */
export const MEMORY_EXTRACTION_TEXT_LIMIT = 64 * 1024;

/** Cap on JSON size we keep in chat log entries (8KB). */
export const MAX_LOG_BODY_CHARS = 8 * 1024;

/** Cap a string at the last `MEMORY_EXTRACTION_TEXT_LIMIT` chars (memory extraction path). */
export function capMemoryExtractionText(value: string): string {
  if (value.length <= MEMORY_EXTRACTION_TEXT_LIMIT) return value;
  return value.slice(-MEMORY_EXTRACTION_TEXT_LIMIT);
}

/** Truncate a chat-log text payload to the configured limit (head + tail, marker in middle). */
export function truncateChatLogText(value: string): string {
  const limit = getChatLogTextLimit();
  if (value.length <= limit) return value;
  const head = value.slice(0, Math.floor(limit / 2));
  const tail = value.slice(-Math.ceil(limit / 2));
  return `${head}\n[...truncated ${value.length - limit} chars...]\n${tail}`;
}

/**
 * Deep-clone a value for chat logging, bounding recursion depth + array tail
 * length + object key count. Drops circular refs silently (depth cap fires first).
 */
export function cloneBoundedChatLogPayload(value: unknown, depth = 0): unknown {
  if (value === null || value === undefined) return value;
  if (typeof value === "string") return truncateChatLogText(value);
  if (typeof value !== "object") return value;
  if (depth >= getChatLogMaxDepth()) return "[MaxDepth]";

  const maxTailItems = getChatLogArrayTailItems();

  if (Array.isArray(value)) {
    const retained = value.length > maxTailItems ? value.slice(-maxTailItems) : value;
    const cloned = retained.map((item) => cloneBoundedChatLogPayload(item, depth + 1));
    if (value.length > maxTailItems) {
      return [
        {
          _omniroute_truncated_array: true,
          originalLength: value.length,
          retainedTailItems: maxTailItems,
        },
        ...cloned,
      ];
    }
    return cloned;
  }

  const result: Record<string, unknown> = {};
  const entries = Object.entries(value as Record<string, unknown>);
  const maxKeys = getChatLogMaxObjectKeys();
  for (const [key, item] of maxKeys > 0 ? entries.slice(0, maxKeys) : entries) {
    result[key] = cloneBoundedChatLogPayload(item, depth + 1);
  }
  if (maxKeys > 0 && entries.length > maxKeys) {
    result._omniroute_truncated_keys = entries.length - maxKeys;
  }
  return result;
}

/**
 * Truncate a large object for logging. If its JSON representation exceeds
 * MAX_LOG_BODY_CHARS, return a lightweight summary instead of the full clone.
 * Prevents persistAttemptLogs from holding multi-MB references to translatedBody.
 */
export function truncateForLog(
  value: unknown
): Record<string, unknown> | null | undefined {
  if (value === null || value === undefined) return value as null | undefined;
  if (typeof value !== "object") return value as unknown as Record<string, unknown>;
  const estimatedSize = estimateSizeFast(value);
  if (estimatedSize <= MAX_LOG_BODY_CHARS) return value as Record<string, unknown>;

  const obj = value as Record<string, unknown>;
  const summary: Record<string, unknown> = {
    _truncated: true,
    _originalBytes: estimatedSize,
  };
  if (typeof obj.model === "string") summary.model = obj.model;
  if (typeof obj.provider === "string") summary.provider = obj.provider;
  if (Array.isArray(obj.messages)) summary.messageCount = obj.messages.length;
  if (Array.isArray(obj.contents)) summary.contentCount = obj.contents.length;
  if (typeof obj.stream === "boolean") summary.stream = obj.stream;
  return summary;
}

/**
 * Extract user-visible text from a response body for memory storage.
 * Supports OpenAI (`choices[0].message.content`), Anthropic (`content[]`
 * with type=text parts), and Responses API (`output_text`) shapes.
 */
export function extractMemoryTextFromResponse(
  response: Record<string, unknown> | null | undefined
): string {
  if (!response || typeof response !== "object") return "";

  const openAIText = (response as { choices?: Array<{ message?: { content?: unknown } }> })
    ?.choices?.[0]?.message?.content;
  if (typeof openAIText === "string") {
    return capMemoryExtractionText(openAIText.trim());
  }

  const content = (response as { content?: unknown }).content;
  if (Array.isArray(content)) {
    const contentText = content
      .filter(
        (part: Record<string, unknown>) =>
          part?.type === "text" && typeof part?.text === "string"
      )
      .map((part: Record<string, unknown>) => String(part.text).trim())
      .filter(Boolean)
      .join("\n");
    if (contentText) return capMemoryExtractionText(contentText);
  }

  const outputText = (response as { output_text?: unknown }).output_text;
  if (typeof outputText === "string") {
    return capMemoryExtractionText(outputText.trim());
  }

  return "";
}

/**
 * Extract user-side text from a request body for memory storage. Walks
 * OpenAI (`messages[].content`) and Responses API (`input[].content`)
 * shapes from the tail backward, returning the first user-role text.
 *
 * For Responses API shape with no user-role items, falls back to walking
 * tail items and concatenating non-empty text — the "tail chunk" path
 * covers streamed/delta inputs where role tagging may be incomplete.
 */
export function extractMemoryTextFromRequestBody(
  body: Record<string, unknown> | null | undefined
): string {
  if (!body || typeof body !== "object") return "";

  const messages = Array.isArray((body as { messages?: unknown }).messages)
    ? ((body as { messages: unknown[] }).messages)
    : null;
  if (messages && messages.length > 0) {
    for (let i = messages.length - 1; i >= 0; i -= 1) {
      const msg = messages[i] as Record<string, unknown>;
      if (msg?.role !== "user") continue;

      if (typeof msg.content === "string" && msg.content.trim().length > 0) {
        return capMemoryExtractionText(msg.content.trim());
      }

      if (Array.isArray(msg.content)) {
        const text = msg.content
          .map((part: Record<string, unknown>) => {
            if (typeof part?.text === "string") return part.text.trim();
            if (part?.type === "input_text" && typeof part?.text === "string")
              return part.text.trim();
            return "";
          })
          .filter(Boolean)
          .join("\n")
          .trim();
        if (text) return capMemoryExtractionText(text);
      }
    }
  }

  const input = Array.isArray((body as { input?: unknown }).input)
    ? ((body as { input: unknown[] }).input)
    : null;
  if (input && input.length > 0) {
    for (let i = input.length - 1; i >= 0; i -= 1) {
      const item = input[i] as Record<string, unknown>;
      const role = typeof item?.role === "string" ? item.role.trim().toLowerCase() : "";
      const itemType = typeof item?.type === "string" ? item.type.trim().toLowerCase() : "";
      if (role && role !== "user") continue;
      if (itemType && itemType !== "message") continue;

      if (typeof item?.content === "string" && item?.content.trim()) {
        return capMemoryExtractionText((item.content as string).trim());
      }
      if (Array.isArray(item?.content)) {
        const text = item.content
          .map((part: Record<string, unknown>) => {
            if (typeof part?.text === "string") return part.text.trim();
            if (part?.type === "input_text" && typeof part?.text === "string")
              return part.text.trim();
            return "";
          })
          .filter(Boolean)
          .join("\n")
          .trim();
        if (text) return capMemoryExtractionText(text);
      }
    }

    const tailChunks: string[] = [];
    let tailLength = 0;
    for (let i = input.length - 1; i >= 0 && tailLength < MEMORY_EXTRACTION_TEXT_LIMIT; i -= 1) {
      const item = input[i] as Record<string, unknown>;
      const text = (() => {
        const role = typeof item?.role === "string" ? item.role.trim().toLowerCase() : "";
        const itemType = typeof item?.type === "string" ? item.type.trim().toLowerCase() : "";
        if (role && role !== "user") return "";
        if (itemType && itemType !== "message") return "";

        if (typeof item?.content === "string") return item.content.trim();
        if (Array.isArray(item?.content)) {
          return item.content
            .map((part: Record<string, unknown>) => {
              if (typeof part?.text === "string") return part.text.trim();
              if (part?.type === "input_text" && typeof part?.text === "string")
                return part.text.trim();
              return "";
            })
            .filter(Boolean)
            .join("\n")
            .trim();
        }
        return "";
      })();
      if (!text) continue;
      tailChunks.unshift(text);
      tailLength += text.length + 1;
    }
    const chunks = tailChunks.join("\n").trim();
    if (chunks) return capMemoryExtractionText(chunks);
  }

  return "";
}