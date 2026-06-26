/**
 * Fusion combo strategy — parallel panel + judge synthesis.
 *
 * Ported from upstream decolua/9router (Daniil Schovkunov). Adds Fusion as the 16th
 * combo strategy: fan the prompt out to every panel model in parallel, then a judge
 * model synthesizes one final answer from all panel responses.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-fusion-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "combo-fusion-test-secret";

const { handleComboChat } = await import("../../open-sse/services/combo.ts");

const noop = () => {};
const log = { info: noop, warn: noop, debug: noop, error: noop };

type Body = Record<string, unknown>;

// Minimal OpenAI-chat Response-shaped object compatible with the engine's .ok + .clone().json() surface.
function okResponse(content: string, { delayMs = 0 } = {}): Response | Promise<Response> {
  const body = JSON.stringify({ choices: [{ message: { role: "assistant", content } }] });
  const make = () =>
    new Response(body, { status: 200, headers: { "Content-Type": "application/json" } });
  return delayMs > 0 ? new Promise((r) => setTimeout(() => r(make()), delayMs)) : make();
}

function errResponse(status = 500): Response {
  return new Response(JSON.stringify({ error: { message: "boom" } }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function fusionCombo(models: string[], extra: Record<string, unknown> = {}) {
  return {
    name: "test-fusion-combo",
    strategy: "fusion",
    models: models.map((m) => ({ model: m })),
    config: extra,
  };
}

test("fusion: single-model panel answers directly (nothing to fuse)", async () => {
  const calls: string[] = [];
  const handleSingleModel = async (_b: Body, m: string) => {
    calls.push(m);
    return okResponse("solo");
  };
  const res = await handleComboChat({
    body: { messages: [{ role: "user", content: "hi" }] },
    combo: fusionCombo(["p/only"]),
    handleSingleModel,
    log,
    settings: {},
    allCombos: [],
  });
  assert.equal(calls.length, 1);
  assert.equal(calls[0], "p/only");
  assert.equal(res.status, 200);
});

test("fusion: fans out to the panel then routes a synthesis turn to the judge", async () => {
  const seen: string[] = [];
  const seenBodies: Body[] = [];
  const handleSingleModel = async (b: Body, m: string) => {
    seen.push(m);
    seenBodies.push(b);
    if (m === "p/judge") return okResponse("FINAL");
    return okResponse(`ans-${m}`);
  };

  const res = await handleComboChat({
    body: {
      messages: [{ role: "user", content: "Q" }],
      stream: true,
      tools: [{ name: "x" }],
    },
    combo: fusionCombo(["p/a", "p/b", "p/c"], { judgeModel: "p/judge" }),
    handleSingleModel,
    log,
    settings: {},
    allCombos: [],
  });

  // 3 panel calls + 1 judge call.
  assert.equal(seen.length, 4);
  assert.deepEqual(seen.slice(0, 3).sort(), ["p/a", "p/b", "p/c"]);
  assert.equal(seen[3], "p/judge");

  // Panel calls are non-streaming with tools stripped.
  for (let i = 0; i < 3; i++) {
    const b = seenBodies[i];
    assert.equal(b.stream, false, "panel call should be non-streaming");
    assert.equal(b.tools, undefined, "panel call should have tools stripped");
  }

  // Judge call carries every panel answer + keeps the client's stream flag.
  const judgeBody = seenBodies[3];
  const judgeMsgs = judgeBody.messages as Array<{ role: string; content: string }>;
  const judgeText = judgeMsgs[judgeMsgs.length - 1].content;
  assert.match(judgeText, /ans-p\/a/);
  assert.match(judgeText, /ans-p\/b/);
  assert.match(judgeText, /ans-p\/c/);
  assert.match(judgeText, /Source 1/);
  assert.equal(judgeBody.stream, true);

  assert.equal(res.status, 200);
});

test("fusion: defaults the judge to the first panel model when none is set", async () => {
  const seen: string[] = [];
  const handleSingleModel = async (_b: Body, m: string) => {
    seen.push(m);
    return okResponse(`ans-${m}`);
  };
  await handleComboChat({
    body: { messages: [{ role: "user", content: "Q" }] },
    combo: fusionCombo(["p/first", "p/second"]),
    handleSingleModel,
    log,
    settings: {},
    allCombos: [],
  });
  // Last call is the judge; defaults to panel[0].
  assert.equal(seen[seen.length - 1], "p/first");
});

test("fusion: proceeds on quorum without waiting for a straggler (grace window)", async () => {
  const handleSingleModel = async (_b: Body, m: string) => {
    if (m === "p/slow") return okResponse("slow", { delayMs: 5000 });
    if (m === "p/judge") return okResponse("FINAL");
    return okResponse(`fast-${m}`);
  };

  const t0 = Date.now();
  const seenBodies: Body[] = [];
  const wrapped = async (b: Body, m: string) => {
    seenBodies.push(b);
    return handleSingleModel(b, m);
  };
  await handleComboChat({
    body: { messages: [{ role: "user", content: "Q" }] },
    combo: fusionCombo(["p/x", "p/y", "p/slow"], {
      judgeModel: "p/judge",
      fusionTuning: { minPanel: 2, stragglerGraceMs: 50, panelHardTimeoutMs: 10000 },
    }),
    handleSingleModel: wrapped,
    log,
    settings: {},
    allCombos: [],
  });
  const elapsed = Date.now() - t0;

  // Two fast answers reach quorum; grace is 50ms, so we never wait ~5s for p/slow.
  assert.ok(elapsed < 2000, `should not wait for straggler (took ${elapsed}ms)`);

  const judgeBody = seenBodies[seenBodies.length - 1];
  const judgeMsgs = judgeBody.messages as Array<{ role: string; content: string }>;
  const judgeText = judgeMsgs[judgeMsgs.length - 1].content;
  assert.match(judgeText, /fast-p\/x/);
  assert.match(judgeText, /fast-p\/y/);
  assert.ok(!/slow/.test(judgeText), "straggler answer should not appear in the judge prompt");
});

test("fusion: returns the lone survivor directly when only one panel model succeeds", async () => {
  const seen: string[] = [];
  const handleSingleModel = async (_b: Body, m: string) => {
    seen.push(m);
    if (m === "p/ok") return okResponse("lone");
    return errResponse(500);
  };
  await handleComboChat({
    body: { messages: [{ role: "user", content: "Q" }] },
    combo: fusionCombo(["p/ok", "p/bad"], {
      judgeModel: "p/judge",
      fusionTuning: { minPanel: 2, stragglerGraceMs: 50, panelHardTimeoutMs: 5000 },
    }),
    handleSingleModel,
    log,
    settings: {},
    allCombos: [],
  });
  // No judge call — single answer means there is nothing to fuse.
  assert.ok(
    !seen.includes("p/judge"),
    "judge should not be invoked when only one panel model survives"
  );
});

test("fusion: returns 503 when the whole panel fails", async () => {
  const handleSingleModel = async () => errResponse(500);
  const res = await handleComboChat({
    body: { messages: [{ role: "user", content: "Q" }] },
    combo: fusionCombo(["p/a", "p/b"], {
      fusionTuning: { minPanel: 2, stragglerGraceMs: 50, panelHardTimeoutMs: 5000 },
    }),
    handleSingleModel,
    log,
    settings: {},
    allCombos: [],
  });
  assert.equal(res.status, 503);
});
