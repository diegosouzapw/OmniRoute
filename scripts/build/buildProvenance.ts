/**
 * Build provenance — is this artifact actually built from the release line? (#10427)
 *
 * `scripts/build/write-build-sha.mjs` stamps `dist/BUILD_SHA` into every packaged build,
 * but nothing ever verified that the SHA belongs to the release branch. A tarball built
 * from a feature branch installs and serves traffic indistinguishably from a release one.
 *
 * That gap took down the internal gateway on 2026-08-14: the installed package carried
 * `BUILD_SHA = 178febc50f`, a commit on `fix/9603-qwen-token-plan-quota` that predated
 * #10373, so it shipped the nominal `instanceof Response` guard from #10256 and answered
 * every request with `502 … Executor result must contain a Response`.
 *
 * Kept as pure functions (the ancestry probe is injected) so the policy is unit-testable
 * without a git fixture, and so the caller decides how strict to be per environment.
 */

import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

export type BuildProvenanceReason =
  | "on-release-line"
  | "off-release-line"
  | "canary-override"
  | "missing-sha";

export type BuildProvenanceResult = {
  ok: boolean;
  reason: BuildProvenanceReason;
  message: string;
};

export type BuildProvenanceInput = {
  /** Contents of `dist/BUILD_SHA` (empty when the sentinel is absent). */
  buildSha: string;
  /** Whether `buildSha` is an ancestor of the release ref. Injected so this stays pure. */
  isAncestorOfRelease: (sha: string) => boolean;
  /** Deliberate canary build — allowed, but always reported. */
  allowOverride: boolean;
};

/**
 * Read `dist/BUILD_SHA` from a package root. Returns "" when absent — an unstamped build
 * is a policy decision for the caller, not an exception here.
 */
export function readBuildSha(packageRoot: string): string {
  try {
    return fs.readFileSync(path.join(packageRoot, "dist", "BUILD_SHA"), "utf8").trim();
  } catch {
    return "";
  }
}

/**
 * Classify a build SHA against the release line.
 *
 * A missing SHA fails even with the override on: an artifact that cannot be identified
 * cannot be vouched for, and "canary" is a statement about a KNOWN commit.
 */
export function resolveBuildProvenance(input: BuildProvenanceInput): BuildProvenanceResult {
  const { buildSha, isAncestorOfRelease, allowOverride } = input;

  if (!buildSha) {
    return {
      ok: false,
      reason: "missing-sha",
      message:
        "dist/BUILD_SHA is missing — the artifact cannot be traced to a commit. " +
        "Build with `npm run build:release` (or run scripts/build/write-build-sha.mjs).",
    };
  }

  if (isAncestorOfRelease(buildSha)) {
    return {
      ok: true,
      reason: "on-release-line",
      message: `BUILD_SHA ${buildSha} is on the release line.`,
    };
  }

  if (allowOverride) {
    return {
      ok: true,
      reason: "canary-override",
      message:
        `BUILD_SHA ${buildSha} is NOT on the release line — allowed as a canary build ` +
        "because OMNIROUTE_ALLOW_CANARY_BUILD=1 was set.",
    };
  }

  return {
    ok: false,
    reason: "off-release-line",
    message:
      `BUILD_SHA ${buildSha} is not an ancestor of the release branch. Shipping it means ` +
      "serving code that never passed the release gates (see #10427). Rebuild from the " +
      "release tip, or set OMNIROUTE_ALLOW_CANARY_BUILD=1 to record this as a deliberate canary.",
  };
}

/**
 * Default ancestry probe: `git merge-base --is-ancestor <sha> <releaseRef>`.
 *
 * Any git failure (shallow clone, unknown ref, SHA not fetched) resolves to `false` —
 * "cannot prove it is on the release line" is the safe answer for a gate whose whole
 * purpose is to refuse unverifiable artifacts.
 */
export function makeGitAncestryProbe(releaseRef: string, cwd: string): (sha: string) => boolean {
  return (sha: string) => {
    try {
      execFileSync("git", ["merge-base", "--is-ancestor", sha, releaseRef], {
        cwd,
        stdio: "ignore",
      });
      return true;
    } catch {
      return false;
    }
  };
}
