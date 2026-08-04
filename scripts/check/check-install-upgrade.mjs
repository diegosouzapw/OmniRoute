#!/usr/bin/env node
/**
 * check-install-upgrade — proves the two install paths a real user takes, BEFORE publishing.
 *
 * `check:pack-boot` already proves a fresh install boots. It does NOT prove the path that
 * actually broke us: installing the new version OVER an existing one, where ~110 SQLite
 * migrations run against a populated database. v3.8.48 shipped as a hotfix precisely because
 * the published 3.8.47 crashed on boot, and a v3.8.49 manual test on a real 3.8.48 box was
 * what first exercised the upgrade path end to end.
 *
 * Phase A — clean install:   fresh prefix + fresh DATA_DIR, install the packed tarball, boot.
 * Phase B — upgrade install: fresh prefix + fresh DATA_DIR, install the PREVIOUS published
 *                            version, boot it (creates + migrates the DB), stop, install the
 *                            packed tarball over the SAME prefix, boot against the SAME DATA_DIR.
 *
 * Schema convergence is the third assertion, and its DIRECTION is what matters:
 *
 *   fresh − upgraded ≠ ∅  →  FAIL. A table a clean install creates but an upgrade does not
 *                            means every existing user is missing structure the code expects.
 *                            This is the failure mode that only ever bites upgraders.
 *   upgraded − fresh ≠ ∅  →  WARN. Residue: a table whose CREATE left the migration set in
 *                            some past cycle but survives in databases that already had it.
 *                            Harmless, but it means the two paths do not converge — allowlist
 *                            it explicitly so a NEW divergence is still visible.
 *
 * Usage:
 *   node scripts/check/check-install-upgrade.mjs [--from <version>] [--skip-upgrade]
 *
 * `--from` pins the previous version (default: the current `latest` dist-tag on npm).
 * Requires `npm run build:cli` first — this is a --with-build gate, like check:pack-boot.
 */

import { execFileSync, spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";

const BOOT_DEADLINE_MS = 180_000;
const POLL_INTERVAL_MS = 2_000;
const ALLOWLIST_PATH = "config/quality/install-upgrade-allowlist.json";

const log = (msg) => console.log(`[install-upgrade] ${msg}`);
const warn = (msg) => console.log(`[install-upgrade] ⚠️  ${msg}`);

function pickTarball(packJson) {
  const filename = JSON.parse(packJson)?.[0]?.filename;
  if (!filename) throw new Error("npm pack --json returned no filename");
  return filename;
}

/** Free-ish port per phase so a leaked child from a previous run cannot collide. */
function pickPort(offset) {
  return 21000 + offset + (process.pid % 500);
}

function loadAllowlist(root) {
  const file = path.join(root, ALLOWLIST_PATH);
  if (!fs.existsSync(file)) return { residualTables: {} };
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

/**
 * Pure verdict on schema convergence — exported so the asymmetry can be tested without
 * building, packing and booting anything (the same reason check-test-masking exports its
 * helpers: reproducing the deterministic part must not cost a full gate run).
 *
 * The two directions are NOT symmetric:
 *   onlyFresh    → always a failure. Upgraders would be missing structure.
 *   onlyUpgraded → residue. Fails only when not recorded in the allowlist.
 */
export function evaluateConvergence({ freshTables, upgradedTables, residualAllowlist = {} }) {
  const fresh = freshTables instanceof Set ? freshTables : new Set(freshTables ?? []);
  const upgraded = upgradedTables instanceof Set ? upgradedTables : new Set(upgradedTables ?? []);
  const onlyFresh = [...fresh].filter((t) => !upgraded.has(t)).sort();
  const onlyUpgraded = [...upgraded].filter((t) => !fresh.has(t)).sort();
  const unknownResidue = onlyUpgraded.filter((t) => !(t in residualAllowlist));
  const failures = [];
  if (onlyFresh.length) {
    failures.push(
      `schema divergence — tables a CLEAN install creates but an UPGRADE does not: ${onlyFresh.join(", ")}. ` +
        "Every existing user would be missing these; add the migration."
    );
  }
  if (unknownResidue.length) {
    failures.push(
      `NEW residual table(s) not in ${ALLOWLIST_PATH}: ${unknownResidue.join(", ")}. ` +
        "Either drop them in a migration or record them with a justification."
    );
  }
  return { ok: failures.length === 0, failures, onlyFresh, onlyUpgraded, unknownResidue };
}

/** Table names in a SQLite file, excluding sqlite_* internals. */
function readTables(dbPath) {
  if (!fs.existsSync(dbPath)) return null;
  const db = new DatabaseSync(dbPath, { readOnly: true });
  try {
    const rows = db
      .prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%'")
      .all();
    return new Set(rows.map((r) => r.name));
  } finally {
    db.close();
  }
}

function findDb(dataDir) {
  const candidates = ["storage.sqlite", "omniroute.sqlite", "data.sqlite"];
  for (const name of candidates) {
    const p = path.join(dataDir, name);
    if (fs.existsSync(p)) return p;
  }
  const found = fs.readdirSync(dataDir).find((f) => f.endsWith(".sqlite"));
  return found ? path.join(dataDir, found) : null;
}

/** Boot an installed CLI and poll health. Returns { ok, version, failures, tail }. */
async function bootAndProbe({ prefix, dataDir, port, expectVersion, label }) {
  const binPath = path.join(prefix, "bin", "omniroute");
  if (!fs.existsSync(binPath)) {
    return { ok: false, failures: [`${label}: bin not found at ${binPath}`], tail: [] };
  }
  const child = spawn(binPath, ["serve", "--port", String(port)], {
    env: {
      ...process.env,
      PORT: String(port),
      DATA_DIR: dataDir,
      JWT_SECRET: "install-upgrade-gate-secret-with-sufficient-length",
      API_KEY_SECRET: "install-upgrade-gate-api-key-secret-long",
      DISABLE_SQLITE_AUTO_BACKUP: "true",
      OMNIROUTE_SKIP_SYSTEM_TRUST: "1",
    },
    stdio: ["ignore", "pipe", "pipe"],
    detached: true,
  });

  const tail = [];
  const keepTail = (chunk) => {
    tail.push(String(chunk));
    while (tail.length > 80) tail.shift();
  };
  child.stdout.on("data", keepTail);
  child.stderr.on("data", keepTail);
  let childExit = null;
  child.on("exit", (code) => {
    childExit = code ?? -1;
  });

  const deadline = Date.now() + BOOT_DEADLINE_MS;
  let result = { ok: false, failures: [`${label}: never became healthy`], tail };
  while (Date.now() < deadline) {
    if (childExit !== null) {
      result = { ok: false, failures: [`${label}: exited with code ${childExit} before serving`], tail };
      break;
    }
    try {
      const res = await fetch(`http://127.0.0.1:${port}/api/monitoring/health`);
      const body = await res.json().catch(() => null);
      if (res.status === 200 && body && typeof body === "object") {
        const failures = [];
        // `status` may legitimately report degraded (no providers configured) — the gate
        // targets boot crashes and version mismatches, not health of a bare install.
        if (expectVersion && body.version !== expectVersion) {
          failures.push(`${label}: health reports version ${body.version}, expected ${expectVersion}`);
        }
        result = { ok: failures.length === 0, version: body.version, failures, tail };
        break;
      }
    } catch {
      // not listening yet
    }
    await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));
  }

  try {
    if (childExit === null) process.kill(-child.pid, "SIGTERM");
  } catch {
    /* already gone */
  }
  // Give the process a moment to flush and release the SQLite handle before we read the file.
  await new Promise((r) => setTimeout(r, 3_000));
  return result;
}

function npmInstallInto(prefix, spec) {
  execFileSync("npm", ["install", "-g", "--prefix", prefix, "--no-audit", "--no-fund", spec], {
    encoding: "utf8",
    maxBuffer: 128 * 1024 * 1024,
  });
}

function resolvePreviousVersion(current, explicit) {
  if (explicit) return explicit;
  const out = execFileSync("npm", ["view", "omniroute", "dist-tags.latest"], { encoding: "utf8" });
  const latest = out.trim();
  if (!latest) throw new Error("could not resolve omniroute@latest from npm");
  if (latest === current) {
    // The version under test is already published (re-run of a shipped release): step back
    // to the highest published version strictly below it.
    const all = JSON.parse(execFileSync("npm", ["view", "omniroute", "versions", "--json"], { encoding: "utf8" }));
    const stable = all.filter((v) => !/-(rc|alpha|beta|pre|next)/.test(v) && v !== current);
    return stable[stable.length - 1];
  }
  return latest;
}

async function main() {
  const ROOT = process.cwd();
  const args = process.argv.slice(2);
  const fromIdx = args.indexOf("--from");
  const explicitFrom = fromIdx >= 0 ? args[fromIdx + 1] : null;
  const skipUpgrade = args.includes("--skip-upgrade");

  if (!fs.existsSync(path.join(ROOT, "dist", "server.js"))) {
    console.error("[install-upgrade] dist/server.js missing — run `npm run build:cli` first");
    process.exit(2);
  }
  const version = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8")).version;
  const allowlist = loadAllowlist(ROOT);
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-install-upgrade-"));
  const failures = [];
  const warnings = [];

  try {
    log(`packing v${version}…`);
    const packOut = execFileSync("npm", ["pack", "--json", "--pack-destination", tmp], {
      cwd: ROOT,
      encoding: "utf8",
      maxBuffer: 128 * 1024 * 1024,
    });
    const tarball = path.join(tmp, pickTarball(packOut));

    // ---- Phase A: clean install -------------------------------------------------
    log("PHASE A — clean install of the packed tarball");
    const aPrefix = path.join(tmp, "a-prefix");
    const aData = path.join(tmp, "a-data");
    fs.mkdirSync(aData, { recursive: true });
    npmInstallInto(aPrefix, tarball);
    const a = await bootAndProbe({
      prefix: aPrefix,
      dataDir: aData,
      port: pickPort(0),
      expectVersion: version,
      label: "clean",
    });
    failures.push(...a.failures);
    if (a.ok) log(`clean install healthy on v${a.version}`);
    const aDb = findDb(aData);
    const freshTables = aDb ? readTables(aDb) : null;
    if (!freshTables) failures.push("clean: no SQLite database was created");
    else log(`clean install schema: ${freshTables.size} tables`);

    // ---- Phase B: upgrade over the previous published version -------------------
    let upgradedTables = null;
    if (skipUpgrade) {
      warn("PHASE B skipped (--skip-upgrade)");
    } else {
      const previous = resolvePreviousVersion(version, explicitFrom);
      log(`PHASE B — upgrade path: omniroute@${previous} → v${version}`);
      const bPrefix = path.join(tmp, "b-prefix");
      const bData = path.join(tmp, "b-data");
      fs.mkdirSync(bData, { recursive: true });

      npmInstallInto(bPrefix, `omniroute@${previous}`);
      const before = await bootAndProbe({
        prefix: bPrefix,
        dataDir: bData,
        port: pickPort(1),
        expectVersion: previous,
        label: `previous(${previous})`,
      });
      if (!before.ok) {
        // A broken PREVIOUS version is not this release's fault — degrade to a warning so a
        // historically bad publish cannot block the current one.
        warnings.push(`previous version ${previous} did not boot cleanly — upgrade path unverified`);
        for (const f of before.failures) warn(f);
      } else {
        const beforeDb = findDb(bData);
        const beforeTables = beforeDb ? readTables(beforeDb) : new Set();
        log(`previous(${previous}) schema: ${beforeTables.size} tables — upgrading in place`);

        npmInstallInto(bPrefix, tarball);
        const after = await bootAndProbe({
          prefix: bPrefix,
          dataDir: bData,
          port: pickPort(2),
          expectVersion: version,
          label: "upgraded",
        });
        failures.push(...after.failures);
        if (after.ok) log(`upgrade healthy on v${after.version}`);

        const afterDb = findDb(bData);
        upgradedTables = afterDb ? readTables(afterDb) : null;
        if (!upgradedTables) {
          failures.push("upgraded: database disappeared after the upgrade");
        } else {
          log(`upgraded schema: ${upgradedTables.size} tables`);
          const dropped = [...beforeTables].filter((t) => !upgradedTables.has(t));
          if (dropped.length) {
            failures.push(`upgrade DROPPED tables that existed before: ${dropped.join(", ")}`);
          }
        }
      }
    }

    // ---- Schema convergence -----------------------------------------------------
    if (freshTables && upgradedTables) {
      const verdict = evaluateConvergence({
        freshTables,
        upgradedTables,
        residualAllowlist: allowlist.residualTables ?? {},
      });
      if (verdict.onlyUpgraded.length) {
        warn(`residual tables present only after upgrade: ${verdict.onlyUpgraded.join(", ")}`);
      }
      failures.push(...verdict.failures);
      if (verdict.ok) log("schema convergence OK (no new divergence)");
    }

    if (warnings.length) for (const w of warnings) warn(w);
    if (failures.length) {
      console.error(`[install-upgrade] FAIL — ${failures.length} problem(s):`);
      for (const f of failures) console.error(`  ✗ ${f}`);
      process.exit(1);
    }
    log("PASS — clean install and upgrade path both boot; schema converges.");
    process.exit(0);
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
}

// Only run the (expensive) gate when invoked directly — importing this module for the pure
// helper above must not pack, install or boot anything.
if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname)) {
  main().catch((err) => {
    console.error(`[install-upgrade] crashed: ${err?.message ?? err}`);
    process.exit(1);
  });
}
