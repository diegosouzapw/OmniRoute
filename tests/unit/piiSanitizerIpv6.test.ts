/**
 * Additional tests for piiSanitizer.ts changes introduced in this PR:
 *
 *  1. getMode() — String(value) coercion so that the string "false" returns "off"
 *  2. IPv6 regex — expanded to handle compressed forms (::, ::1, fe80::1, etc.)
 *     and fixed lookbehind/lookahead boundary assertions.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { resetDbInstance } from "../../src/lib/db/core";

// Isolate DB state
const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-test-pii-ipv6-"));
process.env.DATA_DIR = tmpDir;

// Enable PII sanitization for all tests in this file
process.env.PII_RESPONSE_SANITIZATION = "true";
process.env.PII_RESPONSE_SANITIZATION_MODE = "redact";

import { sanitizePII } from "../../src/lib/piiSanitizer";

// ── getMode() via PII_RESPONSE_SANITIZATION_MODE env var ──────────────────────

test('getMode: string "false" maps to mode "off" (sanitization skipped)', () => {
  const originalMode = process.env.PII_RESPONSE_SANITIZATION_MODE;
  process.env.PII_RESPONSE_SANITIZATION_MODE = "false";
  try {
    // In "off" mode sanitizePII should return the raw text unchanged even when
    // PII_RESPONSE_SANITIZATION is enabled.
    const ip = "2001:db8:3333:4444:5555:6666:7777:8888";
    const result = sanitizePII(ip);
    // "off" mode means no redaction at all — text passes through as-is.
    assert.strictEqual(result.text, ip, 'mode "off" should not redact anything');
    assert.strictEqual(result.redacted, false, 'mode "off" should report redacted=false');
  } finally {
    process.env.PII_RESPONSE_SANITIZATION_MODE = originalMode;
  }
});

test("getMode: invalid value falls back to redact (PII is still redacted)", () => {
  const originalMode = process.env.PII_RESPONSE_SANITIZATION_MODE;
  process.env.PII_RESPONSE_SANITIZATION_MODE = "not_a_valid_mode";
  try {
    const ip = "2001:db8:3333:4444:5555:6666:7777:8888";
    const result = sanitizePII(ip);
    // Invalid mode falls back to "redact" — IP should be redacted.
    assert.ok(result.text.includes("[IP_REDACTED]"), "invalid mode falls back to redact");
  } finally {
    process.env.PII_RESPONSE_SANITIZATION_MODE = originalMode;
  }
});

test("getMode: empty string falls back to redact", () => {
  const originalMode = process.env.PII_RESPONSE_SANITIZATION_MODE;
  process.env.PII_RESPONSE_SANITIZATION_MODE = "";
  try {
    const ip = "2001:db8:3333:4444:5555:6666:7777:8888";
    const result = sanitizePII(ip);
    assert.ok(result.text.includes("[IP_REDACTED]"), "empty mode string falls back to redact");
  } finally {
    process.env.PII_RESPONSE_SANITIZATION_MODE = originalMode;
  }
});

// ── IPv6 regex — compressed-form detection ────────────────────────────────────

test("IPv6 :: (all-zeros) alone is redacted", () => {
  const result = sanitizePII("::");
  assert.ok(result.text.includes("[IP_REDACTED]"), "bare :: should be redacted as IPv6 all-zeros");
});

test("IPv6 ::1 (loopback) standalone is redacted", () => {
  const result = sanitizePII("::1");
  assert.ok(result.text.includes("[IP_REDACTED]"), "standalone ::1 should be redacted");
});

test("IPv6 ::1 embedded in sentence is redacted", () => {
  const result = sanitizePII("connecting to ::1 on port 8080");
  assert.ok(!result.text.includes("::1"), "::1 in sentence should be redacted");
  assert.ok(result.text.includes("[IP_REDACTED]"), "redaction marker should appear");
});

test("IPv6 fe80::1 (link-local compressed) is redacted", () => {
  const result = sanitizePII("fe80::1");
  assert.ok(result.text.includes("[IP_REDACTED]"), "fe80::1 should be redacted");
  assert.ok(!result.text.includes("fe80::1"), "raw fe80::1 should not remain");
});

test("IPv6 2001:db8:: (trailing double-colon) is redacted", () => {
  const result = sanitizePII("2001:db8::");
  assert.ok(result.text.includes("[IP_REDACTED]"), "trailing :: form should be redacted");
});

test("IPv6 ::ffff:0:0 (IPv4-mapped compressed prefix) is redacted", () => {
  const result = sanitizePII("::ffff:0:0");
  assert.ok(result.text.includes("[IP_REDACTED]"), "::ffff:0:0 should be redacted");
});

test("IPv6 full 8-segment address is redacted", () => {
  const result = sanitizePII("1:2:3:4:5:6:7:8");
  assert.ok(result.text.includes("[IP_REDACTED]"), "full 8-segment IPv6 should be redacted");
  assert.ok(!result.text.includes("1:2:3:4:5:6:7:8"), "raw 8-segment should not remain");
});

// ── IPv6 regex — boundary / false-positive guards ─────────────────────────────

test("IPv6 9-segment address (invalid) is NOT redacted", () => {
  // 9 colon-separated groups can never be a valid IPv6 address.
  const invalid = "1:2:3:4:5:6:7:8:9";
  const result = sanitizePII(invalid);
  assert.strictEqual(result.text, invalid, "9-segment sequence should not be redacted");
});

test("IPv6 address preceded by a colon is NOT redacted (colon in lookbehind)", () => {
  // The new lookbehind `(?<=^|[^A-Za-z0-9:])` must block matches where the
  // preceding character is a colon (part of a longer sequence).
  const text = "x:1:2:3:4:5:6:7:8";
  const result = sanitizePII(text);
  // The full sequence has a leading "x:" prefix — the 8-segment sub-slice should
  // NOT be extracted as a standalone IPv6 address.
  assert.strictEqual(result.text, text, "colon-prefixed sequence should not be redacted");
});

test("IPv6 followed by colon-hex suffix is NOT redacted (lookahead guard)", () => {
  // The lookahead `(?!:[0-9a-fA-F:])` prevents a valid 8-segment address from
  // being carved out of a longer colon-separated sequence.
  const text = "1:2:3:4:5:6:7:8:extra";
  const result = sanitizePII(text);
  assert.strictEqual(result.text, text, "8-segment prefix of a longer colon sequence should not be redacted");
});

test("IPv6 xyz::1 (non-hex prefix) is NOT redacted", () => {
  // x, y, z are outside [0-9a-fA-F] so the lookbehind must prevent a match.
  const result = sanitizePII("xyz::1");
  assert.strictEqual(result.text, "xyz::1", "xyz::1 should not be redacted (non-hex prefix)");
});

test("IPv6 abc::1 (valid hex prefix) IS redacted", () => {
  // a, b, c are valid hex digits, so abc::1 is a valid compressed IPv6 address.
  const result = sanitizePII("abc::1");
  assert.ok(result.text.includes("[IP_REDACTED]"), "abc::1 should be redacted as valid compressed IPv6");
});

test("IPv6 full 8-segment with trailing alphanumeric is NOT redacted", () => {
  // Lookahead must reject the match when the address is immediately followed by
  // a letter/digit (8888abcd).
  const text = "2001:db8:3333:4444:5555:6666:7777:8888abcd";
  const result = sanitizePII(text);
  assert.strictEqual(result.text, text, "8-segment address with trailing alnum should not be redacted");
});

test("multiple IPv6 addresses in the same string are all redacted", () => {
  const text = "hosts: ::1 and 2001:db8::cafe";
  const result = sanitizePII(text);
  assert.ok(!result.text.includes("::1"), "first IPv6 should be redacted");
  assert.ok(!result.text.includes("2001:db8::cafe"), "second IPv6 should be redacted");
  const markerCount = (result.text.match(/\[IP_REDACTED\]/g) || []).length;
  assert.ok(markerCount >= 2, "two redaction markers should be present");
});

// ── Regression: IPv6 redaction inside JSON SSE stream ────────────────────────

test("IPv6 address inside SSE JSON content is redacted end-to-end", async () => {
  // This verifies the full pipeline: SSE transform → PII sanitizer → IPv6 regex.
  process.env.PII_TEST_BYPASS_MIN_WINDOW = "true";
  const { createPiiSseTransform } = await import("../../src/lib/streamingPiiTransform");

  const transform = createPiiSseTransform();
  const writer = transform.writable.getWriter();
  const reader = transform.readable.getReader();

  const encoder = new TextEncoder();
  const writePromise = (async () => {
    await writer.write(encoder.encode(
      `data: {"choices":[{"delta":{"content":"server is at 2001:db8:3333:4444:5555:6666:7777:8888"}}]}\n\n`
    ));
    await writer.write(encoder.encode(`data: [DONE]\n\n`));
    await writer.close();
  })();

  const chunks: string[] = [];
  let res = await reader.read();
  while (!res.done) {
    chunks.push(new TextDecoder().decode(res.value));
    res = await reader.read();
  }
  await writePromise;

  const output = chunks.join("");
  assert.ok(!output.includes("2001:db8:3333:4444:5555:6666:7777:8888"),
    "full IPv6 address in SSE stream should be redacted");
  assert.ok(output.includes("[IP_REDACTED]"),
    "redaction marker should appear in SSE stream output");
});

test.after(() => {
  resetDbInstance();
  fs.rmSync(tmpDir, { recursive: true, force: true });
});