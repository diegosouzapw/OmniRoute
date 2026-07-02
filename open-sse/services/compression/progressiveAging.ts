import type { AgingThresholds, Summarizer } from "./types.ts";
import { DEFAULT_AGGRESSIVE_CONFIG } from "./types.ts";
import { applyLiteCompression } from "./lite.ts";
import { cavemanCompress } from "./caveman.ts";
import { extractTextContent, replaceTextContent, type ChatMessageLike } from "./messageContent.ts";

const COMPRESSED_MARKER_RE = /^\[COMPRESSED:/;
const JSON_PREFIX_RE = /^\s*[{[]/;
const FENCE_RE = /^\s*```/;

function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

/**
 * Structured content that an inline `[COMPRESSED:...]` prefix would corrupt:
 * a pure-JSON payload (parses as JSON) or a fenced code block (B-AGG-JSONTAG).
 */
type StructuredKind = "json" | "fenced" | null;

function structuredKind(text: string): StructuredKind {
  const trimmed = text.trim();
  if (FENCE_RE.test(trimmed) && trimmed.endsWith("```")) return "fenced";
  if (JSON_PREFIX_RE.test(trimmed)) {
    try {
      JSON.parse(trimmed);
      return "json";
    } catch {
      return null;
    }
  }
  return null;
}

/**
 * Build the aged content for a message, keeping structured payloads intact:
 * - pure JSON: leave verbatim and untagged (stays JSON.parse-able). Aging engines
 *   (lite/caveman) do not shrink JSON anyway, so nothing is lost; tracked in stats
 *   via the unchanged content. The recursion guard relies on structuredKind() on the
 *   next pass, so re-running aging is a no-op (idempotent).
 * - fenced code block: place the tag on its own line BEFORE the fence so the block
 *   stays valid and the content still starts with `[COMPRESSED:` (recursion guard).
 * - everything else: inline-prepend the tag as before.
 */
function tagAged(tier: string, originalText: string, compressed: string): string {
  const kind = structuredKind(originalText);
  if (kind === "json") {
    return originalText;
  }
  if (kind === "fenced") {
    return `[COMPRESSED:aging:${tier}]\n${originalText}`;
  }
  return `[COMPRESSED:aging:${tier}] ${compressed}`;
}

type ChatMessage = ChatMessageLike;

type CompressedResult = {
  body?: { messages?: Array<{ content?: ChatMessageLike["content"] }> };
};

function setContent(msg: ChatMessage, newContent: string): ChatMessage {
  return replaceTextContent(msg, newContent) as ChatMessage;
}

export function applyAging(
  messages: unknown[],
  thresholds?: AgingThresholds,
  summarizer?: Summarizer,
  preserveSystemPrompt = true
): { messages: unknown[]; saved: number } {
  const t = thresholds ?? DEFAULT_AGGRESSIVE_CONFIG.thresholds;
  const sum = summarizer ?? {
    summarize: (msgs: unknown[]) => {
      const typed = msgs as ChatMessage[];
      const last = typed.filter((m) => m.role === "assistant").pop();
      return last ? extractTextContent(last.content).slice(0, 200) : "";
    },
  };

  const typed = messages as ChatMessage[];
  if (typed.length === 0) return { messages: [], saved: 0 };

  const totalMessages = typed.length;
  const result: ChatMessage[] = [];
  let saved = 0;

  for (let i = 0; i < typed.length; i++) {
    const msg = typed[i];
    const text = extractTextContent(msg.content);

    if ((preserveSystemPrompt && msg.role === "system") || COMPRESSED_MARKER_RE.test(text)) {
      result.push(msg);
      continue;
    }

    const distanceFromEnd = totalMessages - 1 - i;

    if (distanceFromEnd <= t.verbatim) {
      result.push(msg);
    } else if (distanceFromEnd <= t.light) {
      const compressed = applyLiteCompression({ messages: [msg] }) as CompressedResult;
      if (compressed?.body?.messages?.[0]?.content) {
        const newContent =
          typeof compressed.body.messages[0].content === "string"
            ? compressed.body.messages[0].content
            : extractTextContent(compressed.body.messages[0].content);
        const tagged = tagAged("light", text, newContent);
        saved += estimateTokens(text) - estimateTokens(tagged);
        result.push(setContent(msg, tagged));
      } else {
        result.push(msg);
      }
    } else if (distanceFromEnd <= t.moderate) {
      const compressed = cavemanCompress({ messages: [msg] as unknown as Parameters<typeof cavemanCompress>[0]["messages"] }) as CompressedResult;
      if (compressed?.body?.messages?.[0]?.content) {
        const newContent =
          typeof compressed.body.messages[0].content === "string"
            ? compressed.body.messages[0].content
            : extractTextContent(compressed.body.messages[0].content);
        const tagged = tagAged("moderate", text, newContent);
        saved += estimateTokens(text) - estimateTokens(tagged);
        result.push(setContent(msg, tagged));
      } else {
        result.push(msg);
      }
    } else {
      if (msg.role === "assistant") {
        const summary = sum.summarize([msg]);
        const tagged = tagAged("fullSummary", text, summary);
        saved += estimateTokens(text) - estimateTokens(tagged);
        result.push(setContent(msg, tagged));
      } else if (msg.role === "user") {
        const firstLine = text.split("\n")[0]?.slice(0, 120) ?? "";
        const tagged = tagAged("fullSummary", text, firstLine);
        saved += estimateTokens(text) - estimateTokens(tagged);
        result.push(setContent(msg, tagged));
      } else {
        result.push(msg);
      }
    }
  }

  return { messages: result, saved: Math.max(0, saved) };
}
