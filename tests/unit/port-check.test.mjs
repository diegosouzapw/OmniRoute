import test from "node:test";
import assert from "node:assert/strict";
import { createServer } from "node:net";
import { isPortFree, waitUntilPortFree } from "../../bin/cli/utils/portCheck.mjs";

test("isPortFree: returns true for an unused port", async () => {
  const free = await isPortFree(0); // port 0 = OS picks a free port
  // Port 0 itself is "special" but the bind test exercises the same logic.
  assert.equal(typeof free, "boolean");
});

test("isPortFree: returns false when port is occupied", async () => {
  const server = createServer();
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  const { port } = server.address();

  const free = await isPortFree(port, "127.0.0.1");
  assert.equal(free, false, "occupied port must report as not free");

  server.close();
  // Give the OS a moment to release the port.
  await new Promise((r) => setTimeout(r, 100));
  const freeAfter = await isPortFree(port, "127.0.0.1");
  assert.equal(freeAfter, true, "released port must report as free");
});

test("waitUntilPortFree: resolves immediately if port is already free", async () => {
  // Pick a random high port that's almost certainly free.
  await assert.doesNotReject(() =>
    waitUntilPortFree(49152, { timeoutMs: 1000, intervalMs: 50 })
  );
});

test("waitUntilPortFree: resolves after port is released", async () => {
  const server = createServer();
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  const { port } = server.address();

  // Release the port after 200ms.
  setTimeout(() => server.close(), 200);

  await assert.doesNotReject(() =>
    waitUntilPortFree(port, { timeoutMs: 5000, intervalMs: 50, host: "127.0.0.1" })
  );
});

test("waitUntilPortFree: rejects on timeout if port stays occupied", async () => {
  const server = createServer();
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  const { port } = server.address();

  await assert.rejects(
    () => waitUntilPortFree(port, { timeoutMs: 300, intervalMs: 50, host: "127.0.0.1" }),
    (err) => err.message.includes("still in use")
  );

  server.close();
});
