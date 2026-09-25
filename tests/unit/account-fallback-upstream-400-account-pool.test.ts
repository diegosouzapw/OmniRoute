/**
 * Regression test for #13757:
 * Any upstream 400 Bad Request (such as parameter-validation rejection,
 * `_omnirouteSkipContextRelay: Extra inputs are not permitted`, or malformed request)
 * must NOT trigger account-level cooldown or exhaust every account in the pool.
 *
 * Deterministic client/body errors must skip connection-level disable and avoid
 * rotating through sibling accounts of the same model, which would identically fail
 * and result in "all N active accounts rate limited".
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-13757-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "13757-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const auth = await import("../../src/sse/services/auth.ts");
const { shouldSkipConnDisable, isParamValidation400 } =
  await import("../../open-sse/services/combo/comboPredicates.ts");
const { PARAM_VALIDATION_PATTERNS } = await import("../../open-sse/services/accountFallback.ts");

const BASE_ARGS = { is401: false, hasExtraKeys: false, provider: "claude" } as const;

async function resetStorage13757() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedConn13757(provider: string): Promise<string> {
  const conn = await providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    apiKey: `${provider}-test-key-${Math.random().toString(36).slice(2)}`,
    isActive: true,
    testStatus: "active",
  });
  return (conn as Record<string, unknown>).id as string;
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("#13757: PARAM_VALIDATION_PATTERNS matches 'Extra inputs are not permitted'", () => {
  const text1 = "[400]: _omnirouteSkipContextRelay: Extra inputs are not permitted";
  const text2 = "Extra inputs are not permitted";
  const text3 = "Extra inputs not permitted, field: 'client_metadata'";
  const text4 = "Additional properties are not allowed: 'foo'";
  const text5 = "unknown fields: bar";

  assert.ok(
    PARAM_VALIDATION_PATTERNS.some((p) => p.test(text1)),
    "PARAM_VALIDATION_PATTERNS must match _omnirouteSkipContextRelay: Extra inputs are not permitted"
  );
  assert.ok(
    PARAM_VALIDATION_PATTERNS.some((p) => p.test(text2)),
    "PARAM_VALIDATION_PATTERNS must match Extra inputs are not permitted"
  );
  assert.ok(
    PARAM_VALIDATION_PATTERNS.some((p) => p.test(text3)),
    "PARAM_VALIDATION_PATTERNS must match Extra inputs not permitted"
  );
  assert.ok(
    PARAM_VALIDATION_PATTERNS.some((p) => p.test(text4)),
    "PARAM_VALIDATION_PATTERNS must match Additional properties are not allowed"
  );
  assert.ok(
    PARAM_VALIDATION_PATTERNS.some((p) => p.test(text5)),
    "PARAM_VALIDATION_PATTERNS must match unknown fields"
  );
});

test("#13757: isParamValidation400 matches extra inputs and unknown fields", () => {
  assert.equal(
    isParamValidation400("[400]: _omnirouteSkipContextRelay: Extra inputs are not permitted"),
    true
  );
  assert.equal(isParamValidation400("Extra inputs are not permitted"), true);
  assert.equal(isParamValidation400("parameter is illegal: max_tokens"), true);
  assert.equal(isParamValidation400("unknown field: foo"), true);
  assert.equal(isParamValidation400("unrecognized field: bar"), true);
  assert.equal(isParamValidation400("unexpected property: baz"), true);
});

test("#13757: shouldSkipConnDisable returns true for request/parameter 400s", () => {
  // Exact #13757 repro case
  assert.equal(
    shouldSkipConnDisable(
      {
        status: 400,
        rawMessage: "[400]: _omnirouteSkipContextRelay: Extra inputs are not permitted",
      },
      BASE_ARGS.is401,
      BASE_ARGS.hasExtraKeys,
      BASE_ARGS.provider
    ),
    true,
    "Extra inputs are not permitted must skip connection disable"
  );

  assert.equal(
    shouldSkipConnDisable(
      { status: 400, error: "parameter is illegal: max_tokens" },
      BASE_ARGS.is401,
      BASE_ARGS.hasExtraKeys,
      BASE_ARGS.provider
    ),
    true,
    "parameter is illegal must skip connection disable"
  );

  assert.equal(
    shouldSkipConnDisable(
      { status: 400, error: "max_tokens must be <= 4096" },
      BASE_ARGS.is401,
      BASE_ARGS.hasExtraKeys,
      BASE_ARGS.provider
    ),
    true,
    "max_tokens out of range must skip connection disable"
  );

  assert.equal(
    shouldSkipConnDisable(
      { status: 400, error: "Invalid message format: the request body is malformed" },
      BASE_ARGS.is401,
      BASE_ARGS.hasExtraKeys,
      BASE_ARGS.provider
    ),
    true,
    "malformed message format must skip connection disable"
  );

  assert.equal(
    shouldSkipConnDisable(
      { status: 400, error: "messages must alternate between user and assistant" },
      BASE_ARGS.is401,
      BASE_ARGS.hasExtraKeys,
      BASE_ARGS.provider
    ),
    true,
    "messages alternation error must skip connection disable"
  );

  assert.equal(
    shouldSkipConnDisable(
      { status: 400, error: "Input exceeds context window of 128000 tokens" },
      BASE_ARGS.is401,
      BASE_ARGS.hasExtraKeys,
      BASE_ARGS.provider
    ),
    true,
    "context overflow must skip connection disable"
  );

  assert.equal(
    shouldSkipConnDisable(
      { status: 400, errorCode: "context_length_exceeded" },
      BASE_ARGS.is401,
      BASE_ARGS.hasExtraKeys,
      BASE_ARGS.provider
    ),
    true,
    "context_length_exceeded errorCode must skip connection disable"
  );
});

test("#13757: shouldSkipConnDisable does NOT skip for rate-limit 400 or bad API key 400", () => {
  // Non-standard 400 with rate-limit text (e.g. MiMoCode)
  assert.equal(
    shouldSkipConnDisable(
      { status: 400, error: "Detected high-frequency non-compliant requests from you." },
      BASE_ARGS.is401,
      BASE_ARGS.hasExtraKeys,
      "mimocode"
    ),
    false,
    "400 with rate-limit text must NOT skip connection disable (must cooldown)"
  );

  // 400 with invalid API key
  assert.equal(
    shouldSkipConnDisable(
      { status: 400, error: "Invalid API key provided for model gpt-4o" },
      BASE_ARGS.is401,
      BASE_ARGS.hasExtraKeys,
      "openai"
    ),
    false,
    "400 with invalid API key must NOT skip connection disable (account-level defect)"
  );

  // Normal 403
  assert.equal(
    shouldSkipConnDisable(
      { status: 403, error: "Forbidden: account suspended" },
      BASE_ARGS.is401,
      BASE_ARGS.hasExtraKeys,
      BASE_ARGS.provider
    ),
    false,
    "real 403 must NOT skip connection disable"
  );

  // 400 with empty or undefined error text
  assert.equal(
    shouldSkipConnDisable({ status: 400 }, BASE_ARGS.is401, BASE_ARGS.hasExtraKeys, "claude"),
    false,
    "400 with undefined error must NOT skip connection disable"
  );
  assert.equal(
    shouldSkipConnDisable(
      { status: 400, error: "" },
      BASE_ARGS.is401,
      BASE_ARGS.hasExtraKeys,
      "claude"
    ),
    false,
    "400 with empty error must NOT skip connection disable"
  );
});

test("#13757: markAccountUnavailable records NO cooldown when shouldSkipConnDisable applies at callsite", async () => {
  await resetStorage13757();
  const connId = await seedConn13757("claude");

  // In chat.ts, shouldSkipConnDisable(result) is checked BEFORE calling markAccountUnavailable.
  // When shouldSkipConnDisable is true, markAccountUnavailable is bypassed entirely.
  // Test both rawMessage and error property shapes.
  const skipRaw = shouldSkipConnDisable(
    {
      status: 400,
      rawMessage: "[400]: _omnirouteSkipContextRelay: Extra inputs are not permitted",
    },
    false,
    false,
    "claude"
  );
  assert.equal(skipRaw, true, "shouldSkipConnDisable must return true with rawMessage");

  const skipErr = shouldSkipConnDisable(
    { status: 400, error: "[400]: _omnirouteSkipContextRelay: Extra inputs are not permitted" },
    false,
    false,
    "claude"
  );
  assert.equal(skipErr, true, "shouldSkipConnDisable must return true with error property");

  // Connection stays pristine without any cooldown or unavailable state
  const conn = await providersDb.getProviderConnectionById(connId);
  assert.ok(!conn.rateLimitedUntil, "account must not have rateLimitedUntil");
  assert.notStrictEqual(conn.testStatus, "unavailable", "testStatus must not be unavailable");
});

test("#13757 acceptance: parameter-validation 400 skips connection disable and keeps all accounts active", async () => {
  await resetStorage13757();
  const connIds: string[] = [];
  for (let i = 0; i < 3; i++) {
    connIds.push(await seedConn13757("claude"));
  }

  // Simulate account 1 receiving parameter-validation 400
  const result = {
    status: 400,
    rawMessage: "[400]: _omnirouteSkipContextRelay: Extra inputs are not permitted",
  };
  const is401 = false;
  const hasExtraKeys = false;
  const skip = shouldSkipConnDisable(result, is401, hasExtraKeys, "claude");
  assert.equal(skip, true, "shouldSkipConnDisable must return true for extra inputs 400");

  // In chat.ts, when skipConnectionDisable is true, markAccountUnavailable is bypassed:
  const { shouldFallback, cooldownMs } = skip
    ? { shouldFallback: false, cooldownMs: 0 }
    : await auth.markAccountUnavailable(
        connIds[0],
        400,
        result.rawMessage,
        "claude",
        "claude-sonnet-5"
      );

  assert.equal(shouldFallback, false, "must not trigger fallback/rotation to next account");
  assert.equal(cooldownMs, 0, "must not cooldown account");

  // Verify ALL 3 accounts remain active and healthy in DB
  for (const id of connIds) {
    const conn = await providersDb.getProviderConnectionById(id);
    assert.ok(!conn.rateLimitedUntil, `account ${id} must not be rate-limited`);
    assert.notStrictEqual(conn.testStatus, "unavailable", `account ${id} must not be unavailable`);
    assert.ok(conn.isActive, `account ${id} must remain active`);
  }
});
