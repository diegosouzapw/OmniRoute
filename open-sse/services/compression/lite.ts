import type { CompressionResult, CompressionMode } from "./types.ts";
import { createCompressionStats } from "./stats.ts";

interface Message {
  role: string;
  content: string | Array<Record<string, unknown>>;
  [key: string]: unknown;
}

interface ChatBody {
  messages?: Message[];
  [key: string]: unknown;
}

interface LiteCompressionOptions {
  model?: string;
  supportsVision?: boolean | null;
  preserveSystemPrompt?: boolean;
}

function trimTrailingHorizontalWhitespace(line: string): string {
  let end = line.length;
  while (end > 0) {
    const code = line.charCodeAt(end - 1);
    if (code !== 32 && code !== 9) break;
    end--;
  }
  return end === line.length ? line : line.slice(0, end);
}

function collapseNewlineRuns(content: string): string {
  let normalized = "";
  let newlineRun = 0;

  for (const char of content) {
    if (char === "\n") {
      newlineRun++;
      if (newlineRun <= 2) {
        normalized += char;
      }
      continue;
    }

    newlineRun = 0;
    normalized += char;
  }

  return normalized;
}

function normalizeMessageWhitespace(content: string): string {
  return collapseNewlineRuns(content).split("\n").map(trimTrailingHorizontalWhitespace).join("\n");
}

function modelSupportsVision(model: string): boolean {
  const normalized = model.toLowerCase();
  return (
    normalized.includes("vision") ||
    normalized.includes("gpt-4") ||
    normalized.includes("4o") ||
    normalized.includes("claude-3") ||
    normalized.includes("gemini")
  );
}

export function collapseWhitespace(
  body: ChatBody,
  options: LiteCompressionOptions = {}
): {
  body: ChatBody;
  applied: boolean;
} {
  if (!body.messages) return { body, applied: false };
  let applied = false;
  const messages = body.messages.map((msg) => {
    if (options.preserveSystemPrompt === true && msg.role === "system") return msg;
    if (typeof msg.content !== "string") return msg;
    const normalized = normalizeMessageWhitespace(msg.content);
    if (normalized !== msg.content) applied = true;
    return { ...msg, content: normalized };
  });
  return { body: { ...body, messages }, applied };
}

export function dedupSystemPrompt(
  body: ChatBody,
  options: LiteCompressionOptions = {}
): {
  body: ChatBody;
  applied: boolean;
} {
  if (!body.messages) return { body, applied: false };
  if (options.preserveSystemPrompt === true) return { body, applied: false };
  const seen = new Set<string>();
  let applied = false;
  const messages = body.messages.filter((msg) => {
    if (msg.role !== "system" || typeof msg.content !== "string") return true;
    const key = msg.content.trim().slice(0, 200);
    if (seen.has(key)) {
      applied = true;
      return false;
    }
    seen.add(key);
    return true;
  });
  return { body: { ...body, messages }, applied };
}

export function compressToolResults(body: ChatBody): {
  body: ChatBody;
  applied: boolean;
} {
  if (!body.messages) return { body, applied: false };
  const MAX_TOOL_LENGTH = 2000;
  let applied = false;
  const messages = body.messages.map((msg) => {
    if (msg.role !== "tool" || typeof msg.content !== "string") return msg;
    if (msg.content.length <= MAX_TOOL_LENGTH) return msg;
    applied = true;
    return {
      ...msg,
      content: msg.content.slice(0, MAX_TOOL_LENGTH) + "\n...[truncated]",
    };
  });
  return { body: { ...body, messages }, applied };
}

export function removeRedundantContent(
  body: ChatBody,
  options: LiteCompressionOptions = {}
): {
  body: ChatBody;
  applied: boolean;
} {
  if (!body.messages) return { body, applied: false };
  let applied = false;
  const messages: Message[] = [];
  for (let i = 0; i < body.messages.length; i++) {
    const msg = body.messages[i];
    if (options.preserveSystemPrompt === true && msg.role === "system") {
      messages.push(msg);
      continue;
    }
    const contentStr = typeof msg.content === "string" ? msg.content : JSON.stringify(msg.content);
    if (
      i > 0 &&
      body.messages[i - 1].role === msg.role &&
      typeof body.messages[i - 1].content === "string" &&
      body.messages[i - 1].content === contentStr
    ) {
      applied = true;
      continue;
    }
    messages.push(msg);
  }
  return { body: { ...body, messages }, applied };
}

export function replaceImageUrls(
  body: ChatBody,
  options?: LiteCompressionOptions | string
): { body: ChatBody; applied: boolean } {
  if (!body.messages) return { body, applied: false };
  const supportsVision =
    typeof options === "object" && options !== null
      ? options.supportsVision
      : typeof options === "string"
        ? modelSupportsVision(options)
        : undefined;
  if (supportsVision !== false) return { body, applied: false };

  let applied = false;
  const messages = body.messages.map((msg) => {
    if (!Array.isArray(msg.content)) return msg;
    const newContent = msg.content.map((part) => {
      if (
        typeof part === "object" &&
        part !== null &&
        part.type === "image_url" &&
        typeof (part as Record<string, unknown>).image_url === "object" &&
        ((part as Record<string, unknown>).image_url as Record<string, unknown>)?.url
      ) {
        const url = String(
          ((part as Record<string, unknown>).image_url as Record<string, unknown>).url
        );
        if (url.startsWith("data:image/")) {
          applied = true;
          const format = url.slice(url.indexOf("/") + 1, url.indexOf(";")) || "unknown";
          return { type: "text", text: `[image: ${format}]` };
        }
      }
      return part;
    });
    return { ...msg, content: newContent };
  });
  return { body: { ...body, messages }, applied };
}

export function applyLiteCompression(
  body: Record<string, unknown>,
  options?: LiteCompressionOptions
): CompressionResult {
  const originalBody = body;
  let current = body as ChatBody;
  const techniquesApplied: string[] = [];

  const r1 = collapseWhitespace(current, options);
  current = r1.body;
  if (r1.applied) techniquesApplied.push("whitespace");

  const r2 = dedupSystemPrompt(current, options);
  current = r2.body;
  if (r2.applied) techniquesApplied.push("system-dedup");

  const r3 = compressToolResults(current);
  current = r3.body;
  if (r3.applied) techniquesApplied.push("tool-compress");

  const r4 = removeRedundantContent(current, options);
  current = r4.body;
  if (r4.applied) techniquesApplied.push("redundant-remove");

  const r5 = replaceImageUrls(current, options);
  current = r5.body;
  if (r5.applied) techniquesApplied.push("image-placeholder");

  const compressed = techniquesApplied.length > 0;
  const stats = compressed
    ? createCompressionStats(
        originalBody,
        current as Record<string, unknown>,
        "lite" as CompressionMode,
        techniquesApplied
      )
    : null;

  return {
    body: current as Record<string, unknown>,
    compressed,
    stats,
  };
}
