import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Isolate the DB to a temp dir BEFORE importing any module that opens it,
// matching the pattern in embeddings-lan-noauth-6925.test.ts.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-embed-unknown-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { createEmbeddingResponse } = await import("../../src/lib/embeddings/service.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

/**
 * `createEmbeddingResponse`'s final "Unknown embedding provider" 400 branch
 * had no direct test coverage at all before this — every existing test for
 * this function exercises a provider that DOES resolve. This exact branch
 * is what silently 400'd every embedding request for a real production
 * connection whose customModels override used a typo'd provider prefix
 * ("llamacpp" instead of the connection's actual "llama-cpp" id): the
 * request never reached call_logs, so nothing in OmniRoute's own logs or
 * dashboard showed it -- only the calling client's own log did.
 */
test("createEmbeddingResponse 400s with 'Unknown embedding provider' for a fully unrecognized prefix", async () => {
  const res = await createEmbeddingResponse({
    model: "totally-unrecognized-provider-9999/some-model",
    input: "hello world",
  });

  assert.equal(res.status, 400);
  const body = (await res.json()) as { error?: { message?: string } };
  assert.match(
    body.error?.message ?? "",
    /Unknown embedding provider: totally-unrecognized-provider-9999/
  );
  assert.match(body.error?.message ?? "", /No matching hardcoded or local provider found/);
});

test("createEmbeddingResponse rejects a bare model string with no provider prefix", async () => {
  const res = await createEmbeddingResponse({
    model: "no-slash-model-name",
    input: "hello world",
  });

  assert.equal(res.status, 400);
  const body = (await res.json()) as { error?: { message?: string } };
  assert.match(body.error?.message ?? "", /Invalid embedding model/);
});
