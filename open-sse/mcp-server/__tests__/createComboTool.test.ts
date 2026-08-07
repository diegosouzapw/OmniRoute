import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { MCP_TOOLS, MCP_TOOL_MAP, createComboInput, createComboTool } from "../schemas/tools.ts";
import { createMcpServer } from "../server.ts";

const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

const mockLogToolCall = vi.hoisted(() => vi.fn().mockResolvedValue(undefined));
vi.mock("../audit.ts", () => ({
  logToolCall: mockLogToolCall,
}));

describe("omniroute_create_combo MCP tool schema", () => {
  it("should be registered in MCP_TOOLS and MCP_TOOL_MAP", () => {
    const tool = MCP_TOOLS.find((t) => t.name === "omniroute_create_combo");
    expect(tool).toBeDefined();
    expect(MCP_TOOL_MAP["omniroute_create_combo"]).toBeDefined();
  });

  it("should require write:combos scope", () => {
    expect(createComboTool.scopes).toContain("write:combos");
  });

  it("should validate a minimal payload (name + models)", () => {
    const result = createComboInput.safeParse({
      name: "My Combo",
      models: [{ provider: "anthropic", model: "claude-sonnet" }],
    });
    expect(result.success).toBe(true);
  });

  it("should validate a full payload with description and strategy", () => {
    const result = createComboInput.safeParse({
      name: "My Combo",
      description: "A test combo",
      strategy: "priority",
      models: [
        { provider: "anthropic", model: "claude-sonnet" },
        { provider: "google", model: "gemini-pro" },
      ],
    });
    expect(result.success).toBe(true);
  });

  it("should reject a payload missing name", () => {
    const result = createComboInput.safeParse({
      models: [{ provider: "anthropic", model: "claude-sonnet" }],
    });
    expect(result.success).toBe(false);
  });

  it("should reject a payload with an empty models array", () => {
    const result = createComboInput.safeParse({ name: "My Combo", models: [] });
    expect(result.success).toBe(false);
  });

  it("should reject an unknown strategy value", () => {
    const result = createComboInput.safeParse({
      name: "My Combo",
      strategy: "not-a-real-strategy",
      models: [{ provider: "anthropic", model: "claude-sonnet" }],
    });
    expect(result.success).toBe(false);
  });
});

describe("omniroute_create_combo handler (via MCP dispatch)", () => {
  let client: Client;

  beforeEach(async () => {
    mockFetch.mockReset();
    mockLogToolCall.mockClear();

    const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
    const server = createMcpServer();
    await server.connect(serverTransport);
    client = new Client({ name: "create-combo-test", version: "1.0.0" });
    await client.connect(clientTransport);
  });

  afterEach(async () => {
    await client.close();
  });

  it("should appear in tools/list after registration", async () => {
    const { tools } = await client.listTools();
    const tool = tools.find((t) => t.name === "omniroute_create_combo");
    expect(tool).toBeDefined();
    expect(tool?.description).toContain("Registers new combo");
  });

  it("should POST to /api/combos and return the created combo on success", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        success: true,
        combo: { id: "combo-123", name: "My Combo", strategy: "priority", enabled: true },
      }),
    });

    const args = {
      name: "My Combo",
      models: [{ provider: "anthropic", model: "claude-sonnet" }],
    };

    const result = await client.callTool({ name: "omniroute_create_combo", arguments: args });

    expect(result.isError).toBeFalsy();
    const content = result.content[0] as { type: string; text: string };
    const data = JSON.parse(content.text);
    expect(data.success).toBe(true);
    expect(data.combo.id).toBe("combo-123");
    expect(data.combo.name).toBe("My Combo");

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/combos"),
      expect.objectContaining({ method: "POST" })
    );
    const [, options] = mockFetch.mock.calls[0];
    const body = JSON.parse(options.body as string);
    expect(body.name).toBe("My Combo");
    expect(body.models).toHaveLength(1);

    // Audit: the invocation must be logged to mcp_audit (via logToolCall).
    expect(mockLogToolCall).toHaveBeenCalledWith(
      "omniroute_create_combo",
      expect.objectContaining({ name: "My Combo" }),
      expect.objectContaining({ success: true }),
      expect.any(Number),
      true
    );
  });

  it("should pass through optional description and strategy fields", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        success: true,
        combo: { id: "combo-456", name: "Cost Saver", strategy: "cost-optimized", enabled: true },
      }),
    });

    await client.callTool({
      name: "omniroute_create_combo",
      arguments: {
        name: "Cost Saver",
        description: "Prefers cheaper models",
        strategy: "cost-optimized",
        models: [
          { provider: "anthropic", model: "claude-haiku" },
          { provider: "google", model: "gemini-flash" },
        ],
      },
    });

    const [, options] = mockFetch.mock.calls[0];
    const body = JSON.parse(options.body as string);
    expect(body.description).toBe("Prefers cheaper models");
    expect(body.strategy).toBe("cost-optimized");
    expect(body.models).toHaveLength(2);
  });

  it("should return isError and log the failure when the backend rejects the combo (e.g. name collision)", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 409,
      text: async () => "Combo name already exists",
    });

    const result = await client.callTool({
      name: "omniroute_create_combo",
      arguments: {
        name: "Duplicate Combo",
        models: [{ provider: "anthropic", model: "claude-sonnet" }],
      },
    });

    expect(result.isError).toBe(true);
    const content = result.content[0] as { type: string; text: string };
    expect(content.text).toContain("Error");

    expect(mockLogToolCall).toHaveBeenCalledWith(
      "omniroute_create_combo",
      expect.objectContaining({ name: "Duplicate Combo" }),
      null,
      expect.any(Number),
      false,
      expect.stringContaining("Combo name already exists")
    );
  });
});
