import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-secret-compare-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const ORIGINAL_OMNIROUTE_API_KEY = process.env.OMNIROUTE_API_KEY;
const ORIGINAL_ROUTER_API_KEY = process.env.ROUTER_API_KEY;

const core = await import("../../src/lib/db/core.ts");
const modelSync = await import("../../src/shared/services/modelSyncScheduler.ts");
const auth = await import("../../src/sse/services/auth.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_OMNIROUTE_API_KEY === undefined) delete process.env.OMNIROUTE_API_KEY;
  else process.env.OMNIROUTE_API_KEY = ORIGINAL_OMNIROUTE_API_KEY;
  if (ORIGINAL_ROUTER_API_KEY === undefined) delete process.env.ROUTER_API_KEY;
  else process.env.ROUTER_API_KEY = ORIGINAL_ROUTER_API_KEY;
});

// `===` on a secret stops at the first differing byte, so the answer time tells the caller how
// much of a guess was right. A timing measurement is too noisy for a unit test, so the sites
// that compare a configured secret are pinned to the shared constant-time helper instead.
const SECRET_COMPARE_SITES: Array<{ file: string; unsafe: RegExp }> = [
  { file: "src/sse/services/auth.ts", unsafe: /apiKey\s*===\s*envKey/ },
  { file: "src/lib/db/apiKeys.ts", unsafe: /key\s*===\s*envKey/ },
  {
    file: "src/shared/services/modelSyncScheduler.ts",
    unsafe: /headerToken\s*===\s*internalAuthToken/,
  },
];

for (const { file, unsafe } of SECRET_COMPARE_SITES) {
  test(`${file} compares its configured secret in constant time`, () => {
    const source = fs.readFileSync(path.join(process.cwd(), file), "utf8");
    assert.doesNotMatch(source, unsafe);
    assert.match(source, /timingSafeCompare\(/);
  });
}

test("the model-sync internal token still authenticates only the exact value", () => {
  const good = modelSync.buildModelSyncInternalHeaders();
  const name = modelSync.getModelSyncInternalAuthHeaderName();
  const token = good[name];

  const request = (value?: string) => ({
    headers: new Headers(value === undefined ? {} : { [name]: value }),
  });

  assert.equal(modelSync.isModelSyncInternalRequest(request(token)), true);
  assert.equal(modelSync.isModelSyncInternalRequest(request(token.slice(0, -1) + "x")), false);
  assert.equal(modelSync.isModelSyncInternalRequest(request(token + "x")), false);
  assert.equal(modelSync.isModelSyncInternalRequest(request("")), false);
  assert.equal(modelSync.isModelSyncInternalRequest(request()), false);
});

test("the environment passthrough API key still validates only the exact value", async () => {
  process.env.OMNIROUTE_API_KEY = "sk-env-passthrough-1234";
  delete process.env.ROUTER_API_KEY;

  assert.equal(await auth.isValidApiKey("sk-env-passthrough-1234"), true);
  assert.equal(await auth.isValidApiKey("sk-env-passthrough-1235"), false);
  assert.equal(await auth.isValidApiKey("sk-env-passthrough-123"), false);
  assert.equal(await auth.isValidApiKey(""), false);
});
