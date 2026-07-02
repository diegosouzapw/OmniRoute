import { describe, it, afterEach } from "node:test";
import assert from "node:assert/strict";
import {
  llmCompressorEngine,
  setLlmCompressorBackend,
  type LlmCompressorBackend,
} from "../../../open-sse/services/compression/engines/llm/index.ts";

// T05/C3 — opt-in LLM-tier compressor. Default-off / no-op; fail-open; code & system protected.

// A fake backend that halves prose length (always shorter for len >= 2).
const halveBackend: LlmCompressorBackend = async (text) =>
  text.slice(0, Math.max(1, Math.floor(text.length / 2)));

const throwingBackend: LlmCompressorBackend = async () => {
  throw new Error("backend boom");
};

function body(messages: unknown[]) {
  return { messages } as Record<string, unknown>;
}

afterEach(() => setLlmCompressorBackend(null));

describe("llmCompressorEngine (T05/C3)", () => {
  it("is a pass-through with the default (no-op) backend even when enabled", async () => {
    const input = body([{ role: "user", content: "some prose that could be compressed" }]);
    const out = await llmCompressorEngine.applyAsync!(input, {
      stepConfig: { enabled: true, minTokens: 0 },
    });
    assert.equal(out.compressed, false);
    assert.equal(out.body, input, "default no-op backend must not mutate the body");
  });

  it("does nothing when not enabled, even with a compressing backend", async () => {
    setLlmCompressorBackend(halveBackend);
    const input = body([{ role: "user", content: "lots of prose here to compress" }]);
    const off = await llmCompressorEngine.applyAsync!(input, { stepConfig: { minTokens: 0 } });
    assert.equal(off.compressed, false);
    assert.equal(off.body, input);
  });

  it("compresses prose when enabled with a real backend, protecting code + system messages", async () => {
    setLlmCompressorBackend(halveBackend);
    const code = "```js\nconst secret = 42;\n```";
    const input = body([
      { role: "system", content: "You are a careful assistant. Do not change me." },
      {
        role: "user",
        content: `Here is a long explanation in prose.\n\n${code}\n\nAnd more prose after.`,
      },
    ]);
    const out = await llmCompressorEngine.applyAsync!(input, {
      stepConfig: { enabled: true, minTokens: 0 },
    });
    assert.equal(out.compressed, true);
    const msgs = (out.body as { messages: Array<{ role: string; content: string }> }).messages;
    // System message untouched.
    assert.equal(msgs[0].content, "You are a careful assistant. Do not change me.");
    // The fenced code block survives verbatim (never sent to the backend).
    assert.ok(msgs[1].content.includes(code), "code block must be preserved verbatim");
    // The user message got shorter overall.
    assert.ok(msgs[1].content.length < (input.messages as { content: string }[])[1].content.length);
  });

  it("fail-opens: a throwing backend leaves the body unchanged", async () => {
    setLlmCompressorBackend(throwingBackend);
    const input = body([{ role: "user", content: "prose that the backend will choke on" }]);
    const out = await llmCompressorEngine.applyAsync!(input, {
      stepConfig: { enabled: true, minTokens: 0 },
    });
    assert.equal(out.compressed, false);
    assert.equal(
      (out.body as { messages: { content: string }[] }).messages[0].content,
      "prose that the backend will choke on"
    );
  });

  it("respects the minTokens floor (skips small prompts)", async () => {
    setLlmCompressorBackend(halveBackend);
    const input = body([{ role: "user", content: "tiny" }]);
    const out = await llmCompressorEngine.applyAsync!(input, {
      stepConfig: { enabled: true, minTokens: 2000 },
    });
    assert.equal(out.compressed, false);
  });

  it("sync apply is always a no-op pass-through", () => {
    const input = body([{ role: "user", content: "anything" }]);
    const out = llmCompressorEngine.apply(input);
    assert.equal(out.compressed, false);
    assert.equal(out.body, input);
  });

  it("validateConfig accepts valid config and rejects bad fields", () => {
    assert.equal(llmCompressorEngine.validateConfig({ enabled: false }).valid, true);
    assert.equal(
      llmCompressorEngine.validateConfig({ enabled: true, compressionRate: 0.5, minTokens: 1000 }).valid,
      true
    );
    assert.equal(llmCompressorEngine.validateConfig({ enabled: "yes" }).valid, false);
    assert.equal(llmCompressorEngine.validateConfig({ compressionRate: 2 }).valid, false);
    assert.equal(llmCompressorEngine.validateConfig({ minTokens: -1 }).valid, false);
  });

  it("defaults to disabled in its config schema (opt-in)", () => {
    const enabledField = llmCompressorEngine.getConfigSchema!().find((f) => f.key === "enabled");
    assert.equal(enabledField?.defaultValue, false);
  });
});
