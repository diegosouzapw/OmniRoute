import test from "node:test";
import assert from "node:assert/strict";
import { join } from "node:path";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
const TEST_DATA_DIR = mkdtempSync(join(tmpdir(), "retrieve-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET ?? "test-secret-32-chars-min-aaaaaaaa";
delete process.env.INITIAL_PASSWORD;
const core = await import("../../../src/lib/db/core.ts");
const route = await import("../../../src/app/api/compression/retrieve/route.ts");
function makeReq(body: unknown) {
  return new Request("http://localhost/api/compression/retrieve", {
    method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body),
  });
}
test.beforeEach(() => core.resetDbInstance());
test.after(() => { core.resetDbInstance(); rmSync(TEST_DATA_DIR, { recursive: true, force: true }); });
test("400 when hash is missing", async () => {
  const res = await route.POST(makeReq({}));
  assert.equal(res.status, 400);
});
test("returns {found:false} for an unknown hash (never throws)", async () => {
  const res = await route.POST(makeReq({ hash: "deadbeefdeadbeefdeadbeef" }));
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.equal(body.found, false);
});
