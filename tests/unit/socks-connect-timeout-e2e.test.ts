import { describe, it, afterEach } from "node:test";
import assert from "node:assert/strict";
import net from "node:net";
import { fetch, type Agent } from "undici";
import type { SocksProxy } from "socks";
import { createSocksDispatcherWithFamily } from "../../open-sse/utils/socksConnectorWithFamily.ts";
import { clearDispatcherCache } from "../../open-sse/utils/proxyDispatcher.ts";

async function startFakeSocks(opts: {
  stallAfterGrant: boolean;
}): Promise<{ port: number; close: () => Promise<void> }> {
  return new Promise((resolve) => {
    const serverSockets = new Set<net.Socket>();
    const server = net.createServer((socket) => {
      let step = 0;
      serverSockets.add(socket);
      socket.on("close", () => serverSockets.delete(socket));
      socket.on("data", (_data: Buffer) => {
        if (step === 0) {
          socket.write(Buffer.from([0x05, 0x00]));
          step = 1;
          return;
        }
        if (step === 1) {
          if (!opts.stallAfterGrant) return;
          socket.write(Buffer.from([0x05, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]));
          step = 2;
        }
      });
    });
    server.listen(0, "127.0.0.1", () => {
      const addr = server.address() as net.AddressInfo;
      resolve({
        port: addr.port,
        close: () =>
          new Promise<void>((r) => {
            for (const s of serverSockets) s.destroy();
            server.close(() => r());
          }),
      });
    });
  });
}

describe("stub SOCKS e2e", () => {
  afterEach(() => clearDispatcherCache());

  it("pre-grant stall (SOCKS timer) \u2192 error < 1000ms", async () => {
    const { port, close } = await startFakeSocks({ stallAfterGrant: false });
    const proxy: SocksProxy = { host: "127.0.0.1", port, type: 5 };
    const dispatcher = createSocksDispatcherWithFamily(proxy, 4, {
      connectTimeout: 300,
      connect: {},
    } as Agent.Options);
    const t0 = Date.now();
    await assert.rejects(() => fetch("https://example.invalid/", { dispatcher }));
    assert.ok(
      Date.now() - t0 < 1000,
      `pre-grant stall must error < 1000ms, took ${Date.now() - t0}ms`
    );
    await close();
  });

  it("post-grant stall (TLS timer, https:// only) \u2192 error < 1500ms", async () => {
    const { port, close } = await startFakeSocks({ stallAfterGrant: true });
    const proxy: SocksProxy = { host: "127.0.0.1", port, type: 5 };
    const dispatcher = createSocksDispatcherWithFamily(proxy, 4, {
      connectTimeout: 300,
      connect: {},
    } as Agent.Options);
    const t0 = Date.now();
    let caught: unknown = null;
    await assert.rejects(async () => {
      try {
        await fetch("https://example.invalid/", { dispatcher });
      } catch (e) {
        caught = e;
        throw e;
      }
    });
    const err = caught as { message?: string } | null;
    // The ~1000ms wall time is connectTimeout 300ms + undici immediate/queue overhead, not the 10000ms default.
    assert.ok(
      Date.now() - t0 < 1500,
      `post-grant stall must error < 1500ms, took ${Date.now() - t0}ms (err: ${String(err?.message ?? err).slice(0, 120)})`
    );
    await close();
  });
});
