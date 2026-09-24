/**
 * Regression coverage for #13746.
 *
 * Non-streaming Chat/Responses callers pass provider usage through normalizeUsage()
 * before calculateCost(). Nested cache-read counters were dropped at that boundary,
 * so the calculator charged the whole prompt at the normal input rate.
 *
 * Pricing and usage below are synthetic: input=$10/M, cache-read=$1/M,
 * output=$50/M; 100,000 input tokens with 99,000 cached tokens must cost $0.109.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cache-read-13746-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { normalizeUsage, sanitizeProviderUsageForRequest } =
  await import("../../open-sse/utils/usageTracking.ts");
const { createSSEStream } = await import("../../open-sse/utils/stream.ts");
const { calculateCost } = await import("../../src/lib/usage/costCalculator.ts");

const PROVIDER = "synthetic-cache-read-13746";
const MODEL = "synthetic-cache-read-model-13746";
const PRICING = { input: 10, cached: 1, output: 50 };

function seedSyntheticPricing(): void {
  core
    .getDbInstance()
    .prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)")
    .run("pricing", PROVIDER, JSON.stringify({ [MODEL]: PRICING }));
}

async function costOf(usage: Record<string, unknown>): Promise<number> {
  return calculateCost(PROVIDER, MODEL, normalizeUsage(usage));
}

async function readSse(chunks: string[], options: Record<string, unknown> = {}): Promise<string> {
  const source = new ReadableStream({
    start(controller) {
      for (const chunk of chunks) controller.enqueue(new TextEncoder().encode(chunk));
      controller.close();
    },
  });
  return new Response(
    source.pipeThrough(
      createSSEStream({
        mode: "translate",
        sourceFormat: "openai",
        targetFormat: "openai-responses",
        clientResponseFormat: "openai-responses",
        provider: PROVIDER,
        model: MODEL,
        ...options,
      })
    )
  ).text();
}

function assertCost(actual: number, expected: number): void {
  assert.ok(Math.abs(actual - expected) < Number.EPSILON, `${actual} !== ${expected}`);
}

test.before(() => {
  seedSyntheticPricing();
});

test.after(async () => {
  await new Promise((resolve) => setTimeout(resolve, 50));
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("implausible usage repair clears nested cache-read details before normalization", () => {
  const claude = sanitizeProviderUsageForRequest(
    {
      input_tokens: 1_000,
      cache_read_input_tokens: 336_000,
      prompt_tokens_details: { cached_tokens: 336_000, cache_creation_tokens: 12 },
    },
    {},
    "claude"
  );
  assert.ok((claude?.input_tokens ?? 0) > 0);
  assert.equal(claude?.cache_read_input_tokens, 0);
  assert.equal(claude?.prompt_tokens_details?.cached_tokens, 0);
  assert.equal(claude?.prompt_tokens_details?.cache_creation_tokens, 0);

  const responses = sanitizeProviderUsageForRequest(
    {
      input_tokens: 336_000,
      input_tokens_details: { cached_tokens: 336_000, cache_creation_tokens: 12 },
    },
    {},
    "openai-responses"
  );
  assert.ok((responses?.input_tokens ?? 0) > 0);
  assert.equal(responses?.input_tokens_details?.cached_tokens, 0);
  assert.equal(responses?.input_tokens_details?.cache_creation_tokens, 0);
});

test("Responses SSE metadata uses normalized nested cache-read usage", async () => {
  const previous = process.env.OMNIROUTE_SSE_COMMENTS;
  process.env.OMNIROUTE_SSE_COMMENTS = "on";
  try {
    const output = await readSse([
      `event: response.completed\ndata: ${JSON.stringify({
        type: "response.completed",
        response: {
          id: "resp-cache-read-13746",
          output: [{ type: "message", content: [{ type: "output_text", text: "done" }] }],
          usage: {
            input_tokens: 100_000,
            output_tokens: 0,
            input_tokens_details: { cached_tokens: 99_000 },
          },
        },
      })}\n\n`,
    ]);

    assert.match(output, /: x-omniroute-response-cost=0\.1090000000/);
  } finally {
    if (previous === undefined) delete process.env.OMNIROUTE_SSE_COMMENTS;
    else process.env.OMNIROUTE_SSE_COMMENTS = previous;
  }
});

test("Chat nested prompt_tokens_details.cached_tokens reaches cost calculation", async () => {
  const usage = normalizeUsage({
    prompt_tokens: 100_000,
    completion_tokens: 0,
    prompt_tokens_details: { cached_tokens: 99_000 },
  });

  assert.equal(usage?.cached_tokens, 99_000);
  assertCost(await calculateCost(PROVIDER, MODEL, usage), 0.109);
});

test("Responses nested input_tokens_details.cached_tokens reaches cost calculation", async () => {
  const usage = normalizeUsage({
    input_tokens: 100_000,
    output_tokens: 0,
    input_tokens_details: { cached_tokens: 99_000 },
  });

  assert.equal(usage?.cached_tokens, 99_000);
  assertCost(await calculateCost(PROVIDER, MODEL, usage), 0.109);
});

test("flat cache-read fields retain their existing cost semantics", async () => {
  assertCost(
    await costOf({ prompt_tokens: 100_000, cached_tokens: 99_000, completion_tokens: 0 }),
    0.109
  );
  assertCost(
    await costOf({ input_tokens: 100_000, cache_read_input_tokens: 99_000, output_tokens: 0 }),
    0.109
  );
});

test("an explicit zero cache-read count wins over a nested fallback", async () => {
  const usage = normalizeUsage({
    prompt_tokens: 100_000,
    prompt_tokens_details: { cached_tokens: 99_000 },
    cached_tokens: 0,
  });

  assert.equal(usage?.cached_tokens, 0);
  assert.equal(await calculateCost(PROVIDER, MODEL, usage), 1);
});

test("missing or non-finite cache-read fields stay omitted", async () => {
  const missing = normalizeUsage({ prompt_tokens: 100_000, completion_tokens: 0 });
  assert.equal(Object.hasOwn(missing ?? {}, "cached_tokens"), false);
  assert.equal(Object.hasOwn(missing ?? {}, "cache_read_input_tokens"), false);
  assert.equal(await calculateCost(PROVIDER, MODEL, missing), 1);

  const nonFinite = normalizeUsage({
    prompt_tokens: 100_000,
    input_tokens_details: { cached_tokens: Number.NaN },
  });
  assert.equal(Object.hasOwn(nonFinite ?? {}, "cached_tokens"), false);
  assert.equal(await calculateCost(PROVIDER, MODEL, nonFinite), 1);
});

test("nested cache-creation remains compatible with cache-read normalization", async () => {
  const usage = normalizeUsage({
    input_tokens: 100_000,
    output_tokens: 0,
    input_tokens_details: {
      cached_tokens: 99_000,
      cache_creation_tokens: 5,
    },
  });

  assert.equal(usage?.cached_tokens, 99_000);
  assert.equal(usage?.cache_creation_input_tokens, 5);
  assertCost(await calculateCost(PROVIDER, MODEL, usage), 0.109);
});
