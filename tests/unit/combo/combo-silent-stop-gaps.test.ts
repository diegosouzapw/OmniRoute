import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Isolate DATA_DIR before any DB-touching import (combo.ts pulls in the
// SQLite layer) — mirrors tests/unit/combo-routing-engine.test.ts.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-silent-stop-gaps-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

// ---------------------------------------------------------------------------
// Silent-stop gap fixes — regression tests
// ---------------------------------------------------------------------------
// These lock the G1–G10 fixes for loops that could terminate silently:
//   G1  combo.ts globalPromise safety timer (hung target → 504, never hang)
//   G2  combo.ts task wrapper catch resolves globalPromise (unexpected throw → 502)
//   G3  targetTimeoutRunner warns when per-model timeout is disabled
//   G4  round-robin loop safety timer (hung model → 504)
//   G5  chaosEngine logs all-panel failures with per-model errors
//   G7  evalRunner rejects catastrophic regex (ReDoS) via safe-regex
//   G8  autoRefreshDaemon logs network errors per provider
//   G10 batchProcessor item dispatch timeout (hung item fails fast)
// ---------------------------------------------------------------------------

const { buildTargetTimeoutRunner } =
  await import("../../../open-sse/services/combo/targetTimeoutRunner.ts");
const { handleComboChat } = await import("../../../open-sse/services/combo.ts");
const { handleChaosChat } = await import("../../../open-sse/services/autoCombo/chaosEngine.ts");
const { evaluateCase } = await import("../../../src/lib/evals/evalRunner.ts");
const { withItemDispatchTimeout } = await import("../../../open-sse/services/batchProcessor.ts");
const { saveModelsDevCapabilities } = await import("../../../src/lib/modelsDevSync.ts");

function capabilityEntry(limitContext: unknown, overrides: Record<string, unknown> = {}) {
  return {
    tool_call: true,
    reasoning: false,
    attachment: false,
    structured_output: true,
    temperature: true,
    modalities_input: JSON.stringify(["text"]),
    modalities_output: JSON.stringify(["text"]),
    knowledge_cutoff: null,
    release_date: null,
    last_updated: null,
    status: null,
    family: null,
    open_weights: false,
    limit_context: limitContext,
    limit_input: limitContext,
    limit_output: 4096,
    interleaved_field: null,
    ...overrides,
  };
}

function createLog() {
  const entries: Array<{ level: string; tag: string; msg: string }> = [];
  return {
    info: (tag: string, msg: string) => entries.push({ level: "info", tag, msg }),
    warn: (tag: string, msg: string) => entries.push({ level: "warn", tag, msg }),
    error: (tag: string, msg: string) => entries.push({ level: "error", tag, msg }),
    debug: (tag: string, msg: string) => entries.push({ level: "debug", tag, msg }),
    entries,
  };
}

function okResponse(body: Record<string, unknown> = { choices: [{ message: { content: "ok" } }] }) {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

function errorResponse(status: number, message: string = `Error ${status}`) {
  return new Response(JSON.stringify({ error: { message } }), {
    status,
    headers: { "content-type": "application/json" },
  });
}

// ── G1: combo loop safety timer ─────────────────────────────────────────────
// A hung target (per-model timeout disabled / upstream never settles) must NOT
// freeze the request forever: the safety timer force-resolves with 504.
test.after(async () => {
  if (ORIGINAL_DATA_DIR === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }
  try {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  } catch {
    /* best effort */
  }
});

test("G1: hung target with per-model timeout disabled → 504, not a silent hang", async () => {
  const log = createLog();
  const combo = {
    name: "g1-hang",
    models: ["openai/gpt-4o-mini"],
    config: {
      // Per-model timeout off + tiny global budget so the test runs in ms.
      targetTimeoutMs: 0,
      comboTimeoutMs: 100,
    },
  };
  saveModelsDevCapabilities({ openai: { "gpt-4o-mini": capabilityEntry(128000) } });
  const startedAt = Date.now();
  const result = await handleComboChat({
    body: {},
    combo,
    // Never settles — simulates an upstream that accepts the connection and
    // then stalls forever.
    handleSingleModel: () => new Promise<Response>(() => {}),
    isModelAvailable: async () => true,
    log,
    settings: null,
    allCombos: null,
  });
  const elapsed = Date.now() - startedAt;
  assert.equal(result.status, 504);
  assert.ok(elapsed < 10_000, `safety timeout took ${elapsed}ms — too slow`);
  assert.ok(
    log.entries.some((e) => e.level === "warn" && /safety timeout/i.test(String(e.msg))),
    "expected a warn about the combo loop safety timeout"
  );
});

// ── G2: task wrapper catch resolves globalPromise ───────────────────────────
// An unexpected throw inside executeTarget (e.g. isModelAvailable exploding)
// must surface as 502, not leave the request hanging.
test("G2: unexpected throw in a target surfaces 502 instead of hanging", async () => {
  const log = createLog();
  const combo = {
    name: "g2-throw",
    models: ["openai/gpt-4o-mini"],
  };
  const result = await handleComboChat({
    body: {},
    combo,
    handleSingleModel: async () => okResponse(),
    // Throw inside executeTarget before dispatch — the wrapper catch must
    // resolve globalPromise so the loop terminates.
    isModelAvailable: async () => {
      throw new Error("unexpected availability explosion");
    },
    log,
    settings: null,
    allCombos: null,
  });
  assert.equal(result.status, 502);
  const body = await result.text();
  assert.match(body, /unexpected error/i);
  assert.ok(
    log.entries.some((e) => e.level === "error" && /Speculative task error/i.test(String(e.msg))),
    "expected the speculative task error to be logged"
  );
});

// ── G3: targetTimeoutRunner warns when per-model timeout is disabled ────────
test("G3: targetTimeoutRunner warns when comboTargetTimeoutMs <= 0", async () => {
  const log = createLog();
  const runner = buildTargetTimeoutRunner({
    handleSingleModel: async () => new Response("ok"),
    comboTargetTimeoutMs: 0,
    log,
  });
  const res = await runner({}, "m");
  assert.equal(await res.text(), "ok");
  assert.ok(
    log.entries.some((e) => e.level === "warn" && /DISABLED|disabled/i.test(String(e.msg))),
    "expected a warn about the disabled per-model timeout"
  );
});

// ── G4: round-robin loop safety timer ───────────────────────────────────────
test("G4: round-robin hung model → 504 via loop safety timer", async () => {
  const log = createLog();
  const combo = {
    name: "g4-rr-hang",
    models: ["openai/gpt-4o-mini", "claude/sonnet"],
    strategy: "round-robin",
    config: {
      targetTimeoutMs: 0,
      comboTimeoutMs: 100,
    },
  };
  saveModelsDevCapabilities({
    openai: { "gpt-4o-mini": capabilityEntry(128000) },
    claude: { sonnet: capabilityEntry(200000) },
  });
  const startedAt = Date.now();
  const result = await handleComboChat({
    body: {},
    combo,
    handleSingleModel: () => new Promise<Response>(() => {}),
    isModelAvailable: async () => true,
    log,
    settings: null,
    allCombos: null,
  });
  const elapsed = Date.now() - startedAt;
  assert.equal(result.status, 504);
  assert.ok(elapsed < 10_000, `RR safety timeout took ${elapsed}ms — too slow`);
  assert.ok(
    log.entries.some((e) => e.level === "warn" && /Round-robin/i.test(String(e.msg))),
    "expected a warn about the round-robin safety timeout"
  );
});

// ── G5: chaosEngine logs all-panel failures ─────────────────────────────────
test("G5: chaos all-panel failure is logged with per-model errors", async () => {
  const log = createLog();
  const res = await handleChaosChat({
    body: {},
    models: ["openai/gpt-4o-mini", "claude/sonnet"],
    handleSingleModel: async () => errorResponse(503, "upstream down"),
    log,
    comboName: "g5-chaos",
  });
  assert.equal(res.status, 200); // SSE envelope stays well-formed
  const body = await res.text();
  assert.match(body, /All chaos panel models failed/);
  assert.match(body, /upstream down/);
  assert.ok(
    log.entries.some(
      (e) => e.level === "warn" && /All chaos panel models failed/i.test(String(e.msg))
    ),
    "expected the all-failed warn with model errors"
  );
});

// ── G7: evalRunner rejects catastrophic regex (ReDoS guard) ─────────────────
test("G7: catastrophic regex is rejected instead of hanging the eval loop", () => {
  const startedAt = Date.now();
  const result = evaluateCase(
    { id: "redos", name: "redos", expected: { strategy: "regex", value: "(a+)+$" } },
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa!"
  );
  const elapsed = Date.now() - startedAt;
  assert.equal(result.passed, false);
  assert.match(String(result.details?.error ?? ""), /unsafe|backtracking/i);
  assert.ok(elapsed < 1000, `regex eval took ${elapsed}ms — ReDoS guard failed`);
});

test("G7: benign regex still evaluates normally", () => {
  const result = evaluateCase(
    { id: "ok-regex", name: "ok-regex", expected: { strategy: "regex", value: "^hello" } },
    "hello world"
  );
  assert.equal(result.passed, true);
});

// ── G8: autoRefreshDaemon logs network errors per provider ──────────────────
test("G8: autoRefreshDaemon logs network errors instead of swallowing them", async () => {
  const { autoRefreshDaemon } = await import("../../../open-sse/services/autoRefreshDaemon.ts");
  const originalFetch = globalThis.fetch;
  const originalWarn = console.warn;
  const warnings: string[] = [];
  console.warn = (...args: unknown[]) => warnings.push(args.map(String).join(" "));
  // Simulate a provider whose validation request blows up (network error).
  globalThis.fetch = (async () => {
    throw new Error("ECONNRESET");
  }) as typeof fetch;
  try {
    autoRefreshDaemon.registerCredential("claude-web", "cookie-value");
    await autoRefreshDaemon.check();
    assert.ok(
      warnings.some((w) => w.includes("claude-web") && w.includes("ECONNRESET")),
      "expected a warn naming the provider and the network error, got: " + warnings.join(" | ")
    );
  } finally {
    globalThis.fetch = originalFetch;
    console.warn = originalWarn;
    autoRefreshDaemon.unregisterCredential("claude-web");
  }
});

// ── G10: batch item dispatch timeout ────────────────────────────────────────
test("G10: hung batch item dispatch fails fast via wall-clock timeout", async () => {
  const startedAt = Date.now();
  await assert.rejects(
    withItemDispatchTimeout(
      new Promise<Response>(() => {}), // never settles
      50,
      "Batch item dispatch (/v1/chat/completions)"
    ),
    /timed out after 50ms/
  );
  const elapsed = Date.now() - startedAt;
  assert.ok(elapsed < 5000, `timeout fired after ${elapsed}ms — too slow`);
});

test("G10: fast dispatch wins the race untouched", async () => {
  const res = await withItemDispatchTimeout(
    Promise.resolve(new Response("ok", { status: 200 })),
    1000,
    "Batch item dispatch"
  );
  assert.equal(res.status, 200);
  assert.equal(await res.text(), "ok");
});
