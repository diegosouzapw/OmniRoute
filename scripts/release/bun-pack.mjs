#!/usr/bin/env node

/**
 * bun-pack — produce an npm-registry-compatible tarball, Bun-first.
 *
 * Bun is the default package manager for the whole flow (build orchestration
 * and packing) because it is measurably faster and lighter than npm on the
 * same machine. Node still runs the actual `next` build and the dist assembly
 * (AGENTS.md: Bun is NOT widened into the build path, npm install,
 * check:pack-artifact, or the published runtime) — `bun run` only executes the
 * same Node build scripts npm would, without npm's overhead.
 *
 * The npm publish channel stays the release-captain flow
 * (scripts/release/verify-published.mjs). `bun pm pack` and `npm pack` produce
 * the SAME universal npm tarball format, so either packer's output installs
 * with both `bun add -g <tarball>` and `npm install -g <tarball>`.
 *
 * Usage:
 *   node scripts/release/bun-pack.mjs [--pm bun|npm] [--skip-build] [--destination <dir>]
 *
 * Flags:
 *   --pm bun|npm        Packer + build runner. Default: bun (npm is the fallback).
 *   --skip-build        Reuse an already-staged dist/ (or run
 *                       `npm run build:release` / `bun run build:release` first).
 *                       Default: build first (needs the workspace node_modules).
 *   --destination <dir> Output directory. Default: <repo-root>/_artifacts.
 *
 * Output:   <destination>/omniroute-<version>.tgz  (universal tarball, gzip)
 * Verified: package.json, both bin entries, and dist/ are inside the tarball.
 * Cross-platform: node >= 22, bun >= 1.1; no shell string interpolation
 * (secrets/env travel as spawn options, never in the script body).
 *
 * `parseArgs` and `verifyTarball` are pure (no `process.exit`) and exported so
 * they are unit-testable without a real build — see tests/unit/bun-pack.test.ts.
 * They signal a bad-input/bad-tarball condition by throwing `UsageError`; only
 * the direct-run `main()` below translates that into the CLI's `fail()` exit.
 */

import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "..");
const isWin = process.platform === "win32";
const npmBin = isWin ? "npm.cmd" : "npm";
const bunBin = isWin ? "bun.exe" : "bun";

export class UsageError extends Error {}

function log(line) {
  console.log(`[bun-pack] ${line}`);
}

function fail(message, exitCode = 1) {
  console.error(`[bun-pack] ❌ ${message}`);
  process.exit(exitCode);
}

export function parseArgs(argv, defaultDestination = join(ROOT, "_artifacts")) {
  const opts = { pm: "bun", skipBuild: false, destination: defaultDestination };
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === "--pm") {
      const pm = (argv[++i] || "").toLowerCase();
      if (pm !== "bun" && pm !== "npm") throw new UsageError("--pm must be bun or npm");
      opts.pm = pm;
    } else if (argv[i] === "--skip-build") {
      opts.skipBuild = true;
    } else if (argv[i] === "--destination") {
      opts.destination = argv[++i];
    } else {
      throw new UsageError(`unknown argument "${argv[i]}"`);
    }
  }
  if (!opts.destination) throw new UsageError("--destination requires a directory path");
  return opts;
}

function readVersion() {
  const pkg = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8"));
  if (!/^\d+\.\d+\.\d+(-[A-Za-z0-9.-]+)?$/.test(pkg.version || "")) {
    fail(`invalid version in package.json: ${pkg.version}`);
  }
  return pkg.version;
}

function run(bin, args, opts = {}) {
  return spawnSync(bin, args, { cwd: ROOT, encoding: "utf8", ...opts });
}

export function verifyTarball(tarball) {
  const list = run("tar", ["-tzf", tarball]);
  if (list.status !== 0) {
    throw new UsageError(`could not read tarball listing (${list.error?.message || "tar failed"})`);
  }
  const entries = new Set((list.stdout || "").split("\n").map((l) => l.replace(/\/$/, "")));

  const requiredFiles = [
    "package/package.json",
    "package/bin/omniroute.mjs",
    "package/bin/reset-password.mjs",
  ];
  const missing = requiredFiles.filter((entry) => !entries.has(entry));
  if (missing.length > 0)
    throw new UsageError(`tarball missing required entries: ${missing.join(", ")}`);

  const distFiles = [...entries].filter((e) => e.startsWith("package/dist/"));
  if (distFiles.length === 0)
    throw new UsageError("tarball contains an empty dist/ — run the build first");
  return distFiles.length;
}

function main() {
  log("OmniRoute release pack (npm-compatible tarball)");
  if (!existsSync(join(ROOT, "package.json"))) fail(`no package.json at ${ROOT}`);

  let opts;
  try {
    opts = parseArgs(process.argv.slice(2));
  } catch (err) {
    if (err instanceof UsageError) fail(err.message);
    throw err;
  }

  const version = readVersion();
  const tarball = join(opts.destination, `omniroute-${version}.tgz`);
  const isBun = opts.pm === "bun";

  if (isBun) {
    const bunCheck = run(bunBin, ["--version"]);
    if (bunCheck.status !== 0) {
      fail(
        "bun not found — run `npm run bun:release` or install bun (curl -fsSL https://bun.sh/install | bash)"
      );
    }
    log(`packer: bun ${bunCheck.stdout.trim()}`);
  } else {
    log("packer: npm (fallback)");
  }

  if (opts.skipBuild) {
    if (!existsSync(join(ROOT, "dist", "server.js"))) {
      fail("dist/ not staged — run `bun run build:release` first, or drop --skip-build");
    }
    log("reusing existing dist/ (--skip-build)");
  } else {
    const runner = isBun ? bunBin : npmBin;
    log(`running ${opts.pm} run build:release (Node runs the actual build)`);
    const b = run(runner, ["run", "build:release"], { stdio: "inherit" });
    if (b.status !== 0) fail(`build:release failed (exit ${b.status})`);
  }

  if (!existsSync(opts.destination)) mkdirSync(opts.destination, { recursive: true });
  if (existsSync(tarball)) {
    log(`removing stale ${tarball}`);
    rmSync(tarball, { force: true });
  }

  const packArgs =
    opts.pm === "npm"
      ? ["pack", "--ignore-scripts", "--pack-destination", opts.destination, "--json"]
      : ["pm", "pack", "--destination", opts.destination, "--ignore-scripts", "--quiet"];
  const p = run(isBun ? bunBin : npmBin, packArgs, { stdio: "inherit" });
  if (p.status !== 0) fail(`${opts.pm} pack failed (exit ${p.status})`);

  if (!existsSync(tarball)) fail(`${opts.pm} pack completed but ${tarball} was not created`);

  let distFiles;
  try {
    distFiles = verifyTarball(tarball);
  } catch (err) {
    if (err instanceof UsageError) fail(err.message);
    throw err;
  }
  log(`✅ packed ${tarball} (${distFiles} tracked dist/ entries verified)`);
  log(`install (bun):   bun add -g ${tarball}`);
  log(`install (npm):   npm install -g ${tarball}`);
  log(`uninstall (bun): bun remove -g omniroute`);
  log(`run:             omniroute serve`);
}

// direct-run guard (importable for tests)
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main();
}
