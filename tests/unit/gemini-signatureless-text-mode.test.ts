import test from "node:test";
import assert from "node:assert/strict";

// Regression guard for the per-mode behavior of the OpenAI→Gemini translator
// (#3414/#3560/#3569). History of the standard-Gemini path:
//   - #3560 set the registered FORMATS.GEMINI translator to mode "text" on the
//     assumption that thinking Gemini models reject signature-less native tool
//     parts (400 "missing thought_signature").
//   - #3569 changed the registered default to mode "native" after a live test
//     against the real Gemini API (gemini-2.5-flash returns 200 for a
//     signatureless historical functionCall, even with tools + thinkingConfig),
//     which also removes the text-serialization leak (#3358).
// These tests still pin the *per-mode* output shape: "text" mode keeps history as
// inert text (no native parts, no sentinel — still available as an explicit mode),
// and "native" mode emits a native functionCall with no fake signature. The
// Antigravity/CLI bypass path is the only one that injects the
// skip_thought_signature_validator sentinel.
const { openaiToGeminiRequest } = await import(
  "../../open-sse/translator/request/openai-to-gemini.ts"
);

const MESSAGES = [
  { role: "user", content: "list files" },
  {
    role: "assistant",
    content: null,
    tool_calls: [
      { id: "call_1", type: "function", function: { name: "bash", arguments: '{"cmd":"ls"}' } },
    ],
  },
  { role: "tool", tool_call_id: "call_1", content: "file_a\nfile_b" },
  { role: "user", content: "thanks" },
];
const TOOLS = [{ type: "function", function: { name: "bash", parameters: { type: "object" } } }];

type GP = {
  functionCall?: unknown;
  functionResponse?: unknown;
  thoughtSignature?: unknown;
};
type GContent = { role?: string; parts?: GP[] };

function translate(mode: "native" | "text" | "context") {
  return openaiToGeminiRequest(
    "gemini-2.5-flash",
    { model: "gemini-2.5-flash", messages: MESSAGES, tools: TOOLS, stream: false },
    false,
    null,
    { signaturelessToolCallMode: mode }
  );
}

test('standard Gemini "text" mode: signature-less tool call/response stay as text (no native parts, no sentinel)', () => {
  const result = translate("text");
  const allParts = (result.contents as GContent[]).flatMap((c) => c.parts ?? []);

  assert.equal(
    allParts.some((p) => p.functionCall),
    false,
    "no native functionCall on the text-mode standard-Gemini path"
  );
  assert.equal(
    allParts.some((p) => p.functionResponse),
    false,
    "no native functionResponse on the text-mode standard-Gemini path"
  );
  assert.equal(
    allParts.some((p) => p.thoughtSignature === "skip_thought_signature_validator"),
    false,
    "the bypass sentinel must never be injected on the standard-Gemini path"
  );
});

test('standard Gemini "native" mode: native functionCall with no fake signature', () => {
  const result = translate("native");
  const modelTurn = (result.contents as GContent[]).find(
    (c) => c.role === "model" && (c.parts ?? []).some((p) => p.functionCall)
  );
  assert.ok(modelTurn, "native mode emits a native functionCall");
  const fc = (modelTurn.parts ?? []).find((p) => p.functionCall);
  assert.equal(fc?.thoughtSignature, undefined, "no fake signature injected in native mode");
});
