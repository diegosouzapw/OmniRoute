import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Isolate DB state
const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-test-streaming-pii-"));
process.env.DATA_DIR = tmpDir;

// Enable the feature flag for tests
const originalEnv = process.env.PII_RESPONSE_SANITIZATION;
process.env.PII_RESPONSE_SANITIZATION = "true";
process.env.PII_TEST_BYPASS_MIN_WINDOW = "true";

import { createPiiSseTransform } from "../../src/lib/streamingPiiTransform.ts";

async function testTransform(transform: TransformStream, inputChunks: string[]): Promise<string> {
  const writer = transform.writable.getWriter();
  const reader = transform.readable.getReader();

  const writePromise = (async () => {
    for (const chunk of inputChunks) {
      await writer.write(new TextEncoder().encode(chunk));
    }
    await writer.close();
  })();

  const outputChunks: string[] = [];
  let res = await reader.read();
  while (!res.done) {
    outputChunks.push(new TextDecoder().decode(res.value));
    res = await reader.read();
  }

  await writePromise;
  return outputChunks.join("");
}

test("createPiiSseTransform returns a TransformStream", () => {
  const transform = createPiiSseTransform();
  assert.ok(transform instanceof TransformStream);
});

test("createPiiSseTransform redacts email in delta.content", async () => {
  const transform = createPiiSseTransform();

  const input = `data: {"choices":[{"delta":{"content":"email is john@example.com ok"}}]}\n\n`;
  const output = await testTransform(transform, [input]);

  // Should NOT contain the raw email
  assert.ok(!output.includes("john@example.com"),
    "raw email should be redacted from output");
  // Should contain some form of redaction marker
  assert.ok(output.includes("REDACTED") || output.includes("[EMAIL"),
    "output should contain redaction marker");
});

test("createPiiSseTransform passes non-PII content through unchanged", async () => {
  const transform = createPiiSseTransform();

  const input = `data: {"choices":[{"delta":{"content":"hello world no secrets here"}}]}\n\n`;
  const output = await testTransform(transform, [input]);

  assert.ok(output.includes("hello world no secrets here"),
    "non-PII content should pass through unchanged");
});

test("createPiiSseTransform redacts PII split across chunk boundaries", async () => {
  const transform = createPiiSseTransform();

  const chunk1 = `data: {"choices":[{"delta":{"content":"email is john@"}}]}\n\n`;
  const chunk2 = `data: {"choices":[{"delta":{"content":"example.com"}}]}\n\n`;

  const output = await testTransform(transform, [chunk1, chunk2]);

  assert.ok(!output.includes("john@example.com"),
    "email split across chunks should be redacted");
  assert.ok(output.includes("REDACTED") || output.includes("[EMAIL"),
    "redaction marker should be present in final stream");
});

test("createPiiSseTransform flushes final redacted content before [DONE] sentinel", async () => {
  const transform = createPiiSseTransform();

  const chunk1 = `data: {"choices":[{"delta":{"content":"my email is john@"}}]}\n\n`;
  const chunk2 = `data: {"choices":[{"delta":{"content":"example.com"}}]}\n\n`;
  const chunk3 = `data: [DONE]\n\n`;

  const writer = transform.writable.getWriter();
  const reader = transform.readable.getReader();

  const writePromise = (async () => {
    await writer.write(new TextEncoder().encode(chunk1));
    await writer.write(new TextEncoder().encode(chunk2));
    await writer.write(new TextEncoder().encode(chunk3));
    await writer.close();
  })();

  const outputChunks: string[] = [];
  let res = await reader.read();
  while (!res.done) {
    outputChunks.push(new TextDecoder().decode(res.value));
    res = await reader.read();
  }
  await writePromise;

  const fullOutput = outputChunks.join("");
  const lines = fullOutput.split("\n").map(l => l.trim()).filter(Boolean);

  const doneIndex = lines.findIndex(l => l === "data: [DONE]");
  assert.ok(doneIndex !== -1, "[DONE] sentinel should be in the stream");
  
  assert.equal(doneIndex, lines.length - 1, "nothing should be enqueued after the [DONE] sentinel");

  const redactedLine = lines.find((l, idx) => idx < doneIndex && (l.includes("REDACTED") || l.includes("[EMAIL")));
  assert.ok(redactedLine, "redacted content chunk should be enqueued before the [DONE] sentinel");
});

test("content flushed when last chunk is metadata-only (no delta.content)", async () => {
  const transform = createPiiSseTransform();

  const chunk1 = `data: {"choices":[{"delta":{"content":"hello world"}}]}\n\n`;
  const chunk2 = `data: {"choices":[{"delta":{},"finish_reason":"stop"}]}\n\n`;
  const chunk3 = `data: [DONE]\n\n`;

  const output = await testTransform(transform, [chunk1, chunk2, chunk3]);

  assert.ok(output.includes("hello world"),
    "buffered content must be flushed even when last chunk has no delta.content");
});

test("no duplicate content when stream has [DONE] and normal close", async () => {
  const transform = createPiiSseTransform();

  const chunk1 = `data: {"choices":[{"delta":{"content":"test content here"}}]}\n\n`;
  const chunk2 = `data: [DONE]\n\n`;

  const output = await testTransform(transform, [chunk1, chunk2]);

  // Count occurrences of the content
  const matches = output.match(/test content here/g) || [];
  assert.ok(matches.length <= 1, "content should not be duplicated by double-flush");
});

test("configurable windowSize is respected", async () => {
  // We need to type the options manually in the test since the signature hasn't changed yet,
  // or cast it. createPiiSseTransform doesn't take args yet, so passing an arg will be ignored
  // until we change the signature. But in TypeScript it might error if we pass an arg.
  // Wait, I will just cast it as any.
  const transform = (createPiiSseTransform as any)({ windowSize: 10 });

  // Send 20 chars of content
  const input = `data: {"choices":[{"delta":{"content":"abcdefghijklmnopqrst"}}]}\n\n`;
  const chunk2 = `data: [DONE]\n\n`;
  const output = await testTransform(transform, [input, chunk2]);

  // All 20 chars should appear in the final output (10 emitted, 10 flushed)
  assert.ok(output.includes("abcdefghij"), "first 10 chars should be emitted immediately");
  assert.ok(output.includes("klmnopqrst"), "last 10 chars should be flushed");
});

test("Gemini format PII redaction", async () => {
  const transform = createPiiSseTransform();

  const input = `data: {"candidates":[{"content":{"parts":[{"text":"email is john@example.com"}]}}]}\n\n`;
  const done = `data: [DONE]\n\n`;
  const output = await testTransform(transform, [input, done]);

  assert.ok(!output.includes("john@example.com"), "email should be redacted in Gemini format");
});

test("PII split across sliding window boundary is still redacted", async () => {
  const transform = (createPiiSseTransform as any)({ windowSize: 10 });

  // Email is 20 chars, window is 10 — the email straddles the boundary
  const chunk1 = `data: {"choices":[{"delta":{"content":"contact user@"}}]}\n\n`;
  const chunk2 = `data: {"choices":[{"delta":{"content":"example.com today"}}]}\n\n`;
  const done = `data: [DONE]\n\n`;
  const output = await testTransform(transform, [chunk1, chunk2, done]);

  assert.ok(!output.includes("user@example.com"),
    "email spanning window boundary should be redacted");
});

test("preserve event names when flushing buffered SSE text", async () => {
  const transform = (createPiiSseTransform as any)({ windowSize: 10 });

  const eventLine = "event: response.output_text.delta\n";
  const inputLine = `data: {"choices":[{"delta":{"content":"abcdefghijklmnopqrst"}}]}\n\n`;
  const doneLine = `data: [DONE]\n\n`;

  const output = await testTransform(transform, [eventLine + inputLine + doneLine]);

  const occurrences = (output.match(/event: response\.output_text\.delta/g) || []).length;
  assert.strictEqual(occurrences, 2, "flushed chunk should re-emit the custom event line");
});

test("do not leak custom event name to subsequent default message events on flush", async () => {
  const transform = (createPiiSseTransform as any)({ windowSize: 10 });

  const eventLine = "event: response.output_text.delta\n";
  const inputLine1 = `data: {"choices":[{"delta":{"content":"abcdefghij"}}]}\n\n`;
  const inputLine2 = `data: {"choices":[{"delta":{"content":"klmnopqrst"}}]}\n\n`;
  const doneLine = `data: [DONE]\n\n`;

  const output = await testTransform(transform, [eventLine + inputLine1 + inputLine2 + doneLine]);

  const occurrences = (output.match(/event: response.output_text.delta/g) || []).length;
  assert.strictEqual(occurrences, 1, "custom event name should only appear once and not leak to the flushed chunk of the default message");
});

test("insert an SSE event separator before flushed chunks", async () => {
  const transform = (createPiiSseTransform as any)({ windowSize: 10 });

  const inputLine = `data: {"choices":[{"delta":{"content":"abcdefghijklmnopqrst"}}]}\n\n`;
  const doneLine = `data: [DONE]\n\n`;

  const output = await testTransform(transform, [inputLine + doneLine]);

  // Output must contain the payload and [DONE] separated by double newlines to form separate SSE events
  assert.ok(output.includes("\n\ndata: [DONE]"), "should separate flushed chunk and [DONE] event");
});

test("reset event line on empty line message boundary", async () => {
  const transform = (createPiiSseTransform as any)({ windowSize: 10 });

  const eventLine = "event: response.output_text.delta\n";
  const inputLine = `data: {"choices":[{"delta":{"content":"abcdefghijklmnopqrst"}}]}\n\n`;
  const defaultLine = `data: {"choices":[{"delta":{"content":"uvwxyz"}}]}\n\n`;
  const doneLine = `data: [DONE]\n\n`;

  const output = await testTransform(transform, [eventLine + inputLine, defaultLine + doneLine]);

  // The defaultLine is preceded by a blank line (\n\n), so it is a separate event.
  // The event name "response.output_text.delta" must NOT leak into the second event.
  const parts = output.split("\n\n");
  
  // parts[0] should have the custom event name
  assert.ok(parts[0].includes("event: response.output_text.delta"), "first block should have custom event name");
  
  // parts[1] should NOT have the custom event name
  assert.ok(!parts[1].includes("event: response.output_text.delta"), "second block should reset event name and not leak it");
});

test("sanitize compressed IPv6 addresses", async () => {
  const transform = createPiiSseTransform();
  
  const inputLoopback = `data: {"choices":[{"delta":{"content":"server address is ::1"}}]}\n\n`;
  const inputCompressed = `data: {"choices":[{"delta":{"content":"server address is 2001:db8::1"}}]}\n\n`;
  const doneLine = `data: [DONE]\n\n`;

  const outputLoopback = await testTransform(transform, [inputLoopback + doneLine]);
  assert.ok(!outputLoopback.includes("::1"), "compressed loopback IPv6 should be redacted");
  assert.ok(outputLoopback.includes("[IP_REDACTED]"), "redaction marker should be present for loopback IPv6");

  const transform2 = createPiiSseTransform();
  const outputCompressed = await testTransform(transform2, [inputCompressed + doneLine]);
  assert.ok(!outputCompressed.includes("2001:db8::1"), "compressed IPv6 should be redacted");
  assert.ok(outputCompressed.includes("[IP_REDACTED]"), "redaction marker should be present for compressed IPv6");
});

test("no event: prefix in flushed chunk when no event line was seen", async () => {
  // If no "event:" line preceded the data lines, lastEventLine should remain
  // empty and the flushed payload must NOT have any "event:" prepended.
  const transform = (createPiiSseTransform as any)({ windowSize: 10 });

  const inputLine = `data: {"choices":[{"delta":{"content":"abcdefghijklmnopqrst"}}]}\n\n`;
  const doneLine = `data: [DONE]\n\n`;

  const output = await testTransform(transform, [inputLine + doneLine]);

  // The flushed chunk (last 10 chars "klmnopqrst") must NOT be preceded by any "event:" line.
  assert.ok(!output.includes("event:"), "no event: prefix should appear when no event line was seen");
});

test("event name preserved when stream closes without [DONE] sentinel", async () => {
  // The stream flush path (TransformStream flush()) must also prepend lastEventLine.
  const transform = (createPiiSseTransform as any)({ windowSize: 10 });

  const eventLine = "event: response.output_text.delta\n";
  // 20-char content — window=10 means 10 chars are buffered and flushed on close.
  const inputLine = `data: {"choices":[{"delta":{"content":"abcdefghijklmnopqrst"}}]}\n\n`;

  // No [DONE] — rely on the TransformStream flush() callback.
  const output = await testTransform(transform, [eventLine + inputLine]);

  assert.ok(
    output.includes("event: response.output_text.delta"),
    "event name should be preserved even when stream closes without [DONE]"
  );
});

test("event: line without trailing space is tracked as currentEventLine", async () => {
  // The code checks `line.startsWith("event:")` — this matches both
  // "event: foo" and "event:foo". Both forms should be captured.
  const transform = (createPiiSseTransform as any)({ windowSize: 10 });

  // Use the no-space variant: "event:custom.event"
  const eventLine = "event:custom.event\n";
  const inputLine = `data: {"choices":[{"delta":{"content":"abcdefghijklmnopqrst"}}]}\n\n`;
  const doneLine = `data: [DONE]\n\n`;

  const output = await testTransform(transform, [eventLine + inputLine + doneLine]);

  assert.ok(output.includes("event:custom.event"), "no-space event: form should be tracked and prepended on flush");
});

test("lastEventLine is not updated when processing a stop-signal chunk", async () => {
  // The code guards: `if (!isStopSignal && !isSnapshot) { lastEventLine = currentEventLine; }`
  // A stop-signal chunk (finish_reason present) must not overwrite lastEventLine with an
  // event name that belongs only to the stop chunk.
  const transform = (createPiiSseTransform as any)({ windowSize: 10 });

  // First: a regular content chunk preceded by a named event.
  const contentEventLine = "event: response.output_text.delta\n";
  const contentData = `data: {"choices":[{"delta":{"content":"abcdefghijklmno"}}]}\n\n`;

  // Second: a stop signal preceded by a DIFFERENT event name.
  // lastEventLine should remain "response.output_text.delta" (from the content chunk),
  // not "response.done" (from the stop signal).
  const stopEventLine = "event: response.done\n";
  const stopData = `data: {"choices":[{"delta":{},"finish_reason":"stop"}]}\n\n`;
  const doneLine = `data: [DONE]\n\n`;

  const output = await testTransform(transform, [
    contentEventLine + contentData,
    stopEventLine + stopData + doneLine,
  ]);

  // The flushed chunk (the buffered tail of "abcdefghijklmno") should be preceded by
  // "response.output_text.delta", not "response.done".
  assert.ok(
    output.includes("event: response.output_text.delta"),
    "flushed chunk should carry the content event name, not the stop-signal event name"
  );
  // "response.done" may appear in the pass-through of the stop event line itself,
  // but should NOT be the event name attached to the flushed data payload.
  const flushedSection = output.slice(output.lastIndexOf("event: response.output_text.delta"));
  assert.ok(
    !flushedSection.startsWith("event: response.done"),
    "flushed payload must not be tagged with the stop-signal event name"
  );
});

test("two consecutive events with different names each get their own event name on flush", async () => {
  // Sequence: event-A → content-A (fills window) → event-B → content-B (fills window) → [DONE]
  // The flushed tail of content-A should carry event-A, and the flushed tail of content-B event-B.
  const transform = (createPiiSseTransform as any)({ windowSize: 5 });

  const eventA = "event: event.type.alpha\n";
  const dataA = `data: {"choices":[{"delta":{"content":"abcdefghij"}}]}\n\n`;

  const eventB = "event: event.type.beta\n";
  const dataB = `data: {"choices":[{"delta":{"content":"klmnopqrst"}}]}\n\n`;
  const doneLine = `data: [DONE]\n\n`;

  const output = await testTransform(transform, [eventA + dataA + eventB + dataB + doneLine]);

  assert.ok(output.includes("event: event.type.alpha"), "event-A name should appear in output");
  assert.ok(output.includes("event: event.type.beta"), "event-B name should appear in output");
});

test("stop signal event name is enqueued correctly without misattribution or loss", async () => {
  const transform = (createPiiSseTransform as any)({ windowSize: 10 });

  const contentEventLine = "event: response.output_text.delta\n";
  const contentData = `data: {"choices":[{"delta":{"content":"abcdefghijklmno"}}]}\n\n`;

  const stopEventLine = "event: response.done\n";
  const stopData = `data: {"choices":[{"delta":{},"finish_reason":"stop"}]}\n\n`;
  const doneLine = `data: [DONE]\n\n`;

  const output = await testTransform(transform, [
    contentEventLine + contentData,
    stopEventLine + stopData + doneLine,
  ]);

  // The stop signal itself should be preceded by its own event name "response.done"
  const stopSignalIndex = output.indexOf('"finish_reason":"stop"');
  assert.ok(stopSignalIndex !== -1, "stop signal should be present in output");
  const sectionBeforeStop = output.slice(0, stopSignalIndex);
  const lastEventBeforeStop = sectionBeforeStop.slice(sectionBeforeStop.lastIndexOf("event:"));
  assert.ok(
    lastEventBeforeStop.includes("event: response.done"),
    "stop signal payload must be immediately preceded by event: response.done"
  );
});

test("verify keep-alive event preservation (no-data event)", async () => {
  const transform = (createPiiSseTransform as any)({ windowSize: 10 });

  const eventLine = "event: keep-alive\n\n";
  const output = await testTransform(transform, [eventLine]);

  assert.ok(output.includes("event: keep-alive"), "keep-alive event should be preserved");
});

test("verify event line flushed before other non-data lines (e.g. id, retry)", async () => {
  const transform = (createPiiSseTransform as any)({ windowSize: 0 });

  const inputLines = "event: foo\nid: 123\ndata: bar\n\n";
  const output = await testTransform(transform, [inputLines]);

  assert.ok(output.includes("event: foo\nid: 123\ndata: bar"), "event line must be flushed before non-data lines like id");
});

test("verify trailing event line is flushed on stream close", async () => {
  const transform = (createPiiSseTransform as any)({ windowSize: 10 });

  const inputLines = "event: some-trailing-event\n";
  const output = await testTransform(transform, [inputLines]);

  assert.ok(output.includes("event: some-trailing-event"), "trailing event line should be flushed on stream close");
});

test("verify consecutive event lines without intervening data are both preserved", async () => {
  const transform = (createPiiSseTransform as any)({ windowSize: 10 });

  const inputLines = "event: first-event\nevent: second-event\ndata: some-data\n\n";
  const output = await testTransform(transform, [inputLines]);

  assert.ok(output.includes("event: first-event"), "first event should be preserved");
  assert.ok(output.includes("event: second-event"), "second event should be preserved");
});

test.after(async () => {
  if (originalEnv !== undefined) {
    process.env.PII_RESPONSE_SANITIZATION = originalEnv;
  } else {
    delete process.env.PII_RESPONSE_SANITIZATION;
  }

  const coreDb = await import("../../src/lib/db/core.ts");
  coreDb.resetDbInstance();
  fs.rmSync(tmpDir, { recursive: true, force: true });
});
