import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-codex-pool-http-"));
const PHASE_SCRIPT = path.join(
  process.cwd(),
  "tests/integration/fixtures/codex-account-pool-restart-phase.ts"
);

type PhaseResult = {
  phase: "before" | "after";
  connectionId: string;
  upstreamModels: string[];
};

function runPhase(phase: PhaseResult["phase"], connectionId?: string): PhaseResult {
  const result = spawnSync(process.execPath, ["--import", "tsx/esm", PHASE_SCRIPT], {
    cwd: process.cwd(),
    encoding: "utf8",
    env: {
      ...process.env,
      DATA_DIR: TEST_DATA_DIR,
      CODEX_RESTART_PHASE: phase,
      ...(connectionId ? { CODEX_EXPECTED_CONNECTION_ID: connectionId } : {}),
    },
    maxBuffer: 50 * 1024 * 1024,
  });
  assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
  const line = result.stdout.split("\n").find((entry) => entry.startsWith("CODEX_RESTART_RESULT="));
  assert.ok(line, result.stdout);
  return JSON.parse(line.slice("CODEX_RESTART_RESULT=".length)) as PhaseResult;
}

test("Codex Spark cooldown survives a fresh process without creating child connections", () => {
  try {
    const before = runPhase("before");
    assert.ok(before.upstreamModels.length > 0);

    const after = runPhase("after", before.connectionId);
    assert.equal(after.connectionId, before.connectionId);
    assert.deepEqual(after.upstreamModels, ["gpt-5.5"]);
  } finally {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  }
});
