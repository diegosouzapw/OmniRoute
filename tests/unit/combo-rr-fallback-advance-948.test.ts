/**
 * Regression for upstream 9router#948 — round-robin combo pointer must advance
 * past the model that ACTUALLY served, not the eagerly-scheduled start index.
 *
 * With `stickyLimit: 1` ("true round-robin, one request per model"), when the
 * scheduled model fails and a *different* model serves via fallback, the counter
 * was advanced by +1 from the scheduled start index (eagerly, before the loop),
 * so the next request started at — and reused — the fallback-served model. This
 * silently degraded round-robin into hot-spotting on whichever model was healthy.
 *
 * This drives the REAL handleComboChat with session-stickiness disabled (to
 * isolate the pure rotation pointer) and asserts two consecutive requests do NOT
 * serve the same connection when the scheduled target keeps failing.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-rr-948-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const rrState = await import("../../open-sse/services/combo/rrState.ts");
const dbCore = await import("../../src/lib/db/core.ts");

function makeLog() {
  return { info() {}, warn() {}, debug() {}, error() {} };
}

// Flat round-robin combo. conn-A always fails (fallback-eligible 429); B and C succeed.
function rrCombo(name: string) {
  return {
    name,
    strategy: "round-robin",
    // disableSessionStickiness isolates the round-robin pointer from the #3825
    // per-conversation pin; stickyLimit defaults to 1 (true round-robin).
    config: { maxRetries: 0, disableSessionStickiness: true },
    models: [
      { kind: "model", provider: "codex", providerId: "codex", model: "m-a", connectionId: "conn-A", id: `${name}-0` },
      { kind: "model", provider: "codex", providerId: "codex", model: "m-b", connectionId: "conn-B", id: `${name}-1` },
      { kind: "model", provider: "glm-cn", providerId: "glm-cn", model: "m-c", connectionId: "conn-C", id: `${name}-2` },
    ],
  };
}

async function dispatchServedConnection(combo: Record<string, unknown>): Promise<string> {
  let served = "?";
  await handleComboChat({
    body: { model: combo.name, messages: [{ role: "user", content: "hi" }], stream: false },
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
      const conn = target?.connectionId ?? "?";
      // conn-A always fails with a fallback-eligible status so rotation must fall through.
      if (conn === "conn-A") {
        return new Response(JSON.stringify({ error: { message: "rate limited" } }), {
          status: 429,
        });
      }
      served = conn;
      return Response.json({ choices: [{ message: { role: "assistant", content: modelStr } }] });
    },
  });
  return served;
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
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("#948: two consecutive requests do not reuse the fallback-served model", async () => {
  const combo = rrCombo("rr948");
  const first = await dispatchServedConnection(combo);
  const second = await dispatchServedConnection(combo);

  assert.notEqual(first, "?", "first request must be served by a healthy model");
  assert.notEqual(second, "?", "second request must be served by a healthy model");
  assert.notEqual(
    first,
    second,
    `round-robin must advance past the served model — got ${first} twice (hot-spotting)`
  );
});
