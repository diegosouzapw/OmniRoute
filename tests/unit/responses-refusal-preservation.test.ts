import test from "node:test";
import assert from "node:assert/strict";
import { translateNonStreamingResponse } from "../../open-sse/handlers/responseTranslator.ts";
import { openaiResponsesToOpenAIResponse } from "../../open-sse/translator/response/openai-responses.ts";
import { detectMalformedNonStream } from "../../open-sse/utils/diagnostics.ts";
import { resetDbInstance } from "../../src/lib/db/core.ts";
import { createSSEStream } from "../../open-sse/utils/stream.ts";
import { parseSSEToResponsesOutput } from "../../open-sse/handlers/sseParser.ts";
import { validateResponseQuality } from "../../open-sse/services/combo/validateQuality.ts";
test.after(async () => {
  await new Promise<void>((resolve) => setImmediate(resolve));
  resetDbInstance();
});

const REFUSAL = "I cannot help with this request.";
const item = {
  id: "m",
  type: "message",
  role: "assistant",
  content: [{ type: "refusal", refusal: REFUSAL }],
};
const response = { object: "response", status: "completed", output: [item] };
const complete = { type: "response.completed", response };
const identity = { item_id: "m", output_index: 0, content_index: 0 };

test("empty refusal is still empty, and a final refusal wins over earlier commentary", () => {
  const empty = { ...response, output: [{ ...item, content: [{ type: "refusal", refusal: "" }] }] };
  assert.equal(
    detectMalformedNonStream(
      translateNonStreamingResponse(empty, "openai-responses", "openai"),
      "codex"
    ),
    "empty_choices"
  );
  const mixed = {
    ...response,
    output: [
      { ...item, id: "comment", content: [{ type: "output_text", text: "Earlier commentary" }] },
      item,
    ],
  };
  const converted = translateNonStreamingResponse(mixed, "openai-responses", "openai");
  assert.equal(converted.choices[0].message.refusal, REFUSAL);
  assert.equal(converted.choices[0].message.content, "");
});

test("combo quality gate accepts structured refusals instead of retrying them", async () => {
  for (const body of [
    response,
    translateNonStreamingResponse(response, "openai-responses", "openai"),
  ]) {
    assert.equal(detectMalformedNonStream(body, "codex"), null);
    const quality = await validateResponseQuality(Response.json(body), false, {});
    assert.equal(quality.valid, true, quality.reason);
  }
});

test("nonstream Responses refusal survives both OpenAI and Claude translation", () => {
  const openai = translateNonStreamingResponse(response, "openai-responses", "openai");
  assert.equal(openai.choices[0].message.refusal, REFUSAL);
  assert.equal(detectMalformedNonStream(openai, "codex"), null);
  const claude = translateNonStreamingResponse(response, "openai-responses", "claude");
  assert.deepEqual(claude.content, [{ type: "text", text: REFUSAL }]);
  assert.equal(detectMalformedNonStream(claude, "codex"), null);
});

for (const [name, events] of Object.entries({
  snapshot: [complete],
  empty_snapshot: [
    { type: "response.refusal.delta", ...identity, delta: REFUSAL },
    {
      type: "response.completed",
      response: {
        ...response,
        output: [{ ...item, content: [{ type: "output_text", text: "" }] }],
      },
    },
  ],
  deltas: [
    { type: "response.refusal.delta", ...identity, delta: REFUSAL.slice(0, 9) },
    { type: "response.refusal.delta", ...identity, delta: REFUSAL.slice(9) },
    { type: "response.refusal.done", ...identity, refusal: REFUSAL },
    { type: "response.output_item.done", output_index: 0, item },
    complete,
  ],
  done: [{ type: "response.refusal.done", ...identity, refusal: REFUSAL }, complete],
})) {
  test(`stream refusal ${name} is emitted exactly once`, () => {
    const state = {};
    const chunks = events.flatMap((event) => {
      const result = openaiResponsesToOpenAIResponse(event, state);
      return Array.isArray(result) ? result : result ? [result] : [];
    });
    assert.equal(chunks.map((c) => c.choices[0].delta.refusal || "").join(""), REFUSAL);
    assert.equal(chunks.filter((c) => c.choices[0].finish_reason).length, 1);
  });
  test(`nonstream SSE refusal ${name} survives assembly`, () => {
    const parsed = parseSSEToResponsesOutput(
      events.map((e) => `data: ${JSON.stringify(e)}\n\n`).join(""),
      "synthetic"
    );
    assert.equal(
      translateNonStreamingResponse(parsed, "openai-responses", "openai").choices[0].message
        .refusal,
      REFUSAL
    );
  });
  for (const format of ["openai", "claude"]) {
    test(`real ${format} SSE delivers ${name} refusal without failure or cooldown`, async () => {
      const failures: unknown[] = [];
      const source = new ReadableStream({
        start(controller) {
          for (const event of events)
            controller.enqueue(
              new TextEncoder().encode(`event: ${event.type}\ndata: ${JSON.stringify(event)}\n\n`)
            );
          controller.close();
        },
      });
      const stream = source.pipeThrough(
        createSSEStream({
          mode: "translate",
          sourceFormat: format,
          targetFormat: "openai-responses",
          clientResponseFormat: format,
          provider: "codex",
          model: "synthetic",
          body: { input: "synthetic" },
          onFailure(failure) {
            failures.push(failure);
            return true;
          },
        })
      );
      const raw = await new Response(stream).text();
      const parsed = raw
        .split("\n")
        .filter((line) => line.startsWith("data: {"))
        .map((line) => JSON.parse(line.slice(6)));
      const text = parsed
        .map((e) =>
          format === "claude" ? e.delta?.text || "" : e.choices?.[0]?.delta?.refusal || ""
        )
        .join("");
      assert.equal(text, REFUSAL, raw);
      assert.deepEqual(failures, []);
      assert.equal(parsed.filter((e) => e.type === "error").length, 0);
    });
  }
}

test("delta-only refusal survives nonstream assembly without terminal output", () => {
  const events = [
    { type: "response.created", response: { object: "response", output: [] } },
    { type: "response.refusal.delta", ...identity, delta: REFUSAL },
    { type: "response.completed", response: { object: "response", output: [] } },
  ];
  const parsed = parseSSEToResponsesOutput(
    events.map((e) => `data: ${JSON.stringify(e)}\n\n`).join(""),
    "synthetic"
  );
  assert.equal(
    translateNonStreamingResponse(parsed, "openai-responses", "openai").choices[0].message.refusal,
    REFUSAL
  );
});
