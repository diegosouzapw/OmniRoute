import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import {
  diskSnapshotPath,
  readDiskSnapshot,
  writeDiskSnapshot,
  type CatalogSnapshot,
} from "../src/cache.js";

function isolateDisk(): { dir: string; restore: () => void } {
  const dir = mkdtempSync(join(tmpdir(), "omniroute-disk-atomic-"));
  const prev = process.env.OPENCODE_DATA_DIR;
  process.env.OPENCODE_DATA_DIR = dir;
  return {
    dir,
    restore: () => {
      if (prev === undefined) delete process.env.OPENCODE_DATA_DIR;
      else process.env.OPENCODE_DATA_DIR = prev;
    },
  };
}

function makeSnapshot(models: string[] = ["m-a"]): CatalogSnapshot {
  return {
    models: models.map((id) => ({ id })),
    combos: [],
    autoCombos: [],
    providers: [],
    fetchedAt: Date.now(),
  } as unknown as CatalogSnapshot;
}

function makeLogger() {
  const messages: string[] = [];
  return {
    messages,
    logger: { warn: (message: string) => void messages.push(message) },
  };
}

// Entries next to the destination other than the destination itself: any
// leftover temp file after a successful write shows up here.
function strayEntries(file: string): string[] {
  let entries: string[];
  try {
    entries = readdirSync(dirname(file));
  } catch {
    return [];
  }
  return entries.filter((entry) => entry !== file.split("/").pop());
}

// The writer names its temp file `${file}.${pid}.${counter}` with a
// module-monotone counter starting at 0, built after the empty-models and
// size-cap guards (an over-cap call consumes no counter value). Tests in this
// file run sequentially in one process, so the attempt table below predicts
// every temp path exactly:
//   over-cap: no counter use | failed write A: 0, failed write B: 1 |
//   interrupted overwrite A: 2, interrupted overwrite B: 3 | mkdir failure: 4 |
//   truncated read: 5 | success: 6 | permissions: 7 | round-trip: 8, 9.
function predictedTmp(file: string, counter: number): string {
  return `${file}.${process.pid}.${counter}`;
}

describe("disk snapshot atomic write, strict version, traced give-ups", () => {
  it("ignores a newer snapshot version without throwing", async () => {
    const disk = isolateDisk();
    try {
      const file = diskSnapshotPath("t1-future");
      mkdirSync(dirname(file), { recursive: true });
      // A writer from the future persists version 3; this reader must
      // treat it as "no snapshot" instead of trusting unknown data.
      writeFileSync(
        file,
        JSON.stringify({
          v: 3,
          identityFingerprint: "fp-1",
          models: [{ id: "m-future" }],
          combos: [],
          writtenAt: Date.now(),
        })
      );
      const back = await readDiskSnapshot("t1-future", "fp-1");
      assert.equal(back, undefined);
    } finally {
      disk.restore();
      rmSync(disk.dir, { recursive: true, force: true });
    }
  });

  it("traces an over-cap write and leaves no destination behind", async () => {
    const disk = isolateDisk();
    try {
      const { messages, logger } = makeLogger();
      const bigId = `huge-${"x".repeat(33 * 1024 * 1024)}`;
      await writeDiskSnapshot("t2-cap", makeSnapshot([bigId]), "fp-1", logger);
      const file = diskSnapshotPath("t2-cap");
      assert.equal(existsSync(file), false);
      assert.deepEqual(strayEntries(file), []);
      assert.match(messages.join("\n"), /exceeds|too large|size cap/i);
    } finally {
      disk.restore();
      rmSync(disk.dir, { recursive: true, force: true });
    }
  });

  it("a failed write leaves no destination behind and is traced", async () => {
    const disk = isolateDisk();
    const file = diskSnapshotPath("t3a-fail");
    const blocker = predictedTmp(file, 1);
    try {
      const { messages, logger } = makeLogger();
      await writeDiskSnapshot("t3a-fail", makeSnapshot(["m-before"]), "fp-1", logger);
      // Plant a directory at the next temp path: the write fails with
      // EISDIR before any rename, deterministically, on every platform.
      mkdirSync(dirname(file), { recursive: true });
      mkdirSync(blocker, { recursive: true });
      await writeDiskSnapshot("t3a-fail", makeSnapshot(["m-after"]), "fp-1", logger);
      assert.equal(existsSync(file), true);
      const back = await readDiskSnapshot("t3a-fail", "fp-1");
      assert.deepEqual(
        (back?.models ?? []).map((entry) => entry.id),
        ["m-before"]
      );
      assert.match(messages.join("\n"), /failed|EISDIR|error/i);
    } finally {
      rmSync(blocker, { recursive: true, force: true });
      disk.restore();
      rmSync(disk.dir, { recursive: true, force: true });
    }
  });

  it("an interrupted overwrite keeps the previous snapshot", async () => {
    const disk = isolateDisk();
    const file = diskSnapshotPath("t3b-keep");
    const blocker = predictedTmp(file, 3);
    try {
      const { messages, logger } = makeLogger();
      await writeDiskSnapshot("t3b-keep", makeSnapshot(["m-before"]), "fp-1", logger);
      const before = readFileSync(file, "utf8");
      mkdirSync(blocker, { recursive: true });
      await writeDiskSnapshot("t3b-keep", makeSnapshot(["m-after"]), "fp-1", logger);
      assert.equal(readFileSync(file, "utf8"), before);
      const back = await readDiskSnapshot("t3b-keep", "fp-1");
      assert.deepEqual(
        (back?.models ?? []).map((entry) => entry.id),
        ["m-before"]
      );
      assert.match(messages.join("\n"), /failed|EISDIR|error/i);
    } finally {
      rmSync(blocker, { recursive: true, force: true });
      disk.restore();
      rmSync(disk.dir, { recursive: true, force: true });
    }
  });

  it("a mkdir failure is traced and writes nothing", async () => {
    const disk = isolateDisk();
    try {
      const { messages, logger } = makeLogger();
      // A file planted at the plugins path makes mkdir fail
      // deterministically (EEXIST on mkdir, ENOTDIR on direct writeFile).
      writeFileSync(join(disk.dir, "plugins"), "blocker");
      await writeDiskSnapshot("t3b-bis", makeSnapshot(["m-a"]), "fp-1", logger);
      assert.equal(existsSync(diskSnapshotPath("t3b-bis")), false);
      assert.match(messages.join("\n"), /failed|EEXIST|ENOTDIR|error/i);
    } finally {
      disk.restore();
      rmSync(disk.dir, { recursive: true, force: true });
    }
  });

  it("a truncated file reads as no snapshot without throwing", async () => {
    const disk = isolateDisk();
    try {
      const { logger } = makeLogger();
      await writeDiskSnapshot("t4-truncated", makeSnapshot(["m-a"]), "fp-1", logger);
      const file = diskSnapshotPath("t4-truncated");
      const full = readFileSync(file, "utf8");
      writeFileSync(file, full.slice(0, Math.floor(full.length / 2)));
      const back = await readDiskSnapshot("t4-truncated", "fp-1");
      assert.equal(back, undefined);
    } finally {
      disk.restore();
      rmSync(disk.dir, { recursive: true, force: true });
    }
  });

  it("a successful write leaves no entry but the destination", async () => {
    const disk = isolateDisk();
    try {
      await writeDiskSnapshot("t5-clean", makeSnapshot(["m-a"]), "fp-1");
      const file = diskSnapshotPath("t5-clean");
      assert.deepEqual(strayEntries(file), []);
    } finally {
      disk.restore();
      rmSync(disk.dir, { recursive: true, force: true });
    }
  });

  it("the replaced snapshot stays owner-only", async (t) => {
    if (process.platform === "win32") {
      t.skip("file mode semantics are POSIX-only");
      return;
    }
    const disk = isolateDisk();
    try {
      await writeDiskSnapshot("t6-mode", makeSnapshot(["m-a"]), "fp-1");
      const file = diskSnapshotPath("t6-mode");
      assert.equal((statSync(file).mode & 0o077) === 0, true);
    } finally {
      disk.restore();
      rmSync(disk.dir, { recursive: true, force: true });
    }
  });

  it("round-trips a valid snapshot with and without a logger", async () => {
    const disk = isolateDisk();
    try {
      const { logger } = makeLogger();
      const snapshot = makeSnapshot(["m-a"]);
      await writeDiskSnapshot("t7-roundtrip", snapshot, "fp-1");
      const plain = await readDiskSnapshot("t7-roundtrip", "fp-1");
      assert.deepEqual(
        (plain?.models ?? []).map((entry) => entry.id),
        ["m-a"]
      );
      await writeDiskSnapshot("t7-roundtrip", snapshot, "fp-1", logger);
      const logged = await readDiskSnapshot("t7-roundtrip", "fp-1", logger);
      assert.deepEqual(
        (logged?.models ?? []).map((entry) => entry.id),
        ["m-a"]
      );
    } finally {
      disk.restore();
      rmSync(disk.dir, { recursive: true, force: true });
    }
  });
});
