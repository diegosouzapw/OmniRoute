// The private/loopback guard the three relay workers embed had four gaps, and
// because the policy was inlined as a byte-identical copy in each generator,
// every gap existed three times.
//
// Measured against the pre-fix guard, driving `new URL(target).hostname` the way
// the workers do:
//
//   ::               -> [::]            allowed   (unspecified; reaches ::1)
//   localhost.       -> localhost.      allowed   (FQDN root dot defeats every
//                                                  exact AND suffix test)
//   ::127.0.0.1      -> [::7f00:1]      allowed   (IPv4-compatible ::/96)
//   feb0::1          -> [feb0::1]       allowed   (fe80::/10 spans fe80-febf)
//
// The policy now lives once in `src/lib/proxyRelay/privateHostname.ts` and is
// embedded verbatim, the same way `resolveRelayTarget` already is.
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import vm from "node:vm";
import { isPrivateRelayHostname } from "../../src/lib/proxyRelay/privateHostname";
import { buildCloudflareWorkerScript } from "../../src/lib/proxyRelay/cloudflareWorkerScript";
import { __buildRelayWorkerForTest } from "../../src/app/api/settings/proxy/deno-deploy/route";
import { __buildRelayFunctionForTest } from "../../src/app/api/settings/proxy/vercel-deploy/route";

/** What the workers actually pass in: `new URL(...).hostname`, brackets included. */
function asUrlHostname(host: string): string {
  const bracketed = host.includes(":") ? `[${host}]` : host;
  return new URL(`http://${bracketed}/`).hostname;
}

describe("relay private-host guard — the four gaps", () => {
  for (const host of ["::", "localhost.", "::127.0.0.1", "feb0::1"]) {
    it(`blocks ${host}`, () => {
      assert.equal(isPrivateRelayHostname(asUrlHostname(host)), true);
    });
  }

  it("blocks a trailing-dot form of every suffix rule", () => {
    // The root dot used to defeat .localhost / .local / .internal as well.
    for (const host of ["app.localhost.", "printer.local.", "svc.internal."]) {
      assert.equal(isPrivateRelayHostname(host), true, host);
    }
  });
});

describe("relay private-host guard — previously-correct behaviour is unchanged", () => {
  for (const host of [
    "localhost",
    "0.0.0.0",
    "127.0.0.1",
    "::1",
    "::ffff:127.0.0.1",
    "10.0.0.1",
    "192.168.1.1",
    "172.16.0.1",
    "169.254.169.254",
    "100.100.100.200",
    "fd00::1",
    "fe80::1",
    "app.localhost",
    "printer.local",
    "svc.internal",
  ]) {
    it(`still blocks ${host}`, () => {
      assert.equal(isPrivateRelayHostname(asUrlHostname(host)), true);
    });
  }

  for (const host of ["example.com", "api.anthropic.com", "8.8.8.8", "2606:4700::1111"]) {
    it(`still allows ${host}`, () => {
      assert.equal(isPrivateRelayHostname(asUrlHostname(host)), false);
    });
  }

  it("blocks an empty or whitespace host", () => {
    assert.equal(isPrivateRelayHostname(""), true);
    assert.equal(isPrivateRelayHostname("   "), true);
  });

  it("does not treat a public host as private just because it ends in a dot", () => {
    assert.equal(isPrivateRelayHostname("example.com."), false);
  });
});

describe("all three workers embed the shared guard, not their own copy", () => {
  const workers: Array<[string, string]> = [
    ["cloudflare", buildCloudflareWorkerScript("deadbeefcafe")],
    ["deno", __buildRelayWorkerForTest("deadbeefcafe")],
    ["vercel", __buildRelayFunctionForTest("deadbeefcafe")],
  ];

  for (const [name, worker] of workers) {
    it(`${name}: no inlined function declaration remains`, () => {
      assert.ok(
        !worker.includes("function isPrivateHostname(h)"),
        `${name} worker must not re-declare the guard inline`
      );
    });

    it(`${name}: binds the guard to a literal const name (#6149)`, () => {
      assert.ok(
        /const\s+isPrivateHostname\s*=/.test(worker),
        `${name} worker must bind the embedded guard to a stable name`
      );
    });

    it(`${name}: the embedded guard still closes the gaps`, () => {
      // node:vm, not new Function — Hard Rule #3 bans the Function constructor,
      // and relay-minified-fn-6149.test.ts already evaluates emitted worker
      // source this way.
      const binding = worker.match(/const isPrivateHostname = [\s\S]*?;\s/);
      assert.ok(binding, `${name}: embedded guard binding not found`);
      const context: Record<string, unknown> = {};
      vm.createContext(context);
      vm.runInContext(`${binding[0]} globalThis.__guard = isPrivateHostname;`, context);
      const embedded = (context as { __guard?: (h: string) => boolean }).__guard;
      assert.equal(typeof embedded, "function", `${name}: guard must be reachable`);
      if (!embedded) return;
      assert.equal(embedded("::"), true);
      assert.equal(embedded("localhost."), true);
      assert.equal(embedded("::7f00:1"), true);
      assert.equal(embedded("feb0::1"), true);
      assert.equal(embedded("example.com"), false);
    });
  }
});
