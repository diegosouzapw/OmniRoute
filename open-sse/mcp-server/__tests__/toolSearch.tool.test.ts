import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { createMcpServer } from "../server.ts";

vi.mock("../audit.ts", () => ({
  logToolCall: vi.fn().mockResolvedValue(undefined),
  closeAuditDb: vi.fn(),
}));

describe("omniroute_tool_search", () => {
  let client: Client;

  beforeEach(async () => {
    const [ct, st] = InMemoryTransport.createLinkedPair();
    const server = createMcpServer();
    await server.connect(st);
    client = new Client({ name: "t", version: "1.0.0" });
    await client.connect(ct);
  });

  afterEach(async () => {
    await client.close();
  });

  it("appears in tools/list with read:tools scope", async () => {
    const { tools } = await client.listTools();
    expect(tools.find((t) => t.name === "omniroute_tool_search")).toBeTruthy();
  });

  it("returns relevant tool with a signature, not itself", async () => {
    const res = await client.callTool({ name: "omniroute_tool_search", arguments: { query: "health" } });
    const text = (res.content as Array<{ text: string }>)[0].text;
    const parsed = JSON.parse(text);
    expect(parsed.tools.some((t: any) => t.name === "omniroute_get_health")).toBe(true);
    expect(parsed.tools.every((t: any) => t.name !== "omniroute_tool_search")).toBe(true);
    expect(typeof parsed.tools[0].signature).toBe("string");
  });
});
