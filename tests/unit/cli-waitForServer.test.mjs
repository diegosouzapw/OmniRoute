import test from "node:test";
import assert from "node:assert/strict";
import net from "node:net";

import { waitForServer } from "../../bin/cli/utils/pid.mjs";

// #2460: waitForServer must (a) respect a 60s default timeout, (b) return
// true when the port is listening for >= 3s even if /api/monitoring/health
// is not yet mounted (common on Windows during slow Next.js cold start),
// and (c) return false cleanly when nothing is listening.

async function freePort() {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.unref();
    server.listen(0, () => {
      const { port } = server.address();
      server.close(() => resolve(port));
    });
  });
}

test("waitForServer returns false on a closed port within the given timeout (#2460)", async () => {
  const port = await freePort();
  const start = Date.now();
  const result = await waitForServer(port, 1200);
  const elapsed = Date.now() - start;
  assert.equal(result, false);
  assert.ok(elapsed >= 1200 && elapsed < 4000, `elapsed ${elapsed}ms outside expected range`);
});

test("waitForServer returns true via TCP fallback when port listens but health endpoint is absent (#2460)", async () => {
  const port = await freePort();
  const server = net.createServer((socket) => {
    // Accept the connection but never respond — simulates a Node process
    // that has bound the port but not yet mounted HTTP routes.
    socket.on("data", () => {});
  });
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(port, "127.0.0.1", () => resolve());
  });

  try {
    const result = await waitForServer(port, 8000);
    assert.equal(result, true, "expected TCP fallback to mark the server ready");
  } finally {
    await new Promise((resolve) => server.close(() => resolve()));
  }
});
