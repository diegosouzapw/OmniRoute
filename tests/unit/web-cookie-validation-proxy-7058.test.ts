// Regression test for #7058 — zai-web (and every other entry-bearing web-cookie
// provider) never honored a configured HTTP/SOCKS proxy during connection-test /
// cookie validation.
//
// Root cause: validateWebCookieProvider() probed `${baseUrl}/models` via
// directHttpsRequest(), which hardcodes `bypassProxyPatch: true` — forcing
// safeOutboundFetch to use the pre-patch native fetch and skip proxy-context/
// env-var resolution entirely. That bypass was introduced in #3226 as a narrow,
// documented exception for a single NVIDIA NIM workaround
// (see tests/unit/proxy-bypass-scope-guard-3226.test.ts) but validateWebCookieProvider
// adopted it as its default transport from inception (#4023), silently extending the
// bypass to every web-cookie provider with a registry entry (zai-web among them).
//
// This test proves the cookie-validation probe reaches a local forward proxy
// (via a real CONNECT tunnel — the same mechanism undici uses for both HTTP and
// HTTPS targets) when one is configured via HTTP_PROXY, exactly like the
// specialty web-cookie validators (chatgpt-web, grok-web, ...) already do via
// validationRead/validationWrite.
import test from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import net from "node:net";

const { validateWebCookieProvider } = await import("../../src/lib/providers/validation.ts");
const { REGISTRY } = await import("../../open-sse/config/providerRegistry.ts");
const { clearDispatcherCache } = await import("../../open-sse/utils/proxyDispatcher.ts");

const zaiWebEntry = REGISTRY["zai-web"] as { baseUrl?: string } | undefined;
const ORIGINAL_BASE_URL = zaiWebEntry?.baseUrl;
const ORIGINAL_HTTP_PROXY = process.env.HTTP_PROXY;

test.after(() => {
  if (zaiWebEntry && ORIGINAL_BASE_URL !== undefined) {
    zaiWebEntry.baseUrl = ORIGINAL_BASE_URL;
  }
  if (ORIGINAL_HTTP_PROXY === undefined) {
    delete process.env.HTTP_PROXY;
  } else {
    process.env.HTTP_PROXY = ORIGINAL_HTTP_PROXY;
  }
  clearDispatcherCache();
});

test("zai-web cookie validation routes through the configured HTTP_PROXY (#7058)", async () => {
  assert.ok(zaiWebEntry, "zai-web must have a providerRegistry entry for this test to be meaningful");

  // Stand-in for chat.z.ai's /models probe target.
  const target = http.createServer((_req, res) => {
    res.writeHead(200, { "content-type": "application/json" });
    res.end("{}");
  });
  await new Promise<void>((resolve) => target.listen(0, () => resolve()));
  const targetPort = (target.address() as net.AddressInfo).port;

  // Minimal forward proxy that only speaks CONNECT (like a real corporate proxy) and
  // always tunnels to the local target above, regardless of the requested host — this
  // lets the "upstream" host be a non-resolvable placeholder without any real DNS
  // dependency, while still proving the request actually reached the proxy.
  let sawConnect = false;
  const proxy = http.createServer((_req, res) => {
    res.writeHead(501);
    res.end("CONNECT only");
  });
  proxy.on("connect", (_req, socket) => {
    sawConnect = true;
    const upstream = net.connect(targetPort, "127.0.0.1", () => {
      socket.write("HTTP/1.1 200 Connection Established\r\n\r\n");
      upstream.pipe(socket);
      socket.pipe(upstream);
    });
    upstream.on("error", () => socket.destroy());
    socket.on("error", () => upstream.destroy());
  });
  await new Promise<void>((resolve) => proxy.listen(0, () => resolve()));
  const proxyPort = (proxy.address() as net.AddressInfo).port;

  // A non-local-looking hostname: isLocalAddress()/resolveProxyForRequest() force a
  // direct connection for any 127.*/localhost/LAN target, which would defeat this test.
  zaiWebEntry!.baseUrl = "http://zai-web-validation-probe-7058.invalid";
  process.env.HTTP_PROXY = `http://127.0.0.1:${proxyPort}`;
  clearDispatcherCache();

  try {
    const result = await validateWebCookieProvider({ provider: "zai-web", apiKey: "token=fake" });

    assert.equal(
      sawConnect,
      true,
      "BUG #7058: zai-web cookie validation never reached the configured HTTP_PROXY " +
        "(bypassProxyPatch:true unconditionally uses the native, unpatched fetch)"
    );
    assert.equal(result.valid, true, `expected a valid session, got ${JSON.stringify(result)}`);
  } finally {
    target.close();
    proxy.close();
    clearDispatcherCache();
  }
});
