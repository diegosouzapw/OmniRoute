import { test } from "node:test";
import assert from "node:assert/strict";
import { shouldRunServerOwnedToolLoop } from "../../../open-sse/handlers/chatCore/serverOwnedToolLoopGate.ts";
import { FORMATS } from "../../../open-sse/translator/formats.ts";

test("flag-off never runs the loop", () => {
  assert.equal(
    shouldRunServerOwnedToolLoop({
      enabled: false,
      stream: false,
      isResponsesEndpoint: false,
      sourceFormat: FORMATS.OPENAI,
    }),
    false
  );
});

test("streaming never runs the loop", () => {
  assert.equal(
    shouldRunServerOwnedToolLoop({
      enabled: true,
      stream: true,
      isResponsesEndpoint: false,
      sourceFormat: FORMATS.OPENAI,
    }),
    false
  );
});

test("Responses endpoint and format keep the old path", () => {
  assert.equal(
    shouldRunServerOwnedToolLoop({
      enabled: true,
      stream: false,
      isResponsesEndpoint: true,
      sourceFormat: FORMATS.OPENAI,
    }),
    false
  );
  assert.equal(
    shouldRunServerOwnedToolLoop({
      enabled: true,
      stream: false,
      isResponsesEndpoint: false,
      sourceFormat: FORMATS.OPENAI_RESPONSES,
    }),
    false
  );
});

test("non-streaming Chat and Claude run the loop when enabled", () => {
  assert.equal(
    shouldRunServerOwnedToolLoop({
      enabled: true,
      stream: false,
      isResponsesEndpoint: false,
      sourceFormat: FORMATS.OPENAI,
    }),
    true
  );
  assert.equal(
    shouldRunServerOwnedToolLoop({
      enabled: true,
      stream: false,
      isResponsesEndpoint: false,
      sourceFormat: FORMATS.CLAUDE,
    }),
    true
  );
});

test("gemini and other source formats keep the old path", () => {
  assert.equal(
    shouldRunServerOwnedToolLoop({
      enabled: true,
      stream: false,
      isResponsesEndpoint: false,
      sourceFormat: FORMATS.GEMINI,
    }),
    false
  );
});
