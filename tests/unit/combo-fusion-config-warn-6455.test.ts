/**
 * Regression guard for #6455 — silent no-op when config.judgeModel is set on a
 * combo whose top-level strategy is anything other than "fusion".
 *
 * Before the fix, open-sse/services/combo.ts read `config.judgeModel` and
 * `config.fusionTuning` only inside the `if (strategy === "fusion")` branch,
 * so a persisted judgeModel on a priority/weighted/auto/round-robin combo was
 * silently ignored — the response reflected whichever priority/panel target
 * won, not a judge synthesis. Users observed this as their configured judge
 * (e.g. auto/claude-opus) being ignored in favor of the raw first target.
 *
 * The minimal-diff fix logs a warn immediately before the fusion branch, so
 * the misconfiguration is observable in logs without changing runtime behavior
 * for legitimate fusion combos.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-6455-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "combo-fusion-warn-test-secret";

const { handleComboChat } = await import("../../open-sse/services/combo.ts");

function okResponse(content: string): Response {
  const body = JSON.stringify({ choices: [{ message: { role: "assistant", content } }] });
  return new Response(body, { status: 200, headers: { "Content-Type": "application/json" } });
}

function makeLog() {
  const records: Array<{ level: string; scope: string; msg: string }> = [];
  const cap = (level: string) => (scope: string, msg: string) => {
    records.push({ level, scope, msg: String(msg) });
  };
  return {
    log: {
      info: cap("info"),
      warn: cap("warn"),
      debug: cap("debug"),
      error: cap("error"),
    },
    records,
  };
}

test("6455: warns when config.judgeModel is set but strategy is not fusion", async () => {
  const { log, records } = makeLog();
  const handleSingleModel = async () => okResponse("resp");

  const res = await handleComboChat({
    body: { messages: [{ role: "user", content: "hi" }] },
    combo: {
      name: "fusion-free",
      strategy: "priority",
      models: [{ model: "p/first" }, { model: "p/second" }],
      config: { judgeModel: "auto/claude-opus" },
    },
    handleSingleModel,
    log,
    settings: {},
    allCombos: [],
  });

  assert.equal(res.status, 200);
  const warns = records.filter(
    (r) => r.level === "warn" && r.scope === "COMBO" && r.msg.includes("judgeModel")
  );
  assert.equal(warns.length, 1, `expected exactly one judgeModel warn, got ${warns.length}`);
  assert.match(warns[0].msg, /priority/);
  assert.match(warns[0].msg, /fusion-free/);
  assert.match(warns[0].msg, /#6455/);
});

test("6455: warns when config.fusionTuning is set but strategy is not fusion", async () => {
  const { log, records } = makeLog();
  const handleSingleModel = async () => okResponse("resp");

  await handleComboChat({
    body: { messages: [{ role: "user", content: "hi" }] },
    combo: {
      name: "wrong-strategy",
      strategy: "weighted",
      models: [{ model: "p/a", weight: 1 }],
      config: { fusionTuning: { judgeTemperature: 0.2 } },
    },
    handleSingleModel,
    log,
    settings: {},
    allCombos: [],
  });

  const warns = records.filter(
    (r) => r.level === "warn" && r.scope === "COMBO" && r.msg.includes("fusionTuning")
  );
  assert.equal(warns.length, 1);
});

test("6455: does NOT warn when strategy is fusion (legitimate use)", async () => {
  const { log, records } = makeLog();
  const handleSingleModel = async () => okResponse("resp");

  await handleComboChat({
    body: { messages: [{ role: "user", content: "hi" }] },
    combo: {
      name: "real-fusion",
      strategy: "fusion",
      models: [{ model: "p/panelA" }, { model: "p/panelB" }],
      config: { judgeModel: "auto/claude-opus" },
    },
    handleSingleModel,
    log,
    settings: {},
    allCombos: [],
  });

  const warns = records.filter(
    (r) =>
      r.level === "warn" &&
      r.scope === "COMBO" &&
      (r.msg.includes("judgeModel") || r.msg.includes("fusionTuning"))
  );
  assert.equal(
    warns.length,
    0,
    `expected no judgeModel warn on legitimate fusion, got ${warns.length}`
  );
});

test("6455: does NOT warn when strategy is non-fusion and no judgeModel/fusionTuning set", async () => {
  const { log, records } = makeLog();
  const handleSingleModel = async () => okResponse("resp");

  await handleComboChat({
    body: { messages: [{ role: "user", content: "hi" }] },
    combo: {
      name: "plain-priority",
      strategy: "priority",
      models: [{ model: "p/only" }],
      config: {},
    },
    handleSingleModel,
    log,
    settings: {},
    allCombos: [],
  });

  const warns = records.filter(
    (r) =>
      r.level === "warn" &&
      r.scope === "COMBO" &&
      (r.msg.includes("judgeModel") || r.msg.includes("fusionTuning"))
  );
  assert.equal(warns.length, 0);
});
