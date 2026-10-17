import assert from "node:assert/strict";
import { spawn, spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

assert.equal(process.env.GITHUB_ACTIONS, "true", "Managed runtime verification is hosted-only");
const project = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const artifacts = path.join(project, "_artifacts");
fs.mkdirSync(artifacts, { recursive: true });
const root = fs.mkdtempSync(path.join(artifacts, "managed-runtime-"));
const env = {};
for (const key of ["PATH", "SystemRoot", "WINDIR", "PATHEXT", "COMSPEC"])
  if (process.env[key]) env[key] = process.env[key];
Object.assign(env, {
  CI: "true",
  GITHUB_ACTIONS: "true",
  NODE_ENV: "test",
  NO_COLOR: "1",
  HOOKMAKER_MAX_TEST_WORKERS: "1",
  MANAGED_PROXY_FIXTURE_ROOT: root,
  STORAGE_ENCRYPTION_KEY: "synthetic-managed-fixture-key",
  DISABLE_SQLITE_AUTO_BACKUP: "true",
});
for (const key of [
  "DATA_DIR",
  "HOME",
  "USERPROFILE",
  "APPDATA",
  "LOCALAPPDATA",
  "TEMP",
  "TMP",
  "XDG_CONFIG_HOME",
  "XDG_CACHE_HOME",
  "XDG_DATA_HOME",
]) {
  env[key] = path.join(root, key.toLowerCase());
  fs.mkdirSync(env[key], { recursive: true });
}
env.SQLITE_FILE = env.OMNIROUTE_SQLITE_FILE = path.join(env.DATA_DIR, "storage.sqlite");

let cleanupVerified = true;
async function waitForExit(pid) {
  const deadline = Date.now() + 5000;
  while (Date.now() < deadline) {
    try {
      process.kill(pid, 0);
    } catch (error) {
      if (error.code === "ESRCH") return;
      throw error;
    }
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
  throw new Error("Owned synthetic child did not exit after termination");
}
async function sweepFixtureChildren() {
  let survivors = 0;
  for (const name of fs.readdirSync(root).filter((file) => /^child-\d+\.json$/.test(file))) {
    const record = JSON.parse(fs.readFileSync(path.join(root, name), "utf8"));
    assert.ok(record.startedAt && Number.isInteger(record.pid));
    try {
      process.kill(record.pid, 0);
      // Verify executable arguments before touching a potentially recycled PID.
      const inspected =
        process.platform === "win32"
          ? spawnSync(
              "pwsh",
              [
                "-NoProfile",
                "-Command",
                "$p=Get-CimInstance Win32_Process -Filter ('ProcessId=' + $env.FIXTURE_PID); if($p){ $p.CommandLine; $p.CreationDate.ToUniversalTime().ToString('o') }",
              ],
              {
                env: { ...env, FIXTURE_PID: String(record.pid) },
                encoding: "utf8",
                timeout: 5000,
                windowsHide: true,
              }
            )
          : spawnSync("ps", ["-p", String(record.pid), "-o", "args="], {
              encoding: "utf8",
              timeout: 5000,
            });
      assert.equal(inspected.status, 0, "Cannot verify owned child survivor");
      assert.ok(
        inspected.stdout.includes("managedProxyChild.mjs"),
        "PID no longer belongs to fixture"
      );
      if (process.platform === "win32") {
        const created = Date.parse(inspected.stdout.trim().split(/\r?\n/).at(-1));
        assert.ok(
          created <= Date.parse(record.startedAt) && Date.parse(record.startedAt) - created < 30000,
          "PID creation time does not match fixture"
        );
      }
      survivors++;
      process.kill(record.pid, "SIGKILL");
      await waitForExit(record.pid);
    } catch (error) {
      if (error.code !== "ESRCH") throw error;
    }
  }
  assert.equal(survivors, 0, "Owned synthetic children survived test cleanup and were terminated");
}

async function run(args) {
  const child = spawn(process.execPath, args, {
    cwd: project,
    env,
    stdio: ["ignore", "pipe", "pipe"],
    windowsHide: true,
    // Own the complete POSIX test tree, not only the runner.
    detached: process.platform !== "win32",
  });
  let timedOut = false;
  let idle;
  const kill = () => {
    timedOut = true;
    if (process.platform === "win32") {
      spawnSync("taskkill", ["/PID", String(child.pid), "/T", "/F"], {
        windowsHide: true,
        timeout: 10000,
        stdio: "ignore",
      });
    } else {
      try {
        process.kill(-child.pid, "SIGKILL");
      } catch (error) {
        if (error.code !== "ESRCH") throw error;
      }
    }
  };
  const progress = () => {
    clearTimeout(idle);
    idle = setTimeout(kill, 45000);
  };
  for (const [stream, output] of [
    [child.stdout, process.stdout],
    [child.stderr, process.stderr],
  ])
    stream.on("data", (chunk) => {
      progress();
      output.write(chunk);
    });
  progress();
  const wall = setTimeout(kill, 120000);
  try {
    const code = await new Promise((resolve, reject) => {
      child.once("error", reject);
      child.once("close", resolve);
    });
    assert.ok(!timedOut, "Managed runtime command exceeded wall/idle bound");
    assert.equal(code, 0, "Managed runtime command failed");
  } finally {
    clearTimeout(idle);
    clearTimeout(wall);
    if (process.platform !== "win32" && child.pid) {
      try {
        process.kill(-child.pid, "SIGKILL");
      } catch (error) {
        if (error.code !== "ESRCH") throw error;
      }
    }
    try {
      await sweepFixtureChildren();
    } catch (error) {
      cleanupVerified = false;
      throw error;
    }
  }
}

try {
  const nodeFiles = fs
    .readdirSync(path.join(project, "tests/unit"))
    .filter((name) => /^managedProxy.*\.test\.ts$/.test(name))
    .sort();
  assert.deepEqual(nodeFiles, [
    "managedProxyArchive.test.ts",
    "managedProxyConfig.test.ts",
    "managedProxyManager.test.ts",
  ]);
  await run([
    "--import",
    "tsx/esm",
    "--test",
    "--test-concurrency=1",
    "--test-timeout=20000",
    ...nodeFiles.map((name) => `tests/unit/${name}`),
  ]);
  const uiFiles = fs
    .readdirSync(path.join(project, "tests/unit"))
    .filter((name) => /^managedProxy.*\.test\.tsx$/.test(name))
    .sort();
  assert.deepEqual(uiFiles, [
    "managedProxyAuth.test.tsx",
    "managedProxyLifecycle.test.tsx",
    "managedProxyRemoval.test.tsx",
    "managedProxyUi.test.tsx",
  ]);
  await run([
    "node_modules/vitest/vitest.mjs",
    "run",
    "--config",
    "vitest.config.ts",
    ...uiFiles.map((name) => `tests/unit/${name}`),
    "--maxWorkers=1",
    "--maxConcurrency=1",
    "--no-file-parallelism",
    "--testTimeout=15000",
    "--hookTimeout=15000",
    "--retry=0",
  ]);
} finally {
  if (cleanupVerified) fs.rmSync(root, { recursive: true, force: true });
  else console.error("Managed fixture diagnostics retained because cleanup was not verified");
}
