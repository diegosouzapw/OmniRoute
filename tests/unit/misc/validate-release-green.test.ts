import test from "node:test";
import assert from "node:assert/strict";

// Pure helpers of the release-green validator (Solution C). The orchestration is
// guarded behind a direct-run check, so importing the module here is side-effect-free.
const mod = await import("../../../scripts/quality/validate-release-green.mjs");
const {
  firstFailureLine,
  eslintCounts,
  evaluateEslintRun,
  parseEslintJson,
  parseCognitiveCount,
  isDrift,
  computeVerdict,
  classifyRunError,
  extractCiGates,
  FULL_CI_SKIP,
  fullCiTimeoutFor,
  curatedEquivalentId,
  fullCiKindFor,
  ESLINT_TIMEOUT_MS,
} = mod;

const extract = extractCiGates as (
  yamlText: string,
  opts?: { jobs?: string[]; skip?: Set<string>; envMap?: Record<string, Record<string, string>> }
) => { id: string; job: string; args: string[]; env?: Record<string, string> }[];

test("eslintCounts sums errors + warnings across files", () => {
  const parsed = [{ errorCount: 2, warningCount: 5 }, { errorCount: 0, warningCount: 3 }, {}];
  assert.deepEqual(eslintCounts(parsed), { errors: 2, warnings: 8 });
});

test("parseEslintJson tolerates a leading non-JSON banner", () => {
  const out = 'npm warn something\n[{"errorCount":0,"warningCount":1}]';
  assert.deepEqual(parseEslintJson(out), [{ errorCount: 0, warningCount: 1 }]);
  assert.equal(parseEslintJson("no json here"), null);
});

test("parseEslintJson tolerates ESLint's trailing unpruned-suppressions stderr sentence (#7837)", () => {
  // ESLint 9.x's `--suppressions-location` feature prints the valid `--format json` report to
  // stdout first, then — if the suppressions file has stale/"unpruned" entries — appends this
  // exact sentence to stderr and exits 2. The gate concatenates stdout+stderr, so
  // parseEslintJson() must recover the JSON report even with this trailing text glued on.
  const eslintJsonReport = JSON.stringify([
    { filePath: "open-sse/executors/example.ts", errorCount: 0, warningCount: 0, messages: [] },
  ]);
  const stderrTail =
    "There are suppressions left that do not occur anymore. Consider re-running the command with `--prune-suppressions`.\n";
  assert.deepEqual(parseEslintJson(eslintJsonReport + stderrTail), [
    { filePath: "open-sse/executors/example.ts", errorCount: 0, warningCount: 0, messages: [] },
  ]);
});

test("evaluateEslintRun preserves an ESLint timeout instead of misreporting invalid JSON", () => {
  const timedOut = classifyRunError({ killed: true, code: "ETIMEDOUT" }, 30 * 60 * 1000);

  assert.deepEqual(evaluateEslintRun(timedOut, 0), [
    {
      id: "lint",
      label: "ESLint",
      kind: "hard",
      ok: false,
      detail:
        "gate exceeded its 1800s ceiling and was killed — treat as a hung/failed gate (e.g. an unreleased DB handle in the unit suite); does NOT pass",
    },
  ]);
  assert.equal(ESLINT_TIMEOUT_MS, 60 * 60 * 1000, "cold release lint needs >30m headroom");
});

test("parseCognitiveCount reads the gate's count (en + pt)", () => {
  assert.equal(
    parseCognitiveCount("[cognitive-complexity] 797 function(s) exceed the threshold (15)."),
    797
  );
  assert.equal(
    parseCognitiveCount("[cognitive-complexity] REGRESSÃO — 801 violações > baseline 797"),
    801
  );
  assert.equal(parseCognitiveCount("no number"), null);
});

test("parseCognitiveCount ignores the cyclomatic count in the combined ratchets output (#7009)", () => {
  // `check:complexity-ratchets` runs ONE shared ESLint walk and prints BOTH ratchets.
  // The cyclomatic "N violações" summary is emitted FIRST, so a bare `\\d+ violações`
  // regex captured 2056 (cyclomatic) instead of 890 (cognitive) — a phantom drift in
  // every pre-flight report. Prefer the unambiguous machine-readable `cognitiveComplexity=N`.
  const combined = [
    "complexity=2056",
    "cognitiveComplexity=890",
    "[complexity] OK — 2056 violações (baseline 2056)",
    "[cognitive-complexity] OK — 890 violações (baseline 890)",
  ].join("\n");
  assert.equal(parseCognitiveCount(combined), 890);
});

test("isDrift flags only growth past the committed baseline (down-direction ratchets)", () => {
  assert.equal(isDrift(3900, 3867), true); // grew → drift
  assert.equal(isDrift(3867, 3867), false); // equal → ok
  assert.equal(isDrift(3800, 3867), false); // improved → ok
  assert.equal(isDrift(10, null), false); // no baseline → never drift
  assert.equal(isDrift(null, 10), false); // unparsed → never drift
});

test("firstFailureLine surfaces the meaningful failure, not boilerplate", () => {
  const out = [
    "> omniroute@3.8.34 typecheck:core",
    "src/x.ts(10,5): error TS2322: Type 'string' is not assignable to 'number'.",
    "done",
  ].join("\n");
  assert.match(firstFailureLine(out), /error TS2322/);
});

test("computeVerdict: releaseGreen iff zero HARD failures (drift never blocks)", () => {
  const onlyDrift = computeVerdict([
    { kind: "hard", ok: true },
    { kind: "drift", ok: false },
  ]);
  assert.equal(onlyDrift.releaseGreen, true);
  assert.equal(onlyDrift.drift.length, 1);

  const hardFail = computeVerdict([
    { kind: "hard", ok: false },
    { kind: "drift", ok: false },
  ]);
  assert.equal(hardFail.releaseGreen, false);
  assert.equal(hardFail.hardFailures.length, 1);

  const allGreen = computeVerdict([
    { kind: "hard", ok: true },
    { kind: "drift", ok: true },
  ]);
  assert.equal(allGreen.releaseGreen, true);
});

test("computeVerdict: full-coverage classification — ratchets are drift, defects are hard", () => {
  // Mirrors the expanded check set: the ratchets that historically surfaced in
  // layers on the release PR (complexity/openapi/zizmor/…) are DRIFT → never block;
  // the new real-defect gates (docs-all, integration) are HARD → block.
  const results = [
    { id: "complexity", kind: "drift", ok: false },
    { id: "openapi-coverage", kind: "drift", ok: false },
    { id: "workflow-lint", kind: "drift", ok: false },
    { id: "dead-code", kind: "drift", ok: true },
    { id: "codeql-ratchet", kind: "drift", ok: true },
    { id: "docs-all", kind: "hard", ok: true },
    { id: "integration", kind: "hard", ok: true },
  ];
  const v = computeVerdict(results);
  // Three ratchets drifted but NONE block — release is still green, all reported.
  assert.equal(v.releaseGreen, true);
  assert.equal(v.drift.length, 3);

  // A hard gate (integration assertion regression) flips it red.
  const withHardFail = computeVerdict([...results, { id: "integration", kind: "hard", ok: false }]);
  assert.equal(withHardFail.releaseGreen, false);
  assert.equal(withHardFail.hardFailures.length, 1);
});

test("classifyRunError: a killed gate under a timeout surfaces as a visible non-zero failure (not an infinite hang)", () => {
  // execFileSync kills the child on timeout → err.killed === true. The unit suite wedged on an
  // unreleased SQLite handle must become a reported failure, never an infinite block that gets
  // the pre-flight killed before it surfaces the unit reds (the v3.8.42 miss).
  const r = classifyRunError({ killed: true, signal: "SIGTERM" }, 45 * 60 * 1000);
  assert.equal(r.code, 124);
  assert.match(r.out, /ceiling/);
  assert.match(r.out, /hung\/failed gate/);
});

test("classifyRunError: Node's ETIMEDOUT shape is reported as a timeout", () => {
  const r = classifyRunError({ code: "ETIMEDOUT", signal: "SIGTERM" }, 10 * 60 * 1000);
  assert.equal(r.code, 124);
  assert.match(r.out, /600s ceiling/);
});

test("fullCiTimeoutFor gives test-masking enough time without weakening other gates", () => {
  assert.equal(fullCiTimeoutFor("check:test-masking"), 30 * 60 * 1000);
  assert.equal(fullCiTimeoutFor("check:file-size"), 10 * 60 * 1000);
});

test("classifyRunError: a normal non-zero exit keeps its status + combined output", () => {
  const r = classifyRunError({ status: 1, stdout: "boom-out", stderr: "boom-err" }, undefined);
  assert.equal(r.code, 1);
  assert.equal(r.out, "boom-outboom-err");
});

test("classifyRunError: a kill WITHOUT a configured timeout is not misreported as a timeout", () => {
  // No timeout set → a killed/odd error falls through to the generic branch (code 1), so we never
  // claim a hang ceiling that was not actually configured.
  const r = classifyRunError({ killed: true }, undefined);
  assert.equal(r.code, 1);
  assert.doesNotMatch(r.out, /ceiling/);
});

test("pre-flight wires the test-masking PR-context gate against origin/main (v3.8.43 gap fix)", async () => {
  const fs = await import("node:fs");
  const src = fs.readFileSync(
    new URL("../../../scripts/quality/validate-release-green.mjs", import.meta.url),
    "utf8"
  );
  // The gate must run check:test-masking, pin the base to main, and be classified HARD —
  // it caught a real net-assert reduction that only surfaced on the release PR before.
  assert.match(src, /check:test-masking/, "test-masking gate must be wired into the pre-flight");
  assert.match(src, /GITHUB_BASE_REF:\s*"main"/, "test-masking must diff against origin/main");
  assert.match(
    src,
    /id:\s*"test-masking"[\s\S]*?kind:\s*"hard"/,
    "test-masking must be a HARD gate (non-allowlisted weakening blocks the release)"
  );
  // run() must honor a per-gate env override so GITHUB_BASE_REF actually reaches the child
  // (routed through buildGateEnv since the --hermetic scrub was added).
  assert.match(
    src,
    /env:\s*buildGateEnv\(opts\.env\)/,
    "run() must merge opts.env into the child env"
  );
  assert.match(
    src,
    /\.\.\.\(extra \|\| \{\}\)/,
    "buildGateEnv must spread the per-gate env override"
  );
});

test("pre-flight --hermetic scrubs the live-test trigger vars (2026-07-05 false-positive fix)", async () => {
  const fs = await import("node:fs");
  const src = fs.readFileSync(
    new URL("../../../scripts/quality/validate-release-green.mjs", import.meta.url),
    "utf8"
  );
  // A dev machine with OMNIROUTE_API_KEY set runs 17+ live tests that CI skips —
  // the pre-flight must be able to reproduce the CI env exactly.
  assert.match(src, /HERMETIC_SCRUB\s*=\s*\["OMNIROUTE_API_KEY",\s*"OMNIROUTE_URL"\]/);
  assert.match(src, /args\.has\("--hermetic"\)/, "--hermetic flag must be parsed");
  // Per-gate logs: a red must be diagnosable from _artifacts/release-green/<gate>.log
  // without re-running the gate.
  assert.match(src, /saveGateLog/, "per-gate output must be persisted");
  assert.match(src, /_artifacts[/", ]+release-green/, "logs must land in _artifacts/release-green");
});

test("pre-flight runs the slow suites CONCURRENTLY (v3.8.45 perf — was ~1h serial)", async () => {
  const fs = await import("node:fs");
  const src = fs.readFileSync(
    new URL("../../../scripts/quality/validate-release-green.mjs", import.meta.url),
    "utf8"
  );
  // main() must be async and the slow suites (unit/vitest/integration/pack-artifact)
  // must run via a single Promise.all over runAsync — not four sequential hardCmd calls.
  assert.match(src, /async function main\(\)/, "main must be async to await the parallel wave");
  assert.match(src, /const execFileAsync = promisify\(execFile\)/, "async runner must exist");
  assert.match(src, /await Promise\.all\(\s*slow\.map\(/, "slow suites must run concurrently");
  // The four slow-gate ids must all be present in the parallel wave.
  for (const id of ["unit", "vitest", "integration", "pack-artifact"]) {
    assert.ok(src.includes(`id: "${id}"`), `slow gate ${id} must be in the parallel wave`);
  }
  // Each still saves its per-gate log for red diagnosis without a re-run.
  assert.match(src, /slow\.forEach\([\s\S]*?saveGateLog\(g\.id/, "each slow gate persists its log");
});

test("pre-flight runs tarball boot only after the package artifact builder completes", async () => {
  const fs = await import("node:fs");
  const src = fs.readFileSync(
    new URL("../../../scripts/quality/validate-release-green.mjs", import.meta.url),
    "utf8"
  );
  const parallelWave = src.indexOf("const slowResults = await Promise.all");
  const packBoot = src.indexOf('id: "pack-boot"');

  assert.ok(parallelWave >= 0, "the parallel slow-gate wave must exist");
  assert.ok(
    packBoot > parallelWave,
    "pack-boot must be declared after the parallel artifact build"
  );
  assert.match(
    src,
    /packArtifactResult[\s\S]*?check:pack-boot/,
    "pack-boot must be explicitly sequenced from the package-artifact result"
  );
});

// ─── --full-ci gate extraction (P0, v3.8.46 post-mortem) ─────────────────────

const CI_FIXTURE = `
name: CI
jobs:
  lint:
    steps:
      - run: npm ci
      - run: npm run lint
      - run: npm run check:route-validation:t06
  quality-extended:
    steps:
      - name: Bundle size
        run: npm run check:bundle-size -- --ratchet
      - name: Build
        run: npm run build
  docs-sync-strict:
    steps:
      - run: |
          npm run check:docs-all
          npm run check:docs-symbols
  pr-test-policy:
    steps:
      - run: npm run check:test-masking
      - run: npm run check:pr-evidence
  quality-gate:
    steps:
      - run: npm run check:codeql-ratchet
  test-unit:
    steps:
      - run: npm run test:unit
`;

test("extractCiGates: pulls npm-run gate steps from the ci.yml gate jobs only", () => {
  const gates = extract(CI_FIXTURE);
  const ids = gates.map((g) => g.id);
  // gate scripts from the target jobs are present…
  assert.ok(ids.includes("lint"), "lint gate");
  assert.ok(ids.includes("check:route-validation:t06"), "colon-suffixed gate id survives");
  assert.ok(ids.includes("check:bundle-size"), "quality-extended gate");
  assert.ok(ids.includes("check:test-masking"), "pr-test-policy gate");
  // …a `run: |` multi-line block is scanned line-by-line…
  assert.ok(ids.includes("check:docs-all") && ids.includes("check:docs-symbols"), "multi-line run");
  // …and NON-gate steps + jobs outside the gate set are ignored.
  assert.ok(!ids.includes("build") && !ids.some((i) => i.startsWith("test:")), "no build/test-run");
  assert.equal(
    gates.find((g) => g.job === "test-unit"),
    undefined,
    "test-unit job is not scanned"
  );
});

test("extractCiGates: preserves `-- <args>` so ratchet flags reach the script", () => {
  const g = extract(CI_FIXTURE).find((x) => x.id === "check:bundle-size");
  assert.deepEqual(g?.args, ["run", "check:bundle-size", "--", "--ratchet"]);
  const plain = extract(CI_FIXTURE).find((x) => x.id === "lint");
  assert.deepEqual(plain?.args, ["run", "lint"], "no `--` when the step has no extra args");
});

test("extractCiGates: skips the non-local gates (pr-evidence, codeql-ratchet)", () => {
  const ids = extract(CI_FIXTURE).map((g) => g.id);
  assert.ok(!ids.includes("check:pr-evidence"), "pr-evidence needs a PR body — skipped");
  assert.ok(
    !ids.includes("check:codeql-ratchet"),
    "codeql-ratchet is a remote-main check — skipped"
  );
  assert.ok(FULL_CI_SKIP.has("check:pr-evidence") && FULL_CI_SKIP.has("check:codeql-ratchet"));
});

test("extractCiGates: attaches GITHUB_BASE_REF=main env to test-masking + de-dups", () => {
  const gates = extract(CI_FIXTURE + "\n  lint2:\n    steps:\n      - run: npm run lint\n", {
    jobs: [
      "lint",
      "lint2",
      "quality-extended",
      "docs-sync-strict",
      "pr-test-policy",
      "quality-gate",
    ],
  });
  const tm = gates.find((g) => g.id === "check:test-masking");
  assert.deepEqual(tm?.env, { GITHUB_BASE_REF: "main" }, "test-masking compares against main");
  // `lint` declared in two jobs appears once (dedup by script id).
  assert.equal(gates.filter((g) => g.id === "lint").length, 1, "de-duplicated across jobs");
});

test("extractCiGates: the REAL ci.yml yields the base-reds that leaked in v3.8.46", async () => {
  const fs = await import("node:fs");
  const yaml = fs.readFileSync(new URL("../../../.github/workflows/ci.yml", import.meta.url), "utf8");
  const ids = new Set(extract(yaml).map((g) => g.id));
  // The exact gates that leaked to the v3.8.46 release PR because the pre-flight
  // never ran them — --full-ci now reproduces every one.
  for (const g of [
    "check:route-validation:t06",
    // openapi-routes + docs-symbols collapsed into one FS walk (#6716).
    "check:api-docs-refs",
    "check:bundle-size",
    "check:test-masking",
    "check:file-size",
  ]) {
    assert.ok(ids.has(g), `real ci.yml must expose ${g} to --full-ci`);
  }
  assert.ok(ids.size >= 20, "the real gate set is substantial (>= 20 static gates)");
});

// ─── Verdict accuracy (review of the #9985 release-green verdict) ────────────

test("firstFailureLine never blames a PASSING line whose test FILE NAME contains 'fail' (#9985)", () => {
  // Observed in the 2026-08-23 verdict: the reported "cause" of the unit red was
  //   ✓ …fail-fast-concurrency-gate.test.ts (4 tests) 203ms
  // i.e. a GREEN line, matched only because the unanchored /FAIL/i marker hit the
  // substring "fail" inside the file name. The real ✖ line was three lines below.
  const out = [
    "> omniroute@3.8.50 test:unit",
    " ✓ tests/unit/runtime/fail-fast-concurrency-gate.test.ts (4 tests) 203ms",
    " ✓ tests/unit/router/failover-budget.test.ts (9 tests) 41ms",
    " ✖ tests/unit/router/pricing.test.ts > picks the cheapest candidate",
    "AssertionError [ERR_ASSERTION]: Expected values to be strictly equal: 2 !== 3",
  ].join("\n");
  const hit = firstFailureLine(out);
  assert.doesNotMatch(hit, /fail-fast-concurrency-gate/, "a green line is never the failure cause");
  assert.doesNotMatch(hit, /failover-budget/, "a green line is never the failure cause");
  assert.match(hit, /pricing\.test\.ts/, "the real failing line must be reported instead");
});

test("firstFailureLine still recognises every legitimate failure marker", () => {
  const cases: [string, RegExp][] = [
    ["ok 1 - warms up\nnot ok 2 - routes to the cheapest key\n", /not ok 2/],
    ["Test Files 1 failed\nFAIL tests/unit/router/pricing.test.ts\n", /^FAIL /],
    ["src/x.ts(10,5): error TS2322: Type 'string' is not assignable.", /error TS2322/],
    ["✗ db-rules: raw sqlite handle left open", /db-rules/],
    ["Error: ENOENT: no such file or directory, open 'dist/server.js'", /ENOENT/],
    ["[cognitive-complexity] REGRESSÃO — 801 violações > baseline 797", /REGRESS/],
    ["[file-size] REGRESSED: open-sse/router.ts 1204 > cap 1100", /REGRESSED/],
  ];
  for (const [out, expected] of cases) {
    assert.match(firstFailureLine(out), expected, `marker lost for: ${out.slice(0, 40)}`);
  }
});

test("firstFailureLine falls back to the last line when nothing matches", () => {
  assert.equal(firstFailureLine("warming up\nall quiet\n"), "all quiet");
  assert.equal(firstFailureLine(""), "failed");
});

test("curatedEquivalentId maps a ci.yml gate script onto the curated pass id (#9985)", () => {
  assert.equal(curatedEquivalentId("check:file-size"), "file-size");
  assert.equal(curatedEquivalentId("check:compression-budget"), "compression-budget");
  // Curated ids that are NOT just the script name minus "check:".
  assert.equal(curatedEquivalentId("check:workflows"), "workflow-lint");
  assert.equal(curatedEquivalentId("check:complexity-ratchets"), "complexity");
  assert.equal(curatedEquivalentId("lint"), "lint-errors");
  // An uncurated gate keeps a stable, non-colliding identity.
  assert.equal(curatedEquivalentId("check:route-validation:t06"), "route-validation:t06");
});

test("fullCiKindFor honours the curated classification of an already-known gate (#9985)", () => {
  const curated = [
    { id: "file-size", kind: "drift", ok: false },
    { id: "compression-budget", kind: "drift", ok: false },
    { id: "workflow-lint", kind: "drift", ok: false },
    { id: "docs-all", kind: "hard", ok: true },
    { id: "lint-errors", kind: "hard", ok: true },
  ];
  // Ratchets curated as DRIFT must stay drift when --full-ci re-runs them from ci.yml...
  assert.equal(fullCiKindFor("check:file-size", curated), "drift");
  assert.equal(fullCiKindFor("check:compression-budget", curated), "drift");
  assert.equal(fullCiKindFor("check:workflows", curated), "drift");
  // ...real-defect gates stay hard...
  assert.equal(fullCiKindFor("check:docs-all", curated), "hard");
  assert.equal(fullCiKindFor("lint", curated), "hard");
  // ...and a gate the curated pass never ran defaults to hard (the --full-ci contract).
  assert.equal(fullCiKindFor("check:bundle-size", curated), "hard");
  assert.equal(fullCiKindFor("check:route-validation:t06", curated), "hard");
});

test("one gate can never land in BOTH verdict buckets of the same report (#9985)", () => {
  // The 2026-08-23 verdict listed file-size and compression-budget as hard failures
  // AND as drift, in the same table, because the --full-ci pass re-recorded every
  // ci.yml gate as kind:"hard" and the dedupe only compared raw ids.
  const curated = [
    { id: "file-size", kind: "drift", ok: false },
    { id: "compression-budget", kind: "drift", ok: false },
  ];
  const fromCiYaml = ["check:file-size", "check:compression-budget"].map((id) => ({
    id,
    kind: fullCiKindFor(id, curated),
    ok: false,
  }));
  const v = computeVerdict([...curated, ...fromCiYaml]);
  const hardGates = new Set(v.hardFailures.map((r) => curatedEquivalentId(r.id)));
  const contradictions = v.drift
    .map((r) => curatedEquivalentId(r.id))
    .filter((id) => hardGates.has(id));
  assert.deepEqual(
    contradictions,
    [],
    "a gate reported as hard must not also be reported as drift"
  );
  assert.equal(
    v.releaseGreen,
    true,
    "a curated-drift ratchet must not block the release via the --full-ci path"
  );
});

test("the --full-ci loop classifies from the curated results, not a hardcoded kind (#9985)", async () => {
  const fs = await import("node:fs");
  const src = fs.readFileSync(
    new URL("../../../scripts/quality/validate-release-green.mjs", import.meta.url),
    "utf8"
  );
  assert.match(
    src,
    /kind:\s*fullCiKindFor\(g\.id,\s*results\)/,
    "--full-ci must classify each ci.yml gate through fullCiKindFor()"
  );
});
