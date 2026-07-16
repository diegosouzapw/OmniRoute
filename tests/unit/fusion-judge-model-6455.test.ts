/**
 * Regression guard for #6455 — fusion combo silently returning a panel member
 * instead of the configured judgeModel's synthesis.
 *
 * Root cause: handleFusionChat()'s "degrade gracefully" path (added for #6454)
 * returned the lone surviving panel answer directly whenever only one panel
 * member succeeded — regardless of whether an explicit `config.judgeModel`
 * was configured. With a 2-model panel and the default `minPanel: 2`, any
 * single flaky/rate-limited panelist forces this path on *every* request, so
 * the configured judge (e.g. "auto/claude-opus") was never invoked and the
 * client-visible `.model` field always reflected whichever panel member
 * happened to survive that request (case (a): judge genuinely not run).
 *
 * Fix: when an explicit judgeModel is configured, still route the lone
 * surviving answer through the judge for synthesis instead of returning it
 * raw. Only the truly implicit case (no judgeModel set, "judge" defaults to
 * panel[0]) keeps the cheap direct-answer shortcut.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-fusion-6455-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "fusion-6455-test-secret";

const { handleComboChat } = await import("../../open-sse/services/combo.ts");

type Body = Record<string, unknown>;

function jsonResponse(model: string, content: string): Response {
  const body = JSON.stringify({ model, choices: [{ message: { role: "assistant", content } }] });
  return new Response(body, { status: 200, headers: { "Content-Type": "application/json" } });
}

function errResponse(status = 500): Response {
  return new Response(JSON.stringify({ error: { message: "boom" } }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

const noop = () => {};
const log = { info: noop, warn: noop, debug: noop, error: noop };

function fusionCombo(models: string[], extra: Record<string, unknown> = {}) {
  return {
    name: "fusion-free",
    strategy: "fusion",
    models: models.map((m) => ({ model: m })),
    config: extra,
  };
}

test("6455: judge synthesizes even a single surviving panel answer when judgeModel is explicit", async () => {
  const calls: string[] = [];
  const handleSingleModel = async (_b: Body, m: string) => {
    calls.push(m);
    if (m === "gpt-5.5-panelist") return jsonResponse(m, "panel answer");
    if (m === "sonar-pro-panelist") return errResponse(503); // flaky panel member
    if (m === "auto/claude-opus") return jsonResponse("auto/claude-opus", "JUDGED FINAL");
    throw new Error(`unexpected model ${m}`);
  };

  const res = await handleComboChat({
    body: { messages: [{ role: "user", content: "hi" }] },
    combo: fusionCombo(["gpt-5.5-panelist", "sonar-pro-panelist"], {
      judgeModel: "auto/claude-opus",
    }),
    handleSingleModel,
    log,
    settings: {},
    allCombos: [],
  });

  // (a) The judge model MUST be invoked to synthesize, not skipped.
  assert.ok(
    calls.includes("auto/claude-opus"),
    `expected the configured judge to be invoked; calls were: ${calls.join(", ")}`
  );
  // The judge call is the last one — it consumes the panel answer(s).
  assert.equal(calls[calls.length - 1], "auto/claude-opus");

  // (b) The response body reflects the judge's synthesis, not the raw panelist.
  assert.equal(res.status, 200);
  const json = (await res.json()) as { model?: string; choices?: Array<Record<string, unknown>> };
  assert.equal(json.model, "auto/claude-opus");
  const message = json.choices?.[0]?.message as { content?: string } | undefined;
  assert.equal(message?.content, "JUDGED FINAL");
});

test("6455: panel still fans out to every member before degrading (no regression)", async () => {
  const calls: string[] = [];
  const handleSingleModel = async (_b: Body, m: string) => {
    calls.push(m);
    if (m === "p/a") return jsonResponse(m, "answer-a");
    if (m === "p/b") return jsonResponse(m, "answer-b");
    if (m === "p/judge") return jsonResponse("p/judge", "FUSED");
    throw new Error(`unexpected model ${m}`);
  };

  const res = await handleComboChat({
    body: { messages: [{ role: "user", content: "hi" }] },
    combo: fusionCombo(["p/a", "p/b"], { judgeModel: "p/judge" }),
    handleSingleModel,
    log,
    settings: {},
    allCombos: [],
  });

  assert.deepEqual(calls.slice(0, 2).sort(), ["p/a", "p/b"]);
  assert.equal(calls[2], "p/judge");
  assert.equal(res.status, 200);
  const json = (await res.json()) as { model?: string };
  assert.equal(json.model, "p/judge");
});

test("6455: implicit judge (no judgeModel configured) still short-circuits a lone survivor", async () => {
  const calls: string[] = [];
  const handleSingleModel = async (_b: Body, m: string) => {
    calls.push(m);
    if (m === "p/ok") return jsonResponse(m, "lone");
    return errResponse(500);
  };

  await handleComboChat({
    body: { messages: [{ role: "user", content: "hi" }] },
    combo: fusionCombo(["p/ok", "p/bad"]), // no judgeModel — defaults to panel[0]
    handleSingleModel,
    log,
    settings: {},
    allCombos: [],
  });

  // Panel fan-out calls p/ok and p/bad; the lone survivor is then answered
  // directly with the client's original body (not a judge-synthesis turn) —
  // panel[0] IS the implicit judge, so there is nothing to gain by routing
  // it through a separate synthesis call.
  assert.deepEqual(calls, ["p/ok", "p/bad", "p/ok"]);
});
