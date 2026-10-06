/**
 * #8969: Canonical `poe` API-key provider must use DefaultExecutor → api.poe.com,
 * not the web-cookie PoeWebExecutor GraphQL path (which returns HTTP 405).
 *
 * Locks:
 *   - getExecutor("poe") is DefaultExecutor; getExecutor("poe-web") stays PoeWebExecutor
 *   - Chat Completions / Responses / Messages URL selection + auth headers
 *   - GPT models never hit Poe's Claude-only Messages endpoint
 *   - Operator baseUrl shapes (bare host, /v1/, trailing slash) normalize correctly
 *   - Upstream 405 is preserved (not swallowed)
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-poe-api-8969-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { getExecutor, hasSpecializedExecutor } = await import("../../open-sse/executors/index.ts");
const { DefaultExecutor } = await import("../../open-sse/executors/default.ts");
const { PoeWebExecutor } = await import("../../open-sse/executors/poe-web.ts");
const { getRegistryEntry } = await import("../../open-sse/config/providerRegistry.ts");
const { resolveExecutionCredentials } =
  await import("../../open-sse/handlers/chatCore/executionCredentials.ts");
const { POE_DEFAULT_BASE_URL, resolvePoeUpstreamUrl } =
  await import("../../open-sse/config/providers/registry/poe/index.ts");
const core = await import("../../src/lib/db/core.ts");

test.after(() => {
  try {
    core.resetDbInstance();
  } catch {
    // ignore
  }
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const CHAT_URL = "https://api.poe.com/v1/chat/completions";
const RESPONSES_URL = "https://api.poe.com/v1/responses";
const MESSAGES_URL = "https://api.poe.com/v1/messages";

function headerRecord(headers: Record<string, string>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(headers)) out[k.toLowerCase()] = v;
  return out;
}

test("#8969: getExecutor(poe) selects DefaultExecutor, not PoeWebExecutor", async () => {
  assert.equal(hasSpecializedExecutor("poe"), false);
  const executor = await getExecutor("poe");
  assert.ok(executor instanceof DefaultExecutor);
  assert.equal(executor instanceof PoeWebExecutor, false);
  assert.equal(executor.provider, "poe");
});

test("#8969: getExecutor(poe-web) still selects PoeWebExecutor", async () => {
  assert.equal(hasSpecializedExecutor("poe-web"), true);
  const executor = await getExecutor("poe-web");
  assert.ok(executor instanceof PoeWebExecutor);
});

test("#8969: registry declares API-key executor + all three Poe protocol URLs", () => {
  const entry = getRegistryEntry("poe");
  assert.ok(entry);
  assert.equal(entry.executor, "default");
  assert.equal(entry.authType, "apikey");
  assert.equal(entry.authHeader, "bearer");
  assert.equal(entry.baseUrl, CHAT_URL);
  assert.equal(entry.responsesBaseUrl, RESPONSES_URL);
  assert.equal(entry.messagesUrl, MESSAGES_URL);
  assert.equal(POE_DEFAULT_BASE_URL, "https://api.poe.com/v1");

  const claude = entry.models?.find((m) => m.id === "claude-opus-4.8");
  assert.ok(claude, "catalog must include a Claude model");
  assert.equal(claude.targetFormat, "claude");

  const gpt = entry.models?.find((m) => m.id === "gpt-5.2");
  assert.ok(gpt, "catalog must include a GPT model");
  assert.notEqual(gpt.targetFormat, "claude");
});

test("#8969: buildUrl routes chat / responses / messages correctly", async () => {
  const executor = (await getExecutor("poe")) as DefaultExecutor;
  const creds = { apiKey: "poe-test-key", providerSpecificData: {} };

  assert.equal(executor.buildUrl("gemma-4-31b", false, 0, creds), CHAT_URL);
  assert.equal(executor.buildUrl("gemma-4-31b", true, 0, creds), CHAT_URL);
  assert.equal(executor.buildUrl("gpt-5.2", false, 0, creds), CHAT_URL);

  assert.equal(
    executor.buildUrl("gpt-5.2", false, 0, {
      ...creds,
      providerSpecificData: { _omnirouteForceResponsesUpstream: true },
    }),
    RESPONSES_URL
  );
  assert.equal(
    executor.buildUrl("claude-opus-4.8", true, 0, {
      ...creds,
      providerSpecificData: { _omnirouteForceResponsesUpstream: true },
    }),
    RESPONSES_URL
  );

  assert.equal(executor.buildUrl("claude-opus-4.8", false, 0, creds), MESSAGES_URL);
  assert.equal(executor.buildUrl("claude-opus-4.8", true, 0, creds), MESSAGES_URL);

  // GPT must never land on Poe's Claude-only Messages endpoint — even if an
  // operator incorrectly stamps targetFormat=claude on the connection.
  assert.equal(
    executor.buildUrl("gpt-5.2", false, 0, {
      ...creds,
      providerSpecificData: { targetFormat: "claude" },
    }),
    CHAT_URL
  );
  assert.notEqual(
    executor.buildUrl("gpt-5.2", false, 0, {
      ...creds,
      providerSpecificData: { targetFormat: "claude" },
    }),
    MESSAGES_URL
  );
});

test("#8969: resolvePoeUpstreamUrl normalizes registry-default / bare-host /v1/ / trailing-slash bases", () => {
  const cases: Array<{
    base: string | null | undefined;
    protocol: "chat" | "responses" | "messages";
    expected: string;
  }> = [
    { base: undefined, protocol: "chat", expected: CHAT_URL },
    { base: null, protocol: "chat", expected: CHAT_URL },
    { base: "https://api.poe.com", protocol: "chat", expected: CHAT_URL },
    { base: "https://api.poe.com/", protocol: "chat", expected: CHAT_URL },
    { base: "https://api.poe.com/v1", protocol: "chat", expected: CHAT_URL },
    { base: "https://api.poe.com/v1/", protocol: "chat", expected: CHAT_URL },
    {
      base: "https://api.poe.com/v1/chat/completions",
      protocol: "chat",
      expected: CHAT_URL,
    },
    {
      base: "https://api.poe.com/v1/chat/completions/",
      protocol: "chat",
      expected: CHAT_URL,
    },
    { base: "https://api.poe.com/v1", protocol: "responses", expected: RESPONSES_URL },
    { base: "https://api.poe.com/", protocol: "messages", expected: MESSAGES_URL },
    {
      base: "https://custom.example/v1/chat/completions",
      protocol: "responses",
      expected: "https://custom.example/v1/responses",
    },
    {
      base: "https://custom.example/v1",
      protocol: "messages",
      expected: "https://custom.example/v1/messages",
    },
  ];

  for (const { base, protocol, expected } of cases) {
    assert.equal(
      resolvePoeUpstreamUrl({
        protocol,
        configuredBaseUrl: base,
        responsesBaseUrl: RESPONSES_URL,
        messagesUrl: MESSAGES_URL,
        defaultChatUrl: CHAT_URL,
      }),
      expected,
      `base=${String(base)} protocol=${protocol}`
    );
  }
});

test("#8969: buildHeaders uses Bearer auth and never sends Cookie", async () => {
  const executor = (await getExecutor("poe")) as DefaultExecutor;
  for (const stream of [false, true]) {
    const headers = headerRecord(
      executor.buildHeaders({ apiKey: "poe-test-key", providerSpecificData: {} }, stream)
    );
    assert.equal(headers.authorization, "Bearer poe-test-key");
    assert.equal(headers.cookie, undefined);
    assert.equal(headers.accept, stream ? "text/event-stream" : "application/json");
  }
});

test("#8969: resolveExecutionCredentials forces responses upstream for poe", () => {
  const out = resolveExecutionCredentials({
    credentials: { providerSpecificData: {} },
    nativeCodexPassthrough: false,
    endpointPath: "/v1/responses",
    targetFormat: "openai-responses",
    provider: "poe",
    ccSessionId: null,
  }) as { providerSpecificData: Record<string, unknown> };
  assert.equal(out.providerSpecificData._omnirouteForceResponsesUpstream, true);
});

test("#8969: mocked execute posts Chat Completions with Bearer, no Cookie, stripped model", async () => {
  const executor = (await getExecutor("poe")) as DefaultExecutor;
  const originalFetch = globalThis.fetch;
  const seen: Array<{
    url: string;
    method: string;
    authorization: string | null;
    cookie: string | null;
    body: Record<string, unknown>;
  }> = [];

  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const headers = new Headers(init?.headers);
    const rawBody = await new Request(input, init).text();
    seen.push({
      url: String(input),
      method: (init?.method || "GET").toUpperCase(),
      authorization: headers.get("authorization"),
      cookie: headers.get("cookie"),
      body: JSON.parse(rawBody) as Record<string, unknown>,
    });
    return Response.json({
      id: "chatcmpl-test",
      object: "chat.completion",
      choices: [{ index: 0, message: { role: "assistant", content: "OK" }, finish_reason: "stop" }],
    });
  }) as typeof fetch;

  try {
    for (const stream of [false, true]) {
      seen.length = 0;
      const result = await executor.execute({
        model: "gemma-4-31b",
        body: {
          model: "gemma-4-31b",
          messages: [{ role: "user", content: "Reply with OK only." }],
          max_tokens: 64,
          stream,
        },
        stream,
        credentials: { apiKey: "poe-test-key", providerSpecificData: {} },
        signal: null,
      });

      assert.equal(seen.length, 1, `expected one upstream call (stream=${stream})`);
      assert.equal(seen[0].method, "POST");
      assert.equal(seen[0].url, CHAT_URL);
      assert.equal(seen[0].authorization, "Bearer poe-test-key");
      assert.equal(seen[0].cookie, null);
      assert.equal(seen[0].body.model, "gemma-4-31b");
      assert.equal(seen[0].url.includes("poe.com/api/gql"), false);
      assert.ok(result.response instanceof Response);
      assert.equal(result.response.status, 200);
    }
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("#8969: mocked execute routes Responses + Messages fixtures to the right URLs", async () => {
  const executor = (await getExecutor("poe")) as DefaultExecutor;
  const originalFetch = globalThis.fetch;
  let lastUrl = "";

  globalThis.fetch = (async (input: RequestInfo | URL) => {
    lastUrl = String(input);
    return Response.json({ id: "ok", object: "response", output: [] });
  }) as typeof fetch;

  try {
    await executor.execute({
      model: "gpt-5.2",
      body: { model: "gpt-5.2", input: "hi", stream: false },
      stream: false,
      credentials: {
        apiKey: "poe-test-key",
        providerSpecificData: { _omnirouteForceResponsesUpstream: true },
      },
      signal: null,
    });
    assert.equal(lastUrl, RESPONSES_URL);

    await executor.execute({
      model: "claude-opus-4.8",
      body: {
        model: "claude-opus-4.8",
        input: "hi",
        stream: true,
      },
      stream: true,
      credentials: {
        apiKey: "poe-test-key",
        providerSpecificData: { _omnirouteForceResponsesUpstream: true },
      },
      signal: null,
    });
    assert.equal(lastUrl, RESPONSES_URL);

    globalThis.fetch = (async (input: RequestInfo | URL) => {
      lastUrl = String(input);
      return Response.json({
        id: "msg_ok",
        type: "message",
        role: "assistant",
        content: [{ type: "text", text: "OK" }],
      });
    }) as typeof fetch;

    await executor.execute({
      model: "claude-opus-4.8",
      body: {
        model: "claude-opus-4.8",
        messages: [{ role: "user", content: "hi" }],
        max_tokens: 16,
        stream: false,
      },
      stream: false,
      credentials: { apiKey: "poe-test-key", providerSpecificData: {} },
      signal: null,
    });
    assert.equal(lastUrl, MESSAGES_URL);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("#8969: mocked upstream 405 is preserved (not swallowed)", async () => {
  const executor = (await getExecutor("poe")) as DefaultExecutor;
  const originalFetch = globalThis.fetch;

  globalThis.fetch = (async () => {
    return new Response(JSON.stringify({ detail: "Method Not Allowed" }), {
      status: 405,
      headers: { "content-type": "application/json" },
    });
  }) as typeof fetch;

  try {
    const result = await executor.execute({
      model: "gemma-4-31b",
      body: {
        model: "gemma-4-31b",
        messages: [{ role: "user", content: "hi" }],
        stream: false,
      },
      stream: false,
      credentials: { apiKey: "poe-test-key", providerSpecificData: {} },
      signal: null,
    });
    assert.equal(result.response.status, 405);
    const text = await result.response.text();
    assert.match(text, /Method Not Allowed/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
