import { findFencedCodeBlocks } from "./preservation.ts";

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  fallbackApplied: boolean;
}

function requireExactPresence(
  label: string,
  originalItems: string[],
  compressed: string,
  errors: string[]
) {
  for (const item of originalItems) {
    if (!compressed.includes(item)) {
      const preview = collapseWhitespaceForPreview(item).slice(0, 80);
      errors.push(`${label} changed or missing: ${preview}`);
    }
  }
}

function isPreviewWhitespace(char: string): boolean {
  return (
    char === " " ||
    char === "\t" ||
    char === "\n" ||
    char === "\r" ||
    char === "\f" ||
    char === "\v"
  );
}

function isHorizontalWhitespace(char: string): boolean {
  return char === " " || char === "\t";
}

function isAsciiDigit(char: string | undefined): boolean {
  return !!char && char >= "0" && char <= "9";
}

function isAsciiUpper(char: string | undefined): boolean {
  return !!char && char >= "A" && char <= "Z";
}

function isAsciiLetter(char: string | undefined): boolean {
  return !!char && ((char >= "A" && char <= "Z") || (char >= "a" && char <= "z"));
}

function isAsciiAlphaNumeric(char: string | undefined): boolean {
  return !!char && (isAsciiLetter(char) || isAsciiDigit(char));
}

function isWordChar(char: string | undefined): boolean {
  return !!char && (isAsciiAlphaNumeric(char) || char === "_");
}

function isUrlTerminator(char: string): boolean {
  return (
    isPreviewWhitespace(char) ||
    char === ")" ||
    char === "]" ||
    char === '"' ||
    char === "'" ||
    char === ">"
  );
}

function collapseWhitespaceForPreview(text: string): string {
  let output = "";
  let previousWasWhitespace = false;
  let changed = false;

  for (const char of text) {
    if (isPreviewWhitespace(char)) {
      if (!previousWasWhitespace) {
        output += " ";
      } else {
        changed = true;
      }
      if (char !== " ") changed = true;
      previousWasWhitespace = true;
      continue;
    }

    output += char;
    previousWasWhitespace = false;
  }

  return changed ? output : text;
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
  requireExactPresence("inline code", collectInlineCode(original), compressed, errors);
  requireExactPresence("URL", collectUrls(original), compressed, errors);
  requireExactPresence("markdown link", collectMarkdownLinks(original), compressed, errors);
  requireExactPresence("frontmatter", collectFrontmatter(original), compressed, errors);
  requireExactPresence("heading", collectHeadings(original), compressed, errors);
  requireExactPresence("table row", collectTableRows(original), compressed, errors);
  requireExactPresence("math block", collectMathBlocks(original), compressed, errors);
  requireExactPresence("inline math", collectInlineMath(original), compressed, errors);
  requireExactPresence("LaTeX block", collectLatexBlocks(original), compressed, errors);
  requireExactPresence("version", collectVersions(original), compressed, errors);
  requireExactPresence("CONST_CASE", collectConstCase(original), compressed, errors);

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

function collectInlineCode(text: string): string[] {
  const matches: string[] = [];

  for (let index = 0; index < text.length; index++) {
    if (text[index] !== "`") continue;
    const end = text.indexOf("`", index + 1);
    if (end === -1) break;

    const content = text.slice(index + 1, end);
    if (content.length > 0 && !content.includes("\n")) {
      matches.push(text.slice(index, end + 1));
      index = end;
    }
  }

  return matches;
}

function collectUrls(text: string): string[] {
  const matches: string[] = [];

  for (let index = 0; index < text.length; index++) {
    const startsWithHttp = text.startsWith("http://", index);
    const startsWithHttps = text.startsWith("https://", index);
    if (!startsWithHttp && !startsWithHttps) continue;
    if (index > 0 && isWordChar(text[index - 1])) continue;

    let end = index + (startsWithHttps ? "https://".length : "http://".length);
    while (end < text.length && !isUrlTerminator(text[end])) {
      end++;
    }

    if (end > index) {
      matches.push(text.slice(index, end));
      index = end - 1;
    }
  }

  return matches;
}

function collectMarkdownLinks(text: string): string[] {
  const matches: string[] = [];

  for (let index = 0; index < text.length; index++) {
    if (text[index] !== "[") continue;

    const labelEnd = text.indexOf("]", index + 1);
    if (labelEnd === -1 || labelEnd - index - 1 > 1000) continue;
    if (text.slice(index + 1, labelEnd).includes("\n")) continue;
    if (text[labelEnd + 1] !== "(") continue;

    const targetStart = labelEnd + 2;
    const maxTargetEnd = Math.min(text.length, targetStart + 2000);
    let targetEnd = -1;
    for (let cursor = targetStart; cursor < maxTargetEnd; cursor++) {
      if (text[cursor] === "\n") break;
      if (text[cursor] === ")") {
        targetEnd = cursor;
        break;
      }
    }

    if (targetEnd !== -1) {
      matches.push(text.slice(index, targetEnd + 1));
      index = targetEnd;
    }
  }

  return matches;
}

function collectFrontmatter(text: string): string[] {
  if (!text.startsWith("---\n")) return [];
  const close = text.indexOf("\n---", 4);
  if (close === -1) return [];
  const closeEnd = text.indexOf("\n", close + 4);
  const end = closeEnd === -1 ? text.length : closeEnd + 1;
  return [text.slice(0, end)];
}

function collectHeadings(text: string): string[] {
  return collectLines(text).filter((line) => {
    let markerCount = 0;
    while (markerCount < line.length && line[markerCount] === "#") {
      markerCount++;
    }
    if (markerCount < 1 || markerCount > 6) return false;
    if (!isPreviewWhitespace(line[markerCount] ?? "")) return false;

    for (let index = markerCount + 1; index < line.length; index++) {
      if (!isPreviewWhitespace(line[index])) return true;
    }
    return false;
  });
}

function collectTableRows(text: string): string[] {
  return collectLines(text).filter((line) => {
    let index = 0;
    while (index < line.length && isHorizontalWhitespace(line[index])) {
      index++;
    }
    if (line[index] !== "|") return false;

    let pipeCount = 0;
    for (; index < line.length; index++) {
      if (line[index] === "|") pipeCount++;
    }
    return pipeCount >= 2;
  });
}

function collectLines(text: string): string[] {
  const lines: string[] = [];
  let start = 0;

  for (let index = 0; index < text.length; index++) {
    if (text[index] !== "\n") continue;
    lines.push(text.slice(start, index));
    start = index + 1;
  }

  lines.push(text.slice(start));
  return lines;
}

function collectMathBlocks(text: string): string[] {
  const matches: string[] = [];
  let index = 0;

  while (index < text.length) {
    const start = text.indexOf("$$", index);
    if (start === -1) break;
    const end = text.indexOf("$$", start + 2);
    if (end === -1) break;

    if (end - start - 2 <= 10000) {
      matches.push(text.slice(start, end + 2));
      index = end + 2;
    } else {
      index = start + 2;
    }
  }

  return matches;
}

function collectInlineMath(text: string): string[] {
  const matches: string[] = [];

  for (let index = 0; index < text.length; index++) {
    if (text[index] !== "$") continue;
    if (text[index - 1] === "$") continue;

    const next = text[index + 1];
    if (!next || isPreviewWhitespace(next) || next === "$" || isAsciiDigit(next)) continue;

    const maxEnd = Math.min(text.length, index + 1 + 160);
    for (let cursor = index + 1; cursor < maxEnd; cursor++) {
      const char = text[cursor];
      if (char === "\n") break;
      if (char === "\\") {
        cursor++;
        continue;
      }
      if (char !== "$") continue;
      if (isPreviewWhitespace(text[cursor - 1] ?? "")) continue;
      if (text[cursor + 1] === "$") continue;

      matches.push(text.slice(index, cursor + 1));
      index = cursor;
      break;
    }
  }

  return matches;
}

function collectLatexBlocks(text: string): string[] {
  const matches: string[] = [];
  let index = 0;

  while (index < text.length) {
    const start = text.indexOf("\\begin{", index);
    if (start === -1) break;

    const envStart = start + "\\begin{".length;
    const envEnd = text.indexOf("}", envStart);
    if (envEnd === -1 || envEnd - envStart < 1 || envEnd - envStart > 50) {
      index = envStart;
      continue;
    }

    const env = text.slice(envStart, envEnd);
    if (![...env].every((char) => isAsciiLetter(char) || char === "*")) {
      index = envStart;
      continue;
    }

    const closeToken = `\\end{${env}}`;
    const closeStart = text.indexOf(closeToken, envEnd + 1);
    if (closeStart === -1) {
      index = envEnd + 1;
      continue;
    }

    if (closeStart - envEnd - 1 <= 10000) {
      const end = closeStart + closeToken.length;
      matches.push(text.slice(start, end));
      index = end;
    } else {
      index = envEnd + 1;
    }
  }

  return matches;
}

function collectVersions(text: string): string[] {
  const matches: string[] = [];

  for (let index = 0; index < text.length; index++) {
    if (!isAsciiDigit(text[index])) continue;
    if (index > 0 && isWordChar(text[index - 1])) continue;

    let cursor = readDigits(text, index);
    let dotGroups = 0;
    while (dotGroups < 3 && text[cursor] === "." && isAsciiDigit(text[cursor + 1])) {
      cursor = readDigits(text, cursor + 1);
      dotGroups++;
    }
    if (dotGroups < 1) continue;

    if ((text[cursor] === "-" || text[cursor] === "+") && isVersionSuffixChar(text[cursor + 1])) {
      cursor++;
      while (cursor < text.length && isVersionSuffixChar(text[cursor])) {
        cursor++;
      }
    }

    if (isWordChar(text[cursor])) continue;
    matches.push(text.slice(index, cursor));
    index = cursor - 1;
  }

  return matches;
}

function readDigits(text: string, start: number): number {
  let cursor = start;
  while (cursor < text.length && isAsciiDigit(text[cursor])) {
    cursor++;
  }
  return cursor;
}

function isVersionSuffixChar(char: string | undefined): boolean {
  return !!char && (isAsciiAlphaNumeric(char) || char === "." || char === "-");
}

function collectConstCase(text: string): string[] {
  const matches: string[] = [];

  for (let index = 0; index < text.length; index++) {
    if (!isAsciiUpper(text[index])) continue;
    if (index > 0 && isWordChar(text[index - 1])) continue;

    let cursor = index + 1;
    let hasUnderscore = false;
    while (cursor < text.length) {
      const char = text[cursor];
      if (char === "_") {
        if (!isAsciiUpper(text[cursor + 1]) && !isAsciiDigit(text[cursor + 1])) break;
        hasUnderscore = true;
        cursor++;
        continue;
      }
      if (!isAsciiUpper(char) && !isAsciiDigit(char)) break;
      cursor++;
    }

    if (!hasUnderscore || isWordChar(text[cursor])) continue;
    matches.push(text.slice(index, cursor));
    index = cursor - 1;
  }

  return matches;
}
