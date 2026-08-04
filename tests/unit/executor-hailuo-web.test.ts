import { describe, it } from "node:test";
import assert from "node:assert/strict";

const mod = await import("../../open-sse/executors/hailuo-web.ts");

describe("HailuoWebExecutor", () => {
  it("can be instantiated", () => {
    const executor = new mod.HailuoWebExecutor();
    assert.ok(executor);
  });

  // Test vectors derived independently via Python's hashlib.md5 + urllib.parse.quote,
  // reproducing generate_yy_header()/get_body_to_yy() from g4f's crypt.py bit-for-bit:
  //
  //   import hashlib
  //   from urllib.parse import quote
  //   def hash_function(s): return hashlib.md5(s.encode()).hexdigest()
  //   def get_body_to_yy(characterID, msgContent, chatID):
  //       L = msgContent.replace("\r\n","").replace("\n","").replace("\r","")
  //       return hash_function(characterID) + hash_function(L) + hash_function(chatID) + hash_function("")
  //   def generate_yy_header(path, body_to_yy, t):
  //       encoded_path = quote(path, "")
  //       combined = f"{encoded_path}_{body_to_yy}{hash_function(str(t))}ooui"
  //       return hash_function(combined)
  it("pyQuote percent-encodes exactly like Python's quote(s, safe='')", () => {
    const path = "/v4/api/chat/msg?device_platform=web&biz_id=2&app_id=3001";
    assert.equal(
      mod.pyQuote(path),
      "%2Fv4%2Fapi%2Fchat%2Fmsg%3Fdevice_platform%3Dweb%26biz_id%3D2%26app_id%3D3001"
    );
    // Unreserved chars (letters, digits, _.-~) pass through untouched.
    assert.equal(mod.pyQuote("abcXYZ019_.-~"), "abcXYZ019_.-~");
  });

  it("getBodyToYy matches the independently-computed MD5 chain", () => {
    const bodyToYy = mod.getBodyToYy("1", "hello world", "0");
    assert.equal(
      bodyToYy,
      "c4ca4238a0b923820dcc509a6f75849b" +
        "5eb63bbbe01eeed093cb22bb8f5acdc3" +
        "cfcd208495d565ef66e7dff9f98764da" +
        "d41d8cd98f00b204e9800998ecf8427e"
    );
  });

  it("getBodyToYy normalizes CRLF/CR/LF in msgContent before hashing", () => {
    const withCrlf = mod.getBodyToYy("1", "hello\r\nworld", "0");
    const withLf = mod.getBodyToYy("1", "helloworld", "0");
    assert.equal(withCrlf, withLf);
  });

  it("generateYyHeader matches the independently-computed signature", () => {
    const path = "/v4/api/chat/msg?device_platform=web&biz_id=2&app_id=3001";
    const bodyToYy = mod.getBodyToYy("1", "hello world", "0");
    const yy = mod.generateYyHeader(path, bodyToYy, 1700000000000);
    assert.equal(yy, "6893d64988ecf45b1de1808b91ae855b");
  });

  it("builds a stable path_and_query with derived device_id/uuid when none is supplied", () => {
    const a = mod.buildHailuoPathAndQuery("token-abc", undefined, 1700000000000);
    const b = mod.buildHailuoPathAndQuery("token-abc", undefined, 1700000000000);
    assert.equal(a, b, "same token must derive the same fingerprint every time");

    const params = new URL(`https://x${a}`).searchParams;
    assert.equal(params.get("device_platform"), "web");
    assert.equal(params.get("uuid")?.length, 32);
    assert.equal(params.get("device_id")?.length, 32);
  });

  it("honors user-supplied device_id/uuid over the derived fallback", () => {
    const path = mod.buildHailuoPathAndQuery(
      "token-abc",
      { device_id: "real-device", uuid: "real-uuid" },
      1700000000000
    );
    const params = new URL(`https://x${path}`).searchParams;
    assert.equal(params.get("device_id"), "real-device");
    assert.equal(params.get("uuid"), "real-uuid");
  });

  it("folds text-only OpenAI history into a single msgContent block", () => {
    const folded = mod.foldHailuoMessages([
      { role: "system", content: "Be nice." },
      { role: "user", content: "hi" },
      { role: "assistant", content: "hello!" },
      { role: "user", content: "how are you?" },
    ]);
    assert.equal(
      folded,
      "System: Be nice.\n\nUser: hi\n\nAssistant: hello!\n\nUser: how are you?"
    );
  });

  it("throws on tool-call content it cannot faithfully forward", () => {
    assert.throws(() =>
      mod.foldHailuoMessages([{ role: "assistant", content: "", tool_calls: [{}] }])
    );
    assert.throws(() => mod.foldHailuoMessages([{ role: "tool", content: "result" }]));
  });

  it("diffs cumulative message_result content into deltas", () => {
    const state = { emittedLen: 0 };
    assert.equal(mod.extractHailuoMessageDelta("Hel", state), "Hel");
    assert.equal(mod.extractHailuoMessageDelta("Hello", state), "lo");
    assert.equal(mod.extractHailuoMessageDelta("Hello", state), "", "no growth => no delta");
  });

  it("parses event:/data: SSE lines and swallows malformed data without throwing", () => {
    const eventLine = mod.parseHailuoLine("event: message_result");
    assert.deepEqual(eventLine, { type: "event", value: "message_result" });

    const dataLine = mod.parseHailuoLine('data: {"data":{"messageResult":{"content":"hi"}}}');
    assert.deepEqual(dataLine, { type: "data", value: { data: { messageResult: { content: "hi" } } } });

    // Truncated/malformed JSON must not throw — the stream must keep going.
    assert.equal(mod.parseHailuoLine("data: {not json"), null);
    assert.equal(mod.parseHailuoLine("not a recognized line"), null);
  });

  it("extracts message_result.content from a send_result/message_result event payload", () => {
    const content = mod.extractHailuoMessageResultContent({
      data: { messageResult: { content: "partial answer" } },
    });
    assert.equal(content, "partial answer");
    assert.equal(mod.extractHailuoMessageResultContent({ data: { sendResult: { chatID: "1" } } }), null);
  });

  it("returns a 401 credential error when the token is missing", async () => {
    const executor = new mod.HailuoWebExecutor();
    const result = await executor.execute({
      model: "hailuo",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: { apiKey: "" },
      signal: null,
    });
    const text = await result.response.text();

    assert.equal(result.response.status, 401);
    assert.match(text, /token/i);
  });

  it("maps an upstream 401 (invalid/expired token) as a terminal, non-cooldown error", async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = (async () =>
      new Response(JSON.stringify({ error: "invalid token" }), { status: 401 })) as typeof fetch;

    try {
      const executor = new mod.HailuoWebExecutor();
      const result = await executor.execute({
        model: "hailuo",
        body: { messages: [{ role: "user", content: "hi" }] },
        stream: false,
        credentials: { apiKey: "expired-token" },
        signal: null,
      });
      assert.equal(result.response.status, 401);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("maps an upstream 429 as a transient (retryable) error", async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = (async () =>
      new Response(JSON.stringify({ error: "rate limited" }), { status: 429 })) as typeof fetch;

    try {
      const executor = new mod.HailuoWebExecutor();
      const result = await executor.execute({
        model: "hailuo",
        body: { messages: [{ role: "user", content: "hi" }] },
        stream: false,
        credentials: { apiKey: "some-token" },
        signal: null,
      });
      assert.equal(result.response.status, 429);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("collects a non-streaming completion from send_result/message_result/close_chunk SSE events", async () => {
    const sse = [
      "event: send_result",
      'data: {"data":{"sendResult":{"chatID":"c1","chatTitle":"hi"}}}',
      "event: message_result",
      'data: {"data":{"messageResult":{"content":"Hel"}}}',
      "event: message_result",
      'data: {"data":{"messageResult":{"content":"Hello"}}}',
      "event: close_chunk",
      "",
    ].join("\n");

    const originalFetch = globalThis.fetch;
    globalThis.fetch = (async () => new Response(sse, { status: 200 })) as typeof fetch;

    try {
      const executor = new mod.HailuoWebExecutor();
      const result = await executor.execute({
        model: "hailuo",
        body: { messages: [{ role: "user", content: "hi" }] },
        stream: false,
        credentials: { apiKey: "some-token" },
        signal: null,
      });
      const json = await result.response.json();

      assert.equal(result.response.status, 200);
      assert.equal(json.choices[0].message.content, "Hello");
      assert.equal(new URL(result.url).pathname, "/v4/api/chat/msg");
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("streams incremental deltas for a streaming request", async () => {
    const sse = [
      "event: message_result",
      'data: {"data":{"messageResult":{"content":"Hi"}}}',
      "event: message_result",
      'data: {"data":{"messageResult":{"content":"Hi there"}}}',
      "event: close_chunk",
      "",
    ].join("\n");

    const originalFetch = globalThis.fetch;
    globalThis.fetch = (async () => new Response(sse, { status: 200 })) as typeof fetch;

    try {
      const executor = new mod.HailuoWebExecutor();
      const result = await executor.execute({
        model: "hailuo",
        body: { messages: [{ role: "user", content: "hi" }] },
        stream: true,
        credentials: { apiKey: "some-token" },
        signal: null,
      });
      const text = await result.response.text();

      assert.match(text, /"content":"Hi"/);
      assert.match(text, /"content":" there"/);
      assert.match(text, /data: \[DONE\]/);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
});
