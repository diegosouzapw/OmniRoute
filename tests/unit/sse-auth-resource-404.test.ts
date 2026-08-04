import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-auth-resource-404-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "auth-resource-404-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const auth = await import("../../src/sse/services/auth.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("markAccountUnavailable preserves connection health for a missing Files API resource", async () => {
  const connection = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "apikey",
    name: "request-resource-404",
    apiKey: "sk-request-resource-404",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {
      baseUrl: "https://chatgpt.com/backend-api/codex",
    },
  });

  const result = await auth.markAccountUnavailable(
    connection.id,
    404,
    "[404]: Files [file-be30851bd1614656872e725e] were not found",
    "codex",
    "gpt-5.5-medium"
  );
  const updated = await providersDb.getProviderConnectionById(connection.id);

  assert.deepEqual(result, { shouldFallback: false, cooldownMs: 0 });
  assert.equal(updated.testStatus, "active");
  assert.equal(updated.rateLimitedUntil, undefined);
  assert.equal(updated.backoffLevel, 0);
  assert.equal(updated.lastError, undefined);
});
