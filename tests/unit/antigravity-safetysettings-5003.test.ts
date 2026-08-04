import { test } from "node:test";
import assert from "node:assert/strict";

import { AntigravityExecutor } from "../../open-sse/executors/antigravity.ts";
import { openaiToAntigravityRequest } from "../../open-sse/translator/request/openai-to-gemini.ts";

// Safety policy belongs to the caller and provider. OmniRoute may remove categories the
// Cloud Code endpoint rejects, but it must not silently weaken safety by synthesizing all-OFF.

test("transformRequest omits safetySettings when none are supplied", async () => {
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
  assert.equal(
    "safetySettings" in innerRequest,
    false,
    "missing caller safety settings must stay absent"
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

test("OpenAI Antigravity translation omits safetySettings when the caller omits them", () => {
  const translated = openaiToAntigravityRequest(
    "gemini-2.5-flash",
    { messages: [{ role: "user", content: "hi" }] },
    true,
    { projectId: "project-1" }
  );

  assert.equal(
    translated.request.safetySettings,
    undefined,
    "generic Gemini safety defaults must not leak into the Antigravity envelope"
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
