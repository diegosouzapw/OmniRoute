import { test } from "node:test";
import assert from "node:assert/strict";

import { AntigravityExecutor } from "../../open-sse/executors/antigravity.ts";
import { DEFAULT_SAFETY_SETTINGS } from "../../open-sse/translator/helpers/geminiHelper.ts";

// Regression for #5003: the Antigravity (Google Cloud Code) request builder explicitly set
// `safetySettings: undefined`, which `JSON.stringify` drops entirely. With no safetySettings
// reaching Cloud Code, Google applies its server-side safety defaults that false-flag benign
// technical prompts as `prohibited_content` (HTTP 200 with a blocked body that combo failover
// treats as terminal). The native Gemini paths all default to all-OFF
// (DEFAULT_SAFETY_SETTINGS); Antigravity must match for parity.

test("transformRequest defaults safetySettings to all-OFF when none supplied (#5003)", async () => {
  const executor = new AntigravityExecutor();
  const body = {
    request: {
      contents: [{ role: "user", parts: [{ text: "hi" }] }],
      generationConfig: {},
    },
  };

  const result = await executor.transformRequest("antigravity/claude-sonnet-4-6", body, true, {
    projectId: "project-1",
  });

  if (result instanceof Response) throw new Error("Unexpected Response from transformRequest");
  const innerRequest = result.request as Record<string, unknown>;
  assert.deepEqual(
    innerRequest.safetySettings,
    DEFAULT_SAFETY_SETTINGS,
    "safetySettings must default to all-OFF for parity with native Gemini paths"
  );
});

test("transformRequest honors a caller-supplied safetySettings (#5003)", async () => {
  const executor = new AntigravityExecutor();
  const callerSafety = [
    { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
  ];
  const body = {
    request: {
      contents: [{ role: "user", parts: [{ text: "hi" }] }],
      generationConfig: {},
      safetySettings: callerSafety,
    },
  };

  const result = await executor.transformRequest("antigravity/claude-sonnet-4-6", body, true, {
    projectId: "project-1",
  });

  if (result instanceof Response) throw new Error("Unexpected Response from transformRequest");
  const innerRequest = result.request as Record<string, unknown>;
  assert.deepEqual(
    innerRequest.safetySettings,
    callerSafety,
    "a caller-supplied safetySettings must not be clobbered"
  );
});
