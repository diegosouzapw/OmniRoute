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

const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const { OpencodeExecutor } = await import("../../open-sse/executors/opencode.ts");
const { clearStaleLKGP } = await import("../../open-sse/services/combo.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const core = await import("../../src/lib/db/core.ts");
const { resetAllComboMetrics } = await import("../../open-sse/services/comboMetrics.ts");
const { resetAllCircuitBreakers } = await import("../../src/shared/utils/circuitBreaker.ts");
const { resetAll: resetAllSemaphores } =
  await import("../../open-sse/services/rateLimitSemaphore.ts");

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

const OPENCODE_CLIENT_REQUEST_HEADERS = {
  "user-agent": "opencode/1.18.31",
  "User-Agent": "opencode/1.18.31",
  "x-opencode-session": "ses_abc123",
  "x-opencode-session-id": "ses_abc123",
};

function jsonResponse(status: number, body: unknown) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

test("no-auth oc executor refuses callers without the OpenCode client identity", async () => {
  let dispatched = 0;
  const originalFetch = globalThis.fetch;
  const originalEnv = { ...process.env };
  delete process.env.HTTP_PROXY;
  delete process.env.HTTPS_PROXY;
  delete process.env.http_proxy;
  delete process.env.https_proxy;
  globalThis.fetch = (async () => {
    dispatched += 1;
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  }) as typeof globalThis.fetch;
  try {
    const exec = new OpencodeExecutor("opencode");
    const result = (await exec.execute({
      model: "deepseek-free",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      signal: null,
      credentials: { apiKey: "sk-test", accessToken: null, connectionId: "noauth" },
      log: createLog(),
    })) as { response: Response };
    assert.strictEqual(result.response.status, 403);
    assert.strictEqual(dispatched, 0);
  } finally {
    globalThis.fetch = originalFetch;
    process.env = originalEnv;
  }
});

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
    requestHeaders: { ...OPENCODE_CLIENT_REQUEST_HEADERS },
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
    requestHeaders: { ...OPENCODE_CLIENT_REQUEST_HEADERS },
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
    requestHeaders: { ...OPENCODE_CLIENT_REQUEST_HEADERS },
  });

  assert.equal(result.status, 502);
  const pinAfter = await settingsDb.getLKGP(comboName, comboName);
  assert.equal(pinAfter, null, "stale LKGP pin in round-robin must be cleared on unavailable skip");
});

test("#11911 follow-up: a pin naming a healthy provider survives another target being skipped", async () => {
  // The #11911 fix clears the combo-level pin from 12 call sites, none of which look at
  // which provider the pin actually names. Under `auto` the pin is a scoring input rather
  // than a hoist (resolveAutoStrategy reads it into lastKnownGoodProvider), so the pinned
  // provider is not necessarily tried first — and skipping an unrelated target destroys a
  // preference for a provider that never failed.
  const comboName = "auto-cross-provider-pin";
  await settingsDb.setLKGP(comboName, comboName, "felo", undefined);

  const result = await handleComboChat({
    body: { messages: [{ role: "user", content: "hi" }] },
    combo: {
      name: comboName,
      strategy: "auto",
      models: ["opencode/deepseek-free", "felo/felo-flash"],
      config: { maxRetries: 0 },
    },
    handleSingleModel: async (_body, targetModel) =>
      targetModel.includes("felo")
        ? jsonResponse(200, { ok: true })
        : jsonResponse(502, { error: { message: "opencode down" } }),
    isModelAvailable: async (modelStr) => !modelStr.includes("opencode"),
    log: createLog(),
    settings: null,
    relayOptions: null,
    allCombos: null,
    requestHeaders: { ...OPENCODE_CLIENT_REQUEST_HEADERS },
  });

  assert.equal(result.status, 200);
  const pinAfter = await settingsDb.getLKGP(comboName, comboName);
  assert.deepEqual(
    pinAfter,
    { provider: "felo" },
    "skipping opencode must not clear a pin naming healthy felo"
  );
});

test("#12235: a sibling connection failing does not clear a pin naming the same provider", async () => {
  // The combo pin carries a connectionId as well as a provider. Two connections
  // of the SAME provider are independent targets: one going down says nothing
  // about the other, so matching on provider alone would throw away a pin for a
  // connection that never failed.
  const comboName = "sibling-connection-pin";
  await settingsDb.setLKGP(comboName, comboName, "felo", "conn-A");

  await clearStaleLKGP(comboName, null, comboName, null, "COMBO", undefined, {
    provider: "felo",
    connectionId: "conn-B",
  });
  assert.deepEqual(
    await settingsDb.getLKGP(comboName, comboName),
    { provider: "felo", connectionId: "conn-A" },
    "conn-B failing must not clear a pin naming conn-A"
  );

  // ...and the pin IS cleared when the failure names that same connection.
  await clearStaleLKGP(comboName, null, comboName, null, "COMBO", undefined, {
    provider: "felo",
    connectionId: "conn-A",
  });
  assert.equal(
    await settingsDb.getLKGP(comboName, comboName),
    null,
    "conn-A failing must clear the pin that names it"
  );
});
