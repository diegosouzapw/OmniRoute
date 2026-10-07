/**
 * Unit tests for MCP Essential Tools (Phase 1)
 *
 * Tests the essential tool handlers via the tool handler functions.
 * The omniroute_web_search tests use InMemoryTransport + Client to exercise
 * the actual registered handler (not mockFetch directly).
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { MCP_ESSENTIAL_TOOLS } from "../schemas/tools";
import { createMcpServer } from "../server";

// Mock fetch globally
const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

describe("MCP Essential Tools", () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  describe("Tool schema validation", () => {
    it("should have exactly 14 essential tools (including Radar catalog + x_search)", () => {
      // 13 -> 14: #10985 shipped omniroute_x_search as a phase-1 tool.
      const schemas = MCP_ESSENTIAL_TOOLS;
      expect(schemas).toHaveLength(14);
    });

    it("all tools should have omniroute_ prefix", () => {
      const schemas = MCP_ESSENTIAL_TOOLS;
      for (const schema of schemas) {
        expect(schema.name).toMatch(/^omniroute_/);
      }
    });
  });

  describe("get_health handler", () => {
    it("should return health data when API is available", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ status: "healthy", uptime: 1000, circuitBreakers: [] }),
      });

      const response = await mockFetch("http://localhost:20128/api/monitoring/health");
      const data = await response.json();
      expect(data.status).toBe("healthy");
      expect(data).toHaveProperty("uptime");
    });

    it("should handle API failure gracefully", async () => {
      mockFetch.mockRejectedValueOnce(new Error("Connection refused"));
      await expect(mockFetch("http://localhost:20128/api/monitoring/health")).rejects.toThrow();
    });
  });

  describe("check_quota handler", () => {
    it("should return quota data for all providers", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          providers: [
            { provider: "anthropic", quotaUsed: 50, quotaTotal: 100 },
            { provider: "google", quotaUsed: 20, quotaTotal: 200 },
          ],
        }),
      });

      const response = await mockFetch("http://localhost:20128/api/usage/quota");
      const data = await response.json();
      expect(data.providers).toHaveLength(2);
      expect(data.providers[0].provider).toBe("anthropic");
    });

    it("should filter by provider when specified", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          providers: [{ provider: "anthropic", quotaUsed: 50, quotaTotal: 100 }],
        }),
      });

      const response = await mockFetch("http://localhost:20128/api/usage/quota?provider=anthropic");
      const data = await response.json();
      expect(data.providers).toHaveLength(1);
    });
  });

  describe("list_combos handler", () => {
    it("should return array of combos", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => [
          { id: "combo-1", name: "Fast Coding", enabled: true },
          { id: "combo-2", name: "Cost Saver", enabled: false },
        ],
      });

      const response = await mockFetch("http://localhost:20128/api/combos");
      const data = await response.json();
      expect(Array.isArray(data)).toBe(true);
      expect(data[0]).toHaveProperty("id");
      expect(data[0]).toHaveProperty("name");
    });
  });

  describe("route_request handler", () => {
    it("should proxy chat completion request", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          choices: [{ message: { content: "Hello!" } }],
          model: "claude-sonnet",
          provider: "anthropic",
        }),
      });

      const response = await mockFetch("http://localhost:20128/v1/chat/completions", {
        method: "POST",
        body: JSON.stringify({ model: "auto", messages: [{ role: "user", content: "hi" }] }),
      });
      const data = await response.json();
      expect(data.choices[0].message.content).toBe("Hello!");
    });
  });

  describe("cost_report handler", () => {
    it("should return cost analytics", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          totalCost: 0.05,
          requestCount: 10,
          period: "session",
        }),
      });

      const response = await mockFetch("http://localhost:20128/api/usage/analytics?period=session");
      const data = await response.json();
      expect(data).toHaveProperty("totalCost");
      expect(data).toHaveProperty("requestCount");
    });
  });
});

// ── omniroute_web_search: handler dispatch tests ──────────────────────────────
// These tests use InMemoryTransport + Client to exercise the actual registered
// handler (not mockFetch directly), ensuring real handler coverage.

vi.mock("../audit.ts", () => ({
  logToolCall: vi.fn().mockResolvedValue(undefined),
}));

describe("omniroute_web_search handler (via MCP dispatch)", () => {
  let client: Client;

  beforeEach(async () => {
    mockFetch.mockReset();

    const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
    const server = createMcpServer();
    await server.connect(serverTransport);
    client = new Client({ name: "test-client", version: "1.0.0" });
    await client.connect(clientTransport);
  });

  afterEach(async () => {
    await client.close();
  });

  it("should appear in tools/list after registration", async () => {
    const { tools } = await client.listTools();
    const webSearch = tools.find((t) => t.name === "omniroute_web_search");
    expect(webSearch).toBeDefined();
    expect(webSearch?.description).toContain("web search");
  });

  it("should return search results on success", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        id: "search-123",
        provider: "serper-search",
        query: "typescript best practices",
        results: [
          {
            title: "TypeScript Best Practices 2024",
            url: "https://example.com/ts-best",
            display_url: "https://example.com/ts-best",
            snippet: "Best practices for TypeScript development...",
            position: 1,
          },
        ],
        cached: false,
        usage: { queries_used: 1, search_cost_usd: 0.002 },
      }),
    });

    const result = await client.callTool({
      name: "omniroute_web_search",
      arguments: { query: "typescript best practices" },
    });

    expect(result.isError).toBeFalsy();
    const content = result.content[0] as { type: string; text: string };
    const data = JSON.parse(content.text);
    expect(data.results).toHaveLength(1);
    expect(data.results[0].title).toBe("TypeScript Best Practices 2024");
    expect(data.provider).toBe("serper-search");
  });

  it("should POST to /v1/search with correct body fields", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        id: "s1",
        provider: "brave-search",
        query: "react hooks tutorial",
        results: [],
        cached: false,
        usage: { queries_used: 1, search_cost_usd: 0.003 },
      }),
    });

    await client.callTool({
      name: "omniroute_web_search",
      arguments: {
        query: "react hooks tutorial",
        max_results: 10,
        search_type: "news",
        provider: "brave-search",
      },
    });

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/v1/search"),
      expect.objectContaining({ method: "POST" })
    );
    const [, options] = mockFetch.mock.calls[0];
    const body = JSON.parse(options.body as string);
    expect(body.query).toBe("react hooks tutorial");
    expect(body.max_results).toBe(10);
    expect(body.search_type).toBe("news");
    expect(body.provider).toBe("brave-search");
  });

  it("should omit provider from POST body when not specified", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        id: "s2",
        provider: "serper-search",
        query: "test query",
        results: [],
        cached: false,
        usage: { queries_used: 1, search_cost_usd: 0 },
      }),
    });

    await client.callTool({
      name: "omniroute_web_search",
      arguments: { query: "test query" },
    });

    const [, options] = mockFetch.mock.calls[0];
    const body = JSON.parse(options.body as string);
    expect(body).not.toHaveProperty("provider");
  });

  it("should return isError on backend non-OK response", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      text: async () => "Internal server error",
    });

    const result = await client.callTool({
      name: "omniroute_web_search",
      arguments: { query: "test" },
    });

    expect(result.isError).toBe(true);
    const content = result.content[0] as { type: string; text: string };
    expect(content.text).toContain("Error");
  });

  it("should return isError on fetch abort/timeout", async () => {
    mockFetch.mockRejectedValueOnce(new DOMException("signal timed out", "TimeoutError"));

    const result = await client.callTool({
      name: "omniroute_web_search",
      arguments: { query: "test" },
    });

    expect(result.isError).toBe(true);
  });
});

describe("omniroute_x_search handler (via MCP dispatch)", () => {
  let client: Client;

  beforeEach(async () => {
    mockFetch.mockReset();

    const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
    const server = createMcpServer();
    await server.connect(serverTransport);
    client = new Client({ name: "test-client", version: "1.0.0" });
    await client.connect(clientTransport);
  });

  afterEach(async () => {
    await client.close();
  });

  it("should appear in tools/list after registration", async () => {
    const { tools } = await client.listTools();
    const xSearch = tools.find((t) => t.name === "omniroute_x_search");
    expect(xSearch).toBeDefined();
    expect(xSearch?.description).toMatch(/X \(Twitter\)/i);
  });

  it("should POST to /v1/search with provider x-search and search_type x", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        id: "xs1",
        provider: "x-search",
        query: "SuperGrok",
        results: [
          {
            title: "@xai",
            url: "https://x.com/xai/status/1",
            snippet: "Cited SuperGrok discussion.",
            position: 1,
          },
        ],
        cached: false,
        usage: { queries_used: 1, search_cost_usd: 0 },
      }),
    });

    const result = await client.callTool({
      name: "omniroute_x_search",
      arguments: { query: "SuperGrok", max_results: 5 },
    });

    expect(result.isError).toBeFalsy();
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/v1/search"),
      expect.objectContaining({ method: "POST" })
    );
    const [, options] = mockFetch.mock.calls[0];
    const body = JSON.parse(options.body as string);
    expect(body.query).toBe("SuperGrok");
    expect(body.max_results).toBe(5);
    expect(body.search_type).toBe("x");
    expect(body.provider).toBe("x-search");
  });

  it("should route an explicit Xquik search through xquik-search", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        id: "xs2",
        provider: "xquik-search",
        query: "agents sdk",
        results: [
          {
            title: "@openai",
            url: "https://x.com/openai/status/1912345678901234567",
            snippet: "Agents SDK update",
            position: 1,
          },
        ],
        cached: false,
        usage: { queries_used: 1, search_cost_usd: 0.00015 },
      }),
    });

    const result = await client.callTool({
      name: "omniroute_x_search",
      arguments: { query: "agents sdk", max_results: 5, provider: "xquik-search" },
    });

    expect(result.isError).toBeFalsy();
    const [, options] = mockFetch.mock.calls[0];
    const body = JSON.parse(options.body as string);
    expect(body.search_type).toBe("x");
    expect(body.provider).toBe("xquik-search");
  });
});

// ── omniroute_get_health: handler dispatch tests ──────────────────────────────
// These tests use InMemoryTransport + Client to exercise the actual registered
// handler (not mockFetch directly), so they catch the real bug the original
// mock-only tests above (lines 39-56) could never catch: process.uptime()
// returns a *number*, and a naive toString() guard silently discards it.

describe("omniroute_get_health handler (via MCP dispatch)", () => {
  let client: Client;

  beforeEach(async () => {
    mockFetch.mockReset();

    const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
    const server = createMcpServer();
    await server.connect(serverTransport);
    client = new Client({ name: "test-client", version: "1.0.0" });
    await client.connect(clientTransport);
  });

  afterEach(async () => {
    await client.close();
  });

  function mockHealthSources(opts: {
    health?: unknown;
    healthError?: Error;
    resilience?: unknown;
    resilienceError?: Error;
    rateLimits?: unknown;
    rateLimitsError?: Error;
  }) {
    mockFetch.mockImplementation(async (url: string) => {
      if (url.includes("/api/monitoring/health")) {
        if (opts.healthError) throw opts.healthError;
        return { ok: true, json: async () => opts.health ?? {} };
      }
      if (url.includes("/api/resilience")) {
        if (opts.resilienceError) throw opts.resilienceError;
        return { ok: true, json: async () => opts.resilience ?? {} };
      }
      if (url.includes("/api/rate-limits")) {
        if (opts.rateLimitsError) throw opts.rateLimitsError;
        return { ok: true, json: async () => opts.rateLimits ?? {} };
      }
      throw new Error(`unexpected fetch: ${url}`);
    });
  }

  it("should render a real numeric uptime as a string, not fall back to unknown", async () => {
    mockHealthSources({
      health: {
        uptime: 4731.9817064,
        version: "3.8.50",
        memoryUsage: { heapUsed: 746337096, heapTotal: 765358080 },
      },
      resilience: { circuitBreakers: [] },
      rateLimits: { limits: [] },
    });

    const result = await client.callTool({ name: "omniroute_get_health", arguments: {} });

    expect(result.isError).toBeFalsy();
    const content = result.content as Array<{ type: string; text: string }>;
    const data = JSON.parse(content[0].text);
    expect(data.uptime).toBe("4731.9817064");
    expect(data.version).toBe("3.8.50");
  });

  it("should surface a degraded entry when one source fetch fails, instead of silently faking success", async () => {
    mockHealthSources({
      health: { uptime: 100, version: "3.8.50" },
      resilience: { circuitBreakers: [] },
      rateLimitsError: new Error("connect ECONNREFUSED 127.0.0.1:20128"),
    });

    const result = await client.callTool({ name: "omniroute_get_health", arguments: {} });

    expect(result.isError).toBeFalsy();
    const content = result.content as Array<{ type: string; text: string }>;
    const data = JSON.parse(content[0].text);
    // The two healthy sources still come through untouched.
    expect(data.uptime).toBe("100");
    expect(data.rateLimits).toEqual([]);
    // But the failure is visible instead of being indistinguishable from "no rate limits".
    expect(Array.isArray(data.degraded)).toBe(true);
    expect(data.degraded).toHaveLength(1);
    expect(data.degraded[0].source).toBe("rateLimits");
    expect(data.degraded[0].error).toContain("ECONNREFUSED");
  });

  it("should omit degraded entirely when every source succeeds", async () => {
    mockHealthSources({
      health: { uptime: 1, version: "3.8.50" },
      resilience: { circuitBreakers: [] },
      rateLimits: { limits: [] },
    });

    const result = await client.callTool({ name: "omniroute_get_health", arguments: {} });

    const content = result.content as Array<{ type: string; text: string }>;
    const data = JSON.parse(content[0].text);
    expect(data.degraded).toBeUndefined();
  });

  it("should surface the curated adaptive-admission lane block when health carries it", async () => {
    mockHealthSources({
      health: {
        uptime: 100,
        version: "3.8.50",
        adaptiveAdmission: {
          virtualLanes: true,
          pressure: "high",
          utilization: 0.72,
          laneCount: 3,
          laneQueuedCount: 12,
          laneQueuedCost: 340,
          laneTenants: [
            { tenantKey: "lane-a", queuedCount: 6, queuedCost: 200 },
            { tenantKey: "lane-b", queuedCount: 4, queuedCost: 90 },
            { tenantKey: "lane-c", queuedCount: 2, queuedCost: 50 },
          ],
          admittedCount: 900,
          rejectedCount: 7,
          wouldRejectCount: 3,
          shutdown: false,
        },
      },
      resilience: { circuitBreakers: [] },
      rateLimits: { limits: [] },
    });

    const result = await client.callTool({ name: "omniroute_get_health", arguments: {} });

    expect(result.isError).toBeFalsy();
    const content = result.content as Array<{ type: string; text: string }>;
    const data = JSON.parse(content[0].text);
    expect(data.adaptiveAdmission.virtualLanes).toBe(true);
    expect(data.adaptiveAdmission.pressure).toBe("high");
    expect(data.adaptiveAdmission.utilization).toBe(0.72);
    expect(data.adaptiveAdmission.laneTenants).toHaveLength(3);
    expect(data.adaptiveAdmission.laneTenants[0]).toEqual({
      tenantKey: "lane-a",
      queuedCount: 6,
      queuedCost: 200,
    });
    expect(data.adaptiveAdmission.admittedCount).toBe(900);
    expect(data.adaptiveAdmission.rejectedCount).toBe(7);
    expect(data.adaptiveAdmission.wouldRejectCount).toBe(3);
    expect(data.adaptiveAdmission.shutdown).toBe(false);
  });

  it("should coerce string lane flags and malformed lane entries defensively", async () => {
    mockHealthSources({
      health: {
        uptime: 1,
        version: "x",
        adaptiveAdmission: {
          virtualLanes: "true",
          shutdown: "false",
          laneTenants: ["garbage", { tenantKey: "ok", queuedCount: 2, queuedCost: 7 }],
        },
      },
      resilience: {},
      rateLimits: {},
    });

    const result = await client.callTool({ name: "omniroute_get_health", arguments: {} });

    const content = result.content as Array<{ type: string; text: string }>;
    const data = JSON.parse(content[0].text);
    // "true" string counts as on; "false" string must NOT invert to on.
    expect(data.adaptiveAdmission.virtualLanes).toBe(true);
    expect(data.adaptiveAdmission.shutdown).toBe(false);
    // Malformed entries degrade to zeroed records instead of throwing.
    expect(data.adaptiveAdmission.laneTenants).toEqual([
      { tenantKey: "ok", queuedCount: 2, queuedCost: 7 },
      { tenantKey: "", queuedCount: 0, queuedCost: 0 },
    ]);
  });

  it("should cap laneTenants at the top 10 by queued cost", async () => {
    const laneTenants = Array.from({ length: 12 }, (_, i) => ({
      tenantKey: `tenant-${i}`,
      queuedCount: i,
      queuedCost: i * 10,
    }));
    mockHealthSources({
      health: {
        uptime: 1,
        version: "x",
        adaptiveAdmission: { virtualLanes: true, laneTenants },
      },
      resilience: {},
      rateLimits: {},
    });

    const result = await client.callTool({ name: "omniroute_get_health", arguments: {} });

    const content = result.content as Array<{ type: string; text: string }>;
    const data = JSON.parse(content[0].text);
    expect(data.adaptiveAdmission.laneTenants).toHaveLength(10);
    // Highest queued cost first, lowest dropped from the cap.
    expect(data.adaptiveAdmission.laneTenants[0].tenantKey).toBe("tenant-11");
    expect(data.adaptiveAdmission.laneTenants[9].tenantKey).toBe("tenant-2");
  });

  it("should omit adaptiveAdmission entirely when the health payload has none", async () => {
    mockHealthSources({
      health: { uptime: 1, version: "x" },
      resilience: { circuitBreakers: [] },
      rateLimits: { limits: [] },
    });

    const result = await client.callTool({ name: "omniroute_get_health", arguments: {} });

    const content = result.content as Array<{ type: string; text: string }>;
    const data = JSON.parse(content[0].text);
    expect(data).not.toHaveProperty("adaptiveAdmission");
  });
});
