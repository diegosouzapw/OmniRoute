import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { QoderExecutor } from "../../open-sse/executors/qoder.ts";
import { getQwenCliUserAgent } from "../../open-sse/config/providerHeaderProfiles.ts";
import { qoderProvider } from "../../open-sse/config/providers/registry/qoder/index.ts";
import { FREE_MODEL_BUDGETS } from "../../open-sse/config/freeModelCatalog.data.ts";
import {
  buildQoderPrompt,
  getStaticQoderModels,
  mapQoderModelToLevel,
  normalizeQoderPatProviderData,
  parseQoderCliFailure,
  validateQoderCliPat,
} from "../../open-sse/services/qoderCli.ts";

/**
 * Write a fake `qodercli` binary and point CLI_QODER_BIN at it. The stub mimics
 * the two invocations OmniRoute makes: `--print --output-format json` (chat) and
 * `--list-models` (validation). It fails auth when the PAT contains "bad" so a
 * single stub covers both the happy and the rejection path. Returns a cleanup fn.
 */
function withStubQoderCli(fn: () => void | Promise<void>) {
  const prevBin = process.env.CLI_QODER_BIN;
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "qodercli-stub-"));
  const stub = path.join(dir, "qodercli");
  fs.writeFileSync(
    stub,
    [
      "#!/bin/sh",
      'is_bad() { case "$QODER_PERSONAL_ACCESS_TOKEN" in *bad*) return 0;; *) return 1;; esac; }',
      'case "$*" in',
      "  *--list-models*)",
      '    if is_bad; then echo "Not logged in · Please run /login"; exit 0; fi',
      '    printf "MODEL\\nAuto\\nQwen3-Coder\\n"; exit 0;;',
      "  *--print*)",
      "    cat >/dev/null;",
      '    if is_bad; then printf \'{"type":"result","subtype":"success","is_error":true,"result":"Not logged in · Please run /login"}\\n\'; exit 0; fi',
      '    printf \'{"type":"result","subtype":"success","is_error":false,"result":"OK from stub"}\\n\'; exit 0;;',
      "esac",
      "exit 0",
    ].join("\n"),
    { mode: 0o755 }
  );
  process.env.CLI_QODER_BIN = stub;
  const restore = () => {
    if (prevBin === undefined) delete process.env.CLI_QODER_BIN;
    else process.env.CLI_QODER_BIN = prevBin;
    fs.rmSync(dir, { recursive: true, force: true });
  };
  return Promise.resolve().then(fn).finally(restore);
}

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

test("QoderExecutor: buildHeaders for PAT token includes User-Agent and Accept headers", () => {
  const executor = new QoderExecutor();

  // PAT tokens (pt- prefix) must include standard headers for native Qoder API compatibility
  assert.deepEqual(executor.buildHeaders({ apiKey: "pt-test-token" }, true), {
    "Content-Type": "application/json",
    "User-Agent": "Qoder-Cli",
    Authorization: "Bearer pt-test-token",
    Accept: "text/event-stream",
  });
  assert.deepEqual(executor.buildHeaders({ apiKey: "pt-test-token" }, false), {
    "Content-Type": "application/json",
    "User-Agent": "Qoder-Cli",
    Authorization: "Bearer pt-test-token",
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
  assert.equal(mapQoderModelToLevel("deepseek-r1"), "dmodel");
  assert.equal(mapQoderModelToLevel("qwen3-max"), "qmodel_latest");
  assert.equal(mapQoderModelToLevel("qwen3.8-max-preview"), "qmodel_preview");
  assert.equal(mapQoderModelToLevel("kimi-k3"), "kmodel_latest");
  assert.equal(mapQoderModelToLevel(""), null);
});

test("getStaticQoderModels exposes the current nine-model Qoder catalog", () => {
  const models = getStaticQoderModels();
  const ids = models.map((model) => model.id);
  const freeCatalogIds = FREE_MODEL_BUDGETS.filter((model) => model.provider === "qoder").map(
    (model) => model.modelId
  );

  assert.equal(models.length, 9);
  assert.deepEqual(
    ids,
    qoderProvider.models.map((model) => model.id)
  );
  assert.deepEqual(freeCatalogIds, ids);
  assert.ok(ids.includes("qwen3.8-max-preview"));
  assert.ok(ids.includes("deepseek-v4-flash"));
  assert.ok(!ids.includes("qoder-rome-30ba3b"));

  const preview = qoderProvider.models.find((model) => model.id === "qwen3.8-max-preview");
  assert.equal(preview?.supportsVision, true);
  assert.equal(preview?.supportsReasoning, true);
  assert.equal(preview?.contextLength, 1_000_000);
  assert.equal(preview?.maxInputTokens, 180_000);
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

test("validateQoderCliPat succeeds when qodercli lists models for the PAT", async () => {
  await withStubQoderCli(async () => {
    const result = await validateQoderCliPat({ apiKey: "pt-good-token" });
    assert.deepEqual(result, { valid: true, error: null, unsupported: false });
  });
});

test("validateQoderCliPat returns auth failures with actionable error", async () => {
  await withStubQoderCli(async () => {
    const result = await validateQoderCliPat({ apiKey: "pt-bad-token" });
    assert.equal(result.valid, false);
    assert.match(result.error, /not authorized|integrations/i);
    assert.equal(result.unsupported, false);
  });
});

test("validateQoderCliPat reports a clear error when qodercli is missing", async () => {
  const prevBin = process.env.CLI_QODER_BIN;
  process.env.CLI_QODER_BIN = "/nonexistent/qodercli-please-fail";
  try {
    const result = await validateQoderCliPat({ apiKey: "pt-good-token" });
    assert.equal(result.valid, false);
    assert.match(result.error, /qodercli|CLI_QODER_BIN|not found/i);
  } finally {
    if (prevBin === undefined) delete process.env.CLI_QODER_BIN;
    else process.env.CLI_QODER_BIN = prevBin;
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

test("QoderExecutor: non-stream PAT completions route through the local qodercli binary", async () => {
  await withStubQoderCli(async () => {
    const executor = new QoderExecutor();
    const { response, url } = await executor.execute({
      model: "qwen3-coder-plus",
      body: { messages: [{ role: "user", content: "Reply with OK only." }] },
      stream: false,
      credentials: { apiKey: "pt-0pUI-test-token" },
    });

    assert.equal(url, "qodercli://stdio");
    assert.equal(response.status, 200);
    const payload = (await response.json()) as {
      object: string;
      choices: { message: { role: string; content: string } }[];
    };
    assert.equal(payload.object, "chat.completion");
    assert.equal(payload.choices[0].message.role, "assistant");
    assert.equal(payload.choices[0].message.content, "OK from stub");
  });
});

test("QoderExecutor: streaming PAT completions emit OpenAI-compatible SSE via qodercli", async () => {
  await withStubQoderCli(async () => {
    const executor = new QoderExecutor();
    const { response, url } = await executor.execute({
      model: "qwen3-coder-plus",
      body: { messages: [{ role: "user", content: "Reply with OK only." }] },
      stream: true,
      credentials: { apiKey: "pt-0pUI-test-token" },
    });

    assert.equal(url, "qodercli://stdio");
    assert.equal(response.status, 200);
    assert.match(response.headers.get("Content-Type") || "", /text\/event-stream/);
    const body = await response.text();
    assert.match(body, /"content":"OK from stub"/);
    assert.match(body, /"finish_reason":"stop"/);
    assert.match(body, /\[DONE\]/);
  });
});

test("QoderExecutor: PAT auth failure from qodercli surfaces a 401", async () => {
  await withStubQoderCli(async () => {
    const executor = new QoderExecutor();
    const { response, url } = await executor.execute({
      model: "qwen3-coder-plus",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: { apiKey: "pt-bad-token" },
    });

    assert.equal(url, "qodercli://stdio");
    assert.equal(response.status, 401);
    const payload = (await response.json()) as { error: { type: string } };
    assert.equal(payload.error.type, "authentication_error");
  });
});

test("QoderExecutor: non-stream calls target DashScope for non-PAT tokens and map alias models", async () => {
  const executor = new QoderExecutor();
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url, options) => {
    assert.equal(String(url), "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions");
    assert.equal(options.method, "POST");
    assert.equal(options.headers.Authorization, "Bearer sk_test");
    assert.equal(options.headers["x-dashscope-authtype"], "qwen-oauth");
    assert.equal(options.headers["user-agent"], getQwenCliUserAgent());
    assert.equal(options.headers["x-dashscope-useragent"], getQwenCliUserAgent());
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
      credentials: { apiKey: "sk_test" },
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

test("QoderExecutor: PAT completions never touch the (dead) Cosy HTTP endpoints", async () => {
  await withStubQoderCli(async () => {
    const executor = new QoderExecutor();
    const originalFetch = globalThis.fetch;
    let fetchCalls = 0;
    globalThis.fetch = async (...args) => {
      fetchCalls++;
      return originalFetch(...(args as Parameters<typeof fetch>));
    };
    try {
      const { response } = await executor.execute({
        model: "qwen3-coder-plus",
        body: { messages: [{ role: "user", content: "Reply with OK only." }] },
        stream: false,
        credentials: { apiKey: "pt-0pUI-test-token" },
      });
      assert.equal(response.status, 200);
      // No HTTP at all: PATs are served entirely by the local qodercli binary.
      assert.equal(fetchCalls, 0);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
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
