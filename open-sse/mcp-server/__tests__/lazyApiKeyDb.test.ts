import { describe, expect, it, vi } from "vitest";

// Regression guard for #15819: the MCP caller-identity / HTTP auth path must not
// load the API-key DB module (and the auth stack that drags SQLite migrations in)
// until a request actually presents an API key. The mock factories below run only
// when the module is first imported, so `loaded` records *when* each import happens.
const loaded = vi.hoisted(() => ({ apiKeysDb: 0, auth: 0 }));

vi.mock("../../../src/lib/db/apiKeys.ts", () => {
  loaded.apiKeysDb += 1;
  return {
    getApiKeyMetadata: vi.fn(async (rawKey: string) =>
      rawKey === "valid-key" ? { id: 42, scopes: ["read:health"] } : null
    ),
  };
});

vi.mock("../../../src/sse/services/auth.ts", () => {
  loaded.auth += 1;
  return {
    extractApiKey: (request: { headers: Headers }) => {
      const header = request.headers.get("authorization") || "";
      return header.toLowerCase().startsWith("bearer ") ? header.slice(7).trim() : null;
    },
    isValidApiKey: vi.fn(async (rawKey: string) => rawKey === "valid-key"),
  };
});

describe("MCP API-key DB lookup is lazy (#15819)", () => {
  it("does not import the API-key DB or auth modules until a key is presented", async () => {
    const { resolvePrincipalFromHeaders } = await import("../mcpCallerIdentity.ts");
    const { resolveMcpCallerAuthInfo } = await import("../httpAuthContext.ts");

    // Importing the MCP auth modules alone must not touch the DB stack.
    expect(loaded).toEqual({ apiKeysDb: 0, auth: 0 });

    // Unauthenticated requests resolve to "no principal" without loading it either.
    await expect(resolvePrincipalFromHeaders({})).resolves.toBeUndefined();
    await expect(
      resolveMcpCallerAuthInfo(new Request("http://localhost/api/mcp/stream"))
    ).resolves.toBeUndefined();
    expect(loaded).toEqual({ apiKeysDb: 0, auth: 0 });

    // Presenting a key loads the lookup on demand and still resolves the caller.
    await expect(resolvePrincipalFromHeaders({ Authorization: "Bearer valid-key" })).resolves.toBe(
      "42"
    );
    await expect(
      resolveMcpCallerAuthInfo(
        new Request("http://localhost/api/mcp/stream", {
          headers: { Authorization: "Bearer valid-key" },
        })
      )
    ).resolves.toEqual({ token: "valid-key", clientId: "42", scopes: ["read:health"] });
    expect(loaded).toEqual({ apiKeysDb: 1, auth: 1 });
  });
});
