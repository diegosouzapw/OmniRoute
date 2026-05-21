import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import {
  OmniRoutePlugin,
  OMNIROUTE_PROVIDER_KEY,
  DEFAULT_MODEL_CACHE_TTL_MS,
  resolveOmniRoutePluginOptions,
} from "../src/index.js";

test("scaffold: exports public surface", () => {
  assert.equal(
    typeof OmniRoutePlugin,
    "function",
    "OmniRoutePlugin must be a function (Plugin factory)"
  );
  assert.equal(OMNIROUTE_PROVIDER_KEY, "omniroute");
  assert.equal(DEFAULT_MODEL_CACHE_TTL_MS, 300_000);
});

test("scaffold: default export is v1 plugin shape { id, server: OmniRoutePlugin }", async () => {
  const mod = await import("../src/index.js");
  assert.equal(typeof mod.default, "object");
  assert.equal(mod.default.id, "@omniroute/opencode-plugin");
  assert.equal(mod.default.server, mod.OmniRoutePlugin);
});

test("resolveOmniRoutePluginOptions: defaults", () => {
  const r = resolveOmniRoutePluginOptions();
  assert.equal(r.providerId, "omniroute");
  assert.equal(r.displayName, "OmniRoute");
  assert.equal(r.modelCacheTtl, 300_000);
  assert.equal(r.baseURL, undefined);
});

test("resolveOmniRoutePluginOptions: custom providerId derives displayName", () => {
  const r = resolveOmniRoutePluginOptions({ providerId: "omniroute-preprod" });
  assert.equal(r.providerId, "omniroute-preprod");
  assert.equal(r.displayName, "OmniRoute (omniroute-preprod)");
});

test("resolveOmniRoutePluginOptions: explicit displayName wins", () => {
  const r = resolveOmniRoutePluginOptions({
    providerId: "omniroute-x",
    displayName: "Custom Label",
  });
  assert.equal(r.displayName, "Custom Label");
});

test("resolveOmniRoutePluginOptions: invalid TTL falls back to default", () => {
  assert.equal(resolveOmniRoutePluginOptions({ modelCacheTtl: 0 }).modelCacheTtl, 300_000);
  assert.equal(resolveOmniRoutePluginOptions({ modelCacheTtl: -1 }).modelCacheTtl, 300_000);
});

test("resolveOmniRoutePluginOptions: positive TTL respected", () => {
  assert.equal(resolveOmniRoutePluginOptions({ modelCacheTtl: 60_000 }).modelCacheTtl, 60_000);
});

test("OmniRoutePlugin: returns an empty hooks object (scaffold)", async () => {
  const fakeCtx = {} as Parameters<typeof OmniRoutePlugin>[0];
  const hooks = await OmniRoutePlugin(fakeCtx);
  assert.equal(typeof hooks, "object");
  assert.notEqual(hooks, null);
});

test("scaffold: CJS default export resolves via require() with v1 shape", () => {
  const require_ = createRequire(import.meta.url);
  const cjs = require_("../dist/index.cjs");
  // after cjsInterop:true, default export is on cjs.default
  assert.strictEqual(typeof cjs.default, "object");
  assert.strictEqual(cjs.default.id, "@omniroute/opencode-plugin");
  assert.strictEqual(typeof cjs.default.server, "function");
});
