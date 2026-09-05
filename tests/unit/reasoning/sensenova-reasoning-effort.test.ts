import assert from "node:assert/strict";
import test from "node:test";

import { sanitizeReasoningEffortForProvider } from "../../../open-sse/executors/base/reasoningEffort.ts";

test("sensenova/deepseek-v4-flash maps max to its explicit xhigh ceiling", () => {
  const result = sanitizeReasoningEffortForProvider(
    { reasoning_effort: "max", messages: [] },
    "sensenova",
    "deepseek-v4-flash"
  );

  assert.equal((result as Record<string, unknown>).reasoning_effort, "xhigh");
});

test("sensenova models without an explicit effort list keep max unchanged", () => {
  const result = sanitizeReasoningEffortForProvider(
    { reasoning_effort: "max", messages: [] },
    "sensenova",
    "glm-5.2"
  );

  assert.equal((result as Record<string, unknown>).reasoning_effort, "max");
});
