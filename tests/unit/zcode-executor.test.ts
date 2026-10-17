import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { cleanupTempDataDir } from "../_setup/tempDataDir.ts";
import type { ZcodeTurnSelection } from "../../open-sse/executors/zcode.ts";

const fixture = join(process.cwd(), "tests/fixtures/fake-zcode-app-server.mjs");
const TEST_DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-zcode-"));
process.env.DATA_DIR = TEST_DATA_DIR;

test.after(() => cleanupTempDataDir(TEST_DATA_DIR));

async function loadZcodeExecutor() {
  return import("../../open-sse/executors/zcode.ts");
}

function requestBody() {
  return {
    messages: [
      { role: "system", content: "You are a coding assistant." },
      { role: "user", content: "Reply with a short status." },
    ],
  };
}

test("ZCode waits for the signed-in provider to finish native registry hydration", async () => {
  const { ZcodeExecutor } = await loadZcodeExecutor();
  let views = 0;
  const executor = new ZcodeExecutor({
    startupTimeoutMs: 500,
    clientFactory: () => ({
      async start() {},
      async close() {},
      async call(_channel, method) {
        if (method === "initialize") return { available: true };
        if (method === "getView")
          return {
            providers:
              ++views < 2
                ? []
                : [
                    {
                      providerId: "account:zai-individual-coding-plan",
                      models: [{ modelId: "GLM-5.3-Flash", config: {} }],
                    },
                  ],
          };
        assert.equal(method, "generateWorkspaceText");
        return { text: "ready", finishReason: "stop" };
      },
    }),
  });
  const result = await executor.execute({
    model: "glm-5.3-flash",
    body: requestBody(),
    stream: false,
    credentials: {},
  });
  assert.equal(("response" in result ? result.response : result).status, 200);
  assert.equal(views, 2);
});

/** Live-shaped registry view: optionSpecs carry the native maxOutputTokens bound. */
function boundedSelectionView() {
  return {
    providers: [
      {
        providerId: "account:zai-individual-coding-plan",
        models: [
          {
            modelId: "GLM-5.3-Flash",
            config: {
              optionSpecs: {
                reasoningLevel: { values: ["low", "high", "max"] },
                maxOutputTokens: { max: 128000 },
              },
            },
          },
        ],
      },
    ],
  };
}

function capturingExecutor(
  view: unknown,
  Executor: new (
    options: import("../../open-sse/executors/zcode.ts").ZcodeExecutorOptions
  ) => import("../../open-sse/executors/zcode.ts").ZcodeExecutor
) {
  let captured: unknown[] = [];
  const executor = new Executor({
    clientFactory: () => ({
      async start() {},
      async close() {},
      async call(_channel: string, method: string, args: unknown[]) {
        if (method === "initialize") return { available: true };
        if (method === "getView") return view;
        assert.equal(method, "generateWorkspaceText");
        captured.push(args[0]);
        return { text: "fake zcode response", finishReason: "stop" };
      },
    }),
  });
  return { executor, calls: () => captured };
}

test("ZCode resolves the native bounded maxOutputTokens from the model option spec", async () => {
  const { resolveZcodeSelection, resolveZcodeMaxTokens } = await loadZcodeExecutor();
  const bounded = resolveZcodeSelection(boundedSelectionView(), "glm-5.3-flash");
  assert.deepEqual(bounded, {
    providerId: "account:zai-individual-coding-plan",
    modelId: "GLM-5.3-Flash",
    options: { reasoningLevel: "high" },
  });
  assert.equal(resolveZcodeMaxTokens(boundedSelectionView(), "glm-5.3-flash"), 128000);
  // Models without a token bound receive no fabricated limit.
  const unbounded = resolveZcodeSelection(
    {
      providers: [
        {
          providerId: "builtin:zai-coding-plan",
          models: [{ modelId: "glm-5.2", config: {} }],
        },
      ],
    },
    "glm-5.2"
  );
  assert.deepEqual(unbounded.options, undefined);
  assert.equal(resolveZcodeMaxTokens(unboundedView(), "glm-5.2"), undefined);
});

function unboundedView() {
  return {
    providers: [
      {
        providerId: "builtin:zai-coding-plan",
        models: [{ modelId: "glm-5.2", config: {} }],
      },
    ],
  };
}

test("ZCode always sends native-valid maxOutputTokens even when the caller omits a token limit", async () => {
  const { ZcodeExecutor } = await loadZcodeExecutor();
  const { executor, calls } = capturingExecutor(boundedSelectionView(), ZcodeExecutor);
  const result = await executor.execute({
    model: "glm-5.3-flash",
    body: requestBody(),
    stream: false,
    credentials: {},
  });
  const response = "response" in result ? result.response : result;
  assert.equal(response.status, 200);
  const args = calls()[0] as {
    selection: ZcodeTurnSelection;
    maxOutputTokens?: number;
  };
  assert.deepEqual(args.selection.options, { reasoningLevel: "high" });
  assert.equal(args.maxOutputTokens, 128000);
});

test("ZCode clamps caller token limits into the native model option range", async () => {
  const { ZcodeExecutor } = await loadZcodeExecutor();
  const { executor, calls } = capturingExecutor(boundedSelectionView(), ZcodeExecutor);
  const oversized = await executor.execute({
    model: "glm-5.3-flash",
    body: { messages: [{ role: "user", content: "status" }], max_tokens: 999999 },
    stream: false,
    credentials: {},
  });
  assert.equal(("response" in oversized ? oversized.response : oversized).status, 200);
  const withinRange = await executor.execute({
    model: "glm-5.3-flash",
    body: { messages: [{ role: "user", content: "status" }], max_completion_tokens: 512 },
    stream: false,
    credentials: {},
  });
  assert.equal(("response" in withinRange ? withinRange.response : withinRange).status, 200);
  const [first, second] = calls() as Array<{ maxOutputTokens?: number }>;
  assert.equal(first.maxOutputTokens, 128000);
  assert.equal(second.maxOutputTokens, 512);
});

test("ZCode selects exact native Coding Plan IDs and required reasoning without a custom-provider fallback", async () => {
  const { resolveZcodeSelection } = await loadZcodeExecutor();
  const view = {
    providers: [
      { providerId: "custom", models: [{ modelId: "glm-5.3-flash", config: {} }] },
      {
        providerId: "account:zai-individual-coding-plan",
        models: [
          {
            modelId: "GLM-5.3-Flash",
            config: { optionSpecs: { reasoningLevel: { values: ["low", "high", "max"] } } },
          },
        ],
      },
    ],
  };
  assert.deepEqual(resolveZcodeSelection(view, "glm-5.3-flash"), {
    providerId: "account:zai-individual-coding-plan",
    modelId: "GLM-5.3-Flash",
    options: { reasoningLevel: "high" },
  });
  assert.throws(
    () => resolveZcodeSelection({ providers: [view.providers[0]] }, "glm-5.3-flash"),
    /not enabled/
  );
  assert.throws(() => resolveZcodeSelection(view, "glm-5.3-flash", "missing"), /not enabled/);
  assert.deepEqual(
    resolveZcodeSelection(
      {
        providers: [
          { providerId: "builtin:zai-coding-plan", models: [{ modelId: "glm-5.2", config: {} }] },
        ],
      },
      "glm-5.2"
    ),
    {
      providerId: "builtin:zai-coding-plan",
      modelId: "glm-5.2",
    }
  );
});

test("ZCode accepts GLM Coding Plan models and rejects unsafe/unknown ids", async () => {
  const { resolveZcodeModel } = await loadZcodeExecutor();
  assert.deepEqual(resolveZcodeModel("glm-5.2"), { ok: true, model: "glm-5.2" });
  assert.equal(resolveZcodeModel("glm-5.2-high").ok, false);
  assert.equal(resolveZcodeModel("glm-5.3-low").ok, false);
  assert.equal(resolveZcodeModel("-unexpected").ok, false);
  assert.equal(resolveZcodeModel("unknown-model").ok, false);
});

test("ZCode uses native model inference and returns an OpenAI chat completion", async () => {
  const { ZcodeExecutor } = await loadZcodeExecutor();
  const executor = new ZcodeExecutor({
    command: process.execPath,
    args: [fixture],
    cwd: process.cwd(),
    requestTimeoutMs: 3000,
    turnTimeoutMs: 3000,
  });

  const result = await executor.execute({
    model: "glm-5.2",
    body: requestBody(),
    stream: false,
    credentials: {},
  });
  const response = "response" in result ? result.response : result;
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") || "", /application\/json/);
  const body = await response.json();
  assert.equal(body.object, "chat.completion");
  assert.equal(body.model, "glm-5.2");
  assert.equal(body.choices?.[0]?.message?.role, "assistant");
  assert.equal(body.choices?.[0]?.message?.content, "fake zcode response");
  assert.equal(body.choices?.[0]?.finish_reason, "stop");
});

test("ZCode buffers the model completion into OpenAI SSE when stream=true", async () => {
  const { ZcodeExecutor } = await loadZcodeExecutor();
  const executor = new ZcodeExecutor({
    command: process.execPath,
    args: [fixture],
    cwd: process.cwd(),
    requestTimeoutMs: 3000,
    turnTimeoutMs: 3000,
  });

  const result = await executor.execute({
    model: "glm-5.2",
    body: requestBody(),
    stream: true,
    credentials: {},
  });
  const response = "response" in result ? result.response : result;
  const text = await response.text();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") || "", /text\/event-stream/);
  assert.match(text, /fake zcode response/);
  assert.match(text, /data: \[DONE\]/);
});

test("ZCode forwards structured caller tools and tool results without native session execution", async () => {
  const { ZcodeExecutor } = await loadZcodeExecutor();
  const executor = new ZcodeExecutor({
    command: process.execPath,
    args: [fixture],
    cwd: process.cwd(),
    requestTimeoutMs: 3000,
  });
  const tool = {
    type: "function",
    function: {
      name: "lookup",
      description: "Lookup status",
      parameters: { type: "object", properties: { key: { type: "string" } }, required: ["key"] },
    },
  };
  const first = await executor.execute({
    model: "glm-5.3-flash",
    body: { messages: [{ role: "user", content: "Read bridge-check" }], tools: [tool] },
    stream: true,
    credentials: {},
  });
  const response = "response" in first ? first.response : first;
  const frames = (await response.text())
    .split("\n")
    .filter((line) => line.startsWith("data: {"))
    .map((line) => JSON.parse(line.slice(6)));
  const call = frames[0].choices[0].delta.tool_calls[0];
  assert.equal(call.function.name, "lookup");
  assert.deepEqual(JSON.parse(call.function.arguments), { key: "bridge-check" });
  assert.equal(frames[1].choices[0].finish_reason, "tool_calls");
  assert.equal(frames[1].usage.prompt_tokens, 100);
  assert.equal(frames[1].usage.prompt_tokens_details.cached_tokens, 30);
  const second = await executor.execute({
    model: "glm-5.3-flash",
    body: {
      messages: [
        { role: "user", content: "Read bridge-check" },
        {
          role: "assistant",
          content: null,
          tool_calls: [{ id: call.id, type: "function", function: call.function }],
        },
        { role: "tool", tool_call_id: call.id, content: "the actual value" },
      ],
      tools: [tool],
    },
    stream: false,
    credentials: {},
  });
  const body = await ("response" in second ? second.response : second).json();
  assert.equal(body.choices[0].message.content, "tool result consumed");
  assert.equal(body.choices[0].finish_reason, "stop");
});

test("ZCode keeps model errors as HTTP errors rather than empty success streams", async () => {
  const { ZcodeExecutor } = await loadZcodeExecutor();
  let closed = false;
  const executor = new ZcodeExecutor({
    clientFactory: () => ({
      async start() {},
      async close() {
        closed = true;
      },
      async call(_channel, method) {
        if (method === "initialize") return { available: true };
        if (method === "getView")
          return {
            providers: [
              {
                providerId: "account:zai-individual-coding-plan",
                models: [{ modelId: "GLM-5.3", config: {} }],
              },
            ],
          };
        throw Error("upstream refused this model request");
      },
    }),
  });
  const result = await executor.execute({
    model: "glm-5.3",
    body: requestBody(),
    stream: true,
    credentials: {},
  });
  const response = "response" in result ? result.response : result;
  assert.equal(response.status, 502);
  assert.match((await response.json()).error.message, /upstream refused/);
  assert.equal(closed, true);
});

test("ZCode preserves image pixels and surrounding text as native image blocks", async () => {
  const { buildZcodeModelRequest } = await loadZcodeExecutor();
  const url = "data:image/png;base64,aGVsbG8=";
  const request = buildZcodeModelRequest({
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "Before" },
          { type: "image_url", image_url: { url } },
          { type: "text", text: "After" },
        ],
      },
    ],
  });
  assert.deepEqual(request.messages, [
    {
      role: "user",
      content: [
        { type: "text", text: "Before" },
        { type: "image", dataUrl: url, mediaType: "image/png" },
        { type: "text", text: "After" },
      ],
    },
  ]);
});

test("ZCode forwards resolved images over native RPC and rejects private remote image URLs", async () => {
  const { ZcodeExecutor } = await loadZcodeExecutor();
  const executor = new ZcodeExecutor({
    command: process.execPath,
    args: [fixture],
    cwd: process.cwd(),
    requestTimeoutMs: 3000,
  });
  const content = [
    { type: "text", text: "Inspect" },
    { type: "image_url", image_url: { url: "data:image/png;base64,aGVsbG8=" } },
  ];
  const result = await executor.execute({
    model: "glm-5.3-flash",
    body: { messages: [{ role: "user", content }] },
    stream: false,
    credentials: {},
  });
  const body = await ("response" in result ? result.response : result).json();
  assert.equal(body.choices[0].message.content, "native image received");
  content[1].image_url!.url = "http://127.0.0.1/private.png";
  const blocked = await executor.execute({
    model: "glm-5.3-flash",
    body: { messages: [{ role: "user", content }] },
    stream: false,
    credentials: {},
  });
  assert.equal(("response" in blocked ? blocked.response : blocked).status, 400);
});

test("ZCode rejects image input for text-only models before starting native inference", async () => {
  const { ZcodeExecutor } = await loadZcodeExecutor();
  const executor = new ZcodeExecutor({
    clientFactory() {
      throw new Error("Native inference must not start for unsupported images");
    },
  });
  const result = await executor.execute({
    model: "glm-5.3",
    body: {
      messages: [
        {
          role: "user",
          content: [{ type: "image_url", image_url: { url: "data:image/png;base64,aGVsbG8=" } }],
        },
      ],
    },
    stream: false,
    credentials: {},
  });
  const response = "response" in result ? result.response : result;
  assert.equal(response.status, 400);
  assert.match((await response.json()).error.message, /does not support image input/);
});

test("ZCode rejects unsupported non-image content instead of silently discarding it", async () => {
  const { buildZcodeModelRequest } = await loadZcodeExecutor();
  assert.throws(
    () =>
      buildZcodeModelRequest({
        messages: [
          {
            role: "user",
            content: [{ type: "input_audio", input_audio: { data: "abc", format: "wav" } }],
          },
        ],
      }),
    /text input only/
  );
  assert.deepEqual(
    buildZcodeModelRequest({
      messages: [
        { role: "developer", content: "policy" },
        { role: "user", content: "question" },
      ],
      tools: [],
      max_tokens: 512,
    }),
    {
      messages: [
        { role: "system", content: "policy" },
        { role: "user", content: "question" },
      ],
      tools: [],
      maxOutputTokens: 512,
    }
  );
});
