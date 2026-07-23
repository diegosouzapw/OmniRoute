import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Regression for #3825: PR #3399 disabled the <omniModel>-tag history pinning and
// replaced it with a server-side session pin in combo.ts that is gated on
// `relayOptions?.sessionId`. Most OpenAI-compatible clients send no session id, so
// the read/write never fired → combos lost model stickiness → every turn re-ran the
// strategy (round-robin rotated) → upstream prompt-cache misses, cold high-reasoning
// starts, intermittent 504s. The fix derives a stable per-conversation key from the
// request body when no session id is present, so a combo re-pins to the same model
// across turns of the same conversation — but ONLY when context_cache_protection is on.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-pin-3825-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const { clearSessions } = await import("../../open-sse/services/sessionManager.ts");
const core = await import("../../src/lib/db/core.ts");

function createLog() {
  const entries: any[] = [];
  return {
    info: (tag: any, msg: any) => entries.push({ level: "info", tag, msg }),
    warn: (tag: any, msg: any) => entries.push({ level: "warn", tag, msg }),
    error: (tag: any, msg: any) => entries.push({ level: "error", tag, msg }),
    debug: (tag: any, msg: any) => entries.push({ level: "debug", tag, msg }),
    entries,
  };
}

function okResponse(body: any = { choices: [{ message: { content: "ok" } }] }) {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

function waitForBackgroundWork() {
  return new Promise((resolve) => setTimeout(resolve, 25));
}

// A stable conversation body — the first user message is identical across turns so
// extractSessionAffinityKey() fingerprints the same conversation each time.
function conversationBody() {
  return {
    messages: [{ role: "user", content: "Refactor the streaming handler for combos." }],
  };
}

async function cleanupTestDataDir() {
  let lastError;
  for (let attempt = 0; attempt < 5; attempt += 1) {
    try {
      core.resetDbInstance();
      fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      return;
    } catch (error: any) {
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, 25));
    }
  }
  if (lastError) throw lastError;
}

test.beforeEach(async () => {
  clearSessions();
  await cleanupTestDataDir();
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(async () => {
  clearSessions();
  if (ORIGINAL_DATA_DIR === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }
  await cleanupTestDataDir();
});

test("context_cache_protection ON + NO sessionId: combo re-pins to the same model across turns (#3825)", async () => {
  const calls: string[] = [];
  // Priority strategy: turn 1 deterministically tries model-a first, but model-a returns
  // an empty (quality-failed) response so the combo falls through to model-b and records
  // model-b as the session model (this exercises the real main-loop write site).
  const combo = {
    name: "sticky-priority",
    strategy: "priority",
    context_cache_protection: true,
    models: ["model-a", "model-b"],
    config: { maxRetries: 0 },
  };

  const handleSingleModel = async (_body: any, modelStr: string) => {
    calls.push(modelStr);
    if (modelStr === "model-a") {
      return okResponse({ choices: [{ message: { content: "" } }] }); // empty → fall through
    }
    return okResponse({ choices: [{ message: { content: "fallback ok" } }] });
  };

  // Two sequential turns of the SAME conversation, NO relayOptions.sessionId.
  for (let turn = 0; turn < 2; turn += 1) {
    const result = await handleComboChat({
      body: conversationBody(),
      combo,
      handleSingleModel: handleSingleModel as any,
      isModelAvailable: async () => true,
      log: createLog(),
      settings: null,
      relayOptions: null as any,
      allCombos: null,
    });
    assert.equal(result.ok, true);
    // Let the best-effort session-model write settle before the next turn reads it.
    await waitForBackgroundWork();
  }

  // Turn 1 records model-b (the model that actually succeeded). With the fix, turn 2 reads
  // that pin via the derived sessionless key and dispatches model-b DIRECTLY, skipping
  // model-a entirely → calls === [a, b, b]. Without the fix the derived key is never used,
  // so turn 2 re-runs priority from the top → calls === [a, b, a, b].
  assert.deepEqual(
    calls,
    ["model-a", "model-b", "model-b"],
    "turn 2 must re-pin to model-b (turn 1's selected model) and skip model-a"
  );
});

test("context_cache_protection OFF + NO sessionId: no pin, strategy re-runs each turn, no <omniModel> tag (#3825 scope guard)", async () => {
  const calls: string[] = [];
  const forwardedContents: string[] = [];
  // Identical priority+failover setup as the positive case, but with the toggle OFF.
  const combo = {
    name: "unprotected-priority",
    strategy: "priority",
    // context_cache_protection intentionally omitted (falsy) — #3399 behavior preserved.
    models: ["model-a", "model-b"],
    config: { maxRetries: 0 },
  };

  const handleSingleModel = async (forwardedBody: any, modelStr: string) => {
    calls.push(modelStr);
    const msgs = Array.isArray(forwardedBody?.messages) ? forwardedBody.messages : [];
    for (const m of msgs) {
      if (typeof m?.content === "string") forwardedContents.push(m.content);
    }
    if (modelStr === "model-a") {
      return okResponse({ choices: [{ message: { content: "" } }] });
    }
    return okResponse({ choices: [{ message: { content: "fallback ok" } }] });
  };

  for (let turn = 0; turn < 2; turn += 1) {
    const result = await handleComboChat({
      body: conversationBody(),
      combo,
      handleSingleModel: handleSingleModel as any,
      isModelAvailable: async () => true,
      log: createLog(),
      settings: null,
      relayOptions: null as any,
      allCombos: null,
    });
    assert.equal(result.ok, true);
    await waitForBackgroundWork();
  }

  // Toggle OFF → no pin is recorded or read → turn 2 re-runs priority from the top,
  // re-trying model-a before falling through to model-b → [a, b, a, b].
  assert.deepEqual(
    calls,
    ["model-a", "model-b", "model-a", "model-b"],
    "with protection OFF the combo must re-run strategy each turn (no sessionless pin)"
  );
  assert.ok(
    forwardedContents.every((c) => !c.includes("<omniModel>")),
    "no <omniModel> tag may be injected into the forwarded body (#454/#3399)"
  );
});
