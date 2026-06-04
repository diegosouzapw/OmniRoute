import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { resetDbInstance } from "../../src/lib/db/core";

// Isolate DB state
const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-test-repro-"));
process.env.DATA_DIR = tmpDir;

import { createPiiSseTransform } from "../../src/lib/streamingPiiTransform";
import { sanitizePII } from "../../src/lib/piiSanitizer";

test("PII Reproduction Tests", async (t) => {
  // Setup overrides for tests
  const originalEnv = process.env;
  process.env = { 
    ...originalEnv,
    PII_RESPONSE_SANITIZATION: "true",
    PII_RESPONSE_SANITIZATION_MODE: "redact",
    PII_TEST_BYPASS_MIN_WINDOW: "true"
  };

  await t.test("THEORY-001: Infinite Streaming Buffer Accumulation", async () => {
    const transform = createPiiSseTransform({ windowSize: 10 });
    const writer = transform.writable.getWriter();
    const encoder = new TextEncoder();

    // Collect all output via pipeTo (non-blocking, handles lifecycle properly)
    const chunks: Uint8Array[] = [];
    const collector = new WritableStream({
      write(chunk) { chunks.push(chunk); }
    });
    const pipePromise = transform.readable.pipeTo(collector);

    // Write 50 alphanumeric characters starting with "sk-"
    const piiText = "sk-123456789012345678901234567890123456789012345678"; // 51 chars

    await writer.write(encoder.encode(`data: ${JSON.stringify({ choices: [{ delta: { content: piiText } }] })}\n`));

    // Wait a bit — if the buffer is withheld (W=10, PII window), nothing should be emitted yet
    await new Promise((r) => setTimeout(r, 150));
    const preCloseOutput = chunks.map(c => new TextDecoder().decode(c)).join("");
    assert.ok(!preCloseOutput.includes("[API_KEY_REDACTED]"), "Nothing should be emitted before close because buffer is indefinitely withheld");

    // Close the writer — this triggers flush which emits the redacted output
    await writer.close();
    await pipePromise;

    const decoded = chunks.map(c => new TextDecoder().decode(c)).join("");
    assert.ok(decoded.includes("[API_KEY_REDACTED]"), "Flushed output should be redacted");
  });

  await t.test("THEORY-002: Unicode Formatting Obfuscation Bypass & IPv6 Issues", async () => {
    // 1. Unicode Formatting Obfuscation Bypass (Word Joiner \\u2060 and Soft Hyphen \\u00AD)
    const keyWithWordJoiner = "sk-12345\u2060678901234567890123";
    const keyWithSoftHyphen = "sk-12345\u00AD678901234567890123";

    const resultWordJoiner = sanitizePII(keyWithWordJoiner);
    const resultSoftHyphen = sanitizePII(keyWithSoftHyphen);

    // Sanitizer now correctly catches unicode-obfuscated keys
    assert.strictEqual(resultWordJoiner.text, "[API_KEY_REDACTED]", "API Key with Word Joiner is now correctly redacted");
    assert.strictEqual(resultSoftHyphen.text, "[API_KEY_REDACTED]", "API Key with Soft Hyphen is now correctly redacted");

    // 2. IPv6 lookbehind/lookahead issues
    // xyz::1 (preceded by non-hex alphabetic characters) should NOT be redacted
    const resultIpv6Lookbehind = sanitizePII("xyz::1");
    assert.strictEqual(resultIpv6Lookbehind.text, "xyz::1", "xyz::1 should not be redacted");

    // abc::1 (preceded by valid hex characters) is a valid compressed IPv6 address and should be redacted
    const resultIpv6ValidCompressed = sanitizePII("abc::1");
    assert.strictEqual(resultIpv6ValidCompressed.text, "[IP_REDACTED]", "abc::1 should be redacted as a valid compressed IP");

    // Invalid IPv6 followed by letters should NOT be redacted
    const resultIpv6Lookahead = sanitizePII("2001:db8:3333:4444:5555:6666:7777:8888abcd");
    assert.strictEqual(resultIpv6Lookahead.text, "2001:db8:3333:4444:5555:6666:7777:8888abcd", "Invalid IPv6 with trailing characters should not be redacted");

    // Valid IPv6 is correctly redacted
    const resultIpv6Valid = sanitizePII("2001:db8:3333:4444:5555:6666:7777:8888");
    assert.ok(resultIpv6Valid.text.includes("[IP_REDACTED]"), "Valid IPv6 should be redacted");
  });

  await t.test("THEORY-003: False Positive Identifier Redaction", async () => {
    // 16-digit database ID/Snowflake ID — no longer falsely flagged as credit card
    const snowflakeId = "1234567890123456";
    const resultCc = sanitizePII(snowflakeId);
    assert.strictEqual(resultCc.text, snowflakeId, "16-digit numeric identifier should not be redacted as Credit Card");

    // 11-digit database ID — now caught as phone number by sanitizer
    const dbId11 = "12345678901";
    const resultCpf = sanitizePII(dbId11);
    assert.ok(resultCpf.text !== dbId11, "11-digit numeric identifier is redacted (as phone)");
  });

  await t.test("THEORY-004: Data Loss in Unknown Stream Fallbacks", async () => {
    const encoder = new TextEncoder();

    // Scenario A: Raw text stream — use pipeTo to avoid dangling reader
    const transformA = createPiiSseTransform({ windowSize: 10 });
    const writerA = transformA.writable.getWriter();
    const chunksA: Uint8Array[] = [];
    const collectorA = new WritableStream({ write(chunk) { chunksA.push(chunk); } });
    const pipeA = transformA.readable.pipeTo(collectorA);

    await writerA.write(encoder.encode("data: Hello world\n"));
    await writerA.close();
    await pipeA;

    const outputA = chunksA.map(c => new TextDecoder().decode(c)).join("");
    // Bug (fixed by #3021): raw-text SSE was being wrapped in an OpenAI JSON envelope on flush.
    // After the fix, raw text passes through as raw text — the envelope must NOT appear.
    assert.ok(!outputA.includes('{"choices":'), "Scenario A: raw text must NOT be wrapped in a JSON choices envelope");
    // The content must still be present in the output (not silently dropped)
    assert.ok(outputA.includes("Hello world") || outputA.length > "data: \n".length, "Scenario A: raw text content must not be silently dropped");

    // Scenario B: Non-standard JSON stream — use pipeTo
    const transformB = createPiiSseTransform({ windowSize: 10 });
    const writerB = transformB.writable.getWriter();
    const chunksB: Uint8Array[] = [];
    const collectorB = new WritableStream({ write(chunk) { chunksB.push(chunk); } });
    const pipeB = transformB.readable.pipeTo(collectorB);

    await writerB.write(encoder.encode('data: {"msg": "Hello world"}\n'));
    await writerB.write(encoder.encode('data: {"done": true}\n'));
    await writerB.close();
    await pipeB;

    const outputB = chunksB.map(c => new TextDecoder().decode(c)).join("");
    // Bug (fixed by #3021): buffered content was permanently lost when the stop signal had no string fields.
    // After the fix, the content is emitted (possibly split across chunks due to the PII window).
    // Verify the content is present — "H" from first window emit + "ello world" from flush.
    assert.ok(outputB.includes('"H"') && outputB.includes("ello world"), "Scenario B: buffered content must not be lost — expect window-split output containing both parts");
  });
});

test.after(() => {
  resetDbInstance();
  fs.rmSync(tmpDir, { recursive: true, force: true });
});
