import { describe, expect, it, vi } from "vitest";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";

import { createMcpServer } from "../server.ts";
import {
  getMcpHttpAuthHeadersForInternalFetch,
  withMcpHttpAuthContext,
} from "../httpAuthContext.ts";

vi.mock("../audit.ts", () => ({
  logToolCall: vi.fn().mockResolvedValue(undefined),
}));

describe("MCP HTTP auth context", () => {
  it("forwards bearer and cookie credentials to in-process internal fetches", async () => {
    const request = new Request("http://localhost/api/mcp/stream", {
      headers: {
        Authorization: "Bearer manage-key",
        Cookie: "auth_token=session-token",
      },
    });

    const headers = await withMcpHttpAuthContext(request, async () =>
      getMcpHttpAuthHeadersForInternalFetch()
    );

    expect(headers).toEqual({
      Authorization: "Bearer manage-key",
      Cookie: "auth_token=session-token",
    });
  });

  it("forwards Anthropic-style x-api-key only with its contract header", async () => {
    const request = new Request("http://localhost/api/mcp/stream", {
      headers: {
        "x-api-key": "manage-key",
        "anthropic-version": "2023-06-01",
      },
    });

    const headers = await withMcpHttpAuthContext(request, async () =>
      getMcpHttpAuthHeadersForInternalFetch()
    );

    expect(headers).toEqual({
      "x-api-key": "manage-key",
      "anthropic-version": "2023-06-01",
    });
  });

  it("does not forward bare x-api-key without anthropic-version", async () => {
    const request = new Request("http://localhost/api/mcp/stream", {
      headers: { "x-api-key": "placeholder" },
    });

    const headers = await withMcpHttpAuthContext(request, async () =>
      getMcpHttpAuthHeadersForInternalFetch()
    );

    expect(headers).toEqual({});
  });

  it("does not leak auth context outside the wrapped request", async () => {
    const request = new Request("http://localhost/api/mcp/stream", {
      headers: { Authorization: "Bearer manage-key" },
    });

    await withMcpHttpAuthContext(request, async () => {
      expect(getMcpHttpAuthHeadersForInternalFetch()).toEqual({
        Authorization: "Bearer manage-key",
      });
    });

    expect(getMcpHttpAuthHeadersForInternalFetch()).toEqual({});
  });

  it("forwards request auth through registered core tools", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ combos: [] }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
    const server = createMcpServer();
    await server.connect(serverTransport);
    const client = new Client({ name: "test-client", version: "1.0.0" });
    await client.connect(clientTransport);

    try {
      const request = new Request("http://localhost/api/mcp/stream", {
        headers: { Authorization: "Bearer manage-key" },
      });
      await withMcpHttpAuthContext(request, () =>
        client.callTool({ name: "omniroute_list_combos", arguments: {} })
      );

      expect(fetchMock).toHaveBeenCalledWith(
        expect.stringContaining("/api/combos"),
        expect.objectContaining({
          headers: expect.objectContaining({ Authorization: "Bearer manage-key" }),
        })
      );
    } finally {
      await client.close();
      vi.unstubAllGlobals();
    }
  });

  it("forwards request auth through advanced tool apiFetch", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ entries: 2, hitRate: 0.5 }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
    const server = createMcpServer();
    await server.connect(serverTransport);
    const client = new Client({ name: "test-client", version: "1.0.0" });
    await client.connect(clientTransport);

    try {
      const request = new Request("http://localhost/api/mcp/stream", {
        headers: { Authorization: "Bearer manage-key" },
      });
      await withMcpHttpAuthContext(request, () =>
        client.callTool({ name: "omniroute_cache_stats", arguments: {} })
      );

      expect(fetchMock).toHaveBeenCalledWith(
        expect.stringContaining("/api/cache"),
        expect.objectContaining({
          headers: expect.objectContaining({ Authorization: "Bearer manage-key" }),
        })
      );
    } finally {
      await client.close();
      vi.unstubAllGlobals();
    }
  });
});
