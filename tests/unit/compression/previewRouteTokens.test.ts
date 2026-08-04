import test from "node:test";
import assert from "node:assert/strict";
import { join } from "node:path";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";

const TEST_DATA_DIR = mkdtempSync(join(tmpdir(), "preview-tok-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET ?? "test-secret-32-chars-min-aaaaaaaa";
delete process.env.INITIAL_PASSWORD;

const core = await import("../../../src/lib/db/core.ts");
const route = await import("../../../src/app/api/compression/preview/route.ts");
const { countTextTokens } = await import("../../../src/shared/utils/tiktokenCounter.ts");

function makeReq(body: unknown) {
  return new Request("http://localhost/api/compression/preview", {
    method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body),
  });
}
test.beforeEach(() => core.resetDbInstance());
test.after(() => { core.resetDbInstance(); rmSync(TEST_DATA_DIR, { recursive: true, force: true }); });

test("originalTokens equals countTextTokens, not the *1.33 estimate", async () => {
  const text = "the quick brown fox jumps over the lazy dog repeatedly and often";
  const res = await route.POST(makeReq({ messages: [{ role: "user", content: text }], mode: "off" }));
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.equal(body.originalTokens, countTextTokens(body.original));
  const wordEstimate = Math.ceil(body.original.split(/\s+/).filter(Boolean).length * 1.33);
  assert.notEqual(body.originalTokens, wordEstimate);
});
