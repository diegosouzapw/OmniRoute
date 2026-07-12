import { describe, it, afterEach } from "node:test";
import assert from "node:assert/strict";
import {
  __getProxyDispatcherOptionsForTest,
  __getSocksOptionsForTest,
  __resolveDispatcherFamilyForTest,
  proxyConfigToUrl,
  normalizeProxyUrl,
  clearDispatcherCache,
  __cacheProxyDispatcherForTest,
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
    const url = proxyConfigToUrl({
      type: "http",
      host: "proxy.example.com",
      port: 8080,
      family: "ipv6",
    });
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
    assert.throws(
      () => __resolveDispatcherFamilyForTest("http://203.0.113.7:8080?family=ipv6"),
      /family/i
    );
  });
});

describe("proxyDispatcher family marker does not corrupt port", () => {
  it("preserves port 80 for an http proxy with a family directive", () => {
    const url = proxyConfigToUrl({ type: "http", host: "203.0.113.7", port: 80, family: "ipv6" });
    assert.ok(url!.includes("203.0.113.7:80"), `expected :80 to survive, got ${url}`);
    assert.ok(!url!.includes(":8080"), `port must not be rewritten to 8080, got ${url}`);
  });
  it("normalizeProxyUrl keeps :80 when a family marker is present", () => {
    const out = normalizeProxyUrl("http://203.0.113.7:80?family=ipv6", "test");
    assert.ok(out.includes("203.0.113.7:80"), out);
    assert.ok(!out.includes(":8080"), out);
    assert.ok(out.endsWith("?family=ipv6"), out);
  });
});

describe("proxyDispatcher connection pool", () => {
  it("keeps enough proxy connections for concurrent SSE streams by default", () => {
    const options = __getProxyDispatcherOptionsForTest({});
    assert.equal(options.connections, 32);
    assert.equal(options.pipelining, 0);
    assert.equal(options.keepAliveTimeout, 1);
    assert.equal(options.keepAliveMaxTimeout, 1);
  });

  it("allows operators to force a single proxy connection for diagnostics", () => {
    const options = __getProxyDispatcherOptionsForTest({
      OMNIROUTE_PROXY_DISPATCHER_CONNECTIONS: "1",
    });
    assert.equal(options.connections, 1);
  });

  it("caps excessive proxy connection overrides", () => {
    const options = __getProxyDispatcherOptionsForTest({
      OMNIROUTE_PROXY_DISPATCHER_CONNECTIONS: "9999",
    });
    assert.equal(options.connections, 256);
  });

  it("closes cached proxy dispatchers when the proxy cache is cleared", () => {
    let closeCount = 0;
    const dispatcher = {
      dispatch() {
        return true;
      },
      close() {
        closeCount += 1;
      },
      destroy() {},
    };

    __cacheProxyDispatcherForTest("http://proxy.example.com:8080", dispatcher as never);
    clearDispatcherCache();

    assert.equal(closeCount, 1);
  });
});

describe("proxyDispatcher CONNECT tunneling (undici 8.6+ proxyTunnel)", () => {
  it("tunnels a plain-HTTP proxied request via CONNECT, not origin-forwarding", async () => {
    const http = await import("node:http");
    const net = await import("node:net");
    const { createProxyDispatcher } = await import("../../open-sse/utils/proxyDispatcher.ts");
    const { fetch: undiciFetch } = await import("undici");

    // Upstream HTTP target.
    const target = http.createServer((_req, res) => {
      res.writeHead(200);
      res.end("ok");
    });
    await new Promise((r) => target.listen(0, r));
    const targetPort = (target.address() as { port: number }).port;

    // Proxy that ONLY speaks CONNECT: 501 on a forwarded origin request, tunnels on CONNECT.
    let sawConnect = false;
    let sawForward = false;
    const proxy = http.createServer((_req, res) => {
      sawForward = true;
      res.writeHead(501);
      res.end("CONNECT only");
    });
    proxy.on("connect", (req, socket) => {
      sawConnect = true;
      const [host, port] = String(req.url).split(":");
      const upstream = net.connect(Number(port), host, () => {
        socket.write("HTTP/1.1 200 Connection Established\r\n\r\n");
        upstream.pipe(socket);
        socket.pipe(upstream);
      });
      upstream.on("error", () => socket.destroy());
    });
    await new Promise((r) => proxy.listen(0, r));
    const proxyPort = (proxy.address() as { port: number }).port;

    try {
      const dispatcher = createProxyDispatcher(`http://127.0.0.1:${proxyPort}`);
      const res = await undiciFetch(`http://127.0.0.1:${targetPort}/token`, {
        method: "POST",
        // @ts-expect-error undici dispatcher option
        dispatcher,
        signal: AbortSignal.timeout(3000),
      });
      assert.equal(res.status, 200, "request must succeed via CONNECT tunnel");
      assert.equal(
        sawConnect,
        true,
        "proxy must receive a CONNECT (tunnel), not a forwarded request"
      );
      assert.equal(
        sawForward,
        false,
        "proxy must NOT receive a forwarded origin request (undici 8.6+ regression)"
      );
    } finally {
      proxy.close();
      target.close();
      clearDispatcherCache();
    }
  });
});
