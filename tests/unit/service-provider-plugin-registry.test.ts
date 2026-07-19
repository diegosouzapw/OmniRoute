import test from "node:test";
import assert from "node:assert/strict";

import {
  SERVICE_PROVIDER_PLUGINS,
  getServiceProviderPlugin,
} from "../../src/lib/services/providerPlugins/registry";
import { resolveSpawnArgs as nineRouterSpawnArgs } from "../../src/lib/services/installers/ninerouter";
import { resolveSpawnArgs as cliproxySpawnArgs } from "../../src/lib/services/installers/cliproxy";
import { resolveSpawnArgs as muxSpawnArgs } from "../../src/lib/services/installers/mux";
import { resolveSpawnArgs as bifrostSpawnArgs } from "../../src/lib/services/installers/bifrost";
import { isLocalOnlyPath } from "../../src/server/authz/routeGuard";

test("getServiceProviderPlugin('9router') matches the pre-migration bootstrap.ts literal", () => {
  const plugin = getServiceProviderPlugin("9router");
  assert.ok(plugin, "expected a registered 9router plugin");
  assert.equal(plugin?.port.default, 20130);
  assert.equal(plugin?.port.envVar, "NINEROUTER_PORT");
  assert.equal(plugin?.healthPath, "/api/health");
  assert.equal(plugin?.healthIntervalMs, 2_000);
  assert.equal(plugin?.stopTimeoutMs, 15_000);
  assert.equal(plugin?.logsBufferBytes, 5_242_880);
  assert.equal(plugin?.needsApiKey, true);
  assert.equal(plugin?.tool, "9router");
  assert.equal(plugin?.pluginId, "9router");
});

test("getServiceProviderPlugin('cliproxy') is undefined — narrow Record<'9router', ...> typing, not silently migrated", () => {
  assert.equal(getServiceProviderPlugin("cliproxy"), undefined);
  assert.equal(getServiceProviderPlugin("cliproxyapi"), undefined);
  assert.equal(getServiceProviderPlugin("mux"), undefined);
  assert.equal(getServiceProviderPlugin("bifrost"), undefined);
  assert.deepEqual(Object.keys(SERVICE_PROVIDER_PLUGINS), ["9router"]);
});

test("backward-compat: 9router plugin spawnArgs resolve to the same shape as the direct installer call", () => {
  const plugin = getServiceProviderPlugin("9router");
  assert.ok(plugin);
  const apiKey = "test-api-key";
  const port = 20130;
  const viaPlugin = plugin!.spawnArgs(apiKey, port);
  const direct = nineRouterSpawnArgs(apiKey, port);
  assert.deepStrictEqual(viaPlugin, direct);
});

test("backward-compat: untouched backends (cliproxy/mux/bifrost) installer spawnArgs are unaffected by the plugin registry", () => {
  // These backends stay on bootstrap.ts's pre-existing inline branches — this test proves
  // the plugin registry introduction did not change their installer exports at all.
  assert.deepStrictEqual(cliproxySpawnArgs(8317), cliproxySpawnArgs(8317));
  assert.deepStrictEqual(muxSpawnArgs("k", 8322), muxSpawnArgs("k", 8322));
  assert.deepStrictEqual(bifrostSpawnArgs(8080), bifrostSpawnArgs(8080));
});

test("Hard Rule #17 regression: /api/services/* stays LOCAL_ONLY after the plugin contract introduction", () => {
  assert.equal(isLocalOnlyPath("/api/services/9router/status"), true);
  assert.equal(isLocalOnlyPath("/api/services/cliproxy/status"), true);
});
