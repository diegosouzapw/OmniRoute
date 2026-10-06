import { describe, test, expect, beforeEach, afterEach, vi } from "vitest";
import { GenericMemoryBackend, createGenericMemoryBackend } from "../genericBackend";
import type { Memory } from "../types";
import { MemoryType } from "../types";

// ────────────────────────────────────────────────────────────
// GenericMemoryBackend — unit tests
// ────────────────────────────────────────────────────────────

const BASE_URL = "http://memory.test:8080";
const BACKEND_ID = "test-backend";
const BACKEND_NAME = "Test Backend";

const SAMPLE_MEMORY: Memory = {
  id: "mem-001",
  apiKeyId: "key-1",
  sessionId: "sess-1",
  type: MemoryType.FACTUAL,
  key: "my-key",
  content: "Hello world",
  metadata: { source: "test" },
  embedding: null,
  createdAt: new Date("2026-01-01T00:00:00.000Z"),
  updatedAt: new Date("2026-01-01T00:00:00.000Z"),
  lastAccessedAt: new Date("2026-01-01T00:00:00.000Z"),
  expiresAt: null,
};

const SAMPLE_MEMORY_JSON = {
  ...SAMPLE_MEMORY,
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
  lastAccessedAt: "2026-01-01T00:00:00.000Z",
};

function createBackend(configOverrides: Record<string, unknown> = {}) {
  return createGenericMemoryBackend(BACKEND_ID, BACKEND_NAME, {
    baseUrl: BASE_URL,
    ...configOverrides,
  });
}

describe("GenericMemoryBackend", () => {
  let backend: GenericMemoryBackend;

  beforeEach(() => {
    vi.resetAllMocks();
    backend = createBackend();
  });

  // ─── Constructor ─────────────────────────────────────────

  describe("constructor", () => {
    test("sets id and displayName from constructor args", () => {
      expect(backend.id).toBe(BACKEND_ID);
      expect(backend.displayName).toBe(BACKEND_NAME);
    });

    test("accepts custom timeout", () => {
      const b = createBackend({ timeout: 5000 });
      expect(b).toBeInstanceOf(GenericMemoryBackend);
    });
  });

  // ─── Health ──────────────────────────────────────────────

  describe("health()", () => {
    test("returns ok=true when backend responds 200", async () => {
      const fetchMock = vi
        .spyOn(globalThis, "fetch")
        .mockResolvedValue(new Response(JSON.stringify({ status: "ok" }), { status: 200 }));

      const result = await backend.health();

      expect(result.ok).toBe(true);
      expect(result.latencyMs).toBeGreaterThanOrEqual(0);
      expect(result.error).toBeUndefined();
      expect(fetchMock).toHaveBeenCalledWith(
        `${BASE_URL}/health`,
        expect.objectContaining({ method: "GET" })
      );
    });

    test("returns ok=false when backend responds 500", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValue(
        new Response("Internal error", { status: 500 })
      );

      const result = await backend.health();

      expect(result.ok).toBe(false);
      expect(result.error).toContain("HTTP 500");
    });

    test("returns ok=false on network failure", async () => {
      vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("ECONNREFUSED"));

      const result = await backend.health();

      expect(result.ok).toBe(false);
      expect(result.error).toContain("ECONNREFUSED");
    });

    test("reports latency in ms", async () => {
      const start = Date.now();
      vi.spyOn(globalThis, "fetch").mockImplementation(
        () =>
          new Promise((r) =>
            setTimeout(() => r(new Response(JSON.stringify({ status: "ok" }), { status: 200 })), 10)
          )
      );

      const result = await backend.health();

      expect(result.ok).toBe(true);
      expect(result.latencyMs).toBeGreaterThanOrEqual(5);
    });
  });

  // ─── Initialize ──────────────────────────────────────────

  describe("initialize()", () => {
    test("calls health and throws on failure", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("fail", { status: 503 }));

      await expect(backend.initialize()).rejects.toThrow("Cannot connect to Test Backend");
    });

    test("passes when health succeeds", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValue(
        new Response(JSON.stringify({ status: "ok" }), { status: 200 })
      );

      await expect(backend.initialize()).resolves.toBeUndefined();
    });
  });

  // ─── CRUD helpers ────────────────────────────────────────

  /**
   * Set up a mock that health-check endpoint returns 200 while
   * other endpoints return a custom response. This avoids the
   * initialize() health gate.
   */
  function mockHealthOkThen(secondResponse: Response) {
    let callCount = 0;
    return vi.spyOn(globalThis, "fetch").mockImplementation(async (url: string) => {
      callCount++;
      if (callCount === 1 && url.toString().endsWith("/health")) {
        return new Response(JSON.stringify({ status: "ok" }), { status: 200 });
      }
      return secondResponse;
    });
  }

  // ─── Create ──────────────────────────────────────────────

  describe("create()", () => {
    test("POSTs to /memories with input body", async () => {
      const fetchMock = vi.spyOn(globalThis, "fetch").mockImplementation(async (url: string) => {
        if (url.toString().endsWith("/health")) {
          return new Response(JSON.stringify({ status: "ok" }), { status: 200 });
        }
        return new Response(JSON.stringify(SAMPLE_MEMORY), { status: 200 });
      });

      const result = await backend.create({
        apiKeyId: "key-1",
        sessionId: "sess-1",
        type: MemoryType.FACTUAL,
        key: "my-key",
        content: "Hello world",
        metadata: {},
        expiresAt: null,
      });

      expect(result).toEqual(SAMPLE_MEMORY_JSON);
    });

    test("uses custom create endpoint when configured", async () => {
      const b = createBackend({ endpoints: { create: "/api/v1/mem" } });
      const fetchMock = vi.spyOn(globalThis, "fetch").mockImplementation(async (url: string) => {
        if (url.toString().endsWith("/health")) {
          return new Response(JSON.stringify({ status: "ok" }), { status: 200 });
        }
        return new Response(JSON.stringify(SAMPLE_MEMORY), { status: 200 });
      });

      await b.create({
        apiKeyId: "k1",
        sessionId: "s1",
        type: MemoryType.FACTUAL,
        key: "k",
        content: "c",
        metadata: {},
        expiresAt: null,
      });

      const createUrl = fetchMock.mock.calls.find(
        ([url]) => !url.toString().endsWith("/health")
      )![0] as string;
      expect(new URL(createUrl).pathname).toBe("/api/v1/mem");
    });
  });

  // ─── Get ─────────────────────────────────────────────────

  describe("get()", () => {
    test("GETs /memories/{id} and returns memory", async () => {
      const fetchMock = vi.spyOn(globalThis, "fetch").mockImplementation(async (url: string) => {
        if (url.toString().endsWith("/health")) {
          return new Response(JSON.stringify({ status: "ok" }), { status: 200 });
        }
        return new Response(JSON.stringify(SAMPLE_MEMORY), { status: 200 });
      });

      const result = await backend.get("mem-001");

      expect(result).toEqual(SAMPLE_MEMORY_JSON);
      const getUrl = fetchMock.mock.calls.find(
        ([url]) => !url.toString().endsWith("/health")
      )![0] as string;
      expect(new URL(getUrl).pathname).toBe("/memories/mem-001");
    });

    test("returns null on 404", async () => {
      vi.spyOn(globalThis, "fetch").mockImplementation(async (url: string) => {
        if (url.toString().endsWith("/health")) {
          return new Response(JSON.stringify({ status: "ok" }), { status: 200 });
        }
        return new Response("Not found", { status: 404 });
      });

      const result = await backend.get("mem-999");

      expect(result).toBeNull();
    });

    test("throws on non-404 errors", async () => {
      vi.spyOn(globalThis, "fetch").mockImplementation(async (url: string) => {
        if (url.toString().endsWith("/health")) {
          return new Response(JSON.stringify({ status: "ok" }), { status: 200 });
        }
        return new Response("Server error", { status: 500 });
      });

      await expect(backend.get("mem-001")).rejects.toThrow("HTTP 500");
    });

    test("uses custom get endpoint with path params", async () => {
      const b = createBackend({
        endpoints: { get: "/records/{memoryId}" },
        pathParams: { memoryId: "memoryId" },
      });
      const fetchMock = vi.spyOn(globalThis, "fetch").mockImplementation(async (url: string) => {
        if (url.toString().endsWith("/health")) {
          return new Response(JSON.stringify({ status: "ok" }), { status: 200 });
        }
        return new Response(JSON.stringify(SAMPLE_MEMORY), { status: 200 });
      });

      await b.get("mem-001");

      const getUrl = fetchMock.mock.calls.find(
        ([url]) => !url.toString().endsWith("/health")
      )![0] as string;
      expect(new URL(getUrl).pathname).toBe("/records/mem-001");
    });
  });

  // ─── Update ──────────────────────────────────────────────

  describe("update()", () => {
    test("PATCHes /memories/{id} with updates", async () => {
      const fetchMock = vi.spyOn(globalThis, "fetch").mockImplementation(async (url: string) => {
        if (url.toString().endsWith("/health")) {
          return new Response(JSON.stringify({ status: "ok" }), { status: 200 });
        }
        return new Response(null, { status: 204 });
      });

      const result = await backend.update("mem-001", { content: "updated" });

      expect(result).toBe(true);
      const updateUrl = fetchMock.mock.calls.find(
        ([url]) => !url.toString().endsWith("/health")
      )![0] as string;
      expect(new URL(updateUrl).pathname).toBe("/memories/mem-001");
    });

    test("returns false on 404", async () => {
      vi.spyOn(globalThis, "fetch").mockImplementation(async (url: string) => {
        if (url.toString().endsWith("/health")) {
          return new Response(JSON.stringify({ status: "ok" }), { status: 200 });
        }
        return new Response("Not found", { status: 404 });
      });

      const result = await backend.update("mem-999", { content: "x" });

      expect(result).toBe(false);
    });
  });

  // ─── Delete ──────────────────────────────────────────────

  describe("delete()", () => {
    test("DELETEs /memories/{id}", async () => {
      const fetchMock = vi.spyOn(globalThis, "fetch").mockImplementation(async (url: string) => {
        if (url.toString().endsWith("/health")) {
          return new Response(JSON.stringify({ status: "ok" }), { status: 200 });
        }
        return new Response(null, { status: 204 });
      });

      const result = await backend.delete("mem-001");

      expect(result).toBe(true);
      const delUrl = fetchMock.mock.calls.find(
        ([url]) => !url.toString().endsWith("/health")
      )![0] as string;
      expect(new URL(delUrl).pathname).toBe("/memories/mem-001");
    });

    test("returns false on 404", async () => {
      vi.spyOn(globalThis, "fetch").mockImplementation(async (url: string) => {
        if (url.toString().endsWith("/health")) {
          return new Response(JSON.stringify({ status: "ok" }), { status: 200 });
        }
        return new Response("Not found", { status: 404 });
      });

      const result = await backend.delete("mem-999");

      expect(result).toBe(false);
    });
  });

  // ─── List ────────────────────────────────────────────────

  describe("list()", () => {
    test("GETs /memories with query params", async () => {
      const fetchMock = vi.spyOn(globalThis, "fetch").mockImplementation(async (url: string) => {
        if (url.toString().endsWith("/health")) {
          return new Response(JSON.stringify({ status: "ok" }), { status: 200 });
        }
        return new Response(
          JSON.stringify({ data: [SAMPLE_MEMORY], total: 1, byType: { factual: 1 } }),
          { status: 200 }
        );
      });

      const result = await backend.list({
        apiKeyId: "key-1",
        type: MemoryType.FACTUAL,
        limit: 10,
        offset: 0,
      });

      expect(result.data).toHaveLength(1);
      expect(result.total).toBe(1);
      const listUrl = fetchMock.mock.calls.find(
        ([url]) => !url.toString().endsWith("/health")
      )![0] as string;
      expect(listUrl).toContain("apiKeyId=key-1");
      expect(listUrl).toContain("limit=10");
      expect(listUrl).toContain("offset=0");
    });

    test("applies custom query param names", async () => {
      const b = createBackend({
        queryParams: { apiKeyId: "owner", category: "memoryCategory", limit: "count" },
      });
      const fetchMock = vi.spyOn(globalThis, "fetch").mockImplementation(async (url: string) => {
        if (url.toString().endsWith("/health")) {
          return new Response(JSON.stringify({ status: "ok" }), { status: 200 });
        }
        return new Response(JSON.stringify({ data: [], total: 0, byType: {} }), { status: 200 });
      });

      await b.list({ apiKeyId: "key-1", category: "codegraph", limit: 5 });
      const listUrl = fetchMock.mock.calls.find(
        ([url]) => !url.toString().endsWith("/health")
      )![0] as string;

      expect(listUrl).toContain("owner=key-1");
      expect(listUrl).toContain("memoryCategory=codegraph");
      expect(listUrl).toContain("count=5");
      expect(listUrl).not.toContain("apiKeyId=");
      expect(listUrl).not.toContain("category=");
    });
  });

  // ─── Search ──────────────────────────────────────────────

  describe("search()", () => {
    test("GETs /memories/search with query params", async () => {
      const fetchMock = vi.spyOn(globalThis, "fetch").mockImplementation(async (url: string) => {
        if (url.toString().endsWith("/health")) {
          return new Response(JSON.stringify({ status: "ok" }), { status: 200 });
        }
        return new Response(JSON.stringify([SAMPLE_MEMORY]), { status: 200 });
      });

      const result = await backend.search({
        query: "hello",
        apiKeyId: "key-1",
        strategy: "semantic",
        limit: 5,
      });

      expect(result).toHaveLength(1);
      const searchUrl = fetchMock.mock.calls.find(
        ([url]) => !url.toString().endsWith("/health")
      )![0] as string;
      expect(searchUrl).toContain("/memories/search");
      expect(searchUrl).toContain("query=hello");
      expect(searchUrl).toContain("strategy=semantic");
    });

    test("uses custom search endpoint", async () => {
      const b = createBackend({ endpoints: { search: "/api/search" } });
      const fetchMock = vi.spyOn(globalThis, "fetch").mockImplementation(async (url: string) => {
        if (url.toString().endsWith("/health")) {
          return new Response(JSON.stringify({ status: "ok" }), { status: 200 });
        }
        return new Response(JSON.stringify([]), { status: 200 });
      });

      await b.search({ query: "q", apiKeyId: "k" });

      const searchUrl = fetchMock.mock.calls.find(
        ([url]) => !url.toString().endsWith("/health")
      )![0] as string;
      expect(searchUrl).toContain("/api/search");
    });

    test("serializes options as JSON query param", async () => {
      const fetchMock = vi.spyOn(globalThis, "fetch").mockImplementation(async (url: string) => {
        if (url.toString().endsWith("/health")) {
          return new Response(JSON.stringify({ status: "ok" }), { status: 200 });
        }
        return new Response(JSON.stringify([]), { status: 200 });
      });

      await backend.search({
        query: "hello",
        apiKeyId: "key-1",
        options: { filter: { lang: "en" } },
      });
      const searchUrl = fetchMock.mock.calls.find(
        ([url]) => !url.toString().endsWith("/health")
      )![0] as string;

      expect(searchUrl).toContain(encodeURIComponent(JSON.stringify({ filter: { lang: "en" } })));
    });
  });

  // ─── Auth headers ────────────────────────────────────────

  describe("authentication", () => {
    test("sends Authorization header when apiKey is configured", async () => {
      const b = createBackend({ apiKey: "secret-123" });
      const fetchMock = vi.spyOn(globalThis, "fetch").mockImplementation(async (url: string) => {
        if (url.toString().endsWith("/health")) {
          return new Response(JSON.stringify({ status: "ok" }), { status: 200 });
        }
        return new Response(JSON.stringify({ status: "ok" }), { status: 200 });
      });

      await b.health();

      const headers = fetchMock.mock.calls[0]![1] as RequestInit;
      expect(headers.headers).toMatchObject({
        Authorization: "Bearer secret-123",
      });
    });

    test("sends custom headers when configured", async () => {
      const b = createBackend({
        headers: { "X-Api-Key": "abc", "Notion-Version": "2022-06-28" },
      });
      const fetchMock = vi.spyOn(globalThis, "fetch").mockImplementation(async (url: string) => {
        if (url.toString().endsWith("/health")) {
          return new Response(JSON.stringify({ status: "ok" }), { status: 200 });
        }
        return new Response(JSON.stringify({ status: "ok" }), { status: 200 });
      });

      await b.health();

      const headers = fetchMock.mock.calls[0]![1] as RequestInit;
      expect(headers.headers).toMatchObject({
        "X-Api-Key": "abc",
        "Notion-Version": "2022-06-28",
      });
    });
  });

  // ─── Factory ─────────────────────────────────────────────

  describe("createGenericMemoryBackend factory", () => {
    test("returns a GenericMemoryBackend instance", () => {
      const b = createGenericMemoryBackend("fac", "Factory", { baseUrl: "http://x" });
      expect(b).toBeInstanceOf(GenericMemoryBackend);
      expect(b.id).toBe("fac");
    });
  });

  // ─── SSRF guard ──────────────────────────────────────────

  describe("SSRF prevention", () => {
    test("blocks requests to loopback IPv4 (127.0.0.1)", async () => {
      const b = createBackend({ baseUrl: "http://127.0.0.1:20128" });
      const result = await b.health();
      expect(result.ok).toBe(false);
      expect(result.error).toContain("SSRF guard");
    });

    test("blocks requests to private IPv4 (10.x.x.x)", async () => {
      const b = createBackend({ baseUrl: "http://10.0.0.5/api" });
      const result = await b.health();
      expect(result.ok).toBe(false);
      expect(result.error).toContain("SSRF guard");
    });

    test("blocks requests to private IPv4 (192.168.x.x)", async () => {
      const b = createBackend({ baseUrl: "http://192.168.1.100" });
      const result = await b.health();
      expect(result.ok).toBe(false);
      expect(result.error).toContain("SSRF guard");
    });

    test("blocks requests to cloud metadata IP (169.254.169.254)", async () => {
      const b = createBackend({ baseUrl: "http://169.254.169.254/latest/meta-data/" });
      const result = await b.health();
      expect(result.ok).toBe(false);
      expect(result.error).toContain("SSRF guard");
    });

    test("blocks requests to loopback IPv6 (::1)", async () => {
      const b = createBackend({ baseUrl: "http://[::1]:20128" });
      const result = await b.health();
      expect(result.ok).toBe(false);
      expect(result.error).toContain("SSRF guard");
    });

    test("blocks non-http schemes (file://)", async () => {
      const b = createBackend({ baseUrl: "file:///etc/passwd" });
      const result = await b.health();
      expect(result.ok).toBe(false);
      expect(result.error).toContain("SSRF guard");
    });

    test("allows public IP addresses", async () => {
      const b = createBackend({ baseUrl: "http://93.184.216.34:8080" });
      vi.spyOn(globalThis, "fetch").mockResolvedValue(
        new Response(JSON.stringify({ status: "ok" }), { status: 200 })
      );
      // Should pass SSRF guard and proceed to the actual fetch (which will
      // hit the mock, not the real host)
      await expect(b.health()).resolves.toHaveProperty("ok", true);
    });

    test("allows hostnames (passes structural check)", async () => {
      const b = createBackend({ baseUrl: "https://api.example.com" });
      vi.spyOn(globalThis, "fetch").mockResolvedValue(
        new Response(JSON.stringify({ status: "ok" }), { status: 200 })
      );
      await expect(b.health()).resolves.toHaveProperty("ok", true);
    });

    test("SSRF guard fires during create() via request()", async () => {
      const b = createBackend({ baseUrl: "http://127.0.0.1:20128" });
      // Mock the fetch so health fails (SSRF guard) — but the CRUD method
      // calls initialize() first, which calls health(), which should throw
      vi.spyOn(globalThis, "fetch").mockResolvedValue(
        new Response(JSON.stringify({ status: "ok" }), { status: 200 })
      );
      await expect(
        b.create({
          apiKeyId: "k1",
          sessionId: "s1",
          type: MemoryType.FACTUAL,
          key: "k",
          content: "c",
          metadata: {},
          expiresAt: null,
        })
      ).rejects.toThrow("SSRF guard");
    });
  });
});
