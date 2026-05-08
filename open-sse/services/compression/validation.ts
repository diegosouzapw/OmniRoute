import { findFencedCodeBlocks } from "./preservation.ts";

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  fallbackApplied: boolean;
}

function collectMatches(text: string, pattern: RegExp): string[] {
  const matches: string[] = [];
  pattern.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text)) !== null) {
    if (match[0]) matches.push(match[0]);
    if (match.index === pattern.lastIndex) pattern.lastIndex++;
  }
  return matches;
}

function requireExactPresence(
  label: string,
  originalItems: string[],
  compressed: string,
  errors: string[]
) {
  for (const item of originalItems) {
    if (!compressed.includes(item)) {
      const preview = item.replace(/\s+/g, " ").slice(0, 80);
      errors.push(`${label} changed or missing: ${preview}`);
    }
  }
}

export function validateCompression(original: string, compressed: string): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (typeof original !== "string" || typeof compressed !== "string") {
    return {
      valid: false,
      errors: ["validation received non-string input"],
      warnings,
      fallbackApplied: true,
    };
  }

  if (original.length > 0 && compressed.trim().length === 0) {
    errors.push("compressed text is empty");
  }

  requireExactPresence("fenced code block", findFencedCodeBlocks(original), compressed, errors);
  requireExactPresence("inline code", collectMatches(original, /`[^`\n]+`/g), compressed, errors);
  requireExactPresence(
    "URL",
    collectMatches(original, /\bhttps?:\/\/[^\s)\]"'>]+/gi),
    compressed,
    errors
  );
  requireExactPresence(
    "markdown link",
    collectMatches(original, /\[[^\]\n]{1,1000}\]\([^)\n]{1,2000}\)/g),
    compressed,
    errors
  );
  requireExactPresence("frontmatter", collectFrontmatter(original), compressed, errors);
  requireExactPresence("heading", collectMatches(original, /^#{1,6}\s+.+$/gm), compressed, errors);
  requireExactPresence(
    "table row",
    collectMatches(original, /^[ \t]*\|(?:[^|\n]{0,1000}\|){1,100}/gm),
    compressed,
    errors
  );
  requireExactPresence(
    "math block",
    collectMatches(original, /\$\$[\s\S]{0,10000}?\$\$/g),
    compressed,
    errors
  );
  requireExactPresence(
    "inline math",
    collectMatches(original, /(?<!\$)\$(?![\s$\d])(?:\\.|[^$\n]){1,160}?(?<!\s)\$(?!\$)/g),
    compressed,
    errors
  );
  requireExactPresence(
    "LaTeX block",
    collectMatches(original, /\\begin\{[A-Za-z*]{1,50}\}[\s\S]{0,10000}?\\end\{[A-Za-z*]{1,50}\}/g),
    compressed,
    errors
  );
  requireExactPresence(
    "version",
    collectMatches(original, /\b\d+(?:\.\d+){1,3}(?:[-+][A-Za-z0-9.-]+)?\b/g),
    compressed,
    errors
  );
  requireExactPresence(
    "CONST_CASE",
    collectMatches(original, /\b[A-Z][A-Z0-9]*(?:_[A-Z0-9]+)+\b/g),
    compressed,
    errors
  );

  const originalFenceCount = findFencedCodeBlocks(original).length;
  const compressedFenceCount = findFencedCodeBlocks(compressed).length;
  if (compressedFenceCount < originalFenceCount) {
    errors.push(
      `fenced code block count dropped: ${originalFenceCount} -> ${compressedFenceCount}`
    );
  }

  if (compressed.length > original.length) {
    warnings.push("compressed text is longer than original");
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    fallbackApplied: errors.length > 0,
  };
}

function collectFrontmatter(text: string): string[] {
  if (!text.startsWith("---\n")) return [];
  const close = text.indexOf("\n---", 4);
  if (close === -1) return [];
  const closeEnd = text.indexOf("\n", close + 4);
  const end = closeEnd === -1 ? text.length : closeEnd + 1;
  return [text.slice(0, end)];
}
