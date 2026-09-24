import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";

// Regression for #14628: the buffered tool path of DeepSeekWebExecutor ran the
// reply through parseDeepSeekToolCalls(), which understands DeepSeek's DSML
// tool-call dialects (single-pipe <｜DSML｜:Tool> and the double-pipe invoke
// grammar from #14208). The issue reports that when tools are requested with
// stream:true the raw DSML markup was forwarded as visible content with
// finish_reason "stop" — the buffered path must produce tool_calls with
// finish_reason "tool_calls" regardless of how the client asked to stream.
//
// These tests pin that contract end-to-end through executor.execute() with a
// stubbed upstream: auth, session, PoW and the completion POST all answer from
// a scripted fetch, and the completion streams a DeepSeek SSE body carrying a
// double-pipe DSML block with two invokes (the multi-invoke shape from the
// issue).

const { DeepSeekWebExecutor } = await import("../../open-sse/executors/deepseek-web.ts");
type ExecuteInput = Parameters<InstanceType<typeof DeepSeekWebExecutor>["execute"]>[0];

const FW = "\uFF5C";
const O = (s: string) => `<${FW}${FW}DSML${FW}${FW} ${s}>`;
const C = (s: string) => `</${FW}${FW}DSML${FW}${FW} ${s}>`;

const BASH_TOOL = {
  type: "function",
  function: {
    name: "bash",
    description: "Run a shell command",
    parameters: { type: "object", properties: { command: { type: "string" } } },
  },
};

function sseBody(fragments: unknown[]): ReadableStream {
  const encoder = new TextEncoder();
  const lines = fragments.map((f) => `data: ${JSON.stringify({ p: "response/fragments", v: f })}`);
  const chunks = [
    ...lines,
    "data: " + JSON.stringify({ p: "response/status", o: "APPEND", v: "FINISHED" }),
    "data: [DONE]",
  ];
  let i = 0;
  return new ReadableStream({
    pull(controller) {
      if (i < chunks.length) controller.enqueue(encoder.encode(chunks[i++] + "\n"));
      else controller.close();
    },
  });
}

function dsmlFragments(): string[] {
  const block = [
    O("calls"),
    O('invoke name="bash"'),
    O('parameter name="command" string="true"') +
      "python --version; pip --version" +
      C("parameter"),
    C("invoke"),
    O('invoke name="bash"'),
    O('parameter name="command" string="true"') +
      'Test-Path -LiteralPath "C:/Users/ali/Documents/Default Project"' +
      C("parameter"),
    C("invoke"),
    C("calls"),
  ].join("\n");
  // Split the DSML block across two ANSWER fragments so the fixture also covers
  // buffered (not single-chunk) parsing.
  const mid = Math.floor(block.length / 2);
  return [
    { type: "ANSWER", content: block.slice(0, mid) },
    { type: "ANSWER", content: block.slice(mid) },
  ];
}

const originalFetch = globalThis.fetch;

/**
 * Full upstream stub: auth, session, PoW and completion all answer from this
 * one handler. `fragments` are the DeepSeek ANSWER fragments streamed by the
 * completion endpoint. The PoW challenge is the self-consistent difficulty-1
 * pair derived above, so the real solver answers nonce 0 in one hash.
 */
function stubUpstream(fragments: unknown[]) {
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    const url = String(input);
    if (url.includes("/v0/chat/completion")) {
      return new Response(sseBody(fragments), {
        status: 200,
        headers: { "Content-Type": "text/event-stream" },
      });
    }
    if (url.includes("/v0/users/current")) {
      return new Response(
        JSON.stringify({ code: 0, data: { biz_data: { token: "access-token-x" } } }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
    if (url.includes("/v0/chat_session/create")) {
      return new Response(
        JSON.stringify({ code: 0, data: { biz_data: { chat_session: { id: "sess-1" } } } }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
    if (url.includes("/v0/chat/create_pow_challenge")) {
      return new Response(
        JSON.stringify({
          code: 0,
          data: {
            biz_data: {
              challenge: {
                algorithm: "DeepSeekHashV1",
                // deepSeekHashV1("s_0_0") is exactly this digest, so the real
                // solver answers nonce 0 in one hash instead of burning real
                // CPU in a unit test.
                challenge: "0f66809382e5ea47a4d50c86d94d70d5e15b0daa29ddb93548425c9b82f6247f",
                salt: "s",
                difficulty: 1,
                expire_at: 0,
                signature: "sig",
                target_path: "/api/v0/chat/completion",
              },
            },
          },
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
    if (url.includes("/v0/chat_session/delete")) {
      return new Response(JSON.stringify({ code: 0 }), { status: 200 });
    }
    throw new Error("unexpected fetch in test: " + url);
  }) as typeof fetch;
}

before(() => {
  stubUpstream(dsmlFragments());
});

after(() => {
  globalThis.fetch = originalFetch;
});

async function drainSSE(response: Response): Promise<string> {
  return await response.text();
}

describe("DeepSeekWebExecutor — buffered tool path (#14628)", () => {
  it("converts a streamed double-pipe DSML block into tool_calls with finish_reason tool_calls, not leaked content", async () => {
    const executor = new DeepSeekWebExecutor();
    const result = await executor.execute({
      model: "deepseek-v4-pro-think",
      body: {
        messages: [{ role: "user", content: "run the checks" }],
        tools: [BASH_TOOL],
      },
      stream: true,
      credentials: { apiKey: "user-token-abc" },
      signal: null,
      log: {
        info: (t: string, m: string) => console.error(`[${t}] ${m}`),
        warn: (t: string, m: string) => console.error(`[${t}] ${m}`),
        error: (t: string, m: string) => console.error(`[${t}] ${m}`),
      },
    } as unknown as ExecuteInput);

    assert.equal(result.response.status, 200);
    const ctype = result.response.headers.get("content-type") || "";
    assert.ok(ctype.includes("text/event-stream"), `expected SSE, got ${ctype}`);

    const body = await drainSSE(result.response);
    const chunks = body
      .split("\n")
      .filter((l) => l.startsWith("data: ") && l !== "data: [DONE]")
      .map((l) => JSON.parse(l.slice(6)));

    const toolCallChunk = chunks.find((c) => c.choices?.[0]?.delta?.tool_calls);
    const finish = chunks
      .map((c) => c.choices?.[0]?.finish_reason)
      .filter(Boolean)
      .pop();

    assert.ok(toolCallChunk, "no tool_calls delta in stream — DSML leaked as content?");
    const calls = toolCallChunk.choices[0].delta.tool_calls;
    assert.equal(calls.length, 2, "both invokes must become tool_calls");
    assert.equal(calls[0].function.name, "bash");
    assert.deepEqual(JSON.parse(calls[0].function.arguments), {
      command: "python --version; pip --version",
    });
    assert.deepEqual(JSON.parse(calls[1].function.arguments), {
      command: 'Test-Path -LiteralPath "C:/Users/ali/Documents/Default Project"',
    });
    assert.equal(finish, "tool_calls");

    const contentDeltas = chunks
      .map((c) => c.choices?.[0]?.delta?.content)
      .filter((t) => typeof t === "string" && t.length > 0)
      .join("");
    assert.ok(
      !contentDeltas.includes(FW),
      "fullwidth-pipe markup must not reach the client as content"
    );
    assert.ok(!contentDeltas.includes("DSML"), "DSML grammar must not reach the client as content");
  });

  it("keeps plain (tool-free) streaming content flowing untouched", async () => {
    stubUpstream([
      { type: "ANSWER", content: "hello " },
      { type: "ANSWER", content: "world" },
    ]);

    const executor = new DeepSeekWebExecutor();
    const result = await executor.execute({
      model: "deepseek-v4-pro-think",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: true,
      credentials: { apiKey: "user-token-abc" },
      signal: null,
      log: null,
    } as unknown as ExecuteInput);

    assert.equal(result.response.status, 200);
    const body = await drainSSE(result.response);
    const chunks = body
      .split("\n")
      .filter((l) => l.startsWith("data: ") && l !== "data: [DONE]")
      .map((l) => JSON.parse(l.slice(6)));
    const text = chunks.map((c) => c.choices?.[0]?.delta?.content || "").join("");
    assert.match(text, /hello\s*world/);
    const finish = chunks
      .map((c) => c.choices?.[0]?.finish_reason)
      .filter(Boolean)
      .pop();
    assert.equal(finish, "stop");
  });
});
