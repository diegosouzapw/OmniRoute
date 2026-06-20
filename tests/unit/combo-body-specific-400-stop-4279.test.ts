/**
 * #4279 — A combo full of targets that all reject the request body with a
 * body-specific 400 (e.g. a Codex combo whose models are "not supported when
 * using Codex with a ChatGPT account") must STOP at the first such 400 instead
 * of marching through every target with the same body-rejected request.
 *
 * The #2101 guard in combo.ts logs "skipping fallback to other targets to
 * prevent infinite loop" / "stopping combo", but it executed a bare `break`,
 * which only exits the inner retry loop — `executeTarget` then returns `null`,
 * and the outer target loop treats `null` as "this target produced nothing" and
 * advances to the next model. So a 143-model Codex combo tried all 143 targets
 * (the report's symptom), wasting work + per-attempt processing.
 *
 * The guard must surface the 400 via the `{ ok, response }` contract (mirroring
 * the 499 client-disconnect path) so the outer loop resolves the combo and stops.
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

// "model is not supported" matches MODEL_ACCESS_DENIED_PATTERNS in
// accountFallback.ts → reason MODEL_CAPACITY → the #2101 body-specific guard fires.
function bodySpecific400(model: string) {
  return new Response(
    JSON.stringify({
      detail: `The '${model}' model is not supported when using Codex with a ChatGPT account.`,
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
    const bare = String(modelStr).split("/").pop() || String(modelStr);
    return bodySpecific400(bare);
  };

  const result = await handleComboChat({
    body: { model: "test", messages: [{ role: "user", content: "hi" }] },
    combo: makeCombo(["codex/gpt-5.2", "codex/gpt-5.3-codex", "codex/gpt-5.4"]),
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
