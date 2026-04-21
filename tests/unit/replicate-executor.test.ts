import test from "node:test";
import assert from "node:assert/strict";

import {
  ReplicateExecutor,
  buildReplicatePredictionRequest,
  buildReplicatePredictionUrl,
} from "../../open-sse/executors/replicate.ts";
import { getExecutor, hasSpecializedExecutor } from "../../open-sse/executors/index.ts";

const originalFetch = globalThis.fetch;

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test.after(() => {
  globalThis.fetch = originalFetch;
});

test("Replicate resolves to the specialized executor and builds prediction URLs", () => {
  assert.equal(hasSpecializedExecutor("replicate"), true);

  const executor = getExecutor("replicate");

  assert.ok(executor instanceof ReplicateExecutor);
  assert.equal(
    buildReplicatePredictionUrl({
      baseUrl: "https://api.replicate.com/v1",
      model: "meta/meta-llama-3-70b-instruct",
    }),
    "https://api.replicate.com/v1/models/meta/meta-llama-3-70b-instruct/predictions"
  );
  assert.equal(
    buildReplicatePredictionUrl({
      baseUrl: "https://api.replicate.com/v1",
      model: "deployments/acme/chat-bot",
    }),
    "https://api.replicate.com/v1/deployments/acme/chat-bot/predictions"
  );
});

test("Replicate request builder uses prompt mode for legacy models and messages mode for OpenAI wrappers", () => {
  const promptPayload = buildReplicatePredictionRequest(
    "meta/meta-llama-3-70b-instruct",
    {
      messages: [
        { role: "system", content: "Be terse." },
        { role: "user", content: "Hello" },
      ],
      max_tokens: 32,
      temperature: 0.2,
    },
    false
  );

  assert.equal(promptPayload.input.system_prompt, "Be terse.");
  assert.match(String(promptPayload.input.prompt), /User: Hello/);
  assert.equal(promptPayload.input.messages, undefined);
  assert.equal(promptPayload.input.max_tokens, 32);

  const messagesPayload = buildReplicatePredictionRequest(
    "openai/gpt-5:e7411623ba01784a6caea0ba5c7bafe2d01bda3426fe3b03bbae2e99cdca8023",
    {
      messages: [{ role: "user", content: "Hi" }],
      tools: [{ type: "function", function: { name: "lookup", parameters: { type: "object" } } }],
      tool_choice: "auto",
      max_tokens: 64,
      reasoning: { effort: "high" },
    },
    true
  );

  assert.deepEqual(messagesPayload.input.messages, [{ role: "user", content: "Hi" }]);
  assert.equal(messagesPayload.input.max_completion_tokens, 64);
  assert.equal(messagesPayload.input.reasoning_effort, "high");
  assert.deepEqual(messagesPayload.input.tools, [
    { type: "function", function: { name: "lookup", parameters: { type: "object" } } },
  ]);
  assert.equal(messagesPayload.input.tool_choice, "auto");
  assert.equal(
    messagesPayload.version,
    "e7411623ba01784a6caea0ba5c7bafe2d01bda3426fe3b03bbae2e99cdca8023"
  );
});

test("Replicate executor creates predictions, polls until completion and normalizes JSON output", async () => {
  const calls: Array<{ url: string; init: RequestInit | undefined }> = [];

  globalThis.fetch = async (url, init) => {
    calls.push({ url: String(url), init });

    if (calls.length === 1) {
      return jsonResponse(
        {
          id: "pred_1",
          status: "starting",
          created_at: "2026-04-20T00:00:00.000Z",
          urls: {
            get: "https://api.replicate.com/v1/predictions/pred_1",
          },
        },
        201
      );
    }

    return jsonResponse({
      id: "pred_1",
      status: "succeeded",
      created_at: "2026-04-20T00:00:01.000Z",
      output: ["Hello from Replicate"],
      urls: {
        get: "https://api.replicate.com/v1/predictions/pred_1",
      },
    });
  };

  const executor = getExecutor("replicate");
  const result = await executor.execute({
    model: "meta/meta-llama-3-70b-instruct",
    body: {
      model: "meta/meta-llama-3-70b-instruct",
      messages: [
        { role: "system", content: "Be terse." },
        { role: "user", content: "hello" },
      ],
      max_tokens: 12,
    },
    stream: false,
    credentials: {
      apiKey: "replicate-secret",
      providerSpecificData: {
        pollIntervalMs: 1,
      },
    },
  });

  assert.equal(calls.length, 2);
  assert.equal(
    calls[0].url,
    "https://api.replicate.com/v1/models/meta/meta-llama-3-70b-instruct/predictions"
  );
  assert.equal(calls[1].url, "https://api.replicate.com/v1/predictions/pred_1");
  assert.equal(
    (calls[0].init?.headers as Record<string, string>).Authorization,
    "Bearer replicate-secret"
  );

  const requestBody = JSON.parse(String(calls[0].init?.body || "{}"));
  assert.equal(requestBody.stream, false);
  assert.match(String(requestBody.input.prompt), /User: hello/);
  assert.equal(requestBody.input.system_prompt, "Be terse.");

  const payload = await result.response.json();
  assert.equal(payload.object, "chat.completion");
  assert.equal(payload.model, "meta/meta-llama-3-70b-instruct");
  assert.equal(payload.choices[0].message.content, "Hello from Replicate");
  assert.equal(payload.choices[0].finish_reason, "stop");
});

test("Replicate executor streams incremental SSE chunks while polling prediction output", async () => {
  let pollCount = 0;

  globalThis.fetch = async (url) => {
    const target = String(url);
    if (target.endsWith("/predictions")) {
      return jsonResponse(
        {
          id: "pred_stream",
          status: "starting",
          created_at: "2026-04-20T00:00:00.000Z",
          urls: {
            get: "https://api.replicate.com/v1/predictions/pred_stream",
          },
        },
        201
      );
    }

    pollCount += 1;
    if (pollCount === 1) {
      return jsonResponse({
        id: "pred_stream",
        status: "processing",
        created_at: "2026-04-20T00:00:00.000Z",
        output: ["Hel"],
      });
    }

    return jsonResponse({
      id: "pred_stream",
      status: "succeeded",
      created_at: "2026-04-20T00:00:01.000Z",
      output: ["Hello"],
      metrics: {
        prompt_tokens: 4,
        completion_tokens: 2,
        total_tokens: 6,
      },
    });
  };

  const executor = getExecutor("replicate");
  const result = await executor.execute({
    model: "meta/meta-llama-3-70b-instruct",
    body: {
      model: "meta/meta-llama-3-70b-instruct",
      messages: [{ role: "user", content: "hello" }],
    },
    stream: true,
    credentials: {
      apiKey: "replicate-secret",
      providerSpecificData: {
        pollIntervalMs: 1,
      },
    },
  });

  assert.equal(result.response.headers.get("content-type"), "text/event-stream");
  const raw = await result.response.text();
  assert.match(raw, /"role":"assistant"/);
  assert.match(raw, /"content":"Hel"/);
  assert.match(raw, /"content":"lo"/);
  assert.match(raw, /"total_tokens":6/);
  assert.match(raw, /\[DONE\]/);
});
