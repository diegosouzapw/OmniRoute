import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import {
  parseArgs,
  verifyTarball,
  UsageError,
  // @ts-expect-error — .mjs helper has no type declarations; runtime shape is known.
} from "../../scripts/release/bun-pack.mjs";

// Everything below runs against os.tmpdir() temp directories only — never the
// real DATA_DIR / repo _artifacts.

function mkTmpDir(prefix: string): string {
  return fs.mkdtempSync(path.join(os.tmpdir(), prefix));
}

function buildTarball(
  dir: string,
  {
    withPackageJson = true,
    withBinOmniroute = true,
    withBinResetPassword = true,
    withDistFile = true,
  }: {
    withPackageJson?: boolean;
    withBinOmniroute?: boolean;
    withBinResetPassword?: boolean;
    withDistFile?: boolean;
  } = {}
): string {
  const stage = path.join(dir, "stage");
  const pkgDir = path.join(stage, "package");
  fs.mkdirSync(path.join(pkgDir, "bin"), { recursive: true });
  fs.mkdirSync(path.join(pkgDir, "dist"), { recursive: true });

  if (withPackageJson) {
    fs.writeFileSync(path.join(pkgDir, "package.json"), JSON.stringify({ name: "omniroute" }));
  }
  if (withBinOmniroute) {
    fs.writeFileSync(path.join(pkgDir, "bin", "omniroute.mjs"), "// stub\n");
  }
  if (withBinResetPassword) {
    fs.writeFileSync(path.join(pkgDir, "bin", "reset-password.mjs"), "// stub\n");
  }
  if (withDistFile) {
    fs.writeFileSync(path.join(pkgDir, "dist", "server.js"), "// stub\n");
  }

  const tarball = path.join(dir, "omniroute-test.tgz");
  const tarResult = spawnSync("tar", ["czf", tarball, "-C", stage, "package"], {
    encoding: "utf8",
  });
  assert.equal(tarResult.status, 0, `failed to build fixture tarball: ${tarResult.stderr}`);
  return tarball;
}

// ---------------------------------------------------------------------------
// parseArgs
// ---------------------------------------------------------------------------

test("parseArgs: defaults to bun/no-skip-build/given destination when no flags are passed", () => {
  const opts = parseArgs([], "/tmp/fake-artifacts");
  assert.deepEqual(opts, { pm: "bun", skipBuild: false, destination: "/tmp/fake-artifacts" });
});

test("parseArgs: --pm npm is accepted and overrides the default", () => {
  const opts = parseArgs(["--pm", "npm"], "/tmp/fake-artifacts");
  assert.equal(opts.pm, "npm");
});

test("parseArgs: --pm bun is accepted explicitly", () => {
  const opts = parseArgs(["--pm", "bun"], "/tmp/fake-artifacts");
  assert.equal(opts.pm, "bun");
});

test("parseArgs: --pm is case-insensitive", () => {
  const opts = parseArgs(["--pm", "NPM"], "/tmp/fake-artifacts");
  assert.equal(opts.pm, "npm");
});

test("parseArgs: --skip-build flips skipBuild to true", () => {
  const opts = parseArgs(["--skip-build"], "/tmp/fake-artifacts");
  assert.equal(opts.skipBuild, true);
});

test("parseArgs: --destination overrides the default output directory", () => {
  const opts = parseArgs(["--destination", "/tmp/custom-out"], "/tmp/fake-artifacts");
  assert.equal(opts.destination, "/tmp/custom-out");
});

test("parseArgs: combines multiple flags together", () => {
  const opts = parseArgs(
    ["--pm", "npm", "--skip-build", "--destination", "/tmp/custom-out"],
    "/tmp/fake-artifacts"
  );
  assert.deepEqual(opts, { pm: "npm", skipBuild: true, destination: "/tmp/custom-out" });
});

test("parseArgs: rejects an invalid --pm value with UsageError (bad input, does not exit)", () => {
  assert.throws(
    () => parseArgs(["--pm", "bogus"], "/tmp/fake-artifacts"),
    (err: unknown) => err instanceof UsageError && err.message === "--pm must be bun or npm"
  );
});

test("parseArgs: rejects an unrecognized flag with UsageError (bad input)", () => {
  assert.throws(
    () => parseArgs(["--unknown-flag"], "/tmp/fake-artifacts"),
    (err: unknown) =>
      err instanceof UsageError && /unknown argument "--unknown-flag"/.test(err.message)
  );
});

test("parseArgs: --destination with no value throws UsageError (bad input)", () => {
  assert.throws(
    () => parseArgs(["--destination"], "/tmp/fake-artifacts"),
    (err: unknown) =>
      err instanceof UsageError && /--destination requires a directory path/.test(err.message)
  );
});

// ---------------------------------------------------------------------------
// verifyTarball
// ---------------------------------------------------------------------------

test("verifyTarball: a well-formed tarball passes and reports its dist/ entry count", (t) => {
  const dir = mkTmpDir("bun-pack-good-");
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  const tarball = buildTarball(dir);

  const distFiles = verifyTarball(tarball);
  assert.equal(distFiles, 1);
});

test("verifyTarball: a missing tarball path throws UsageError instead of crashing", (t) => {
  const dir = mkTmpDir("bun-pack-missing-");
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  const missingPath = path.join(dir, "does-not-exist.tgz");

  assert.throws(
    () => verifyTarball(missingPath),
    (err: unknown) =>
      err instanceof UsageError && /could not read tarball listing/.test(err.message)
  );
});

test("verifyTarball: a corrupted (non-gzip) tarball throws UsageError", (t) => {
  const dir = mkTmpDir("bun-pack-corrupt-");
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  const corrupted = path.join(dir, "corrupted.tgz");
  fs.writeFileSync(corrupted, "this is not a gzip tarball at all");

  assert.throws(
    () => verifyTarball(corrupted),
    (err: unknown) =>
      err instanceof UsageError && /could not read tarball listing/.test(err.message)
  );
});

test("verifyTarball: a tarball missing a required bin entry throws UsageError naming it", (t) => {
  const dir = mkTmpDir("bun-pack-missing-bin-");
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  const tarball = buildTarball(dir, { withBinResetPassword: false });

  assert.throws(
    () => verifyTarball(tarball),
    (err: unknown) =>
      err instanceof UsageError &&
      /tarball missing required entries: package\/bin\/reset-password\.mjs/.test(err.message)
  );
});

test("verifyTarball: a tarball with an empty dist/ throws UsageError", (t) => {
  const dir = mkTmpDir("bun-pack-empty-dist-");
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  const tarball = buildTarball(dir, { withDistFile: false });

  assert.throws(
    () => verifyTarball(tarball),
    (err: unknown) => err instanceof UsageError && /empty dist/.test(err.message)
  );
});
