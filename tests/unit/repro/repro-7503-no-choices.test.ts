import test from "node:test";
import assert from "node:assert/strict";

const { hasStreamReadinessSignal } = await import("@omniroute/open-sse/utils/streamReadiness");
const { buildErrorBody } = await import("@omniroute/open-sse/utils/error");
const { AuggieExecutor } = await import("@omniroute/open-sse/executors/auggie");

test("hasStreamReadinessSignal wrongly reports readiness for a choices-less mid-stream error frame", () => {
  const errorBody = buildErrorBody(502, "Auggie CLI not found: auggie.cmd");
  assert.equal("choices" in errorBody, false, "sanity check: buildErrorBody() output really has no choices key");

  const sse = `data: ${JSON.stringify(errorBody)}\n\ndata: [DONE]\n\n`;
  const ready = hasStreamReadinessSignal(sse);

  assert.equal(
    ready,
    false,
    "a stream carrying only a choices-less error frame should NOT be reported as 'ready' " +
      "(successful) — it gives the combo router no signal to fail over to the next candidate, " +
      "and the client accumulates zero `choices` for the whole request, which is exactly what " +
      "makes strict OpenAI-SDK clients (VS Code Copilot, Cline) throw 'Response contained no choices.'"
  );
});

test("AuggieExecutor's real streaming error path emits an SSE body with zero populated `choices` (end-to-end)", async () => {
  const executor = new AuggieExecutor();
  const previousBin = process.env.AUGGIE_BIN;
  process.env.AUGGIE_BIN = "/definitely/does/not/exist/auggie-xyz-7503";
  try {
    const { response } = await executor.execute({
      model: "claude-sonnet-4.6",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: true,
      credentials: {} as never,
      signal: null,
      log: { info: () => {}, debug: () => {}, warn: () => {} },
    });

    const text = await response.text();
    const dataLines = text.split("\n").filter((l) => l.startsWith("data: "))
      .map((l) => l.slice("data: ".length).trim()).filter((d) => d !== "[DONE]");
    assert.ok(dataLines.length > 0, "expected at least one SSE data event");

    const anyPopulatedChoices = dataLines.some((d) => {
      const parsed = JSON.parse(d);
      return Array.isArray(parsed.choices) && parsed.choices.length > 0 &&
        (parsed.choices[0]?.delta?.content || parsed.choices[0]?.message?.content);
    });

    assert.equal(anyPopulatedChoices, false,
      "AuggieExecutor's CLI-failure SSE stream never carries a populated `choices` entry — " +
      "it is only a choices-less {error:...} frame + [DONE]");
  } finally {
    if (previousBin === undefined) delete process.env.AUGGIE_BIN;
    else process.env.AUGGIE_BIN = previousBin;
  }
});
