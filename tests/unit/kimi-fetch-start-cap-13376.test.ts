import test from "node:test";
import assert from "node:assert/strict";

// #13376: Kimi Coding (api.kimi.com) buffers large cache-miss prefills
// server-side before emitting any headers — measured 116s for a 556k-token
// cache-miss prefill (2026-09-12), and an 8-hour 504 storm at the 110s
// headers-wait ceiling. The kimi-coding/kimi-coding-apikey registry entries
// MUST carry the 600s cap so generateLegacyProviders() projects it onto the
// LegacyProvider that the executor actually consults; without this assertion
// the cap drops at projection time (the same bug #11526 caught for
// opencode-go) and the 504 storm returns.

const { generateLegacyProviders } = await import("../../open-sse/config/providerRegistry.ts");
const { KIMI_CODING_SHARED } =
  await import("../../open-sse/config/providers/registry/kimi/coding/index.ts");

test("kimi-coding registry entry declares the buffered-gateway fetch-start cap", () => {
  assert.equal(
    KIMI_CODING_SHARED.fetchStartTimeoutCapMs,
    600_000,
    "KIMI_CODING_SHARED must set fetchStartTimeoutCapMs to 600s so both kimi-coding (OAuth) and kimi-coding-apikey inherit it"
  );
});

test("generateLegacyProviders projects the kimi cap into both kimi-coding providers", () => {
  const providers = generateLegacyProviders();

  for (const id of ["kimi-coding", "kimi-coding-apikey"]) {
    const legacy = providers[id];
    assert.ok(legacy, `${id} must exist in the legacy provider map`);
    assert.equal(
      legacy.fetchStartTimeoutCapMs,
      600_000,
      `${id} buffered-gateway cap must be 600s (registry override must reach the executor)`
    );
  }
});
