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
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { findListeningPids } from "../../bin/cli/utils/pid.mjs";

const execFileAsync = promisify(execFile);

// findListeningPids() has no discovery mechanism on POSIX besides `lsof`
// (see pid.mjs) — a runner without it (this devbox, some minimal CI images)
// makes the real preflight silently report "port free" by design (a false
// "busy" would block a legitimate `serve`, the worse failure of the two), so
// the end-to-end assertion below cannot pass there. Skip rather than fail: an
// absent discovery tool is an environment gap, not a regression in this PR.
async function hasPosixPortDiscovery() {
  try {
    await execFileAsync("lsof", ["-v"]);
    return true;
  } catch (err) {
    return err?.code !== "ENOENT";
  }
}

const canDiscoverListeningPorts = process.platform === "win32" || (await hasPosixPortDiscovery());

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

test("findListeningPids returns null when discovery is unavailable (#14518)", async () => {
  const pids = await findListeningPids(20128, {
    platform: "win32",
    execFileAsync: async () => {
      throw new Error("netstat unavailable");
    },
  });
  assert.equal(pids, null, "a discovery failure is 'unknown'; the caller bind-probes instead");
});

// Tests for #14518: on a host without lsof/netstat (Termux, slim containers),
// findListeningPids() returned [] — indistinguishable from "no listener" — so
// the serve preflight waved the doomed second instance through and the user
// got an EADDRINUSE restart loop instead of the one-line port-in-use message.
// The fix makes the guard bind-probe the port itself when discovery tools are
// missing, so "tool absent" can never again be read as "port free".

test("findListeningPids returns null when the discovery binary does not exist", async () => {
  const enoent = Object.assign(new Error("spawn lsof ENOENT"), { code: "ENOENT" });
  const pids = await findListeningPids(20128, {
    platform: "linux",
    execFileAsync: async () => {
      throw enoent;
    },
  });
  assert.equal(pids, null, "a missing tool is 'unknown', not 'free'");
});

test("findListeningPids returns null for a missing netstat on win32", async () => {
  const enoent = Object.assign(new Error("spawn netstat ENOENT"), { code: "ENOENT" });
  const pids = await findListeningPids(20128, {
    platform: "win32",
    execFileAsync: async () => {
      throw enoent;
    },
  });
  assert.equal(pids, null);
});

test("probePortFree is false while a socket holds the port and true after release", async () => {
  const { probePortFree } = await import("../../bin/cli/utils/pid.mjs");
  const server = net.createServer();
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const { port } = server.address();
  try {
    assert.equal(await probePortFree(port), false, "a held port must not read as free");
  } finally {
    await new Promise((r) => server.close(r));
  }
  assert.equal(await probePortFree(port), true, "a released port must bind cleanly");
});

test("reportPortInUse degrades gracefully when the owner pid is unknown", async () => {
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
  assert.match(out, /Port 20128 is already in use/, "must still name the port");
  assert.match(out, /unknown|unidentified/, "must say the owner could not be identified");
  assert.match(out, /omniroute stop/, "must keep the resolution path");
});

test("serve preflight rejects a busy port even without any discovery tool (end-to-end for #14518)", async () => {
  const { probePortFree, findListeningPids } = await import("../../bin/cli/utils/pid.mjs");
  const server = net.createServer();
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const { port } = server.address();
  const enoent = Object.assign(new Error("spawn lsof ENOENT"), { code: "ENOENT" });
  try {
    // Simulate the Termux condition: discovery tool absent.
    const pids = await findListeningPids(port, {
      platform: "linux",
      execFileAsync: async () => {
        throw enoent;
      },
    });
    assert.equal(pids, null, "guard cannot rely on pid discovery here");
    // The fixed preflight then bind-probes; that must expose the conflict.
    assert.equal(await probePortFree(port), false, "busy port must be caught by the probe");
  } finally {
    await new Promise((r) => server.close(r));
  }
});

test(
  "findListeningPids finds a real listening socket (end-to-end)",
  {
    skip: !canDiscoverListeningPorts && "no lsof/netstat available on this runner",
  },
  async () => {
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
  }
);

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
