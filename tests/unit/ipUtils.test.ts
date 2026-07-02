import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { extractClientIp, getClientIpFromRequest } from "@/lib/ipUtils";

/**
 * Regression tests for IP detection — ported from decolua/9router#1893.
 *
 * When OmniRoute runs behind a local reverse proxy (nginx etc.) the TCP peer
 * is loopback (127.0.0.1 / ::1) and forwarding headers (X-Forwarded-For,
 * X-Real-IP, CF-Connecting-IP) carry the real client IP. When the request
 * arrives directly from the public internet, the TCP peer IS the client and
 * forwarding headers are spoofable — keying brute-force buckets by them lets
 * one attacker either lock everyone else out or evade the lockout entirely.
 */

function makeReq(headers: Record<string, string>, remoteAddress?: string) {
  return {
    headers: new Headers(headers),
    socket: remoteAddress ? { remoteAddress } : undefined,
  };
}

describe("ipUtils — loopback-gated forwarding headers", () => {
  it("trusts X-Forwarded-For when TCP peer is 127.0.0.1 loopback", () => {
    const req = makeReq({ "x-forwarded-for": "203.0.113.10" }, "127.0.0.1");
    assert.equal(getClientIpFromRequest(req), "203.0.113.10");
  });

  it("trusts X-Forwarded-For when TCP peer is ::1 loopback", () => {
    const req = makeReq({ "x-forwarded-for": "203.0.113.11" }, "::1");
    assert.equal(getClientIpFromRequest(req), "203.0.113.11");
  });

  it("trusts X-Real-IP when TCP peer is loopback", () => {
    const req = makeReq({ "x-real-ip": "203.0.113.12" }, "127.0.0.1");
    assert.equal(getClientIpFromRequest(req), "203.0.113.12");
  });

  it("trusts CF-Connecting-IP when TCP peer is loopback", () => {
    const req = makeReq({ "cf-connecting-ip": "203.0.113.13" }, "127.0.0.1");
    assert.equal(getClientIpFromRequest(req), "203.0.113.13");
  });

  it("ignores spoofed X-Forwarded-For when TCP peer is a public address", () => {
    // Direct public client trying to spoof another IP — must be ignored so
    // the brute-force guard keys by the unspoofable TCP peer.
    const req = makeReq({ "x-forwarded-for": "203.0.113.99" }, "198.51.100.5");
    assert.equal(getClientIpFromRequest(req), "198.51.100.5");
  });

  it("ignores spoofed CF-Connecting-IP when TCP peer is a public address", () => {
    const req = makeReq({ "cf-connecting-ip": "203.0.113.88" }, "198.51.100.7");
    assert.equal(getClientIpFromRequest(req), "198.51.100.7");
  });

  it("falls back to forwarding headers when no socket peer is known", () => {
    // Edge runtime / fetch path where req.socket is absent — preserve prior
    // behavior, otherwise we'd lose all IPs in that path.
    const req = makeReq({ "x-forwarded-for": "203.0.113.20" });
    assert.equal(getClientIpFromRequest(req), "203.0.113.20");
  });

  it("returns loopback peer when no forwarding headers are present", () => {
    const req = makeReq({}, "127.0.0.1");
    assert.equal(getClientIpFromRequest(req), "127.0.0.1");
  });

  it("extractClientIp (lower-level) keeps prior contract", () => {
    // Lower-level helper does NOT know the peer — preserve prior behavior.
    assert.equal(extractClientIp("203.0.113.1, 10.0.0.1", "127.0.0.1"), "203.0.113.1");
    assert.equal(extractClientIp(null, "198.51.100.1"), "198.51.100.1");
    assert.equal(extractClientIp("unknown, 203.0.113.2", "10.0.0.1"), "203.0.113.2");
  });
});
