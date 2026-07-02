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
const { waitForAllBatches, getCachedHeaders, resetCachedHeaders } = batchProcessor;

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

  resetCachedHeaders();
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

test("processPendingBatches caches rate-limit headers across sequential batches", async () => {
  // Helper to create a 1-item batch with a given id prefix
  async function createOneItemBatch(prefix: string) {
    const content =
      JSON.stringify({
        custom_id: `${prefix}-req`,
        method: "POST",
        url: "/v1/chat/completions",
        body: { model: "gpt-4", messages: [{ role: "user", content: prefix }] },
      }) + "\n";

    const file = await localDb.createFile({
      bytes: Buffer.byteLength(content),
      filename: `${prefix}_input.jsonl`,
      purpose: "batch_input",
      content: Buffer.from(content),
    });

    const batch = await localDb.createBatch({
      endpoint: "/v1/chat/completions",
      status: "validating",
      inputFileId: file.id,
      completionWindow: "24h",
    });
    return batch;
  }

  // Initial cache state
  const initial = getCachedHeaders();
  assert.strictEqual(initial.headers, null);
  assert.strictEqual(initial.timestamp, 0);

  // Create first batch
  const batchA = await createOneItemBatch("cache-test-a");

  // Mock to return rate-limit headers (triggers cache)
  let callCount = 0;
  mock.method(dispatch, "dispatchBatchApiRequest", async () => {
    callCount++;
    return new Response(
      JSON.stringify({
        id: "chatcmpl-cache-a",
        choices: [{ message: { content: "from a" } }],
        usage: { prompt_tokens: 10, completion_tokens: 5 },
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "x-ratelimit-remaining-req-minute": "5",
          "x-ratelimit-limit-req-minute": "100",
          "x-ratelimit-remaining-tokens-minute": "5000",
          "x-ratelimit-tokens-query-cost": "50",
        },
      }
    );
  });

  await batchProcessor.processPendingBatches();

  // Wait for batch A to complete
  const waitForStatusA = async () => {
    for (let i = 0; i < 40; i++) {
      const b = await localDb.getBatch(batchA.id);
      if (b?.status === "completed" || b?.status === "failed") return b;
      await new Promise((r) => setTimeout(r, 50));
    }
    throw new Error(`Batch A did not finish within timeout`);
  };
  const resultA = await waitForStatusA();
  assert.strictEqual(resultA?.status, "completed");
  assert.ok(callCount >= 1, "dispatch should have been called at least once");

  // After batch A, cache should be populated
  const afterA = getCachedHeaders();
  assert.notStrictEqual(afterA.headers, null, "headers should be cached after first batch");
  assert.strictEqual(
    afterA.headers!.get("x-ratelimit-remaining-req-minute"),
    "5",
    "cached header value should match response"
  );
  assert.ok(Date.now() - afterA.timestamp < 60_000, "cached timestamp should be within TTL");

  // Verify cache survives a resetCachedHeaders call
  resetCachedHeaders();
  const afterReset = getCachedHeaders();
  assert.strictEqual(afterReset.headers, null, "reset should clear cached headers");
  assert.strictEqual(afterReset.timestamp, 0, "reset should clear cached timestamp");
});

test("processPendingBatches should recover checkpointed stale batches without replaying completed items", async () => {
  const lines = [
    JSON.stringify({
      custom_id: "already-done",
      method: "POST",
      url: "/v1/chat/completions",
      body: { model: "gpt-4", messages: [{ role: "user", content: "first" }] },
    }),
    JSON.stringify({
      custom_id: "needs-dispatch",
      method: "POST",
      url: "/v1/chat/completions",
      body: { model: "gpt-4", messages: [{ role: "user", content: "second" }] },
    }),
  ];
  const file = await localDb.createFile({
    bytes: Buffer.byteLength(lines.join("\n") + "\n"),
    filename: "checkpointed_stale_test.jsonl",
    purpose: "batch_input",
    content: Buffer.from(lines.join("\n") + "\n"),
  });

  const batch = await localDb.createBatch({
    endpoint: "/v1/chat/completions",
    status: "in_progress",
    inputFileId: file.id,
    completionWindow: "24h",
    inProgressAt: Math.floor(Date.now() / 1000),
  });
  await localDb.updateBatch(batch.id, {
    requestCountsTotal: 2,
    requestCountsCompleted: 1,
  });
  await localDb.ensureBatchItemCheckpoints(batch.id, [
    { lineNumber: 1, customId: "already-done" },
    { lineNumber: 2, customId: "needs-dispatch" },
  ]);
  await localDb.markBatchItemResult(
    batch.id,
    { lineNumber: 1, customId: "already-done" },
    {
      id: "req_checkpointed",
      custom_id: "already-done",
      response: {
        status_code: 200,
        body: {
          id: "chatcmpl-checkpointed",
          choices: [{ message: { content: "from checkpoint" } }],
          usage: { prompt_tokens: 10, completion_tokens: 5 },
        },
      },
    }
  );

  let callCount = 0;
  mock.method(dispatch, "dispatchBatchApiRequest", async () => {
    callCount++;
    return new Response(
      JSON.stringify({
        id: "chatcmpl-live",
        choices: [{ message: { content: "processed once" } }],
        usage: { prompt_tokens: 8, completion_tokens: 4 },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  });

  await batchProcessor.processPendingBatches();

  await waitForAllBatches();

  const updated = await localDb.getBatch(batch.id);
  assert.strictEqual(updated?.status, "completed", "Stale batch should be recovered and completed");
  assert.strictEqual(callCount, 1, "only the unchecked item should be dispatched");
  assert.strictEqual(updated?.requestCountsCompleted, 2);
  assert.ok(updated?.outputFileId, "recovered batch should emit an output file");

  const output = localDb.getFileContent(updated!.outputFileId!);
  assert.ok(output, "output file content should exist");
  const outputRows = output
    .toString()
    .trim()
    .split("\n")
    .map((line) => JSON.parse(line));
  assert.deepStrictEqual(
    outputRows.map((row) => row.custom_id),
    ["already-done", "needs-dispatch"]
  );
});

test("processPendingBatches should not replay interrupted checkpoint items", async () => {
  const file = await localDb.createFile({
    bytes: 10,
    filename: "stale_processing_checkpoint.jsonl",
    purpose: "batch_input",
    content: Buffer.from(
      JSON.stringify({
        custom_id: "in-flight",
        method: "POST",
        url: "/v1/chat/completions",
        body: { model: "gpt-4", messages: [{ role: "user", content: "hi" }] },
      }) + "\n"
    ),
  });

  const batch = await localDb.createBatch({
    endpoint: "/v1/chat/completions",
    status: "in_progress",
    inputFileId: file.id,
    completionWindow: "24h",
    inProgressAt: Math.floor(Date.now() / 1000),
  });
  await localDb.updateBatch(batch.id, { requestCountsTotal: 1 });
  await localDb.ensureBatchItemCheckpoints(batch.id, [{ lineNumber: 1, customId: "in-flight" }]);
  await localDb.markBatchItemProcessing(batch.id, { lineNumber: 1, customId: "in-flight" });

  let callCount = 0;
  mock.method(dispatch, "dispatchBatchApiRequest", async () => {
    callCount++;
    throw new Error("interrupted checkpoint should not dispatch");
  });

  await batchProcessor.processPendingBatches();

  await waitForAllBatches();

  const updated = await localDb.getBatch(batch.id);
  assert.strictEqual(updated?.status, "completed");
  assert.strictEqual(callCount, 0, "interrupted checkpoint should not be replayed");
  assert.strictEqual(updated?.requestCountsFailed, 1);
  assert.ok(updated?.errorFileId, "interrupted item should be emitted as an error row");

  const errorOutput = localDb.getFileContent(updated!.errorFileId!);
  assert.ok(errorOutput, "error file content should exist");
  assert.match(errorOutput.toString(), /not replayed to avoid duplicate provider work/);
});

test("processPendingBatches should fail stale batches without checkpoints instead of replaying", async () => {
  const file = await localDb.createFile({
    bytes: 10,
    filename: "legacy_stale_no_checkpoints.jsonl",
    purpose: "batch_input",
    content: Buffer.from(
      JSON.stringify({
        method: "POST",
        url: "/v1/chat/completions",
        body: { model: "gpt-4", messages: [{ role: "user", content: "hi" }] },
      }) + "\n"
    ),
  });

  const batch = await localDb.createBatch({
    endpoint: "/v1/chat/completions",
    status: "in_progress",
    inputFileId: file.id,
    completionWindow: "24h",
    inProgressAt: Math.floor(Date.now() / 1000),
  });
  await localDb.updateBatch(batch.id, { requestCountsTotal: 1 });

  let callCount = 0;
  mock.method(dispatch, "dispatchBatchApiRequest", async () => {
    callCount++;
    throw new Error("legacy stale batch should not dispatch");
  });

  await batchProcessor.processPendingBatches();

  const updated = await localDb.getBatch(batch.id);
  assert.strictEqual(updated?.status, "failed");
  assert.strictEqual(callCount, 0, "legacy stale batch should not be replayed");
  assert.match(updated?.errors?.[0]?.message ?? "", /Cannot safely recover stale batch/);
});

test("processPendingBatches should respect BATCH_MAX_CONCURRENT (default 1)", async () => {
  async function createValidBatch(prefix: string) {
    const content =
      JSON.stringify({
        custom_id: `${prefix}-req`,
        method: "POST",
        url: "/v1/chat/completions",
        body: { model: "gpt-4", messages: [{ role: "user", content: prefix }] },
      }) + "\n";

    const file = await localDb.createFile({
      bytes: Buffer.byteLength(content),
      filename: `${prefix}_input.jsonl`,
      purpose: "batch_input",
      content: Buffer.from(content),
    });

    return await localDb.createBatch({
      endpoint: "/v1/chat/completions",
      status: "validating",
      inputFileId: file.id,
      completionWindow: "24h",
    });
  }

  mock.method(dispatch, "dispatchBatchApiRequest", async () => {
    return new Response(
      JSON.stringify({
        id: "chatcmpl-concur",
        choices: [{ message: { content: "ok" } }],
        usage: { prompt_tokens: 10, completion_tokens: 5 },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  });

  const batchA = await createValidBatch("concur-a");
  const batchB = await createValidBatch("concur-b");
  const batchC = await createValidBatch("concur-c");

  await batchProcessor.processPendingBatches();

  const statuses = [
    localDb.getBatch(batchA.id)?.status,
    localDb.getBatch(batchB.id)?.status,
    localDb.getBatch(batchC.id)?.status,
  ];

  const inProgressCount = statuses.filter((s) => s === "in_progress").length;
  const validatingCount = statuses.filter((s) => s === "validating").length;

  assert.strictEqual(
    inProgressCount,
    1,
    "Only one batch should be in_progress (concurrency limit)"
  );
  assert.strictEqual(validatingCount, 2, "Two batches should remain validating");

  await waitForAllBatches();
});

test("processPendingBatches should not reset an actively processing batch", async () => {
  async function createValidBatch(prefix: string) {
    const content =
      JSON.stringify({
        custom_id: `${prefix}-req`,
        method: "POST",
        url: "/v1/chat/completions",
        body: { model: "gpt-4", messages: [{ role: "user", content: prefix }] },
      }) + "\n";

    const file = await localDb.createFile({
      bytes: Buffer.byteLength(content),
      filename: `${prefix}_input.jsonl`,
      purpose: "batch_input",
      content: Buffer.from(content),
    });

    return await localDb.createBatch({
      endpoint: "/v1/chat/completions",
      status: "validating",
      inputFileId: file.id,
      completionWindow: "24h",
    });
  }

  let firstRequest = true;
  mock.method(dispatch, "dispatchBatchApiRequest", async () => {
    if (firstRequest) {
      firstRequest = false;
      await new Promise((r) => setTimeout(r, 2000));
    }
    return new Response(
      JSON.stringify({
        id: "chatcmpl-active",
        choices: [{ message: { content: "ok" } }],
        usage: { prompt_tokens: 10, completion_tokens: 5 },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  });

  const batch = await createValidBatch("active-noreset");

  // First call starts the batch (in_progress + activeBatches)
  await batchProcessor.processPendingBatches();

  let updated = await localDb.getBatch(batch.id);
  assert.strictEqual(updated?.status, "in_progress");

  // Second call should NOT reset it (it's in activeBatches)
  await batchProcessor.processPendingBatches();

  updated = await localDb.getBatch(batch.id);
  assert.strictEqual(
    updated?.status,
    "in_progress",
    "Actively processing batch should not be reset"
  );

  // Wait for the slow processing to finish
  await waitForAllBatches();

  updated = await localDb.getBatch(batch.id);
  assert.strictEqual(updated?.status, "completed");
});
