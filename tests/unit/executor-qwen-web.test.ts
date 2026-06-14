import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";

const mod = await import("../../open-sse/executors/qwen-web.ts");
const { REGISTRY } = await import("../../open-sse/config/providerRegistry.ts");
const { FREE_MODEL_BUDGETS } = await import("../../open-sse/config/freeModelCatalog.data.ts");

type FetchCall = { url: string; init: any };

const realFetch = globalThis.fetch;
let calls: FetchCall[] = [];

/** Build an SSE Response from an array of v2 "phase" delta events. */
function sseResponse(events: Array<Record<string, unknown>>): Response {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      for (const ev of events) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(ev)}\n\n`));
      }
      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      controller.close();
    },
  });
  return new Response(stream, {
    status: 200,
    headers: { "content-type": "text/event-stream" },
  });
}

function chatCreatedResponse(id = "chat-abc"): Response {
  return new Response(JSON.stringify({ success: true, data: { id } }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

/** The 504 + HTML page Alibaba's gateway returns for the retired v1 endpoint
 *  and for WAF-blocked requests. */
function wafHtmlResponse(status = 504): Response {
  return new Response(
    "<html>\n<head><title>504 Gateway Time-out</title></head>\n<body>\n" +
      '<center><h1>504 Gateway Time-out</h1></center>\n<hr><center>alibaba-ga</center>\n' +
      '<meta name="aliyun_waf_aa" content="ff926c7f07e45e2e487a29a6197d3460">\n</body>\n</html>',
    { status, headers: { "content-type": "text/html; charset=utf-8" } }
  );
}

beforeEach(() => {
  calls = [];
});

afterEach(() => {
  globalThis.fetch = realFetch;
});

describe("QwenWebExecutor (v2 migration)", () => {
  it("can be instantiated", () => {
    assert.ok(new mod.QwenWebExecutor());
  });

  it("uses the v2 two-step flow: chats/new then chat/completions?chat_id=", async () => {
    globalThis.fetch = (async (url: any, init: any = {}) => {
      calls.push({ url: String(url), init });
      if (String(url).includes("/api/v2/chats/new")) return chatCreatedResponse("chat-xyz");
      return sseResponse([
        { choices: [{ delta: { phase: "answer", content: "Hello", status: "typing" } }] },
        { choices: [{ delta: { phase: "answer", content: " world", status: "finished" } }] },
      ]);
    }) as any;

    const executor = new mod.QwenWebExecutor();
    const result = await executor.execute({
      model: "qwen3.7-max",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: { apiKey: "token=jwt-tok; cna=abc; ssxmod_itna=1-xyz" },
      signal: null,
    } as any);

    assert.equal(calls.length, 2, "should make exactly two upstream calls");
    assert.match(calls[0].url, /\/api\/v2\/chats\/new$/);
    assert.equal(calls[0].init.method, "POST");
    assert.match(calls[1].url, /\/api\/v2\/chat\/completions\?chat_id=chat-xyz/);
    assert.equal(calls[1].init.method, "POST");

    // chats/new payload shape
    const newBody = JSON.parse(calls[0].init.body);
    assert.deepEqual(newBody.models, ["qwen3.7-max"]);
    assert.equal(newBody.chat_type, "t2t");
    assert.equal(newBody.chat_mode, "normal");

    // completion payload references the created chat_id
    const compBody = JSON.parse(calls[1].init.body);
    assert.equal(compBody.chat_id, "chat-xyz");
    assert.equal(compBody.model, "qwen3.7-max");
    assert.equal(compBody.messages[0].role, "user");
    assert.equal(compBody.messages[0].content, "hi");

    const json = (await result.response.json()) as any;
    assert.equal(json.choices[0].message.content, "Hello world");
  });

  it("replays the full cookie jar and the extracted bearer token on every call", async () => {
    globalThis.fetch = (async (url: any, init: any = {}) => {
      calls.push({ url: String(url), init });
      if (String(url).includes("/api/v2/chats/new")) return chatCreatedResponse();
      return sseResponse([
        { choices: [{ delta: { phase: "answer", content: "ok", status: "finished" } }] },
      ]);
    }) as any;

    const cookieBlob = "token=jwt-secret; cna=CNA1; ssxmod_itna=1-AAA; ssxmod_itna2=1-BBB";
    const executor = new mod.QwenWebExecutor();
    await executor.execute({
      model: "qwen3.7-plus",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: { apiKey: cookieBlob },
      signal: null,
    } as any);

    for (const call of calls) {
      const headers = call.init.headers as Record<string, string>;
      const cookie = headers.Cookie || headers.cookie || "";
      assert.match(cookie, /cna=CNA1/, "full cookie jar must be replayed");
      assert.match(cookie, /ssxmod_itna=1-AAA/, "WAF cookies must be replayed");
      const auth = headers.Authorization || headers.authorization || "";
      assert.equal(auth, "Bearer jwt-secret", "bearer token extracted from token= cookie");
    }
  });

  it("sends the anti-bot headers required by the v2 endpoint", async () => {
    globalThis.fetch = (async (url: any, init: any = {}) => {
      calls.push({ url: String(url), init });
      if (String(url).includes("/api/v2/chats/new")) return chatCreatedResponse();
      return sseResponse([
        { choices: [{ delta: { phase: "answer", content: "ok", status: "finished" } }] },
      ]);
    }) as any;

    const executor = new mod.QwenWebExecutor();
    await executor.execute({
      model: "qwen3.7-plus",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: { apiKey: "token=t; cna=c" },
      signal: null,
    } as any);

    const headers = calls[0].init.headers as Record<string, string>;
    assert.ok(headers["bx-v"], "bx-v header present");
    assert.ok(headers["bx-umidtoken"], "bx-umidtoken header present");
    assert.equal(headers.source || headers.Source, "web", "source: web header present");
  });

  it("maps the thinking phase to reasoning_content, not the answer content", async () => {
    globalThis.fetch = (async (url: any) => {
      if (String(url).includes("/api/v2/chats/new")) return chatCreatedResponse();
      return sseResponse([
        { choices: [{ delta: { phase: "think", content: "let me think", status: "typing" } }] },
        { choices: [{ delta: { phase: "think", content: "...", status: "finished" } }] },
        { choices: [{ delta: { phase: "answer", content: "Final answer", status: "finished" } }] },
      ]);
    }) as any;

    const executor = new mod.QwenWebExecutor();
    const result = await executor.execute({
      model: "qwen3.7-max",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: { apiKey: "token=t; cna=c" },
      signal: null,
    } as any);

    const json = (await result.response.json()) as any;
    assert.equal(json.choices[0].message.content, "Final answer");
    assert.ok(
      !String(json.choices[0].message.content).includes("let me think"),
      "thinking content must not leak into the answer"
    );
  });

  it("classifies the retired-v1 / WAF 504 HTML page as a clear auth error (not raw HTML)", async () => {
    globalThis.fetch = (async (url: any) => {
      if (String(url).includes("/api/v2/chats/new")) return wafHtmlResponse(504);
      return chatCreatedResponse();
    }) as any;

    const executor = new mod.QwenWebExecutor();
    const result = await executor.execute({
      model: "qwen3.7-max",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: { apiKey: "token=stale; cna=c" },
      signal: null,
    } as any);

    assert.ok([401, 403].includes(result.response.status), "should map to an auth status");
    const json = (await result.response.json()) as any;
    const msg = String(json.error?.message || "");
    assert.ok(!msg.includes("<html"), "raw HTML must not be returned to the client");
    assert.match(msg, /session|expired|WAF|re-?login|cookie/i, "actionable error message");
  });

  it("streams answer-phase content as OpenAI chat.completion.chunk deltas", async () => {
    globalThis.fetch = (async (url: any) => {
      if (String(url).includes("/api/v2/chats/new")) return chatCreatedResponse();
      return sseResponse([
        { choices: [{ delta: { phase: "answer", content: "Hi", status: "typing" } }] },
        { choices: [{ delta: { phase: "answer", content: " there", status: "finished" } }] },
      ]);
    }) as any;

    const executor = new mod.QwenWebExecutor();
    const result = await executor.execute({
      model: "qwen3.7-max",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: true,
      credentials: { apiKey: "token=t; cna=c" },
      signal: null,
    } as any);

    const text = await result.response.text();
    assert.match(text, /chat\.completion\.chunk/);
    assert.match(text, /"content":"Hi"/);
    assert.match(text, /"content":" there"/);
    assert.match(text, /data: \[DONE\]/);
  });

  it("accepts a bare token (back-compat) without a cookie jar", async () => {
    globalThis.fetch = (async (url: any, init: any = {}) => {
      calls.push({ url: String(url), init });
      if (String(url).includes("/api/v2/chats/new")) return chatCreatedResponse();
      return sseResponse([
        { choices: [{ delta: { phase: "answer", content: "ok", status: "finished" } }] },
      ]);
    }) as any;

    const executor = new mod.QwenWebExecutor();
    await executor.execute({
      model: "qwen3.7-plus",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: { apiKey: "barejwttoken" },
      signal: null,
    } as any);

    const headers = calls[0].init.headers as Record<string, string>;
    assert.equal(headers.Authorization || headers.authorization, "Bearer barejwttoken");
  });

  it("registry points at the v2 endpoint and the current model catalog", () => {
    const provider = (REGISTRY as any)["qwen-web"];
    assert.ok(provider, "qwen-web must be registered");
    assert.match(provider.baseUrl, /\/api\/v2\/chat\/completions$/, "registry must use v2 endpoint");
    const ids = provider.models.map((m: any) => m.id);
    assert.deepEqual(ids.sort(), ["qwen3.6-plus", "qwen3.7-max", "qwen3.7-plus"]);
  });

  it("free-model catalog lists the current qwen-web ids (not the retired ones)", () => {
    const qwenModels = (FREE_MODEL_BUDGETS as any[]).filter((m) => m.provider === "qwen-web");
    const ids = qwenModels.map((m) => m.modelId);
    assert.ok(ids.includes("qwen3.7-max"), "catalog must list qwen3.7-max");
    assert.ok(!ids.includes("qwen-plus"), "retired qwen-plus must be gone");
    assert.ok(
      qwenModels.every((m) => m.freeType !== "discontinued"),
      "qwen-web is no longer discontinued after the v2 migration"
    );
  });

  it("maps legacy model ids to the current upstream catalog", async () => {
    globalThis.fetch = (async (url: any, init: any = {}) => {
      calls.push({ url: String(url), init });
      if (String(url).includes("/api/v2/chats/new")) return chatCreatedResponse();
      return sseResponse([
        { choices: [{ delta: { phase: "answer", content: "ok", status: "finished" } }] },
      ]);
    }) as any;

    const executor = new mod.QwenWebExecutor();
    await executor.execute({
      model: "qwen3-max",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: { apiKey: "token=t; cna=c" },
      signal: null,
    } as any);

    const newBody = JSON.parse(calls[0].init.body);
    assert.match(newBody.models[0], /^qwen3\.[67]-/, "legacy qwen3-max maps to a current model id");
  });
});
