import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { createMcpServer } from "../server.ts";
import { MCP_TOOL_MAP, dbHealthCheckInput } from "../schemas/tools.ts";

const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

const mockRunManagedDbHealthCheck = vi.hoisted(() => vi.fn());

vi.mock("../audit.ts", () => ({
  logToolCall: vi.fn().mockResolvedValue(undefined),
}));

vi.mock("../../../src/lib/db/core.ts", () => ({
  runManagedDbHealthCheck: mockRunManagedDbHealthCheck,
}));

describe("omniroute_db_health_check MCP tool", () => {
  let client: Client;

  beforeEach(async () => {
    mockFetch.mockReset();
    mockRunManagedDbHealthCheck.mockReset();
    mockRunManagedDbHealthCheck.mockReturnValue({
      isHealthy: false,
      issues: [{ type: "broken_reference", table: "combos", description: "broken", count: 1 }],
      repairedCount: 1,
      backupCreated: true,
      autoRepair: true,
      checkedAt: new Date().toISOString(),
    });
    const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
    const server = createMcpServer();
    await server.connect(serverTransport);
    client = new Client({ name: "test-client", version: "1.0.0" });
    await client.connect(clientTransport);
  });

  afterEach(async () => {
    await client.close();
  });

  it("is registered in the MCP tool map", () => {
    expect(MCP_TOOL_MAP["omniroute_db_health_check"]).toBeDefined();
    expect(MCP_TOOL_MAP["omniroute_db_health_check"]?.phase).toBe(2);
  });

  it("validates empty input and explicit autoRepair requests", () => {
    expect(dbHealthCheckInput.safeParse({}).success).toBe(true);
    expect(dbHealthCheckInput.safeParse({ autoRepair: true }).success).toBe(true);
    expect(dbHealthCheckInput.safeParse({ autoRepair: "yes" }).success).toBe(false);
  });

  it("runs the database repair flow directly when autoRepair=true", async () => {
    const result = await client.callTool({
      name: "omniroute_db_health_check",
      arguments: { autoRepair: true },
    });

    expect(result.isError).toBeFalsy();
    expect(mockFetch).not.toHaveBeenCalled();
    expect(mockRunManagedDbHealthCheck).toHaveBeenCalledWith({ autoRepair: true });

    const content = result.content[0] as { type: string; text: string };
    const payload = JSON.parse(content.text);
    expect(payload.autoRepair).toBe(true);
    expect(payload.repairedCount).toBe(1);
    expect(payload.backupCreated).toBe(true);
  });
});
