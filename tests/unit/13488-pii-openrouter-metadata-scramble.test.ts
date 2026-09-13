/**
 * #13488 — Streaming PII sanitizer splices OpenRouter provider/reasoning_details
 * strings into the answer text. Before the fix, sanitizeObject recursively
 * processed every non-metadata string, so OpenRouter's top-level "provider"
 * and reasoning_details[].text/format were fed through the same per-choice
 * "content" FIFO as delta.content, scrambling the output.
 *
 * The fix adds provider, reasoning_details, format, and native_finish_reason
 * to METADATA_KEYS in both sseTextTransform.ts and streamingPiiTransform.ts.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-13488-pii-"));
process.env.DATA_DIR = tmpDir;
process.env.PII_RESPONSE_SANITIZATION = "true";
process.env.PII_TEST_BYPASS_MIN_WINDOW = "true";

import { createPiiSseTransform } from "../../src/lib/streamingPiiTransform.ts";

async function feedChunks(
  transform: TransformStream,
  chunks: string[]
): Promise<string> {
  const writer = transform.writable.getWriter();
  const reader = transform.readable.getReader();

  const writePromise = (async () => {
    for (const chunk of chunks) {
      await writer.write(new TextEncoder().encode(chunk));
    }
    await writer.close();
  })();

  const output: string[] = [];
  let res = await reader.read();
  while (!res.done) {
    output.push(new TextDecoder().decode(res.value));
    res = await reader.read();
  }
  await writePromise;
  return output.join("");
}

test.after(() => {
  fs.rmSync(tmpDir, { recursive: true, force: true });
});

test("#13488 OpenRouter provider field is not scrambled into content", async () => {
  const transform = createPiiSseTransform();

  // Three OpenRouter chunks with a stable "Together" provider and simple content.
  const chunks = [
    'data: {"id":"gen-1","model":"test","provider":"Together","choices":[{"index":0,"delta":{"content":"Hello","role":"assistant"}}]}\n\n',
    'data: {"id":"gen-1","model":"test","provider":"Together","choices":[{"index":0,"delta":{"content":" world"}}]}\n\n',
    'data: {"id":"gen-1","model":"test","provider":"Together","choices":[{"index":0,"delta":{},"finish_reason":"stop"}]}\n\n',
    "data: [DONE]\n\n",
  ];

  const output = await feedChunks(transform, chunks);

  // The content must be intact (no provider name spliced in).
  assert.ok(
    output.includes("Hello world"),
    `expected content "Hello world" in output, got: ${output.slice(0, 200)}`
  );

  // The provider field must remain "Together" in every chunk, not scrambled content.
  const providerMatches = output.match(/"provider":"([^"]*)"/g) || [];
  for (const m of providerMatches) {
    assert.ok(
      m.includes("Together"),
      `provider field must be "Together", got: ${m}`
    );
  }
});

test("#13488 OpenRouter reasoning_details are not fed into content buffer", async () => {
  const transform = createPiiSseTransform();

  const chunks = [
    'data: {"id":"gen-2","model":"test","provider":"Nvidia","choices":[{"index":0,"delta":{"content":"","role":"assistant","reasoning_details":[{"type":"reasoning.text","text":"Thinking step","format":""}]}}]}\n\n',
    'data: {"id":"gen-2","model":"test","provider":"Nvidia","choices":[{"index":0,"delta":{"content":"The answer is 42."}}]}\n\n',
    'data: {"id":"gen-2","model":"test","provider":"Nvidia","choices":[{"index":0,"delta":{},"finish_reason":"stop"}]}\n\n',
    "data: [DONE]\n\n",
  ];

  const output = await feedChunks(transform, chunks);

  // Content must be exactly "The answer is 42." — no reasoning text spliced in.
  assert.ok(
    output.includes("The answer is 42."),
    `expected content "The answer is 42." in output, got: ${output.slice(0, 300)}`
  );

  // Provider must remain "Nvidia".
  const providerMatches = output.match(/"provider":"([^"]*)"/g) || [];
  for (const m of providerMatches) {
    assert.ok(
      m.includes("Nvidia"),
      `provider field must be "Nvidia", got: ${m}`
    );
  }

  // Reasoning text must NOT appear in content.
  const contentMatch = output.match(/"content":"([^"]*)"/g) || [];
  for (const m of contentMatch) {
    assert.ok(
      !m.includes("Thinking step"),
      `reasoning text must not appear in content field, got: ${m}`
    );
  }
});

test("#13488 format field is not fed into content buffer", async () => {
  const transform = createPiiSseTransform();

  const chunks = [
    'data: {"id":"gen-3","model":"test","provider":"StreamLake","choices":[{"index":0,"delta":{"content":"test","role":"assistant","reasoning_details":[{"type":"reasoning.text","text":"reasoning","format":"markdown"}]}}]}\n\n',
    'data: {"id":"gen-3","model":"test","provider":"StreamLake","choices":[{"index":0,"delta":{},"finish_reason":"stop"}]}\n\n',
    "data: [DONE]\n\n",
  ];

  const output = await feedChunks(transform, chunks);

  // Content must be "test" — no "markdown" spliced in.
  assert.ok(
    output.includes("test"),
    `expected content "test" in output, got: ${output.slice(0, 300)}`
  );

  const contentMatch = output.match(/"content":"([^"]*)"/g) || [];
  for (const m of contentMatch) {
    assert.ok(
      !m.includes("markdown"),
      `format string "markdown" must not appear in content, got: ${m}`
    );
  }
});
