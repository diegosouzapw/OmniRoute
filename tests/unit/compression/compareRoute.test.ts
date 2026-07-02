import test from "node:test";
import assert from "node:assert/strict";
import { join } from "node:path";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
const TEST_DATA_DIR = mkdtempSync(join(tmpdir(), "compare-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET ?? "test-secret-32-chars-min-aaaaaaaa";
delete process.env.INITIAL_PASSWORD;
const core = await import("../../../src/lib/db/core.ts");
const route = await import("../../../src/app/api/compression/compare/route.ts");
function makeReq(body: unknown) {
  return new Request("http://localhost/api/compression/compare", {
    method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body),
  });
}
test.beforeEach(() => core.resetDbInstance());
test.after(() => { core.resetDbInstance(); rmSync(TEST_DATA_DIR, { recursive: true, force: true }); });
test("ranks a high-savings engine above a no-op for repetitive tool output", async () => {
  const text = ["$ npm install",
    "npm warn deprecated glob@7.2.3: no longer supported",
    "npm warn deprecated glob@7.2.3: no longer supported",
    "npm warn deprecated glob@7.2.3: no longer supported",
    "added 1234 packages"].join("\n");
  const res = await route.POST(makeReq({ messages: [{ role: "user", content: text }], engineIds: ["rtk", "lite"] }));
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.ok(Array.isArray(body.rows) && body.rows.length === 2);
  assert.equal(body.rows[0].engine, "rtk");
  assert.ok(body.rows[0].meanSavingsPercent >= body.rows[1].meanSavingsPercent);
  assert.ok(typeof body.rows[0].meanRetention === "number");
});
test("400 on empty messages", async () => {
  const res = await route.POST(makeReq({ messages: [] }));
  assert.equal(res.status, 400);
});
