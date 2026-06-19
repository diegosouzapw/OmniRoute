import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  stripIpv6Brackets,
  detectIpLiteralFamily,
  parseProxyFamily,
} from "../../open-sse/utils/proxyFamily.ts";

describe("proxyFamily", () => {
  it("strips brackets from an IPv6 literal host", () => {
    assert.equal(stripIpv6Brackets("[2001:db8::1]"), "2001:db8::1");
    assert.equal(stripIpv6Brackets("[::1]"), "::1");
  });
  it("leaves non-bracketed hosts unchanged", () => {
    assert.equal(stripIpv6Brackets("example.com"), "example.com");
    assert.equal(stripIpv6Brackets("10.0.0.1"), "10.0.0.1");
  });
  it("detects the family of an IP literal (bracketed or not)", () => {
    assert.equal(detectIpLiteralFamily("[2001:db8::1]"), 6);
    assert.equal(detectIpLiteralFamily("::1"), 6);
    assert.equal(detectIpLiteralFamily("203.0.113.7"), 4);
    assert.equal(detectIpLiteralFamily("proxy.example.com"), null);
  });
  it("parses the ProxyFamily directive, defaulting to auto", () => {
    assert.equal(parseProxyFamily("ipv6"), "ipv6");
    assert.equal(parseProxyFamily("ipv4"), "ipv4");
    assert.equal(parseProxyFamily("auto"), "auto");
    assert.equal(parseProxyFamily(undefined), "auto");
    assert.equal(parseProxyFamily("garbage"), "auto");
  });
});
