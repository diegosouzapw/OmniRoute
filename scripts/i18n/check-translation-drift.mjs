#!/usr/bin/env node
/**
 * OmniRoute — i18n translation drift checker (CI gate).
 *
 * Verifies that every source file recorded in `.i18n-state.json` still has
 * the same SHA-256 hash on disk and that every produced translation file
 * exists with the recorded target hash. Does NOT call any API — purely a
 * deterministic state-vs-disk comparison.
 *
 * Modes:
 *   --strict (default)  exit 1 on any drift, print the offending paths
 *   --warn              exit 0, print warnings only
 *   --json              emit a JSON report to stdout (no human log lines)
 *
 * Recommended usage in CI:
 *   npm run i18n:check
 */

import { promises as fs, existsSync } from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import process from "node:process";
import { fileURLToPath, pathToFileURL } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SCRIPT_DIR, "..", "..");
const STATE_PATH = path.join(ROOT, ".i18n-state.json");

function parseArgs(argv) {
  const opts = { mode: "strict", json: false };
  for (const arg of argv.slice(2)) {
    if (arg === "--warn") opts.mode = "warn";
    else if (arg === "--strict") opts.mode = "strict";
    else if (arg === "--json") opts.json = true;
    else if (arg === "--help" || arg === "-h") {
      console.log(
        [
          "Usage: node scripts/i18n/check-translation-drift.mjs [--strict|--warn] [--json]",
          "",
          "  --strict   (default) exit 1 when any source or target is out of date",
          "  --warn     report drift but exit 0",
          "  --json     write a machine-readable report to stdout",
        ].join("\n")
      );
      process.exit(0);
    }
  }
  return opts;
}

function sha256(buf) {
  return crypto.createHash("sha256").update(buf).digest("hex");
}

async function main() {
  const opts = parseArgs(process.argv);

  if (!existsSync(STATE_PATH)) {
    const msg = ".i18n-state.json not found — run `npm run i18n:run` to bootstrap.";
    if (opts.json) {
      process.stdout.write(JSON.stringify({ ok: false, reason: "missing-state" }) + "\n");
    } else {
      console.error(`[i18n-check] ${msg}`);
    }
    process.exit(opts.mode === "warn" ? 0 : 1);
  }

  const state = JSON.parse(await fs.readFile(STATE_PATH, "utf8"));
  const sources = state.sources || {};

  const driftedSources = [];
  const missingTargets = [];
  const driftedTargets = [];
  let checkedSources = 0;
  let checkedTargets = 0;

  for (const [rel, entry] of Object.entries(sources)) {
    checkedSources++;
    const absSource = path.join(ROOT, rel);
    if (!existsSync(absSource)) {
      driftedSources.push({ rel, reason: "source-missing" });
      continue;
    }
    const currentHash = sha256(await fs.readFile(absSource));
    if (currentHash !== entry.source_hash) {
      driftedSources.push({
        rel,
        reason: "source-changed",
        recorded: entry.source_hash,
        current: currentHash,
      });
    }

    for (const [locale, info] of Object.entries(entry.locales || {})) {
      checkedTargets++;
      // Mirror the path layout used by run-translation.mjs.
      const targetAbs = rel.includes("/")
        ? path.join(ROOT, "docs", "i18n", locale, rel)
        : path.join(ROOT, "docs", "i18n", locale, rel);
      if (!existsSync(targetAbs)) {
        missingTargets.push({ rel, locale });
        continue;
      }
      const targetHash = sha256(await fs.readFile(targetAbs));
      if (info.target_hash && targetHash !== info.target_hash) {
        driftedTargets.push({ rel, locale, recorded: info.target_hash, current: targetHash });
      }
    }
  }

  const ok =
    driftedSources.length === 0 && missingTargets.length === 0 && driftedTargets.length === 0;

  if (opts.json) {
    process.stdout.write(
      JSON.stringify(
        {
          ok,
          checkedSources,
          checkedTargets,
          driftedSources,
          missingTargets,
          driftedTargets,
        },
        null,
        2
      ) + "\n"
    );
  } else {
    console.log(`[i18n-check] checked sources=${checkedSources}, targets=${checkedTargets}`);
    if (driftedSources.length) {
      console.log(`[i18n-check] drifted sources (${driftedSources.length}):`);
      for (const d of driftedSources) console.log(`  - ${d.rel} (${d.reason})`);
    }
    if (missingTargets.length) {
      console.log(`[i18n-check] missing targets (${missingTargets.length}):`);
      for (const m of missingTargets) console.log(`  - ${m.rel} [${m.locale}]`);
    }
    if (driftedTargets.length) {
      console.log(`[i18n-check] drifted targets (${driftedTargets.length}):`);
      for (const t of driftedTargets) console.log(`  - ${t.rel} [${t.locale}]`);
    }
    if (ok) {
      console.log("[i18n-check] PASS — all sources and targets match recorded hashes.");
    } else if (opts.mode === "warn") {
      console.log("[i18n-check] WARN — drift detected (warn mode, exiting 0).");
    } else {
      console.log("[i18n-check] FAIL — drift detected. Run `npm run i18n:run` to refresh.");
    }
  }

  if (!ok && opts.mode !== "warn") process.exit(1);
}

const isDirectRun = import.meta.url === pathToFileURL(process.argv[1]).href;
if (isDirectRun) {
  main().catch((err) => {
    console.error("[i18n-check] ERROR", err?.stack || err?.message || String(err));
    process.exit(1);
  });
}
