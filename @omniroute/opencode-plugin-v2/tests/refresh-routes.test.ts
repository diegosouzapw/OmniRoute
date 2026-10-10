import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { collectCatalog, DECLARED_REFRESH_ROUTES, isDeclaredRefreshPath } from "../src/catalog.js";
import { autoComboModelId, AUTO_VARIANTS } from "../src/shared/naming.js";

const baseOpts = {
  providerId: "omniroute",
  baseURL: "https://gw.example.com",
  apiKey: "k",
  timeoutMs: 1000,
  modelCacheTtlMs: 300000,
  usableOnly: false,
};

function virtualIds(): string[] {
  const ids = ["auto"];
  for (const variant of AUTO_VARIANTS) ids.push(autoComboModelId(variant));
  return ids;
}

describe("refresh route table (closed set)", () => {
  it("declares exactly the five refresh routes", () => {
    assert.deepEqual(
      [...DECLARED_REFRESH_ROUTES],
      [
        "/v1/models",
        "/api/providers",
        "/api/pricing/models",
        "/api/pricing",
        "/api/free-tier/summary",
      ]
    );
  });

  it("matches declared paths by exact equality, never the removed routes", () => {
    for (const route of DECLARED_REFRESH_ROUTES) assert.equal(isDeclaredRefreshPath(route), true);
    assert.equal(isDeclaredRefreshPath("/api/combos"), false);
    assert.equal(isDeclaredRefreshPath("/api/combos/auto"), false);
    assert.equal(isDeclaredRefreshPath("/api/combos/auto/extra"), false);
    assert.equal(isDeclaredRefreshPath("/v1/models/extra"), false);
  });

  it("collects the catalog without publishing retired virtual entries", async () => {
    const collected = await collectCatalog(baseOpts, {
      models: async () => [{ id: "m1" }],
      providers: async () => [],
      enrichment: async () => new Map(),
    } as never);
    assert.deepEqual(collected.counts, { models: 1 });
    const keys = [...collected.entries.keys()];
    for (const id of virtualIds()) {
      assert.equal(
        keys.some((k) => k === `omniroute/${id}`),
        false,
        `retired entry ${id} must stay unpublished, got ${JSON.stringify(keys)}`
      );
    }
  });

  it("ignores a legacy fetcher entry the refresh no longer reads", async () => {
    const collected = await collectCatalog(baseOpts, {
      models: async () => [{ id: "m1" }],
      autoCombos: async () => [{ id: "auto" }, { id: "auto/coding" }],
      providers: async () => [],
      enrichment: async () => new Map(),
    } as never);
    assert.deepEqual(collected.counts, { models: 1 });
    const keys = [...collected.entries.keys()];
    for (const id of ["auto", "auto/coding"]) {
      assert.equal(
        keys.some((k) => k === `omniroute/${id}`),
        false,
        `retired entry ${id} must stay unpublished, got ${JSON.stringify(keys)}`
      );
    }
  });

  it("keeps server-provided auto entries published with their own limits", async () => {
    const collected = await collectCatalog(baseOpts, {
      models: async () => [{ id: "auto/coding", context_length: 64000, max_output_tokens: 4000 }],
      providers: async () => [],
      enrichment: async () => new Map(),
    } as never);
    const entry = collected.entries.get("omniroute/auto/coding");
    assert.ok(entry, "server-provided entry must stay published");
    assert.equal(entry?.limit.context, 64000);
    assert.equal(entry?.limit.output, 4000);
  });

  it("round-trips a snapshot without the retired field", async () => {
    const { mkdtempSync } = await import("node:fs");
    const { tmpdir } = await import("node:os");
    const { join } = await import("node:path");
    const { readFileSync, writeFileSync, rmSync } = await import("node:fs");
    const { writeDiskSnapshot, readDiskSnapshot, diskSnapshotPath } =
      await import("../src/cache.js");
    const dir = mkdtempSync(join(tmpdir(), "omniroute-retired-field-"));
    const prev = process.env.OPENCODE_DATA_DIR;
    process.env.OPENCODE_DATA_DIR = dir;
    try {
      await writeDiskSnapshot(
        "legacy-tolerant",
        { models: [{ id: "m-a" }], providers: [], fetchedAt: Date.now() } as never,
        "fp-legacy"
      );
      const file = diskSnapshotPath("legacy-tolerant");
      const raw = JSON.parse(readFileSync(file, "utf8")) as Record<string, unknown>;
      assert.equal("autoCombos" in raw, false);
      writeFileSync(file, JSON.stringify({ ...raw, autoCombos: [{ id: "auto" }] }));
      const stored = readFileSync(file, "utf8");
      assert.ok(
        (JSON.parse(stored) as Record<string, unknown>).autoCombos !== undefined,
        "the stored snapshot must expose the retired key before it is ignored"
      );
      const back = await readDiskSnapshot("legacy-tolerant", "fp-legacy");
      assert.ok(back, "snapshot with a retired field still loads");
      assert.equal("autoCombos" in (back as object), false);
      assert.deepEqual(
        (back?.models ?? []).map((entry) => entry.id),
        ["m-a"]
      );
    } finally {
      if (prev === undefined) delete process.env.OPENCODE_DATA_DIR;
      else process.env.OPENCODE_DATA_DIR = prev;
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("parses a retired per-endpoint timeout key without requesting anything", async () => {
    const { parsePluginOptions, resolveTimeouts } = await import("../src/options.js");
    const parsed = parsePluginOptions({
      baseURL: "https://gw.example.com",
      timeouts: { models: 1111, autoCombos: 3333 },
    });
    assert.deepEqual(resolveTimeouts(parsed), { models: 1111, enrichment: 10000 });
  });
});
