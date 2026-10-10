#!/usr/bin/env node
/**
 * Preview-artifact identity (#8084 slice (a), rail 3.8.58).
 *
 * The `preview-artifact.yml` workflow builds a PR head ONCE, validates that exact
 * build (check:pack-artifact + check:pack-boot) and uploads the tarball together
 * with this identity. Promotion then consumes the uploaded bytes — never a second
 * source build — and anyone holding the identity can tell whether an existing
 * artifact is reusable for a given (head, base, lockfile, platform/ABI, node) tuple.
 *
 * Output (JSON on stdout, optionally also written to --out):
 *
 *   { headSha, baseSha, lockfileHash, platform, arch, nodeAbi, nodeVersion,
 *     bundler, buildPolicyVersion, identityKey, artifact?: { file, sha256 } }
 *
 * `identityKey` is a sha256 over the SEMANTIC inputs only (everything above except
 * `artifact`), so it works as a reuse/cache key: same key = same build inputs.
 * The tarball digest is recorded for promotion integrity but does not feed the key.
 *
 * Bump BUILD_POLICY_VERSION whenever the build or validation steps of
 * preview-artifact.yml change in a way that makes older artifacts non-comparable.
 *
 * CLI (values arrive as argv — never interpolated into a shell script):
 *
 *   node scripts/release/artifact-identity.mjs --head <sha> --base <sha> \
 *     [--lockfile package-lock.json] [--tarball <file.tgz>] [--out identity.json]
 */
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const BUILD_POLICY_VERSION = "preview-artifact/1";

const FULL_SHA_RE = /^[0-9a-f]{40}$/;
const SHA256_RE = /^[0-9a-f]{64}$/;

function sha256(content) {
  return createHash("sha256").update(content).digest("hex");
}

/** sha256 hex of the lockfile bytes — the dependency fingerprint. */
export function hashLockfile(content) {
  return sha256(content);
}

/** Bundler `npm run build` uses (scripts/build/build-next-isolated.mjs). */
export function resolveBundler(env = process.env) {
  return env.OMNIROUTE_USE_TURBOPACK === "0" ? "webpack" : "turbopack";
}

function requireSha(name, value) {
  const sha = String(value ?? "")
    .trim()
    .toLowerCase();
  if (!FULL_SHA_RE.test(sha)) {
    throw new Error(`${name} must be a full 40-hex commit SHA, got ${JSON.stringify(value)}`);
  }
  return sha;
}

function requireText(name, value) {
  const text = String(value ?? "").trim();
  if (!text) throw new Error(`${name} is required`);
  return text;
}

/** sha256 over the canonical JSON of the semantic identity fields. */
export function identityKey(identity) {
  const semantic = {
    headSha: identity.headSha,
    baseSha: identity.baseSha,
    lockfileHash: identity.lockfileHash,
    platform: identity.platform,
    arch: identity.arch,
    nodeAbi: identity.nodeAbi,
    nodeVersion: identity.nodeVersion,
    bundler: identity.bundler,
    buildPolicyVersion: identity.buildPolicyVersion,
  };
  return sha256(JSON.stringify(semantic));
}

/**
 * Pure: assemble and validate the identity. Fails closed on any missing input —
 * an artifact that cannot be identified cannot be promoted.
 */
export function buildArtifactIdentity({
  headSha,
  baseSha,
  lockfileContent,
  platform,
  arch,
  nodeAbi,
  nodeVersion,
  bundler,
  tarball,
}) {
  if (!lockfileContent || lockfileContent.length === 0)
    throw new Error("lockfile content is required (package-lock.json)");
  const abi = requireText("nodeAbi", nodeAbi);
  if (!/^\d+$/.test(abi)) throw new Error(`nodeAbi must be numeric, got ${JSON.stringify(abi)}`);

  const identity = {
    headSha: requireSha("headSha", headSha),
    baseSha: requireSha("baseSha", baseSha),
    lockfileHash: hashLockfile(lockfileContent),
    platform: requireText("platform", platform),
    arch: requireText("arch", arch),
    nodeAbi: abi,
    nodeVersion: requireText("nodeVersion", nodeVersion),
    bundler: requireText("bundler", bundler),
    buildPolicyVersion: BUILD_POLICY_VERSION,
  };
  identity.identityKey = identityKey(identity);

  if (tarball) {
    const digest = String(tarball.sha256 ?? "").toLowerCase();
    if (!SHA256_RE.test(digest)) {
      throw new Error(`tarball sha256 must be 64 hex chars, got ${JSON.stringify(tarball.sha256)}`);
    }
    identity.artifact = { file: requireText("tarball file", tarball.file), sha256: digest };
  }
  return identity;
}

const FLAGS = new Set(["--head", "--base", "--lockfile", "--tarball", "--out"]);

export function parseIdentityArgs(argv) {
  const values = {};
  for (let i = 0; i < argv.length; i += 1) {
    const flag = argv[i];
    if (!FLAGS.has(flag)) throw new Error(`Unknown flag ${JSON.stringify(flag)}`);
    const value = argv[i + 1];
    if (value === undefined || value.startsWith("--")) throw new Error(`${flag} needs a value`);
    values[flag.slice(2)] = value;
    i += 1;
  }
  if (!values.base) throw new Error("--base <sha> is required (the PR base / target SHA)");
  return {
    head: values.head,
    base: values.base,
    lockfile: values.lockfile ?? "package-lock.json",
    tarball: values.tarball,
    out: values.out,
  };
}

function main(argv) {
  const args = parseIdentityArgs(argv);
  const head = args.head ?? execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim();
  const tarball = args.tarball
    ? { file: path.basename(args.tarball), sha256: sha256(readFileSync(args.tarball)) }
    : undefined;
  const identity = buildArtifactIdentity({
    headSha: head,
    baseSha: args.base,
    lockfileContent: readFileSync(args.lockfile),
    platform: process.platform,
    arch: process.arch,
    nodeAbi: process.versions.modules,
    nodeVersion: process.versions.node,
    bundler: resolveBundler(process.env),
    tarball,
  });
  const json = `${JSON.stringify(identity, null, 2)}\n`;
  if (args.out) writeFileSync(args.out, json);
  process.stdout.write(json);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  try {
    main(process.argv.slice(2));
  } catch (error) {
    process.stderr.write(
      `artifact-identity: ${error instanceof Error ? error.message : String(error)}\n`
    );
    process.exit(1);
  }
}
