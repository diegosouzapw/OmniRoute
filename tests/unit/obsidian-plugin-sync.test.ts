import "../../open-sse/utils/setupPolyfill.ts";
import test, { describe, beforeEach, mock } from "node:test";
import assert from "node:assert/strict";

// ── Pure logic extracted from server for unit testing ──────────────────────

interface ManifestEntry {
  path: string;
  mtime: number;
  size: number;
}

interface TombstoneEntry {
  path: string;
  deletedAt: number;
  deletedBy: string;
}

interface SyncPullResult {
  filesToPull: ManifestEntry[];
  folders: string[];
  tombstones: TombstoneEntry[];
}

interface SyncPushResult {
  conflict: boolean;
}

const MAX_TOMBSTONES = 1000;

function buildPullResult(
  serverFiles: ManifestEntry[],
  serverFolders: string[],
  serverTombstones: TombstoneEntry[],
  localMap: Map<string, ManifestEntry>,
  since: number
): SyncPullResult {
  const filesToPull: ManifestEntry[] = [];
  for (const file of serverFiles) {
    const local = localMap.get(file.path);
    if (!local || file.mtime > local.mtime || file.size !== local.size) {
      filesToPull.push(file);
    }
  }
  const folders = serverFolders.filter((f) => !localMap.has(f));
  const tombstones = serverTombstones.filter((t) => t.deletedAt > since);
  return { filesToPull, folders, tombstones };
}

function checkConflict(serverMtime: number, pushMtime: number): SyncPushResult {
  return { conflict: serverMtime >= pushMtime };
}

function addTombstone(
  tombstones: TombstoneEntry[],
  path: string,
  deviceId = "desktop"
): TombstoneEntry[] {
  const next = [...tombstones, { path, deletedAt: Date.now(), deletedBy: deviceId }];
  return next.length > MAX_TOMBSTONES ? next.slice(-MAX_TOMBSTONES) : next;
}

function filterTombstones(tombstones: TombstoneEntry[], since: number): TombstoneEntry[] {
  return tombstones.filter((t) => t.deletedAt > since);
}

interface DiscoveryCandidateInput {
  host: string;
  port: number;
}

function buildDiscoveryCandidates(input: DiscoveryCandidateInput): string[] {
  const { host, port } = input;
  const candidates: string[] = [];
  const trimmed = host.trim();
  if (!trimmed) return candidates;

  if (trimmed.includes("://")) {
    candidates.push(trimmed);
  } else if (trimmed.includes(".") && !trimmed.startsWith("100.")) {
    candidates.push(`http://${trimmed}:${port}`);
    candidates.push(`http://${trimmed}.ts.net:${port}`);
  } else {
    candidates.push(`http://${trimmed}:${port}`);
  }
  return candidates;
}

function findConflictFiles(allFilePaths: string[], basePath: string): string[] {
  const pattern = `${basePath}.conflict-`;
  return allFilePaths.filter((p) => p.startsWith(pattern));
}

function resolveLocal(
  conflictFileContent: string,
  existingContent: string | null
): { content: string; action: string } {
  return { content: conflictFileContent, action: "kept-local" };
}

function resolveRemote(): { action: string } {
  return { action: "kept-remote" };
}

function resolveKeepBoth(conflictPaths: string[]): { action: string; conflictPaths: string[] } {
  return { action: "kept-both", conflictPaths };
}

// ── Tests ──────────────────────────────────────────────────────────────────

describe("Sync Pull — Manifest Diff", () => {
  test("returns all files when local manifest is empty", () => {
    const serverFiles: ManifestEntry[] = [
      { path: "a.md", mtime: 1000, size: 100 },
      { path: "b.md", mtime: 2000, size: 200 },
    ];
    const result = buildPullResult(serverFiles, [], [], new Map(), 0);
    assert.equal(result.filesToPull.length, 2);
  });

  test("skips files where both mtime and size match", () => {
    const serverFiles: ManifestEntry[] = [
      { path: "a.md", mtime: 1000, size: 100 },
    ];
    const localMap = new Map([["a.md", { path: "a.md", mtime: 1000, size: 100 }]]);
    const result = buildPullResult(serverFiles, [], [], localMap, 0);
    assert.equal(result.filesToPull.length, 0);
  });

  test("returns file when mtime differs even if size matches", () => {
    const serverFiles: ManifestEntry[] = [
      { path: "a.md", mtime: 2000, size: 100 },
    ];
    const localMap = new Map([["a.md", { path: "a.md", mtime: 1000, size: 100 }]]);
    const result = buildPullResult(serverFiles, [], [], localMap, 0);
    assert.equal(result.filesToPull.length, 1);
    assert.equal(result.filesToPull[0].path, "a.md");
  });

  test("returns file when size differs even if mtime matches", () => {
    const serverFiles: ManifestEntry[] = [
      { path: "a.md", mtime: 1000, size: 200 },
    ];
    const localMap = new Map([["a.md", { path: "a.md", mtime: 1000, size: 100 }]]);
    const result = buildPullResult(serverFiles, [], [], localMap, 0);
    assert.equal(result.filesToPull.length, 1);
  });

  test("returns file when local has no entry for it", () => {
    const serverFiles: ManifestEntry[] = [
      { path: "new.md", mtime: 1000, size: 50 },
    ];
    const localMap = new Map([["other.md", { path: "other.md", mtime: 1000, size: 100 }]]);
    const result = buildPullResult(serverFiles, [], [], localMap, 0);
    assert.equal(result.filesToPull.length, 1);
    assert.equal(result.filesToPull[0].path, "new.md");
  });

  test("returns only folders not tracked in local manifest", () => {
    const localMap = new Map([["existing-folder/note.md", { path: "existing-folder/note.md", mtime: 1000, size: 100 }], ["existing-folder", { path: "existing-folder", mtime: 0, size: 0 }]]);
    const result = buildPullResult([], ["existing-folder", "new-folder"], [], localMap, 0);
    assert.deepEqual(result.folders, ["new-folder"]);
  });

  test("returns all folders when local manifest has none", () => {
    const result = buildPullResult([], ["folder-a", "folder-b"], [], new Map(), 0);
    assert.deepEqual(result.folders, ["folder-a", "folder-b"]);
  });

  test("filters tombstones by since timestamp", () => {
    const tombstones: TombstoneEntry[] = [
      { path: "old.md", deletedAt: 1000, deletedBy: "desktop" },
      { path: "new.md", deletedAt: 2000, deletedBy: "mobile" },
    ];
    const result = buildPullResult([], [], tombstones, new Map(), 1500);
    assert.equal(result.tombstones.length, 1);
    assert.equal(result.tombstones[0].path, "new.md");
  });

  test("returns empty when all tombstones are older than since", () => {
    const tombstones: TombstoneEntry[] = [
      { path: "a.md", deletedAt: 100, deletedBy: "desktop" },
    ];
    const result = buildPullResult([], [], tombstones, new Map(), 9999);
    assert.equal(result.tombstones.length, 0);
  });

  test("empty server and empty local returns nothing", () => {
    const result = buildPullResult([], [], [], new Map(), 0);
    assert.equal(result.filesToPull.length, 0);
    assert.equal(result.folders.length, 0);
    assert.equal(result.tombstones.length, 0);
  });
});

describe("Sync Push — Conflict Detection", () => {
  test("conflict when server mtime equals push mtime (same-second edit)", () => {
    const result = checkConflict(1000, 1000);
    assert.equal(result.conflict, true);
  });

  test("no conflict when push is newer than server", () => {
    const result = checkConflict(1000, 2000);
    assert.equal(result.conflict, false);
  });

  test("conflict when server is newer than push", () => {
    const result = checkConflict(2000, 1000);
    assert.equal(result.conflict, true);
  });

  test("no conflict when server file does not exist (mtime 0)", () => {
    const result = checkConflict(0, 1000);
    assert.equal(result.conflict, false);
  });

  test("conflict with 1ms difference", () => {
    const result = checkConflict(1001, 1000);
    assert.equal(result.conflict, true);
  });

  test("no conflict with 1ms newer push", () => {
    const result = checkConflict(1000, 1001);
    assert.equal(result.conflict, false);
  });
});

describe("Tombstone Log", () => {
  test("appends tombstone", () => {
    const result = addTombstone([], "deleted.md", "mobile");
    assert.equal(result.length, 1);
    assert.equal(result[0].path, "deleted.md");
    assert.equal(result[0].deletedBy, "mobile");
  });

  test("defaults deviceId to desktop", () => {
    const result = addTombstone([], "file.md");
    assert.equal(result[0].deletedBy, "desktop");
  });

  test("caps at MAX_TOMBSTONES (1000) — drops oldest", () => {
    let tombstones: TombstoneEntry[] = [];
    for (let i = 0; i < 1001; i++) {
      tombstones = addTombstone(tombstones, `file-${i}.md`);
    }
    assert.equal(tombstones.length, 1000);
    assert.equal(tombstones[0].path, "file-1.md");
    assert.equal(tombstones[999].path, "file-1000.md");
  });

  test("preserves exactly 1000 when at cap", () => {
    let tombstones: TombstoneEntry[] = [];
    for (let i = 0; i < 1000; i++) {
      tombstones = addTombstone(tombstones, `file-${i}.md`);
    }
    assert.equal(tombstones.length, 1000);
    tombstones = addTombstone(tombstones, "overflow.md");
    assert.equal(tombstones.length, 1000);
    assert.equal(tombstones[999].path, "overflow.md");
  });

  test("filterTombstones returns only entries after since", () => {
    const tombstones: TombstoneEntry[] = [
      { path: "a.md", deletedAt: 100, deletedBy: "d" },
      { path: "b.md", deletedAt: 200, deletedBy: "d" },
      { path: "c.md", deletedAt: 300, deletedBy: "d" },
    ];
    const filtered = filterTombstones(tombstones, 150);
    assert.equal(filtered.length, 2);
    assert.deepEqual(filtered.map((t) => t.path), ["b.md", "c.md"]);
  });

  test("filterTombstones returns empty when since is after all", () => {
    const tombstones: TombstoneEntry[] = [
      { path: "a.md", deletedAt: 100, deletedBy: "d" },
    ];
    const filtered = filterTombstones(tombstones, 999999);
    assert.equal(filtered.length, 0);
  });

  test("filterTombstones returns all when since is 0", () => {
    const tombstones: TombstoneEntry[] = [
      { path: "a.md", deletedAt: 100, deletedBy: "d" },
      { path: "b.md", deletedAt: 200, deletedBy: "d" },
    ];
    const filtered = filterTombstones(tombstones, 0);
    assert.equal(filtered.length, 2);
  });
});

describe("Discovery Candidates", () => {
  test("returns empty for empty host", () => {
    const result = buildDiscoveryCandidates({ host: "", port: 27781 });
    assert.deepEqual(result, []);
  });

  test("returns empty for whitespace-only host", () => {
    const result = buildDiscoveryCandidates({ host: "   ", port: 27781 });
    assert.deepEqual(result, []);
  });

  test("passes through full URL as-is", () => {
    const result = buildDiscoveryCandidates({ host: "http://my-mac:27781", port: 27781 });
    assert.deepEqual(result, ["http://my-mac:27781"]);
  });

  test("passes through https URL as-is", () => {
    const result = buildDiscoveryCandidates({ host: "https://desktop.local", port: 27781 });
    assert.deepEqual(result, ["https://desktop.local"]);
  });

  test("generates MagicDNS candidate for dotted name", () => {
    const result = buildDiscoveryCandidates({ host: "my-macbook.local", port: 27781 });
    assert.ok(result.includes("http://my-macbook.local:27781"));
    assert.ok(result.includes("http://my-macbook.local.ts.net:27781"));
    assert.equal(result.length, 2);
  });

  test("single bare name gets only direct URL (no .ts.net)", () => {
    const result = buildDiscoveryCandidates({ host: "my-macbook", port: 27781 });
    assert.deepEqual(result, ["http://my-macbook:27781"]);
    assert.equal(result.length, 1);
  });

  test("does NOT add .ts.net for 100.x.y.z addresses", () => {
    const result = buildDiscoveryCandidates({ host: "100.64.0.42", port: 27781 });
    assert.deepEqual(result, ["http://100.64.0.42:27781"]);
    assert.equal(result.length, 1);
  });

  test("handles host with leading/trailing whitespace", () => {
    const result = buildDiscoveryCandidates({ host: "  my-mac  ", port: 27781 });
    assert.ok(result.includes("http://my-mac:27781"));
  });

  test("handles .local domain (dotted, not 100.x)", () => {
    const result = buildDiscoveryCandidates({ host: "desktop.local", port: 27781 });
    assert.ok(result.includes("http://desktop.local:27781"));
    assert.ok(result.includes("http://desktop.local.ts.net:27781"));
  });
});

describe("Conflict File Detection", () => {
  test("finds conflict files for a given path", () => {
    const allFiles = [
      "notes/daily.md",
      "notes/daily.md.conflict-1717000000000.md",
      "notes/daily.md.conflict-1717000001000.md",
      "other.md",
    ];
    const conflicts = findConflictFiles(allFiles, "notes/daily.md");
    assert.equal(conflicts.length, 2);
    assert.ok(conflicts.every((c) => c.includes(".conflict-")));
  });

  test("returns empty when no conflicts exist", () => {
    const allFiles = ["a.md", "b.md"];
    const conflicts = findConflictFiles(allFiles, "a.md");
    assert.equal(conflicts.length, 0);
  });

  test("does not match partial path names", () => {
    const allFiles = [
      "daily.md",
      "daily.md.conflict-1717000000000.md",
      "daily.md.backup",
    ];
    const conflicts = findConflictFiles(allFiles, "daily.md");
    assert.equal(conflicts.length, 1);
    assert.equal(conflicts[0], "daily.md.conflict-1717000000000.md");
  });

  test("handles path with .conflict- in directory name (edge case)", () => {
    const allFiles = [
      "my.conflict-folder/note.md",
      "my.conflict-folder/note.md.conflict-1717000000000.md",
    ];
    const conflicts = findConflictFiles(allFiles, "my.conflict-folder/note.md");
    assert.equal(conflicts.length, 1);
    assert.equal(conflicts[0], "my.conflict-folder/note.md.conflict-1717000000000.md");
  });

  test("does not match non-.conflict- files with similar prefix", () => {
    const allFiles = [
      "note.md",
      "note.md.conflict-1000.md",
      "note.md.conflicting.md",
    ];
    const conflicts = findConflictFiles(allFiles, "note.md");
    assert.equal(conflicts.length, 1);
    assert.equal(conflicts[0], "note.md.conflict-1000.md");
  });
});

describe("Conflict Resolution", () => {
  test("resolveLocal returns conflict file content", () => {
    const result = resolveLocal("conflict content", "server content");
    assert.equal(result.content, "conflict content");
    assert.equal(result.action, "kept-local");
  });

  test("resolveLocal works even when existing is null (file deleted on server)", () => {
    const result = resolveLocal("local save", null);
    assert.equal(result.content, "local save");
    assert.equal(result.action, "kept-local");
  });

  test("resolveRemote returns kept-remote action", () => {
    const result = resolveRemote();
    assert.equal(result.action, "kept-remote");
  });

  test("resolveKeepBoth returns all conflict paths", () => {
    const paths = ["a.md.conflict-1000.md", "a.md.conflict-2000.md"];
    const result = resolveKeepBoth(paths);
    assert.equal(result.action, "kept-both");
    assert.deepEqual(result.conflictPaths, paths);
  });

  test("resolveKeepBoth with empty array", () => {
    const result = resolveKeepBoth([]);
    assert.equal(result.action, "kept-both");
    assert.deepEqual(result.conflictPaths, []);
  });
});

describe("End-to-End Sync Scenarios", () => {
  test("full pull: server has files local lacks", () => {
    const serverFiles: ManifestEntry[] = [
      { path: "a.md", mtime: 2000, size: 100 },
      { path: "b.md", mtime: 1000, size: 200 },
    ];
    const localMap = new Map<string, ManifestEntry>([
      ["a.md", { path: "a.md", mtime: 1000, size: 100 }],
    ]);

    const pullResult = buildPullResult(serverFiles, [], [], localMap, 0);
    assert.equal(pullResult.filesToPull.length, 2);
    const paths = pullResult.filesToPull.map((f) => f.path).sort();
    assert.deepEqual(paths, ["a.md", "b.md"]);
  });

  test("push to server with newer version creates conflict", () => {
    const serverMtime = 3000;
    const pushMtime = 2000;
    const result = checkConflict(serverMtime, pushMtime);
    assert.equal(result.conflict, true);
  });

  test("push with newer mtime does not conflict", () => {
    const result = checkConflict(1000, 2000);
    assert.equal(result.conflict, false);
  });

  test("tombstone propagation: delete on desktop, pull on mobile", () => {
    const tombstones: TombstoneEntry[] = [
      { path: "deleted.md", deletedAt: 5000, deletedBy: "desktop" },
    ];
    const localMap = new Map([["deleted.md", { path: "deleted.md", mtime: 1000, size: 100 }]]);

    const pullResult = buildPullResult([], [], tombstones, localMap, 0);
    assert.equal(pullResult.tombstones.length, 1);
    assert.equal(pullResult.tombstones[0].path, "deleted.md");
  });

  test("rename produces tombstone for old path", () => {
    const tombstones: TombstoneEntry[] = [];
    const afterRename = addTombstone(tombstones, "old-name.md", "desktop");
    assert.equal(afterRename.length, 1);
    assert.equal(afterRename[0].path, "old-name.md");
  });

  test("large manifest: 5000 files, only 3 changed", () => {
    const serverFiles: ManifestEntry[] = [];
    const localMap = new Map<string, ManifestEntry>();

    for (let i = 0; i < 5000; i++) {
      const entry = { path: `file-${i}.md`, mtime: 1000, size: 100 };
      serverFiles.push(entry);
      if (i !== 42 && i !== 99 && i !== 4999) {
        localMap.set(entry.path, { ...entry });
      }
    }

    const result = buildPullResult(serverFiles, [], [], localMap, 0);
    assert.equal(result.filesToPull.length, 3);
    const paths = result.filesToPull.map((f) => f.path).sort();
    assert.deepEqual(paths, ["file-42.md", "file-4999.md", "file-99.md"]);
  });

  test("identical manifests produce zero diff", () => {
    const serverFiles: ManifestEntry[] = [];
    const localMap = new Map<string, ManifestEntry>();

    for (let i = 0; i < 100; i++) {
      const entry = { path: `file-${i}.md`, mtime: 5000, size: 50 };
      serverFiles.push(entry);
      localMap.set(entry.path, { ...entry });
    }

    const result = buildPullResult(serverFiles, [], [], localMap, 0);
    assert.equal(result.filesToPull.length, 0);
  });
});
