import { test } from "node:test";
import assert from "node:assert/strict";
import { compressContext } from "../../../open-sse/services/contextManager.ts";

/**
 * Plan-A root fix for the 2026-08-22 tokenrouter 400s. purifyHistory() used to
 * splice the `[Context compressed: …]` notice as a SECOND system-role message at
 * index system.length; strict gateways (TokenRouter, xiaomi-mimo/mimo) reject any
 * system message at index > 0 with HTTP 400 "System message must be at the
 * beginning". The notice must now merge into the leading system/developer
 * message — or prepend a single system message when none exists — so the output
 * never contains a system role after index 0, for ANY provider.
 */

function bigTurn(n: number) {
  return { role: "user", content: `turn ${n}: ${"x".repeat(4_000)}` };
}

function run(body: Record<string, unknown>) {
  // ~30k tokens of history vs a small target forces Layer-3 purify_history.
  return compressContext(body, { maxTokens: 5_000, reserveTokens: 0 });
}

function systemIndices(messages: Array<{ role: string }>) {
  return messages.map((m, i) => (m.role === "system" ? i : -1)).filter((i) => i >= 0);
}

test("purify_history merges dropped-notice into existing leading system message", () => {
  const body = {
    model: "any-model",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      ...Array.from({ length: 12 }, (_, i) => bigTurn(i)),
    ],
  };
  const result = run(body);
  assert.equal(result.compressed, true);
  const messages = (result.body as { messages: Array<Record<string, unknown>> }).messages;
  assert.deepEqual(systemIndices(messages as Array<{ role: string }>).slice(1), []);
  const first = messages[0];
  assert.equal(first.role, "system");
  const text = String(first.content);
  assert.match(text, /Context compressed: \d+ earlier messages removed/);
  assert.match(text, /You are a helpful assistant\./);
});

test("purify_history prepends a single system notice when no system message exists", () => {
  const body = {
    model: "any-model",
    messages: Array.from({ length: 12 }, (_, i) => bigTurn(i)),
  };
  const result = run(body);
  assert.equal(result.compressed, true);
  const messages = (result.body as { messages: Array<Record<string, unknown>> }).messages;
  assert.deepEqual(systemIndices(messages as Array<{ role: string }>), [0]);
  assert.match(String(messages[0].content), /Context compressed: \d+ earlier messages removed/);
});

test("purify_history merges into leading developer message without adding a second one", () => {
  const body = {
    model: "any-model",
    messages: [
      { role: "developer", content: "dev instructions" },
      ...Array.from({ length: 12 }, (_, i) => bigTurn(i)),
    ],
  };
  const result = run(body);
  assert.equal(result.compressed, true);
  const messages = (result.body as { messages: Array<Record<string, unknown>> }).messages;
  assert.deepEqual(
    messages.filter((m) => m.role === "developer").length,
    1,
    "exactly one developer message"
  );
  assert.match(String(messages[0].content), /Context compressed: \d+ earlier messages removed/);
  assert.match(String(messages[0].content), /dev instructions/);
});

test("no compression means no notice and untouched history", () => {
  const body = {
    model: "any-model",
    messages: [
      { role: "system", content: "sys" },
      { role: "user", content: "hi" },
    ],
  };
  const result = run(body);
  assert.equal(result.compressed, false);
  const messages = (result.body as { messages: unknown[] }).messages;
  assert.equal(messages.length, 2);
});
