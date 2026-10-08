import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { OpencodeExecutor } from "../../open-sse/executors/opencode.ts";

describe("OpenCode stream_options (#13699)", () => {
  for (const provider of ["opencode-go", "opencode-zen"]) {
    for (const stream of [false, undefined, true]) {
      it(`${provider}: only streaming Chat Completions retains stream_options (${stream})`, () => {
        const executor = new OpencodeExecutor(provider);
        executor._requestFormat = "openai";
        const body = {
          model: "deepseek-v4.1-flash",
          messages: [{ role: "user", content: "hello" }],
          ...(stream === undefined ? {} : { stream }),
          stream_options: { include_usage: true },
        };
        const original = structuredClone(body);
        const outgoing = executor.transformRequest(body.model, body, stream === true, {});
        assert.equal(Object.hasOwn(outgoing, "stream_options"), stream === true);
        if (stream) assert.deepEqual(outgoing.stream_options, { include_usage: true });
        assert.deepEqual(body, original, "must not mutate the caller's request");
        assert.deepEqual(outgoing.messages, body.messages);
      });
    }
  }

  for (const format of ["claude", "openai-responses"]) {
    it(`does not forward Chat Completions stream_options to ${format}`, () => {
      const executor = new OpencodeExecutor("opencode-zen");
      executor._requestFormat = format;
      const body = { model: "test-model", stream: true, stream_options: { include_usage: true } };
      const outgoing = executor.transformRequest(body.model, body, true, {});
      assert.equal(Object.hasOwn(outgoing, "stream_options"), false);
      assert.equal(outgoing.stream, true);
      assert.deepEqual(body.stream_options, { include_usage: true });
    });
  }

  it("preserves streaming options when transformRequest resolves the format without execute", () => {
    const executor = new OpencodeExecutor("opencode-go");
    const body = {
      model: "deepseek-v4.1-flash",
      stream: true,
      stream_options: { include_usage: true },
    };
    assert.deepEqual(
      executor.transformRequest(body.model, body, true, {}).stream_options,
      body.stream_options
    );
  });

  it("removes inherited options from the actual execute request body", async (t) => {
    const sent: Record<string, unknown>[] = [];
    t.mock.method(globalThis, "fetch", async (_url: unknown, init: RequestInit) => {
      const body = JSON.parse(String(init.body)) as Record<string, unknown>;
      sent.push(body);
      const invalid = body.stream !== true && Object.hasOwn(body, "stream_options");
      return new Response(
        JSON.stringify(invalid ? { error: "stream_options requires streaming" } : { choices: [] }),
        {
          status: invalid ? 400 : 200,
          headers: { "content-type": "application/json" },
        }
      );
    });
    const executor = new OpencodeExecutor("opencode-go");
    const result = await executor.execute({
      model: "deepseek-v4.1-flash",
      stream: false,
      credentials: { apiKey: "test-key" },
      body: {
        model: "deepseek-v4.1-flash",
        stream: false,
        stream_options: { include_usage: true },
        messages: [{ role: "user", content: "hello" }],
      },
    });
    assert.ok(result.url.endsWith("/chat/completions"));
    assert.equal(result.response.status, 200);
    assert.equal(sent.length, 1);
    assert.equal(Object.hasOwn(sent[0], "stream_options"), false);
  });
});
