import { test } from "node:test";
import assert from "node:assert/strict";
import {
  DEFAULT_RESILIENCE_SETTINGS,
  mergeResilienceSettings,
  resolveResilienceSettings,
} from "../../../src/lib/resilience/settings.ts";
import { resolveCredentialHealthSweepInterval } from "../../../src/lib/credentialHealth/scheduler.ts";

const ORIGINAL_ENV = process.env.CREDENTIAL_HEALTH_CHECK_INTERVAL;

function withEnv(value: string | undefined, fn: () => void) {
  if (value === undefined) delete process.env.CREDENTIAL_HEALTH_CHECK_INTERVAL;
  else process.env.CREDENTIAL_HEALTH_CHECK_INTERVAL = value;
  try {
    fn();
  } finally {
    if (ORIGINAL_ENV === undefined) delete process.env.CREDENTIAL_HEALTH_CHECK_INTERVAL;
    else process.env.CREDENTIAL_HEALTH_CHECK_INTERVAL = ORIGINAL_ENV;
  }
}

test("default resilience settings include a 60-minute credential health check cadence", () => {
  assert.equal(DEFAULT_RESILIENCE_SETTINGS.credentialHealthCheck.intervalMinutes, 60);
});

test("resolveResilienceSettings returns the default interval when nothing is stored", () => {
  const resolved = resolveResilienceSettings({});
  assert.equal(resolved.credentialHealthCheck.intervalMinutes, 60);
});

test("mergeResilienceSettings stores an operator interval and preserves other sections", () => {
  const next = mergeResilienceSettings(structuredClone(DEFAULT_RESILIENCE_SETTINGS), {
    credentialHealthCheck: { intervalMinutes: 60 },
  });
  assert.equal(next.credentialHealthCheck.intervalMinutes, 60);
  // Untouched sections must survive the merge untouched.
  assert.equal(next.providerCooldown.enabled, DEFAULT_RESILIENCE_SETTINGS.providerCooldown.enabled);
});

test("mergeResilienceSettings clamps the interval into the 0-1440 band", () => {
  const high = mergeResilienceSettings(structuredClone(DEFAULT_RESILIENCE_SETTINGS), {
    credentialHealthCheck: { intervalMinutes: 5000 },
  });
  assert.equal(high.credentialHealthCheck.intervalMinutes, 1440);
});

test("sweep interval: no operator setting and no env → built-in 60 min default", () => {
  withEnv(undefined, () => {
    assert.equal(resolveCredentialHealthSweepInterval({}), 60 * 60_000);
  });
});

test("sweep interval: no operator setting → env var wins", () => {
  withEnv("900000", () => {
    assert.equal(resolveCredentialHealthSweepInterval({}), 900_000);
  });
});

test("sweep interval: operator setting wins over env var", () => {
  withEnv("900000", () => {
    const settings = {
      resilienceSettings: { credentialHealthCheck: { intervalMinutes: 30 } },
    };
    assert.equal(resolveCredentialHealthSweepInterval(settings), 30 * 60_000);
  });
});

test("sweep interval: operator 0 explicitly disables the sweep (beats env)", () => {
  withEnv("900000", () => {
    const settings = {
      resilienceSettings: { credentialHealthCheck: { intervalMinutes: 0 } },
    };
    assert.equal(resolveCredentialHealthSweepInterval(settings), 0);
  });
});

test("sweep interval: operator interval clamps to 1440 min (24 h)", () => {
  const settings = {
    resilienceSettings: { credentialHealthCheck: { intervalMinutes: 9999 } },
  };
  assert.equal(resolveCredentialHealthSweepInterval(settings), 1440 * 60_000);
});

test("sweep interval: non-numeric stored interval falls back to env/default", () => {
  withEnv(undefined, () => {
    const settings = {
      resilienceSettings: { credentialHealthCheck: { intervalMinutes: "abc" } },
    };
    assert.equal(resolveCredentialHealthSweepInterval(settings), 60 * 60_000);
  });
});
