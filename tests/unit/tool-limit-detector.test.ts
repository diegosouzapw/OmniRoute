import test from "node:test";
import assert from "node:assert/strict";

const {
  getDetectedToolLimit,
  setDetectedToolLimit,
  parseToolLimitFromError,
  shouldDetectLimit,
  clearToolLimitCache,
} = await import("../../open-sse/services/toolLimitDetector.ts");

test("getDetectedToolLimit returns default 128 when no cache", () => {
  clearToolLimitCache();
  assert.equal(getDetectedToolLimit("openai"), 128);
});

test("setDetectedToolLimit stores limit in cache", () => {
  clearToolLimitCache();
  setDetectedToolLimit("custom-provider", 64);
  assert.equal(getDetectedToolLimit("custom-provider"), 64);
});

test("setDetectedToolLimit updates existing provider", () => {
  clearToolLimitCache();
  setDetectedToolLimit("test-provider", 100);
  setDetectedToolLimit("test-provider", 50);
  assert.equal(getDetectedToolLimit("test-provider"), 50);
});

test("parseToolLimitFromError extracts limit from OpenAI error", () => {
  const result = parseToolLimitFromError("{'tools': maximum number of items is 128}", 400);
  assert.equal(result, 128);
});

test("parseToolLimitFromError extracts limit from alternate format", () => {
  const result = parseToolLimitFromError("Maximum number of tools is 64", 400);
  assert.equal(result, 64);
});

test("parseToolLimitFromError extracts limit from 'too many tools' format", () => {
  const result = parseToolLimitFromError("Too many tools. Maximum allowed is 96.", 400);
  assert.equal(result, 96);
});

test("parseToolLimitFromError returns null for non-400 status", () => {
  const result = parseToolLimitFromError("Some error", 500);
  assert.equal(result, null);
});

test("parseToolLimitFromError returns null when no match", () => {
  const result = parseToolLimitFromError("Some unrelated error", 400);
  assert.equal(result, null);
});

test("shouldDetectLimit returns true for tool-related 400 errors", () => {
  assert.equal(shouldDetectLimit("'tools': maximum number of items is 128", 400), true);
  assert.equal(shouldDetectLimit("Maximum number of tools is 64", 400), true);
});

test("shouldDetectLimit returns false for non-400 status", () => {
  assert.equal(shouldDetectLimit("Error message", 500), false);
});

test("shouldDetectLimit returns false for non-tool errors", () => {
  assert.equal(shouldDetectLimit("Invalid API key", 400), false);
});

test("getDetectedToolLimit falls back to default for unknown provider", () => {
  clearToolLimitCache();
  assert.equal(getDetectedToolLimit("unknown-provider"), 128);
});

test("cache respects TTL - returns cached value within TTL", () => {
  clearToolLimitCache();
  setDetectedToolLimit("temp-provider", 32);
  assert.equal(getDetectedToolLimit("temp-provider"), 32);
});
