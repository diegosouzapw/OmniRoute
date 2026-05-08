import type { Summarizer, SummarizerOpts } from "./types.ts";

const COMPRESSED_MARKER_RE = /^\[COMPRESSED:/;
const INTENT_TRIGGERS =
  /^(?:request|fix|implement|add|remove|update|refactor|create|delete|change|build)\s*:/i;
const FILE_EXTENSIONS = new Set([
  "ts",
  "tsx",
  "js",
  "jsx",
  "py",
  "md",
  "json",
  "sql",
  "css",
  "html",
  "yaml",
  "yml",
  "sh",
  "rb",
  "go",
  "rs",
  "java",
  "c",
  "cpp",
  "h",
  "hpp",
]);

function stripTokenPunctuation(token: string): string {
  let start = 0;
  let end = token.length;
  const leading = new Set(["'", '"', "`", "(", "[", "{"]);
  const trailing = new Set(["'", '"', "`", ")", "]", "}", ",", ";", ":"]);

  while (start < end && leading.has(token[start])) start++;
  while (end > start && trailing.has(token[end - 1])) end--;

  return token.slice(start, end);
}

function getKnownFilePathToken(token: string): string | null {
  const clean = stripTokenPunctuation(token);
  const lastDot = clean.lastIndexOf(".");
  if (lastDot <= 0 || lastDot === clean.length - 1) return null;

  const extension = clean.slice(lastDot + 1).toLowerCase();
  if (!FILE_EXTENSIONS.has(extension)) return null;
  if (!clean.includes("/") && !clean.includes(".")) return null;

  return clean;
}

function extractFilePathTokens(text: string): string[] {
  const paths: string[] = [];
  for (const token of text.split(/\s+/)) {
    const filePath = getKnownFilePathToken(token);
    if (filePath) paths.push(filePath);
  }
  return paths;
}

function extractErrorSnippets(text: string): string[] {
  const snippets: string[] = [];
  for (const segment of text.split(/[.\n]/)) {
    const trimmed = segment.trim();
    if (!trimmed) continue;

    const lower = trimmed.toLowerCase();
    if (
      trimmed.includes("TypeError:") ||
      trimmed.includes("ReferenceError:") ||
      trimmed.includes("SyntaxError:") ||
      trimmed.includes("RangeError:") ||
      trimmed.includes("URIError:") ||
      trimmed.includes("EvalError:") ||
      trimmed.includes("Error:") ||
      trimmed.includes("Exception:") ||
      lower.includes("error ts")
    ) {
      snippets.push(trimmed);
    }
  }
  return snippets;
}

function extractIntents(messages: Array<{ role: string; content?: string | unknown[] }>): string[] {
  const intents: string[] = [];
  for (const msg of messages) {
    if (msg.role !== "user") continue;
    const text = extractText(msg.content);
    if (!text) continue;
    const firstLine = text.split("\n")[0]?.trim();
    if (firstLine && INTENT_TRIGGERS.test(firstLine)) {
      intents.push(firstLine.slice(0, 120));
    } else if (intents.length === 0 && firstLine) {
      intents.push(firstLine.slice(0, 120));
    }
  }
  return intents;
}

function extractFilePaths(
  messages: Array<{ role: string; content?: string | unknown[] }>
): string[] {
  const paths = new Set<string>();
  for (const msg of messages) {
    const text = extractText(msg.content);
    if (!text) continue;
    const matches = extractFilePathTokens(text);
    for (const m of matches) {
      paths.add(m);
    }
  }
  return [...paths].slice(0, 20);
}

function extractErrors(messages: Array<{ role: string; content?: string | unknown[] }>): string[] {
  const errors: string[] = [];
  for (const msg of messages) {
    const text = extractText(msg.content);
    if (!text) continue;
    for (const match of extractErrorSnippets(text)) errors.push(match.slice(0, 150));
  }
  return errors.slice(0, 10);
}

function extractLastDecision(
  messages: Array<{ role: string; content?: string | unknown[] }>
): string {
  for (let i = messages.length - 1; i >= 0; i--) {
    if (messages[i].role === "assistant") {
      const text = extractText(messages[i].content);
      if (text) return text;
    }
  }
  return "";
}

function trimCodeFences(text: string): string {
  let output = "";
  let cursor = 0;

  while (cursor < text.length) {
    const start = text.indexOf("```", cursor);
    if (start === -1) {
      output += text.slice(cursor);
      break;
    }

    const openingLineEnd = text.indexOf("\n", start + 3);
    if (openingLineEnd === -1) {
      output += text.slice(cursor);
      break;
    }

    const closeStart = text.indexOf("\n```", openingLineEnd + 1);
    if (closeStart === -1) {
      output += text.slice(cursor);
      break;
    }

    const closeEnd = closeStart + 4;
    const opening = text.slice(start, openingLineEnd);
    const code = text.slice(openingLineEnd + 1, closeStart);
    const lines = code.split("\n");

    output += text.slice(cursor, start);
    if (lines.length <= 4) {
      output += text.slice(start, closeEnd);
    } else {
      const head = lines.slice(0, 3).join("\n");
      const tail = lines[lines.length - 1];
      output += `${opening}\n${head}\n…\n${tail}\n\`\`\``;
    }

    cursor = closeEnd;
  }

  return output;
}

function extractText(content?: string | unknown[]): string {
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content
      .filter(
        (p): p is { type: string; text?: string } =>
          typeof p === "object" && p !== null && "text" in p
      )
      .map((p) => p.text ?? "")
      .join("\n");
  }
  return "";
}

export class RuleBasedSummarizer implements Summarizer {
  summarize(messages: unknown[], opts?: SummarizerOpts): string {
    const maxLen = opts?.maxLen ?? 2000;
    const preserveCode = opts?.preserveCode ?? true;

    const typed = messages as Array<{ role: string; content?: string | unknown[] }>;

    const filtered = typed.filter((msg) => {
      const text = extractText(msg.content);
      if (!text || text.trim().length === 0) return false;
      return !COMPRESSED_MARKER_RE.test(text);
    });

    if (filtered.length === 0) return "";

    const intents = extractIntents(filtered);
    const files = extractFilePaths(filtered);
    const errors = extractErrors(filtered);
    const decision = extractLastDecision(filtered);

    const parts: string[] = ["[COMPRESSED:summary]"];

    if (intents.length > 0) {
      parts.push(`Intents: ${intents.join("; ")}.`);
    }
    if (files.length > 0) {
      parts.push(`Files touched: ${files.join(", ")}.`);
    }
    if (errors.length > 0) {
      parts.push(`Errors: ${errors.join("; ")}.`);
    }
    if (decision) {
      const processed = preserveCode ? trimCodeFences(decision) : decision;
      parts.push(`Last decision: ${processed.slice(0, 200)}.`);
    }

    let result = parts.join(" ");
    if (result.length > maxLen) {
      result = result.slice(0, maxLen - 3) + "...";
    }

    return result;
  }
}

export function createSummarizer(): Summarizer {
  return new RuleBasedSummarizer();
}
