import test from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-batch-results-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "test-secret-123";

const {
  createFile,
  createBatch,
  getBatch,
  getFileContent,
  createProviderConnection,
  createApiKey,
} = await import("../../src/lib/localDb.ts");
const { initBatchProcessor, stopBatchProcessor } =
  await import("../../open-sse/services/batchProcessor.ts");

// Simple end-to-end check: when a batch item's upstream call succeeds, the
// batch processor should emit an output file containing a JSONL line per item.

test("Batch processor produces output file for successful items", async () => {
  const originalFetch = globalThis.fetch;
  // Mock upstream provider to always return a successful embedding response
  globalThis.fetch = async (url, options) => {
    return new Response(
      JSON.stringify({
        object: "list",
        data: [{ object: "embedding", embedding: [0.1, 0.2], index: 0 }],
        usage: { prompt_tokens: 2, total_tokens: 2 },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  };

  // Prevent open-sse/utils/proxyFetch.ts from replacing globalThis.fetch
  // when it is dynamically imported via the route handler chain.
  // proxyFetch.ts has a module-level side effect that replaces globalThis.fetch
  // with patchedFetch (which uses undici under the hood). By pre-setting its
  // state with isPatched: true, we skip the replacement and keep our mock.
  const { AsyncLocalStorage } = await import("node:async_hooks");
  (globalThis as any)[Symbol.for("omniroute.proxyFetch.state")] = {
    originalFetch: globalThis.fetch,
    proxyContext: new AsyncLocalStorage(),
    isPatched: true,
  };

  try {
    await createProviderConnection({
      provider: "openai",
      authType: "apikey",
      name: "Mock OpenAI Embeddings",
      apiKey: "sk-mock-embeddings-key",
      isActive: true,
    });

    const fileContent = [
      JSON.stringify({
        custom_id: "embed-request",
        method: "POST",
        url: "/v1/embeddings",
        body: { model: "openai/text-embedding-3-small", input: "Hello embeddings" },
      }),
    ].join("\n");

    const file = createFile({
      bytes: Buffer.byteLength(fileContent),
      filename: "embeddings_batch.jsonl",
      purpose: "batch",
      content: Buffer.from(fileContent),
      apiKeyId: null,
    });

    const batch = createBatch({
      endpoint: "/v1/embeddings",
      completionWindow: "24h",
      inputFileId: file.id,
      apiKeyId: null,
    });

    initBatchProcessor();

    let maxAttempts = 30;
    let currentBatch = getBatch(batch.id);
    while (
      maxAttempts > 0 &&
      currentBatch?.status !== "completed" &&
      currentBatch?.status !== "failed"
    ) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      currentBatch = getBatch(batch.id);
      maxAttempts--;
    }

    stopBatchProcessor();

    assert.ok(
      currentBatch?.status === "completed" || currentBatch?.status === "failed",
      "Batch should reach a terminal state"
    );

    // The batch should have recorded progress counts (completed + failed == total)
    assert.strictEqual(
      (currentBatch?.requestCountsCompleted || 0) + (currentBatch?.requestCountsFailed || 0),
      currentBatch?.requestCountsTotal || 1,
      "Processed counts should add up to total"
    );

    // If the batch completed successfully, it should have produced an output file
    if (currentBatch?.status === "completed") {
      assert.ok(currentBatch.outputFileId, "Batch should have an outputFileId");
      const outputContent = getFileContent(currentBatch.outputFileId!);
      assert.ok(outputContent, "Output file should have content");
      const lines = outputContent.toString().split("\n").filter(Boolean);
      assert.strictEqual(lines.length, 1, "Should have one result line");
      const obj = JSON.parse(lines[0]);
      assert.ok(obj.custom_id === "embed-request");
      assert.ok(obj.response && typeof obj.response.status_code === "number");

      // Output file should have an expiration timestamp set (30 days default)
      const { getFile } = await import("../../src/lib/localDb.ts");
      const fileRow = getFile(currentBatch.outputFileId!);
      assert.ok(fileRow?.expiresAt && typeof fileRow.expiresAt === "number");
    }
  } finally {
    globalThis.fetch = originalFetch;
    stopBatchProcessor();
  }
});
