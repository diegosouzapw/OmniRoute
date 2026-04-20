import test from "node:test";
import assert from "node:assert/strict";
import { OMNIROUTE_WEB_SEARCH_FALLBACK_TOOL_NAME } from "../../open-sse/services/webSearchFallback.ts";

import { createChatPipelineHarness } from "./_chatPipelineHarness.ts";

const harness = await createChatPipelineHarness("skills-pipeline");
const {
  BaseExecutor,
  buildOpenAIResponse,
  buildOpenAIToolCallResponse,
  buildRequest,
  builtinsModule,
  handleChat,
  resetStorage,
  sandboxModule,
  seedApiKey,
  seedConnection,
  settingsDb,
  skillByIdRouteModule,
  skillExecutor,
  skillRegistry,
  skillsRouteModule,
} = harness;

const { registerBuiltinSkills } = builtinsModule;
const { sandboxRunner } = sandboxModule;

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

test("skills API lists registered skills", async () => {
  const apiKey = await seedApiKey();
  await registerSkill({
    apiKeyId: apiKey.id,
    name: "lookupWeather",
    handler: "weather-handler-list",
  });

  const response = await skillsRouteModule.GET();
  const json = await response.json();

  assert.equal(response.status, 200);
  assert.ok(Array.isArray(json.skills));
  assert.ok(json.skills.some((skill) => skill.name === "lookupWeather"));
});

test("enabling a disabled skill makes it available in the request pipeline", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-skill-enable" });
  const apiKey = await seedApiKey();
  await enableSkills();

  const skill = await registerSkill({
    apiKeyId: apiKey.id,
    name: "lookupWeather",
    handler: "weather-handler-enable",
    enabled: false,
  });

  const updateResponse = await skillByIdRouteModule.PUT(
    new Request("http://localhost/api/skills/id", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ enabled: true }),
    }),
    { params: Promise.resolve({ id: skill.id }) }
  );

  const fetchBodies = [];
  globalThis.fetch = async (_url, init = {}) => {
    fetchBodies.push(init.body ? JSON.parse(String(init.body)) : null);
    return buildOpenAIResponse("Skill enabled");
  };

  const response = await handleChat(
    buildRequest({
      authKey: apiKey.key,
      body: {
        model: "openai/gpt-4o-mini",
        stream: false,
        messages: [{ role: "user", content: "What tools do you have?" }],
      },
    })
  );

  assert.equal(updateResponse.status, 200);
  assert.equal(response.status, 200);
  assert.ok(Array.isArray(fetchBodies[0].tools));
  assert.ok(fetchBodies[0].tools.some((tool) => tool.function.name === "lookupWeather@1.0.0"));
});

test("matching tool calls execute the registered skill and return tool results", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-skill-exec" });
  const apiKey = await seedApiKey();
  await enableSkills();

  skillExecutor.registerHandler("weather-handler-exec", async (input) => ({
    forecast: `Sunny in ${input.location}`,
  }));
  await registerSkill({
    apiKeyId: apiKey.id,
    name: "lookupWeather",
    handler: "weather-handler-exec",
  });

  globalThis.fetch = async () =>
    buildOpenAIToolCallResponse({
      toolName: "lookupWeather@1.0.0",
      argumentsObject: { location: "Recife" },
    });

  const response = await handleChat(
    buildRequest({
      authKey: apiKey.key,
      body: {
        model: "openai/gpt-4o-mini",
        stream: false,
        messages: [{ role: "user", content: "Check the weather" }],
      },
    })
  );
  const json = await response.json();

  assert.equal(response.status, 200);
  assert.equal(json.choices[0].finish_reason, "tool_calls");
  assert.equal(json.tool_results[0].tool_call_id, "call_weather");
  assert.equal(JSON.parse(json.tool_results[0].output).forecast, "Sunny in Recife");
});

test("non-matching responses fall through the pipeline normally", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-skill-pass" });
  const apiKey = await seedApiKey();
  await enableSkills();

  skillExecutor.registerHandler("noop-handler", async () => ({ ok: true }));
  await registerSkill({
    apiKeyId: apiKey.id,
    name: "noopSkill",
    handler: "noop-handler",
  });

  globalThis.fetch = async () => buildOpenAIResponse("Normal pipeline response");

  const response = await handleChat(
    buildRequest({
      authKey: apiKey.key,
      body: {
        model: "openai/gpt-4o-mini",
        stream: false,
        messages: [{ role: "user", content: "Just answer normally" }],
      },
    })
  );
  const json = await response.json();

  assert.equal(response.status, 200);
  assert.equal(json.choices[0].message.content, "Normal pipeline response");
  assert.equal(json.tool_results, undefined);
});

test("sandbox-backed skill execution can be mocked through the executor", async () => {
  const apiKey = await seedApiKey();
  const originalRun = sandboxRunner.run.bind(sandboxRunner);

  skillExecutor.registerHandler("sandbox-handler", async () => {
    const result = await sandboxRunner.run("alpine", ["echo", "sandbox"], {});
    return { stdout: result.stdout, exitCode: result.exitCode };
  });
  await registerSkill({
    apiKeyId: apiKey.id,
    name: "sandboxedSkill",
    handler: "sandbox-handler",
  });

  sandboxRunner.run = async () => ({
    id: "sandbox-1",
    exitCode: 0,
    stdout: "sandbox ok",
    stderr: "",
    duration: 12,
    killed: false,
  });

  const execution = await skillExecutor.execute(
    "sandboxedSkill@1.0.0",
    { command: "echo sandbox" },
    { apiKeyId: apiKey.id, sessionId: "sandbox-session" }
  );

  sandboxRunner.run = originalRun;

  assert.equal(execution.status, "success");
  assert.equal(execution.output.stdout, "sandbox ok");
  assert.equal(execution.output.exitCode, 0);
});

test("skill execution errors are returned gracefully in tool results", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-skill-error" });
  const apiKey = await seedApiKey();
  await enableSkills();

  skillExecutor.registerHandler("broken-handler", async () => {
    throw new Error("sandbox policy denied execution");
  });
  await registerSkill({
    apiKeyId: apiKey.id,
    name: "brokenSkill",
    handler: "broken-handler",
  });

  globalThis.fetch = async () =>
    buildOpenAIToolCallResponse({
      toolName: "brokenSkill@1.0.0",
      toolCallId: "call_broken",
    });

  const response = await handleChat(
    buildRequest({
      authKey: apiKey.key,
      body: {
        model: "openai/gpt-4o-mini",
        stream: false,
        messages: [{ role: "user", content: "Run the protected tool" }],
      },
    })
  );
  const json = await response.json();

  assert.equal(response.status, 200);
  assert.equal(json.tool_results[0].tool_call_id, "call_broken");
  assert.match(JSON.parse(json.tool_results[0].output).error, /sandbox policy denied/);
});

test("disabling a skill removes it from request tool injection", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-skill-disable" });
  const apiKey = await seedApiKey();
  await enableSkills();

  const skill = await registerSkill({
    apiKeyId: apiKey.id,
    name: "lookupWeather",
    handler: "weather-handler-disable",
  });

  const updateResponse = await skillByIdRouteModule.PUT(
    new Request("http://localhost/api/skills/id", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ enabled: false }),
    }),
    { params: Promise.resolve({ id: skill.id }) }
  );

  const fetchBodies = [];
  globalThis.fetch = async (_url, init = {}) => {
    fetchBodies.push(init.body ? JSON.parse(String(init.body)) : null);
    return buildOpenAIResponse("Skill disabled");
  };

  const response = await handleChat(
    buildRequest({
      authKey: apiKey.key,
      body: {
        model: "openai/gpt-4o-mini",
        stream: false,
        messages: [{ role: "user", content: "What tools do you have now?" }],
      },
    })
  );

  assert.equal(updateResponse.status, 200);
  assert.equal(response.status, 200);
  assert.ok(!fetchBodies[0].tools || fetchBodies[0].tools.length === 0);
});

// ---------------------------------------------------------------------------
// New integration tests: injection, interception, execution record,
// decoupled enablement, and logging/observability
// ---------------------------------------------------------------------------

test("injectSkills() correctly injects skill context into a request", async () => {
  const { injectSkills } = await import("../../src/lib/skills/injection.ts");

  const apiKey = await seedApiKey();
  await enableSkills();

  await registerSkill({
    apiKeyId: apiKey.id,
    name: "translateText",
    handler: "translate-handler-inject",
    description: "Translate text to another language",
  });

  const tools = injectSkills({
    provider: "openai",
    existingTools: [],
    apiKeyId: apiKey.id,
  });

  assert.ok(Array.isArray(tools), "injectSkills should return an array");
  assert.equal(tools.length, 1, "should inject exactly one skill tool");
  assert.equal(tools[0].type, "function");
  assert.equal(tools[0].function.name, "translateText@1.0.0");
  assert.equal(tools[0].function.description, "Translate text to another language");
  assert.ok(tools[0].function.parameters, "parameters should be present");
});

test("injectSkills() merges with existing tools without duplicating", async () => {
  const { injectSkills } = await import("../../src/lib/skills/injection.ts");

  const apiKey = await seedApiKey();
  await enableSkills();

  await registerSkill({
    apiKeyId: apiKey.id,
    name: "calcRoute",
    handler: "calc-handler-inject-merge",
  });

  const existingTool = {
    type: "function",
    function: {
      name: "preExistingTool",
      description: "Already here",
      parameters: {},
    },
  };

  const tools = injectSkills({
    provider: "openai",
    existingTools: [existingTool],
    apiKeyId: apiKey.id,
  });

  assert.equal(tools.length, 2, "should have injected skill + existing tool");
  const names = tools.map((t) => t.function?.name || t.name);
  assert.ok(names.includes("calcRoute@1.0.0"));
  assert.ok(names.includes("preExistingTool"));
});

test("responses input context participates in AUTO skill injection", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-skills-responses-input" });
  const apiKey = await seedApiKey();
  await enableSkills();

  await registerSkill({
    apiKeyId: apiKey.id,
    name: "issueSearch",
    handler: "issue-search-handler",
    description: "search github issues and pull requests",
    mode: "auto",
    tags: ["github", "issues", "search"],
    installCount: 40,
  });

  await registerSkill({
    apiKeyId: apiKey.id,
    name: "calendarPlanner",
    handler: "calendar-handler",
    description: "manage meetings and calendars",
    mode: "auto",
    tags: ["calendar", "meeting"],
    installCount: 100,
  });

  const fetchBodies = [];
  globalThis.fetch = async (_url, init = {}) => {
    fetchBodies.push(init.body ? JSON.parse(String(init.body)) : null);
    return buildOpenAIResponse("AUTO skill selection via responses input");
  };

  const response = await handleChat(
    buildRequest({
      url: "http://localhost/v1/responses",
      authKey: apiKey.key,
      body: {
        model: "openai/gpt-4o-mini",
        stream: false,
        input: [
          {
            role: "user",
            content: [{ type: "input_text", text: "Please search github issues for flaky tests" }],
          },
        ],
      },
    })
  );

  assert.equal(response.status, 200);
  assert.ok(Array.isArray(fetchBodies[0].tools));

  const names = fetchBodies[0].tools
    .map((tool) => tool?.function?.name)
    .filter((name) => typeof name === "string");

  assert.ok(names.includes("issueSearch@1.0.0"));
  assert.ok(!names.includes("calendarPlanner@1.0.0"));
});

test("handleToolCallExecution() processes a tool call correctly", async () => {
  const { handleToolCallExecution } = await import("../../src/lib/skills/interception.ts");

  const apiKey = await seedApiKey();
  await enableSkills();

  skillExecutor.registerHandler("geo-handler-intercept", async (input) => ({
    coordinates: { lat: -8.05, lng: -34.87 },
    city: input.location,
  }));
  await registerSkill({
    apiKeyId: apiKey.id,
    name: "geoLookup",
    handler: "geo-handler-intercept",
  });

  const fakeResponse = {
    id: "chatcmpl_intercept",
    choices: [
      {
        index: 0,
        message: {
          role: "assistant",
          content: "",
          tool_calls: [
            {
              id: "call_geo",
              type: "function",
              function: {
                name: "geoLookup@1.0.0",
                arguments: JSON.stringify({ location: "Recife" }),
              },
            },
          ],
        },
        finish_reason: "tool_calls",
      },
    ],
  };

  const result = await handleToolCallExecution(fakeResponse, "openai/gpt-4o-mini", {
    apiKeyId: apiKey.id,
    sessionId: "test-session-intercept",
    requestId: "req-intercept-1",
  });

  assert.ok(result.tool_results, "should have tool_results");
  assert.equal(result.tool_results.length, 1);
  assert.equal(result.tool_results[0].tool_call_id, "call_geo");
  const output = JSON.parse(result.tool_results[0].output);
  assert.equal(output.city, "Recife");
  assert.deepEqual(output.coordinates, { lat: -8.05, lng: -34.87 });
});

test("skill execution stores a record and marks it complete", async () => {
  const apiKey = await seedApiKey();
  await enableSkills();

  skillExecutor.registerHandler("store-handler-exec", async (input) => ({
    processed: true,
    value: input.data,
  }));
  await registerSkill({
    apiKeyId: apiKey.id,
    name: "storeTest",
    handler: "store-handler-exec",
  });

  const execution = await skillExecutor.execute(
    "storeTest@1.0.0",
    { data: "hello" },
    { apiKeyId: apiKey.id, sessionId: "store-session" }
  );

  assert.equal(execution.status, "success");
  assert.deepEqual(execution.output, { processed: true, value: "hello" });
  assert.ok(execution.durationMs >= 0, "durationMs should be non-negative");
  assert.ok(execution.id, "execution should have an ID");

  // Verify the record is persisted and retrievable
  const retrieved = skillExecutor.getExecution(execution.id);
  assert.ok(retrieved, "execution should be retrievable from storage");
  assert.equal(retrieved.status, "success");
  assert.equal(retrieved.skillId, execution.skillId);
  assert.deepEqual(retrieved.output, { processed: true, value: "hello" });

  // Verify it appears in listings
  const executions = skillExecutor.listExecutions(apiKey.id);
  assert.ok(executions.length >= 1, "listExecutions should return at least one record");
  assert.ok(
    executions.some((e) => e.id === execution.id),
    "the execution should appear in listExecutions"
  );
});

test("skills pipeline can be disabled via skillsEnabled flag without crashing", async () => {
  const { injectSkills } = await import("../../src/lib/skills/injection.ts");

  await seedConnection("openai", { apiKey: "sk-openai-skill-disabled-flag" });
  const apiKey = await seedApiKey();

  // Explicitly disable skills
  await settingsDb.updateSettings({ skillsEnabled: false });

  skillExecutor.registerHandler("disabled-handler", async () => ({
    should: "never run",
  }));
  await registerSkill({
    apiKeyId: apiKey.id,
    name: "disabledSkill",
    handler: "disabled-handler",
  });

  // injectSkills should still work (returns tools based on registry state)
  // but the pipeline should NOT inject when skillsEnabled is false
  const fetchBodies = [];
  globalThis.fetch = async (_url, init = {}) => {
    fetchBodies.push(init.body ? JSON.parse(String(init.body)) : null);
    return buildOpenAIResponse("Skills disabled test");
  };

  const response = await handleChat(
    buildRequest({
      authKey: apiKey.key,
      body: {
        model: "openai/gpt-4o-mini",
        stream: false,
        messages: [{ role: "user", content: "Test with skills disabled" }],
      },
    })
  );

  assert.equal(response.status, 200);
  // When skillsEnabled=false, chatCore should NOT inject skill tools into the request
  const sentBody = fetchBodies[0];
  const hasSkillTools =
    sentBody?.tools?.some((t) => t.function?.name?.includes("disabledSkill")) ?? false;
  assert.equal(hasSkillTools, false, "skill tools should NOT be injected when skillsEnabled=false");

  // Also verify executor refuses to run when disabled
  await assert.rejects(
    () =>
      skillExecutor.execute(
        "disabledSkill@1.0.0",
        {},
        {
          apiKeyId: apiKey.id,
          sessionId: "disabled-session",
        }
      ),
    (err) => {
      assert.ok(err.message.includes("disabled"), "should mention disabled in error");
      return true;
    }
  );
});

test("observability log calls fire during injection/interception/execution", async () => {
  const { injectSkills } = await import("../../src/lib/skills/injection.ts");
  const { handleToolCallExecution } = await import("../../src/lib/skills/interception.ts");

  const apiKey = await seedApiKey();
  await enableSkills();

  skillExecutor.registerHandler("obs-handler", async (input) => ({
    observed: true,
    input: input.query,
  }));
  await registerSkill({
    apiKeyId: apiKey.id,
    name: "observableSkill",
    handler: "obs-handler",
  });

  // Capture console.log calls to detect log events
  const logMessages = [];
  const originalLog = console.log;
  const originalDebug = console.debug;
  console.log = (...args) => {
    logMessages.push(args.join(" "));
    originalLog(...args);
  };
  console.debug = (...args) => {
    logMessages.push(args.join(" "));
    originalDebug(...args);
  };

  try {
    // 1) Injection — should fire skills.injection.injected
    injectSkills({
      provider: "openai",
      existingTools: [],
      apiKeyId: apiKey.id,
    });

    assert.ok(
      logMessages.some((m) => m.includes("skills.injection.injected")),
      "should log skills.injection.injected during injection"
    );

    // 2) Interception + Execution — should fire interception and executor logs
    const fakeResponse = {
      id: "chatcmpl_obs",
      choices: [
        {
          index: 0,
          message: {
            role: "assistant",
            content: "",
            tool_calls: [
              {
                id: "call_obs",
                type: "function",
                function: {
                  name: "observableSkill@1.0.0",
                  arguments: JSON.stringify({ query: "test" }),
                },
              },
            ],
          },
          finish_reason: "tool_calls",
        },
      ],
    };

    await handleToolCallExecution(fakeResponse, "openai/gpt-4o-mini", {
      apiKeyId: apiKey.id,
      sessionId: "obs-session",
      requestId: "req-obs-1",
    });

    assert.ok(
      logMessages.some((m) => m.includes("skills.interception.tool_call_detected")),
      "should log skills.interception.tool_call_detected"
    );
    assert.ok(
      logMessages.some((m) => m.includes("skills.executor.start")),
      "should log skills.executor.start"
    );
    assert.ok(
      logMessages.some((m) => m.includes("skills.executor.complete")),
      "should log skills.executor.complete"
    );
    assert.ok(
      logMessages.some((m) => m.includes("skills.interception.execution_complete")),
      "should log skills.interception.execution_complete"
    );
  } finally {
    console.log = originalLog;
    console.debug = originalDebug;
  }
});

test("injectSkills() returns empty array and logs skipped when no skills are enabled", async () => {
  const { injectSkills } = await import("../../src/lib/skills/injection.ts");

  const apiKey = await seedApiKey();
  await enableSkills();

  // Don't register any skills — so there are zero enabled skills for this key

  const logMessages = [];
  const originalLog = console.log;
  console.log = (...args) => {
    logMessages.push(args.join(" "));
    originalLog(...args);
  };

  try {
    const tools = injectSkills({
      provider: "openai",
      existingTools: [],
      apiKeyId: apiKey.id,
    });

    assert.ok(Array.isArray(tools), "should return an array");
    assert.equal(tools.length, 0, "should return empty array when no skills exist");
    assert.ok(
      logMessages.some((m) => m.includes("skills.injection.skipped")),
      "should log skills.injection.skipped when no enabled skills"
    );
  } finally {
    console.log = originalLog;
  }
});

test("builtin and custom skills coexist in the injected tool list", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-skill-builtin" });
  const apiKey = await seedApiKey();
  await enableSkills();

  registerBuiltinSkills(skillExecutor);
  skillExecutor.registerHandler("custom-weather-handler", async () => ({
    forecast: "Cloudy",
  }));

  await registerSkill({
    apiKeyId: apiKey.id,
    name: "webSearch",
    handler: "web_search",
  });
  await registerSkill({
    apiKeyId: apiKey.id,
    name: "lookupWeather",
    handler: "custom-weather-handler",
  });

  const fetchBodies = [];
  globalThis.fetch = async (_url, init = {}) => {
    fetchBodies.push(init.body ? JSON.parse(String(init.body)) : null);
    return buildOpenAIResponse("Both skills available");
  };

  const response = await handleChat(
    buildRequest({
      authKey: apiKey.key,
      body: {
        model: "openai/gpt-4o-mini",
        stream: false,
        messages: [{ role: "user", content: "List my tools" }],
      },
    })
  );

  const toolNames = (fetchBodies[0].tools || []).map((tool) => tool.function.name).sort();

  assert.equal(response.status, 200);
  assert.deepEqual(toolNames, ["lookupWeather@1.0.0", "webSearch@1.0.0"]);
});

test("web_search fallback converts built-in tools for unsupported providers and executes search", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-web-search-fallback" });
  await seedConnection("serper-search", { apiKey: "serper-search-key" });
  const apiKey = await seedApiKey();

  const upstreamBodies = [];
  const searchCalls = [];

  globalThis.fetch = async (url, init = {}) => {
    const urlStr = String(url);
    const body = init.body ? JSON.parse(String(init.body)) : null;

    if (urlStr.includes("google.serper.dev/search")) {
      searchCalls.push({ url: urlStr, init, body });
      return new Response(
        JSON.stringify({
          organic: [
            {
              title: "OmniRoute Search Result",
              link: "https://example.com/omniroute",
              snippet: "Fresh OmniRoute web search fallback result",
            },
          ],
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    upstreamBodies.push(body);
    return buildOpenAIToolCallResponse({
      toolName: OMNIROUTE_WEB_SEARCH_FALLBACK_TOOL_NAME,
      toolCallId: "call_web_search",
      argumentsObject: {
        query: "latest omniroute release notes",
        max_results: 3,
      },
    });
  };

  const response = await handleChat(
    buildRequest({
      authKey: apiKey.key,
      body: {
        model: "openai/gpt-4o-mini",
        stream: false,
        messages: [
          { role: "user", content: "Search the web for the latest OmniRoute release notes" },
        ],
        tools: [{ type: "web_search", search_context_size: "medium" }],
      },
    })
  );
  const json = await response.json();

  assert.equal(response.status, 200);
  assert.equal(upstreamBodies.length, 1);
  assert.equal(upstreamBodies[0].tools[0].type, "function");
  assert.equal(upstreamBodies[0].tools[0].function.name, OMNIROUTE_WEB_SEARCH_FALLBACK_TOOL_NAME);
  assert.equal(searchCalls.length, 1);
  assert.equal(json.choices[0].finish_reason, "tool_calls");
  assert.equal(json.tool_results[0].tool_call_id, "call_web_search");
  const output = JSON.parse(json.tool_results[0].output);
  assert.equal(output.success, true);
  assert.equal(output.provider, "serper-search");
  assert.equal(output.results[0].title, "OmniRoute Search Result");
});

test("web_search fallback preserves Responses API output by appending function_call_output", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-web-search-responses" });
  await seedConnection("serper-search", { apiKey: "serper-search-key" });
  const apiKey = await seedApiKey();

  globalThis.fetch = async (url, init = {}) => {
    const urlStr = String(url);
    if (urlStr.includes("google.serper.dev/search")) {
      return new Response(
        JSON.stringify({
          organic: [
            {
              title: "Responses Search Result",
              link: "https://example.com/responses",
              snippet: "Responses API fallback result",
            },
          ],
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    return buildOpenAIToolCallResponse({
      toolName: OMNIROUTE_WEB_SEARCH_FALLBACK_TOOL_NAME,
      toolCallId: "call_responses_web_search",
      argumentsObject: {
        query: "latest omniroute roadmap",
      },
    });
  };

  const response = await handleChat(
    buildRequest({
      url: "http://localhost/v1/responses",
      authKey: apiKey.key,
      body: {
        model: "openai/gpt-4o-mini",
        stream: false,
        input: [
          {
            type: "message",
            role: "user",
            content: [
              { type: "input_text", text: "Search the web for the latest OmniRoute roadmap" },
            ],
          },
        ],
        tools: [{ type: "web_search_preview", search_context_size: "low" }],
      },
    })
  );
  const json = await response.json();
  const functionCall = json.output.find((item) => item.type === "function_call");
  const functionCallOutput = json.output.find((item) => item.type === "function_call_output");

  assert.equal(response.status, 200);
  assert.ok(functionCall, "should include the original function_call item");
  assert.ok(functionCallOutput, "should append function_call_output");
  assert.equal(functionCall.name, OMNIROUTE_WEB_SEARCH_FALLBACK_TOOL_NAME);
  assert.equal(functionCallOutput.call_id, "call_responses_web_search");
  const output =
    typeof functionCallOutput.output === "string"
      ? JSON.parse(functionCallOutput.output)
      : functionCallOutput.output;
  assert.equal(output.success, true);
  assert.equal(output.results[0].title, "Responses Search Result");
});
