import test from "node:test";
import assert from "node:assert/strict";
import net from "node:net";

import { waitForServer } from "../../bin/cli/utils/pid.mjs";

// #2460 / #6800: waitForServer must (a) respect a 60s default timeout,
// (b) return true when the port is listening for >= 3s and health requests
// are being fast-rejected/reset (route not yet mounted, common on Windows
// during slow Next.js cold start), (c) return false cleanly when nothing is
// listening, and (d) return false when the port merely accepts TCP and then
// hangs without ever answering a request (#6800 — a still-booting/CPU-bound
// process must NOT be reported as ready just because the socket is open).

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

test("waitForServer returns true via TCP fallback when health requests are fast-rejected (route not yet mounted) (#2460)", async () => {
  const port = await freePort();
  const server = net.createServer((socket) => {
    // Actively reset the connection quickly — simulates a Node process
    // that has bound the port and is responsive, but has not yet mounted
    // the health route (the original #2460 Windows cold-start scenario).
    socket.destroy();
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

test("waitForServer returns false when the port accepts TCP but never answers a request (#6800)", async () => {
  const port = await freePort();
  const server = net.createServer((socket) => {
    // Accept the connection but never respond and never close it — a
    // still-booting/CPU-bound process that has bound the port but cannot
    // yet process any request. This must NOT be reported as ready.
    socket.on("data", () => {});
  });
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(port, "127.0.0.1", () => resolve());
  });

  try {
    const result = await waitForServer(port, 8000);
    assert.equal(
      result,
      false,
      "expected waitForServer to NOT report ready for a TCP-open-but-never-responding socket"
    );
  } finally {
    await new Promise((resolve) => server.close(() => resolve()));
  }
});
