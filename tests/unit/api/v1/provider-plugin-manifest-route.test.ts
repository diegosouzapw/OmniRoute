import assert from "node:assert/strict";
import test from "node:test";

import {
  GET,
  OPTIONS,
  injectServiceModelsIntoManifest,
} from "../../../../src/app/api/v1/provider-plugin-manifest/route.ts";
import type { ServiceModel } from "../../../../src/lib/db/serviceModels.ts";
import type { ProviderPluginManifest, ProviderPluginManifestEntry } from "../../../../open-sse/config/providerPluginManifest.ts";
import { generateProviderPluginManifest } from "../../../../open-sse/config/providerPluginManifestRegistry.ts";

function getProvider(manifest: ProviderPluginManifest, id: string): ProviderPluginManifestEntry | undefined {
  return manifest.providers.find((provider) => provider.id === id);
}

function hasModel(provider: ProviderPluginManifestEntry | undefined, modelId: string): boolean {
  if (!provider) return false;
  return provider.models.some((model) => model.id === modelId);
}

function withServicePluginEntries(manifest: ProviderPluginManifest): ProviderPluginManifest {
  const providers = [...manifest.providers];

  if (!providers.some((provider) => provider.id === "9router")) {
    providers.push({
      id: "9router",
      format: "openai",
      executor: "default",
      auth: { type: "none", header: "authorization" },
      endpoints: {},
      capabilities: [],
      passthroughModels: false,
      models: [],
      sidecar: { eligible: false, reasons: [] },
    });
  }

  if (!providers.some((provider) => provider.id === "cliproxyapi")) {
    providers.push({
      id: "cliproxyapi",
      format: "openai",
      executor: "default",
      auth: { type: "none", header: "authorization" },
      endpoints: {},
      capabilities: [],
      passthroughModels: false,
      models: [],
      sidecar: { eligible: false, reasons: [] },
    });
  }

  providers.sort((a, b) => a.id.localeCompare(b.id));

  return {
    ...manifest,
    providers,
  };
}

test("provider plugin manifest route returns JSON-safe manifest", async () => {
  const response = await GET(new Request("http://localhost/api/v1/provider-plugin-manifest"));
  const body = (await response.json()) as ProviderPluginManifest;

  assert.equal(response.status, 200);
  assert.equal(response.headers.get("Cache-Control"), "public, max-age=60");
  assert.match(response.headers.get("ETag") ?? "", /^"[A-Za-z0-9_-]+"$/);
  assert.equal(response.headers.get("Content-Type"), "application/json");
  assert.equal(body.schemaVersion, 1);
  assert.equal(body.generatedFrom, "open-sse/config/providers");
  assert.ok(body.providers.length > 100);
  assert.ok(body.providers.some((provider) => provider.id === "openai"));

  const serialized = JSON.stringify(body);
  assert.equal(serialized.includes("clientSecret"), false);
});

test("provider plugin manifest route handles CORS preflight", async () => {
  const response = await OPTIONS();

  assert.equal(response.status, 200);
  assert.equal(response.headers.get("Access-Control-Allow-Methods"), "GET, OPTIONS");
  assert.equal(response.headers.get("Access-Control-Allow-Headers"), "*");
});

test("provider plugin manifest route injects service models with a custom reader", async () => {
  const manifest = withServicePluginEntries(generateProviderPluginManifest());
  const withModels = await injectServiceModelsIntoManifest(
    manifest,
    (toolName: string): ServiceModel[] => {
      if (toolName === "9router") {
        return [
          { id: "gpt-test", name: "9Router Test", available: true },
          { id: "9router/chat", name: "Already namespaced", available: true },
        ];
      }
      if (toolName === "cliproxyapi") {
        return [{ id: "model-clone", name: "Cliproxy Test", available: true }];
      }
      return [];
    },
  );

  const nineRouterEntry = getProvider(withModels, "9router");
  assert.ok(nineRouterEntry);
  assert.ok(hasModel(nineRouterEntry, "9router/gpt-test"));
  assert.ok(hasModel(nineRouterEntry, "9router/chat"));

  const cliproxyEntry = getProvider(withModels, "cliproxyapi");
  assert.ok(cliproxyEntry);
  assert.ok(hasModel(cliproxyEntry, "cliproxyapi/model-clone"));
});

test("provider plugin manifest route injects providers absent from upstream registry", async () => {
  const manifest = generateProviderPluginManifest();
  const withModels = await injectServiceModelsIntoManifest(
    manifest,
    (toolName: string): ServiceModel[] => {
      if (toolName === "9router") {
        return [{ id: "injected-model", name: "Runtime Model", available: true }];
      }
      if (toolName === "cliproxyapi") {
        return [{ id: "proxy-model", name: "Proxy Model", available: true }];
      }
      return [];
    }
  );

  const nineRouterEntry = getProvider(withModels, "9router");
  assert.ok(nineRouterEntry);
  assert.ok(hasModel(nineRouterEntry, "9router/injected-model"));
  assert.equal(nineRouterEntry.passthroughModels, true);
  assert.equal(nineRouterEntry.endpoints?.modelsUrl, "/v1/models");
  assert.equal(nineRouterEntry.format, "openai");

  const cliproxyEntry = getProvider(withModels, "cliproxyapi");
  assert.ok(cliproxyEntry);
  assert.ok(hasModel(cliproxyEntry, "cliproxyapi/proxy-model"));
  assert.equal(cliproxyEntry.passthroughModels, true);
  assert.equal(cliproxyEntry.endpoints?.modelsUrl, "/v1/models");
  assert.equal(cliproxyEntry.format, "openai");
});

test("provider plugin manifest route skips unavailable service models", async () => {
  const manifest = withServicePluginEntries(generateProviderPluginManifest());
  const withModels = await injectServiceModelsIntoManifest(
    manifest,
    (toolName: string): ServiceModel[] => {
      if (toolName === "9router") {
        return [
          { id: "visible", name: "9Router Visible", available: true },
          { id: "hidden", name: "9Router Hidden", available: false },
        ];
      }
      return [];
    },
  );

  const nineRouterEntry = getProvider(withModels, "9router");
  assert.ok(nineRouterEntry);
  assert.ok(hasModel(nineRouterEntry, "9router/visible"));
  assert.equal(hasModel(nineRouterEntry, "9router/hidden"), false);
});

test("provider plugin manifest route injects only when 9router exposure is enabled", async () => {
  const manifest = withServicePluginEntries(generateProviderPluginManifest());
  const withModels = await injectServiceModelsIntoManifest(
    manifest,
    (toolName: string): ServiceModel[] => {
      if (toolName === "9router") {
        return [{ id: "gpt-test", name: "9Router Test" }];
      }
      return [];
    },
    (toolName: string): boolean => (toolName === "9router" ? false : true),
  );

  const nineRouterEntry = getProvider(withModels, "9router");
  assert.ok(nineRouterEntry);
  assert.equal(hasModel(nineRouterEntry, "9router/gpt-test"), false);
});

test("provider plugin manifest route injects for cliproxy when exposure is enabled", async () => {
  const manifest = withServicePluginEntries(generateProviderPluginManifest());
  const withModels = await injectServiceModelsIntoManifest(
    manifest,
    (toolName: string): ServiceModel[] => {
      if (toolName === "cliproxyapi") {
        return [{ id: "model-clone", name: "Cliproxy Test" }];
      }
      return [];
    },
    () => true,
  );

  const cliproxyEntry = getProvider(withModels, "cliproxyapi");
  assert.ok(cliproxyEntry);
  assert.ok(hasModel(cliproxyEntry, "cliproxyapi/model-clone"));
});

test("provider plugin manifest route skips cliproxy models when exposure is disabled", async () => {
  const manifest = withServicePluginEntries(generateProviderPluginManifest());
  const withModels = await injectServiceModelsIntoManifest(
    manifest,
    (toolName: string): ServiceModel[] => {
      if (toolName === "cliproxyapi") {
        return [{ id: "model-clone", name: "Cliproxy Test" }];
      }
      return [];
    },
    (toolName: string): boolean => (toolName === "cliproxyapi" ? false : true),
  );

  const cliproxyEntry = getProvider(withModels, "cliproxyapi");
  assert.ok(cliproxyEntry);
  assert.equal(hasModel(cliproxyEntry, "cliproxyapi/model-clone"), false);
});

test("provider plugin manifest supports conditional sidecar refreshes", async () => {
  const initial = await GET(new Request("http://localhost/api/v1/provider-plugin-manifest"));
  const etag = initial.headers.get("ETag");

  const response = await GET(
    new Request("http://localhost/api/v1/provider-plugin-manifest", {
      headers: { "If-None-Match": etag ?? "" },
    })
  );

  assert.equal(response.status, 304);
  assert.equal(response.headers.get("ETag"), etag);
  assert.equal(await response.text(), "");
});

test("provider plugin manifest accepts weak conditional validators", async () => {
  const initial = await GET(new Request("http://localhost/api/v1/provider-plugin-manifest"));
  const etag = initial.headers.get("ETag");

  const response = await GET(
    new Request("http://localhost/api/v1/provider-plugin-manifest", {
      headers: { "If-None-Match": `W/${etag}` },
    })
  );

  assert.equal(response.status, 304);
});
