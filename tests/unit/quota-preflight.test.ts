import test from "node:test";
import assert from "node:assert/strict";

const quotaPreflight = await import("../../open-sse/services/quotaPreflight.ts");

const { registerQuotaFetcher, isQuotaPreflightEnabled, preflightQuota } = quotaPreflight;

function createConnection(providerSpecificData = {}) {
  return { providerSpecificData };
}

async function withPatchedConsole(methodName, replacement, fn) {
  const original = console[methodName];
  console[methodName] = replacement;
  try {
    return await fn();
  } finally {
    console[methodName] = original;
  }
}

test("isQuotaPreflightEnabled reads the provider flag strictly", () => {
  assert.equal(isQuotaPreflightEnabled(createConnection({ quotaPreflightEnabled: true })), true);
  assert.equal(isQuotaPreflightEnabled(createConnection({ quotaPreflightEnabled: "true" })), false);
  assert.equal(isQuotaPreflightEnabled(createConnection()), false);
});

test("preflightQuota passes through when the feature is disabled", async () => {
  const result = await preflightQuota("provider-disabled", "conn-1", createConnection());
  assert.deepEqual(result, { proceed: true });
});

test("preflightQuota passes through when no fetcher is registered", async () => {
  const result = await preflightQuota(
    "provider-missing-fetcher",
    "conn-2",
    createConnection({ quotaPreflightEnabled: true })
  );

  assert.deepEqual(result, { proceed: true });
});

test("preflightQuota passes through when the fetcher throws or returns null", async () => {
  registerQuotaFetcher("provider-throws", async () => {
    throw new Error("boom");
  });
  registerQuotaFetcher("provider-null", async () => null);

  const enabled = createConnection({ quotaPreflightEnabled: true });

  assert.deepEqual(await preflightQuota("provider-throws", "conn-3", enabled), {
    proceed: true,
  });
  assert.deepEqual(await preflightQuota("provider-null", "conn-4", enabled), {
    proceed: true,
  });
});

test("preflightQuota warns but proceeds when usage is above the warning threshold", async () => {
  const warnings = [];
  registerQuotaFetcher("provider-warn", async () => ({
    used: 80,
    total: 100,
    percentUsed: 0.8,
  }));

  const result = await withPatchedConsole(
    "warn",
    (message) => warnings.push(message),
    async () =>
      preflightQuota("provider-warn", "conn-5", createConnection({ quotaPreflightEnabled: true }))
  );

  assert.deepEqual(result, {
    proceed: true,
    quotaPercent: 0.8,
  });
  assert.equal(warnings.length, 1);
  assert.match(warnings[0], /approaching limit/i);
});

test("preflightQuota blocks when usage reaches the exhaustion threshold", async () => {
  const infos = [];
  registerQuotaFetcher("provider-exhausted", async () => ({
    used: 99,
    total: 100,
    percentUsed: 0.99,
  }));

  const result = await withPatchedConsole(
    "info",
    (message) => infos.push(message),
    async () =>
      preflightQuota(
        "provider-exhausted",
        "conn-6",
        createConnection({ quotaPreflightEnabled: true })
      )
  );

  assert.deepEqual(result, {
    proceed: false,
    reason: "quota_exhausted",
    quotaPercent: 0.99,
    resetAt: null,
  });
  assert.equal(infos.length, 1);
  assert.match(infos[0], /switching/i);
});
