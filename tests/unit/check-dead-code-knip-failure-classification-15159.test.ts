import { test } from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import {
  parseKnipMetrics,
  evaluateDeadCode,
  classifyKnipFailure,
  resolveKnipBin as resolveKnipBinRaw,
} from "../../scripts/check/check-dead-code.mjs";

// Regression guard for audit #15159 / Hard Rule #12-adjacent — G-07.
//
// `scripts/check/check-dead-code.mjs` runs knip via execFileSync and had FOUR
// failure paths that all collapsed to the same `process.exit(2)`:
//
//   :139  knip failed to execute and produced no stdout
//   :149  knip's stdout was not parseable JSON
//   :199  quality-baseline.json absent
//   :208  metrics.deadExports absent from the baseline
//
// The audit reproduced the consequence: a MISSING knip binary and a GENUINE knip
// failure produce an identical exit. So when the toolchain is simply not
// installed, CI cannot distinguish "the infrastructure is down" from "this repo
// has dead code" — infra-down presents as repo-broken, and a reviewer chasing
// exit 2 finds nothing wrong with their code.
//
// The fix is a distinct, documented exit taxonomy:
//
//   0  OK            — no regression
//   1  POLICY        — dead-code regression (a real repo defect)
//   2  CONFIG        — baseline missing / metric key absent (operator config)
//   3  INFRASTRUCTURE — knip missing or unrunnable (toolchain, NOT the repo)
//
// Exit 3 is the load-bearing one: it is what lets CI and a reviewer tell "knip
// isn't installed" from "your code has dead exports".

type ClassifyResult = {
  kind: "ok" | "infra" | "unparseable";
  exitCode: number;
  reason: string;
};

const classify = classifyKnipFailure as (
  execError: { code?: string; message?: string } | null,
  stdout: string
) => ClassifyResult;

const resolveKnipBin = resolveKnipBinRaw as (opts: {
  platform?: string;
  existsSync: (path: string) => boolean;
}) => string | null;

// --- the exact distinction the audit says was impossible ---

test("G-07: a missing knip binary is INFRASTRUCTURE, not a repo defect", () => {
  // execFileSync surfaces a missing executable as code "ENOENT" with no stdout.
  const r = classify({ code: "ENOENT", message: "spawnSync node_modules/.bin/knip ENOENT" }, "");

  assert.equal(r.kind, "infra");
  assert.equal(r.exitCode, 3, "infra failure must NOT share the policy/config exit");
});

test("G-07: a missing knip binary is distinguishable from a genuine knip failure", () => {
  // This is the audit's core claim. Same gate, same "it did not work" shape, but
  // the two must not report the same thing.
  const missing = classify({ code: "ENOENT", message: "spawn knip ENOENT" }, "");
  const failed = classify({ code: undefined, message: "knip exited with status 1" }, "");

  assert.notEqual(missing.kind, failed.kind);
  assert.notEqual(missing.exitCode, failed.exitCode);
});

test("G-07: a non-ENOENT spawn failure (EACCES) is also infrastructure", () => {
  const r = classify({ code: "EACCES", message: "permission denied" }, "");

  assert.equal(r.kind, "infra");
  assert.equal(r.exitCode, 3);
});

test("G-07: a knip timeout is infrastructure, not dead code", () => {
  const r = classify({ code: "ETIMEDOUT", message: "timed out after 300000ms" }, "");

  assert.equal(r.kind, "infra");
  assert.equal(r.exitCode, 3);
});

test("G-07: unparseable stdout is its own kind, distinct from both", () => {
  const r = classify({ code: undefined, message: "knip crashed" }, "Error: something broke\n");

  assert.equal(r.kind, "unparseable");
  assert.equal(r.exitCode, 2, "unparseable output is a config/tool-contract fault");
});

// --- the legitimate knip non-zero exit must NOT be treated as a failure ---

test("G-07: a non-zero knip exit WITH valid JSON on stdout is OK, not a failure", () => {
  // knip legitimately exits non-zero when it finds issues (that is the whole
  // point of this gate) and still prints the report. Treating that as an error
  // would make the gate report infra problems on every genuine finding.
  const r = classify({ code: undefined, message: "knip exited with status 1" }, '{"issues":[]}');

  assert.equal(r.kind, "ok");
  assert.equal(r.exitCode, 0);
});

test("G-07: a clean run with no error is OK", () => {
  const r = classify(null, '{"issues":[]}');

  assert.equal(r.kind, "ok");
  assert.equal(r.exitCode, 0);
});

// --- exit codes stay distinct from the policy regression code ---

test("G-07: no failure path reports the POLICY exit code (1)", () => {
  // Exit 1 means "dead-code regression", a real repo defect. If any failure
  // path could return it, a broken toolchain would masquerade as a finding.
  for (const r of [
    classify({ code: "ENOENT", message: "x" }, ""),
    classify({ code: "ETIMEDOUT", message: "x" }, ""),
    classify({ code: undefined, message: "x" }, "not json"),
  ]) {
    assert.notEqual(r.exitCode, 1, `failure kind ${r.kind} must not claim the policy exit`);
  }
});

test("G-07: the taxonomy is exactly {0 ok, 2 config, 3 infra}", () => {
  const kinds = new Set([
    classify(null, "{}").exitCode,
    classify({ code: "ENOENT" }, "").exitCode,
    classify({ code: undefined, message: "x" }, "junk").exitCode,
  ]);

  assert.deepEqual([...kinds].sort(), [0, 2, 3]);
});

// --- guard: the module still exports what the existing gate test needs ---

// --- Windows: the .bin shim is a `#!/bin/sh` script and cannot be exec'd ---

/**
 * Candidates are built with path.join, so they carry the host separator. Compare
 * on a normalized form rather than hard-coding "/" — otherwise these assertions
 * only hold on POSIX and silently pass/fail by accident on Windows.
 */
function normalize(value: string | null): string | null {
  return value === null ? null : value.replace(/\\/g, "/");
}

test("G-07: resolveKnipBin prefers a real Node entrypoint over the .bin shim on Windows", () => {
  // `node_modules/.bin/knip` is a `#!/bin/sh` wrapper. On Windows execFileSync
  // cannot run it, so the gate used to fail with ENOENT on EVERY run there — the
  // "infra-down presents as repo-broken" symptom with a permanently-down cause.
  //
  // This surfaced while verifying G-07 end-to-end: after restoring the binary,
  // the gate still reported it unavailable, because the shim itself is
  // unrunnable on this platform. Same class as the `#!/bin/sh` spawn fixture
  // documented for devin-cli in the #15159 handoff.
  const bin = resolveKnipBin({
    platform: "win32",
    existsSync: (p: string) => {
      const n = normalize(p);
      return n === "node_modules/knip/bin/knip.js" || n === "node_modules/.bin/knip";
    },
  });

  assert.equal(
    normalize(bin),
    "node_modules/knip/bin/knip.js",
    "on Windows the gate must exec the package's own Node entrypoint"
  );
});

test("G-07: resolveKnipBin falls back to the .bin shim on POSIX", () => {
  // On Linux/macOS the .bin shim is the conventional, correct entrypoint and
  // the package bin path is not guaranteed to exist.
  const bin = resolveKnipBin({
    platform: "linux",
    existsSync: (p: string) => normalize(p) === "node_modules/.bin/knip",
  });

  assert.equal(normalize(bin), "node_modules/.bin/knip");
});

test("G-07: resolveKnipBin still reports unavailable when knip is genuinely absent", () => {
  // The fix must not paper over a real "not installed" state — that is exactly
  // the condition G-07 exists to report as infrastructure.
  const bin = resolveKnipBin({
    platform: "win32",
    existsSync: () => false,
  });

  assert.equal(bin, null, "a genuinely missing knip must resolve to null, not a shim path");
});

test("G-07: a Windows .cmd shim failing to spawn is INFRASTRUCTURE, not CONFIG", () => {
  // Found by running the gate end-to-end after removing the Node entrypoint: the
  // resolver fell back to `.bin\knip.cmd`, which `execFileSync` also cannot run
  // without `shell: true` — it fails with EINVAL and was classified as
  // "unparseable" (exit 2, a CONFIG fault) instead of infrastructure (exit 3).
  //
  // EINVAL here means "this spawn invocation cannot work", not "knip produced
  // garbage", so it belongs with the toolchain codes.
  const r = classify(
    { code: "EINVAL", message: "spawnSync node_modules\\.bin\\knip.cmd EINVAL" },
    ""
  );

  assert.equal(r.kind, "infra");
  assert.equal(r.exitCode, 3);
});

test("G-07: resolveKnipBin never returns a .cmd path (unspawnable without shell:true)", () => {
  // The Node entrypoint is authoritative; a dev environment may legitimately
  // lack the generated .cmd wrapper. Returning a .cmd would guarantee an EINVAL
  // spawn failure, which is worse than reporting knip as unusable.
  const bin = resolveKnipBin({
    platform: "win32",
    existsSync: (p: string) => {
      const n = normalize(p);
      return n === "node_modules/knip/bin/knip.js" || n === "node_modules/.bin/knip.cmd";
    },
  });

  assert.equal(normalize(bin), "node_modules/knip/bin/knip.js");
  assert.doesNotMatch(String(bin), /\.cmd$/);
});

test("G-07: resolveKnipBin on the real filesystem finds the Windows entrypoint", () => {
  // Guard the wiring, not just the pure function: with the real fs, the resolved
  // path must be the Node entrypoint on this platform and must actually exist.
  const bin = resolveKnipBin();
  if (process.platform !== "win32") {
    assert.ok(bin, "a knip entrypoint must resolve on POSIX too");
    return;
  }
  assert.equal(normalize(bin), "node_modules/knip/bin/knip.js");
  assert.ok(bin && fs.existsSync(bin), `resolved knip entrypoint must exist: ${bin}`);
});

test("G-07: parseKnipMetrics and evaluateDeadCode keep their contracts", () => {
  // These two are consumed by check-dead-code.test.ts; this file must not
  // silently change their shape.
  const parse = parseKnipMetrics as (json: unknown) => {
    deadExports: number;
    deadFiles: number;
    deadTotal: number;
  };
  const evaluate = evaluateDeadCode as (
    current: number,
    baseline: number
  ) => { regressed: boolean; improved: boolean };

  assert.deepStrictEqual(parse({ issues: [] }), {
    deadExports: 0,
    deadFiles: 0,
    deadTotal: 0,
  });
  assert.equal(evaluate(11, 10).regressed, true);
  assert.equal(evaluate(10, 10).regressed, false);
});
