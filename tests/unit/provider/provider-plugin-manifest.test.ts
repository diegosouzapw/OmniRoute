import assert from "node:assert/strict";
import test from "node:test";

import {
  generateProviderPluginManifestFromRegistry,
  getProviderPluginManifestEntryFromRegistry,
} from "../../../open-sse/config/providerPluginManifest.ts";
import type { RegistryEntry } from "../../../open-sse/config/providers/shared.ts";
import { USAGE_FETCHER_PROVIDERS } from "../../../open-sse/services/usage/fetcherProviders.ts";
import { USAGE_SUPPORTED_PROVIDERS } from "../../../open-sse/services/usage/supportedProviders.ts";

const registryFixture: Record<string, RegistryEntry> = {
  openai: {
    id: "openai",
    alias: "openai",
    format: "openai",
    executor: "default",
    baseUrl: "https://api.openai.com/v1/chat/completions",
    authType: "apikey",
    authHeader: "bearer",
    defaultContextLength: 128000,
    models: [
      { id: "gpt-4.1", name: "GPT-4.1", contextLength: 1047576 },
      {
        id: "o3",
        name: "O3",
        contextLength: 200000,
        unsupportedParams: ["temperature", "top_p"],
      },
    ],
  },
  anthropic: {
    id: "anthropic",
    alias: "anthropic",
    format: "claude",
    executor: "default",
    baseUrl: "https://api.anthropic.com/v1/messages",
    authType: "apikey",
    authHeader: "x-api-key",
    headers: {
      "Anthropic-Version": "2023-06-01",
    },
    models: [{ id: "claude-sonnet-4.6", name: "Claude Sonnet 4.6" }],
  },
  "claude-web": {
    id: "claude-web",
    alias: "cw",
    format: "openai",
    executor: "claude-web",
    baseUrl: "https://claude.ai/api/organizations",
    authType: "apikey",
    authHeader: "cookie",
    models: [{ id: "claude-sonnet-4.6", name: "Claude 4.6 Sonnet (web)" }],
  },
  claude: {
    id: "claude",
    alias: "claude",
    format: "claude",
    executor: "default",
    baseUrl: "https://api.anthropic.com/v1/messages",
    authType: "oauth",
    authHeader: "x-api-key",
    oauth: {
      clientIdDefault: "public-client",
      clientSecretDefault: "secret-that-must-not-export",
      tokenUrl: "https://console.anthropic.com/oauth/token",
    },
    models: [{ id: "claude-opus-4.7", name: "Claude Opus 4.7" }],
  },
};

test("provider plugin manifest is JSON-safe and stable enough for sidecars", () => {
  const manifest = generateProviderPluginManifestFromRegistry(registryFixture);
  const roundTripped = JSON.parse(JSON.stringify(manifest));

  assert.equal(roundTripped.schemaVersion, 1);
  assert.equal(roundTripped.generatedFrom, "open-sse/config/providers");
  assert.equal(roundTripped.providers.length, 4);
  assert.deepEqual(
    roundTripped.providers.map((provider: { id: string }) => provider.id),
    [...roundTripped.providers.map((provider: { id: string }) => provider.id)].sort(),
  );
});

test("manifest exposes API-key default-executor providers as sidecar candidates", () => {
  const openai = getProviderPluginManifestEntryFromRegistry(registryFixture, "openai");

  assert.ok(openai);
  assert.equal(openai.sidecar.eligible, true);
  assert.deepEqual(openai.sidecar.reasons, []);
  assert.ok(openai.capabilities.includes("apikey"));
  assert.ok(openai.capabilities.includes("sidecar-candidate"));
  assert.equal(openai.endpoints.baseUrl, "https://api.openai.com/v1/chat/completions");
  assert.ok(openai.models.some((model) => model.id === "gpt-4.1"));
});

test("manifest keeps custom web executors on the TypeScript fallback path", () => {
  const claudeWeb = getProviderPluginManifestEntryFromRegistry(registryFixture, "cw");

  assert.ok(claudeWeb);
  assert.equal(claudeWeb.id, "claude-web");
  assert.equal(claudeWeb.sidecar.eligible, false);
  assert.ok(claudeWeb.capabilities.includes("custom-executor"));
  assert.ok(claudeWeb.sidecar.reasons.some((reason) => reason.includes("claude-web")));
});

test("manifest does not export OAuth client secrets or dynamic functions", () => {
  const manifest = generateProviderPluginManifestFromRegistry(registryFixture);
  const serialized = JSON.stringify(manifest);

  assert.equal(serialized.includes("clientSecret"), false);
  assert.equal(serialized.includes("clientSecretDefault"), false);
  assert.equal(serialized.includes("clientSecretEnv"), false);

  const parsed = JSON.parse(serialized);
  for (const provider of parsed.providers) {
    assert.notEqual(typeof provider.endpoints?.urlBuilder, "function");
    assert.equal("oauth" in provider, false);
    assert.equal("headers" in provider, false);
    assert.equal("extraHeaders" in provider, false);
    assert.equal("requestDefaults" in provider, false);
  }
});

test("manifest advertises usage-fetch for providers with a wired usage fetcher (#11722)", () => {
  const claude = getProviderPluginManifestEntryFromRegistry(registryFixture, "claude");

  assert.ok(claude);
  assert.ok(
    (USAGE_FETCHER_PROVIDERS as readonly string[]).includes("claude"),
    "fixture guard: claude must stay in USAGE_FETCHER_PROVIDERS for this test to mean anything"
  );
  assert.ok(
    claude.capabilities.includes("usage-fetch"),
    "claude has a wired usage fetcher, so the manifest must advertise usage-fetch"
  );
});

test("manifest omits usage-fetch for providers without a usage fetcher (#11722)", () => {
  for (const providerId of ["openai", "anthropic", "claude-web"]) {
    const entry = getProviderPluginManifestEntryFromRegistry(registryFixture, providerId);

    assert.ok(entry, `fixture guard: ${providerId} must resolve`);
    assert.equal(
      (USAGE_FETCHER_PROVIDERS as readonly string[]).includes(entry.id),
      false,
      `fixture guard: ${entry.id} must stay out of USAGE_FETCHER_PROVIDERS`
    );
    assert.equal(
      entry.capabilities.includes("usage-fetch"),
      false,
      `${entry.id} has no wired usage fetcher, so usage-fetch must not be advertised`
    );
  }
});

test("usage-fetch matches the fetcher list by alias too (#11722)", () => {
  // USAGE_FETCHER_PROVIDERS is keyed by the strings `getUsageForProvider` accepts, which
  // mixes canonical ids ("hyperagent") with aliases ("ha"). Resolve on both, the same way
  // getProviderPluginManifestEntryFromRegistry already resolves a lookup.
  const aliasOnlyFixture: Record<string, RegistryEntry> = {
    "hyperagent-eu": {
      id: "hyperagent-eu",
      alias: "ha",
      format: "openai",
      executor: "default",
      baseUrl: "https://eu.hyperagent.example/v1/chat/completions",
      authType: "apikey",
      authHeader: "bearer",
      models: [{ id: "ha-1", name: "HyperAgent 1" }],
    },
  };

  assert.equal(
    (USAGE_FETCHER_PROVIDERS as readonly string[]).includes("hyperagent-eu"),
    false,
    "fixture guard: the id must NOT be in the list, only the alias"
  );
  assert.ok((USAGE_FETCHER_PROVIDERS as readonly string[]).includes("ha"));

  const entry = getProviderPluginManifestEntryFromRegistry(aliasOnlyFixture, "hyperagent-eu");

  assert.ok(entry);
  assert.ok(entry.capabilities.includes("usage-fetch"));
});

test("manifest advertises usage-supported for providers whose usage API is accepted (#10078)", () => {
  // claude is in USAGE_SUPPORTED_PROVIDERS, openai is not — assert against the real
  // list so the test cannot drift silently if the list moves.
  const claude = getProviderPluginManifestEntryFromRegistry(registryFixture, "claude");

  assert.ok(claude);
  assert.ok(
    (USAGE_SUPPORTED_PROVIDERS as readonly string[]).includes("claude"),
    "fixture guard: claude must stay in USAGE_SUPPORTED_PROVIDERS for this test to mean anything"
  );
  assert.ok(
    claude.capabilities.includes("usage-supported"),
    "claude is in USAGE_SUPPORTED_PROVIDERS, so the manifest must advertise usage-supported"
  );
});

test("manifest omits usage-supported for providers outside USAGE_SUPPORTED_PROVIDERS (#10078)", () => {
  for (const providerId of ["openai", "anthropic", "claude-web"]) {
    const entry = getProviderPluginManifestEntryFromRegistry(registryFixture, providerId);

    assert.ok(entry, `fixture guard: ${providerId} must resolve`);
    assert.equal(
      (USAGE_SUPPORTED_PROVIDERS as readonly string[]).includes(entry.id),
      false,
      `fixture guard: ${entry.id} must stay out of USAGE_SUPPORTED_PROVIDERS`
    );
    assert.equal(
      entry.capabilities.includes("usage-supported"),
      false,
      `${entry.id} is not in USAGE_SUPPORTED_PROVIDERS, so usage-supported must not be advertised`
    );
  }
});

test("usage-supported matches only on id, not alias (#10078)", () => {
  // USAGE_SUPPORTED_PROVIDERS is checked with a plain .includes(providerId) — no alias
  // resolution (providerQuotaVisibility.ts:12, providerLimits.ts:178). The manifest must
  // keep the same rule: an alias-only hit must NOT emit the tag.
  const aliasOnlyFixture: Record<string, RegistryEntry> = {
    "some-provider": {
      id: "some-provider",
      alias: "claude",
      format: "openai",
      executor: "default",
      baseUrl: "https://some.example/v1/chat/completions",
      authType: "apikey",
      authHeader: "bearer",
      models: [{ id: "m1", name: "M1" }],
    },
  };

  assert.equal(
    (USAGE_SUPPORTED_PROVIDERS as readonly string[]).includes("some-provider"),
    false,
    "fixture guard: the id must NOT be in the list"
  );
  assert.ok(
    (USAGE_SUPPORTED_PROVIDERS as readonly string[]).includes("claude"),
    "fixture guard: the alias must be in the list, otherwise this test proves nothing"
  );

  const entry = getProviderPluginManifestEntryFromRegistry(aliasOnlyFixture, "some-provider");

  assert.ok(entry);
  assert.equal(
    entry.capabilities.includes("usage-supported"),
    false,
    "usage-supported is id-only — an alias hit must not advertise it"
  );
  // Sanity: the same entry MUST still carry usage-fetch via its alias, proving the
  // two tags deliberately diverge on alias handling.
  assert.ok(
    (USAGE_FETCHER_PROVIDERS as readonly string[]).includes("claude"),
    "fixture guard: claude must also be in USAGE_FETCHER_PROVIDERS for the divergence check"
  );
  assert.ok(entry.capabilities.includes("usage-fetch"));
});
