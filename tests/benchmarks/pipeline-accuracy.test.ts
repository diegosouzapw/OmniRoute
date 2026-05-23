/**
 * Pipeline Benchmark — Direct Pipeline Execution
 *
 * Tests Smart Auto Pipeline accuracy and cost by calling executePipeline() directly
 * with DeepSeek API as the stage executor. Bypasses combo routing overhead.
 *
 * Measures: accuracy, token usage, latency, cost — baseline (single call) vs pipeline
 */

import {
  buildPipelineConfig,
  executePipeline,
  type StageExecutor,
  type StageExecutorResult,
  type FitnessTier,
} from "../../src/domain/pipeline.ts";

const API_KEY = process.env.DEEPSEEK_API_KEY;
const BASE_URL = "https://api.deepseek.com/v1";
const MODEL = "deepseek-chat";

const COST_INPUT_PER_M = 0.14;
const COST_OUTPUT_PER_M = 0.28;

// ---------------------------------------------------------------------------
// Test cases
// ---------------------------------------------------------------------------

const MATH_PROBLEMS = [
  { q: "What is 17 * 23?", expected: "391" },
  { q: "Solve for x: 2x + 5 = 13", expected: "4" },
  { q: "What is the derivative of x^3 + 2x?", expected: "3x^2 + 2" },
  { q: "What is the integral of 2x dx?", expected: "x^2" },
  { q: "If a triangle has sides 3, 4, 5, what is its area?", expected: "6" },
];

const CODING_PROBLEMS = [
  {
    q: "Write a JavaScript function that returns the factorial of n.",
    check: (r: string) =>
      /function\s+\w*factorial|factorial\s*=|const\s+factorial/i.test(r) &&
      /return|n\s*\*/i.test(r),
  },
  {
    q: "Write a Python function that checks if a string is a palindrome.",
    check: (r: string) => /def\s+\w*pali|pali.*def/i.test(r) && /return|==/i.test(r),
  },
  {
    q: "Write a TypeScript function that reverses an array without mutating it.",
    check: (r: string) => /reverse|slice|spread|\.\.\./i.test(r),
  },
  {
    q: "Write a SQL query to find the second highest salary from an employees table.",
    check: (r: string) =>
      /SELECT|select/i.test(r) && /salary|LIMIT|OFFSET|DENSE_RANK|ROW_NUMBER/i.test(r),
  },
  {
    q: "Write a bash one-liner to count the number of lines in all .ts files recursively.",
    check: (r: string) => /find|grep|wc|cat/i.test(r) && /-l|lines|count/i.test(r),
  },
];

// ---------------------------------------------------------------------------
// API call helper
// ---------------------------------------------------------------------------

interface CallResult {
  text: string;
  inputTokens: number;
  outputTokens: number;
  latencyMs: number;
}

async function callDeepSeek(
  messages: Array<{ role: string; content: string }>
): Promise<CallResult> {
  const start = Date.now();
  const res = await fetch(`${BASE_URL}/chat/completions`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${API_KEY}` },
    body: JSON.stringify({ model: MODEL, messages, stream: false }),
  });
  if (!res.ok) throw new Error(`DeepSeek error ${res.status}: ${await res.text()}`);
  const data = (await res.json()) as Record<string, unknown>;
  const usage = data.usage as Record<string, number> | undefined;
  const msg = (data.choices as Array<Record<string, unknown>>)?.[0]?.message as
    | Record<string, unknown>
    | undefined;
  return {
    text: (msg?.content as string) ?? "",
    inputTokens: usage?.prompt_tokens ?? 0,
    outputTokens: usage?.completion_tokens ?? 0,
    latencyMs: Date.now() - start,
  };
}

// ---------------------------------------------------------------------------
// Stage executor — calls DeepSeek directly
// ---------------------------------------------------------------------------

function makeDeepSeekExecutor(): StageExecutor {
  return async ({ messages }): Promise<StageExecutorResult> => {
    const result = await callDeepSeek(messages);
    return {
      text: result.text,
      inputTokens: result.inputTokens,
      outputTokens: result.outputTokens,
      provider: "deepseek",
    };
  };
}

// ---------------------------------------------------------------------------
// Benchmark runner
// ---------------------------------------------------------------------------

interface BenchResult {
  question: string;
  baselineText: string;
  pipelineText: string;
  baselineCorrect: boolean;
  pipelineCorrect: boolean;
  baselineTokens: { input: number; output: number };
  pipelineTokens: { input: number; output: number };
  baselineLatencyMs: number;
  pipelineLatencyMs: number;
  stagesExecuted: number;
}

async function runMathBenchmark(): Promise<BenchResult[]> {
  const results: BenchResult[] = [];
  const systemMsg = {
    role: "system",
    content: "You are a math expert. Answer concisely with just the final answer.",
  };

  for (const problem of MATH_PROBLEMS) {
    console.log(`  Math: ${problem.q}`);

    // Baseline: single call
    const baseline = await callDeepSeek([systemMsg, { role: "user", content: problem.q }]);

    // Pipeline: execute + reflect (math pipeline)
    const pipelineConfig = buildPipelineConfig(problem.q, "math");
    const pipelineStart = Date.now();
    const pipeline = await executePipeline(pipelineConfig, makeDeepSeekExecutor());

    results.push({
      question: problem.q,
      baselineText: baseline.text,
      pipelineText: pipeline.text,
      baselineCorrect: baseline.text.includes(problem.expected),
      pipelineCorrect: pipeline.text.includes(problem.expected),
      baselineTokens: { input: baseline.inputTokens, output: baseline.outputTokens },
      pipelineTokens: {
        input: pipeline.stages.reduce((s, r) => s + (r.inputTokens ?? 0), 0),
        output: pipeline.stages.reduce((s, r) => s + (r.outputTokens ?? 0), 0),
      },
      baselineLatencyMs: baseline.latencyMs,
      pipelineLatencyMs: Date.now() - pipelineStart,
      stagesExecuted: pipeline.stages.length,
    });
  }
  return results;
}

async function runCodingBenchmark(): Promise<BenchResult[]> {
  const results: BenchResult[] = [];
  const systemMsg = {
    role: "system",
    content: "You are an expert programmer. Write clean, working code.",
  };

  for (const problem of CODING_PROBLEMS) {
    console.log(`  Code: ${problem.q.slice(0, 60)}...`);

    // Baseline: single call
    const baseline = await callDeepSeek([systemMsg, { role: "user", content: problem.q }]);

    // Pipeline: plan + execute + reflect + fix (code pipeline)
    const pipelineConfig = buildPipelineConfig(problem.q, "code");
    const pipelineStart = Date.now();
    const pipeline = await executePipeline(pipelineConfig, makeDeepSeekExecutor());

    results.push({
      question: problem.q,
      baselineText: baseline.text,
      pipelineText: pipeline.text,
      baselineCorrect: problem.check(baseline.text),
      pipelineCorrect: problem.check(pipeline.text),
      baselineTokens: { input: baseline.inputTokens, output: baseline.outputTokens },
      pipelineTokens: {
        input: pipeline.stages.reduce((s, r) => s + (r.inputTokens ?? 0), 0),
        output: pipeline.stages.reduce((s, r) => s + (r.outputTokens ?? 0), 0),
      },
      baselineLatencyMs: baseline.latencyMs,
      pipelineLatencyMs: Date.now() - pipelineStart,
      stagesExecuted: pipeline.stages.length,
    });
  }
  return results;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  if (!API_KEY) {
    console.error("DEEPSEEK_API_KEY not set");
    process.exit(1);
  }

  console.log("=== Smart Auto Pipeline Benchmark (Direct Execution) ===\n");
  console.log(`Provider: ${MODEL} via ${BASE_URL}`);
  console.log(`Pipeline stages: math=[execute→reflect], code=[plan→execute→reflect→fix]\n`);

  console.log("--- Math Problems ---");
  const mathResults = await runMathBenchmark();

  console.log("\n--- Coding Problems ---");
  const codingResults = await runCodingBenchmark();

  const allResults = [...mathResults, ...codingResults];

  // Print details
  console.log("\n=== Detailed Results ===\n");
  for (const r of allResults) {
    const type = mathResults.includes(r) ? "MATH" : "CODE";
    console.log(`[${type}] ${r.question.slice(0, 55)}...`);
    console.log(
      `  Baseline: ${r.baselineCorrect ? "CORRECT" : "WRONG"} | ${r.baselineTokens.input + r.baselineTokens.output} tok | ${r.baselineLatencyMs}ms`
    );
    console.log(
      `  Pipeline: ${r.pipelineCorrect ? "CORRECT" : "WRONG"} | ${r.pipelineTokens.input + r.pipelineTokens.output} tok | ${r.pipelineLatencyMs}ms | ${r.stagesExecuted} stages`
    );
  }

  // Aggregates
  const mathBC = mathResults.filter((r) => r.baselineCorrect).length;
  const mathPC = mathResults.filter((r) => r.pipelineCorrect).length;
  const codeBC = codingResults.filter((r) => r.baselineCorrect).length;
  const codePC = codingResults.filter((r) => r.pipelineCorrect).length;

  const bTokens = allResults.reduce(
    (s, r) => s + r.baselineTokens.input + r.baselineTokens.output,
    0
  );
  const pTokens = allResults.reduce(
    (s, r) => s + r.pipelineTokens.input + r.pipelineTokens.output,
    0
  );
  const bCost = (bTokens / 1_000_000) * COST_INPUT_PER_M;
  const pCost = (pTokens / 1_000_000) * COST_INPUT_PER_M;
  const bLatency = Math.round(
    allResults.reduce((s, r) => s + r.baselineLatencyMs, 0) / allResults.length
  );
  const pLatency = Math.round(
    allResults.reduce((s, r) => s + r.pipelineLatencyMs, 0) / allResults.length
  );

  console.log("\n=== Summary ===\n");
  console.log(
    `Math accuracy:     Baseline ${mathBC}/${MATH_PROBLEMS.length} | Pipeline ${mathPC}/${MATH_PROBLEMS.length}`
  );
  console.log(
    `Coding accuracy:   Baseline ${codeBC}/${CODING_PROBLEMS.length} | Pipeline ${codePC}/${CODING_PROBLEMS.length}`
  );
  console.log(
    `Total tokens:      Baseline ${bTokens} | Pipeline ${pTokens} (${(pTokens / bTokens).toFixed(1)}x)`
  );
  console.log(
    `Estimated cost:    Baseline $${bCost.toFixed(4)} | Pipeline $${pCost.toFixed(4)} (${(pCost / bCost).toFixed(1)}x)`
  );
  console.log(
    `Avg latency:       Baseline ${bLatency}ms | Pipeline ${pLatency}ms (${(pLatency / bLatency).toFixed(1)}x)`
  );
  console.log(`\nNote: Single provider (DeepSeek) for all stages. Multi-provider routing`);
  console.log(`would reduce cost by using cheap providers for execute/fix stages.`);
}

main().catch(console.error);
