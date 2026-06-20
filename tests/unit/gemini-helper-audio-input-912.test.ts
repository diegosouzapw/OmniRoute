import test from "node:test";
import assert from "node:assert/strict";

// Regression for the audio-input drop on the OpenAI -> Gemini/Antigravity path.
// Chat Completions clients send `{ type: "input_audio", input_audio: { data, format } }`;
// Gemini accepts audio as `inlineData` with an `audio/<format>` mime type. Before the
// fix, `convertOpenAIContentToParts` had no audio branch, so the part fell through every
// handler and was silently dropped (no error, just missing audio).
const gemini = await import("../../open-sse/translator/helpers/geminiHelper.ts");

test("convertOpenAIContentToParts maps input_audio (wav) to Gemini inlineData", () => {
  const parts = gemini.convertOpenAIContentToParts([
    { type: "text", text: "transcribe this" },
    { type: "input_audio", input_audio: { data: "QUJDRA==", format: "wav" } },
  ]);
  assert.deepEqual(parts, [
    { text: "transcribe this" },
    { inlineData: { mimeType: "audio/wav", data: "QUJDRA==" } },
  ]);
});

test("convertOpenAIContentToParts maps input_audio (mp3) and strips a data: prefix", () => {
  const parts = gemini.convertOpenAIContentToParts([
    { type: "input_audio", input_audio: { data: "data:audio/mp3;base64,QUJDRA==", format: "mp3" } },
  ]);
  assert.deepEqual(parts, [{ inlineData: { mimeType: "audio/mp3", data: "QUJDRA==" } }]);
});

test("convertOpenAIContentToParts supports the { type: 'audio', audio: {...} } shape", () => {
  const parts = gemini.convertOpenAIContentToParts([
    { type: "audio", audio: { data: "QUJDRA==", format: "wav" } },
  ]);
  assert.deepEqual(parts, [{ inlineData: { mimeType: "audio/wav", data: "QUJDRA==" } }]);
});

test("convertOpenAIContentToParts defaults the audio mime type to audio/wav", () => {
  const parts = gemini.convertOpenAIContentToParts([
    { type: "input_audio", input_audio: { data: "QUJDRA==" } },
  ]);
  assert.deepEqual(parts, [{ inlineData: { mimeType: "audio/wav", data: "QUJDRA==" } }]);
});
