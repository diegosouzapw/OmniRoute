import {
  getChatLogTextLimit,
  getChatLogMaxDepth,
  getChatLogArrayTailItems,
  getChatLogMaxObjectKeys,
} from "@/lib/logEnv";
import { estimateSizeFast } from "../../utils/estimateSize.ts";

export const MEMORY_EXTRACTION_TEXT_LIMIT = 64 * 1024;
const MAX_LOG_BODY_CHARS = 8 * 1024; // 8KB cap for logged request/response bodies

export function capMemoryExtractionText(value: string): string {
  if (value.length <= MEMORY_EXTRACTION_TEXT_LIMIT) return value;
  return value.slice(-MEMORY_EXTRACTION_TEXT_LIMIT);
}

export function truncateChatLogText(value: string): string {
  const limit = getChatLogTextLimit();
  if (value.length <= limit) return value;
  const head = value.slice(0, Math.floor(limit / 2));
  const tail = value.slice(-Math.ceil(limit / 2));
  return `${head}\n[...truncated ${value.length - limit} chars...]\n${tail}`;
}

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
 * This prevents persistAttemptLogs from holding multi-MB references to
 * translatedBody across 17 call sites per request.
 *
 * When the summarized object carries a `tools` definition, re-attach it
 * (bounded via `cloneBoundedChatLogPayload`) so the request-details view can
 * still show which tools were available even though the rest of the payload
 * — including the message history that triggered this summary — is dropped.
 * The reused helper already caps array length, object keys, nesting depth,
 * and string length, so this stays a small, bounded addition rather than a
 * separately-budgeted multi-KB/MB re-clone.
 */
export function truncateForLog(value: unknown): Record<string, unknown> | null | undefined {
  if (value === null || value === undefined) return value as null | undefined;
  if (typeof value !== "object") return value as unknown as Record<string, unknown>;
  const estimatedSize = estimateSizeFast(value);
  if (estimatedSize <= MAX_LOG_BODY_CHARS) return value as Record<string, unknown>;
  // Object is too large — return a summary instead of a deep clone
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
  if (Array.isArray(obj.tools)) summary.tools = cloneBoundedChatLogPayload(obj.tools);
  return summary;
}
