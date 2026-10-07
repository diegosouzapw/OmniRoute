import test from "node:test";
import assert from "node:assert/strict";

// Default of the refusal-memory flag: on unless explicitly opted out.
// Resolution priority DB > env > definition; these cases pin the default and
// the circuit breaker with env/DB absent.

const flags = await import("../../src/shared/utils/featureFlags.ts");
const definitions = await import("../../src/shared/constants/featureFlagDefinitions.ts");

function withCleanEnv(fn: () => void) {
  const saved = process.env.PROXY_SKIP_RECENTLY_FAILED;
  delete process.env.PROXY_SKIP_RECENTLY_FAILED;
  try {
    fn();
  } finally {
    if (saved !== undefined) process.env.PROXY_SKIP_RECENTLY_FAILED = saved;
    else delete process.env.PROXY_SKIP_RECENTLY_FAILED;
  }
}

test("definition defaults PROXY_SKIP_RECENTLY_FAILED to true", () => {
  const def = definitions.FEATURE_FLAG_DEFINITIONS.find(
    (d) => d.key === "PROXY_SKIP_RECENTLY_FAILED",
  );
  assert.ok(def, "PROXY_SKIP_RECENTLY_FAILED should exist");
  assert.strictEqual(def.defaultValue, "true");
});

test("wrapper resolves to enabled with neither env nor DB override", () => {
  withCleanEnv(() => {
    assert.strictEqual(flags.resolveFeatureFlag("PROXY_SKIP_RECENTLY_FAILED"), "true");
    assert.strictEqual(flags.isProxySkipRecentlyFailedEnabled(), true);
  });
});

test("explicit opt-out restores the plain selection", () => {
  for (const value of ["false", "0"]) {
    process.env.PROXY_SKIP_RECENTLY_FAILED = value;
    try {
      assert.strictEqual(flags.isProxySkipRecentlyFailedEnabled(), false, `env=${value}`);
    } finally {
      delete process.env.PROXY_SKIP_RECENTLY_FAILED;
    }
  }
});
