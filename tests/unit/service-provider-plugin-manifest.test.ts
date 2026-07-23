import assert from "node:assert/strict";
import test from "node:test";

import {
  createServiceBackendManifestEntry,
  generateProviderPluginManifestFromRegistry,
} from "../../open-sse/config/providerPluginManifest.ts";
import { REGISTRY } from "../../open-sse/config/providers/index.ts";
import {
  SERVICE_BACKEND_MANIFEST_TEMPLATE,
  isServiceBackendPluginId,
} from "../../src/lib/services/serviceBackends";
import { readFileSync } from "node:fs";

test("createServiceBackendManifestEntry('9router', ...) preserves the template verbatim, with empty static models", () => {
  const template = SERVICE_BACKEND_MANIFEST_TEMPLATE["9router"];
  const entry = createServiceBackendManifestEntry("9router", template);

  assert.equal(entry.id, "9router");
  assert.equal(entry.format, template.format);
  assert.equal(entry.executor, template.executor);
  assert.deepStrictEqual(entry.auth, template.auth);
  assert.deepStrictEqual(entry.endpoints, template.endpoints);
  assert.deepStrictEqual(entry.capabilities, template.capabilities);
  assert.equal(entry.passthroughModels, template.passthroughModels);
  assert.deepStrictEqual(entry.sidecar, template.sidecar);
  // Service backends have no static model catalog of their own — models come from
  // getServiceModels() at runtime, not the manifest.
  assert.deepStrictEqual(entry.models, []);
});

test("createServiceBackendManifestEntry works for cliproxyapi's template too (function is generic, not 9router-specific)", () => {
  const template = SERVICE_BACKEND_MANIFEST_TEMPLATE.cliproxyapi;
  const entry = createServiceBackendManifestEntry("cliproxyapi", template);
  assert.equal(entry.id, "cliproxyapi");
  assert.deepStrictEqual(entry.capabilities, template.capabilities);
  assert.deepStrictEqual(entry.models, []);
});

test("existing-behavior regression: generateProviderPluginManifestFromRegistry() output for openai/anthropic is unchanged by Step 4's additive export", () => {
  const manifest = generateProviderPluginManifestFromRegistry(REGISTRY);
  const openai = manifest.providers.find((p) => p.id === "openai");
  const anthropic = manifest.providers.find((p) => p.id === "anthropic");
  assert.ok(openai, "expected 'openai' in the generated manifest");
  assert.ok(anthropic, "expected 'anthropic' in the generated manifest");

  // Neither entry contains a "9router"/"cliproxyapi" id — proves
  // createServiceBackendManifestEntry() is not consumed by the static registry path.
  assert.equal(
    manifest.providers.some((p) => p.id === "9router" || p.id === "cliproxyapi"),
    false
  );
});

test("existing-behavior regression: /v1/providers/[provider]/models route still dispatches embedded-service backends via isServiceBackendPluginId()/getServiceModels(), untouched by this PR", () => {
  const routeSource = readFileSync(
    new URL(
      "../../src/app/api/v1/providers/[provider]/models/route.ts",
      import.meta.url
    ),
    "utf8"
  );
  assert.match(routeSource, /isServiceBackendPluginId\(rawProvider\)/);
  assert.match(routeSource, /getServiceModels\(rawProvider\)/);
  // The new manifest helper must NOT be wired into this live request path in this PR.
  assert.doesNotMatch(routeSource, /createServiceBackendManifestEntry/);

  assert.equal(isServiceBackendPluginId("9router"), true);
  assert.equal(isServiceBackendPluginId("cliproxyapi"), true);
});
