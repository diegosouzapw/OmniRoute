import test from "node:test";
import assert from "node:assert/strict";
import { encodeSkillToolName } from "../../src/lib/skills/injection.ts";

import { createChatPipelineHarness } from "./_chatPipelineHarness.ts";

// Split out of skills-pipeline.test.ts (#12867): the three server-owned tool loop
// cases pushed that file to 1338 lines, past the 1200-line test cap. Same harness,
// its own instance so the two files stay independently runnable.
const harness = await createChatPipelineHarness("server-owned-tool-loop-pipeline");
const {
  BaseExecutor,
  buildOpenAIResponse,
  buildOpenAIToolCallResponse,
  buildRequest,
  handleChat,
  resetStorage,
  seedApiKey,
  seedConnection,
  settingsDb,
  skillExecutor,
  skillRegistry,
} = harness;

test.beforeEach(async () => {
  BaseExecutor.RETRY_CONFIG.delayMs = 0;
  await resetStorage();
});

test.afterEach(async () => {
  BaseExecutor.RETRY_CONFIG.delayMs = harness.originalRetryDelayMs;
  await resetStorage();
});

test.after(async () => {
  await harness.cleanup();
});

async function enableSkills() {
  await settingsDb.updateSettings({ skillsEnabled: true });
}

async function registerSkill({
  apiKeyId,
  name,
  version = "1.0.0",
  handler,
  enabled = true,
  description = "Test skill",
  mode,
  tags,
  installCount,
}) {
  return skillRegistry.register({
    apiKeyId,
    name,
    version,
    description,
    schema: {
      input: {
        type: "object",
        properties: {
          location: { type: "string" },
          path: { type: "string" },
        },
      },
      output: {
        type: "object",
      },
    },
    handler,
    enabled,
    mode,
    tags,
    installCount,
  });
}

test("server-owned tool loop completes end-to-end for OpenAI without returning tool_results (issue #12696)", async () => {
  await seedConnection("openai", { apiKey: "test-openai-key" });
  const apiKey = await seedApiKey();
  await enableSkills();

  skillExecutor.registerHandler("weather-handler-loop-openai", async (input) => ({
    forecast: `Sunny in ${input.location}`,
  }));
  await registerSkill({
    apiKeyId: apiKey.id,
    name: "lookupWeather",
    handler: "weather-handler-loop-openai",
  });

  const prevFlag = process.env.SERVER_OWNED_TOOL_LOOP_ENABLED;
  process.env.SERVER_OWNED_TOOL_LOOP_ENABLED = "true";

  const fetchCalls: Array<{ url: string; body: Record<string, unknown> }> = [];
  globalThis.fetch = async (input, init) => {
    const bodyStr = typeof init?.body === "string" ? init.body : "{}";
    const body = JSON.parse(bodyStr);
    fetchCalls.push({ url: String(input), body });

    if (fetchCalls.length === 1) {
      return buildOpenAIToolCallResponse({
        toolCallId: "call_weather_loop_1",
        toolName: encodeSkillToolName("lookupWeather", "1.0.0"),
        argumentsObject: { location: "Tokyo" },
      });
    }

    return buildOpenAIResponse("The weather in Tokyo is 18C and sunny.", "gpt-4o-mini");
  };

  try {
    const response = await handleChat(
      buildRequest({
        authKey: apiKey.key,
        body: {
          model: "openai/gpt-4o-mini",
          stream: false,
          messages: [{ role: "user", content: "What is the weather in Tokyo?" }],
        },
      })
    );

    assert.equal(response.status, 200);
    const json = (await response.json()) as Record<string, unknown>;

    assert.equal(fetchCalls.length, 2, "should have dispatched 2 provider legs");
    assert.equal(
      json.tool_results,
      undefined,
      "gateway should not return tool_results when loop is enabled"
    );
    assert.equal(json.choices[0].finish_reason, "stop");
    assert.equal(json.choices[0].message.content, "The weather in Tokyo is 18C and sunny.");
    assert.equal(fetchCalls[1].body.messages.length, 3);
    assert.equal(fetchCalls[1].body.messages[1].role, "assistant");
    assert.equal(fetchCalls[1].body.messages[2].role, "tool");
    assert.equal(fetchCalls[1].body.messages[2].tool_call_id, "call_weather_loop_1");
  } finally {
    process.env.SERVER_OWNED_TOOL_LOOP_ENABLED = prevFlag;
  }
});

test("server-owned tool loop follow-up failure propagates error cleanly", async () => {
  await seedConnection("openai", { apiKey: "test-openai-key" });
  const apiKey = await seedApiKey();
  await enableSkills();

  skillExecutor.registerHandler("weather-handler-loop-fail", async (input) => ({
    forecast: `Sunny in ${input.location}`,
  }));
  await registerSkill({
    apiKeyId: apiKey.id,
    name: "lookupWeather",
    handler: "weather-handler-loop-fail",
  });

  const prevFlag = process.env.SERVER_OWNED_TOOL_LOOP_ENABLED;
  process.env.SERVER_OWNED_TOOL_LOOP_ENABLED = "true";

  let callCount = 0;
  globalThis.fetch = async () => {
    callCount++;
    if (callCount === 1) {
      return buildOpenAIToolCallResponse({
        callId: "call_weather_fail_1",
        toolName: encodeSkillToolName("lookupWeather", "1.0.0"),
        argumentsObject: { location: "Tokyo" },
      });
    }
    return new Response(JSON.stringify({ error: { message: "Rate limit exceeded" } }), {
      status: 429,
      headers: { "content-type": "application/json" },
    });
  };

  try {
    const response = await handleChat(
      buildRequest({
        authKey: apiKey.key,
        body: {
          model: "openai/gpt-4o-mini",
          stream: false,
          messages: [{ role: "user", content: "What is the weather in Tokyo?" }],
        },
      })
    );

    assert.ok(callCount >= 2, `expected at least 2 fetch calls, got ${callCount}`);
    assert.equal(response.status, 429);
  } finally {
    process.env.SERVER_OWNED_TOOL_LOOP_ENABLED = prevFlag;
  }
});

test("server-owned tool loop completes end-to-end for Claude messages client without returning tool_results", async () => {
  await seedConnection("openai", { apiKey: "test-openai-key" });
  const apiKey = await seedApiKey();
  await enableSkills();

  skillExecutor.registerHandler("weather-handler-loop-claude-client", async (input) => ({
    forecast: `Sunny in ${input.location}`,
  }));
  await registerSkill({
    apiKeyId: apiKey.id,
    name: "lookupWeather",
    handler: "weather-handler-loop-claude-client",
  });

  const prevFlag = process.env.SERVER_OWNED_TOOL_LOOP_ENABLED;
  process.env.SERVER_OWNED_TOOL_LOOP_ENABLED = "true";

  const fetchCalls: Array<{ url: string; body: Record<string, unknown> }> = [];
  globalThis.fetch = async (input, init) => {
    const bodyStr = typeof init?.body === "string" ? init.body : "{}";
    const body = JSON.parse(bodyStr);
    fetchCalls.push({ url: String(input), body });

    if (fetchCalls.length === 1) {
      return buildOpenAIToolCallResponse({
        toolCallId: "call_weather_claude_1",
        toolName: encodeSkillToolName("lookupWeather", "1.0.0"),
        argumentsObject: { location: "Tokyo" },
      });
    }

    return buildOpenAIResponse("The weather in Tokyo is 18C and sunny.", "gpt-4o-mini");
  };

  try {
    const response = await handleChat(
      buildRequest({
        url: "http://localhost/v1/messages",
        authKey: apiKey.key,
        body: {
          model: "openai/gpt-4o-mini",
          stream: false,
          max_tokens: 256,
          messages: [
            { role: "user", content: [{ type: "text", text: "What is the weather in Tokyo?" }] },
          ],
        },
      })
    );

    assert.equal(response.status, 200);
    const json = (await response.json()) as Record<string, unknown>;

    assert.equal(fetchCalls.length, 2, "should have dispatched 2 provider legs");
    assert.equal(json.type, "message");
    assert.equal(json.role, "assistant");
    assert.equal(json.stop_reason, "end_turn");
    assert.equal(json.content[0].text, "The weather in Tokyo is 18C and sunny.");
    assert.equal(json.tool_results, undefined);
  } finally {
    process.env.SERVER_OWNED_TOOL_LOOP_ENABLED = prevFlag;
  }
});
