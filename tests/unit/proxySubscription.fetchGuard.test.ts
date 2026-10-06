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

test("local-first (#10158): loopback/private IPv4 literals are ALLOWED by default", () => {
  for (const ip of ["127.0.0.1", "10.0.0.5", "172.16.0.1", "192.168.1.1"]) {
    assert.equal(isSubscriptionFetchUrlAllowed(`https://${ip}/x`), true, ip);
  }
});

test("cloud-metadata / link-local / unspecified IPv4 literals are ALWAYS blocked", () => {
  for (const ip of ["169.254.169.254", "169.254.1.1", "0.0.0.0"]) {
    assert.equal(isSubscriptionFetchUrlAllowed(`https://${ip}/x`), false, ip);
  }
});

test("strict mode (allowLocal: false) rejects loopback/private IPv4 literals", () => {
  for (const ip of ["127.0.0.1", "10.0.0.5", "172.16.0.1", "192.168.1.1", "169.254.169.254", "0.0.0.0"]) {
    assert.equal(
      isSubscriptionFetchUrlAllowed(`https://${ip}/x`, { allowLocal: false }),
      false,
      ip
    );
  }
});

test("public IPv4 literals are allowed", () => {
  assert.equal(isSubscriptionFetchUrlAllowed("https://8.8.8.8/x"), true);
  assert.equal(isSubscriptionFetchUrlAllowed("http://1.1.1.1/"), true);
});

test("local-first (#10158): loopback/ULA IPv6 literals are ALLOWED by default", () => {
  for (const ip of ["::1", "fc00::1", "fd12:3456::1"]) {
    assert.equal(isSubscriptionFetchUrlAllowed(`https://[${ip}]/x`), true, ip);
  }
});

test("unspecified / link-local IPv6 literals are ALWAYS blocked", () => {
  for (const ip of ["::", "fe80::1"]) {
    assert.equal(isSubscriptionFetchUrlAllowed(`https://[${ip}]/x`), false, ip);
  }
});

test("strict mode (allowLocal: false) rejects loopback/ULA IPv6 literals", () => {
  for (const ip of ["::1", "::", "fe80::1", "fc00::1", "fd12:3456::1"]) {
    assert.equal(
      isSubscriptionFetchUrlAllowed(`https://[${ip}]/x`, { allowLocal: false }),
      false,
      ip
    );
  }
});

test("malformed / empty-host URLs are rejected", () => {
  assert.equal(isSubscriptionFetchUrlAllowed("not a url"), false);
  assert.equal(isSubscriptionFetchUrlAllowed(""), false);
  assert.equal(isSubscriptionFetchUrlAllowed("http://?x"), false); // empty host
});

test("ip-range + literal helpers (local-first defaults)", () => {
  assert.equal(isIpv4Blocked("127.0.0.1"), false); // allowed by default (local-first)
  assert.equal(isIpv4Blocked("127.0.0.1", { allowLocal: false }), true);
  assert.equal(isIpv4Blocked("169.254.169.254"), true); // always blocked
  assert.equal(isIpv4Blocked("8.8.8.8"), false);
  assert.equal(isIpv6Blocked("::1"), false); // allowed by default (local-first)
  assert.equal(isIpv6Blocked("::1", { allowLocal: false }), true);
  assert.equal(isIpv6Blocked("2606:4700::1111"), false);
  assert.equal(isIpLiteral("127.0.0.1"), true);
  assert.equal(isIpLiteral("::1"), true);
  assert.equal(isIpLiteral("example.com"), false);
  assert.deepEqual([...ALLOWED_FETCH_SCHEMES], ["http:", "https:"]);
});

test("multi-record DNS: blocks if ANY resolved address is metadata/link-local (local-first default)", () => {
  // A private address alongside a public one is now ALLOWED by default
  // (local-first) — only cloud-metadata/link-local addresses stay blocked.
  assert.equal(
    isAnyResolvedAddressBlocked([
      { address: "8.8.8.8", family: 4 },
      { address: "192.168.1.10", family: 4 },
    ]),
    false
  );
  // A cloud-metadata address among public records → still blocked.
  assert.equal(
    isAnyResolvedAddressBlocked([
      { address: "8.8.8.8", family: 4 },
      { address: "169.254.169.254", family: 4 },
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
  // Strict mode (allowLocal: false): a private address is blocked again.
  assert.equal(
    isAnyResolvedAddressBlocked(
      [
        { address: "8.8.8.8", family: 4 },
        { address: "192.168.1.10", family: 4 },
      ],
      { allowLocal: false }
    ),
    true
  );
  // A single internal IPv6 among public records → blocked in strict mode.
  assert.equal(
    isAnyResolvedAddressBlocked(
      [
        { address: "2606:4700::1111", family: 6 },
        { address: "fd00::1", family: 6 },
      ],
      { allowLocal: false }
    ),
    true
  );
  // Empty result set → nothing blocked.
  assert.equal(isAnyResolvedAddressBlocked([]), false);
});

// ─────────────────── Regression: #10158 local proxy subscription ───────────────────
// Promoted from the TDD probe (was RED on release/v3.8.50: local http subscription
// URLs were rejected by the strict SSRF guard even though the same feature already
// permits loopback for the routing half — coreEndpoint.ts's ALLOWED_LOCAL_CORE_HOSTS).

test("#10158: local (127.0.0.1) http subscription URL is allowed by default", () => {
  assert.equal(
    isSubscriptionFetchUrlAllowed("http://127.0.0.1:8080/list"),
    true,
    "an operator should be able to fetch a proxy list from a local HTTP server"
  );
});

test("#10158: IMDS / cloud-metadata pivot stays blocked even with local-first default", () => {
  assert.equal(isSubscriptionFetchUrlAllowed("http://169.254.169.254/latest/meta-data/"), false);
});

// ─────────────────── Regression: #10416 incomplete SSRF guard ───────────────────
// The #10158 fix left two gaps in the IPv6 side of the guard: (1) IPv4-mapped
// IPv6 literals (`::ffff:a.b.c.d`) were never unwrapped, so a mapped IMDS/
// loopback/private address skipped IPv4 range checking entirely; (2) the
// link-local check was a narrow `.startsWith("fe80")` string test instead of
// the full `fe80::/10` range (`fe80::` .. `febf:ffff::…`), so e.g. `fe90::1`
// or `febf:ffff::1` were WRONGLY ALLOWED even though they are link-local.

test("#10416: IPv4-mapped IPv6 IMDS literal stays blocked unconditionally", () => {
  assert.equal(
    isSubscriptionFetchUrlAllowed("http://[::ffff:169.254.169.254]/latest/meta-data/"),
    false
  );
  assert.equal(
    isSubscriptionFetchUrlAllowed("http://[::ffff:169.254.169.254]/latest/meta-data/", {
      allowLocal: false,
    }),
    false
  );
  assert.equal(isIpv6Blocked("::ffff:169.254.169.254"), true);
});

test("#10416: IPv4-mapped IPv6 loopback/private literals follow IPv4 semantics", () => {
  for (const mapped of ["::ffff:127.0.0.1", "::ffff:10.0.0.1", "::ffff:192.168.1.1"]) {
    // local-first default: allowed, same as the bare IPv4 form.
    assert.equal(isSubscriptionFetchUrlAllowed(`http://[${mapped}]/x`), true, mapped);
    assert.equal(isIpv6Blocked(mapped), false, mapped);
    // strict mode: blocked, same as the bare IPv4 form.
    assert.equal(
      isSubscriptionFetchUrlAllowed(`http://[${mapped}]/x`, { allowLocal: false }),
      false,
      mapped
    );
    assert.equal(isIpv6Blocked(mapped, { allowLocal: false }), true, mapped);
  }
});

test("#10416: full fe80::/10 link-local range is blocked, not just the fe80 prefix", () => {
  // fe80::/10 spans fe80:: through febf:ffff:…, i.e. the top 10 bits of the
  // first hex group are 11111110 10xxxxxx (0xfe80-0xfebf). A narrow
  // `.startsWith("fe80")` check misses fe90/fea0/febf entirely.
  for (const ip of ["fe80::1", "fe90::1", "fea0::1", "febf:ffff::1"]) {
    assert.equal(isSubscriptionFetchUrlAllowed(`http://[${ip}]/x`), false, ip);
    assert.equal(
      isSubscriptionFetchUrlAllowed(`http://[${ip}]/x`, { allowLocal: false }),
      false,
      ip
    );
    assert.equal(isIpv6Blocked(ip), true, ip);
  }
  // fec0:: is OUTSIDE fe80::/10 (it was the deprecated IPv6 site-local
  // prefix, not link-local) — must NOT be misclassified as link-local.
  assert.equal(isIpv6Blocked("fec0::1"), false);
});

test("#10416: IPv4-mapped IPv6 literal host is recognized by isIpLiteral", () => {
  assert.equal(isIpLiteral("::ffff:169.254.169.254"), true);
  assert.equal(isIpLiteral("::ffff:127.0.0.1"), true);
});

// The WHATWG `URL` parser normalizes a dotted-quad IPv4-mapped IPv6 literal
// into hex-group form (`::ffff:169.254.169.254` -> `::ffff:a9fe:a9fe`), so
// `isSubscriptionFetchUrlAllowed` (which parses via `new URL()`) only ever
// sees the hex-group form for a URL-supplied host — verify that form too.
test("#10416: URL-normalized (hex-group) IPv4-mapped IPv6 literals are handled", () => {
  assert.equal(new URL("http://[::ffff:169.254.169.254]/x").hostname, "[::ffff:a9fe:a9fe]");
  assert.equal(isSubscriptionFetchUrlAllowed("http://[::ffff:169.254.169.254]/x"), false);
  assert.equal(isIpv6Blocked("::ffff:a9fe:a9fe"), true); // mapped IMDS

  assert.equal(isSubscriptionFetchUrlAllowed("http://[::ffff:127.0.0.1]/x"), true);
  assert.equal(isIpv6Blocked("::ffff:7f00:1"), false); // mapped loopback, local-first default
  assert.equal(isIpv6Blocked("::ffff:7f00:1", { allowLocal: false }), true);
});
