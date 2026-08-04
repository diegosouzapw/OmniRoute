// Target isolation for the combo attempt body (#7847).
//
// combo.ts deep-clones the request body per target (`attemptBody = structuredClone(body)`) so one
// target's mutations cannot reach the next. On a 3.05 MiB agent request that costs 9.53 MiB at
// only 3 targets — 3x the wire size — and it scales with the target count.
//
// A shallow per-target copy would give the same isolation for ~nothing, because every known
// in-place mutation on this path is a TOP-LEVEL SCALAR:
//   combo.ts     bodyRecord.max_tokens = ...   (reasoning buffer)
//   chatCore.ts  body.model = ...              (Background Task Redirection T41)
//
// These tests lock the isolation invariant itself, so the clone strategy can be changed
// underneath them without anyone having to trust a grep for mutation sites.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-cow-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const core = await import("../../src/lib/db/core.ts");
const { resetAllComboMetrics } = await import("../../open-sse/services/comboMetrics.ts");
const { resetAllCircuitBreakers } = await import("../../src/shared/utils/circuitBreaker.ts");
const { resetAll: resetAllSemaphores } =
  await import("../../open-sse/services/rateLimitSemaphore.ts");
const { _resetAllDecks } = await import("../../src/shared/utils/shuffleDeck.ts");
const { clearSessions } = await import("../../open-sse/services/sessionManager.ts");

function createLog() {
  const entries: unknown[] = [];
  const push = (level: string) => (tag: unknown, msg: unknown) => entries.push({ level, tag, msg });
  return {
    info: push("info"),
    warn: push("warn"),
    error: push("error"),
    debug: push("debug"),
    entries,
  };
}

const okResponse = () =>
  new Response(JSON.stringify({ choices: [{ message: { content: "ok" } }] }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
const errResponse = (status: number) =>
  new Response(JSON.stringify({ error: { message: `Error ${status}` } }), {
    status,
    headers: { "content-type": "application/json" },
  });

/** A body with nested structure, so a shallow copy is visibly different from a deep clone. */
function agentBody() {
  return {
    model: "openai/gpt-4o-mini",
    max_tokens: 100,
    messages: [
      { role: "user", content: "first" },
      { role: "assistant", content: "second" },
    ],
    tools: [{ type: "function", function: { name: "t", parameters: { type: "object" } } }],
  };
}

function deepFreeze<T>(value: T): T {
  if (value && typeof value === "object") {
    Object.getOwnPropertyNames(value).forEach((k) => deepFreeze((value as never)[k]));
    Object.freeze(value);
  }
  return value;
}

const MODELS = ["openai/gpt-4o-mini", "claude/sonnet", "gemini/flash"];

function comboOf(strategy: string, name: string) {
  return {
    name,
    strategy,
    models: MODELS,
    config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0 },
  };
}

test.beforeEach(() => {
  resetAllComboMetrics();
  resetAllCircuitBreakers();
  resetAllSemaphores();
  _resetAllDecks();
  clearSessions();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
});

// ── The invariant: one target's writes must never reach the next ──────────────
// The stub reproduces chatCore.ts's `body.model = model` (Background Task Redirection),
// which is the real downstream mutation this isolation exists to contain.
for (const strategy of ["priority", "fill-first", "round-robin"]) {
  test(`${strategy}: a target's in-place write must not leak into the next target`, async () => {
    const seen: { model: string; maxTokens: number }[] = [];

    await handleComboChat({
      body: agentBody(),
      combo: comboOf(strategy, `cow-isolation-${strategy}`),
      handleSingleModel: async (received: Record<string, unknown>, modelStr: string) => {
        seen.push({
          model: received.model as string,
          maxTokens: received.max_tokens as number,
        });
        // Simulate chatCore.ts:693 (`body.model = model`) and the reasoning buffer write.
        received.model = `mutated-by-${modelStr}`;
        received.max_tokens = 999;
        return seen.length < MODELS.length ? errResponse(503) : okResponse();
      },
      isModelAvailable: async () => true,
      log: createLog(),
      settings: null,
      allCombos: null,
    });

    assert.ok(seen.length >= 2, `expected at least 2 targets to run, got ${seen.length}`);
    for (const [i, s] of seen.entries()) {
      assert.equal(
        s.model,
        "openai/gpt-4o-mini",
        `target ${i} received model "${s.model}" — a previous target's write leaked through`
      );
      assert.equal(
        s.maxTokens,
        100,
        `target ${i} received max_tokens ${s.maxTokens} — a previous target's write leaked through`
      );
    }
  });
}

// ── The caller's body is an input, not scratch space ──────────────────────────
test("the caller's body object is never mutated by the combo loop", async () => {
  const body = agentBody();
  const before = JSON.stringify(body);

  await handleComboChat({
    body,
    combo: comboOf("priority", "cow-caller-body"),
    handleSingleModel: async (received: Record<string, unknown>) => {
      received.model = "mutated";
      received.max_tokens = 1;
      return okResponse();
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    allCombos: null,
  });

  assert.equal(JSON.stringify(body), before, "handleComboChat must treat `body` as read-only");
});

// ── The copy must stay shallow — that is the whole point ─────────────────────
test("the per-target copy shares the nested payload instead of deep-cloning it", async () => {
  const body = agentBody();
  const received: Record<string, unknown>[] = [];

  await handleComboChat({
    body,
    combo: comboOf("priority", "cow-shallow"),
    handleSingleModel: async (b: Record<string, unknown>) => {
      received.push(b);
      return received.length < 2 ? errResponse(503) : okResponse();
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    allCombos: null,
  });

  assert.ok(received.length >= 2, "need at least two targets to compare");
  for (const [i, b] of received.entries()) {
    assert.notEqual(
      b,
      body,
      `target ${i} received the caller's object — isolation requires a copy`
    );
  }
  assert.notEqual(received[0], received[1], "each target needs its own top-level object");

  // The memory property (#7847): `messages` is the expensive part of an agent request, and
  // duplicating it per target is what cost 9.53 MiB at 3 targets. Every target must therefore
  // point at the SAME array. (handleComboChat rebuilds the messages container once during
  // setup, before the per-target loop, so this is not necessarily the caller's own array —
  // what matters is that it is not rebuilt per target.)
  assert.equal(
    received[0].messages,
    received[1].messages,
    "targets got different messages arrays — the per-target copy must stay shallow (#7847)"
  );
  assert.equal(received[0].tools, body.tools, "tools must be shared, not copied");

  // And nothing deep-clones: the message objects themselves are still the caller's.
  const first = (body.messages as unknown[])[0];
  assert.equal(
    (received[0].messages as unknown[])[0],
    first,
    "message objects were cloned — nothing on this path mutates them, so they must be shared"
  );
});

// ── Freeze probe: nothing on the combo-owned path may write in place ──────────
// Scope note: handleSingleModel is stubbed, so this covers combo.ts's own handling of the body
// (compression, handoff injection, the reasoning-buffer write) — NOT chatCore or the executors.
// The isolation tests above are what cover a mutating downstream.
test("freeze probe: combo's own body handling performs no in-place writes", async () => {
  const frozen = deepFreeze(agentBody());
  let threw: unknown = null;

  try {
    await handleComboChat({
      body: frozen,
      combo: comboOf("priority", "cow-freeze-probe"),
      handleSingleModel: async () => okResponse(),
      isModelAvailable: async () => true,
      log: createLog(),
      settings: null,
      allCombos: null,
    });
  } catch (err) {
    threw = err;
  }

  assert.equal(
    threw,
    null,
    `combo wrote to a frozen body: ${threw instanceof Error ? threw.message : String(threw)}`
  );
});
