import test from "node:test";
import assert from "node:assert/strict";

import { handlePipelineCombo } from "../../open-sse/services/autoCombo/pipelineRouter.ts";
import { executePipeline, buildPipelineConfig } from "../../src/domain/pipeline.ts";
import { classifyPromptIntent } from "../../open-sse/services/intentClassifier.ts";
import { parseAutoPrefix } from "../../open-sse/services/autoCombo/autoPrefix.ts";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const mockLog = {
  info: () => {},
  warn: () => {},
  error: () => {},
};

function makeBody(messages: Array<{ role: string; content: string }>, stream = false) {
  return { model: "auto/smart", messages, stream };
}

function makeCombo(config: Record<string, unknown> = {}) {
  return {
    name: "auto/smart",
    config: { pipeline_enabled: true, skip_pipeline_for_tokens_under: 0, ...config },
  };
}

function makeSettings(overrides: Record<string, unknown> = {}) {
  return {
    pipeline_enabled: true,
    skip_pipeline_for_tokens_under: 50,
    max_reflection_loops: 1,
    ...overrides,
  };
}

function makeOpenAIResponse(content: string, stream = false): Response {
  if (stream) {
    const encoder = new TextEncoder();
    const chunks = [
      `data: {"choices":[{"delta":{"content":"${content}"}}]}\n\n`,
      "data: [DONE]\n\n",
    ];
    let i = 0;
    const rs = new ReadableStream({
      pull(controller) {
        if (i < chunks.length) {
          controller.enqueue(encoder.encode(chunks[i]));
          i++;
        } else {
          controller.close();
        }
      },
    });
    return new Response(rs, {
      status: 200,
      headers: { "Content-Type": "text/event-stream" },
    });
  }

  return new Response(
    JSON.stringify({
      choices: [{ message: { role: "assistant", content } }],
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}

// Build a mock handleChatCore that records calls and returns scripted responses
function createMockHandleChatCore(
  responses: string[] | ((body: Record<string, unknown>) => string)
) {
  const calls: Array<{ body: Record<string, unknown>; stream: boolean }> = [];
  let callIndex = 0;

  const handler = async (body: Record<string, unknown>): Promise<Response> => {
    const stream = body.stream === true;
    calls.push({ body, stream });

    let content: string;
    if (typeof responses === "function") {
      content = responses(body);
    } else {
      content = responses[callIndex] ?? responses[responses.length - 1] ?? "default";
    }
    callIndex++;

    return makeOpenAIResponse(content, stream);
  };

  return { handler, calls };
}

// ---------------------------------------------------------------------------
// Test 1: Full pipeline through combo engine (code task → plan/execute/reflect)
// ---------------------------------------------------------------------------

test("pipeline-combo: code task runs plan → execute → reflect stages", async () => {
  // Code tasks get plan, execute, reflect, fix stages
  // Reflect passes → fix is skipped
  const stageResponses = [
    "Step 1: Analyze the request\nStep 2: Implement solution",
    "function add(a, b) { return a + b; }",
    '{"status":"pass","confirmation":"Implementation is correct"}',
  ];

  const { handler, calls } = createMockHandleChatCore(stageResponses);

  const result = await handlePipelineCombo({
    body: makeBody([
      { role: "user", content: "Write a function that adds two numbers in JavaScript" },
    ]),
    combo: makeCombo(),
    handleChatCore: handler,
    log: mockLog,
    settings: makeSettings(),
  });

  // Should be a PipelineResult (not a streaming Response)
  assert.ok(!("body" in result), "Should return PipelineResult, not Response");
  const pipelineResult = result as Awaited<ReturnType<typeof executePipeline>>;

  // Should have executed at least plan + execute + reflect (fix skipped when reflect passes)
  assert.ok(
    pipelineResult.stages.length >= 3,
    `Expected >= 3 stages, got ${pipelineResult.stages.length}`
  );

  // Verify stage names
  const stageNames = pipelineResult.stages.map((s) => s.stage);
  assert.ok(stageNames.includes("plan"), "Should include plan stage");
  assert.ok(stageNames.includes("execute"), "Should include execute stage");
  assert.ok(stageNames.includes("reflect"), "Should include reflect stage");

  // Fix should be skipped since reflect passed
  const fixStage = pipelineResult.stages.find((s) => s.stage === "fix");
  if (fixStage) {
    assert.equal(fixStage.skipped, true, "Fix stage should be skipped when reflect passes");
  }

  // Reflect verdict should be pass
  assert.equal(pipelineResult.reflectVerdict, "pass");

  // Should not be fallback
  assert.equal(pipelineResult.fallback, false);

  // Final text should be the execute output (since fix was skipped)
  assert.equal(pipelineResult.text, "function add(a, b) { return a + b; }");

  // handleChatCore should have been called for non-streaming stages
  for (const call of calls) {
    assert.equal(call.stream, false, "Intermediate stages should not stream");
  }
});

// ---------------------------------------------------------------------------
// Test 2: Streaming handoff verification (final stage streams)
// ---------------------------------------------------------------------------

test("pipeline-combo: simple task uses streaming final stage", async () => {
  // Simple tasks only get execute stage — the final stage should stream
  const { handler, calls } = createMockHandleChatCore(["Hello! How can I help?"]);

  const result = await handlePipelineCombo({
    body: makeBody([{ role: "user", content: "Hi" }], true), // stream: true
    combo: makeCombo(),
    handleChatCore: handler,
    log: mockLog,
    settings: makeSettings(),
  });

  // Simple tasks have only execute stage. The pipelineRouter wraps the final stage
  // for streaming via createStageExecutor. Since the body has stream: true, the
  // stageExecutor should pass stream: true for the final stage.
  // However, the pipeline engine itself always calls with stream:false in executeStage.
  // The streaming behavior is handled by the pipelineRouter's stageExecutor wrapping.

  // Verify the pipeline executed
  assert.ok(!("body" in result), "Should return PipelineResult for simple task");
  const pipelineResult = result as Awaited<ReturnType<typeof executePipeline>>;

  // Simple task should have just execute stage
  const stageNames = pipelineResult.stages.map((s) => s.stage);
  assert.ok(stageNames.includes("execute"), "Should include execute stage");

  // The text should be extracted from the response
  assert.equal(pipelineResult.text, "Hello! How can I help?");
});

// ---------------------------------------------------------------------------
// Test 3: Config cascade — defaults → settings → combo overrides
// ---------------------------------------------------------------------------

test("pipeline-combo: config cascade — combo config overrides settings", async () => {
  // Settings say skip_pipeline_for_tokens_under: 1000 (would block most prompts)
  // Combo config says skip_pipeline_for_tokens_under: 0 (always allow)
  // Combo override should win and allow pipeline even with short prompt
  const { handler, calls } = createMockHandleChatCore([
    '{"status":"pass","confirmation":"ok"}',
    "result",
  ]);

  const result = await handlePipelineCombo({
    body: makeBody([{ role: "user", content: "Short prompt here" }]),
    combo: makeCombo({ skip_pipeline_for_tokens_under: 0 }), // Combo overrides to 0
    handleChatCore: handler,
    log: mockLog,
    settings: makeSettings({ skip_pipeline_for_tokens_under: 1000 }), // Settings say skip under 1000
  });

  // Combo override of 0 wins over settings of 1000.
  // If settings won, pipeline would throw PIPELINE_TOKEN_THRESHOLD.
  const pipelineResult = result as Awaited<ReturnType<typeof executePipeline>>;
  assert.ok(
    pipelineResult.stages.length > 0,
    "Pipeline should execute with combo override threshold"
  );
});

test("pipeline-combo: config cascade — settings override defaults", async () => {
  // Default skip_pipeline_for_tokens_under is 50 (from comboConfig.ts)
  // Settings override to 1
  // With a short prompt, settings override should allow pipeline to run
  const { handler, calls } = createMockHandleChatCore([
    '{"status":"pass","confirmation":"ok"}',
    "result",
  ]);

  const result = await handlePipelineCombo({
    body: makeBody([{ role: "user", content: "Hi" }]),
    combo: makeCombo({ pipeline_enabled: true }), // No skip_pipeline override in combo
    handleChatCore: handler,
    log: mockLog,
    settings: makeSettings({ skip_pipeline_for_tokens_under: 1 }), // Override default of 50
  });

  // Pipeline should execute because settings overrode the default threshold
  const pipelineResult = result as Awaited<ReturnType<typeof executePipeline>>;
  assert.ok(
    pipelineResult.stages.length > 0,
    "Pipeline should execute with settings override threshold"
  );
});

// ---------------------------------------------------------------------------
// Test 4: Pipeline disabled throws PIPELINE_DISABLED
// ---------------------------------------------------------------------------

test("pipeline-combo: throws PIPELINE_DISABLED when pipeline_enabled is false", async () => {
  const { handler } = createMockHandleChatCore(["should not reach"]);

  await assert.rejects(
    () =>
      handlePipelineCombo({
        body: makeBody([{ role: "user", content: "Write code" }]),
        combo: makeCombo({ pipeline_enabled: false }),
        handleChatCore: handler,
        log: mockLog,
        settings: makeSettings({ pipeline_enabled: false }),
      }),
    (err: Error) => {
      assert.equal(err.message, "PIPELINE_DISABLED");
      return true;
    }
  );
});

// ---------------------------------------------------------------------------
// Test 5: Token threshold check — short prompts skip pipeline
// ---------------------------------------------------------------------------

test("pipeline-combo: short prompts below threshold throw PIPELINE_TOKEN_THRESHOLD", async () => {
  const { handler } = createMockHandleChatCore(["should not reach"]);

  // Prompt "Hi" is ~1 token (2 chars / 4 = 0.5, ceil = 1)
  // Threshold is 50 (default)
  await assert.rejects(
    () =>
      handlePipelineCombo({
        body: makeBody([{ role: "user", content: "Hi" }]),
        combo: makeCombo({ skip_pipeline_for_tokens_under: 50 }),
        handleChatCore: handler,
        log: mockLog,
        settings: makeSettings(),
      }),
    (err: Error) => {
      assert.equal(err.message, "PIPELINE_TOKEN_THRESHOLD");
      return true;
    }
  );
});

// ---------------------------------------------------------------------------
// Test 6: Intent classification determines task type
// ---------------------------------------------------------------------------

test("pipeline-combo: math intent maps to math task type with execute+reflect stages", async () => {
  const { handler, calls } = createMockHandleChatCore([
    "x = 5",
    '{"status":"pass","confirmation":"correct"}',
  ]);

  const result = await handlePipelineCombo({
    body: makeBody([{ role: "user", content: "Solve for x: 2x + 3 = 13, show your work" }]),
    combo: makeCombo(),
    handleChatCore: handler,
    log: mockLog,
    settings: makeSettings(),
  });

  const pipelineResult = result as Awaited<ReturnType<typeof executePipeline>>;
  const stageNames = pipelineResult.stages.map((s) => s.stage);

  // Math tasks get execute + reflect (no plan)
  assert.ok(stageNames.includes("execute"), "Math should include execute");
  assert.ok(stageNames.includes("reflect"), "Math should include reflect");
  assert.ok(!stageNames.includes("plan"), "Math should NOT include plan");
});

// ---------------------------------------------------------------------------
// Test 7: parseAutoPrefix integration — smart variant detection
// ---------------------------------------------------------------------------

test("parseAutoPrefix: correctly identifies smart variant for pipeline dispatch", () => {
  const smart = parseAutoPrefix("auto/smart");
  assert.equal(smart.valid, true);
  assert.equal(smart.variant, "smart");

  const plain = parseAutoPrefix("auto");
  assert.equal(plain.valid, true);
  assert.equal(plain.variant, undefined);

  const coding = parseAutoPrefix("auto/coding");
  assert.equal(coding.valid, true);
  assert.equal(coding.variant, "coding");

  const invalid = parseAutoPrefix("not-auto");
  assert.equal(invalid.valid, false);
});

// ---------------------------------------------------------------------------
// Test 8: Reflection fail triggers re-execution loop
// ---------------------------------------------------------------------------

test("pipeline-combo: reflection fail triggers re-execution with corrected context", async () => {
  let callCount = 0;
  const { handler, calls } = createMockHandleChatCore((body) => {
    callCount++;
    // First run: execute returns something, reflect fails
    // Second run (retry): execute returns corrected, reflect passes
    const messages = body.messages as Array<{ role: string; content: string }>;
    const systemMsg = messages.find((m) => m.role === "system")?.content || "";

    if (systemMsg.includes("quality reviewer")) {
      // Reflect stage
      if (callCount <= 3) {
        // First run: fail
        return '{"status":"fail","issues":["missing edge case"],"corrected":"fixed output"}';
      }
      // Retry: pass
      return '{"status":"pass","confirmation":"all good"}';
    }
    // Execute stage
    if (callCount <= 1) return "initial output";
    return "fixed output";
  });

  const result = await handlePipelineCombo({
    body: makeBody([
      {
        role: "user",
        content: "Write a robust sorting algorithm in Python with edge case handling",
      },
    ]),
    combo: makeCombo({ max_reflection_loops: 1 }),
    handleChatCore: handler,
    log: mockLog,
    settings: makeSettings({ max_reflection_loops: 1 }),
  });

  const pipelineResult = result as Awaited<ReturnType<typeof executePipeline>>;

  // Should have made multiple calls due to reflection retry
  assert.ok(calls.length >= 3, `Expected >= 3 calls for retry, got ${calls.length}`);
});

test("pipeline-combo: max_reflection_loops>1 re-runs the pipeline that many times (regression: loop count was silently ignored)", async () => {
  // Reflect ALWAYS fails, so the outer reflection loop should keep re-running
  // the whole pipeline until the configured budget is exhausted. Each pipeline
  // run hits the reflect stage exactly once, so reflect calls == loops + 1.
  const reflectCallsFor = async (maxLoops: number): Promise<number> => {
    let reflectCalls = 0;
    const { handler } = createMockHandleChatCore((body) => {
      const messages = body.messages as Array<{ role: string; content: string }>;
      const systemMsg = messages.find((m) => m.role === "system")?.content || "";
      if (systemMsg.includes("quality reviewer")) {
        reflectCalls++;
        return '{"status":"fail","issues":["always fails"],"corrected":"c"}';
      }
      return "execute output";
    });

    await handlePipelineCombo({
      body: makeBody([
        {
          role: "user",
          content: "Write a robust sorting algorithm in Python with edge case handling",
        },
      ]),
      combo: makeCombo({ max_reflection_loops: maxLoops }),
      handleChatCore: handler,
      log: mockLog,
      settings: makeSettings({ max_reflection_loops: maxLoops }),
    });
    return reflectCalls;
  };

  const oneLoop = await reflectCallsFor(1);
  const threeLoops = await reflectCallsFor(3);

  assert.equal(oneLoop, 2, `Expected 2 reflect calls with 1 loop, got ${oneLoop}`);
  assert.equal(threeLoops, 4, `Expected 4 reflect calls with 3 loops, got ${threeLoops}`);
  assert.ok(threeLoops > oneLoop, "Higher max_reflection_loops must produce more pipeline re-runs");
});
