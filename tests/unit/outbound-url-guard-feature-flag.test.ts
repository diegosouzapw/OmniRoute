import test from "node:test";
import assert from "node:assert/strict";

// #2575 — the DB feature flag override must take precedence over the
// process environment, otherwise toggling "Allow Private Provider URLs" in
// the Electron dashboard has no effect (the server was spawned with the env
// value at boot and the subsequent toggle only lands in the DB).

const KEY = "OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS";

async function withEnv<T>(value: string | undefined, fn: () => Promise<T> | T): Promise<T> {
  const prev = process.env[KEY];
  if (value === undefined) delete process.env[KEY];
  else process.env[KEY] = value;
  try {
    return await fn();
  } finally {
    if (prev === undefined) delete process.env[KEY];
    else process.env[KEY] = prev;
  }
}

async function withDbOverride<T>(value: string | undefined, fn: () => Promise<T> | T): Promise<T> {
  const { setFeatureFlagOverride, removeFeatureFlagOverride } =
    await import("../../src/lib/db/featureFlags.ts");
  if (value === undefined) {
    removeFeatureFlagOverride(KEY);
  } else {
    setFeatureFlagOverride(KEY, value);
  }
  try {
    return await fn();
  } finally {
    removeFeatureFlagOverride(KEY);
  }
}

test("arePrivateProviderUrlsAllowed honors DB override = 'true' even when env is 'false'", async () => {
  await withEnv("false", async () => {
    await withDbOverride("true", async () => {
      const { arePrivateProviderUrlsAllowed } =
        await import("../../src/shared/network/outboundUrlGuardPolicy.ts");
      assert.equal(
        arePrivateProviderUrlsAllowed(),
        true,
        "DB toggle must override stale env value"
      );
    });
  });
});

test("arePrivateProviderUrlsAllowed returns false when DB override = 'false' and no env truthy", async () => {
  await withEnv(undefined, async () => {
    await withDbOverride("false", async () => {
      const { arePrivateProviderUrlsAllowed } =
        await import("../../src/shared/network/outboundUrlGuardPolicy.ts");
      assert.equal(arePrivateProviderUrlsAllowed(), false);
    });
  });
});

test("arePrivateProviderUrlsAllowed honors env = 'true' when DB has no override", async () => {
  await withEnv("true", async () => {
    await withDbOverride(undefined, async () => {
      const { arePrivateProviderUrlsAllowed } =
        await import("../../src/shared/network/outboundUrlGuardPolicy.ts");
      assert.equal(arePrivateProviderUrlsAllowed(), true);
    });
  });
});

test("arePrivateProviderUrlsAllowed default (no env, no DB) returns false", async () => {
  await withEnv(undefined, async () => {
    await withDbOverride(undefined, async () => {
      const { arePrivateProviderUrlsAllowed } =
        await import("../../src/shared/network/outboundUrlGuardPolicy.ts");
      assert.equal(arePrivateProviderUrlsAllowed(), false);
    });
  });
});

test("arePrivateProviderUrlsAllowed honors DB override = 'false' even when env is 'true'", async () => {
  await withEnv("true", async () => {
    await withDbOverride("false", async () => {
      const { arePrivateProviderUrlsAllowed, getProviderValidationGuard } =
        await import("../../src/shared/network/outboundUrlGuardPolicy.ts");
      assert.equal(
        arePrivateProviderUrlsAllowed(),
        false,
        "a dashboard OFF must not be re-enabled by the env opt-in"
      );
      assert.equal(getProviderValidationGuard(), "block-metadata");
    });
  });
});

test("DB override = 'false' leaves the legacy OUTBOUND_SSRF_GUARD_ENABLED=false hatch as it was", async () => {
  const prev = process.env.OUTBOUND_SSRF_GUARD_ENABLED;
  process.env.OUTBOUND_SSRF_GUARD_ENABLED = "false";
  try {
    await withEnv(undefined, async () => {
      await withDbOverride("false", async () => {
        const { arePrivateProviderUrlsAllowed } =
          await import("../../src/shared/network/outboundUrlGuardPolicy.ts");
        assert.equal(arePrivateProviderUrlsAllowed(), true);
      });
    });
  } finally {
    if (prev === undefined) delete process.env.OUTBOUND_SSRF_GUARD_ENABLED;
    else process.env.OUTBOUND_SSRF_GUARD_ENABLED = prev;
  }
});

test("a DB override = 'false' for local provider URLs still restores public-only", async () => {
  const LOCAL_KEY = "OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS";
  const prev = process.env[LOCAL_KEY];
  delete process.env[LOCAL_KEY];
  const { setFeatureFlagOverride, removeFeatureFlagOverride } =
    await import("../../src/lib/db/featureFlags.ts");
  setFeatureFlagOverride(LOCAL_KEY, "false");
  try {
    await withEnv(undefined, async () => {
      await withDbOverride(undefined, async () => {
        const { getProviderValidationGuard } =
          await import("../../src/shared/network/outboundUrlGuardPolicy.ts");
        assert.equal(getProviderValidationGuard(), "public-only");
      });
    });
  } finally {
    removeFeatureFlagOverride(LOCAL_KEY);
    if (prev === undefined) delete process.env[LOCAL_KEY];
    else process.env[LOCAL_KEY] = prev;
  }
});
