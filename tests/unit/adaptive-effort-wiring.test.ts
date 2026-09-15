// chatCore adaptive-effort wiring tests (#13448).
//
// The wiring module is the chatCore call-site adapter extracted from
// chatCore.ts (file-size gate: that file cannot grow). The service-level
// tests in adaptive-effort.test.ts cover resolution semantics; THESE tests
// cover the adapter's own decisions, which are invisible to the service:
//   - explicit client reasoning fields are never overwritten (precedence),
//   - the literal "auto" injected by ModelSpec.defaultReasoningEffort is an
//     opt-in marker and must be stripped before resolution, not sent upstream,
//   - the x-omniroute-effort header opts in independently,
//   - a non-opted-in body is returned untouched (same reference).
import { test } from "node:test";
import assert from "node:assert/strict";
import { wireAdaptiveEffort } from "@omniroute/open-sse/handlers/chatCore/adaptiveEffortWiring.ts";

const HEAVY = "x".repeat(20000);
const trivialMsgs = [{ role: "user", content: "list the files" }];
const heavyMsgs = [{ role: "user", content: HEAVY }];

test("explicit reasoning_effort is never overwritten by adaptive wiring", () => {
  const body = { model: "m", reasoning_effort: "low" };
  const out = wireAdaptiveEffort(body, { rawBody: { messages: heavyMsgs }, headerEffort: "auto" });
  assert.equal(out.reasoning_effort, "low");
});

test("explicit reasoning object is never overwritten", () => {
  const body = { model: "m", reasoning: { effort: "high" } };
  const out = wireAdaptiveEffort(body, {
    rawBody: { messages: trivialMsgs },
    headerEffort: "auto",
  });
  assert.deepEqual(out.reasoning, { effort: "high" });
  assert.equal(out.reasoning_effort, undefined);
});

test("explicit thinking field is never overwritten", () => {
  const body = { model: "m", thinking: { type: "enabled" } };
  const out = wireAdaptiveEffort(body, { rawBody: { messages: heavyMsgs }, headerEffort: "auto" });
  assert.deepEqual(out.thinking, { type: "enabled" });
  assert.equal(out.reasoning_effort, undefined);
});

test("model-default 'auto' marker is resolved, never sent upstream verbatim", () => {
  const body = { model: "m", reasoning_effort: "auto" };
  const out = wireAdaptiveEffort(body, { rawBody: { messages: trivialMsgs }, headerEffort: null });
  assert.notEqual(out.reasoning_effort, "auto");
  assert.equal(out.reasoning_effort, "low");
});

test("model-default 'auto' resolves high on heavy turns", () => {
  const body = { model: "m", reasoning_effort: "auto" };
  const out = wireAdaptiveEffort(body, { rawBody: { messages: heavyMsgs }, headerEffort: null });
  assert.equal(out.reasoning_effort, "high");
});

test("header opt-in resolves from the raw (pre-translation) body messages", () => {
  const body = { model: "m" };
  const out = wireAdaptiveEffort(body, { rawBody: { messages: heavyMsgs }, headerEffort: "auto" });
  assert.equal(out.reasoning_effort, "high");
});

test("no opt-in leaves the body untouched (same reference)", () => {
  const body = { model: "m" };
  const out = wireAdaptiveEffort(body, { rawBody: { messages: heavyMsgs }, headerEffort: null });
  assert.equal(out, body);
  assert.equal(out.reasoning_effort, undefined);
});

test("missing rawBody does not throw", () => {
  const body = { model: "m", reasoning_effort: "auto" };
  const out = wireAdaptiveEffort(body, { rawBody: undefined, headerEffort: null });
  assert.ok(["low", "medium", "high"].includes(out.reasoning_effort as string));
});
