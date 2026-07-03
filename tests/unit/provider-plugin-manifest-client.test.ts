import assert from "node:assert/strict";
import test from "node:test";

import {
  fetchProviderPluginManifest,
  fetchProviderPluginManifestEntryForModel,
  getProviderPluginManifestEntryForModelFromManifest,
  PROVIDER_PLUGIN_MANIFEST_ENV,
  PROVIDER_PLUGIN_MANIFEST_PATH,
  resolveProviderPluginManifestUrl,
} from "../../open-sse/config/providerPluginManifestClient.ts";
import type { ProviderPluginManifest } from "../../open-sse/config/providerPluginManifest.ts";

const ORIGINAL_ENV = { ...process.env };

function restoreEnv() {
  process.env = { ...ORIGINAL_ENV };
}

test.afterEach(() => {
  restoreEnv();
});

test("provider plugin manifest client resolves explicit and env URLs first", () => {
  process.env[PROVIDER_PLUGIN_MANIFEST_ENV] = "http://env.example/manifest";

  assert.equal(
    resolveProviderPluginManifestUrl({ manifestUrl: "http://explicit.example/manifest" }),
    "http://explicit.example/manifest",
  );
  assert.equal(
    resolveProviderPluginManifestUrl({ baseUrl: "http://local.example:20128/" }),
    "http://env.example/manifest",
  );
});

test("provider plugin manifest client resolves base and default local URLs", () => {
  delete process.env[PROVIDER_PLUGIN_MANIFEST_ENV];
  process.env.HOST = "0.0.0.0";
  process.env.PORT = "20129";

  assert.equal(
    resolveProviderPluginManifestUrl({ baseUrl: "http://127.0.0.1:20128/" }),
    `http://127.0.0.1:20128${PROVIDER_PLUGIN_MANIFEST_PATH}`,
  );
  assert.equal(
    resolveProviderPluginManifestUrl(),
    `http://0.0.0.0:20129${PROVIDER_PLUGIN_MANIFEST_PATH}`,
  );
});

test("provider plugin manifest client fetches and validates schemaVersion 1", async () => {
  const manifest: ProviderPluginManifest = {
    schemaVersion: 1,
    generatedFrom: "open-sse/config/providers",
    providers: [],
  };
  const calls: Array<{ url: string; init?: RequestInit }> = [];
  const fetchImpl: typeof fetch = async (url, init) => {
    calls.push({ url: String(url), init });
    return new Response(JSON.stringify(manifest), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };

  const result = await fetchProviderPluginManifest({
    manifestUrl: "http://sidecar.local/manifest",
    fetchImpl,
  });

  assert.deepEqual(result, manifest);
  assert.equal(calls[0]?.url, "http://sidecar.local/manifest");
  assert.equal((calls[0]?.init?.headers as Record<string, string>).Accept, "application/json");
});

test("provider plugin manifest client rejects failed HTTP and malformed responses", async () => {
  await assert.rejects(
    fetchProviderPluginManifest({
      manifestUrl: "http://sidecar.local/manifest",
      fetchImpl: async () => new Response("nope", { status: 503 }),
    }),
    /HTTP 503/,
  );

  await assert.rejects(
    fetchProviderPluginManifest({
      manifestUrl: "http://sidecar.local/manifest",
      fetchImpl: async () => new Response(JSON.stringify({ providers: [] }), { status: 200 }),
    }),
    /schemaVersion 1/,
  );
});

test("provider plugin manifest client resolves model entries from fetched manifests", async () => {
  const manifest: ProviderPluginManifest = {
    schemaVersion: 1,
    generatedFrom: "open-sse/config/providers",
    providers: [
      {
        id: "anthropic",
        alias: "claude",
        format: "anthropic",
        executor: "default",
        auth: { type: "apikey", header: "x-api-key" },
        endpoints: { baseUrl: "https://api.anthropic.com" },
        capabilities: ["apikey", "sidecar-candidate"],
        passthroughModels: false,
        models: [{ id: "claude-sonnet-4.6", name: "Claude Sonnet 4.6" }],
        sidecar: { eligible: true, reasons: [] },
      },
      {
        id: "openai",
        format: "openai",
        executor: "default",
        auth: { type: "apikey", header: "Authorization", prefix: "Bearer" },
        endpoints: { baseUrl: "https://api.openai.com/v1" },
        capabilities: ["apikey", "sidecar-candidate"],
        passthroughModels: false,
        models: [{ id: "gpt-4.1", name: "GPT-4.1" }],
        sidecar: { eligible: true, reasons: [] },
      },
    ],
  };
  const fetchImpl: typeof fetch = async () =>
    new Response(JSON.stringify(manifest), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  assert.equal(
    getProviderPluginManifestEntryForModelFromManifest(manifest, "openai/gpt-4.1")?.id,
    "openai",
  );
  assert.equal(
    getProviderPluginManifestEntryForModelFromManifest(manifest, "claude/claude-sonnet-4.6")?.id,
    "anthropic",
  );
  assert.equal(
    getProviderPluginManifestEntryForModelFromManifest(manifest, "gpt-4.1")?.id,
    "openai",
  );
  assert.equal(
    await fetchProviderPluginManifestEntryForModel("missing-model", {
      manifestUrl: "http://sidecar.local/manifest",
      fetchImpl,
    }),
    null,
  );
});
