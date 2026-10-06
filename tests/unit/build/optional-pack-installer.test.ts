import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

/**
 * Stage 7 (issue #10321) — first-use optional-pack installer.
 *
 * Installs must be checksum-verified against the bundle-shipped index before
 * they ever become visible to the runtime gate, and a failed install must
 * never clobber a previously-verified one.
 */

const installer = await import("../../../scripts/packs/optionalPackInstaller.mjs");
const manifestMod = await import("../../../scripts/packs/optionalPackManifest.mjs");

const {
  findPackIndexFile,
  readPackIndex,
  packState,
  listPackStates,
  resolvePackSource,
  installPack,
  removePack,
  packsRoot,
} = installer as typeof installer & {
  findPackIndexFile: (startDirs: string[]) => string | null;
  readPackIndex: (indexFile: string) => {
    packs: { name: string; packages: { name: string; sha256: string }[] }[];
  };
  packState: (
    name: string,
    opts: { dataDir?: string; index?: object }
  ) => Promise<{
    name: string;
    indexed: boolean;
    installed: boolean;
    verified: boolean | null;
    errors: string[] | null;
  }>;
  listPackStates: (opts: {
    dataDir?: string;
    index?: object;
  }) => Promise<Awaited<ReturnType<typeof packState>>[]>;
  resolvePackSource: (name: string, sourceDir: string, stagingDir: string) => { kind: string };
  installPack: (
    name: string,
    opts: { dataDir?: string; index?: object; sourceDir: string; log?: () => void }
  ) => Promise<unknown>;
  removePack: (name: string, opts: { dataDir?: string }) => boolean;
  packsRoot: (dataDir?: string) => string;
};
const { OPTIONAL_PACKS, PACK_INDEX_FILENAME, buildPackIndexEntry } =
  manifestMod as typeof manifestMod & {
    OPTIONAL_PACKS: { name: string; packages: { name: string }[] }[];
    PACK_INDEX_FILENAME: string;
  };

interface PackIndex {
  packs: { name: string; packVersion: number; packages: { name: string; sha256: string }[] }[];
}

function tmpDir(prefix: string): string {
  return fs.mkdtempSync(path.join(os.tmpdir(), prefix));
}

/**
 * Build a fake bundle payload tree: `sourceDir/optional-pack-<name>/node_modules`
 * for every manifest pack, plus the matching `optional-packs.index.json`.
 */
async function buildSourceFixture(sourceDir: string): Promise<PackIndex> {
  const index: PackIndex = { packs: [] };
  for (const pack of OPTIONAL_PACKS) {
    const nodeModules = path.join(sourceDir, `optional-pack-${pack.name}`, "node_modules");
    for (const member of pack.packages) {
      const dir = path.join(nodeModules, ...member.name.split("/"));
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(
        path.join(dir, "package.json"),
        `${JSON.stringify({ name: member.name, version: "9.9.9" })}\n`
      );
      fs.writeFileSync(path.join(dir, "index.js"), "module.exports = 1;\n");
    }
    index.packs.push((await buildPackIndexEntry(pack, nodeModules)) as PackIndex["packs"][number]);
  }
  fs.writeFileSync(
    path.join(sourceDir, PACK_INDEX_FILENAME),
    `${JSON.stringify(index, null, 2)}\n`
  );
  return index;
}

test("packState is tri-state: absent → verified null, intact → true, tampered → false", async () => {
  const sourceDir = tmpDir("opt-pk-src-");
  const index = await buildSourceFixture(sourceDir);
  const dataDir = tmpDir("opt-pk-data-");
  const pack = OPTIONAL_PACKS[0];

  // Not installed: nothing verified, no crash on the missing tree.
  const before = await packState(pack.name, { dataDir, index });
  assert.equal(before.installed, false);
  assert.equal(before.verified, null);

  await installPack(pack.name, { dataDir, index, sourceDir, log: () => {} });
  assert.equal(
    (await packState(pack.name, { dataDir, index })).verified,
    true,
    "fresh install must verify"
  );
  assert.equal((await listPackStates({ dataDir, index })).length, OPTIONAL_PACKS.length);

  // Tamper with one installed member file.
  const memberPkg = path.join(
    packsRoot(dataDir),
    pack.name,
    "node_modules",
    ...pack.packages[0].name.split("/"),
    "index.js"
  );
  fs.writeFileSync(memberPkg, "module.exports = 2; // tampered\n");
  const tampered = await packState(pack.name, { dataDir, index });
  assert.equal(tampered.verified, false);
  assert.ok(
    tampered.errors![0].includes(pack.packages[0].name),
    "errors must name the broken member"
  );
});

test("installPack fails closed and never clobbers a previously-verified install", async () => {
  const sourceDir = tmpDir("opt-pk-src2-");
  const index = await buildSourceFixture(sourceDir);
  const dataDir = tmpDir("opt-pk-data2-");
  const pack = OPTIONAL_PACKS[0];

  // Unknown pack: refused before anything touches the filesystem.
  await assert.rejects(
    installPack("no-such-pack", { dataDir, index, sourceDir }),
    /not in the pack index/
  );
  // Pack missing from the index (even though it exists in the manifest): refused.
  const halfIndex: PackIndex = { packs: [] };
  await assert.rejects(
    installPack(pack.name, { dataDir, index: halfIndex, sourceDir }),
    /not in the pack index/
  );

  await installPack(pack.name, { dataDir, index, sourceDir, log: () => {} });
  assert.equal((await packState(pack.name, { dataDir, index })).verified, true);

  // Corrupt the payload source, then attempt a reinstall: verification must
  // reject it and the previous good install must survive untouched.
  const sourceMember = path.join(
    sourceDir,
    `optional-pack-${pack.name}`,
    "node_modules",
    ...pack.packages[0].name.split("/"),
    "index.js"
  );
  fs.writeFileSync(sourceMember, "module.exports = 3; // corrupted\n");
  await assert.rejects(
    installPack(pack.name, { dataDir, index, sourceDir, log: () => {} }),
    /failed verification/
  );
  assert.equal(
    (await packState(pack.name, { dataDir, index })).verified,
    true,
    "prior install must remain verified"
  );

  // No payload at all for the pack: clear error naming the expected layouts.
  const emptySource = tmpDir("opt-pk-empty-");
  assert.throws(() => resolvePackSource(pack.name, emptySource, dataDir), /no payload for pack/);
});

test("installPack accepts tarball payloads (the desktop release asset layout)", async () => {
  const sourceDir = tmpDir("opt-pk-tar-");
  const index = await buildSourceFixture(sourceDir);
  const dataDir = tmpDir("opt-pk-tar-data-");
  const pack = OPTIONAL_PACKS[0];

  // Repack the fixture as the release workflow ships it: a gzipped tar of the
  // `node_modules` directory (bsdtar is present on macOS/Linux/CI runners).
  const packDir = path.join(sourceDir, `optional-pack-${pack.name}`);
  const tarball = path.join(sourceDir, `optional-pack-${pack.name}.tar.gz`);
  const tarred = spawnSync("tar", ["-czf", tarball, "-C", packDir, "node_modules"], {
    stdio: "pipe",
  });
  assert.equal(tarred.status, 0, "fixture tarball creation must succeed");
  fs.rmSync(packDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 }); // only the tarball remains

  const source = resolvePackSource(pack.name, sourceDir, dataDir);
  assert.equal(source.kind, "tarball");
  await installPack(pack.name, { dataDir, index, sourceDir, log: () => {} });
  assert.equal(
    (await packState(pack.name, { dataDir, index })).verified,
    true,
    "tarball install must verify"
  );
  // The temp staging dir must not linger next to the install.
  assert.equal(
    fs.readdirSync(packsRoot(dataDir)).filter((e) => e.startsWith(".staging-")).length,
    0
  );
});

test("removePack is a no-op when absent; findPackIndexFile walks up and readPackIndex rejects malformed files", async () => {
  const dataDir = tmpDir("opt-pk-rm-");
  const pack = OPTIONAL_PACKS[0];
  assert.equal(removePack(pack.name, { dataDir }), false);

  const sourceDir = tmpDir("opt-pk-src3-");
  const index = await buildSourceFixture(sourceDir);
  await installPack(pack.name, { dataDir, index, sourceDir, log: () => {} });
  assert.equal(removePack(pack.name, { dataDir }), true);
  assert.equal(fs.existsSync(path.join(packsRoot(dataDir), pack.name)), false);

  // Index discovery walks up from a deep directory to the bundle root.
  const nested = path.join(sourceDir, "a", "b", "c");
  fs.mkdirSync(nested, { recursive: true });
  assert.equal(findPackIndexFile([nested]), path.join(sourceDir, PACK_INDEX_FILENAME));
  assert.equal(findPackIndexFile([tmpDir("opt-pk-nowhere-")]), null);
  assert.equal(
    findPackIndexFile(["", null as unknown as string, nested]),
    path.join(sourceDir, PACK_INDEX_FILENAME)
  );

  // Malformed index files fail loudly instead of yielding an empty pack list.
  const malformed = tmpDir("opt-pk-bad-");
  const badFile = path.join(malformed, PACK_INDEX_FILENAME);
  fs.writeFileSync(badFile, "{ not json");
  assert.throws(() => readPackIndex(badFile), /malformed pack index/);
});
