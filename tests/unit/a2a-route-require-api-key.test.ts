/**
 * GHSA-v54m-6rm3-p565 — /a2a sits outside the authz proxy matcher, so it never
 * saw the REQUIRE_API_KEY posture and accepted every caller when OMNIROUTE_API_KEY
 * was unset (the default). authenticate() now honors REQUIRE_API_KEY directly.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-a2a-require-key-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "a2a-require-key-secret";
process.env.OMNIROUTE_DISABLE_REDIS_AUTH_CACHE = "1";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const route = await import("../../src/app/a2a/route.ts");

const ORIGINAL_REQUIRE = process.env.REQUIRE_API_KEY;
const ORIGINAL_A2A_KEY = process.env.OMNIROUTE_API_KEY;

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_REQUIRE === undefined) delete process.env.REQUIRE_API_KEY;
  else process.env.REQUIRE_API_KEY = ORIGINAL_REQUIRE;
  if (ORIGINAL_A2A_KEY === undefined) delete process.env.OMNIROUTE_API_KEY;
  else process.env.OMNIROUTE_API_KEY = ORIGINAL_A2A_KEY;
});

function post(key?: string) {
  return route.POST(
    new Request("http://localhost/a2a", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(key ? { authorization: `Bearer ${key}` } : {}),
      },
      body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "message/send", params: {} }),
    }) as never
  );
}

async function isUnauthorized(res: Response) {
  const body = (await res.clone().json()) as { error?: { code?: number } };
  return body.error?.code === -32600;
}

test("REQUIRE_API_KEY=true rejects an unkeyed /a2a call (GHSA-v54m)", async () => {
  delete process.env.OMNIROUTE_API_KEY;
  process.env.REQUIRE_API_KEY = "true";
  assert.equal(await isUnauthorized(await post()), true, "no key must be rejected");

  const key = await apiKeysDb.createApiKey("a2a-client", "machine-a2a", []);
  assert.equal(
    await isUnauthorized(await post(key.key)),
    false,
    "a valid key must clear the /a2a auth gate"
  );
});

test("keyless local-first default still allows /a2a (posture preserved)", async () => {
  delete process.env.REQUIRE_API_KEY;
  delete process.env.OMNIROUTE_API_KEY;
  assert.equal(await isUnauthorized(await post()), false, "keyless default must not 401");
});
