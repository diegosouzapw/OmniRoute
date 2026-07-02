import test from "node:test";
import assert from "node:assert/strict";

const {
  isBackgroundTask,
  getBackgroundTaskReason,
  getDegradedModel,
  setBackgroundDegradationConfig,
  getBackgroundDegradationConfig,
  getDefaultDegradationMap,
  getDefaultDetectionPatterns,
  resetStats,
} = await import("../../open-sse/services/backgroundTaskDetector.ts");

// ─── isBackgroundTask ───────────────────────────────────────────────────────

test("isBackgroundTask: returns true for title generation pattern", () => {
  setBackgroundDegradationConfig({ enabled: true });
  const body = {
    model: "claude-sonnet-4",
    messages: [
      { role: "system", content: "Generate a title for this conversation" },
      { role: "user", content: "How to deploy a Next.js app" },
    ],
  };
  assert.equal(isBackgroundTask(body), true);
});

test("isBackgroundTask: returns true for summarize pattern", () => {
  const body = {
    model: "claude-sonnet-4",
    messages: [
      { role: "system", content: "Summarize this conversation briefly" },
      { role: "user", content: "We discussed deployment techniques" },
    ],
  };
  assert.equal(isBackgroundTask(body), true);
});

test("isBackgroundTask: returns false for normal chat", () => {
  const body = {
    model: "claude-sonnet-4",
    messages: [
      { role: "system", content: "You are a helpful coding assistant" },
      { role: "user", content: "Help me write a function" },
    ],
  };
  assert.equal(isBackgroundTask(body), false);
});

test("isBackgroundTask: returns false for many-turn conversations", () => {
  const messages = [
    { role: "system", content: "Generate a title" },
    ...Array.from({ length: 10 }, (_, i) => ({
      role: i % 2 === 0 ? "user" : "assistant",
      content: `Message ${i}`,
    })),
  ];
  const body = { model: "claude-sonnet-4", messages };
  assert.equal(isBackgroundTask(body), false); // Too many turns
});

test("isBackgroundTask: detects X-Request-Priority header", () => {
  const body = {
    model: "claude-sonnet-4",
    messages: [{ role: "user", content: "hello" }],
  };
  const headers = { "x-request-priority": "background" };
  assert.equal(isBackgroundTask(body, headers), true);
});

test("isBackgroundTask: detects X-Task-Type header", () => {
  const body = {
    model: "claude-sonnet-4",
    messages: [{ role: "user", content: "hello" }],
  };
  const headers = { "x-task-type": "background" };
  assert.equal(isBackgroundTask(body, headers), true);
  assert.equal(getBackgroundTaskReason(body, headers), "header_background");
});

test("isBackgroundTask: detects low max_tokens requests", () => {
  const body = {
    model: "claude-sonnet-4",
    max_tokens: 32,
    messages: [{ role: "user", content: "hello" }],
  };
  assert.equal(isBackgroundTask(body), true);
  assert.equal(getBackgroundTaskReason(body), "low_max_tokens");
});

test("isBackgroundTask: returns false for null/undefined body", () => {
  assert.equal(isBackgroundTask(null), false);
  assert.equal(isBackgroundTask(undefined), false);
});

test("isBackgroundTask: returns false for empty messages", () => {
  assert.equal(isBackgroundTask({ messages: [] }), false);
});

// ─── getDegradedModel ───────────────────────────────────────────────────────

test("getDegradedModel: returns cheaper model from map", () => {
  resetStats();
  assert.equal(getDegradedModel("claude-opus-4-6"), "gemini-3-flash");
  assert.equal(getDegradedModel("gemini-2.5-pro"), "gemini-3-flash");
  assert.equal(getDegradedModel("gpt-4o"), "gpt-4o-mini");
});

test("getDegradedModel: returns original if no mapping exists", () => {
  assert.equal(getDegradedModel("some-unknown-model"), "some-unknown-model");
});

test("getDegradedModel: handles null/empty", () => {
  assert.equal(getDegradedModel(""), "");
  assert.equal(getDegradedModel(null), null);
});

test("getDegradedModel: increments stats counter", () => {
  resetStats();
  getDegradedModel("claude-opus-4-6"); // known mapping
  const config = getBackgroundDegradationConfig();
  assert.equal(config.stats.detected, 1);
});

// ─── Config Management ──────────────────────────────────────────────────────

test("getBackgroundDegradationConfig: returns config copy", () => {
  const config = getBackgroundDegradationConfig();
  assert.ok(typeof config.enabled === "boolean");
  assert.ok(typeof config.degradationMap === "object");
  assert.ok(Array.isArray(config.detectionPatterns));
});

test("setBackgroundDegradationConfig: updates config", () => {
  setBackgroundDegradationConfig({ enabled: true });
  assert.equal(getBackgroundDegradationConfig().enabled, true);
  setBackgroundDegradationConfig({ enabled: false }); // reset
});

test("getDefaultDegradationMap: returns non-empty map", () => {
  const map = getDefaultDegradationMap();
  assert.ok(Object.keys(map).length > 0);
  assert.ok(map["claude-opus-4-6"]);
});

test("getDefaultDetectionPatterns: returns non-empty array", () => {
  const patterns = getDefaultDetectionPatterns();
  assert.ok(patterns.length > 0);
  assert.ok(patterns.includes("generate a title"));
});
