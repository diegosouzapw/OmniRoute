import test from "node:test";
import assert from "node:assert/strict";
import {
  evaluateResponseValidation,
  resolveJsonPath,
  parseJsonPath,
  extractContentText,
  type ResponseValidationConfig,
} from "../../open-sse/services/combo/responseValidation.ts";

// Feature 4985 — configurable response-body validation predicate.

const chat = (content: string | null, extra: Record<string, unknown> = {}) => ({
  choices: [{ message: { content, ...extra } }],
});

test("no config → always valid", () => {
  assert.deepEqual(evaluateResponseValidation(chat("anything"), undefined), { valid: true });
  assert.deepEqual(evaluateResponseValidation(chat("anything"), null), { valid: true });
  assert.deepEqual(evaluateResponseValidation(chat("anything"), {}), { valid: true });
});

test("forbiddenSubstrings: fails when the content contains one", () => {
  const cfg: ResponseValidationConfig = { forbiddenSubstrings: ["I cannot help", "as an AI"] };
  assert.equal(evaluateResponseValidation(chat("Sure, here you go"), cfg).valid, true);
  const bad = evaluateResponseValidation(chat("Sorry, I cannot help with that"), cfg);
  assert.equal(bad.valid, false);
  assert.match(bad.reason ?? "", /forbidden substring/);
});

test("requiredSubstrings: fails when a required substring is missing", () => {
  const cfg: ResponseValidationConfig = { requiredSubstrings: ["```"] };
  assert.equal(evaluateResponseValidation(chat("```js\ncode\n```"), cfg).valid, true);
  assert.equal(evaluateResponseValidation(chat("no fence here"), cfg).valid, false);
});

test("minContentLength: fails on near-empty content", () => {
  const cfg: ResponseValidationConfig = { minContentLength: 10 };
  assert.equal(evaluateResponseValidation(chat("plenty of characters here"), cfg).valid, true);
  assert.equal(evaluateResponseValidation(chat("   hi   "), cfg).valid, false);
});

test("jsonPathPredicates: exists / nonEmpty / equals / notEquals", () => {
  const body = chat("hello", { tool_calls: [] });
  (body as Record<string, unknown>).usage = { total_tokens: 0 };
  (body.choices[0] as Record<string, unknown>).finish_reason = "stop";

  assert.equal(
    evaluateResponseValidation(body, {
      jsonPathPredicates: [{ path: "choices[0].message.content", condition: "nonEmpty" }],
    }).valid,
    true
  );
  assert.equal(
    evaluateResponseValidation(body, {
      jsonPathPredicates: [{ path: "choices[0].message.refusal", condition: "exists" }],
    }).valid,
    false
  );
  assert.equal(
    evaluateResponseValidation(body, {
      jsonPathPredicates: [{ path: "choices[0].finish_reason", condition: "equals", value: "stop" }],
    }).valid,
    true
  );
  assert.equal(
    evaluateResponseValidation(body, {
      jsonPathPredicates: [
        { path: "choices[0].finish_reason", condition: "notEquals", value: "content_filter" },
      ],
    }).valid,
    true
  );
  assert.equal(
    evaluateResponseValidation(body, {
      jsonPathPredicates: [{ path: "choices[0].finish_reason", condition: "equals", value: "length" }],
    }).valid,
    false
  );
});

test("the first failing check wins; otherwise valid", () => {
  const cfg: ResponseValidationConfig = {
    forbiddenSubstrings: ["BAD"],
    requiredSubstrings: ["GOOD"],
    minContentLength: 3,
  };
  assert.equal(evaluateResponseValidation(chat("this is GOOD enough"), cfg).valid, true);
  assert.equal(evaluateResponseValidation(chat("this is BAD and GOOD"), cfg).valid, false);
});

test("parseJsonPath tokenizes dot + bracket paths without regex", () => {
  assert.deepEqual(parseJsonPath("choices[0].message.content"), ["choices", 0, "message", "content"]);
  assert.deepEqual(parseJsonPath("a[1][2].b"), ["a", 1, 2, "b"]);
  assert.deepEqual(parseJsonPath("plain"), ["plain"]);
});

test("resolveJsonPath returns undefined for missing hops (no throw)", () => {
  const obj = { choices: [{ message: { content: "x" } }] };
  assert.equal(resolveJsonPath(obj, "choices[0].message.content"), "x");
  assert.equal(resolveJsonPath(obj, "choices[5].message.content"), undefined);
  assert.equal(resolveJsonPath(obj, "a.b.c"), undefined);
  assert.equal(resolveJsonPath(null, "a.b"), undefined);
});

test("extractContentText handles string, array parts, and Responses API output", () => {
  assert.equal(extractContentText(chat("hello")), "hello");
  assert.equal(
    extractContentText({ choices: [{ message: { content: [{ text: "a" }, { text: "b" }] } }] }),
    "ab"
  );
  assert.equal(
    extractContentText({ output: [{ content: [{ text: "resp" }] }] }),
    "resp"
  );
  assert.equal(extractContentText({}), "");
});
