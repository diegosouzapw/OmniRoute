import { beforeEach, describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  applyLiveZoneCompression,
  getLiveZoneCacheStats,
  resetLiveZoneCache,
} from "../../../open-sse/services/compression/liveZone.ts";
import type { CompressionResult } from "../../../open-sse/services/compression/types.ts";

function result(body: Record<string, unknown>, compressed = true): CompressionResult {
  return {
    body,
    compressed,
    stats: {
      originalTokens: 100,
      compressedTokens: compressed ? 50 : 100,
      savingsPercent: compressed ? 50 : 0,
      techniquesUsed: compressed ? ["test"] : [],
      mode: "rtk",
      timestamp: Date.now(),
    },
  };
}

function toolCompressor(calls: Array<Record<string, unknown>>) {
  return async (body: Record<string, unknown>): Promise<CompressionResult> => {
    calls.push(structuredClone(body));
    const field = Array.isArray(body.messages) ? "messages" : "input";
    const items = body[field] as Array<Record<string, unknown>>;
    return result({
      ...body,
      [field]: items.map((item) =>
        item.role === "tool" ? { ...item, content: `compressed:${String(item.content)}` } : item
      ),
    });
  };
}

const options = {
  principalId: "key-1",
  sessionId: "session-1",
  variant: { mode: "rtk", config: {} },
};

beforeEach(() => resetLiveZoneCache());

describe("cache-aligned live-zone compression", () => {
  it("compresses normally once, then sends only appended items through the engine", async () => {
    const calls: Array<Record<string, unknown>> = [];
    const compress = toolCompressor(calls);
    const first = {
      messages: [
        { role: "system", content: "stable" },
        { role: "user", content: "run tests" },
        { role: "tool", content: "100 noisy lines" },
      ],
    };
    const firstResult = await applyLiveZoneCompression(first, options, compress);
    const frozenBytes = JSON.stringify((firstResult.body.messages as unknown[]).slice(0, 3));

    const second = {
      messages: [
        ...first.messages,
        { role: "assistant", content: "Need the failing test" },
        { role: "tool", content: "50 more noisy lines" },
      ],
    };
    const secondResult = await applyLiveZoneCompression(second, options, compress);

    assert.equal(calls.length, 2);
    assert.deepEqual(calls[1].messages, [second.messages[4]]);
    assert.equal(
      JSON.stringify((secondResult.body.messages as unknown[]).slice(0, 3)),
      frozenBytes,
      "the provider-facing prefix must remain byte-stable"
    );
    assert.equal(
      (secondResult.body.messages as Array<{ content: string }>)[3].content,
      "Need the failing test"
    );
    assert.equal(
      (secondResult.body.messages as Array<{ content: string }>)[4].content,
      "compressed:50 more noisy lines"
    );
    assert.deepEqual(secondResult.stats?.liveZone, {
      cacheHit: true,
      frozenItems: 3,
      liveItems: 2,
    });
  });

  it("keeps transformed top-level prefix fields stable and skips unchanged requests", async () => {
    const calls: Array<Record<string, unknown>> = [];
    const compress = async (body: Record<string, unknown>): Promise<CompressionResult> => {
      calls.push(structuredClone(body));
      return result({
        ...body,
        instructions: `${String(body.instructions)}:${calls.length}`,
      });
    };
    const first = {
      instructions: "stable instructions",
      tools: [{ type: "function", name: "run" }],
      messages: [{ role: "user", content: "hello" }],
    };
    const firstResult = await applyLiveZoneCompression(first, options, compress);
    const unchangedResult = await applyLiveZoneCompression(first, options, compress);
    const appendedResult = await applyLiveZoneCompression(
      { ...first, messages: [...first.messages, { role: "tool", content: "new output" }] },
      options,
      compress
    );

    assert.equal(calls.length, 2, "an unchanged request must not run the compressor again");
    assert.equal(unchangedResult.body.instructions, firstResult.body.instructions);
    assert.equal(appendedResult.body.instructions, firstResult.body.instructions);
    assert.deepEqual(appendedResult.body.tools, firstResult.body.tools);
    assert.deepEqual(calls[1].messages, [{ role: "tool", content: "new output" }]);
  });

  it("fails open to full compression when any raw prefix item changes", async () => {
    const calls: Array<Record<string, unknown>> = [];
    const compress = toolCompressor(calls);
    await applyLiveZoneCompression(
      { messages: [{ role: "user", content: "original" }] },
      options,
      compress
    );
    await applyLiveZoneCompression(
      {
        messages: [
          { role: "user", content: "edited" },
          { role: "tool", content: "new" },
        ],
      },
      options,
      compress
    );

    assert.equal((calls[1].messages as unknown[]).length, 2);
  });

  it("fails open when stable system or tool metadata changes", async () => {
    const calls: Array<Record<string, unknown>> = [];
    const compress = toolCompressor(calls);
    const messages = [{ role: "user", content: "same" }];
    await applyLiveZoneCompression(
      { system_instruction: "first", tools: [{ name: "one" }], messages },
      options,
      compress
    );
    await applyLiveZoneCompression(
      {
        system_instruction: "changed",
        tools: [{ name: "two" }],
        messages: [...messages, { role: "tool", content: "new" }],
      },
      options,
      compress
    );

    assert.equal((calls[1].messages as unknown[]).length, 2);
  });

  it("isolates cached prefixes by principal and compression variant", async () => {
    const calls: Array<Record<string, unknown>> = [];
    const compress = toolCompressor(calls);
    const body = { messages: [{ role: "user", content: "same" }] };
    await applyLiveZoneCompression(body, options, compress);
    await applyLiveZoneCompression(
      { messages: [...body.messages, { role: "tool", content: "other principal" }] },
      { ...options, principalId: "key-2" },
      compress
    );
    await applyLiveZoneCompression(
      { messages: [...body.messages, { role: "tool", content: "other mode" }] },
      { ...options, variant: { mode: "caveman", config: {} } },
      compress
    );

    assert.equal((calls[1].messages as unknown[]).length, 2);
    assert.equal((calls[2].messages as unknown[]).length, 2);
    assert.equal(getLiveZoneCacheStats().entries, 3);
  });

  it("supports Responses input arrays and bypasses caching without an authenticated principal", async () => {
    const calls: Array<Record<string, unknown>> = [];
    const compress = toolCompressor(calls);
    const first = { input: [{ role: "user", content: "hello" }] };
    await applyLiveZoneCompression(first, options, compress);
    await applyLiveZoneCompression(
      { input: [...first.input, { role: "tool", content: "response output" }] },
      options,
      compress
    );
    assert.deepEqual(calls[1].input, [{ role: "tool", content: "response output" }]);

    await applyLiveZoneCompression(first, { ...options, principalId: undefined }, compress);
    await applyLiveZoneCompression(first, { ...options, principalId: undefined }, compress);
    assert.equal(getLiveZoneCacheStats().entries, 1);
  });

  it("compresses only new Responses API tool outputs", async () => {
    const calls: Array<Record<string, unknown>> = [];
    const compress = toolCompressor(calls);
    const first = { input: [{ type: "message", role: "user", content: "hello" }] };
    await applyLiveZoneCompression(first, options, compress);
    const functionCall = { type: "function_call", call_id: "call-1", name: "run" };
    const output = { type: "function_call_output", call_id: "call-1", output: "noisy" };
    const result = await applyLiveZoneCompression(
      { input: [...first.input, functionCall, output] },
      options,
      compress
    );

    assert.deepEqual(calls[1].input, [output]);
    assert.deepEqual((result.body.input as unknown[])[1], functionCall);
  });

  it("compresses tool_result roles and types in the live zone", async () => {
    const calls: Array<Record<string, unknown>> = [];
    const compress = toolCompressor(calls);
    const first = { input: [{ role: "user", content: "hello" }] };
    await applyLiveZoneCompression(first, options, compress);
    const roleOutput = { role: "tool_result", content: "role output" };
    const typeOutput = { type: "tool_result", content: "type output" };
    await applyLiveZoneCompression(
      { input: [...first.input, roleOutput, typeOutput] },
      options,
      compress
    );

    assert.deepEqual(calls[1].input, [roleOutput, typeOutput]);
  });

  it("bypasses live-zone reuse when a global hard budget is configured", async () => {
    const calls: Array<Record<string, unknown>> = [];
    const compress = toolCompressor(calls);
    const hardBudgetOptions = {
      ...options,
      variant: { mode: "stacked", config: { targetTokens: 100 } },
    };
    const first = { messages: [{ role: "user", content: "hello" }] };
    await applyLiveZoneCompression(first, hardBudgetOptions, compress);
    await applyLiveZoneCompression(
      { messages: [...first.messages, { role: "tool", content: "new" }] },
      hardBudgetOptions,
      compress
    );
    assert.equal((calls[1].messages as unknown[]).length, 2);
    assert.equal(getLiveZoneCacheStats().entries, 0);
  });
});
