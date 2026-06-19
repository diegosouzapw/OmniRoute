/**
 * Common scalar grammar for GCF (Graph Compact Format).
 * Vendored from gcf-typescript — generic profile only.
 * https://github.com/blackwell-systems/gcf-typescript
 *
 * SPDX-License-Identifier: MIT
 */

const JSON_NUMBER_RE = /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/;
const NUMERIC_LIKE_RE = /^[+-]\.?\d|^\.\d|^0\d/;

/** Check if a string value must be quoted per Section 2.4. */
export function needsQuote(s: string): boolean {
  if (s === "") return true;
  if (s === "-" || s === "~" || s === "^" || s === "true" || s === "false") return true;
  if (JSON_NUMBER_RE.test(s)) return true;
  if (NUMERIC_LIKE_RE.test(s)) return true;
  if (s[0] === " " || s[s.length - 1] === " ") return true;
  if (s[0] === "#" || s[0] === "@" || s[0] === ".") return true;
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i);
    if (
      c === 0x22 ||
      c === 0x5c ||
      c < 0x20 ||
      c === 0x0a ||
      c === 0x0d ||
      c === 0x7c ||
      c === 0x2c
    )
      return true; // " \ control \n \r | ,
    // C1 control characters
    if (c >= 0x80 && c <= 0x9f) return true;
    // Unicode whitespace beyond ASCII
    if (
      c > 0x7f &&
      (c === 0xa0 ||
        c === 0x2028 ||
        c === 0x2029 ||
        c === 0xfeff ||
        c === 0x1680 ||
        (c >= 0x2000 && c <= 0x200a) ||
        c === 0x202f ||
        c === 0x205f ||
        c === 0x3000)
    )
      return true;
  }
  return false;
}

/** Produce a JSON-compatible quoted string. */
export function quoteString(s: string): string {
  let out = '"';
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i);
    switch (c) {
      case 0x22:
        out += '\\"';
        break;
      case 0x5c:
        out += "\\\\";
        break;
      case 0x08:
        out += "\\b";
        break;
      case 0x0c:
        out += "\\f";
        break;
      case 0x0a:
        out += "\\n";
        break;
      case 0x0d:
        out += "\\r";
        break;
      case 0x09:
        out += "\\t";
        break;
      default:
        if (c < 0x20) {
          out += "\\u" + c.toString(16).padStart(4, "0");
        } else {
          out += s[i];
        }
    }
  }
  return out + '"';
}

/** Format a JS value as a GCF scalar. delimiter is '|', ',', or 0. */
export function formatScalar(v: unknown, delimiter: number = 0): string {
  if (v === null || v === undefined) return "-";
  if (typeof v === "boolean") return v ? "true" : "false";
  if (typeof v === "number") return formatNumber(v);
  const s = String(v);
  if (needsQuote(s) || (delimiter && s.includes(String.fromCharCode(delimiter)))) {
    return quoteString(s);
  }
  return s;
}

/** Format a number per Section 2.3 canonical rules. */
export function formatNumber(f: number): string {
  if (Object.is(f, -0)) return "-0";
  if (f === 0) return "0";
  const abs = Math.abs(f);
  if (abs >= 1e-6 && abs < 1e21) {
    return String(f);
  }
  // Exponent notation.
  let s = f.toExponential();
  // Normalize: lowercase e, no leading zeros in exponent.
  s = s.replace(/[eE]\+?0*(\d)/, "e+$1").replace(/[eE]-0*(\d)/, "e-$1");
  return s;
}

const BARE_KEY_RE = /^[a-zA-Z_][a-zA-Z0-9_]*$/;

/** Check if a key is a valid bare key. */
export function isBareKey(s: string): boolean {
  return BARE_KEY_RE.test(s);
}

/** Format a key, quoting if necessary. */
export function formatKey(s: string): string {
  return isBareKey(s) ? s : quoteString(s);
}

// --- Decoder scalar parsing ---

/** Parse a GCF scalar token per Section 2.1 precedence. */
export function parseScalar(s: string, tabularContext: boolean): any {
  if (s === "") return "";

  // 1. Quoted string.
  if (s[0] === '"') return parseQuotedString(s);

  // 2. Null.
  if (s === "-") return null;

  // 3. Missing (tabular only).
  if (s === "~") {
    if (!tabularContext) throw new Error("invalid_missing: ~ outside tabular row cell");
    return MISSING;
  }

  // 4. Attachment (tabular only). Plain ^ or ^{fields} (inline schema).
  if (s === "^" || (s.startsWith("^{") && s.endsWith("}"))) {
    if (!tabularContext) throw new Error("invalid_attachment_marker: ^ outside tabular row cell");
    if (s === "^") return ATTACHMENT;
    // Inline schema: return the schema string for the caller to parse.
    return { __inlineSchema: s.slice(1) }; // e.g. "{name,email,tier}"
  }

  // 5. Boolean.
  if (s === "true") return true;
  if (s === "false") return false;

  // 6. Number.
  if (JSON_NUMBER_RE.test(s)) {
    const f = Number(s);
    if (!isNaN(f)) return f;
  }

  // 7. Bare string.
  return s;
}

export const MISSING = Symbol("missing");
export const ATTACHMENT = Symbol("attachment");

/** Parse a JSON-compatible quoted string. */
export function parseQuotedString(s: string): string {
  if (s.length < 2 || s[0] !== '"') throw new Error("unterminated_quote");
  let out = "";
  let i = 1;
  while (i < s.length) {
    if (s[i] === '"') {
      if (i + 1 !== s.length) throw new Error("trailing_characters: after closing quote");
      return out;
    }
    if (s[i] === "\\") {
      if (i + 1 >= s.length) throw new Error("unterminated_quote");
      i++;
      switch (s[i]) {
        case '"':
          out += '"';
          break;
        case "\\":
          out += "\\";
          break;
        case "/":
          out += "/";
          break;
        case "b":
          out += "\b";
          break;
        case "f":
          out += "\f";
          break;
        case "n":
          out += "\n";
          break;
        case "r":
          out += "\r";
          break;
        case "t":
          out += "\t";
          break;
        case "u": {
          if (i + 4 >= s.length) throw new Error("invalid_escape: incomplete unicode");
          const hex = s.slice(i + 1, i + 5);
          const code = parseInt(hex, 16);
          if (isNaN(code)) throw new Error(`invalid_escape: invalid unicode \\u${hex}`);
          // Surrogate pair handling.
          if (code >= 0xd800 && code <= 0xdbff) {
            if (i + 10 >= s.length || s[i + 5] !== "\\" || s[i + 6] !== "u") {
              throw new Error("invalid_surrogate: isolated high surrogate");
            }
            const hex2 = s.slice(i + 7, i + 11);
            const low = parseInt(hex2, 16);
            if (isNaN(low) || low < 0xdc00 || low > 0xdfff) {
              throw new Error("invalid_surrogate: invalid low surrogate");
            }
            out += String.fromCodePoint(0x10000 + (code - 0xd800) * 0x400 + (low - 0xdc00));
            i += 11;
            continue;
          }
          if (code >= 0xdc00 && code <= 0xdfff) {
            throw new Error("invalid_surrogate: isolated low surrogate");
          }
          out += String.fromCharCode(code);
          i += 5;
          continue;
        }
        default:
          throw new Error(`invalid_escape: unknown \\${s[i]}`);
      }
      i++;
      continue;
    }
    if (s.charCodeAt(i) < 0x20) {
      throw new Error(
        `invalid_escape: unescaped control U+${s.charCodeAt(i).toString(16).padStart(4, "0")}`
      );
    }
    out += s[i];
    i++;
  }
  throw new Error("unterminated_quote");
}

/** Split a string on a delimiter, respecting quoted strings. */
export function splitRespectingQuotes(s: string, delim: string): string[] {
  const parts: string[] = [];
  let current = "";
  let inQuote = false;
  let escaped = false;
  for (let i = 0; i < s.length; i++) {
    if (escaped) {
      current += s[i];
      escaped = false;
      continue;
    }
    if (s[i] === "\\" && inQuote) {
      current += s[i];
      escaped = true;
      continue;
    }
    if (s[i] === '"') {
      inQuote = !inQuote;
      current += s[i];
      continue;
    }
    if (s[i] === delim && !inQuote) {
      parts.push(current);
      current = "";
      continue;
    }
    current += s[i];
  }
  parts.push(current);
  return parts;
}

/** Split a field declaration like {id,"display name","a,b"}. */
export function splitFieldDecl(s: string): string[] {
  if (s.length < 2 || s[0] !== "{") throw new Error("invalid field declaration");
  const closeIdx = findClosingBrace(s);
  if (closeIdx < 0) throw new Error("invalid field declaration");
  const inner = s.slice(1, closeIdx);
  if (!inner) return [];
  const raw = splitRespectingQuotes(inner, ",");
  const fields: string[] = [];
  const seen = new Set<string>();
  for (const f of raw) {
    const trimmed = f.trim();
    let name: string;
    if (trimmed.length >= 2 && trimmed[0] === '"' && trimmed[trimmed.length - 1] === '"') {
      name = parseQuotedString(trimmed);
    } else {
      if (!isBareKey(trimmed)) throw new Error(`invalid field name: ${trimmed}`);
      name = trimmed;
    }
    if (seen.has(name)) throw new Error(`duplicate_field_name: ${name}`);
    seen.add(name);
    fields.push(name);
  }
  return fields;
}

function findClosingBrace(s: string): number {
  let inQuote = false;
  let escaped = false;
  for (let i = 0; i < s.length; i++) {
    if (escaped) {
      escaped = false;
      continue;
    }
    if (s[i] === "\\" && inQuote) {
      escaped = true;
      continue;
    }
    if (s[i] === '"') {
      inQuote = !inQuote;
      continue;
    }
    if (s[i] === "}" && !inQuote) return i;
  }
  return -1;
}
