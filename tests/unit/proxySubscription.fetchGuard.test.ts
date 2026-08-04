import test from "node:test";
import assert from "node:assert/strict";

const mod = await import("../../src/lib/proxySubscription/fetchGuard.ts");
const {
  isSubscriptionFetchUrlAllowed,
  isIpv4Blocked,
  isIpv6Blocked,
  isIpLiteral,
  isAnyResolvedAddressBlocked,
  ALLOWED_FETCH_SCHEMES,
} = mod;

test("public http/https URLs are allowed", () => {
  assert.equal(isSubscriptionFetchUrlAllowed("https://example.com/sub"), true);
  assert.equal(isSubscriptionFetchUrlAllowed("http://subs.example.org:8080/a"), true);
  assert.equal(isSubscriptionFetchUrlAllowed("https://1.2.3.4/sub"), true); // public IP
});

test("non-http(s) schemes are rejected", () => {
  assert.equal(isSubscriptionFetchUrlAllowed("ftp://example.com/x"), false);
  assert.equal(isSubscriptionFetchUrlAllowed("file:///etc/passwd"), false);
  assert.equal(isSubscriptionFetchUrlAllowed("gopher://example.com"), false);
});

test("blocked IPv4 literals are rejected", () => {
  for (const ip of ["127.0.0.1", "10.0.0.5", "172.16.0.1", "192.168.1.1", "169.254.169.254", "0.0.0.0"]) {
    assert.equal(isSubscriptionFetchUrlAllowed(`https://${ip}/x`), false, ip);
  }
});

test("public IPv4 literals are allowed", () => {
  assert.equal(isSubscriptionFetchUrlAllowed("https://8.8.8.8/x"), true);
  assert.equal(isSubscriptionFetchUrlAllowed("http://1.1.1.1/"), true);
});

test("blocked IPv6 literals are rejected (bracketed)", () => {
  for (const ip of ["::1", "::", "fe80::1", "fc00::1", "fd12:3456::1"]) {
    assert.equal(isSubscriptionFetchUrlAllowed(`https://[${ip}]/x`), false, ip);
  }
});

test("malformed / empty-host URLs are rejected", () => {
  assert.equal(isSubscriptionFetchUrlAllowed("not a url"), false);
  assert.equal(isSubscriptionFetchUrlAllowed(""), false);
  assert.equal(isSubscriptionFetchUrlAllowed("http://?x"), false); // empty host
});

test("ip-range + literal helpers", () => {
  assert.equal(isIpv4Blocked("127.0.0.1"), true);
  assert.equal(isIpv4Blocked("169.254.169.254"), true);
  assert.equal(isIpv4Blocked("8.8.8.8"), false);
  assert.equal(isIpv6Blocked("::1"), true);
  assert.equal(isIpv6Blocked("2606:4700::1111"), false);
  assert.equal(isIpLiteral("127.0.0.1"), true);
  assert.equal(isIpLiteral("::1"), true);
  assert.equal(isIpLiteral("example.com"), false);
  assert.deepEqual([...ALLOWED_FETCH_SCHEMES], ["http:", "https:"]);
});

test("multi-record DNS: blocks if ANY resolved address is internal", () => {
  // Hostname resolves to a public AND a private address — must be refused
  // (closes the first-address-only bypass).
  assert.equal(
    isAnyResolvedAddressBlocked([
      { address: "8.8.8.8", family: 4 },
      { address: "192.168.1.10", family: 4 },
    ]),
    true
  );
  // All public → allowed.
  assert.equal(
    isAnyResolvedAddressBlocked([
      { address: "8.8.8.8", family: 4 },
      { address: "1.1.1.1", family: 4 },
    ]),
    false
  );
  // A single internal IPv6 among public records → blocked.
  assert.equal(
    isAnyResolvedAddressBlocked([
      { address: "2606:4700::1111", family: 6 },
      { address: "fd00::1", family: 6 },
    ]),
    true
  );
  // Empty result set → nothing blocked.
  assert.equal(isAnyResolvedAddressBlocked([]), false);
});
