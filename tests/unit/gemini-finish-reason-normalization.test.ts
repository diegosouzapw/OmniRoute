import test from "node:test";
import assert from "node:assert/strict";

const { geminiToOpenAIResponse } =
  await import("../../open-sse/translator/response/gemini-to-openai.ts");
const { translateNonStreamingResponse } =
  await import("../../open-sse/handlers/responseTranslator.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

test("Gemini non-stream: prohibited content finish reason becomes content_filter", () => {
  const result = translateNonStreamingResponse(
    {
      responseId: "resp-prohibited",
      modelVersion: "gemini-2.5-flash",
      candidates: [
        {
          content: { parts: [{ text: "partial text" }] },
          finishReason: "PROHIBITED_CONTENT",
        },
      ],
    },
    FORMATS.GEMINI,
    FORMATS.OPENAI
  );

  assert.equal((result as any).choices[0].message.content, "partial text");
  assert.equal((result as any).choices[0].finish_reason, "content_filter");
});

test("Gemini stream: prohibited content finish reason becomes content_filter", () => {
  const result = geminiToOpenAIResponse(
    {
      responseId: "resp-prohibited",
      modelVersion: "gemini-2.5-flash",
      candidates: [
        {
          content: { parts: [{ text: "partial text" }] },
          finishReason: "PROHIBITED_CONTENT",
        },
      ],
    },
    { toolCalls: new Map() }
  );

  assert.equal(result.at(-1).choices[0].finish_reason, "content_filter");
  assert.equal(
    result.some((event: any) => event.choices?.[0]?.delta?.content === "partial text"),
    true
  );
});
