import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-empty-terminal-16072-"));
const savedDataDir = process.env.DATA_DIR;
process.env.DATA_DIR = dataDir;
const originalFetch = globalThis.fetch;
globalThis.fetch = async () => {
  throw new Error("Unexpected outbound request before test transport setup");
};
await test.describe("#16072 executed empty-terminal contract", async () => {
  const core = await import("../../src/lib/db/core.ts");
  const providers = await import("../../src/lib/db/providers.ts");
  const { createCombo } = await import("../../src/lib/db/combos.ts");
  const route = await import("../../src/app/api/v1/chat/completions/route.ts");
  const { waitForCallLogSaves } = await import("../../src/lib/usage/callLogs.ts");
  const { flushProxyLogsSync } = await import("../../src/lib/proxyLogger.ts");
  const { getModelLockoutInfo, clearAllModelLockouts } =
    await import("../../open-sse/services/accountFallback.ts");

  const connection = await providers.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "empty-terminal-official",
    apiKey: "synthetic-empty-terminal-key",
    isActive: true,
    testStatus: "active",
  });

  test.after(async () => {
    await waitForCallLogSaves(10_000);
    flushProxyLogsSync();
    clearAllModelLockouts();
    core.resetDbInstance();
    globalThis.fetch = originalFetch;
    if (savedDataDir === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = savedDataDir;
    fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  });

  async function requestJson(content: string, model = "openai/gpt-4.1") {
    const calls: { url: string; model: unknown }[] = [];
    globalThis.fetch = async (input, init = {}) => {
      const url = String(input);
      if (url.includes("/__omniroute_event")) return new Response(null, { status: 204 });
      assert.equal(url, "https://api.openai.com/v1/chat/completions");
      const body = JSON.parse(String(init.body));
      calls.push({ url, model: body.model });
      return Response.json({
        id: "chatcmpl-empty-terminal",
        object: "chat.completion",
        choices: [
          {
            index: 0,
            message: {
              role: "assistant",
              content: body.model === "gpt-4o" ? "visible fallback" : content,
            },
            finish_reason: "stop",
          },
        ],
        usage: { prompt_tokens: 5, completion_tokens: 0, total_tokens: 5 },
      });
    };
    const response = await route.POST(
      new Request("http://localhost/v1/chat/completions", {
        method: "POST",
        headers: { "content-type": "application/json", "x-omniroute-no-cache": "true" },
        body: JSON.stringify({
          model,
          messages: [{ role: "user", content: `Return ${content || "no reply"}` }],
          stream: false,
        }),
      })
    );
    return { response, body: await response.json(), calls };
  }

  test("#16072 HTTP control: a visible completion reaches the real upstream boundary", async () => {
    const { response, body, calls } = await requestJson("visible control");
    assert.equal(response.status, 200, JSON.stringify(body));
    assert.equal(body.choices[0].message.content, "visible control");
    assert.equal(calls.length, 1);
  });

  test("#16072 HTTP combo: a valid empty first target must not dispatch its visible sibling", async () => {
    await createCombo({
      name: "empty-terminal-combo",
      strategy: "priority",
      models: ["openai/gpt-4.1", "openai/gpt-4o"],
    });
    const { response, body, calls } = await requestJson("", "empty-terminal-combo");
    assert.equal(response.status, 200, JSON.stringify(body));
    assert.equal(body.choices[0].finish_reason, "stop");
    assert.equal(body.choices[0].message.content, "");
    assert.equal(calls.length, 1, "the combo must stop after the valid empty first target");
    assert.equal(calls[0].model, "gpt-4.1");
    assert.equal(getModelLockoutInfo("openai", "", "gpt-4.1"), null);
  });

  test("#16072 HTTP: an official normal empty JSON turn uses one generation and stays healthy", async () => {
    const { response, body, calls } = await requestJson("");
    assert.equal(response.status, 200, JSON.stringify(body));
    assert.equal(body.choices[0].finish_reason, "stop");
    assert.equal(body.choices[0].message.content, "");
    assert.equal(calls.length, 1, "a normal empty turn must not retry another model/account");
    const current = await providers.getProviderConnectionById(String(connection.id));
    assert.notEqual(current?.testStatus, "unavailable");
    assert.ok(!current?.rateLimitedUntil);
    assert.ok(!current?.lastError);
    assert.equal(getModelLockoutInfo("openai", String(connection.id), "gpt-4.1"), null);
  });

  const codexConnection = await providers.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    name: "empty-terminal-codex",
    accessToken: "synthetic-codex-token",
    refreshToken: "synthetic-refresh",
    expiresAt: new Date(Date.now() + 86_400_000).toISOString(),
    providerSpecificData: { accountId: "synthetic-account" },
    isActive: true,
    testStatus: "active",
  });
  const openrouterConnection = await providers.createProviderConnection({
    provider: "openrouter",
    authType: "apikey",
    name: "empty-terminal-openrouter",
    apiKey: "synthetic-openrouter-key",
    isActive: true,
    testStatus: "active",
  });

  const frame = (data: unknown) => `data: ${JSON.stringify(data)}\n\n`;
  const emptyChatStream =
    frame({
      choices: [{ index: 0, delta: { role: "assistant", content: "" }, finish_reason: null }],
    }) +
    frame({
      choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
      usage: { prompt_tokens: 5, completion_tokens: 0, total_tokens: 5 },
    }) +
    "data: [DONE]\n\n";
  const createdResponses = frame({
    type: "response.created",
    sequence_number: 0,
    response: { id: "resp-empty-test", object: "response", status: "in_progress", output: [] },
  });
  const completedResponses =
    createdResponses +
    frame({
      type: "response.completed",
      sequence_number: 1,
      response: {
        id: "resp-empty-test",
        object: "response",
        status: "completed",
        output: [],
        usage: { input_tokens: 5, output_tokens: 0, total_tokens: 5 },
      },
    });

  async function requestStream(model: string, payload: string, expectedUrl: string, json = false) {
    const calls: { url: string; model: string }[] = [];
    globalThis.fetch = async (input, init = {}) => {
      const url = String(input);
      if (url.includes("/__omniroute_event")) return new Response(null, { status: 204 });
      const body = JSON.parse(String(init.body));
      calls.push({ url, model: body.model });
      assert.equal(
        url,
        body.model === "gpt-4o" ? "https://api.openai.com/v1/chat/completions" : expectedUrl
      );
      const content =
        body.model === "gpt-4o"
          ? frame({
              choices: [
                { index: 0, delta: { content: "visible fallback" }, finish_reason: "stop" },
              ],
            }) + "data: [DONE]\n\n"
          : payload;
      return new Response(content, {
        headers: {
          "content-type":
            json && body.model !== "gpt-4o" ? "application/json" : "text/event-stream",
        },
      });
    };
    const response = await route.POST(
      new Request("http://localhost/v1/chat/completions", {
        method: "POST",
        headers: { "content-type": "application/json", "x-omniroute-no-cache": "true" },
        body: JSON.stringify({
          model,
          messages: [{ role: "user", content: `Stream no reply for ${model}` }],
          stream: true,
        }),
      })
    );
    return { response, text: await response.text(), calls };
  }

  for (const entry of [
    {
      name: "OpenAI",
      model: "openai/gpt-4.1",
      url: "https://api.openai.com/v1/chat/completions",
      payload: emptyChatStream,
      connection,
    },
    {
      name: "Codex native Responses",
      model: "codex/gpt-5.4",
      url: "https://chatgpt.com/backend-api/codex/responses",
      payload: completedResponses,
      connection: codexConnection,
    },
    {
      name: "OpenRouter",
      model: "openrouter/openai/gpt-4.1",
      url: "https://openrouter.ai/api/v1/chat/completions",
      payload: emptyChatStream,
      connection: openrouterConnection,
    },
  ]) {
    test(`#16072 HTTP SSE combo preserves ${entry.name} native empty terminal with one generation`, async () => {
      const combo = `empty-stream-${entry.name.replace(/\W/g, "-")}`;
      await createCombo({
        name: combo,
        strategy: "priority",
        models: [entry.model, "openai/gpt-4o"],
      });
      const { response, text, calls } = await requestStream(combo, entry.payload, entry.url);
      assert.equal(response.status, 200, text);
      assert.ok(!text.includes("visible fallback"), text);
      assert.ok(!text.includes('"error"'), text);
      assert.equal(calls.length, 1, "a valid native terminal must not generate again");
      const current = await providers.getProviderConnectionById(String(entry.connection.id));
      assert.ok(!current?.rateLimitedUntil);
      assert.notEqual(current?.testStatus, "unavailable");
    });
  }

  test("#16072 Codex created then EOF cannot use a translated synthetic stop as native proof", async () => {
    const { response, text, calls } = await requestStream(
      "codex/gpt-5.4",
      createdResponses,
      "https://chatgpt.com/backend-api/codex/responses"
    );
    assert.ok(response.status >= 400 || text.includes('"error"'), text);
    assert.equal(calls.length, 1);
  });

  test("#16072 HTTP JSON-to-SSE combo preserves a native normal terminal", async () => {
    await createCombo({
      name: "empty-json-to-sse",
      strategy: "priority",
      models: ["openai/gpt-4.1", "openai/gpt-4o"],
    });
    const payload = JSON.stringify({
      choices: [{ index: 0, message: { role: "assistant", content: "" }, finish_reason: "stop" }],
      usage: { prompt_tokens: 5, completion_tokens: 0, total_tokens: 5 },
    });
    const { response, text, calls } = await requestStream(
      "empty-json-to-sse",
      payload,
      "https://api.openai.com/v1/chat/completions",
      true
    );
    assert.equal(response.status, 200, text);
    assert.ok(!text.includes("visible fallback"), text);
    assert.equal(calls.length, 1);
  });

  const { createProviderNode } = providers;
  const emptyClaudeStream =
    frame({
      type: "message_start",
      message: {
        id: "msg-empty",
        type: "message",
        role: "assistant",
        content: [],
        model: "claude-sonnet-4",
        usage: { input_tokens: 5, output_tokens: 0 },
      },
    }) +
    frame({
      type: "message_delta",
      delta: { stop_reason: "end_turn", stop_sequence: null },
      usage: { output_tokens: 0 },
    }) +
    frame({ type: "message_stop" });
  for (const entry of [
    {
      name: "azure-responses",
      baseUrl: "https://fixture.openai.azure.com/openai/v1",
      type: "openai-compatible",
      apiType: "responses",
      payload: completedResponses,
      valid: true,
    },
    {
      name: "foundry-responses",
      baseUrl: "https://fixture.services.ai.azure.com/openai/v1",
      type: "openai-compatible",
      apiType: "responses",
      payload: completedResponses,
      valid: true,
    },
    {
      name: "azure-anthropic",
      baseUrl: "https://fixture.services.ai.azure.com/anthropic/v1",
      type: "anthropic-compatible",
      apiType: "messages",
      payload: emptyClaudeStream,
      valid: true,
    },
    {
      name: "unknown-chat",
      baseUrl: "https://unknown.example.invalid/v1",
      type: "openai-compatible",
      apiType: "chat",
      payload: emptyChatStream,
      valid: false,
    },
    {
      name: "fake-azure",
      baseUrl: "https://fixture.openai.azure.com.attacker.invalid/openai/v1",
      type: "openai-compatible",
      apiType: "responses",
      payload: completedResponses,
      valid: false,
    },
  ]) {
    const id = `${entry.type}-${entry.apiType}-16072-${entry.name}`;
    await createProviderNode({
      id,
      name: entry.name,
      type: entry.type,
      prefix: entry.name,
      apiType: entry.apiType,
      baseUrl: entry.baseUrl,
    });
    const nodeConnection = await providers.createProviderConnection({
      provider: id,
      authType: "apikey",
      name: entry.name,
      apiKey: "synthetic-node-key",
      isActive: true,
      testStatus: "active",
      providerSpecificData: { baseUrl: entry.baseUrl, apiType: entry.apiType, prefix: entry.name },
    });
    test(`#16072 real ${entry.name} execution ${entry.valid ? "accepts native completion" : "retains the unknown-origin guard"}`, async () => {
      const model = `${entry.name}/${entry.apiType === "messages" ? "claude-sonnet-4" : "gpt-4.1"}`;
      const suffix = entry.apiType === "chat" ? "chat/completions" : entry.apiType;
      const { response, text, calls } = await requestStream(
        model,
        entry.payload,
        `${entry.baseUrl}/${suffix}`
      );
      if (entry.valid) {
        assert.equal(response.status, 200, text);
        assert.ok(!text.includes('"error"'), text);
        const current = await providers.getProviderConnectionById(String(nodeConnection.id));
        assert.ok(!current?.rateLimitedUntil);
        assert.notEqual(current?.testStatus, "unavailable");
      } else assert.ok(response.status >= 400 || text.includes('"error"'), text);
      assert.equal(calls.length, 1);
    });
  }

  test("#16072 deterministic concurrent requests preserve the executed policy for dedup leader and follower", async () => {
    let generations = 0;
    globalThis.fetch = async (input) => {
      if (String(input).includes("/__omniroute_event")) return new Response(null, { status: 204 });
      assert.equal(String(input), "https://api.openai.com/v1/chat/completions");
      generations++;
      await new Promise((resolve) => setTimeout(resolve, 80));
      return Response.json({
        choices: [{ index: 0, message: { role: "assistant", content: "" }, finish_reason: "stop" }],
      });
    };
    const call = () =>
      route.POST(
        new Request("http://localhost/v1/chat/completions", {
          method: "POST",
          headers: { "content-type": "application/json", "x-omniroute-no-cache": "true" },
          body: JSON.stringify({
            model: "openai/gpt-4.1",
            messages: [{ role: "user", content: "dedup empty turn" }],
            temperature: 0,
            stream: false,
          }),
        })
      );
    const responses = await Promise.all([call(), call()]);
    for (const response of responses) {
      const body = await response.json();
      assert.equal(response.status, 200, JSON.stringify(body));
      assert.equal(body.choices[0].message.content, "");
    }
    assert.equal(generations, 1);
  });

  const messagesRoute = await import("../../src/app/api/v1/messages/route.ts");
  const responsesRoute = await import("../../src/app/api/v1/responses/route.ts");
  for (const entry of [
    {
      name: "Azure Messages JSON",
      model: "azure-anthropic/claude-sonnet-4",
      endpoint: "messages",
      upstream: "https://fixture.services.ai.azure.com/anthropic/v1/messages",
      payload: JSON.stringify({
        id: "msg-empty-json",
        type: "message",
        role: "assistant",
        content: [],
        stop_reason: "end_turn",
        usage: { input_tokens: 5, output_tokens: 0 },
      }),
      sse: false,
    },
    {
      name: "Azure Messages stop_sequence JSON",
      model: "azure-anthropic/claude-sonnet-4",
      endpoint: "messages",
      upstream: "https://fixture.services.ai.azure.com/anthropic/v1/messages",
      payload: JSON.stringify({
        id: "msg-empty-sequence",
        type: "message",
        role: "assistant",
        content: [],
        stop_reason: "stop_sequence",
        stop_sequence: "done",
        usage: { input_tokens: 5, output_tokens: 0 },
      }),
      sse: false,
    },
    {
      name: "Azure Responses JSON",
      model: "azure-responses/gpt-4.1",
      endpoint: "responses",
      upstream: "https://fixture.openai.azure.com/openai/v1/responses",
      payload: JSON.stringify({
        id: "resp-empty-json",
        object: "response",
        status: "completed",
        output: [],
        usage: { input_tokens: 5, output_tokens: 0 },
      }),
      sse: false,
    },
    {
      name: "Codex Responses JSON",
      model: "codex/gpt-5.4",
      endpoint: "responses",
      upstream: "https://chatgpt.com/backend-api/codex/responses",
      payload: completedResponses,
      sse: true,
    },
  ]) {
    test(`#16072 HTTP native ${entry.name} preserves empty terminal`, async () => {
      let generations = 0;
      globalThis.fetch = async (input) => {
        if (String(input).includes("/__omniroute_event"))
          return new Response(null, { status: 204 });
        assert.equal(String(input), entry.upstream);
        generations++;
        return new Response(entry.payload, {
          headers: { "content-type": entry.sse ? "text/event-stream" : "application/json" },
        });
      };
      const nativeRoute = entry.endpoint === "messages" ? messagesRoute : responsesRoute;
      const response = await nativeRoute.POST(
        new Request(`http://localhost/v1/${entry.endpoint}`, {
          method: "POST",
          headers: { "content-type": "application/json", "x-omniroute-no-cache": "true" },
          body: JSON.stringify({
            model: entry.model,
            stream: false,
            max_tokens: 100,
            ...(entry.endpoint === "messages"
              ? { messages: [{ role: "user", content: "no reply" }] }
              : { input: "no reply" }),
          }),
        })
      );
      const body = await response.json();
      assert.equal(response.status, 200, JSON.stringify(body));
      assert.equal(generations, 1);
      if (entry.endpoint === "messages")
        assert.equal(
          body.stop_reason,
          entry.name.includes("stop_sequence") ? "stop_sequence" : "end_turn"
        );
      else {
        assert.equal(body.status, "completed");
        assert.deepEqual(body.output, []);
      }
    });
  }

  test("#16072 opt-in empty retry must not regenerate a valid native Codex terminal", async () => {
    const previous = process.env.FLUSH_EMPTY_RETRY_ENABLED;
    process.env.FLUSH_EMPTY_RETRY_ENABLED = "true";
    try {
      const { response, text, calls } = await requestStream(
        "codex/gpt-5.4",
        completedResponses,
        "https://chatgpt.com/backend-api/codex/responses"
      );
      assert.equal(response.status, 200, text);
      assert.ok(!text.includes('"error"'), text);
      assert.equal(calls.length, 1);
    } finally {
      if (previous === undefined) delete process.env.FLUSH_EMPTY_RETRY_ENABLED;
      else process.env.FLUSH_EMPTY_RETRY_ENABLED = previous;
    }
  });

  test("#16072 native Responses JSON combo must not replace empty completion with a sibling", async () => {
    await createCombo({
      name: "native-empty-responses-combo",
      strategy: "priority",
      models: ["azure-responses/gpt-4.1", "openai/gpt-4o"],
    });
    const calls: string[] = [];
    globalThis.fetch = async (input) => {
      const url = String(input);
      if (url.includes("/__omniroute_event")) return new Response(null, { status: 204 });
      calls.push(url);
      if (url === "https://api.openai.com/v1/chat/completions")
        return Response.json({
          choices: [
            { message: { role: "assistant", content: "visible sibling" }, finish_reason: "stop" },
          ],
        });
      assert.equal(url, "https://fixture.openai.azure.com/openai/v1/responses");
      return Response.json({
        id: "resp-combo-empty",
        object: "response",
        status: "completed",
        output: [],
        usage: { input_tokens: 5, output_tokens: 0 },
      });
    };
    const response = await responsesRoute.POST(
      new Request("http://localhost/v1/responses", {
        method: "POST",
        headers: { "content-type": "application/json", "x-omniroute-no-cache": "true" },
        body: JSON.stringify({
          model: "native-empty-responses-combo",
          input: "no reply",
          stream: false,
        }),
      })
    );
    const body = await response.json();
    assert.equal(response.status, 200, JSON.stringify(body));
    assert.deepEqual(body.output, []);
    assert.equal(calls.length, 1);
  });

  test("#16072 Claude lifecycle with an opened but empty text block retains fake-success protection", async () => {
    const payload = emptyClaudeStream.replace(
      'data: {"type":"message_delta"',
      frame({ type: "content_block_start", index: 0, content_block: { type: "text", text: "" } }) +
        frame({ type: "content_block_stop", index: 0 }) +
        'data: {"type":"message_delta"'
    );
    const { response, text, calls } = await requestStream(
      "azure-anthropic/claude-sonnet-4",
      payload,
      "https://fixture.services.ai.azure.com/anthropic/v1/messages"
    );
    assert.ok(response.status >= 400 || text.includes('"error"'), text);
    assert.equal(calls.length, 1);
  });

  test("#16072 opt-in retry preserves a completed native reasoning-only turn", async () => {
    const reasoning = {
      id: "rs-empty",
      type: "reasoning",
      summary: [{ type: "summary_text", text: "No response needed" }],
    };
    const payload =
      createdResponses +
      frame({
        type: "response.output_item.added",
        output_index: 0,
        item: { ...reasoning, summary: [] },
      }) +
      frame({
        type: "response.reasoning_summary_text.delta",
        item_id: "rs-empty",
        output_index: 0,
        summary_index: 0,
        delta: "No response needed",
      }) +
      frame({ type: "response.output_item.done", output_index: 0, item: reasoning }) +
      frame({
        type: "response.completed",
        response: {
          id: "resp-empty-test",
          object: "response",
          status: "completed",
          output: [reasoning],
          usage: { input_tokens: 5, output_tokens: 5, total_tokens: 10 },
        },
      });
    const previous = process.env.FLUSH_EMPTY_RETRY_ENABLED;
    process.env.FLUSH_EMPTY_RETRY_ENABLED = "true";
    try {
      const { response, text, calls } = await requestStream(
        "codex/gpt-5.4",
        payload,
        "https://chatgpt.com/backend-api/codex/responses"
      );
      assert.equal(response.status, 200, text);
      assert.ok(!text.includes('"error"'), text);
      assert.equal(calls.length, 1);
    } finally {
      if (previous === undefined) delete process.env.FLUSH_EMPTY_RETRY_ENABLED;
      else process.env.FLUSH_EMPTY_RETRY_ENABLED = previous;
    }
  });

  test("#16072 explicit quota error wins over a normal stop in the same upstream stream", async () => {
    const { text } = await requestStream(
      "openai/gpt-4.1",
      emptyChatStream +
        frame({ error: { type: "insufficient_quota", message: "Quota exhausted" } }),
      "https://api.openai.com/v1/chat/completions"
    );
    assert.match(text, /insufficient_quota|Quota exhausted/);
    assert.doesNotMatch(text, /Provider returned empty content/);
  });
});
