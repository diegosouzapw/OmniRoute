import test from "node:test";
import assert from "node:assert/strict";
import {
  createStreamContentWatcher,
  isReasoningProgressFrame,
  hasUsefulStreamContent,
} from "../../open-sse/utils/streamReadiness.ts";

const frame = (payload: unknown) => `data: ${JSON.stringify(payload)}\n\n`;
const gemini = (part: unknown) => ({ candidates: [{ content: { parts: [part] } }] });
const chat = (delta: unknown) => ({ choices: [{ index: 0, delta }] });
const progressCases: [string, unknown][] = [
  ["Gemini signature-only part", gemini({ text: "", thoughtSignature: "opaque-signature" })],
  [
    "OpenRouter encrypted reasoning",
    chat({ reasoning_details: [{ type: "reasoning.encrypted", data: "opaque-encrypted-data" }] }),
  ],
  [
    "OpenRouter signature-only reasoning",
    chat({
      reasoning_details: [{ type: "reasoning.text", text: "", signature: "opaque-signature" }],
    }),
  ],
  ["empty explicit reasoning_content delta", chat({ reasoning_content: "" })],
  ["empty explicit reasoning delta", chat({ reasoning: "" })],
];
for (const [name, payload] of progressCases) {
  test(`${name} is model progress without satisfying the empty-output guard`, () => {
    const wire = frame(payload);
    assert.equal(isReasoningProgressFrame(wire), true);
    assert.equal(hasUsefulStreamContent(wire), false);
    const watcher = createStreamContentWatcher();
    watcher.note(wire.slice(0, 13));
    assert.equal(watcher.reasoningProgress(), 0);
    watcher.note(wire.slice(13));
    watcher.finish();
    assert.equal(watcher.reasoningProgress(), 1);
    assert.equal(watcher.sawContent(), false);
  });
}
const lifecycleCases: [string, unknown][] = [
  ["role-only delta", chat({ role: "assistant" })],
  ["empty delta", chat({})],
  ["null reasoning", chat({ reasoning: null, reasoning_content: null })],
  ["empty reasoning details array", chat({ reasoning_details: [] })],
  [
    "unknown detail type",
    chat({ reasoning_details: [{ type: "future.metadata", data: "opaque" }] }),
  ],
  [
    "empty encrypted envelope",
    chat({ reasoning_details: [{ type: "reasoning.encrypted", data: "" }] }),
  ],
  ["empty Gemini signature", gemini({ text: "", thoughtSignature: "" })],
  ["unrelated signature key", { signature: "opaque" }],
  ["ping", { type: "ping" }],
];
for (const [name, payload] of lifecycleCases) {
  test(`${name} does not reset the model-progress watchdog`, () => {
    const watcher = createStreamContentWatcher();
    watcher.note(frame(payload));
    watcher.finish();
    assert.equal(watcher.reasoningProgress(), 0);
    assert.equal(watcher.sawContent(), false);
  });
}
