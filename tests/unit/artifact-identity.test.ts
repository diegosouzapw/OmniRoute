import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  BUILD_POLICY_VERSION,
  buildArtifactIdentity,
  hashLockfile,
  identityKey,
  parseIdentityArgs,
  resolveBundler,
} from "../../scripts/release/artifact-identity.mjs";

// Preview-artifact identity (#8084 slice (a)): the build-once workflow binds the
// artifact to head SHA + base SHA + lockfile fingerprint + platform/ABI + node,
// so the SAME validated tarball is the one that gets promoted — never a rebuild.

const SCRIPT = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../scripts/release/artifact-identity.mjs"
);
const HEAD = "a".repeat(40);
const BASE = "b".repeat(40);
const LOCK = '{"name":"omniroute","lockfileVersion":3}\n';

function baseInput(overrides: Record<string, unknown> = {}) {
  return {
    headSha: HEAD,
    baseSha: BASE,
    lockfileContent: LOCK,
    platform: "linux",
    arch: "x64",
    nodeAbi: "137",
    nodeVersion: "24.11.0",
    bundler: "turbopack",
    ...overrides,
  };
}

test("hashLockfile is a sha256 hex of the exact bytes", () => {
  const digest = hashLockfile(LOCK);
  assert.match(digest, /^[0-9a-f]{64}$/);
  assert.equal(digest, hashLockfile(LOCK), "deterministic");
  assert.notEqual(digest, hashLockfile(LOCK.replace("3", "2")), "any byte change moves the hash");
});

test("buildArtifactIdentity emits every field the workflow contract requires", () => {
  const identity = buildArtifactIdentity(baseInput());
  for (const key of [
    "headSha",
    "baseSha",
    "lockfileHash",
    "platform",
    "arch",
    "nodeAbi",
    "buildPolicyVersion",
  ]) {
    assert.ok(key in identity, `missing ${key}`);
    assert.ok(String(identity[key]).length > 0, `${key} must not be empty`);
  }
  assert.equal(identity.headSha, HEAD);
  assert.equal(identity.baseSha, BASE);
  assert.equal(identity.lockfileHash, hashLockfile(LOCK));
  assert.equal(identity.buildPolicyVersion, BUILD_POLICY_VERSION);
  assert.equal(identity.nodeVersion, "24.11.0");
  assert.equal(identity.bundler, "turbopack");
  assert.match(identity.identityKey, /^[0-9a-f]{64}$/);
});

test("SHAs are normalized to lowercase and must be full 40-hex commits", () => {
  const identity = buildArtifactIdentity(baseInput({ headSha: "A".repeat(40) }));
  assert.equal(identity.headSha, "a".repeat(40));
  assert.throws(() => buildArtifactIdentity(baseInput({ headSha: "abc1234" })), /headSha/);
  assert.throws(() => buildArtifactIdentity(baseInput({ baseSha: "" })), /baseSha/);
  assert.throws(() => buildArtifactIdentity(baseInput({ baseSha: "z".repeat(40) })), /baseSha/);
});

test("missing lockfile, platform, arch or ABI fail closed", () => {
  assert.throws(() => buildArtifactIdentity(baseInput({ lockfileContent: "" })), /lockfile/);
  assert.throws(() => buildArtifactIdentity(baseInput({ platform: "" })), /platform/);
  assert.throws(() => buildArtifactIdentity(baseInput({ arch: undefined })), /arch/);
  assert.throws(() => buildArtifactIdentity(baseInput({ nodeAbi: "abc" })), /nodeAbi/);
});

test("identityKey is stable for the same semantic inputs and moves with each of them", () => {
  const key = identityKey(buildArtifactIdentity(baseInput()));
  assert.equal(key, identityKey(buildArtifactIdentity(baseInput())));
  const variants: Record<string, unknown>[] = [
    { headSha: "c".repeat(40) },
    { baseSha: "d".repeat(40) },
    { lockfileContent: LOCK + " " },
    { platform: "darwin" },
    { arch: "arm64" },
    { nodeAbi: "127" },
    { bundler: "webpack" },
  ];
  for (const variant of variants) {
    assert.notEqual(
      identityKey(buildArtifactIdentity(baseInput(variant))),
      key,
      `identityKey must change for ${Object.keys(variant)[0]}`
    );
  }
});

test("the tarball digest is recorded but does NOT feed the reuse key", () => {
  const plain = buildArtifactIdentity(baseInput());
  const withTarball = buildArtifactIdentity(
    baseInput({ tarball: { file: "omniroute-3.8.52.tgz", sha256: "e".repeat(64) } })
  );
  assert.deepEqual(withTarball.artifact, { file: "omniroute-3.8.52.tgz", sha256: "e".repeat(64) });
  assert.equal(withTarball.identityKey, plain.identityKey);
  assert.equal("artifact" in plain, false);
  assert.throws(
    () => buildArtifactIdentity(baseInput({ tarball: { file: "x.tgz", sha256: "nope" } })),
    /sha256/
  );
});

test("resolveBundler mirrors build-next-isolated.mjs: turbopack unless OMNIROUTE_USE_TURBOPACK=0", () => {
  assert.equal(resolveBundler({}), "turbopack");
  assert.equal(resolveBundler({ OMNIROUTE_USE_TURBOPACK: "1" }), "turbopack");
  assert.equal(resolveBundler({ OMNIROUTE_USE_TURBOPACK: "0" }), "webpack");
});

test("parseIdentityArgs requires --base and rejects flags without values", () => {
  assert.deepEqual(parseIdentityArgs(["--head", HEAD, "--base", BASE]), {
    head: HEAD,
    base: BASE,
    lockfile: "package-lock.json",
    tarball: undefined,
    out: undefined,
  });
  assert.throws(() => parseIdentityArgs(["--head", HEAD]), /--base/);
  assert.throws(() => parseIdentityArgs(["--base"]), /--base needs a value/);
  assert.throws(() => parseIdentityArgs(["--base", BASE, "--bogus", "x"]), /Unknown flag/);
});

test("CLI prints the identity JSON and writes --out, hashing the real tarball", () => {
  const dir = mkdtempSync(path.join(os.tmpdir(), "artifact-identity-"));
  try {
    const lockfile = path.join(dir, "package-lock.json");
    const tarball = path.join(dir, "omniroute-0.0.0.tgz");
    const out = path.join(dir, "identity.json");
    writeFileSync(lockfile, LOCK);
    writeFileSync(tarball, "fake tarball bytes");
    const stdout = execFileSync(
      process.execPath,
      [
        SCRIPT,
        "--head",
        HEAD,
        "--base",
        BASE,
        "--lockfile",
        lockfile,
        "--tarball",
        tarball,
        "--out",
        out,
      ],
      { encoding: "utf8", env: { ...process.env, OMNIROUTE_USE_TURBOPACK: "0" } }
    );
    const printed = JSON.parse(stdout);
    assert.equal(printed.headSha, HEAD);
    assert.equal(printed.lockfileHash, hashLockfile(LOCK));
    assert.equal(printed.platform, process.platform);
    assert.equal(printed.arch, process.arch);
    assert.equal(printed.nodeAbi, process.versions.modules);
    assert.equal(printed.bundler, "webpack");
    assert.equal(printed.artifact.file, "omniroute-0.0.0.tgz");
    assert.equal(
      printed.artifact.sha256,
      createHash("sha256").update("fake tarball bytes").digest("hex")
    );
    const written = JSON.parse(readFileSync(out, "utf8"));
    assert.deepEqual(written, printed);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("CLI exits non-zero with a readable error on a bad SHA", () => {
  let failed = false;
  try {
    execFileSync(process.execPath, [SCRIPT, "--head", "nope", "--base", BASE], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
  } catch (error) {
    failed = true;
    const err = error as { status: number; stderr: string };
    assert.equal(err.status, 1);
    assert.match(err.stderr, /artifact-identity: .*headSha/);
  }
  assert.equal(failed, true);
});
