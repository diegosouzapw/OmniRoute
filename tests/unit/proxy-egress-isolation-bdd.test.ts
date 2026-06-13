import { describe, it, afterEach } from "node:test";
import assert from "node:assert/strict";
import {
  __getSocksOptionsForTest,
  __resolveDispatcherFamilyForTest,
  proxyConfigToUrl,
  clearDispatcherCache,
} from "../../open-sse/utils/proxyDispatcher.ts";
import { resolveTlsClientProxyUrl } from "../../open-sse/services/tlsClientProxy.ts";
import { assertHostnameSupportsFamily } from "../../open-sse/utils/proxyFamilyResolve.ts";

afterEach(() => clearDispatcherCache());

describe("BDD: proxy egress isolation", () => {
  it("Scenario: IPv6-literal proxy de-brackets + connects v6", () => {
    assert.equal(__getSocksOptionsForTest("socks5://[2001:db8::1]:1080").host, "2001:db8::1");
    assert.equal(__resolveDispatcherFamilyForTest("socks5://[2001:db8::1]:1080"), 6);
  });

  it("Scenario: IPv6 hostname proxy pins family 6", () => {
    const url = proxyConfigToUrl({
      type: "http",
      host: "proxy.example.com",
      port: 8080,
      family: "ipv6",
    }) as string;
    assert.equal(__resolveDispatcherFamilyForTest(url), 6);
  });

  it("Scenario: IPv6-only fail-closed when no AAAA", async () => {
    await assert.rejects(
      assertHostnameSupportsFamily("proxy.example.com", 6, async () => [
        { address: "203.0.113.7", family: 4 },
      ]),
      /no IPv6/i
    );
  });

  it("Scenario: family directive contradicting a literal is rejected", () => {
    assert.throws(
      () => __resolveDispatcherFamilyForTest("http://203.0.113.7:8080?family=ipv6"),
      /family/i
    );
  });

  it("Scenario: web TLS client fail-closed", () => {
    assert.throws(
      () =>
        resolveTlsClientProxyUrl("https://grok.com", undefined, () => {
          throw new Error("SOCKS5 disabled");
        }),
      /fail-closed/i
    );
  });
});
