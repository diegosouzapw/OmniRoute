import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import fsSync from "node:fs";
import os from "node:os";
import path from "node:path";
import { EventEmitter } from "node:events";
import { PassThrough } from "node:stream";
import { createRequire, syncBuiltinESMExports } from "node:module";
import { pathToFileURL } from "node:url";
import { promisify } from "node:util";

const require = createRequire(import.meta.url);
const childProcess = require("node:child_process");
const modulePath = path.join(process.cwd(), "src/lib/cloudflaredTunnel.ts");

const originalSpawn = childProcess.spawn;
const originalExecFile = childProcess.execFile;
const originalProcessKill = process.kill;
const originalEnv = { ...process.env };

const tempDirs = new Set();

async function importFresh(label) {
  return import(`${pathToFileURL(modulePath).href}?case=${label}-${Date.now()}-${Math.random()}`);
}

function restoreEnv() {
  for (const key of Object.keys(process.env)) {
    if (!(key in originalEnv)) delete process.env[key];
  }
  Object.assign(process.env, originalEnv);
}

async function createCloudflaredDataDir(prefix) {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), prefix));
  tempDirs.add(dir);
  return dir;
}

async function readJsonFileWithRetry(filePath, attempts = 100) {
  const parseJsonSnapshot = (content) => {
    const trimmed = String(content || "").trim();
    if (!trimmed) {
      throw new SyntaxError("Empty JSON payload");
    }

    try {
      return JSON.parse(trimmed);
    } catch (error: any) {
      const snapshots = trimmed
        .split(/\n(?=\{)/)
        .map((entry) => entry.trim())
        .filter(Boolean);

      for (let index = snapshots.length - 1; index >= 0; index -= 1) {
        try {
          return JSON.parse(snapshots[index]);
        } catch {
          // Keep trying older complete snapshots.
        }
      }

      throw error;
    }
  };

  let lastError;
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      return parseJsonSnapshot(await fs.readFile(filePath, "utf8"));
    } catch (error: any) {
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
  }
  throw lastError;
}

function createFakeChild(pid) {
  const child = new EventEmitter();
  child.stdout = new PassThrough();
  child.stderr = new PassThrough();
  child.pid = pid;
  child.killed = false;
  child.kill = (signal) => {
    child.killed = true;
    child.emit("kill", signal);
    return true;
  };
  child.once = child.once.bind(child);
  child.on = child.on.bind(child);
  return child;
}

test.afterEach(async () => {
  childProcess.spawn = originalSpawn;
  childProcess.execFile = originalExecFile;
  process.kill = originalProcessKill;
  syncBuiltinESMExports();
  restoreEnv();

  for (const dir of tempDirs) {
    await fs.rm(dir as any, { recursive: true, force: true });
  }
  tempDirs.clear();
});

test("getCloudflaredRuntimeDirs and status resolve a managed binary from the data dir", async () => {
  const dataDir = await createCloudflaredDataDir("omniroute-cloudflared-managed-");
  const binaryPath = path.join(
    dataDir,
    "cloudflared",
    "bin",
    process.platform === "win32" ? "cloudflared.exe" : "cloudflared"
  );
  process.env.DATA_DIR = dataDir;

  await fs.mkdir(path.dirname(binaryPath), { recursive: true });
  await fs.writeFile(binaryPath, "#!/bin/sh\necho cloudflared\n", { mode: 0o755 });

  const tunnel = await importFresh("managed-status");
  const runtimeDirs = tunnel.getCloudflaredRuntimeDirs();
  const status = await tunnel.getCloudflaredTunnelStatus();

  assert.equal(runtimeDirs.runtimeRoot, path.join(dataDir, "cloudflared", "runtime"));
  assert.equal(runtimeDirs.homeDir, path.join(runtimeDirs.runtimeRoot, "home"));
  assert.equal(runtimeDirs.configDir, path.join(runtimeDirs.runtimeRoot, "config"));
  assert.equal(runtimeDirs.tempDir, path.join(runtimeDirs.runtimeRoot, "tmp"));

  assert.equal(status.installed, true);
  assert.equal(status.managedInstall, true);
  assert.equal(status.installSource, "managed");
  assert.equal(status.binaryPath, binaryPath);
  assert.equal(status.phase, "stopped");
  assert.equal(status.running, false);
});

test("getCloudflaredTunnelStatus resolves a PATH-installed binary when no managed install exists", async () => {
  const dataDir = await createCloudflaredDataDir("omniroute-cloudflared-path-");
  process.env.DATA_DIR = dataDir;
  delete process.env.CLOUDFLARED_BIN;
  const lookupCommand = process.platform === "win32" ? "where" : "which";
  const pathBinary =
    process.platform === "win32" ? "C:\\Tools\\cloudflared.exe" : "/usr/local/bin/cloudflared";

  childProcess.execFile = (command, args, options, callback) => {
    const cb = typeof options === "function" ? options : callback;
    assert.equal(command, lookupCommand);
    assert.deepEqual(args, ["cloudflared"]);
    cb(null, `${pathBinary}\n`, "");
  };
  childProcess.execFile[promisify.custom] = async (command, args) => {
    assert.equal(command, lookupCommand);
    assert.deepEqual(args, ["cloudflared"]);
    return { stdout: `${pathBinary}\n`, stderr: "" };
  };
  syncBuiltinESMExports();

  const tunnel = await importFresh("path-status");
  const status = await tunnel.getCloudflaredTunnelStatus();

  assert.equal(status.installed, true);
  assert.equal(status.managedInstall, false);
  assert.equal(status.installSource, "path");
  assert.equal(status.binaryPath, pathBinary);
  assert.equal(status.phase, "stopped");
});

test("getCloudflaredTunnelStatus reports a starting tunnel while the spawned pid is alive", async () => {
  const dataDir = await createCloudflaredDataDir("omniroute-cloudflared-starting-");
  const binaryPath = path.join(dataDir, "bin", "cloudflared");
  const stateDir = path.join(dataDir, "cloudflared");
  process.env.DATA_DIR = dataDir;
  process.env.CLOUDFLARED_BIN = binaryPath;

  await fs.mkdir(path.dirname(binaryPath), { recursive: true });
  await fs.writeFile(binaryPath, "#!/bin/sh\necho cloudflared\n", { mode: 0o755 });
  await fs.mkdir(stateDir, { recursive: true });
  await fs.writeFile(
    path.join(stateDir, "quick-tunnel-state.json"),
    JSON.stringify(
      {
        binaryPath,
        installSource: "env",
        ownerPid: process.pid,
        pid: 43210,
        publicUrl: null,
        apiUrl: null,
        targetUrl: "http://127.0.0.1:30128",
        status: "starting",
        lastError: null,
      },
      null,
      2
    ) + "\n",
    "utf8"
  );
  await fs.writeFile(path.join(stateDir, ".quick-tunnel.pid"), "43210", "utf8");

  process.kill = (pid, signal) => {
    if (signal === 0 && pid === 43210) return true;
    throw Object.assign(new Error("missing"), { code: "ESRCH" });
  };

  const tunnel = await importFresh("starting-status");
  const status = await tunnel.getCloudflaredTunnelStatus();

  assert.equal(status.running, true);
  assert.equal(status.pid, 43210);
  assert.equal(status.phase, "starting");
  assert.equal(status.publicUrl, null);
  assert.equal(status.targetUrl, "http://127.0.0.1:30128");
});

test("startCloudflaredTunnel reaches running state and stopCloudflaredTunnel clears persisted runtime state", async () => {
  const dataDir = await createCloudflaredDataDir("omniroute-cloudflared-run-");
  const binaryPath = path.join(
    dataDir,
    "cloudflared",
    "bin",
    process.platform === "win32" ? "cloudflared.exe" : "cloudflared"
  );
  process.env.DATA_DIR = dataDir;
  process.env.API_PORT = "24128";

  await fs.mkdir(path.dirname(binaryPath), { recursive: true });
  await fs.writeFile(binaryPath, "#!/bin/sh\necho cloudflared\n", { mode: 0o755 });

  const alive = new Set();
  const killCalls = [];
  const spawnCalls = [];

  process.kill = (pid, signal) => {
    if (signal === 0) {
      if (alive.has(pid)) return true;
      throw Object.assign(new Error("missing"), { code: "ESRCH" });
    }

    killCalls.push({ pid, signal });
    alive.delete(pid);
    return true;
  };

  childProcess.spawn = (command, args, options) => {
    const child = createFakeChild(41001);
    spawnCalls.push({ command, args, options });
    alive.add(child.pid);

    child.kill = (signal) => {
      child.killed = true;
      alive.delete(child.pid);
      child.emit("kill", signal);
      return true;
    };

    setTimeout(() => {
      child.stdout.write(
        Buffer.from("INF Visit https://violet-cloud.trycloudflare.com to inspect the tunnel\n")
      );
    }, 25);

    return child;
  };
  syncBuiltinESMExports();

  const tunnel = await importFresh("start-stop");
  const started = await tunnel.startCloudflaredTunnel();
  const statePath = path.join(dataDir, "cloudflared", "quick-tunnel-state.json");
  const logPath = path.join(dataDir, "cloudflared", "quick-tunnel.log");
  const startedState = await readJsonFileWithRetry(statePath);

  assert.equal(spawnCalls.length, 1);
  assert.equal(spawnCalls[0].command, binaryPath);
  assert.deepEqual(spawnCalls[0].args, [
    "tunnel",
    "--url",
    "http://127.0.0.1:24128",
    "--no-autoupdate",
  ]);
  assert.equal(
    spawnCalls[0].options.env.HOME,
    path.join(dataDir, "cloudflared", "runtime", "home")
  );
  assert.equal(started.phase, "running");
  assert.equal(started.running, true);
  assert.equal(started.publicUrl, "https://violet-cloud.trycloudflare.com");
  assert.equal(started.apiUrl, "https://violet-cloud.trycloudflare.com/v1");
  assert.equal(started.targetUrl, "http://127.0.0.1:24128");
  assert.equal(startedState.status, "running");
  assert.equal(startedState.publicUrl, "https://violet-cloud.trycloudflare.com");
  assert.match(await fs.readFile(logPath, "utf8"), /violet-cloud\.trycloudflare\.com/);

  const stopped = await tunnel.stopCloudflaredTunnel();
  const stoppedState = await readJsonFileWithRetry(statePath);

  assert.equal(stopped.running, false);
  assert.equal(stopped.phase, "stopped");
  assert.equal(stopped.publicUrl, null);
  assert.equal(stoppedState.status, "stopped");
  assert.equal(stoppedState.publicUrl, null);
  assert.ok(
    killCalls.some((entry) => entry.pid === 41001 && entry.signal === "SIGTERM"),
    "expected stop to signal SIGTERM to the child pid"
  );
});

test("startCloudflaredTunnel records an error state when the child exits before a public tunnel URL is available", async () => {
  const dataDir = await createCloudflaredDataDir("omniroute-cloudflared-error-");
  const binaryPath = path.join(dataDir, "bin", "cloudflared");
  process.env.DATA_DIR = dataDir;
  process.env.CLOUDFLARED_BIN = binaryPath;

  await fs.mkdir(path.dirname(binaryPath), { recursive: true });
  await fs.writeFile(binaryPath, "#!/bin/sh\necho cloudflared\n", { mode: 0o755 });

  const alive = new Set();
  process.kill = (pid, signal) => {
    if (signal === 0) {
      if (alive.has(pid)) return true;
      throw Object.assign(new Error("missing"), { code: "ESRCH" });
    }

    alive.delete(pid);
    return true;
  };

  childProcess.spawn = () => {
    const child = createFakeChild(41002);
    alive.add(child.pid);
    setTimeout(() => {
      child.stderr.write(
        Buffer.from(
          'ERR failed to request quick Tunnel: Post "https://api.trycloudflare.com/tunnel": tls: failed to verify certificate: x509: certificate signed by unknown authority\n'
        )
      );
      alive.delete(child.pid);
      setTimeout(() => {
        child.emit("exit", 1, null);
      }, 5);
    }, 25);
    return child;
  };
  syncBuiltinESMExports();

  const tunnel = await importFresh("stderr-error");

  await assert.rejects(
    () => tunnel.startCloudflaredTunnel(),
    /(cloudflared exited before tunnel URL was ready \(1\)|certificate signed by unknown authority)/
  );

  const state = await readJsonFileWithRetry(
    path.join(dataDir, "cloudflared", "quick-tunnel-state.json")
  );

  assert.equal(state.status, "error");
  assert.match(
    state.lastError,
    /(certificate signed by unknown authority|cloudflared exited (unexpectedly|before tunnel URL was ready) \(1\))/
  );
});

test("startCloudflaredTunnel fails fast when the spawned child has no pid", async () => {
  const dataDir = await createCloudflaredDataDir("omniroute-cloudflared-nopid-");
  const binaryPath = path.join(dataDir, "bin", "cloudflared");
  process.env.DATA_DIR = dataDir;
  process.env.CLOUDFLARED_BIN = binaryPath;

  await fs.mkdir(path.dirname(binaryPath), { recursive: true });
  await fs.writeFile(binaryPath, "#!/bin/sh\necho cloudflared\n", { mode: 0o755 });

  childProcess.spawn = () => {
    const child = createFakeChild(undefined);
    child.pid = undefined;
    return child;
  };
  syncBuiltinESMExports();

  const tunnel = await importFresh("missing-pid");

  await assert.rejects(() => tunnel.startCloudflaredTunnel(), /cloudflared failed to start/);
});
