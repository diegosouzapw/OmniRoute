import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { mock } from "node:test";

// Setup temporary data directory for the DB
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-batch-processor-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret";

// We import these as modules to allow mocking
const core = await import("@/lib/db/core.ts");
const localDb = await import("@/lib/localDb");
const { dispatch } = await import("@/lib/batches/dispatch");
const batchProcessor = await import("../../open-sse/services/batchProcessor.ts");
const { waitForAllBatches } = batchProcessor;

const ORIGINAL_OMNIROUTE_API_KEY = process.env.OMNIROUTE_API_KEY;
const ORIGINAL_ROUTER_API_KEY = process.env.ROUTER_API_KEY;

async function reset() {
  // Wait for background processing to finish
  await waitForAllBatches();

  // Clear any intervals
  batchProcessor.stopBatchProcessor();

  // Restore all mocks
  mock.restoreAll();

  // Close DB connection to release file handles and clear singleton
  core.closeDbInstance();

  // Clean up the temp DB directory
  if (fs.existsSync(TEST_DATA_DIR)) {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  }
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });

  delete process.env.OMNIROUTE_API_KEY;
  delete process.env.ROUTER_API_KEY;
}

test.beforeEach(async () => {
  await reset();
});

test.after(async () => {
  await reset();
  if (fs.existsSync(TEST_DATA_DIR)) {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  }
});

test("initBatchProcessor should start polling and stopBatchProcessor should stop it", async () => {
  const interval = batchProcessor.initBatchProcessor();
  assert.ok(interval, "Should return a timeout object");

  batchProcessor.stopBatchProcessor();
});

test("processPendingBatches should do nothing when no pending batches", async () => {
  // Since we are using a real DB, we just don't add any batches.
  await batchProcessor.processPendingBatches();
});

test("processPendingBatches should start a validating batch", async () => {
  const batchId = "test-batch-1";

  // Create an input file first to satisfy foreign key constraint
  const file = await localDb.createFile({
    bytes: 0,
    filename: "dummy.jsonl",
    purpose: "batch_input",
    content: Buffer.from(""),
  });

  // Create a batch in 'validating' status using the real DB
  const batch = await localDb.createBatch({
    endpoint: "/v1/chat/completions",
    status: "validating",
    apiKeyId: "env-key",
    inputFileId: file.id,
    completionWindow: "24h",
  });

  // Create a real input file for this test
  const realFile = await localDb.createFile({
    bytes: Buffer.byteLength(
      JSON.stringify({
        method: "POST",
        url: "/v1/chat/completions",
        body: { model: "gpt-4", messages: [{ role: "user", content: "hi" }] },
      }) + "\n"
    ),
    filename: "batch_input.jsonl",
    purpose: "batch_input",
    content: Buffer.from(
      JSON.stringify({
        method: "POST",
        url: "/v1/chat/completions",
        body: { model: "gpt-4", messages: [{ role: "user", content: "hi" }] },
      }) + "\n"
    ),
  });

  // Update batch to point to the real file
  await localDb.updateBatch(batch.id, { inputFileId: realFile.id });

  // Mock API response
  mock.method(dispatch, "dispatchBatchApiRequest", async () => {
    return new Response(
      JSON.stringify({
        id: "chatcmpl-1",
        choices: [{ message: { content: "hello" } }],
        usage: { prompt_tokens: 10, completion_tokens: 5 },
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  });

  await batchProcessor.processPendingBatches();

  // Since the processing happens in the background, we wait for it.
  let completed = false;
  const checkInterval = setInterval(async () => {
    const b = await localDb.getBatch(batch.id);
    if (b?.status === "completed") {
      completed = true;
    }
  }, 50);

  // Wait up to 2 seconds for completion
  const start = Date.now();
  while (!completed && Date.now() - start < 2000) {
    await new Promise((res) => setTimeout(res, 50));
  }
  clearInterval(checkInterval);

  assert.ok(completed, "Batch should have been marked as completed");
});

test("processPendingBatches should cancel a cancelling batch", async () => {
  const batchId = "test-batch-cancel";

  // Create an input file first to satisfy foreign key constraint
  const file = await localDb.createFile({
    bytes: 0,
    filename: "dummy.jsonl",
    purpose: "batch_input",
    content: Buffer.from(""),
  });

  const batch = await localDb.createBatch({
    endpoint: "/v1/chat/completions",
    status: "cancelling",
    inputFileId: file.id,
    completionWindow: "24h",
  });

  await batchProcessor.processPendingBatches();

  const updatedBatch = await localDb.getBatch(batch.id);
  assert.strictEqual(updatedBatch?.status, "cancelled");
});

test("processPendingBatches should fail a batch with invalid input JSON", async () => {
  const batchId = "test-batch-invalid";

  const file = await localDb.createFile({
    bytes: 10,
    filename: "batch_invalid.jsonl",
    purpose: "batch_input",
    content: Buffer.from("invalid json\n"),
  });

  const batch = await localDb.createBatch({
    status: "validating",
    endpoint: "/v1/chat/completions",
    apiKeyId: "env-key",
    inputFileId: file.id,
    completionWindow: "24h",
  });

  await batchProcessor.processPendingBatches();

  const updatedBatch = await localDb.getBatch(batch.id);
  assert.strictEqual(updatedBatch?.status, "failed");
  assert.ok(updatedBatch?.errors?.length === 1);
  assert.ok(updatedBatch?.errors![0].message.includes("not valid JSON"));
});

test("processPendingBatches should fail a batch with mismatched endpoint", async () => {
  const batchId = "test-batch-endpoint";

  const file = await localDb.createFile({
    bytes: 10,
    filename: "batch_endpoint.jsonl",
    purpose: "batch_input",
    content: Buffer.from(
      JSON.stringify({
        method: "POST",
        url: "/v1/embeddings", // Mismatch
        body: { model: "gpt-4", input: "hi" },
      }) + "\n"
    ),
  });

  const batch = await localDb.createBatch({
    status: "validating",
    endpoint: "/v1/chat/completions",
    apiKeyId: "env-key",
    inputFileId: file.id,
    completionWindow: "24h",
  });

  await batchProcessor.processPendingBatches();

  const updatedBatch = await localDb.getBatch(batch.id);
  assert.strictEqual(updatedBatch?.status, "failed");
  assert.ok(updatedBatch?.errors?.length === 1);
  assert.ok(updatedBatch?.errors![0].message.includes("does not match batch endpoint"));
});
