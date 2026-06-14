import { test } from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import {
  findMigrationAnomalies,
  KNOWN_DUPLICATE_VERSIONS,
  KNOWN_GAPS,
} from "../../scripts/check/check-migration-numbering.mjs";
import { reportStaleEntries } from "../../scripts/check/lib/allowlist.mjs";

type Anomalies = {
  duplicates: Array<{ version: string; names: string[] }>;
  gaps: string[];
  badNames: string[];
};

const EMPTY = new Set<string>();

test("clean contiguous sequence has no anomalies", () => {
  const files = ["001_a.sql", "002_b.sql", "003_c.sql"];
  const r = findMigrationAnomalies(files, EMPTY, EMPTY) as Anomalies;
  assert.deepEqual(r.duplicates, []);
  assert.deepEqual(r.gaps, []);
  assert.deepEqual(r.badNames, []);
});

test("flags a filename without a zero-padded numeric prefix", () => {
  const files = ["001_a.sql", "add_index.sql", "2_short.sql"];
  const r = findMigrationAnomalies(files, EMPTY, EMPTY) as Anomalies;
  // "add_index.sql" has no numeric prefix; "2_short.sql" is not zero-padded (<3 digits).
  assert.deepEqual(r.badNames.sort(), ["2_short.sql", "add_index.sql"]);
});

test("flags a real duplicate version prefix", () => {
  const files = ["001_a.sql", "002_b.sql", "002_c.sql"];
  const r = findMigrationAnomalies(files, EMPTY, EMPTY) as Anomalies;
  assert.equal(r.duplicates.length, 1);
  assert.equal(r.duplicates[0].version, "002");
  assert.deepEqual(r.duplicates[0].names, ["002_b.sql", "002_c.sql"]);
});

test("does NOT flag a duplicate that is in the knownDuplicates allowlist", () => {
  const files = ["001_a.sql", "002_b.sql", "002_c.sql"];
  const known = new Set<string>(["002"]);
  const r = findMigrationAnomalies(files, known, EMPTY) as Anomalies;
  assert.deepEqual(r.duplicates, []);
});

test("flags an unexplained sequence gap", () => {
  const files = ["001_a.sql", "002_b.sql", "004_d.sql"];
  const r = findMigrationAnomalies(files, EMPTY, EMPTY) as Anomalies;
  assert.deepEqual(r.gaps, ["003"]);
});

test("does NOT flag a gap that is in the knownGaps allowlist", () => {
  const files = ["001_a.sql", "002_b.sql", "004_d.sql"];
  const known = new Set<string>(["003"]);
  const r = findMigrationAnomalies(files, EMPTY, known) as Anomalies;
  assert.deepEqual(r.gaps, []);
});

test("gaps at the boundaries are not counted (only interior gaps)", () => {
  // No phantom gap below min or above max.
  const files = ["003_a.sql", "004_b.sql"];
  const r = findMigrationAnomalies(files, EMPTY, EMPTY) as Anomalies;
  assert.deepEqual(r.gaps, []);
});

test("ignores non-.sql files entirely", () => {
  const files = ["001_a.sql", "002_b.sql", "README.md", ".keep"];
  const r = findMigrationAnomalies(files, EMPTY, EMPTY) as Anomalies;
  assert.deepEqual(r.badNames, []);
  assert.deepEqual(r.gaps, []);
  assert.deepEqual(r.duplicates, []);
});

test("a NEW gap is flagged even when a known gap is allowlisted", () => {
  // Simulate the real frozen gaps plus a fresh hole that must NOT be tolerated.
  const files = ["001_a.sql", "003_c.sql", "005_e.sql"];
  const known = new Set<string>(["004"]); // 004 allowlisted, 002 is the new hole
  const r = findMigrationAnomalies(files, EMPTY, known) as Anomalies;
  assert.deepEqual(r.gaps, ["002"]);
});

// --- Real dataset: the frozen allowlists must keep the live dir green ---

test("the real migrations dir produces ZERO anomalies under the frozen allowlists", () => {
  const dir = path.resolve(import.meta.dirname, "../../src/lib/db/migrations");
  const filenames = fs.readdirSync(dir).filter((f) => f.endsWith(".sql"));
  assert.ok(filenames.length > 0, "expected migration files to exist");
  const r = findMigrationAnomalies(filenames, KNOWN_DUPLICATE_VERSIONS, KNOWN_GAPS) as Anomalies;
  assert.deepEqual(r.badNames, [], `unexpected bad migration names: ${r.badNames.join(", ")}`);
  assert.deepEqual(
    r.duplicates,
    [],
    `unexpected duplicate versions: ${JSON.stringify(r.duplicates)}`
  );
  assert.deepEqual(r.gaps, [], `unexpected sequence gaps: ${r.gaps.join(", ")}`);
});

test("frozen allowlists match the documented audit (026 & 055 gaps)", () => {
  assert.ok((KNOWN_GAPS as Set<string>).has("026"));
  assert.ok((KNOWN_GAPS as Set<string>).has("055"));
  // "041" was removed from KNOWN_DUPLICATE_VERSIONS in 6A.3 (stale: no physical
  // duplicate for that prefix on disk anymore — only 041_compression_receipts.sql exists).
  assert.equal((KNOWN_DUPLICATE_VERSIONS as Set<string>).has("041"), false);
});

// --- stale-allowlist enforcement (6A.3) ---

test("stale-enforcement: a gap allowlist entry no longer needed is reported as stale", () => {
  // Simulate a gap that was filled (e.g. a missing migration file was added back).
  const liveGaps: string[] = []; // gap was filled
  const stale = (reportStaleEntries as (a: Set<string>, l: string[], g: string) => string[])(
    new Set(["042"]),
    liveGaps,
    "check-migration-numbering:gaps"
  );
  assert.deepEqual(stale, ["042"]);
});

test("stale-enforcement: a duplicate allowlist entry no longer needed is reported as stale", () => {
  // Simulate a formerly-duplicated version where one file was removed (no duplicate left).
  const liveDups: string[] = []; // duplicate resolved
  const stale = (reportStaleEntries as (a: Set<string>, l: string[], g: string) => string[])(
    new Set(["099"]),
    liveDups,
    "check-migration-numbering:duplicates"
  );
  assert.deepEqual(stale, ["099"]);
});

test("stale-enforcement: live repo KNOWN_GAPS are all still real (no stale gap entries)", () => {
  const dir = path.resolve(import.meta.dirname, "../../src/lib/db/migrations");
  const filenames = fs.readdirSync(dir).filter((f) => f.endsWith(".sql"));
  const raw = findMigrationAnomalies(filenames, new Set(), new Set()) as {
    duplicates: Array<{ version: string; names: string[] }>;
    gaps: string[];
    badNames: string[];
  };
  const stale = (reportStaleEntries as (a: Set<string>, l: string[], g: string) => string[])(
    KNOWN_GAPS as Set<string>,
    raw.gaps,
    "check-migration-numbering:gaps"
  );
  assert.deepEqual(stale, [], `KNOWN_GAPS has stale entries: ${stale.join(", ")}`);
});

test("stale-enforcement: live repo KNOWN_DUPLICATE_VERSIONS are all still real (no stale dup entries)", () => {
  const dir = path.resolve(import.meta.dirname, "../../src/lib/db/migrations");
  const filenames = fs.readdirSync(dir).filter((f) => f.endsWith(".sql"));
  const raw = findMigrationAnomalies(filenames, new Set(), new Set()) as {
    duplicates: Array<{ version: string; names: string[] }>;
    gaps: string[];
    badNames: string[];
  };
  const liveDupVersions = raw.duplicates.map((d) => d.version);
  const stale = (reportStaleEntries as (a: Set<string>, l: string[], g: string) => string[])(
    KNOWN_DUPLICATE_VERSIONS as Set<string>,
    liveDupVersions,
    "check-migration-numbering:duplicates"
  );
  assert.deepEqual(stale, [], `KNOWN_DUPLICATE_VERSIONS has stale entries: ${stale.join(", ")}`);
});
