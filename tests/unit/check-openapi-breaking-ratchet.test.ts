// tests/unit/check-openapi-breaking-ratchet.test.ts
// TDD unit tests for the --ratchet mode added to scripts/check/check-openapi-breaking.mjs
// (Fase 9 Onda 0 — flip the oasdiff breaking-change gate from advisory to blocking).
//
// Strategy: test the exported pure evaluator without spawning oasdiff or touching
// git. The evaluator is the load-bearing decision: regression iff a real breaking
// change appears (measured > baseline); a null measurement (graceful skip) never
// blocks. End-to-end SKIP behavior (binary absent / base unresolved) is covered by
// the script's own advisory tests and a process-level skip assertion below.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import {
  evaluateOpenapiRatchet,
  readBaselineOpenapiValue,
  releaseBranchForVersion,
  // @ts-expect-error — .mjs helper has no type declarations; runtime shape is known.
} from "../../scripts/check/check-openapi-breaking.mjs";

type RatchetVerdict = { regressed: boolean; skipped: boolean };
const evaluate = evaluateOpenapiRatchet as (args: {
  current: number | null;
  baseline: number | null;
}) => RatchetVerdict;
const readBaseline = readBaselineOpenapiValue as (p?: string) => number | null;
const releaseBranch = releaseBranchForVersion as (v: string | null | undefined) => string | null;

const SCRIPT_PATH = fileURLToPath(
  new URL("../../scripts/check/check-openapi-breaking.mjs", import.meta.url)
);

// ---------------------------------------------------------------------------
// releaseBranchForVersion — the default base ref derives from the package
// version so it never goes stale across release cycles (was a hard-coded
// "origin/release/v3.8.27" that drifted into the v3.8.29 cycle).
// ---------------------------------------------------------------------------

test("releaseBranchForVersion: a clean semver derives the matching release branch", () => {
  assert.equal(releaseBranch("3.8.29"), "origin/release/v3.8.29");
});

test("releaseBranchForVersion: a prerelease/build suffix is ignored", () => {
  assert.equal(releaseBranch("3.8.29-dev.2"), "origin/release/v3.8.29");
  assert.equal(releaseBranch("10.0.0+build.7"), "origin/release/v10.0.0");
});

test("releaseBranchForVersion: a non-semver value yields null (caller falls back)", () => {
  assert.equal(releaseBranch(""), null);
  assert.equal(releaseBranch(null), null);
  assert.equal(releaseBranch(undefined), null);
  assert.equal(releaseBranch("not-a-version"), null);
});

// ---------------------------------------------------------------------------
// evaluateOpenapiRatchet — the three contract cases from the plan
// ---------------------------------------------------------------------------

test("evaluateOpenapiRatchet: current=0 baseline=0 → not regressed", () => {
  const r = evaluate({ current: 0, baseline: 0 });
  assert.equal(r.regressed, false);
  assert.equal(r.skipped, false);
});

test("evaluateOpenapiRatchet: current=1 baseline=0 → regressed (a single breaking change blocks)", () => {
  const r = evaluate({ current: 1, baseline: 0 });
  assert.equal(r.regressed, true);
  assert.equal(r.skipped, false);
});

test("evaluateOpenapiRatchet: current=null baseline=0 → graceful skip (no measurement never blocks)", () => {
  const r = evaluate({ current: null, baseline: 0 });
  assert.equal(r.regressed, false);
  assert.equal(r.skipped, true);
});

// ---------------------------------------------------------------------------
// evaluateOpenapiRatchet — additional edge cases for the ratchet semantics
// ---------------------------------------------------------------------------

test("evaluateOpenapiRatchet: null baseline → graceful skip (no baseline, no ratchet)", () => {
  const r = evaluate({ current: 3, baseline: null });
  assert.equal(r.regressed, false);
  assert.equal(r.skipped, true);
});

test("evaluateOpenapiRatchet: undefined current → graceful skip", () => {
  const r = evaluate({ current: undefined as unknown as null, baseline: 0 });
  assert.equal(r.regressed, false);
  assert.equal(r.skipped, true);
});

test("evaluateOpenapiRatchet: measured == baseline → not regressed", () => {
  const r = evaluate({ current: 2, baseline: 2 });
  assert.equal(r.regressed, false);
  assert.equal(r.skipped, false);
});

test("evaluateOpenapiRatchet: measured < baseline → not regressed (improvement)", () => {
  const r = evaluate({ current: 1, baseline: 5 });
  assert.equal(r.regressed, false);
  assert.equal(r.skipped, false);
});

// ---------------------------------------------------------------------------
// readBaselineOpenapiValue — tolerant read of quality-baseline.json
// ---------------------------------------------------------------------------

function withTmpBaseline(content: string | null, fn: (p: string) => void) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "openapi-baseline-"));
  const p = path.join(dir, "quality-baseline.json");
  if (content !== null) fs.writeFileSync(p, content);
  try {
    fn(p);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

test("readBaselineOpenapiValue: reads metrics.openapiBreaking.value", () => {
  withTmpBaseline(JSON.stringify({ metrics: { openapiBreaking: { value: 0 } } }), (p) => {
    assert.equal(readBaseline(p), 0);
  });
});

test("readBaselineOpenapiValue: missing file returns null (graceful skip)", () => {
  assert.equal(readBaseline("/tmp/does-not-exist-99999/quality-baseline.json"), null);
});

test("readBaselineOpenapiValue: missing metric returns null", () => {
  withTmpBaseline(JSON.stringify({ metrics: {} }), (p) => {
    assert.equal(readBaseline(p), null);
  });
});

test("readBaselineOpenapiValue: non-numeric value returns null", () => {
  withTmpBaseline(JSON.stringify({ metrics: { openapiBreaking: { value: "0" } } }), (p) => {
    assert.equal(readBaseline(p), null);
  });
});

test("readBaselineOpenapiValue: invalid JSON returns null (does not throw)", () => {
  withTmpBaseline("{ not valid json", (p) => {
    assert.equal(readBaseline(p), null);
  });
});

// ---------------------------------------------------------------------------
// --ratchet end-to-end: binary-absent SKIP exits 0 (a missing measurement never
// blocks). Runs the script with an empty PATH so oasdiff is unresolvable.
// ---------------------------------------------------------------------------

test("--ratchet with oasdiff absent (empty PATH) SKIPs and exits 0", () => {
  const res = spawnSync(process.execPath, [SCRIPT_PATH, "--ratchet", "--quiet"], {
    encoding: "utf8",
    // Empty PATH → `which`/`oasdiff` unresolvable → findOasdiff() returns null.
    env: { ...process.env, PATH: "/nonexistent-bin-dir" },
    timeout: 30_000,
  });
  assert.equal(res.status, 0, "binary-absent SKIP must exit 0 even with --ratchet");
  assert.match(res.stdout, /openapiBreaking=SKIP reason=binary-absent/);
});
