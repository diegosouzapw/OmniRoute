import test from "node:test";
import assert from "node:assert/strict";
import { join } from "node:path";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";

const TEST_DATA_DIR = mkdtempSync(join(tmpdir(), "preview-reconcile-6488-"));
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

// Regression for #6488: outer originalTokens/compressedTokens (real tiktoken counter over
// extracted message text) and engineBreakdown[].originalTokens/compressedTokens (internal
// JSON.stringify(body).length/4 estimate) used to diverge on small/degenerate input because
// they measured different things. For a single-engine breakdown, the entry represents the
// exact same before/after transformation as the overall response, so it must be reconciled
// to match the outer counts exactly.
test("degenerate input with pipeline=['lite']: engineBreakdown[0] matches outer token counts", async () => {
  const res = await route.POST(
    makeReq({
      messages: [{ role: "user", content: "user: " }],
      pipeline: ["lite"],
    })
  );
  const body = await res.json();
  assert.equal(res.status, 200, `expected 200, got ${res.status}: ${JSON.stringify(body)}`);

  const engines = (body.engineBreakdown ?? []).map((e: { engine: string }) => e.engine);
  assert.ok(
    engines.every((e: string) => e === "lite"),
    `expected engineBreakdown to only contain 'lite', got ${JSON.stringify(engines)}`
  );

  assert.equal(body.engineBreakdown.length, 1);
  const [step] = body.engineBreakdown;
  assert.equal(
    step.originalTokens,
    body.originalTokens,
    `outer originalTokens=${body.originalTokens} vs engine ${step.engine} originalTokens=${step.originalTokens}`
  );
  assert.equal(
    step.compressedTokens,
    body.compressedTokens,
    `outer compressedTokens=${body.compressedTokens} vs engine ${step.engine} compressedTokens=${step.compressedTokens}`
  );
});

// Same reconciliation must hold for the single-engine (non-pipeline) dispatch path, where
// engineBreakdown is synthesized by ensureEngineBreakdown from the overall stats.
test("single-engine dispatch (engineId='rtk'): engineBreakdown[0] matches outer token counts", async () => {
  const res = await route.POST(
    makeReq({
      messages: [{ role: "user", content: "a" }],
      engineId: "rtk",
    })
  );
  const body = await res.json();
  assert.equal(res.status, 200, `expected 200, got ${res.status}: ${JSON.stringify(body)}`);
  assert.equal(body.engineBreakdown.length, 1);
  const [step] = body.engineBreakdown;
  assert.equal(step.originalTokens, body.originalTokens);
  assert.equal(step.compressedTokens, body.compressedTokens);
});
