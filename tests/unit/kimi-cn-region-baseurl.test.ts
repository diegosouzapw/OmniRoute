// #7447 — Kimi/Moonshot CN-region API keys were rejected because the built-in
// "kimi"/"moonshot" registry entries are hard-coded to the international host
// (api.moonshot.ai) and neither provider exposed a base-URL field at
// Add-connection time, so a CN-region key (issued on platform.kimi.com /
// moonshot.cn — a separate account/keyspace) had no supported way to point a
// new connection at api.moonshot.cn. Fix: expose the existing generic
// providerSpecificData.baseUrl override affordance for "kimi" and "moonshot"
// via CONFIGURABLE_BASE_URL_PROVIDERS, defaulting to the unchanged
// international host so existing users see no behavior change.
import test from "node:test";
import assert from "node:assert/strict";

import { getRegistryEntry } from "../../open-sse/config/providerRegistry.ts";
import {
  isBaseUrlConfigurableProvider,
  getProviderBaseUrlDefault,
  getProviderBaseUrlPlaceholder,
} from "../../src/app/(dashboard)/dashboard/providers/[id]/providerPageHelpers.ts";

test("kimi/moonshot registry entries still default to the international api.moonshot.ai host", () => {
  const kimi = getRegistryEntry("kimi");
  const moonshot = getRegistryEntry("moonshot");
  assert.ok(kimi, "expected a registered 'kimi' provider entry");
  assert.ok(moonshot, "expected a registered 'moonshot' provider entry");
  assert.equal(kimi!.baseUrl, "https://api.moonshot.ai/v1/chat/completions");
  assert.equal(moonshot!.baseUrl, "https://api.moonshot.ai/v1/chat/completions");
});

test("kimi and moonshot are base-URL configurable at Add-connection time (regression guard for #7447)", () => {
  assert.equal(
    isBaseUrlConfigurableProvider("kimi"),
    true,
    "expected 'kimi' to be base-URL configurable so a CN-region key can be pointed at api.moonshot.cn"
  );
  assert.equal(
    isBaseUrlConfigurableProvider("moonshot"),
    true,
    "expected 'moonshot' to be base-URL configurable so a CN-region key can be pointed at api.moonshot.cn"
  );
});

test("default base URL for kimi/moonshot stays international (no behavior change for existing users)", () => {
  assert.equal(getProviderBaseUrlDefault("kimi"), "https://api.moonshot.ai/v1");
  assert.equal(getProviderBaseUrlDefault("moonshot"), "https://api.moonshot.ai/v1");
});

test("placeholder surfaces the CN-region alternative host for kimi/moonshot", () => {
  assert.equal(getProviderBaseUrlPlaceholder("kimi"), "https://api.moonshot.cn/v1");
  assert.equal(getProviderBaseUrlPlaceholder("moonshot"), "https://api.moonshot.cn/v1");
});
