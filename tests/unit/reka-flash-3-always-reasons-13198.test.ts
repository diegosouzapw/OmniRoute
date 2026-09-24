import test from "node:test";
import assert from "node:assert/strict";

import { DefaultExecutor } from "../../open-sse/executors/default.ts";

// #13198: reka-flash-3 reasons on every request, so a tiny caller max_tokens is
// spent on reasoning and the answer comes back empty unless the 4096 floor applies
// even without an explicit reasoning_effort / thinking setting.

test("#13198 reka-flash-3 gets the thinking-budget floor without explicit reasoning settings", () => {
  const executor = new DefaultExecutor("reka");
  const body = { model: "reka-flash-3", max_tokens: 256 } as Record<string, unknown>;
  executor.ensureThinkingBudget(body, "reka-flash-3");
  assert.equal(body.max_tokens, 4096);
});

test("#13198 non-reasoning reka models keep the caller's max_tokens", () => {
  const executor = new DefaultExecutor("reka");
  const body = { model: "reka-flash", max_tokens: 256 } as Record<string, unknown>;
  executor.ensureThinkingBudget(body, "reka-flash");
  assert.equal(body.max_tokens, 256);
});
