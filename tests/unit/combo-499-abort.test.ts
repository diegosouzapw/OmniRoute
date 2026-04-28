import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-499-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "combo-499-test-secret";

const { handleComboChat } = await import("../../open-sse/services/combo.ts");

const noop = () => {};
const log = { info: noop, warn: noop, debug: noop, error: noop };

function makeCombo(strategy = "priority", models = ["a/model-1", "b/model-2", "c/model-3"]) {
  return {
    name: "test-combo-499",
    strategy,
    models: models.map((m) => ({ model: m })),
  };
}

test("combo loop stops immediately when handleSingleModel returns 499 (client disconnect)", async () => {
  let callCount = 0;
  const handleSingleModel = async () => {
    callCount++;
    return new Response("Client disconnected", { status: 499 });
  };

  const result = await handleComboChat({
    body: { model: "test", messages: [{ role: "user", content: "hi" }] },
    combo: makeCombo("priority"),
    handleSingleModel,
    log,
    settings: {},
    allCombos: [],
  });

  // Should stop after the FIRST model — no fallback to model-2 or model-3
  assert.equal(callCount, 1, "should only call handleSingleModel once on 499");
  assert.equal(result.status, 499, "should return 499 status");
});

test("combo loop stops on signal.aborted before trying any model", async () => {
  let callCount = 0;
  const handleSingleModel = async () => {
    callCount++;
    return new Response("ok", { status: 200 });
  };

  const ac = new AbortController();
  ac.abort(); // Pre-abort

  const result = await handleComboChat({
    body: { model: "test", messages: [{ role: "user", content: "hi" }] },
    combo: makeCombo("priority"),
    handleSingleModel,
    log,
    settings: {},
    allCombos: [],
    signal: ac.signal,
  });

  assert.equal(callCount, 0, "should NOT call handleSingleModel when signal is already aborted");
  assert.equal(result.status, 499);
});

test("combo loop with 3 models: 499 on model-1 prevents trying model-2 and model-3", async () => {
  const modelsCalled = [];
  const handleSingleModel = async (_body, modelStr) => {
    modelsCalled.push(modelStr);
    return new Response("Client disconnected", { status: 499 });
  };

  const result = await handleComboChat({
    body: { model: "test", messages: [{ role: "user", content: "hi" }] },
    combo: makeCombo("priority", ["provider-a/fast", "provider-b/medium", "provider-c/large"]),
    handleSingleModel,
    log,
    settings: {},
    allCombos: [],
  });

  assert.equal(modelsCalled.length, 1);
  assert.ok(
    modelsCalled[0].includes("fast"),
    `Expected first model to contain 'fast', got '${modelsCalled[0]}'`
  );
  assert.equal(result.status, 499);
});

test("combo loop does NOT stop on 502 (transient) — tries more than one model", async () => {
  let callCount = 0;
  const handleSingleModel = async () => {
    callCount++;
    return new Response("Bad Gateway", { status: 502 });
  };

  const result = await handleComboChat({
    body: { model: "test", messages: [{ role: "user", content: "hi" }] },
    combo: makeCombo("priority", ["a/m1", "b/m2", "c/m3"]),
    handleSingleModel,
    log,
    settings: {},
    allCombos: [],
  });

  // Key assertion: unlike 499, a 502 should try more than 1 model
  assert.ok(callCount >= 2, `502 should attempt multiple models, but only tried ${callCount}`);
  assert.equal(result.status, 502, "should still return 502 if all models fail");
});

test("signal abort during fallback wait interrupts immediately", async () => {
  const ac = new AbortController();
  let callCount = 0;

  const handleSingleModel = async () => {
    callCount++;
    if (callCount === 1) {
      // First call returns 502 (which triggers fallback wait)
      return new Response("Bad Gateway", { status: 502 });
    }
    return new Response("ok", { status: 200 });
  };

  // Abort 50ms after start — should interrupt any wait
  const timer = setTimeout(() => ac.abort(), 50);

  const startMs = Date.now();
  const result = await handleComboChat({
    body: { model: "test", messages: [{ role: "user", content: "hi" }] },
    combo: makeCombo("priority", ["a/m1", "b/m2"]),
    handleSingleModel,
    log,
    settings: { retryDelayMs: 5000 }, // 5s delay would normally be slow
    allCombos: [],
    signal: ac.signal,
  });

  clearTimeout(timer);
  const elapsed = Date.now() - startMs;

  // Should complete in well under 5s — the abort interrupted the fallback wait
  assert.ok(elapsed < 2000, `Expected fast abort, but took ${elapsed}ms`);
  assert.equal(result.status, 499, "should return 499 after abort during wait");
});
