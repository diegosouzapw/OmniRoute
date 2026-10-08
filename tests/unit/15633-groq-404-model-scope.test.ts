// #15633 — a 404 model_not_found on ONE Groq model must lock only that model,
// not cool the whole connection (sibling models must stay selectable).
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-15633-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const auth = await import("../../src/sse/services/auth.ts");
const { isModelNotFound404 } =
  await import("../../open-sse/services/accountFallback/perModelFailureScope.ts");

const NOT_FOUND =
  '{"error":{"message":"The model `meta-llama/llama-4-scout-17b-16e-instruct` does not exist or you do not have access to it.","type":"invalid_request_error","code":"model_not_found"}}';

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

async function makeConn() {
  core.resetDbInstance();
  return (await providersDb.createProviderConnection({
    provider: "groq",
    authType: "apikey",
    apiKey: "groq-key",
    isActive: true,
    testStatus: "active",
  })) as { id: string };
}

test("groq 404 model_not_found does not cool the whole connection", async () => {
  const conn = await makeConn();
  await auth.markAccountUnavailable(
    conn.id,
    404,
    NOT_FOUND,
    "groq",
    "meta-llama/llama-4-scout-17b-16e-instruct"
  );

  const after = await providersDb.getProviderConnectionById(conn.id);
  assert.ok(!after.rateLimitedUntil, `connection cooled until ${after.rateLimitedUntil}`);
  assert.equal(after.testStatus, "active");

  const sibling = await auth.getProviderCredentials("groq", null, null, "openai/gpt-oss-20b");
  assert.ok(sibling && !("allRateLimited" in (sibling as object)), "sibling model must get creds");
});

test("groq bare 404 (no model wording) still cools the connection", async () => {
  const conn = await makeConn();
  await auth.markAccountUnavailable(
    conn.id,
    404,
    "404 page not found",
    "groq",
    "openai/gpt-oss-20b"
  );
  const after = await providersDb.getProviderConnectionById(conn.id);
  assert.ok(after.rateLimitedUntil, "bare endpoint 404 must keep the connection cooldown");
});

test("isModelNotFound404 matches model wording only on 404", () => {
  assert.equal(isModelNotFound404(404, NOT_FOUND), true);
  assert.equal(isModelNotFound404(404, "The model `x` does not exist"), true);
  assert.equal(isModelNotFound404(404, "404 page not found"), false);
  assert.equal(isModelNotFound404(500, NOT_FOUND), false);
});
