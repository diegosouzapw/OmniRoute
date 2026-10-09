import assert from "node:assert/strict";
import test from "node:test";

import { sanitizeReasoningEffortForProvider } from "../../open-sse/executors/base/reasoningEffort.ts";

test("sensenova/deepseek-v4-flash clamps xhigh and max to high", () => {
  const max = sanitizeReasoningEffortForProvider(
    { reasoning_effort: "max", messages: [] },
    "sensenova",
    "deepseek-v4-flash"
  );
  const xhigh = sanitizeReasoningEffortForProvider(
    { reasoning_effort: "xhigh", messages: [] },
    "sensenova",
    "deepseek-v4-flash"
  );

  assert.equal((max as Record<string, unknown>).reasoning_effort, "high");
  assert.equal((xhigh as Record<string, unknown>).reasoning_effort, "high");
});

test("snova-prefixed openai-compatible deepseek-v4-flash clamps xhigh and max to high", () => {
  const provider = "openai-compatible-chat-95565442-1b4b-4082-b428-9503ac8ca716";
  const model = "snova/deepseek-v4-flash";
  const max = sanitizeReasoningEffortForProvider(
    { reasoning_effort: "max", messages: [] },
    provider,
    model
  );
  const xhigh = sanitizeReasoningEffortForProvider(
    { reasoning_effort: "xhigh", messages: [] },
    provider,
    model
  );
  const high = sanitizeReasoningEffortForProvider(
    { reasoning_effort: "high", messages: [] },
    provider,
    model
  );

  assert.equal((max as Record<string, unknown>).reasoning_effort, "high");
  assert.equal((xhigh as Record<string, unknown>).reasoning_effort, "high");
  assert.equal((high as Record<string, unknown>).reasoning_effort, "high");
});

test("sensenova models without explicit effort list keep max unchanged", () => {
  const result = sanitizeReasoningEffortForProvider(
    { reasoning_effort: "max", messages: [] },
    "sensenova",
    "glm-5.2"
  );

  assert.equal((result as Record<string, unknown>).reasoning_effort, "max");
});
