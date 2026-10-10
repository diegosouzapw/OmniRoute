import type { A2ATask } from "../../src/lib/a2a/taskManager.ts";

// Mock only the management HTTP boundary. A2A normalization, MCP registration,
// schemas, dispatch, internal fetch, and response serialization remain real.
export async function exerciseQuotaWiring(quotaStatus = 200) {
  const envKeys = [
    "OMNIROUTE_BASE_URL",
    "OMNIROUTE_API_KEY",
    "OMNIROUTE_MCP_SCOPES",
    "MCP_TOOL_ALLOW",
    "MCP_TOOL_DENY",
  ];
  const previousEnv = new Map(envKeys.map((key) => [key, process.env[key]]));
  process.env.OMNIROUTE_BASE_URL = "http://localhost:20128";
  process.env.OMNIROUTE_API_KEY = "quality-fixture-key";
  process.env.OMNIROUTE_MCP_SCOPES = "read:quota,read:health";
  delete process.env.MCP_TOOL_ALLOW;
  delete process.env.MCP_TOOL_DENY;

  const originalFetch = globalThis.fetch;
  const requests: string[] = [];
  const fixtureFetch: typeof fetch = async (input) => {
    const url = new URL(input instanceof Request ? input.url : String(input));
    if (url.origin !== "http://localhost:20128") throw new Error("unexpected external request");
    requests.push(url.pathname + url.search);
    let body: unknown;
    let status = 200;
    switch (url.pathname) {
      case "/api/usage/quota":
        status = quotaStatus;
        body = {
          providers: [
            {
              provider: "quota-fixture",
              name: "Quota Fixture",
              connectionId: "fixture-connection",
              quotaUsed: 20,
              quotaTotal: 100,
              percentRemaining: 80,
              tokenStatus: "valid",
              resetAt: "2026-10-11T00:00:00Z",
            },
          ],
        };
        break;
      case "/api/combos":
        body = { combos: [] };
        break;
      case "/api/monitoring/health":
        body = { circuitBreakers: [] };
        break;
      case "/api/usage/analytics":
        body = {};
        break;
      default:
        throw new Error(`unexpected management request: ${url.pathname}`);
    }
    return new Response(JSON.stringify(body), {
      status,
      headers: { "content-type": "application/json" },
    });
  };
  // Prevent import-time effects from reaching real endpoints, then re-assert the
  // boundary after imports that install OmniRoute's global fetch proxy patch.
  globalThis.fetch = fixtureFetch;
  let client: import("@modelcontextprotocol/sdk/client/index.js").Client | undefined;
  let server: import("@modelcontextprotocol/sdk/server/mcp.js").McpServer | undefined;
  let resetDb: (() => void) | undefined;
  let closeAudit: (() => boolean) | undefined;
  try {
    const { Client } = await import("@modelcontextprotocol/sdk/client/index.js");
    const { InMemoryTransport } = await import("@modelcontextprotocol/sdk/inMemory.js");
    const { createMcpServer } = await import("../../open-sse/mcp-server/server.ts");
    const { executeQuotaManagement } = await import("../../src/lib/a2a/skills/quotaManagement.ts");
    ({ resetDbInstance: resetDb } = await import("../../src/lib/db/core.ts"));
    ({ closeAuditDb: closeAudit } = await import("../../open-sse/mcp-server/audit.ts"));
    globalThis.fetch = fixtureFetch;

    const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
    server = createMcpServer();
    client = new Client({ name: "quota-wiring-test", version: "1.0.0" });
    await server.connect(serverTransport);
    await client.connect(clientTransport);
    const now = "2026-10-10T00:00:00Z";
    const task: A2ATask = {
      id: "quota-wiring",
      skill: "quota-management",
      state: "working",
      input: { skill: "quota-management", messages: [{ role: "user", content: "quota summary" }] },
      artifacts: [],
      events: [],
      metadata: {},
      createdAt: now,
      updatedAt: now,
      expiresAt: now,
    };
    const a2a = await executeQuotaManagement(task);
    const quota = await client.callTool({
      name: "omniroute_check_quota",
      arguments: { provider: "quota-fixture" },
    });
    const metrics = await client.callTool({
      name: "omniroute_get_provider_metrics",
      arguments: { provider: "quota-fixture" },
    });
    return { a2a, quota, metrics, requests };
  } finally {
    try {
      await client?.close();
    } finally {
      try {
        await server?.close();
      } finally {
        try {
          closeAudit?.();
        } finally {
          try {
            resetDb?.();
          } finally {
            globalThis.fetch = originalFetch;
            for (const [key, value] of previousEnv) {
              if (value === undefined) delete process.env[key];
              else process.env[key] = value;
            }
          }
        }
      }
    }
  }
}
