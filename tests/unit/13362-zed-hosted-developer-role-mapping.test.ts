/**
 * Issue #13362: zed-hosted OpenAI models reject role developer
 *
 * When Claude Code sends multiple system messages through zed-hosted, the
 * OpenAI Responses translator may emit input items with role "developer".
 * Zed's OpenAI proxy only accepts User/Assistant/System/Tool roles.
 *
 * The fix maps role:"developer" → role:"system" in normalizeForZedProxy(),
 * which runs after both openaiToOpenAIResponsesRequest and
 * openaiToGeminiRequest in the zed-hosted executor.
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";

/**
 * Replicate the normalization logic from zed-hosted.ts for unit testing.
 */
function normalizeForZedProxy(req: Record<string, unknown>): Record<string, unknown> {
  // Safety settings (Gemini)
  if (Array.isArray(req.safetySettings)) {
    req.safetySettings = req.safetySettings.map(
      (s: Record<string, unknown>) =>
        s.threshold === "OFF" ? { ...s, threshold: "BLOCK_NONE" } : s
    );
  }

  // Tool calling mode (Gemini)
  const tc = req.toolConfig as Record<string, unknown> | undefined;
  if (tc && typeof tc === "object") {
    const fcc = tc.functionCallingConfig as Record<string, unknown> | undefined;
    if (fcc && typeof fcc === "object" && typeof fcc.mode === "string") {
      const mode = fcc.mode;
      if (mode === "VALIDATED" || mode === "AUTO") fcc.mode = "auto";
      else if (mode === "ANY") fcc.mode = "any";
      else if (mode === "NONE") fcc.mode = "none";
    }
  }

  // Developer role (OpenAI Responses)
  if (Array.isArray(req.input)) {
    for (const item of req.input) {
      if (
        item &&
        typeof item === "object" &&
        (item as Record<string, unknown>).role === "developer"
      ) {
        (item as Record<string, unknown>).role = "system";
      }
    }
  }

  return req;
}

describe("Issue #13362 — developer role mapping in normalizeForZedProxy", () => {
  it("maps developer role to system in input items", () => {
    const req = {
      input: [
        { type: "message", role: "developer", content: [{ type: "input_text", text: "Be concise." }] },
        { type: "message", role: "user", content: [{ type: "input_text", text: "Say hi" }] },
      ],
    };
    const result = normalizeForZedProxy(req);
    const input = result.input as Array<Record<string, unknown>>;
    assert.equal(input[0].role, "system", "developer role should be mapped to system");
    assert.equal(input[1].role, "user", "user role should be unchanged");
  });

  it("preserves system role unchanged", () => {
    const req = {
      input: [
        { type: "message", role: "system", content: [{ type: "input_text", text: "System prompt" }] },
        { type: "message", role: "user", content: [{ type: "input_text", text: "Hello" }] },
      ],
    };
    const result = normalizeForZedProxy(req);
    const input = result.input as Array<Record<string, unknown>>;
    assert.equal(input[0].role, "system", "system role should remain system");
  });

  it("preserves assistant and tool roles unchanged", () => {
    const req = {
      input: [
        { type: "message", role: "assistant", content: [{ type: "output_text", text: "Hi" }] },
        { type: "message", role: "tool", content: "result" },
      ],
    };
    const result = normalizeForZedProxy(req);
    const input = result.input as Array<Record<string, unknown>>;
    assert.equal(input[0].role, "assistant");
    assert.equal(input[1].role, "tool");
  });

  it("handles empty input array", () => {
    const req = { input: [] };
    const result = normalizeForZedProxy(req);
    assert.deepEqual(result.input, []);
  });

  it("handles req without input", () => {
    const req = { model: "gpt-5-nano" };
    const result = normalizeForZedProxy(req);
    assert.equal(result.input, undefined);
  });

  it("maps multiple developer items", () => {
    const req = {
      input: [
        { type: "message", role: "developer", content: [{ type: "input_text", text: "Block 1" }] },
        { type: "message", role: "developer", content: [{ type: "input_text", text: "Block 2" }] },
        { type: "message", role: "user", content: [{ type: "input_text", text: "Question" }] },
      ],
    };
    const result = normalizeForZedProxy(req);
    const input = result.input as Array<Record<string, unknown>>;
    assert.equal(input[0].role, "system");
    assert.equal(input[1].role, "system");
    assert.equal(input[2].role, "user");
  });

  it("skips null/undefined items in input", () => {
    const req = {
      input: [
        null,
        undefined,
        { type: "message", role: "developer", content: [{ type: "input_text", text: "Ok" }] },
      ],
    };
    const result = normalizeForZedProxy(req);
    const input = result.input as Array<Record<string, unknown>>;
    assert.equal(input[0], null);
    assert.equal(input[1], undefined);
    assert.equal(input[2].role, "system");
  });

  it("simulates Claude Code multi-system-message scenario", () => {
    // Claude Code sends multiple system messages that get converted to
    // developer role by the Responses API translator, then Zed rejects.
    const req = {
      model: "zed-hosted/gpt-5-nano",
      input: [
        { type: "message", role: "developer", content: [{ type: "input_text", text: "Main system prompt block 1" }] },
        { type: "message", role: "developer", content: [{ type: "input_text", text: "Main system prompt block 2" }] },
        { type: "message", role: "developer", content: [{ type: "input_text", text: "Injected reminder" }] },
        { type: "message", role: "user", content: [{ type: "input_text", text: "Hello" }] },
      ],
      max_output_tokens: 256,
    };
    const result = normalizeForZedProxy(req);
    const input = result.input as Array<Record<string, unknown>>;

    // All three developer-role items must be system
    assert.equal(input[0].role, "system");
    assert.equal(input[1].role, "system");
    assert.equal(input[2].role, "system");
    assert.equal(input[3].role, "user");
  });
});
