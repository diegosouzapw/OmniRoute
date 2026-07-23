/**
 * Codex verbosity normalization — `normalizeCodexVerbosity`.
 *
 * GPT-5 verbosity is `verbosity` on Chat Completions and `text.verbosity` on the Responses
 * API. The CodexExecutor allowlist drops `text`, so translated requests lose the hint. These
 * tests pin the fold into a single validated `text:{verbosity}` (or its removal when invalid),
 * which — paired with `text` added to the allowlist — lets verbosity reach the Codex backend.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { normalizeCodexVerbosity } from "../../open-sse/services/codexVerbosity.ts";

test("chat-style top-level verbosity is lifted to text.verbosity and dropped", () => {
  const body: Record<string, unknown> = { model: "gpt-5.5", verbosity: "low", input: [] };
  normalizeCodexVerbosity(body);
  assert.deepEqual(body.text, { verbosity: "low" });
  assert.equal(body.verbosity, undefined);
});

test("existing Responses text.verbosity is preserved", () => {
  const body: Record<string, unknown> = { text: { verbosity: "high" }, input: [] };
  normalizeCodexVerbosity(body);
  assert.deepEqual(body.text, { verbosity: "high" });
});

test("chat-style verbosity takes precedence when both shapes are present", () => {
  const body: Record<string, unknown> = { verbosity: "medium", text: { verbosity: "high" } };
  normalizeCodexVerbosity(body);
  assert.deepEqual(body.text, { verbosity: "medium" });
  assert.equal(body.verbosity, undefined);
});

test("invalid verbosity is dropped and text removed", () => {
  const body: Record<string, unknown> = { verbosity: "ultra", input: [] };
  normalizeCodexVerbosity(body);
  assert.equal(body.text, undefined);
  assert.equal(body.verbosity, undefined);
});

test("no verbosity + Responses text.format is preserved", () => {
  const format = { type: "json_schema", name: "schema", schema: { type: "object" } };
  const body: Record<string, unknown> = { text: { format }, input: [] };
  normalizeCodexVerbosity(body);
  assert.deepEqual(body.text, { format });
});

test("verbosity is merged with existing Responses text.format", () => {
  const format = { type: "json_schema", name: "schema", schema: { type: "object" } };
  const body: Record<string, unknown> = { verbosity: "low", text: { format }, input: [] };
  normalizeCodexVerbosity(body);
  assert.deepEqual(body.text, { format, verbosity: "low" });
  assert.equal(body.verbosity, undefined);
});

test("verbosity is normalized case-insensitively", () => {
  const body: Record<string, unknown> = { verbosity: "HIGH" };
  normalizeCodexVerbosity(body);
  assert.deepEqual(body.text, { verbosity: "high" });
});

test("body without any verbosity is left without a text field", () => {
  const body: Record<string, unknown> = { model: "gpt-5.5", input: [] };
  normalizeCodexVerbosity(body);
  assert.equal(body.text, undefined);
  assert.equal(body.model, "gpt-5.5");
});
