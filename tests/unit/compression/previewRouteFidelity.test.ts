import test from "node:test";
import assert from "node:assert/strict";
import { join } from "node:path";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
const TEST_DATA_DIR = mkdtempSync(join(tmpdir(), "preview-fid-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET ?? "test-secret-32-chars-min-aaaaaaaa";
delete process.env.INITIAL_PASSWORD;
const core = await import("../../../src/lib/db/core.ts");
const route = await import("../../../src/app/api/compression/preview/route.ts");
function makeReq(body: unknown) {
  return new Request("http://localhost/api/compression/preview", {
    method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body),
  });
}
test.beforeEach(() => core.resetDbInstance());
test.after(() => { core.resetDbInstance(); rmSync(TEST_DATA_DIR, { recursive: true, force: true }); });

test("fidelityGate flag is accepted (200) and preview still works", async () => {
  const res = await route.POST(makeReq({
    messages: [{ role: "user", content: "$ git status\nOn branch main" }],
    engineId: "rtk", fidelityGate: { enabled: true },
  }));
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.ok(Array.isArray(body.engineBreakdown));
});

test("malformed fidelityGate is rejected (proves the field is in the schema, not stripped)", async () => {
  const res = await route.POST(makeReq({
    messages: [{ role: "user", content: "x" }],
    engineId: "rtk", fidelityGate: { enabled: "yes" }, // wrong type
  }));
  assert.equal(res.status, 400);
});
