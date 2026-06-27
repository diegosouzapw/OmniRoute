// tests/unit/compression/previewRouteToon.test.ts
import test from "node:test";
import assert from "node:assert/strict";
import { join } from "node:path";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
const TEST_DATA_DIR = mkdtempSync(join(tmpdir(), "preview-toon-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET ?? "test-secret-32-chars-min-aaaaaaaa";
delete process.env.INITIAL_PASSWORD;
const core = await import("../../../src/lib/db/core.ts");
const route = await import("../../../src/app/api/compression/preview/route.ts");
function makeReq(body: unknown) {
  return new Request("http://localhost/api/compression/preview", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}
test.beforeEach(() => core.resetDbInstance());
test.after(() => {
  core.resetDbInstance();
  rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("headroom engine carries encoderComparison with one array and a valid winner", async () => {
  const big = JSON.stringify(Array.from({ length: 20 }, (_, i) => ({ id: i, ok: true })));
  const res = await route.POST(
    makeReq({ messages: [{ role: "user", content: big }], engineId: "headroom" })
  );
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.ok(body.encoderComparison);
  assert.equal(body.encoderComparison.arraysCompared, 1);
  assert.ok(["gcf", "toon", "json"].includes(body.encoderComparison.winner));
});

test("non-headroom engine (lite) does not carry encoderComparison", async () => {
  const big = JSON.stringify(Array.from({ length: 20 }, (_, i) => ({ id: i, ok: true })));
  const res = await route.POST(
    makeReq({ messages: [{ role: "user", content: big }], engineId: "lite" })
  );
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.equal(body.encoderComparison ?? null, null);
});

test("error responses do not leak stack traces", async () => {
  const res = await route.POST(makeReq({ messages: [] }));
  assert.equal(res.status, 400);
  const body = await res.json();
  const details = JSON.stringify(body);
  assert.ok(!String(details).includes("at /"));
});
