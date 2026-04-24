import test from "node:test";
import assert from "node:assert/strict";

import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

const harness = await createChatPipelineHarness("chat-route-edges");
const {
  BaseExecutor,
  buildClaudeResponse,
  buildOpenAIResponse,
  buildRequest,
  handleChat,
  resetStorage,
  seedConnection,
  settingsDb,
  idempotencyLayerModule,
  semanticCacheModule,
} = harness;

const { getBackgroundDegradationConfig } =
  await import("../../open-sse/services/backgroundTaskDetector.ts");
const { setCustomAliases } = await import("../../open-sse/services/modelDeprecation.ts");

test.beforeEach(async () => {
  BaseExecutor.RETRY_CONFIG.delayMs = 0;
  await resetStorage();
});

test.afterEach(async () => {
  await resetStorage();
});

test.after(async () => {
  await harness.cleanup();
});

test("handleChat resolves model alias before routing", async () => {
  await seedConnection("openai", { apiKey: "sk-openai" });
  await settingsDb.updateSettings({
    modelAliases: JSON.stringify({ "alias-model": "gpt-4o" }),
  });
  setCustomAliases({ "alias-model": "gpt-4o" });

  const seenModels = [];
  globalThis.fetch = async (_url, init = {}) => {
    try {
      const body = JSON.parse(String(init.body));
      seenModels.push(body.model);
    } catch {}
    return buildOpenAIResponse("Alias response");
  };

  const response = await handleChat(
    buildRequest({
      body: {
        model: "alias-model",
        stream: false,
        messages: [{ role: "user", content: "Test alias" }],
      },
    })
  );

  assert.equal(response.status, 200, "Should succeed with 200 OK");
  assert.equal(seenModels[0], "gpt-4o", "Model alias should be resolved to gpt-4o");
});

test("Test 3: handleChat returns cached response directly for Semantic Cache hits", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-semantic" });
  let fetchCount = 0;

  globalThis.fetch = async (_url, init) => {
    fetchCount++;
    const bodyStr = String(init.body);
    const body = JSON.parse(bodyStr);
    assert.equal(body.temperature, 0);

    return new Response(
      JSON.stringify({
        id: `chatcmpl_${fetchCount}`,
        object: "chat.completion",
        choices: [
          {
            index: 0,
            message: { role: "assistant", content: `Cache Generation ${fetchCount}` },
            finish_reason: "stop",
          },
        ],
        usage: { prompt_tokens: 2, completion_tokens: 4, total_tokens: 6 },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  };

  const req1 = buildRequest({
    body: {
      model: "openai/gpt-4",
      stream: false,
      temperature: 0,
      messages: [{ role: "user", content: "semantic hit" }],
    },
  });

  const res1 = await handleChat(req1);
  await res1.json();
  assert.equal(fetchCount, 1);
  await new Promise((r) => setTimeout(r, 100)); // allow background cache write

  const req2 = buildRequest({
    body: {
      model: "openai/gpt-4",
      stream: false,
      temperature: 0,
      messages: [{ role: "user", content: "semantic hit" }],
    },
  });

  const res2 = await handleChat(req2);
  const json2 = (await res2.json()) as any;

  assert.equal(fetchCount, 1, "Should have hit the semantic cache without calling fetch again");
  assert.equal(json2.choices[0].message.content, "Cache Generation 1");
  assert.equal(res2.headers.get("X-OmniRoute-Cache"), "HIT");
});

test("Test 4: handleChat supports X-OmniRoute-Progress tracking header for streams", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-progress" });

  globalThis.fetch = async () => {
    return new Response(
      [
        `data: {"id":"chatcmpl","choices":[{"delta":{"content":"P"},"index":0}]}`,
        `data: {"id":"chatcmpl","choices":[{"delta":{"content":"rogress"},"index":0}]}`,
        `data: [DONE]`,
        "",
      ].join("\n\n"),
      {
        status: 200,
        headers: { "Content-Type": "text/event-stream" },
      }
    );
  };

  const response = await handleChat(
    buildRequest({
      headers: {
        "X-OmniRoute-Progress": "true",
      },
      body: {
        model: "openai/gpt-4",
        stream: true,
        messages: [{ role: "user", content: "progress check" }],
      },
    })
  );

  assert.equal(response.status, 200);
  assert.equal(response.headers.get("X-OmniRoute-Progress"), "enabled");

  const raw = await response.text();
  assert.match(raw, /event: progress/); // check that progress chunks were injected
  assert.match(raw, /content":"P"/);
});

test("Test 5: isTokenExpiringSoon detects token boundaries", async () => {
  const { isTokenExpiringSoon } = await import("../../open-sse/handlers/chatCore.ts");
  const now = Date.now();

  assert.equal(isTokenExpiringSoon(null), false);
  assert.equal(
    isTokenExpiringSoon(new Date(now + 10 * 60 * 1000).toISOString(), 5 * 60 * 1000),
    false
  );
  assert.equal(
    isTokenExpiringSoon(new Date(now + 2 * 60 * 1000).toISOString(), 5 * 60 * 1000),
    true
  );
  assert.equal(
    isTokenExpiringSoon(new Date(now - 1 * 60 * 1000).toISOString(), 5 * 60 * 1000),
    true
  );
});

test("handleChat returns cached response directly for Idempotency hits", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-idem" });

  globalThis.fetch = async () => buildOpenAIResponse("Original response");

  const reqBody = {
    model: "openai/gpt-4",
    stream: false,
    messages: [{ role: "user", content: "Idempotent req" }],
  };

  // First request: hits API and saves idempotency
  const response1 = await handleChat(
    buildRequest({
      headers: { "idempotency-key": "req-idempotent-123" },
      body: reqBody,
    })
  );
  await response1.json(); // Consume body

  const response2 = await handleChat(
    buildRequest({
      headers: { "idempotency-key": "req-idempotent-123" },
      body: reqBody,
    })
  );

  const json2 = (await response2.json()) as any;
  assert.equal(response2.status, 200);
  assert.equal(response2.headers.get("X-OmniRoute-Idempotent"), "true");
  assert.equal(json2.choices[0].message.content, "Original response");
});

test("Test 6: handleChat correctly sets isResponsesEndpoint for /v1/responses", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-responses" });

  globalThis.fetch = async (_url, init) => {
    return new Response(
      JSON.stringify({
        id: "chatcmpl-responses",
        object: "chat.completion",
        choices: [
          { message: { role: "assistant", content: "Responses OK" }, finish_reason: "stop" },
        ],
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  };

  const response = await handleChat(
    new Request("http://localhost/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-4",
        stream: false,
        messages: [{ role: "user", content: "hi" }],
      }),
    })
  );

  const json = (await response.json()) as any;
  assert.equal(response.status, 200);
  const responseText = json.output_text || json.output?.[0]?.content?.[0]?.text;
  assert.equal(responseText, "Responses OK");
});

test("handleChat returns Semantic Cache hit", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-semantic" });
  globalThis.fetch = async () => buildOpenAIResponse("Semantic API response");

  const model = "openai/gpt-4";
  const messages = [{ role: "user", content: "Semantic query test" }];
  const reqBody = {
    model,
    stream: false,
    temperature: 0, // required for cacheable
    messages,
  };

  // First request: hits API and saves semantic cache
  const response1 = await handleChat(buildRequest({ body: reqBody }));
  await response1.json(); // Consume body

  // Second request: should hit semantic cache
  const response2 = await handleChat(buildRequest({ body: reqBody }));

  const json2 = (await response2.json()) as any;
  assert.equal(response2.status, 200);
  assert.equal(response2.headers.get("X-OmniRoute-Cache"), "HIT");
  assert.equal(json2.choices[0].message.content, "Semantic API response");
});
