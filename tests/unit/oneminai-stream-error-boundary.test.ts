import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const fixturePath = fileURLToPath(
  new URL("../fixtures/oneminai-stream-error-boundary.fixture.ts", import.meta.url)
);

type ChildFailure = Error & {
  stdout?: string | Buffer;
  stderr?: string | Buffer;
};

test(
  "1min.ai stream-error boundary passes in an isolated persistence subprocess",
  { timeout: 180_000 },
  async () => {
    const originalDataDir = process.env.DATA_DIR;
    const originalPluginsDir = process.env.OMNIROUTE_PLUGINS_DIR;
    const originalFetch = globalThis.fetch;
    const testRoot = mkdtempSync(join(tmpdir(), "omniroute-onemin-stream-error-child-"));
    const testDataDir = join(testRoot, "data");
    const testPluginsDir = join(testRoot, "plugins");

    mkdirSync(testDataDir, { recursive: true });
    mkdirSync(testPluginsDir, { recursive: true });
    const childEnv: NodeJS.ProcessEnv = {
      APP_LOG_TO_FILE: "false",
      DATA_DIR: testDataDir,
      DISABLE_SQLITE_AUTO_BACKUP: "true",
      NODE_ENV: "test",
      OMNIROUTE_PLUGINS_DIR: testPluginsDir,
    };
    for (const name of ["PATH", "NODE_PATH", "LANG", "LC_ALL", "TZ", "TMPDIR"] as const) {
      const value = process.env[name];
      if (value !== undefined) childEnv[name] = value;
    }
    // A nested `node --test` must create its own runner context instead of
    // inheriting the parent's private reporter channel.
    delete childEnv.NODE_TEST_CONTEXT;

    try {
      let stdout = "";
      let stderr = "";
      try {
        const child = await execFileAsync(
          process.execPath,
          ["--import", "tsx/esm", "--test", "--test-concurrency=1", fixturePath],
          {
            cwd: process.cwd(),
            encoding: "utf8",
            env: childEnv,
            maxBuffer: 2 * 1024 * 1024,
            timeout: 170_000,
          }
        );
        stdout = child.stdout;
        stderr = child.stderr;
      } catch (error) {
        const failure = error as ChildFailure;
        assert.fail(
          [
            `isolated 1min.ai fixture failed: ${failure.message}`,
            failure.stdout ? String(failure.stdout) : "",
            failure.stderr ? String(failure.stderr) : "",
          ]
            .filter(Boolean)
            .join("\n")
        );
      }

      const childOutput = `${stdout}\n${stderr}`;
      assert.match(childOutput, /tests 8/);
      assert.match(childOutput, /pass 8/);
      assert.match(childOutput, /fail 0/);
      assert.doesNotMatch(childOutput, /not ok|failed to drain|stayed pending/i);
    } finally {
      rmSync(testRoot, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    }

    assert.equal(process.env.DATA_DIR, originalDataDir);
    assert.equal(process.env.OMNIROUTE_PLUGINS_DIR, originalPluginsDir);
    assert.equal(globalThis.fetch, originalFetch);
  }
);
