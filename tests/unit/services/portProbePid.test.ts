/**
 * `resolvePortPid` output parsing and probe fallback (#10431).
 *
 * The regression these guard is that `resolvePortPid` used to shell out to
 * `lsof` alone. On a host without it, `spawn` raises ENOENT, the handler turned
 * that into `null`, and an adopted service silently kept `pid: null` forever.
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { createServer } from "node:net";
import { execFileSync, spawn } from "node:child_process";
import { mkdtempSync, rmSync, symlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import {
  PID_PROBES,
  parseLsofPid,
  parseNetstatPid,
  parseSsPid,
  parseWindowsNetstatPid,
  resolvePortPid,
} from "@/lib/services/portProbe";

/** Absolute path of `command`, or null when it is not on PATH. */
function which(command: string): string | null {
  try {
    return execFileSync("/bin/sh", ["-c", `command -v ${command}`], { encoding: "utf8" }).trim();
  } catch {
    return null;
  }
}

test("parseLsofPid reads the first pid line", () => {
  assert.equal(parseLsofPid("596922\n"), 596922);
  assert.equal(parseLsofPid("\n  596922  \n123\n"), 596922);
});

test("parseLsofPid returns null for empty or non-numeric output", () => {
  assert.equal(parseLsofPid(""), null);
  assert.equal(parseLsofPid("\n \n"), null);
  assert.equal(parseLsofPid("lsof: command not found\n"), null);
});

test("parseSsPid reads the pid out of the users:(...) column", () => {
  const line =
    'LISTEN 0      511          127.0.0.1:20128      0.0.0.0:*    users:(("node",pid=596922,fd=18))\n';
  assert.equal(parseSsPid(line), 596922);
});

test("parseSsPid returns null when ss reports no process column", () => {
  // Without ownership of the socket (or CAP_NET_ADMIN) ss prints the row but
  // no users:(...) column, which must not be read as a match.
  assert.equal(parseSsPid("LISTEN 0 511 127.0.0.1:20128 0.0.0.0:*\n"), null);
  assert.equal(parseSsPid(""), null);
});

test("parseNetstatPid matches on the local address, not the foreign one", () => {
  const stdout = [
    "Active Internet connections (only servers)",
    "Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name",
    "tcp        0      0 127.0.0.1:9999          0.0.0.0:20128           LISTEN      111/other",
    "tcp        0      0 127.0.0.1:20128         0.0.0.0:*               LISTEN      596922/node",
    "",
  ].join("\n");
  assert.equal(parseNetstatPid(stdout, 20128), 596922);
});

test("parseNetstatPid reads macOS process:pid output", () => {
  const stdout = "tcp4 0 0 127.0.0.1.20128 *.* LISTEN 0 0 131072 131072 node:596922 00100\n";
  assert.equal(parseNetstatPid(stdout, 20128), 596922);
});

test("parseNetstatPid ignores non-listening rows and unknown ports", () => {
  const stdout =
    "tcp        0      0 127.0.0.1:20128         1.2.3.4:5555            ESTABLISHED 596922/node\n";
  assert.equal(parseNetstatPid(stdout, 20128), null);
  assert.equal(parseNetstatPid("", 20128), null);
});

/**
 * Realistic `netstat -ano` sample from Windows 11 (#11236 bug 6): the pid is
 * the last whitespace-separated column and only exists on rows whose state is
 * LISTENING. This is the only pid probe available on a stock Windows host —
 * neither lsof nor ss nor net-tools `netstat -tlnp` exist there, so a Windows
 * service adopted by the supervisor reported `pid: null` while healthy.
 */
const WINDOWS_NETSTAT_ANO = [
  "Active Connections",
  "",
  "  Proto  Local Address          Foreign Address        State           PID",
  "  TCP    0.0.0.0:135            0.0.0.0:0              LISTENING       1244",
  "  TCP    0.0.0.0:20128          0.0.0.0:0              LISTENING       12345",
  "  TCP    127.0.0.1:8317         0.0.0.0:0              LISTENING       5678",
  "  TCP    192.168.1.10:52413     140.82.121.4:443       ESTABLISHED     9012",
  "  TCP    [::]:20128             [::]:0                 LISTENING       12345",
  "  UDP    0.0.0.0:5353           *:*                                    3460",
  "",
].join("\r\n");

test("parseWindowsNetstatPid reads the pid from a LISTENING row (#11236)", () => {
  assert.equal(parseWindowsNetstatPid(WINDOWS_NETSTAT_ANO, 20128), 12345);
  assert.equal(parseWindowsNetstatPid(WINDOWS_NETSTAT_ANO, 8317), 5678);
});

test("parseWindowsNetstatPid matches the local address, not the foreign one", () => {
  // 443 appears only as a foreign address on an ESTABLISHED row.
  assert.equal(parseWindowsNetstatPid(WINDOWS_NETSTAT_ANO, 443), null);
  // 5353 appears only on a UDP row, which has no LISTENING state.
  assert.equal(parseWindowsNetstatPid(WINDOWS_NETSTAT_ANO, 5353), null);
  // A port that shares a suffix with a listening one must not match: 0128 vs
  // 20128 — the `:` anchor on the local address prevents the partial hit.
  assert.equal(parseWindowsNetstatPid(WINDOWS_NETSTAT_ANO, 128), null);
  assert.equal(parseWindowsNetstatPid("", 20128), null);
});

test("resolvePortPid finds the pid holding a port", async () => {
  const server = createServer();
  await new Promise<void>((resolve) => server.listen(29994, "127.0.0.1", resolve));
  try {
    assert.equal(await resolvePortPid(29994), process.pid);
  } finally {
    await new Promise<void>((resolve) => server.close(() => resolve()));
  }
});

test("resolvePortPid returns null for a port nobody holds", async () => {
  assert.equal(await resolvePortPid(29993), null);
});

test("resolvePortPid still resolves a pid on a host without lsof", async (t) => {
  // The reported environment: ss and/or netstat present, lsof absent. Emulated
  // by pointing PATH at a directory holding only the fallbacks, so `spawn`
  // raises the same ENOENT for lsof that a slim image would.
  const fallbacks = ["ss", "netstat"]
    .map((command) => ({ command, real: which(command) }))
    .filter((entry): entry is { command: string; real: string } => entry.real !== null);

  if (fallbacks.length === 0) {
    t.skip("neither ss nor netstat is installed");
    return;
  }

  const shim = mkdtempSync(path.join(tmpdir(), "portprobe-"));
  const originalPath = process.env.PATH;
  const server = createServer();

  try {
    for (const { command, real } of fallbacks) {
      symlinkSync(real, path.join(shim, command));
    }

    // Guard the guard: if lsof were still reachable the assertion below would
    // pass for the wrong reason.
    assert.throws(
      () =>
        execFileSync("/bin/sh", ["-c", "command -v lsof"], {
          stdio: "ignore",
          env: { PATH: shim },
        }),
      "lsof must not resolve on the shimmed PATH"
    );

    process.env.PATH = shim;
    await new Promise<void>((resolve) => server.listen(29992, "127.0.0.1", resolve));
    assert.equal(await resolvePortPid(29992), process.pid);
  } finally {
    process.env.PATH = originalPath;
    await new Promise<void>((resolve) => server.close(() => resolve()));
    rmSync(shim, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("lsof probe table entry restricts to TCP listeners only (#14722)", () => {
  const lsof = PID_PROBES.find((p) => p.command === "lsof");
  assert.ok(lsof, "lsof probe must exist");
  assert.deepEqual(lsof.args(20128), ["-nP", "-t", "-iTCP:20128", "-sTCP:LISTEN"]);
});

test("resolvePortPid ignores connected clients and returns only the listener pid (#14722)", async (t) => {
  if (which("lsof") === null) {
    t.skip("lsof is not installed on this host");
    return;
  }

  const server = createServer();
  // Use port 0 to bind an ephemeral free port, avoiding hardcoded collision
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const port = (server.address() as { port: number }).port;

  const child = spawn(process.execPath, [
    "-e",
    `const s = require("node:net").connect(${port}, "127.0.0.1"); s.on("connect", () => { setTimeout(() => {}, 10000); });`,
  ]);

  try {
    await new Promise<void>((resolve) => {
      server.once("connection", () => resolve());
    });

    const resolved = await resolvePortPid(port);
    assert.equal(resolved, process.pid, "must return the server pid");
    assert.notEqual(resolved, child.pid, "must not return the client pid");
  } finally {
    try {
      child.kill("SIGKILL");
    } catch {}
    await new Promise<void>((resolve) => server.close(() => resolve()));
  }
});




