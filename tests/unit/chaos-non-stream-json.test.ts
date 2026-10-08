import test from "node:test";
import assert from "node:assert/strict";

// A POST /v1/chat/completions without `"stream": true` routed to a chaos combo
// (`auto/chaos`) must come back as a JSON `chat.completion`, not as a
// text/event-stream body. The OpenAI contract defaults an omitted `stream` to
// false, and chatCore/resolveStreamFlag already honors that for single-model
// requests; the chaos panel used to answer every request with SSE regardless.

const { handleChaosChat } = await import("../../open-sse/services/autoCombo/chaosEngine.ts");

function jsonCompletion(content: string) {
  return new Response(
    JSON.stringify({
      object: "chat.completion",
      choices: [{ index: 0, message: { role: "assistant", content }, finish_reason: "stop" }],
    }),
    { status: 200, headers: { "content-type": "application/json" } }
  );
}

function answerByModel(model: string) {
  return jsonCompletion(`answer from ${model}`);
}

for (const [label, body] of [
  ["stream omitted", {}],
  ["stream: false", { stream: false }],
] as const) {
  test(`chaos combo returns JSON chat.completion when ${label}`, async () => {
    const seenBodies: unknown[] = [];
    const res = await handleChaosChat({
      body: { model: "auto/chaos", messages: [{ role: "user", content: "hi" }], ...body },
      models: ["prov-a/model-a", "prov-b/model-b"],
      handleSingleModel: async (b: unknown, model: string) => {
        seenBodies.push(b);
        return answerByModel(model);
      },
      comboName: "synthetic-chaos",
      primaryModel: "prov-a/model-a",
    });

    assert.equal(res.status, 200);
    const contentType = res.headers.get("content-type") || "";
    assert.match(contentType, /application\/json/);
    assert.doesNotMatch(contentType, /text\/event-stream/);
    assert.equal(res.headers.get("x-omniroute-chaos"), "true");

    const text = await res.text();
    assert.doesNotMatch(text, /^data:/m, "non-stream response must not carry SSE frames");
    const parsed = JSON.parse(text);
    assert.equal(parsed.object, "chat.completion");
    assert.equal(parsed.model, "prov-a/model-a");
    assert.equal(parsed.choices[0].message.role, "assistant");
    assert.equal(parsed.choices[0].message.content, "answer from prov-a/model-a");
    assert.equal(seenBodies.length, 2, "every panel model is still dispatched");
  });
}

test("chaos combo non-stream all-panel failure is a JSON error, not SSE", async () => {
  const warns: string[] = [];
  const res = await handleChaosChat({
    body: { messages: [{ role: "user", content: "hi" }] },
    models: ["prov-a/model-a", "prov-b/model-b"],
    handleSingleModel: async () =>
      new Response(JSON.stringify({ error: { message: "synthetic upstream down" } }), {
        status: 503,
        headers: { "content-type": "application/json" },
      }),
    log: { warn: (...args: unknown[]) => warns.push(args.map(String).join(" ")) },
    comboName: "synthetic-chaos",
  });

  assert.equal(res.status, 502);
  assert.match(res.headers.get("content-type") || "", /application\/json/);
  const parsed = JSON.parse(await res.text());
  assert.match(String(parsed.error?.message), /All chaos panel models failed/);
  assert.ok(warns.some((w) => /All chaos panel models failed/.test(w)));
});

test("chaos combo keeps the SSE panel broadcast when stream: true", async () => {
  const res = await handleChaosChat({
    body: { stream: true, messages: [{ role: "user", content: "hi" }] },
    models: ["prov-a/model-a", "prov-b/model-b"],
    handleSingleModel: async (_b: unknown, model: string) => answerByModel(model),
    comboName: "synthetic-chaos",
    primaryModel: "prov-b/model-b",
  });

  assert.equal(res.status, 200);
  assert.match(res.headers.get("content-type") || "", /text\/event-stream/);
  const text = await res.text();
  assert.match(text, /chat\.completion\.chunk/);
  assert.match(text, /answer from prov-b\/model-b/);
  assert.match(text, /data: \[DONE\]/);
});
