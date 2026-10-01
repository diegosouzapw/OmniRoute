import assert from "node:assert/strict";
import { EventEmitter } from "node:events";
import net from "node:net";
import test from "node:test";

import { openCursorH2 } from "../../open-sse/executors/cursor/h2AgentStream.ts";
import { runWithProxyContext } from "../../open-sse/utils/proxyFetch.ts";

const { resetDbInstance } = await import("../../src/lib/db/core.ts");
test.after(() => resetDbInstance());

function fakeHttp2(respond = false) {
  const req = new EventEmitter() as EventEmitter & { write: () => boolean; close: () => void };
  if (respond) {
    req.on("newListener", (event) => {
      if (event === "response") queueMicrotask(() => req.emit("response", { ":status": 200 }));
    });
  }
  req.write = () => true;
  req.close = () => {
    req.emit("close");
  };
  const client = new EventEmitter() as EventEmitter & {
    request: () => typeof req;
    close: () => void;
  };
  client.request = () => req;
  client.close = () => {
    client.emit("close");
  };
  const module = { connect: () => client } as unknown as typeof import("node:http2");
  return { module, req, client };
}

async function startProxy() {
  let accepted!: (socket: net.Socket) => void;
  const tunnel = new Promise<net.Socket>((resolve) => {
    accepted = resolve;
  });
  const peers = new Set<net.Socket>();
  const server = net.createServer((socket) => {
    peers.add(socket);
    socket.once("close", () => peers.delete(socket));
    socket.on("error", () => {});
    socket.once("data", () => {
      socket.write("HTTP/1.1 200 Connection established\r\n\r\n");
      accepted(socket);
    });
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const port = (server.address() as net.AddressInfo).port;
  return { tunnel, server, port, peers };
}

test("aborting the HTTP/2 request closes the established CONNECT socket", async () => {
  const proxy = await startProxy();
  const { module } = fakeHttp2();
  const controller = new AbortController();
  try {
    const pending = runWithProxyContext(
      { protocol: "http", host: "127.0.0.1", port: proxy.port },
      () =>
        openCursorH2(
          module,
          "https://api2.cursor.sh/agent.v1.AgentService/Run",
          {},
          Buffer.alloc(5),
          controller.signal
        )
    );
    const peer = await proxy.tunnel;
    const closed = new Promise<void>((resolve) => peer.once("close", () => resolve()));
    controller.abort();
    await assert.rejects(pending, /aborted/);
    await closed;
    assert.equal(peer.destroyed, true);
  } finally {
    for (const socket of proxy.peers) socket.destroy();
    await new Promise<void>((resolve) => proxy.server.close(() => resolve()));
  }
});

test("closing the HTTP/2 stream releases its CONNECT socket after response headers", async () => {
  const proxy = await startProxy();
  const { module, req } = fakeHttp2(true);
  try {
    const pending = runWithProxyContext(
      { protocol: "http", host: "127.0.0.1", port: proxy.port },
      () =>
        openCursorH2(
          module,
          "https://api2.cursor.sh/agent.v1.AgentService/Run",
          {},
          Buffer.alloc(5)
        )
    );
    const peer = await proxy.tunnel;
    const closed = new Promise<void>((resolve) => peer.once("close", () => resolve()));
    const connection = await pending;
    assert.equal(connection.status, 200);
    req.emit("close");
    await closed;
    assert.equal(peer.destroyed, true);
  } finally {
    for (const socket of proxy.peers) socket.destroy();
    await new Promise<void>((resolve) => proxy.server.close(() => resolve()));
  }
});
