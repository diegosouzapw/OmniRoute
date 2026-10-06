/**
 * Tests for the Cloudflare AI Playground (No Auth) provider.
 *
 * Validates:
 * - NOAUTH_PROVIDERS contains the cloudflare-playground entry (noAuth category)
 * - Registry entry has correct shape (authType none), curated 20-model catalog
 * - Executor resolves for both the primary id and the alias (cfp)
 * - cf_agent frame → OpenAI SSE translation, exercised with REAL frames captured
 *   from the playground on 2026-08-15 (including decoy RPC `done:true` frames
 *   that must NOT terminate the chat stream, and a real 3021 rate-limit error)
 * - Streaming + non-streaming responses, clean upstream errors (no stack traces)
 */
import test from "node:test";
import assert from "node:assert/strict";

import { NOAUTH_PROVIDERS } from "../../src/shared/constants/providers/noauth.ts";
import { REGISTRY } from "../../open-sse/config/providers/index.ts";
import { getExecutor } from "../../open-sse/executors/index.ts";
import {
  CloudflarePlaygroundExecutor,
  CfStreamParser,
  PlaywrightCfTransport,
  toCfMessages,
  type CfTransport,
} from "../../open-sse/executors/cloudflare-playground.ts";

const CHAT_ID = "chatcmpl-cfp-test123";

// ── Fixtures: REAL frames captured from the playground (2026-08-15) ─────────

const identityFrame = JSON.stringify({
  name: "playground-8d57d26b34b144108fd1f49d2",
  agent: "playground",
  type: "cf_agent_identity",
});
const stateFrame = JSON.stringify({
  state: {
    model: "@cf/zai-org/glm-4.7-flash",
    temperature: 1,
    stream: true,
    system: "You are a helpful assistant.",
  },
  type: "cf_agent_state",
});
/** Decoy: the setConfig RPC response also carries `done:true` — must be ignored. */
const decoyRpcDone = JSON.stringify({
  id: "cfp-config",
  done: true,
  type: "cf_agent_rpc_response",
});

const cfFrame = (chatId: string, body: unknown) =>
  JSON.stringify({ id: chatId, type: "cf_agent_use_chat_response", body: JSON.stringify(body) });

/** Full success stream built for a given chat id. */
const buildSuccessFrames = (chatId: string) => [
  identityFrame,
  stateFrame,
  decoyRpcDone,
  cfFrame(chatId, { type: "start" }),
  cfFrame(chatId, { type: "start-step" }),
  cfFrame(chatId, { type: "reasoning-start", id: "r1" }),
  cfFrame(chatId, { type: "reasoning-delta", delta: "thinking about it...", id: "r1" }),
  cfFrame(chatId, { type: "reasoning-end", id: "r1" }),
  cfFrame(chatId, { type: "text-start", id: "t1" }),
  cfFrame(chatId, { type: "text-delta", delta: "Hello ", id: "t1" }),
  cfFrame(chatId, { type: "text-delta", delta: "world!", id: "t1" }),
  cfFrame(chatId, { type: "finish-step" }),
  cfFrame(chatId, { type: "finish", messageMetadata: { finishReason: "stop" } }),
  JSON.stringify({ id: chatId, type: "cf_agent_use_chat_response", done: true }),
];

/** Real rate-limit error frame (kimi-k2.6, captured live), built for a chat id. */
const buildRateLimitFrame = (chatId: string) =>
  JSON.stringify({
    error: true,
    body: JSON.stringify({
      message: "The model is currently rate limited. Please wait a moment and try again.",
      details: "3021: rate limiting: inference request per min rate reached",
    }),
    done: false,
    id: chatId,
    type: "cf_agent_use_chat_response",
  });

class FakeTransport implements CfTransport {
  constructor(
    private framesList: string[],
    private fail: { status: number; message: string } | null = null
  ) {}

  async start(): Promise<{ ok: true } | { ok: false; status: number; message: string }> {
    return this.fail ? { ok: false, ...this.fail } : { ok: true };
  }

  async *frames(): AsyncGenerator<string> {
    for (const frame of this.framesList) yield frame;
  }

  async close(): Promise<void> {}
}

function makeExecutor(
  buildFrames: (chatId: string) => string[],
  fail?: { status: number; message: string }
) {
  return new CloudflarePlaygroundExecutor((chatId) => new FakeTransport(buildFrames(chatId), fail));
}

const executeArgs = (body: Record<string, unknown>, stream: boolean) =>
  ({ body, credentials: {}, signal: null, stream }) as unknown as Parameters<
    CloudflarePlaygroundExecutor["execute"]
  >[0];

// ── Catalog / NOAUTH_PROVIDERS ───────────────────────────────────────────────

test("cloudflare-playground is present in NOAUTH_PROVIDERS (noAuth category)", () => {
  const p = (NOAUTH_PROVIDERS as Record<string, unknown>)["cloudflare-playground"] as Record<
    string,
    unknown
  >;
  assert.ok(p, "NOAUTH_PROVIDERS['cloudflare-playground'] must exist");
  assert.equal(p.id, "cloudflare-playground");
  assert.equal(p.alias, "cfp");
  assert.equal((p.name as string).includes("Cloudflare"), true);
  assert.equal(p.noAuth, true);
  assert.equal(p.hasFree, true);
  assert.ok(typeof p.freeNote === "string" && (p.freeNote as string).length > 0);
  assert.ok(typeof p.authHint === "string" && (p.authHint as string).length > 0);
  assert.ok(typeof p.website === "string");
  assert.ok(new URL(p.website as string).hostname.endsWith(".cloudflare.com"));
});

test("cloudflare-playground registry entry has no-auth shape and curated models", () => {
  const entry = REGISTRY["cloudflare-playground"];
  assert.ok(entry, "REGISTRY['cloudflare-playground'] must exist");
  assert.equal(entry.alias, "cfp");
  assert.equal(entry.format, "openai");
  assert.equal(entry.executor, "cloudflare-playground");
  assert.equal(entry.authType, "none");
  assert.equal(entry.authHeader, "none");
  assert.equal(entry.baseUrl, "https://playground.ai.cloudflare.com");

  assert.ok(
    entry.models.length >= 15,
    `expected a curated catalog, got ${entry.models.length} models`
  );
  // No model id carries the upstream @cf/ prefix (executor adds it).
  for (const model of entry.models) {
    assert.ok(!model.id.startsWith("@cf/"), `model id must be prefix-free: ${model.id}`);
  }
  // Flagships present.
  const ids = new Set(entry.models.map((m) => m.id));
  for (const expected of [
    "zai-org/glm-5.2",
    "moonshotai/kimi-k2.6",
    "deepseek-ai/deepseek-v4-flash-0731",
    "openai/gpt-oss-120b",
    "qwen/qwen2.5-coder-32b-instruct",
  ]) {
    assert.ok(ids.has(expected), `expected model ${expected} in catalog`);
  }
  // Reasoning flags on the known thinking models.
  const glm = entry.models.find((m) => m.id === "zai-org/glm-5.2");
  assert.equal(glm?.supportsReasoning, true);
  const llama = entry.models.find((m) => m.id === "meta-llama/llama-3.3-70b-instruct-fp8-fast");
  assert.equal(llama?.supportsReasoning, undefined);
});

test("executor resolves for both the id and the cfp alias", async () => {
  const byId = await getExecutor("cloudflare-playground");
  const byAlias = await getExecutor("cfp");
  assert.ok(byId instanceof CloudflarePlaygroundExecutor);
  assert.ok(byAlias instanceof CloudflarePlaygroundExecutor);
});

// ── Frame → SSE translation (real captured traffic) ─────────────────────────

test("CfStreamParser translates a real captured stream (decoys ignored)", () => {
  const parser = new CfStreamParser(CHAT_ID);
  let events = 0;
  for (const frame of buildSuccessFrames(CHAT_ID)) {
    const event = parser.push(frame);
    if (event) events += 1;
  }
  assert.equal(parser.text, "Hello world!");
  assert.equal(parser.reasoningText, "thinking about it...");
  assert.equal(parser.finishReason, "stop");
  assert.equal(parser.done, true);
  assert.equal(parser.error, null);
  // role + 1 reasoning + 2 content + 1 finish
  assert.equal(events, 5);
});

test("CfStreamParser ignores done:true frames that belong to other ids/RPCs", () => {
  const parser = new CfStreamParser(CHAT_ID);
  // Decoy RPC response with done:true
  parser.push(decoyRpcDone);
  assert.equal(parser.done, false, "RPC done:true must not end the chat stream");
  // A chat-response frame for a DIFFERENT chat id
  parser.push(
    JSON.stringify({ id: "chatcmpl-OTHER", type: "cf_agent_use_chat_response", done: true })
  );
  assert.equal(parser.done, false, "foreign chat id must not end the stream");
  // The real one
  parser.push(JSON.stringify({ id: CHAT_ID, type: "cf_agent_use_chat_response", done: true }));
  assert.equal(parser.done, true);
});

test("CfStreamParser maps the real 3021 rate-limit frame to HTTP 429", () => {
  const parser = new CfStreamParser(CHAT_ID);
  parser.push(buildRateLimitFrame(CHAT_ID));
  assert.ok(parser.error, "rate-limit frame must surface as an error");
  assert.equal(parser.error?.status, 429);
  assert.ok((parser.error?.message ?? "").includes("rate limiting"));
  assert.equal(parser.done, false);
});

test("toCfMessages drops system/tool, flattens parts, keeps user/assistant", () => {
  const out = toCfMessages([
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: "hi" },
    { role: "assistant", content: [{ type: "text", text: "hello" }] },
    {
      role: "user",
      content: [
        { type: "text", text: "a" },
        { type: "text", text: "b" },
      ],
    },
    { role: "tool", content: "tool result" },
    { role: "user", content: "" },
  ]);
  assert.equal(out.length, 3);
  assert.deepEqual(out[0].parts, [{ type: "text", text: "hi" }]);
  assert.equal(out[1].parts[0].text, "hello");
  assert.equal(out[2].parts[0].text, "a\nb");
  assert.equal(out[0].role, "user");
  assert.equal(out[1].role, "assistant");
});

// ── Executor behavior (fake transport, real frames) ─────────────────────────

test("executor streams OpenAI SSE chunks from captured frames", async () => {
  const executor = makeExecutor(buildSuccessFrames);
  const result = await executor.execute(
    executeArgs(
      { model: "zai-org/glm-4.7-flash", messages: [{ role: "user", content: "hi" }] },
      true
    )
  );
  const response = result.response;
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /text\/event-stream/);

  const raw = await response.text();
  assert.ok(raw.endsWith("data: [DONE]\n\n"), "stream must end with [DONE]");

  const chunks = raw
    .split("\n")
    .filter((line) => line.startsWith("data: ") && line !== "data: [DONE]")
    .map((line) => JSON.parse(line.slice(6)));
  assert.ok(chunks.length >= 5, `expected several chunks, got ${chunks.length}`);

  const first = chunks[0];
  assert.equal(first.choices[0].delta.role, "assistant");
  assert.equal(first.choices[0].finish_reason, null);

  const reasoningChunk = chunks.find((c) => c.choices?.[0]?.delta?.reasoning_content);
  assert.equal(reasoningChunk?.choices?.[0]?.delta?.reasoning_content, "thinking about it...");

  const content = chunks
    .filter((c) => c.choices?.[0]?.delta?.content)
    .map((c) => c.choices[0].delta.content)
    .join("");
  assert.equal(content, "Hello world!");

  const last = chunks[chunks.length - 1];
  assert.equal(last.choices[0].finish_reason, "stop");
  assert.equal(last.model, "zai-org/glm-4.7-flash");
});

test("executor returns JSON for non-streaming requests", async () => {
  const executor = makeExecutor(buildSuccessFrames);
  const result = await executor.execute(
    executeArgs(
      { model: "moonshotai/kimi-k2.6", messages: [{ role: "user", content: "hi" }] },
      false
    )
  );
  const response = result.response;
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /application\/json/);

  const parsed = JSON.parse(await response.text()) as {
    choices: Array<{
      message: { content: string; reasoning_content?: string };
      finish_reason: string;
    }>;
    model: string;
  };
  assert.equal(parsed.choices[0].message.content, "Hello world!");
  assert.equal(parsed.choices[0].message.reasoning_content, "thinking about it...");
  assert.equal(parsed.choices[0].finish_reason, "stop");
  assert.equal(parsed.model, "moonshotai/kimi-k2.6");
});

test("executor surfaces the 3021 rate limit as a clean 429 (no stack traces)", async () => {
  const executor = makeExecutor((chatId) => [buildRateLimitFrame(chatId)]);
  const result = await executor.execute(
    executeArgs(
      { model: "moonshotai/kimi-k2.6", messages: [{ role: "user", content: "hi" }] },
      false
    )
  );
  assert.equal(result.response.status, 429);
  const parsed = JSON.parse(await result.response.text()) as {
    error: { message: string; type: string };
  };
  assert.ok(parsed.error.message.includes("rate limiting"));
  assert.equal(parsed.error.type, "upstream_error");
  assert.ok(!parsed.error.message.includes(" at "), "no stack-trace leak");
});

test("executor returns a clean 502 when the browser session cannot start", async () => {
  const executor = makeExecutor(buildSuccessFrames, {
    status: 502,
    message: "Cloudflare Playground browser session failed: boom",
  });
  const result = await executor.execute(
    executeArgs(
      { model: "zai-org/glm-4.7-flash", messages: [{ role: "user", content: "hi" }] },
      true
    )
  );
  assert.equal(result.response.status, 502);
  const parsed = JSON.parse(await result.response.text()) as { error: { message: string } };
  assert.ok(parsed.error.message.includes("browser session failed"));
  assert.ok(!parsed.error.message.includes(" at "), "no stack-trace leak");
});

test("executor prefixes bare model ids with @cf/ (upstream convention)", async () => {
  const seen: string[] = [];
  class CapturingTransport extends FakeTransport {
    async start(config: Parameters<CfTransport["start"]>[0]) {
      seen.push(config.model);
      return { ok: true } as const;
    }
  }
  const executor = new CloudflarePlaygroundExecutor(
    (chatId) => new CapturingTransport(buildSuccessFrames(chatId))
  );
  await executor.execute(
    executeArgs(
      { model: "zai-org/glm-4.7-flash", messages: [{ role: "user", content: "hi" }] },
      false
    )
  );
  assert.equal(seen.length, 1);
  assert.equal(seen[0], "@cf/zai-org/glm-4.7-flash");
});

// ── #10494: browser/transport resource leak on blocked-request paths ───────

test("PlaywrightCfTransport.start() closes the browser when Cloudflare Attention Required is detected", async () => {
  const playwright = await import("playwright");
  const originalLaunch = playwright.chromium.launch;
  let closeCalls = 0;

  playwright.chromium.launch = (async () =>
    ({
      newContext: async () => ({
        newPage: async () => ({
          goto: async () => {},
          title: async () => "Attention Required! | Cloudflare",
          exposeFunction: async () => {},
          evaluate: async () => {},
        }),
      }),
      close: async () => {
        closeCalls += 1;
      },
    }) as unknown as ReturnType<typeof playwright.chromium.launch>) as typeof playwright.chromium.launch;

  try {
    const transport = new PlaywrightCfTransport("chat-attention-required");
    const started = await transport.start({
      model: "@cf/test-model",
      messages: [],
      temperature: 0.7,
    });
    assert.equal(started.ok, false);
    if (started.ok === false) {
      assert.equal(started.status, 502);
    }
    assert.equal(closeCalls, 1, "browser launched for the challenge check must be closed");
  } finally {
    playwright.chromium.launch = originalLaunch;
  }
});

// ── #10494: streaming timeout must not be misreported as a clean [DONE] ────

/**
 * A transport whose frames() hangs (never yields) once its initial queue is
 * drained, mirroring PlaywrightCfTransport's real behavior: frames() only
 * resolves again once close() is called (real close() unblocks pending
 * waiters with null, ending the generator). This lets tests force the
 * executor's internal chat-timeout branch deterministically instead of
 * waiting for CHAT_TIMEOUT_MS.
 */
class HangingTransport implements CfTransport {
  closeCalls = 0;
  private closed = false;
  private queue: string[];
  private waiters: Array<(frame: string | null) => void> = [];

  constructor(initialFrames: string[] = []) {
    this.queue = [...initialFrames];
  }

  async start(): Promise<{ ok: true } | { ok: false; status: number; message: string }> {
    return { ok: true };
  }

  async *frames(): AsyncGenerator<string> {
    while (true) {
      if (this.queue.length > 0) {
        yield this.queue.shift()!;
        continue;
      }
      const frame = await new Promise<string | null>((resolve) => this.waiters.push(resolve));
      if (frame === null) return;
      yield frame;
    }
  }

  // Idempotent, mirroring PlaywrightCfTransport.close(): the timer callback
  // and the streaming finally block both call close() on the timeout path.
  async close(): Promise<void> {
    if (this.closed) return;
    this.closed = true;
    this.closeCalls += 1;
    for (const waiter of this.waiters.splice(0)) waiter(null);
  }
}

function parseSseChunks(raw: string) {
  return raw
    .split("\n\n")
    .filter((chunk) => chunk.startsWith("data: ") && chunk !== "data: [DONE]")
    .map((chunk) => JSON.parse(chunk.slice(6)));
}

test("streaming: an empty timeout (no frames at all) emits an explicit error chunk, not a bare [DONE]", async () => {
  const transport = new HangingTransport([]);
  const executor = new CloudflarePlaygroundExecutor(() => transport, 20);
  const result = await executor.execute(
    executeArgs(
      { model: "zai-org/glm-4.7-flash", messages: [{ role: "user", content: "hi" }] },
      true
    )
  );
  const raw = await result.response.text();
  assert.ok(raw.endsWith("data: [DONE]\n\n"), "stream must still end with [DONE]");
  assert.equal(transport.closeCalls, 1, "timed-out transport must be closed");

  const chunks = parseSseChunks(raw);
  assert.ok(chunks.length >= 1, "an error chunk must be emitted before [DONE]");
  const errorChunk = chunks.find((c) => c.error);
  assert.ok(errorChunk, "expected an explicit error chunk on timeout");
  assert.equal(errorChunk.error.type, "timeout_error");
  assert.equal(errorChunk.error.code, "HTTP_504");
  assert.ok(!errorChunk.error.message.includes(" at "), "no stack-trace leak");
});

test("streaming: a partial answer followed by a timeout emits content THEN an explicit error chunk", async () => {
  // The executor mints its own random chat id (chatcmpl-cfp-<uuid>) and only
  // the transportFactory receives it — frames must reference that same id or
  // CfStreamParser silently ignores them (see `msg.id !== this.chatId`
  // above). Build the partial frames from the factory callback, exactly like
  // buildSuccessFrames()/makeExecutor() do above.
  let transport!: HangingTransport;
  const executor = new CloudflarePlaygroundExecutor((chatId) => {
    const partialFrames = [
      JSON.stringify({
        id: chatId,
        type: "cf_agent_use_chat_response",
        body: JSON.stringify({ type: "start" }),
      }),
      JSON.stringify({
        id: chatId,
        type: "cf_agent_use_chat_response",
        body: JSON.stringify({ type: "text-delta", delta: "Hello", id: "t1" }),
      }),
    ];
    transport = new HangingTransport(partialFrames);
    return transport;
  }, 20);
  const result = await executor.execute(
    executeArgs(
      { model: "zai-org/glm-4.7-flash", messages: [{ role: "user", content: "hi" }] },
      true
    )
  );
  const raw = await result.response.text();
  assert.ok(raw.endsWith("data: [DONE]\n\n"));
  assert.equal(transport.closeCalls, 1);

  const chunks = parseSseChunks(raw);
  const content = chunks
    .filter((c) => c.choices?.[0]?.delta?.content)
    .map((c) => c.choices[0].delta.content)
    .join("");
  assert.equal(content, "Hello", "the partial content already streamed must not be dropped");

  const errorChunk = chunks.find((c) => c.error);
  assert.ok(errorChunk, "a partial-then-timeout stream must still surface an explicit error");
  assert.equal(errorChunk.error.type, "timeout_error");

  // The error chunk must come after the content, so a client processing the
  // stream in order sees the partial answer followed by a clear failure —
  // never a silent, successful-looking [DONE] right after partial content.
  const errorIndex = chunks.indexOf(errorChunk);
  const lastContentIndex = chunks.findLastIndex((c) => c.choices?.[0]?.delta?.content);
  assert.ok(errorIndex > lastContentIndex, "error chunk must follow the streamed content");
});
