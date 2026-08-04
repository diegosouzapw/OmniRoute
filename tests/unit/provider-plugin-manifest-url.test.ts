import assert from "node:assert/strict";
import test from "node:test";

import {
  PROVIDER_PLUGIN_MANIFEST_HEADER,
  resolveProviderPluginManifestUrl,
  getProviderPluginManifestHeader,
} from "../../open-sse/config/providerPluginManifestUrl.ts";

test("provider manifest URL uses explicit env override", () => {
  const previous = process.env.OMNIROUTE_PROVIDER_MANIFEST_URL;
  process.env.OMNIROUTE_PROVIDER_MANIFEST_URL = "http://sidecar.local/manifest.json";
  try {
    assert.equal(
      resolveProviderPluginManifestUrl("http://127.0.0.1:20128"),
      "http://sidecar.local/manifest.json",
    );
  } finally {
    if (previous === undefined) {
      delete process.env.OMNIROUTE_PROVIDER_MANIFEST_URL;
    } else {
      process.env.OMNIROUTE_PROVIDER_MANIFEST_URL = previous;
    }
  }
});

test("provider manifest URL derives from request origin", () => {
  assert.equal(
    resolveProviderPluginManifestUrl("http://127.0.0.1:20128/"),
    "http://127.0.0.1:20128/api/v1/provider-plugin-manifest",
  );
});

test("provider manifest header exposes stable header name", () => {
  assert.deepEqual(getProviderPluginManifestHeader("http://localhost:20128"), {
    [PROVIDER_PLUGIN_MANIFEST_HEADER]:
      "http://localhost:20128/api/v1/provider-plugin-manifest",
  });
});
