// SSRF regression guard for the Cloudflare relay worker — the third worker,
// which missed the PR #4643 relay-path fix that the Deno and Vercel workers
// already carry.
//
// The generated Worker read the attacker-controlled `x-relay-path` header and
// appended it to the (validated) `x-relay-target` origin by string
// concatenation: `fetch(targetBase + relayPath)`. Validating the target and
// then concatenating is not enough — the path can re-point the request past the
// host that was checked, via userinfo (`/x@evil.com`), a backslash
// (`\evil.com`), or a protocol-relative path (`//evil.com/x`).
//
// The fix reuses the SAME pure `resolveRelayTarget()` guard the other two
// workers embed. This mirrors `vercel-deploy-relay-path-ssrf.test.ts`: the pure
// function's own behaviour is covered once in the deno test, so here the focus
// is the Cloudflare worker's wiring — plus the #6149 name-stability property,
// which a bare `function` declaration would silently lose under minification.
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import vm from "node:vm";
import { resolveRelayTarget } from "../../src/app/api/settings/proxy/deno-deploy/route";
import { buildCloudflareWorkerScript } from "../../src/lib/proxyRelay/cloudflareWorkerScript";

const RELAY_AUTH = "deadbeefcafe";

describe("cloudflare relay worker — no string-concat SSRF hole", () => {
  it("does not append relayPath to the target by string concatenation", () => {
    const worker = buildCloudflareWorkerScript(RELAY_AUTH);
    assert.ok(
      !worker.includes("+ relayPath"),
      "Cloudflare worker must not contain `+ relayPath` string concatenation"
    );
    assert.ok(!worker.includes("targetBase"), "the concatenated targetBase form must be gone");
  });

  it("embeds the shared guard and fetches the resolved url", () => {
    const worker = buildCloudflareWorkerScript(RELAY_AUTH);
    assert.ok(
      worker.includes("resolveRelayTarget"),
      "the Cloudflare worker must call the shared resolveRelayTarget guard"
    );
    assert.ok(
      worker.includes("resolved.url"),
      "the Cloudflare worker must fetch the SSRF-validated resolved url"
    );
  });

  it("keeps the auth check and the private-host guard", () => {
    const worker = buildCloudflareWorkerScript(RELAY_AUTH);
    assert.ok(worker.includes(RELAY_AUTH), "relayAuth secret must still be embedded");
    assert.ok(
      worker.includes("isPrivateHostname"),
      "the private/loopback target guard must be preserved"
    );
  });

  // #6149: the guard is embedded via Function#toString, so a bare `function`
  // declaration would emit the MANGLED name on a minified standalone build
  // while the template still calls the literal `resolveRelayTarget`.
  it("binds the guard to a literal const name so minification cannot break the call", () => {
    const worker = buildCloudflareWorkerScript(RELAY_AUTH);
    assert.ok(
      /const\s+resolveRelayTarget\s*=/.test(worker),
      "the guard must be bound to a literal `const resolveRelayTarget =` name"
    );

    // Simulate the minifier by renaming ONLY the embedded function's own
    // declared name, then check the binding still resolves.
    const emitted = resolveRelayTarget.toString();
    const mangled = emitted.replace("resolveRelayTarget", "a");
    const minifiedWorker = worker.replace(emitted, mangled);
    // Evaluate ONLY the binding, located by its own literal name. Slicing the
    // worker at some other declaration would tie this test to unrelated parts
    // of the emitted source still being present.
    const binding = minifiedWorker.match(/const resolveRelayTarget = [\s\S]*?;\s/);
    assert.ok(binding, "the emitted worker must contain the const binding");
    const context: Record<string, unknown> = {};
    vm.createContext(context);
    vm.runInContext(`${binding[0]} globalThis.__resolve = resolveRelayTarget;`, context);
    const resolveFn = (context as { __resolve?: typeof resolveRelayTarget }).__resolve;
    assert.equal(typeof resolveFn, "function", "guard must still be reachable after mangling");
  });
});

describe("cloudflare relay worker — host-confusion vectors are rejected", () => {
  const TARGET = "https://api.anthropic.com";

  it("accepts a legitimate absolute path", () => {
    const r = resolveRelayTarget(TARGET, "/v1/messages");
    assert.equal(r.ok, true);
    if (r.ok) assert.equal(r.url, "https://api.anthropic.com/v1/messages");
  });

  for (const [label, path] of [
    ["//evil.com/x (host swap)", "//evil.com/x"],
    ["/x@evil.com (userinfo)", "/x@evil.com"],
    ["\\evil.com (backslash)", "\\evil.com"],
    ["evil.com/x (no leading slash)", "evil.com/x"],
  ] as const) {
    it(`rejects ${label}`, () => {
      const r = resolveRelayTarget(TARGET, path);
      assert.equal(r.ok, false);
      if (!r.ok) assert.equal(r.status, 403);
    });
  }
});
