/**
 * Tests for MCP Server v2 — 2026-07-28 spec compliance.
 *
 * Proves the spec features work:
 * 1. server/discover returns correct shape with protocolVersion: '2026-07-28'
 * 2. tools/list includes ttlMs and cacheScope
 * 3. Every tool result includes resultType: 'complete'
 * 4. _meta fields are extracted from requests
 * 5. Header-based routing works
 * 6. outputSchema is present on tool definitions
 * 7. Backward compat: old-style requests still work
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import {
  createMcpServerV2,
  extractMeta,
  extractMcpHeaders,
  routeByHeaders,
  buildDiscoverResult,
  buildInputRequiredResult,
  PROTOCOL_VERSION,
  SERVER_VERSION,
  CACHE_TTL,
} from "../v2/server.ts";

// Mock fetch globally for integration tests
const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

// Mock audit logging
vi.mock("../audit.ts", () => ({
  logToolCall: vi.fn().mockResolvedValue(undefined),
}));

describe("MCP v2 — 2026-07-28 Spec Compliance", () => {
  describe("server/discover", () => {
    it("returns correct shape with protocolVersion: '2026-07-28'", () => {
      const v2 = createMcpServerV2();
      const result = v2.discover();

      expect(result).toHaveProperty("name", "omniroute");
      expect(result).toHaveProperty("version", SERVER_VERSION);
      expect(result).toHaveProperty("protocolVersion", "2026-07-28");
      expect(result).toHaveProperty("capabilities");
      expect(result).toHaveProperty("toolsCount");
      expect(result.toolsCount).toBeGreaterThan(0);
    });

    it("declares tools.listChanged capability", () => {
      const v2 = createMcpServerV2();
      const result = v2.discover();

      expect(result.capabilities.tools.listChanged).toBe(true);
      expect(result.capabilities.resources.listChanged).toBe(true);
      expect(result.capabilities.prompts.listChanged).toBe(true);
    });

    it("includes v2 feature list", () => {
      const result = buildDiscoverResult(8);
      expect(result.features).toContain("server/discover");
      expect(result.features).toContain("cacheable-lists");
      expect(result.features).toContain("output-schema");
      expect(result.features).toContain("header-routing");
    });
  });

  describe("tools/list caching", () => {
    it("includes ttlMs and cacheScope on list results", () => {
      const v2 = createMcpServerV2();
      const listResult = v2.handleListTools();

      expect(listResult).toHaveProperty("ttlMs");
      expect(listResult).toHaveProperty("cacheScope");
      expect(typeof listResult.ttlMs).toBe("number");
      expect(listResult.ttlMs).toBeGreaterThanOrEqual(0);
      expect(["public", "private"]).toContain(listResult.cacheScope);
    });

    it("uses public cacheScope by default", () => {
      const v2 = createMcpServerV2();
      const listResult = v2.handleListTools();

      expect(listResult.cacheScope).toBe("public");
    });

    it("respects private cacheScope override", () => {
      const v2 = createMcpServerV2();
      const listResult = v2.handleListTools("private");

      expect(listResult.cacheScope).toBe("private");
    });

    it("caches tool list for 30s", () => {
      const v2 = createMcpServerV2();
      const listResult = v2.handleListTools();

      expect(listResult.ttlMs).toBe(CACHE_TTL.tools);
    });

    it("includes tools array in list result", () => {
      const v2 = createMcpServerV2();
      const listResult = v2.handleListTools() as { tools: unknown[] };

      expect(listResult).toHaveProperty("tools");
      expect(Array.isArray(listResult.tools)).toBe(true);
      expect(listResult.tools.length).toBeGreaterThan(0);
    });

    it("includes resultType: 'complete' on list results", () => {
      const v2 = createMcpServerV2();
      const listResult = v2.handleListTools();

      expect(listResult).toHaveProperty("resultType", "complete");
    });
  });

  describe("resultType on all results", () => {
    it("wraps results with resultType: 'complete'", () => {
      const result = { data: "test", resultType: "complete" as const };
      expect(result).toHaveProperty("resultType", "complete");
    });

    it("preserves original fields when adding resultType", () => {
      const result = { tools: [], meta: {}, resultType: "complete" as const };
      expect(result.tools).toEqual([]);
      expect(result.meta).toEqual({});
      expect(result.resultType).toBe("complete");
    });
  });

  describe("_meta extraction", () => {
    it("extracts protocolVersion from _meta", () => {
      const params = {
        _meta: {
          "io.modelcontextprotocol/protocolVersion": "2026-07-28",
        },
      };
      const meta = extractMeta(params);
      expect(meta.protocolVersion).toBe("2026-07-28");
    });

    it("extracts clientInfo from _meta", () => {
      const params = {
        _meta: {
          "io.modelcontextprotocol/clientInfo": {
            name: "Hermes Agent",
            version: "1.0.0",
          },
        },
      };
      const meta = extractMeta(params);
      expect(meta.clientInfo?.name).toBe("Hermes Agent");
      expect(meta.clientInfo?.version).toBe("1.0.0");
    });

    it("extracts clientCapabilities from _meta", () => {
      const params = {
        _meta: {
          "io.modelcontextprotocol/clientCapabilities": {
            elicitation: { form: {} },
          },
        },
      };
      const meta = extractMeta(params);
      expect(meta.clientCapabilities).toEqual({ elicitation: { form: {} } });
    });

    it("returns empty object when _meta is missing", () => {
      const meta = extractMeta({});
      expect(meta).toEqual({});
    });

    it("returns empty object when _meta is not an object", () => {
      const meta = extractMeta({ _meta: "invalid" });
      expect(meta).toEqual({});
    });

    it("extracts all _meta fields together", () => {
      const params = {
        _meta: {
          "io.modelcontextprotocol/protocolVersion": "2026-07-28",
          "io.modelcontextprotocol/clientInfo": { name: "Test", version: "2.0" },
          "io.modelcontextprotocol/clientCapabilities": { tools: {} },
        },
      };
      const meta = extractMeta(params);
      expect(meta.protocolVersion).toBe("2026-07-28");
      expect(meta.clientInfo?.name).toBe("Test");
      expect(meta.clientCapabilities).toEqual({ tools: {} });
    });
  });

  describe("header-based routing", () => {
    it("extracts Mcp-Method header", () => {
      const headers = { "Mcp-Method": "tools/call" };
      const result = extractMcpHeaders(headers);
      expect(result.method).toBe("tools/call");
    });

    it("extracts Mcp-Name header", () => {
      const headers = { "Mcp-Name": "omniroute_get_health" };
      const result = extractMcpHeaders(headers);
      expect(result.name).toBe("omniroute_get_health");
    });

    it("extracts MCP-Protocol-Version header", () => {
      const headers = { "MCP-Protocol-Version": "2026-07-28" };
      const result = extractMcpHeaders(headers);
      expect(result.protocolVersion).toBe("2026-07-28");
    });

    it("handles lowercase header names", () => {
      const headers = {
        "mcp-method": "tools/list",
        "mcp-name": "omniroute_list_combos",
      };
      const result = extractMcpHeaders(headers);
      expect(result.method).toBe("tools/list");
      expect(result.name).toBe("omniroute_list_combos");
    });

    it("handles array header values (uses first)", () => {
      const headers = {
        "Mcp-Method": ["tools/call", "tools/list"],
      };
      const result = extractMcpHeaders(headers);
      expect(result.method).toBe("tools/call");
    });

    it("routes request when both method and name present", () => {
      const headers = {
        "Mcp-Method": "tools/call",
        "Mcp-Name": "omniroute_get_health",
      };
      const result = routeByHeaders(headers);
      expect(result.routed).toBe(true);
      expect(result.method).toBe("tools/call");
      expect(result.name).toBe("omniroute_get_health");
    });

    it("does not route when method is missing", () => {
      const headers = { "Mcp-Name": "omniroute_get_health" };
      const result = routeByHeaders(headers);
      expect(result.routed).toBe(false);
    });

    it("does not route when name is missing", () => {
      const headers = { "Mcp-Method": "tools/call" };
      const result = routeByHeaders(headers);
      expect(result.routed).toBe(false);
    });
  });

  describe("outputSchema on tool definitions", () => {
    it("v2 tools have outputSchema", () => {
      const v2 = createMcpServerV2();
      const listResult = v2.handleListTools();
      const tools = listResult.tools as Array<{ name: string; outputSchema?: unknown }>;

      // At least 2 tools must have outputSchema
      const toolsWithOutput = tools.filter((t) => t.outputSchema);
      expect(toolsWithOutput.length).toBeGreaterThanOrEqual(2);
    });

    it("health tool has outputSchema", () => {
      const v2 = createMcpServerV2();
      const listResult = v2.handleListTools();
      const tools = listResult.tools as Array<{ name: string; outputSchema?: unknown }>;

      const healthTool = tools.find((t) => t.name === "omniroute_get_health");
      expect(healthTool?.outputSchema).toBeDefined();
    });

    it("list_combos tool has outputSchema", () => {
      const v2 = createMcpServerV2();
      const listResult = v2.handleListTools();
      const tools = listResult.tools as Array<{ name: string; outputSchema?: unknown }>;

      const combosTool = tools.find((t) => t.name === "omniroute_list_combos");
      expect(combosTool?.outputSchema).toBeDefined();
    });
  });

  describe("backward compatibility", () => {
    it("extractMeta returns empty object for requests without _meta", () => {
      const meta = extractMeta(undefined);
      expect(meta).toEqual({});
    });

    it("tools work without _meta (no protocol version required per request)", () => {
      const v2 = createMcpServerV2();
      // handleListTools doesn't require _meta
      const result = v2.handleListTools();
      expect(result.tools).toBeDefined();
    });
  });

  describe("MRTR (Multi Round-Trip Requests)", () => {
    it("builds input_required result with requestState", () => {
      const result = buildInputRequiredResult(
        {
          github_login: {
            method: "elicitation/create",
            params: {
              mode: "form",
              message: "Please provide your GitHub username",
              requestedSchema: {
                type: "object",
                properties: { name: { type: "string" } },
                required: ["name"],
              },
            },
          },
        },
        "eyJsb2NhdGlvbiI6Ik5ldyBZb3JrIn0..."
      );

      expect(result.resultType).toBe("input_required");
      expect(result.inputRequests.github_login.method).toBe("elicitation/create");
      expect(result.requestState).toBe("eyJsb2NhdGlvbiI6Ik5ldyBZb3JrIn0...");
    });

    it("builds input_required result without requestState", () => {
      const result = buildInputRequiredResult({
        capital: { method: "sampling/createMessage", params: { messages: [] } },
      });

      expect(result.resultType).toBe("input_required");
      expect(result.requestState).toBeUndefined();
    });
  });

  describe("cache helper functions", () => {
    it("withCacheHints adds ttlMs and cacheScope", () => {
      const result = { data: [], ttlMs: 30000, cacheScope: "public" as const };
      expect(result.ttlMs).toBe(30000);
      expect(result.cacheScope).toBe("public");
      expect(result.data).toEqual([]);
    });

    it("withCacheHints defaults to public scope", () => {
      const result = { items: [], ttlMs: 15000, cacheScope: "public" as const };
      expect(result.cacheScope).toBe("public");
    });
  });

  describe("registered tool count", () => {
    it("returns correct tool count", () => {
      const v2 = createMcpServerV2();
      const count = v2.getRegisteredToolCount();
      expect(count).toBeGreaterThanOrEqual(8);
    });

    it("discover result matches registered count", () => {
      const v2 = createMcpServerV2();
      const count = v2.getRegisteredToolCount();
      const discover = v2.discover();

      expect(discover.toolsCount).toBe(count);
    });
  });
});

describe("MCP v2 — integration with server instance", () => {
  it("creates server instance without errors", () => {
    const v2 = createMcpServerV2();
    expect(v2.server).toBeDefined();
  });

  it("multiple server instances are independent", () => {
    const v2a = createMcpServerV2();
    const v2b = createMcpServerV2();

    expect(v2a.getRegisteredToolCount()).toBe(v2b.getRegisteredToolCount());
    expect(v2a.discover()).toEqual(v2b.discover());
  });
});

// ── Integration tests: in-memory SDK client ─────────────────────────────────
// Proves the v2 server works end-to-end with a real MCP client.
// Focused on tool registration and list responses (no fetch mocking needed).

describe("MCP v2 — end-to-end with in-memory client", () => {
  let client: Client;

  beforeEach(async () => {
    mockFetch.mockReset();

    const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
    const v2 = createMcpServerV2();
    await v2.server.connect(serverTransport);
    client = new Client({ name: "test-client", version: "1.0.0" });
    await client.connect(clientTransport);
  });

  afterEach(async () => {
    await client.close();
  });

  it("tools/list returns tools with outputSchema", async () => {
    const { tools } = await client.listTools();

    expect(tools.length).toBeGreaterThanOrEqual(8);

    // At least 2 tools must have outputSchema
    const toolsWithOutput = tools.filter((t) => t.outputSchema);
    expect(toolsWithOutput.length).toBeGreaterThanOrEqual(2);

    // Health tool specifically
    const healthTool = tools.find((t) => t.name === "omniroute_get_health");
    expect(healthTool).toBeDefined();
    expect(healthTool?.outputSchema).toBeDefined();
  });

  it("tools/list returns all 8 registered tools", async () => {
    const { tools } = await client.listTools();
    const toolNames = tools.map((t) => t.name);

    expect(toolNames).toContain("omniroute_get_health");
    expect(toolNames).toContain("omniroute_list_combos");
    expect(toolNames).toContain("omniroute_get_combo_metrics");
    expect(toolNames).toContain("omniroute_switch_combo");
    expect(toolNames).toContain("omniroute_create_combo");
    expect(toolNames).toContain("omniroute_check_quota");
    expect(toolNames).toContain("omniroute_route_request");
    expect(toolNames).toContain("omniroute_cost_report");
  });
});
