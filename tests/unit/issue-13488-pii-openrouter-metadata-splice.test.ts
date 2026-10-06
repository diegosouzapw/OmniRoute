import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Isolate DB state
const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-test-issue-13488-"));
process.env.DATA_DIR = tmpDir;

// Enable the feature flag for tests (mode "warn" per the issue repro steps — "nothing is
// supposed to be modified", yet the windowed re-emission still runs and scrambles output).
const originalEnv = process.env.PII_RESPONSE_SANITIZATION;
const originalMode = process.env.PII_RESPONSE_SANITIZATION_MODE;
process.env.PII_RESPONSE_SANITIZATION = "true";
process.env.PII_RESPONSE_SANITIZATION_MODE = "warn";
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

function extractContentAndMetadata(output: string, metadataKey: string) {
  const dataLines = output
    .split("\n")
    .filter((l) => l.startsWith("data: ") && l !== "data: [DONE]");

  let reassembledContent = "";
  const metadataValues = new Set<string>();
  for (const line of dataLines) {
    const json = JSON.parse(line.slice("data: ".length));
    const delta = json.choices?.[0]?.delta;
    if (delta?.content) reassembledContent += delta.content;
    if (typeof json[metadataKey] === "string") metadataValues.add(json[metadataKey]);
  }
  return { reassembledContent, metadataValues };
}

// Reproduces the exact shape from the issue: OpenRouter SSE chunks carry a top-level
// "provider" string and delta.reasoning_details[].text, alongside delta.content — all on
// the same choice. windowSize is kept small (5) to force windowed re-emission on every
// chunk, matching the reporter's observation that scrambling happens even in mode=warn.
test("issue #13488: OpenRouter top-level `provider` field must not share the content buffer", async () => {
  const transform = createPiiSseTransform({ windowSize: 5 });

  const makeChunk = (provider: string, content: string, reasoningText = "") =>
    `data: ${JSON.stringify({
      id: "gen-1",
      model: "z-ai/glm-5.3-flash",
      provider,
      choices: [
        {
          index: 0,
          delta: {
            content,
            role: "assistant",
            reasoning: "",
            reasoning_details: reasoningText
              ? [{ type: "reasoning.text", text: reasoningText, format: "" }]
              : [],
          },
        },
      ],
    })}\n\n`;

  const chunks = [
    makeChunk("Together", "Lake"),
    makeChunk("Together", "Saimaa "),
    makeChunk("Together", "is the largest "),
    makeChunk("Together", "lake in Finland."),
  ];
  const done = `data: [DONE]\n\n`;

  const output = await testTransform(transform, [...chunks, done]);

  const { reassembledContent, metadataValues: providerValues } = extractContentAndMetadata(
    output,
    "provider"
  );

  const expectedContent = "LakeSaimaa is the largest lake in Finland.";

  assert.equal(
    reassembledContent,
    expectedContent,
    `content must reassemble byte-identical to input even with PII sanitization enabled; ` +
      `got ${JSON.stringify(reassembledContent)}`
  );

  assert.deepEqual(
    [...providerValues],
    ["Together"],
    `the "provider" field must stay constant across every chunk (metadata, not answer text); ` +
      `got ${JSON.stringify([...providerValues])}`
  );

  // None of the answer text should ever have leaked into the provider field.
  for (const p of providerValues) {
    assert.ok(
      !/Lake|Saimaa|largest|Finland/.test(p),
      `provider field must never contain spliced-in answer text; got "${p}"`
    );
  }
});

// Same shape but with mode=redact, per the issue's Validation Plan — the splice bug must
// also be gone when redaction (not just pass-through warn mode) is active.
test("issue #13488: mode=redact must not splice `provider` and `content` either", async () => {
  const originalModeLocal = process.env.PII_RESPONSE_SANITIZATION_MODE;
  process.env.PII_RESPONSE_SANITIZATION_MODE = "redact";
  try {
    const transform = createPiiSseTransform({ windowSize: 5 });

    const makeChunk = (provider: string, content: string) =>
      `data: ${JSON.stringify({
        id: "gen-2",
        model: "z-ai/glm-5.3-flash",
        provider,
        choices: [{ index: 0, delta: { content, role: "assistant" } }],
      })}\n\n`;

    const chunks = [
      makeChunk("Together", "The "),
      makeChunk("Together", "capital "),
      makeChunk("Together", "of France "),
      makeChunk("Together", "is Paris."),
    ];
    const done = `data: [DONE]\n\n`;

    const output = await testTransform(transform, [...chunks, done]);
    const { reassembledContent, metadataValues: providerValues } = extractContentAndMetadata(
      output,
      "provider"
    );

    assert.equal(
      reassembledContent,
      "The capital of France is Paris.",
      `content must reassemble byte-identical even under redact mode; got ${JSON.stringify(reassembledContent)}`
    );
    assert.deepEqual(
      [...providerValues],
      ["Together"],
      `provider must stay constant under redact mode; got ${JSON.stringify([...providerValues])}`
    );
  } finally {
    if (originalModeLocal !== undefined) {
      process.env.PII_RESPONSE_SANITIZATION_MODE = originalModeLocal;
    } else {
      delete process.env.PII_RESPONSE_SANITIZATION_MODE;
    }
  }
});

// A second concurrently-streamed metadata field (native_finish_reason) alongside `provider`
// and `content` — closes the family of "any recognized metadata field shares the buffer",
// not just the single field named in the report.
test("issue #13488: a second metadata field (native_finish_reason) must not share buffers either", async () => {
  const transform = createPiiSseTransform({ windowSize: 5 });

  const makeChunk = (provider: string, finishReason: string, content: string) =>
    `data: ${JSON.stringify({
      id: "gen-3",
      model: "z-ai/glm-5.3-flash",
      provider,
      native_finish_reason: finishReason,
      choices: [{ index: 0, delta: { content, role: "assistant" } }],
    })}\n\n`;

  const chunks = [
    makeChunk("Together", "in_progress", "Hello "),
    makeChunk("Together", "in_progress", "there, "),
    makeChunk("Together", "in_progress", "world!"),
  ];
  const done = `data: [DONE]\n\n`;

  const output = await testTransform(transform, [...chunks, done]);
  const { reassembledContent, metadataValues: providerValues } = extractContentAndMetadata(
    output,
    "provider"
  );
  const { metadataValues: finishReasonValues } = extractContentAndMetadata(
    output,
    "native_finish_reason"
  );

  assert.equal(reassembledContent, "Hello there, world!");
  assert.deepEqual([...providerValues], ["Together"]);
  assert.deepEqual([...finishReasonValues], ["in_progress"]);
});

test.after(async () => {
  if (originalEnv !== undefined) {
    process.env.PII_RESPONSE_SANITIZATION = originalEnv;
  } else {
    delete process.env.PII_RESPONSE_SANITIZATION;
  }
  if (originalMode !== undefined) {
    process.env.PII_RESPONSE_SANITIZATION_MODE = originalMode;
  } else {
    delete process.env.PII_RESPONSE_SANITIZATION_MODE;
  }

  const coreDb = await import("../../src/lib/db/core.ts");
  coreDb.resetDbInstance();
  fs.rmSync(tmpDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});
