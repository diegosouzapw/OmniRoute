import { describe, it, afterEach } from "node:test";
import assert from "node:assert/strict";
import net from "node:net";
import { isProxyReachable, invalidateProxyHealth } from "../../src/lib/proxyHealth";

describe("proxyHealth IPv6-literal reachability", () => {
  afterEach(() => invalidateProxyHealth("http://[::1]:0"));

  it("reaches an IPv6-literal proxy host (de-bracketed before connect)", async () => {
    const hasV6 = await new Promise<boolean>((resolve) => {
      const s = net.createServer();
      s.once("error", () => resolve(false));
      s.listen(0, "::1", () => {
        s.close(() => resolve(true));
      });
    });
    if (!hasV6) {
      // IPv6 loopback unavailable in this environment — skip rather than false-fail.
      return;
    }
    const server = net.createServer();
    await new Promise<void>((resolve) => server.listen(0, "::1", () => resolve()));
    const port = (server.address() as net.AddressInfo).port;
    const url = `http://[::1]:${port}`;
    invalidateProxyHealth(url);
    const ok = await isProxyReachable(url, 1000);
    server.close();
    assert.equal(ok, true, "should connect to ::1 after de-bracketing");
  });
});
