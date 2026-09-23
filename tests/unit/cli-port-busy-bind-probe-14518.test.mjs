// Regression for #14518: on hosts without lsof/netstat (Termux, slim images),
// findListeningPids() returns [] for "tool missing" AND for "no listener", and
// serve.mjs treats both as "port is free" — so the doomed second instance
// spawned anyway, rewrote the healthy instance's pid files and died three
// EADDRINUSE deaths without ever naming the conflict.
//
// Fix: keep the PID lookup, but when it comes back empty ask the kernel
// directly with a bind probe (net.createServer().listen(port)) — no external
// binary involved. reportPortInUse() learns to speak the no-PID case, which
// previously rendered as a broken "in use by PIDs " line.

import { test } from "node:test";
import assert from "node:assert/strict";
import net from "node:net";
import { isPortInUse, findListeningPids } from "../../bin/cli/utils/pid.mjs";

function listenOn(port) {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.once("error", reject);
    server.listen(port, "127.0.0.1", () => resolve(server));
  });
}

test("isPortInUse reports a port that has a real listener", async () => {
  const server = await listenOn(0);
  const { port } = server.address();
  try {
    assert.equal(await isPortInUse(port), true, "a bound port must read as busy");
  } finally {
    await new Promise((r) => server.close(r));
  }
});

test("isPortInUse reports a genuinely free port", async () => {
  // Ask the kernel for a free port by binding port 0, then close it and probe
  // the same port — no external binary, no fixed port that could race.
  const server = await listenOn(0);
  const { port } = server.address();
  await new Promise((r) => server.close(r));
  assert.equal(await isPortInUse(port), false, "a closed port must read as free");
});

test("findListeningPids with a stubbed ENOENT still answers via nothing — callers use isPortInUse as the fallback", async () => {
  // Documents the contract: tool missing and no listener are indistinguishable
  // in findListeningPids' array return (by design, for API stability) — the
  // disambiguation lives in the bind probe.
  const pids = await findListeningPids(20128, {
    platform: "linux",
    execFileAsync: async () => {
      const err = new Error("spawn lsof ENOENT");
      err.code = "ENOENT";
      throw err;
    },
  });
  assert.deepEqual(pids, []);
});

test("reportPortInUse handles the no-PID case without printing an empty owner", async () => {
  const { reportPortInUse } = await import("../../bin/cli/commands/serve.mjs");
  const lines = [];
  const origErr = console.error.bind(console);
  console.error = (...args) => lines.push(args.join(" "));
  try {
    reportPortInUse(20128, []);
  } finally {
    console.error = origErr;
  }
  const out = lines.join("\n");
  assert.match(out, /20128/, "must name the port");
  assert.doesNotMatch(out, /PIDs?\s*[.,]/, "must not print an empty owner list");
  assert.match(out, /omniroute stop/, "must tell the user how to free the port");
  assert.match(out, /--port/, "must offer running on a different port");
});
