/**
 * Repro for #13089 — Combo Studio Live dashboard shows empty backlog despite
 * successful (or failed) chat completions routed through a round-robin combo.
 *
 * Round-robin bypasses `handleComboChat` -> `executeTargetAttempt` (the path that
 * publishes `combo.target.attempt` / `combo.target.succeeded` / `combo.target.failed`
 * on the dashboard EventBus) and dispatches through its own loop in
 * `open-sse/services/combo/roundRobinCombo.ts`, which never emitted those events.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-13089-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const rrState = await import("../../open-sse/services/combo/rrState.ts");
const dbCore = await import("../../src/lib/db/core.ts");
const eventBus = await import("../../src/lib/events/eventBus.ts");

function makeLog() {
  return { info() {}, warn() {}, debug() {}, error() {} };
}

function rrCombo(name: string, maxRetries = 0) {
  return {
    name,
    strategy: "round-robin",
    config: { maxRetries, disableSessionStickiness: true },
    models: [
      {
        kind: "model",
        provider: "codex",
        providerId: "codex",
        model: "m-a",
        connectionId: "conn-A",
        id: `${name}-0`,
      },
    ],
  };
}

test.beforeEach(() => {
  rrState.rrCounters.clear();
  rrState.rrStickyTargets.clear();
});

test.after(() => {
  try {
    dbCore.resetDbInstance?.();
  } catch {
    /* ignore */
  }
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("#13089: a successful round-robin combo completion publishes combo.target.succeeded on the dashboard EventBus", async () => {
  const combo = rrCombo("rr13089-success");

  const seen: Array<{ event: string; payload: unknown }> = [];
  const unsubscribeAttempt = eventBus.on("combo.target.attempt", (payload) => {
    seen.push({ event: "combo.target.attempt", payload });
  });
  const unsubscribeSucceeded = eventBus.on("combo.target.succeeded", (payload) => {
    seen.push({ event: "combo.target.succeeded", payload });
  });

  try {
    const response = await handleComboChat({
      body: { model: combo.name, messages: [{ role: "user", content: "hi" }], stream: false },
      combo,
      allCombos: [combo],
      isModelAvailable: async () => true,
      relayOptions: undefined,
      signal: undefined,
      settings: {},
      log: makeLog(),
      handleSingleModel: async (_b, modelStr, _target) => {
        return Response.json({
          choices: [{ message: { role: "assistant", content: modelStr } }],
        });
      },
    });

    assert.equal(response.status, 200, "the combo-routed completion itself must succeed");
    assert.ok(
      seen.some((e) => e.event === "combo.target.attempt"),
      `expected a "combo.target.attempt" EventBus event, but none was published (saw: ${JSON.stringify(seen)}).`
    );
    assert.ok(
      seen.some((e) => e.event === "combo.target.succeeded"),
      `expected a "combo.target.succeeded" EventBus event after a successful round-robin ` +
        `combo completion, but none was published (saw: ${JSON.stringify(seen)}). This is why ` +
        `Combo Studio -> Live never shows round-robin combo executions (#13089).`
    );
  } finally {
    unsubscribeAttempt();
    unsubscribeSucceeded();
  }
});

test("#13089: a failing round-robin combo target publishes combo.target.failed on the dashboard EventBus", async () => {
  const combo = rrCombo("rr13089-failure");

  const seen: Array<{ event: string; payload: unknown }> = [];
  const unsubscribeFailed = eventBus.on("combo.target.failed", (payload) => {
    seen.push({ event: "combo.target.failed", payload });
  });

  try {
    const response = await handleComboChat({
      body: { model: combo.name, messages: [{ role: "user", content: "hi" }], stream: false },
      combo,
      allCombos: [combo],
      isModelAvailable: async () => true,
      relayOptions: undefined,
      signal: undefined,
      settings: {},
      log: makeLog(),
      handleSingleModel: async () => {
        return Response.json({ error: { message: "rate limited" } }, { status: 429 });
      },
    });

    assert.equal(response.status, 429, "the exhausted combo must surface the upstream failure");
    assert.ok(
      seen.some((e) => e.event === "combo.target.failed"),
      `expected a "combo.target.failed" EventBus event after an exhausted round-robin ` +
        `combo target, but none was published (saw: ${JSON.stringify(seen)}).`
    );
  } finally {
    unsubscribeFailed();
  }
});
