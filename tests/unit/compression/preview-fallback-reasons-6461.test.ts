/**
 * #6461 — the compression preview response must surface WHY a run fell back
 * (deduped `fallbackReasons[]`, mirrored into `skippedReasons`) instead of the
 * previously hard-coded `skippedReasons: []`. Non-fallback runs return [] on
 * both — zero change on the happy path (regression guard, Rule #18).
 */
import test from "node:test";
import assert from "node:assert/strict";
import { join } from "node:path";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";

const TEST_DATA_DIR = mkdtempSync(join(tmpdir(), "preview-fallback-6461-"));
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

test("#6461 preview exposes fallbackReasons and mirrors it into skippedReasons", async () => {
  const res = await route.POST(
    makeReq({
      messages: [{ role: "user", content: "$ git status\nOn branch main\nnothing to commit" }],
      engineId: "rtk",
    })
  );
  assert.equal(res.status, 200);
  const body = await res.json();
  // Structural contract added by #6461 (absent on the pre-patch response).
  assert.ok(Array.isArray(body.fallbackReasons), "fallbackReasons must be an array");
  assert.deepEqual(
    body.skippedReasons,
    body.fallbackReasons,
    "skippedReasons must mirror fallbackReasons"
  );
  // Happy path (no fallback): both empty, and fallbackReason is null.
  if (body.fallbackApplied !== true) {
    assert.deepEqual(body.fallbackReasons, []);
    assert.equal(body.fallbackReason ?? null, null);
  }
});
