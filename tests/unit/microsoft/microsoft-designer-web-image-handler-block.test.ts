import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-designer-image-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const { handleImageGeneration } = await import("../../../open-sse/handlers/imageGeneration.ts");

test.after(() => {
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("image handler blocks exact retired providers before any upstream fetch", async () => {
  const originalFetch = globalThis.fetch;
  let fetchCalls = 0;
  globalThis.fetch = (async () => {
    fetchCalls += 1;
    throw new Error("unexpected upstream fetch");
  }) as typeof fetch;

  try {
    for (const resolvedProvider of ["microsoft-designer-web", "MSDESIGNER"]) {
      const result = await handleImageGeneration({
        body: { model: `${resolvedProvider}/dall-e-3`, prompt: "test" },
        credentials: {
          apiKey: "test-key",
          providerSpecificData: { baseUrl: "https://compatible.invalid/v1" },
        },
        resolvedProvider,
      });

      assert.equal(result.success, false, resolvedProvider);
      assert.equal(result.status, 410, resolvedProvider);
      assert.equal(result.error, "Provider has been retired from OmniRoute runtime.");
    }
    assert.equal(fetchCalls, 0);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
