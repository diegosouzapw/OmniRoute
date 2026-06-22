import test from "node:test";
import assert from "node:assert/strict";
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
  assert.equal(r.providerId, "opencode-omniroute");
  assert.equal(r.displayName, "OmniRoute");
  assert.equal(r.modelCacheTtl, 300_000);
  assert.equal(r.baseURL, undefined);
});

test("resolveOmniRoutePluginOptions: custom providerId derives displayName", () => {
  const r = resolveOmniRoutePluginOptions({ providerId: "omniroute-preprod" });
  assert.equal(r.providerId, "opencode-omniroute-preprod");
  assert.equal(r.displayName, "OmniRoute (opencode-omniroute-preprod)");
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

test("scaffold: built ESM default export resolves with the v1 plugin shape", async () => {
  // The plugin is ESM-only now — the CJS bundle was dropped to fix the OpenCode
  // loader (#3883), so there is no more ../dist/index.cjs. Validate that the built
  // distributable's default export still carries the OpenCode v1 { id, server } shape.
  const mod = await import("../dist/index.js");
  assert.strictEqual(typeof mod.default, "object");
  assert.strictEqual(mod.default.id, "@omniroute/opencode-plugin");
  assert.strictEqual(typeof mod.default.server, "function");
});
