import { test } from "node:test";
import assert from "node:assert/strict";

// This file tests the regex/matching logic of detectUnsupportedParam and the
// UNSUPPORTED_PARAM_RE constant. These are pure functions with no DB dependency.
// DB-backed persistence tests (addParamToBlocklist) live in param-filters-db.test.ts.
import {
  UNSUPPORTED_PARAM_RE,
  detectUnsupportedParam,
} from "../../open-sse/config/providerFieldStrips.ts";

// ---------------------------------------------------------------------------
// UNSUPPORTED_PARAM_RE
// ---------------------------------------------------------------------------

test("UNSUPPORTED_PARAM_RE matches NIM-style 'Unsupported parameter(s): thinking'", () => {
  const m = UNSUPPORTED_PARAM_RE.exec("Unsupported parameter(s): thinking");
  assert.notEqual(m, null);
  assert.equal(m![1], "thinking");
});

test("UNSUPPORTED_PARAM_RE matches 'Unsupported parameter: max_tokens'", () => {
  const m = UNSUPPORTED_PARAM_RE.exec("Unsupported parameter: max_tokens");
  assert.notEqual(m, null);
  assert.equal(m![1], "max_tokens");
});

test("UNSUPPORTED_PARAM_RE matches 'Unsupported parameter 'reasoning_budget''", () => {
  const m = UNSUPPORTED_PARAM_RE.exec("Unsupported parameter 'reasoning_budget'");
  assert.notEqual(m, null);
  assert.equal(m![1], "reasoning_budget");
});

test("UNSUPPORTED_PARAM_RE matches case-insensitively", () => {
  const m = UNSUPPORTED_PARAM_RE.exec("unsupported parameter(s): thinking");
  assert.notEqual(m, null);
  assert.equal(m![1], "thinking");
});

test("UNSUPPORTED_PARAM_RE does not match unrelated error text", () => {
  assert.equal(UNSUPPORTED_PARAM_RE.exec("rate limit exceeded"), null);
  assert.equal(UNSUPPORTED_PARAM_RE.exec("Internal server error"), null);
  assert.equal(UNSUPPORTED_PARAM_RE.exec(""), null);
});

// ---------------------------------------------------------------------------
// detectUnsupportedParam
// ---------------------------------------------------------------------------

test("detectUnsupportedParam extracts param name from NIM-style errors", () => {
  assert.equal(detectUnsupportedParam("Unsupported parameter(s): thinking"), "thinking");
  assert.equal(
    detectUnsupportedParam("Unsupported parameter: reasoning_budget"),
    "reasoning_budget"
  );
  assert.equal(detectUnsupportedParam("Unsupported parameter 'max_tokens'"), "max_tokens");
});

test("detectUnsupportedParam returns null for non-matching text", () => {
  assert.equal(detectUnsupportedParam("all good"), null);
  assert.equal(detectUnsupportedParam(""), null);
  assert.equal(detectUnsupportedParam("400 Bad Request"), null);
});

test("detectUnsupportedParam returns null for null/undefined", () => {
  assert.equal(detectUnsupportedParam(null as unknown as string), null);
  assert.equal(detectUnsupportedParam(undefined as unknown as string), null);
});

test("detectUnsupportedParam extracts param from Anthropic 'is deprecated for this model'", () => {
  assert.equal(
    detectUnsupportedParam(
      '{"type":"error","error":{"type":"invalid_request_error","message":"`temperature` is deprecated for this model."}}'
    ),
    "temperature"
  );
  assert.equal(
    detectUnsupportedParam(
      "The model returned the following errors: `temperature` is deprecated for this model."
    ),
    "temperature"
  );
});

test("detectUnsupportedParam ignores unquoted 'is deprecated' prose", () => {
  assert.equal(detectUnsupportedParam("This endpoint is deprecated"), null);
  assert.equal(detectUnsupportedParam("This model is deprecated for new users"), null);
});

test("detectUnsupportedParam never returns structural request keys", () => {
  assert.equal(detectUnsupportedParam("`model` is deprecated for this model."), null);
  assert.equal(detectUnsupportedParam("`messages` is deprecated"), null);
  assert.equal(detectUnsupportedParam("Unsupported parameter: model"), null);
});
