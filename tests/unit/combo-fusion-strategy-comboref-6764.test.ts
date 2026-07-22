/**
 * #6764 — fusion strategy silently dropped `combo-ref` panel members.
 *
 * Every other combo strategy resolves a `{kind:"combo-ref", comboName}` panel
 * member through the shared execute-mode machinery (see
 * `open-sse/services/combo/runtimeUnits.ts::executeComboRefUnit`); the fusion
 * branch in `open-sse/services/combo.ts` only recognized plain `string` or
 * `{model: string}` entries, so a combo-ref member had neither field and was
 * filtered out (`.filter(Boolean)`) — no error, no warning. This suite proves
 * the fix: a combo-ref fusion panel member is dispatched as ONE black-box
 * panel voice (a recursive `handleComboChat` call into the referenced combo),
 * not dropped, not fanned out into the referenced combo's own targets.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-fusion-ref-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "combo-fusion-ref-test-secret";

const { handleComboChat } = await import("../../open-sse/services/combo.ts");

const noop = () => {};
const log = { info: noop, warn: noop, debug: noop, error: noop };

type Body = Record<string, unknown>;

function okResponse(content: string): Response {
  const body = JSON.stringify({ choices: [{ message: { role: "assistant", content } }] });
  return new Response(body, { status: 200, headers: { "Content-Type": "application/json" } });
}

function fusionCombo(models: unknown[], extra: Record<string, unknown> = {}) {
  return {
    name: "test-fusion-combo-ref",
    strategy: "fusion",
    models,
    config: extra,
  };
}

test("fusion: a combo-ref panel member is dispatched, not silently dropped", async () => {
  const seen: string[] = [];
  const handleSingleModel = async (_b: Body, m: string) => {
    seen.push(m);
    if (m === "p/judge") return okResponse("FINAL");
    return okResponse(`ans-${m}`);
  };
  const nestedPriority = {
    name: "nested-priority",
    strategy: "priority",
    models: ["openai/nested-a"],
    config: { maxRetries: 0, retryDelayMs: 0 },
  };
  const combo = fusionCombo(
    [{ kind: "combo-ref", comboName: "nested-priority" }, { model: "p/plain" }],
    { judgeModel: "p/judge" }
  );

  const res = await handleComboChat({
    body: { messages: [{ role: "user", content: "Q" }] },
    combo,
    handleSingleModel,
    log,
    settings: {},
    allCombos: [combo, nestedPriority],
  });

  assert.equal(res.status, 200);
  // Proves the combo-ref member was actually dispatched (its nested target
  // model reached handleSingleModel) instead of being silently filtered out.
  assert.ok(
    seen.includes("openai/nested-a"),
    `expected nested combo's target model to be dispatched, saw: ${seen.join(", ")}`
  );
  assert.ok(seen.includes("p/plain"), "plain panel member must still dispatch alongside combo-ref");
});

test("fusion: combo-ref-only panel resolves normally (not a 400 empty-panel error)", async () => {
  const seen: string[] = [];
  const handleSingleModel = async (_b: Body, m: string) => {
    seen.push(m);
    return okResponse(`ans-${m}`);
  };
  const nestedPriority = {
    name: "solo-nested",
    strategy: "priority",
    models: ["openai/solo-target"],
    config: { maxRetries: 0, retryDelayMs: 0 },
  };
  const combo = fusionCombo([{ kind: "combo-ref", comboName: "solo-nested" }]);

  const res = await handleComboChat({
    body: { messages: [{ role: "user", content: "Q" }] },
    combo,
    handleSingleModel,
    log,
    settings: {},
    allCombos: [combo, nestedPriority],
  });

  assert.notEqual(res.status, 400);
  assert.ok(seen.includes("openai/solo-target"));
});

test("fusion: self-referencing combo-ref fails that panel member gracefully, not an infinite loop", async () => {
  const seen: string[] = [];
  const handleSingleModel = async (_b: Body, m: string) => {
    seen.push(m);
    return okResponse(`ans-${m}`);
  };
  const combo = fusionCombo([
    { kind: "combo-ref", comboName: "test-fusion-combo-ref" },
    { model: "p/other" },
  ]);

  const res = await handleComboChat({
    body: { messages: [{ role: "user", content: "Q" }] },
    combo,
    handleSingleModel,
    log,
    settings: {},
    allCombos: [combo],
  });

  // Overall request still degrades gracefully because "p/other" survives.
  assert.equal(res.status, 200);
  assert.ok(seen.includes("p/other"));
  assert.ok(!seen.includes("test-fusion-combo-ref"));
});

test("fusion: combo-ref pointing at a nonexistent combo fails only that panel member", async () => {
  const seen: string[] = [];
  const handleSingleModel = async (_b: Body, m: string) => {
    seen.push(m);
    return okResponse(`ans-${m}`);
  };
  const combo = fusionCombo([
    { kind: "combo-ref", comboName: "does-not-exist" },
    { model: "p/other" },
  ]);

  const res = await handleComboChat({
    body: { messages: [{ role: "user", content: "Q" }] },
    combo,
    handleSingleModel,
    log,
    settings: {},
    allCombos: [combo],
  });

  assert.equal(res.status, 200);
  assert.ok(seen.includes("p/other"));
});

test("fusion: mixed plain string / auto-style / combo-ref panel members all dispatch together", async () => {
  const seen: string[] = [];
  const handleSingleModel = async (_b: Body, m: string) => {
    seen.push(m);
    return okResponse(`ans-${m}`);
  };
  const nestedPriority = {
    name: "mixed-nested",
    strategy: "priority",
    models: ["openai/mixed-target"],
    config: { maxRetries: 0, retryDelayMs: 0 },
  };
  const combo = fusionCombo([
    "auto/best-coding",
    { model: "p/direct" },
    { kind: "combo-ref", comboName: "mixed-nested" },
  ]);

  const res = await handleComboChat({
    body: { messages: [{ role: "user", content: "Q" }] },
    combo,
    handleSingleModel,
    log,
    settings: {},
    allCombos: [combo, nestedPriority],
  });

  assert.equal(res.status, 200);
  assert.ok(seen.includes("auto/best-coding"));
  assert.ok(seen.includes("p/direct"));
  assert.ok(seen.includes("openai/mixed-target"));
});
