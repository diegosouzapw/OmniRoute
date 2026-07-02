import test from "node:test";
import assert from "node:assert/strict";

import {
  buildLoopbackUrl,
  getRouterBackendServiceMetadata,
} from "../../../src/lib/services/routerBackendService.ts";

test("router backend service metadata resolves 9router from registry defaults", () => {
  const metadata = getRouterBackendServiceMetadata("9router", {});

  assert.equal(metadata.tool, "9router");
  assert.equal(metadata.port, 20130);
  assert.equal(metadata.healthPath, "/api/health");
});

test("router backend service metadata resolves cliproxy port from env", () => {
  const metadata = getRouterBackendServiceMetadata("cliproxy", {
    CLIPROXYAPI_PORT: "18317",
  });

  assert.equal(metadata.tool, "cliproxy");
  assert.equal(metadata.port, 18317);
  assert.equal(metadata.healthPath, "/v1/models");
});

test("router backend service metadata falls back when env port is invalid", () => {
  const metadata = getRouterBackendServiceMetadata("9router", {
    NINEROUTER_PORT: "not-a-port",
  });

  assert.equal(metadata.port, 20130);
});

test("router backend service metadata rejects non-supervised backends", () => {
  assert.throws(() => getRouterBackendServiceMetadata("bifrost", {}), /not a supervised service/);
});

test("buildLoopbackUrl formats service health URLs", () => {
  assert.equal(buildLoopbackUrl(20130, "/api/health"), "http://127.0.0.1:20130/api/health");
});
