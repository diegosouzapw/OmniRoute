import assert from "node:assert/strict";
import test from "node:test";

assert.ok(process.env.DATA_DIR, "the subprocess fixture requires an isolated DATA_DIR");
assert.ok(
  process.env.OMNIROUTE_PLUGINS_DIR,
  "the subprocess fixture requires an isolated OMNIROUTE_PLUGINS_DIR"
);
assert.equal(process.env.HOME, undefined, "the subprocess must not inherit HOME");
assert.equal(process.env.CODEX_HOME, undefined, "the subprocess must not inherit CODEX_HOME");

const { AdaptaWebExecutor } = await import("../../open-sse/executors/adapta-web.ts");

const originalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test("terminates an upstream error event without exposing its text in the public SSE", async () => {
  const hostileError =
    "SQLSTATE 42P01 at /srv/omniroute/private.ts:91 — Authorization: Bearer secret-token";
  const requestedUrls: string[] = [];
  const logMessages: string[] = [];

  globalThis.fetch = (async (input: RequestInfo | URL) => {
    const url = String(input);
    requestedUrls.push(url);

    if (url.endsWith("/v1/client")) {
      return Response.json({
        response: { sessions: [{ id: "session-stream-error", status: "active" }] },
      });
    }

    if (url.includes("/tokens")) {
      return Response.json({ jwt: "eyJ.test-session.jwt" });
    }

    return new Response(`data: ${JSON.stringify({ type: "error", errorText: hostileError })}\n\n`, {
      status: 200,
      headers: { "Content-Type": "text/event-stream" },
    });
  }) as typeof fetch;

  const executor = new AdaptaWebExecutor();
  const result = await executor.execute({
    model: "adapta-one",
    body: { messages: [{ role: "user", content: "hello" }] },
    stream: true,
    credentials: { apiKey: "__client=unique-stream-error-cookie" },
    signal: null,
    log: {
      info: (_tag, message) => logMessages.push(message),
      warn: (_tag, message) => logMessages.push(message),
    },
  });

  assert.equal(result.response.status, 200);
  assert.equal(result.response.headers.get("content-type"), "text/event-stream");

  const publicSse = await result.response.text();
  assert.equal(requestedUrls.length, 3);
  assert.match(publicSse, /"content":"\\n\\n\[Erro: Adapta upstream error\]"/);
  assert.match(publicSse, /"finish_reason":"stop"/);
  assert.match(publicSse, /data: \[DONE\]/);
  assert.doesNotMatch(publicSse, /SQLSTATE|\/srv\/omniroute|secret-token/);
  assert.doesNotMatch(logMessages.join("\n"), /SQLSTATE|\/srv\/omniroute|secret-token/);
});
