/**
 * Regression test for #11911:
 * When a provider/connection fails and enters exhaustion sets (e.g. auth-level 401 or
 * connection-level error on an unauthenticated free tier connection), or when a target
 * is skipped before dispatch because it is unavailable, locked, in cooldown, or already
 * exhausted for this request, any persisted LKGP pin for that target/combo must be cleared
 * so subsequent requests do not keep re-pinning the dead provider.
 */
import test, { after, beforeEach } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-lkgp-stale-11911-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { handleComboChat } = await import("../../../open-sse/services/combo.ts");
const settingsDb = await import("../../../src/lib/db/settings.ts");
const core = await import("../../../src/lib/db/core.ts");
const { resetAllComboMetrics } = await import("../../../open-sse/services/comboMetrics.ts");
const { resetAllCircuitBreakers } = await import("../../../src/shared/utils/circuitBreaker.ts");
const { resetAll: resetAllSemaphores } = await import("../../../open-sse/services/rateLimitSemaphore.ts");

after(() => {
  core.resetDbInstance();
  try {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  } catch {}
});

beforeEach(() => {
  resetAllComboMetrics();
  resetAllCircuitBreakers();
  resetAllSemaphores();
  settingsDb.clearAllLKGP();
});

function createLog() {
  return {
    info: () => {},
    warn: () => {},
    error: () => {},
    debug: () => {},
  };
}

function jsonResponse(status: number, body: unknown) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

test("#11911: handleComboChat clears LKGP pin when target is skipped before dispatch (unavailable)", async () => {
  const comboName = "auto-coding-skip-unavail";
  const modelStr1 = "opencode/deepseek-free";
  const modelStr2 = "felo/felo-flash";

  await settingsDb.setLKGP(comboName, comboName, "opencode", "noauth");
  await settingsDb.setLKGP(comboName, `opencode>${modelStr1}`, "opencode", "noauth");

  const result = await handleComboChat({
    body: { messages: [{ role: "user", content: "hi" }] },
    combo: {
      name: comboName,
      strategy: "lkgp",
      models: [modelStr1, modelStr2],
      config: { maxRetries: 0 },
    },
    handleSingleModel: async (_body, targetModel) => {
      if (targetModel.includes("opencode")) {
        throw new Error("opencode should not be called if unavailable");
      }
      return jsonResponse(502, { error: { message: "felo upstream error" } });
    },
    isModelAvailable: async (modelStr) => {
      if (modelStr.includes("opencode")) return false;
      return true;
    },
    log: createLog(),
    settings: null,
    relayOptions: null,
    allCombos: null,
  });

  assert.equal(result.status, 502);
  const pinAfter = await settingsDb.getLKGP(comboName, comboName);
  assert.equal(pinAfter, null, "stale LKGP pin for unavailable target must be cleared");
});

test("#11911: handleComboChat clears LKGP pin when target is skipped before dispatch due to request exhaustion", async () => {
  const comboName = "auto-coding-skip-exhausted";
  const modelStr1 = "opencode/deepseek-free";
  const modelStr2 = "opencode/north-mini-free";
  const modelStr3 = "felo/felo-flash";

  await settingsDb.setLKGP(comboName, comboName, "opencode", "noauth");

  const result = await handleComboChat({
    body: { messages: [{ role: "user", content: "hi" }] },
    combo: {
      name: comboName,
      strategy: "lkgp",
      models: [modelStr1, modelStr2, modelStr3],
      config: { maxRetries: 0 },
    },
    handleSingleModel: async (_body, targetModel) => {
      if (targetModel === modelStr1) {
        return jsonResponse(401, {
          error: { message: "Auth failed on connection noauth", type: "authentication_error" },
        });
      }
      if (targetModel === modelStr2) {
        throw new Error("modelStr2 should be skipped by request exhaustion");
      }
      return jsonResponse(502, { error: { message: "felo failed" } });
    },
    log: createLog(),
    settings: null,
    relayOptions: null,
    allCombos: null,
  });

  assert.equal(result.status, 502);
  const pinAfter = await settingsDb.getLKGP(comboName, comboName);
  assert.equal(pinAfter, null, "LKGP pin must be cleared when provider connection is exhausted");
});

test("#11911: handleComboChat (round-robin) clears LKGP pin when target is skipped before dispatch", async () => {
  const comboName = "rr-skip-unavail";
  const modelStr1 = "opencode/deepseek-free";
  const modelStr2 = "felo/felo-flash";

  await settingsDb.setLKGP(comboName, comboName, "opencode", "noauth");
  await settingsDb.setLKGP(comboName, `opencode>${modelStr1}`, "opencode", "noauth");

  const result = await handleComboChat({
    body: { messages: [{ role: "user", content: "hi" }] },
    combo: {
      name: comboName,
      strategy: "round-robin",
      models: [modelStr1, modelStr2],
      config: { maxRetries: 0 },
    },
    handleSingleModel: async (_body, targetModel) => {
      if (targetModel.includes("opencode")) {
        throw new Error("opencode should not be called if unavailable");
      }
      return jsonResponse(502, { error: { message: "felo upstream error" } });
    },
    isModelAvailable: async (modelStr) => {
      if (modelStr.includes("opencode")) return false;
      return true;
    },
    log: createLog(),
    settings: null,
    relayOptions: null,
    allCombos: null,
  });

  assert.equal(result.status, 502);
  const pinAfter = await settingsDb.getLKGP(comboName, comboName);
  assert.equal(pinAfter, null, "stale LKGP pin in round-robin must be cleared on unavailable skip");
});
