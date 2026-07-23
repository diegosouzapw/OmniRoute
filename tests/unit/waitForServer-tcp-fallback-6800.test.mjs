// Regression test for issue #6800 item 1: waitForServer() must NOT declare the
// server "ready" based on a raw-TCP-accept fallback when the HTTP layer never
// answers a single request. This reproduces exactly the reported symptom: port
// enters LISTEN / accepts TCP, but GET /api/monitoring/health (and any other
// route) hangs indefinitely — yet the CLI still printed "OmniRoute is running!".

import { test } from "node:test";
import assert from "node:assert/strict";
import net from "node:net";
import { waitForServer } from "../../bin/cli/utils/pid.mjs";

test("#6800: waitForServer must NOT report ready when TCP accepts but HTTP never responds", async () => {
  const server = net.createServer((socket) => {
    // Accept the TCP connection (this is what makes the port show LISTEN and
    // "accepts connections"), but never write an HTTP response and never
    // close the socket — exactly the observed 30-60s hang before HTTP
    // responds.
  });

  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const port = server.address().port;

  try {
    const start = Date.now();
    const ready = await waitForServer(port, 20000);
    const elapsedMs = Date.now() - start;

    assert.equal(
      ready,
      false,
      `waitForServer() incorrectly reported ready=true after ${elapsedMs}ms even though ` +
        `/api/monitoring/health never returned a response (only a TCP-accepting, ` +
        `non-responding socket) — this is the readiness-lies-about-HTTP bug from #6800.`
    );
  } finally {
    server.close();
  }
});

test("#2460: waitForServer still recovers when health route briefly errors before mounting", async () => {
  // Simulate the original Windows dev-cold-start scenario this fallback was
  // built for: the port is open, but the very first few requests get an
  // ECONNRESET / abrupt close (health route not mounted yet) before the
  // server starts answering normally.
  let attempts = 0;
  const server = net.createServer((socket) => {
    attempts += 1;
    if (attempts <= 3) {
      // Abruptly reset the connection — simulates a not-yet-mounted route.
      socket.destroy();
      return;
    }
    socket.on("data", () => {
      socket.end("HTTP/1.1 200 OK\r\nContent-Length: 2\r\n\r\nok");
    });
  });

  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const port = server.address().port;

  try {
    const ready = await waitForServer(port, 20000);
    assert.equal(
      ready,
      true,
      "waitForServer() should still recover once the health route starts answering " +
        "(regression guard for the original #2460 Windows cold-start fix)"
    );
  } finally {
    server.close();
  }
});
