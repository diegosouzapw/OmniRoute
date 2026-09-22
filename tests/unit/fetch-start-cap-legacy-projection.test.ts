import test from "node:test";
import assert from "node:assert/strict";

// #11526 follow-up: generateLegacyProviders() must copy fetchStartTimeoutCapMs
// into the executor's LegacyProvider config. Dropping the field silently fell
// back to the 110s global headers-wait cap even for providers whose registry
// entry overrides it — opencode-go deepseek thinking generations 504ed at
// exactly 110s despite fetchStartTimeoutCapMs on the registry entry (the
// buffered Console Go gateway sends no bytes until the model finishes
// thinking, so the headers phase legitimately spans minutes).

const { generateLegacyProviders } = await import(
  "../../open-sse/config/providerRegistry.ts"
);

test("generateLegacyProviders copies fetchStartTimeoutCapMs into the executor config", () => {
  const providers = generateLegacyProviders();

  for (const id of ["opencode-go", "command-code"]) {
    const legacy = providers[id];
    assert.ok(legacy, `${id} must exist in the legacy provider map`);
    assert.equal(
      legacy.fetchStartTimeoutCapMs,
      600_000,
      `${id} buffered-gateway cap must be 600s (registry override must reach the executor)`
    );
  }
});

test("generateLegacyProviders omits the cap when the registry entry does not set it", () => {
  const providers = generateLegacyProviders();
  const plain = providers["openai"];
  if (!plain) return; // registry shape change guard — only assert when present
  assert.equal(
    plain.fetchStartTimeoutCapMs,
    undefined,
    "providers without an override keep the global 110s default"
  );
});
