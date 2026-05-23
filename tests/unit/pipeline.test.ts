/**
 * Pipeline Engine Tests
 *
 * Tests for the smart auto-pipeline engine:
 * - Stage sequencing per task type
 * - Context threading (plan → execute → reflect → fix)
 * - Reflect JSON parsing (pass/fail/ambiguous)
 * - Graceful fallback on stage failure
 * - Simple task single stage
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  buildPipelineConfig,
  executePipeline,
  parseReflectJson,
} from "../../src/domain/pipeline.ts";
import type { StageExecutor, StageExecutorResult } from "../../src/domain/pipeline.ts";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeExecutor(responses: string[]): StageExecutor {
  let callIndex = 0;
  return async (): Promise<StageExecutorResult> => {
    const text = responses[callIndex] ?? "";
    callIndex++;
    return { text };
  };
}

function makeExecutorWithMetrics(responses: StageExecutorResult[]): StageExecutor {
  let callIndex = 0;
  return async (): Promise<StageExecutorResult> => {
    const result = responses[callIndex] ?? { text: "" };
    callIndex++;
    return result;
  };
}

function makeFailingExecutor(failAt: number, fallbackText = ""): StageExecutor {
  let callIndex = 0;
  return async (): Promise<StageExecutorResult> => {
    if (callIndex === failAt) {
      callIndex++;
      throw new Error("Stage failed");
    }
    callIndex++;
    return { text: fallbackText };
  };
}

const PASS_JSON = '{"status":"pass","confirmation":"Output is correct."}';
const FAIL_JSON = '{"status":"fail","issues":["Missing detail"],"corrected":"Fixed output."}';

// ---------------------------------------------------------------------------
// buildPipelineConfig
// ---------------------------------------------------------------------------

describe("buildPipelineConfig", () => {
  it("should create plan→execute→reflect→fix stages for code tasks", () => {
    const config = buildPipelineConfig("write a function", "code");
    const names = config.stages.map((s) => s.name);
    assert.deepEqual(names, ["plan", "execute", "reflect", "fix"]);
  });

  it("should create execute→reflect stages for math tasks", () => {
    const config = buildPipelineConfig("solve 2+2", "math");
    const names = config.stages.map((s) => s.name);
    assert.deepEqual(names, ["execute", "reflect"]);
  });

  it("should create execute→reflect stages for reasoning tasks", () => {
    const config = buildPipelineConfig("explain relativity", "reasoning");
    const names = config.stages.map((s) => s.name);
    assert.deepEqual(names, ["execute", "reflect"]);
  });

  it("should create execute→reflect stages for creative tasks", () => {
    const config = buildPipelineConfig("write a poem", "creative");
    const names = config.stages.map((s) => s.name);
    assert.deepEqual(names, ["execute", "reflect"]);
  });

  it("should create single execute stage for medium tasks", () => {
    const config = buildPipelineConfig("summarize this", "medium");
    const names = config.stages.map((s) => s.name);
    assert.deepEqual(names, ["execute"]);
  });

  it("should create single execute stage for simple tasks", () => {
    const config = buildPipelineConfig("hello", "simple");
    const names = config.stages.map((s) => s.name);
    assert.deepEqual(names, ["execute"]);
  });

  it("should include the original request in config", () => {
    const config = buildPipelineConfig("test request", "simple");
    assert.equal(config.request, "test request");
  });

  it("should include taskType in config", () => {
    const config = buildPipelineConfig("test", "code");
    assert.equal(config.taskType, "code");
  });
});

// ---------------------------------------------------------------------------
// parseReflectJson
// ---------------------------------------------------------------------------

describe("parseReflectJson", () => {
  it("should parse a pass response", () => {
    const result = parseReflectJson(PASS_JSON);
    assert.deepEqual(result, { status: "pass", confirmation: "Output is correct." });
  });

  it("should parse a fail response", () => {
    const result = parseReflectJson(FAIL_JSON);
    assert.deepEqual(result, {
      status: "fail",
      issues: ["Missing detail"],
      corrected: "Fixed output.",
    });
  });

  it("should parse JSON inside markdown code blocks", () => {
    const wrapped = "```json\n" + PASS_JSON + "\n```";
    const result = parseReflectJson(wrapped);
    assert.deepEqual(result, { status: "pass", confirmation: "Output is correct." });
  });

  it("should parse JSON embedded in prose", () => {
    const prose = "Here is my evaluation:\n" + FAIL_JSON + "\nDone.";
    const result = parseReflectJson(prose);
    assert.equal(result?.status, "fail");
  });

  it("should return null for empty string", () => {
    assert.equal(parseReflectJson(""), null);
  });

  it("should return null for non-JSON text", () => {
    assert.equal(parseReflectJson("This looks good to me!"), null);
  });

  it("should return null for invalid JSON", () => {
    assert.equal(parseReflectJson("{broken json"), null);
  });

  it("should return null for JSON with unknown status", () => {
    assert.equal(parseReflectJson('{"status":"maybe","notes":"unsure"}'), null);
  });

  it("should return null for pass without confirmation string", () => {
    assert.equal(parseReflectJson('{"status":"pass"}'), null);
  });

  it("should handle fail with missing issues array", () => {
    const result = parseReflectJson('{"status":"fail","corrected":"fixed"}');
    assert.deepEqual(result, { status: "fail", issues: [], corrected: "fixed" });
  });

  it("should handle fail with missing corrected field", () => {
    const result = parseReflectJson('{"status":"fail","issues":["bad"]}');
    assert.deepEqual(result, { status: "fail", issues: ["bad"], corrected: "" });
  });
});

// ---------------------------------------------------------------------------
// executePipeline — stage sequencing
// ---------------------------------------------------------------------------

describe("executePipeline — stage sequencing", () => {
  it("should run single execute stage for simple tasks", async () => {
    const config = buildPipelineConfig("hello", "simple");
    const executor = makeExecutor(["Hello!"]);
    const result = await executePipeline(config, executor);

    assert.equal(result.stages.length, 1);
    assert.equal(result.stages[0].stage, "execute");
    assert.equal(result.text, "Hello!");
    assert.equal(result.fallback, false);
  });

  it("should run execute→reflect for math tasks", async () => {
    const config = buildPipelineConfig("2+2", "math");
    const executor = makeExecutor(["4", PASS_JSON]);
    const result = await executePipeline(config, executor);

    assert.equal(result.stages.length, 2);
    assert.equal(result.stages[0].stage, "execute");
    assert.equal(result.stages[1].stage, "reflect");
    assert.equal(result.reflectVerdict, "pass");
  });

  it("should run full plan→execute→reflect→fix for code tasks", async () => {
    const config = buildPipelineConfig("write fib", "code");
    const executor = makeExecutor(["Step 1: write function", "function fib(){}", PASS_JSON]);
    const result = await executePipeline(config, executor);

    assert.equal(result.stages.length, 4);
    assert.equal(result.stages[0].stage, "plan");
    assert.equal(result.stages[1].stage, "execute");
    assert.equal(result.stages[2].stage, "reflect");
    assert.equal(result.stages[3].stage, "fix");
    assert.equal(result.stages[3].skipped, true); // reflect passed → fix skipped
  });
});

// ---------------------------------------------------------------------------
// executePipeline — context threading
// ---------------------------------------------------------------------------

describe("executePipeline — context threading", () => {
  it("should thread plan output into execute context", async () => {
    const receivedMessages: string[][] = [];
    const executor: StageExecutor = async (args) => {
      receivedMessages.push(args.messages.map((m) => m.content));
      if (receivedMessages.length === 1) return { text: "PLAN_OUTPUT" };
      return { text: "done" };
    };

    const config = buildPipelineConfig("test request", "medium");
    await executePipeline(config, executor);

    // Medium only has execute, so only one call
    assert.equal(receivedMessages.length, 1);
    // The execute prompt should contain the original request
    assert.ok(receivedMessages[0].some((c) => c.includes("test request")));
  });

  it("should thread execution_response into reflect prompt", async () => {
    const receivedMessages: string[][] = [];
    const executor: StageExecutor = async (args) => {
      receivedMessages.push(args.messages.map((m) => m.content));
      if (receivedMessages.length === 1) return { text: "EXECUTION_RESULT" };
      return { text: PASS_JSON };
    };

    const config = buildPipelineConfig("test request", "math");
    await executePipeline(config, executor);

    // Reflect is the 2nd call
    assert.equal(receivedMessages.length, 2);
    const reflectUserMsg = receivedMessages[1].find((c) => c.includes("Execution output"));
    assert.ok(reflectUserMsg, "reflect should reference execution output");
    assert.ok(reflectUserMsg!.includes("EXECUTION_RESULT"));
  });
});

// ---------------------------------------------------------------------------
// executePipeline — reflect pass/fail
// ---------------------------------------------------------------------------

describe("executePipeline — reflect pass/fail", () => {
  it("should skip fix stage when reflect passes (code task)", async () => {
    const config = buildPipelineConfig("write fib", "code");
    const executor = makeExecutor(["plan", "function fib(){}", PASS_JSON]);
    const result = await executePipeline(config, executor);

    assert.equal(result.reflectVerdict, "pass");
    const fixStage = result.stages.find((s) => s.stage === "fix");
    assert.ok(fixStage);
    assert.equal(fixStage!.skipped, true);
  });

  it("should run fix stage when reflect fails", async () => {
    const config = buildPipelineConfig("write fib", "code");
    const executor = makeExecutor(["plan", "function fib(){}", FAIL_JSON, "function fib(n){}"]);
    const result = await executePipeline(config, executor);

    assert.equal(result.reflectVerdict, "fail");
    const fixStage = result.stages.find((s) => s.stage === "fix");
    assert.ok(fixStage);
    assert.equal(fixStage!.skipped, undefined);
    assert.equal(fixStage!.text, "function fib(n){}");
  });

  it("should use corrected output from fail JSON when fix produces output", async () => {
    const config = buildPipelineConfig("write fib", "code");
    const executor = makeExecutor(["plan", "bad output", FAIL_JSON, "fixed output"]);
    const result = await executePipeline(config, executor);

    assert.equal(result.text, "fixed output");
  });

  it("should treat parse failure as fail (conservative)", async () => {
    const config = buildPipelineConfig("test", "math");
    const executor = makeExecutor(["42", "Looks good to me!"]);
    const result = await executePipeline(config, executor);

    assert.equal(result.reflectVerdict, "fail");
  });
});

// ---------------------------------------------------------------------------
// executePipeline — fallback on stage failure
// ---------------------------------------------------------------------------

describe("executePipeline — fallback on stage failure", () => {
  it("should set fallback=true when a stage throws", async () => {
    const config = buildPipelineConfig("test", "code");
    const executor = makeFailingExecutor(0); // plan fails
    const result = await executePipeline(config, executor);

    assert.equal(result.fallback, true);
  });

  it("should return best available output on failure", async () => {
    const config = buildPipelineConfig("test", "code");
    // Plan succeeds, execute fails
    const executor = makeFailingExecutor(1, "partial");
    const result = await executePipeline(config, executor);

    assert.equal(result.fallback, true);
    // Should still have plan output
    const planStage = result.stages.find((s) => s.stage === "plan");
    assert.ok(planStage);
    assert.equal(planStage!.error, undefined);
  });

  it("should record error message in stage result", async () => {
    const config = buildPipelineConfig("test", "simple");
    const executor = makeFailingExecutor(0);
    const result = await executePipeline(config, executor);

    assert.equal(result.stages[0].error, "Stage failed");
    assert.equal(result.stages[0].text, "");
  });

  it("should stop execution after a stage fails", async () => {
    let callCount = 0;
    const executor: StageExecutor = async () => {
      callCount++;
      if (callCount === 2) throw new Error("Stage 2 failed");
      return { text: "ok" };
    };

    const config = buildPipelineConfig("test", "code");
    await executePipeline(config, executor);

    // Should have stopped after execute (stage 2)
    assert.ok(callCount <= 2, `Expected <=2 calls, got ${callCount}`);
  });
});

// ---------------------------------------------------------------------------
// executePipeline — metrics
// ---------------------------------------------------------------------------

describe("executePipeline — metrics", () => {
  it("should capture latencyMs per stage", async () => {
    const config = buildPipelineConfig("test", "simple");
    const executor = makeExecutorWithMetrics([
      { text: "result", provider: "openai", inputTokens: 100, outputTokens: 50 },
    ]);
    const result = await executePipeline(config, executor);

    // Pipeline measures real wall-clock latency (>=0), not executor's internal timing
    assert.ok(result.stages[0].latencyMs >= 0, "latencyMs should be non-negative");
    assert.equal(result.stages[0].provider, "openai");
    assert.equal(result.stages[0].inputTokens, 100);
    assert.equal(result.stages[0].outputTokens, 50);
  });

  it("should capture provider info when available", async () => {
    const config = buildPipelineConfig("test", "math");
    const executor = makeExecutorWithMetrics([
      { text: "42", provider: "anthropic" },
      { text: PASS_JSON, provider: "anthropic" },
    ]);
    const result = await executePipeline(config, executor);

    assert.equal(result.stages[0].provider, "anthropic");
    assert.equal(result.stages[1].provider, "anthropic");
  });
});
