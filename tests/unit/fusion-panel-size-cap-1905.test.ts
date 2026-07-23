/**
 * Regression test for upstream issue decolua/9router#1905.
 *
 * Reported symptom: a fusion combo populated with ~70+ panel models fans every
 * member out in parallel (`open-sse/services/fusion.ts::handleFusionChat` →
 * `Promise.all`-style fan-out via `collectPanel`), buffering each model's full
 * response text in memory at once. With the runtime heap capped at 1024MB
 * (Dockerfile `OMNIROUTE_MEMORY_MB`), a large panel with sizable concurrent
 * responses can exceed the heap ceiling and crash the whole container with
 * "FATAL ERROR: Ineffective mark-compacts near heap limit — JavaScript heap
 * out of memory" instead of failing one request gracefully.
 *
 * Fix: `handleFusionChat` now rejects panels above a configurable hard cap
 * (`FUSION_DEFAULTS.maxPanel`, overridable via `fusionTuning.maxPanel`) with a
 * clean 400 *before* fan-out, rather than let an unbounded panel size drive
 * the process into an OOM crash.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { handleFusionChat, FUSION_DEFAULTS } from "../../open-sse/services/fusion.ts";

const noop = () => {};
const log = { info: noop, warn: noop, debug: noop, error: noop };

type Body = Record<string, unknown>;

test("fusion #1905: an oversized panel (73 models) is rejected before fan-out instead of OOM-crashing", async () => {
  let calls = 0;
  const handleSingleModel = (_b: Body, _m: string) => {
    calls++;
    const body = JSON.stringify({
      choices: [{ message: { role: "assistant", content: "x".repeat(1000) } }],
    });
    return Promise.resolve(
      new Response(body, { status: 200, headers: { "Content-Type": "application/json" } })
    );
  };

  const panel = Array.from({ length: 73 }, (_, i) => `provider/model-${i}`);

  const res = await handleFusionChat({
    body: { messages: [{ role: "user", content: "hi" }] },
    models: panel,
    handleSingleModel,
    log,
    comboName: "auto",
  });

  assert.equal(res.status, 400);
  // Must reject BEFORE fan-out — no per-model calls should have happened.
  assert.equal(calls, 0, "panel fan-out must not start once the size cap is exceeded");

  const json = (await res.json()) as { error?: { message?: string } };
  assert.match(json.error?.message ?? "", /panel/i);
});

test("fusion #1905: a panel at or under the cap still fans out normally", async () => {
  const handleSingleModel = (_b: Body, _m: string) => {
    const body = JSON.stringify({
      choices: [{ message: { role: "assistant", content: "ok" } }],
    });
    return Promise.resolve(
      new Response(body, { status: 200, headers: { "Content-Type": "application/json" } })
    );
  };

  const panel = Array.from({ length: FUSION_DEFAULTS.maxPanel }, (_, i) => `provider/model-${i}`);

  const res = await handleFusionChat({
    body: { messages: [{ role: "user", content: "hi" }] },
    models: panel,
    handleSingleModel,
    log,
    comboName: "auto",
  });

  assert.equal(res.status, 200);
});
