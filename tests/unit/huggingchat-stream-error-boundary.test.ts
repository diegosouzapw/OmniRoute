import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const REPO_ROOT = fileURLToPath(new URL("../..", import.meta.url));
const FIXTURE = fileURLToPath(
  new URL("./_fixtures/huggingchat-stream-error-boundary.fixture.ts", import.meta.url)
);
const SYNTHETIC_API_KEY_SECRET = "0".repeat(64);

type ChildResult = {
  code: number | null;
  signal: NodeJS.Signals | null;
  stdout: string;
  stderr: string;
};

function runFixture(testRoot: string): Promise<ChildResult> {
  const dataDir = join(testRoot, "data");
  const pluginsDir = join(testRoot, "plugins");
  // Keep config fallbacks inside the fixture root without inheriting or repurposing HOME.
  const xdgConfigDir = join(testRoot, "xdg-config");

  for (const dir of [dataDir, pluginsDir, xdgConfigDir]) {
    mkdirSync(dir, { recursive: true });
  }

  const childEnv: NodeJS.ProcessEnv = {
    API_KEY_SECRET: SYNTHETIC_API_KEY_SECRET,
    APP_LOG_TO_FILE: "false",
    DATA_DIR: dataDir,
    DISABLE_SQLITE_AUTO_BACKUP: "true",
    FORCE_COLOR: "0",
    LANG: "C.UTF-8",
    NODE_ENV: "test",
    OMNIROUTE_HUGGINGCHAT_TEST_ROOT: testRoot,
    OMNIROUTE_HUGGINGCHAT_TEST_RUN_ID: basename(testRoot),
    OMNIROUTE_PLUGINS_DIR: pluginsDir,
    TZ: "UTC",
    XDG_CONFIG_HOME: xdgConfigDir,
  };
  if (process.env.PATH) childEnv.PATH = process.env.PATH;

  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, ["--import", "tsx/esm", FIXTURE], {
      cwd: REPO_ROOT,
      env: childEnv,
      stdio: ["ignore", "pipe", "pipe"],
    });
    let stdout = "";
    let stderr = "";
    child.stdout.setEncoding("utf8").on("data", (chunk) => (stdout += chunk));
    child.stderr.setEncoding("utf8").on("data", (chunk) => (stderr += chunk));
    child.once("error", reject);
    child.once("close", (code, signal) => resolve({ code, signal, stdout, stderr }));
  });
}

function childDiagnostics(result: ChildResult): string {
  return [
    `exit=${String(result.code)} signal=${String(result.signal)}`,
    "--- stdout ---",
    result.stdout,
    "--- stderr ---",
    result.stderr,
  ].join("\n");
}

test("HuggingChat stream error boundaries stay isolated from shared DB and usage state", async () => {
  const testRoot = mkdtempSync(join(tmpdir(), "omniroute-huggingchat-boundary-child-"));
  try {
    const result = await runFixture(testRoot);
    assert.equal(result.signal, null, childDiagnostics(result));
    assert.equal(result.code, 0, childDiagnostics(result));
    assert.match(result.stdout, /(?:#|ℹ) pass 8\b/, childDiagnostics(result));
    assert.match(result.stdout, /(?:#|ℹ) fail 0\b/, childDiagnostics(result));
    assert.doesNotMatch(result.stdout + result.stderr, /super-secret/);
  } finally {
    rmSync(testRoot, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});
