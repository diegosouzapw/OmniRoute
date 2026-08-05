/**
 * Regression guard for the v3.8.49 desktop channel, which shipped with ZERO assets
 * while every gate stayed green.
 *
 * What actually happened, measured from the run (30503231362) and not inferred:
 *
 *   Build Electron (windows) ....... success
 *   Build Electron (macos-intel) ... success
 *   Build Electron (macos-arm64) ... success
 *   Build Electron (linux) ......... failure — "The runner has received a shutdown
 *                                    signal", 8 min into "Creating an optimized
 *                                    production build", on runner `GitHub Actions
 *                                    1000378558` (github-hosted)
 *   Create Release ................. skipped
 *   Publish to npm ................. skipped
 *
 * Three independent defects compounded:
 *
 *  1. Turbopack's production build allocates natively (Rust, off the V8 heap), so
 *     `--max_old_space_size` does not bound it. On this module graph it outgrows what
 *     the hosted runner can give and the VM is reclaimed mid-compile — the same wall
 *     nightly-compat hit on Node 26 (#8090) and the same documented remedy applies:
 *     the webpack fallback (OMNIROUTE_USE_TURBOPACK=0, docs/reference/ENVIRONMENT.md,
 *     #6409). The identical build passes on a 32 GB machine, peaking past 14 GB.
 *
 *  2. `release` gated on `needs: [validate, build]` with no `if:`, so ONE failing
 *     matrix leg skipped it and discarded the three artifacts that DID build (1.7 GB,
 *     retained for 90 days and recoverable by hand) plus the source archives, which
 *     depend on no build at all. Fail-closed made a partial failure look total.
 *
 *  3. Nothing anywhere asserted the release HAS assets. A release with 16 binaries and
 *     a release with 0 were indistinguishable to CI.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const workflowPath = path.join(repoRoot, ".github/workflows/electron-release.yml");

function readWorkflow(): string {
  return fs.readFileSync(workflowPath, "utf-8");
}

/** Job keys live at 2-space indentation under `jobs:`; the next such key ends the block. */
function extractJobBlock(yaml: string, jobName: string): string {
  const lines = yaml.split("\n");
  const startIdx = lines.findIndex((l) => new RegExp(`^  ${jobName}:\\s*$`).test(l));
  assert.ok(startIdx !== -1, `electron-release.yml must define the ${jobName} job`);
  const block: string[] = [];
  for (let i = startIdx + 1; i < lines.length; i++) {
    if (/^  \S/.test(lines[i])) break;
    block.push(lines[i]);
  }
  return block.join("\n");
}

test("the linux leg builds with the webpack fallback, not Turbopack", () => {
  const buildBlock = extractJobBlock(readWorkflow(), "build");

  assert.match(buildBlock, /npm run build/, "the build job must still run the production build");
  assert.match(
    buildBlock,
    /OMNIROUTE_USE_TURBOPACK:/,
    "the build job must pin the bundler explicitly — leaving it to the default is what " +
      "let the linux leg die on the hosted runner and take the whole desktop channel down"
  );
  // The value is per-platform: linux gets webpack ('0'), the platforms that already
  // build fine keep Turbopack. A blanket '0' would slow Windows/macOS for no reason.
  assert.match(
    buildBlock,
    /matrix\.platform == 'linux'[^\n]*'0'/,
    "linux specifically must select the webpack fallback ('0')"
  );
});

test("one failing platform does not discard the platforms that built", () => {
  const releaseBlock = extractJobBlock(readWorkflow(), "release");

  assert.match(
    releaseBlock,
    /if:\s*\$\{\{\s*!cancelled\(\)/,
    "the release job must run even when a build leg failed — a bare `needs: [.., build]` " +
      "skips it on the first failure and throws away every artifact that succeeded"
  );
  assert.match(
    releaseBlock,
    /needs\.validate\.result == 'success'/,
    "…but it must still require `validate` to have passed, so a bad version never releases"
  );
  assert.match(
    releaseBlock,
    /fail_on_unmatched_files:\s*false/,
    "attaching a partial set requires tolerating globs that match nothing"
  );
});

test("a release with no binaries fails a job instead of passing unnoticed", () => {
  const wf = readWorkflow();
  const verifyBlock = extractJobBlock(wf, "verify-desktop-assets");

  for (const pattern of ["exe", "dmg", "AppImage", "deb"]) {
    assert.ok(
      verifyBlock.includes(pattern),
      `the asset check must assert a ${pattern} installer is present`
    );
  }
  assert.match(verifyBlock, /exit 1/, "a missing platform must fail the job, not just warn");
});

test("the asset check is a separate job, so it cannot block the npm channel", () => {
  const wf = readWorkflow();

  // publish-npm gates on `release`. If the assert lived inside `release`, a desktop-only
  // gap would also stop the npm publish — the primary distribution channel.
  const publishBlock = extractJobBlock(wf, "publish-npm");
  assert.match(
    publishBlock,
    /needs:\s*\[validate, release\]/,
    "publish-npm is expected to gate on release; if that changes, revisit this reasoning"
  );
  assert.doesNotMatch(
    publishBlock,
    /verify-desktop-assets/,
    "publish-npm must NOT depend on the desktop asset check — npm must publish even when " +
      "a desktop platform is missing"
  );

  const releaseBlock = extractJobBlock(wf, "release");
  assert.doesNotMatch(
    releaseBlock,
    /exit 1/,
    "the release job must not fail on missing assets — that would cascade into publish-npm; " +
      "the dedicated verify-desktop-assets job carries that failure instead"
  );
});
