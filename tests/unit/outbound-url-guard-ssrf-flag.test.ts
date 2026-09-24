import test from "node:test";
import assert from "node:assert/strict";

// "SSRF Guard" (OUTBOUND_SSRF_GUARD_ENABLED) is a toggle on the Feature Flags page. Its only
// reader, the legacy escape hatch in arePrivateProviderUrlsAllowed(), must resolve it the way
// that page does (DB override, then env), or the toggle shows one state while the guard is in
// the other.

const GUARD_KEY = "OUTBOUND_SSRF_GUARD_ENABLED";
// Cleared around each test: both also decide the guard mode asserted below.
const OTHER_KEYS = ["OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS", "OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS"];

async function withFlag<T>(
  env: string | undefined,
  dbOverride: string | undefined,
  fn: () => Promise<T> | T
): Promise<T> {
  const { setFeatureFlagOverride, removeFeatureFlagOverride } =
    await import("../../src/lib/db/featureFlags.ts");
  const prevEnv = new Map([GUARD_KEY, ...OTHER_KEYS].map((key) => [key, process.env[key]]));
  for (const key of OTHER_KEYS) {
    delete process.env[key];
    removeFeatureFlagOverride(key);
  }
  if (env === undefined) delete process.env[GUARD_KEY];
  else process.env[GUARD_KEY] = env;
  if (dbOverride === undefined) removeFeatureFlagOverride(GUARD_KEY);
  else setFeatureFlagOverride(GUARD_KEY, dbOverride);
  try {
    return await fn();
  } finally {
    removeFeatureFlagOverride(GUARD_KEY);
    for (const [key, value] of prevEnv) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
}

async function policy() {
  return import("../../src/shared/network/outboundUrlGuardPolicy.ts");
}

test("a dashboard ON for the SSRF Guard beats OUTBOUND_SSRF_GUARD_ENABLED=false in env", async () => {
  await withFlag("false", "true", async () => {
    const { arePrivateProviderUrlsAllowed, getProviderValidationGuard, getProviderOutboundGuard } =
      await policy();
    assert.equal(arePrivateProviderUrlsAllowed(), false);
    assert.equal(getProviderValidationGuard(), "block-metadata");
    assert.equal(getProviderOutboundGuard(), "block-metadata");
  });
});

test("a dashboard OFF for the SSRF Guard takes effect without the env var", async () => {
  await withFlag(undefined, "false", async () => {
    const { arePrivateProviderUrlsAllowed, getProviderValidationGuard } = await policy();
    assert.equal(arePrivateProviderUrlsAllowed(), true);
    assert.equal(getProviderValidationGuard(), "none");
  });
});

test("the webhook check follows the dashboard SSRF Guard toggle", async () => {
  await withFlag("false", "true", async () => {
    const { parseAndValidateWebhookUrl } = await policy();
    assert.throws(() => parseAndValidateWebhookUrl("http://192.168.1.10/hook"));
  });
});

test("OUTBOUND_SSRF_GUARD_ENABLED=false in env still opens private URLs with no DB override", async () => {
  await withFlag("false", undefined, async () => {
    const { arePrivateProviderUrlsAllowed } = await policy();
    assert.equal(arePrivateProviderUrlsAllowed(), true);
  });
});

test("an empty DB value leaves OUTBOUND_SSRF_GUARD_ENABLED=false in env in effect", async () => {
  await withFlag("false", "", async () => {
    const { arePrivateProviderUrlsAllowed } = await policy();
    assert.equal(arePrivateProviderUrlsAllowed(), true);
  });
});

test("with the SSRF Guard unset everywhere, private URLs stay closed", async () => {
  await withFlag(undefined, undefined, async () => {
    const { arePrivateProviderUrlsAllowed, getProviderValidationGuard } = await policy();
    assert.equal(arePrivateProviderUrlsAllowed(), false);
    assert.equal(getProviderValidationGuard(), "block-metadata");
  });
});
