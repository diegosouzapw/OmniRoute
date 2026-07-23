import test from "node:test";
import assert from "node:assert/strict";

const { geminiToOpenAIResponse } =
  await import("../../open-sse/translator/response/gemini-to-openai.ts");

function createStreamingState() {
  return {
    toolCalls: new Map(),
  };
}

test("Antigravity stream preserves prompt-format thinking tags as content", () => {
  const state = createStreamingState();
  const first = geminiToOpenAIResponse(
    {
      response: {
        responseId: "resp-ag-visible-thinking",
        modelVersion: "antigravity/gemini-3-pro",
        candidates: [{ content: { parts: [{ text: "<thinking>\n[metacognition" }] } }],
      },
    },
    state
  );
  const second = geminiToOpenAIResponse(
    {
      response: {
        responseId: "resp-ag-visible-thinking",
        modelVersion: "antigravity/gemini-3-pro",
        candidates: [{ content: { parts: [{ text: "]\n\nVisible answer" }] } }],
      },
    },
    state
  );

  const deltas = [...first, ...second].map((event: any) => event.choices?.[0]?.delta || {});
  assert.deepEqual(
    deltas.filter((delta: any) => delta.content).map((delta: any) => delta.content),
    ["<thinking>\n[metacognition", "]\n\nVisible answer"]
  );
  assert.equal(
    deltas.some((delta: any) => delta.reasoning_content !== undefined),
    false
  );
});

test("Antigravity stream keeps native Gemini thought parts as reasoning_content", () => {
  const result = geminiToOpenAIResponse(
    {
      response: {
        responseId: "resp-ag-native-thought",
        modelVersion: "antigravity/gemini-3-pro",
        candidates: [
          {
            content: {
              parts: [{ thought: true, text: "Native plan" }, { text: "Visible answer" }],
            },
            finishReason: "STOP",
          },
        ],
      },
    },
    createStreamingState()
  );

  assert.equal(
    result.find((event: any) => event.choices?.[0]?.delta?.reasoning_content)?.choices[0].delta
      .reasoning_content,
    "Native plan"
  );
  assert.equal(
    result.find((event: any) => event.choices?.[0]?.delta?.content)?.choices[0].delta.content,
    "Visible answer"
  );
});
