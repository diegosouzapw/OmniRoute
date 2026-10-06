import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { readFileSync } from "node:fs";

/**
 * Stage 7 (issue #10321) — build-time optional-pack staging.
 *
 * The heavy optional ML/browser dependency closure must leave the Electron
 * staging bundle as checksummed packs under `.build/optional-packs/`, with
 * `optional-packs.index.json` at the bundle root, while every other staged
 * dependency is preserved untouched.
 */

const stagingMod = await import("../../../scripts/build/optionalPackStaging.mjs");
const manifestMod = await import("../../../scripts/packs/optionalPackManifest.mjs");

const { stageOptionalPacks, findMemberDirs } = stagingMod as typeof stagingMod & {
  findMemberDirs: (root: string, member: string) => string[];
};
const { OPTIONAL_PACKS, PACK_INDEX_FILENAME, verifyAgainstIndexEntry } =
  manifestMod as typeof manifestMod & {
    OPTIONAL_PACKS: { name: string; packages: { name: string }[] }[];
    PACK_INDEX_FILENAME: string;
    verifyAgainstIndexEntry: (
      entry: PackIndexEntry,
      dir: string
    ) => Promise<{ ok: true } | { ok: false; errors: string[] }>;
  };

interface PackIndexEntry {
  name: string;
  packVersion: number;
  tarball: string;
  packages: { name: string; version: string | null; sha256: string }[];
}

function tmpDir(prefix: string): string {
  return fs.mkdtempSync(path.join(os.tmpdir(), prefix));
}

/** Write a minimal fake package under `<root>/node_modules/<name>`. */
function writePkg(root: string, name: string, extraFile?: string): string {
  const dir = path.join(root, "node_modules", ...name.split("/"));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(
    path.join(dir, "package.json"),
    `${JSON.stringify({ name, version: "1.0.0" }, null, 2)}\n`
  );
  fs.writeFileSync(path.join(dir, "index.js"), "module.exports = 1;\n");
  if (extraFile) fs.writeFileSync(path.join(dir, extraFile), "payload\n");
  return dir;
}

function stageFixture(stagingRoot: string): void {
  for (const pack of OPTIONAL_PACKS) {
    for (const member of pack.packages) writePkg(stagingRoot, member.name);
  }
  writePkg(stagingRoot, "hono"); // non-member must stay in the bundle.
}

test("stageOptionalPacks moves pack members out, indexes them, and keeps non-members", async () => {
  const stagingRoot = tmpDir("opt-pack-stage-");
  const packsOutDir = tmpDir("opt-pack-out-");
  stageFixture(stagingRoot);

  const result = await stageOptionalPacks({
    stagingRoot,
    packsOutDir,
    emitTarballs: false,
    log: () => {},
  });

  assert.equal(result.packs.length, 2, "both packs must be staged");
  assert.equal(result.index.packs.length, 2);

  // Members left the bundle …
  const first = OPTIONAL_PACKS[0];
  const member = first.packages[0].name;
  assert.equal(fs.existsSync(path.join(stagingRoot, "node_modules", ...member.split("/"))), false);
  // … and landed in a payload tree that satisfies its own index checksums.
  const entry = result.index.packs.find((p) => p.name === first.name);
  assert.ok(entry, `${first.name} must be indexed`);
  const staged = await verifyAgainstIndexEntry(
    entry,
    path.join(packsOutDir, first.name, "node_modules")
  );
  if (staged.ok !== true) {
    throw new Error(`staging verify failed: ${JSON.stringify(staged).slice(0, 300)}`);
  }
  assert.equal(staged.ok, true);

  // The index is written at the bundle root for the installer to discover.
  const onDisk = JSON.parse(readFileSync(path.join(stagingRoot, PACK_INDEX_FILENAME), "utf8"));
  assert.equal(onDisk.schemaVersion, 1);
  assert.equal(onDisk.packs.length, 2);

  // A non-member dependency is preserved untouched.
  assert.equal(fs.existsSync(path.join(stagingRoot, "node_modules", "hono", "index.js")), true);
});

test("stageOptionalPacks is fail-open: a partially-absent pack leaves the bundle but is not indexed", async () => {
  const stagingRoot = tmpDir("opt-pack-partial-");
  const packsOutDir = tmpDir("opt-pack-partial-out-");
  const pack = OPTIONAL_PACKS[0];
  writePkg(stagingRoot, pack.packages[0].name); // only one member present
  writePkg(stagingRoot, "hono");

  const result = await stageOptionalPacks({
    stagingRoot,
    packsOutDir,
    emitTarballs: false,
    log: () => {},
  });

  assert.equal(result.packs.length, 0, "incomplete pack must not be reported as staged");
  assert.equal(result.index.packs.length, 0, "incomplete pack must not be installable");
  // The present member still left the bundle (the size win)…
  assert.equal(
    fs.existsSync(path.join(stagingRoot, "node_modules", ...pack.packages[0].name.split("/"))),
    false
  );
  // …and the index file still exists so the installer fails cleanly instead of
  // discovering a stale one from a previous build.
  const onDisk = JSON.parse(readFileSync(path.join(stagingRoot, PACK_INDEX_FILENAME), "utf8"));
  assert.deepEqual(onDisk.packs, []);
});

test("nested duplicate member copies are removed so member bytes never ship twice", async () => {
  const stagingRoot = tmpDir("opt-pack-dup-");
  const packsOutDir = tmpDir("opt-pack-dup-out-");
  const pack = OPTIONAL_PACKS[0];
  for (const m of pack.packages) writePkg(stagingRoot, m.name);
  const rootCopy = path.join(stagingRoot, "node_modules", ...pack.packages[0].name.split("/"));
  const nestedCopy = writePkg(path.join(stagingRoot, "server"), pack.packages[0].name);

  // The locator finds both copies, shallowest first.
  assert.deepEqual(findMemberDirs(stagingRoot, pack.packages[0].name), [rootCopy, nestedCopy]);

  const result = await stageOptionalPacks({
    stagingRoot,
    packsOutDir,
    emitTarballs: false,
    log: () => {},
  });

  assert.equal(result.packs.length, 1);
  assert.equal(fs.existsSync(nestedCopy), false, "nested duplicate must be deleted, not shipped");
  assert.equal(
    fs.existsSync(
      path.join(packsOutDir, pack.name, "node_modules", ...pack.packages[0].name.split("/"))
    ),
    true
  );
});
