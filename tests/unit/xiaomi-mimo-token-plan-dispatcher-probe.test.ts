/**
 * Probe repro for issue #14543: `xiaomi-mimo-token-plan` is listed in
 * USAGE_SUPPORTED_PROVIDERS but has no case in the getUsageForProvider
 * dispatcher switch, so a live connection falls through to the default
 * "Usage API not implemented" branch instead of returning any quota.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { getUsageForProvider } = await import("../../open-sse/services/usage.ts");
const { USAGE_SUPPORTED_PROVIDERS } =
  await import("../../open-sse/services/usage/supportedProviders.ts");
const { isSupportedUsageConnection } = await import("../../src/lib/usage/providerLimits.ts");

test("xiaomi-mimo-token-plan is declared supported by the dashboard gate", () => {
  assert.ok(
    USAGE_SUPPORTED_PROVIDERS.includes("xiaomi-mimo-token-plan"),
    "expected xiaomi-mimo-token-plan in USAGE_SUPPORTED_PROVIDERS"
  );
});

test("an apikey xiaomi-mimo-token-plan connection is NOT refused before the dispatcher", () => {
  const reached = isSupportedUsageConnection({
    provider: "xiaomi-mimo-token-plan",
    authType: "apikey",
  });
  assert.equal(
    reached,
    true,
    "expected the connection to be considered supported (reachable) and not refused pre-dispatch"
  );
});

test("getUsageForProvider({provider: 'xiaomi-mimo-token-plan'}) returns a self-tracked quota", async () => {
  const result = (await getUsageForProvider({
    id: "conn-1",
    apiKey: "tp-fake-key",
    provider: "xiaomi-mimo-token-plan",
  } as never)) as { quotas?: { monthly?: unknown }; message?: string };

  assert.ok(
    result.quotas?.monthly,
    `expected a monthly quota, got message: ${result.message ?? "(none)"}`
  );
});
