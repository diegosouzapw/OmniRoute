import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import {
  MCP_TOOLS,
  MCP_TOOL_MAP,
  cacheStatsInput,
  cacheFlushInput,
  cacheStatsTool,
  cacheFlushTool,
} from "../schemas/tools.ts";
import { createMcpServer } from "../server.ts";

vi.mock("../audit.ts", () => ({
  logToolCall: vi.fn().mockResolvedValue(undefined),
  closeAuditDb: vi.fn(),
}));

describe("cache MCP tools", () => {
  it("should be registered in MCP_TOOLS and MCP_TOOL_MAP", () => {
    expect(MCP_TOOLS.find((tool) => tool.name === "omniroute_cache_stats")).toBeDefined();
    expect(MCP_TOOLS.find((tool) => tool.name === "omniroute_cache_flush")).toBeDefined();
    expect(MCP_TOOL_MAP.omniroute_cache_stats).toBeDefined();
    expect(MCP_TOOL_MAP.omniroute_cache_flush).toBeDefined();
  });

  it("should validate cache tool input schemas", () => {
    expect(cacheStatsInput.safeParse({}).success).toBe(true);
    expect(cacheFlushInput.safeParse({ model: "openai/gpt-4.1" }).success).toBe(true);
    expect(cacheFlushInput.safeParse({ signature: "sig_123" }).success).toBe(true);
  });

  it("should expose the correct cache scopes", () => {
    expect(cacheStatsTool.scopes).toContain("read:cache");
    expect(cacheFlushTool.scopes).toContain("write:cache");
  });
});

describe("cache MCP tools registration", () => {
  let client: Client;

  beforeEach(async () => {
    const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
    const server = createMcpServer();
    await server.connect(serverTransport);
    client = new Client({ name: "cache-tools-test", version: "1.0.0" });
    await client.connect(clientTransport);
  });

  afterEach(async () => {
    await client.close();
  });

  it("should appear in tools/list after registration", async () => {
    const { tools } = await client.listTools();
    const names = tools.map((tool) => tool.name);

    expect(names).toContain("omniroute_cache_stats");
    expect(names).toContain("omniroute_cache_flush");
    expect(tools.length).toBeGreaterThanOrEqual(29);
  });
});
