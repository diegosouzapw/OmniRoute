import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import test from "node:test";

const repoRoot = fileURLToPath(new URL("../../", import.meta.url));
const fixturePath = fileURLToPath(
  new URL("../fixtures/zed-hosted-stream-error-boundary-child.ts", import.meta.url)
);

type FixtureResult = {
  code: number | null;
  signal: NodeJS.Signals | null;
  stdout: string;
  stderr: string;
};

function runFixture(): Promise<FixtureResult> {
  // Keep the parent process pristine: the fast unit suite can run files with
  // --test-isolation=none, so all stateful imports and mutations live in the child.
  const childEnv: NodeJS.ProcessEnv = {
    PATH: process.env.PATH,
    NODE_PATH: process.env.NODE_PATH,
    LANG: process.env.LANG,
    LC_ALL: process.env.LC_ALL,
    TZ: process.env.TZ,
    TMPDIR: process.env.TMPDIR,
    NODE_ENV: "test",
    API_KEY_SECRET: "zed-boundary-test-only-secret-with-32-plus-characters",
    DISABLE_SQLITE_AUTO_BACKUP: "true",
    NO_COLOR: "1",
  };
  // Inheriting this marker makes Node silently skip the nested --test run.
  delete childEnv.NODE_TEST_CONTEXT;

  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, ["--import", "tsx/esm", "--test", fixturePath], {
      cwd: repoRoot,
      env: childEnv,
      stdio: ["ignore", "pipe", "pipe"],
    });
    let stdout = "";
    let stderr = "";
    let timedOut = false;

    child.stdout.setEncoding("utf8");
    child.stderr.setEncoding("utf8");
    child.stdout.on("data", (chunk: string) => {
      stdout += chunk;
    });
    child.stderr.on("data", (chunk: string) => {
      stderr += chunk;
    });

    const timeout = setTimeout(() => {
      timedOut = true;
      child.kill("SIGKILL");
    }, 120_000);

    child.once("error", (error) => {
      clearTimeout(timeout);
      reject(error);
    });
    child.once("close", (code, signal) => {
      clearTimeout(timeout);
      if (timedOut) {
        reject(new Error("Zed stream error boundary fixture timed out after 120 seconds"));
        return;
      }
      resolve({ code, signal, stdout, stderr });
    });
  });
}

test("Zed stream error boundary passes in a process-isolated runtime", async () => {
  const result = await runFixture();
  const output = `${result.stdout}\n${result.stderr}`;

  assert.equal(result.signal, null, output.slice(-12_000));
  assert.equal(result.code, 0, output.slice(-12_000));
  assert.match(output, /(?:^|\s)tests\s+3(?:\s|$)/m);
  assert.match(output, /(?:^|\s)pass\s+3(?:\s|$)/m);
  assert.match(output, /(?:^|\s)fail\s+0(?:\s|$)/m);
});
