// Regression for upstream PR decolua/9router#913 — OpenAI `input_audio` and
// `audio_url` content parts must be forwarded as Gemini `inlineData` audio parts
// (instead of being silently dropped) so that callers can send audio (WAV/MP3/etc.)
// to Gemini models via the Antigravity / Gemini / Gemini-CLI translation paths.

import test from "node:test";
import assert from "node:assert/strict";

const { convertOpenAIContentToParts } =
  await import("../../open-sse/translator/helpers/geminiHelper.ts");
const { VALID_OPENAI_CONTENT_TYPES, filterToOpenAIFormat } =
  await import("../../open-sse/translator/helpers/openaiHelper.ts");

type Part = { inlineData?: { mimeType: string; data: string } };

test("convertOpenAIContentToParts handles input_audio with explicit wav format (#913)", () => {
  const parts = convertOpenAIContentToParts([
    { type: "text", text: "Transcribe this" },
    { type: "input_audio", input_audio: { data: "UklGRiQ", format: "wav" } },
  ]) as Part[];
  const inline = parts.find((p) => p.inlineData);
  assert.ok(inline, "input_audio must produce an inlineData part");
  assert.equal(inline!.inlineData!.mimeType, "audio/wav");
  assert.equal(inline!.inlineData!.data, "UklGRiQ");
});

test("convertOpenAIContentToParts maps input_audio mp3 -> audio/mpeg mime (#913)", () => {
  const parts = convertOpenAIContentToParts([
    { type: "input_audio", input_audio: { data: "SUQzBAA", format: "mp3" } },
  ]) as Part[];
  const inline = parts.find((p) => p.inlineData);
  assert.ok(inline, "input_audio mp3 must produce an inlineData part");
  assert.equal(
    inline!.inlineData!.mimeType,
    "audio/mpeg",
    "mp3 must canonicalize to audio/mpeg per RFC 3003"
  );
});

test("convertOpenAIContentToParts defaults input_audio without format to audio/wav (#913)", () => {
  const parts = convertOpenAIContentToParts([
    { type: "input_audio", input_audio: { data: "AAAA" } },
  ]) as Part[];
  const inline = parts.find((p) => p.inlineData);
  assert.ok(inline, "input_audio without format must still produce an inlineData part");
  assert.equal(inline!.inlineData!.mimeType, "audio/wav");
});

test("convertOpenAIContentToParts handles audio_url data URI (#913)", () => {
  const parts = convertOpenAIContentToParts([
    { type: "audio_url", audio_url: { url: "data:audio/wav;base64,UklGRiQ" } },
  ]) as Part[];
  const inline = parts.find((p) => p.inlineData);
  assert.ok(inline, "audio_url data URI must produce an inlineData part");
  assert.equal(inline!.inlineData!.mimeType, "audio/wav");
  assert.equal(inline!.inlineData!.data, "UklGRiQ");
});

test("input_audio and audio_url are preserved by filterToOpenAIFormat (#913)", () => {
  // For OpenAI-target routes (passthrough), audio parts must not be stripped
  // out by the content-type allowlist.
  assert.ok(VALID_OPENAI_CONTENT_TYPES.includes("input_audio"));
  assert.ok(VALID_OPENAI_CONTENT_TYPES.includes("audio_url"));

  const body = {
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "What is this?" },
          { type: "input_audio", input_audio: { data: "AAAA", format: "wav" } },
          { type: "audio_url", audio_url: { url: "data:audio/wav;base64,AAAA" } },
        ],
      },
    ],
  };
  const filtered = filterToOpenAIFormat(body);
  const content = filtered.messages[0].content as Array<Record<string, unknown>>;
  const types = content.map((c) => c.type);
  assert.ok(types.includes("input_audio"), "input_audio survives passthrough filter");
  assert.ok(types.includes("audio_url"), "audio_url survives passthrough filter");
});
