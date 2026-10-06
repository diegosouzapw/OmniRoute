import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-ollama-404-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const auth = await import("../../src/sse/services/auth.ts");
const { hasPerModelQuota, isModelLocked } =
  await import("../../open-sse/services/accountFallback.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("hasPerModelQuota returns true for ollama-local and ollama providers", () => {
  assert.equal(hasPerModelQuota("ollama-local"), true);
  assert.equal(hasPerModelQuota("ollama"), true);
});

test("markAccountUnavailable locks only the missing model on a 404 from ollama-local", async () => {
  await resetStorage();

  const connection = await providersDb.createProviderConnection({
    provider: "ollama-local",
    authType: "none",
    baseUrl: "http://127.0.0.1:11434/v1",
    isActive: true,
  });

  const result = await auth.markAccountUnavailable(
    connection.id,
    404,
    "model 'model-b' not found",
    "ollama-local",
    "model-b"
  );

  assert.equal(result.shouldFallback, true);

  // The missing model must be locked
  assert.equal(isModelLocked("ollama-local", connection.id, "model-b"), true);

  // The connection in DB must remain active / not marked unavailable for sibling models
  const connInDb = await providersDb.getProviderConnectionById(connection.id);
  assert.notEqual(
    connInDb?.testStatus,
    "unavailable",
    "connection should not be marked unavailable connection-wide on a 404 model-not-found error"
  );

  // getProviderCredentials must still serve sibling models
  const selectedForSibling = await auth.getProviderCredentials(
    "ollama-local",
    null,
    null,
    "model-a"
  );
  assert.ok(
    selectedForSibling && !("allExpired" in selectedForSibling),
    "sibling model-a must still be selected on the same connection"
  );
});
