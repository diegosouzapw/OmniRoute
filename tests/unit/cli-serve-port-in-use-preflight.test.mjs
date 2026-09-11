// `omniroute serve` against a port another OmniRoute already owns produced a
// confusing, self-inflicted mess: it spawned a child that died with
// EADDRINUSE, retried it twice on the supervisor's restart budget, and printed
// three identical raw Node stack traces before giving up — never once saying
// that another instance already owns the port.
//
// Worse, it did that AFTER writePidFile("supervisor") and the failed child's
// cleanupPidFile("server"), so the doomed second instance overwrote the pid
// files of the healthy running one: supervisor/.pid pointed at the dead
// starter and server/.pid was deleted outright, de-registering a server that
// was up and serving. (Observed live: healthy server 19348 under supervisor
// 11108, while supervisor/.pid read 21440 — dead — and server/.pid was gone.)
//
// Fix: preflight the port before spawning anything. Report who owns it and
// exit, touching no pid files.

import { test } from "node:test";
import assert from "node:assert/strict";
import net from "node:net";
import { findListeningPids } from "../../bin/cli/utils/pid.mjs";

const WIN_NETSTAT = [
  "Active Connections",
  "",
  "  Proto  Local Address          Foreign Address        State           PID",
  "  TCP    0.0.0.0:20128          0.0.0.0:0              LISTENING       19348",
  "  TCP    127.0.0.1:20128        127.0.0.1:60894        TIME_WAIT       0",
  "  TCP    0.0.0.0:445            0.0.0.0:0              LISTENING       4",
].join("\r\n");

test("findListeningPids reports the PID holding the port (win32 netstat)", async () => {
  const pids = await findListeningPids(20128, {
    platform: "win32",
    execFileAsync: async () => ({ stdout: WIN_NETSTAT }),
  });
  assert.deepEqual(pids, [19348], "must return only the LISTENING pid for that exact port");
});

test("findListeningPids ignores TIME_WAIT and other ports", async () => {
  const pids = await findListeningPids(445, {
    platform: "win32",
    execFileAsync: async () => ({ stdout: WIN_NETSTAT }),
  });
  assert.deepEqual(pids, [4]);
});

test("findListeningPids reports the PID holding the port (posix lsof)", async () => {
  const pids = await findListeningPids(20128, {
    platform: "linux",
    execFileAsync: async () => ({ stdout: "4242\n4243\n" }),
  });
  assert.deepEqual(pids, [4242, 4243]);
});

test("findListeningPids returns empty when nothing is listening", async () => {
  const pids = await findListeningPids(20128, {
    platform: "win32",
    execFileAsync: async () => {
      throw new Error("netstat unavailable");
    },
  });
  assert.deepEqual(pids, [], "a discovery failure must not be reported as a busy port");
});

test("findListeningPids finds a real listening socket (end-to-end)", async () => {
  const server = net.createServer();
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const { port } = server.address();
  try {
    const pids = await findListeningPids(port);
    assert.ok(
      pids.includes(process.pid),
      `expected the preflight to find this process (${process.pid}) holding port ${port}, got ${JSON.stringify(pids)}`
    );
  } finally {
    await new Promise((r) => server.close(r));
  }
});

test("reportPortInUse names the port, the owning pid, and how to resolve it", async () => {
  const { reportPortInUse } = await import("../../bin/cli/commands/serve.mjs");
  const lines = [];
  const origErr = console.error.bind(console);
  console.error = (...args) => lines.push(args.join(" "));
  try {
    reportPortInUse(20128, [19348]);
  } finally {
    console.error = origErr;
  }
  const out = lines.join("\n");
  assert.match(out, /20128/, "must name the port");
  assert.match(out, /19348/, "must name the process already holding it");
  assert.match(out, /omniroute stop/, "must tell the user how to free the port");
  assert.match(out, /--port/, "must offer running on a different port");
});
