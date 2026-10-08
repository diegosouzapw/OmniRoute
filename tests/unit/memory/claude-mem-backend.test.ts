import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";

import {
  ClaudeMemBackend,
  createClaudeMemBackendFromSettings,
  observationToMemory,
  parseClaudeMemId,
} from "../../../src/lib/memory/claudeMemBackend.ts";
import { MemoryType } from "../../../src/lib/memory/types.ts";

// claude-mem worker adapter — every request is captured by a fetch stub, so these tests pin
// both the HTTP contract we send to the worker and the observation → Memory mapping.

interface Call {
  method: string;
  url: URL;
  body: unknown;
}

const originalFetch = globalThis.fetch;
let calls: Call[];
let respond: (call: Call) => Response;

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

const OBSERVATION = {
  id: 42,
  memory_session_id: "mem-sess-1",
  project: "OmniRoute",
  type: "decision",
  title: "Use loopback-only adapter",
  subtitle: "Architecture",
  narrative: "The worker only binds 127.0.0.1, so the adapter pins the host.",
  text: null,
  facts: JSON.stringify(["worker binds loopback"]),
  concepts: JSON.stringify(["ssrf"]),
  metadata: null,
  created_at: "2026-10-01T10:00:00.000Z",
  created_at_epoch: Date.parse("2026-10-01T10:00:00.000Z"),
};

beforeEach(() => {
  calls = [];
  respond = () => json({});
  globalThis.fetch = (async (input: string | URL | Request, init?: RequestInit) => {
    const call: Call = {
      method: init?.method ?? "GET",
      url: new URL(String(input)),
      body: init?.body ? JSON.parse(String(init.body)) : undefined,
    };
    calls.push(call);
    return respond(call);
  }) as typeof fetch;
});

afterEach(() => {
  globalThis.fetch = originalFetch;
});

describe("ClaudeMemBackend config", () => {
  it("always targets loopback and rejects a host override", () => {
    assert.throws(() => new ClaudeMemBackend({ port: 37701, host: "10.0.0.5" } as never));
    assert.throws(() => new ClaudeMemBackend({ port: 80 } as never));
  });

  it("registers only when backendConfigs['claude-mem'] is valid", () => {
    assert.equal(createClaudeMemBackendFromSettings({}), null);
    assert.equal(createClaudeMemBackendFromSettings({ "claude-mem": { port: "x" } }), null);
    const backend = createClaudeMemBackendFromSettings({ "claude-mem": { port: 37701 } });
    assert.ok(backend instanceof ClaudeMemBackend);
    assert.equal(backend?.id, "claude-mem");
  });
});

describe("ClaudeMemBackend HTTP contract", () => {
  it("create posts to /api/memory/save on 127.0.0.1 with OmniRoute fields in metadata", async () => {
    respond = () => json({ success: true, id: 7 });
    const backend = new ClaudeMemBackend({ port: 37701, timeoutMs: 1000 });

    const memory = await backend.create({
      apiKeyId: "key-1",
      sessionId: "sess-1",
      type: MemoryType.FACTUAL,
      key: "pref",
      content: "User prefers concise answers",
      metadata: { category: "preference" },
    });

    assert.equal(calls.length, 1);
    assert.equal(calls[0].method, "POST");
    assert.equal(calls[0].url.href, "http://127.0.0.1:37701/api/memory/save");
    assert.deepEqual(calls[0].body, {
      text: "User prefers concise answers",
      title: "pref",
      project: "key-1",
      metadata: {
        omniroute: {
          apiKeyId: "key-1",
          sessionId: "sess-1",
          type: "factual",
          key: "pref",
          metadata: { category: "preference" },
        },
      },
    });
    assert.equal(memory.id, "claude-mem:7");
    assert.equal(memory.metadata.source, "claude-mem");
  });

  it("uses the configured project instead of the apiKeyId", async () => {
    respond = () => json({ observations: [OBSERVATION] });
    const backend = new ClaudeMemBackend({ port: 37701, project: "OmniRoute", timeoutMs: 1000 });

    const results = await backend.search({ query: "loopback", apiKeyId: "key-1", limit: 5 });

    const params = calls[0].url.searchParams;
    assert.equal(calls[0].url.pathname, "/api/search");
    assert.equal(params.get("query"), "loopback");
    assert.equal(params.get("format"), "json");
    assert.equal(params.get("type"), "observations");
    assert.equal(params.get("project"), "OmniRoute");
    assert.equal(params.get("limit"), "5");
    assert.equal(results.length, 1);
    assert.equal(results[0].id, "claude-mem:42");
  });

  it("search honours the maxTokens budget", async () => {
    const big = { ...OBSERVATION, id: 1, narrative: "x".repeat(400) };
    const small = { ...OBSERVATION, id: 2, narrative: "y".repeat(40) };
    respond = () => json({ observations: [small, big] });
    const backend = new ClaudeMemBackend({ port: 37701, timeoutMs: 1000 });

    const results = await backend.search({ query: "q", apiKeyId: "k", maxTokens: 50 });
    assert.deepEqual(
      results.map((m) => m.id),
      ["claude-mem:2"]
    );
  });

  it("get/delete ignore ids owned by other backends without calling the worker", async () => {
    const backend = new ClaudeMemBackend({ port: 37701, timeoutMs: 1000 });
    assert.equal(await backend.get("0b7f2c1e-uuid-from-sqlite"), null);
    assert.equal(await backend.delete("0b7f2c1e-uuid-from-sqlite"), false);
    assert.equal(calls.length, 0);
  });

  it("get maps 404 to null and a row to a Memory", async () => {
    const backend = new ClaudeMemBackend({ port: 37701, timeoutMs: 1000 });

    respond = () => json({ error: "not found" }, 404);
    assert.equal(await backend.get("claude-mem:99"), null);

    respond = () => json(OBSERVATION);
    const memory = await backend.get("claude-mem:42");
    assert.equal(calls[1].url.pathname, "/api/observation/42");
    assert.equal(memory?.content, OBSERVATION.narrative);
  });

  it("delete calls DELETE /api/observation/:id", async () => {
    respond = () => json({ success: true });
    const backend = new ClaudeMemBackend({ port: 37701, timeoutMs: 1000 });
    assert.equal(await backend.delete("claude-mem:42"), true);
    assert.equal(calls[0].method, "DELETE");
    assert.equal(calls[0].url.pathname, "/api/observation/42");
  });

  it("update is unsupported and never calls the worker", async () => {
    const backend = new ClaudeMemBackend({ port: 37701, timeoutMs: 1000 });
    assert.equal(await backend.update("claude-mem:42", { content: "new" }), false);
    assert.equal(calls.length, 0);
  });

  it("list paginates /api/observations and filters by type", async () => {
    respond = () =>
      json({
        items: [OBSERVATION, { ...OBSERVATION, id: 43, type: "bugfix" }],
        hasMore: true,
        offset: 10,
        limit: 2,
      });
    const backend = new ClaudeMemBackend({ port: 37701, timeoutMs: 1000 });

    const result = await backend.list({
      apiKeyId: "key-1",
      offset: 10,
      limit: 2,
      type: MemoryType.PROCEDURAL,
    });

    const params = calls[0].url.searchParams;
    assert.equal(calls[0].url.pathname, "/api/observations");
    assert.equal(params.get("offset"), "10");
    assert.equal(params.get("limit"), "2");
    assert.equal(params.get("project"), "key-1");
    assert.deepEqual(
      result.data.map((m) => m.id),
      ["claude-mem:42"]
    );
    assert.deepEqual(result.byType, { procedural: 1 });
    // offset + returned + 1 because the worker reported another page
    assert.equal(result.total, 12);
  });

  it("surfaces worker failures without leaking the response body", async () => {
    respond = () => new Response("Error: boom\n    at /secret/path.js:1:1", { status: 500 });
    const backend = new ClaudeMemBackend({ port: 37701, timeoutMs: 1000 });
    await assert.rejects(
      () => backend.search({ query: "q", apiKeyId: "k" }),
      (error: Error) => {
        assert.match(error.message, /HTTP 500/);
        assert.ok(!error.message.includes("at /"));
        return true;
      }
    );
  });

  it("health reports ok, degraded, and unreachable workers", async () => {
    const backend = new ClaudeMemBackend({ port: 37701, timeoutMs: 1000 });

    respond = () => json({ status: "ok" });
    assert.equal((await backend.health()).ok, true);

    respond = () => json({ status: "degraded" }, 503);
    assert.deepEqual(
      { ...(await backend.health()), latencyMs: 0 },
      { ok: false, latencyMs: 0, error: "HTTP 503" }
    );

    globalThis.fetch = (async () => {
      throw new TypeError("fetch failed");
    }) as typeof fetch;
    const down = await backend.health();
    assert.equal(down.ok, false);
    assert.equal(down.error, "worker unreachable");
  });
});

describe("observationToMemory", () => {
  it("maps claude-mem observation types onto MemoryType", () => {
    assert.equal(observationToMemory({ ...OBSERVATION, type: "discovery" }).type, "factual");
    assert.equal(observationToMemory({ ...OBSERVATION, type: "decision" }).type, "procedural");
    assert.equal(observationToMemory({ ...OBSERVATION, type: "bugfix" }).type, "episodic");
  });

  it("round-trips OmniRoute fields stored in metadata", () => {
    const memory = observationToMemory({
      ...OBSERVATION,
      type: "discovery",
      metadata: JSON.stringify({
        omniroute: {
          apiKeyId: "key-1",
          sessionId: "sess-1",
          type: "semantic",
          key: "pref",
          metadata: { category: "preference" },
        },
      }),
    });
    assert.equal(memory.apiKeyId, "key-1");
    assert.equal(memory.sessionId, "sess-1");
    assert.equal(memory.type, MemoryType.SEMANTIC);
    assert.equal(memory.key, "pref");
    assert.equal(memory.metadata.category, "preference");
  });

  it("falls back to project/session/title for hook-captured observations", () => {
    const memory = observationToMemory(OBSERVATION);
    assert.equal(memory.apiKeyId, "OmniRoute");
    assert.equal(memory.sessionId, "mem-sess-1");
    assert.equal(memory.key, OBSERVATION.title);
    assert.deepEqual(memory.metadata.facts, ["worker binds loopback"]);
    assert.equal(memory.createdAt.toISOString(), OBSERVATION.created_at);
  });

  it("parseClaudeMemId only accepts the claude-mem prefix with a numeric id", () => {
    assert.equal(parseClaudeMemId("claude-mem:12"), 12);
    assert.equal(parseClaudeMemId("claude-mem:12/../x"), null);
    assert.equal(parseClaudeMemId("12"), null);
  });
});
