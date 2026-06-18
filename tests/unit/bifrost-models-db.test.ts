/**
 * Unit tests for src/lib/db/bifrostModels.ts (B4 of v8.1 Bifrost track).
 *
 * Uses the project's own DB infrastructure (core.ts getDbInstance)
 * with a temp DATA_DIR. Follows the Node.js native test runner pattern
 * established by model-intelligence-db.test.ts.
 */

import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-bm-test-"),
);
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const bm = await import("../../src/lib/db/bifrostModels.ts");

function resetStorage(): void {
  core.resetDbInstance();
  try {
    if (fs.existsSync(TEST_DATA_DIR)) {
      fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
    }
  } catch {
    /* EBUSY — ignore */
  }
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function seedRow(
  provider: string,
  id: string,
  opts: {
    ownedBy?: string | null;
    displayName?: string | null;
    metadata?: Record<string, unknown> | null;
    expiresAt?: string | null;
  } = {},
): void {
  const db = core.getDbInstance();
  db.prepare(
    `INSERT INTO bifrost_models
       (provider, id, owned_by, display_name, metadata, fetched_at, expires_at)
     VALUES (?, ?, ?, ?, ?, datetime('now'), ?)`,
  ).run(
    provider,
    id,
    opts.ownedBy ?? null,
    opts.displayName ?? null,
    opts.metadata ? JSON.stringify(opts.metadata) : null,
    opts.expiresAt ?? new Date(Date.now() + 3600_000).toISOString(),
  );
}

function seedMeta(
  provider: string,
  opts: {
    lastStatus?: "ok" | "error" | "partial";
    lastError?: string | null;
    modelCount?: number;
    fetchCount?: number;
  } = {},
): void {
  const db = core.getDbInstance();
  db.prepare(
    `INSERT INTO bifrost_models_meta
       (provider, last_fetched_at, last_status, last_error, model_count, fetch_count)
     VALUES (?, datetime('now'), ?, ?, ?, ?)`,
  ).run(
    provider,
    opts.lastStatus ?? "ok",
    opts.lastError ?? null,
    opts.modelCount ?? 0,
    opts.fetchCount ?? 1,
  );
}

// ─── getBifrostModel ────────────────────────────────────────────

describe("bifrostModels — getBifrostModel", () => {
  beforeEach(() => resetStorage());

  it("returns null for a missing row", () => {
    assert.strictEqual(bm.getBifrostModel("openai", "gpt-4o"), null);
  });

  it("returns the row for an existing model", () => {
    seedRow("openai", "gpt-4o", { ownedBy: "openai", displayName: "GPT-4o" });
    const row = bm.getBifrostModel("openai", "gpt-4o");
    assert.ok(row, "expected row to be returned");
    assert.strictEqual(row.provider, "openai");
    assert.strictEqual(row.id, "gpt-4o");
    assert.strictEqual(row.ownedBy, "openai");
    assert.strictEqual(row.displayName, "GPT-4o");
  });

  it("parses JSON metadata into an object", () => {
    seedRow("anthropic", "claude-3-5-sonnet", {
      metadata: { context_window: 200000, modalities: ["text", "image"] },
    });
    const row = bm.getBifrostModel("anthropic", "claude-3-5-sonnet");
    assert.ok(row);
    assert.deepStrictEqual(row.metadata, {
      context_window: 200000,
      modalities: ["text", "image"],
    });
  });

  it("returns null when the row is expired", () => {
    seedRow("openai", "gpt-4o-mini", {
      expiresAt: new Date(Date.now() - 1000).toISOString(),
    });
    assert.strictEqual(bm.getBifrostModel("openai", "gpt-4o-mini"), null);
  });

  it("returns the expired row when includeExpired=true", () => {
    seedRow("openai", "gpt-4o-mini", {
      expiresAt: new Date(Date.now() - 1000).toISOString(),
    });
    const row = bm.getBifrostModel("openai", "gpt-4o-mini", true);
    assert.ok(row, "includeExpired should bypass the TTL filter");
    assert.strictEqual(row.id, "gpt-4o-mini");
  });

  it("returns null when input args are empty", () => {
    assert.strictEqual(bm.getBifrostModel("", ""), null);
  });
});

// ─── listBifrostModelsForProvider ───────────────────────────────

describe("bifrostModels — listBifrostModelsForProvider", () => {
  beforeEach(() => resetStorage());

  it("returns an empty array when nothing is cached for the provider", () => {
    assert.deepStrictEqual(bm.listBifrostModelsForProvider("openai"), []);
  });

  it("returns rows for the requested provider only", () => {
    seedRow("openai", "gpt-4o");
    seedRow("openai", "gpt-4o-mini");
    seedRow("anthropic", "claude-3-5-sonnet");
    const openai = bm.listBifrostModelsForProvider("openai");
    assert.strictEqual(openai.length, 2);
    assert.ok(openai.every((m) => m.provider === "openai"));
  });

  it("filters out expired rows", () => {
    seedRow("openai", "gpt-4o");
    seedRow("openai", "gpt-3.5-turbo", {
      expiresAt: new Date(Date.now() - 1000).toISOString(),
    });
    const out = bm.listBifrostModelsForProvider("openai");
    assert.strictEqual(out.length, 1);
    assert.strictEqual(out[0].id, "gpt-4o");
  });

  it("orders results by id ascending", () => {
    seedRow("openai", "gpt-4o");
    seedRow("openai", "a-shiny-new-model");
    seedRow("openai", "z-oldest-model");
    const out = bm.listBifrostModelsForProvider("openai");
    assert.deepStrictEqual(
      out.map((m) => m.id),
      ["a-shiny-new-model", "gpt-4o", "z-oldest-model"],
    );
  });
});

// ─── recordBifrostFetch ─────────────────────────────────────────

describe("bifrostModels — recordBifrostFetch", () => {
  beforeEach(() => resetStorage());

  it("inserts a fresh meta row on first record", () => {
    bm.recordBifrostFetch("openai", "ok", 42);
    const meta = bm.getBifrostModelMeta("openai");
    assert.ok(meta);
    assert.strictEqual(meta.provider, "openai");
    assert.strictEqual(meta.lastStatus, "ok");
    assert.strictEqual(meta.modelCount, 42);
    assert.strictEqual(meta.fetchCount, 1);
  });

  it("increments fetch_count on subsequent records", () => {
    bm.recordBifrostFetch("openai", "ok", 42);
    bm.recordBifrostFetch("openai", "ok", 42);
    bm.recordBifrostFetch("openai", "ok", 43);
    const meta = bm.getBifrostModelMeta("openai");
    assert.ok(meta);
    assert.strictEqual(meta.fetchCount, 3);
    assert.strictEqual(meta.modelCount, 43);
  });

  it("records error status with the error message", () => {
    bm.recordBifrostFetch("openai", "error", 0, "ECONNREFUSED");
    const meta = bm.getBifrostModelMeta("openai");
    assert.ok(meta);
    assert.strictEqual(meta.lastStatus, "error");
    assert.strictEqual(meta.lastError, "ECONNREFUSED");
    assert.strictEqual(meta.modelCount, 0);
  });

  it("throws on invalid status string", () => {
    assert.throws(
      () => bm.recordBifrostFetch("openai", "bogus" as never, 0),
      /invalid status/,
    );
  });

  it("throws on negative modelCount", () => {
    assert.throws(
      () => bm.recordBifrostFetch("openai", "ok", -1),
      /non-negative finite number/,
    );
  });

  it("returns null for a provider with no meta row", () => {
    assert.strictEqual(bm.getBifrostModelMeta("never-fetched"), null);
  });
});

// ─── refreshBifrostModels ───────────────────────────────────────

describe("bifrostModels — refreshBifrostModels", () => {
  beforeEach(() => resetStorage());

  it("upserts all fetched entries and returns counts", async () => {
    const fetcher = bm.BifrostFetcher;
    const result = await bm.refreshBifrostModels("openai", (p) => {
      assert.strictEqual(p, "openai");
      return [
        { id: "gpt-4o", owned_by: "openai", display_name: "GPT-4o" },
        { id: "gpt-4o-mini", owned_by: "openai" },
      ];
    });
    assert.strictEqual(result.provider, "openai");
    assert.strictEqual(result.fetched, 2);
    assert.strictEqual(result.upserted, 2);
    assert.ok(result.durationMs >= 0);

    assert.ok(bm.getBifrostModel("openai", "gpt-4o"));
    assert.ok(bm.getBifrostModel("openai", "gpt-4o-mini"));

    const meta = bm.getBifrostModelMeta("openai");
    assert.strictEqual(meta?.lastStatus, "ok");
    assert.strictEqual(meta?.modelCount, 2);
  });

  it("respects custom ttlSeconds", async () => {
    await bm.refreshBifrostModels(
      "openai",
      () => [{ id: "gpt-4o" }],
      { ttlSeconds: 60 },
    );
    const row = bm.getBifrostModel("openai", "gpt-4o", true);
    assert.ok(row);
    const expiresMs = new Date(row.expiresAt).getTime();
    const fetchedMs = new Date(row.fetchedAt).getTime();
    const ttl = (expiresMs - fetchedMs) / 1000;
    assert.ok(ttl >= 55 && ttl <= 65, `expected ~60s ttl, got ${ttl}s`);
  });

  it("records 'error' meta and throws on fetcher failure", async () => {
    await assert.rejects(
      () => bm.refreshBifrostModels("openai", () => { throw new Error("ECONNREFUSED"); }),
      (err: Error) => err.name === "BifrostCacheError" && /ECONNREFUSED/.test(err.message),
    );
    const meta = bm.getBifrostModelMeta("openai");
    assert.strictEqual(meta?.lastStatus, "error");
    assert.match(meta?.lastError ?? "", /ECONNREFUSED/);
  });

  it("rejects non-array fetcher return", async () => {
    await assert.rejects(
      () => bm.refreshBifrostModels("openai", () => null as unknown as never),
      (err: Error) => err.name === "BifrostCacheError" && /array/i.test(err.message),
    );
  });

  it("rejects response larger than BIFROST_MAX_MODELS_PER_FETCH", async () => {
    const huge = Array.from({ length: bm.BIFROST_MAX_MODELS_PER_FETCH + 1 }, (_, i) => ({
      id: `m-${i}`,
    }));
    await assert.rejects(
      () => bm.refreshBifrostModels("openai", () => huge),
      (err: Error) => err.name === "BifrostCacheError" && /exceeded max/i.test(err.message),
    );
    const meta = bm.getBifrostModelMeta("openai");
    assert.strictEqual(meta?.lastStatus, "error");
  });

  it("treats a partial response as 'partial' status by default", async () => {
    const result = await bm.refreshBifrostModels("openai", () => [
      { id: "gpt-4o" },
      { id: "" }, // invalid (empty id) — will be skipped
      null as unknown as never, // invalid — will be skipped
    ]);
    assert.strictEqual(result.upserted, 1);
    const meta = bm.getBifrostModelMeta("openai");
    assert.strictEqual(meta?.lastStatus, "partial");
    assert.strictEqual(meta?.modelCount, 1);
  });

  it("rejects a partial response when allowPartial=false", async () => {
    await assert.rejects(
      () =>
        bm.refreshBifrostModels(
          "openai",
          () => [{ id: "gpt-4o" }, { id: "" }],
          { allowPartial: false },
        ),
      (err: Error) => err.name === "BifrostCacheError" && /partial/i.test(err.message),
    );
  });

  it("rejects empty response", async () => {
    await assert.rejects(
      () => bm.refreshBifrostModels("openai", () => []),
      (err: Error) => err.name === "BifrostCacheError" && /no valid/i.test(err.message),
    );
  });

  it("updates existing rows on subsequent refreshes", async () => {
    await bm.refreshBifrostModels("openai", () => [
      { id: "gpt-4o", display_name: "GPT-4o" },
    ]);
    const first = bm.getBifrostModel("openai", "gpt-4o", true);
    assert.strictEqual(first?.displayName, "GPT-4o");

    await new Promise((r) => setTimeout(r, 10));

    await bm.refreshBifrostModels("openai", () => [
      { id: "gpt-4o", display_name: "GPT-4o (v2)" },
    ]);
    const second = bm.getBifrostModel("openai", "gpt-4o", true);
    assert.strictEqual(second?.displayName, "GPT-4o (v2)");

    const meta = bm.getBifrostModelMeta("openai");
    assert.strictEqual(meta?.fetchCount, 2);
  });

  it("throws on missing provider", async () => {
    await assert.rejects(
      () => bm.refreshBifrostModels("", () => []),
      (err: Error) => err.name === "BifrostCacheError",
    );
  });

  it("throws when fetcher is not a function", async () => {
    await assert.rejects(
      () => bm.refreshBifrostModels("openai", null as unknown as never),
      (err: Error) => err.name === "BifrostCacheError" && /fetcher must be a function/.test(err.message),
    );
  });

  it("supports async fetchers", async () => {
    const result = await bm.refreshBifrostModels("openai", async () => {
      await new Promise((r) => setTimeout(r, 5));
      return [{ id: "gpt-4o" }];
    });
    assert.strictEqual(result.upserted, 1);
  });
});

// ─── purgeExpiredBifrostModels ──────────────────────────────────

describe("bifrostModels — purgeExpiredBifrostModels", () => {
  beforeEach(() => resetStorage());

  it("removes only expired rows", () => {
    seedRow("openai", "gpt-4o");
    seedRow("openai", "gpt-4o-mini", {
      expiresAt: new Date(Date.now() - 1000).toISOString(),
    });
    seedRow("openai", "gpt-3.5-turbo", {
      expiresAt: new Date(Date.now() - 5000).toISOString(),
    });
    const removed = bm.purgeExpiredBifrostModels();
    assert.strictEqual(removed, 2);
    assert.ok(bm.getBifrostModel("openai", "gpt-4o", true));
    assert.strictEqual(bm.getBifrostModel("openai", "gpt-4o-mini", true), null);
  });

  it("returns 0 when no rows are expired", () => {
    seedRow("openai", "gpt-4o");
    assert.strictEqual(bm.purgeExpiredBifrostModels(), 0);
  });
});

// ─── purgeBifrostModelsByProvider ───────────────────────────────

describe("bifrostModels — purgeBifrostModelsByProvider", () => {
  beforeEach(() => resetStorage());

  it("deletes all rows + meta for a single provider, leaves others intact", () => {
    seedRow("openai", "gpt-4o");
    seedRow("openai", "gpt-4o-mini");
    seedMeta("openai", { modelCount: 2 });
    seedRow("anthropic", "claude-3-5-sonnet");
    seedMeta("anthropic", { modelCount: 1 });

    const result = bm.purgeBifrostModelsByProvider("openai");
    assert.deepStrictEqual(result, { deletedModels: 2, deletedMeta: 1 });
    assert.strictEqual(bm.getBifrostModel("openai", "gpt-4o", true), null);
    assert.ok(bm.getBifrostModel("anthropic", "claude-3-5-sonnet", true));
    assert.strictEqual(bm.getBifrostModelMeta("openai"), null);
    assert.ok(bm.getBifrostModelMeta("anthropic"));
  });

  it("returns zeroed result for unknown provider", () => {
    seedRow("openai", "gpt-4o");
    const result = bm.purgeBifrostModelsByProvider("never-fake");
    assert.deepStrictEqual(result, { deletedModels: 0, deletedMeta: 0 });
    assert.ok(bm.getBifrostModel("openai", "gpt-4o", true));
  });

  it("returns zeroed result for empty provider string", () => {
    const result = bm.purgeBifrostModelsByProvider("");
    assert.deepStrictEqual(result, { deletedModels: 0, deletedMeta: 0 });
  });
});

// ─── listBifrostModelMeta ───────────────────────────────────────

describe("bifrostModels — listBifrostModelMeta", () => {
  beforeEach(() => resetStorage());

  it("returns an empty array when no meta rows exist", () => {
    assert.deepStrictEqual(bm.listBifrostModelMeta(), []);
  });

  it("returns all meta rows ordered by last_fetched_at DESC", () => {
    seedMeta("openai", { lastStatus: "ok", modelCount: 5 });
    seedMeta("anthropic", { lastStatus: "error", lastError: "boom", modelCount: 0 });

    const all = bm.listBifrostModelMeta();
    assert.strictEqual(all.length, 2);
    assert.ok(all.every((m) => m.lastFetchedAt.length > 0));
    assert.ok(
      all[0].lastFetchedAt >= all[1].lastFetchedAt,
      "expected newest first",
    );
  });

  it("drops rows with unknown lastStatus values (defensive)", () => {
    seedMeta("openai", { lastStatus: "ok" });
    const db = core.getDbInstance();
    db.prepare(
      `INSERT INTO bifrost_models_meta
         (provider, last_fetched_at, last_status, last_error, model_count, fetch_count)
       VALUES (?, datetime('now'), ?, ?, ?, ?)`,
    ).run("bogus", "mystery", null, 0, 1);

    const all = bm.listBifrostModelMeta();
    assert.strictEqual(all.length, 1);
    assert.strictEqual(all[0].provider, "openai");
  });
});
