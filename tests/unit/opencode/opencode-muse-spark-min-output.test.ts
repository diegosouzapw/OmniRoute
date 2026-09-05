/**
 * muse-spark (opencode-go) burns its entire output budget on invisible
 * server-side reasoning before emitting any content. With small caller-set
 * budgets the upstream answers 200 with an empty message
 * (`{"message":{"role":"assistant"},"finish_reason":null}` and
 * `completion_tokens == max_tokens`) — chatCore then flags the fake success as
 * "Provider returned empty content" / 502.
 *
 * Verified live 2026-08-23: max_tokens=64 → empty; 100 → empty;
 * 256/512/1024 → content present (reasoning consumed 196–253 of it).
 *
 * Fix: OpencodeExecutor clamps muse-spark* output budgets UP to
 * MUSE_SPARK_MIN_OUTPUT_TOKENS so the reasoning phase can never consume the
 * whole budget. Other models are untouched.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { applyMuseSparkMinOutputTokens, MUSE_SPARK_MIN_OUTPUT_TOKENS } =
  await import("../../../open-sse/executors/opencode.ts");
const { normalizeMuseSparkFinishReason, createMuseSparkStreamFinishNormalizer, OpencodeExecutor } =
  await import("../../../open-sse/executors/opencode.ts");

test("RED: muse-spark tiny max_tokens is raised to the floor", () => {
  const body: Record<string, unknown> = { model: "x", max_tokens: 64, messages: [] };
  applyMuseSparkMinOutputTokens("muse-spark-1.2-contributor", body);
  assert.equal(body.max_tokens, MUSE_SPARK_MIN_OUTPUT_TOKENS);
});

test("RED: all muse-spark id variants are covered by the prefix match", () => {
  for (const model of ["muse-spark-1", "muse-spark-1.2", "muse-spark-1.2-contributor"]) {
    const body: Record<string, unknown> = { max_tokens: 100 };
    applyMuseSparkMinOutputTokens(model, body);
    assert.equal(body.max_tokens, MUSE_SPARK_MIN_OUTPUT_TOKENS, model);
  }
});

test("RED: budgets already at or above the floor are untouched", () => {
  const body: Record<string, unknown> = { max_tokens: 4096 };
  applyMuseSparkMinOutputTokens("muse-spark-1.2-contributor", body);
  assert.equal(body.max_tokens, 4096);
});

test("RED: non-muse-spark models are never modified", () => {
  const body: Record<string, unknown> = { max_tokens: 16 };
  applyMuseSparkMinOutputTokens("ox-alpha-free", body);
  assert.equal(body.max_tokens, 16);
});

test("RED: missing/non-numeric max_tokens stays absent (no synthetic budget)", () => {
  const body: Record<string, unknown> = { messages: [] };
  applyMuseSparkMinOutputTokens("muse-spark-1.2-contributor", body);
  assert.equal("max_tokens" in body, false);
});

test("RED: finish_reason length is rewritten to stop when completion is far under budget", () => {
  const payload: Record<string, unknown> = {
    choices: [{ index: 0, message: { role: "assistant" }, finish_reason: "length" }],
    usage: { completion_tokens: 270 },
  };
  normalizeMuseSparkFinishReason(payload, 128000);
  assert.equal((payload.choices as Array<Record<string, unknown>>)[0].finish_reason, "stop");
});

test("RED: genuine truncation at the budget keeps finish_reason length", () => {
  const payload: Record<string, unknown> = {
    choices: [{ index: 0, message: { role: "assistant" }, finish_reason: "length" }],
    usage: { completion_tokens: 127000 },
  };
  normalizeMuseSparkFinishReason(payload, 128000);
  assert.equal((payload.choices as Array<Record<string, unknown>>)[0].finish_reason, "length");
});

test("RED: non-length finish reasons and missing usage are untouched", () => {
  const payload: Record<string, unknown> = {
    choices: [{ index: 0, message: { role: "assistant" }, finish_reason: "stop" }],
  };
  normalizeMuseSparkFinishReason(payload, 128000);
  assert.equal((payload.choices as Array<Record<string, unknown>>)[0].finish_reason, "stop");

  const noUsage: Record<string, unknown> = {
    choices: [{ index: 0, message: { role: "assistant" }, finish_reason: "length" }],
  };
  normalizeMuseSparkFinishReason(noUsage, 128000);
  assert.equal(
    (noUsage.choices as Array<Record<string, unknown>>)[0].finish_reason,
    "length",
    "without a completion count the rewrite must stay conservative"
  );
});

test("RED: stream normalizer rewrites the finish frame after the usage frame", () => {
  const norm = createMuseSparkStreamFinishNormalizer(128000);
  const usageLine =
    'data: {"id":"r","object":"chat.completion.chunk","choices":[],"usage":{"completion_tokens":270}}';
  assert.equal(norm(usageLine), usageLine, "usage frame itself must not change");
  const finishLine = 'data: {"choices":[{"index":0,"delta":{},"finish_reason":"length"}]}';
  const out = JSON.parse(norm(finishLine).slice(5).trim());
  assert.equal(out.choices[0].finish_reason, "stop");
});

test("RED: stream normalizer passes through [DONE], comments and non-JSON lines", () => {
  const norm = createMuseSparkStreamFinishNormalizer(128000);
  assert.equal(norm("data: [DONE]"), "data: [DONE]");
  assert.equal(norm(": keepalive"), ": keepalive");
  assert.equal(norm("data: not-json"), "data: not-json");
});

test("closes the Muse Responses stream at response.completed before post-completion pings", async () => {
  const originalFetch = globalThis.fetch;
  try {
    globalThis.fetch = (async () =>
      new Response(
        [
          "event: response.output_text.delta",
          'data: {"type":"response.output_text.delta","delta":"OK"}',
          "event: response.completed",
          'data: {"type":"response.completed","response":{"usage":{"input_tokens":1,"output_tokens":1}}}',
          "event: ping",
          'data: {"type":"ping"}',
          "",
        ].join("\n"),
        { status: 200, headers: { "Content-Type": "text/event-stream" } }
      )) as typeof fetch;

    const result = await new OpencodeExecutor("opencode").execute({
      model: "muse-spark-1.2-contributor-free",
      body: {
        model: "muse-spark-1.2-contributor-free",
        max_output_tokens: 512,
        stream: true,
      },
      stream: true,
      credentials: {
        providerSpecificData: {
          fingerprints: ["test-account-a", "test-account-b"],
          accountProxies: [],
        },
      },
    });
    const text = await Promise.race([
      result.response.text(),
      new Promise<string>((_, reject) => setTimeout(() => reject(new Error("stream hung")), 1000)),
    ]);
    assert.match(text, /response.completed/);
    assert.doesNotMatch(text, /\"type\":\"ping\"/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
