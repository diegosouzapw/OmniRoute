import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// #13609 rework: a bare Mistral 401 is byte-identical for a revoked key and an
// exhausted quota (#7638). With MISTRAL_AMBIGUOUS_401_SOFT_LOCKOUT on, it cools the
// connection down instead of parking it as expired — at most 3 times per hour per
// connection, then it parks, so a revoked key still converges. Flag off (default):
// every bare Mistral 401 parks the connection as before.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-13609-mistral-401-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const FLAG = "MISTRAL_AMBIGUOUS_401_SOFT_LOCKOUT";
const BARE = '{"detail":"Unauthorized"}';

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const auth = await import("../../src/sse/services/auth.ts");
const { checkFallbackError } = await import("../../open-sse/services/accountFallback.ts");
const { resolveTerminalConnectionStatus } =
  await import("../../src/sse/services/authTerminalStatus.ts");
const { classifyProviderError, PROVIDER_ERROR_TYPES } =
  await import("../../open-sse/services/errorClassifier.ts");
const { setOperatorProviderErrorRules } =
  await import("../../open-sse/config/providerErrorRules.ts");
const {
  isMistralAmbiguous401,
  takeMistralAmbiguous401SoftStrike,
  resetMistralAmbiguous401Strikes,
  MISTRAL_AMBIGUOUS_401_MAX_SOFT_STRIKES,
  MISTRAL_AMBIGUOUS_401_STRIKE_WINDOW_MS,
} = await import("../../open-sse/services/accountFallback/mistralAmbiguousAuth.ts");
const { classifyFailure } = await import("../../src/app/api/providers/[id]/test/route.ts");

const priorFlag = process.env[FLAG];

function setFlag(value: string | undefined) {
  if (value === undefined) delete process.env[FLAG];
  else process.env[FLAG] = value;
}

test.beforeEach(() => {
  resetMistralAmbiguous401Strikes();
  setFlag(undefined);
});

test.after(() => {
  setFlag(priorFlag);
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function bareMistral401() {
  return checkFallbackError(401, BARE, 0, null, "mistral", null, null, null);
}

test("one shared predicate: the connection-test diagnosis and the runtime agree", () => {
  assert.equal(isMistralAmbiguous401("mistral", BARE), true);
  assert.equal(isMistralAmbiguous401("mistral", "Invalid API key"), false);
  assert.equal(isMistralAmbiguous401("openai", BARE), false);
  assert.equal(
    classifyFailure({ error: BARE, statusCode: 401, provider: "mistral" }).type,
    "upstream_ambiguous_auth_or_quota"
  );
  assert.equal(
    classifyFailure({ error: "Token invalid", statusCode: 401, provider: "mistral" }).type,
    "upstream_auth_error"
  );
});

test("flag off: a bare Mistral 401 stays an auth_error and resolves expired", () => {
  const r = bareMistral401();
  assert.equal(r.reason, "auth_error");
  assert.equal(r.ambiguousAuth, undefined);
  const type = classifyProviderError(401, BARE, "mistral");
  assert.equal(
    resolveTerminalConnectionStatus(401, r, type, "mistral", false, BARE, "c1"),
    "expired"
  );
});

test("flag on: a bare Mistral 401 backs off instead of asserting an auth failure", () => {
  setFlag("true");
  const r = bareMistral401();
  assert.notEqual(r.reason, "auth_error");
  assert.equal(r.ambiguousAuth, true);
  assert.equal(r.shouldFallback, true);
  assert.ok(!r.permanent);
  assert.ok(r.cooldownMs > 0, "a real cooldown, not an immediate reselect");
});

test("flag on: explicit auth signals, other providers and operator rules are unchanged", () => {
  setFlag("true");
  for (const body of ["Invalid API key", "token invalid", "revoked", "access denied"]) {
    const r = checkFallbackError(401, body, 0, null, "mistral", null, null, null);
    assert.equal(r.reason, "auth_error", body);
    assert.equal(r.ambiguousAuth, undefined, body);
  }
  assert.equal(
    checkFallbackError(401, BARE, 0, null, "openai", null, null, null).reason,
    "auth_error"
  );
  setOperatorProviderErrorRules({
    mistral: [{ status: 401, match: "unauthorized", scope: "connection", cooldownMs: 99999 }],
  });
  try {
    const r = bareMistral401();
    assert.equal(r.reason, "quota_exhausted");
    assert.equal(r.cooldownMs, 99999);
    assert.equal(r.ambiguousAuth, undefined);
  } finally {
    setOperatorProviderErrorRules({});
  }
});

test("strike bound: 3 soft strikes per window, the 4th parks and restarts the count", () => {
  const t0 = 1_000_000;
  for (let i = 1; i <= MISTRAL_AMBIGUOUS_401_MAX_SOFT_STRIKES; i++) {
    assert.equal(takeMistralAmbiguous401SoftStrike("conn", t0 + i), true, `strike ${i}`);
  }
  assert.equal(takeMistralAmbiguous401SoftStrike("conn", t0 + 10), false, "bound reached");
  assert.equal(takeMistralAmbiguous401SoftStrike("conn", t0 + 11), true, "fresh count after park");
  assert.equal(takeMistralAmbiguous401SoftStrike("other", t0 + 12), true, "per connection");
  // Strikes older than the window do not accumulate.
  resetMistralAmbiguous401Strikes();
  for (let i = 0; i < MISTRAL_AMBIGUOUS_401_MAX_SOFT_STRIKES; i++) {
    takeMistralAmbiguous401SoftStrike("slow", t0);
  }
  assert.equal(
    takeMistralAmbiguous401SoftStrike("slow", t0 + MISTRAL_AMBIGUOUS_401_STRIKE_WINDOW_MS),
    true
  );
});

test("resolveTerminalConnectionStatus ignores ambiguousAuth without a connection id or for other types", () => {
  const r = { ambiguousAuth: true };
  assert.equal(
    resolveTerminalConnectionStatus(
      401,
      r,
      PROVIDER_ERROR_TYPES.UNAUTHORIZED,
      "mistral",
      false,
      BARE
    ),
    "expired"
  );
  assert.equal(
    resolveTerminalConnectionStatus(
      401,
      {},
      PROVIDER_ERROR_TYPES.UNAUTHORIZED,
      "mistral",
      false,
      BARE,
      "c"
    ),
    "expired"
  );
});

async function createMistralConnection() {
  const conn = await providersDb.createProviderConnection({
    provider: "mistral",
    authType: "apikey",
    apiKey: "mistral-test-key",
    isActive: true,
    testStatus: "active",
  });
  return String(conn.id);
}

async function expireCooldown(connId: string) {
  // What selection-time auto-decay does once rateLimitedUntil has passed.
  await providersDb.updateProviderConnection(connId, {
    rateLimitedUntil: null,
    testStatus: "active",
  });
}

test("markAccountUnavailable, flag off: one bare Mistral 401 parks the connection as expired", async () => {
  const connId = await createMistralConnection();

  await auth.markAccountUnavailable(connId, 401, BARE, "mistral", "mistral-large-latest");

  const after = await providersDb.getProviderConnectionById(connId);
  assert.equal(after.testStatus, "expired");
});

test("markAccountUnavailable, flag on: cooldown for 3 bare 401s, then expired", async () => {
  setFlag("true");
  const connId = await createMistralConnection();

  for (let strike = 1; strike <= MISTRAL_AMBIGUOUS_401_MAX_SOFT_STRIKES; strike++) {
    await auth.markAccountUnavailable(connId, 401, BARE, "mistral", "mistral-large-latest");
    const cooling = await providersDb.getProviderConnectionById(connId);
    assert.equal(cooling.testStatus, "unavailable", `strike ${strike} cools down`);
    assert.ok(
      new Date(String(cooling.rateLimitedUntil)).getTime() > Date.now(),
      `strike ${strike} sets a future rateLimitedUntil`
    );
    await expireCooldown(connId);
  }

  await auth.markAccountUnavailable(connId, 401, BARE, "mistral", "mistral-large-latest");
  const parked = await providersDb.getProviderConnectionById(connId);
  assert.equal(parked.testStatus, "expired", "a persistent bare 401 still converges");
});

test("markAccountUnavailable, flag on: an explicit auth signal parks on the first 401", async () => {
  setFlag("true");
  const connId = await createMistralConnection();

  await auth.markAccountUnavailable(
    connId,
    401,
    "Invalid API key",
    "mistral",
    "mistral-large-latest"
  );

  const after = await providersDb.getProviderConnectionById(connId);
  assert.equal(after.testStatus, "expired");
});
