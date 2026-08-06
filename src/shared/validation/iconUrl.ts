import { z } from "zod";

/**
 * Shared source of truth for compatible-provider node icon URL validation
 * (#2166 + data-URL support). Used by both the server-side Zod schema
 * (`providerNodeIconUrlSchema` in `schemas/provider.ts`) and the Add/Edit
 * compatible-provider UI modals for field-level errors — a single validator,
 * no divergent regexes.
 *
 * Accepted shapes:
 *   - ""                         → no custom icon (clears a previously stored one)
 *   - http(s) URL                → existing #2166 semantics, 2000-char cap
 *   - `data:image/*;base64,...`  → valid image MIME + non-empty, valid base64 payload
 *
 * The data-URL header (scheme, media type, base64 marker) is matched
 * case-insensitively per RFC 2397, and optional media-type parameters (e.g.
 * `;charset=utf-8`) are accepted before the terminal `;base64` marker.
 * `image/svg+xml` is an ordinary member of `image/*` and is accepted — it is
 * rendered as an operator-supplied <img> `src` (see ProviderIcon.tsx) exactly
 * like any other image data URL, with the same onError fallback.
 *
 * Rejected:
 *   - malformed values, unsafe schemes (javascript:, ftp:, …)
 *   - non-image data URLs (`data:text/html;base64,…`, `data:application/…`)
 *   - data URLs without `;base64` (`data:image/png,…`)
 *   - data URLs with empty or invalid base64 payloads
 *   - payloads containing whitespace or other non-base64 characters
 *     (strict stored-payload validation — no whitespace stripping)
 */
export const MAX_ICON_URL_LENGTH = 2000;
// A real base64 icon legitimately exceeds the http(s) 2000-char cap — a small
// PNG/WebP badge is typically tens of KB of base64 text. Bound the data URL to
// a generous but strictly-bounded ceiling (256 KB base64 text ≈ a sizeable
// icon) so garbage input is still rejected while realistic icons are accepted.
// The DB column is plain TEXT and the request-body limit is 10 MB, so this cap
// is the governing constraint for data URLs.
export const MAX_ICON_DATA_URL_LENGTH = 256 * 1024;

// HTTP token code points (RFC 7230 `tchar` / WHATWG "HTTP token code points") —
// the complete set `!#$%&'*+-.^_`|~` plus alphanumerics. Subtypes and parameter
// attributes are validated against this full alphabet, not a partial subset.
const HTTP_TOKEN_RE = /^[-!#$%&'*+.^_`|~A-Za-z0-9]+$/;

const HTTP_SCHEME_RE = /^https?:\/\//i;
const DATA_SCHEME_RE = /^data:/i;

// Terminal base64 marker (RFC 2397 — it comes AFTER all media-type parameters).
const BASE64_MARKER = ";base64";
const DATA_SCHEME_LENGTH = "data:".length;

export function isValidProviderIconUrl(value: string): boolean {
  const trimmed = value.trim();
  if (trimmed === "") return true;

  if (DATA_SCHEME_RE.test(trimmed)) {
    if (trimmed.length > MAX_ICON_DATA_URL_LENGTH) return false;
    return isValidDataIconUrl(trimmed);
  }

  // http(s) branch — preserves the pre-existing semantics and 2000-char cap.
  if (trimmed.length > MAX_ICON_URL_LENGTH) return false;
  if (!HTTP_SCHEME_RE.test(trimmed)) return false;
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

/**
 * Validates `data:image/<subtype>[;attr=value]*;base64,<payload>` (RFC 2397).
 *
 * Steps:
 *   1. Overall data: scheme is checked with the native URL parser.
 *   2. The first comma splits the metadata header from the base64 payload.
 *   3. The metadata segment must end (case-insensitively) in the terminal
 *      `;base64` marker.
 *   4. The media type + parameters before the marker are parsed with a complete
 *      standard MIME grammar (RFC 2045/6838 + RFC 7230 tokens): type must be
 *      `image` (case-insensitive), subtype must be a non-empty HTTP token, and
 *      every parameter must be `attr=value` with a token attribute and a value
 *      that is either a token or a quoted-string. Valueless parameters
 *      (`;foo`) are rejected — RFC 2397 requires `parameter := attribute "="
 *      value`.
 *   5. The payload is validated strictly as RFC 4648 base64 (correct alphabet
 *      and padding, no whitespace).
 *
 * Quoted-string parameter values are accepted per RFC 2045; because the header
 * is split at the FIRST comma, a quoted-string value containing a literal
 * comma is conservatively rejected.
 */
function isValidDataIconUrl(value: string): boolean {
  let parsed: URL;
  try {
    parsed = new URL(value);
  } catch {
    return false;
  }
  if (parsed.protocol !== "data:") return false;

  const commaIndex = value.indexOf(",");
  if (commaIndex === -1) return false;
  const metadata = value.slice(0, commaIndex);
  const payload = value.slice(commaIndex + 1);
  if (payload.length === 0) return false;

  if (!metadata.toLowerCase().endsWith(BASE64_MARKER)) return false;
  const mediaTypeWithParams = metadata.slice(
    DATA_SCHEME_LENGTH,
    metadata.length - BASE64_MARKER.length
  );

  if (!isValidImageMediaType(mediaTypeWithParams)) return false;

  // Strict stored-payload validation: no whitespace stripping. The payload
  // must be exactly valid base64 (RFC 4648 alphabet, correct padding).
  return z.base64().safeParse(payload).success;
}

/**
 * Parses `image/<subtype>[;attr=value]*` with the complete MIME grammar:
 * type must be exactly `image` (case-insensitive), subtype a non-empty HTTP
 * token, followed by zero or more `;attr=value` parameters whose attribute is
 * an HTTP token and whose value is either an HTTP token or a quoted-string
 * (RFC 2045). Whitespace, valueless parameters, empty attributes/values, and
 * trailing garbage are rejected.
 */
function isValidImageMediaType(input: string): boolean {
  if (input.length === 0) return false;

  const slashIndex = input.indexOf("/");
  if (slashIndex <= 0 || slashIndex === input.length - 1) return false;
  if (input.slice(0, slashIndex).toLowerCase() !== "image") return false;

  let position = slashIndex + 1;
  let subtype = "";
  while (position < input.length && input[position] !== ";") {
    subtype += input[position];
    ++position;
  }
  if (subtype.length === 0 || !HTTP_TOKEN_RE.test(subtype)) return false;

  while (position < input.length) {
    if (input[position] !== ";") return false;
    ++position;

    let attribute = "";
    while (position < input.length && input[position] !== "=" && input[position] !== ";") {
      attribute += input[position];
      ++position;
    }
    if (attribute.length === 0 || !HTTP_TOKEN_RE.test(attribute)) return false;
    // Valueless parameter — rejected per RFC 2397 (`attribute "=" value`).
    if (position >= input.length || input[position] !== "=") return false;
    ++position;

    const valueEnd = parseParameterValue(input, position);
    if (valueEnd === null) return false;
    position = valueEnd;
    if (position < input.length && input[position] !== ";") return false;
  }

  return true;
}

/**
 * Consumes a parameter value starting at `start` and returns the position just
 * after it, or null on failure. A value is either an HTTP token or a
 * quoted-string (RFC 2045 `value := token / quoted-string`).
 */
function parseParameterValue(input: string, start: number): number | null {
  if (start >= input.length) return null;
  let position = start;

  if (input[start] === '"') {
    // quoted-string: DQUOTE *( qdtext / quoted-pair ) DQUOTE
    let position = start + 1;
    while (position < input.length) {
      const char = input[position];
      if (char === '"') return position + 1;
      if (char === "\\") {
        // quoted-pair: "\" HTAB / SP / VCHAR / obs-text
        if (position + 1 >= input.length) return null;
        position += 2;
        continue;
      }
      // qdtext: HTAB / SP / %x21 / %x23-5B / %x5D-7E / obs-text
      const code = char.charCodeAt(0);
      if (
        char === "\t" ||
        code === 0x20 ||
        code === 0x21 ||
        (code >= 0x23 && code <= 0x5b) ||
        (code >= 0x5d && code <= 0x7e) ||
        code >= 0x80
      ) {
        ++position;
        continue;
      }
      return null;
    }
    return null; // unterminated quote
  }

  let value = "";
  while (position < input.length && input[position] !== ";") {
    const char = input[position];
    if (char === "%") {
      const escape = input.slice(position + 1, position + 3);
      if (!/^[0-9A-Fa-f]{2}$/.test(escape)) return null;
      value += `%${escape}`;
      position += 3;
      continue;
    }
    value += char;
    ++position;
  }
  if (value.length === 0 || !HTTP_TOKEN_RE.test(value)) return null;
  return position;
}
