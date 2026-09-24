/**
 * The executor is one shared instance per provider alias, and its requests overlap. What is
 * known about a request (its target format, the client session) used to be kept in fields of
 * that instance, so a request finishing in the middle of another one changed what the other
 * one saw. The visible symptom: a JSON caller of a Responses model, slow to answer, got the raw
 * event stream back instead of a JSON body once a Chat request finished in the meantime, because
 * the rebuild that turns the stream into JSON read the format the other request had just cleared.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { OpencodeExecutor } from "../../open-sse/executors/opencode.ts";
import { runInRequestContext } from "../../open-sse/executors/opencodeRequestContext.ts";

const RESPONSES_SSE =
  'event: response.completed\ndata: {"type":"response.completed","response":{"id":"resp-1","object":"response","status":"completed","output":[{"type":"message","role":"assistant","content":[{"type":"output_text","text":"hi from responses"}]}]}}\n\n';
const CHAT_SSE =
  'data: {"id":"gen-1","object":"chat.completion.chunk","choices":[{"index":0,"delta":{"content":"ok"},"finish_reason":null}]}\n\n' +
  'data: {"id":"gen-1","object":"chat.completion.chunk","choices":[{"index":0,"delta":{},"finish_reason":"stop"}]}\n\n' +
  "data: [DONE]\n\n";

const READ_TOOL = { type: "function", function: { name: "read", parameters: { type: "object" } } };

async function exec(
  executor: OpencodeExecutor,
  model: string,
  body: object,
  stream: boolean
): Promise<Response> {
  const result = (await executor.execute({
    model,
    body,
    stream,
    signal: null,
    credentials: { apiKey: "k", accessToken: null, connectionId: "c" },
    log: { debug() {}, info() {}, warn() {}, error() {} },
  })) as { response: Response };
  return result.response;
}

test("a slow Responses request that wants JSON is not affected by a Chat request finishing meanwhile", async () => {
  const originalFetch = globalThis.fetch;
  let release!: () => void;
  const gate = new Promise<void>((resolve) => {
    release = resolve;
  });
  globalThis.fetch = (async (_input: RequestInfo | URL, init?: RequestInit) => {
    const sent = JSON.parse(String(init?.body ?? "{}")) as { model?: string };
    if (String(sent.model).startsWith("muse-spark")) {
      await gate;
      return new Response(RESPONSES_SSE, {
        status: 200,
        headers: { "Content-Type": "text/event-stream" },
      });
    }
    return new Response(CHAT_SSE, {
      status: 200,
      headers: { "Content-Type": "text/event-stream" },
    });
  }) as typeof globalThis.fetch;

  try {
    const executor = new OpencodeExecutor("opencode-zen");
    const slow = exec(
      executor,
      "muse-spark-1.3-contributor-free",
      {
        model: "muse-spark-1.3-contributor-free",
        input: [{ type: "message", role: "user", content: [{ type: "input_text", text: "hi" }] }],
        instructions: "You are helpful.",
        tools: [{ type: "function", name: "read", parameters: { type: "object" } }],
      },
      false
    );
    await new Promise((resolve) => setImmediate(resolve));
    const quick = await exec(
      executor,
      "nemotron-3.5-lightning-free",
      {
        model: "nemotron-3.5-lightning-free",
        messages: [{ role: "user", content: "hi" }],
        tools: [READ_TOOL],
      },
      true
    );
    await quick.body?.cancel();
    release();

    const response = await slow;
    const text = await response.text();
    assert.ok(
      text.includes("hi from responses"),
      `the caller got its content back, not ${text.slice(0, 40)}`
    );
    assert.ok(!text.startsWith("event:"), "and not the raw event stream");
    assert.doesNotThrow(() => JSON.parse(text), "as a JSON body");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

type Fields = { _requestFormat: string | null; _clientSession: string | undefined };
const tick = () => new Promise((resolve) => setImmediate(resolve));

test("each request in flight keeps its own client session and format", async () => {
  const executor = new OpencodeExecutor("opencode-zen") as unknown as Fields;
  const flow = (session: string, format: string) =>
    runInRequestContext(async () => {
      executor._clientSession = session;
      executor._requestFormat = format;
      await tick();
      await tick();
      return [executor._clientSession, executor._requestFormat];
    });
  const [a, b] = await Promise.all([flow("ses_A", "claude"), flow("ses_B", "openai-responses")]);
  assert.deepEqual(a, ["ses_A", "claude"]);
  assert.deepEqual(b, ["ses_B", "openai-responses"]);
});

test("a request that ends does not clear what another one is still using", async () => {
  const executor = new OpencodeExecutor("opencode-zen") as unknown as Fields;
  let release!: () => void;
  const gate = new Promise<void>((resolve) => {
    release = resolve;
  });
  const slow = runInRequestContext(async () => {
    executor._requestFormat = "openai-responses";
    await gate;
    return executor._requestFormat;
  });
  await runInRequestContext(async () => {
    executor._requestFormat = "openai";
    executor._requestFormat = null;
  });
  release();
  assert.equal(await slow, "openai-responses");
});

test("outside execute() the fields are plain fields and a request context does not leak into them", () => {
  const executor = new OpencodeExecutor("opencode-zen") as unknown as Fields;
  executor._requestFormat = "claude";
  executor._clientSession = "ses_direct";
  runInRequestContext(() => {
    executor._requestFormat = "openai";
    executor._clientSession = "ses_inside";
  });
  assert.equal(executor._requestFormat, "claude");
  assert.equal(executor._clientSession, "ses_direct");
});
