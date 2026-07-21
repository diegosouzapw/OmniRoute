import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = resolve(fileURLToPath(import.meta.url), "../../../");

/**
 * Regression guard for the 2026-07-21 Dependabot sweep (alerts #107–#123).
 * Four transitive advisories were resolved lockfile-first (npm audit fix) plus a
 * `shell-quote` override (concurrently pins it exactly). If a later lock regen or a
 * merge re-introduces a vulnerable range, this fails LOUDLY instead of waiting for the
 * next Dependabot scan.
 */

type LockPkg = { version?: string };
type Lock = { packages?: Record<string, LockPkg> };

function cmp(a: string, b: string): number {
  const pa = a.split(".").map(Number);
  const pb = b.split(".").map(Number);
  for (let i = 0; i < 3; i++) {
    const d = (pa[i] || 0) - (pb[i] || 0);
    if (d !== 0) return d;
  }
  return 0;
}

function versionsOf(lock: Lock, name: string): string[] {
  const out: string[] = [];
  for (const [p, info] of Object.entries(lock.packages || {})) {
    if (p.endsWith(`node_modules/${name}`) && info.version) out.push(info.version);
  }
  return out;
}

/** Each advisory: any resolved version must sit at/above the first patched version of its major line. */
const ADVISORIES: Array<{ name: string; floors: string[] }> = [
  { name: "tar", floors: ["7.5.18"] }, // GHSA-w8wr-v893-vjvp
  { name: "shell-quote", floors: ["1.9.0"] }, // GHSA-395f-4hp3-45gv
  { name: "js-yaml", floors: ["4.3.0"] }, // GHSA-52cp-r559-cp3m (>=4.0.0 <4.3.0); 5.x already safe
  { name: "brace-expansion", floors: ["1.1.16", "2.1.2", "5.0.7"] }, // GHSA-3jxr-9vmj-r5cp
];

function floorForMajor(version: string, floors: string[]): string | undefined {
  const major = Number(version.split(".")[0]);
  return floors.find((f) => Number(f.split(".")[0]) === major);
}

for (const lockRel of ["package-lock.json", "electron/package-lock.json"]) {
  test(`Dependabot #107–#123 — ${lockRel} carries no vulnerable transitive versions`, () => {
    const lock: Lock = JSON.parse(readFileSync(join(REPO_ROOT, lockRel), "utf8"));
    for (const adv of ADVISORIES) {
      for (const v of versionsOf(lock, adv.name)) {
        const floor = floorForMajor(v, adv.floors);
        if (!floor) continue; // major line not covered by the advisory → safe by definition
        assert.ok(
          cmp(v, floor) >= 0,
          `${lockRel}: ${adv.name}@${v} is below the patched floor ${floor} — a vulnerable ` +
            `transitive version was re-introduced. Run \`npm audit fix --package-lock-only\`.`
        );
      }
    }
  });
}
