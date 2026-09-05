/**
 * #12441 — embeddings credential exhaustion with credits_exhausted must
 * surface HTTP 402, matching handleNoCredentials.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-embed-credits-402-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "embed-credits-402-test-secret";

const core = await import("../../../src/lib/db/core.ts");
const providersDb = await import("../../../src/lib/db/providers.ts");
const { createEmbeddingResponse } = await import("../../../src/lib/embeddings/service.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("createEmbeddingResponse maps allExpired+credits_exhausted to HTTP 402", async () => {
  await providersDb.createProviderConnection({
    provider: "mistral",
    authType: "apikey",
    apiKey: "mistral-exhausted-key",
    isActive: true,
    testStatus: "credits_exhausted",
  });

  const res = await createEmbeddingResponse({
    model: "mistral/mistral-embed",
    input: "hello",
  });
  const body = (await res.json()) as { error?: { message?: string } };

  assert.equal(res.status, 402);
  assert.match(String(body.error?.message || ""), /credits exhausted/i);
});
