import test from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import net, { AddressInfo } from "node:net";

import { listenWithRetry } from "../../scripts/dev/listen-with-retry.mjs";

// Reproduces the integration port race (base-red #15306, job 111855214488):
// harnesses pick the server port with bind(0)-release at module load, but
// run-next.mjs only binds it after ~15-18s of next prepare(). A transient
// occupant in that window used to kill the boot with EADDRINUSE. The unit test
// pins the contract: retry while the port is busy, reject with the original
// error once attempts are exhausted, resolve with the bound address otherwise.

function listen(server: net.Server | http.Server, port: number, host = "127.0.0.1") {
  return new Promise<AddressInfo>((resolve, reject) => {
    server.once("error", reject);
    server.listen(port, host, () => {
      const addr = server.address();
      if (!addr || typeof addr === "string") reject(new Error("no TCP address"));
      else resolve(addr);
    });
  });
}

function close(server: net.Server | http.Server) {
  return new Promise<void>((resolve) => server.close(() => resolve()));
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

test("listenWithRetry binds once the port frees up mid-retry", async () => {
  const squatter = net.createServer();
  const { port } = await listen(squatter, 0);
  const server = http.createServer();
  const pending = listenWithRetry(server, { port, host: "127.0.0.1", attempts: 5, delayMs: 50 });
  await sleep(120); // first attempt fails against the squatter
  await close(squatter); // occupant releases the port mid-retry
  const addr = await pending;
  assert.equal(addr.port, port);
  await close(server);
});

test("listenWithRetry rejects with EADDRINUSE after exhausting its attempts", async () => {
  const squatter = net.createServer();
  const { port } = await listen(squatter, 0);
  try {
    const server = http.createServer();
    await assert.rejects(
      listenWithRetry(server, { port, host: "127.0.0.1", attempts: 2, delayMs: 20 }),
      { code: "EADDRINUSE" }
    );
    await close(server);
  } finally {
    await close(squatter);
  }
});

test("listenWithRetry resolves with the bound address on a free port", async () => {
  const server = http.createServer();
  try {
    const addr = await listenWithRetry(server, {
      port: 0,
      host: "127.0.0.1",
      attempts: 2,
      delayMs: 10,
    });
    assert.equal(typeof addr.port, "number");
    assert.ok(addr.port > 0);
  } finally {
    await close(server);
  }
});
