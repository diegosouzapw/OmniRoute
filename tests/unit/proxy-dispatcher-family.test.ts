import { describe, it, afterEach } from "node:test";
import assert from "node:assert/strict";
import {
  __getSocksOptionsForTest,
  __resolveDispatcherFamilyForTest,
  proxyConfigToUrl,
  clearDispatcherCache,
} from "../../open-sse/utils/proxyDispatcher.ts";

afterEach(() => clearDispatcherCache());

describe("proxyDispatcher SOCKS5 host handling", () => {
  it("de-brackets an IPv6-literal SOCKS proxy host", () => {
    const opts = __getSocksOptionsForTest("socks5://[2001:db8::1]:1080");
    assert.equal(opts.host, "2001:db8::1");
    assert.equal(opts.port, 1080);
  });
  it("leaves an IPv4 SOCKS host unchanged", () => {
    const opts = __getSocksOptionsForTest("socks5://203.0.113.7:1080");
    assert.equal(opts.host, "203.0.113.7");
  });
});

describe("proxyDispatcher family directive", () => {
  it("encodes family from a config object onto the URL", () => {
    const url = proxyConfigToUrl({ type: "http", host: "proxy.example.com", port: 8080, family: "ipv6" });
    assert.ok(url!.includes("family=ipv6"), url!);
  });
  it("derives 6 for an explicit ipv6 directive on a hostname proxy", () => {
    assert.equal(__resolveDispatcherFamilyForTest("http://proxy.example.com:8080?family=ipv6"), 6);
  });
  it("derives the literal family when no directive is present", () => {
    assert.equal(__resolveDispatcherFamilyForTest("http://[2001:db8::1]:8080"), 6);
    assert.equal(__resolveDispatcherFamilyForTest("http://203.0.113.7:8080"), 4);
    assert.equal(__resolveDispatcherFamilyForTest("http://proxy.example.com:8080"), null);
  });
  it("throws (fail-closed) when family=ipv6 contradicts a v4 literal", () => {
    assert.throws(() => __resolveDispatcherFamilyForTest("http://203.0.113.7:8080?family=ipv6"), /family/i);
  });
});
