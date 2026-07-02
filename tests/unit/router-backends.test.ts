import test from "node:test";
import assert from "node:assert/strict";

import {
  backendHasCapability,
  getRouterBackend,
  listRouterBackends,
  listRouterBackendsByCapability,
} from "../../src/domain/routing/routerBackends.ts";

test("router backend registry exposes the current routing backends", () => {
  const ids = listRouterBackends().map((backend) => backend.id);
  assert.deepEqual(ids, ["ts", "bifrost", "cliproxy", "9router", "vibeproxy"]);
});

test("bifrost is represented as a native hot-path backend before supervision lands", () => {
  const bifrost = getRouterBackend("bifrost");
  assert.ok(bifrost);
  assert.equal(bifrost.lifecycle, "external");
  assert.equal(bifrost.envBaseUrl, "BIFROST_BASE_URL");
  assert.equal(backendHasCapability(bifrost, "native-hot-path"), true);
  assert.equal(bifrost.telemetry.ttft, true);
  assert.equal(bifrost.telemetry.tokensPerSecond, true);
});

test("supervised service backends carry service names and default ports", () => {
  const cliproxy = getRouterBackend("cliproxy");
  const ninerouter = getRouterBackend("9router");
  assert.ok(cliproxy);
  assert.ok(ninerouter);
  assert.equal(cliproxy.lifecycle, "supervised");
  assert.equal(cliproxy.serviceName, "cliproxy");
  assert.equal(cliproxy.defaultPort, 8317);
  assert.equal(ninerouter.lifecycle, "supervised");
  assert.equal(ninerouter.serviceName, "9router");
  assert.equal(ninerouter.defaultPort, 20130);
});

test("capability filtering returns every streaming backend", () => {
  const streaming = listRouterBackendsByCapability("streaming").map((backend) => backend.id);
  assert.deepEqual(streaming, ["ts", "bifrost", "cliproxy", "9router", "vibeproxy"]);
});

test("unknown backend ids resolve to null", () => {
  assert.equal(getRouterBackend("plano"), null);
});
