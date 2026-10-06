import test from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import type { AddressInfo } from "node:net";

import { createLogStream } from "../../src/lib/cli-helper/log-streamer.ts";

function armedTimers(): number {
  return process.getActiveResourcesInfo().filter((r) => r === "Timeout").length;
}

async function startServer(): Promise<{ port: number; close: () => Promise<void> }> {
  const open: http.ServerResponse[] = [];
  const server = http.createServer((_req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.write("log line\n");
    // Deliberately left open: stop() must land while the stream is still live.
    open.push(res);
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address() as AddressInfo;
  return {
    port,
    close: async () => {
      for (const res of open) res.end();
      await new Promise<void>((resolve) => server.close(() => resolve()));
    },
  };
}

test("stop() clears the stream timeout timer", async () => {
  const server = await startServer();
  try {
    const before = armedTimers();

    const streams = Array.from({ length: 8 }, () =>
      createLogStream({
        baseUrl: `http://127.0.0.1:${server.port}`,
        follow: true,
        // Long enough that a leaked timer is still armed when we measure.
        timeout: 120_000,
      })
    );

    // Begin consuming so start() runs and the fetch is in flight.
    for (const s of streams) {
      void s.stream
        .getReader()
        .read()
        .catch(() => {});
    }
    await new Promise((r) => setTimeout(r, 300));

    for (const s of streams) s.stop();
    await new Promise((r) => setTimeout(r, 500));

    const after = armedTimers();
    assert.ok(
      after <= before,
      `stopping 8 streams retained ${after - before} armed timer(s) ` +
        `(before=${before} after=${after}); stop() must clear the timeout`
    );
  } finally {
    await server.close();
  }
});

test("a stream that ends normally still clears its timer", async () => {
  const finished = http.createServer((_req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("done\n");
  });
  await new Promise<void>((resolve) => finished.listen(0, "127.0.0.1", resolve));
  const { port } = finished.address() as AddressInfo;

  try {
    const before = armedTimers();
    const { stream } = createLogStream({
      baseUrl: `http://127.0.0.1:${port}`,
      follow: false,
      timeout: 120_000,
    });

    const reader = stream.getReader();
    while (true) {
      const { done } = await reader.read();
      if (done) break;
    }
    await new Promise((r) => setTimeout(r, 200));

    assert.ok(
      armedTimers() <= before,
      "a normally-completed stream must not leave its timeout armed"
    );
  } finally {
    await new Promise<void>((resolve) => finished.close(() => resolve()));
  }
});
