/**
 * Publish-time redaction for OmniContext artifacts.
 * Always-on for Continuity publish (distinct from opt-in proxy PII flags).
 */

const SECRET_PATTERNS: Array<{ name: string; re: RegExp }> = [
  { name: "openai_key", re: /\bsk-[A-Za-z0-9_-]{20,}\b/g },
  { name: "anthropic_key", re: /\bsk-ant-[A-Za-z0-9_-]{20,}\b/g },
  { name: "bearer", re: /\bBearer\s+[A-Za-z0-9._\-+=/]{20,}\b/gi },
  { name: "aws_key", re: /\bAKIA[0-9A-Z]{16}\b/g },
  { name: "github_pat", re: /\bghp_[A-Za-z0-9]{20,}\b/g },
  { name: "github_fine", re: /\bgithub_pat_[A-Za-z0-9_]{20,}\b/g },
  {
    name: "generic_token",
    re: /\b(?:api[_-]?key|access[_-]?token|secret[_-]?key)\s*[:=]\s*['"]?[A-Za-z0-9._\-+=/]{16,}['"]?/gi,
  },
  {
    name: "email",
    re: /\b[A-Z0-9._%+-]{1,64}@[A-Z0-9.-]{1,253}\.[A-Z]{2,24}\b/gi,
  },
];

export interface RedactResult {
  text: string;
  redacted: boolean;
  matches: string[];
}

export function redactForPublish(input: string): RedactResult {
  if (!input) return { text: "", redacted: false, matches: [] };
  let text = input;
  const matches: string[] = [];
  for (const { name, re } of SECRET_PATTERNS) {
    const copy = new RegExp(re.source, re.flags);
    if (copy.test(text)) {
      matches.push(name);
      text = text.replace(new RegExp(re.source, re.flags), "[REDACTED]");
    }
  }
  return { text, redacted: matches.length > 0, matches };
}
