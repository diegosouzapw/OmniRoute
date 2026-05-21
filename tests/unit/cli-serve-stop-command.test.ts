import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_FETCH = globalThis.fetch;

function createTempDataDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cli-stop-"));
}

async function withEnv(fn: (dataDir: string) => Promise<void>) {
  const dataDir = createTempDataDir();
  process.env.DATA_DIR = dataDir;
  globalThis.fetch = (async () => {
    throw new Error("server offline");
  }) as typeof fetch;

  const originalLog = console.log;
  console.log = () => {};

  try {
    await fn(dataDir);
  } finally {
    console.log = originalLog;
    globalThis.fetch = ORIGINAL_FETCH;
    fs.rmSync(dataDir, { recursive: true, force: true });

    if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }
}

test("stop returns 0 when no server is running (no PID file)", async () => {
  await withEnv(async () => {
    const { runStopCommand } = await import("../../bin/cli/commands/stop.mjs");
    const result = await runStopCommand({});
    assert.equal(result, 0);
  });
});

test("stop returns 0 when PID file exists but process is gone", async (t) => {
  await withEnv(async (dataDir) => {
    const pidPath = path.join(dataDir, "server.pid");
    fs.writeFileSync(pidPath, "999999999", "utf8");

    const { runStopCommand } = await import("../../bin/cli/commands/stop.mjs");
    const result = await runStopCommand({});
    assert.equal(result, 0);
  });
});
