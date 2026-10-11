#!/usr/bin/env node
/**
 * Nightly version for `develop` builds: `<core>-nightly.<YYYYMMDD>.<sha7>`
 * (docs/ops/RELEASE_STRATEGY.md → channel `nightly`). Used by
 * .github/workflows/nightly-v4-build.yml.
 *
 *   node scripts/release/compute-nightly-version.mjs [--base 4.0.0] [--sha <sha>] [--date <iso>]
 *
 * Defaults: --base = package.json version, --sha = $GITHUB_SHA or `git rev-parse HEAD`
 * (execFileSync with an argv array — no shell), --date = now. All values are
 * validated; the output is guaranteed to parse as semver.
 */
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseVersion, resolveDistTag } from "./dist-tag.mjs";

export { resolveDistTag };

const SHA_RE = /^[0-9a-f]{7,64}$/;

/** `YYYYMMDD` of a Date in UTC. */
export function formatUtcDate(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    throw new Error("Invalid date");
  }
  const y = String(date.getUTCFullYear()).padStart(4, "0");
  const m = String(date.getUTCMonth() + 1).padStart(2, "0");
  const d = String(date.getUTCDate()).padStart(2, "0");
  return `${y}${m}${d}`;
}

/**
 * @param {{ baseVersion: string, date: Date, sha: string }} input
 * @returns {string} e.g. `4.0.0-nightly.20261009.f90e64a`
 */
export function computeNightlyVersion({ baseVersion, date, sha }) {
  const base = parseVersion(baseVersion);
  if (!base) throw new Error(`Invalid base version: ${JSON.stringify(baseVersion)}`);
  const normalizedSha = String(sha ?? "")
    .trim()
    .toLowerCase();
  if (!SHA_RE.test(normalizedSha)) throw new Error(`Invalid commit SHA: ${JSON.stringify(sha)}`);

  let short = normalizedSha.slice(0, 7);
  // An all-digit identifier is numeric in semver; a leading zero makes it invalid
  // and npm refuses the version. Prefix like `git describe` does.
  if (/^\d+$/.test(short)) short = `g${short}`;

  const version = `${base.major}.${base.minor}.${base.patch}-nightly.${formatUtcDate(date)}.${short}`;
  if (!parseVersion(version)) throw new Error(`Computed an invalid version: ${version}`);
  return version;
}

function readFlag(argv, name) {
  const idx = argv.indexOf(name);
  if (idx === -1) return undefined;
  const value = argv[idx + 1];
  if (value === undefined || value.startsWith("--")) throw new Error(`${name} needs a value`);
  return value;
}

function main(argv) {
  const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
  const baseVersion =
    readFlag(argv, "--base") ??
    JSON.parse(readFileSync(path.join(repoRoot, "package.json"), "utf8")).version;
  const sha =
    readFlag(argv, "--sha") ??
    process.env.GITHUB_SHA ??
    execFileSync("git", ["rev-parse", "HEAD"], { cwd: repoRoot, encoding: "utf8" }).trim();
  const dateFlag = readFlag(argv, "--date");
  const date = dateFlag ? new Date(dateFlag) : new Date();
  process.stdout.write(`${computeNightlyVersion({ baseVersion, date, sha })}\n`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  try {
    main(process.argv.slice(2));
  } catch (error) {
    process.stderr.write(
      `compute-nightly-version: ${error instanceof Error ? error.message : error}\n`
    );
    process.exit(1);
  }
}
