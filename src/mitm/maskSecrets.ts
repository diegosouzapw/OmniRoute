/**
 * Linear secret scanner for captured Traffic Inspector text.
 *
 * Bearer credentials follow RFC 6750's token alphabet and take precedence over
 * heuristic key masking so no suffix of a credential survives a partial match.
 */

const PREFIXED_KEY_BODY_MIN = 16;
const OPAQUE_TOKEN_MIN = 40;

interface Match {
  start: number;
  end: number;
  replacement: string;
}

function isAsciiLetter(code: number): boolean {
  return (code >= 0x41 && code <= 0x5a) || (code >= 0x61 && code <= 0x7a);
}

function isAsciiDigit(code: number): boolean {
  return code >= 0x30 && code <= 0x39;
}

function isKeyCharCode(code: number): boolean {
  return isAsciiLetter(code) || isAsciiDigit(code) || code === 0x2d || code === 0x5f;
}

function isBearerCoreCharCode(code: number): boolean {
  return isKeyCharCode(code) || code === 0x2e || code === 0x7e || code === 0x2b || code === 0x2f;
}

function isOpaqueCharCode(code: number): boolean {
  return isBearerCoreCharCode(code);
}

function equalsAsciiIgnoreCase(value: string, index: number, expected: string): boolean {
  if (index + expected.length > value.length) return false;
  for (let offset = 0; offset < expected.length; offset += 1) {
    const actualCode = value.charCodeAt(index + offset);
    const expectedCode = expected.charCodeAt(offset);
    const folded = actualCode >= 0x41 && actualCode <= 0x5a ? actualCode + 0x20 : actualCode;
    if (folded !== expectedCode) return false;
  }
  return true;
}

function bearerMatch(value: string, index: number): Match | null {
  if (!equalsAsciiIgnoreCase(value, index, "bearer")) return null;
  if (index > 0 && isKeyCharCode(value.charCodeAt(index - 1))) return null;

  const schemeEnd = index + 6;
  if (value.charCodeAt(schemeEnd) !== 0x20) return null;
  let tokenStart = schemeEnd;
  while (value.charCodeAt(tokenStart) === 0x20) tokenStart += 1;

  let end = tokenStart;
  while (end < value.length && isBearerCoreCharCode(value.charCodeAt(end))) end += 1;
  if (end === tokenStart) return null;
  while (value.charCodeAt(end) === 0x3d) end += 1;

  return { start: tokenStart, end, replacement: "***" };
}

function prefixedKeyMatch(value: string, index: number): Match | null {
  if (index > 0 && isOpaqueCharCode(value.charCodeAt(index - 1))) return null;
  const prefix = value.slice(index, index + 3);
  if (prefix !== "sk-" && prefix !== "ak-" && prefix !== "pk-") return null;

  let end = index + 3;
  while (end < value.length && isOpaqueCharCode(value.charCodeAt(end))) end += 1;
  if (end - (index + 3) < PREFIXED_KEY_BODY_MIN) return null;
  while (value.charCodeAt(end) === 0x3d) end += 1;

  const token = value.slice(index, end);
  return {
    start: index,
    end,
    replacement: `${token.slice(0, 6)}…${token.slice(-2)}`,
  };
}

function opaqueTokenMatch(value: string, index: number): Match | null {
  if (!isOpaqueCharCode(value.charCodeAt(index))) return null;
  if (index > 0 && isOpaqueCharCode(value.charCodeAt(index - 1))) return null;

  let end = index + 1;
  while (end < value.length && isOpaqueCharCode(value.charCodeAt(end))) end += 1;
  if (end - index < OPAQUE_TOKEN_MIN) return null;
  while (value.charCodeAt(end) === 0x3d) end += 1;

  const token = value.slice(index, end);
  return {
    start: index,
    end,
    replacement: `${token.slice(0, 4)}…${token.slice(-2)}`,
  };
}

/** Mask Bearer credentials, provider-style keys, and long opaque tokens. */
export function maskSecret(value: string): string {
  let output = "";
  let literalStart = 0;
  let index = 0;

  while (index < value.length) {
    const match =
      bearerMatch(value, index) ?? prefixedKeyMatch(value, index) ?? opaqueTokenMatch(value, index);
    if (!match) {
      index += 1;
      continue;
    }

    output += value.slice(literalStart, match.start);
    output += match.replacement;
    index = match.end;
    literalStart = match.end;
  }

  if (literalStart === 0) return value;
  return output + value.slice(literalStart);
}
