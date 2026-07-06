/**
 * Tests for ZenMux Free (web-cookie) provider registration and executor behavior.
 *
 * Validates:
 * - WEB_COOKIE_PROVIDERS contains the zenmux-free entry (webCookie category)
 * - Registry entry has correct shape and models
 * - Executor resolves correctly for both the primary id and the alias
 * - Cookie header injection works when a session cookie is provided
 * - Missing ctoken returns a clean 401 error (not a raw stack trace)
 */
import test from "node:test";
import assert from "node:assert/strict";

import { WEB_COOKIE_PROVIDERS } from "../../src/shared/constants/providers/web-cookie.ts";
import { REGISTRY } from "../../open-sse/config/providers/index.ts";
import { getExecutor } from "../../open-sse/executors/index.ts";
import { ZenmuxFreeExecutor } from "../../open-sse/executors/zenmux-free.ts";

// ── Catalog / WEB_COOKIE_PROVIDERS ────────────────────────────────────────────

test("zenmux-free is present in WEB_COOKIE_PROVIDERS (webCookie category)", () => {
  const p = (WEB_COOKIE_PROVIDERS as Record<string, unknown>)["zenmux-free"] as Record<
    string,
    unknown
  >;
  assert.ok(p, "WEB_COOKIE_PROVIDERS['zenmux-free'] must exist");
  assert.equal(p.id, "zenmux-free");
  assert.equal(p.alias, "zmf");
  assert.equal((p.name as string).toLowerCase().includes("zenmux"), true);
});

test("zenmux-free WEB_COOKIE_PROVIDERS entry is marked as free-tier", () => {
  const p = (WEB_COOKIE_PROVIDERS as Record<string, unknown>)["zenmux-free"] as Record<
    string,
    unknown
  >;
  assert.equal(p.hasFree, true);
  assert.ok(typeof p.freeNote === "string" && (p.freeNote as string).length > 0);
  assert.ok(
    !(p.freeNote as string).includes("MiMo V2 Flash Free"),
    "free note must not advertise deprecated MiMo V2 Flash Free"
  );
  assert.ok(typeof p.authHint === "string" && (p.authHint as string).length > 0);
});

// ── Registry / REGISTRY ───────────────────────────────────────────────────────

test("zenmux-free is present in the provider REGISTRY with correct shape", () => {
  const r = REGISTRY["zenmux-free"];
  assert.ok(r, "REGISTRY['zenmux-free'] must exist");
  assert.equal(r.id, "zenmux-free");
  assert.equal(r.alias, "zmf");
  assert.equal(r.executor, "zenmux-free");
  assert.equal(r.baseUrl, "https://zenmux.ai/api/anthropic/v1/messages");
  assert.equal(r.authType, "apikey");
  assert.equal(r.authHeader, "cookie");
});

test("zenmux-free registry excludes deprecated MiMo V2 Flash Free", () => {
  const r = REGISTRY["zenmux-free"];
  assert.ok(r.models && r.models.length > 0, "must have at least one model");
  const ids = r.models.map((m) => m.id);

  assert.ok(
    ids.includes("deepseek/deepseek-chat"),
    "deepseek/deepseek-chat (DeepSeek V3.2) must be registered"
  );
  assert.ok(
    ids.includes("z-ai/glm-4.7-flash-free"),
    "z-ai/glm-4.7-flash-free (GLM 4.7 Flash Free) must be registered"
  );
  assert.ok(!ids.includes("xiaomi/mimo-v2-flash-free"), "xiaomi/mimo-v2-flash-free is deprecated");
  assert.equal(r.models.length, 11, "must have exactly 11 models");
});

test("zenmux-free model names are human-readable strings", () => {
  const r = REGISTRY["zenmux-free"];
  for (const m of r.models) {
    assert.ok(m.id && typeof m.id === "string", `model id must be a string: ${JSON.stringify(m)}`);
    assert.ok(
      m.name && typeof m.name === "string",
      `model name must be a string: ${JSON.stringify(m)}`
    );
  }
});

// ── Executor ──────────────────────────────────────────────────────────────────

test("getExecutor returns ZenmuxFreeExecutor for 'zenmux-free'", () => {
  const e = getExecutor("zenmux-free");
  assert.ok(e instanceof ZenmuxFreeExecutor, "executor must be ZenmuxFreeExecutor");
});

test("getExecutor returns ZenmuxFreeExecutor for 'zmf' alias", () => {
  const e = getExecutor("zmf");
  assert.ok(e instanceof ZenmuxFreeExecutor, "alias 'zmf' must resolve to ZenmuxFreeExecutor");
});

test("ZenmuxFreeExecutor can be instantiated", () => {
  const executor = new ZenmuxFreeExecutor();
  assert.ok(executor, "must instantiate without errors");
  assert.ok(typeof executor.execute === "function", "must have an execute method");
});

// ── Cookie injection ──────────────────────────────────────────────────────────

test("ZenmuxFreeExecutor returns 401 when ctoken is missing from cookies", async () => {
  const executor = new ZenmuxFreeExecutor();
  const result = await executor.execute({
    model: "deepseek/deepseek-chat",
    body: { messages: [{ role: "user", content: "hi" }] },
    stream: false,
    credentials: { apiKey: "sessionId=abc; other=xyz" }, // no ctoken
    signal: AbortSignal.timeout(5000),
  } as Parameters<typeof executor.execute>[0]);
  assert.ok(result.response instanceof Response);
  assert.equal(result.response.status, 401);
  const body = (await result.response.json()) as Record<string, unknown>;
  const errMsg = (body?.error as Record<string, unknown>)?.message as string;
  assert.ok(errMsg && typeof errMsg === "string", "error.message must be present");
  assert.ok(errMsg.includes("ctoken"), "error must mention ctoken");
  // Hard Rule #12: must NOT leak stack traces
  assert.ok(!errMsg.includes("at /"), "error must not contain a stack trace path");
});

test("ZenmuxFreeExecutor injects Cookie header from credentials when ctoken is present", async () => {
  const executor = new ZenmuxFreeExecutor();
  const cookieStr = "sessionId=test-session-id; ctoken=my-ctoken-value; other=xyz";

  const intercepted: { url: string; headers: Record<string, string> }[] = [];
  const origFetch = globalThis.fetch;
  globalThis.fetch = async (url: RequestInfo | URL, init?: RequestInit) => {
    intercepted.push({
      url: String(url),
      headers: Object.fromEntries(
        Object.entries((init?.headers as Record<string, string>) || {}).map(([k, v]) => [
          k.toLowerCase(),
          v,
        ])
      ),
    });
    // Simulate upstream 200 OK with a minimal Anthropic SSE stream
    const body =
      'data: {"type":"content_block_delta","delta":{"type":"text_delta","text":"hello"}}\n\n' +
      "data: [DONE]\n\n";
    return new Response(body, {
      status: 200,
      headers: { "Content-Type": "text/event-stream" },
    }) as unknown as Response;
  };

  try {
    const result = await executor.execute({
      model: "deepseek/deepseek-chat",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: { apiKey: cookieStr },
      signal: AbortSignal.timeout(5000),
    } as Parameters<typeof executor.execute>[0]);

    assert.equal(intercepted.length, 1, "fetch must have been called once");
    const req = intercepted[0];

    // URL must include ctoken as query param
    assert.ok(req.url.includes("ctoken=my-ctoken-value"), "ctoken must appear in the request URL");
    // Cookie header must carry the full cookie string
    assert.ok(req.headers["cookie"], "Cookie header must be set");
    assert.ok(
      req.headers["cookie"].includes("ctoken=my-ctoken-value"),
      "Cookie header must include ctoken"
    );
    // Anthropic-specific headers must be present
    assert.ok(req.headers["anthropic-version"], "anthropic-version header must be set");
    assert.ok(req.headers["x-zenmux-accept-processing"], "x-zenmux-accept-processing must be set");
    assert.ok(req.headers["x-zenmux-apikey-source"], "x-zenmux-apikey-source must be set");

    assert.ok(result.response instanceof Response);
    assert.equal(result.response.status, 200);
  } finally {
    globalThis.fetch = origFetch;
  }
});

test("ZenmuxFreeExecutor handles upstream 401 and returns clean error (not raw message)", async () => {
  const executor = new ZenmuxFreeExecutor();
  const origFetch = globalThis.fetch;
  globalThis.fetch = async () => {
    return new Response("Unauthorized", { status: 401 }) as unknown as Response;
  };
  try {
    const result = await executor.execute({
      model: "deepseek/deepseek-chat",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: { apiKey: "sessionId=x; ctoken=testtoken" },
      signal: AbortSignal.timeout(5000),
    } as Parameters<typeof executor.execute>[0]);
    assert.ok(result.response instanceof Response);
    assert.equal(result.response.status, 401);
    const body = (await result.response.json()) as Record<string, unknown>;
    const errMsg = ((body?.error as Record<string, unknown>)?.message as string) || "";
    // Hard Rule #12 — no stack traces
    assert.ok(!errMsg.includes("at /"), "error must not contain stack trace path");
  } finally {
    globalThis.fetch = origFetch;
  }
});
