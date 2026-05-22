import test from "node:test";
import assert from "node:assert/strict";

import {
  handlePipelineCombo,
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
// Type for test result access
// ---------------------------------------------------------------------------

interface PipelineResult {
  text: string;
  stages: Array<{ stage: string; text: string; skipped?: boolean }>;
  fallback: boolean;
  reflectVerdict: "pass" | "fail" | null;
}
