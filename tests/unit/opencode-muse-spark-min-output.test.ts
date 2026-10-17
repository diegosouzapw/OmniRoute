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
  await import("../../open-sse/executors/opencode.ts");
const { normalizeMuseSparkFinishReason, createMuseSparkStreamFinishNormalizer, OpencodeExecutor } =
  await import("../../open-sse/executors/opencode.ts");

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

test("no-auth oc relays the Muse Responses stream untouched, post-completion pings included", async () => {
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
      clientHeaders: {
        "user-agent": "opencode/1.18.31",
        "User-Agent": "opencode/1.18.31",
        "x-opencode-session": "ses_abc123",
        "x-opencode-session-id": "ses_abc123",
      },
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
    // The no-auth oc relay returns the upstream verdict exactly as sent: no
    // stream normalization applies on the passthrough path.
    assert.match(text, /response.completed/);
    assert.match(text, /\"type\":\"ping\"/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

// Responses path (`/v1/responses`, Muse Spark Contributor): the budget travels as
// `max_output_tokens`. muse-spark-*-contributor-free burns ~1-2k tokens on hidden
// reasoning and answers `incomplete` with `output: []` below ~8k; the upstream
// rejects > 1M; OpenCode Zen 400s any max_output_tokens below 16.
const {
  applyOpencodeOutputBudgetFloors,
  MUSE_SPARK_RESPONSES_MIN_OUTPUT_TOKENS,
  MUSE_SPARK_MAX_OUTPUT_TOKENS,
  OPENCODE_MIN_OUTPUT_TOKENS,
} = await import("../../open-sse/executors/opencodeMuseSpark.ts");

test("muse-spark Responses max_output_tokens below the floor is raised", () => {
  const body: Record<string, unknown> = { max_output_tokens: 100 };
  applyOpencodeOutputBudgetFloors("muse-spark-1.3-contributor-free", body);
  assert.equal(MUSE_SPARK_RESPONSES_MIN_OUTPUT_TOKENS, 8000);
  assert.equal(body.max_output_tokens, MUSE_SPARK_RESPONSES_MIN_OUTPUT_TOKENS);
});

test("muse-spark Responses max_output_tokens above 1M is clamped to the upstream ceiling", () => {
  const body: Record<string, unknown> = { max_output_tokens: 2_000_000 };
  applyOpencodeOutputBudgetFloors("muse-spark-1.2-contributor-free", body);
  assert.equal(body.max_output_tokens, MUSE_SPARK_MAX_OUTPUT_TOKENS);
  assert.equal(MUSE_SPARK_MAX_OUTPUT_TOKENS, 1_000_000);
});

test("muse-spark Responses budgets inside the window are untouched", () => {
  for (const value of [8000, 32000, 1_000_000]) {
    const body: Record<string, unknown> = { max_output_tokens: value };
    applyOpencodeOutputBudgetFloors("muse-spark-1.3-contributor-free", body);
    assert.equal(body.max_output_tokens, value);
  }
});

test("no budget is synthesized when the caller set none (both fields)", () => {
  for (const model of ["muse-spark-1.3-contributor-free", "big-pickle"]) {
    const body: Record<string, unknown> = { input: [] };
    applyOpencodeOutputBudgetFloors(model, body);
    assert.equal("max_output_tokens" in body, false, model);
    assert.equal("max_tokens" in body, false, model);
  }
});

test("any opencode model: max_output_tokens below 16 is raised to 16", () => {
  assert.equal(OPENCODE_MIN_OUTPUT_TOKENS, 16);
  const body: Record<string, unknown> = { max_output_tokens: 1 };
  applyOpencodeOutputBudgetFloors("big-pickle", body);
  assert.equal(body.max_output_tokens, 16);
  const ok: Record<string, unknown> = { max_output_tokens: 16 };
  applyOpencodeOutputBudgetFloors("big-pickle", ok);
  assert.equal(ok.max_output_tokens, 16);
});

test("chat path is unchanged: muse-spark max_tokens floor stays 512, other models untouched", () => {
  const muse: Record<string, unknown> = { max_tokens: 64 };
  applyOpencodeOutputBudgetFloors("muse-spark-1.2-contributor", muse);
  assert.equal(muse.max_tokens, MUSE_SPARK_MIN_OUTPUT_TOKENS);
  const other: Record<string, unknown> = { max_tokens: 1 };
  applyOpencodeOutputBudgetFloors("big-pickle", other);
  assert.equal(other.max_tokens, 1);
});

test("keyed executor floors max_output_tokens before dispatching a Responses body", async () => {
  const originalFetch = globalThis.fetch;
  const sentBodies: Record<string, unknown>[] = [];
  try {
    globalThis.fetch = (async (_url: unknown, init?: RequestInit) => {
      sentBodies.push(JSON.parse(String(init?.body ?? "{}")));
      return new Response(
        [
          "event: response.completed",
          'data: {"type":"response.completed","response":{"usage":{"input_tokens":1,"output_tokens":1}}}',
          "",
        ].join("\n"),
        { status: 200, headers: { "Content-Type": "text/event-stream" } }
      );
    }) as unknown as typeof fetch;

    const { runWithProxyContext } = await import("../../open-sse/utils/proxyFetch.ts");
    const result = await runWithProxyContext(null, () =>
      new OpencodeExecutor("opencode-go").execute({
        model: "muse-spark-1.2-contributor-free",
        body: { model: "muse-spark-1.2-contributor-free", max_output_tokens: 100, stream: true },
        stream: true,
        credentials: { apiKey: "test-key" },
      })
    );
    await result.response.text();
    assert.ok(sentBodies.length > 0);
    assert.equal(sentBodies[0].max_output_tokens, MUSE_SPARK_RESPONSES_MIN_OUTPUT_TOKENS);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
