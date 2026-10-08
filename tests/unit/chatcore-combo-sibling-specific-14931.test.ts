// Regression for #14931 (limit side): an UNCATALOGED combo member must not
// clamp the whole combo's runtime context limit to the generic 128000
// catch-all. chatCore builds comboTargetLimits via getComboTargetTokenLimit(),
// which now returns undefined for targets whose window resolves only from the
// non-specific default (the sibling-side counterpart of #10734's
// getSourcedTokenLimit rule). The executing member itself being uncataloged
// therefore inherits min(known sibling windows) — here 1,000,000 — instead of
// the baseless 128000 that false-killed ~50k-real-token Codex requests.
//
// Two cases against the same combo [unknown member, 1M env-declared sibling]:
//   A) ~150k estimated tokens: OLD code 400s at 128000; NEW code passes the
//      guard and succeeds against the stubbed upstream.
//   B) ~1.1M estimated tokens: still rejected, citing the inherited 1,000,000
//      (the guard keeps its teeth — inheritance is a better estimate, not the
//      removal of the check).
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-sibling-14931-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");

// Provider/model names chosen to match no registry entry and no name-family
// heuristic in resolveTokenLimit(), so the unknown member resolves ONLY to the
// generic 128000 (specific=false).
const UNKNOWN_PROVIDER = "c14931-unkprov";
const UNKNOWN_MODEL = "c14931-unkmodel";
// Known sibling: env override is the highest-priority specific source.
const KNOWN_PROVIDER = "c14931-knownprov";
const KNOWN_MODEL = "c14931-knownmodel";
const KNOWN_LIMIT_ENV = "CONTEXT_LENGTH_C14931_KNOWNPROV";
const KNOWN_LIMIT = 1_000_000;
const COMBO_NAME = "c14931-test-combo";

const originalFetch = globalThis.fetch;
const originalKnownEnv = process.env[KNOWN_LIMIT_ENV];

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function buildRequest(content: string) {
  return {
    body: {
      model: UNKNOWN_MODEL,
      messages: [{ role: "user", content }],
      stream: false,
    },
    modelInfo: {
      provider: UNKNOWN_PROVIDER,
      model: UNKNOWN_MODEL,
      extendedContext: false,
    },
    credentials: {
      apiKey: "sk-test",
      providerSpecificData: { baseUrl: "https://c14931.example.test" },
    },
    clientRawRequest: {
      endpoint: "/v1/chat/completions",
      body: {
        model: UNKNOWN_MODEL,
        messages: [{ role: "user", content }],
        stream: false,
      },
      headers: new Headers({ accept: "application/json" }),
    },
    userAgent: "unit-test",
    isCombo: true,
    comboName: COMBO_NAME,
    log: {
      debug() {},
      info() {},
      warn() {},
      error() {},
    },
  };
}

test.before(async () => {
  await resetStorage();
  process.env[KNOWN_LIMIT_ENV] = String(KNOWN_LIMIT);
  await combosDb.createCombo({
    name: COMBO_NAME,
    models: [`${UNKNOWN_PROVIDER}/${UNKNOWN_MODEL}`, `${KNOWN_PROVIDER}/${KNOWN_MODEL}`],
  });
  globalThis.fetch = async () =>
    new Response(JSON.stringify({ choices: [{ message: { content: "stub ok" } }] }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
});

test.after(() => {
  globalThis.fetch = originalFetch;
  if (originalKnownEnv === undefined) {
    delete process.env[KNOWN_LIMIT_ENV];
  } else {
    process.env[KNOWN_LIMIT_ENV] = originalKnownEnv;
  }
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("#14931 A: uncataloged executing member no longer clamped to generic 128000 by itself", async () => {
  // 600k chars → ~150k estimated tokens: above the old 128000 combo-min, far
  // below the inherited 1,000,000. Old code: 400 "limit 128000". New code: the
  // guard passes — the stubbed upstream answers, and even if the leg later
  // fails for unrelated executor reasons, the failure must NOT be a
  // context-length rejection.
  const content = "x".repeat(600_000);
  const result = await handleChatCore(buildRequest(content));
  if (result.success) {
    assert.ok(true, "guard passed and the stubbed upstream answered");
    return;
  }
  const failure = result as { success: false; error: string; rawMessage?: string };
  const message = failure.rawMessage ?? failure.error;
  assert.doesNotMatch(
    message,
    /context_length_exceeded|exceeds (maximum input tokens|context window)/i,
    `the request must not be rejected by the context guard; got: ${message}`
  );
  assert.doesNotMatch(message, /limit 128000\b/, `got: ${message}`);
});

test("#14931 B: oversized request still rejected against the inherited sibling limit", async () => {
  // 4.6M chars → ~1.15M estimated tokens: above even the inherited window.
  const content = "x".repeat(4_600_000);
  const result = await handleChatCore(buildRequest(content));
  assert.equal(result.success, false, "expected the oversized request to be rejected");
  const failure = result as { success: false; error: string; rawMessage?: string };
  const message = failure.rawMessage ?? failure.error;
  assert.match(
    message,
    /limit 1000000\b/,
    `expected the rejection to cite the inherited 1,000,000 limit; got: ${message}`
  );
  assert.doesNotMatch(
    message,
    /limit 128000\b/,
    "the generic 128000 must not be the cited limit once a known sibling exists"
  );
});
