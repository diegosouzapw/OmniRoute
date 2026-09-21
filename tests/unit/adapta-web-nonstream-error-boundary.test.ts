import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import test from "node:test";

const REPO_ROOT = fileURLToPath(new URL("../..", import.meta.url));
const FIXTURE = fileURLToPath(
  new URL("../fixtures/adapta-web-nonstream-error-boundary.fixture.ts", import.meta.url)
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
    API_KEY_SECRET: "adapta-boundary-fixture-api-key-secret-20260902",
    DISABLE_SQLITE_AUTO_BACKUP: "true",
  };

  for (const key of CHILD_RUNTIME_ENV_KEYS) {
    const value = process.env[key];
    if (value !== undefined) env[key] = value;
  }

  // A nested test runner must receive its own context instead of inheriting the parent's.
  delete env.NODE_TEST_CONTEXT;
  return env;
}

test("Adapta Web non-stream error boundaries pass in an isolated process", () => {
  const result = spawnSync(
    process.execPath,
    [
      "--import",
      "tsx/esm",
      "--import",
      "./open-sse/utils/setupPolyfill.ts",
      "--test",
      "--test-force-exit",
      FIXTURE,
    ],
    {
      cwd: REPO_ROOT,
      encoding: "utf8",
      env: buildFixtureEnv(),
      timeout: 60_000,
    }
  );

  assert.ifError(result.error);
  assert.equal(
    result.signal,
    null,
    `isolated Adapta boundary fixture terminated by ${result.signal}\n${result.stdout}\n${result.stderr}`
  );
  assert.equal(
    result.status,
    0,
    `isolated Adapta boundary fixture failed\n${result.stdout}\n${result.stderr}`
  );
});
