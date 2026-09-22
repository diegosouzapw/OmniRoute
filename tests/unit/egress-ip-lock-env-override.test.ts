import test from "node:test";
import assert from "node:assert/strict";

const { egressIpLockProvidersFromEnv } = await import(
  "../../open-sse/config/providerErrorRules.ts"
);

test("#9611-paid: unset env yields the default free-tier egress-lock family", () => {
  const set = egressIpLockProvidersFromEnv(undefined);
  assert.deepEqual([...set].sort(), ["opencode", "opencode-cli", "opencode-go"]);
});

test("#9611-paid: 'none' disables the egress-IP lockout entirely (paid plans)", () => {
  for (const raw of ["none", "off", "false", "0", "  none  "]) {
    const set = egressIpLockProvidersFromEnv(raw);
    assert.equal(set.size, 0, `raw=${raw} must produce an empty lock set`);
  }
});

test("#9611-paid: comma-separated list replaces the default family exactly", () => {
  const set = egressIpLockProvidersFromEnv("opencode, OpenCode-CLI ,agentrouter");
  assert.deepEqual([...set].sort(), ["agentrouter", "opencode", "opencode-cli"]);
});

test("#9611-paid: blank/whitespace env falls back to the default family", () => {
  assert.deepEqual([...egressIpLockProvidersFromEnv("")].sort(), [
    "opencode",
    "opencode-cli",
    "opencode-go",
  ]);
  assert.equal(egressIpLockProvidersFromEnv("   ").size, 3);
});
