#!/usr/bin/env node
/**
 * npm dist-tag resolution for the release channels described in
 * docs/ops/RELEASE_STRATEGY.md:
 *
 *   latest   — the current stable major (v3 until the 4.0 GA)
 *   next     — release candidates / betas / alphas
 *   nightly  — `<core>-nightly.<YYYYMMDD>.<sha7>` builds of `develop`
 *   lts      — stable patches of the previous major after a new major went GA
 *   historic — an older stable that must not move any channel (publish guard only)
 *
 * Single source of the rules: `compute-nightly-version.mjs` re-exports
 * `resolveDistTag`, and `src/lib/system/releaseChannel.ts` mirrors it for the
 * runtime (kept identical by tests/unit/release-channel.test.ts).
 *
 * CLI (used by .github/workflows/npm-publish.yml — values arrive as quoted argv
 * and the git tags on stdin, so no workflow value is ever interpolated into a
 * script body):
 *
 *   git tag -l 'v[0-9]*' | node scripts/release/dist-tag.mjs --version 3.8.52 --requested auto
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const SEMVER_RE =
  /^v?(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+[0-9A-Za-z.-]+)?$/;

/** Pre-release identifiers that ship on `next` (legacy `pre`/`next` kept from the old regex). */
const NEXT_PRERELEASE_RE = /^(rc|beta|alpha|pre|next)(\.|$)/;
const NIGHTLY_PRERELEASE_RE = /^nightly(\.|$)/;

export const EXPLICIT_DIST_TAGS = Object.freeze(["latest", "next", "nightly", "lts", "historic"]);

/** Parse `[v]X.Y.Z[-pre][+build]`; returns null when it is not semver. */
export function parseVersion(version) {
  const match = SEMVER_RE.exec(String(version ?? "").trim());
  if (!match) return null;
  return {
    major: Number(match[1]),
    minor: Number(match[2]),
    patch: Number(match[3]),
    prerelease: match[4] ?? null,
  };
}

function requireVersion(version) {
  const parsed = parseVersion(version);
  if (!parsed) throw new Error(`Not a semver version: ${JSON.stringify(version)}`);
  return parsed;
}

/**
 * Channel a version belongs to.
 * @param {string} version
 * @param {{ latestMajor?: number | null }} [opts] major currently published on `latest`
 * @returns {"latest" | "next" | "nightly" | "lts"}
 */
export function resolveDistTag(version, opts = {}) {
  const parsed = requireVersion(version);
  if (parsed.prerelease) {
    if (NIGHTLY_PRERELEASE_RE.test(parsed.prerelease)) return "nightly";
    // rc/beta/alpha → next. An unknown suffix also goes to `next`: a pre-release
    // must never claim `latest` by falling through to the stable path.
    return "next";
  }
  const latestMajor = opts.latestMajor;
  if (Number.isInteger(latestMajor) && parsed.major < latestMajor) return "lts";
  return "latest";
}

function compareStable(a, b) {
  return a.major - b.major || a.minor - b.minor || a.patch - b.patch;
}

function stableTags(gitTags) {
  return (gitTags ?? [])
    .map((tag) => parseVersion(tag))
    .filter((parsed) => parsed && !parsed.prerelease);
}

/** Major of the highest stable `v*` tag — the major `latest` points at. */
export function highestStableMajor(gitTags) {
  const stable = stableTags(gitTags).sort(compareStable);
  return stable.length ? stable[stable.length - 1].major : null;
}

/**
 * The npm-publish.yml decision. Explicit tags are honored verbatim; `auto`
 * resolves the channel and then guards it: a stable version only claims
 * `latest` (or `lts`) when it is the highest stable tag of that channel —
 * otherwise `historic`, so re-publishing an old release never moves a channel.
 */
export function resolvePublishDistTag({ version, requested = "auto", gitTags = [] }) {
  const parsed = requireVersion(version);
  const wanted = String(requested ?? "").trim() || "auto";
  if (wanted !== "auto") {
    if (!EXPLICIT_DIST_TAGS.includes(wanted)) {
      throw new Error(`Unknown dist-tag ${JSON.stringify(wanted)}`);
    }
    return wanted;
  }

  const latestMajor = highestStableMajor(gitTags);
  const channel = resolveDistTag(version, { latestMajor });
  if (channel === "nightly" || channel === "next") return channel;

  // latest: compare against every stable tag; lts: only against older majors.
  const pool = stableTags(gitTags).filter((tag) =>
    channel === "lts" ? tag.major < latestMajor : true
  );
  const highest = pool.sort(compareStable).at(-1);
  if (highest && compareStable(highest, parsed) === 0) return channel;
  return "historic";
}

function readFlag(argv, name) {
  const idx = argv.indexOf(name);
  if (idx === -1) return undefined;
  const value = argv[idx + 1];
  if (value === undefined || value.startsWith("--")) throw new Error(`${name} needs a value`);
  return value;
}

function main(argv) {
  const version = readFlag(argv, "--version") ?? "";
  const requested = readFlag(argv, "--requested") ?? "auto";
  let stdin = "";
  try {
    stdin = readFileSync(0, "utf8");
  } catch {
    stdin = "";
  }
  const gitTags = stdin.split(/\r?\n/).filter(Boolean);
  process.stdout.write(`${resolvePublishDistTag({ version, requested, gitTags })}\n`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  try {
    main(process.argv.slice(2));
  } catch (error) {
    process.stderr.write(`dist-tag: ${error instanceof Error ? error.message : error}\n`);
    process.exit(1);
  }
}
