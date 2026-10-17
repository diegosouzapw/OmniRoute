// Local per-connection GitHub Copilot AI Credits cutoff.
//
// The limit is enforced through the existing quota-policy skip (account
// selection), never by a fetch on the request hot path. It is FAIL-OPEN: an
// absent or stale usage reading does not block the connection. Only a fresh
// reading at/above the limit (or an explicit limit of 0) skips the account so
// normal account fallback picks another connection.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-gh-credit-limit-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.APP_LOG_TO_FILE = "false";

const core = await import("../../src/lib/db/core.ts");
const auth = await import("../../src/sse/services/auth.ts");
const quotaCache = await import("../../src/domain/quotaCache.ts");
const creditLimit = await import("../../open-sse/services/githubCreditLimit.ts");

test.after(() => {
  quotaCache.__clearForTests();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const inAWeek = () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

function cacheCredits(connectionId: string, creditsUsed: number, resetAt = inAWeek()) {
  quotaCache.setQuotaCache(connectionId, "github", {
    ai_credits: {
      used: creditsUsed,
      total: 0,
      unlimited: true,
      creditsUsed,
      fractionReported: false,
      resetAt,
    },
  });
}

function githubConnection(id: string, providerSpecificData: Record<string, unknown>) {
  return { id, providerSpecificData } as Parameters<typeof auth.evaluateQuotaLimitPolicy>[1];
}

test("isValidGitHubCreditLimit accepts null and finite non-negative numbers only", () => {
  assert.equal(creditLimit.isValidGitHubCreditLimit(null), true);
  assert.equal(creditLimit.isValidGitHubCreditLimit(0), true);
  assert.equal(creditLimit.isValidGitHubCreditLimit(12.5), true);
  assert.equal(creditLimit.isValidGitHubCreditLimit(-1), false);
  assert.equal(creditLimit.isValidGitHubCreditLimit(Number.NaN), false);
  assert.equal(creditLimit.isValidGitHubCreditLimit(Number.POSITIVE_INFINITY), false);
  assert.equal(creditLimit.isValidGitHubCreditLimit("10"), false);
});

test("parseGitHubCreditLimitInput maps the edit-form text to a limit", () => {
  assert.deepEqual(creditLimit.parseGitHubCreditLimitInput(""), { value: null, invalid: false });
  assert.deepEqual(creditLimit.parseGitHubCreditLimitInput("  "), { value: null, invalid: false });
  assert.deepEqual(creditLimit.parseGitHubCreditLimitInput("0"), { value: 0, invalid: false });
  assert.deepEqual(creditLimit.parseGitHubCreditLimitInput("40.5"), {
    value: 40.5,
    invalid: false,
  });
  assert.equal(creditLimit.parseGitHubCreditLimitInput("-2").invalid, true);
  assert.equal(creditLimit.parseGitHubCreditLimitInput("abc").invalid, true);
});

test("limit 40 + fresh reading 42.5 → connection skipped with a readable reason", () => {
  cacheCredits("gh-over", 42.5);
  const result = auth.evaluateQuotaLimitPolicy(
    "github",
    githubConnection("gh-over", { githubCreditLimit: 40 })
  );
  assert.equal(result.blocked, true);
  assert.equal(result.reasons.length, 1);
  assert.match(result.reasons[0], /AI Credits/);
  assert.match(result.reasons[0], /42\.5/);
  assert.match(result.reasons[0], /40/);
  assert.ok(result.resetAt, "the billing-period reset is surfaced as the retry hint");
});

test("no limit configured → never blocks, whatever the reading", () => {
  cacheCredits("gh-nolimit", 9999);
  for (const psd of [{}, { githubCreditLimit: null }]) {
    const result = auth.evaluateQuotaLimitPolicy("github", githubConnection("gh-nolimit", psd));
    assert.equal(result.blocked, false);
  }
});

test("limit 0 blocks every request, even without a reading", () => {
  const result = auth.evaluateQuotaLimitPolicy(
    "github",
    githubConnection("gh-zero-no-reading", { githubCreditLimit: 0 })
  );
  assert.equal(result.blocked, true);
  assert.match(result.reasons[0], /AI Credits/);
});

test("fail-open: no usage reading → not blocked", () => {
  const result = auth.evaluateQuotaLimitPolicy(
    "github",
    githubConnection("gh-no-reading", { githubCreditLimit: 10 })
  );
  assert.equal(result.blocked, false);
});

test("fail-open: a stale reading → not blocked", () => {
  cacheCredits("gh-stale", 50);
  const entry = quotaCache.getQuotaCache("gh-stale");
  assert.ok(entry);
  entry.fetchedAt = Date.now() - creditLimit.GITHUB_CREDIT_SNAPSHOT_MAX_AGE_MS - 1_000;
  const result = auth.evaluateQuotaLimitPolicy(
    "github",
    githubConnection("gh-stale", { githubCreditLimit: 10 })
  );
  assert.equal(result.blocked, false);
});

test("fail-open: a reading from a billing period that already reset → not blocked", () => {
  cacheCredits("gh-rolled", 50, new Date(Date.now() - 60_000).toISOString());
  const result = auth.evaluateQuotaLimitPolicy(
    "github",
    githubConnection("gh-rolled", { githubCreditLimit: 10 })
  );
  assert.equal(result.blocked, false);
});

test("raising the limit applies immediately against the cached reading", () => {
  cacheCredits("gh-raise", 42.5);
  const blocked = auth.evaluateQuotaLimitPolicy(
    "github",
    githubConnection("gh-raise", { githubCreditLimit: 40 })
  );
  assert.equal(blocked.blocked, true);
  const raised = auth.evaluateQuotaLimitPolicy(
    "github",
    githubConnection("gh-raise", { githubCreditLimit: 50 })
  );
  assert.equal(raised.blocked, false);
});

test("the credit limit field is ignored for non-GitHub providers", () => {
  cacheCredits("not-gh", 42.5);
  const result = auth.evaluateQuotaLimitPolicy(
    "openai",
    githubConnection("not-gh", { githubCreditLimit: 0 })
  );
  assert.equal(result.blocked, false);
});

test("the AI Credits telemetry row never marks the account quota-exhausted by itself", () => {
  cacheCredits("gh-telemetry", 42.5);
  assert.equal(quotaCache.isAccountQuotaExhausted("gh-telemetry"), false);
  assert.equal(quotaCache.getQuotaCache("gh-telemetry")?.quotas.ai_credits?.creditsUsed, 42.5);
});

test("credit cutoff combines with an enabled window policy", () => {
  quotaCache.setQuotaCache("gh-both", "github", {
    premium_interactions: { remainingPercentage: 50, resetAt: inAWeek() },
    ai_credits: {
      used: 42.5,
      total: 0,
      unlimited: true,
      creditsUsed: 42.5,
      fractionReported: false,
      resetAt: inAWeek(),
    },
  });
  const result = auth.evaluateQuotaLimitPolicy(
    "github",
    githubConnection("gh-both", {
      githubCreditLimit: 40,
      limitPolicy: { enabled: true, thresholdPercent: 90, windows: ["premium_interactions"] },
    })
  );
  assert.equal(result.blocked, true);
  assert.equal(result.reasons.length, 1);
  assert.match(result.reasons[0], /AI Credits/);
});
