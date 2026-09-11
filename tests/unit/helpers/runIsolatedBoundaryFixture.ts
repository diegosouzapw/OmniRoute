import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = fileURLToPath(new URL("../../..", import.meta.url));
const CHILD_PATH = "/usr/local/bin:/usr/bin:/bin";
const CHILD_MAX_BUFFER_BYTES = 10 * 1024 * 1024;

type IsolatedBoundaryFixtureOptions = {
  fixtureUrl: URL;
  expectedTests: number;
  label: string;
  timeoutMs?: number;
};

export function runIsolatedBoundaryFixture({
  fixtureUrl,
  expectedTests,
  label,
  timeoutMs = 180_000,
}: IsolatedBoundaryFixtureOptions): void {
  const root = mkdtempSync(join(tmpdir(), "omniroute-public-error-child-"));
  const dataDir = join(root, "data");
  const pluginsDir = join(root, "plugins");
  mkdirSync(dataDir, { recursive: true });
  mkdirSync(pluginsDir, { recursive: true });

  try {
    const result = spawnSync(
      process.execPath,
      ["--import", "tsx/esm", "--test", "--test-reporter=tap", fileURLToPath(fixtureUrl)],
      {
        cwd: REPO_ROOT,
        encoding: "utf8",
        env: {
          APP_LOG_TO_FILE: "false",
          API_KEY_SECRET: "public-error-boundary-fixture-secret",
          DATA_DIR: dataDir,
          DISABLE_SQLITE_AUTO_BACKUP: "true",
          LANG: "C.UTF-8",
          LC_ALL: "C.UTF-8",
          NODE_ENV: "test",
          OMNIROUTE_DISABLE_CREDENTIAL_HEALTH_CHECK: "true",
          OMNIROUTE_PLUGINS_DIR: pluginsDir,
          PATH: CHILD_PATH,
          TZ: "UTC",
        },
        maxBuffer: CHILD_MAX_BUFFER_BYTES,
        timeout: timeoutMs,
      }
    );
    const diagnostics = [
      `${label} child status=${String(result.status)} signal=${String(result.signal)}`,
      result.error ? `error=${String(result.error)}` : "",
      `stdout:\n${result.stdout}`,
      `stderr:\n${result.stderr}`,
    ]
      .filter(Boolean)
      .join("\n");

    assert.equal(result.error, undefined, diagnostics);
    assert.equal(result.signal, null, diagnostics);
    assert.equal(result.status, 0, diagnostics);
    assert.match(result.stdout, new RegExp(`# tests ${expectedTests}(?:\\r?\\n|$)`), diagnostics);
    assert.match(result.stdout, new RegExp(`# pass ${expectedTests}(?:\\r?\\n|$)`), diagnostics);
    assert.match(result.stdout, /# fail 0(?:\r?\n|$)/, diagnostics);
  } finally {
    rmSync(root, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
}
