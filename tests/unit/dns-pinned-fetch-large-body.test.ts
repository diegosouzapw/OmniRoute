/**
 * `createPinnedFetch` builds a one-off undici Agent per request and closes it when the request
 * is done. Closing has to wait for the response body: awaiting it before handing the response
 * back stalled every body larger than the stream buffer (about 64 KB), so remote images and
 * other real-sized downloads never arrived.
 */

import test from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import net from "node:net";

const { createPinnedFetch } = await import("../../src/shared/network/dnsPinnedFetch.ts");

async function withServer(
  size: number,
  run: (port: number, sockets: { closed: Promise<void>[] }) => Promise<void>
) {
  const body = Buffer.alloc(size, 97);
  const closed: Promise<void>[] = [];
  const server = http.createServer((_req, res) => {
    res.writeHead(200, { "content-type": "image/png", "content-length": String(body.length) });
    res.end(body);
  });
  server.on("connection", (socket) => {
    closed.push(new Promise<void>((resolve) => socket.once("close", () => resolve())));
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address() as net.AddressInfo;
  try {
    await run(port, { closed });
  } finally {
    server.closeAllConnections();
    server.close();
  }
}

function within<T>(promise: Promise<T>, ms: number, what: string): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error(`${what} timed out`)), ms)),
  ]);
}

test("a pinned fetch delivers a body larger than the stream buffer", async () => {
  for (const size of [1_000, 70_000, 300_000, 3_000_000]) {
    await withServer(size, async (port) => {
      const pinned = createPinnedFetch("127.0.0.1", 4);
      const res = await within(
        pinned(`http://pinned.example:${port}/image`),
        5000,
        `fetch ${size}`
      );
      const bytes = await within(res.arrayBuffer(), 5000, `body ${size}`);
      assert.equal(bytes.byteLength, size);
    });
  }
});

test("the connection is released once the body has been read", async () => {
  await withServer(300_000, async (port, sockets) => {
    const pinned = createPinnedFetch("127.0.0.1", 4);
    const res = await pinned(`http://pinned.example:${port}/image`);
    await res.arrayBuffer();
    await within(Promise.all(sockets.closed), 3000, "socket close");
  });
});

test("a pinned fetch to an address that refuses connections rejects", async () => {
  const probe = net.createServer();
  await new Promise<void>((resolve) => probe.listen(0, "127.0.0.1", resolve));
  const { port } = probe.address() as net.AddressInfo;
  await new Promise<void>((resolve) => probe.close(() => resolve()));
  await assert.rejects(
    within(createPinnedFetch("127.0.0.1", 4)(`http://pinned.example:${port}/`), 5000, "fetch"),
    (error: Error) => error.message !== "fetch timed out"
  );
});

test("a body that is abandoned part way through drops its connection", async () => {
  await withServer(3_000_000, async (port, sockets) => {
    const pinned = createPinnedFetch("127.0.0.1", 4);
    const res = await pinned(`http://pinned.example:${port}/image`);
    const reader = (res.body as ReadableStream<Uint8Array>).getReader();
    await reader.read();
    await reader.cancel();
    await within(Promise.all(sockets.closed), 3000, "socket close");
  });
});
