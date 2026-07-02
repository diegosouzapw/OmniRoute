import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  isPrivateLanHost,
  isLoopbackHost,
  isLocalOnlyPath,
  classifyHostLocality,
} from "../../src/server/authz/routeGuard.ts";
import { resolveStampedPeer } from "../../src/server/authz/peerStamp.ts";

test("isPrivateLanHost: accepts RFC1918 IPv4 (incl. :port and ::ffff: mapped)", () => {
  for (const h of [
    "192.168.0.15",
    "192.168.0.15:54321",
    "10.0.0.5",
    "172.16.0.9",
    "172.31.255.254",
    "::ffff:192.168.1.20",
  ]) {
    assert.equal(isPrivateLanHost(h), true, `expected private-LAN: ${h}`);
  }
});

test("isPrivateLanHost: accepts Tailscale CGNAT IPv4 range", () => {
  for (const h of [
    "100.64.0.1",
    "100.96.135.160",
    "100.127.255.254",
    "100.96.135.160:20128",
    "::ffff:100.96.135.160",
  ]) {
    assert.equal(isPrivateLanHost(h), true, `expected Tailscale LAN: ${h}`);
  }
});

test("isPrivateLanHost: accepts IPv6 ULA / link-local", () => {
  assert.equal(isPrivateLanHost("fd12:3456::1"), true);
  assert.equal(isPrivateLanHost("fe80::1"), true);
});

test("isPrivateLanHost: rejects public IPs, loopback and junk", () => {
  for (const h of [
    "8.8.8.8",
    "69.164.221.35", // public VPS
    "100.63.255.255", // just outside Tailscale 100.64/10
    "100.128.0.1", // just outside Tailscale 100.64/10
    "172.32.0.1", // just outside 172.16/12
    "127.0.0.1",
    "::1",
    "example.com",
    "",
    null,
  ]) {
    assert.equal(isPrivateLanHost(h), false, `expected NOT private-LAN: ${h}`);
  }
});

test("isLoopbackHost: IPv4, hostname:port, bracketed + bare IPv6, ::ffff: mapped", () => {
  assert.equal(isLoopbackHost("127.0.0.1"), true);
  assert.equal(isLoopbackHost("localhost:20128"), true);
  // Bare IPv6 loopback forms that socket.remoteAddress produces on dual-stack
  // (regression: split(":")[0] previously mangled these to "" → false → DoS).
  assert.equal(isLoopbackHost("::1"), true);
  assert.equal(isLoopbackHost("::ffff:127.0.0.1"), true);
  assert.equal(isLoopbackHost("[::1]:20128"), true);
  assert.equal(isLoopbackHost("192.168.0.15"), false);
  assert.equal(isLoopbackHost("8.8.8.8"), false);
});

test("classifyHostLocality: loopback / lan / remote, with fail-closed null", () => {
  assert.equal(classifyHostLocality("127.0.0.1"), "loopback");
  assert.equal(classifyHostLocality("::1"), "loopback");
  assert.equal(classifyHostLocality("::ffff:127.0.0.1"), "loopback");
  assert.equal(classifyHostLocality("192.168.0.15"), "lan");
  assert.equal(classifyHostLocality("::ffff:192.168.1.20"), "lan");
  assert.equal(classifyHostLocality("8.8.8.8"), "remote");
  assert.equal(classifyHostLocality("69.164.221.35"), "remote");
  assert.equal(classifyHostLocality(null), "remote", "unknown peer must fail closed");
});

test("services + traffic-inspector remain LOCAL_ONLY paths", () => {
  assert.equal(isLocalOnlyPath("/api/services/9router/status"), true);
  assert.equal(isLocalOnlyPath("/api/tools/traffic-inspector/sessions"), true);
});

test("management policy must NOT derive locality from the spoofable Host header", () => {
  const src = readFileSync(
    join(import.meta.dirname, "../../src/server/authz/policies/management.ts"),
    "utf8"
  );
  // Regression guard: a prior fix read the client-controlled Host header for the
  // LOCAL_ONLY decision, letting `Host: 127.0.0.1` bypass the gate. Locality must
  // come from the token-stamped peer IP instead.
  assert.ok(
    !src.includes('get?.("host")') && !src.includes('get("host")'),
    "requestPeerAddress must NOT read the Host header"
  );
  assert.ok(
    src.includes("resolveStampedPeer") && src.includes("PEER_IP_HEADER"),
    "requestPeerAddress must resolve the trusted token-stamped peer IP"
  );
});

// ── resolveStampedPeer: the auth boundary that replaces Host-header trust ──
const TOK = "process-secret-token-abc";

test("resolveStampedPeer: returns the IP only for a correctly-tokened stamp", () => {
  assert.equal(resolveStampedPeer(`${TOK}|127.0.0.1`, TOK), "127.0.0.1");
  assert.equal(resolveStampedPeer(`${TOK}|192.168.0.15`, TOK), "192.168.0.15");
  assert.equal(resolveStampedPeer(`${TOK}|::1`, TOK), "::1");
  assert.equal(resolveStampedPeer(`${TOK}|::ffff:192.168.1.20`, TOK), "::ffff:192.168.1.20");
});

test("resolveStampedPeer: rejects forged token, missing token, no separator, empty ip", () => {
  assert.equal(resolveStampedPeer("wrong-token|127.0.0.1", TOK), null, "forged token");
  assert.equal(resolveStampedPeer(`${TOK}|127.0.0.1`, undefined), null, "no process token");
  assert.equal(resolveStampedPeer("127.0.0.1", TOK), null, "no separator (raw client value)");
  assert.equal(resolveStampedPeer(`${TOK}|`, TOK), null, "empty ip");
  assert.equal(resolveStampedPeer("|127.0.0.1", TOK), null, "empty token segment");
  assert.equal(resolveStampedPeer(null, TOK), null, "absent header");
  assert.equal(resolveStampedPeer("", TOK), null, "empty header");
});

test("resolveStampedPeer: a spoofed Host-style value cannot pass without the token", () => {
  // Simulates a remote attacker who knows the header name but not the secret.
  assert.equal(resolveStampedPeer("127.0.0.1|127.0.0.1", TOK), null);
  assert.equal(resolveStampedPeer("anything|127.0.0.1", TOK), null);
});
