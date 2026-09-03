import test from "node:test";
import assert from "node:assert/strict";
import { isIP } from "node:net";
import { fileURLToPath } from "node:url";

import { build } from "esbuild";

import { ipVersion, isPrivateHost } from "../../../src/shared/network/privateHost.ts";

// #11122 — that PR pointed `isLocalProvider()` at `isPrivateHost`, imported from
// `outboundUrlGuard.ts` (which imports `node:net`). `open-sse/config/providerRegistry.ts` is in
// the `ProviderDetailPageClient.tsx` graph, so the browser bundle broke and
// media-page-client-browser-bundle.test.ts went red on release/v3.8.50. `isPrivateHost` moved
// here to fix it; two things must hold for that move to be safe:
//   1. `ipVersion` agrees with `node:net#isIP` on every input — a NARROWER match would classify
//      a private address as public and open the egress the guard exists to close.
//   2. The module stays bundleable for the browser (no `node:*`, no `@/` alias).

const REPO_ROOT = fileURLToPath(new URL("../../..", import.meta.url));

const LITERALS = [
  // IPv4 — valid
  "0.0.0.0",
  "127.0.0.1",
  "10.0.0.1",
  "100.64.0.1",
  "169.254.169.254",
  "172.16.0.1",
  "172.31.255.254",
  "192.168.1.50",
  "8.8.8.8",
  "255.255.255.255",
  // IPv4 — invalid spellings node rejects
  "010.1.1.1",
  "1.2.3.4.5",
  "1.2.3",
  "256.1.1.1",
  "1.2.3.-1",
  "1.2.3.4 ",
  " 1.2.3.4",
  "1.2.3.04",
  // IPv6 — valid
  "::",
  "::1",
  "fd00::1",
  "fe80::1",
  "fc00::abcd",
  "2001:db8::1",
  "2001:0db8:0000:0000:0000:0000:0000:0001",
  "::ffff:192.168.1.1",
  "::ffff:a9fe:a9fe",
  "64:ff9b::8.8.8.8",
  "fe80::1%eth0",
  "fe80::1%25",
  // IPv6 — invalid
  ":::",
  "2001:db8::1::2",
  "fe80::1%",
  "gggg::1",
  "2001:db8:::1",
  // not IP literals at all
  "",
  "localhost",
  "studio.local",
  "api.openai.com",
  "0x7f.1",
  "2130706433",
  "..",
  "999",
];

test("ipVersion matches node:net#isIP across IP literals and near-misses", () => {
  for (const host of LITERALS) {
    assert.equal(
      ipVersion(host),
      isIP(host),
      `ipVersion disagreed with isIP for ${JSON.stringify(host)}`
    );
  }
});

test("ipVersion matches node:net#isIP across generated IPv4 permutations", () => {
  const segments = ["0", "00", "01", "9", "10", "099", "127", "192", "255", "256", "300", ""];
  for (const a of segments) {
    for (const b of segments) {
      const host = `${a}.${b}.${a}.${b}`;
      assert.equal(ipVersion(host), isIP(host), `ipVersion disagreed with isIP for ${host}`);
    }
  }
});

test("ipVersion matches node:net#isIP across generated IPv6 permutations", () => {
  const groups = ["", "0", "1", "abcd", "ffff", "fffff", "xyz"];
  for (const g of groups) {
    for (const host of [`${g}::1`, `::${g}`, `${g}:${g}::${g}`, `2001:db8::${g}`, `[${g}::1]`]) {
      assert.equal(ipVersion(host), isIP(host), `ipVersion disagreed with isIP for ${host}`);
    }
  }
});

test("an over-long input is rejected rather than fed to the alternation", () => {
  // The length guard is the ReDoS bound (AGENTS.md → "Regex Security"). Node agrees: no legal
  // literal is this long, so the fast path costs no accuracy.
  const long = `${"f".repeat(200)}::1`;
  assert.equal(ipVersion(long), 0);
  assert.equal(isIP(long), 0);
});

test("isPrivateHost keeps its verdicts after the move", () => {
  for (const host of ["", "localhost", "127.0.0.1", "::1", "[::1]", "10.1.2.3", "192.168.0.15"]) {
    assert.equal(isPrivateHost(host), true, `expected private: ${JSON.stringify(host)}`);
  }
  for (const host of ["api.openai.com", "8.8.8.8", "172.32.0.1", "2001:db8::1"]) {
    assert.equal(isPrivateHost(host), false, `expected public: ${host}`);
  }
});

test("privateHost stays browser-bundle safe", async () => {
  // The direct guard for the regression: providerRegistry -> privateHost is in the
  // ProviderDetailPageClient graph, so a `node:*` import here breaks the dashboard build.
  await assert.doesNotReject(
    build({
      absWorkingDir: REPO_ROOT,
      entryPoints: [
        fileURLToPath(new URL("../../../src/shared/network/privateHost.ts", import.meta.url)),
      ],
      bundle: true,
      format: "esm",
      logLevel: "silent",
      platform: "browser",
      tsconfig: "tsconfig.json",
      write: false,
    })
  );
});
