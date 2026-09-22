import test from "node:test";
import assert from "node:assert/strict";

import { getMcpModelsCatalog } from "../../open-sse/mcp-server/server.ts";
import { listModelsCatalogOutput } from "../../open-sse/mcp-server/schemas/tools.ts";

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
    mode: "models",
    total: 2,
    returned: 2,
    limit: 50,
    nextCursor: null,
    source: "api",
  });
});

test("getMcpModelsCatalog skips tool-only providers during aggregate discovery", async () => {
  const calls: string[] = [];

  const result = await getMcpModelsCatalog(
    {},
    {
      listProviderConnections: async () => [
        { id: "conn-tinyfish", provider: "tinyfish", isActive: true },
        { id: "conn-github", provider: "github", isActive: true },
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
  assert.equal(result.models[0]?.id, "gpt-4.1");
  assert.equal(result.providerFailures, undefined);
});

test("getMcpModelsCatalog isolates unavailable model providers during aggregate discovery", async () => {
  const result = await getMcpModelsCatalog(
    {},
    {
      listProviderConnections: async () => [
        { id: "conn-openai", provider: "openai", isActive: true },
        { id: "conn-github", provider: "github", isActive: true },
      ],
      fetchJson: async (path: string) => {
        if (path === "/api/providers/conn-openai/models?excludeHidden=true") {
          throw new Error("sensitive upstream failure details");
        }

        return {
          source: "api",
          models: [{ id: "gpt-4.1", owned_by: "github", supportedEndpoints: ["chat"] }],
        };
      },
    }
  );

  assert.equal(result.models.length, 1);
  assert.equal(result.models[0]?.id, "gpt-4.1");
  assert.deepEqual(result.providerFailures, [
    {
      provider: "openai",
      connectionId: "conn-openai",
      status: "unavailable",
    },
  ]);
  assert.equal(result.warning, "Provider 'openai' model catalog is unavailable.");
  assert.doesNotMatch(result.warning ?? "", /sensitive upstream failure details/);
  assert.equal(listModelsCatalogOutput.safeParse(result).success, true);
});

test("getMcpModelsCatalog rejects explicit tool-only provider requests before fetching", async () => {
  let fetchCalled = false;

  await assert.rejects(
    getMcpModelsCatalog(
      { provider: "tinyfish" },
      {
        listProviderConnections: async () => [
          { id: "conn-tinyfish", provider: "tinyfish", isActive: true },
        ],
        fetchJson: async () => {
          fetchCalled = true;
          return { models: [] };
        },
      }
    ),
    /does not expose a model catalog/
  );
  assert.equal(fetchCalled, false);
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

// #12776 — context_length must be carried through the MCP catalog projection
test("getMcpModelsCatalog includes context_length when present", async () => {
  const result = await getMcpModelsCatalog(
    {},
    {
      listProviderConnections: async () => [{ id: "conn-1", provider: "openai", isActive: true }],
      fetchJson: async () => ({
        source: "api",
        models: [
          { id: "gpt-4.1", owned_by: "openai", context_length: 1048576 },
          { id: "text-embedding-3-small", owned_by: "openai" },
        ],
      }),
    }
  );

  const gpt = result.models.find((m) => m.id === "gpt-4.1");
  const emb = result.models.find((m) => m.id === "text-embedding-3-small");

  assert.equal(gpt?.context_length, 1048576, "context_length carried from upstream");
  assert.equal(emb?.context_length, undefined, "omitted when upstream has no context_length");
});

test("getMcpModelsCatalog exposes stored thinking effort overrides", async () => {
  const result = await getMcpModelsCatalog(
    { provider: "gemini-web" },
    {
      listProviderConnections: async () => [
        {
          id: "conn-gemini-web",
          provider: "gemini-web",
          isActive: true,
          providerSpecificData: { thinkingEffort: "extended" },
        },
      ],
      fetchJson: async () => ({
        source: "api",
        models: [{ id: "gemini-3.1-pro", owned_by: "gemini-web", supportedEndpoints: ["chat"] }],
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
      listProviderConnections: async () => [
        { id: "conn-codex", provider: "codex", isActive: true },
      ],
      fetchJson: async () => {
        throw new Error("fetchJson should not be called without a matching active provider");
      },
    }
  );

  assert.deepEqual(result, {
    models: [],
    mode: "models",
    total: 0,
    returned: 0,
    limit: 50,
    nextCursor: null,
    source: "provider_connections",
    warning: "No active connections found for provider 'github'.",
  });
});

test("getMcpModelsCatalog returns deterministic pages with an explicit total and cursor", async () => {
  const fetchJson = async () => ({
    source: "api",
    models: [
      { id: "zulu", owned_by: "openai", supportedEndpoints: ["chat"] },
      { id: "alpha", owned_by: "openai", supportedEndpoints: ["chat"] },
      { id: "middle", owned_by: "openai", supportedEndpoints: ["chat"] },
    ],
  });
  const listProviderConnections = async () => [
    { id: "conn-openai", provider: "openai", isActive: true },
  ];

  const first = await getMcpModelsCatalog({ limit: 2 }, { fetchJson, listProviderConnections });
  assert.deepEqual(
    first.models.map((model) => model.id),
    ["alpha", "middle"]
  );
  assert.equal(first.total, 3);
  assert.equal(first.returned, 2);
  assert.equal(first.limit, 2);
  assert.match(first.nextCursor ?? "", /^v1\./);

  const second = await getMcpModelsCatalog(
    { limit: 2, cursor: first.nextCursor ?? undefined },
    {
      // A new model sorted before the cursor must not shift the next page boundary.
      fetchJson: async () => ({
        source: "api",
        models: [
          { id: "aardvark", owned_by: "openai", supportedEndpoints: ["chat"] },
          { id: "zulu", owned_by: "openai", supportedEndpoints: ["chat"] },
          { id: "alpha", owned_by: "openai", supportedEndpoints: ["chat"] },
          { id: "middle", owned_by: "openai", supportedEndpoints: ["chat"] },
        ],
      }),
      listProviderConnections,
    }
  );
  assert.deepEqual(
    second.models.map((model) => model.id),
    ["zulu"]
  );
  assert.equal(second.total, 4);
  assert.equal(second.returned, 1);
  assert.equal(second.nextCursor, null);
});

test("getMcpModelsCatalog bounds the default response for a ten-thousand-model catalog", async () => {
  const result = await getMcpModelsCatalog(
    {},
    {
      listProviderConnections: async () => [
        { id: "conn-openai", provider: "openai", isActive: true },
      ],
      fetchJson: async () => ({
        source: "api",
        models: Array.from({ length: 10_000 }, (_, index) => ({
          id: `model-${String(index).padStart(5, "0")}`,
          owned_by: "openai",
          supportedEndpoints: ["chat"],
        })),
      }),
    }
  );

  assert.equal(result.total, 10_000);
  assert.equal(result.limit, 50);
  assert.equal(result.returned, 50);
  assert.equal(result.models.length, 50);
  assert.match(result.nextCursor ?? "", /^v1\./);
  assert.equal(listModelsCatalogOutput.safeParse(result).success, true);
});

test("getMcpModelsCatalog applies provider, capability, and search filters before pagination", async () => {
  const calls: string[] = [];
  const result = await getMcpModelsCatalog(
    { provider: "openai", capability: "embedding", query: "SMALL", limit: 1 },
    {
      listProviderConnections: async () => [
        { id: "conn-openai", provider: "openai", isActive: true },
        { id: "conn-github", provider: "github", isActive: true },
      ],
      fetchJson: async (path: string) => {
        calls.push(path);
        return {
          source: "api",
          models: [
            {
              id: "text-embedding-3-large",
              owned_by: "openai",
              supportedEndpoints: ["embeddings"],
            },
            {
              id: "text-embedding-3-small",
              owned_by: "openai",
              supportedEndpoints: ["embeddings"],
            },
            {
              id: "text-embedding-small-legacy",
              owned_by: "openai",
              supportedEndpoints: ["embeddings"],
            },
            { id: "gpt-4.1-small", owned_by: "openai", supportedEndpoints: ["chat"] },
          ],
        };
      },
    }
  );

  assert.deepEqual(calls, ["/api/providers/conn-openai/models?excludeHidden=true"]);
  assert.deepEqual(
    result.models.map((model) => model.id),
    ["text-embedding-3-small"]
  );
  assert.equal(result.total, 2);
  assert.match(result.nextCursor ?? "", /^v1\./);

  const next = await getMcpModelsCatalog(
    {
      provider: "openai",
      capability: "embedding",
      query: "SMALL",
      limit: 1,
      cursor: result.nextCursor ?? undefined,
    },
    {
      listProviderConnections: async () => [
        { id: "conn-openai", provider: "openai", isActive: true },
      ],
      fetchJson: async () => ({
        source: "api",
        models: [
          {
            id: "text-embedding-small-legacy",
            owned_by: "openai",
            supportedEndpoints: ["embeddings"],
          },
          {
            id: "text-embedding-3-small",
            owned_by: "openai",
            supportedEndpoints: ["embeddings"],
          },
        ],
      }),
    }
  );
  assert.deepEqual(
    next.models.map((model) => model.id),
    ["text-embedding-small-legacy"]
  );
  assert.equal(next.total, 2);
  assert.equal(next.nextCursor, null);
});

test("getMcpModelsCatalog summary mode returns stable aggregate counts without model payloads", async () => {
  const result = await getMcpModelsCatalog(
    { mode: "summary", query: "openai" },
    {
      listProviderConnections: async () => [
        { id: "conn-openai", provider: "openai", isActive: true },
        { id: "conn-github", provider: "github", isActive: true },
      ],
      fetchJson: async (path: string) => {
        if (path.includes("conn-openai")) {
          return {
            source: "api",
            models: [
              {
                id: "omni",
                owned_by: "openai",
                capabilities: ["chat", "image", "image"],
              },
              { id: "embed", owned_by: "openai", supportedEndpoints: ["embeddings"] },
            ],
          };
        }
        return {
          source: "api",
          models: [{ id: "other", owned_by: "github", supportedEndpoints: ["chat"] }],
        };
      },
    }
  );

  assert.equal(result.mode, "summary");
  assert.equal(result.total, 2);
  assert.equal(result.returned, 0);
  assert.deepEqual(result.models, []);
  assert.equal(result.nextCursor, null);
  assert.deepEqual(result.summary, {
    byProvider: [{ provider: "openai", count: 2 }],
    byCapability: [
      { capability: "chat", count: 1 },
      { capability: "embedding", count: 1 },
      { capability: "image", count: 1 },
    ],
    byStatus: [{ status: "available", count: 2 }],
  });
  assert.equal(listModelsCatalogOutput.safeParse(result).success, true);
});

test("listModelsCatalogInput rejects invalid bounds and getMcpModelsCatalog rejects bad cursors", async () => {
  const { listModelsCatalogInput } = await import("../../open-sse/mcp-server/schemas/tools.ts");

  assert.equal(listModelsCatalogInput.safeParse({ limit: 0 }).success, false);
  assert.equal(listModelsCatalogInput.safeParse({ limit: 101 }).success, false);
  assert.equal(listModelsCatalogInput.safeParse({ limit: 1.5 }).success, false);
  assert.equal(listModelsCatalogInput.safeParse({ query: "   " }).success, false);
  assert.equal(listModelsCatalogInput.safeParse({ cursor: "not-a-cursor" }).success, false);

  let discoveryCalled = false;
  await assert.rejects(
    getMcpModelsCatalog(
      { limit: 101 },
      {
        listProviderConnections: async () => {
          discoveryCalled = true;
          return [];
        },
      }
    ),
    /between 1 and 100/
  );
  assert.equal(discoveryCalled, false);

  await assert.rejects(
    getMcpModelsCatalog(
      { cursor: "v1.bm90LWEtbnVtYmVy" },
      {
        listProviderConnections: async () => [],
        fetchJson: async () => ({ models: [] }),
      }
    ),
    /Invalid catalog cursor/
  );
});
