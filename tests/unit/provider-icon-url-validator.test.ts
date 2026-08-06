// Focused tests for the shared icon-URL validator (src/shared/validation/iconUrl.ts)
// and the data-URL acceptance in createProviderNodeSchema/updateProviderNodeSchema.
// Mirrors the acceptance criteria: valid http(s) + valid `data:image/*;base64` URLs
// accepted; malformed values, non-image data URLs, non-base64 image data URLs, and
// unsafe schemes rejected.
import test from "node:test";
import assert from "node:assert/strict";

import { isValidProviderIconUrl } from "../../src/shared/validation/iconUrl.ts";
import {
  createProviderNodeSchema,
  updateProviderNodeSchema,
} from "../../src/shared/validation/schemas.ts";

// `iVBORw0KGgo=...` is a base64-encoded (truncated but structurally valid) PNG header.
const VALID_PNG_DATA_URL = "data:image/png;base64,iVBORw0KGgo=";
const VALID_SVG_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciLz4=";
const VALID_XICON_DATA_URL = "data:image/x-icon;base64,QUJDRA==";
const VALID_JPEG_DATA_URL = "data:image/jpeg;base64,/9j/4AAQSkZJRg==";
const VALID_HTTP = "https://example.com/logo.png";
const VALID_HTTP_2000 = "https://example.com/" + "a".repeat(1970) + ".png";

// ---- shared validator ----
test("isValidProviderIconUrl accepts empty and http(s)", () => {
  assert.equal(isValidProviderIconUrl(""), true);
  assert.equal(isValidProviderIconUrl(VALID_HTTP), true);
  assert.equal(isValidProviderIconUrl("http://example.com/logo.png"), true);
});

test("isValidProviderIconUrl accepts valid data:image/*;base64 URLs", () => {
  assert.equal(isValidProviderIconUrl(VALID_PNG_DATA_URL), true);
  assert.equal(isValidProviderIconUrl(VALID_SVG_DATA_URL), true);
  assert.equal(isValidProviderIconUrl(VALID_XICON_DATA_URL), true);
  assert.equal(isValidProviderIconUrl(VALID_JPEG_DATA_URL), true);
});

test("data-URL scheme / media type / base64 marker are case-insensitive (RFC 2397)", () => {
  assert.equal(isValidProviderIconUrl("DATA:image/png;BASE64,iVBORw0KGgo="), true);
  assert.equal(isValidProviderIconUrl("Data:image/png;Base64,iVBORw0KGgo="), true);
  assert.equal(isValidProviderIconUrl("data:IMAGE/PNG;base64,iVBORw0KGgo="), true);
  assert.equal(isValidProviderIconUrl("data:image/Png;base64,iVBORw0KGgo="), true);
});

test("data-URL accepts valid media-type parameters before the terminal ;base64", () => {
  assert.equal(isValidProviderIconUrl("data:image/svg+xml;charset=utf-8;base64,PHN2Zy8+"), true);
  assert.equal(isValidProviderIconUrl("data:image/svg+xml;charset=UTF-8;base64,PHN2Zy8+"), true);
  assert.equal(isValidProviderIconUrl("data:image/png;foo=bar;base64,QUJD"), true);
  // Review case: percent-encoded token parameter value (`%` is an HTTP token char).
  assert.equal(isValidProviderIconUrl("data:image/png;name=foo%20bar;base64,QUJD"), true);
  assert.equal(isValidProviderIconUrl("data:image/png;name=foo%ZZ;base64,QUJD"), false);
  // Multiple parameters + RFC 2045 quoted-string values are accepted.
  assert.equal(
    isValidProviderIconUrl('data:image/png;name="foo bar";charset=utf-8;base64,QUJD'),
    true
  );
  assert.equal(isValidProviderIconUrl('data:image/png;name="a;b";base64,QUJD'), true);
  // Escaped quote inside a quoted-string value (quoted-pair).
  assert.equal(isValidProviderIconUrl('data:image/png;name="say \\"hi\\"";base64,QUJD'), true);
});

test('data-URL rejects valueless parameters per RFC 2397 (attribute "=" value)', () => {
  const invalid = [
    "data:image/png;foo;base64,QUJD", // review case: valueless parameter
    "data:image/png;base64;base64,QUJD", // second ;base64 is a valueless parameter
    "data:image/png;=bar;base64,QUJD", // empty attribute
    "data:image/png;foo=;base64,QUJD", // empty value
    "data:image/png;foo=bar;baz;base64,QUJD", // valueless among valued params
  ];
  for (const v of invalid) {
    assert.equal(isValidProviderIconUrl(v), false, `Should reject: ${JSON.stringify(v)}`);
  }
});

test("data-URL media types use the full HTTP token alphabet (RFC 7230/6838)", () => {
  // All `tchar` code points in one subtype; plus common image subtypes that use
  // `+`, `.` and `-` (the previous grammar only allowed `[a-z0-9.+-]`).
  const tokenAlphabet = "!#$%&'*+-.^_`|~09";
  assert.equal(isValidProviderIconUrl(`data:image/${tokenAlphabet};base64,QUJD`), true);
  assert.equal(isValidProviderIconUrl("data:image/svg+xml;base64,QUJD"), true);
  assert.equal(isValidProviderIconUrl("data:image/vnd.microsoft.icon;base64,QUJD"), true);
  assert.equal(isValidProviderIconUrl("data:image/x-ms-bmp;base64,QUJD"), true);
  // Token characters rejected by the old partial regex are now accepted.
  assert.equal(isValidProviderIconUrl("data:image/x~weird*name`;base64,QUJD"), true);
  // Any valid token is a valid subtype — `png..` is a legal RFC 7230 token even
  // though it looks odd; traversal-shaped payloads are harmless here because
  // data URLs never touch a filesystem.
  assert.equal(isValidProviderIconUrl("data:image/png..;base64,QUJD"), true);
  // Non-token characters in the subtype are still rejected.
  const invalidSubtypes = [
    "data:image/png/sub;base64,QUJD", // slash inside subtype
    "data:image/pn g;base64,QUJD", // space
    "data:image/;base64,QUJD", // empty subtype
    "data:image/png\u0000;base64,QUJD", // control char
  ];
  for (const v of invalidSubtypes) {
    assert.equal(isValidProviderIconUrl(v), false, `Should reject: ${JSON.stringify(v)}`);
  }
});

test("data-URL media-type and parameter grammar edge cases", () => {
  assert.equal(isValidProviderIconUrl("data:image/png;base64,QUJD"), true);
  assert.equal(isValidProviderIconUrl("data:image/png;charset=utf-8;base64,QUJD"), true);
  // `;base64` must be terminal — params after it are rejected.
  assert.equal(isValidProviderIconUrl("data:image/png;base64;charset=utf-8,QUJD"), false);
  // Attribute charset must be a token.
  assert.equal(isValidProviderIconUrl("data:image/png;char set=utf-8;base64,QUJD"), false);
  assert.equal(isValidProviderIconUrl('data:image/png;charset="unterminated;base64,QUJD'), false);
  // First-comma split rule: a quoted-string value containing a literal comma is
  // conservatively rejected (documented limitation).
  assert.equal(isValidProviderIconUrl('data:image/png;name="a,b";base64,QUJD'), false);
  // Header-only data URLs and empty metadata are rejected.
  assert.equal(isValidProviderIconUrl("data:"), false);
  assert.equal(isValidProviderIconUrl("data:;base64,QUJD"), false);
  assert.equal(isValidProviderIconUrl("data:image/png;base64,"), false);
});

test("data-URL payloads are strictly validated — whitespace is rejected", () => {
  const invalid = [
    "data:image/png;base64,iVBORw0K\nGgo=", // line break in payload
    "data:image/png;base64,iVBORw0K\r\nGgo=", // CRLF in payload
    "data:image/png;base64,iVBORw0K\tGgo=", // tab in payload
    "data:image/png;base64,iVB ORw", // space in payload
    "data:image/png;base64,iVBORw0K Ggo=", // space in payload
    "data:image/png;base64,iVBOR\u00A0w0KGgo=", // non-breaking space mid-payload (Unicode whitespace)
  ];
  for (const v of invalid) {
    assert.equal(isValidProviderIconUrl(v), false, `Should reject: ${JSON.stringify(v)}`);
  }
});

test("isValidProviderIconUrl rejects malformed values and unsafe schemes", () => {
  const invalid = [
    "not-a-url",
    "javascript:alert(1)",
    "ftp://broken",
    "file:///etc/passwd",
    "//example.com/logo.png", // scheme-relative — not explicitly http(s)
    "https://", // no host
    "https://exa mple.com/x.png", // space in host
  ];
  for (const v of invalid) {
    assert.equal(isValidProviderIconUrl(v), false, `Should reject: ${JSON.stringify(v)}`);
  }
});

test("isValidProviderIconUrl rejects non-image data URLs", () => {
  const invalid = [
    "data:text/html;base64,QUJD",
    "data:text/plain;base64,QUJD",
    "data:application/json;base64,e30=",
    "data:image/png", // no ;base64,payload
    "data:application/octet-stream;base64,QUJD",
  ];
  for (const v of invalid) {
    assert.equal(isValidProviderIconUrl(v), false, `Should reject: ${JSON.stringify(v)}`);
  }
});

test("isValidProviderIconUrl rejects non-base64 image data URLs", () => {
  const invalid = [
    "data:image/png,QUJD", // missing ;base64
    "data:image/png;base64,", // empty payload
    "data:image/png;base64,!!!!", // invalid base64 chars
    "data:image/png;base64,A", // payload not 4-char aligned
    "data:image/png;base64,AAAA=", // over-padded
    "data:image/png;base64,=QUJD=", // leading '='
  ];
  for (const v of invalid) {
    assert.equal(isValidProviderIconUrl(v), false, `Should reject: ${JSON.stringify(v)}`);
  }
});

test("isValidProviderIconUrl enforces length caps", () => {
  // http(s): 2000-char cap preserved.
  const tooLongHttp = "https://example.com/" + "a".repeat(2000) + ".png";
  assert.equal(isValidProviderIconUrl(tooLongHttp), false);
  assert.equal(isValidProviderIconUrl(VALID_HTTP_2000), true);
  // data URL: generous 256 KB cap.
  const tooLongData = "data:image/png;base64," + "A".repeat(256 * 1024 + 10);
  assert.equal(isValidProviderIconUrl(tooLongData), false);
});

// ---- server-side schema integration ----
test("createProviderNodeSchema accepts a valid data:image/*;base64 iconUrl", () => {
  const result = createProviderNodeSchema.safeParse({
    name: "Test",
    prefix: "test",
    apiType: "chat",
    iconUrl: VALID_PNG_DATA_URL,
  });
  assert.equal(result.success, true);
});

test("createProviderNodeSchema rejects invalid data URLs", () => {
  const invalid = [
    "data:text/html;base64,QUJD",
    "data:image/png,QUJD",
    "data:image/png;base64,!!!!",
    "data:image/png;base64,",
    "data:image/png;base64,iVB ORw",
  ];
  for (const iconUrl of invalid) {
    const result = createProviderNodeSchema.safeParse({
      name: "Test",
      prefix: "test",
      apiType: "chat",
      iconUrl,
    });
    assert.equal(result.success, false, `Should reject: ${JSON.stringify(iconUrl)}`);
  }
});

test("updateProviderNodeSchema accepts a valid data:image/*;base64 iconUrl", () => {
  const result = updateProviderNodeSchema.safeParse({
    name: "Test",
    prefix: "test",
    baseUrl: "https://test.com",
    iconUrl: VALID_SVG_DATA_URL,
  });
  assert.equal(result.success, true);
});
