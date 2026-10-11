/**
 * Regression guard: a permanently retired model (Gemini's deprecated-model 404,
 * "This model models/gemini-2.5-flash is no longer available to new users...",
 * or a Fireworks/etc. end-of-life 410) must get a long, fixed lockout instead of
 * falling through to the generic transient-error branch's short backoff.
 *
 * Without this classification, combo/auto-routing kept re-selecting the dead
 * model roughly every cooldown window (a few minutes, escalating to ~20min max)
 * for as long as the model stayed in the registry — all day, every day — sending
 * guaranteed-to-fail requests to the provider. At volume this looks like abusive
 * traffic and was implicated in a Gemini free-tier API key getting banned.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const DAY_MS = 24 * 60 * 60 * 1000;

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-retired-model-410-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "retired-model-410-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const auth = await import("../../src/sse/services/auth.ts");

const { checkFallbackError, isModelPermanentlyUnavailable, clearAllModelLockouts } =
  await import("../../open-sse/services/accountFallback.ts");

const GEMINI_DEPRECATED_404 =
  "[404]: This model models/gemini-2.5-flash is no longer available to new users. " +
  "Please update your code to use models/gemini-3.6-flash for the latest features and improvements.";

const END_OF_LIFE_410 =
  '[410]: {"type":"about:blank","title":"Gone","status":410,"detail":"The model ' +
  "'minimaxai/minimax-m2.7' has reached its end of life on 2026-07-27T00:00:00Z and is no longer available.\"}\n";

// A retired model whose wording names no "model" near "retired": no pattern matches it.
const RETIRED_WITHOUT_MODEL_WORD_410 =
  "[410]: glm-5.1 was retired at 2026-09-25 00:00:00 -0700 PDT (ref: x)";

const RETIRED_MODEL = "glm-5.1";

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedConnection(provider: string, name: string) {
  return providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    name,
    apiKey: `sk-${name}`,
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  clearAllModelLockouts();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("isModelPermanentlyUnavailable matches Gemini's deprecated-model phrasing", () => {
  assert.equal(isModelPermanentlyUnavailable(GEMINI_DEPRECATED_404), true);
});

test("isModelPermanentlyUnavailable matches end-of-life phrasing", () => {
  assert.equal(isModelPermanentlyUnavailable(END_OF_LIFE_410), true);
});

test("isModelPermanentlyUnavailable does not match an ordinary 404", () => {
  assert.equal(
    isModelPermanentlyUnavailable("[404]: Model not found, inaccessible, and/or not deployed"),
    false
  );
});

test("checkFallbackError locks a deprecated Gemini model for 24h, not a short backoff", () => {
  const result = checkFallbackError(404, GEMINI_DEPRECATED_404, 0, "gemini-2.5-flash", "gemini");

  assert.equal(result.shouldFallback, true);
  assert.equal(result.reason, "not_found");
  assert.equal(result.cooldownMs, 24 * 60 * 60 * 1000);
  // Feeds combo.ts's per-request model-lockout as an upstream-verified reset,
  // so it bypasses the normal ~20min model-lockout ceiling.
  assert.equal(result.quotaResetHintMs, 24 * 60 * 60 * 1000);
});

test("checkFallbackError locks an end-of-life model (410) for 24h too", () => {
  const result = checkFallbackError(410, END_OF_LIFE_410, 0, "minimaxai/minimax-m2.7", "nvidia");

  assert.equal(result.shouldFallback, true);
  assert.equal(result.reason, "not_found");
  assert.equal(result.cooldownMs, 24 * 60 * 60 * 1000);
});

test("a generic 404 (not a deprecation message) still falls through to the short transient cooldown", () => {
  const result = checkFallbackError(
    404,
    "[404]: Model not found, inaccessible, and/or not deployed",
    0,
    "some-model",
    "openrouter"
  );

  assert.equal(result.reason, "unknown");
  assert.notEqual(result.cooldownMs, 24 * 60 * 60 * 1000);
});

test("a 410 without recognized wording still locks the retired model for 24h", () => {
  assert.equal(isModelPermanentlyUnavailable(RETIRED_WITHOUT_MODEL_WORD_410), false);

  const result = checkFallbackError(
    410,
    RETIRED_WITHOUT_MODEL_WORD_410,
    0,
    RETIRED_MODEL,
    "openai"
  );

  assert.equal(result.shouldFallback, true);
  assert.equal(result.reason, "not_found");
  assert.equal(result.cooldownMs, DAY_MS);
  assert.equal(result.quotaResetHintMs, DAY_MS);
});

test("a 410 with empty text locks the retired model for 24h", () => {
  const result = checkFallbackError(410, "", 0, RETIRED_MODEL, "openai");

  assert.equal(result.shouldFallback, true);
  assert.equal(result.reason, "not_found");
  assert.equal(result.cooldownMs, DAY_MS);
  assert.equal(result.quotaResetHintMs, DAY_MS);
});

test("a 410 with null text locks the retired model for 24h", () => {
  const result = checkFallbackError(410, null, 0, RETIRED_MODEL, "openai");

  assert.equal(result.shouldFallback, true);
  assert.equal(result.reason, "not_found");
  assert.equal(result.cooldownMs, DAY_MS);
  assert.equal(result.quotaResetHintMs, DAY_MS);
});

test("a 404 with recognized wording still locks for 24h", () => {
  const result = checkFallbackError(
    404,
    "[404]: the model foo is no longer available to new users",
    0,
    "foo",
    "openai"
  );

  assert.equal(result.shouldFallback, true);
  assert.equal(result.reason, "not_found");
  assert.equal(result.cooldownMs, DAY_MS);
  assert.equal(result.quotaResetHintMs, DAY_MS);
});

test("the 24h lockout lasts exactly 24h on a 25-hour day", () => {
  const realNow = Date.now;
  // 2026-10-25: daylight saving ends in Europe, a 25-hour day.
  const fixedNow = Date.parse("2026-10-25T12:00:00Z");
  Date.now = () => fixedNow;
  try {
    const result = checkFallbackError(
      410,
      RETIRED_WITHOUT_MODEL_WORD_410,
      0,
      RETIRED_MODEL,
      "openai"
    );
    assert.equal(result.cooldownMs, DAY_MS);
    assert.equal(new Date(fixedNow + result.cooldownMs).getTime() - fixedNow, DAY_MS);
  } finally {
    Date.now = realNow;
  }
});

test("five connections all answering 410 are each cooled once and never retried", async () => {
  const ids: string[] = [];
  for (let i = 0; i < 5; i++) {
    const connection = await seedConnection("openai", `openai-410-retired-${i}`);
    ids.push(connection.id);
  }

  const firstMarks = [];
  for (const id of ids) {
    const result = await auth.markAccountUnavailable(
      id,
      410,
      RETIRED_WITHOUT_MODEL_WORD_410,
      "openai",
      RETIRED_MODEL
    );
    assert.equal(result.shouldFallback, true);
    assert.equal(result.cooldownMs, DAY_MS);
    firstMarks.push(result);
    void firstMarks;
  }

  const cooledUntil: Array<string | null> = [];
  for (const id of ids) {
    const after = await providersDb.getProviderConnectionById(id);
    assert.equal(after?.testStatus, "unavailable");
    assert.ok(after?.rateLimitedUntil, "each 410 connection must carry a rateLimitedUntil");
    assert.ok(
      new Date(String(after?.rateLimitedUntil)).getTime() - Date.now() > DAY_MS - 60_000,
      "each 410 connection must be cooled for about 24h"
    );
    cooledUntil.push(after?.rateLimitedUntil ?? null);
  }

  for (let i = 0; i < ids.length; i++) {
    const again = await auth.markAccountUnavailable(
      ids[i],
      410,
      RETIRED_WITHOUT_MODEL_WORD_410,
      "openai",
      RETIRED_MODEL
    );
    assert.equal(again.shouldFallback, true);
    assert.ok(
      again.cooldownMs < DAY_MS,
      "re-marking a cooled connection must return the remaining time, not a fresh 24h"
    );
    const after = await providersDb.getProviderConnectionById(ids[i]);
    assert.equal(
      after?.rateLimitedUntil ?? null,
      cooledUntil[i],
      "re-marking a cooled connection must not move its cooldown"
    );
  }
});
