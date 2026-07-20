import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { LocalCorpusIndex, canonicalizeLocalCorpusRoot } from "../../src/lib/localCorpus/index.ts";

async function withCorpus(
  run: (root: string, index: LocalCorpusIndex) => Promise<void>
): Promise<void> {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), "omniroute-local-corpus-"));
  const index = new LocalCorpusIndex(root, {
    maxFiles: 20,
    maxFileBytes: 2_048,
    maxTotalBytes: 8_192,
    maxReadLines: 3,
    chunkChars: 80,
    staleMs: 60_000,
  });
  try {
    await run(root, index);
  } finally {
    await fs.rm(root, { recursive: true, force: true });
  }
}

test("local corpus indexes permitted text and returns relative snippets", async () => {
  await withCorpus(async (root, index) => {
    await fs.mkdir(path.join(root, "notes"));
    await fs.writeFile(
      path.join(root, "notes", "water.md"),
      "# Water\nRed River monitoring station\nPublic hydrology record\n",
      "utf8"
    );
    await fs.writeFile(path.join(root, "image.png"), "not indexed", "utf8");

    const refreshed = await index.refresh();
    assert.equal(refreshed.indexedFiles, 1);
    assert.equal(refreshed.changedFiles, 1);

    const result = await index.search("Red River");
    assert.equal(result.results.length, 1);
    assert.equal(result.results[0].relativePath, "notes/water.md");
    assert.match(result.results[0].snippet, /Red River monitoring station/);
    assert.equal(path.isAbsolute(result.results[0].relativePath), false);
  });
});

test("local corpus refresh reuses unchanged files and removes deleted files", async () => {
  await withCorpus(async (root, index) => {
    const firstPath = path.join(root, "first.txt");
    const secondPath = path.join(root, "second.txt");
    await fs.writeFile(firstPath, "alpha record", "utf8");
    await fs.writeFile(secondPath, "beta record", "utf8");

    const first = await index.refresh();
    assert.equal(first.changedFiles, 2);

    const second = await index.refresh();
    assert.equal(second.changedFiles, 0);
    assert.equal(second.unchangedFiles, 2);

    await fs.rm(secondPath);
    const third = await index.refresh();
    assert.equal(third.deletedFiles, 1);
    assert.equal(third.indexedFiles, 1);
  });
});

test("local corpus read enforces containment, type, and line limits", async () => {
  await withCorpus(async (root, index) => {
    await fs.writeFile(path.join(root, "lines.txt"), "one\ntwo\nthree\nfour\nfive", "utf8");
    await fs.writeFile(path.join(root, "blocked.bin"), "binary", "utf8");

    const result = await index.read("lines.txt", { startLine: 2, endLine: 5 });
    assert.equal(result.content, "two\nthree\nfour");
    assert.equal(result.startLine, 2);
    assert.equal(result.endLine, 4);
    assert.equal(result.truncated, true);

    await assert.rejects(index.read("../outside.txt"), /escapes|permitted relative path/);
    await assert.rejects(index.read(path.resolve(root, "lines.txt")), /permitted relative path/);
    await assert.rejects(index.read("blocked.bin"), /file type is not permitted/);
  });
});

test("local corpus skips denied directories and oversized files", async () => {
  await withCorpus(async (root, index) => {
    await fs.mkdir(path.join(root, ".git"));
    await fs.writeFile(path.join(root, ".git", "config.txt"), "secret marker", "utf8");
    await fs.writeFile(path.join(root, "large.txt"), "x".repeat(3_000), "utf8");
    await fs.writeFile(path.join(root, "public.txt"), "public marker", "utf8");

    const refreshed = await index.refresh();
    assert.equal(refreshed.indexedFiles, 1);
    assert.ok(refreshed.skippedFiles >= 2);
    assert.equal((await index.search("secret marker")).results.length, 0);
    assert.equal((await index.search("public marker")).results.length, 1);
  });
});

test("canonicalizeLocalCorpusRoot requires an absolute directory", async () => {
  await assert.rejects(canonicalizeLocalCorpusRoot("relative/path"), /absolute directory path/);
});
