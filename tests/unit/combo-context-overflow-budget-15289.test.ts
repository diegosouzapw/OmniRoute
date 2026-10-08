import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-15289-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "combo-15289-test-secret";

const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const { isContextOverflowDominant } =
  await import("../../open-sse/services/combo/budgetExhaustion.ts");
const noop = () => {};
const log = { info: noop, warn: noop, debug: noop, error: noop };

function ctxOverflow(model: string) {
  return new Response(
    JSON.stringify({
      error: {
        code: "context_length_exceeded",
        message: `Input exceeds the context window for ${model}: estimated 137000 input tokens, limit 128000.`,
      },
    }),
    { status: 400, headers: { "Content-Type": "application/json" } }
  );
}

test("#15289 heterogeneous pool all rejecting oversized input surfaces context error, not opaque retry-limit", async () => {
  const models = Array.from({ length: 40 }, (_, i) => `prov${i}/model-${i}`);
  const called: string[] = [];
  const result = await handleComboChat({
    body: { model: "x", messages: [{ role: "user", content: "hi" }] },
    combo: { name: "c15289", strategy: "priority", models: models.map((m) => ({ model: m })) },
    handleSingleModel: async (_b: unknown, m: string) => {
      called.push(m);
      return ctxOverflow(m);
    },
    log,
    settings: {},
    allCombos: [],
  });
  const body = await result.clone().json();
  assert.equal(result.status, 400);
  assert.equal(body.error.code, "context_length_exceeded");
  assert.notEqual(body.error.message, "Maximum combo retry limit reached");
  assert.match(body.error.message, /context window/);
  assert.ok(body.diagnostics, "diagnostics trace is still attached");
});

test("#15289 isContextOverflowDominant requires overflow to dominate", () => {
  const ov = { status: 400, error: "Input exceeds the context window" };
  const other = { status: 503, error: "upstream down" };
  assert.equal(
    isContextOverflowDominant("Input exceeds the context window", [ov, ov, other]),
    true
  );
  assert.equal(
    isContextOverflowDominant("Input exceeds the context window", [ov, other, other]),
    false
  );
  assert.equal(isContextOverflowDominant("upstream down", [ov, ov]), false);
  assert.equal(isContextOverflowDominant("", []), false);
});
