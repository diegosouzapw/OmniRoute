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
 * branch (no dates, no tooling, no pinning) — the only way to be
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
      const raw = await entriesThroughReader(
        freshCrowd("fresh", "fresh/new-model", dated(10, FIXED_NOW), dated(2, FIXED_NOW))
      );
      const collected = await collectCatalog(
        { ...baseOpts, managementReadToken: "m" },
        {
          fetcher: async () => raw,
          combosFetcher: async () => [],
          usageFetcher: async () => [],
        }
      );
      assert.ok(collected.entries.has("omniroute/fresh/new-model"));
    });
  });

  it("model without dates falls back to other branches", async () => {
    await withFixedNow(async () => {
      const raw = await entriesThroughReader(crowd("plain", "plain/undated"));
      const collected = await collectCatalog(
        { ...baseOpts, managementReadToken: "m" },
        {
          fetcher: async () => raw,
          combosFetcher: async () => [],
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
          combosFetcher: async () => [],
          usageFetcher: async () => ["old-one"],
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
          [staleEntry("gone/dead"), staleEntry("zzz/kept")] as OmniRouteRawModelEntry[],
        combosFetcher: async () => [
          { id: "all-combo", models: [{ kind: "model", model: "zzz/kept" }] },
        ],
        autoCombosFetcher: async () => [{ id: "auto" }],
      }
    );
    assert.ok(collected.entries.has("omniroute/zzz/kept"));
    assert.ok(!collected.entries.has("omniroute/gone/dead"));
    assert.ok(collected.entries.has("omniroute/all-combo"));
    assert.ok(collected.entries.has("omniroute/auto"));
  });

  it("short pinned id keeps the prefixed model", async () => {
    const collected = await collectCatalog(
      { ...baseOpts, visibleModels: ["keep-me"] },
      {
        fetcher: async () =>
          [staleEntry("cc/keep-me"), staleEntry("cc/drop-me")] as OmniRouteRawModelEntry[],
        combosFetcher: async () => [],
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
          combosFetcher: async () => [],
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
          fetcher: async () => crowd("zzz", "zzz/old-one") as OmniRouteRawModelEntry[],
          combosFetcher: async () => [],
          usageFetcher: async () => {
            throw new Error("boom 500");
          },
        }
      );
      assert.ok(collected.entries.has("omniroute/zzz/old-one"));
    } finally {
      console.warn = origWarn;
    }
    assert.equal(warns.filter((w) => /usage fetch failed/.test(w)).length, 1);
  });

  it("missing token never calls the usage endpoint", async () => {
    let calls = 0;
    const collected = await collectCatalog(baseOpts, {
      fetcher: async () => crowd("zzz", "zzz/old-one") as OmniRouteRawModelEntry[],
      combosFetcher: async () => [],
      usageFetcher: async () => {
        calls += 1;
        return ["old-one"];
      },
    });
    assert.equal(calls, 0);
    assert.ok(collected.entries.has("omniroute/zzz/old-one"));
  });

  it("repeated refresh keeps a stable fingerprint", async () => {
    await withFixedNow(async () => {
      const raw = await entriesThroughReader(
        freshCrowd("fresh", "fresh/new-model", dated(10, FIXED_NOW), dated(2, FIXED_NOW))
      );
      const fetchers = {
        fetcher: async () => raw,
        combosFetcher: async () => [],
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
          ] as OmniRouteRawModelEntry[],
        combosFetcher: async () => [],
        usageFetcher: async () => used,
      }
    );
    assert.ok(!collected.entries.has("omniroute/zzz/used-59"));
    assert.ok(!collected.entries.has("omniroute/never/never"));
  });
});
