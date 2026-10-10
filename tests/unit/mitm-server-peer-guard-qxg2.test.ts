/**
 * GHSA-qxg2-rm3h-4cxp (finding 1): `src/mitm/server.cjs` listened with no host
 * argument, so the MITM proxy accepted connections from every interface. A LAN
 * peer could reach `intercept()` (free inference billed through the operator's
 * ROUTER_API_KEY) or `passthrough()` (an open TLS relay).
 *
 * The listener stays dual-stack because the DNS spoof writes BOTH
 * `127.0.0.1 <host>` and `::1 <host>` (src/mitm/dns/dnsConfig.ts), so binding
 * to 127.0.0.1 alone would break clients that resolve ::1 first. Instead every
 * accepted socket goes through a loopback peer guard.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const {
  isLoopbackPeer,
  allowRemoteClients,
  guardLoopbackPeer,
} = require("../../src/mitm/_internal/peerGuard.cjs");

const here = path.dirname(fileURLToPath(import.meta.url));
const serverSource = fs.readFileSync(path.join(here, "../../src/mitm/server.cjs"), "utf8");

test("isLoopbackPeer accepts IPv4/IPv6 loopback and IPv4-mapped loopback", () => {
  for (const addr of ["127.0.0.1", "127.8.9.10", "::1", "::ffff:127.0.0.1"]) {
    assert.equal(isLoopbackPeer(addr), true, addr);
  }
});

test("isLoopbackPeer rejects LAN, public, mapped non-loopback and missing addresses", () => {
  for (const addr of [
    "192.168.0.20",
    "10.0.0.5",
    "8.8.8.8",
    "::ffff:192.168.0.20",
    "fe80::1",
    "2001:db8::1",
    "0.0.0.0",
    "::",
    "",
    undefined,
    null,
  ]) {
    assert.equal(isLoopbackPeer(addr), false, String(addr));
  }
});

test("allowRemoteClients is opt-in and only for an explicit truthy value", () => {
  assert.equal(allowRemoteClients({}), false);
  assert.equal(allowRemoteClients({ MITM_ALLOW_REMOTE_CLIENTS: "0" }), false);
  assert.equal(allowRemoteClients({ MITM_ALLOW_REMOTE_CLIENTS: "false" }), false);
  assert.equal(allowRemoteClients({ MITM_ALLOW_REMOTE_CLIENTS: "1" }), true);
  assert.equal(allowRemoteClients({ MITM_ALLOW_REMOTE_CLIENTS: "true" }), true);
});

function fakeSocket(remoteAddress: string) {
  return {
    remoteAddress,
    destroyed: false,
    destroy() {
      this.destroyed = true;
    },
  };
}

test("guardLoopbackPeer destroys a non-loopback socket and keeps a loopback one", () => {
  const lan = fakeSocket("192.168.0.20");
  assert.equal(guardLoopbackPeer(lan, {}), false);
  assert.equal(lan.destroyed, true);

  const local = fakeSocket("::ffff:127.0.0.1");
  assert.equal(guardLoopbackPeer(local, {}), true);
  assert.equal(local.destroyed, false);
});

test("guardLoopbackPeer lets a remote peer through only with the explicit opt-in", () => {
  const lan = fakeSocket("192.168.0.20");
  assert.equal(guardLoopbackPeer(lan, { MITM_ALLOW_REMOTE_CLIENTS: "1" }), true);
  assert.equal(lan.destroyed, false);
});

test("server.cjs installs the peer guard ahead of every other connection listener", () => {
  assert.match(serverSource, /require\("\.\/_internal\/peerGuard\.cjs"\)/);
  assert.match(
    serverSource,
    /server\.prependListener\("connection"/,
    "the guard must run before the stats/idle-timeout connection listener"
  );
});
