/**
 * Tests for speech combo strategy execution
 *
 * Mirrors tests/unit/combo/image-combo.test.ts. executeSpeechCombo takes no
 * logger argument — the speech handler returns a Response directly rather than
 * a result object, so there is nothing for the strategy to log through.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-speech-combo-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.JWT_SECRET = "test-jwt-secret-for-speech-combo-tests";

fs.mkdirSync(TEST_DATA_DIR, { recursive: true });

const core = await import("@/lib/db/core.ts");
const { createCombo } = await import("@/lib/db/combos");
const { executeSpeechCombo } = await import("@omniroute/open-sse/services/speechCombo");

async function cleanupTestDataDir() {
  let lastError: unknown;
  for (let attempt = 0; attempt < 5; attempt += 1) {
    try {
      core.resetDbInstance();
      fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
      return;
    } catch (error: unknown) {
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, 25));
    }
  }
  if (lastError) throw lastError;
}

test.beforeEach(async () => {
  await cleanupTestDataDir();
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(async () => {
  process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  await cleanupTestDataDir();
});

test("returns 400 when combo is not found", async () => {
  const response = await executeSpeechCombo(
    "nonexistent-combo",
    { model: "nonexistent-combo", input: "hello there" },
    Date.now()
  );
  assert.equal(response.status, 400);
  const bodyStr = JSON.stringify(await response.json());
  assert.ok(!bodyStr.includes("at "), "Error response does not leak stack traces");
});

test("returns 400 when combo has no speech-capable targets", async () => {
  await createCombo({
    name: "chat-only-combo",
    strategy: "priority",
    models: ["openai/gpt-4o"],
  });

  const response = await executeSpeechCombo(
    "chat-only-combo",
    { model: "chat-only-combo", input: "hello there" },
    Date.now()
  );
  assert.equal(response.status, 400);
  const bodyStr = JSON.stringify(await response.json());
  assert.ok(bodyStr.includes("No speech-capable targets"), "Tells user no speech targets");
  assert.ok(!bodyStr.includes("at "), "Error response does not leak stack traces");
});

test("does not select retired EdgeTTS targets as speech-capable", async () => {
  await createCombo({
    name: "retired-edgetts-combo",
    strategy: "priority",
    models: ["edgetts/en-US-AriaNeural"],
  });

  const response = await executeSpeechCombo(
    "retired-edgetts-combo",
    { model: "retired-edgetts-combo", input: " " },
    Date.now()
  );
  const bodyStr = JSON.stringify(await response.json());

  assert.equal(response.status, 400);
  assert.ok(bodyStr.includes("No speech-capable targets"));
  assert.ok(!bodyStr.includes("at "), "Error response does not leak stack traces");
});

test("returns 400 when combo has no usable targets", async () => {
  await createCombo({ name: "empty-combo", strategy: "priority", models: [] });

  const response = await executeSpeechCombo(
    "empty-combo",
    { model: "empty-combo", input: "hello there" },
    Date.now()
  );
  assert.equal(response.status, 400);
});

test("fails cleanly when speech targets exist but no provider connection does", async () => {
  await createCombo({
    name: "spc-no-conn",
    strategy: "fill-first",
    models: ["deepgram/aura-asteria-en"],
  });

  const response = await executeSpeechCombo(
    "spc-no-conn",
    { model: "spc-no-conn", input: "hello there" },
    Date.now()
  );
  assert.ok(response.status >= 400, "Surfaces a failure rather than a fake success");
  const bodyStr = JSON.stringify(await response.json());
  assert.ok(!bodyStr.includes("at "), "Error response does not leak stack traces");
});
