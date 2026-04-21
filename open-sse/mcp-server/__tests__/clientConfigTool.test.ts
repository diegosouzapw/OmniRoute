import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";

vi.mock("../audit.ts", () => ({
  logToolCall: vi.fn().mockResolvedValue(undefined),
  closeAuditDb: vi.fn(),
}));

import { createMcpServer } from "../server";

describe("omniroute_generate_client_config", () => {
  let client: Client;

  beforeEach(async () => {
    const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
    const server = createMcpServer();
    await server.connect(serverTransport);
    client = new Client({ name: "test-client", version: "1.0.0" });
    await client.connect(clientTransport);
  });

  afterEach(async () => {
    await client.close();
  });

  it("appears in tools/list", async () => {
    const { tools } = await client.listTools();
    const tool = tools.find((entry) => entry.name === "omniroute_generate_client_config");

    expect(tool).toBeDefined();
    expect(tool?.description).toContain("client config");
  });

  it("generates Hermes config with normalized OmniRoute API base", async () => {
    const result = await client.callTool({
      name: "omniroute_generate_client_config",
      arguments: {
        target: "hermes",
        baseUrl: "http://localhost:20128",
        apiKey: "sk-hermes",
        model: "glm/glm-4.5-air",
      },
    });

    expect(result.isError).toBeFalsy();

    const payload = JSON.parse((result.content[0] as { type: string; text: string }).text);
    const config = JSON.parse(payload.config);

    expect(payload.target).toBe("hermes");
    expect(payload.baseUrl).toBe("http://localhost:20128/api/v1");
    expect(payload.usesPlaceholderApiKey).toBe(false);
    expect(config).toEqual({
      api_base: "http://localhost:20128/api/v1",
      api_key: "sk-hermes",
      model: "glm/glm-4.5-air",
    });
  });

  it("generates OpenClaw config and falls back to a placeholder API key", async () => {
    const result = await client.callTool({
      name: "omniroute_generate_client_config",
      arguments: {
        target: "openclaw",
        model: "openai/gpt-4o-mini",
      },
    });

    expect(result.isError).toBeFalsy();

    const payload = JSON.parse((result.content[0] as { type: string; text: string }).text);
    const config = JSON.parse(payload.config);

    expect(payload.target).toBe("openclaw");
    expect(payload.baseUrl).toBe("http://localhost:20128/api/v1");
    expect(payload.usesPlaceholderApiKey).toBe(true);
    expect(config.agents.defaults.model.primary).toBe("omniroute/openai/gpt-4o-mini");
    expect(config.models.providers.omniroute).toEqual({
      baseUrl: "http://localhost:20128/api/v1",
      apiKey: "sk_omniroute",
      api: "openai-completions",
      models: [
        {
          id: "openai/gpt-4o-mini",
          name: "gpt-4o-mini",
        },
      ],
    });
  });
});
