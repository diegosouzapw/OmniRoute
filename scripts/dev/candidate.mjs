#!/usr/bin/env node
/**
 * dev:candidate — local build-once / validate / promote / rollback loop (RFC #8084, local side).
 *
 * The packaged artifact is what users run, so it is what gets validated and promoted:
 *
 *   build     npm pack the current tree (or take --from-tarball <file>) and install that
 *             tarball into an isolated npm prefix under _artifacts/candidate/<id>/. A raw
 *             `tar -x` would not run: the tarball carries no node_modules (#11242), so the
 *             candidate is materialized the way users install it — the same path the
 *             check:pack-boot gate exercises. A clean, already-built <id> is REUSED.
 *   validate  boot `node <candidate>/…/bin/omniroute.mjs serve` on a free loopback port with
 *             DATA_DIR=<candidate>/data and fake secrets, wait for GET /api/health 200, smoke
 *             GET /v1/models 200, stop the process group, record validation.json.
 *   promote   move the validated artifact into the active slot with renames:
 *             previous → discard, current → previous, <id> → current (compensated on failure).
 *             The active slot is _artifacts/candidate/current, or --target <dir>.
 *   rollback  swap current and previous.
 *   run       build → validate → promote → re-validate the promoted slot → automatic rollback
 *             when that post-promotion check fails. A failed pre-promotion validation never
 *             touches the active slot.
 *
 * Nothing here touches an existing OmniRoute installation or its DATA_DIR: every write goes to
 * <repo>/_artifacts/candidate (gitignored) unless the operator explicitly passes --target.
 * Child processes are spawned with argument arrays and values passed through `env` — never a
 * shell string (Hard Rule #13). Every command accepts --dry-run and --json.
 *
 * Exit codes: 0 = ok · 1 = validation/promotion failed · 2 = usage or missing precondition.
 */
import { execFileSync, spawn } from "node:child_process";
import { createHash } from "node:crypto";
import fs from "node:fs";
import net from "node:net";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { pickTarball, stopChild } from "../check/check-pack-boot.mjs";

export const CANDIDATE_ROOT_REL = path.join("_artifacts", "candidate");
const PACKAGE_NAME = "omniroute";
const SLOT_NAMES = new Set(["current", "previous"]);
const COMMANDS = new Set(["build", "validate", "promote", "rollback", "run"]);
const DEFAULT_DEADLINE_MS = 240_000;
const DEFAULT_POLL_MS = 2_000;
const REQUEST_TIMEOUT_MS = 10_000;
const MAX_OUTPUT_CHARS = 200_000;
const MANIFEST_FILE = "candidate.json";
const VALIDATION_FILE = "validation.json";

// Variables that would make the candidate talk to — or authenticate as — the operator's real
// install. They are dropped; the fake values below replace the secrets the server needs.
const STRIPPED_ENV_KEYS = [
  "OMNIROUTE_API_KEY",
  "ROUTER_API_KEY",
  "STORAGE_ENCRYPTION_KEY",
  "JWT_SECRET",
  "API_KEY_SECRET",
  "INITIAL_PASSWORD",
  "DATA_DIR",
  "PORT",
  "DASHBOARD_PORT",
  "API_PORT",
  "REQUIRE_API_KEY",
];

const FAKE_SECRETS = Object.freeze({
  JWT_SECRET: "candidate-loop-fake-jwt-secret-not-for-production-0000",
  API_KEY_SECRET: "candidate-loop-fake-api-key-secret-0000000000",
  INITIAL_PASSWORD: "candidate-loop-fake-initial-password",
});

export const SMOKE_CHECKS = Object.freeze([
  {
    name: "health",
    path: "/api/health",
    accept: (body) => body && typeof body === "object" && body.status === "ok",
    expectation: '{ status: "ok" }',
  },
  {
    name: "models",
    path: "/v1/models",
    accept: (body) => body && typeof body === "object" && Array.isArray(body.data),
    expectation: "an OpenAI model list ({ data: [] })",
  },
]);

class UsageError extends Error {
  constructor(message) {
    super(message);
    this.name = "UsageError";
    this.exitCode = 2;
  }
}

// ── argument parsing ────────────────────────────────────────────────────────────────

const VALUE_FLAGS = {
  "--id": "id",
  "--target": "target",
  "--from-tarball": "fromTarball",
  "--port": "port",
  "--timeout": "timeoutMs",
};
const BOOLEAN_FLAGS = {
  "--dry-run": "dryRun",
  "--json": "json",
  "--force": "force",
  "--help": "help",
  "-h": "help",
};

/** Parse argv (without node + script) into a normalized options object. Throws UsageError. */
export function parseCandidateArgs(argv) {
  const args = {
    command: null,
    id: null,
    target: null,
    fromTarball: null,
    port: null,
    timeoutMs: DEFAULT_DEADLINE_MS,
    dryRun: false,
    json: false,
    force: false,
    help: false,
  };
  for (let i = 0; i < argv.length; i++) {
    const raw = argv[i];
    if (!raw.startsWith("-")) {
      if (args.command) throw new UsageError(`unexpected argument "${raw}"`);
      if (!COMMANDS.has(raw)) {
        throw new UsageError(`unknown command "${raw}" (expected ${[...COMMANDS].join(", ")})`);
      }
      args.command = raw;
      continue;
    }
    const eq = raw.indexOf("=");
    const flag = eq === -1 ? raw : raw.slice(0, eq);
    if (BOOLEAN_FLAGS[flag]) {
      if (eq !== -1) throw new UsageError(`${flag} takes no value`);
      args[BOOLEAN_FLAGS[flag]] = true;
      continue;
    }
    const key = VALUE_FLAGS[flag];
    if (!key) throw new UsageError(`unknown flag "${flag}"`);
    let value = eq === -1 ? argv[++i] : raw.slice(eq + 1);
    if (value === undefined || value === "" || (eq === -1 && value.startsWith("--"))) {
      throw new UsageError(`${flag} requires a value`);
    }
    if (key === "port") {
      const port = Number(value);
      if (!Number.isInteger(port) || port < 1 || port > 65535) {
        throw new UsageError(`--port must be an integer between 1 and 65535 (got "${value}")`);
      }
      value = port;
    } else if (key === "timeoutMs") {
      const seconds = Number(value);
      if (!Number.isFinite(seconds) || seconds <= 0) {
        throw new UsageError(`--timeout must be a positive number of seconds (got "${value}")`);
      }
      value = Math.round(seconds * 1000);
    }
    args[key] = value;
  }
  if (!args.command && !args.help) {
    throw new UsageError(`missing command (expected ${[...COMMANDS].join(", ")})`);
  }
  return args;
}

/** A candidate id is one safe path segment and never a slot name. */
export function sanitizeCandidateId(id) {
  const value = String(id ?? "");
  if (!/^[A-Za-z0-9][A-Za-z0-9._-]{0,63}$/.test(value) || SLOT_NAMES.has(value)) {
    throw new UsageError(
      `invalid candidate id "${value}" (1-64 chars of [A-Za-z0-9._-], not "current"/"previous")`
    );
  }
  return value;
}

// ── path planning ───────────────────────────────────────────────────────────────────

const isInside = (child, parent) => {
  const rel = path.relative(parent, child);
  return rel === "" || (!rel.startsWith("..") && !path.isAbsolute(rel));
};

/**
 * Resolve an operator-chosen active slot. Refuses targets whose replacement would be
 * destructive or circular: the filesystem root, the home directory, the repository itself,
 * and anything that contains or lives inside the candidate root.
 */
export function resolveTarget(repoRoot, target) {
  const resolved = path.resolve(repoRoot, target);
  const candidateRoot = path.join(repoRoot, CANDIDATE_ROOT_REL);
  const reasons = [];
  if (resolved === path.parse(resolved).root) reasons.push("it is the filesystem root");
  if (resolved === path.resolve(os.homedir())) reasons.push("it is the home directory");
  if (isInside(path.resolve(repoRoot), resolved)) reasons.push("it contains the repository");
  if (isInside(resolved, candidateRoot) || isInside(candidateRoot, resolved)) {
    reasons.push("it overlaps the candidate root");
  }
  if (reasons.length) throw new UsageError(`refusing --target ${resolved}: ${reasons.join("; ")}`);
  return resolved;
}

/** Layout of an npm global-prefix install of the package inside a slot directory. */
export function packagePathsFor(slotDir, platform = process.platform) {
  const prefixDir = path.join(slotDir, "prefix");
  const packageRoot =
    platform === "win32"
      ? path.join(prefixDir, "node_modules", PACKAGE_NAME)
      : path.join(prefixDir, "lib", "node_modules", PACKAGE_NAME);
  return {
    prefixDir,
    packageRoot,
    binPath: path.join(packageRoot, "bin", "omniroute.mjs"),
    dataDir: path.join(slotDir, "data"),
    manifestPath: path.join(slotDir, MANIFEST_FILE),
    validationPath: path.join(slotDir, VALIDATION_FILE),
  };
}

export function planCandidatePaths({ repoRoot, id, target = null, platform = process.platform }) {
  const root = path.join(repoRoot, CANDIDATE_ROOT_REL);
  const candidateDir = path.join(root, id);
  const current = target ? resolveTarget(repoRoot, target) : path.join(root, "current");
  return {
    repoRoot,
    id,
    root,
    candidateDir,
    current,
    previous: target ? `${current}.previous` : path.join(root, "previous"),
    ...packagePathsFor(candidateDir, platform),
  };
}

// ── environment ─────────────────────────────────────────────────────────────────────

/** Child env: the caller's env minus anything pointing at a real install, plus fake secrets. */
export function buildCandidateEnv({ port, dataDir, baseEnv = process.env }) {
  const env = { ...baseEnv };
  for (const key of STRIPPED_ENV_KEYS) delete env[key];
  return {
    ...env,
    ...FAKE_SECRETS,
    PORT: String(port),
    DATA_DIR: dataDir,
    REQUIRE_API_KEY: "false",
    DISABLE_SQLITE_AUTO_BACKUP: "true",
    OMNIROUTE_SKIP_SYSTEM_TRUST: "1",
    NODE_ENV: "production",
  };
}

// ── promote / rollback ──────────────────────────────────────────────────────────────

const stampNow = () => new Date().toISOString().replace(/[:.]/g, "-");

export function planPromote(paths, { exists = fs.existsSync, stamp = stampNow() } = {}) {
  if (!exists(paths.candidateDir)) {
    throw new UsageError(`candidate ${paths.candidateDir} is not built — run \`build\` first`);
  }
  const ops = [];
  const discard = `${paths.previous}.discard-${stamp}`;
  const hasPrevious = exists(paths.previous);
  if (hasPrevious) ops.push({ op: "rename", from: paths.previous, to: discard });
  if (exists(paths.current)) ops.push({ op: "rename", from: paths.current, to: paths.previous });
  ops.push({ op: "rename", from: paths.candidateDir, to: paths.current });
  if (hasPrevious) ops.push({ op: "remove", path: discard });
  return ops;
}

export function planRollback(paths, { exists = fs.existsSync, stamp = stampNow() } = {}) {
  if (!exists(paths.previous)) {
    throw new UsageError(`no previous slot at ${paths.previous} — nothing to roll back to`);
  }
  if (!exists(paths.current)) return [{ op: "rename", from: paths.previous, to: paths.current }];
  const swap = `${paths.current}.swap-${stamp}`;
  return [
    { op: "rename", from: paths.current, to: swap },
    { op: "rename", from: paths.previous, to: paths.current },
    { op: "rename", from: swap, to: paths.previous },
  ];
}

/**
 * Apply rename/remove ops in order. Each rename(2) is atomic; the sequence is made
 * all-or-nothing by compensation: when a rename fails, the renames already applied are
 * reversed (newest first) before the error is rethrown. Removals only run after every
 * rename succeeded and only target the discarded previous slot.
 */
export function applyRenameOps(ops, { dryRun = false, fsImpl = fs } = {}) {
  if (dryRun) return { planned: ops, applied: [] };
  const applied = [];
  for (const op of ops) {
    if (op.op !== "rename") continue;
    try {
      fsImpl.renameSync(op.from, op.to);
      applied.push(op);
    } catch (error) {
      for (const done of [...applied].reverse()) {
        try {
          fsImpl.renameSync(done.to, done.from);
        } catch (undoError) {
          error.message += ` (and undoing ${done.to} → ${done.from} failed: ${undoError.message})`;
        }
      }
      throw error;
    }
  }
  for (const op of ops) {
    if (op.op === "remove") {
      fsImpl.rmSync(op.path, { recursive: true, force: true });
      applied.push(op);
    }
  }
  return { planned: ops, applied };
}

const readJson = (file) => {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    return null;
  }
};

/** Persist a validation verdict bound to the exact tarball hash it was obtained for. */
export function recordValidation(slotDir, result, manifest) {
  const record = {
    ok: result.ok === true,
    tarballSha256: manifest?.tarballSha256 ?? null,
    validatedAt: new Date().toISOString(),
    failures: result.failures ?? [],
    checks: result.checks ?? [],
  };
  fs.writeFileSync(path.join(slotDir, VALIDATION_FILE), `${JSON.stringify(record, null, 2)}\n`);
  return record;
}

function assertValidated(paths) {
  const manifest = readJson(paths.manifestPath);
  const validation = readJson(paths.validationPath);
  if (
    !manifest ||
    !validation ||
    validation.ok !== true ||
    validation.tarballSha256 !== manifest.tarballSha256
  ) {
    throw new UsageError(
      `candidate ${paths.candidateDir} is not validated for its current tarball — ` +
        "run `validate` first (or pass --force)"
    );
  }
}

export function promoteCandidate(paths, { dryRun = false, force = false, log = console } = {}) {
  if (!force && fs.existsSync(paths.candidateDir)) assertValidated(paths);
  const ops = planPromote(paths);
  const result = applyRenameOps(ops, { dryRun });
  log.log(
    `[candidate] ${dryRun ? "would promote" : "promoted"} ${paths.candidateDir} → ${paths.current}`
  );
  return { ok: true, actions: result.planned };
}

export function rollbackActive(paths, { dryRun = false, log = console } = {}) {
  const ops = planRollback(paths);
  const result = applyRenameOps(ops, { dryRun });
  log.log(
    `[candidate] ${dryRun ? "would roll back" : "rolled back"} ${paths.current} ⇄ ${paths.previous}`
  );
  return { ok: true, actions: result.planned };
}

// ── build ───────────────────────────────────────────────────────────────────────────

function git(repoRoot, args) {
  return execFileSync("git", args, { cwd: repoRoot, encoding: "utf8" }).trim();
}

/** Default id: short HEAD sha, suffixed -dirty when the tree has local changes. */
function deriveGitId(repoRoot) {
  const sha = git(repoRoot, ["rev-parse", "--short=12", "HEAD"]);
  const dirty = git(repoRoot, ["status", "--porcelain"]) !== "";
  return { id: dirty ? `${sha}-dirty` : sha, gitSha: sha, dirty };
}

function sha256File(file) {
  return createHash("sha256").update(fs.readFileSync(file)).digest("hex");
}

function deriveTarballId(file) {
  return `tgz-${sha256File(file).slice(0, 12)}`;
}

/**
 * Build (or reuse) the candidate. Reuse is the build-once rule: a clean id that already has a
 * manifest is the same artifact, so it is not rebuilt unless --force. Dirty trees always
 * rebuild because the id no longer identifies their content.
 */
export function buildCandidate(paths, options = {}) {
  const {
    fromTarball = null,
    force = false,
    dryRun = false,
    identity = {},
    runFile = execFileSync,
    log = console,
  } = options;
  const steps = [];
  const existing = readJson(paths.manifestPath);
  if (existing && !force && !String(paths.id).endsWith("-dirty")) {
    log.log(`[candidate] reusing ${paths.candidateDir} (built ${existing.builtAt})`);
    return { reused: true, manifest: existing, steps };
  }
  if (!fromTarball && !fs.existsSync(path.join(paths.repoRoot, "dist", "server.js"))) {
    throw new UsageError(
      "dist/server.js missing — run `npm run build:release` first, or pass --from-tarball <file>"
    );
  }
  if (fromTarball && !fs.existsSync(fromTarball)) {
    throw new UsageError(`--from-tarball ${fromTarball} does not exist`);
  }

  if (fs.existsSync(paths.candidateDir)) {
    steps.push({ op: "remove", path: paths.candidateDir });
  }
  steps.push({ op: "mkdir", path: paths.candidateDir });
  if (fromTarball) {
    steps.push({ op: "copy", from: path.resolve(fromTarball), to: paths.candidateDir });
  } else {
    steps.push({
      op: "exec",
      cmd: "npm",
      args: ["pack", "--json", "--pack-destination", paths.candidateDir],
      cwd: paths.repoRoot,
    });
  }
  steps.push({
    op: "exec",
    cmd: "npm",
    args: ["install", "-g", "--prefix", paths.prefixDir, "--no-audit", "--no-fund", "<tarball>"],
  });
  steps.push({ op: "write", path: paths.manifestPath });
  if (dryRun) return { reused: false, manifest: null, steps };

  fs.rmSync(paths.candidateDir, { recursive: true, force: true });
  fs.mkdirSync(paths.candidateDir, { recursive: true });
  let tarball;
  if (fromTarball) {
    tarball = path.join(paths.candidateDir, path.basename(fromTarball));
    fs.copyFileSync(fromTarball, tarball);
    log.log(`[candidate] using prebuilt tarball ${path.basename(fromTarball)}`);
  } else {
    log.log("[candidate] npm pack (current tree)…");
    const packOut = runFile("npm", ["pack", "--json", "--pack-destination", paths.candidateDir], {
      cwd: paths.repoRoot,
      encoding: "utf8",
      maxBuffer: 64 * 1024 * 1024,
    });
    tarball = path.join(paths.candidateDir, pickTarball(packOut));
  }
  log.log(`[candidate] installing ${path.basename(tarball)} into ${paths.prefixDir}…`);
  runFile(
    "npm",
    ["install", "-g", "--prefix", paths.prefixDir, "--no-audit", "--no-fund", tarball],
    { encoding: "utf8", maxBuffer: 64 * 1024 * 1024, stdio: ["ignore", "pipe", "inherit"] }
  );
  if (!fs.existsSync(paths.binPath)) {
    throw new Error(`installed package has no ${path.relative(paths.candidateDir, paths.binPath)}`);
  }
  const pkg = readJson(path.join(paths.packageRoot, "package.json")) ?? {};
  const manifest = {
    schema: 1,
    id: paths.id,
    version: pkg.version ?? null,
    gitSha: identity.gitSha ?? null,
    dirty: identity.dirty ?? null,
    source: fromTarball ? "tarball" : "pack",
    tarball: path.basename(tarball),
    tarballSha256: sha256File(tarball),
    node: process.version,
    platform: `${process.platform}-${process.arch}`,
    builtAt: new Date().toISOString(),
  };
  fs.writeFileSync(paths.manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  return { reused: false, manifest, steps };
}

// ── validate ────────────────────────────────────────────────────────────────────────

/** Ask the kernel for a free loopback port. */
export function findFreePort() {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.unref();
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const { port } = server.address();
      server.close(() => resolve(port));
    });
  });
}

/** Spawn the packaged CLI as its own process group (stopChild signals the whole tree). */
function launchPackagedServer({ slotDir, port, baseEnv = process.env }) {
  const { binPath, packageRoot, dataDir } = packagePathsFor(slotDir);
  if (!fs.existsSync(binPath)) throw new Error(`no packaged CLI at ${binPath}`);
  fs.mkdirSync(dataDir, { recursive: true });
  const child = spawn(process.execPath, [binPath, "serve", "--port", String(port), "--no-open"], {
    cwd: packageRoot,
    env: buildCandidateEnv({ port, dataDir, baseEnv }),
    stdio: ["ignore", "pipe", "pipe"],
    detached: true,
  });
  let output = "";
  const keep = (chunk) => {
    output = (output + String(chunk)).slice(-MAX_OUTPUT_CHARS);
  };
  child.stdout.on("data", keep);
  child.stderr.on("data", keep);
  let exit = null;
  child.once("exit", (code, signal) => {
    exit = signal ? `signal ${signal}` : `code ${code ?? -1}`;
  });
  return {
    baseUrl: `http://127.0.0.1:${port}`,
    exitInfo: () => exit,
    outputTail: () => output.split("\n").slice(-40).join("\n"),
    stop: () => stopChild(child),
  };
}

async function probe(fetchImpl, url) {
  const res = await fetchImpl(url, { signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS) });
  const body = await res.json().catch(() => null);
  return { status: res.status, body };
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Boot the slot, wait for the health check, run the smoke checks, always stop the server.
 * Never throws: every failure (launch, early exit, deadline, bad status) lands in `failures`.
 */
export async function validateCandidate({
  slotDir,
  port,
  launch = launchPackagedServer,
  fetchImpl = fetch,
  deadlineMs = DEFAULT_DEADLINE_MS,
  pollMs = DEFAULT_POLL_MS,
  checks = SMOKE_CHECKS,
  log = console,
}) {
  const failures = [];
  const results = [];
  let handle = null;
  try {
    handle = await launch({ slotDir, port });
    const [healthCheck, ...smokeChecks] = checks;
    const deadline = Date.now() + deadlineMs;
    let last = "never answered";
    let healthy = false;
    while (!healthy) {
      const exit = handle.exitInfo();
      if (exit) {
        failures.push(`server process exited (${exit}) before ${healthCheck.path} answered 200`);
        break;
      }
      if (Date.now() >= deadline) {
        failures.push(`${healthCheck.path} not healthy within ${deadlineMs}ms (last: ${last})`);
        break;
      }
      try {
        const { status, body } = await probe(fetchImpl, `${handle.baseUrl}${healthCheck.path}`);
        last = `HTTP ${status}`;
        healthy = status === 200 && healthCheck.accept(body);
      } catch (error) {
        last = error?.cause?.code ?? error?.message ?? String(error);
      }
      if (!healthy) await sleep(pollMs);
    }
    results.push({ name: healthCheck.name, path: healthCheck.path, ok: healthy });
    if (healthy) {
      log.log(`[candidate] ${healthCheck.path} → 200`);
      for (const check of smokeChecks) {
        let ok = false;
        let detail;
        try {
          const { status, body } = await probe(fetchImpl, `${handle.baseUrl}${check.path}`);
          ok = status === 200 && check.accept(body);
          detail = ok ? "200" : `HTTP ${status}, expected 200 with ${check.expectation}`;
        } catch (error) {
          detail = error?.message ?? String(error);
        }
        results.push({ name: check.name, path: check.path, ok });
        if (ok) log.log(`[candidate] ${check.path} → 200`);
        else failures.push(`${check.path}: ${detail}`);
      }
    }
  } catch (error) {
    failures.push(`launch failed: ${error?.message ?? String(error)}`);
  } finally {
    if (handle) {
      try {
        await handle.stop();
      } catch (error) {
        failures.push(`shutdown failed: ${error?.message ?? String(error)}`);
      }
    }
  }
  if (failures.length && handle?.outputTail) {
    log.error(`[candidate] last server output:\n${handle.outputTail()}`);
  }
  return { ok: failures.length === 0, failures, checks: results };
}

// ── run (the whole loop) ────────────────────────────────────────────────────────────

/**
 * build → validate(candidate) → promote → validate(active slot) → rollback on failure.
 * `build` and `validate` are injected so the loop is testable without npm or a real boot.
 */
export async function runCandidateLoop(paths, { build, validate, dryRun = false, log = console }) {
  const result = {
    ok: false,
    dryRun,
    stage: "build",
    promoted: false,
    rolledBack: false,
    actions: [],
    validation: null,
    postValidation: null,
  };
  if (dryRun) {
    result.actions = [
      { op: "build", path: paths.candidateDir },
      { op: "validate", path: paths.candidateDir },
      { op: "promote", from: paths.candidateDir, to: paths.current },
      { op: "validate", path: paths.current },
      { op: "rollback-on-failure", current: paths.current, previous: paths.previous },
    ];
    result.ok = true;
    result.stage = "done";
    return result;
  }

  const built = await build();
  const manifest = readJson(paths.manifestPath) ?? built?.manifest ?? built;

  result.stage = "validate";
  result.validation = await validate(paths.candidateDir);
  recordValidation(paths.candidateDir, result.validation, manifest);
  if (!result.validation.ok) {
    log.error(`[candidate] validation failed — active slot untouched`);
    return result;
  }

  result.stage = "promote";
  result.actions = promoteCandidate(paths, { log }).actions;
  result.promoted = true;

  result.stage = "post-promote";
  result.postValidation = await validate(paths.current);
  if (!result.postValidation.ok) {
    log.error(`[candidate] promoted slot failed its health check — rolling back`);
    if (fs.existsSync(paths.previous)) {
      rollbackActive(paths, { log });
    } else {
      // First promotion into an empty slot: there is nothing to restore, so demote the
      // artifact back to its candidate directory and leave the slot empty, as it was.
      applyRenameOps([{ op: "rename", from: paths.current, to: paths.candidateDir }]);
    }
    result.rolledBack = true;
    return result;
  }
  result.ok = true;
  result.stage = "done";
  return result;
}

// ── CLI ─────────────────────────────────────────────────────────────────────────────

const HELP = `usage: npm run dev:candidate -- <command> [flags]

commands:
  build      npm pack the current tree and install it under _artifacts/candidate/<id>/
  validate   boot the candidate on a free port (isolated DATA_DIR, fake secrets);
             GET /api/health and GET /v1/models must answer 200
  promote    rename <id> → current (current → previous); requires a passing validation
  rollback   swap current and previous
  run        build + validate + promote, re-check the promoted slot, roll back on failure

flags:
  --id <id>              candidate id (default: short HEAD sha, "-dirty" when the tree is dirty;
                         "tgz-<sha256>" with --from-tarball). validate also accepts current/previous
  --from-tarball <file>  build from an existing npm tarball instead of packing the tree
  --target <dir>         active slot (default: _artifacts/candidate/current)
  --port <n>             validation port (default: a free loopback port)
  --timeout <seconds>    health wait deadline (default: ${DEFAULT_DEADLINE_MS / 1000})
  --force                rebuild a clean id / promote without a recorded validation
  --dry-run              print the plan, change nothing
  --json                 machine-readable result on stdout (logs go to stderr)
`;

const DEFAULT_REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

function resolveId(args, repoRoot) {
  if (args.id) return { id: args.id, identity: {} };
  if (args.fromTarball) {
    if (!fs.existsSync(args.fromTarball)) {
      throw new UsageError(`--from-tarball ${args.fromTarball} does not exist`);
    }
    return { id: deriveTarballId(args.fromTarball), identity: {} };
  }
  const identity = deriveGitId(repoRoot);
  return { id: identity.id, identity };
}

/** CLI entry point. Returns the exit code instead of exiting, so tests can drive it. */
export async function main(argv, { repoRoot = DEFAULT_REPO_ROOT, io = null } = {}) {
  const out = io?.stdout ?? ((s) => process.stdout.write(`${s}\n`));
  const err = io?.stderr ?? ((s) => process.stderr.write(`${s}\n`));
  let args;
  try {
    args = parseCandidateArgs(argv);
  } catch (error) {
    err(`[candidate] ${error.message}\n\n${HELP}`);
    return 2;
  }
  if (args.help) {
    out(HELP);
    return 0;
  }
  // In --json mode stdout carries exactly one JSON document; human logs go to stderr.
  const log = {
    log: args.json ? err : out,
    warn: err,
    error: err,
  };
  const report = { command: args.command, dryRun: args.dryRun, ok: false };
  const finish = (code) => {
    if (args.json) out(JSON.stringify(report, null, 2));
    return code;
  };

  try {
    const needsId = args.command !== "rollback";
    const isSlotId = args.command === "validate" && SLOT_NAMES.has(args.id);
    const { id, identity } =
      needsId && !isSlotId ? resolveId(args, repoRoot) : { id: "-", identity: {} };
    if (needsId && !isSlotId) sanitizeCandidateId(id);
    const paths = planCandidatePaths({ repoRoot, id, target: args.target });
    report.id = needsId ? (isSlotId ? args.id : id) : null;
    report.paths = {
      candidate: paths.candidateDir,
      current: paths.current,
      previous: paths.previous,
    };

    const needsPort = (args.command === "validate" || args.command === "run") && !args.dryRun;
    const port = args.port ?? (needsPort ? await findFreePort() : null);
    const validateSlot = async (slotDir) => {
      log.log(`[candidate] validating ${slotDir} on :${port}…`);
      return validateCandidate({ slotDir, port, deadlineMs: args.timeoutMs, log });
    };

    switch (args.command) {
      case "build": {
        const built = buildCandidate(paths, {
          fromTarball: args.fromTarball,
          force: args.force,
          dryRun: args.dryRun,
          identity,
          log,
        });
        report.reused = built.reused;
        report.manifest = built.manifest;
        report.actions = built.steps;
        report.ok = true;
        log.log(`[candidate] id ${id} → ${paths.candidateDir}`);
        return finish(0);
      }
      case "validate": {
        const slotDir = isSlotId ? paths[args.id] : paths.candidateDir;
        if (args.dryRun) {
          report.actions = [
            { op: "validate", path: slotDir, checks: SMOKE_CHECKS.map((c) => c.path) },
          ];
          report.ok = true;
          return finish(0);
        }
        if (!fs.existsSync(path.join(slotDir, MANIFEST_FILE))) {
          throw new UsageError(`no built candidate at ${slotDir} — run \`build\` first`);
        }
        const result = await validateSlot(slotDir);
        recordValidation(slotDir, result, readJson(path.join(slotDir, MANIFEST_FILE)));
        report.validation = result;
        report.ok = result.ok;
        if (!result.ok) log.error(`[candidate] ❌ ${result.failures.join("; ")}`);
        else log.log("[candidate] ✅ candidate boots and serves /api/health + /v1/models");
        return finish(result.ok ? 0 : 1);
      }
      case "promote": {
        const promoted = promoteCandidate(paths, { dryRun: args.dryRun, force: args.force, log });
        report.actions = promoted.actions;
        report.ok = true;
        return finish(0);
      }
      case "rollback": {
        const rolled = rollbackActive(paths, { dryRun: args.dryRun, log });
        report.actions = rolled.actions;
        report.ok = true;
        return finish(0);
      }
      case "run": {
        const result = await runCandidateLoop(paths, {
          dryRun: args.dryRun,
          log,
          build: async () =>
            buildCandidate(paths, {
              fromTarball: args.fromTarball,
              force: args.force,
              identity,
              log,
            }),
          validate: validateSlot,
        });
        Object.assign(report, result);
        if (result.ok) log.log(`[candidate] ✅ ${id} is active at ${paths.current}`);
        else log.error(`[candidate] ❌ run failed at stage "${result.stage}"`);
        return finish(result.ok ? 0 : 1);
      }
      default:
        throw new UsageError(`unknown command "${args.command}"`);
    }
  } catch (error) {
    report.error = error?.message ?? String(error);
    err(`[candidate] ${report.error}`);
    return finish(error?.exitCode ?? 1);
  }
}

const isDirectRun =
  process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isDirectRun) {
  main(process.argv.slice(2)).then((code) => process.exit(code));
}
