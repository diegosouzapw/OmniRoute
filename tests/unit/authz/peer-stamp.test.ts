// Direct unit tests for scripts/dev/peer-stamp.mjs::stampPeerIp.
//
// These tests assert the exact x-omniroute-peer-ip / x-omniroute-via-proxy
// headers the custom server stamps before forwarding the request to Next.js.
// They are intentionally standalone (mock IncomingMessage) so a bug in the
// cf-connecting-ip path can be reproduced by reverting the corresponding line
// in peer-stamp.mjs without relying on the rest of the authz pipeline.
import test from "node:test";
import assert from "node:assert/strict";

const peerStamp = await import("../../../scripts/dev/peer-stamp.mjs");
const {
  stampPeerIp,
  PEER_IP_HEADER,
  VIA_PROXY_HEADER,
  matchesIPv4Cidr,
  matchesIPv6Cidr,
  isCloudflareIP,
  isTrustedProxyPeer,
  resolveClientIp,
  CLIENT_IP_HEADER,
} = peerStamp;
const { isPrivateLanHost } = await import("../../../src/server/authz/routeGuard.ts");

const ORIGINAL_STAMP_TOKEN = process.env.OMNIROUTE_PEER_STAMP_TOKEN;
const ORIGINAL_TRUSTED_PROXIES = process.env.OMNIROUTE_TRUSTED_PROXIES;

function makeReq(remoteAddress: string, headers: Record<string, string> = {}) {
  return {
    headers: { ...headers },
    socket: { remoteAddress },
  };
}

function getPeerIp(req: ReturnType<typeof makeReq>) {
  return req.headers[PEER_IP_HEADER] ?? null;
}

function getViaProxy(req: ReturnType<typeof makeReq>) {
  return req.headers[VIA_PROXY_HEADER] ?? null;
}

test.after(() => {
  if (ORIGINAL_TRUSTED_PROXIES === undefined) delete process.env.OMNIROUTE_TRUSTED_PROXIES;
  else process.env.OMNIROUTE_TRUSTED_PROXIES = ORIGINAL_TRUSTED_PROXIES;
  if (ORIGINAL_STAMP_TOKEN === undefined) delete process.env.OMNIROUTE_PEER_STAMP_TOKEN;
  else process.env.OMNIROUTE_PEER_STAMP_TOKEN = ORIGINAL_STAMP_TOKEN;
});

test.beforeEach(() => {
  delete process.env.OMNIROUTE_TRUSTED_PROXIES;
  delete process.env.OMNIROUTE_PEER_STAMP_TOKEN;
  process.env.OMNIROUTE_PEER_STAMP_TOKEN = "stamp-tok";
});

test("stamps peer IP and via-proxy=0 for direct connection (no forwarding headers)", () => {
  const req = makeReq("203.0.113.99");
  stampPeerIp(req);

  assert.equal(
    getPeerIp(req),
    "stamp-tok|203.0.113.99",
    "peer-ip header must contain token|real-ip"
  );
  assert.equal(getViaProxy(req), "stamp-tok|0", "via-proxy must be 0 on direct connection");
});

test("stamps via-proxy=1 when x-forwarded-for is present", () => {
  const req = makeReq("127.0.0.1", { "x-forwarded-for": "203.0.113.99" });
  stampPeerIp(req);

  assert.equal(getPeerIp(req), "stamp-tok|127.0.0.1", "peer-ip must be the proxy hop");
  assert.equal(getViaProxy(req), "stamp-tok|1", "via-proxy must be 1 behind generic reverse proxy");
});

test("stamps via-proxy=1 when x-real-ip is present", () => {
  const req = makeReq("127.0.0.1", { "x-real-ip": "203.0.113.99" });
  stampPeerIp(req);

  assert.equal(getViaProxy(req), "stamp-tok|1", "via-proxy must be 1 when x-real-ip present");
});

test("Cloudflare: via-proxy=1 when cf-connecting-ip is present AND peer is a CF edge IP", () => {
  // 172.71.150.1 falls inside Cloudflare's 172.64.0.0/13 range.
  const req = makeReq("172.71.150.1", { "cf-connecting-ip": "203.0.113.99" });
  stampPeerIp(req);

  assert.equal(getPeerIp(req), "stamp-tok|172.71.150.1", "peer-ip must be the CF edge");
  assert.equal(getViaProxy(req), "stamp-tok|1", "via-proxy must be 1 behind Cloudflare");
});

test("Cloudflare bypass guard: direct forger sending cf-connecting-ip keeps via-proxy=0", () => {
  // A direct client can forge cf-connecting-ip, but its socket peer is not a
  // Cloudflare IP. The via-proxy marker must stay 0 so the middleware checks
  // the real peer IP instead of the forged header.
  const req = makeReq("203.0.113.7", { "cf-connecting-ip": "203.0.113.99" });
  stampPeerIp(req);

  assert.equal(getPeerIp(req), "stamp-tok|203.0.113.7", "peer-ip must stay the real direct IP");
  assert.equal(
    getViaProxy(req),
    "stamp-tok|0",
    "via-proxy must stay 0 when peer is not Cloudflare"
  );
});

test("x-forwarded-for from a public, non-proxy peer keeps via-proxy=0", () => {
  // Anyone can write x-forwarded-for, so from a peer that is neither this host, a private
  // network nor a Cloudflare edge it must not make the middleware trust the header over the peer.
  const req = makeReq("203.0.113.7", {
    "x-forwarded-for": "203.0.113.99",
    "x-real-ip": "203.0.113.99",
    "cf-connecting-ip": "198.51.100.1",
  });
  stampPeerIp(req);

  assert.equal(getPeerIp(req), "stamp-tok|203.0.113.7", "peer-ip must stay the real direct IP");
  assert.equal(getViaProxy(req), "stamp-tok|0", "forged forwarding headers must not set via-proxy");
});

test("x-forwarded-for from a private-network proxy sets via-proxy=1", () => {
  for (const peer of ["10.1.2.3", "172.18.0.2", "192.168.1.5", "100.64.0.9", "fd00::2"]) {
    const req = makeReq(peer, { "x-forwarded-for": "203.0.113.99" });
    stampPeerIp(req);
    assert.equal(getViaProxy(req), "stamp-tok|1", peer);
  }
});

test("x-forwarded-for from a Cloudflare edge sets via-proxy=1", () => {
  const req = makeReq("172.71.150.1", { "x-forwarded-for": "203.0.113.99" });
  stampPeerIp(req);
  assert.equal(getViaProxy(req), "stamp-tok|1");
});

test("F-05: non-Cloudflare proxy (x-forwarded-for only, no cf-connecting-ip) marks via-proxy=1", () => {
  const req = makeReq("127.0.0.1", { "x-forwarded-for": "203.0.113.99" });
  stampPeerIp(req);

  assert.equal(
    getViaProxy(req),
    "stamp-tok|1",
    "generic reverse proxy without cf-connecting-ip must set via-proxy=1"
  );
  assert.equal(
    getPeerIp(req),
    "stamp-tok|127.0.0.1",
    "peer-ip must still be the proxy hop for non-Cloudflare proxy"
  );
});

test("deletes any client-supplied peer/via-proxy headers before stamping", () => {
  const req = makeReq("203.0.113.99", {
    [PEER_IP_HEADER]: "forged|1.2.3.4",
    [VIA_PROXY_HEADER]: "forged|1",
  });
  stampPeerIp(req);

  assert.ok(
    !getPeerIp(req)?.startsWith("forged|"),
    "client-supplied peer-ip header must be overwritten"
  );
  assert.ok(
    !getViaProxy(req)?.startsWith("forged|"),
    "client-supplied via-proxy header must be overwritten"
  );
  assert.equal(getPeerIp(req), "stamp-tok|203.0.113.99");
});

test("IPv6 Cloudflare peer is recognized", () => {
  const req = makeReq("2400:cb00::1", { "cf-connecting-ip": "203.0.113.99" });
  stampPeerIp(req);

  assert.equal(getViaProxy(req), "stamp-tok|1", "IPv6 Cloudflare peer must set via-proxy=1");
});

test("IPv4-mapped peer address is normalized before CF check", () => {
  // 172.71.150.1 is a Cloudflare IPv4 address, sometimes surfaced as ::ffff:...
  const req = makeReq("::ffff:172.71.150.1", { "cf-connecting-ip": "203.0.113.99" });
  stampPeerIp(req);

  assert.equal(getViaProxy(req), "stamp-tok|1", "IPv4-mapped Cloudflare peer must set via-proxy=1");
});

test("F2-01: /0 IPv4 CIDR matches every address", () => {
  assert.equal(matchesIPv4Cidr("8.8.8.8", "0.0.0.0/0"), true, "/0 must match any IPv4 address");
  assert.equal(matchesIPv4Cidr("203.0.113.7", "0.0.0.0/0"), true, "/0 must match any IPv4 address");
});

test("F2-04: /0 IPv6 CIDR matches every address", () => {
  assert.equal(matchesIPv6Cidr("2400:cb00::1", "::/0"), true, "/0 must match any IPv6 address");
  assert.equal(matchesIPv6Cidr("::1", "::/0"), true, "/0 must match any IPv6 address");
});

test("F2-03: full-form IPv4-mapped address is normalized", () => {
  // 172.71.150.1 is inside Cloudflare's 172.64.0.0/13 range.
  assert.equal(
    isCloudflareIP("0:0:0:0:0:ffff:172.71.150.1"),
    true,
    "full-form IPv4-mapped Cloudflare address must be recognized"
  );
  assert.equal(
    isCloudflareIP("0:0:0:0:0:ffff:203.0.113.7"),
    false,
    "full-form IPv4-mapped non-Cloudflare address must not match"
  );
});

const getClient = (req: ReturnType<typeof makeReq>) => req.headers[CLIENT_IP_HEADER] ?? null;

test("the trusted-proxy address classes agree with the LAN classes the route guard uses", () => {
  const samples = [
    "10.0.0.1",
    "10.255.255.254",
    "100.64.0.1",
    "100.127.255.254",
    "100.63.255.255",
    "100.128.0.1",
    "172.15.255.255",
    "172.16.0.1",
    "172.31.255.254",
    "172.32.0.1",
    "192.167.1.1",
    "192.168.0.1",
    "fc00::1",
    "fd12:3456::1",
    "fe80::1",
    "fec0::1",
    "2001:db8::1",
    "8.8.8.8",
    "::ffff:10.1.2.3",
    "::ffff:8.8.8.8",
  ];
  for (const ip of samples) {
    const plain = ip.replace(/^::ffff:/i, "");
    // isTrustedProxyPeer also accepts loopback, Cloudflare and configured proxies, none of
    // which are in the samples, so for these it must equal the route guard's LAN verdict.
    assert.equal(isTrustedProxyPeer(ip), isPrivateLanHost(plain), ip);
  }
});

test("a proxy on an address the operator names is trusted, one that is not named is not", () => {
  const forwarded = { "x-forwarded-for": "203.0.113.99" };
  const unnamed = makeReq("198.51.100.7", forwarded);
  stampPeerIp(unnamed);
  assert.equal(getViaProxy(unnamed), "stamp-tok|0");
  assert.equal(getClient(unnamed), "stamp-tok|198.51.100.7");

  process.env.OMNIROUTE_TRUSTED_PROXIES =
    "192.0.2.1, 198.51.100.0/24 ,2001:db8::/32,not-an-ip,10.0.0.0/99";
  for (const peer of ["198.51.100.7", "2001:db8::42"]) {
    const req = makeReq(peer, forwarded);
    stampPeerIp(req);
    assert.equal(getViaProxy(req), "stamp-tok|1", peer);
    assert.equal(getClient(req), "stamp-tok|203.0.113.99", peer);
  }
  assert.equal(isTrustedProxyPeer("192.0.2.1"), true);
  assert.equal(isTrustedProxyPeer("192.0.2.2"), false);
  assert.equal(isTrustedProxyPeer("2001:db9::1"), false);
});

test("the client address stamp is the peer itself unless a trusted proxy fronts the request", () => {
  const direct = makeReq("203.0.113.9", {
    "x-forwarded-for": "203.0.113.10",
    "x-real-ip": "203.0.113.10",
  });
  stampPeerIp(direct);
  assert.equal(getClient(direct), "stamp-tok|203.0.113.9");

  const noHeaders = makeReq("::ffff:203.0.113.9");
  stampPeerIp(noHeaders);
  assert.equal(getClient(noHeaders), "stamp-tok|203.0.113.9");
});

test("a client-supplied client address header is replaced", () => {
  const req = makeReq("203.0.113.9", { [CLIENT_IP_HEADER]: "stamp-tok|203.0.113.10" });
  stampPeerIp(req);
  assert.equal(getClient(req), "stamp-tok|203.0.113.9");
});

test("behind a trusted proxy the client is the right-most forwarded address that is not a proxy", () => {
  // nginx appends the connecting address to whatever the client sent.
  assert.equal(
    resolveClientIp({ "x-forwarded-for": "203.0.113.10, 203.0.113.9" }, "127.0.0.1"),
    "203.0.113.9"
  );
  assert.equal(
    resolveClientIp({ "x-forwarded-for": "6.6.6.6, 203.0.113.9, 10.0.0.4" }, "172.18.0.2"),
    "203.0.113.9"
  );
  assert.equal(
    resolveClientIp({ "x-forwarded-for": "junk, 203.0.113.9" }, "127.0.0.1"),
    "203.0.113.9"
  );
  assert.equal(
    resolveClientIp({ "x-forwarded-for": "203.0.113.9:51234" }, "127.0.0.1"),
    "203.0.113.9"
  );
  assert.equal(
    resolveClientIp({ "x-forwarded-for": "[2001:db8::7]:443" }, "127.0.0.1"),
    "2001:db8::7"
  );
});

test("when every forwarded address is a proxy, the outermost one is the client", () => {
  assert.equal(resolveClientIp({ "x-forwarded-for": "10.1.1.5" }, "172.18.0.2"), "10.1.1.5");
  assert.equal(
    resolveClientIp({ "x-forwarded-for": "192.168.1.9, 10.0.0.2" }, "127.0.0.1"),
    "192.168.1.9"
  );
});

test("a forwarded header with nothing usable leaves the peer as the client", () => {
  for (const headers of [
    { "x-forwarded-for": "x" },
    { "x-forwarded-for": "unknown" },
    { "x-real-ip": "not-an-ip" },
    {},
  ]) {
    assert.equal(resolveClientIp(headers, "192.168.1.50"), "192.168.1.50", JSON.stringify(headers));
  }
});

test("x-real-ip is only read when there is no usable x-forwarded-for", () => {
  assert.equal(resolveClientIp({ "x-real-ip": "203.0.113.9" }, "127.0.0.1"), "203.0.113.9");
  assert.equal(
    resolveClientIp({ "x-real-ip": "6.6.6.6", "x-forwarded-for": "203.0.113.9" }, "127.0.0.1"),
    "203.0.113.9"
  );
});

test("cf-connecting-ip is believed only from a Cloudflare edge", () => {
  assert.equal(
    resolveClientIp({ "cf-connecting-ip": "203.0.113.9" }, "172.71.150.1"),
    "203.0.113.9"
  );
  assert.equal(
    resolveClientIp(
      { "cf-connecting-ip": "6.6.6.6", "x-forwarded-for": "203.0.113.9" },
      "127.0.0.1"
    ),
    "203.0.113.9"
  );
  assert.equal(resolveClientIp({ "cf-connecting-ip": "6.6.6.6" }, "127.0.0.1"), "127.0.0.1");
});
