import { test, afterEach, describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  buildChecks,
  tallyDrift,
  __setSpawnSyncForTest,
  __resetSpawnSyncForTest,
} from "../../scripts/check/check-docs-counts-sync.mjs";

// inject a failing spawnSync so we can test the failure path (node:child_process.spawnSync is non-configurable in ESM)
afterEach(() => {
  try {
    __resetSpawnSyncForTest();
  } catch {}
});

describe("readCodeFacts failure is reported as a strict failure", () => {
  it("reports a strict error when the code facts cannot be loaded", () => {
    __setSpawnSyncForTest(
      () => ({ status: 1, stdout: "", stderr: "tsx not found", pid: 1, output: [], signal: null }) as any
    );
    const checks = buildChecks() as any[];
    const errCheck = checks.find((c) => c.actual === "ERR");
    assert.ok(errCheck, "should include a check with actual ERR when the facts loader returns null");
    assert.equal(errCheck.strict, true, "ERR must be strict");
    assert.ok(errCheck.validate, "validate must be defined");
    const v = errCheck.validate!("", "code facts:ERR");
    assert.equal(v.ok, false, "validate must return ok:false");
    assert.match(String(v.detail), /readCodeFacts|tsx|spawnSync/i);
  });

  it("tallyDrift does not skip actual ERR", () => {
    const checks = [
      {
        label: "Code-derived counts",
        actual: "ERR",
        strict: true,
        files: ["docs/README.md"],
        validate: () => ({ ok: false, detail: "ERR" }),
      },
    ] as any;
    const { strict } = tallyDrift(checks, () => "");
    assert.equal(strict, 1);
  });

  it("tallyDrift skips actual 0 (source unknown)", () => {
    const checks = [{ label: "Code-derived counts", actual: 0, strict: true, files: ["README.md"] }] as any;
    const { strict } = tallyDrift(checks, () => "content");
    assert.equal(strict, 0);
  });
});
