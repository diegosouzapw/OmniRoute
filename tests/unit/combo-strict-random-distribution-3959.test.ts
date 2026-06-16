/**
 * TDD regression for #3959: strict-random combo "routes to a model that never
 * succeeds" and concentrates traffic on a few models.
 *
 * Root cause: the strict-random branch shuffled only slot 0 (the deck pick) and
 * left the fallback remainder (`rest`) in FIXED priority order. So whenever the
 * deck-selected target failed, the dispatch chain always fell through to the same
 * top-priority model next — a persistently-failing model was retried on
 * essentially every request, and the fallback load never spread across peers.
 * (`random` does not have this defect because it shuffles the whole list.)
 *
 * Fix: shuffle `rest` too, so the fallback chain is randomized like `random`.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-3959-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const core = await import("../../src/lib/db/core.ts");
const { resetAllComboMetrics } = await import("../../open-sse/services/comboMetrics.ts");
const { resetAllCircuitBreakers } = await import("../../src/shared/utils/circuitBreaker.ts");
const { resetAll: resetAllSemaphores } = await import(
  "../../open-sse/services/rateLimitSemaphore.ts"
);
const { _resetAllDecks } = await import("../../src/shared/utils/shuffleDeck.ts");

function createLog() {
  return {
    info: () => {},
    warn: () => {},
    error: () => {},
    debug: () => {},
  };
}

function okResponse() {
  return new Response(JSON.stringify({ choices: [{ message: { content: "ok" } }] }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

function errorResponse(status: number) {
  return new Response(JSON.stringify({ error: { message: `Error ${status}` } }), {
    status,
    headers: { "content-type": "application/json" },
  });
}

test.beforeEach(() => {
  resetAllComboMetrics();
  resetAllCircuitBreakers();
  resetAllSemaphores();
  _resetAllDecks();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("#3959 strict-random spreads the fallback across healthy peers, not a fixed model", async () => {
  const FAILING = "openai/gpt-4o-mini";
  const HEALTHY = ["claude/sonnet", "gemini/gemini-2.5-flash", "groq/llama-3.3-70b"];
  const models = [FAILING, ...HEALTHY];

  const combo = {
    name: "strict-random-fallback-spread-3959",
    strategy: "strict-random",
    models,
    config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0 },
  };

  // Collect the immediate fallback target chosen whenever the deck picked the
  // always-failing model first.
  const fallbackAfterFailure = new Set<string>();
  let failingWasPickedFirst = 0;

  for (let i = 0; i < 80; i += 1) {
    const calls: string[] = [];
    const result = await handleComboChat({
      body: {},
      combo,
      handleSingleModel: async (_body: unknown, modelStr: string) => {
        calls.push(modelStr);
        return modelStr === FAILING ? errorResponse(500) : okResponse();
      },
      isModelAvailable: async () => true,
      log: createLog(),
      settings: null,
      allCombos: null,
    });

    assert.equal(result.ok, true, "a healthy peer must always serve the request");
    if (calls[0] === FAILING) {
      failingWasPickedFirst += 1;
      assert.ok(calls[1], "must fall through to a peer after the failing deck pick");
      fallbackAfterFailure.add(calls[1]);
    }
  }

  assert.ok(
    failingWasPickedFirst >= 5,
    `deck should pick the failing model first several times (saw ${failingWasPickedFirst})`
  );
  // Pre-fix: `rest` is fixed priority order, so the fallback after the failing
  // pick is ALWAYS the same single model → set size 1 (RED).
  // Post-fix: `rest` is shuffled → the fallback spreads across the healthy peers.
  assert.ok(
    fallbackAfterFailure.size >= 2,
    `fallback after a failing deck pick must spread across peers, got only ${[
      ...fallbackAfterFailure,
    ].join(", ")}`
  );
});

test("#3959 strict-random still reaches the one healthy target when others fail", async () => {
  const models = ["openai/a", "claude/b", "gemini/c", "groq/d"];
  const HEALTHY = "gemini/c";
  const combo = {
    name: "strict-random-single-healthy-3959",
    strategy: "strict-random",
    models,
    config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0 },
  };

  for (let i = 0; i < 12; i += 1) {
    const calls: string[] = [];
    const result = await handleComboChat({
      body: {},
      combo,
      handleSingleModel: async (_body: unknown, modelStr: string) => {
        calls.push(modelStr);
        return modelStr === HEALTHY ? okResponse() : errorResponse(503);
      },
      isModelAvailable: async () => true,
      log: createLog(),
      settings: null,
      allCombos: null,
    });
    assert.equal(result.ok, true);
    assert.equal(calls[calls.length - 1], HEALTHY, "must fall through until the healthy target");
  }
});
