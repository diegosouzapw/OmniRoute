/**
 * TDD tests for port of upstream PR #2054 (decolua/9router):
 *   fix(antigravity): retry transient upstream failures
 *
 * Covers:
 *   1. isTransientAntigravityError classifies 5xx + body patterns correctly
 *   2. extractErrorMessage extracts message from various JSON shapes
 *   3. Tool-name deduplication in buildGeminiTools (via geminiToolsSanitizer)
 */

import { test } from "node:test";
import assert from "node:assert/strict";

import { AntigravityExecutor } from "../../open-sse/executors/antigravity.ts";
import { buildGeminiTools } from "../../open-sse/translator/helpers/geminiToolsSanitizer.ts";

// ── isTransientAntigravityError ────────────────────────────────────────────────

test("isTransientAntigravityError: 503 → true (transient status)", () => {
  const ex = new AntigravityExecutor();
  assert.equal(ex.isTransientAntigravityError(503, ""), true);
});

test("isTransientAntigravityError: 500 + 'Agent execution terminated due to error' body → true", () => {
  const ex = new AntigravityExecutor();
  assert.equal(
    ex.isTransientAntigravityError(500, "Agent execution terminated due to error"),
    true
  );
});

test("isTransientAntigravityError: 500 + 'high traffic' body → true", () => {
  const ex = new AntigravityExecutor();
  assert.equal(ex.isTransientAntigravityError(500, "high traffic"), true);
});

test("isTransientAntigravityError: 500 + 'capacity' body → true", () => {
  const ex = new AntigravityExecutor();
  assert.equal(ex.isTransientAntigravityError(500, "service is at capacity"), true);
});

test("isTransientAntigravityError: 400 + 'Invalid request' body → false (veto)", () => {
  const ex = new AntigravityExecutor();
  assert.equal(ex.isTransientAntigravityError(400, "Invalid request"), false);
});

test("isTransientAntigravityError: 404 → false", () => {
  const ex = new AntigravityExecutor();
  assert.equal(ex.isTransientAntigravityError(404, "not found"), false);
});

test("isTransientAntigravityError: 429 → true (rate limited is transient)", () => {
  const ex = new AntigravityExecutor();
  assert.equal(ex.isTransientAntigravityError(429, ""), true);
});

test("isTransientAntigravityError: 502 → true (bad gateway is transient)", () => {
  const ex = new AntigravityExecutor();
  assert.equal(ex.isTransientAntigravityError(502, ""), true);
});

test("isTransientAntigravityError: 504 → true (gateway timeout is transient)", () => {
  const ex = new AntigravityExecutor();
  assert.equal(ex.isTransientAntigravityError(504, ""), true);
});

// ── extractErrorMessage ────────────────────────────────────────────────────────

test("extractErrorMessage: extracts error.message from standard JSON shape", () => {
  const ex = new AntigravityExecutor();
  const json = { error: { message: "quota exceeded" } };
  const msg = ex.extractErrorMessage(json, "");
  assert.ok(msg.includes("quota exceeded"), `expected 'quota exceeded' in: ${msg}`);
});

test("extractErrorMessage: falls back to top-level message field", () => {
  const ex = new AntigravityExecutor();
  const json = { message: "service unavailable" };
  const msg = ex.extractErrorMessage(json, "");
  assert.ok(msg.includes("service unavailable"), `expected 'service unavailable' in: ${msg}`);
});

test("extractErrorMessage: falls back to bodyText when json has no message", () => {
  const ex = new AntigravityExecutor();
  const msg = ex.extractErrorMessage(null, "raw error body text");
  assert.ok(msg.includes("raw error body text"), `expected body text in: ${msg}`);
});

// ── Tool-name deduplication ────────────────────────────────────────────────────

test("buildGeminiTools: deduplicates tool names that sanitize to the same value", () => {
  // "read/file" and "read/file" appear twice → only one after dedup
  const tools = [
    {
      functionDeclarations: [
        {
          name: "read/file",
          description: "Read a file",
          parameters: { type: "object", properties: {} },
        },
        {
          name: "read/file",
          description: "Read a file (dup)",
          parameters: { type: "object", properties: {} },
        },
      ],
    },
  ];

  const result = buildGeminiTools(tools);
  assert.ok(Array.isArray(result), "should return array");
  const decls = result![0]?.functionDeclarations ?? [];
  // After sanitizing "read/file" → "read_file", both resolve to same name; only 1 should remain
  const names = decls.map((d) => d.name);
  assert.equal(new Set(names).size, names.length, `Duplicate names found: ${names}`);
  assert.equal(names.length, 1, `Expected 1 declaration, got ${names.length}: ${names}`);
});

test("buildGeminiTools: tools with different sanitized names are both kept", () => {
  const tools = [
    {
      functionDeclarations: [
        {
          name: "read_file",
          description: "Read a file",
          parameters: { type: "object", properties: {} },
        },
        {
          name: "write_file",
          description: "Write a file",
          parameters: { type: "object", properties: {} },
        },
      ],
    },
  ];

  const result = buildGeminiTools(tools);
  assert.ok(Array.isArray(result), "should return array");
  const decls = result![0]?.functionDeclarations ?? [];
  assert.equal(decls.length, 2, `Expected 2 declarations, got ${decls.length}`);
});
