/**
 * Direct unit coverage for open-sse/services/combo/dispatchPrelude.ts — the
 * dispatch branches extracted out of handleComboChat (#3501 decomposition).
 *
 * The contract every one of these helpers shares is the fall-through protocol:
 * return a Response when the branch OWNS the request, return null to let
 * handleComboChat continue to the next branch and ultimately to the normal
 * target iteration loop. A helper that returned a Response where it used to
 * fall through (or vice versa) would silently bypass the whole combo strategy,
 * so the null cases are asserted as deliberately as the dispatching ones.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-prelude-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_API_KEY_SECRET = process.env.API_KEY_SECRET;
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "combo-prelude-test-secret";

const {
  normalizeNestedComboMode,
  tryFusionDispatch,
  tryPinnedModelDispatch,
  tryPipelineDispatch,
  tryRuntimeUnitDispatch,
} = await import("../../open-sse/services/combo/dispatchPrelude.ts");
const { resolveComboSetupConfig } = await import("../../open-sse/services/comboConfig.ts");
const { resolveComboRuntimeUnits } =
  await import("../../open-sse/services/combo/comboStructure.ts");
const { recordStickyWeightedSuccess } = await import("../../open-sse/services/combo/rrState.ts");
const { createProviderConnection } = await import("../../src/lib/db/providers.ts");
const { invalidateDbCache } = await import("../../src/lib/db/readCache.ts");
const core = await import("../../src/lib/db/core.ts");

/**
 * Provider used by the honored-pin tests. It gets ONE active, healthy
 * connection so `isPinnedModelDurablyUnhealthy` returns false and the pin is
 * actually dispatched. Deliberately NOT "p" — the durably-unhealthy test below
 * depends on provider "p" having no connections at all.
 */
const HEALTHY_PROVIDER = "healthypin";
let healthySeeded = false;

async function seedHealthyPinProvider() {
  if (healthySeeded) return;
  await createProviderConnection({
    provider: HEALTHY_PROVIDER,
    authType: "api-key",
    name: "healthy-pin-account",
    isActive: true,
    apiKey: "sk-test-healthy-pin",
  });
  invalidateDbCache();
  healthySeeded = true;
}

type ComboInput = Parameters<typeof resolveComboSetupConfig>[0];

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
    log: { info: cap("info"), warn: cap("warn"), debug: cap("debug"), error: cap("error") },
    records,
  };
}

function setup(combo: ComboInput) {
  const { log, records } = makeLog();
  return {
    log,
    records,
    combo,
    config: resolveComboSetupConfig(combo, {}),
    body: { messages: [{ role: "user", content: "hi" }] } as Record<string, unknown>,
  };
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  if (ORIGINAL_API_KEY_SECRET === undefined) delete process.env.API_KEY_SECRET;
  else process.env.API_KEY_SECRET = ORIGINAL_API_KEY_SECRET;
});

test("normalizeNestedComboMode: only the literal 'execute' opts into execute mode", () => {
  assert.equal(normalizeNestedComboMode("execute"), "execute");
  assert.equal(normalizeNestedComboMode("flatten"), "flatten");
  assert.equal(normalizeNestedComboMode(undefined), "flatten");
  assert.equal(normalizeNestedComboMode(null), "flatten");
  assert.equal(normalizeNestedComboMode("Execute"), "flatten");
  assert.equal(normalizeNestedComboMode(true), "flatten");
});

test("tryPipelineDispatch: falls through (null) for every non-pipeline strategy", async () => {
  for (const strategy of ["priority", "weighted", "round-robin", "auto", "fusion"]) {
    const ctx = setup({ name: "c", strategy, models: [{ model: "p/a" }], config: {} });
    const res = await tryPipelineDispatch({
      body: ctx.body,
      combo: ctx.combo,
      config: ctx.config,
      strategy,
      handleSingleModelWithTimeout: async () => okResponse("nope"),
      log: ctx.log,
    });
    assert.equal(res, null, `strategy ${strategy} must fall through`);
  }
});

test("tryPipelineDispatch: threads combo.models as ordered steps for the pipeline strategy", async () => {
  const ctx = setup({
    name: "chain",
    strategy: "pipeline",
    models: [{ model: "p/first" }, { model: "p/second", prompt: "refine" }],
    config: {},
  });
  const seen: string[] = [];
  const res = await tryPipelineDispatch({
    body: ctx.body,
    combo: ctx.combo,
    config: ctx.config,
    strategy: "pipeline",
    handleSingleModelWithTimeout: async (_body, modelStr) => {
      seen.push(modelStr);
      return okResponse(`out:${modelStr}`);
    },
    log: ctx.log,
  });
  assert.ok(res, "pipeline strategy must own the request");
  assert.equal(res.status, 200);
  assert.deepEqual(seen, ["p/first", "p/second"]);
});

test("tryFusionDispatch: falls through for non-fusion strategies but still emits the #6455 warn", async () => {
  const ctx = setup({
    name: "fusion-free",
    strategy: "priority",
    models: [{ model: "p/a" }],
    config: { judgeModel: "auto/claude-opus" },
  });
  const res = await tryFusionDispatch({
    body: ctx.body,
    combo: ctx.combo,
    cfg: ctx.config as unknown as Record<string, unknown>,
    config: ctx.config,
    strategy: "priority",
    allCombos: [],
    handleSingleModel: async () => okResponse("x"),
    handleSingleModelWithTimeout: async () => okResponse("x"),
    log: ctx.log,
    runCombo: async () => okResponse("recursed"),
  });
  assert.equal(res, null, "non-fusion strategy must fall through to the target loop");
  const warns = ctx.records.filter((r) => r.level === "warn" && r.msg.includes("judgeModel"));
  assert.equal(warns.length, 1);
  assert.match(warns[0].msg, /#6455/);
});

test("tryFusionDispatch: silent fall-through when a non-fusion combo sets no fusion keys", async () => {
  const ctx = setup({
    name: "plain",
    strategy: "priority",
    models: [{ model: "p/a" }],
    config: {},
  });
  const res = await tryFusionDispatch({
    body: ctx.body,
    combo: ctx.combo,
    cfg: ctx.config as unknown as Record<string, unknown>,
    config: ctx.config,
    strategy: "priority",
    allCombos: [],
    handleSingleModel: async () => okResponse("x"),
    handleSingleModelWithTimeout: async () => okResponse("x"),
    log: ctx.log,
    runCombo: async () => okResponse("recursed"),
  });
  assert.equal(res, null);
  assert.equal(
    ctx.records.filter((r) => r.msg.includes("judgeModel") || r.msg.includes("fusionTuning"))
      .length,
    0
  );
});

test("tryFusionDispatch: owns the request and synthesizes for the fusion strategy", async () => {
  const ctx = setup({
    name: "real-fusion",
    strategy: "fusion",
    models: [{ model: "p/panelA" }, { model: "p/panelB" }],
    config: { judgeModel: "p/judge" },
  });
  const dispatched: string[] = [];
  const res = await tryFusionDispatch({
    body: ctx.body,
    combo: ctx.combo,
    cfg: ctx.config as unknown as Record<string, unknown>,
    config: ctx.config,
    strategy: "fusion",
    allCombos: [],
    handleSingleModel: async () => okResponse("x"),
    handleSingleModelWithTimeout: async (_body, modelStr) => {
      dispatched.push(modelStr);
      return okResponse(`panel:${modelStr}`);
    },
    log: ctx.log,
    runCombo: async () => okResponse("recursed"),
  });
  assert.ok(res, "fusion strategy must own the request");
  assert.ok(dispatched.includes("p/panelA") && dispatched.includes("p/panelB"));
});

test("tryRuntimeUnitDispatch: falls through when the combo has no executable combo-ref", async () => {
  const ctx = setup({
    name: "flat",
    strategy: "priority",
    models: [{ model: "p/a" }, { model: "p/b" }],
    config: { nestedComboMode: "execute" },
  });
  const res = await tryRuntimeUnitDispatch({
    body: ctx.body,
    combo: ctx.combo,
    config: ctx.config,
    strategy: "priority",
    allCombos: [ctx.combo],
    handleSingleModel: async () => okResponse("x"),
    handleSingleModelWithTimeout: async () => okResponse("x"),
    log: ctx.log,
    settings: {},
    runCombo: async () => okResponse("recursed"),
  });
  assert.equal(res, null);
});

const LEAF_COMBO: ComboInput = {
  name: "leaf",
  strategy: "priority",
  models: [{ model: "p/leaf" }],
  config: {},
};
const COMBO_REF_STEP = { kind: "combo-ref", comboName: "leaf" };

/**
 * Positive control for the two fall-through assertions below: with the SAME
 * combo-ref fixture, execute mode + a simple strategy really does reach
 * executeRuntimeUnitCombo. Without this, a malformed combo-ref fixture would
 * make the null assertions pass vacuously.
 */
test("tryRuntimeUnitDispatch: owns the request in execute mode with a simple strategy", async () => {
  const ctx = setup({
    name: "parent",
    strategy: "priority",
    models: [COMBO_REF_STEP],
    config: { nestedComboMode: "execute" },
  });
  let recursedInto: string | null = null;
  const res = await tryRuntimeUnitDispatch({
    body: ctx.body,
    combo: ctx.combo,
    config: ctx.config,
    strategy: "priority",
    allCombos: [ctx.combo, LEAF_COMBO],
    handleSingleModel: async () => okResponse("x"),
    handleSingleModelWithTimeout: async () => okResponse("x"),
    log: ctx.log,
    settings: {},
    runCombo: async (options) => {
      recursedInto = options.combo.name;
      return okResponse("recursed");
    },
  });
  assert.ok(res, "execute mode + priority must dispatch the combo-ref as a black-box unit");
  assert.equal(recursedInto, "leaf", "the referenced combo must be executed recursively");
});

test("tryRuntimeUnitDispatch: falls through in flatten mode even when a combo-ref is present", async () => {
  const ctx = setup({
    name: "parent",
    strategy: "priority",
    models: [COMBO_REF_STEP],
    // no nestedComboMode ⇒ defaults to "flatten"
    config: {},
  });
  let recursed = false;
  const res = await tryRuntimeUnitDispatch({
    body: ctx.body,
    combo: ctx.combo,
    config: ctx.config,
    strategy: "priority",
    allCombos: [ctx.combo, LEAF_COMBO],
    handleSingleModel: async () => okResponse("x"),
    handleSingleModelWithTimeout: async () => okResponse("x"),
    log: ctx.log,
    settings: {},
    runCombo: async () => {
      recursed = true;
      return okResponse("recursed");
    },
  });
  assert.equal(res, null, "flatten mode must leave combo-refs to the normal target machinery");
  assert.equal(recursed, false);
});

test("tryRuntimeUnitDispatch: falls through for strategies outside the simple-execute set", async () => {
  const ctx = setup({
    name: "parent",
    strategy: "auto",
    models: [COMBO_REF_STEP],
    config: { nestedComboMode: "execute" },
  });
  let recursed = false;
  const res = await tryRuntimeUnitDispatch({
    body: ctx.body,
    combo: ctx.combo,
    config: ctx.config,
    strategy: "auto",
    allCombos: [ctx.combo, LEAF_COMBO],
    handleSingleModel: async () => okResponse("x"),
    handleSingleModelWithTimeout: async () => okResponse("x"),
    log: ctx.log,
    settings: {},
    runCombo: async () => {
      recursed = true;
      return okResponse("recursed");
    },
  });
  assert.equal(res, null, "'auto' needs the full target machinery, not runtime-unit dispatch");
  assert.equal(recursed, false);
});

test("tryPinnedModelDispatch: drops a stale pin (not in combo) and falls through with a warn", async () => {
  const ctx = setup({
    name: "pinned-combo",
    strategy: "priority",
    models: [{ model: "p/live" }],
    config: {},
  });
  let dispatched = false;
  const res = await tryPinnedModelDispatch({
    body: ctx.body,
    combo: ctx.combo,
    pinnedModel: "p/removed-last-week",
    allCombos: [ctx.combo],
    config: ctx.config,
    clientRequestedStream: false,
    handleSingleModelWithTimeout: async () => {
      dispatched = true;
      return okResponse("should not happen");
    },
    log: ctx.log,
  });
  assert.equal(res, null, "a stale pin must fall through to the strategy");
  assert.equal(dispatched, false, "a stale pin must never be dispatched");
  const warns = ctx.records.filter((r) => r.level === "warn" && r.msg.includes("Stale"));
  assert.equal(warns.length, 1);
  assert.match(warns[0].msg, /p\/removed-last-week/);
  assert.match(warns[0].msg, /pinned-combo/);
});

test("tryPinnedModelDispatch: drops the pin when every connection for its provider is down", async () => {
  const ctx = setup({
    name: "pinned-combo",
    strategy: "priority",
    models: [{ model: "p/live" }],
    config: {},
  });
  let dispatched = false;
  // allCombos empty ⇒ not authoritative ⇒ the in-combo check is skipped and the
  // health gate decides. No provider connections exist in this temp DB, so the
  // pin is durably unhealthy and must be dropped rather than pounded.
  const res = await tryPinnedModelDispatch({
    body: ctx.body,
    combo: ctx.combo,
    pinnedModel: "p/live",
    allCombos: [],
    config: ctx.config,
    clientRequestedStream: false,
    handleSingleModelWithTimeout: async () => {
      dispatched = true;
      return okResponse("should not happen");
    },
    log: ctx.log,
  });
  assert.equal(res, null);
  assert.equal(dispatched, false);
  const warns = ctx.records.filter(
    (r) => r.level === "warn" && r.msg.includes("durably unhealthy")
  );
  assert.equal(warns.length, 1);
});

/* ------------------------------------------------------------------------- *
 * Honored-pin path.
 *
 * Everything above only exercises pins that get DROPPED. The success path —
 * dispatch, quality gate, transient-status failover, throw handling — is the
 * logic the 2026-06-21 / 2026-06-22 incident comments call load-bearing, so it
 * needs its own coverage: with only the drop tests, deleting the dispatch call
 * outright still left the suite green.
 * ------------------------------------------------------------------------- */

function pinCtx() {
  return setup({
    name: "pinned-combo",
    strategy: "priority",
    models: [{ model: `${HEALTHY_PROVIDER}/live` }],
    config: {},
  });
}

async function dispatchHealthyPin(
  ctx: ReturnType<typeof pinCtx>,
  handler: () => Promise<Response>
) {
  await seedHealthyPinProvider();
  const dispatched: string[] = [];
  const res = await tryPinnedModelDispatch({
    body: ctx.body,
    combo: ctx.combo,
    pinnedModel: `${HEALTHY_PROVIDER}/live`,
    // Empty ⇒ not authoritative ⇒ the in-combo check is skipped, so the health
    // gate alone decides. The seeded connection makes it healthy.
    allCombos: [],
    config: ctx.config,
    clientRequestedStream: false,
    handleSingleModelWithTimeout: async (_body, modelStr) => {
      dispatched.push(modelStr);
      return handler();
    },
    log: ctx.log,
  });
  return { res, dispatched };
}

test("tryPinnedModelDispatch: serves the pinned response when the pin is healthy and the response is good", async () => {
  const ctx = pinCtx();
  const good = okResponse("pinned answer");
  const { res, dispatched } = await dispatchHealthyPin(ctx, async () => good);
  assert.equal(res, good, "the pinned response must be returned as-is, bypassing the strategy");
  assert.deepEqual(dispatched, [`${HEALTHY_PROVIDER}/live`]);
  assert.ok(
    ctx.records.some((r) => r.level === "info" && r.msg.includes("Bypassing strategy")),
    "honoring a pin must be observable in the log"
  );
});

test("tryPinnedModelDispatch: fails over when the pinned model returns a transient status", async () => {
  for (const status of [408, 429, 500, 502, 503, 504]) {
    const ctx = pinCtx();
    const { res } = await dispatchHealthyPin(
      ctx,
      async () => new Response("upstream busy", { status })
    );
    assert.equal(res, null, `status ${status} must fall through to the combo strategy`);
    assert.ok(
      ctx.records.some((r) => r.level === "warn" && r.msg.includes(`failed (${status})`)),
      `status ${status} must log the failover`
    );
  }
});

test("tryPinnedModelDispatch: returns a non-transient error as-is instead of failing over", async () => {
  const ctx = pinCtx();
  const badRequest = new Response("bad request", { status: 400 });
  const { res } = await dispatchHealthyPin(ctx, async () => badRequest);
  assert.equal(res, badRequest, "a 400 is the client's problem — retrying siblings cannot fix it");
});

test("tryPinnedModelDispatch: fails over on a 200 that fails the quality check", async () => {
  const ctx = pinCtx();
  const { res } = await dispatchHealthyPin(ctx, async () => okResponse(""));
  assert.equal(res, null, "an empty 200 must fall through, not be served");
  assert.ok(
    ctx.records.some((r) => r.level === "warn" && r.msg.includes("failed quality check")),
    "the quality rejection must be logged"
  );
});

test("tryPinnedModelDispatch: falls through when the pinned dispatch throws", async () => {
  const ctx = pinCtx();
  const { res } = await dispatchHealthyPin(ctx, async () => {
    throw new Error("connection reset");
  });
  assert.equal(res, null);
  assert.ok(
    ctx.records.some((r) => r.level === "warn" && r.msg.includes("threw error")),
    "a throwing pin must be logged and recovered from, not propagated"
  );
});

/* ------------------------------------------------------------------------- *
 * Runtime-unit strategy ordering.
 *
 * The control test above only ever passes `priority`, which is a no-op through
 * orderRuntimeUnits — so the round-robin and weighted branches, and the sticky
 * recording that follows a successful dispatch, had no assertions at all.
 * ------------------------------------------------------------------------- */

const LEAF_A: ComboInput = {
  name: "leafA",
  strategy: "priority",
  models: [{ model: "p/a" }],
  config: {},
};
const LEAF_B: ComboInput = {
  name: "leafB",
  strategy: "priority",
  models: [{ model: "p/b" }],
  config: {},
};

function twoRefCombo(name: string, strategy: string, config: Record<string, unknown>): ComboInput {
  return {
    name,
    strategy,
    models: [
      { kind: "combo-ref", comboName: "leafA" },
      { kind: "combo-ref", comboName: "leafB" },
    ],
    config: { nestedComboMode: "execute", ...config },
  };
}

async function dispatchUnits(ctx: ReturnType<typeof setup>, strategy: string) {
  const recursedInto: string[] = [];
  const res = await tryRuntimeUnitDispatch({
    body: ctx.body,
    combo: ctx.combo,
    config: ctx.config,
    strategy,
    allCombos: [ctx.combo, LEAF_A, LEAF_B],
    handleSingleModel: async () => okResponse("raw"),
    handleSingleModelWithTimeout: async () => okResponse("wrapped"),
    log: ctx.log,
    settings: {},
    runCombo: async (options) => {
      recursedInto.push(options.combo.name);
      return okResponse(`ran:${options.combo.name}`);
    },
  });
  return { res, recursedInto };
}

test("tryRuntimeUnitDispatch: round-robin rotates across successive dispatches", async () => {
  const combo = twoRefCombo("rr-rotate", "round-robin", {});
  const first = await dispatchUnits(setup(combo), "round-robin");
  const second = await dispatchUnits(setup(combo), "round-robin");
  assert.ok(first.res && second.res);
  assert.equal(first.recursedInto.length, 1);
  assert.equal(second.recursedInto.length, 1);
  assert.notEqual(
    first.recursedInto[0],
    second.recursedInto[0],
    "round-robin must advance to the other unit on the second dispatch, not re-serve the first"
  );
  assert.deepEqual(
    [first.recursedInto[0], second.recursedInto[0]].sort(),
    ["leafA", "leafB"],
    "both units must be reachable through the rotation"
  );
});

test("tryRuntimeUnitDispatch: weighted honors a previously recorded sticky unit", async () => {
  const combo = twoRefCombo("weighted-sticky", "weighted", { stickyWeightedLimit: 5 });
  const ctx = setup(combo);
  const units = resolveComboRuntimeUnits(ctx.combo, [ctx.combo, LEAF_A, LEAF_B], "execute", 3);
  const second = units.find((u) => u.kind === "combo-ref" && u.comboName === "leafB");
  assert.ok(second, "fixture must resolve two combo-ref units");

  // Pin leafB, which is NOT the natural first unit — so ordering-first is the
  // only way it can win, and a stripped sticky branch would serve leafA.
  recordStickyWeightedSuccess(combo.name, second.executionKey, 5);
  const { res, recursedInto } = await dispatchUnits(ctx, "weighted");
  assert.ok(res);
  assert.deepEqual(recursedInto, ["leafB"], "the sticky unit must be dispatched first");
});

test("tryRuntimeUnitDispatch: round-robin sticky batch runs out and then rotates", async () => {
  // With stickyRoundRobinLimit=2 the rotation holds the winning unit for TWO
  // dispatches, then the batch closes and the third moves on. Both halves of
  // that come from recordRuntimeUnitStickySuccess: it counts the successes and,
  // on hitting the limit, advances rrCounters and clears the pin.
  //
  // Asserting only "same unit twice" would be vacuous — with the helper stubbed
  // out nothing ever advances the counter either, so the unit also never
  // changes. The rotation on the THIRD call is what distinguishes the two.
  const combo = twoRefCombo("rr-sticky", "round-robin", { stickyRoundRobinLimit: 2 });
  const served: string[] = [];
  for (let i = 0; i < 3; i++) {
    const { res, recursedInto } = await dispatchUnits(setup(combo), "round-robin");
    assert.ok(res, `dispatch ${i + 1} must own the request`);
    served.push(recursedInto[0]);
  }
  assert.equal(served[0], served[1], "the sticky batch must re-serve the same unit");
  assert.notEqual(served[2], served[1], "once the batch is exhausted the rotation must move on");
});
