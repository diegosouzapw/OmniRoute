import test from "node:test";
import assert from "node:assert/strict";
import type { ExecuteInput } from "../../open-sse/executors/base.ts";

const { REGISTRY } = await import("../../open-sse/config/providerRegistry.ts");
const providers = await import("../../src/shared/constants/providers.ts");
const { getExecutor, hasSpecializedExecutor } = await import("../../open-sse/executors/index.ts");
const { YuanbaoWebExecutor } = await import("../../open-sse/executors/yuanbao-web.ts");

type Dict = Record<string, unknown>;
const registry = REGISTRY as unknown as Record<string, Dict>;
const catalog = providers.WEB_COOKIE_PROVIDERS as unknown as Record<string, Dict>;
const creds = (apiKey: string) => ({ apiKey }) as unknown as ExecuteInput["credentials"];

// ── Registry wiring ───────────────────────────────────────────────────────────

test("yuanbao-web is registered as a cookie-auth provider in the registry", () => {
  const entry = registry["yuanbao-web"];
  assert.ok(entry, "yuanbao-web missing from REGISTRY");
  assert.equal(entry.id, "yuanbao-web");
  assert.equal(entry.alias, "ybw");
  assert.equal(entry.executor, "yuanbao-web");
  assert.equal(entry.format, "openai");
  assert.equal(entry.authHeader, "cookie");
  assert.equal(entry.baseUrl, "https://yuanbao.tencent.com/api/chat");
  const models = entry.models as Array<{ id: string }>;
  assert.ok(Array.isArray(models) && models.length > 0);
  const ids = models.map((m) => m.id);
  assert.ok(ids.includes("deepseek-v3"));
  assert.ok(ids.includes("hunyuan-t1"));
});

test("yuanbao-web appears in the web-cookie catalog with a cookie authHint", () => {
  const entry = catalog["yuanbao-web"];
  assert.ok(entry, "yuanbao-web missing from WEB_COOKIE_PROVIDERS");
  assert.equal(entry.id, "yuanbao-web");
  assert.equal(entry.riskNoticeVariant, "webCookie");
  assert.match(String(entry.authHint), /hy_token/);
  assert.match(String(entry.website), /yuanbao\.tencent\.com/);
});

test("YuanbaoWebExecutor is wired under id and alias", () => {
  assert.ok(hasSpecializedExecutor("yuanbao-web"));
  assert.ok(hasSpecializedExecutor("ybw"));
  assert.ok(getExecutor("yuanbao-web") instanceof YuanbaoWebExecutor);
  assert.ok(getExecutor("ybw") instanceof YuanbaoWebExecutor);
});

// ── Behavioral: SSE → OpenAI translation (mocked upstream) ─────────────────────

function makeSSEBody(lines: string[]): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  return new ReadableStream({
    start(controller) {
      for (const line of lines) controller.enqueue(encoder.encode(line));
      controller.close();
    },
  });
}

async function readStreamText(res: Response): Promise<string> {
  const reader = res.body!.getReader();
  const decoder = new TextDecoder();
  let out = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    out += decoder.decode(value, { stream: true });
  }
  return out;
}

test("missing hy_token cookie returns a 401 auth error", async () => {
  const exec = new YuanbaoWebExecutor();
  const { response } = await exec.execute({
    model: "deepseek-v3",
    body: { messages: [{ role: "user", content: "hi" }] },
    stream: false,
    credentials: creds("some_unrelated_cookie=abc"),
    signal: null,
  });
  assert.equal(response.status, 401);
  const body = (await response.json()) as { error: { message: string } };
  assert.match(body.error.message, /hy_user|hy_token|session cookie/);
  // Never leak stack traces.
  assert.ok(!body.error.message.includes("at /"));
});

test("streaming request translates think/text events into OpenAI chunks", async () => {
  const original = globalThis.fetch;
  const calls: string[] = [];
  globalThis.fetch = (async (url: string | URL | Request) => {
    calls.push(String(url));
    if (String(url).includes("/conversation/create")) {
      return new Response(JSON.stringify({ id: "conv-123" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(
      makeSSEBody([
        'data: {"type":"think","content":"reasoning..."}\n',
        'data: {"type":"text","msg":"Hello"}\n',
        'data: {"type":"text","msg":" world"}\n',
        'data: {"stopReason":"stop"}\n',
      ]),
      { status: 200, headers: { "Content-Type": "text/event-stream" } }
    );
  }) as typeof fetch;

  try {
    const exec = new YuanbaoWebExecutor();
    const { response, url } = await exec.execute({
      model: "deepseek-r1",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: true,
      credentials: creds("hy_source=web; hy_user=u1; hy_token=t1"),
      signal: null,
    });
    assert.equal(response.status, 200);
    assert.match(url, /\/api\/chat\/conv-123$/);
    assert.ok(calls[0].includes("/conversation/create"));

    const text = await readStreamText(response);
    assert.match(text, /"reasoning_content":"reasoning\.\.\."/);
    assert.match(text, /"content":"Hello"/);
    assert.match(text, /"content":" world"/);
    assert.match(text, /"finish_reason":"stop"/);
    assert.match(text, /data: \[DONE\]/);
  } finally {
    globalThis.fetch = original;
  }
});

test("non-streaming request collects content and reasoning", async () => {
  const original = globalThis.fetch;
  globalThis.fetch = (async (url: string | URL | Request) => {
    if (String(url).includes("/conversation/create")) {
      return new Response(JSON.stringify({ id: "conv-9" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(
      makeSSEBody([
        'data: {"type":"think","content":"think-part"}\n',
        'data: {"type":"text","msg":"Answer"}\n',
        'data: {"stopReason":"stop"}\n',
      ]),
      { status: 200, headers: { "Content-Type": "text/event-stream" } }
    );
  }) as typeof fetch;

  try {
    const exec = new YuanbaoWebExecutor();
    const { response } = await exec.execute({
      model: "hunyuan-t1",
      body: { messages: [{ role: "user", content: "q" }] },
      stream: false,
      credentials: creds("hy_source=web; hy_user=u1; hy_token=t1"),
      signal: null,
    });
    assert.equal(response.status, 200);
    const body = (await response.json()) as {
      object: string;
      model: string;
      choices: Array<{ message: { content: string; reasoning_content?: string } }>;
    };
    assert.equal(body.object, "chat.completion");
    assert.equal(body.choices[0].message.content, "Answer");
    assert.equal(body.choices[0].message.reasoning_content, "think-part");
    assert.equal(body.model, "hunyuan-t1");
  } finally {
    globalThis.fetch = original;
  }
});

test("upstream 401 on conversation create surfaces an auth error (no stack leak)", async () => {
  const original = globalThis.fetch;
  globalThis.fetch = (async () =>
    new Response(JSON.stringify({ message: "unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    })) as typeof fetch;

  try {
    const exec = new YuanbaoWebExecutor();
    const { response } = await exec.execute({
      model: "deepseek-v3",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: creds("hy_source=web; hy_user=u1; hy_token=t1"),
      signal: null,
    });
    assert.equal(response.status, 401);
    const body = (await response.json()) as { error: { message: string } };
    assert.ok(!body.error.message.includes("at /"));
  } finally {
    globalThis.fetch = original;
  }
});
