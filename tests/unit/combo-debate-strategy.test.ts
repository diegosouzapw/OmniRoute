/**
 * Debate combo strategy dispatch — verifies handleComboChat routes strategy:"debate"
 * to handleDebateChat, mirroring the fusion strategy dispatch test.
 *
 * Multi-round adversarial panel + judge synthesis. Round 0 fans out to every panel
 * model; rounds 1..N feed prior answers back for rebuttal; a judge synthesizes.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-debate-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "combo-debate-test-secret";

const { handleComboChat } = await import("../../open-sse/services/combo.ts");

const noop = () => {};
const log = { info: noop, warn: noop, debug: noop, error: noop };

type Body = Record<string, unknown>;

function okResponse(content: string): Response {
  const body = JSON.stringify({ choices: [{ message: { role: "assistant", content } }] });
  return new Response(body, { status: 200, headers: { "Content-Type": "application/json" } });
}

function errResponse(status = 500): Response {
  return new Response(JSON.stringify({ error: { message: "boom" } }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function debateCombo(models: string[], extra: Record<string, unknown> = {}) {
  return {
    name: "test-debate-combo",
    strategy: "debate",
    models: models.map((m) => ({ model: m })),
    config: extra,
  };
}

test("debate: single-model panel answers directly (nothing to debate)", async () => {
  const calls: string[] = [];
  const handleSingleModel = async (_b: Body, m: string) => {
    calls.push(m);
    return okResponse("solo");
  };
  const res = await handleComboChat({
    body: { messages: [{ role: "user", content: "hi" }] },
    combo: debateCombo(["p/only"]),
    handleSingleModel,
    log,
    settings: {},
    allCombos: [],
  });
  assert.equal(calls.length, 1);
  assert.equal(calls[0], "p/only");
  assert.equal(res.status, 200);
});

test("debate: dispatches through handleComboChat — R0 fan-out then R1 then judge", async () => {
  const seen: string[] = [];
  const seenBodies: Body[] = [];
  const handleSingleModel = async (b: Body, m: string) => {
    seen.push(m);
    seenBodies.push(b);
    if (m === "p/judge") return okResponse("FINAL");
    return okResponse(`ans-${m}`);
  };

  const res = await handleComboChat({
    body: { messages: [{ role: "user", content: "Q" }], stream: true, tools: [{ name: "x" }] },
    combo: debateCombo(["p/a", "p/b"], {
      judgeModel: "p/judge",
      debateTuning: { debateRounds: 2, minPanel: 2, stragglerGraceMs: 50 },
    }),
    handleSingleModel,
    log,
    settings: {},
    allCombos: [],
  });

  // R0: 2 panel + R1: 2 panel + 1 judge = 5 calls.
  assert.equal(seen.length, 5);
  assert.equal(seen[seen.length - 1], "p/judge");

  // Panel calls are non-streaming with tools stripped; judge keeps client's stream flag.
  for (let i = 0; i < 4; i++) {
    assert.equal(seenBodies[i].stream, false, "panel call should be non-streaming");
    assert.equal(seenBodies[i].tools, undefined, "panel call should have tools stripped");
  }
  const judgeBody = seenBodies[4];
  assert.equal(judgeBody.stream, true, "judge call keeps client's stream flag");

  // Judge prompt contains the full anonymized debate transcript.
  const judgeMsgs = judgeBody.messages as Array<{ role: string; content: string }>;
  const judgeText = judgeMsgs[judgeMsgs.length - 1].content;
  assert.match(judgeText, /Round 0/);
  assert.match(judgeText, /Round 1/);
  assert.match(judgeText, /Peer 1/);

  assert.equal(res.status, 200);
});

test("debate: whole panel fails in round 0 → 503", async () => {
  const handleSingleModel = async () => errResponse(500);
  const res = await handleComboChat({
    body: { messages: [{ role: "user", content: "Q" }] },
    combo: debateCombo(["p/a", "p/b"], {
      debateTuning: { minPanel: 2, stragglerGraceMs: 50, panelHardTimeoutMs: 5000 },
    }),
    handleSingleModel,
    log,
    settings: {},
    allCombos: [],
  });
  assert.equal(res.status, 503);
});

test("debate: defaults judge to first panel model when none configured", async () => {
  const seen: string[] = [];
  const handleSingleModel = async (_b: Body, m: string) => {
    seen.push(m);
    return okResponse(`ans-${m}`);
  };
  await handleComboChat({
    body: { messages: [{ role: "user", content: "Q" }] },
    combo: debateCombo(["p/first", "p/second"], {
      debateTuning: { debateRounds: 1 },
    }),
    handleSingleModel,
    log,
    settings: {},
    allCombos: [],
  });
  // debateRounds=1 → single fan-out (2 calls) then judge defaults to panel[0].
  assert.equal(seen[seen.length - 1], "p/first");
});
