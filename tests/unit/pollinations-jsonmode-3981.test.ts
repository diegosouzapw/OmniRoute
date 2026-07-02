import test from "node:test";
import assert from "node:assert/strict";

import { PollinationsExecutor } from "../../open-sse/executors/pollinations.ts";

// #3981: Pollinations rejects (HTTP 400 "messages must contain the word 'json'")
// any request with jsonMode=true whose messages don't mention "json". Setting
// jsonMode unconditionally broke every normal chat request. jsonMode must only
// be enabled when the caller actually requested JSON output.

test("#3981 transformRequest does NOT force jsonMode for a normal request", () => {
  const executor = new PollinationsExecutor();
  const body: any = {
    messages: [{ role: "user", content: "Hello there" }],
  };
  const out = executor.transformRequest("openai", body, true, null);
  assert.notEqual(out.jsonMode, true);
});

test("#3981 transformRequest enables jsonMode when response_format json_object is requested", () => {
  const executor = new PollinationsExecutor();
  const body: any = {
    messages: [{ role: "user", content: "Return json" }],
    response_format: { type: "json_object" },
  };
  const out = executor.transformRequest("openai", body, true, null);
  assert.equal(out.jsonMode, true);
});

test("#3981 transformRequest enables jsonMode when response_format json_schema is requested", () => {
  const executor = new PollinationsExecutor();
  const body: any = {
    messages: [{ role: "user", content: "Return structured json" }],
    response_format: { type: "json_schema", json_schema: { name: "x", schema: {} } },
  };
  const out = executor.transformRequest("openai", body, true, null);
  assert.equal(out.jsonMode, true);
});
