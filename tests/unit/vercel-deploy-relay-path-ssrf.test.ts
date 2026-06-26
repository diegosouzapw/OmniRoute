// SSRF regression guard for the Vercel relay worker (lockstep with the Deno
// Deploy relay fix; PR #4643 / deno-deploy follow-up).
//
// The generated Vercel edge function reads an attacker-controlled `x-relay-path`
// header and previously appended it to the (validated) `x-relay-target` origin
// via string concatenation: `fetch(target.replace(/\/$/, "") + relayPath)`.
// That is bypassable via userinfo (`/x@evil.com`), a backslash (`\evil.com`), or
// a protocol-relative path (`//evil.com/x`) — the same hole the Deno worker had.
//
// The fix reuses the SAME pure `resolveRelayTarget()` guard (exported from the
// deno-deploy route, embedded into both workers via Function#toString). This
// test mirrors `deno-deploy-relay-path-ssrf.test.ts`: it asserts the generated
// Vercel worker no longer string-concatenates the path and embeds the guard.
// The pure-function behavior itself is covered once in the deno test (same
// function); here we focus on the Vercel worker wiring.
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { resolveRelayTarget } from "../../src/app/api/settings/proxy/deno-deploy/route";
import { __buildRelayFunctionForTest } from "../../src/app/api/settings/proxy/vercel-deploy/route";

const TARGET = "https://api.anthropic.com";

describe("vercel relay reuses the SSRF-safe resolveRelayTarget guard", () => {
  it("accepts a legitimate absolute path", () => {
    const r = resolveRelayTarget(TARGET, "/v1/foo");
    assert.equal(r.ok, true);
    if (r.ok) assert.equal(r.url, "https://api.anthropic.com/v1/foo");
  });

  it("rejects //evil.com/x (host swap)", () => {
    const r = resolveRelayTarget(TARGET, "//evil.com/x");
    assert.equal(r.ok, false);
    if (!r.ok) assert.equal(r.status, 403);
  });

  it("rejects /x@evil.com (userinfo)", () => {
    const r = resolveRelayTarget(TARGET, "/x@evil.com");
    assert.equal(r.ok, false);
    if (!r.ok) assert.equal(r.status, 403);
  });

  it("rejects \\evil.com (backslash)", () => {
    const r = resolveRelayTarget(TARGET, "\\evil.com");
    assert.equal(r.ok, false);
    if (!r.ok) assert.equal(r.status, 403);
  });

  it("rejects a value without a leading '/'", () => {
    const r = resolveRelayTarget(TARGET, "evil.com/x");
    assert.equal(r.ok, false);
    if (!r.ok) assert.equal(r.status, 403);
  });
});

describe("buildRelayFunction — generated Vercel worker has no string-concat SSRF hole", () => {
  it("does not append relayPath to target by string concatenation", () => {
    const worker = __buildRelayFunctionForTest("deadbeefcafe");
    assert.ok(
      !worker.includes("+ relayPath"),
      "Vercel worker must not contain `+ relayPath` string concatenation"
    );
    assert.ok(
      !/\.replace\(\s*\/\\?\/\$\/\s*,\s*["']{2}\s*\)\s*\+\s*relayPath/.test(worker),
      "Vercel worker must not append relayPath to target by string concatenation"
    );
  });

  it("embeds the resolveRelayTarget guard and fetches the resolved url", () => {
    const worker = __buildRelayFunctionForTest("deadbeefcafe");
    assert.ok(
      worker.includes("resolveRelayTarget"),
      "the Vercel worker must call the shared resolveRelayTarget guard"
    );
    assert.ok(
      worker.includes("resolved.url"),
      "the Vercel worker must fetch the SSRF-validated resolved url"
    );
  });

  it("still ships the edge runtime config marker", () => {
    const worker = __buildRelayFunctionForTest("deadbeefcafe");
    assert.ok(
      worker.includes('runtime: "edge"'),
      "the Vercel edge runtime config must be preserved"
    );
  });
});
