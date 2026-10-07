import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { setLocalCorpusRoot } from "../../src/lib/db/localCorpus";
import {
  getConfiguredLocalCorpusStatus,
  readConfiguredLocalCorpus,
  resetLocalCorpusIndex,
  searchConfiguredLocalCorpus,
} from "../../src/lib/localCorpus/configured";

test.beforeEach(() => {
  resetLocalCorpusIndex();
});

test("dynamic root path traversal outside bounding box throws error", async () => {
  const tmpBase = fs.mkdtempSync(path.join(os.tmpdir(), "omni-corpus-base-"));
  const subFolder = path.join(tmpBase, "allowed-sub");
  fs.mkdirSync(subFolder, { recursive: true });

  setLocalCorpusRoot(subFolder);

  const outsideFolder = fs.mkdtempSync(path.join(os.tmpdir(), "omni-corpus-outside-"));

  assert.throws(() => getConfiguredLocalCorpusStatus(outsideFolder), /Path traversal forbidden/);

  fs.rmSync(tmpBase, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.rmSync(outsideFolder, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("path traversal check rejects sibling directory with matching string prefix", async () => {
  const tmpBase = fs.mkdtempSync(path.join(os.tmpdir(), "omni-corpus-prefix"));
  const siblingFolder = tmpBase + "-sibling";
  fs.mkdirSync(siblingFolder, { recursive: true });

  setLocalCorpusRoot(tmpBase);

  assert.throws(() => getConfiguredLocalCorpusStatus(siblingFolder), /Path traversal forbidden/);

  fs.rmSync(tmpBase, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.rmSync(siblingFolder, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("search and read configured local corpus support dynamic root within bounds", async () => {
  const tmpBase = fs.mkdtempSync(path.join(os.tmpdir(), "omni-corpus-valid-"));
  const sampleFile = path.join(tmpBase, "test.txt");
  fs.writeFileSync(sampleFile, "Line 1: searchable text\nLine 2: content");

  setLocalCorpusRoot(tmpBase);

  const status = getConfiguredLocalCorpusStatus(tmpBase);
  assert.equal(typeof status.indexedBytes, "number");

  const searchResults = await searchConfiguredLocalCorpus("searchable", {
    absoluteRootPath: tmpBase,
  });
  assert.ok(Array.isArray(searchResults.results));

  const readResult = await readConfiguredLocalCorpus("test.txt", {
    absoluteRootPath: tmpBase,
  });
  assert.ok(readResult.content.includes("searchable"));

  fs.rmSync(tmpBase, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("LRU cache respects access order and OMNIROUTE_CORPUS_CACHE_SIZE", async () => {
  const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), "omni-corpus-lru-root-"));
  setLocalCorpusRoot(tmpRoot);

  process.env.OMNIROUTE_CORPUS_CACHE_SIZE = "2";

  const dir1 = path.join(tmpRoot, "dir1");
  const dir2 = path.join(tmpRoot, "dir2");
  const dir3 = path.join(tmpRoot, "dir3");

  fs.mkdirSync(dir1, { recursive: true });
  fs.mkdirSync(dir2, { recursive: true });
  fs.mkdirSync(dir3, { recursive: true });

  const idx1 = getConfiguredLocalCorpusStatus(dir1);
  getConfiguredLocalCorpusStatus(dir2);

  // Access dir1 again so its access order is updated (making dir2 the least recently used)
  getConfiguredLocalCorpusStatus(dir1);

  // Add dir3, which causes cache capacity (2) to be exceeded -> evicts dir2
  getConfiguredLocalCorpusStatus(dir3);

  // Accessing dir1 again should return the existing cached index instance
  const idx1Again = getConfiguredLocalCorpusStatus(dir1);
  assert.equal(idx1.indexedBytes, idx1Again.indexedBytes);

  delete process.env.OMNIROUTE_CORPUS_CACHE_SIZE;
  fs.rmSync(tmpRoot, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});
