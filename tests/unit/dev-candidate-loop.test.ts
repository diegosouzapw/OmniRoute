import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import http from "node:http";
import type { AddressInfo } from "node:net";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  CANDIDATE_ROOT_REL,
  applyRenameOps,
  buildCandidateEnv,
  findFreePort,
  main,
  packagePathsFor,
  parseCandidateArgs,
  planCandidatePaths,
  planPromote,
  planRollback,
  prepareDataDir,
  promoteCandidate,
  recordValidation,
  resolveTarget,
  rollbackActive,
  runCandidateLoop,
  sanitizeCandidateId,
  validateCandidate,
} from "../../scripts/dev/candidate.mjs";

// Local side of RFC #8084 (rail 3.8.53, task 5): build ONE candidate artifact, validate
// the packaged runtime on a throwaway port + isolated DATA_DIR, promote that SAME artifact
// with renames, and roll back when the promoted slot fails its health check. The unit
// layer never boots the real OmniRoute: validation runs against an injected fake server,
// and promote/rollback run on a mkdtemp tree (tmpdir is acceptable ONLY in tests — the
// script itself writes under <repo>/_artifacts/candidate).

const SCRIPT_PATH = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../scripts/dev/candidate.mjs"
);

const quiet = { log() {}, warn() {}, error() {} };

function makeTmpRepo() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-candidate-test-"));
}

/** Create a fake built candidate slot with a marker file, a manifest and (optionally) a passing validation. */
function seedSlot(dir: string, marker: string, { validated = true } = {}) {
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "MARKER"), marker);
  const manifest = { schema: 1, id: marker, tarballSha256: `sha-${marker}` };
  fs.writeFileSync(path.join(dir, "candidate.json"), JSON.stringify(manifest));
  if (validated) recordValidation(dir, { ok: true, failures: [], checks: [] }, manifest);
}

const marker = (dir: string) => fs.readFileSync(path.join(dir, "MARKER"), "utf8");

function snapshotTree(root: string): string[] {
  if (!fs.existsSync(root)) return [];
  const out: string[] = [];
  const walk = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      out.push(path.relative(root, full));
      if (entry.isDirectory()) walk(full);
    }
  };
  walk(root);
  return out.sort();
}

// ── argument parsing ────────────────────────────────────────────────────────────────

test("parseCandidateArgs reads the command and every flag", () => {
  const args = parseCandidateArgs([
    "promote",
    "--id",
    "abc123",
    "--target",
    "/srv/omniroute-active",
    "--dry-run",
    "--json",
  ]);
  assert.equal(args.command, "promote");
  assert.equal(args.id, "abc123");
  assert.equal(args.target, "/srv/omniroute-active");
  assert.equal(args.dryRun, true);
  assert.equal(args.json, true);
});

test("parseCandidateArgs accepts --flag=value, --port, --timeout and --from-tarball", () => {
  const args = parseCandidateArgs([
    "run",
    "--port=24001",
    "--timeout",
    "90",
    "--from-tarball",
    "pkg.tgz",
    "--force",
  ]);
  assert.equal(args.command, "run");
  assert.equal(args.port, 24001);
  assert.equal(args.timeoutMs, 90_000);
  assert.equal(args.fromTarball, "pkg.tgz");
  assert.equal(args.force, true);
  assert.equal(args.dryRun, false);
});

test("parseCandidateArgs rejects unknown commands, unknown flags and missing values", () => {
  assert.throws(() => parseCandidateArgs(["deploy"]), /unknown command/i);
  assert.throws(() => parseCandidateArgs([]), /command/i);
  assert.throws(() => parseCandidateArgs(["build", "--nope"]), /unknown flag/i);
  assert.throws(() => parseCandidateArgs(["promote", "--target"]), /--target/);
  assert.throws(() => parseCandidateArgs(["validate", "--port", "abc"]), /--port/);
  assert.throws(() => parseCandidateArgs(["validate", "--port", "70000"]), /--port/);
});

test("parseCandidateArgs: --help is not an error", () => {
  assert.equal(parseCandidateArgs(["--help"]).help, true);
  assert.equal(parseCandidateArgs(["run", "-h"]).help, true);
});

test("sanitizeCandidateId keeps ids to one safe path segment and reserves slot names", () => {
  assert.equal(sanitizeCandidateId("0123456789ab"), "0123456789ab");
  assert.equal(sanitizeCandidateId("0123456789ab-dirty"), "0123456789ab-dirty");
  assert.equal(sanitizeCandidateId("tgz-deadbeef0001"), "tgz-deadbeef0001");
  for (const bad of ["", "../x", "a/b", "a\\b", ".hidden", "current", "previous", "x".repeat(65)]) {
    assert.throws(() => sanitizeCandidateId(bad), /candidate id/i, `accepted ${bad}`);
  }
});

// ── path planning ───────────────────────────────────────────────────────────────────

test("planCandidatePaths keeps everything under <repo>/_artifacts/candidate by default", () => {
  const repo = "/work/omniroute";
  const p = planCandidatePaths({ repoRoot: repo, id: "abc123" });
  assert.equal(CANDIDATE_ROOT_REL, path.join("_artifacts", "candidate"));
  assert.equal(p.root, path.join(repo, "_artifacts", "candidate"));
  assert.equal(p.candidateDir, path.join(p.root, "abc123"));
  assert.equal(p.current, path.join(p.root, "current"));
  assert.equal(p.previous, path.join(p.root, "previous"));
  assert.equal(p.dataDir, path.join(p.candidateDir, "data"));
  assert.equal(p.manifestPath, path.join(p.candidateDir, "candidate.json"));
  for (const value of Object.values(p)) {
    if (typeof value === "string" && path.isAbsolute(value)) {
      assert.ok(value.startsWith(repo), `${value} escapes the repo`);
    }
  }
});

test("planCandidatePaths: --target moves the active slot, previous sits next to it", () => {
  const p = planCandidatePaths({ repoRoot: "/work/omniroute", id: "abc", target: "/srv/active" });
  assert.equal(p.current, "/srv/active");
  assert.equal(p.previous, "/srv/active.previous");
  // The candidate itself is still built inside the repo's _artifacts.
  assert.equal(p.candidateDir, path.join("/work/omniroute", "_artifacts", "candidate", "abc"));
});

test("packagePathsFor resolves the npm global-prefix layout per platform", () => {
  const posix = packagePathsFor("/c/slot", "linux");
  assert.equal(posix.prefixDir, path.join("/c/slot", "prefix"));
  assert.equal(
    posix.packageRoot,
    path.join("/c/slot", "prefix", "lib", "node_modules", "omniroute")
  );
  assert.equal(posix.binPath, path.join(posix.packageRoot, "bin", "omniroute.mjs"));
  const win = packagePathsFor("/c/slot", "win32");
  assert.equal(win.packageRoot, path.join("/c/slot", "prefix", "node_modules", "omniroute"));
});

test("resolveTarget refuses the filesystem root, home, the repo and ancestors of the candidate root", () => {
  const repo = "/work/omniroute";
  assert.throws(() => resolveTarget(repo, "/"), /refus/i);
  assert.throws(() => resolveTarget(repo, os.homedir()), /refus/i);
  assert.throws(() => resolveTarget(repo, repo), /refus/i);
  assert.throws(() => resolveTarget(repo, path.join(repo, "_artifacts")), /refus/i);
  assert.throws(
    () => resolveTarget(repo, path.join(repo, "_artifacts", "candidate", "abc")),
    /refus/i
  );
  assert.equal(resolveTarget(repo, "/srv/omniroute-active"), "/srv/omniroute-active");
  assert.equal(resolveTarget(repo, "rel/active"), path.join(repo, "rel/active"));
});

// ── environment isolation ───────────────────────────────────────────────────────────

test("buildCandidateEnv isolates DATA_DIR/port, injects fake secrets and strips leaking keys", () => {
  const base = {
    PATH: "/usr/bin",
    HOME: "/home/x",
    XDG_CONFIG_HOME: "/home/x/.config",
    OMNIROUTE_API_KEY: "real-key",
    ROUTER_API_KEY: "real-router-key",
    JWT_SECRET: "real-jwt",
    API_KEY_SECRET: "real-api-secret",
    STORAGE_ENCRYPTION_KEY: "real-storage-key",
    INITIAL_PASSWORD: "real-password",
    REQUIRE_API_KEY: "true",
    DATA_DIR: "/home/x/.omniroute",
    PORT: "20128",
  };
  const frozen = { ...base };
  const env = buildCandidateEnv({
    port: 24555,
    dataDir: "/c/slot/data",
    homeDir: "/c/slot/home",
    baseEnv: base,
  });
  assert.deepEqual(base, frozen, "baseEnv must not be mutated");
  assert.equal(env.PORT, "24555");
  assert.equal(env.DATA_DIR, "/c/slot/data");
  assert.equal(env.PATH, "/usr/bin");
  assert.equal(env.REQUIRE_API_KEY, "false");
  assert.equal(env.DISABLE_SQLITE_AUTO_BACKUP, "true");
  for (const key of ["OMNIROUTE_API_KEY", "ROUTER_API_KEY", "STORAGE_ENCRYPTION_KEY"]) {
    assert.equal(env[key], undefined, `${key} leaked into the candidate`);
  }
  // Found by the real validate run against the 3.8.51 tarball:
  // - INITIAL_PASSWORD is a credential surface (/v1/models answers 401 even on loopback), and
  //   the packaged CLI loads <packageRoot>/.env (generated from .env.example: CHANGEME) for
  //   any key still undefined — so it is pinned to "" (falsy), not merely deleted.
  // - The CLI also loads <default data dir>/.env, derived from HOME/XDG_CONFIG_HOME/APPDATA:
  //   the operator's real ~/.omniroute/.env. HOME and the XDG/APPDATA dirs are isolated.
  assert.equal(env.INITIAL_PASSWORD, "");
  assert.equal(env.OMNIROUTE_CLI_SKIP_REPO_ENV, "1");
  assert.equal(env.HOME, "/c/slot/home");
  assert.equal(env.USERPROFILE, "/c/slot/home");
  for (const key of ["XDG_CONFIG_HOME", "XDG_CACHE_HOME", "XDG_DATA_HOME", "APPDATA"]) {
    assert.ok(String(env[key]).startsWith("/c/slot/home"), `${key} not isolated: ${env[key]}`);
  }
  for (const key of ["JWT_SECRET", "API_KEY_SECRET"]) {
    assert.ok(env[key], `${key} missing`);
    assert.notEqual(env[key], base[key as keyof typeof base], `${key} reused the real secret`);
  }
  assert.ok(env.JWT_SECRET.length >= 32);
});

test("prepareDataDir gives every validation a fresh DATA_DIR (stale boot state cannot leak in)", () => {
  const repo = makeTmpRepo();
  try {
    const dataDir = path.join(repo, "slot", "data");
    fs.mkdirSync(dataDir, { recursive: true });
    fs.writeFileSync(path.join(dataDir, "storage.sqlite"), "state from an earlier boot");
    prepareDataDir(dataDir);
    assert.deepEqual(fs.readdirSync(dataDir), []);
    prepareDataDir(path.join(repo, "other", "data"));
    assert.ok(fs.statSync(path.join(repo, "other", "data")).isDirectory());
  } finally {
    fs.rmSync(repo, { recursive: true, force: true });
  }
});

// ── promote / rollback planning and application ─────────────────────────────────────

test("planPromote rotates previous out, current → previous, candidate → current", () => {
  const p = planCandidatePaths({ repoRoot: "/r", id: "new1" });
  const existing = new Set([p.candidateDir, p.current, p.previous]);
  const ops = planPromote(p, { exists: (x: string) => existing.has(x), stamp: "T" });
  assert.deepEqual(
    ops.map((o: { op: string }) => o.op),
    ["rename", "rename", "rename", "remove"]
  );
  assert.deepEqual(ops[0], { op: "rename", from: p.previous, to: `${p.previous}.discard-T` });
  assert.deepEqual(ops[1], { op: "rename", from: p.current, to: p.previous });
  assert.deepEqual(ops[2], { op: "rename", from: p.candidateDir, to: p.current });
  assert.deepEqual(ops[3], { op: "remove", path: `${p.previous}.discard-T` });
});

test("planPromote on an empty slot is a single rename; a missing candidate is an error", () => {
  const p = planCandidatePaths({ repoRoot: "/r", id: "new1" });
  const ops = planPromote(p, { exists: (x: string) => x === p.candidateDir, stamp: "T" });
  assert.deepEqual(ops, [{ op: "rename", from: p.candidateDir, to: p.current }]);
  assert.throws(() => planPromote(p, { exists: () => false, stamp: "T" }), /not built/i);
});

test("planRollback swaps current and previous; nothing to roll back is an error", () => {
  const p = planCandidatePaths({ repoRoot: "/r", id: "x" });
  const both = new Set([p.current, p.previous]);
  const ops = planRollback(p, { exists: (x: string) => both.has(x), stamp: "T" });
  assert.deepEqual(ops, [
    { op: "rename", from: p.current, to: `${p.current}.swap-T` },
    { op: "rename", from: p.previous, to: p.current },
    { op: "rename", from: `${p.current}.swap-T`, to: p.previous },
  ]);
  assert.throws(
    () => planRollback(p, { exists: (x: string) => x === p.current, stamp: "T" }),
    /no previous/i
  );
});

test("promote then rollback on a real tree restores the original current", () => {
  const repo = makeTmpRepo();
  try {
    const old = planCandidatePaths({ repoRoot: repo, id: "old" });
    seedSlot(old.current, "OLD");
    const p = planCandidatePaths({ repoRoot: repo, id: "new" });
    seedSlot(p.candidateDir, "NEW");

    const promoted = promoteCandidate(p, { log: quiet });
    assert.equal(promoted.ok, true);
    assert.equal(marker(p.current), "NEW");
    assert.equal(marker(p.previous), "OLD");
    assert.equal(fs.existsSync(p.candidateDir), false, "candidate moved, not copied");

    const rolled = rollbackActive(p, { log: quiet });
    assert.equal(rolled.ok, true);
    assert.equal(marker(p.current), "OLD");
    assert.equal(marker(p.previous), "NEW");
    // No swap/discard residue is left behind.
    assert.deepEqual(fs.readdirSync(p.root).sort(), ["current", "previous"]);
  } finally {
    fs.rmSync(repo, { recursive: true, force: true });
  }
});

test("promote refuses a candidate without a passing validation for THIS artifact", () => {
  const repo = makeTmpRepo();
  try {
    const p = planCandidatePaths({ repoRoot: repo, id: "new" });
    seedSlot(p.candidateDir, "NEW", { validated: false });
    assert.throws(() => promoteCandidate(p, { log: quiet }), /not validated/i);

    // A validation recorded for a DIFFERENT tarball does not count.
    recordValidation(
      p.candidateDir,
      { ok: true, failures: [], checks: [] },
      {
        tarballSha256: "other",
      }
    );
    assert.throws(() => promoteCandidate(p, { log: quiet }), /not validated/i);

    // A failed validation does not count either.
    recordValidation(
      p.candidateDir,
      { ok: false, failures: ["boom"], checks: [] },
      {
        tarballSha256: "sha-NEW",
      }
    );
    assert.throws(() => promoteCandidate(p, { log: quiet }), /not validated/i);

    assert.equal(promoteCandidate(p, { log: quiet, force: true }).ok, true);
  } finally {
    fs.rmSync(repo, { recursive: true, force: true });
  }
});

test("applyRenameOps compensates: a failure mid-promotion restores the original layout", () => {
  const repo = makeTmpRepo();
  try {
    const p = planCandidatePaths({ repoRoot: repo, id: "new" });
    seedSlot(p.current, "CUR");
    seedSlot(p.previous, "PREV");
    seedSlot(p.candidateDir, "NEW");
    const before = snapshotTree(repo);

    const ops = planPromote(p, { exists: fs.existsSync, stamp: "T" });
    let calls = 0;
    const flakyFs = {
      ...fs,
      renameSync(from: string, to: string) {
        calls += 1;
        if (calls === 3) throw Object.assign(new Error("EXDEV simulated"), { code: "EXDEV" });
        return fs.renameSync(from, to);
      },
    };
    assert.throws(() => applyRenameOps(ops, { fsImpl: flakyFs }), /EXDEV simulated/);
    assert.deepEqual(snapshotTree(repo), before, "layout must be exactly as before");
    assert.equal(marker(p.current), "CUR");
    assert.equal(marker(p.previous), "PREV");
  } finally {
    fs.rmSync(repo, { recursive: true, force: true });
  }
});

test("dry-run never writes: applyRenameOps and the promote/rollback CLI leave the tree untouched", async () => {
  const repo = makeTmpRepo();
  try {
    const p = planCandidatePaths({ repoRoot: repo, id: "new" });
    seedSlot(p.current, "CUR");
    seedSlot(p.previous, "PREV");
    seedSlot(p.candidateDir, "NEW");
    // A built tree (dist/server.js) so `build --dry-run` gets past its precondition and plans.
    fs.mkdirSync(path.join(repo, "dist"), { recursive: true });
    fs.writeFileSync(path.join(repo, "dist", "server.js"), "");
    const before = snapshotTree(repo);

    const ops = planPromote(p, { exists: fs.existsSync, stamp: "T" });
    const res = applyRenameOps(ops, { dryRun: true });
    assert.equal(res.applied.length, 0);
    assert.equal(res.planned.length, ops.length);

    const out: string[] = [];
    const io = { stdout: (s: string) => out.push(s), stderr: () => {} };
    assert.equal(
      await main(["promote", "--id", "new", "--dry-run", "--json"], { repoRoot: repo, io }),
      0
    );
    assert.equal(await main(["rollback", "--dry-run"], { repoRoot: repo, io }), 0);
    assert.equal(await main(["build", "--id", "zzz", "--dry-run"], { repoRoot: repo, io }), 0);
    assert.deepEqual(snapshotTree(repo), before, "dry-run wrote to disk");

    const parsed = JSON.parse(out[0]);
    assert.equal(parsed.command, "promote");
    assert.equal(parsed.dryRun, true);
    assert.equal(parsed.ok, true);
    assert.ok(Array.isArray(parsed.actions) && parsed.actions.length === 4);
  } finally {
    fs.rmSync(repo, { recursive: true, force: true });
  }
});

test("build refuses to pack an unbuilt tree (exit 2) and writes nothing", async () => {
  const repo = makeTmpRepo();
  try {
    const errors: string[] = [];
    const io = { stdout: () => {}, stderr: (s: string) => errors.push(s) };
    assert.equal(await main(["build", "--id", "abc"], { repoRoot: repo, io }), 2);
    assert.match(errors.join("\n"), /dist\/server\.js missing/);
    assert.deepEqual(snapshotTree(repo), []);
  } finally {
    fs.rmSync(repo, { recursive: true, force: true });
  }
});

// ── validation against an injected fake server ──────────────────────────────────────

type Handler = (req: http.IncomingMessage, res: http.ServerResponse) => void;

async function withFakeServer<T>(handler: Handler, fn: (baseUrl: string) => Promise<T>) {
  const server = http.createServer(handler);
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address() as AddressInfo;
  try {
    return await fn(`http://127.0.0.1:${port}`);
  } finally {
    await new Promise<void>((resolve) => server.close(() => resolve()));
  }
}

function fakeLaunch(baseUrl: string, state: { stopped: number; exit?: string | null }) {
  return async () => ({
    baseUrl,
    exitInfo: () => state.exit ?? null,
    outputTail: () => "fake server output",
    stop: async () => {
      state.stopped += 1;
    },
  });
}

const json = (res: http.ServerResponse, status: number, body: unknown) => {
  res.writeHead(status, { "content-type": "application/json" });
  res.end(JSON.stringify(body));
};

test("validateCandidate passes when /api/health and /v1/models answer 200", async () => {
  const seen: string[] = [];
  await withFakeServer(
    (req, res) => {
      seen.push(req.url ?? "");
      if (req.url === "/api/health") return json(res, 200, { status: "ok" });
      if (req.url === "/v1/models") return json(res, 200, { object: "list", data: [] });
      return json(res, 404, {});
    },
    async (baseUrl) => {
      const state = { stopped: 0 };
      const result = await validateCandidate({
        slotDir: "/unused",
        port: 1,
        launch: fakeLaunch(baseUrl, state),
        deadlineMs: 5_000,
        pollMs: 20,
        log: quiet,
      });
      assert.equal(result.ok, true, result.failures.join("; "));
      assert.deepEqual(
        result.checks.map((c: { name: string; ok: boolean }) => [c.name, c.ok]),
        [
          ["health", true],
          ["models", true],
        ]
      );
      assert.equal(state.stopped, 1, "server must always be stopped");
      assert.ok(seen.includes("/v1/models"));
    }
  );
});

test("validateCandidate waits for health to come up before the smoke", async () => {
  let healthHits = 0;
  await withFakeServer(
    (req, res) => {
      if (req.url === "/api/health") {
        healthHits += 1;
        return healthHits < 3
          ? json(res, 503, { status: "starting" })
          : json(res, 200, { status: "ok" });
      }
      return json(res, 200, { object: "list", data: [{ id: "m" }] });
    },
    async (baseUrl) => {
      const state = { stopped: 0 };
      const result = await validateCandidate({
        slotDir: "/unused",
        port: 1,
        launch: fakeLaunch(baseUrl, state),
        deadlineMs: 5_000,
        pollMs: 10,
        log: quiet,
      });
      assert.equal(result.ok, true, result.failures.join("; "));
      assert.ok(healthHits >= 3);
    }
  );
});

test("validateCandidate fails when /v1/models is not 200 or not an OpenAI list", async () => {
  for (const respond of [
    (res: http.ServerResponse) => json(res, 500, { error: "boom" }),
    (res: http.ServerResponse) => json(res, 200, { nope: true }),
  ]) {
    await withFakeServer(
      (req, res) => (req.url === "/api/health" ? json(res, 200, { status: "ok" }) : respond(res)),
      async (baseUrl) => {
        const state = { stopped: 0 };
        const result = await validateCandidate({
          slotDir: "/unused",
          port: 1,
          launch: fakeLaunch(baseUrl, state),
          deadlineMs: 5_000,
          pollMs: 10,
          log: quiet,
        });
        assert.equal(result.ok, false);
        assert.match(result.failures.join("; "), /\/v1\/models/);
        assert.equal(state.stopped, 1);
      }
    );
  }
});

test("validateCandidate fails fast when the launched process exits, and on the deadline", async () => {
  await withFakeServer(
    (_req, res) => json(res, 503, { status: "starting" }),
    async (baseUrl) => {
      const exited = { stopped: 0, exit: "code 1" };
      const dead = await validateCandidate({
        slotDir: "/unused",
        port: 1,
        launch: fakeLaunch(baseUrl, exited),
        deadlineMs: 5_000,
        pollMs: 10,
        log: quiet,
      });
      assert.equal(dead.ok, false);
      assert.match(dead.failures.join("; "), /exited \(code 1\)/);
      assert.equal(exited.stopped, 1);

      const slow = { stopped: 0 };
      const timedOut = await validateCandidate({
        slotDir: "/unused",
        port: 1,
        launch: fakeLaunch(baseUrl, slow),
        deadlineMs: 150,
        pollMs: 20,
        log: quiet,
      });
      assert.equal(timedOut.ok, false);
      assert.match(timedOut.failures.join("; "), /health/i);
      assert.equal(slow.stopped, 1);
    }
  );
});

test("validateCandidate reports a launch failure without throwing", async () => {
  const result = await validateCandidate({
    slotDir: "/unused",
    port: 1,
    launch: async () => {
      throw new Error("spawn ENOENT");
    },
    deadlineMs: 100,
    pollMs: 10,
    log: quiet,
  });
  assert.equal(result.ok, false);
  assert.match(result.failures.join("; "), /spawn ENOENT/);
});

// ── the full loop: build → validate → promote → post-check → rollback ──────────────

function loopFixture() {
  const repo = makeTmpRepo();
  const p = planCandidatePaths({ repoRoot: repo, id: "new" });
  seedSlot(p.current, "OLD");
  const build = async () => {
    seedSlot(p.candidateDir, "NEW", { validated: false });
    return { id: "new", tarballSha256: "sha-NEW", reused: false };
  };
  return { repo, p, build };
}

test("runCandidateLoop: a candidate that fails validation is never promoted", async () => {
  const { repo, p, build } = loopFixture();
  try {
    const validatedSlots: string[] = [];
    const result = await runCandidateLoop(p, {
      build,
      validate: async (slotDir: string) => {
        validatedSlots.push(slotDir);
        return { ok: false, failures: ["models 500"], checks: [] };
      },
      log: quiet,
    });
    assert.equal(result.ok, false);
    assert.equal(result.stage, "validate");
    assert.equal(result.promoted, false);
    assert.deepEqual(validatedSlots, [p.candidateDir]);
    assert.equal(marker(p.current), "OLD", "active slot was touched");
    assert.equal(fs.existsSync(p.previous), false);
  } finally {
    fs.rmSync(repo, { recursive: true, force: true });
  }
});

test("runCandidateLoop: a post-promotion health failure rolls current back automatically", async () => {
  const { repo, p, build } = loopFixture();
  try {
    const validatedSlots: string[] = [];
    const result = await runCandidateLoop(p, {
      build,
      validate: async (slotDir: string) => {
        validatedSlots.push(slotDir);
        // Pre-promotion check passes; the promoted slot then fails its health check.
        return slotDir === p.current
          ? { ok: false, failures: ["health never 200"], checks: [] }
          : { ok: true, failures: [], checks: [] };
      },
      log: quiet,
    });
    assert.equal(result.ok, false);
    assert.equal(result.stage, "post-promote");
    assert.equal(result.rolledBack, true);
    assert.deepEqual(validatedSlots, [p.candidateDir, p.current]);
    assert.equal(marker(p.current), "OLD", "rollback did not restore current");
    assert.equal(marker(p.previous), "NEW");
  } finally {
    fs.rmSync(repo, { recursive: true, force: true });
  }
});

test("runCandidateLoop: a failed FIRST promotion (empty slot) demotes the artifact back", async () => {
  const repo = makeTmpRepo();
  try {
    const p = planCandidatePaths({ repoRoot: repo, id: "new" });
    const result = await runCandidateLoop(p, {
      build: async () => {
        seedSlot(p.candidateDir, "NEW", { validated: false });
        return { id: "new" };
      },
      validate: async (slotDir: string) =>
        slotDir === p.current
          ? { ok: false, failures: ["health never 200"], checks: [] }
          : { ok: true, failures: [], checks: [] },
      log: quiet,
    });
    assert.equal(result.ok, false);
    assert.equal(result.rolledBack, true);
    assert.equal(fs.existsSync(p.current), false, "empty slot must stay empty");
    assert.equal(marker(p.candidateDir), "NEW", "artifact kept for diagnosis");
  } finally {
    fs.rmSync(repo, { recursive: true, force: true });
  }
});

test("runCandidateLoop: success leaves the new artifact active and the old one as previous", async () => {
  const { repo, p, build } = loopFixture();
  try {
    const result = await runCandidateLoop(p, {
      build,
      validate: async () => ({ ok: true, failures: [], checks: [] }),
      log: quiet,
    });
    assert.equal(result.ok, true);
    assert.equal(result.promoted, true);
    assert.equal(result.rolledBack, false);
    assert.equal(marker(p.current), "NEW");
    assert.equal(marker(p.previous), "OLD");
  } finally {
    fs.rmSync(repo, { recursive: true, force: true });
  }
});

test("runCandidateLoop --dry-run plans every stage without building, booting or renaming", async () => {
  const { repo, p } = loopFixture();
  try {
    const before = snapshotTree(repo);
    let built = 0;
    let validated = 0;
    const result = await runCandidateLoop(p, {
      build: async () => {
        built += 1;
        return { id: "new" };
      },
      validate: async () => {
        validated += 1;
        return { ok: true, failures: [], checks: [] };
      },
      dryRun: true,
      log: quiet,
    });
    assert.equal(result.ok, true);
    assert.equal(result.dryRun, true);
    assert.equal(built, 0);
    assert.equal(validated, 0);
    assert.deepEqual(snapshotTree(repo), before);
  } finally {
    fs.rmSync(repo, { recursive: true, force: true });
  }
});

test("run --dry-run reports a plan, never claims the candidate is active", async () => {
  const repo = makeTmpRepo();
  try {
    const lines: string[] = [];
    const io = { stdout: (s: string) => lines.push(s), stderr: (s: string) => lines.push(s) };
    assert.equal(await main(["run", "--id", "new", "--dry-run"], { repoRoot: repo, io }), 0);
    const text = lines.join("\n");
    assert.doesNotMatch(text, /is active/);
    assert.match(text, /dry-run/);
    assert.deepEqual(snapshotTree(repo), []);
  } finally {
    fs.rmSync(repo, { recursive: true, force: true });
  }
});

// ── helpers + Hard Rule #13 ─────────────────────────────────────────────────────────

test("findFreePort returns a port that can actually be bound on loopback", async () => {
  const port = await findFreePort();
  assert.ok(Number.isInteger(port) && port > 0 && port < 65536);
  const server = http.createServer();
  await new Promise<void>((resolve, reject) => {
    server.once("error", reject);
    server.listen(port, "127.0.0.1", resolve);
  });
  await new Promise<void>((resolve) => server.close(() => resolve()));
});

test("candidate.mjs never shells out (Hard Rule #13) and never writes to the system tmpdir", () => {
  const source = fs.readFileSync(SCRIPT_PATH, "utf8");
  assert.doesNotMatch(source, /shell:\s*true/);
  assert.doesNotMatch(source, /\bexecSync\s*\(/);
  assert.doesNotMatch(source, /\bexec\s*\(/);
  assert.doesNotMatch(source, /os\.tmpdir\s*\(/);
  assert.doesNotMatch(source, /["'`]\/tmp\b/);
  // It reuses the boot-smoke primitives instead of re-implementing them.
  assert.match(source, /from "\.\.\/check\/check-pack-boot\.mjs"/);
});
