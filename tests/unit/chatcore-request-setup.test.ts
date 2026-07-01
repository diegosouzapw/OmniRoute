// tests/unit/chatcore-request-setup.test.ts
// Characterization of resolveChatCoreRequestSetup — the first extracted pure slice of
// chatCore's request-setup phase (god-file decomposition). Locks the structural-narrowing
// of apiFormat/targetFormat and the requestedModel fallback.
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  mergeUnsupportedParams,
  resolveChatCoreRequestSetup,
} from "../../open-sse/handlers/chatCore/requestSetup.ts";

test("reads apiFormat / targetFormat / unsupportedParams from modelInfo", () => {
  const r = resolveChatCoreRequestSetup(
    { apiFormat: "responses", targetFormat: "openai", unsupportedParams: ["temperature", 123] },
    { model: "gpt-4o" },
    "resolved-model"
  );
  assert.equal(r.apiFormat, "responses");
  assert.equal(r.customModelTargetFormat, "openai");
  assert.deepEqual(r.customModelUnsupportedParams, ["temperature"]);
});

test("apiFormat / targetFormat absent or non-string → undefined", () => {
  assert.equal(resolveChatCoreRequestSetup({}, {}, "m").apiFormat, undefined);
  assert.equal(resolveChatCoreRequestSetup({ apiFormat: 123 }, {}, "m").apiFormat, undefined);
  assert.equal(
    resolveChatCoreRequestSetup({ targetFormat: null }, {}, "m").customModelTargetFormat,
    undefined
  );
  assert.equal(
    resolveChatCoreRequestSetup({ unsupportedParams: "temperature" }, {}, "m")
      .customModelUnsupportedParams,
    undefined
  );
});

test("modelInfo that is not an object → both markers undefined", () => {
  const r = resolveChatCoreRequestSetup(null, { model: "x" }, "m");
  assert.equal(r.apiFormat, undefined);
  assert.equal(r.customModelTargetFormat, undefined);
  assert.equal(r.customModelUnsupportedParams, undefined);
});

test("requestedModel uses the client body.model when it is a non-blank string", () => {
  assert.equal(
    resolveChatCoreRequestSetup({}, { model: "claude-3" }, "fallback").requestedModel,
    "claude-3"
  );
});

test("requestedModel falls back to the resolved model id when body.model is blank/absent/non-string", () => {
  assert.equal(
    resolveChatCoreRequestSetup({}, { model: "   " }, "fallback").requestedModel,
    "fallback"
  );
  assert.equal(resolveChatCoreRequestSetup({}, {}, "fallback").requestedModel, "fallback");
  assert.equal(
    resolveChatCoreRequestSetup({}, { model: 42 }, "fallback").requestedModel,
    "fallback"
  );
  assert.equal(resolveChatCoreRequestSetup({}, null, "fallback").requestedModel, "fallback");
});

test("mergeUnsupportedParams combines registry and provider-first model config params", () => {
  assert.deepEqual(
    mergeUnsupportedParams(["temperature", "top_p"], ["temperature", "presence_penalty"]),
    ["temperature", "top_p", "presence_penalty"]
  );
  assert.deepEqual(mergeUnsupportedParams(undefined, ["temperature"]), ["temperature"]);
});
