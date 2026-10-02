import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Muse intermittently answers HTTP 200 with no usable output. A Muse session is pinned to
// its owner, so the handler retries that 502 on the SAME owner at most twice (0.5 s, 1.5 s)
// before surfacing it, and never once output has reached the client.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-muse-empty-retry-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.REQUIRE_API_KEY = "false";
process.env.DASHBOARD_PASSWORD = "";
process.env.INITIAL_PASSWORD = "";
delete process.env.JWT_SECRET;
if (!process.env.API_KEY_SECRET) process.env.API_KEY_SECRET = `test-muse-empty-${Date.now()}`;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { handleChat } = await import("../../src/sse/handlers/chat.ts");
const { initTranslators } = await import("../../open-sse/translator/index.ts");
const { clearInflight } = await import("../../open-sse/services/requestDedup.ts");
const { resetAllCircuitBreakers } = await import("../../src/shared/utils/circuitBreaker.ts");

const originalFetch = globalThis.fetch;
const expiresAt = new Date(Date.now() + 3_600_000).toISOString();

async function resetStorage() {
  clearInflight();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  resetAllCircuitBreakers();
  initTranslators();
}

async function seedMuseAccounts() {
  for (const name of ["a", "b"]) {
    await providersDb.createProviderConnection({
      provider: "muse-code",
      authType: "oauth",
      name: `muse-${name}`,
      email: `${name}@example.test`,
      accessToken: `muse-key-${name}`,
      refreshToken: `dca:refresh-${name}`,
      expiresAt,
      isActive: true,
      testStatus: "active",
    });
  }
}

const emptyResponse = () =>
  Response.json({
    id: "resp-empty",
    object: "response",
    status: "completed",
    output: [],
    usage: { input_tokens: 1, output_tokens: 0 },
  });

const textResponse = () =>
  Response.json({
    id: "resp-ok",
    object: "response",
    status: "completed",
    output: [
      { type: "message", role: "assistant", content: [{ type: "output_text", text: "OK" }] },
    ],
    usage: { input_tokens: 1, output_tokens: 1 },
  });

function stubInference(handler: (callIndex: number) => Response | Promise<Response>) {
  const calls: string[] = [];
  const times: number[] = [];
  globalThis.fetch = (async (url: unknown, init: { headers?: HeadersInit }) => {
    if (String(url).includes("/muse-code/key")) return Response.json({ api_key: "unused" });
    calls.push(new Headers(init?.headers).get("authorization") ?? "");
    times.push(Date.now());
    return handler(calls.length - 1);
  }) as typeof fetch;
  return { calls, times };
}

function museRequest(session: string, stream = false) {
  return new Request("http://localhost/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: stream ? "text/event-stream" : "application/json",
    },
    body: JSON.stringify({
      model: "muse-code/muse-spark-1.3",
      input: `Reply OK ${session} ${Math.random()}`,
      prompt_cache_key: session,
      stream,
    }),
  });
}

test.beforeEach(async () => {
  globalThis.fetch = originalFetch;
  await resetStorage();
  await seedMuseAccounts();
});

test.after(async () => {
  globalThis.fetch = originalFetch;
  clearInflight();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("an empty Muse response is retried on the same owner and succeeds on the 2nd try", async () => {
  const { calls } = stubInference((i) => (i === 0 ? emptyResponse() : textResponse()));
  const response = await handleChat(museRequest("retry-ok"));
  const text = await response.text();
  assert.equal(response.status, 200, text);
  assert.match(text, /OK/);
  assert.equal(calls.length, 2);
  assert.equal(calls[1], calls[0], "the retry must use the same owner account");
});

test("empty Muse responses give up after 2 same-owner retries with the original 502", async () => {
  const { calls, times } = stubInference(() => emptyResponse());
  const response = await handleChat(museRequest("retry-exhausted"));
  const body = (await response.json()) as { error?: { code?: string } };
  assert.equal(response.status, 502);
  assert.equal(body.error?.code, "upstream_empty_response");
  assert.equal(calls.length, 3, "one attempt plus exactly two retries");
  assert.equal(new Set(calls).size, 1, "never fails over to the other Muse account");
  assert.ok(times[1] - times[0] >= 450, `first backoff ~0.5 s, got ${times[1] - times[0]}`);
  assert.ok(times[2] - times[1] >= 1450, `second backoff ~1.5 s, got ${times[2] - times[1]}`);
});

test("a Muse stream that already emitted output is never retried", async () => {
  const encoder = new TextEncoder();
  const { calls } = stubInference(
    () =>
      new Response(
        new ReadableStream({
          start(controller) {
            controller.enqueue(
              encoder.encode(
                `data: ${JSON.stringify({ type: "response.output_text.delta", delta: "partial" })}\n\n`
              )
            );
            controller.close();
          },
        }),
        { headers: { "Content-Type": "text/event-stream" } }
      )
  );
  const response = await handleChat(museRequest("partial-stream", true));
  await response.text();
  assert.equal(calls.length, 1);
});

test("exhausted empty-response retries do not lock out the session owner", async () => {
  const { calls } = stubInference((i) => (i < 3 ? emptyResponse() : textResponse()));
  const failed = await handleChat(museRequest("retry-then-continue"));
  await failed.text();
  assert.equal(failed.status, 502);

  const next = await handleChat(museRequest("retry-then-continue"));
  const text = await next.text();
  assert.equal(next.status, 200, text);
  assert.equal(calls.length, 4);
  assert.equal(calls[3], calls[0], "the same owner keeps serving the session");
});
