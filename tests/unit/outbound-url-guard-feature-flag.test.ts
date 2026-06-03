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
        await import("../../src/shared/network/outboundUrlGuard.ts");
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
        await import("../../src/shared/network/outboundUrlGuard.ts");
      assert.equal(arePrivateProviderUrlsAllowed(), false);
    });
  });
});

test("arePrivateProviderUrlsAllowed honors env = 'true' when DB has no override", async () => {
  await withEnv("true", async () => {
    await withDbOverride(undefined, async () => {
      const { arePrivateProviderUrlsAllowed } =
        await import("../../src/shared/network/outboundUrlGuard.ts");
      assert.equal(arePrivateProviderUrlsAllowed(), true);
    });
  });
});

test("arePrivateProviderUrlsAllowed default (no env, no DB) returns false", async () => {
  await withEnv(undefined, async () => {
    await withDbOverride(undefined, async () => {
      const { arePrivateProviderUrlsAllowed } =
        await import("../../src/shared/network/outboundUrlGuard.ts");
      assert.equal(arePrivateProviderUrlsAllowed(), false);
    });
  });
});
