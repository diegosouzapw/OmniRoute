import test from "node:test";
import assert from "node:assert/strict";
import { join } from "node:path";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
const TEST_DATA_DIR = mkdtempSync(join(tmpdir(), "preview-fuzzy-"));
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

const A = "alpha beta gamma delta epsilon zeta eta theta iota kappa lambda mu nu xi omicron pi rho";

test("fuzzyDedup flag drives the session-dedup lane to produce a CCR marker", async () => {
  const res = await route.POST(makeReq({
    messages: [{ role: "user", content: A }, { role: "user", content: A + " sigma" }],
    engineId: "session-dedup",
    fuzzyDedup: { enabled: true },
  }));
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.match(body.compressed, /\[CCR retrieve hash=[0-9a-f]{24}/);
});

test("malformed fuzzyDedup is rejected (field is in the schema, not stripped)", async () => {
  const res = await route.POST(makeReq({
    messages: [{ role: "user", content: "x" }], engineId: "session-dedup", fuzzyDedup: { enabled: "yes" },
  }));
  assert.equal(res.status, 400);
});
