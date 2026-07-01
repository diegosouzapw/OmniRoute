/**
 * Unit tests for the tool limit detector.
 */

import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";

import {
  getEffectiveToolLimit,
  setDetectedToolLimit,
  parseToolLimitFromError,
  shouldDetectLimit,
  clearDetectedLimits,
} from "../../open-sse/services/toolLimitDetector.ts";

describe("toolLimitDetector", () => {
  beforeEach(() => {
    clearDetectedLimits();
  });

  it("should return default limit when no cached value", () => {
    assert.strictEqual(getEffectiveToolLimit("openai"), 128);
  });

  it("should return cached limit when available", () => {
    setDetectedToolLimit("openai", 100);
    assert.strictEqual(getEffectiveToolLimit("openai"), 100);
  });

  it("should only update cache when limit is lower", () => {
    setDetectedToolLimit("openai", 100);
    setDetectedToolLimit("openai", 120);
    assert.strictEqual(getEffectiveToolLimit("openai"), 100);
  });

  it("should parse tool limit from OpenAI error message", () => {
    const result = parseToolLimitFromError("'tools': maximum number of items is 128");
    assert.strictEqual(result, 128);
  });

  it("should parse tool limit from alternative format", () => {
    const result = parseToolLimitFromError("Maximum number of tools allowed is 64");
    assert.strictEqual(result, 64);
  });

  it("should return null for non-tool errors", () => {
    const result = parseToolLimitFromError("Invalid API key");
    assert.strictEqual(result, null);
  });

  it("should parse Grok-style error capturing the maximum (200), not the provided count (427)", () => {
    const result = parseToolLimitFromError(
      "Maximum tools limit reached. 427 tools have been provided but the maximum is 200."
    );
    assert.strictEqual(result, 200);
  });

  it("should parse Grok-style error without 'the' before maximum", () => {
    const result = parseToolLimitFromError("427 tools have been provided but maximum is 150");
    assert.strictEqual(result, 150);
  });

  it("should return proactive limit for grok-cli (200) without any detection", () => {
    assert.strictEqual(getEffectiveToolLimit("grok-cli"), 200);
  });

  it("should not override proactive limit with setDetectedToolLimit", () => {
    setDetectedToolLimit("grok-cli", 150);
    assert.strictEqual(getEffectiveToolLimit("grok-cli"), 200);
  });

  it("should still return default (128) for unknown providers", () => {
    assert.strictEqual(getEffectiveToolLimit("some-new-provider"), 128);
  });

  it("should detect tool limit errors for 400 status", () => {
    assert.strictEqual(shouldDetectLimit("Maximum number of tools is 128", 400), true);
    assert.strictEqual(shouldDetectLimit("Too many tools provided", 400), true);
    assert.strictEqual(shouldDetectLimit("Invalid API key", 400), false);
  });

  it("should not detect for non-400 errors", () => {
    assert.strictEqual(shouldDetectLimit("Maximum number of tools is 128", 500), false);
    assert.strictEqual(shouldDetectLimit("Maximum number of tools is 128", 429), false);
  });
});
