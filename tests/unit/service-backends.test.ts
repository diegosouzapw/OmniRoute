import test from "node:test";
import assert from "node:assert/strict";

import {
  isServiceBackendPluginId,
  getServiceToolFromPluginId,
  SERVICE_BACKEND_PLUGIN_IDS,
} from "../../src/lib/services/serviceBackends";

test("service backend helper recognizes embedded service plugin ids", () => {
  for (const pluginId of SERVICE_BACKEND_PLUGIN_IDS) {
    assert.equal(isServiceBackendPluginId(pluginId), true);
  }
});

test("service backend helper maps plugin ids to runtime tool ids", () => {
  assert.equal(getServiceToolFromPluginId("9router"), "9router");
  assert.equal(getServiceToolFromPluginId("cliproxyapi"), "cliproxy");
  assert.equal(getServiceToolFromPluginId("native"), undefined);
});
