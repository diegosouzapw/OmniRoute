import { describe, it, expect } from "vitest";
import { createMcpServer } from "../server";
import { buildWebSearchInputSchema } from "../schemas/tools";
import { getActiveSearchProviders } from "../schemas/providerEnums";

interface ToolWithSchema {
  inputSchema: {
    safeParse: (arg: unknown) => { success: boolean };
  };
}

describe("MCP Dynamic Runtime Schema Plumbing", () => {
  it("getActiveSearchProviders excludes blocked providers dynamically by id or alias", () => {
    const allProviders = getActiveSearchProviders([]);
    expect(allProviders).toContain("serper-search");
    expect(allProviders).toContain("brave-search");

    const filteredProviders = getActiveSearchProviders(["serper", "brave"]);
    expect(filteredProviders).not.toContain("serper-search");
    expect(filteredProviders).not.toContain("brave-search");
    expect(filteredProviders.length).toBeGreaterThan(0);
  });

  it("buildWebSearchInputSchema excludes blocked providers from Zod enum", () => {
    const fullSchema = buildWebSearchInputSchema([]);
    const fullParsed = fullSchema.safeParse({ query: "test", provider: "serper-search" });
    expect(fullParsed.success).toBe(true);

    const blockedSchema = buildWebSearchInputSchema(["serper"]);
    const blockedParsed = blockedSchema.safeParse({ query: "test", provider: "serper-search" });
    expect(blockedParsed.success).toBe(false);
  });

  it("createMcpServer with blockedProviders option registers dynamic tool schema", async () => {
    const server = createMcpServer({ blockedProviders: ["serper", "brave"] });
    expect(server).toBeTruthy();

    const registeredTools = (
      server as unknown as { _registeredTools: Record<string, ToolWithSchema> }
    )._registeredTools;
    expect(registeredTools).toBeTruthy();

    const webSearchTool = registeredTools["omniroute_web_search"];
    expect(webSearchTool).toBeTruthy();

    const parsedWithUnblocked = webSearchTool.inputSchema.safeParse({
      query: "test",
      provider: "perplexity-search",
    });
    expect(parsedWithUnblocked.success).toBe(true);

    const parsedWithBlocked = webSearchTool.inputSchema.safeParse({
      query: "test",
      provider: "serper-search",
    });
    expect(parsedWithBlocked.success).toBe(false);
  });
});
