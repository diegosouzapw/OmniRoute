// tests/unit/build/check-bundle-size-unmeasurable.test.ts
// TDD regression coverage for G-04 (#15159): `check-bundle-size.mjs --ratchet`
// reported "cannot measure" as success.
//
// Four SKIP paths returned exit 0 under `--ratchet`, each with a comment saying
// so explicitly — e.g. check-bundle-size.mjs:252 "SKIP sai 0 mesmo com --ratchet
// (erro de medição nunca bloqueia)". A ratchet that cannot take a measurement and
// then reports OK is not a ratchet: it converts "unknown" into "verified", and it
// does so silently, because every one of those branches printed an informational
// line and exited 0. The step in ci.yml is even labelled "Bundle size (ratchet,
// blocking)".
//
// The rule this suite pins: **under --ratchet, "cannot measure" must be
// non-zero.** Advisory mode stays non-blocking, because a developer running the
// gate locally without a build should not be blocked — but --ratchet is an
// explicit request for a verdict, and the only honest verdict when the
// measurement is impossible is "I could not verify this".
import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { tmpdir } from "node:os";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";

const SCRIPT = resolve(process.cwd(), "scripts/check/check-bundle-size.mjs");

type RunResult = { status: number; stdout: string; stderr: string };

function runGate(root: string, args: string[]): RunResult {
  try {
    const stdout = execFileSync(process.execPath, [SCRIPT, ...args], {
      cwd: root,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
      env: { ...process.env, CI: "" },
    });
    return { status: 0, stdout, stderr: "" };
  } catch (err) {
    const e = err as { status?: number; stdout?: string; stderr?: string };
    return { status: e.status ?? 1, stdout: e.stdout ?? "", stderr: e.stderr ?? "" };
  }
}

/**
 * Install a fake `size-limit` package into `root/node_modules`.
 *
 * The gate resolves the package's own JS entry (node_modules/size-limit/bin.js),
 * NOT the node_modules/.bin shim — that indirection is the Windows bug G-04 fixes.
 * So a fixture must stub the package entry for the stub to take effect.
 *
 * @param {string} root
 * @param {string} body JS source for the fake bin.js
 */
function installFakeSizeLimit(root: string, body: string): void {
  const pkgDir = join(root, "node_modules", "size-limit");
  mkdirSync(pkgDir, { recursive: true });
  writeFileSync(
    join(pkgDir, "package.json"),
    JSON.stringify({ name: "size-limit", version: "0.0.0", bin: { "size-limit": "bin.js" } })
  );
  writeFileSync(join(pkgDir, "bin.js"), body);
}

/** Write the .size-limit.json + a matching entry file, as the real repo has. */
function writeSizeLimitConfig(root: string, entryPath: string): void {
  writeFileSync(
    join(root, ".size-limit.json"),
    JSON.stringify([{ name: "CLI", path: entryPath, limit: "15 KB" }])
  );
  mkdirSync(join(root, "config", "quality"), { recursive: true });
  writeFileSync(
    join(root, "config", "quality", "quality-baseline.json"),
    JSON.stringify({ metrics: { bundleSize: { value: 10384 } } })
  );
}

/**
 * Build a fixture repo whose size-limit behaves as given, so the gate's
 * measurement-failure branches can be reached deterministically.
 */
function withStubbedSizeLimit(behaviour: "no-plugins" | "crash", fn: (root: string) => void): void {
  const root = mkdtempSync(join(tmpdir(), "bundle-unmeasurable-"));
  try {
    const body =
      behaviour === "no-plugins"
        ? `console.error("Install Size Limit preset to measure bundles");process.exit(1);\n`
        : `console.error("size-limit: internal explosion");process.exit(7);\n`;
    installFakeSizeLimit(root, body);

    // .size-limit.json points at committed sources, as the real repo does.
    writeSizeLimitConfig(root, "bin/omniroute.mjs");
    mkdirSync(join(root, "bin"), { recursive: true });
    writeFileSync(join(root, "bin", "omniroute.mjs"), "export const x = 1;\n");

    fn(root);
  } finally {
    rmSync(root, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
}

function withMissingBuild(fn: (root: string) => void): void {
  const root = mkdtempSync(join(tmpdir(), "bundle-nobuild-"));
  try {
    // No node_modules/.bin/size-limit at all → SL_NO_BIN → fallback-stat.
    // And .size-limit.json points at artifacts that do not exist → allMissing.
    writeFileSync(
      join(root, ".size-limit.json"),
      JSON.stringify([{ name: "Gone", path: "dist/never-built.mjs", limit: "1 KB" }])
    );
    fn(root);
  } finally {
    rmSync(root, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
}

// ---------------------------------------------------------------------------
// G-04 — the four "cannot measure" paths must not report success under --ratchet
// ---------------------------------------------------------------------------

test("G-04: an unexpected size-limit error is non-zero under --ratchet", () => {
  withStubbedSizeLimit("crash", (root) => {
    const result = runGate(root, ["--ratchet"]);

    assert.equal(
      result.status,
      1,
      `a measurement failure must not exit 0 under --ratchet; got status=${result.status}\nout=${result.stdout}\nerr=${result.stderr}`
    );
    const output = result.stdout + result.stderr;
    assert.match(output, /bundleSize=SKIP reason=size-limit-error/, "must still name the reason");
  });
});

test("G-04: a size-limit with no plugins is non-zero under --ratchet", () => {
  withStubbedSizeLimit("no-plugins", (root) => {
    const result = runGate(root, ["--ratchet"]);

    assert.equal(
      result.status,
      1,
      `without @size-limit/file the baseline cannot be verified; got status=${result.status}\nout=${result.stdout}`
    );
  });
});

test("G-04: no measurable build artifact is non-zero under --ratchet", () => {
  withMissingBuild((root) => {
    const result = runGate(root, ["--ratchet"]);

    assert.equal(
      result.status,
      1,
      `"no-build" is a failed measurement, not a pass; got status=${result.status}\nout=${result.stdout}`
    );
    const output = result.stdout + result.stderr;
    assert.match(output, /bundleSize=SKIP reason=no-build/);
  });
});

test("G-04: every unmeasurable path explains how to produce a measurement", () => {
  withStubbedSizeLimit("crash", (root) => {
    const result = runGate(root, ["--ratchet"]);
    const output = result.stdout + result.stderr;

    // A gate that fails without saying what to do gets disabled next week.
    assert.match(
      output,
      /size-limit|npm (ci|install)|@size-limit/i,
      `the failure must name the tool that failed or the fix; got: ${output.trim()}`
    );
  });
});

test("G-04: a missing baseline is non-zero under --ratchet", () => {
  const root = mkdtempSync(join(tmpdir(), "bundle-nobaseline-"));
  try {
    // A working stub that reports a measurement, but there is no baseline file,
    // so the ratchet has nothing to compare against and enforces nothing.
    installFakeSizeLimit(root, `console.log(JSON.stringify([{name:"CLI",size:1234}]));\n`);
    writeFileSync(
      join(root, ".size-limit.json"),
      JSON.stringify([{ name: "CLI", path: "bin/omniroute.mjs", limit: "15 KB" }])
    );

    const result = runGate(root, ["--ratchet"]);

    assert.equal(
      result.status,
      1,
      `a ratchet with no baseline enforces nothing and must say so; got status=${result.status}\nout=${result.stdout}`
    );
    assert.match(result.stdout + result.stderr, /baseline/i);
  } finally {
    rmSync(root, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

// ---------------------------------------------------------------------------
// Advisory mode must stay non-blocking — this is the distinction that matters
// ---------------------------------------------------------------------------

test("G-04: advisory mode still exits 0 when it cannot measure", () => {
  withStubbedSizeLimit("crash", (root) => {
    const result = runGate(root, []);

    assert.equal(
      result.status,
      0,
      `advisory mode must not block a local run; got status=${result.status}\nout=${result.stdout}`
    );
    assert.match(result.stdout + result.stderr, /bundleSize=SKIP reason=size-limit-error/);
  });
});

test("G-04: advisory mode still exits 0 with no build", () => {
  withMissingBuild((root) => {
    const result = runGate(root, []);

    assert.equal(result.status, 0, `got status=${result.status}\nout=${result.stdout}`);
  });
});

// ---------------------------------------------------------------------------
// A real regression must still be caught (guard against over-correcting)
// ---------------------------------------------------------------------------

test("G-04: a measured regression above the baseline is still non-zero", () => {
  const root = mkdtempSync(join(tmpdir(), "bundle-regression-"));
  try {
    // 20000 bytes measured against a 10384 baseline.
    installFakeSizeLimit(root, `console.log(JSON.stringify([{name:"CLI",size:20000}]));\n`);
    writeSizeLimitConfig(root, "bin/omniroute.mjs");

    const result = runGate(root, ["--ratchet"]);

    assert.equal(result.status, 1, `a real regression must block; got status=${result.status}`);
    assert.match(result.stdout + result.stderr, /REGRESS/i);
  } finally {
    rmSync(root, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("G-04: a measurement at or below the baseline still passes under --ratchet", () => {
  const root = mkdtempSync(join(tmpdir(), "bundle-clean-"));
  try {
    installFakeSizeLimit(root, `console.log(JSON.stringify([{name:"CLI",size:5000}]));\n`);
    writeSizeLimitConfig(root, "bin/omniroute.mjs");

    const result = runGate(root, ["--ratchet"]);

    assert.equal(result.status, 0, `a clean measurement must pass; got ${result.stdout}`);
  } finally {
    rmSync(root, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("the gate script exists at the path package.json invokes", () => {
  assert.ok(existsSync(SCRIPT), `expected the gate at ${SCRIPT}`);
});

// ---------------------------------------------------------------------------
// G-04 follow-on: the measurement itself never worked on Windows
// ---------------------------------------------------------------------------
//
// runSizeLimit used to exec `node node_modules/.bin/size-limit --json`. On
// Windows that path is a shell shim, not JavaScript, so `node <shim>` died with
// "SyntaxError: missing ) after argument list" on every invocation — the
// preferred measurement mode was unreachable on a Windows dev machine. That was
// invisible while the failure exited 0; once G-04 made an unmeasurable run
// non-zero, the underlying "can never measure here" became the visible failure.
//
// The repo already solved this exact class for esbuild in
// scripts/build/buildToolRunner.mjs (Windows postbuild ENOENT incident), so the
// fix reuses that resolution rather than inventing a second one.

test("G-04: runSizeLimit resolves the package's own JS entry, not the .bin shim", async () => {
  const mod = (await import(pathToFileURL(SCRIPT).href)) as {
    resolveSizeLimitInvocation?: (args: string[]) => {
      file: string;
      args: string[];
      shell: boolean;
    };
  };
  assert.equal(
    typeof mod.resolveSizeLimitInvocation,
    "function",
    "check-bundle-size.mjs must expose how it invokes size-limit so the Windows path is testable"
  );

  const plan = mod.resolveSizeLimitInvocation!(["--json"]);

  assert.equal(plan.file, process.execPath, "a JS entry must run on this Node binary");
  assert.equal(plan.shell, false, "no shell means no argument-escaping hazard");

  // Separator-agnostic: this suite runs on Windows (backslashes) and Linux.
  const entry = (plan.args[0] ?? "").replace(/\\/g, "/");
  assert.match(
    entry,
    /size-limit\/bin(\.js)?$/,
    `must resolve the real size-limit JS entry, got ${plan.args[0]}`
  );
  assert.ok(
    !entry.includes("/.bin/"),
    `must never hand a node_modules/.bin shim to node — that is the Windows crash; got ${entry}`
  );
});

test("G-04: size-limit actually runs through the resolved entry on this platform", async () => {
  const mod = (await import(pathToFileURL(SCRIPT).href)) as {
    runSizeLimit?: (cwd?: string) => Array<{ name: string; size: number }>;
  };
  assert.equal(typeof mod.runSizeLimit, "function");

  // The real gate, on the real repo, on whatever platform this is. Before the
  // fix this threw on Windows; it is the regression guard for the whole path.
  const results = mod.runSizeLimit!(process.cwd());
  assert.ok(Array.isArray(results) && results.length > 0, "size-limit must return entries");
  assert.ok(
    results.every((r) => typeof r.size === "number"),
    "every entry must carry a numeric size, otherwise the ratchet cannot compare"
  );
});
