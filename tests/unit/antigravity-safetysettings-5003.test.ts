import { test } from "node:test";
import assert from "node:assert/strict";

import { AntigravityExecutor } from "../../open-sse/executors/antigravity.ts";
import { DEFAULT_SAFETY_SETTINGS } from "../../open-sse/translator/helpers/geminiHelper.ts";
import { openaiToAntigravityRequest } from "../../open-sse/translator/request/openai-to-gemini.ts";

// Regression for #5003: the Antigravity (Google Cloud Code) request builder explicitly set
// `safetySettings: undefined`, which `JSON.stringify` drops entirely. With no safetySettings
// reaching Cloud Code, Google applies its server-side safety defaults that false-flag benign
// technical prompts as `prohibited_content` (HTTP 200 with a blocked body that combo failover
// treats as terminal). Antigravity still needs explicit all-OFF safety settings,
// but Cloud Code rejects HARM_CATEGORY_CIVIC_INTEGRITY on the v1internal endpoint.

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
  const antigravitySafetySettings = DEFAULT_SAFETY_SETTINGS.filter(
    (setting) => setting.category !== "HARM_CATEGORY_CIVIC_INTEGRITY"
  );
  assert.deepEqual(
    innerRequest.safetySettings,
    antigravitySafetySettings,
    "safetySettings must default to all-OFF entries accepted by Cloud Code"
  );
});

test("transformRequest honors caller-supplied safetySettings accepted by Cloud Code (#5003)", async () => {
  const executor = new AntigravityExecutor();
  const callerSafety = [
    { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
    { category: "HARM_CATEGORY_CIVIC_INTEGRITY", threshold: "OFF" },
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
    [{ category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" }],
    "caller-supplied safetySettings should preserve accepted entries and drop rejected ones"
  );
});

test("OpenAI Antigravity translation preserves caller-supplied safetySettings (#5003)", async () => {
  const executor = new AntigravityExecutor();
  const callerSafety = [
    { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
    { category: "HARM_CATEGORY_CIVIC_INTEGRITY", threshold: "OFF" },
  ];
  const translated = openaiToAntigravityRequest(
    "gemini-2.5-flash",
    {
      messages: [{ role: "user", content: "hi" }],
      safetySettings: callerSafety,
    },
    true,
    { projectId: "project-1" }
  );

  const result = await executor.transformRequest("antigravity/gemini-2.5-flash", translated, true, {
    projectId: "project-1",
  });

  if (result instanceof Response) throw new Error("Unexpected Response from transformRequest");
  const innerRequest = result.request as Record<string, unknown>;
  assert.deepEqual(innerRequest.safetySettings, [
    { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
  ]);
});
