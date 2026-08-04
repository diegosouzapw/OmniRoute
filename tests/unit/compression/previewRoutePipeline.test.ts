import test from "node:test";
import assert from "node:assert/strict";
import { join } from "node:path";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
const TEST_DATA_DIR = mkdtempSync(join(tmpdir(), "preview-pipe-"));
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
test("pipeline runs the engines in the GIVEN order (reversed vs default rtk→caveman)", async () => {
  const text = "$ pytest\ntests/a.py ....\nbasically what I mean is that you should loop through them one by one";
  const res = await route.POST(makeReq({ messages: [{ role: "user", content: text }], pipeline: ["caveman", "rtk"] }));
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.equal(body.mode, "stacked");
  assert.ok(Array.isArray(body.engineBreakdown) && body.engineBreakdown.length >= 2);
  // Discriminating: default stacked is rtk-first; only the pipeline field makes caveman run first.
  assert.equal(body.engineBreakdown[0].engine, "caveman");
});

test("pipeline accepts the 4 schema-restricted engines and does NOT fall back to the default rtk/caveman", async () => {
  const res = await route.POST(makeReq({
    messages: [{ role: "user", content: "x".repeat(80) }],
    pipeline: ["session-dedup", "headroom"],
  }));
  assert.equal(res.status, 200); // would be 400 if it went through the strict config schema
  const body = await res.json();
  // Discriminating: if `pipeline` were stripped, this would be the default rtk→caveman cascade.
  assert.ok(
    body.engineBreakdown.every((e: { engine: string }) => e.engine !== "rtk" && e.engine !== "caveman")
  );
});
