import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const fixture = fileURLToPath(
  new URL("../fixtures/zai-web-stream-error-boundary.fixture.ts", import.meta.url)
);

test("Z.ai stream error boundaries pass in a process-isolated fixture", () => {
  const testRoot = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-zai-stream-boundary-"));
  const childEnv: NodeJS.ProcessEnv = {
    API_KEY_SECRET: "zai-stream-boundary-test-only-secret",
    DATA_DIR: path.join(testRoot, "data"),
    OMNIROUTE_PLUGINS_DIR: path.join(testRoot, "plugins"),
  };

  // The parent itself is a node:test process. Never forward its runner identity to the child;
  // `node --test` owns the child context and creates a fresh value for its fixture process.
  delete childEnv.NODE_TEST_CONTEXT;

  try {
    const result = spawnSync(process.execPath, ["--import", "tsx/esm", "--test", fixture], {
      cwd: fileURLToPath(new URL("../..", import.meta.url)),
      encoding: "utf8",
      env: childEnv,
      timeout: 60_000,
    });
    const diagnostics = [result.stdout, result.stderr].filter(Boolean).join("\n");

    assert.equal(result.error, undefined, diagnostics);
    assert.equal(result.signal, null, diagnostics);
    assert.equal(result.status, 0, diagnostics);
    assert.match(result.stdout, /tests 4\b/);
    assert.match(result.stdout, /pass 4\b/);
    assert.match(result.stdout, /fail 0\b/);
  } finally {
    fs.rmSync(testRoot, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});
