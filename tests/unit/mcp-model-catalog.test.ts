import test from "node:test";
import assert from "node:assert/strict";

import { getMcpModelsCatalog } from "../../open-sse/mcp-server/server.ts";

test("getMcpModelsCatalog aggregates only active connection model endpoints", async () => {
  const calls: string[] = [];

  const result = await getMcpModelsCatalog(
    {},
    {
      listProviderConnections: async () => [
        { id: "conn-github", provider: "github", isActive: true },
        { id: "conn-codex", provider: "codex", isActive: false },
      ],
      fetchJson: async (path: string) => {
        calls.push(path);
        if (path === "/api/providers/conn-github/models?excludeHidden=true") {
          return {
            source: "api",
            models: [
              { id: "gpt-4.1", owned_by: "github", supportedEndpoints: ["chat"] },
              {
                id: "text-embedding-3-small",
                owned_by: "github",
                supportedEndpoints: ["embeddings"],
              },
            ],
          };
        }

        throw new Error(`Unexpected path: ${path}`);
      },
    }
  );

  assert.deepEqual(calls, ["/api/providers/conn-github/models?excludeHidden=true"]);
  assert.deepEqual(result, {
    models: [
      {
        id: "gpt-4.1",
        provider: "github",
        capabilities: ["chat"],
        status: "available",
        pricing: undefined,
      },
      {
        id: "text-embedding-3-small",
        provider: "github",
        capabilities: ["embedding"],
        status: "available",
        pricing: undefined,
      },
    ],
    source: "api",
  });
});

test("getMcpModelsCatalog exposes codex default thinking effort when no override is stored", async () => {
  const result = await getMcpModelsCatalog(
    { provider: "codex" },
    {
      listProviderConnections: async () => [
        {
          id: "conn-codex",
          provider: "codex",
          isActive: true,
          providerSpecificData: {},
        },
      ],
      fetchJson: async () => ({
        source: "api",
        models: [{ id: "gpt-5.5", owned_by: "codex", supportedEndpoints: ["chat"] }],
      }),
    }
  );

  assert.equal(result.models.length, 1);
  assert.equal(result.models[0]?.thinkingEffort, "medium");
});

test("getMcpModelsCatalog exposes stored thinking effort overrides", async () => {
  const result = await getMcpModelsCatalog(
    { provider: "chatgpt-web" },
    {
      listProviderConnections: async () => [
        {
          id: "conn-chatgpt",
          provider: "chatgpt-web",
          isActive: true,
          providerSpecificData: { thinkingEffort: "extended" },
        },
      ],
      fetchJson: async () => ({
        source: "api",
        models: [{ id: "gpt-5", owned_by: "chatgpt-web", supportedEndpoints: ["chat"] }],
      }),
    }
  );

  assert.equal(result.models.length, 1);
  assert.equal(result.models[0]?.thinkingEffort, "extended");
});

test("getMcpModelsCatalog resolves provider aliases to active connection ids", async () => {
  const calls: string[] = [];

  const result = await getMcpModelsCatalog(
    { provider: "gh", capability: "chat" },
    {
      listProviderConnections: async () => [
        { id: "conn-github", provider: "github", isActive: true },
        { id: "conn-codex", provider: "codex", isActive: true },
      ],
      fetchJson: async (path: string) => {
        calls.push(path);
        return {
          source: "api",
          models: [{ id: "gpt-4.1", owned_by: "github", supportedEndpoints: ["chat"] }],
        };
      },
    }
  );

  assert.deepEqual(calls, ["/api/providers/conn-github/models?excludeHidden=true"]);
  assert.equal(result.models.length, 1);
  assert.equal(result.models[0]?.provider, "github");
  assert.deepEqual(result.models[0]?.capabilities, ["chat"]);
});

test("getMcpModelsCatalog returns empty result when requested provider has no active connection", async () => {
  const result = await getMcpModelsCatalog(
    { provider: "github" },
    {
      listProviderConnections: async () => [{ id: "conn-codex", provider: "codex", isActive: true }],
      fetchJson: async () => {
        throw new Error("fetchJson should not be called without a matching active provider");
      },
    }
  );

  assert.deepEqual(result, {
    models: [],
    source: "provider_connections",
    warning: "No active connections found for provider 'github'.",
  });
});