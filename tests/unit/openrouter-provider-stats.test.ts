/**
 * Unit tests for src/lib/catalog/openrouterProviderStats.ts
 *
 * Uses Node.js native test runner. All external fetch calls are mocked —
 * no network access, no database (this module is file-cache only).
 */

import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import {
  computeProviderPopularity,
  getOpenRouterProviderStats,
  refreshOpenRouterProviderStats,
} from "../../src/lib/catalog/openrouterProviderStats.ts";

const originalFetch = globalThis.fetch;
const originalDataDir = process.env.DATA_DIR;
const originalTtl = process.env.OPENROUTER_PROVIDER_STATS_TTL_MS;

function mockFetch(impl: (url: string) => Promise<Response>): void {
  globalThis.fetch = impl as typeof fetch;
}

function restoreFetch(): void {
  globalThis.fetch = originalFetch;
}

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function useTempDataDir(): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-or-provider-stats-test-"));
  process.env.DATA_DIR = dir;
  return dir;
}

describe("computeProviderPopularity (pure join/aggregation)", () => {
  it("sums usage across models for the same provider and ranks by total tokens desc", () => {
    const directory = [
      {
        slug: "deepinfra",
        displayName: "DeepInfra",
        headquarters: "US",
        dataPolicy: { training: false, retainsPrompts: false },
      },
      { slug: "cerebras", displayName: "Cerebras", headquarters: "US" },
    ];
    const catalog = [
      {
        permaslug: "deepseek/deepseek-v4-flash",
        endpoint: { variant: "standard", provider_slug: "deepinfra" },
      },
      {
        permaslug: "qwen/qwen3-max",
        endpoint: { variant: "standard", provider_slug: "deepinfra" },
      },
      {
        permaslug: "deepseek/deepseek-v4-flash",
        endpoint: { variant: "standard", provider_slug: "cerebras" },
      },
    ];
    const rankings = [
      {
        model_permaslug: "deepseek/deepseek-v4-flash",
        variant: "standard",
        total_prompt_tokens: 100,
        total_completion_tokens: 20,
        count: 5,
      },
      {
        model_permaslug: "qwen/qwen3-max",
        variant: "standard",
        total_prompt_tokens: 900,
        total_completion_tokens: 100,
        count: 50,
      },
    ];

    const result = computeProviderPopularity(directory, catalog, rankings);

    assert.equal(result.length, 2);
    // deepinfra: (100+20) + (900+100) = 1120 tokens across 2 models; cerebras: 120 tokens, 1 model
    assert.equal(result[0].slug, "deepinfra");
    assert.equal(result[0].totalTokens, 1120);
    assert.equal(result[0].totalRequests, 55);
    assert.equal(result[0].modelCount, 2);
    assert.equal(result[0].popularityRank, 1);
    assert.equal(result[0].displayName, "DeepInfra");
    assert.equal(result[0].dataPolicy?.training, false);

    assert.equal(result[1].slug, "cerebras");
    assert.equal(result[1].totalTokens, 120);
    assert.equal(result[1].popularityRank, 2);
  });

  it("counts a model with no matching ranking row (zero usage) without crashing", () => {
    const catalog = [
      { permaslug: "unknown/model", endpoint: { variant: "standard", provider_slug: "novita" } },
    ];
    const result = computeProviderPopularity([], catalog, []);

    assert.equal(result.length, 1);
    assert.equal(result[0].slug, "novita");
    assert.equal(result[0].modelCount, 1);
    assert.equal(result[0].totalTokens, 0);
    assert.equal(result[0].totalRequests, 0);
  });

  it("falls back to the provider slug as displayName when no directory entry matches", () => {
    const catalog = [
      { permaslug: "m/1", endpoint: { variant: "standard", provider_slug: "some-new-provider" } },
    ];
    const result = computeProviderPopularity([], catalog, []);

    assert.equal(result[0].displayName, "some-new-provider");
    assert.equal(result[0].headquarters, undefined);
  });

  it("returns an empty array for empty inputs", () => {
    assert.deepEqual(computeProviderPopularity([], [], []), []);
  });
});

describe("getOpenRouterProviderStats / refreshOpenRouterProviderStats (cache + TTL + stale-if-error)", () => {
  let tempDir: string;

  beforeEach(() => {
    tempDir = useTempDataDir();
    process.env.OPENROUTER_PROVIDER_STATS_TTL_MS = String(24 * 60 * 60 * 1000);
  });

  afterEach(() => {
    restoreFetch();
    fs.rmSync(tempDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    if (originalDataDir === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = originalDataDir;
    if (originalTtl === undefined) delete process.env.OPENROUTER_PROVIDER_STATS_TTL_MS;
    else process.env.OPENROUTER_PROVIDER_STATS_TTL_MS = originalTtl;
  });

  it("fetches fresh data on first call and writes it to the on-disk cache", async () => {
    mockFetch(async (url: string) => {
      if (url.includes("all-providers")) {
        return jsonResponse({ data: [{ slug: "deepinfra", displayName: "DeepInfra" }] });
      }
      if (url.includes("catalog/models")) {
        return jsonResponse({
          data: [
            { permaslug: "m/1", endpoint: { variant: "standard", provider_slug: "deepinfra" } },
          ],
        });
      }
      if (url.includes("rankings/models")) {
        return jsonResponse({
          data: [
            {
              model_permaslug: "m/1",
              variant: "standard",
              total_prompt_tokens: 10,
              total_completion_tokens: 5,
              count: 1,
            },
          ],
        });
      }
      throw new Error(`Unexpected URL: ${url}`);
    });

    const result = await getOpenRouterProviderStats();

    assert.equal(result.fromCache, false);
    assert.equal(result.stale, false);
    assert.equal(result.data.length, 1);
    assert.equal(result.data[0].slug, "deepinfra");
    assert.equal(result.data[0].totalTokens, 15);

    const cachePath = path.join(tempDir, "cache", "openrouter-provider-stats.json");
    assert.equal(fs.existsSync(cachePath), true);
  });

  it("serves from cache within the TTL without calling fetch again", async () => {
    let fetchCalls = 0;
    mockFetch(async (url: string) => {
      fetchCalls += 1;
      if (url.includes("all-providers")) return jsonResponse({ data: [] });
      if (url.includes("catalog/models")) return jsonResponse({ data: [] });
      return jsonResponse({ data: [] });
    });

    await getOpenRouterProviderStats();
    const callsAfterFirst = fetchCalls;
    const second = await getOpenRouterProviderStats();

    assert.equal(fetchCalls, callsAfterFirst); // no new fetch calls
    assert.equal(second.fromCache, true);
    assert.equal(second.stale, false);
  });

  it("falls back to stale cache when the refresh fetch fails", async () => {
    mockFetch(async (url: string) => {
      if (url.includes("all-providers"))
        return jsonResponse({ data: [{ slug: "cerebras", displayName: "Cerebras" }] });
      if (url.includes("catalog/models")) return jsonResponse({ data: [] });
      return jsonResponse({ data: [] });
    });
    await getOpenRouterProviderStats();

    mockFetch(async () => {
      throw new Error("network down");
    });
    const result = await refreshOpenRouterProviderStats();

    assert.equal(result.ok, false);
    assert.equal(typeof result.error, "string");
  });

  it("returns empty data (not a throw) when there is no cache and the fetch fails", async () => {
    mockFetch(async () => {
      throw new Error("network down");
    });

    const result = await getOpenRouterProviderStats();

    assert.equal(result.data.length, 0);
    assert.equal(result.stale, true);
  });
});
