// tests/unit/compression/previewRouteIonizer.test.ts
import test from "node:test";
import assert from "node:assert/strict";
import { join } from "node:path";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
const TEST_DATA_DIR = mkdtempSync(join(tmpdir(), "preview-ionizer-"));
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

test("the ionizer lane samples an oversized JSON array into a CCR marker", async () => {
  const big = JSON.stringify(Array.from({ length: 400 }, (_, i) => ({ i, v: `r${i}` })));
  const res = await route.POST(makeReq({ messages: [{ role: "user", content: big }], engineId: "ionizer" }));
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.match(body.compressed, /\[ionizer: kept \d+\/400 rows; full → CCR retrieve hash=[0-9a-f]{24}/);
});
