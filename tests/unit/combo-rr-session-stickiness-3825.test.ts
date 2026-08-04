/**
 * Regression for #3825 — round-robin session stickiness.
 *
 * sessionStickiness.ts (v3.8.36) keeps a sessionless multi-turn conversation pinned to the
 * same connection so the upstream prompt-cache stays warm. The weighted/priority dispatch
 * honors it (via applySessionStickiness at combo.ts:~1587), but handleRoundRobinCombo
 * returned earlier (combo.ts:~1004) and never engaged it — so ROUND-ROBIN combos rotated on
 * every turn for clients that send no session id (Codex CLI, Claude Code, most
 * OpenAI-compatible tools), busting the cache → cold high-reasoning starts, intermittent
 * 504s and throughput collapse under concurrency (#3825).
 *
 * This drives the REAL handleComboChat with a flat round-robin combo and asserts:
 *  - a single sessionless conversation re-pins to its turn-1 connection (FAILS before the fix:
 *    the combo rotates A → B → C …);
 *  - DISTINCT conversations still spread across connections on their first turn (round-robin
 *    distribution is preserved — only intra-conversation rotation is removed).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-rr-stick-3825-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const stick = await import("../../open-sse/services/combo/sessionStickiness.ts");
const dbCore = await import("../../src/lib/db/core.ts");

function makeLog() {
  return { info() {}, warn() {}, debug() {}, error() {} };
}

function rrCombo(name: string) {
  return {
    name,
    strategy: "round-robin",
    config: { maxRetries: 0 },
    models: [
      { kind: "model", provider: "codex", providerId: "codex", model: "m-a", connectionId: "conn-A", id: `${name}-0` },
      { kind: "model", provider: "codex", providerId: "codex", model: "m-b", connectionId: "conn-B", id: `${name}-1` },
      { kind: "model", provider: "glm-cn", providerId: "glm-cn", model: "m-c", connectionId: "conn-C", id: `${name}-2` },
    ],
  };
}

async function dispatchConnection(combo: Record<string, unknown>, firstMessage: string): Promise<string> {
  let conn = "?";
  await handleComboChat({
    body: { model: combo.name, messages: [{ role: "user", content: firstMessage }], stream: false },
    combo,
    allCombos: [combo],
    isModelAvailable: async () => true,
    relayOptions: undefined,
    signal: undefined,
    settings: {},
    log: makeLog(),
    handleSingleModel: async (
      _b: unknown,
      modelStr: string,
      target?: { connectionId?: string | null }
    ) => {
      conn = target?.connectionId ?? "?";
      return Response.json({ choices: [{ message: { role: "assistant", content: modelStr } }] });
    },
  });
  return conn;
}

test.beforeEach(() => {
  stick.clearAllStickyBindings();
  // Fail-open saturation (unknown → full headroom) so we exercise the stickiness MECHANISM,
  // not the headroom gate.
  stick.__setStickinessHeadroomFetcherForTests(async () => undefined);
});

test.after(() => {
  stick.__setStickinessHeadroomFetcherForTests(null);
  dbCore.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
});

test("round-robin: a sessionless conversation re-pins to its turn-1 connection across turns (#3825)", async () => {
  const combo = rrCombo("rr-stick");
  const conns: string[] = [];
  for (let turn = 0; turn < 5; turn++) {
    conns.push(await dispatchConnection(combo, "Refactor the streaming handler for combos."));
  }
  // Turns 2..5 must all reuse turn 1's connection (sticky). Before the fix RR rotates
  // (conn-A → conn-B → conn-C → conn-A → …) so this set would have size 3.
  assert.equal(
    new Set(conns.slice(1)).size,
    1,
    `turns 2..5 must stick to one connection, got: ${conns.join(", ")}`
  );
  assert.equal(conns[1], conns[0], "turn 2 must reuse turn 1's connection");
});

test("round-robin: DISTINCT conversations still spread across connections on turn 1 (#3825 spreading guard)", async () => {
  const combo = rrCombo("rr-spread");
  const hist: Record<string, number> = {};
  for (let i = 0; i < 6; i++) {
    const conn = await dispatchConnection(combo, `conversation number ${i} — distinct first message`);
    hist[conn] = (hist[conn] || 0) + 1;
  }
  // Round-robin distribution must be preserved across conversations: more than one
  // connection used (the pin must NOT collapse all conversations onto one connection).
  assert.ok(
    Object.keys(hist).length > 1,
    `distinct conversations must spread across connections, got: ${JSON.stringify(hist)}`
  );
});
