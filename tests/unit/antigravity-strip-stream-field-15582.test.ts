import { test } from "node:test";
import assert from "node:assert/strict";

import { AntigravityExecutor } from "../../open-sse/executors/antigravity.ts";

test("transformRequest drops stream field from Antigravity envelope (#15582)", async () => {
  const executor = new AntigravityExecutor();
  const body = {
    stream: true,
    request: {
      contents: [{ role: "user", parts: [{ text: "hi" }] }],
      generationConfig: {},
    },
  };

  const result = await executor.transformRequest("antigravity/claude-opus-4-8-thinking", body, true, {
    projectId: "project-1",
  });

  if (result instanceof Response) throw new Error("Unexpected Response from transformRequest");
  const envelope = result as Record<string, unknown>;

  assert.equal(
    envelope.stream,
    undefined,
    'top-level "stream" must not reach the Google Cloud Code envelope'
  );
});
