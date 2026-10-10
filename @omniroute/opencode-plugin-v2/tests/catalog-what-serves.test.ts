import { describe, it, afterEach } from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import type { AddressInfo } from "node:net";
import { collectCatalog } from "../src/catalog.js";
import { defaultOmniRouteModelsFetcher } from "../src/shared/models-map.js";
import type { OmniRouteRawModelEntry } from "../src/shared/models-map.js";

const baseOpts = {
  providerId: "omniroute",
  baseURL: "https://gw.example.com",
  apiKey: "k",
  timeoutMs: 1000,
  modelCacheTtlMs: 300000,
  usableOnly: false,
  enrichment: false as const,
};

const servers: http.Server[] = [];
afterEach(async () => {
  while (servers.length > 0) {
    const server = servers.pop();
    if (server) await new Promise<void>((resolve) => server.close(() => resolve()));
  }
});

async function entriesThroughReader(
  data: Array<Record<string, unknown>>,
  envelope: "list" | "bare" = "list"
): Promise<OmniRouteRawModelEntry[]> {
  const body = envelope === "list" ? { object: "list", data } : data;
  const server = http.createServer((_req, res) => {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify(body));
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", () => resolve()));
  servers.push(server);
  const port = (server.address() as AddressInfo).port;
  return defaultOmniRouteModelsFetcher(`http://127.0.0.1:${port}`, "k", 2000);
}

function dated(daysAgo: number, nowMs: number): string {
  return new Date(nowMs - daysAgo * 24 * 3600 * 1000).toISOString();
}

const FIXED_NOW = Date.parse("2026-10-03T12:00:00.000Z");

async function withFixedNow<T>(fn: () => Promise<T>): Promise<T> {
  const realNow = Date.now;
  Date.now = () => FIXED_NOW;
  try {
    return await fn();
  } finally {
    Date.now = realNow;
  }
}

function staleEntry(id: string, ownedBy = "solo"): Record<string, unknown> {
  return { id, owned_by: ownedBy, context_length: 1000, capabilities: {} };
}

/**
 * Eleven entries under one owner: ten high-context fillers take the
 * showcase slots, the low-context target falls out of every static
 * branch (no dates, no capability shortcut, no pinning) — the only way to be
 * statically dropped when each owner keeps its top ten.
 */
function crowd(owner: string, targetId: string): Array<Record<string, unknown>> {
  const fillers = Array.from({ length: 10 }, (_v, i) => ({
    id: `${owner}/filler-${i}`,
    owned_by: owner,
    context_length: 100000,
  }));
  return [...fillers, { id: targetId, owned_by: owner, context_length: 1000 }];
}

/**
 * Same crowd, but the ten fillers also carry a newer curatorial date
 * than the low-context fresh target: the target falls out of the
 * showcase (11th by date) while staying inside the 90-day window, so
 * only the freshness branch can publish it.
 */
function freshCrowd(
  owner: string,
  targetId: string,
  targetDate: string,
  fillerDate: string
): Array<Record<string, unknown>> {
  const fillers = Array.from({ length: 10 }, (_v, i) => ({
    id: `${owner}/filler-${i}`,
    owned_by: owner,
    context_length: 100000,
    release_date: fillerDate,
  }));
  return [
    ...fillers,
    { id: targetId, owned_by: owner, context_length: 1000, release_date: targetDate },
  ];
}

describe("publish what serves by default", () => {
  it("recent model without usage is published", async () => {
    await withFixedNow(async () => {
      // The target is the newest entry, so it sits inside the per-owner
      // fresh cap: a recent model with no usage signal still publishes.
      const raw = await entriesThroughReader(
        freshCrowd("fresh", "fresh/new-model", dated(1, FIXED_NOW), dated(2, FIXED_NOW))
      );
      const collected = await collectCatalog(
        { ...baseOpts, managementReadToken: "m" },
        {
          fetcher: async () => raw,
          usageFetcher: async () => [],
        }
      );
      assert.ok(collected.entries.has("omniroute/fresh/new-model"));
    });
  });

  it("entry with only tool calling stays unpublished", async () => {
    await withFixedNow(async () => {
      const entries = crowd("tooled", "tooled/tool-only").map((row) =>
        row.id === "tooled/tool-only" ? { ...row, capabilities: { tool_calling: true } } : row
      );
      const raw = await entriesThroughReader(entries);
      const opts = { ...baseOpts, managementReadToken: "m" };
      const fetchers = {
        fetcher: async () => raw,
      };
      const unpublished = await collectCatalog(opts, {
        ...fetchers,
        usageFetcher: async () => [],
      });
      assert.ok(!unpublished.entries.has("omniroute/tooled/tool-only"));
      const unrelated = await collectCatalog(opts, {
        ...fetchers,
        usageFetcher: async () => ["unrelated-id"],
      });
      assert.ok(!unrelated.entries.has("omniroute/tooled/tool-only"));
    });
  });

  it("model without dates falls back to other branches", async () => {
    await withFixedNow(async () => {
      const raw = await entriesThroughReader(crowd("plain", "plain/undated"));
      const collected = await collectCatalog(
        { ...baseOpts, managementReadToken: "m" },
        {
          fetcher: async () => raw,
          usageFetcher: async () => [],
        }
      );
      assert.ok(!collected.entries.has("omniroute/plain/undated"));
    });
  });

  it("history restores used models on top of static pass", async () => {
    await withFixedNow(async () => {
      const raw = await entriesThroughReader([
        { id: "fresh/new-model", owned_by: "fresh", release_date: dated(10, FIXED_NOW) },
        ...crowd("zzz", "zzz/old-one"),
        ...crowd("never", "never/never-used"),
      ]);
      const collected = await collectCatalog(
        { ...baseOpts, managementReadToken: "m" },
        {
          fetcher: async () => raw,
          usageFetcher: async () => ["zzz/old-one"],
        }
      );
      assert.ok(collected.entries.has("omniroute/fresh/new-model"));
      assert.ok(collected.entries.has("omniroute/zzz/old-one"));
      assert.ok(!collected.entries.has("omniroute/never/never-used"));
    });
  });

  it("sentinel restores the full catalog", async () => {
    const collected = await collectCatalog(
      { ...baseOpts, visibleModels: ["*"], hiddenModels: ["gone/dead"] },
      {
        fetcher: async () =>
          [
            staleEntry("gone/dead"),
            staleEntry("zzz/kept"),
            staleEntry("all-combo", "combo"),
          ] as unknown as OmniRouteRawModelEntry[],
      }
    );
    assert.ok(collected.entries.has("omniroute/zzz/kept"));
    assert.ok(!collected.entries.has("omniroute/gone/dead"));
    assert.ok(collected.entries.has("omniroute/all-combo"));
    assert.deepEqual(collected.counts, { models: 2 });
  });

  it("short pinned id keeps the prefixed model", async () => {
    const collected = await collectCatalog(
      { ...baseOpts, visibleModels: ["keep-me"] },
      {
        fetcher: async () =>
          [
            staleEntry("cc/keep-me"),
            staleEntry("cc/drop-me"),
          ] as unknown as OmniRouteRawModelEntry[],
      }
    );
    assert.ok(collected.entries.has("omniroute/cc/keep-me"));
    assert.ok(!collected.entries.has("omniroute/cc/drop-me"));
  });

  it("empty usage keeps the restricted fallback", async () => {
    await withFixedNow(async () => {
      const raw = await entriesThroughReader([
        { id: "fresh/new-model", owned_by: "fresh", release_date: dated(10, FIXED_NOW) },
        ...crowd("zzz", "zzz/old-one"),
      ]);
      const collected = await collectCatalog(
        { ...baseOpts, managementReadToken: "m" },
        {
          fetcher: async () => raw,
          usageFetcher: async () => [],
        }
      );
      assert.ok(collected.entries.has("omniroute/fresh/new-model"));
      assert.ok(!collected.entries.has("omniroute/zzz/old-one"));
    });
  });

  it("failed usage keeps the remaining models", async () => {
    const warns: string[] = [];
    const origWarn = console.warn;
    console.warn = (...args: unknown[]) => {
      warns.push(String(args[0]));
    };
    try {
      const collected = await collectCatalog(
        { ...baseOpts, managementReadToken: "m" },
        {
          fetcher: async () => crowd("zzz", "zzz/old-one") as unknown as OmniRouteRawModelEntry[],
          usageFetcher: async () => {
            throw new Error("boom 500");
          },
        }
      );
      assert.ok(!collected.entries.has("omniroute/zzz/old-one"));
    } finally {
      console.warn = origWarn;
    }
    assert.equal(warns.filter((w) => /usage fetch failed/.test(w)).length, 1);
  });

  it("missing token never calls the usage endpoint", async () => {
    let calls = 0;
    const collected = await collectCatalog(baseOpts, {
      fetcher: async () => crowd("zzz", "zzz/old-one") as unknown as OmniRouteRawModelEntry[],
      usageFetcher: async () => {
        calls += 1;
        return ["zzz/old-one"];
      },
    });
    assert.equal(calls, 0);
    assert.ok(!collected.entries.has("omniroute/zzz/old-one"));
  });

  it("repeated refresh keeps a stable fingerprint", async () => {
    await withFixedNow(async () => {
      const raw = await entriesThroughReader(
        freshCrowd("fresh", "fresh/new-model", dated(10, FIXED_NOW), dated(2, FIXED_NOW))
      );
      const fetchers = {
        fetcher: async () => raw,
        usageFetcher: async () => [] as string[],
      };
      const opts = { ...baseOpts, managementReadToken: "m" };
      const first = await collectCatalog(opts, fetchers);
      const second = await collectCatalog(opts, fetchers);
      assert.deepEqual([...first.entries.keys()].sort(), [...second.entries.keys()].sort());
    });
  });

  it("usage beyond the top fifty is not restored", async () => {
    const used = Array.from({ length: 60 }, (_v, i) => `used-${i}`);
    const collected = await collectCatalog(
      { ...baseOpts, managementReadToken: "m" },
      {
        fetcher: async () =>
          [
            ...crowd("zzz", "zzz/used-59"),
            ...crowd("never", "never/never"),
          ] as unknown as OmniRouteRawModelEntry[],
        usageFetcher: async () => used,
      }
    );
    assert.ok(!collected.entries.has("omniroute/zzz/used-59"));
    assert.ok(!collected.entries.has("omniroute/never/never"));
  });
});

describe("usage memory option", () => {
  it("restores a dropped entry named by recent usage by default", async () => {
    await withFixedNow(async () => {
      let calls = 0;
      const raw = await entriesThroughReader(crowd("zzz", "zzz/old-one"));
      const collected = await collectCatalog(
        { ...baseOpts, managementReadToken: "m" },
        {
          fetcher: async () => raw,
          usageFetcher: async () => {
            calls += 1;
            return ["zzz/old-one"];
          },
        }
      );
      assert.equal(calls, 1);
      assert.ok(collected.entries.has("omniroute/zzz/old-one"));
    });
  });

  it("restores a dropped entry named by recent usage when enabled", async () => {
    await withFixedNow(async () => {
      let calls = 0;
      const raw = await entriesThroughReader(crowd("zzz", "zzz/old-one"));
      const collected = await collectCatalog(
        { ...baseOpts, managementReadToken: "m", usageMemory: true },
        {
          fetcher: async () => raw,
          usageFetcher: async () => {
            calls += 1;
            return ["zzz/old-one"];
          },
        }
      );
      assert.equal(calls, 1);
      assert.ok(collected.entries.has("omniroute/zzz/old-one"));
    });
  });

  it("leaves usage memory off when disabled", async () => {
    await withFixedNow(async () => {
      let calls = 0;
      const raw = await entriesThroughReader(crowd("zzz", "zzz/old-one"));
      const collected = await collectCatalog(
        { ...baseOpts, managementReadToken: "m", usageMemory: false },
        {
          fetcher: async () => raw,
          usageFetcher: async () => {
            calls += 1;
            return ["zzz/old-one"];
          },
        }
      );
      assert.equal(calls, 0);
      assert.ok(!collected.entries.has("omniroute/zzz/old-one"));
    });
  });

  it("makes no usage call without a token", async () => {
    await withFixedNow(async () => {
      let calls = 0;
      const raw = await entriesThroughReader(crowd("zzz", "zzz/old-one"));
      const collected = await collectCatalog(baseOpts, {
        fetcher: async () => raw,
        usageFetcher: async () => {
          calls += 1;
          return ["zzz/old-one"];
        },
      });
      assert.equal(calls, 0);
      assert.ok(!collected.entries.has("omniroute/zzz/old-one"));
    });
  });

  it("makes no usage call without a token when enabled", async () => {
    await withFixedNow(async () => {
      let calls = 0;
      const raw = await entriesThroughReader(crowd("zzz", "zzz/old-one"));
      const collected = await collectCatalog(
        { ...baseOpts, usageMemory: true },
        {
          fetcher: async () => raw,
          usageFetcher: async () => {
            calls += 1;
            return ["zzz/old-one"];
          },
        }
      );
      assert.equal(calls, 0);
      assert.ok(!collected.entries.has("omniroute/zzz/old-one"));
    });
  });

  it("restores nothing when the usage fetch fails", async () => {
    const warns: string[] = [];
    const origWarn = console.warn;
    console.warn = (...args: unknown[]) => {
      warns.push(String(args[0]));
    };
    try {
      await withFixedNow(async () => {
        const raw = await entriesThroughReader(crowd("zzz", "zzz/old-one"));
        const collected = await collectCatalog(
          { ...baseOpts, managementReadToken: "m" },
          {
            fetcher: async () => raw,
            usageFetcher: async () => {
              throw new Error("boom 500");
            },
          }
        );
        assert.ok(!collected.entries.has("omniroute/zzz/old-one"));
      });
    } finally {
      console.warn = origWarn;
    }
    assert.equal(warns.filter((w) => /usage fetch failed/.test(w)).length, 1);
  });

  it("leaves a short id unmatched without its owner", async () => {
    await withFixedNow(async () => {
      const raw = await entriesThroughReader(crowd("zzz", "zzz/old-one"));
      const collected = await collectCatalog(
        { ...baseOpts, managementReadToken: "m" },
        {
          fetcher: async () => raw,
          usageFetcher: async () => ["old-one"],
        }
      );
      assert.ok(!collected.entries.has("omniroute/zzz/old-one"));
    });
  });

  it("restores the base entry when usage names its flat variant", async () => {
    await withFixedNow(async () => {
      const fillers = Array.from({ length: 10 }, (_v, i) => ({
        id: `base/filler-${i}`,
        owned_by: "base",
        context_length: 100000,
      }));
      const raw = await entriesThroughReader([
        ...fillers,
        { id: "base/vivid", owned_by: "base", context_length: 1000 },
      ]);
      const collected = await collectCatalog(
        { ...baseOpts, managementReadToken: "m" },
        {
          fetcher: async () => raw,
          usageFetcher: async () => ["base/vivid-high"],
        }
      );
      assert.ok(collected.entries.has("omniroute/base/vivid"));
      assert.ok(!collected.entries.has("omniroute/base/vivid-high"));
    });
  });
});

describe("retired entries stay out of the default view", () => {
  it("drops a retired model even when usage still names it", async () => {
    await withFixedNow(async () => {
      const raw = await entriesThroughReader([
        {
          id: "old/gone",
          owned_by: "old",
          context_length: 1000,
          release_date: dated(5, FIXED_NOW),
          status: "deprecated",
        },
      ]);
      const collected = await collectCatalog(
        { ...baseOpts, managementReadToken: "m" },
        {
          fetcher: async () => raw,
          usageFetcher: async () => ["old/gone"],
        }
      );
      assert.ok(!collected.entries.has("omniroute/old/gone"));
    });
  });

  it("drops a retired model on the fail-open path too", async () => {
    await withFixedNow(async () => {
      const raw = await entriesThroughReader([
        {
          id: "old/gone",
          owned_by: "old",
          context_length: 1000,
          release_date: dated(5, FIXED_NOW),
          status: "deprecated",
        },
      ]);
      const collected = await collectCatalog(
        { ...baseOpts, managementReadToken: "m" },
        {
          fetcher: async () => raw,
          usageFetcher: async () => {
            throw new Error("boom 500");
          },
        }
      );
      assert.ok(!collected.entries.has("omniroute/old/gone"));
    });
  });

  it("keeps a retired model when pinned by exact id", async () => {
    await withFixedNow(async () => {
      const raw = await entriesThroughReader([
        {
          id: "old/gone",
          owned_by: "old",
          context_length: 1000,
          release_date: dated(5, FIXED_NOW),
          status: "deprecated",
        },
      ]);
      const collected = await collectCatalog(
        { ...baseOpts, visibleModels: ["old/gone"] },
        {
          fetcher: async () => raw,
        }
      );
      assert.ok(collected.entries.has("omniroute/old/gone"));
    });
  });
});

describe("flat effort-variant ids stay out of the default view", () => {
  it("drops the flat id and keeps the dated base id", async () => {
    await withFixedNow(async () => {
      for (const tier of ["medium", "high"]) {
        const raw = await entriesThroughReader([
          {
            id: "o/m",
            owned_by: "o",
            context_length: 1000,
            release_date: dated(5, FIXED_NOW),
          },
          {
            id: `o/m-${tier}`,
            owned_by: "o",
            context_length: 1000,
            release_date: dated(4, FIXED_NOW),
          },
        ]);
        const collected = await collectCatalog(
          { ...baseOpts, managementReadToken: "m" },
          {
            fetcher: async () => raw,
            usageFetcher: async () => [],
          }
        );
        assert.ok(collected.entries.has("omniroute/o/m"), `base kept for -${tier}`);
        assert.ok(!collected.entries.has(`omniroute/o/m-${tier}`), `flat dropped for -${tier}`);
      }
    });
  });

  it("never restores a flat id through usage", async () => {
    await withFixedNow(async () => {
      const raw = await entriesThroughReader([
        {
          id: "o/m",
          owned_by: "o",
          context_length: 1000,
          release_date: dated(5, FIXED_NOW),
        },
        {
          id: "o/m-high",
          owned_by: "o",
          context_length: 1000,
          release_date: dated(4, FIXED_NOW),
        },
      ]);
      const collected = await collectCatalog(
        { ...baseOpts, managementReadToken: "m" },
        {
          fetcher: async () => raw,
          usageFetcher: async () => ["o/m-high"],
        }
      );
      assert.ok(!collected.entries.has("omniroute/o/m-high"));
    });
  });

  it("keeps a flat id when pinned by exact id", async () => {
    await withFixedNow(async () => {
      const raw = await entriesThroughReader([
        {
          id: "o/m-medium",
          owned_by: "o",
          context_length: 1000,
          release_date: dated(4, FIXED_NOW),
        },
      ]);
      const collected = await collectCatalog(
        { ...baseOpts, visibleModels: ["o/m-medium"] },
        {
          fetcher: async () => raw,
        }
      );
      assert.ok(collected.entries.has("omniroute/o/m-medium"));
    });
  });

  it("leaves ids without an effort suffix alone", async () => {
    await withFixedNow(async () => {
      const raw = await entriesThroughReader([
        {
          id: "o/model-turbo",
          owned_by: "o",
          context_length: 1000,
          release_date: dated(5, FIXED_NOW),
        },
      ]);
      const collected = await collectCatalog(
        { ...baseOpts, managementReadToken: "m" },
        {
          fetcher: async () => raw,
          usageFetcher: async () => [],
        }
      );
      assert.ok(collected.entries.has("omniroute/o/model-turbo"));
    });
  });
});

describe("fresh cap per owner", () => {
  function rankedFresh(owner: string, count: number): Array<Record<string, unknown>> {
    return Array.from({ length: count }, (_v, i) => ({
      id: `${owner}/m-${i}`,
      owned_by: owner,
      context_length: 1000 + (count - i),
      release_date: dated(i + 1, FIXED_NOW),
    }));
  }

  it("keeps ten recent entries per owner by default", async () => {
    await withFixedNow(async () => {
      // A narrow showcase (3) isolates the fresh cap: with a wide
      // showcase all eleven would publish through the showcase branch.
      const raw = await entriesThroughReader(rankedFresh("cap", 11));
      const collected = await collectCatalog(
        { ...baseOpts, managementReadToken: "m", showcasePerOwner: 3 },
        {
          fetcher: async () => raw,
          usageFetcher: async () => [],
        }
      );
      for (let i = 0; i < 10; i++) assert.ok(collected.entries.has(`omniroute/cap/m-${i}`));
      assert.ok(!collected.entries.has("omniroute/cap/m-10"));
    });
  });

  it("keeps three recent entries per owner when set to three", async () => {
    await withFixedNow(async () => {
      const raw = await entriesThroughReader(rankedFresh("cap", 11));
      const collected = await collectCatalog(
        { ...baseOpts, managementReadToken: "m", freshPerOwner: 3 },
        {
          fetcher: async () => raw,
          usageFetcher: async () => [],
        }
      );
      for (let i = 0; i < 3; i++) assert.ok(collected.entries.has(`omniroute/cap/m-${i}`));
      assert.ok(!collected.entries.has("omniroute/cap/m-3"));
    });
  });

  it("leaves owners without dates on the showcase branch", async () => {
    await withFixedNow(async () => {
      const raw = await entriesThroughReader(crowd("plain", "plain/undated"));
      const collected = await collectCatalog(
        { ...baseOpts, managementReadToken: "m" },
        {
          fetcher: async () => raw,
          usageFetcher: async () => [],
        }
      );
      for (let i = 0; i < 10; i++) assert.ok(collected.entries.has(`omniroute/plain/filler-${i}`));
      assert.ok(!collected.entries.has("omniroute/plain/undated"));
    });
  });

  it("sentinel publishes everything regardless of the fresh cap", async () => {
    await withFixedNow(async () => {
      const raw = await entriesThroughReader(rankedFresh("cap", 11));
      const collected = await collectCatalog(
        { ...baseOpts, visibleModels: ["*"], freshPerOwner: 3 },
        {
          fetcher: async () => raw,
        }
      );
      for (let i = 0; i < 11; i++) assert.ok(collected.entries.has(`omniroute/cap/m-${i}`));
    });
  });
});

describe("showcase size option", () => {
  it("keeps three entries per owner when set to three", async () => {
    const raw = await entriesThroughReader([
      ...crowd("aaa", "aaa/target"),
      ...crowd("bbb", "bbb/target"),
    ]);
    const collected = await collectCatalog(
      { ...baseOpts, managementReadToken: "m", showcasePerOwner: 3 },
      {
        fetcher: async () => raw,
        usageFetcher: async () => [],
      }
    );
    for (const owner of ["aaa", "bbb"]) {
      for (let i = 0; i < 3; i++)
        assert.ok(collected.entries.has(`omniroute/${owner}/filler-${i}`));
      assert.ok(!collected.entries.has(`omniroute/${owner}/filler-3`));
      assert.ok(!collected.entries.has(`omniroute/${owner}/target`));
    }
  });

  it("keeps ten entries per owner when unset", async () => {
    const raw = await entriesThroughReader(crowd("aaa", "aaa/target"));
    const collected = await collectCatalog(
      { ...baseOpts, managementReadToken: "m" },
      {
        fetcher: async () => raw,
        usageFetcher: async () => [],
      }
    );
    for (let i = 0; i < 10; i++) assert.ok(collected.entries.has(`omniroute/aaa/filler-${i}`));
    assert.ok(!collected.entries.has("omniroute/aaa/target"));
  });

  it("zero on a direct call publishes the same set as unset", async () => {
    const raw = await entriesThroughReader(crowd("aaa", "aaa/target"));
    const fetchers = {
      fetcher: async () => raw,
      usageFetcher: async () => [] as string[],
    };
    const tokenOpts = { ...baseOpts, managementReadToken: "m" };
    const fallback = await collectCatalog(tokenOpts, fetchers);
    const zeroed = await collectCatalog({ ...tokenOpts, showcasePerOwner: 0 }, fetchers);
    assert.ok(fallback.entries.size > 0);
    assert.deepEqual([...zeroed.entries.keys()].sort(), [...fallback.entries.keys()].sort());
  });

  it("sentinel publishes everything regardless of the showcase size", async () => {
    const collected = await collectCatalog(
      { ...baseOpts, visibleModels: ["*"], showcasePerOwner: 3 },
      {
        fetcher: async () => crowd("aaa", "aaa/target") as unknown as OmniRouteRawModelEntry[],
      }
    );
    for (let i = 0; i < 10; i++) assert.ok(collected.entries.has(`omniroute/aaa/filler-${i}`));
    assert.ok(collected.entries.has("omniroute/aaa/target"));
  });
});

describe("freshness window in days", () => {
  it("excludes a 30-day-old entry under a seven-day window", async () => {
    await withFixedNow(async () => {
      // Five newer fillers push the target out of a small showcase (3) while
      // staying inside the fresh cap (10): only the freshness window decides.
      const fillers = Array.from({ length: 5 }, (_v, i) => ({
        id: `win/filler-${i}`,
        owned_by: "win",
        context_length: 100000,
        release_date: dated(1, FIXED_NOW),
      }));
      const raw = await entriesThroughReader([
        ...fillers,
        {
          id: "win/thirty-day",
          owned_by: "win",
          context_length: 1000,
          release_date: dated(30, FIXED_NOW),
        },
      ]);
      const collected = await collectCatalog(
        { ...baseOpts, managementReadToken: "m", showcasePerOwner: 3, freshWindowDays: 7 },
        {
          fetcher: async () => raw,
          usageFetcher: async () => [],
        }
      );
      assert.ok(collected.entries.has("omniroute/win/filler-0"));
      assert.ok(!collected.entries.has("omniroute/win/thirty-day"));
    });
  });

  it("keeps a 30-day-old entry under the default window", async () => {
    await withFixedNow(async () => {
      // Five newer fillers push the target out of a small showcase (3) while
      // staying inside the fresh cap (10): only the freshness window decides.
      const fillers = Array.from({ length: 5 }, (_v, i) => ({
        id: `win/filler-${i}`,
        owned_by: "win",
        context_length: 100000,
        release_date: dated(1, FIXED_NOW),
      }));
      const raw = await entriesThroughReader([
        ...fillers,
        {
          id: "win/thirty-day",
          owned_by: "win",
          context_length: 1000,
          release_date: dated(30, FIXED_NOW),
        },
      ]);
      const collected = await collectCatalog(
        { ...baseOpts, managementReadToken: "m", showcasePerOwner: 3 },
        {
          fetcher: async () => raw,
          usageFetcher: async () => [],
        }
      );
      assert.ok(collected.entries.has("omniroute/win/thirty-day"));
    });
  });

  it("keeps a 30-day-old entry under a wide window", async () => {
    await withFixedNow(async () => {
      // Five newer fillers push the target out of a small showcase (3) while
      // staying inside the fresh cap (10): only the freshness window decides.
      const fillers = Array.from({ length: 5 }, (_v, i) => ({
        id: `win/filler-${i}`,
        owned_by: "win",
        context_length: 100000,
        release_date: dated(1, FIXED_NOW),
      }));
      const raw = await entriesThroughReader([
        ...fillers,
        {
          id: "win/thirty-day",
          owned_by: "win",
          context_length: 1000,
          release_date: dated(30, FIXED_NOW),
        },
      ]);
      const collected = await collectCatalog(
        { ...baseOpts, managementReadToken: "m", showcasePerOwner: 3, freshWindowDays: 180 },
        {
          fetcher: async () => raw,
          usageFetcher: async () => [],
        }
      );
      assert.ok(collected.entries.has("omniroute/win/thirty-day"));
    });
  });

  it("falls back to the default window on a non-finite direct value", async () => {
    await withFixedNow(async () => {
      // Five newer fillers push the target out of a small showcase (3) while
      // staying inside the fresh cap (10): only the freshness window decides.
      const fillers = Array.from({ length: 5 }, (_v, i) => ({
        id: `win/filler-${i}`,
        owned_by: "win",
        context_length: 100000,
        release_date: dated(1, FIXED_NOW),
      }));
      const raw = await entriesThroughReader([
        ...fillers,
        {
          id: "win/thirty-day",
          owned_by: "win",
          context_length: 1000,
          release_date: dated(30, FIXED_NOW),
        },
      ]);
      // The schema rejects NaN; a direct caller outside it still gets the
      // default window instead of an empty fresh branch.
      const collected = await collectCatalog(
        {
          ...baseOpts,
          managementReadToken: "m",
          showcasePerOwner: 3,
          freshWindowDays: Number.NaN,
        },
        {
          fetcher: async () => raw,
          usageFetcher: async () => [],
        }
      );
      assert.ok(collected.entries.has("omniroute/win/thirty-day"));
    });
  });

  it("sentinel publishes everything under a narrow window", async () => {
    await withFixedNow(async () => {
      const raw = await entriesThroughReader([
        {
          id: "win/old",
          owned_by: "win",
          context_length: 1000,
          release_date: dated(30, FIXED_NOW),
        },
        {
          id: "win/older",
          owned_by: "win",
          context_length: 1000,
          release_date: dated(60, FIXED_NOW),
        },
      ]);
      const collected = await collectCatalog(
        { ...baseOpts, visibleModels: ["*"], freshWindowDays: 7 },
        {
          fetcher: async () => raw,
        }
      );
      assert.ok(collected.entries.has("omniroute/win/old"));
      assert.ok(collected.entries.has("omniroute/win/older"));
    });
  });
});
