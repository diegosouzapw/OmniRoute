import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const {
  isRetryablePreOutputTransportError,
  shouldRetrySameAccountTransport,
  sameAccountTransportRetryDelayMs,
  isTransportCooldownErrorCode,
  buildMixedAvailabilityError,
  SAME_ACCOUNT_TRANSPORT_RETRY_MAX,
} = await import("../../src/sse/services/sameAccountTransportRetry.ts");

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-9708-codex-retry-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET ||= "codex-9708-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const quotaCache = await import("../../src/domain/quotaCache.ts");
const auth = await import("../../src/sse/services/auth.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function futureIso(ms = 60_000) {
  return new Date(Date.now() + ms).toISOString();
}

async function seedConnection(provider: string, overrides: Record<string, unknown> = {}) {
  return providersDb.createProviderConnection({
    provider,
    authType: overrides.authType || "oauth",
    name: overrides.name || `${provider}-${Math.random().toString(16).slice(2, 8)}`,
    accessToken: overrides.accessToken || `tok-${Math.random().toString(16).slice(2, 10)}`,
    isActive: overrides.isActive ?? true,
    testStatus: overrides.testStatus || "active",
    priority: overrides.priority,
    rateLimitedUntil: overrides.rateLimitedUntil,
    lastError: overrides.lastError,
    lastErrorType: overrides.lastErrorType,
    errorCode: overrides.errorCode,
    providerSpecificData: overrides.providerSpecificData || {},
  });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("#9708: 503 connection-reset and 507 buffer errors are retryable pre-output transport", () => {
  assert.equal(
    isRetryablePreOutputTransportError(
      503,
      "upstream connect error or disconnect/reset before headers reset reason: remote connection failure"
    ),
    true
  );
  assert.equal(
    isRetryablePreOutputTransportError(
      507,
      "exceeded request buffer limit while retrying upstream"
    ),
    true
  );
  assert.equal(isRetryablePreOutputTransportError(504, "gateway timeout"), true);
  assert.equal(isRetryablePreOutputTransportError(502, "Bad Gateway"), true);
});

test("#9708: quota, auth, and deterministic 400s never enter the same-account retry path", () => {
  assert.equal(
    isRetryablePreOutputTransportError(
      429,
      "All codex accounts reached configured quota threshold"
    ),
    false
  );
  assert.equal(isRetryablePreOutputTransportError(401, "unauthorized"), false);
  assert.equal(isRetryablePreOutputTransportError(400, "prompt is too long"), false);
  assert.equal(
    shouldRetrySameAccountTransport({
      status: 503,
      errorText: "remote connection failure",
      attempt: 0,
      hasForcedConnection: true,
    }),
    false
  );
  assert.equal(
    shouldRetrySameAccountTransport({
      status: 503,
      errorText: "remote connection failure",
      attempt: 0,
      hasEmittedOutput: true,
    }),
    false
  );
});

test("#9708: same-account retry is bounded to exactly one attempt", () => {
  assert.equal(
    shouldRetrySameAccountTransport({
      status: 503,
      errorText: "remote connection failure",
      attempt: 0,
    }),
    true
  );
  assert.equal(
    shouldRetrySameAccountTransport({
      status: 503,
      errorText: "remote connection failure",
      attempt: SAME_ACCOUNT_TRANSPORT_RETRY_MAX,
    }),
    false
  );
});

test("#9708: retry delay stays in the 2-3s jitter window", () => {
  assert.equal(
    sameAccountTransportRetryDelayMs(() => 0),
    2000
  );
  assert.equal(
    sameAccountTransportRetryDelayMs(() => 1),
    3000
  );
  assert.equal(
    sameAccountTransportRetryDelayMs(() => 0.5),
    2500
  );
});

test("#9708: mixed-cause pool error is 503, not all-accounts-quota 429", () => {
  const mixed = buildMixedAvailabilityError({
    provider: "codex",
    quotaFilteredCount: 2,
    transportUnavailableCount: 1,
    transportStatus: 507,
  });
  assert.equal(mixed.status, 503);
  assert.equal(mixed.lastErrorCode, 503);
  assert.match(mixed.lastError, /2 quota-filtered/);
  assert.match(mixed.lastError, /1 temporarily unavailable after upstream 507/);
  assert.equal(mixed.lastError.includes("quota threshold"), false);
});

test("#9708: simulate first 503 then success on the same account; second failure rotates", () => {
  function simulate(results: Array<{ status: number; error?: string; success?: boolean }>) {
    let attempt = 0;
    let markUnavailable = 0;
    let i = 0;
    let connectionId = "acct-a";
    while (true) {
      const result = results[Math.min(i, results.length - 1)];
      if (result.success) {
        return { outcome: "success", attempt, markUnavailable, connectionId };
      }
      if (
        shouldRetrySameAccountTransport({
          status: result.status,
          errorText: result.error,
          attempt,
        })
      ) {
        attempt += 1;
        i += 1;
        continue;
      }
      markUnavailable += 1;
      connectionId = "acct-b";
      return { outcome: "fallback", attempt, markUnavailable, connectionId };
    }
  }

  const recovered = simulate([
    { status: 503, error: "remote connection failure" },
    { success: true, status: 200 },
  ]);
  assert.equal(recovered.outcome, "success");
  assert.equal(recovered.attempt, 1);
  assert.equal(recovered.markUnavailable, 0);
  assert.equal(recovered.connectionId, "acct-a");

  const rotated = simulate([
    { status: 507, error: "exceeded request buffer limit while retrying upstream" },
    { status: 507, error: "exceeded request buffer limit while retrying upstream" },
  ]);
  assert.equal(rotated.outcome, "fallback");
  assert.equal(rotated.attempt, 1);
  assert.equal(rotated.markUnavailable, 1);
  assert.equal(rotated.connectionId, "acct-b");
});

test("#9708: getProviderCredentials does not report all-quota 429 when a sibling is only transport-cooled", async () => {
  const resetAt = futureIso(120_000);
  const quotaA = await seedConnection("codex", {
    name: "codex-quota-a",
    priority: 1,
    providerSpecificData: {
      limitPolicy: { enabled: true, thresholdPercent: 75, windows: ["session"] },
    },
  });
  const quotaB = await seedConnection("codex", {
    name: "codex-quota-b",
    priority: 2,
    providerSpecificData: {
      limitPolicy: { enabled: true, thresholdPercent: 75, windows: ["session"] },
    },
  });
  await seedConnection("codex", {
    name: "codex-transport-blip",
    priority: 3,
    rateLimitedUntil: futureIso(8_000),
    errorCode: 507,
    lastError: "exceeded request buffer limit while retrying upstream",
    lastErrorType: "server_error",
  });

  quotaCache.setQuotaCache(quotaA.id, "codex", {
    session: { remainingPercentage: 0, resetAt },
  });
  quotaCache.setQuotaCache(quotaB.id, "codex", {
    session: { remainingPercentage: 0, resetAt },
  });

  const result = await auth.getProviderCredentials("codex");
  assert.equal(result.allRateLimited, true);
  assert.notEqual(result.lastErrorCode, 429);
  assert.equal(result.lastErrorCode, 503);
  assert.match(String(result.lastError), /temporarily unavailable after upstream 507/i);
  assert.equal(isTransportCooldownErrorCode(507), true);
});
