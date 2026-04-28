import test from "node:test";
import assert from "node:assert/strict";

import { QoderExecutor } from "../../open-sse/executors/qoder.ts";
import {
  buildQoderPrompt,
  getStaticQoderModels,
  mapQoderModelToLevel,
  normalizeQoderPatProviderData,
  parseQoderCliFailure,
  validateQoderCliPat,
} from "../../open-sse/services/qoderCli.ts";

test("QoderExecutor: constructor sets provider to qoder", () => {
  const executor = new QoderExecutor();
  assert.equal(executor.getProvider(), "qoder");
});

test("QoderExecutor: buildHeaders inherits configured user agent, auth and stream headers", () => {
  const executor = new QoderExecutor();

  assert.deepEqual(executor.buildHeaders({ apiKey: "pat" }, true), {
    "Content-Type": "application/json",
    "User-Agent": "Qoder-Cli",
    Authorization: "Bearer pat",
    Accept: "text/event-stream",
  });
  assert.deepEqual(executor.buildHeaders({ accessToken: "token" }, false), {
    "Content-Type": "application/json",
    "User-Agent": "Qoder-Cli",
    Authorization: "Bearer token",
    Accept: "application/json",
  });
});

test("QoderExecutor: buildUrl uses the live qoder.com API base", () => {
  const executor = new QoderExecutor();
  assert.equal(
    executor.buildUrl("qoder-rome-30ba3b", false),
    "https://api.qoder.com/v1/chat/completions"
  );
});

test("normalizeQoderPatProviderData forces PAT + qodercli transport", () => {
  assert.deepEqual(normalizeQoderPatProviderData({ region: "sa-east-1" }), {
    region: "sa-east-1",
    authMode: "pat",
    transport: "qodercli",
  });
});

test("mapQoderModelToLevel maps static models to qodercli levels", () => {
  assert.equal(mapQoderModelToLevel("qoder-rome-30ba3b"), "qmodel");
  assert.equal(mapQoderModelToLevel("deepseek-r1"), "ultimate");
  assert.equal(mapQoderModelToLevel("qwen3-max"), "performance");
  assert.equal(mapQoderModelToLevel(""), null);
});

test("getStaticQoderModels exposes the static if/* catalog seed", () => {
  const models = getStaticQoderModels();
  assert.ok(models.some((model) => model.id === "qoder-rome-30ba3b"));
  assert.ok(models.some((model) => model.id === "deepseek-r1"));
});

test("buildQoderPrompt flattens transcript and warns against local tools", () => {
  const prompt = buildQoderPrompt({
    messages: [
      { role: "system", content: "Follow the user request." },
      {
        role: "user",
        content: [{ type: "text", text: "Reply with OK." }],
      },
      {
        role: "assistant",
        tool_calls: [
          {
            type: "function",
            function: { name: "pwd", arguments: "{}" },
          },
        ],
        content: "",
      },
    ],
    tools: [{ type: "function", function: { name: "pwd" } }],
  });

  assert.match(prompt, /Conversation transcript:/);
  assert.match(prompt, /USER:\nReply with OK\./);
  assert.match(prompt, /TOOL_CALL pwd: \{\}/);
  assert.match(prompt, /Do not call those tools yourself\./);
});

test("parseQoderCliFailure classifies auth, upstream and timeout failures", () => {
  assert.deepEqual(parseQoderCliFailure("Invalid API key"), {
    status: 401,
    message: "Invalid API key",
    code: "upstream_auth_error",
  });
  assert.deepEqual(parseQoderCliFailure("command not found: qodercli"), {
    status: 502,
    message: "command not found: qodercli",
    code: "upstream_error",
  });
  assert.deepEqual(parseQoderCliFailure("request timed out"), {
    status: 504,
    message: "request timed out",
    code: "timeout",
  });
});

test("validateQoderCliPat succeeds when the validation endpoint returns OK", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url, options) => {
    const urlStr = String(url);
    // Handle ping check
    if (urlStr.includes("/ping")) {
      return new Response("pong", { status: 200 });
    }
    assert.match(
      urlStr,
      /api1\.qoder\.sh\/algo\/api\/v2\/service\/pro\/sse\/agent_chat_generation/
    );
    assert.equal(options.method, "POST");
    assert.match(String(options.headers.Authorization), /^Bearer COSY\./);
    return new Response("{}", { status: 200 });
  };

  try {
    const result = await validateQoderCliPat({ apiKey: "pat_test" });
    assert.deepEqual(result, { valid: true, error: null, unsupported: false });
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("validateQoderCliPat returns auth failures with actionable error", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url) => {
    if (String(url).includes("/ping")) return new Response("pong", { status: 200 });
    return new Response("Invalid API key", { status: 401 });
  };

  try {
    const result = await validateQoderCliPat({ apiKey: "pat_bad" });
    assert.equal(result.valid, false);
    assert.match(result.error, /Authentication failed/);
    assert.equal(result.unsupported, false);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("QoderExecutor: missing tokens return an authentication error response", async () => {
  const executor = new QoderExecutor();
  const { response, url } = await executor.execute({
    model: "qoder-rome-30ba3b",
    body: { messages: [{ role: "user", content: "hi" }] },
    stream: false,
    credentials: {},
  });

  assert.equal(url, "https://dashscope.aliyuncs.com");
  assert.equal(response.status, 401);
  const payload = (await response.json()) as any;
  assert.equal(payload.error.code, "token_required");
});

test("QoderExecutor: non-stream calls target DashScope and map alias models", async () => {
  const executor = new QoderExecutor();
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url, options) => {
    assert.equal(String(url), "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions");
    assert.equal(options.method, "POST");
    assert.equal(options.headers.Authorization, "Bearer pat_test");
    assert.equal(options.headers["x-dashscope-authtype"], "qwen-oauth");
    assert.equal(options.headers["user-agent"], "QwenCode/0.15.3 (linux; x64)");
    assert.equal(options.headers["x-dashscope-useragent"], "QwenCode/0.15.3 (linux; x64)");
    const parsedBody = JSON.parse(String(options.body));
    assert.equal(parsedBody.model, "coder-model");
    return new Response(
      JSON.stringify({
        id: "chatcmpl-qoder",
        object: "chat.completion",
        choices: [
          {
            index: 0,
            message: { role: "assistant", content: "OK" },
            finish_reason: "stop",
          },
        ],
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  };

  try {
    const { response, url, transformedBody } = await executor.execute({
      model: "qwen3.5-plus",
      body: { messages: [{ role: "user", content: "Reply with OK only." }] },
      stream: false,
      credentials: { apiKey: "pat_test" },
    });

    assert.equal(url, "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions");
    assert.equal((transformedBody as any).model, "coder-model");
    assert.equal(response.status, 200);
    const payload = (await response.json()) as any;
    assert.equal(payload.object, "chat.completion");
    assert.equal(payload.choices[0].message.role, "assistant");
    assert.equal(payload.choices[0].message.content, "OK");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("QoderExecutor: stream calls pass through successful SSE responses", async () => {
  const executor = new QoderExecutor();
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response('data: {"choices":[{"delta":{"content":"O"}}]}\n\ndata: [DONE]\n\n', {
      status: 200,
      headers: { "Content-Type": "text/event-stream" },
    });

  try {
    const { response } = await executor.execute({
      model: "qoder-rome-30ba3b",
      body: { messages: [{ role: "user", content: "Reply with OK only." }] },
      stream: true,
      credentials: { apiKey: "pat_test" },
    });

    assert.equal(response.status, 200);
    const body = await response.text();
    assert.match(body, /"content":"O"/);
    assert.match(body, /\[DONE\]/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("QoderExecutor: neutralizes incompatible tool_choice when Qwen thinking is active", () => {
  const executor = new QoderExecutor();
  const result = executor.transformRequest("qwen3-coder-plus", {
    messages: [{ role: "user", content: "hi" }],
    thinking: true,
    tool_choice: "required",
  });

  assert.equal(result.model, "qwen3-coder-plus");
  assert.equal(result.tool_choice, "auto");
});

test("QoderExecutor: preserves tool_choice when thinking is inactive", () => {
  const executor = new QoderExecutor();
  const forcedTool = { type: "function", function: { name: "pwd" } };
  const result = executor.transformRequest("qwen3-coder-plus", {
    messages: [{ role: "user", content: "hi" }],
    tool_choice: forcedTool,
  });

  assert.equal(result.model, "qwen3-coder-plus");
  assert.deepEqual(result.tool_choice, forcedTool);
});
