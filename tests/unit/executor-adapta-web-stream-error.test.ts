import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const FIXTURE = fileURLToPath(
  new URL("../fixtures/adapta-web-stream-error-boundary.fixture.ts", import.meta.url)
);
const REPO_ROOT = fileURLToPath(new URL("../..", import.meta.url));
const SYNTHETIC_API_KEY_SECRET =
  "adapta-stream-boundary-test-secret-00000000000000000000000000000000";

type FixtureResult = {
  code: number | null;
  signal: NodeJS.Signals | null;
  stdout: string;
  stderr: string;
};

function runIsolatedFixture(testRoot: string): Promise<FixtureResult> {
  const dataDir = path.join(testRoot, "data");
  const pluginsDir = path.join(testRoot, "plugins");
  fs.mkdirSync(dataDir, { recursive: true });
  fs.mkdirSync(pluginsDir, { recursive: true });

  const childEnv: NodeJS.ProcessEnv = {
    PATH: process.env.PATH,
    NODE_PATH: process.env.NODE_PATH,
    LANG: process.env.LANG ?? "C.UTF-8",
    LC_ALL: process.env.LC_ALL,
    TZ: process.env.TZ ?? "UTC",
    TMPDIR: process.env.TMPDIR ?? os.tmpdir(),
    NODE_ENV: "test",
    APP_LOG_TO_FILE: "false",
    API_KEY_SECRET: SYNTHETIC_API_KEY_SECRET,
    DATA_DIR: dataDir,
    OMNIROUTE_PLUGINS_DIR: pluginsDir,
  };
  delete childEnv.NODE_TEST_CONTEXT;

  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, ["--import", "tsx/esm", "--test", FIXTURE], {
      cwd: REPO_ROOT,
      env: childEnv,
      stdio: ["ignore", "pipe", "pipe"],
      timeout: 90_000,
    });
    let stdout = "";
    let stderr = "";
    child.stdout.setEncoding("utf8").on("data", (chunk: string) => {
      stdout += chunk;
    });
    child.stderr.setEncoding("utf8").on("data", (chunk: string) => {
      stderr += chunk;
    });
    child.once("error", reject);
    child.once("close", (code, signal) => resolve({ code, signal, stdout, stderr }));
  });
}

test("Adapta stream errors are sanitized in an isolated executor fixture", async () => {
  const testRoot = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-adapta-boundary-parent-"));
  const originalDataDir = process.env.DATA_DIR;
  const originalPluginsDir = process.env.OMNIROUTE_PLUGINS_DIR;
  const originalFetch = globalThis.fetch;
  const eventBusOwner = globalThis as { __omnirouteEventBus?: unknown };
  const originalEventBus = eventBusOwner.__omnirouteEventBus;

  try {
    const result = await runIsolatedFixture(testRoot);
    assert.equal(
      result.code,
      0,
      `isolated Adapta fixture failed (signal=${result.signal ?? "none"})\n` +
        `stdout:\n${result.stdout}\nstderr:\n${result.stderr}`
    );
    assert.equal(result.signal, null);
    assert.match(result.stdout, /ℹ tests 1/);
    assert.match(result.stdout, /ℹ pass 1/);
    assert.match(result.stdout, /ℹ fail 0/);
    assert.doesNotMatch(result.stdout + result.stderr, new RegExp(SYNTHETIC_API_KEY_SECRET));

    assert.equal(process.env.DATA_DIR, originalDataDir);
    assert.equal(process.env.OMNIROUTE_PLUGINS_DIR, originalPluginsDir);
    assert.equal(globalThis.fetch, originalFetch);
    assert.equal(
      eventBusOwner.__omnirouteEventBus,
      originalEventBus,
      "the subprocess fixture must not replace the parent event bus singleton"
    );
  } finally {
    fs.rmSync(testRoot, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});
