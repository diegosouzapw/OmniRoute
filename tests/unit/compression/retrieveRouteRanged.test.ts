import test from "node:test";
import assert from "node:assert/strict";
import { join } from "node:path";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
const TEST_DATA_DIR = mkdtempSync(join(tmpdir(), "retrieve-ranged-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET ?? "test-secret-32-chars-min-aaaaaaaa";
delete process.env.INITIAL_PASSWORD;
const core = await import("../../../src/lib/db/core.ts");
const ccr = await import("../../../open-sse/services/compression/engines/ccr/index.ts");
const route = await import("../../../src/app/api/compression/retrieve/route.ts");
const BLOCK = ["x1", "x2 ERR", "x3", "x4"].join("\n");
function makeReq(body: unknown) {
  return new Request("http://localhost/api/compression/retrieve", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}
test.beforeEach(() => {
  core.resetDbInstance();
  ccr.resetCcrStore();
});
test.after(() => {
  core.resetDbInstance();
  rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("mode:head n:2 returns first 2 lines", async () => {
  const hash = ccr.storeBlock(BLOCK); // management scope (no principalId)
  const res = await route.POST(makeReq({ hash, mode: "head", n: 2 }));
  assert.equal(res.status, 200);
  const json = await res.json();
  assert.equal(json.found, true);
  assert.equal(json.block, "x1\nx2 ERR");
});

test("mode:stats returns correct line count", async () => {
  const hash = ccr.storeBlock(BLOCK);
  const res = await route.POST(makeReq({ hash, mode: "stats" }));
  assert.equal(res.status, 200);
  const json = await res.json();
  assert.equal(json.found, true);
  assert.equal(JSON.parse(json.block).lines, 4);
});

test("mode:grep with ReDoS pattern is rejected and sanitized", async () => {
  const hash = ccr.storeBlock(BLOCK);
  const res = await route.POST(makeReq({ hash, mode: "grep", pattern: "(a+)+$" }));
  assert.equal(res.status, 200);
  const json = await res.json();
  assert.ok(json.error, "expected an error field for the rejected ReDoS pattern");
  assert.ok(!String(json.error).includes("at /"), "error must be sanitized");
});

test("no mode returns the whole block (backward-compat)", async () => {
  const hash = ccr.storeBlock(BLOCK);
  const res = await route.POST(makeReq({ hash }));
  assert.equal(res.status, 200);
  const json = await res.json();
  assert.equal(json.found, true);
  assert.equal(json.block, BLOCK);
});
