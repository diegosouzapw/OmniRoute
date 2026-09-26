// Wiring guard for #14864: both handleChatCore usage call sites (non-streaming and streaming)
// must hand the resolved session turn to saveRequestUsage. Real handleChatCore, mocked upstream.
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-session-turn-wiring-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const featureFlagsDb = await import("../../src/lib/db/featureFlags.ts");
const { waitForCallLogSaves } = await import("../../src/lib/usage/callLogs.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");
const { BaseGuardrail, guardrailRegistry, resetGuardrailsForTests } =
  await import("../../src/lib/guardrails/index.ts");
const { handleFusionChat } = await import("../../open-sse/services/fusion.ts");

const CAPTURE_FLAG = "AGENT_SESSION_MESSAGES_ENABLED";
const originalFetch = globalThis.fetch;

test.before(() => {
  featureFlagsDb.setFeatureFlagOverride(CAPTURE_FLAG, "true");
});

test.after(async () => {
  globalThis.fetch = originalFetch;
  await waitForCallLogSaves(5_000);
  featureFlagsDb.removeFeatureFlagOverride(CAPTURE_FLAG);
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const noopLog = () => ({ debug() {}, info() {}, warn() {}, error() {} });

async function flushAsyncSideEffects() {
  for (let i = 0; i < 10; i++) await new Promise((resolve) => setImmediate(resolve));
  await waitForCallLogSaves(5_000);
}

type StoredTurn = { user_text: string; assistant_text: string | null; tool_names: string | null };

function storedTurns(prompt: string): StoredTurn[] {
  return core
    .getDbInstance()
    .prepare(
      "SELECT user_text, assistant_text, tool_names FROM agent_session_messages WHERE user_text = ?"
    )
    .all(prompt) as StoredTurn[];
}

function storedTurn(prompt: string): StoredTurn | undefined {
  return storedTurns(prompt)[0];
}

type ChatCoreRun = {
  prompt: string;
  stream: boolean;
  sessionId: string;
  provider?: string;
  model?: string;
  endpoint?: string;
  clientRawRequest?: { endpoint: string; body: Record<string, unknown>; headers: Headers };
  expectSuccess?: boolean;
};

function chatBody(run: ChatCoreRun): Record<string, unknown> {
  return {
    model: run.model ?? "gpt-4o-mini",
    messages: [{ role: "user", content: run.prompt }],
    max_tokens: 16,
    stream: run.stream,
  };
}

function clientRequestFor(run: ChatCoreRun) {
  return {
    endpoint: run.endpoint ?? "/v1/chat/completions",
    body: chatBody(run),
    headers: new Headers({ accept: "application/json", "x-claude-code-session-id": run.sessionId }),
  };
}

async function runChatCore(run: ChatCoreRun): Promise<string> {
  const result = await handleChatCore({
    body: chatBody(run),
    modelInfo: {
      provider: run.provider ?? "openai",
      model: run.model ?? "gpt-4o-mini",
      extendedContext: false,
    },
    credentials: { apiKey: "sk-test-not-real", providerSpecificData: {} },
    log: noopLog(),
    apiKeyInfo: { id: "key-alice-id", name: "key-alice", noLog: false },
    clientRawRequest: run.clientRawRequest ?? clientRequestFor(run),
    userAgent: "claude-cli/2.1.0 (external, cli)",
  });
  assert.equal(result.success, run.expectSuccess ?? true);
  const clientText = run.stream && result.success ? await result.response.text() : "";
  await flushAsyncSideEffects();
  return clientText;
}

const chatCompletion = (content: string) =>
  Response.json({
    id: "chatcmpl_wire_1",
    object: "chat.completion",
    created: 1,
    model: "gpt-4o-mini",
    choices: [{ index: 0, message: { role: "assistant", content }, finish_reason: "stop" }],
    usage: { prompt_tokens: 5, completion_tokens: 3, total_tokens: 8 },
  });

const sseResponse = (frames: unknown[]) =>
  new Response(frames.map((frame) => `data: ${JSON.stringify(frame)}\n\n`).join(""), {
    status: 200,
    headers: { "Content-Type": "text/event-stream" },
  });

test("non-streaming handleChatCore stores the session turn", async () => {
  globalThis.fetch = async () => chatCompletion("Non-streamed answer.");

  await runChatCore({ prompt: "wiring non-stream prompt", stream: false, sessionId: "wire-json" });

  const row = storedTurn("wiring non-stream prompt");
  assert.ok(row, "a turn row is stored");
  assert.equal(row.assistant_text, "Non-streamed answer.");
});

test("non-streaming handleChatCore stores the sanitized client-visible text", async () => {
  globalThis.fetch = async () => chatCompletion("<think>private chain</think>Visible answer.");

  await runChatCore({
    prompt: "wiring sanitized prompt",
    stream: false,
    sessionId: "wire-sanitized",
    model: "deepseek-r1",
  });

  assert.equal(storedTurn("wiring sanitized prompt")?.assistant_text, "Visible answer.");
});

test("streaming handleChatCore stores the session turn with tool names", async () => {
  const chunk = (delta: Record<string, unknown>, finishReason: string | null = null) => ({
    id: "chatcmpl_wire_2",
    object: "chat.completion.chunk",
    created: 1,
    model: "gpt-4o-mini",
    choices: [{ index: 0, delta, finish_reason: finishReason }],
  });
  globalThis.fetch = async () =>
    sseResponse([
      chunk({ role: "assistant", content: "Streamed answer." }),
      chunk({
        tool_calls: [
          { index: 0, id: "call_1", type: "function", function: { name: "Bash", arguments: "{}" } },
        ],
      }),
      chunk({}, "tool_calls"),
    ]);

  await runChatCore({ prompt: "wiring stream prompt", stream: true, sessionId: "wire-sse" });

  const row = storedTurn("wiring stream prompt");
  assert.ok(row, "a turn row is stored");
  assert.equal(row.assistant_text, "Streamed answer.");
  assert.deepEqual(JSON.parse(String(row.tool_names)), ["Bash"]);
});

test("streaming /v1/messages Claude passthrough stores tool names off the wire", async () => {
  globalThis.fetch = async () =>
    sseResponse([
      {
        type: "message_start",
        message: { id: "msg_1", model: "claude-sonnet-4", role: "assistant", usage: {} },
      },
      { type: "content_block_start", index: 0, content_block: { type: "text", text: "" } },
      { type: "content_block_delta", index: 0, delta: { type: "text_delta", text: "Reading." } },
      { type: "content_block_stop", index: 0 },
      {
        type: "content_block_start",
        index: 1,
        content_block: { type: "tool_use", id: "toolu_1", name: "Read", input: {} },
      },
      {
        type: "content_block_delta",
        index: 1,
        delta: { type: "input_json_delta", partial_json: '{"file_path":"a.ts"}' },
      },
      { type: "content_block_stop", index: 1 },
      { type: "message_delta", delta: { stop_reason: "tool_use" }, usage: { output_tokens: 5 } },
      { type: "message_stop" },
    ]);

  const clientText = await runChatCore({
    prompt: "wiring claude prompt",
    stream: true,
    sessionId: "wire-claude",
    provider: "claude",
    model: "claude-sonnet-4",
    endpoint: "/v1/messages",
  });

  const row = storedTurn("wiring claude prompt");
  assert.ok(row, "a turn row is stored");
  assert.equal(row.assistant_text, "Reading.");
  assert.deepEqual(JSON.parse(String(row.tool_names)), ["Read"]);
  assert.ok(!clientText.includes("tool_calls"), "the client stream stays Claude-shaped");
});

test("streaming /v1/messages translated from a Gemini upstream stores the tool names", async () => {
  globalThis.fetch = async () =>
    sseResponse([
      { candidates: [{ content: { role: "model", parts: [{ text: "Searching." }] } }] },
      {
        candidates: [
          {
            content: {
              role: "model",
              parts: [{ functionCall: { name: "Glob", args: { pattern: "*.ts" } } }],
            },
            finishReason: "STOP",
          },
        ],
        usageMetadata: { promptTokenCount: 4, candidatesTokenCount: 5, totalTokenCount: 9 },
      },
    ]);

  const clientText = await runChatCore({
    prompt: "wiring gemini prompt",
    stream: true,
    sessionId: "wire-gemini",
    provider: "gemini",
    model: "gemini-2.5-flash",
    endpoint: "/v1/messages",
  });

  assert.ok(clientText.includes('"tool_use"'), "the Claude client received a tool_use block");
  const row = storedTurn("wiring gemini prompt");
  assert.ok(row, "a turn row is stored");
  assert.equal(row.assistant_text, "Searching.");
  assert.deepEqual(JSON.parse(String(row.tool_names)), ["Glob"]);
});

test("two attempts for one client request (combo fallback) store a single turn", async () => {
  const run: ChatCoreRun = {
    prompt: "wiring combo prompt",
    stream: false,
    sessionId: "wire-combo",
  };
  const clientRawRequest = clientRequestFor(run);

  globalThis.fetch = async () => chatCompletion("Rejected by the combo quality check.");
  await runChatCore({ ...run, clientRawRequest });
  globalThis.fetch = async () => chatCompletion("Accepted fallback answer.");
  await runChatCore({ ...run, clientRawRequest });

  assert.deepEqual(
    storedTurns("wiring combo prompt").map((row) => row.assistant_text),
    ["Accepted fallback answer."]
  );
});

test("a reply blocked by a post-call guardrail stores no turn", async () => {
  class BlockEveryReply extends BaseGuardrail {
    constructor() {
      super("test-block-every-reply", { priority: 1 });
    }
    async postCall() {
      return { block: true, message: "blocked by test guardrail" };
    }
  }
  guardrailRegistry.register(new BlockEveryReply());
  globalThis.fetch = async () => chatCompletion("Text the client never receives.");
  try {
    await runChatCore({
      prompt: "wiring blocked prompt",
      stream: false,
      sessionId: "wire-blocked",
      expectSuccess: false,
    });
  } finally {
    resetGuardrailsForTests();
  }

  assert.deepEqual(storedTurns("wiring blocked prompt"), []);
});

test("streaming with PII response sanitization stores the redacted text", async () => {
  featureFlagsDb.setFeatureFlagOverride("PII_RESPONSE_SANITIZATION", "true");
  const chunk = (delta: Record<string, unknown>, finishReason: string | null = null) => ({
    id: "chatcmpl_wire_pii",
    object: "chat.completion.chunk",
    created: 1,
    model: "gpt-4o-mini",
    choices: [{ index: 0, delta, finish_reason: finishReason }],
  });
  globalThis.fetch = async () =>
    sseResponse([
      chunk({ role: "assistant", content: "Reach alice@example.com now." }),
      chunk({}, "stop"),
    ]);
  let clientText = "";
  try {
    clientText = await runChatCore({
      prompt: "wiring pii prompt",
      stream: true,
      sessionId: "wire-pii",
    });
  } finally {
    featureFlagsDb.removeFeatureFlagOverride("PII_RESPONSE_SANITIZATION");
  }

  assert.ok(!clientText.includes("alice@example.com"), "the client stream is redacted");
  assert.equal(storedTurn("wiring pii prompt")?.assistant_text, "Reach [EMAIL_REDACTED] now.");
});

// ──────────────── Concurrent attempts: fusion panel and overlapping combo attempts ────────────────

type Deferred = { promise: Promise<Response>; resolve: (response: Response) => void };
const deferred = (): Deferred => {
  let resolve: (response: Response) => void = () => {};
  const promise = new Promise<Response>((done) => {
    resolve = done;
  });
  return { promise, resolve };
};

const upstreamError = () =>
  new Response(
    JSON.stringify({ error: { message: "bad request", type: "invalid_request_error" } }),
    {
      status: 400,
      headers: { "Content-Type": "application/json" },
    }
  );

/** Routes the mocked upstream by the requested model name. */
function routeFetchByModel(routes: Record<string, () => Response | Promise<Response>>) {
  globalThis.fetch = async (_url: RequestInfo | URL, init?: RequestInit) => {
    const model = String(JSON.parse(String(init?.body ?? "{}")).model ?? "");
    const route = Object.entries(routes).find(([name]) => model.endsWith(name));
    return route ? route[1]() : upstreamError();
  };
}

function chatCoreAttempt(model: string, clientRawRequest: ReturnType<typeof clientRequestFor>) {
  return handleChatCore({
    body: structuredClone(clientRawRequest.body),
    modelInfo: { provider: "openai", model, extendedContext: false },
    credentials: { apiKey: "sk-test-not-real", providerSpecificData: {} },
    log: noopLog(),
    apiKeyInfo: { id: "key-alice-id", name: "key-alice", noLog: false },
    clientRawRequest,
    userAgent: "claude-cli/2.1.0 (external, cli)",
  });
}

const settle = async () => {
  await new Promise((resolve) => setTimeout(resolve, 150));
  await flushAsyncSideEffects();
};

for (const lateOutcome of ["success", "failure"] as const) {
  test(`a late fusion panel ${lateOutcome} after the judge leaves the judge's turn intact`, async () => {
    const prompt = `wiring fusion ${lateOutcome} prompt`;
    const clientRawRequest = clientRequestFor({
      prompt,
      stream: false,
      sessionId: `wire-fusion-${lateOutcome}`,
    });
    const slowPanel = deferred();
    routeFetchByModel({
      "gpt-panel-a": () => chatCompletion("Panel A answer."),
      "gpt-panel-b": () => chatCompletion("Panel B answer."),
      "gpt-panel-c": () => slowPanel.promise,
      "gpt-judge": () => chatCompletion("Judged answer."),
    });

    const response = await handleFusionChat({
      body: structuredClone(clientRawRequest.body),
      models: ["openai/gpt-panel-a", "openai/gpt-panel-b", "openai/gpt-panel-c"],
      judgeModel: "openai/gpt-judge",
      tuning: { minPanel: 2, stragglerGraceMs: 20, panelHardTimeoutMs: 60_000 },
      log: { info() {}, warn() {}, debug() {} },
      handleSingleModel: async (_body, modelStr) => {
        const result = await chatCoreAttempt(
          modelStr.split("/").pop() ?? modelStr,
          clientRawRequest
        );
        return result.success ? result.response : upstreamError();
      },
    });
    assert.equal(response.ok, true);
    await settle();
    assert.deepEqual(
      storedTurns(prompt).map((row) => row.assistant_text),
      ["Judged answer."]
    );

    slowPanel.resolve(
      lateOutcome === "success" ? chatCompletion("Late panel C answer.") : upstreamError()
    );
    await settle();
    assert.deepEqual(
      storedTurns(prompt).map((row) => row.assistant_text),
      ["Judged answer."]
    );
  });
}

test("a fusion whose judge fails stores no panel turn", async () => {
  const prompt = "wiring fusion judge-failure prompt";
  const clientRawRequest = clientRequestFor({
    prompt,
    stream: false,
    sessionId: "wire-fusion-judge",
  });
  routeFetchByModel({
    "gpt-panel-a": () => chatCompletion("Panel A answer."),
    "gpt-panel-b": () => chatCompletion("Panel B answer."),
    "gpt-judge": () => upstreamError(),
  });

  const response = await handleFusionChat({
    body: structuredClone(clientRawRequest.body),
    models: ["openai/gpt-panel-a", "openai/gpt-panel-b"],
    judgeModel: "openai/gpt-judge",
    tuning: { minPanel: 2, stragglerGraceMs: 20, panelHardTimeoutMs: 60_000 },
    log: { info() {}, warn() {}, debug() {} },
    handleSingleModel: async (_body, modelStr) => {
      const result = await chatCoreAttempt(modelStr.split("/").pop() ?? modelStr, clientRawRequest);
      return result.success ? result.response : upstreamError();
    },
  });
  assert.equal(response.ok, false);
  await settle();
  assert.deepEqual(storedTurns(prompt), [], "panel replies never reached the client");
});

test("an earlier combo attempt failing after the winner does not delete the winner's turn", async () => {
  const prompt = "wiring overlapping combo prompt";
  const clientRawRequest = clientRequestFor({ prompt, stream: false, sessionId: "wire-overlap" });
  const slowAttempt = deferred();
  routeFetchByModel({
    "gpt-slow": () => slowAttempt.promise,
    "gpt-fast": () => chatCompletion("Winner answer."),
  });

  const abandoned = chatCoreAttempt("gpt-slow", clientRawRequest);
  const winner = await chatCoreAttempt("gpt-fast", clientRawRequest);
  assert.equal(winner.success, true);
  await settle();
  assert.deepEqual(
    storedTurns(prompt).map((row) => row.assistant_text),
    ["Winner answer."]
  );

  slowAttempt.resolve(upstreamError());
  const late = await abandoned;
  assert.equal(late.success, false);
  await settle();
  assert.deepEqual(
    storedTurns(prompt).map((row) => row.assistant_text),
    ["Winner answer."]
  );
});
