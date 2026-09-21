import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

/**
 * Regression guard for issue #11979 (Stage 8 shared standalone bundle fails
 * manifest verification on Windows because symlink targets were stored as
 * absolute, packing-machine-specific paths).
 *
 * npm ci on the ubuntu web-build leg is observed (run 33238093090) to
 * produce at least one ABSOLUTE .bin symlink target (an npm/bin-links
 * implementation detail) instead of the RELATIVE target a local `npm
 * install` produces for the identical file
 * (node_modules/global-agent/node_modules/.bin/semver -> ../semver/bin/semver.js).
 * An absolute target is not portable: it dangles once the packing machine's
 * path is gone (silent false-positive on POSIX) and Windows'
 * CreateSymbolicLink rewrites it to a drive-relative path on read-back
 * (outright verification failure) -- both symptoms share the same root
 * cause of never normalizing to a relative, tree-anchored form.
 */

const manifestMod = await import("../../../scripts/build/standaloneManifest.mjs");
const { buildStandaloneManifest, verifyStandaloneManifest, normalizeSymlinkTarget } =
  manifestMod as typeof manifestMod & {
    buildStandaloneManifest: (
      rootDir: string
    ) => Promise<{ version: number; entries: { path: string; symlink?: string }[] }>;
    verifyStandaloneManifest: (
      rootDir: string,
      manifest: unknown
    ) => Promise<{ ok: true } | { ok: false; errors: string[] }>;
    normalizeSymlinkTarget: (
      rootDir: string,
      entryRelPath: string,
      rawTarget: string
    ) => { ok: true; value: string } | { ok: false; reason: string };
  };

function tmpDir(prefix: string): string {
  return fs.mkdtempSync(path.join(os.tmpdir(), prefix));
}

/** Build the exact shape from the report: nested node_modules .bin symlink. */
function makeTreeWithAbsoluteBinSymlink(root: string): void {
  const semverDir = path.join(
    root,
    "node_modules",
    "global-agent",
    "node_modules",
    "semver",
    "bin"
  );
  fs.mkdirSync(semverDir, { recursive: true });
  fs.writeFileSync(path.join(semverDir, "semver.js"), "#!/usr/bin/env node\n// fake semver cli\n");

  const binDir = path.join(root, "node_modules", "global-agent", "node_modules", ".bin");
  fs.mkdirSync(binDir, { recursive: true });
  // Mirrors what the ubuntu web-build leg actually produced: an ABSOLUTE
  // symlink target tied to that machine's checkout path.
  fs.symlinkSync(path.join(semverDir, "semver.js"), path.join(binDir, "semver"));
}

test("#11979: buildStandaloneManifest relativizes an absolute .bin symlink target", async () => {
  const packRoot = tmpDir("standalone-pack-");
  makeTreeWithAbsoluteBinSymlink(packRoot);

  const manifest = await buildStandaloneManifest(packRoot);
  const entry = manifest.entries.find((e) => e.path.endsWith("node_modules/.bin/semver"));
  assert.ok(entry, "manifest must record the .bin/semver symlink entry");
  assert.ok(entry!.symlink, "entry must be recorded as a symlink");
  assert.equal(
    path.isAbsolute(entry!.symlink!),
    false,
    "recorded target must be relativized, not the packing-machine absolute path"
  );
  assert.equal(
    entry!.symlink,
    "../semver/bin/semver.js",
    "must match the portable form npm install already produces locally for this exact file"
  );

  fs.rmSync(packRoot, { recursive: true, force: true });
});

test("#11979: a relativized manifest restores to a working (non-dangling) symlink", async () => {
  const packRoot = tmpDir("standalone-pack-");
  makeTreeWithAbsoluteBinSymlink(packRoot);
  const manifest = await buildStandaloneManifest(packRoot);
  const entry = manifest.entries.find((e) => e.path.endsWith("node_modules/.bin/semver"))!;

  // packRoot no longer exists once the archive is shipped to another
  // machine/leg -- only the tar + manifest travel.
  fs.rmSync(packRoot, { recursive: true, force: true });

  // Simulate restoring the identical relative tree under a different
  // absolute root, exactly what extractTarGz now does: it recreates each
  // symlink verbatim from the (now-relativized) manifest string.
  const restoredRoot = tmpDir("standalone-restore-");
  const semverDir2 = path.join(
    restoredRoot,
    "node_modules",
    "global-agent",
    "node_modules",
    "semver",
    "bin"
  );
  fs.mkdirSync(semverDir2, { recursive: true });
  fs.writeFileSync(
    path.join(semverDir2, "semver.js"),
    "#!/usr/bin/env node\n// fake semver cli\n"
  );
  const binDir = path.join(restoredRoot, "node_modules", "global-agent", "node_modules", ".bin");
  fs.mkdirSync(binDir, { recursive: true });
  fs.symlinkSync(entry.symlink!, path.join(binDir, "semver"));

  const verdict = await verifyStandaloneManifest(restoredRoot, manifest);
  const restoredBin = path.join(binDir, "semver");

  assert.equal(
    fs.existsSync(restoredBin),
    true,
    "restored .bin/semver must resolve to the co-located semver.js"
  );
  assert.deepEqual(verdict, { ok: true }, "a genuinely portable restored tree must verify clean");

  fs.rmSync(restoredRoot, { recursive: true, force: true });
});

test("#11979: relative-target comparison is unaffected when both sides already match (scope boundary)", async () => {
  // The fix is about portability of the *recorded string*, not about
  // resolving the symlink on disk -- a relative target that matches the
  // manifest still verifies even if the referenced file happens to be
  // missing on this particular tree. Documented here so a future change
  // does not assume verifyStandaloneManifest performs fs resolution.
  const restoredRoot = tmpDir("standalone-restore-");
  const binDir = path.join(restoredRoot, "node_modules", "global-agent", "node_modules", ".bin");
  fs.mkdirSync(binDir, { recursive: true });
  fs.symlinkSync("../semver/bin/semver.js", path.join(binDir, "semver"));
  // Note: unlike the previous test, semver.js is never created here, so the
  // relative target is a real dangling reference on the restored tree.

  const manifest = {
    version: 1,
    entries: [
      {
        path: "node_modules/global-agent/node_modules/.bin/semver",
        bytes: 0,
        sha256: "",
        symlink: "../semver/bin/semver.js",
      },
    ],
  };

  const verdict = await verifyStandaloneManifest(restoredRoot, manifest);
  // The string-form comparison still matches (both sides are the same
  // relative string), which is correct: the manifest layer's job is
  // portability of the *recorded* target, not filesystem resolution --
  // this asserts that guarantee is unaffected by the fix.
  assert.deepEqual(verdict, { ok: true });

  fs.rmSync(restoredRoot, { recursive: true, force: true });
});

test("#11979: normalizeSymlinkTarget rejects an absolute target that escapes the tree root", () => {
  const rootDir = tmpDir("standalone-root-");
  const result = normalizeSymlinkTarget(
    rootDir,
    "node_modules/.bin/semver",
    "/completely/unrelated/path/semver.js"
  );
  assert.equal(result.ok, false);
  fs.rmSync(rootDir, { recursive: true, force: true });
});
