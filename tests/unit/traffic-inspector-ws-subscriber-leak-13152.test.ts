import test from "node:test";
import assert from "node:assert/strict";
import net from "node:net";
import type { AddressInfo } from "node:net";

import { GET } from "@/app/api/tools/traffic-inspector/ws/route";
import { globalTrafficBuffer } from "@/mitm/inspector/buffer";

const DEAD_UPGRADES = 6;

function armedTimers(): number {
  return process.getActiveResourcesInfo().filter((r) => r === "Timeout").length;
}

function upgradeRequest(socket: net.Socket): Request {
  const req = new Request("http://127.0.0.1/api/tools/traffic-inspector/ws", {
    headers: {
      upgrade: "websocket",
      "sec-websocket-key": "dGhlIHNhbXBsZSBub25jZQ==",
    },
  });
  Object.defineProperty(req, "socket", { value: socket, configurable: true });
  return req;
}

async function deadSocket(port: number): Promise<net.Socket> {
  const sock = net.connect(port, "127.0.0.1");
  await new Promise<void>((r) => sock.once("connect", () => r()));
  sock.on("error", () => {});
  sock.destroy();
  await new Promise((r) => setTimeout(r, 20));
  return sock;
}

test("an already-closed socket leaves no subscriber and no ping timer", async () => {
  const accepted: net.Socket[] = [];
  const server = net.createServer((c) => {
    accepted.push(c);
    c.on("error", () => {});
  });
  await new Promise<void>((r) => server.listen(0, "127.0.0.1", () => r()));
  const { port } = server.address() as AddressInfo;

  try {
    const timersBefore = armedTimers();
    const subsBefore = globalTrafficBuffer.subscriberCount();

    const handlers: Promise<unknown>[] = [];
    for (let i = 0; i < DEAD_UPGRADES; i++) {
      // Catch at creation time: the route answers a hijacked upgrade with a 101
      // Response, which undici rejects off a real server. Left unattached, that
      // rejection would sit through the next await and trip Node's unhandled
      // rejection detection. Either settlement proves the handler released its
      // resources instead of hanging, which is what this test measures.
      handlers.push(GET(upgradeRequest(await deadSocket(port))).catch(() => undefined));
    }

    // Own the race timer so it can be cleared before measuring; otherwise the
    // test's own armed timeout is counted as a leaked one.
    let raceTimer: ReturnType<typeof setTimeout> | undefined;
    const outcome = await Promise.race([
      Promise.all(handlers).then(() => "settled"),
      new Promise((r) => {
        raceTimer = setTimeout(() => r("hung"), 2000);
      }),
    ]);
    if (raceTimer) clearTimeout(raceTimer);
    assert.equal(
      outcome,
      "settled",
      "each handler must return instead of hanging forever on a dead socket"
    );

    const timersAfter = armedTimers();
    assert.ok(
      timersAfter <= timersBefore,
      `${DEAD_UPGRADES} dead upgrades retained ${timersAfter - timersBefore} ping timer(s)`
    );

    // Measure the subscriber set directly; counting fan-out to our own probe
    // says nothing about whether the dead sockets stayed subscribed.
    assert.equal(
      globalTrafficBuffer.subscriberCount(),
      subsBefore,
      `${DEAD_UPGRADES} dead upgrades left ${globalTrafficBuffer.subscriberCount() - subsBefore} subscriber(s) behind`
    );
  } finally {
    // close() only fires once every accepted connection is gone.
    for (const c of accepted) c.destroy();
    await new Promise<void>((r) => server.close(() => r()));
  }
});

test("a live socket keeps its subscription until the socket closes", async () => {
  const accepted: net.Socket[] = [];
  const server = net.createServer((c) => {
    accepted.push(c);
    c.on("error", () => {});
  });
  await new Promise<void>((r) => server.listen(0, "127.0.0.1", () => r()));
  const { port } = server.address() as AddressInfo;

  const sock = net.connect(port, "127.0.0.1");
  await new Promise<void>((r) => sock.once("connect", () => r()));
  sock.on("error", () => {});

  try {
    const subsBefore = globalTrafficBuffer.subscriberCount();

    const handler = GET(upgradeRequest(sock)).catch(() => undefined);
    await new Promise((r) => setTimeout(r, 100));

    assert.equal(
      globalTrafficBuffer.subscriberCount(),
      subsBefore + 1,
      "a live upgrade must register exactly one traffic subscriber"
    );

    // Closing the socket resolves the handler's `settled` promise, which is the
    // only path that releases the subscriber.
    sock.destroy();
    await handler;

    assert.equal(
      globalTrafficBuffer.subscriberCount(),
      subsBefore,
      "closing the socket must release the subscriber"
    );
  } finally {
    // close() only fires once every accepted connection is gone.
    for (const c of accepted) c.destroy();
    await new Promise<void>((r) => server.close(() => r()));
  }
});
