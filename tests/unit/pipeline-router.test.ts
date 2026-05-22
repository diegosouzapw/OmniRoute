import test from "node:test";
import assert from "node:assert/strict";

import {
  handlePipelineCombo,
  buildPipelineResponse,
  FITNESS_TIERS,
} from "../../open-sse/services/autoCombo/pipelineRouter.ts";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeLogger() {
  const msgs: string[] = [];
  return {
    info: (...args: unknown[]) => msgs.push(args.map(String).join(" ")),
    warn: (...args: unknown[]) => msgs.push(args.map(String).join(" ")),
    error: (...args: unknown[]) => msgs.push(args.map(String).join(" ")),
    msgs,
  };
}

function makeBody(messages: Array<{ role: string; content: string }>, stream = false) {
  return { messages, model: "gpt-4o", stream };
}

function makeCombo(overrides: Record<string, unknown> = {}) {
  return {
    name: "test-combo",
    models: ["gpt-4o"],
    strategy: "priority",
    config: {
      pipeline_enabled: true,
      ...overrides,
    },
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

// A handleChatCore that returns a fake OpenAI-style response
function makeHandleChatCore(responseText = "test response", status = 200) {
  return async (body: Record<string, unknown>) => {
    if (body.stream) {
      // Return a fake streaming response
      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        start(controller) {
          const chunk = `data: ${JSON.stringify({
            choices: [{ delta: { content: responseText }, index: 0 }],
          })}\n\ndata: [DONE]\n`;
          controller.enqueue(encoder.encode(chunk));
          controller.close();
        },
      });
      return new Response(stream, { status, headers: { "content-type": "text/event-stream" } });
    }
    // Non-streaming: return buffered JSON
    return new Response(
      JSON.stringify({
        choices: [{ message: { role: "assistant", content: responseText }, index: 0 }],
      }),
      { status, headers: { "content-type": "application/json" } }
    );
  };
}

// ---------------------------------------------------------------------------
// FITNESS_TIERS tests
// ---------------------------------------------------------------------------

test("FITNESS_TIERS has best-reasoning, cheapest, moderate tiers", () => {
  assert.ok(FITNESS_TIERS["best-reasoning"]);
  assert.ok(FITNESS_TIERS.cheapest);
  assert.ok(FITNESS_TIERS.moderate);
  assert.equal(FITNESS_TIERS["best-reasoning"].minFitness, 0.85);
  assert.equal(FITNESS_TIERS.cheapest.maxFitness, 0.75);
  assert.equal(FITNESS_TIERS.moderate.minFitness, 0.6);
  assert.equal(FITNESS_TIERS.moderate.maxFitness, 0.9);
});

// ---------------------------------------------------------------------------
// pipeline_enabled: false disables pipeline
// ---------------------------------------------------------------------------

test("handlePipelineCombo throws PIPELINE_DISABLED when combo pipeline_enabled is false", async () => {
  const log = makeLogger();
  const body = makeBody([{ role: "user", content: "Write a function to sort an array" }]);
  const combo = makeCombo({ pipeline_enabled: false });
  const settings = makeSettings();

  await assert.rejects(
    () =>
      handlePipelineCombo({
        body,
        combo,
        handleChatCore: makeHandleChatCore(),
        log,
        settings,
      }),
    { message: "PIPELINE_DISABLED" }
  );
});

test("handlePipelineCombo throws PIPELINE_DISABLED when settings pipeline_enabled is false", async () => {
  const log = makeLogger();
  const body = makeBody([{ role: "user", content: "Write a function to sort an array" }]);
  // Combo without pipeline_enabled so settings controls the behavior
  const combo = { name: "test-combo", models: ["gpt-4o"], strategy: "priority", config: {} };
  const settings = makeSettings({ pipeline_enabled: false }); // settings disables it

  await assert.rejects(
    () =>
      handlePipelineCombo({
        body,
        combo,
        handleChatCore: makeHandleChatCore(),
        log,
        settings,
      }),
    { message: "PIPELINE_DISABLED" }
  );
});

// ---------------------------------------------------------------------------
// Token threshold skip
// ---------------------------------------------------------------------------

test("handlePipelineCombo throws PIPELINE_TOKEN_THRESHOLD for short prompts", async () => {
  const log = makeLogger();
  // "hi" = ~1 token, well under threshold of 50
  const body = makeBody([{ role: "user", content: "hi" }]);
  const combo = makeCombo();
  const settings = makeSettings({ skip_pipeline_for_tokens_under: 50 });

  await assert.rejects(
    () =>
      handlePipelineCombo({
        body,
        combo,
        handleChatCore: makeHandleChatCore(),
        log,
        settings,
      }),
    { message: "PIPELINE_TOKEN_THRESHOLD" }
  );
});

// ---------------------------------------------------------------------------
// Pipeline triggers for code intent
// ---------------------------------------------------------------------------

test("handlePipelineCombo triggers pipeline for code prompts", async () => {
  const log = makeLogger();
  // Long enough to pass token threshold (~200 chars ≈ 50 tokens)
  const longCodePrompt =
    "Write a function to sort an array using quicksort algorithm in TypeScript with proper type annotations and error handling for edge cases including empty arrays null values and duplicate elements with comprehensive JSDoc documentation";
  const body = makeBody([{ role: "user", content: longCodePrompt }]);
  const combo = makeCombo();
  const settings = makeSettings();

  const result = await handlePipelineCombo({
    body,
    combo,
    handleChatCore: makeHandleChatCore("function quicksort() {}"),
    log,
    settings,
  });

  // Should return a PipelineResult (not a Response)
  assert.ok(result !== null);
  assert.ok("text" in result, "Result should have a text field");
  assert.ok("stages" in result, "Result should have a stages field");
  assert.ok("fallback" in result, "Result should have a fallback field");
  assert.ok("reflectVerdict" in result, "Result should have a reflectVerdict field");
  assert.ok(Array.isArray((result as Record<string, unknown>).stages));
});

// ---------------------------------------------------------------------------
// stageExecutor streaming behavior
// ---------------------------------------------------------------------------

test("handlePipelineCombo final stage streams when body.stream is true", async () => {
  const log = makeLogger();
  const longPrompt =
    "Explain the theory of relativity in detail with mathematical proofs and step by step derivation of the equations involved in special relativity including Lorentz transformations time dilation and length contraction with comprehensive examples";
  const body = makeBody(
    [{ role: "user", content: longPrompt }],
    true // stream = true
  );
  const combo = makeCombo();
  const settings = makeSettings();

  const result = await handlePipelineCombo({
    body,
    combo,
    handleChatCore: makeHandleChatCore("relativity explanation"),
    log,
    settings,
  });

  // Result should either be a PipelineResult or a Response
  // For simple/medium intents with single execute stage, it returns PipelineResult
  // because the pipeline engine buffers internally
  assert.ok(result !== null);
});

// ---------------------------------------------------------------------------
// Intent classification integration
// ---------------------------------------------------------------------------

test("handlePipelineCombo classifies reasoning prompts correctly", async () => {
  const log = makeLogger();
  const longReasoningPrompt =
    "Prove the convergence of this series step by step using mathematical induction and formal logic derivation for the given theorem including all edge cases and boundary conditions with detailed explanations";
  const body = makeBody([{ role: "user", content: longReasoningPrompt }]);
  const combo = makeCombo();
  const settings = makeSettings();

  const result = await handlePipelineCombo({
    body,
    combo,
    handleChatCore: makeHandleChatCore("proof output"),
    log,
    settings,
  });

  assert.ok(result);
  assert.ok("stages" in result);
  // Reasoning task gets ["execute", "reflect"] stages
  const stages = (result as PipelineResult).stages;
  assert.ok(stages.length >= 1, "Should have at least execute stage");
});

// ---------------------------------------------------------------------------
// combo.models normalization — entries are model-config OBJECTS, not strings.
// (release/v3.8.2 review, finding B: the old `as string[]` cast passed raw
// objects to getTaskFitness, so stages always resolved to the default model.)
// ---------------------------------------------------------------------------

test("handlePipelineCombo resolves stage models from object-form combo.models", async () => {
  const log = makeLogger();
  const longCodePrompt =
    "Write a function to sort an array using quicksort algorithm in TypeScript with proper type annotations and error handling for edge cases including empty arrays null values and duplicate elements with comprehensive JSDoc documentation";
  const body = makeBody([{ role: "user", content: longCodePrompt }]);
  // Real combos store entries as objects with a `.model` field, not bare strings.
  const combo = {
    name: "test-combo",
    models: [
      { model: "gpt-4o", priority: 1 },
      { model: "deepseek-reasoner", priority: 2 },
    ],
    strategy: "priority",
    config: { pipeline_enabled: true },
  };
  const settings = makeSettings();

  const seenModels: unknown[] = [];
  const recordingHandleChatCore = async (_b: Record<string, unknown>, modelStr?: string) => {
    seenModels.push(modelStr);
    return new Response(
      JSON.stringify({
        choices: [{ message: { role: "assistant", content: "ok" }, index: 0 }],
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  await handlePipelineCombo({
    body,
    combo,
    handleChatCore: recordingHandleChatCore,
    log,
    settings,
  });

  const comboNames = new Set(["gpt-4o", "deepseek-reasoner"]);
  const resolved = seenModels.filter((m) => m !== undefined);
  assert.ok(resolved.length > 0, "at least one stage should resolve a model from the combo pool");
  for (const m of resolved) {
    assert.equal(typeof m, "string", "stage model must be a string, not a raw config object");
    assert.ok(
      comboNames.has(m as string),
      `resolved model "${String(m)}" should come from the combo pool, not the default fallback`
    );
  }
});

// ---------------------------------------------------------------------------
// buildPipelineResponse — adapts a PipelineResult into an HTTP Response
// (release/v3.8.2 review, finding C-1: callers expect a Response, not a
// PipelineResult; before the fix the buffered pipeline text was silently lost)
// ---------------------------------------------------------------------------

function makePipelineResult(text: string): PipelineResult {
  return {
    text,
    stages: [{ stage: "execute", text }],
    fallback: false,
    reflectVerdict: "pass",
  };
}

test("buildPipelineResponse: non-streaming → OpenAI chat.completion JSON with text", async () => {
  const res = buildPipelineResponse(makePipelineResult("hello from pipeline") as never, {
    model: "auto/smart",
    stream: false,
  });
  assert.ok(res instanceof Response);
  assert.equal(res.status, 200);
  assert.match(res.headers.get("content-type") ?? "", /application\/json/);
  const json = (await res.json()) as {
    object: string;
    model: string;
    choices: Array<{ message: { role: string; content: string }; finish_reason: string }>;
  };
  assert.equal(json.object, "chat.completion");
  assert.equal(json.model, "auto/smart");
  assert.equal(json.choices[0].message.role, "assistant");
  assert.equal(json.choices[0].message.content, "hello from pipeline");
  assert.equal(json.choices[0].finish_reason, "stop");
});

test("buildPipelineResponse: streaming → SSE chunks carrying the text + [DONE]", async () => {
  const res = buildPipelineResponse(makePipelineResult("streamed output") as never, {
    model: "auto/smart",
    stream: true,
  });
  assert.ok(res instanceof Response);
  assert.match(res.headers.get("content-type") ?? "", /text\/event-stream/);
  const body = await res.text();
  assert.match(body, /"object":"chat\.completion\.chunk"/);
  assert.match(body, /streamed output/);
  assert.match(body, /"finish_reason":"stop"/);
  assert.match(body, /data: \[DONE\]/);
});

test("buildPipelineResponse: defaults model to 'auto' when body has none", async () => {
  const res = buildPipelineResponse(makePipelineResult("x") as never, {});
  const json = (await res.json()) as { model: string };
  assert.equal(json.model, "auto");
});

// ---------------------------------------------------------------------------
// Type for test result access
// ---------------------------------------------------------------------------

interface PipelineResult {
  text: string;
  stages: Array<{ stage: string; text: string; skipped?: boolean }>;
  fallback: boolean;
  reflectVerdict: "pass" | "fail" | null;
}
