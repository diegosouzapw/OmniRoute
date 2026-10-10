import test, { before, after } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const dataDir = mkdtempSync(join(tmpdir(), "omniroute-stream-retention-13621-"));
type Probe = {
  mode: string;
  retained: boolean;
  draining: boolean;
  calls: { disconnect: number; error: number; drain: number };
};
let results: Probe[];
before(() => {
  const worker = fileURLToPath(
    new URL("./_fixtures/stream-controller-retention-13621.worker.ts", import.meta.url)
  );
  const child = spawnSync(process.execPath, ["--expose-gc", "--import", "tsx/esm", worker], {
    env: {
      ...process.env,
      DATA_DIR: dataDir,
      NODE_ENV: "test",
      DISABLE_SQLITE_AUTO_BACKUP: "true",
    },
    encoding: "utf8",
    timeout: 180_000,
  });
  assert.equal(child.status, 0, `${child.stdout}\n${child.stderr}\n${child.error ?? ""}`);
  const line = child.stdout.split("\n").find((entry) => entry.startsWith("RETENTION_RESULT="));
  assert.ok(line, "worker must produce measured retention results");
  results = JSON.parse(line.slice("RETENTION_RESULT=".length));
});
after(() => rmSync(dataDir, { recursive: true, force: true }));

test("active streams keep callbacks and their payload reachable", () => {
  assert.equal(results.find((r) => r.mode === "active")?.retained, true);
});
test("completed tool handoff keeps its active drain until upstream completion", () => {
  const result = results.find((r) => r.mode === "handoff-draining");
  assert.equal(result?.retained, true);
  assert.equal(result?.draining, true);
  assert.equal(result?.calls.drain, 1);
});
for (const mode of ["complete", "disconnect", "error", "abort", "handoff-complete"]) {
  test(`terminal ${mode} releases full request payloads captured by callbacks`, () => {
    const result = results.find((r) => r.mode === mode);
    assert.ok(result);
    assert.equal(result.retained, false, `${mode} still retains its callback's request payload`);
    assert.equal(
      result.calls.disconnect,
      ["disconnect", "handoff-complete"].includes(mode) ? 1 : 0
    );
    assert.equal(result.calls.error, mode === "error" ? 1 : 0);
    assert.equal(result.calls.drain, mode === "handoff-complete" ? 1 : 0);
    assert.equal(result.draining, false);
  });
}
