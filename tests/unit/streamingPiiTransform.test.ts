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
