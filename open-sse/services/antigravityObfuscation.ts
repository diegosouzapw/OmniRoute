/**
 * Sensitive word obfuscation for Antigravity requests.
 *
 * Obfuscates client tool names (OpenCode, Cursor, Claude Code, etc.) using
 * zero-width joiners so Google's backend can't grep for them in request logs.
 * Matching ZeroGravity's ZEROGRAVITY_SENSITIVE_WORDS and CLIProxyAPI's cloak system.
 */

const ZWJ = "\u200d";

const DEFAULT_WORDS = [
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
  "claude code",
  "claude-code",
  "kilo code",
  "kilocode",
  "omniroute",
];

let words = [...DEFAULT_WORDS];

export function setAntigravitySensitiveWords(w: string[]): void {
  words = w.length > 0 ? w : [...DEFAULT_WORDS];
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Per-word regex cache — avoids recompiling one RegExp per word on every request body.
// Bounded by distinct configured words; global regexes are safe to reuse (String.replace
// resets lastIndex).
const _obfuscationRegexCache = new Map<string, RegExp>();
function getObfuscationRegex(word: string): RegExp {
  let regex = _obfuscationRegexCache.get(word);
  if (!regex) {
    if (_obfuscationRegexCache.size > 2000) _obfuscationRegexCache.clear();
    regex = new RegExp(escapeRegex(word), "gi");
    _obfuscationRegexCache.set(word, regex);
  }
  return regex;
}

export function obfuscateSensitiveWords(text: string): string {
  if (!text || words.length === 0) return text;
  let result = text;
  for (const word of words) {
    if (!word) continue;
    const regex = getObfuscationRegex(word);
    result = result.replace(regex, (m) => (m.length <= 1 ? m : m[0] + ZWJ + m.slice(1)));
  }
  return result;
}
