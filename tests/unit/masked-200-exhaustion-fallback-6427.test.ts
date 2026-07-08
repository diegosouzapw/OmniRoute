/**
 * Issue #6427 — a `priority` combo must fail over to the next target when the
 * first target returns HTTP 200 OK whose body masks credit/quota exhaustion:
 * either a top-level OpenAI-shape `error` object, or a known exhaustion phrase
 * living in the error envelope (`error.message`/top-level `message`/`detail`).
 *
 * Before this fix, `validateResponseQuality` (open-sse/services/combo/validateQuality.ts)
 * only inspected `json.error` when `choices` was ALSO missing/empty — a masked 200
 * that echoes a non-empty `choices` stub alongside the error slipped through as
 * "valid" and the combo kept returning the dead target's response instead of
 * failing over (#3424 already covers the narrower empty-`choices` case).
 *
 * Control case: a normal, valid completion whose assistant text merely MENTIONS
 * "quota" in prose must NOT be misclassified as an upstream failure — the check
 * only looks at the error envelope, never at `choices[].message.content`.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-masked200-6427-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const { resetAllComboMetrics } = await import("../../open-sse/services/comboMetrics.ts");
const { resetAllCircuitBreakers } = await import("../../src/shared/utils/circuitBreaker.ts");
const { resetAll: resetAllSemaphores } = await import("../../open-sse/services/rateLimitSemaphore.ts");
const { _resetAllDecks } = await import("../../src/shared/utils/shuffleDeck.ts");
const { clearSessions } = await import("../../open-sse/services/sessionManager.ts");

function createLog() {
  const entries: unknown[] = [];
  return {
    info: (tag: unknown, msg: unknown) => entries.push({ level: "info", tag, msg }),
    warn: (tag: unknown, msg: unknown) => entries.push({ level: "warn", tag, msg }),
    error: (tag: unknown, msg: unknown) => entries.push({ level: "error", tag, msg }),
    debug: (tag: unknown, msg: unknown) => entries.push({ level: "debug", tag, msg }),
    entries,
  };
}

function jsonResponse(body: unknown) {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

async function cleanupTestDataDir() {
  let lastError: unknown;
  for (let attempt = 0; attempt < 5; attempt += 1) {
    try {
      core.resetDbInstance();
      fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      return;
    } catch (error: unknown) {
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, 25));
    }
  }
  if (lastError) throw lastError;
}

test.beforeEach(async () => {
  resetAllComboMetrics();
  resetAllCircuitBreakers();
  resetAllSemaphores();
  _resetAllDecks();
  clearSessions();
  await cleanupTestDataDir();
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  await settingsDb.resetAllPricing();
  settingsDb.clearAllLKGP();
});

test.after(async () => {
  resetAllComboMetrics();
  resetAllCircuitBreakers();
  resetAllSemaphores();
  _resetAllDecks();
  settingsDb.clearAllLKGP();
  if (ORIGINAL_DATA_DIR === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }
  await cleanupTestDataDir();
  core.resetDbInstance();
});

test("#6427 priority combo falls back when the first target's 200 body carries a structured `error` object", async () => {
  const calls: string[] = [];
  const result = await handleComboChat({
    body: {},
    combo: {
      name: "priority-masked-200-error",
      strategy: "priority",
      models: ["deadprovider/exhausted-model", "healthyprovider/backup-model"],
      config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0 },
    },
    handleSingleModel: async (_body: unknown, modelStr: string) => {
      calls.push(modelStr);
      if (modelStr === "deadprovider/exhausted-model") {
        // Masked 200: HTTP OK, with a NON-EMPTY stub `choices[0].message.content`
        // (so the pre-existing #3424 empty-content check alone would call this
        // "valid") AND a structured OpenAI-shape error object reporting
        // exhaustion. Only the #6427 envelope check catches this.
        return jsonResponse({
          choices: [{ message: { role: "assistant", content: "Request could not be completed." } }],
          error: { message: "Insufficient credits balance", type: "insufficient_quota" },
        });
      }
      return jsonResponse({ choices: [{ message: { role: "assistant", content: "real answer" } }] });
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    allCombos: null,
  });

  assert.equal(result.ok, true, "combo must ultimately succeed via the fallback target");
  assert.deepEqual(
    calls,
    ["deadprovider/exhausted-model", "healthyprovider/backup-model"],
    "combo must fail over past the masked-200 target instead of returning it"
  );
  const bodyText = await result.clone().text();
  assert.match(bodyText, /real answer/, "the returned body must be the fallback target's real answer");
});

test("#6427 priority combo falls back when the first target's 200 body carries a known exhaustion phrase (no structured error)", async () => {
  const calls: string[] = [];
  const result = await handleComboChat({
    body: {},
    combo: {
      name: "priority-masked-200-phrase",
      strategy: "priority",
      models: ["deadprovider/exhausted-model", "healthyprovider/backup-model"],
      config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0 },
    },
    handleSingleModel: async (_body: unknown, modelStr: string) => {
      calls.push(modelStr);
      if (modelStr === "deadprovider/exhausted-model") {
        // Masked 200: NON-EMPTY stub choice content, no `error` object, but a
        // top-level `message` field (a shape some providers use instead of the
        // OpenAI `error` envelope) carries a recognizable exhaustion phrase.
        return jsonResponse({
          choices: [{ message: { role: "assistant", content: "Request could not be completed." } }],
          message: "Quota exceeded for this account",
        });
      }
      return jsonResponse({ choices: [{ message: { role: "assistant", content: "real answer" } }] });
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    allCombos: null,
  });

  assert.equal(result.ok, true, "combo must ultimately succeed via the fallback target");
  assert.deepEqual(
    calls,
    ["deadprovider/exhausted-model", "healthyprovider/backup-model"],
    "combo must fail over past the masked-200 target instead of returning it"
  );
});

test("#6427 control: a normal 200 completion that merely mentions 'quota' in assistant prose is returned, not misclassified", async () => {
  const calls: string[] = [];
  const result = await handleComboChat({
    body: {},
    combo: {
      name: "priority-quota-in-prose-control",
      strategy: "priority",
      models: ["healthyprovider/primary-model", "healthyprovider/backup-model"],
      config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0 },
    },
    handleSingleModel: async (_body: unknown, modelStr: string) => {
      calls.push(modelStr);
      return jsonResponse({
        choices: [
          {
            message: {
              role: "assistant",
              content:
                "Sure — here is an explanation of API quota exceeded errors and insufficient credits handling in general.",
            },
          },
        ],
      });
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    allCombos: null,
  });

  assert.equal(result.ok, true, "combo must succeed on the first target");
  assert.deepEqual(
    calls,
    ["healthyprovider/primary-model"],
    "a legitimate completion mentioning 'quota'/'credits' in prose must NOT trigger a false-positive fallback"
  );
  const bodyText = await result.clone().text();
  assert.match(bodyText, /quota exceeded/i, "the real assistant prose must be returned unchanged");
});
