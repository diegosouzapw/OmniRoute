// #6142 — devin cloud-agent provider validator + static model catalog wiring.
// Regression guard for the "not supported" fallback devin used to always hit on the
// generic Providers config page (parity with the existing jules cloud-agent wiring).
import { test } from "node:test";
import assert from "node:assert/strict";

import { validateProviderApiKey } from "../../src/lib/providers/validation.ts";
import { validateDevinCloudAgentProvider } from "../../src/lib/providers/validation/webProvidersB.ts";
import { getStaticModelsForProvider } from "../../src/lib/providers/staticModels.ts";

test("#6142: devin cloud-agent validator is wired into the SPECIALTY_VALIDATORS dispatcher", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async () =>
    new Response("{}", { status: 401 })) as unknown as typeof fetch;
  try {
    const result = await validateProviderApiKey({
      provider: "devin",
      apiKey: "cog_bad_key",
    });
    assert.equal(result.valid, false);
    assert.equal(result.error, "Invalid API key");
    assert.notEqual(result.unsupported, true);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("#6142: validateDevinCloudAgentProvider maps 401 to Invalid API key", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async () =>
    new Response("{}", { status: 401 })) as unknown as typeof fetch;
  try {
    const result = await validateDevinCloudAgentProvider({ apiKey: "bad-key" });
    assert.equal(result.valid, false);
    assert.equal(result.error, "Invalid API key");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("#6142: validateDevinCloudAgentProvider maps 403 to Invalid API key", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async () =>
    new Response("{}", { status: 403 })) as unknown as typeof fetch;
  try {
    const result = await validateDevinCloudAgentProvider({ apiKey: "bad-key" });
    assert.equal(result.valid, false);
    assert.equal(result.error, "Invalid API key");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("#6142: validateDevinCloudAgentProvider accepts a 2xx probe as valid", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async () =>
    new Response(JSON.stringify({ sessions: [] }), { status: 200 })) as unknown as typeof fetch;
  try {
    const result = await validateDevinCloudAgentProvider({ apiKey: "cog_good_key" });
    assert.equal(result.valid, true);
    assert.equal(result.error, null);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("#6142: devin exposes a static model catalog for the 'Available Models' UI (parity with jules)", () => {
  const models = getStaticModelsForProvider("devin");
  assert.ok(Array.isArray(models) && models.length > 0);
  assert.equal(models[0].id, "devin");
});
