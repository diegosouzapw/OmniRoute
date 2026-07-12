/**
 * Regression test: with NO explicit judgeModel, the synthesis judge must be a
 * SURVIVING panel member — never a panel[0] that failed fan-out.
 *
 * Bug: `handleFusionChat` fixed the default judge to `panel[0]` BEFORE fan-out
 * and never reassigned it. When panel[0] timed out / was rate-limited / dropped
 * as a straggler it landed in `failures`, not `answers` — yet the multi-answer
 * synthesis path still dispatched `handleSingleModel(judgeBody, panel[0])`,
 * handing synthesis to a dead model. The whole fusion request then errored even
 * though a quorum of OTHER panel members succeeded — exactly the failure mode
 * fusion exists to tolerate.
 *
 * Fix: when no explicit judge is configured, resolve the effective judge from a
 * survivor (prefer panel[0] only when it survived, else the first survivor). An
 * explicitly configured judge is still honored unchanged.
 */

import assert from "node:assert/strict";
import test from "node:test";

import { handleFusionChat } from "../../open-sse/services/fusion.ts";

const noop = () => {};
const log = { info: noop, warn: noop, debug: noop, error: noop };

type Body = Record<string, unknown>;

function okResponse(content: string): Promise<Response> {
  const body = JSON.stringify({
    choices: [{ message: { role: "assistant", content } }],
  });
  return Promise.resolve(
    new Response(body, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  );
}

function errResponse(status: number): Promise<Response> {
  const body = JSON.stringify({ error: { message: "boom" } });
  return Promise.resolve(
    new Response(body, {
      status,
      headers: { "Content-Type": "application/json" },
    })
  );
}

const PANEL = ["prov/model-a", "prov/model-b", "prov/model-c"];

test("fusion judge-survivor: no explicit judge + panel[0] fails fan-out → synthesis uses a surviving member, not the dead panel[0]", async () => {
  const seen: string[] = [];
  const handleSingleModel = (_b: Body, m: string) => {
    seen.push(m);
    // panel[0] (model-a) fails fan-out; B & C succeed.
    if (m === "prov/model-a") return errResponse(429);
    return okResponse(`ans-${m}`);
  };

  const res = await handleFusionChat({
    body: { messages: [{ role: "user", content: "hi" }] },
    models: PANEL,
    handleSingleModel,
    log,
    // NO explicit judge — this is the default-judge path that was broken.
    tuning: { minPanel: 1, stragglerGraceMs: 4000, panelHardTimeoutMs: 60000 },
  });

  assert.notEqual(
    res.status,
    503,
    "a healthy quorum (B, C) must not error just because panel[0] died"
  );
  const body = (await res.clone().json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  assert.ok(
    (body.choices?.[0]?.message?.content ?? "").length > 0,
    "must carry a real synthesized answer"
  );

  // The synthesis dispatch is the LAST handleSingleModel call.
  const synthesisJudge = seen[seen.length - 1];
  assert.notEqual(synthesisJudge, "prov/model-a", "judge must NOT be the failed panel[0]");
  assert.ok(
    synthesisJudge === "prov/model-b" || synthesisJudge === "prov/model-c",
    `judge must be a survivor (B or C), got ${synthesisJudge}`
  );
});

test("fusion judge-survivor: no explicit judge + panel[0] survives → panel[0] is still chosen (existing-good case unchanged)", async () => {
  const seen: string[] = [];
  const handleSingleModel = (_b: Body, m: string) => {
    seen.push(m);
    // panel[0] (model-a) survives; model-b fails.
    if (m === "prov/model-b") return errResponse(429);
    return okResponse(`ans-${m}`);
  };

  const res = await handleFusionChat({
    body: { messages: [{ role: "user", content: "hi" }] },
    models: PANEL,
    handleSingleModel,
    log,
    tuning: { minPanel: 1, stragglerGraceMs: 4000, panelHardTimeoutMs: 60000 },
  });

  assert.notEqual(res.status, 503);
  assert.equal(
    seen[seen.length - 1],
    "prov/model-a",
    "when panel[0] survives it remains the default judge"
  );
});

test("fusion judge-survivor: explicit judge is honored unchanged even if it failed fan-out", async () => {
  const seen: string[] = [];
  const handleSingleModel = (_b: Body, m: string) => {
    seen.push(m);
    // The configured judge (model-a) fails fan-out; B & C succeed.
    if (m === "prov/model-a") return errResponse(429);
    return okResponse(`ans-${m}`);
  };

  const res = await handleFusionChat({
    body: { messages: [{ role: "user", content: "hi" }] },
    models: PANEL,
    handleSingleModel,
    log,
    judgeModel: "prov/model-a", // explicit — operator intent is honored as-is.
    tuning: { minPanel: 1, stragglerGraceMs: 4000, panelHardTimeoutMs: 60000 },
  });

  assert.notEqual(res.status, 503);
  assert.equal(
    seen[seen.length - 1],
    "prov/model-a",
    "an explicitly configured judge is dispatched unchanged (operator's choice)"
  );
});
