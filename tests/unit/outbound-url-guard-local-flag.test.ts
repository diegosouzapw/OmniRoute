import { test } from "node:test";
import assert from "node:assert/strict";

const ENV_KEYS = [
  "OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS",
  "OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS",
  "OUTBOUND_SSRF_GUARD_ENABLED",
];

function withEnv(overrides: Record<string, string | undefined>, fn: () => void) {
  const saved: Record<string, string | undefined> = {};
  for (const k of ENV_KEYS) saved[k] = process.env[k];
  for (const k of ENV_KEYS) delete process.env[k];
  Object.assign(process.env, overrides);
  try {
    fn();
  } finally {
    for (const k of ENV_KEYS) {
      if (saved[k] === undefined) delete process.env[k];
      else process.env[k] = saved[k];
    }
  }
}

test("#9123: setting ONLY OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS=true should relax the guard used for search-provider outbound calls (currently does not)", async () => {
  const { areLocalProviderUrlsAllowed, getProviderOutboundGuard } = await import(
    "../../src/shared/network/outboundUrlGuardPolicy.ts"
  );

  withEnv({ OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS: "true" }, () => {
    assert.equal(areLocalProviderUrlsAllowed(), true);
    assert.notEqual(
      getProviderOutboundGuard(),
      "public-only",
      "BUG #9123: OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS should relax getProviderOutboundGuard() " +
        "(used for search-provider outbound calls) the same way it already relaxes " +
        "getProviderValidationGuard() for regular chat providers — it currently has no effect."
    );
  });
});

test("#9123 control: OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS=true DOES relax the same guard", async () => {
  const { getProviderOutboundGuard } = await import(
    "../../src/shared/network/outboundUrlGuardPolicy.ts"
  );
  withEnv({ OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS: "true" }, () => {
    assert.equal(getProviderOutboundGuard(), "none");
  });
});