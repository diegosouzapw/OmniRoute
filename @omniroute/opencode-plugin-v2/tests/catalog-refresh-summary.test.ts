import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { publishCatalog } from "../src/catalog.js";

type Draft = {
  providers: Map<string, Record<string, any>>;
  models: Map<string, Record<string, any>>;
  provider: {
    update: (id: string, fn: (p: Record<string, any>) => void) => void;
  };
  model: {
    update: (pid: string, mid: string, fn: (m: Record<string, any>) => void) => void;
  };
};

function draft(): Draft {
  const providers = new Map<string, Record<string, any>>();
  const models = new Map<string, Record<string, any>>();
  return {
    providers,
    models,
    provider: {
      update: (id: string, fn: (p: Record<string, any>) => void) => {
        const p = (providers.get(id) ?? { id }) as Record<string, any>;
        fn(p);
        providers.set(id, p);
      },
    },
    model: {
      update: (pid: string, mid: string, fn: (m: Record<string, any>) => void) => {
        const k = pid + "/" + mid;
        const m = (models.get(k) ?? { id: mid, providerID: pid }) as Record<string, any>;
        fn(m);
        models.set(k, m);
      },
    },
  };
}

const baseOpts = {
  providerId: "omniroute",
  baseURL: "https://gw.example.com",
  apiKey: "k",
  timeoutMs: 1000,
  modelCacheTtlMs: 300000,
  usableOnly: false,
  // `visibleModels: ["*"]` skips the showcase/fresh narrowing so the stage
  // counters stay deterministic: every served id reaches the preset pass.
  visibleModels: ["*"],
};

function captureWarns(): { warns: string[]; restore: () => void } {
  const warns: string[] = [];
  const origWarn = console.warn;
  console.warn = (...args: unknown[]) => {
    warns.push(String(args[0]));
  };
  return {
    warns,
    restore() {
      console.warn = origWarn;
    },
  };
}

function summaryOf(warns: string[]): string | undefined {
  return warns.find((w) => w.includes("catalog refresh:"));
}

describe("catalog refresh summary", () => {
  it("normal refresh emits one summary line with the five counters", async () => {
    const d = draft();
    const { warns, restore } = captureWarns();
    try {
      const res = await publishCatalog(d, baseOpts, {
        fetcher: async () => [{ id: "m1" }, { id: "m2" }],
        enrichmentFetcher: async () => new Map(),
      });
      assert.deepEqual(res, { models: 2 });
    } finally {
      restore();
    }
    const summary = summaryOf(warns);
    assert.ok(summary, "expected a catalog refresh summary line");
    assert.match(summary, /served=2/);
    assert.match(summary, /default=2/);
    assert.match(summary, /presets=2/);
    assert.match(summary, /published=2/);
    assert.match(summary, /unmatched-free=0/);
    assert.equal(d.models.size, 2);
  });

  it("freeOnly with 20 free-tier lines and 4 matched warns 4 of 20", async () => {
    const d = draft();
    const overlay = new Map<string, { freeType: "keyless" }>();
    for (const id of ["m1", "m2", "m3", "m4"]) overlay.set(id, { freeType: "keyless" });
    for (let i = 0; i < 16; i++) overlay.set(`other-${i}`, { freeType: "keyless" });
    const { warns, restore } = captureWarns();
    try {
      const res = await publishCatalog(
        d,
        { ...baseOpts, freeOnly: true },
        {
          fetcher: async () => [{ id: "m1" }, { id: "m2" }, { id: "m3" }, { id: "m4" }],
          enrichmentFetcher: async () => overlay,
        }
      );
      assert.deepEqual(res, { models: 4 });
    } finally {
      restore();
    }
    const ratio = warns.find((w) => w.includes("free-tier entries match"));
    assert.ok(ratio, "expected a free-tier match ratio warning");
    assert.match(ratio, /4\/20/);
    const summary = summaryOf(warns);
    assert.ok(summary, "expected a catalog refresh summary line");
    assert.match(summary, /unmatched-free=16/);
  });

  it("freeOnly with an empty overlay keeps the existing warning unchanged", async () => {
    const d = draft();
    const { warns, restore } = captureWarns();
    try {
      const res = await publishCatalog(
        d,
        { ...baseOpts, freeOnly: true },
        {
          fetcher: async () => [{ id: "m1" }, { id: "m2" }],
          enrichmentFetcher: async () => new Map(),
        }
      );
      assert.deepEqual(res, { models: 0 });
    } finally {
      restore();
    }
    const existing = warns.find((w) => w.includes("no free-tier entries"));
    assert.ok(existing, "expected the existing empty-overlay warning");
    assert.match(existing, /freeOnly is on but the enrichment overlay has no free-tier entries/);
    assert.ok(
      !warns.some((w) => w.includes("free-tier entries match")),
      "no match ratio on an empty overlay"
    );
  });

  it("freeOnly with every free-tier line matched stays silent", async () => {
    const d = draft();
    const { warns, restore } = captureWarns();
    try {
      const res = await publishCatalog(
        d,
        { ...baseOpts, freeOnly: true },
        {
          fetcher: async () => [{ id: "m1" }, { id: "m2" }],
          enrichmentFetcher: async () =>
            new Map([
              ["m1", { freeType: "keyless" as const }],
              ["m2", { freeType: "keyless" as const }],
            ]),
        }
      );
      assert.deepEqual(res, { models: 2 });
    } finally {
      restore();
    }
    assert.ok(
      !warns.some((w) => w.includes("free-tier")),
      "no free-tier warning when everything matches"
    );
    assert.ok(summaryOf(warns), "summary line still emitted");
  });

  it("freeOnly off emits no free-tier warning", async () => {
    const d = draft();
    const { warns, restore } = captureWarns();
    try {
      const res = await publishCatalog(d, baseOpts, {
        fetcher: async () => [{ id: "m1" }],
        enrichmentFetcher: async () =>
          new Map([
            ["m1", { freeType: "keyless" as const }],
            ["other", { freeType: "keyless" as const }],
          ]),
      });
      assert.deepEqual(res, { models: 1 });
    } finally {
      restore();
    }
    assert.ok(
      !warns.some((w) => w.includes("free-tier") || w.includes("freeOnly")),
      "no free-tier warning when freeOnly is off"
    );
    const summary = summaryOf(warns);
    assert.ok(summary, "summary line still emitted");
    assert.match(summary, /unmatched-free=1/);
  });
});
