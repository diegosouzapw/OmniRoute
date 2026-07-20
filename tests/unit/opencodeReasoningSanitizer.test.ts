import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  isOpencodeGoProvider,
  stripBooleanReasoning,
} from "../../open-sse/services/opencodeReasoningSanitizer.ts";

describe("isOpencodeGoProvider", () => {
  it("returns true for ollama-cloud", () => {
    assert.equal(isOpencodeGoProvider("ollama-cloud"), true);
  });

  it("returns true for opencode-go", () => {
    assert.equal(isOpencodeGoProvider("opencode-go"), true);
  });

  it("returns true for opencode", () => {
    assert.equal(isOpencodeGoProvider("opencode"), true);
  });

  it("returns true for opencode-zen", () => {
    assert.equal(isOpencodeGoProvider("opencode-zen"), true);
  });

  it("returns false for other providers", () => {
    assert.equal(isOpencodeGoProvider("featherless-ai"), false);
    assert.equal(isOpencodeGoProvider("glm"), false);
    assert.equal(isOpencodeGoProvider("antigravity"), false);
    assert.equal(isOpencodeGoProvider(""), false);
  });
});

describe("stripBooleanReasoning", () => {
  it("removes reasoning when it is boolean true", () => {
    const body = { model: "glm-5.2", reasoning: true, messages: [] };
    const result = stripBooleanReasoning(body);
    assert.equal("reasoning" in result, false);
    assert.equal(result.model, "glm-5.2");
    assert.deepEqual(result.messages, []);
  });

  it("removes reasoning when it is boolean false", () => {
    const body = { model: "glm-5.2", reasoning: false, messages: [] };
    const result = stripBooleanReasoning(body);
    assert.equal("reasoning" in result, false);
  });

  it("does NOT remove reasoning when it is an object (structured type)", () => {
    const body = { model: "glm-5.2", reasoning: { effort: "high" }, messages: [] };
    const result = stripBooleanReasoning(body);
    assert.deepEqual(result.reasoning, { effort: "high" });
  });

  it("does NOT remove reasoning when it is a string", () => {
    const body = { model: "glm-5.2", reasoning: "high", messages: [] };
    const result = stripBooleanReasoning(body);
    assert.equal(result.reasoning, "high");
  });

  it("returns the same object reference when no reasoning field exists", () => {
    const body = { model: "glm-5.2", messages: [] };
    const result = stripBooleanReasoning(body);
    assert.equal(result, body);
  });

  it("returns the same object reference when reasoning is non-boolean", () => {
    const body = { model: "glm-5.2", reasoning: { effort: "low" }, messages: [] };
    const result = stripBooleanReasoning(body);
    assert.equal(result, body);
  });

  it("preserves other fields in the body", () => {
    const body = {
      model: "ollama-cloud/glm-5.2",
      reasoning: true,
      temperature: 0.7,
      stream: true,
      messages: [{ role: "user", content: "hi" }],
    };
    const result = stripBooleanReasoning(body);
    assert.equal(result.model, "ollama-cloud/glm-5.2");
    assert.equal(result.temperature, 0.7);
    assert.equal(result.stream, true);
    assert.deepEqual(result.messages, [{ role: "user", content: "hi" }]);
    assert.equal("reasoning" in result, false);
  });

  it("handles empty body object", () => {
    const body = {};
    const result = stripBooleanReasoning(body);
    assert.equal(result, body);
  });

  it("returns null/undefined/primitive bodies unchanged", () => {
    assert.equal(stripBooleanReasoning(null as unknown as Record<string, unknown>), null);
    assert.equal(stripBooleanReasoning(undefined as unknown as Record<string, unknown>), undefined);
    assert.equal(
      stripBooleanReasoning("not an object" as unknown as Record<string, unknown>),
      "not an object"
    );
    assert.equal(stripBooleanReasoning(42 as unknown as Record<string, unknown>), 42);
  });

  it("does not mutate the original body", () => {
    const body = { model: "glm-5.2", reasoning: true };
    const result = stripBooleanReasoning(body);
    assert.equal(body.reasoning, true);
    assert.equal("reasoning" in result, false);
  });
});
