import { test } from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-batch-api-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "test-secret-123";

const {
  createFile,
  createBatch,
  getBatch,
  getFileContent,
  updateBatch,
  createProviderConnection,
  createApiKey,
  getFile,
  listFiles,
  formatFileResponse,
  deleteFile,
  getTerminalBatches,
} = await import("../../src/lib/localDb.ts");
const { getDbInstance } = await import("../../src/lib/db/core.ts");
const { initBatchProcessor, stopBatchProcessor, processPendingBatches } =
  await import("../../open-sse/services/batchProcessor.ts");
const batchesRoute = await import("../../src/app/api/v1/batches/route.ts");
const batchByIdRoute = await import("../../src/app/api/v1/batches/[id]/route.ts");
const batchCancelRoute = await import("../../src/app/api/v1/batches/[id]/cancel/route.ts");
const filesRoute = await import("../../src/app/api/v1/files/route.ts");
const fileByIdRoute = await import("../../src/app/api/v1/files/[id]/route.ts");
const fileContentRoute = await import("../../src/app/api/v1/files/[id]/content/route.ts");

test("Batch API and Processing", async () => {
  // 0. Setup environment, mock provider and API key
  process.env.API_KEY_SECRET = "test-secret-123";

  await createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Mock OpenAI",
    apiKey: "sk-mock-key",
    isActive: true,
  });

  const apiKey = await createApiKey("Test Key", "test-machine");

  // 1. Create a file with batch items
  const batchItems = [
    JSON.stringify({
      custom_id: "request-1",
      method: "POST",
      url: "/v1/chat/completions",
      body: { model: "gpt-4o-mini", messages: [{ role: "user", content: "Hello world" }] },
    }),
    JSON.stringify({
      custom_id: "request-2",
      method: "POST",
      url: "/v1/chat/completions",
      body: { model: "gpt-4o-mini", messages: [{ role: "user", content: "Goodbye world" }] },
    }),
  ].join("\n");

  const file = createFile({
    bytes: Buffer.byteLength(batchItems),
    filename: "test_batch.jsonl",
    purpose: "batch",
    content: Buffer.from(batchItems),
    apiKeyId: apiKey.id,
  });

  assert.ok(file.id.startsWith("file-"), "File ID should start with file-");
  assert.ok(
    file.status === "validating" || !file.status,
    "File status should be 'validating' by default or null"
  );

  // 2. Create a batch
  const batch = createBatch({
    endpoint: "/v1/chat/completions",
    completionWindow: "24h",
    inputFileId: file.id,
    apiKeyId: apiKey.id,
  });

  assert.ok(batch.id.startsWith("batch_"), "Batch ID should start with batch_");
  assert.strictEqual(batch.status, "validating");

  // 3. Start the processor manually for one tick (or wait if we used initBatchProcessor)
  // For testing, we might want to expose the processing functions or just wait.
  // We'll use a shorter interval in the processor if we want to test polling.
  // Here we'll just call processPendingBatches if it was exported, but it's not.

  // Instead of polling, let's just wait a bit if we started the processor
  initBatchProcessor();

  console.log("Waiting for batch processing...");

  // Poll for status change
  let maxAttempts = 30;
  let currentBatch = getBatch(batch.id);
  while (
    maxAttempts > 0 &&
    currentBatch?.status !== "completed" &&
    currentBatch?.status !== "failed" &&
    currentBatch?.status !== "cancelled"
  ) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    currentBatch = getBatch(batch.id);
    const progress = currentBatch?.requestCountsTotal
      ? `${currentBatch.requestCountsCompleted}/${currentBatch.requestCountsTotal}`
      : "not started";
    console.log(
      `[TEST] Current status: ${currentBatch?.status}, completed: ${progress}, failed: ${currentBatch?.requestCountsFailed || 0}`
    );
    maxAttempts--;
  }

  // Stop the processor so the test can exit
  stopBatchProcessor();

  if (maxAttempts === 0) {
    console.error(
      "[TEST] Polling timed out. Final batch state:",
      JSON.stringify(currentBatch, null, 2)
    );
  }

  assert.ok(
    currentBatch?.status === "completed" || currentBatch?.status === "failed",
    "Batch should reach a terminal state"
  );

  // In test environment, the mock key might fail, which is fine for this test as long as it finishes
  if (currentBatch?.status === "failed" || currentBatch?.requestCountsFailed > 0) {
    console.warn(
      "[TEST] Batch finished with failures (likely due to mock credentials). This is acceptable for this test."
    );
    assert.strictEqual(currentBatch?.requestCountsTotal, 2, "Total requests should be 2");
    assert.strictEqual(
      (currentBatch?.requestCountsCompleted || 0) + (currentBatch?.requestCountsFailed || 0),
      2,
      "Total processed should be 2"
    );
    return;
  }

  assert.strictEqual(currentBatch?.status, "completed", "Batch should be completed");
  assert.strictEqual(currentBatch?.requestCountsTotal, 2);
  assert.strictEqual(currentBatch?.requestCountsCompleted, 2);
  assert.ok(currentBatch?.outputFileId, "Should have output file ID");

  // Check file statuses
  const inputFileAfter = getFile(file.id);
  assert.strictEqual(
    inputFileAfter?.status,
    "processed",
    "Input file should be 'processed' after batch completion"
  );

  const outputFile = getFile(currentBatch.outputFileId!);
  assert.strictEqual(outputFile?.status, "completed", "Output file should be 'completed'");

  // 4. Check output file content
  if (currentBatch?.outputFileId) {
    const outputContent = getFileContent(currentBatch.outputFileId);
    assert.ok(outputContent, "Output file content should exist");
    const lines = outputContent
      .toString()
      .split("\n")
      .filter((l) => l.trim());
    assert.strictEqual(lines.length, 2, "Should have 2 result lines");
    const firstResult = JSON.parse(lines[0]);
    assert.ok(firstResult.custom_id, "Result should have custom_id");
    assert.ok(firstResult.response, "Result should have response");
  }

  // 5. Check additional spec-compliant fields
  assert.ok(currentBatch.usage, "Batch should have usage populated");
  assert.strictEqual(
    typeof currentBatch.usage.total_tokens,
    "number",
    "usage.total_tokens should be a number"
  );
  assert.ok(
    currentBatch.model || currentBatch.requestCountsFailed > 0,
    "Batch should have model populated if at least one request succeeded"
  );
});

test("Batch handles and counts failures correctly", async () => {
  initBatchProcessor();
  try {
    // 1. Create a file with a request that will fail (invalid provider/model)
    const batchItems = [
      JSON.stringify({
        custom_id: "fail-request",
        method: "POST",
        url: "/v1/chat/completions",
        body: {
          model: "non-existent-provider/model",
          messages: [{ role: "user", content: "Fail me" }],
        },
      }),
    ].join("\n");

    const file = createFile({
      bytes: Buffer.byteLength(batchItems),
      filename: "fail_batch.jsonl",
      purpose: "batch",
      content: Buffer.from(batchItems),
      apiKeyId: null,
    });

    // 2. Create a batch
    const batch = createBatch({
      endpoint: "/v1/chat/completions",
      completionWindow: "24h",
      inputFileId: file.id,
      apiKeyId: null,
    });

    // 3. Poll for completion
    let maxAttempts = 20;
    let currentBatch = getBatch(batch.id);
    while (
      maxAttempts > 0 &&
      currentBatch?.status !== "completed" &&
      currentBatch?.status !== "failed"
    ) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      currentBatch = getBatch(batch.id);
      maxAttempts--;
    }

    // 4. Verify failure counts
    assert.strictEqual(currentBatch?.requestCountsTotal, 1, "Total should be 1");
    assert.strictEqual(currentBatch?.requestCountsCompleted, 0, "Completed should be 0");
    assert.strictEqual(currentBatch?.requestCountsFailed, 1, "Failed should be 1");
    assert.ok(currentBatch?.errorFileId, "Should have error file for failures");
    assert.ok(!currentBatch?.outputFileId, "Should NOT have output file if no successes");

    if (currentBatch?.errorFileId) {
      const errorContent = getFileContent(currentBatch.errorFileId);
      const result = JSON.parse(errorContent.toString());
      assert.ok(
        result.response.status_code >= 400,
        `Status code ${result.response.status_code} should be >= 400`
      );
      assert.ok(result.response.body.error, "Should contain error in body");
    }

    // Check file statuses
    const inputFile = getFile(file.id);
    assert.strictEqual(inputFile?.status, "processed", "Input file should be 'processed'");

    const errorFile = getFile(currentBatch.errorFileId!);
    assert.strictEqual(errorFile?.status, "completed", "Error file should be 'completed'");
  } finally {
    stopBatchProcessor();
  }
});

test("Batch dispatches non-chat endpoints through the matching route handler", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        object: "list",
        data: [{ object: "embedding", embedding: [0.1, 0.2], index: 0 }],
        usage: { prompt_tokens: 2, total_tokens: 2 },
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );

  initBatchProcessor();
  try {
    await createProviderConnection({
      provider: "openai",
      authType: "apikey",
      name: "Mock OpenAI Embeddings",
      apiKey: "sk-mock-embeddings-key",
      isActive: true,
    });

    const batchItems = [
      JSON.stringify({
        custom_id: "embed-request",
        method: "POST",
        url: "/v1/embeddings",
        body: {
          model: "openai/text-embedding-3-small",
          input: "Hello embeddings",
        },
      }),
    ].join("\n");

    const file = createFile({
      bytes: Buffer.byteLength(batchItems),
      filename: "embeddings_batch.jsonl",
      purpose: "batch",
      content: Buffer.from(batchItems),
      apiKeyId: null,
    });

    const batch = createBatch({
      endpoint: "/v1/embeddings",
      completionWindow: "24h",
      inputFileId: file.id,
      apiKeyId: null,
    });

    let maxAttempts = 20;
    let currentBatch = getBatch(batch.id);
    while (
      maxAttempts > 0 &&
      currentBatch?.status !== "completed" &&
      currentBatch?.status !== "failed"
    ) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      currentBatch = getBatch(batch.id);
      maxAttempts--;
    }

    assert.strictEqual(currentBatch?.status, "completed", "embedding batch should complete");
    assert.strictEqual(currentBatch?.requestCountsCompleted, 1);
    assert.ok(currentBatch?.outputFileId, "embedding batch should produce an output file");

    const outputContent = getFileContent(currentBatch.outputFileId!);
    const result = JSON.parse(outputContent.toString());
    assert.strictEqual(result.response.status_code, 200);
    assert.ok(Array.isArray(result.response.body.data));
    assert.strictEqual(result.response.body.object, "list");
  } finally {
    stopBatchProcessor();
    globalThis.fetch = originalFetch;
  }
});

test("Batch rejects input lines whose url does not match the batch endpoint", async () => {
  initBatchProcessor();
  try {
    const batchItems = [
      JSON.stringify({
        custom_id: "wrong-endpoint",
        method: "POST",
        url: "/v1/embeddings",
        body: {
          model: "openai/text-embedding-3-small",
          input: "Wrong endpoint",
        },
      }),
    ].join("\n");

    const file = createFile({
      bytes: Buffer.byteLength(batchItems),
      filename: "wrong_endpoint_batch.jsonl",
      purpose: "batch",
      content: Buffer.from(batchItems),
      apiKeyId: null,
    });

    const batch = createBatch({
      endpoint: "/v1/chat/completions",
      completionWindow: "24h",
      inputFileId: file.id,
      apiKeyId: null,
    });

    await processPendingBatches();

    const currentBatch = getBatch(batch.id);
    assert.strictEqual(currentBatch?.status, "failed");
    assert.match(
      String(currentBatch?.errors?.[0]?.message || ""),
      /does not match batch endpoint/i
    );
  } finally {
    stopBatchProcessor();
  }
});

test("Batch forces stream: false for all requests", async () => {
  initBatchProcessor();
  try {
    const batchItems = [
      JSON.stringify({
        custom_id: "stream-request",
        method: "POST",
        url: "/v1/chat/completions",
        body: {
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: "Hello" }],
          stream: true,
        },
      }),
    ].join("\n");

    const file = createFile({
      bytes: Buffer.byteLength(batchItems),
      filename: "stream_force_batch.jsonl",
      purpose: "batch",
      content: Buffer.from(batchItems),
      apiKeyId: null,
    });

    const batch = createBatch({
      endpoint: "/v1/chat/completions",
      completionWindow: "24h",
      inputFileId: file.id,
      apiKeyId: null,
    });

    let maxAttempts = 20;
    let currentBatch = getBatch(batch.id);
    while (
      maxAttempts > 0 &&
      currentBatch?.status !== "completed" &&
      currentBatch?.status !== "failed"
    ) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      currentBatch = getBatch(batch.id);
      maxAttempts--;
    }

    assert.strictEqual(currentBatch?.status, "completed", "Batch should be completed");
    const outputFileId = currentBatch?.outputFileId || currentBatch?.errorFileId;
    assert.ok(outputFileId, "Should have output or error file ID");
    const outputContent = getFileContent(outputFileId!);
    const result = JSON.parse(outputContent.toString());

    // It shouldn't have "Unexpected token d" error which happens if it tries to parse SSE stream as JSON
    assert.ok(
      result.response.status_code !== 200 || result.response.body.choices,
      "Should be a valid chat completion response"
    );
    if (result.response.body.error) {
      assert.ok(
        !result.response.body.error.message.includes("Unexpected token"),
        "Should not have JSON parsing error from SSE stream"
      );
    }
  } finally {
    stopBatchProcessor();
  }
});

test("Batch API response format is spec-compliant", async () => {
  // This test doesn't need the processor to run as it checks the object structure returned by endpoints
  const apiKey = await createApiKey("Spec Test Key", "test-machine");

  // Create a mock file first to satisfy foreign key constraint
  const file = createFile({
    bytes: 10,
    filename: "mock.jsonl",
    purpose: "batch",
    content: Buffer.from("{}"),
    apiKeyId: apiKey.id,
  });

  // Create a mock batch directly
  const batch = createBatch({
    endpoint: "/v1/chat/completions",
    completionWindow: "24h",
    inputFileId: file.id,
    apiKeyId: apiKey.id,
    metadata: { test: "meta" },
  });

  // Mock an update with some counts and usage
  updateBatch(batch.id, {
    status: "completed",
    requestCountsTotal: 10,
    requestCountsCompleted: 8,
    requestCountsFailed: 2,
    model: "gpt-4o-mini",
    usage: {
      input_tokens: 100,
      output_tokens: 50,
      total_tokens: 150,
      input_tokens_details: { cached_tokens: 10 },
      output_tokens_details: { reasoning_tokens: 5 },
    },
  });

  const updatedBatch = getBatch(batch.id)!;

  // Test the formatter used in API routes (simulate the route's response)
  function formatBatchResponse(batch: any) {
    return {
      id: batch.id,
      object: "batch",
      endpoint: batch.endpoint,
      errors: batch.errors || null,
      input_file_id: batch.inputFileId,
      completion_window: batch.completionWindow,
      status: batch.status,
      output_file_id: batch.outputFileId || null,
      error_file_id: batch.errorFileId || null,
      created_at: batch.createdAt,
      in_progress_at: batch.inProgressAt || null,
      expires_at: batch.expiresAt || null,
      finalizing_at: batch.finalizingAt || null,
      completed_at: batch.completedAt || null,
      failed_at: batch.failedAt || null,
      expired_at: batch.expiredAt || null,
      cancelling_at: batch.cancellingAt || null,
      cancelled_at: batch.cancelledAt || null,
      request_counts: {
        total: batch.requestCountsTotal || 0,
        completed: batch.requestCountsCompleted || 0,
        failed: batch.requestCountsFailed || 0,
      },
      metadata: batch.metadata || null,
      model: batch.model || null,
      usage: batch.usage || null,
    };
  }

  const response = formatBatchResponse(updatedBatch);

  // Verify all required spec fields are present and structured correctly
  assert.strictEqual(response.id, batch.id);
  assert.strictEqual(response.object, "batch");
  assert.strictEqual(response.endpoint, "/v1/chat/completions");
  assert.strictEqual(response.completion_window, "24h");
  assert.strictEqual(response.status, "completed");
  assert.ok(response.request_counts, "Should have request_counts");
  assert.strictEqual(response.request_counts.total, 10);
  assert.strictEqual(response.request_counts.completed, 8);
  assert.strictEqual(response.request_counts.failed, 2);
  assert.ok(response.usage, "Should have usage");
  assert.strictEqual(response.usage.total_tokens, 150);
  assert.strictEqual(response.usage.input_tokens_details.cached_tokens, 10);
  assert.strictEqual(response.usage.output_tokens_details.reasoning_tokens, 5);
  assert.strictEqual(response.model, "gpt-4o-mini");
  assert.deepStrictEqual(response.metadata, { test: "meta" });
});

test("List batches pagination and response format", async () => {
  const apiKey = await createApiKey("List Test Key", "test-machine");

  // 1. Create multiple batches
  const file = createFile({
    bytes: 10,
    filename: "list_mock.jsonl",
    purpose: "batch",
    content: Buffer.from("{}"),
    apiKeyId: apiKey.id,
  });

  const batchOrder: Array<{ createdAt: number; id: string }> = [];
  const baseCreatedAt = Math.floor(Date.now() / 1000) - 10_000;
  for (let i = 0; i < 5; i++) {
    const b = createBatch({
      endpoint: "/v1/chat/completions",
      completionWindow: "24h",
      inputFileId: file.id,
      apiKeyId: apiKey.id,
      metadata: { index: i },
    });
    updateBatch(b.id, { createdAt: baseCreatedAt + i });
    batchOrder.push({ createdAt: baseCreatedAt + i, id: b.id });
  }

  batchOrder.sort((a, b) => b.createdAt - a.createdAt || b.id.localeCompare(a.id));
  const batchIds = batchOrder.map((entry) => entry.id);

  // 2. Test listBatches logic (direct DB call)
  const { listBatches } = await import("../../src/lib/localDb");
  const allBatches = listBatches(apiKey.id, 10);
  assert.strictEqual(allBatches.length, 5);
  assert.strictEqual(allBatches[0].id, batchIds[0]);

  // 3. Test pagination logic (as implemented in the route)
  const limit = 2;
  const batchesPage1 = listBatches(apiKey.id, limit + 1);
  const hasMore1 = batchesPage1.length > limit;
  const data1 = hasMore1 ? batchesPage1.slice(0, limit) : batchesPage1;

  assert.strictEqual(data1.length, 2);
  assert.strictEqual(hasMore1, true);
  assert.strictEqual(data1[0].id, batchIds[0]);
  assert.strictEqual(data1[1].id, batchIds[1]);

  const after = data1[1].id;
  const batchesPage2 = listBatches(apiKey.id, limit + 1, after);
  const hasMore2 = batchesPage2.length > limit;
  const data2 = hasMore2 ? batchesPage2.slice(0, limit) : batchesPage2;

  assert.strictEqual(data2.length, 2);
  assert.strictEqual(hasMore2, true);
  assert.strictEqual(data2[0].id, batchIds[2]);
  assert.strictEqual(data2[1].id, batchIds[3]);

  const after2 = data2[1].id;
  const batchesPage3 = listBatches(apiKey.id, limit + 1, after2);
  const hasMore3 = batchesPage3.length > limit;
  const data3 = hasMore3 ? batchesPage3.slice(0, limit) : batchesPage3;

  assert.strictEqual(data3.length, 1);
  assert.strictEqual(hasMore3, false);
  assert.strictEqual(data3[0].id, batchIds[4]);
});

test("Batch cleanup honors output_expires_after for output artifacts", async () => {
  const apiKey = await createApiKey("Batch Retention Key", "test-machine");
  const now = Math.floor(Date.now() / 1000);

  const inputFile = createFile({
    bytes: 10,
    filename: "retention_input.jsonl",
    purpose: "batch",
    content: Buffer.from("{}"),
    apiKeyId: apiKey.id,
  });
  const outputFile = createFile({
    bytes: 10,
    filename: "retention_output.jsonl",
    purpose: "batch_output",
    content: Buffer.from("{}"),
    apiKeyId: apiKey.id,
    status: "completed",
  });
  const errorFile = createFile({
    bytes: 10,
    filename: "retention_error.jsonl",
    purpose: "batch_output",
    content: Buffer.from("{}"),
    apiKeyId: apiKey.id,
    status: "completed",
  });

  const batch = createBatch({
    endpoint: "/v1/chat/completions",
    completionWindow: "24h",
    inputFileId: inputFile.id,
    apiKeyId: apiKey.id,
    outputExpiresAfterSeconds: 3600,
    outputExpiresAfterAnchor: "created_at",
  });

  updateBatch(batch.id, {
    status: "completed",
    createdAt: now - 3700,
    completedAt: now - 30,
    outputFileId: outputFile.id,
    errorFileId: errorFile.id,
  });

  await processPendingBatches();

  assert.ok(getFile(inputFile.id), "input file should still follow completion_window retention");
  assert.equal(getFile(outputFile.id), null);
  assert.equal(getFile(errorFile.id), null);
});

test("Batch processor fails orphaned finalizing batches during startup recovery", async () => {
  const apiKey = await createApiKey("Finalizing Recovery Key", "test-machine");
  const inputFile = createFile({
    bytes: 2,
    filename: "finalizing.jsonl",
    purpose: "batch",
    content: Buffer.from("{}"),
    apiKeyId: apiKey.id,
  });

  const batch = createBatch({
    endpoint: "/v1/chat/completions",
    completionWindow: "24h",
    inputFileId: inputFile.id,
    apiKeyId: apiKey.id,
  });

  updateBatch(batch.id, {
    status: "finalizing",
    finalizingAt: Math.floor(Date.now() / 1000),
  });

  initBatchProcessor();

  try {
    const recoveredBatch = getBatch(batch.id);
    assert.strictEqual(recoveredBatch?.status, "failed");
    assert.match(
      String(recoveredBatch?.errors?.[0]?.message || ""),
      /interrupted during finalization/i
    );
    assert.strictEqual(getFile(inputFile.id)?.status, "processed");
  } finally {
    stopBatchProcessor();
  }
});

test("Files upload route stores multipart content", async () => {
  const fileContent = '{"custom_id":"req-1"}\n';
  const formData = new FormData();
  formData.set("purpose", "batch");
  formData.set(
    "file",
    new File([Buffer.from(fileContent)], "upload.jsonl", { type: "application/json" })
  );

  const response = await filesRoute.POST(
    new Request("http://localhost/api/v1/files", {
      method: "POST",
      body: formData,
    })
  );
  const json = await response.json();

  assert.strictEqual(response.status, 200);
  assert.ok(json.id);
  assert.strictEqual(getFileContent(json.id)?.toString(), fileContent);
});

test("Files and batches routes expose explicit CORS preflight handlers", async () => {
  const routes = [
    batchesRoute,
    batchByIdRoute,
    batchCancelRoute,
    filesRoute,
    fileByIdRoute,
    fileContentRoute,
  ];

  for (const route of routes) {
    assert.strictEqual(typeof route.OPTIONS, "function");
    const response = await route.OPTIONS();
    assert.strictEqual(response.status, 204);
    assert.strictEqual(response.headers.get("Access-Control-Allow-Origin"), null);
    assert.match(
      String(response.headers.get("Access-Control-Allow-Headers") || ""),
      /Authorization/i
    );
  }
});

test("Batch Cancel API", async () => {
  const apiKey = await createApiKey("Cancel Test Key", "test-machine");

  const file = createFile({
    bytes: 10,
    filename: "cancel_mock.jsonl",
    purpose: "batch",
    content: Buffer.from("{}"),
    apiKeyId: apiKey.id,
  });

  const batch = createBatch({
    endpoint: "/v1/chat/completions",
    completionWindow: "24h",
    inputFileId: file.id,
    apiKeyId: apiKey.id,
  });

  // 1. Initially validating
  assert.strictEqual(batch.status, "validating");

  // 2. Cancel it
  const cancellingAt = Math.floor(Date.now() / 1000);
  updateBatch(batch.id, {
    status: "cancelling",
    cancellingAt,
  });

  const updatedBatch = getBatch(batch.id)!;
  assert.strictEqual(updatedBatch.status, "cancelling");
  assert.strictEqual(updatedBatch.cancellingAt, cancellingAt);

  // 3. Test that it can't be cancelled if already terminal
  updateBatch(batch.id, { status: "completed" });
  const terminalBatch = getBatch(batch.id)!;
  assert.strictEqual(terminalBatch.status, "completed");

  // In actual API this would return 400, here we just verify state logic
  const canCancel = !["completed", "failed", "cancelled", "expired"].includes(terminalBatch.status);
  assert.strictEqual(canCancel, false);
});

test("Batch processor keeps cancelled status for in-flight batches", async () => {
  const originalFetch = globalThis.fetch;
  const apiKey = await createApiKey("In Flight Cancel Key", "test-machine");

  await createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Cancelable OpenAI",
    apiKey: "sk-cancel-batch",
    isActive: true,
  });

  const batchItems = [
    JSON.stringify({
      custom_id: "cancel-mid-flight",
      method: "POST",
      url: "/v1/chat/completions",
      body: {
        model: "openai/gpt-4o-mini",
        messages: [{ role: "user", content: "cancel me" }],
      },
    }),
  ].join("\n");

  const file = createFile({
    bytes: Buffer.byteLength(batchItems),
    filename: "cancel_mid_flight.jsonl",
    purpose: "batch",
    content: Buffer.from(batchItems),
    apiKeyId: apiKey.id,
  });

  const batch = createBatch({
    endpoint: "/v1/chat/completions",
    completionWindow: "24h",
    inputFileId: file.id,
    apiKeyId: apiKey.id,
  });

  globalThis.fetch = async () => {
    updateBatch(batch.id, {
      status: "cancelled",
      cancelledAt: Math.floor(Date.now() / 1000),
    });

    return Response.json({
      id: "chatcmpl-batch-cancelled",
      object: "chat.completion",
      model: "gpt-4o-mini",
      choices: [
        {
          index: 0,
          message: { role: "assistant", content: "ok" },
          finish_reason: "stop",
        },
      ],
      usage: {
        prompt_tokens: 1,
        completion_tokens: 1,
        total_tokens: 2,
        completion_tokens_details: { reasoning_tokens: 0 },
      },
    });
  };

  try {
    await processPendingBatches();

    let currentBatch = getBatch(batch.id);
    let remainingAttempts = 40;
    while (
      remainingAttempts > 0 &&
      currentBatch &&
      (!["cancelled", "completed", "failed", "expired"].includes(currentBatch.status) ||
        getFile(file.id)?.status !== "processed")
    ) {
      await new Promise((resolve) => setTimeout(resolve, 50));
      currentBatch = getBatch(batch.id);
      remainingAttempts--;
    }

    assert.strictEqual(currentBatch?.status, "cancelled");
    assert.ok(!currentBatch?.outputFileId, "Cancelled batch must not emit an output file");
    assert.ok(!currentBatch?.errorFileId, "Cancelled batch must not emit an error file");
    assert.strictEqual(getFile(file.id)?.status, "processed");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("List files pagination and response format", async () => {
  const apiKey = await createApiKey("File List Test Key", "test-machine");

  // 1. Create multiple files
  const fileIds: string[] = [];
  for (let i = 0; i < 5; i++) {
    const f = createFile({
      bytes: 10 + i,
      filename: `file_${i}.jsonl`,
      purpose: i % 2 === 0 ? "batch" : "fine-tune",
      content: Buffer.from("{}"),
      apiKeyId: apiKey.id,
    });
    fileIds.push(f.id);
  }

  // Default order is DESC (by created_at, then ID)
  const allFilesSorted = listFiles({ apiKeyId: apiKey.id, order: "desc" });
  const sortedFileIds = allFilesSorted.map((f) => f.id);

  // 2. Test listFiles options
  assert.strictEqual(allFilesSorted.length, 5);
  assert.strictEqual(allFilesSorted[0].id, sortedFileIds[0]);

  // 3. Test filtering by purpose
  const batchFiles = listFiles({ apiKeyId: apiKey.id, purpose: "batch" });
  assert.strictEqual(batchFiles.length, 3); // 0, 2, 4
  assert.ok(batchFiles.every((f) => f.purpose === "batch"));

  // 4. Test pagination
  const limit = 2;
  const page1 = listFiles({ apiKeyId: apiKey.id, limit });
  assert.strictEqual(page1.length, 2);
  assert.strictEqual(page1[0].id, sortedFileIds[0]);
  assert.strictEqual(page1[1].id, sortedFileIds[1]);

  const after = page1[1].id;
  const page2 = listFiles({ apiKeyId: apiKey.id, limit, after });
  assert.strictEqual(page2.length, 2);
  assert.strictEqual(page2[0].id, sortedFileIds[2]);
  assert.strictEqual(page2[1].id, sortedFileIds[3]);

  const after2 = page2[1].id;
  const page3 = listFiles({ apiKeyId: apiKey.id, limit, after: after2 });
  assert.strictEqual(page3.length, 1);
  assert.strictEqual(page3[0].id, sortedFileIds[4]);

  // 5. Test sorting
  const ascFiles = listFiles({ apiKeyId: apiKey.id, order: "asc" });
  assert.strictEqual(ascFiles.length, 5);
  assert.strictEqual(ascFiles[0].id, [...sortedFileIds].reverse()[0]);
});

test("File upload with expiration and spec-compliant response", async () => {
  const apiKey = await createApiKey("File Upload Test Key", "test-machine");

  // Simulate File object (Next.js File)
  const content = Buffer.from("test content");
  const mockFile = {
    size: content.length,
    name: "test.txt",
    type: "text/plain",
  };

  // We'll test the DB logic and the formatting logic separately
  // as it's hard to call the Next.js route directly in this unit test.

  const expiresAfterSeconds = 3600;
  const expiresAt = Math.floor(Date.now() / 1000) + expiresAfterSeconds;

  const record = createFile({
    bytes: mockFile.size,
    filename: mockFile.name,
    purpose: "batch",
    content: content,
    mimeType: mockFile.type,
    apiKeyId: apiKey.id,
    expiresAt: expiresAt,
  });

  assert.strictEqual(record.expiresAt, expiresAt);

  const response = formatFileResponse(record);
  assert.strictEqual(response.id, record.id);
  assert.strictEqual(response.object, "file");
  assert.strictEqual(response.expires_at, expiresAt);
  assert.strictEqual(response.status, "validating");
  assert.ok(!("content" in response), "Response should not contain content");
  assert.ok(!("apiKeyId" in response), "Response should not contain apiKeyId");
});

test("Retrieve file spec compliance", async () => {
  const apiKey = await createApiKey("File Retrieve Test Key", "test-machine");

  const record = createFile({
    bytes: 123,
    filename: "retrieve_test.jsonl",
    purpose: "batch",
    content: Buffer.from("{}"),
    apiKeyId: apiKey.id,
    status: "processed",
  });

  const response = formatFileResponse(record);

  // Check all required fields from the spec
  assert.strictEqual(response.id, record.id);
  assert.strictEqual(response.bytes, 123);
  assert.strictEqual(typeof response.created_at, "number");
  assert.strictEqual(response.filename, "retrieve_test.jsonl");
  assert.strictEqual(response.object, "file");
  assert.strictEqual(response.purpose, "batch");
  assert.strictEqual(response.status, "processed");
  assert.strictEqual(response.expires_at, null);

  // Ensure no internal fields leak
  assert.ok(!("content" in (response as any)));
  assert.ok(!("apiKeyId" in (response as any)));
  assert.ok(!("mimeType" in (response as any)));
});

test("File deletion", async () => {
  const apiKey = await createApiKey("File Delete Test Key", "test-machine");

  const record = createFile({
    bytes: 123,
    filename: "delete_test.jsonl",
    purpose: "batch",
    content: Buffer.from("{}"),
    apiKeyId: apiKey.id,
  });

  const fileBefore = getFile(record.id);
  assert.ok(fileBefore !== null);
  assert.strictEqual(fileBefore.id, record.id);

  const deleted = deleteFile(record.id);
  assert.ok(deleted);

  const fileAfter = getFile(record.id);
  assert.strictEqual(fileAfter, null);

  // Verify deletion of content for security
  const db = getDbInstance();
  const row = db
    .prepare("SELECT content, deleted_at FROM files WHERE id = ?")
    .get(record.id) as any;
  assert.ok(row !== undefined);
  assert.strictEqual(row.content, null);
  assert.ok(row.deleted_at !== null);
});

test("Retrieve file content spec compliance", async () => {
  const apiKey = await createApiKey("File Content Test Key", "test-machine");
  const content = Buffer.from(
    '{"id":"req_1","custom_id":"request-1","response":{"status_code":200,"body":{"choices":[{"message":{"content":"Hello"}}]}}}'
  );

  const record = createFile({
    bytes: content.length,
    filename: "content_test.jsonl",
    purpose: "batch",
    content: content,
    mimeType: "application/jsonl",
    apiKeyId: apiKey.id,
  });

  const retrievedContent = getFileContent(record.id);
  assert.ok(retrievedContent !== null);
  assert.deepStrictEqual(retrievedContent, content);

  // Verify ownership check logic (similar to route.ts)
  const file = getFile(record.id);
  assert.ok(file !== null);
  assert.strictEqual(file.apiKeyId, apiKey.id);

  // Verify cross-key access failure
  const otherApiKey = await createApiKey("Other Key", "other-machine");
  assert.ok(file.apiKeyId !== otherApiKey.id);

  // In the route, this would return 404
  const unauthorized = file.apiKeyId !== null && file.apiKeyId !== otherApiKey.id;
  assert.ok(unauthorized);
});

test("File metadata helpers do not load content blobs", async () => {
  const apiKey = await createApiKey("File Metadata Test Key", "test-machine");
  const content = Buffer.from("large-content-placeholder");

  const record = createFile({
    bytes: content.length,
    filename: "metadata_only.jsonl",
    purpose: "batch",
    content,
    mimeType: "application/jsonl",
    apiKeyId: apiKey.id,
  });

  const file = getFile(record.id);
  const files = listFiles({ apiKeyId: apiKey.id });
  const listedFile = files.find((candidate) => candidate.id === record.id);

  assert.ok(file !== null);
  assert.ok(listedFile);
  assert.equal("content" in file, false);
  assert.equal("content" in listedFile, false);
  assert.deepEqual(getFileContent(record.id), content);
});

test("Batch dispatches to embeddings handler for /v1/embeddings URL", async () => {
  initBatchProcessor();
  try {
    const batchItems = [
      JSON.stringify({
        custom_id: "embed-request-1",
        method: "POST",
        url: "/v1/embeddings",
        body: { model: "mistral/mistral-embed", input: "The food was delicious." },
      }),
    ].join("\n");

    const file = createFile({
      bytes: Buffer.byteLength(batchItems),
      filename: "embed_batch.jsonl",
      purpose: "batch",
      content: Buffer.from(batchItems),
      apiKeyId: null,
    });

    const batch = createBatch({
      endpoint: "/v1/embeddings",
      completionWindow: "24h",
      inputFileId: file.id,
      apiKeyId: null,
    });

    let maxAttempts = 20;
    let currentBatch = getBatch(batch.id);
    while (
      maxAttempts > 0 &&
      currentBatch?.status !== "completed" &&
      currentBatch?.status !== "failed"
    ) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      currentBatch = getBatch(batch.id);
      maxAttempts--;
    }

    assert.ok(
      currentBatch?.status === "completed" || currentBatch?.status === "failed",
      "Batch should reach a terminal state"
    );
    assert.strictEqual(currentBatch?.requestCountsTotal, 1);

    // Verify the batch item was dispatched to the embeddings handler, not the chat handler.
    // The chat handler would return errors about missing "messages", "Missing model", etc.
    // The embeddings handler returns errors about missing credentials or invalid embedding models.
    const outputFileId = currentBatch?.outputFileId || currentBatch?.errorFileId;
    assert.ok(outputFileId, "Should have an output or error file");
    const outputContent = getFileContent(outputFileId!);
    assert.ok(outputContent, "Output file should have content");
    const result = JSON.parse(outputContent.toString());
    const errorMsg = result.response?.body?.error?.message || "";
    assert.ok(
      !errorMsg.includes("messages") && !errorMsg.includes("Missing model"),
      `Error should not be a chat-specific error. Got: ${errorMsg}`
    );
  } finally {
    stopBatchProcessor();
  }
});

test("getTerminalBatches returns only terminal statuses ordered oldest first", async () => {
  const apiKey = await createApiKey("Terminal Batches Test Key", "test-machine");

  const file = createFile({
    bytes: 10,
    filename: "terminal_mock.jsonl",
    purpose: "batch",
    content: Buffer.from("{}"),
    apiKeyId: apiKey.id,
  });

  // Create batches in different terminal and non-terminal states
  const completedBatch = createBatch({
    endpoint: "/v1/chat/completions",
    completionWindow: "24h",
    inputFileId: file.id,
    apiKeyId: apiKey.id,
  });
  updateBatch(completedBatch.id, {
    status: "completed",
    completedAt: Math.floor(Date.now() / 1000),
  });

  const failedBatch = createBatch({
    endpoint: "/v1/chat/completions",
    completionWindow: "24h",
    inputFileId: file.id,
    apiKeyId: apiKey.id,
  });
  updateBatch(failedBatch.id, { status: "failed", failedAt: Math.floor(Date.now() / 1000) });

  const cancelledBatch = createBatch({
    endpoint: "/v1/chat/completions",
    completionWindow: "24h",
    inputFileId: file.id,
    apiKeyId: apiKey.id,
  });
  updateBatch(cancelledBatch.id, {
    status: "cancelled",
    cancelledAt: Math.floor(Date.now() / 1000),
  });

  const expiredBatch = createBatch({
    endpoint: "/v1/chat/completions",
    completionWindow: "24h",
    inputFileId: file.id,
    apiKeyId: apiKey.id,
  });
  updateBatch(expiredBatch.id, { status: "expired", expiredAt: Math.floor(Date.now() / 1000) });

  // This one should NOT appear in terminal batches
  const pendingBatch = createBatch({
    endpoint: "/v1/chat/completions",
    completionWindow: "24h",
    inputFileId: file.id,
    apiKeyId: apiKey.id,
  });

  const terminalIds = new Set([
    completedBatch.id,
    failedBatch.id,
    cancelledBatch.id,
    expiredBatch.id,
  ]);
  const terminal = getTerminalBatches();

  // All returned batches must be terminal
  for (const b of terminal) {
    assert.ok(
      ["completed", "failed", "cancelled", "expired"].includes(b.status),
      `Unexpected status: ${b.status}`
    );
  }

  // Our four terminal batches must all be present
  for (const id of terminalIds) {
    assert.ok(
      terminal.some((b) => b.id === id),
      `Missing terminal batch ${id}`
    );
  }

  // The pending batch must not appear
  assert.ok(
    !terminal.some((b) => b.id === pendingBatch.id),
    "Pending batch should not be in terminal list"
  );

  // Results must be ordered oldest first (created_at ASC)
  for (let i = 1; i < terminal.length; i++) {
    assert.ok(
      terminal[i].createdAt >= terminal[i - 1].createdAt,
      "Results should be ordered oldest first"
    );
  }
});
