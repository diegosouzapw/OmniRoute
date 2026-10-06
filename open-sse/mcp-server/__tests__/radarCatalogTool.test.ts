import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";

import { MCP_SCOPE_LIST, MCP_TOOL_SCOPES } from "../../../src/shared/constants/mcpScopes.ts";
import { evaluateToolScopes } from "../scopeEnforcement.ts";
import { getMcpRadarCatalog } from "../radarCatalog.ts";
import { MCP_ESSENTIAL_TOOLS, MCP_TOOL_MAP } from "../schemas/tools.ts";
import { createMcpServer } from "../server.ts";

vi.mock("../audit.ts", () => ({
  logToolCall: vi.fn().mockResolvedValue(undefined),
}));

const catalog = {
  entries: [
    {
      provider: "groq",
      modelId: "llama",
      displayName: "Llama on Groq",
      familyId: "llama-family",
      monthlyTokens: 200,
      creditTokens: 0,
      freeType: "recurring-daily",
      poolKey: null,
      tos: "ok",
      enabled: true,
      origin: "radar",
      capabilities: { tools: true, vision: false, thinking: false },
      limits: { rpm: 30, rpd: null, tpm: null, tpd: null },
      setup: { keyUrl: "https://secret.example/key", steps: ["do not expose"] },
    },
    {
      provider: "cerebras",
      modelId: "llama",
      displayName: "Llama on Cerebras",
      familyId: "llama-family",
      monthlyTokens: 300,
      creditTokens: 0,
      freeType: "recurring-daily",
      poolKey: null,
      tos: "ok",
      enabled: false,
      disabledBy: "radar",
      origin: "radar",
      capabilities: { tools: true, vision: false, thinking: true },
      limits: { rpm: null, rpd: 100, tpm: null, tpd: null },
    },
  ],
  meta: { version: "2026.08.08.1", tier: "community", fetchedAt: "2026-08-08T20:00:00Z" },
};

describe("omniroute_radar_catalog", () => {
  it("is a phase-1 read-only registry tool with the dedicated Radar scope", () => {
    const definition = MCP_TOOL_MAP.omniroute_radar_catalog;
    expect(definition).toBeDefined();
    expect(definition.phase).toBe(1);
    expect(definition.scopes).toEqual(["read:radar"]);
    expect(definition.auditLevel).toBe("none");
    expect(definition.sourceEndpoints).toEqual(["/api/radar/catalog"]);
    expect(MCP_ESSENTIAL_TOOLS).toContain(definition);
    expect(MCP_SCOPE_LIST).toContain("read:radar");
    expect(MCP_TOOL_SCOPES.omniroute_radar_catalog).toEqual(["read:radar"]);
  });

  it("reads only the local catalog and returns a closed filtered projection", async () => {
    const fetchJson = vi.fn().mockResolvedValue(catalog);
    const result = await getMcpRadarCatalog(
      { provider: "groq", familyId: "llama-family", enabledOnly: true },
      { fetchJson }
    );

    expect(fetchJson).toHaveBeenCalledOnce();
    expect(fetchJson).toHaveBeenCalledWith("/api/radar/catalog");
    expect(result.models).toHaveLength(1);
    expect(result.models[0]).toEqual({
      provider: "groq",
      modelId: "llama",
      displayName: "Llama on Groq",
      familyId: "llama-family",
      quota: {
        monthlyTokens: 200,
        creditTokens: 0,
        freeType: "recurring-daily",
        limits: { rpm: 30, rpd: null, tpm: null, tpd: null },
      },
      capabilities: { tools: true, vision: false, thinking: false },
      enabled: true,
      origin: "radar",
      disabledBy: null,
    });
    expect(JSON.stringify(result)).not.toContain("secret.example");
    expect(JSON.stringify(result)).not.toContain("setup");
  });

  it("defaults enabledOnly to true and includes disabled models only when explicitly requested", async () => {
    const fetchJson = vi.fn().mockResolvedValue(catalog);
    expect((await getMcpRadarCatalog({}, { fetchJson })).models).toHaveLength(1);
    expect((await getMcpRadarCatalog({ enabledOnly: false }, { fetchJson })).models).toHaveLength(
      2
    );
  });

  it("allows read:radar and read:* but denies a missing scope when enforcement is active", () => {
    expect(evaluateToolScopes("omniroute_radar_catalog", ["read:radar"], true).allowed).toBe(true);
    expect(evaluateToolScopes("omniroute_radar_catalog", ["read:*"], true).allowed).toBe(true);
    expect(evaluateToolScopes("omniroute_radar_catalog", [], true)).toMatchObject({
      allowed: false,
      reason: "missing_scopes",
      missing: ["read:radar"],
    });
  });
});

describe("omniroute_radar_catalog MCP dispatch", () => {
  const mockFetch = vi.fn();
  let client: Client;

  beforeEach(async () => {
    mockFetch.mockReset();
    vi.stubGlobal("fetch", mockFetch);
    const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
    const server = createMcpServer();
    await server.connect(serverTransport);
    client = new Client({ name: "radar-catalog-test", version: "1.0.0" });
    await client.connect(clientTransport);
  });

  afterEach(async () => {
    await client.close();
    vi.unstubAllGlobals();
  });

  it("registers and dispatches a real read without sync or write", async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => catalog });

    const listed = await client.listTools();
    expect(listed.tools.some((tool) => tool.name === "omniroute_radar_catalog")).toBe(true);

    const result = await client.callTool({
      name: "omniroute_radar_catalog",
      arguments: { enabledOnly: false },
    });
    expect(result.isError).toBeFalsy();
    expect(mockFetch).toHaveBeenCalledOnce();
    expect(mockFetch.mock.calls[0][0]).toContain("/api/radar/catalog");
    expect(mockFetch.mock.calls[0][1]).not.toMatchObject({ method: "POST" });
    const body = JSON.parse((result.content[0] as { text: string }).text);
    expect(body.models).toHaveLength(2);
  });
});
