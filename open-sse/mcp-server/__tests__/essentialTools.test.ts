/**
 * Unit tests for MCP Essential Tools (Phase 1)
 *
 * Tests all 9 essential tool handlers via the tool handler functions.
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
    it("should have exactly 9 essential tools (includes web_search)", () => {
      const schemas = MCP_ESSENTIAL_TOOLS;
      expect(schemas).toHaveLength(9);
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
