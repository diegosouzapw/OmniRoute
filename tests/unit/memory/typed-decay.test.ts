import { describe, it, before, after, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { tmpdir } from "node:os";
import { mkdtempSync, rmSync } from "node:fs";
import { join } from "node:path";

// TV6 — typed memory decay. Pure predicates are tested directly; the sweep + access
// tracking run against an isolated on-disk SQLite DB (DATA_DIR is frozen at first import,
// so this file MUST run alone — never share a process with another DB-touching suite).

let dataDir: string;
before(() => {
  dataDir = mkdtempSync(join(tmpdir(), "omniroute-typed-decay-"));
  process.env.DATA_DIR = dataDir;
});

const {
  MemoryType,
} = await import("../../../src/lib/memory/types.ts");
const {
  resolveTypedDecayConfig,
  isTypeImmune,
  isAccessImmune,
  computeDecayDeadline,
  isMemoryDecayed,
  sweepDecayedMemories,
  DEFAULT_TTL_DAYS_BY_TYPE,
  DEFAULT_ACCESS_IMMUNITY_THRESHOLD,
} = await import("../../../src/lib/memory/typedDecay.ts");
const { createMemory, getMemory, recordMemoryAccess, listMemoriesForDecay } = await import(
  "../../../src/lib/memory/store.ts"
);
const { resetDbInstance, getDbInstance } = await import("../../../src/lib/db/core.ts");

const DAY_MS = 24 * 60 * 60 * 1000;

function candidate(over: Record<string, unknown> = {}) {
  return {
    id: "m1",
    type: MemoryType.EPISODIC,
    accessCount: 0,
    createdAt: new Date("2026-01-01T00:00:00Z"),
    lastAccessedAt: null,
    ...over,
  } as Parameters<typeof isMemoryDecayed>[0];
}

after(() => {
  try {
    resetDbInstance();
  } catch {
    /* ignore */
  }
  if (dataDir) rmSync(dataDir, { recursive: true, force: true });
});

describe("typedDecay — pure predicates", () => {
  const config = resolveTypedDecayConfig({
    MEMORY_TYPED_DECAY_ENABLED: "true",
  } as NodeJS.ProcessEnv);

  it("only episodic decays by default; durable types are immune", () => {
    assert.equal(isTypeImmune(MemoryType.EPISODIC, config), false);
    assert.equal(isTypeImmune(MemoryType.FACTUAL, config), true);
    assert.equal(isTypeImmune(MemoryType.PROCEDURAL, config), true);
    assert.equal(isTypeImmune(MemoryType.SEMANTIC, config), true);
  });

  it("access count >= threshold grants immunity", () => {
    assert.equal(isAccessImmune(2, config), false);
    assert.equal(isAccessImmune(DEFAULT_ACCESS_IMMUNITY_THRESHOLD, config), true);
    assert.equal(isAccessImmune(99, config), true);
  });

  it("a fresh episodic memory is not decayed before its TTL", () => {
    const created = new Date("2026-01-01T00:00:00Z");
    const now = new Date(created.getTime() + 10 * DAY_MS); // 10d < 30d default
    assert.equal(isMemoryDecayed(candidate({ createdAt: created }), config, now), false);
  });

  it("an old episodic memory is decayed past its TTL", () => {
    const created = new Date("2026-01-01T00:00:00Z");
    const now = new Date(created.getTime() + 31 * DAY_MS); // 31d > 30d default
    assert.equal(isMemoryDecayed(candidate({ createdAt: created }), config, now), true);
  });

  it("recent access re-bases the decay clock (survives despite an old createdAt)", () => {
    const created = new Date("2026-01-01T00:00:00Z");
    const accessed = new Date(created.getTime() + 100 * DAY_MS);
    const now = new Date(accessed.getTime() + 5 * DAY_MS); // 5d since last access < 30d
    const c = candidate({ createdAt: created, lastAccessedAt: accessed });
    assert.equal(isMemoryDecayed(c, config, now), false);
  });

  it("an immune type never decays regardless of age", () => {
    const created = new Date("2020-01-01T00:00:00Z");
    const now = new Date("2030-01-01T00:00:00Z");
    const c = candidate({ type: MemoryType.FACTUAL, createdAt: created });
    assert.equal(computeDecayDeadline(c, config), null);
    assert.equal(isMemoryDecayed(c, config, now), false);
  });

  it("access immunity beats an expired TTL", () => {
    const created = new Date("2026-01-01T00:00:00Z");
    const now = new Date(created.getTime() + 365 * DAY_MS);
    const c = candidate({ createdAt: created, accessCount: DEFAULT_ACCESS_IMMUNITY_THRESHOLD });
    assert.equal(isMemoryDecayed(c, config, now), false);
  });
});

describe("typedDecay — env config", () => {
  it("defaults to disabled (opt-in) with no env", () => {
    const cfg = resolveTypedDecayConfig({} as NodeJS.ProcessEnv);
    assert.equal(cfg.enabled, false);
    assert.equal(cfg.accessImmunityThreshold, DEFAULT_ACCESS_IMMUNITY_THRESHOLD);
    assert.equal(cfg.ttlDaysByType[MemoryType.EPISODIC], DEFAULT_TTL_DAYS_BY_TYPE[MemoryType.EPISODIC]);
  });

  it("MEMORY_TYPED_DECAY_EPISODIC_DAYS=0 makes episodic immune too", () => {
    const cfg = resolveTypedDecayConfig({
      MEMORY_TYPED_DECAY_ENABLED: "true",
      MEMORY_TYPED_DECAY_EPISODIC_DAYS: "0",
    } as NodeJS.ProcessEnv);
    assert.equal(cfg.ttlDaysByType[MemoryType.EPISODIC], null);
    assert.equal(isTypeImmune(MemoryType.EPISODIC, cfg), true);
  });

  it("honors a custom episodic TTL and access threshold", () => {
    const cfg = resolveTypedDecayConfig({
      MEMORY_TYPED_DECAY_ENABLED: "true",
      MEMORY_TYPED_DECAY_EPISODIC_DAYS: "7",
      MEMORY_TYPED_DECAY_ACCESS_IMMUNITY: "10",
    } as NodeJS.ProcessEnv);
    assert.equal(cfg.ttlDaysByType[MemoryType.EPISODIC], 7);
    assert.equal(cfg.accessImmunityThreshold, 10);
  });
});

describe("typedDecay — access tracking + sweep (DB)", () => {
  beforeEach(() => {
    // Each test starts from a clean memories table. resetDbInstance() only resets the
    // singleton — the on-disk file persists across tests — so we must actively clear rows.
    resetDbInstance();
    getDbInstance().prepare("DELETE FROM memories").run();
  });

  it("recordMemoryAccess increments access_count and stamps last_accessed_at", async () => {
    const mem = await createMemory({
      apiKeyId: "k1",
      sessionId: "s1",
      type: MemoryType.EPISODIC,
      key: "fact",
      content: "hello world",
      metadata: {},
      expiresAt: null,
    });
    recordMemoryAccess([mem.id]);
    recordMemoryAccess([mem.id]);
    const reloaded = await getMemory(mem.id);
    assert.equal(reloaded?.accessCount, 2);
    assert.ok(reloaded?.lastAccessedAt instanceof Date);
  });

  it("sweep is a no-op when disabled (default), even with decayed rows", async () => {
    const old = new Date(Date.now() - 60 * DAY_MS).toISOString();
    const mem = await createMemory({
      apiKeyId: "k1",
      sessionId: "s1",
      type: MemoryType.EPISODIC,
      key: "old",
      content: "stale episodic",
      metadata: {},
      expiresAt: null,
    });
    // Back-date the row so it would decay under the default 30d TTL.
    const { getDbInstance } = await import("../../../src/lib/db/core.ts");
    getDbInstance().prepare("UPDATE memories SET created_at = ? WHERE id = ?").run(old, mem.id);

    const disabled = resolveTypedDecayConfig({} as NodeJS.ProcessEnv); // enabled=false
    const res = await sweepDecayedMemories({ config: disabled });
    assert.equal(res.skippedDisabled, true);
    assert.equal(res.deletedIds.length, 0);
    assert.ok(await getMemory(mem.id), "row must survive a disabled sweep");
  });

  it("a dry run classifies decayed rows without deleting", async () => {
    const old = new Date(Date.now() - 60 * DAY_MS).toISOString();
    const mem = await createMemory({
      apiKeyId: "k1",
      sessionId: "s1",
      type: MemoryType.EPISODIC,
      key: "old2",
      content: "stale",
      metadata: {},
      expiresAt: null,
    });
    const { getDbInstance } = await import("../../../src/lib/db/core.ts");
    getDbInstance().prepare("UPDATE memories SET created_at = ? WHERE id = ?").run(old, mem.id);

    const enabled = resolveTypedDecayConfig({
      MEMORY_TYPED_DECAY_ENABLED: "true",
    } as NodeJS.ProcessEnv);
    const res = await sweepDecayedMemories({ config: enabled, dryRun: true });
    assert.equal(res.decayed, 1);
    assert.equal(res.deletedIds.length, 0);
    assert.ok(await getMemory(mem.id), "dry run must not delete");
  });

  it("enabled sweep deletes decayed non-immune rows and keeps immune ones", async () => {
    const old = new Date(Date.now() - 60 * DAY_MS).toISOString();
    const decaying = await createMemory({
      apiKeyId: "k1",
      sessionId: "s1",
      type: MemoryType.EPISODIC,
      key: "decay",
      content: "stale episodic",
      metadata: {},
      expiresAt: null,
    });
    const durable = await createMemory({
      apiKeyId: "k1",
      sessionId: "s1",
      type: MemoryType.FACTUAL,
      key: "durable",
      content: "a durable fact",
      metadata: {},
      expiresAt: null,
    });
    const { getDbInstance } = await import("../../../src/lib/db/core.ts");
    const db = getDbInstance();
    db.prepare("UPDATE memories SET created_at = ? WHERE id IN (?, ?)").run(
      old,
      decaying.id,
      durable.id
    );

    const enabled = resolveTypedDecayConfig({
      MEMORY_TYPED_DECAY_ENABLED: "true",
    } as NodeJS.ProcessEnv);
    const res = await sweepDecayedMemories({ config: enabled });
    assert.equal(res.deletedIds.includes(decaying.id), true);
    assert.equal(await getMemory(decaying.id), null, "decayed episodic must be deleted");
    assert.ok(await getMemory(durable.id), "immune factual must survive");
  });

  it("listMemoriesForDecay returns lightweight candidates bounded by limit", async () => {
    for (let i = 0; i < 3; i++) {
      await createMemory({
        apiKeyId: "k1",
        sessionId: "s1",
        type: MemoryType.EPISODIC,
        key: `k${i}`,
        content: `c${i}`,
        metadata: {},
        expiresAt: null,
      });
    }
    const rows = listMemoriesForDecay({ apiKeyId: "k1", limit: 2 });
    assert.equal(rows.length, 2);
    assert.ok(rows[0].createdAt instanceof Date);
    assert.equal(typeof rows[0].accessCount, "number");
  });
});
