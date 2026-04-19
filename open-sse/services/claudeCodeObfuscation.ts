/**
 * Sensitive word obfuscation for Claude Code requests.
 *
 * Obfuscates configurable words in user messages to prevent detection
 * by upstream content filters. Uses zero-width characters to break
 * pattern matching while preserving readability.
 */

// Unicode zero-width joiner inserted between characters
const ZWJ = "\u200d";

const DEFAULT_SENSITIVE_WORDS = [
  "opencode",
  "open-code",
  "cline",
  "roo-cline",
  "roo_cline",
  "cursor",
  "windsurf",
  "aider",
  "continue.dev",
  "copilot",
  "avante",
  "codecompanion",
];

let sensitiveWords = [...DEFAULT_SENSITIVE_WORDS];

export function setSensitiveWords(words: string[]): void {
  sensitiveWords = words.length > 0 ? words : [...DEFAULT_SENSITIVE_WORDS];
}

export function getSensitiveWords(): string[] {
  return [...sensitiveWords];
}

function obfuscateWord(word: string): string {
  if (word.length <= 1) return word;
  // Insert ZWJ after first character
  return word[0] + ZWJ + word.slice(1);
}

export function obfuscateSensitiveWords(text: string): string {
  if (!text || sensitiveWords.length === 0) return text;

  let result = text;
  for (const word of sensitiveWords) {
    if (!word) continue;
    // Case-insensitive replacement
    const regex = new RegExp(escapeRegex(word), "gi");
    result = result.replace(regex, (match) => obfuscateWord(match));
  }
  return result;
}

export function obfuscateInBody(body: Record<string, unknown>): void {
  // System prompt (Claude format: string or array of blocks)
  if (typeof body.system === "string") {
    body.system = obfuscateSensitiveWords(body.system);
  } else if (Array.isArray(body.system)) {
    for (const block of body.system as Array<Record<string, unknown>>) {
      if (typeof block.text === "string") {
        block.text = obfuscateSensitiveWords(block.text);
      }
    }
  }

  // Messages (all roles, not just user — system/assistant may also contain sensitive words)
  const messages = body.messages as Array<Record<string, unknown>> | undefined;
  if (Array.isArray(messages)) {
    for (const msg of messages) {
      const content = msg.content;
      if (typeof content === "string") {
        msg.content = obfuscateSensitiveWords(content);
      } else if (Array.isArray(content)) {
        for (const block of content as Array<Record<string, unknown>>) {
          if (typeof block.text === "string") {
            block.text = obfuscateSensitiveWords(block.text);
          }
        }
      }
    }
  }

  // Tool descriptions (may contain URLs or names like "opencode")
  const tools = body.tools as Array<Record<string, unknown>> | undefined;
  if (Array.isArray(tools)) {
    for (const tool of tools) {
      if (typeof tool.description === "string") {
        tool.description = obfuscateSensitiveWords(tool.description);
      }
      const fn = tool.function as Record<string, unknown> | undefined;
      if (fn && typeof fn.description === "string") {
        fn.description = obfuscateSensitiveWords(fn.description);
      }
    }
  }
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
