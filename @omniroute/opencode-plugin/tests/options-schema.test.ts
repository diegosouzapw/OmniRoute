/**
 * T-08 options-schema tests.
 *
 * Covers `parseOmniRoutePluginOptions(opts)` — the strict Zod gate that
 * validates the second-arg `PluginOptions` bag from opencode.json before
 * any hook is wired. Anti-pattern checklist mirrored here:
 *
 *  - `null` / `undefined` must collapse to `{}` (defaults apply downstream).
 *  - Unknown keys must THROW (`.strict()` catches opencode.json typos).
 *  - Validation runs at parse time, not import time (module loads cleanly).
 */

import test from "node:test";
import assert from "node:assert/strict";
import { parseOmniRoutePluginOptions } from "../src/index.js";

test("parseOmniRoutePluginOptions: undefined → {}", () => {
  assert.deepEqual(parseOmniRoutePluginOptions(undefined), {});
});

test("parseOmniRoutePluginOptions: null → {}", () => {
  assert.deepEqual(parseOmniRoutePluginOptions(null), {});
});

test("parseOmniRoutePluginOptions: empty object → {}", () => {
  assert.deepEqual(parseOmniRoutePluginOptions({}), {});
});

test("parseOmniRoutePluginOptions: valid providerId → returns it", () => {
  const r = parseOmniRoutePluginOptions({ providerId: "omniroute-preprod" });
  assert.equal(r.providerId, "omniroute-preprod");
});

test("parseOmniRoutePluginOptions: invalid providerId (special chars) → throws", () => {
  assert.throws(
    () => parseOmniRoutePluginOptions({ providerId: "omniroute prod!" }),
    /providerId.*slug/i
  );
});

test("parseOmniRoutePluginOptions: empty providerId → throws", () => {
  assert.throws(() => parseOmniRoutePluginOptions({ providerId: "" }), /providerId/i);
});

test("parseOmniRoutePluginOptions: valid modelCacheTtl → returns it", () => {
  const r = parseOmniRoutePluginOptions({ modelCacheTtl: 60_000 });
  assert.equal(r.modelCacheTtl, 60_000);
});

test("parseOmniRoutePluginOptions: negative modelCacheTtl → throws", () => {
  assert.throws(() => parseOmniRoutePluginOptions({ modelCacheTtl: -1 }), /modelCacheTtl/i);
});

test("parseOmniRoutePluginOptions: zero modelCacheTtl → throws (positive required)", () => {
  assert.throws(() => parseOmniRoutePluginOptions({ modelCacheTtl: 0 }), /modelCacheTtl/i);
});

test("parseOmniRoutePluginOptions: invalid baseURL (not a URL) → throws", () => {
  assert.throws(() => parseOmniRoutePluginOptions({ baseURL: "not-a-url" }), /baseURL/i);
});

test("parseOmniRoutePluginOptions: unknown key → throws (strict mode catches typos)", () => {
  assert.throws(
    () =>
      parseOmniRoutePluginOptions({
        providerId: "omniroute",
        provider_id: "typo-here",
      }),
    /provider_id|unrecognized/i
  );
});

test("parseOmniRoutePluginOptions: all four fields populated correctly → returns them", () => {
  const opts = {
    providerId: "omniroute-prod",
    displayName: "OmniRoute Production",
    modelCacheTtl: 120_000,
    baseURL: "https://or.example.com/v1",
  };
  const r = parseOmniRoutePluginOptions(opts);
  assert.deepEqual(r, opts);
});

test("parseOmniRoutePluginOptions: error message lists every issue path", () => {
  // Two bad fields at once → error string should mention BOTH.
  try {
    parseOmniRoutePluginOptions({
      providerId: "",
      baseURL: "garbage",
    });
    assert.fail("expected throw");
  } catch (err) {
    const msg = (err as Error).message;
    assert.match(msg, /providerId/);
    assert.match(msg, /baseURL/);
  }
});

test("parseOmniRoutePluginOptions: module import alone does NOT throw", async () => {
  // Re-importing the entry must not trigger validation; validation only fires
  // on explicit parseOmniRoutePluginOptions / OmniRoutePlugin invocation.
  const mod = await import("../src/index.js");
  assert.equal(typeof mod.parseOmniRoutePluginOptions, "function");
});
