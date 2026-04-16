import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { EventEmitter } from "node:events";
import { createRequire, syncBuiltinESMExports } from "node:module";

const require = createRequire(import.meta.url);
const childProcess = require("node:child_process");

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-version-manager-"));
const TEST_CONFIG_DIR = path.join(TEST_DATA_DIR, "cliproxyapi-config");
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.CLIPROXYAPI_CONFIG_DIR = TEST_CONFIG_DIR;

const coreDb = await import("../../src/lib/db/core.ts");
const versionManagerDb = await import("../../src/lib/db/versionManager.ts");
const processManager = await import("../../src/lib/versionManager/processManager.ts");
const versionManager = await import("../../src/lib/versionManager/index.ts");
const healthMonitor = await import("../../src/lib/versionManager/healthMonitor.ts");

const originalFetch = globalThis.fetch;
const originalSpawn = childProcess.spawn;
const originalProcessKill = process.kill;
const originalSetTimeout = globalThis.setTimeout;
const originalSetInterval = globalThis.setInterval;
const originalClearTimeout = globalThis.clearTimeout;
const originalClearInterval = globalThis.clearInterval;

async function resetStorage() {
  healthMonitor.stopMonitoring("cliproxyapi");
  coreDb.resetDbInstance();

  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      }
      break;
    } catch (error) {
      if ((error?.code === "EBUSY" || error?.code === "EPERM") && attempt < 9) {
        await new Promise((resolve) => setTimeout(resolve, 50 * (attempt + 1)));
      } else {
        throw error;
      }
    }
  }

  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  fs.mkdirSync(TEST_CONFIG_DIR, { recursive: true });
}

function installSpawnStub(startPid = 6100) {
  const calls = [];
  let nextPid = startPid;

  childProcess.spawn = (command, args, options) => {
    const child = new EventEmitter();
    child.pid = nextPid++;
    child.stdout = new EventEmitter();
    child.stderr = new EventEmitter();
    child.kill = () => true;
    calls.push({ command, args, options, child });
    return child;
  };
  syncBuiltinESMExports();

  return {
    calls,
    restore() {
      childProcess.spawn = originalSpawn;
      syncBuiltinESMExports();
    },
  };
}

function installProcessKillStub(initialRunning = []) {
  const running = new Set(initialRunning);
  const calls = [];

  process.kill = (pid, signal = 0) => {
    calls.push({ pid, signal });

    if (signal === 0 || signal === undefined) {
      if (running.has(pid)) {
        return true;
      }
      const error = new Error("ESRCH");
      error.code = "ESRCH";
      throw error;
    }

    if (signal === "SIGTERM" || signal === "SIGKILL") {
      running.delete(pid);
      return true;
    }

    return true;
  };

  return {
    calls,
    running,
    restore() {
      process.kill = originalProcessKill;
    },
  };
}

function installTimerStubs() {
  const timeouts = [];
  const intervals = [];

  globalThis.setTimeout = (fn, ms) => {
    const handle = {
      fn,
      ms,
      cleared: false,
      unrefCalled: false,
      unref() {
        this.unrefCalled = true;
        return this;
      },
    };
    timeouts.push(handle);
    return handle;
  };

  globalThis.setInterval = (fn, ms) => {
    const handle = {
      fn,
      ms,
      cleared: false,
      unrefCalled: false,
      unref() {
        this.unrefCalled = true;
        return this;
      },
    };
    intervals.push(handle);
    return handle;
  };

  globalThis.clearTimeout = (handle) => {
    if (handle) {
      handle.cleared = true;
    }
  };

  globalThis.clearInterval = (handle) => {
    if (handle) {
      handle.cleared = true;
    }
  };

  return {
    timeouts,
    intervals,
    restore() {
      globalThis.setTimeout = originalSetTimeout;
      globalThis.setInterval = originalSetInterval;
      globalThis.clearTimeout = originalClearTimeout;
      globalThis.clearInterval = originalClearInterval;
    },
  };
}

function installFetchStub() {
  const calls = [];

  globalThis.fetch = async (url, options = {}) => {
    calls.push({ url: String(url), options });

    if (String(url).includes("/v1/models")) {
      return new Response(JSON.stringify({ data: [{ id: "gpt-4.1" }, { id: "o3-mini" }] }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (String(url).includes("/releases/latest")) {
      return new Response(
        JSON.stringify({
          tag_name: "v2.0.0",
          assets: [],
          published_at: "2026-04-06T00:00:00Z",
          body: "Latest release",
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };

  return {
    calls,
    restore() {
      globalThis.fetch = originalFetch;
    },
  };
}

async function seedTool(overrides = {}) {
  return versionManagerDb.upsertVersionManagerTool({
    tool: "cliproxyapi",
    installedVersion: "2.0.0",
    binaryPath: path.join(TEST_DATA_DIR, "bin", "cliproxyapi"),
    status: "installed",
    port: 8317,
    ...overrides,
  });
}

async function prepareInstalledVersions(versions) {
  const binDir = path.join(TEST_DATA_DIR, "bin");
  fs.mkdirSync(binDir, { recursive: true });

  for (const version of versions) {
    const versionDir = path.join(binDir, `cliproxyapi-${version}`);
    fs.mkdirSync(versionDir, { recursive: true });
    fs.writeFileSync(path.join(versionDir, "CLIProxyAPI"), "#!/bin/sh\necho ok\n");
  }

  const symlinkPath = path.join(binDir, "cliproxyapi");
  try {
    fs.unlinkSync(symlinkPath);
  } catch {}
  fs.symlinkSync(path.join(binDir, "cliproxyapi-2.0.0", "CLIProxyAPI"), symlinkPath);
}

async function flushAsyncTurns(count = 3) {
  for (let i = 0; i < count; i++) {
    await Promise.resolve();
  }
}

test.beforeEach(async () => {
  await resetStorage();
});

test.afterEach(() => {
  healthMonitor.stopMonitoring("cliproxyapi");
  childProcess.spawn = originalSpawn;
  process.kill = originalProcessKill;
  globalThis.fetch = originalFetch;
  globalThis.setTimeout = originalSetTimeout;
  globalThis.setInterval = originalSetInterval;
  globalThis.clearTimeout = originalClearTimeout;
  globalThis.clearInterval = originalClearInterval;
  syncBuiltinESMExports();
});

test.after(async () => {
  await resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("processManager reuses an alive persisted pid without spawning a new process", async () => {
  await seedTool({ pid: 4321, port: 8450, status: "running" });
  const spawnStub = installSpawnStub();
  const killStub = installProcessKillStub([4321]);

  try {
    const result = await processManager.startProcess("/tmp/cli-proxy-api");

    assert.deepEqual(result, { pid: 4321, port: 8450 });
    assert.equal(spawnStub.calls.length, 0);
    assert.deepEqual(killStub.calls, [{ pid: 4321, signal: 0 }]);
  } finally {
    spawnStub.restore();
    killStub.restore();
  }
});

test("processManager writes config, starts a process, stops it gracefully and reports process info", async () => {
  await seedTool({ pid: null, status: "installed" });
  const spawnStub = installSpawnStub(5100);
  const killStub = installProcessKillStub();
  const timers = installTimerStubs();

  try {
    const result = await processManager.startProcess(
      "/tmp/cli-proxy-api",
      8401,
      path.join(TEST_CONFIG_DIR, "custom")
    );

    assert.deepEqual(result, { pid: 5100, port: 8401 });
    assert.equal(spawnStub.calls.length, 1);
    assert.equal(spawnStub.calls[0].command, "/tmp/cli-proxy-api");
    assert.deepEqual(spawnStub.calls[0].args, [
      "-c",
      path.join(TEST_CONFIG_DIR, "custom", "config.yaml"),
    ]);

    const config = fs.readFileSync(path.join(TEST_CONFIG_DIR, "custom", "config.yaml"), "utf8");
    assert.match(config, /port: 8401/);
    assert.match(config, /host: 127\.0\.0\.1/);

    const persisted = await versionManagerDb.getVersionManagerTool("cliproxyapi");
    assert.equal(persisted.status, "running");
    assert.equal(persisted.pid, 5100);

    killStub.running.add(5100);
    killStub.running.add(process.pid);
    const stopPromise = processManager.stopProcess(5100);
    await timers.intervals.find((handle) => handle.ms === 200).fn();
    await stopPromise;

    assert.deepEqual(
      killStub.calls.filter((call) => call.signal !== 0),
      [{ pid: 5100, signal: "SIGTERM" }]
    );

    const info = await processManager.getProcessInfo(process.pid);
    assert.equal(info.pid, process.pid);
    assert.equal(info.alive, true);
    if (process.platform === "linux") {
      assert.ok(info.memoryUsage > 0);
    }
  } finally {
    timers.restore();
    spawnStub.restore();
    killStub.restore();
  }
});

test("versionManager start, health, restart and stop flow updates monitoring and persisted state", async () => {
  await seedTool({ pid: null, port: 8511, status: "installed" });
  const spawnStub = installSpawnStub(6200);
  const killStub = installProcessKillStub();
  const fetchStub = installFetchStub();

  try {
    const started = await versionManager.startTool("cliproxyapi");
    assert.deepEqual(
      {
        pid: started.pid,
        port: started.port,
        healthy: started.health.healthy,
        modelCount: started.health.modelCount,
      },
      { pid: 6200, port: 8511, healthy: true, modelCount: 2 }
    );
    assert.equal(healthMonitor.isMonitoring("cliproxyapi"), true);

    const health = await versionManager.getToolHealth("cliproxyapi");
    assert.equal(health.healthy, true);
    assert.equal(health.modelCount, 2);

    killStub.running.add(started.pid);
    const restarted = await versionManager.restartTool("cliproxyapi");

    assert.deepEqual(restarted, { pid: 6201, port: 8511 });
    assert.equal(healthMonitor.isMonitoring("cliproxyapi"), true);

    killStub.running.add(restarted.pid);
    await versionManager.stopTool("cliproxyapi");

    const stopped = await versionManagerDb.getVersionManagerTool("cliproxyapi");
    assert.equal(stopped.status, "stopped");
    assert.equal(healthMonitor.isMonitoring("cliproxyapi"), false);
    assert.ok(fetchStub.calls.some((call) => call.url.includes("/v1/models")));
  } finally {
    fetchStub.restore();
    spawnStub.restore();
    killStub.restore();
  }
});

test("versionManager checks releases, persists pinning and rolls back to a previous version", async () => {
  await prepareInstalledVersions(["2.0.0", "1.0.0"]);
  await seedTool({
    installedVersion: "2.0.0",
    port: 8522,
    status: "running",
    pid: 7300,
  });

  const spawnStub = installSpawnStub(7301);
  const killStub = installProcessKillStub([7300]);
  const fetchStub = installFetchStub();

  try {
    const updateCheck = await versionManager.checkForUpdates("cliproxyapi");
    assert.deepEqual(updateCheck, {
      current: "2.0.0",
      latest: "2.0.0",
      updateAvailable: false,
    });

    await versionManager.pinVersion("cliproxyapi", "1.9.0");
    assert.equal(
      (await versionManagerDb.getVersionManagerTool("cliproxyapi")).pinnedVersion,
      "1.9.0"
    );

    await versionManager.unpinVersion("cliproxyapi");
    assert.equal((await versionManagerDb.getVersionManagerTool("cliproxyapi")).pinnedVersion, null);

    await versionManagerDb.updateVersionManagerTool("cliproxyapi", { installedVersion: "1.0.0" });
    const secondUpdateCheck = await versionManager.checkForUpdates("cliproxyapi");
    assert.deepEqual(secondUpdateCheck, {
      current: "1.0.0",
      latest: "2.0.0",
      updateAvailable: true,
    });

    await versionManagerDb.updateVersionManagerTool("cliproxyapi", { installedVersion: "2.0.0" });
    const rolledBack = await versionManager.rollbackTool("cliproxyapi");

    assert.equal(rolledBack, "1.0.0");
    assert.equal(
      (await versionManagerDb.getVersionManagerTool("cliproxyapi")).installedVersion,
      "1.0.0"
    );
    assert.ok(spawnStub.calls.length >= 1);
    assert.ok(fetchStub.calls.some((call) => call.url.includes("/releases/latest")));
  } finally {
    fetchStub.restore();
    spawnStub.restore();
    killStub.restore();
  }
});
