import test from "node:test";
import assert from "node:assert/strict";

// Per-provider rate-limit retry delay (resilience `providerQuotaOverrides[id].rateLimitCooldownSeconds`).
// Precedence on a rate-limited error: upstream retry hint > per-connection rotationOverrides >
// per-provider override > env OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS > scaled backoff.

const rc = await import("../../open-sse/services/rotationConfig.ts");
const { setProviderQuotaOverrides } =
  await import("../../open-sse/services/providerDefaultRateLimit.ts");
const { checkFallbackError } = await import("../../open-sse/services/accountFallback.ts");
const { normalizeProviderQuotaOverrides } =
  await import("../../src/lib/resilience/settings/normalize.ts");
const { updateResilienceSchema } = await import("../../src/shared/validation/schemas/settings.ts");

function reset() {
  delete process.env.OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS;
  rc.resetGlobalRotationConfigForTest();
  setProviderQuotaOverrides(null);
}

test.afterEach(reset);

test("per-provider cooldown replaces the scaled backoff for a 429 without a retry hint", () => {
  reset();
  setProviderQuotaOverrides({ nvidia: { rateLimitCooldownSeconds: 120 } });

  const res = checkFallbackError(429, "rate limit", 0, null, "nvidia");
  assert.equal(res.shouldFallback, true);
  assert.equal(res.cooldownMs, 120_000);
  assert.equal(res.baseCooldownMs, 120_000);
  assert.equal(res.newBackoffLevel, 0);
  assert.equal(res.usedUpstreamRetryHint, false);
});

test("an upstream Retry-After hint still wins over the per-provider cooldown", () => {
  reset();
  setProviderQuotaOverrides({ openai: { rateLimitCooldownSeconds: 120 } });

  const res = checkFallbackError(429, "rate limit", 0, null, "openai", { "retry-after": "30" });
  assert.equal(res.shouldFallback, true);
  assert.equal(res.usedUpstreamRetryHint, true);
  assert.ok(res.cooldownMs > 28_000 && res.cooldownMs <= 30_000, `got ${res.cooldownMs}`);
});

test("a provider without an override keeps the scaled backoff", () => {
  reset();
  setProviderQuotaOverrides({ nvidia: { rateLimitCooldownSeconds: 120 } });

  const baseline = checkFallbackError(429, "rate limit", 0, null, "openai");
  assert.notEqual(baseline.cooldownMs, 120_000);
  assert.equal(baseline.newBackoffLevel, 1);
});

test("rpm/concurrency-only entries do not change the rate-limit cooldown", () => {
  reset();
  setProviderQuotaOverrides({ nvidia: { rpm: 30, concurrency: 2 } });
  const res = checkFallbackError(429, "rate limit", 0, null, "nvidia");
  assert.equal(res.newBackoffLevel, 1);
  assert.equal(rc.getProviderRateLimitCooldownMs("nvidia"), null);
});

test("per-connection rotationOverrides win over the per-provider cooldown", () => {
  reset();
  setProviderQuotaOverrides({ nvidia: { rateLimitCooldownSeconds: 120 } });
  const account = {
    id: "conn-1",
    providerSpecificData: { rotationOverrides: { rateLimitResetSeconds: 20 } },
  };
  const ro = rc.overrideFor("rate_limit_exceeded", account, "nvidia");
  assert.equal(ro?.cooldownMs, 20_000);
});

test("per-provider cooldown wins over the global env override", () => {
  reset();
  process.env.OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS = "10";
  rc.resetGlobalRotationConfigForTest();
  setProviderQuotaOverrides({ nvidia: { rateLimitCooldownSeconds: 90 } });

  assert.equal(rc.overrideFor("rate_limit_exceeded", null, "nvidia")?.cooldownMs, 90_000);
  assert.equal(rc.overrideFor("rate_limit_exceeded", null, "openai")?.cooldownMs, 10_000);
});

test("per-provider cooldown only applies to the rate-limit reason", () => {
  reset();
  setProviderQuotaOverrides({ nvidia: { rateLimitCooldownSeconds: 120 } });
  assert.equal(rc.overrideFor("server_error", null, "nvidia"), null);
  assert.equal(rc.overrideFor("rate_limit_exceeded", null, null), null);
});

test("normalize clamps/drops invalid rateLimitCooldownSeconds values", () => {
  const out = normalizeProviderQuotaOverrides(
    {
      a: { rateLimitCooldownSeconds: 120.7 },
      b: { rateLimitCooldownSeconds: -5 },
      c: { rateLimitCooldownSeconds: Number.NaN },
      d: { rateLimitCooldownSeconds: 999_999 },
      e: { rateLimitCooldownSeconds: 0, rpm: 10 },
      f: { rateLimitCooldownSeconds: "60" },
    },
    {}
  );
  assert.deepEqual(out.a, { rateLimitCooldownSeconds: 120 });
  assert.equal(out.b, undefined);
  assert.equal(out.c, undefined);
  assert.deepEqual(out.d, { rateLimitCooldownSeconds: 21_600 });
  assert.deepEqual(out.e, { rpm: 10 });
  assert.deepEqual(out.f, { rateLimitCooldownSeconds: 60 });
});

test("PATCH /api/resilience schema accepts rateLimitCooldownSeconds within 1..21600", () => {
  const ok = updateResilienceSchema.safeParse({
    providerQuotaOverrides: { nvidia: { rateLimitCooldownSeconds: 300 } },
  });
  assert.equal(ok.success, true);
  const tooBig = updateResilienceSchema.safeParse({
    providerQuotaOverrides: { nvidia: { rateLimitCooldownSeconds: 21_601 } },
  });
  assert.equal(tooBig.success, false);
  const zero = updateResilienceSchema.safeParse({
    providerQuotaOverrides: { nvidia: { rateLimitCooldownSeconds: 0 } },
  });
  assert.equal(zero.success, false);
});
