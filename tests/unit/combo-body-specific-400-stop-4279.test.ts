/**
 * #4279 — A combo whose targets all reject the request body with the SAME
 * genuinely body-specific 400 (malformed/invalid payload, context overflow,
 * bad-request) must STOP at the first such 400 instead of marching through
 * every target with an identical, guaranteed-to-fail request.
 *
 * The #2101 guard in combo.ts logs "skipping fallback to other targets to
 * prevent infinite loop" / "stopping combo", but it executed a bare `break`,
 * which only exits the inner retry loop — `executeTarget` then returns `null`,
 * and the outer target loop treats `null` as "this target produced nothing" and
 * advances to the next model. So a 143-model combo tried all 143 targets
 * (the report's symptom), wasting work + per-attempt processing.
 *
 * The guard must surface the 400 via the `{ ok, response }` contract (mirroring
 * the 499 client-disconnect path) so the outer loop resolves the combo and stops.
 *
 * NOTE (#5249 reconciliation): a *model-specific* 400 ("model X is not supported
 * with this account") is NO LONGER body-specific for STOP purposes — #5249
 * deliberately made those advance to the next combo target, since a different
 * model in the combo may well be supported. This test therefore exercises a
 * genuinely body-specific malformed 400 ("invalid message format"), which is
 * the case that still recurs identically on every target and must STOP. The
 * advance-on-model-400 behavior is covered by combo-strategies.test.ts.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-4279-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "combo-4279-test-secret";

const { handleComboChat } = await import("../../open-sse/services/combo.ts");

const noop = () => {};
const log = { info: noop, warn: noop, debug: noop, error: noop };

// "invalid message format" matches MALFORMED_REQUEST_PATTERNS in accountFallback.ts
// → reason MODEL_CAPACITY (shouldFallback), and the errorText carries the
// "invalid"/"malformed" substrings combo.ts requires → the #2101 body-specific
// stop guard fires. This is request-shape-specific, so it would fail identically
// on every combo target.
function bodySpecific400() {
  return new Response(
    JSON.stringify({
      detail: "Invalid message format: the request body is malformed.",
    }),
    { status: 400, headers: { "Content-Type": "application/json" } }
  );
}

function makeCombo(models: string[]) {
  return {
    name: "test-combo-4279",
    strategy: "priority",
    models: models.map((m) => ({ model: m })),
  };
}

test("#4279 combo stops at the first body-specific 400 instead of trying every target", async () => {
  const modelsCalled: string[] = [];
  const handleSingleModel = async (_body: unknown, modelStr: string) => {
    modelsCalled.push(modelStr);
    return bodySpecific400();
  };

  const result = await handleComboChat({
    body: { model: "test", messages: [{ role: "user", content: "hi" }] },
    combo: makeCombo(["codex/gpt-5.2", "codex/gpt-5.3-codex", "codex/gpt-5.6-sol"]),
    handleSingleModel,
    log,
    settings: {},
    allCombos: [],
  });

  // The guard must short-circuit after the FIRST target — never reach #2 or #3.
  assert.equal(
    modelsCalled.length,
    1,
    `body-specific 400 must stop the combo at target 1, but it tried: ${modelsCalled.join(", ")}`
  );
  assert.equal(result.status, 400, "the combo must surface the body-specific 400 to the client");
});
