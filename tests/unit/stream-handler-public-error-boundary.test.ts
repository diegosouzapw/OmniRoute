import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import test from "node:test";

const REPO_ROOT = fileURLToPath(new URL("../..", import.meta.url));
const FIXTURE = fileURLToPath(
  new URL("../fixtures/stream-handler-public-error-boundary.fixture.ts", import.meta.url)
);

const CHILD_RUNTIME_ENV_KEYS = [
  "PATH",
  "TMPDIR",
  "TMP",
  "TEMP",
  "SystemRoot",
  "ComSpec",
  "PATHEXT",
  "LANG",
  "LC_ALL",
  "TZ",
] as const;

function buildFixtureEnv(): NodeJS.ProcessEnv {
  const env: NodeJS.ProcessEnv = {
    NODE_ENV: "test",
    APP_LOG_TO_FILE: "false",
    API_KEY_SECRET: "stream-handler-boundary-fixture-secret-20260902",
    DISABLE_SQLITE_AUTO_BACKUP: "true",
    NO_COLOR: "1",
  };

  for (const key of CHILD_RUNTIME_ENV_KEYS) {
    const value = process.env[key];
    if (value !== undefined) env[key] = value;
  }

  // Nested test runners must not inherit the parent runner's recursion marker.
  delete env.NODE_TEST_CONTEXT;
  return env;
}

test("generic stream public error boundaries pass in an isolated process", () => {
  const result = spawnSync(
    process.execPath,
    ["--import", "tsx/esm", "--import", "./open-sse/utils/setupPolyfill.ts", "--test", FIXTURE],
    {
      cwd: REPO_ROOT,
      encoding: "utf8",
      env: buildFixtureEnv(),
      timeout: 120_000,
    }
  );
  const output = `${result.stdout}\n${result.stderr}`;

  assert.ifError(result.error);
  assert.equal(result.signal, null, output.slice(-12_000));
  assert.equal(result.status, 0, output.slice(-12_000));
  assert.match(output, /(?:^|\s)tests\s+6(?:\s|$)/m);
  assert.match(output, /(?:^|\s)pass\s+6(?:\s|$)/m);
  assert.match(output, /(?:^|\s)fail\s+0(?:\s|$)/m);
});
