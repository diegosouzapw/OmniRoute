/**
 * T-08 multi-instance smoke.
 *
 * Validates that two `OmniRoutePlugin(input, opts)` invocations with
 * different `providerId` values coexist without sharing mutable state.
 * This is the contract that lets opencode.json declare prod + preprod
 * side by side:
 *
 *   "plugin": [
 *     ["@omniroute/opencode-plugin", {"providerId": "omniroute-prod",    "baseURL": "https://or.example/v1"}],
 *     ["@omniroute/opencode-plugin", {"providerId": "omniroute-preprod", "baseURL": "https://or-preprod.example/v1"}]
 *   ]
 *
 * Assertions:
 *   - Each invocation returns its own hooks object (no identity reuse).
 *   - Each `auth` hook carries its own `provider` matching opts.providerId.
 *   - Each `auth.methods` array is its own array (not the same reference).
 *   - Calling the factory twice with IDENTICAL opts still yields two
 *     independent objects (no instance reuse / no shared closure cache).
 *   - Mutating one instance's auth hook does NOT bleed into the other.
 *   - Each instance's loader closure captures its OWN baseURL — no
 *     last-write-wins module-scope state.
 */

import test from "node:test";
import assert from "node:assert/strict";
import { OmniRoutePlugin } from "../src/index.js";

const fakeInput = {} as Parameters<typeof OmniRoutePlugin>[0];

test("multi-instance: two plugin invocations bind to their own providerId", async () => {
  const a = await OmniRoutePlugin(fakeInput, {
    providerId: "omniroute-prod",
    baseURL: "https://a.example/v1",
  });
  const b = await OmniRoutePlugin(fakeInput, {
    providerId: "omniroute-preprod",
    baseURL: "https://b.example/v1",
  });

  assert.equal(a.auth?.provider, "opencode-omniroute-prod");
  assert.equal(b.auth?.provider, "opencode-omniroute-preprod");
});

test("multi-instance: hook objects + nested arrays are independent references", async () => {
  const a = await OmniRoutePlugin(fakeInput, {
    providerId: "alpha",
    baseURL: "https://a.example/v1",
  });
  const b = await OmniRoutePlugin(fakeInput, {
    providerId: "bravo",
    baseURL: "https://b.example/v1",
  });

  assert.notEqual(a, b, "top-level hooks objects must not be the same reference");
  assert.notEqual(a.auth, b.auth, "auth hooks must not be the same reference");
  assert.notEqual(
    a.auth?.methods,
    b.auth?.methods,
    "methods arrays must not be the same reference"
  );
});

test("multi-instance: identical opts twice still yield independent objects", async () => {
  const opts = { providerId: "twin", baseURL: "https://twin.example/v1" };
  const first = await OmniRoutePlugin(fakeInput, { ...opts });
  const second = await OmniRoutePlugin(fakeInput, { ...opts });

  assert.notEqual(first, second);
  assert.notEqual(first.auth, second.auth);
  assert.notEqual(first.auth?.methods, second.auth?.methods);
  // Same provider id is fine — what matters is no shared mutable state.
  assert.equal(first.auth?.provider, "opencode-twin");
  assert.equal(second.auth?.provider, "opencode-twin");
});

test("multi-instance: mutating instance A's auth.methods does not affect instance B", async () => {
  const a = await OmniRoutePlugin(fakeInput, {
    providerId: "iso-a",
    baseURL: "https://a.example/v1",
  });
  const b = await OmniRoutePlugin(fakeInput, {
    providerId: "iso-b",
    baseURL: "https://b.example/v1",
  });

  const beforeLen = b.auth?.methods?.length ?? 0;
  // Mutate a's methods array — extend it; b's must be untouched.
  // We don't know the concrete method shape so push a sentinel cast.
  a.auth?.methods?.push({ type: "api", label: "sentinel" } as never);
  assert.equal(b.auth?.methods?.length, beforeLen, "instance B leaked from instance A mutation");
});

test("multi-instance: loader closures see their own opts (not last-write-wins)", async () => {
  // Each plugin's loader builds its loader payload from the providerId/baseURL
  // captured at invocation time. If the factory accidentally shared a closure
  // (e.g. a module-scope let that the last invocation overwrites), both
  // loaders would emit the same baseURL. Verify they don't.
  const a = await OmniRoutePlugin(fakeInput, {
    providerId: "omniroute-prod",
    baseURL: "https://prod.example/v1",
  });
  const b = await OmniRoutePlugin(fakeInput, {
    providerId: "omniroute-preprod",
    baseURL: "https://preprod.example/v1",
  });

  assert.ok(a.auth?.loader, "instance A must have a loader");
  assert.ok(b.auth?.loader, "instance B must have a loader");

  const getAuthA = async () => ({ type: "api", key: "sk-prod" }) as never;
  const getAuthB = async () => ({ type: "api", key: "sk-preprod" }) as never;

  const rA = (await a.auth!.loader!(getAuthA, {} as never)) as Record<string, unknown>;
  const rB = (await b.auth!.loader!(getAuthB, {} as never)) as Record<string, unknown>;

  assert.equal(rA.apiKey, "sk-prod");
  assert.equal(rA.baseURL, "https://prod.example/v1");
  assert.equal(rB.apiKey, "sk-preprod");
  assert.equal(rB.baseURL, "https://preprod.example/v1");
});

test("multi-instance: invalid opts on one instance does not poison the other", async () => {
  // Sequencing: bad opts → good opts. The bad call must throw cleanly; the
  // good call must still produce a working hooks object. Confirms no
  // half-built module-level state survives a failed parse.
  await assert.rejects(
    () => OmniRoutePlugin(fakeInput, { providerId: "bad id!" } as never),
    /providerId/
  );
  const ok = await OmniRoutePlugin(fakeInput, {
    providerId: "recovered",
    baseURL: "https://ok.example/v1",
  });
  assert.equal(ok.auth?.provider, "opencode-recovered");
});
