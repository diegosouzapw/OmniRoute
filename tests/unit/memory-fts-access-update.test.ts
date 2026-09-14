import { after, test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

// DATA_DIR must be frozen before the first db import. Run this file alone.

const dataDir = mkdtempSync(join(tmpdir(), "omniroute-memory-fts-au-"));
process.env.DATA_DIR = dataDir;
process.env.APP_LOG_TO_FILE = "false";

const { MemoryType } = await import("../../src/lib/memory/types.ts");
const { createMemory, recordMemoryAccess, getMemory } =
  await import("../../src/lib/memory/store.ts");
const { cleanupMemoryEntries } = await import("../../src/lib/db/cleanup.ts");
const { getDbInstance, resetDbInstance } = await import("../../src/lib/db/core.ts");

function ftsCounts(db: ReturnType<typeof getDbInstance>): {
  data: number;
  docsize: number;
} {
  const data = db.prepare("SELECT count(*) AS n FROM memory_fts_data").get() as { n: number };
  const docsize = db.prepare("SELECT count(*) AS n FROM memory_fts_docsize").get() as {
    n: number;
  };
  return { data: data.n, docsize: docsize.n };
}

after(() => {
  try {
    resetDbInstance();
  } catch {
    /* ignore */
  }
  rmSync(dataDir, { recursive: true, force: true });
});

test("recordMemoryAccess does not grow FTS5 posting lists", async () => {
  const mem = await createMemory({
    apiKeyId: "k-fts-au",
    sessionId: "s1",
    type: MemoryType.FACTUAL,
    key: "stable-key",
    content: "needle-alpha unique phrase",
    metadata: {},
    expiresAt: null,
  });
  const db = getDbInstance();
  const before = ftsCounts(db);

  for (let i = 0; i < 20; i++) {
    recordMemoryAccess([mem.id]);
  }

  const after = ftsCounts(db);
  assert.equal(after.data, before.data, "access_count updates must not append FTS5 segments");
  assert.equal(
    after.docsize,
    before.docsize,
    "access_count updates must not append FTS5 docsize rows"
  );
  const reloaded = await getMemory(mem.id);
  assert.equal(reloaded?.accessCount, 20);
});

test("content edits still reindex FTS5", async () => {
  const mem = await createMemory({
    apiKeyId: "k-fts-au-edit",
    sessionId: "s1",
    type: MemoryType.FACTUAL,
    key: "edit-key",
    content: "needle-before unique phrase",
    metadata: {},
    expiresAt: null,
  });

  await createMemory({
    apiKeyId: "k-fts-au-edit",
    sessionId: "s1",
    type: MemoryType.FACTUAL,
    key: "edit-key",
    content: "needle-after unique phrase",
    metadata: {},
    expiresAt: null,
  });

  const db = getDbInstance();
  const oldHits = db
    .prepare("SELECT count(*) AS n FROM memory_fts WHERE memory_fts MATCH ?")
    .get('"needle-before"') as { n: number };
  const newHits = db
    .prepare("SELECT count(*) AS n FROM memory_fts WHERE memory_fts MATCH ?")
    .get('"needle-after"') as { n: number };
  assert.equal(oldHits.n, 0, "old content must leave the index");
  assert.ok(newHits.n >= 1, "new content must be searchable");
  const reloaded = await getMemory(mem.id);
  assert.equal(reloaded?.content, "needle-after unique phrase");
});

test("new inserts remain searchable after memory_id sync", async () => {
  await createMemory({
    apiKeyId: "k-fts-au-insert",
    sessionId: "s1",
    type: MemoryType.FACTUAL,
    key: "insert-key",
    content: "needle-insert unique phrase",
    metadata: {},
    expiresAt: null,
  });
  const db = getDbInstance();
  const hits = db
    .prepare("SELECT count(*) AS n FROM memory_fts WHERE memory_fts MATCH ?")
    .get('"needle-insert"') as { n: number };
  assert.ok(hits.n >= 1, "fresh inserts must be in FTS5 after memory_id sync");
});

test("cleanupMemoryEntries issues FTS5 rebuild even when no rows expire", async () => {
  await createMemory({
    apiKeyId: "k-fts-rebuild",
    sessionId: "s1",
    type: MemoryType.FACTUAL,
    key: "rebuild-key",
    content: "needle-rebuild unique phrase",
    metadata: {},
    expiresAt: null,
  });
  const db = getDbInstance();
  const calls: string[] = [];
  const orig = db.exec.bind(db);
  db.exec = ((sql: string) => {
    calls.push(sql);
    return orig(sql);
  }) as typeof db.exec;

  const result = await cleanupMemoryEntries();
  assert.equal(result.deleted, 0, "fresh memories must survive default retention");
  assert.equal(result.errors, 0);
  assert.ok(
    calls.some((sql) => sql.includes("VALUES('rebuild')")),
    `cleanup must rebuild FTS5, got ${JSON.stringify(calls)}`
  );
  assert.equal(
    calls.some((sql) => sql.includes("VALUES('optimize')")),
    false,
    "optimize must not substitute for rebuild"
  );
  const hits = db
    .prepare("SELECT count(*) AS n FROM memory_fts WHERE memory_fts MATCH ?")
    .get('"needle-rebuild"') as { n: number };
  assert.ok(hits.n >= 1, "content must stay searchable after rebuild");
});
