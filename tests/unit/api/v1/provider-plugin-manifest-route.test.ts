import assert from "node:assert/strict";
import test from "node:test";

import {
  GET,
  OPTIONS,
  injectServiceModelsIntoManifest,
} from "../../../../src/app/api/v1/provider-plugin-manifest/route.ts";
import { generateProviderPluginManifest } from "@omniroute/open-sse/config/providerPluginManifestRegistry.ts";
import type { ProviderPluginManifest } from "@omniroute/open-sse/config/providerPluginManifest.ts";
import type { ServiceModel } from "@/lib/db/serviceModels";

test("provider plugin manifest route returns JSON-safe manifest", async () => {
  const response = await GET();
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(response.headers.get("Content-Type"), "application/json");
  assert.equal(body.schemaVersion, 1);
  assert.equal(body.generatedFrom, "open-sse/config/providers");
  assert.ok(body.providers.length > 100);
  assert.ok(body.providers.some((provider: { id: string }) => provider.id === "openai"));

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
  const manifest = generateProviderPluginManifest() as ProviderPluginManifest;
  const withModels = await injectServiceModelsIntoManifest(
    manifest,
    (toolName: string): ServiceModel[] => {
      if (toolName === "9router") {
        return [{ id: "gpt-test", name: "9Router Test" }];
      }
      if (toolName === "cliproxyapi") {
        return [{ id: "model-clone", name: "Cliproxy Test", available: false }];
      }
      return [];
    }
  );

  const nineRouterEntry = withModels.providers.find((provider) => provider.id === "9router");
  assert.ok(nineRouterEntry);
  assert.ok(nineRouterEntry?.models.some((model) => model.id === "9router/gpt-test"));

  const clipEntry = withModels.providers.find((provider) => provider.id === "cliproxyapi");
  assert.ok(clipEntry);
  assert.ok(!clipEntry?.models.some((model) => model.id === "cliproxyapi/model-clone"));
});

test("provider plugin manifest route injects only when 9router exposure is enabled", async () => {
  const manifest = generateProviderPluginManifest() as ProviderPluginManifest;
  const withModels = await injectServiceModelsIntoManifest(
    manifest,
    (toolName: string): ServiceModel[] => {
      if (toolName === "9router") {
        return [{ id: "gpt-test", name: "9Router Test" }];
      }
      return [];
    },
    (toolName: string): boolean => (toolName === "9router" ? false : true)
  );

  const nineRouterEntry = withModels.providers.find((provider) => provider.id === "9router");
  assert.ok(nineRouterEntry);
  assert.equal(
    nineRouterEntry?.models.some((model) => model.id === "9router/gpt-test"),
    false
  );
});

test("provider plugin manifest route injects for cliproxy when exposure is enabled", async () => {
  const manifest = generateProviderPluginManifest() as ProviderPluginManifest;
  const withModels = await injectServiceModelsIntoManifest(
    manifest,
    (toolName: string): ServiceModel[] => {
      if (toolName === "cliproxyapi") {
        return [{ id: "model-clone", name: "Cliproxy Test" }];
      }
      return [];
    },
    (toolName: string): boolean => (toolName === "9router" ? true : true)
  );

  const clipEntry = withModels.providers.find((provider) => provider.id === "cliproxyapi");
  assert.ok(clipEntry);
  assert.equal(
    clipEntry?.models.some((model) => model.id === "cliproxyapi/model-clone"),
    true
  );
});

test("provider plugin manifest route skips cliproxy models when exposure is disabled", async () => {
  const manifest = generateProviderPluginManifest() as ProviderPluginManifest;
  const withModels = await injectServiceModelsIntoManifest(
    manifest,
    (toolName: string): ServiceModel[] => {
      if (toolName === "cliproxyapi") {
        return [{ id: "model-clone", name: "Cliproxy Test" }];
      }
      return [];
    },
    () => true
  );

  const withModelsDisabled = await injectServiceModelsIntoManifest(
    manifest,
    (toolName: string): ServiceModel[] => {
      if (toolName === "cliproxyapi") {
        return [{ id: "model-clone", name: "Cliproxy Test" }];
      }
      return [];
    },
    (toolName: string): boolean => (toolName === "cliproxyapi" ? false : true)
  );

  const clipEntry = withModels.providers.find((provider) => provider.id === "cliproxyapi");
  const clipEntryDisabled = withModelsDisabled.providers.find(
    (provider) => provider.id === "cliproxyapi"
  );
  assert.ok(clipEntry);
  assert.equal(
    clipEntry?.models.some((model) => model.id === "cliproxyapi/model-clone"),
    true
  );
  assert.ok(clipEntryDisabled);
  assert.equal(
    clipEntryDisabled?.models.some((model) => model.id === "cliproxyapi/model-clone"),
    false
  );
});
